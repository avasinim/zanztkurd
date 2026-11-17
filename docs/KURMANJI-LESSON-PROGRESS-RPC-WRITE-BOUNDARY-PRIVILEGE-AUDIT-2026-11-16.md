# Kurmanji lesson_progress RPC write-boundary and privilege audit — 2026-11-16

## Scope

Repository-only inspection of:
- `supabase/schema.sql` (baseline schema, 271 lines; blob `017a243dc1c2a68536d272267aaee03c2e145b09`);
- all 15 SQL files under `supabase/migrations/`;
- the current Kurmanji completion function in `20261024122051_add_kurmanji_courses_and_protected_lessons.sql`.

No live Supabase connection, SQL execution, user-row access, test execution, or code/migration modification occurred.

## 1. Baseline table and RLS

The baseline schema defines `public.lesson_progress` with:
- `user_id uuid NOT NULL` referencing `auth.users(id)`;
- `course_id text NOT NULL` referencing `public.courses(id)`;
- `lesson_key text NOT NULL`;
- `completed_at timestamptz NOT NULL DEFAULT now()`;
- primary key `(user_id, course_id, lesson_key)`.

It enables RLS and creates a SELECT-only policy `progress own read` with `auth.uid() = user_id`. It drops named own-read, own-insert and own-update policies before recreating the read policy. No INSERT, UPDATE, or DELETE policy is created in the inspected schema block.

Consequently, for a table initialized with this definition and with RLS active, an authenticated client cannot write rows directly through ordinary RLS-governed access unless another applicable write policy is added. RLS policy absence is not itself a SQL privilege grant or revoke.

Caveats:
- the schema does not explicitly revoke or grant table privileges on `lesson_progress`;
- it does not drop a policy named `progress own delete`;
- it does not enable FORCE ROW LEVEL SECURITY;
- effective privileges, owner bypass, default privileges and any later-added policies cannot be inferred from this file.

## 2. Intended write path

The baseline schema contains an explicit comment that direct client writes are disabled and progress should be written only through the SECURITY DEFINER completion RPC.

The baseline `complete_lesson(text,text)` function:
- is SECURITY DEFINER;
- checks `auth.uid()`, verification, enrollment and lesson key/order;
- writes `lesson_progress` using the composite primary-key conflict target;
- is followed by `REVOKE ALL ... FROM PUBLIC` and `GRANT EXECUTE ... TO authenticated`.

The later Kurmanji migration replaces the function. The deployed-source candidate in `20261024122051_add_kurmanji_courses_and_protected_lessons.sql`:
- uses SECURITY DEFINER;
- fixes `search_path` to the empty string;
- schema-qualifies table/function references;
- rejects null identity, unverified non-owners, unknown courses/lesson keys, and non-enrolled non-owners;
- checks the immediately previous lesson for non-owners before writing;
- writes only the caller's `auth.uid()` row;
- uses `ON CONFLICT (user_id, course_id, lesson_key)`;
- revokes execution from PUBLIC and anon and grants execution to authenticated.

The migration's function body therefore implements the intended controlled write boundary in source. It is not evidence that the live function definition and grants match this source.

## 3. Migration-wide privilege scan

A scan of all 15 tracked migration files found no:
- `ALTER DEFAULT PRIVILEGES`;
- broad `GRANT ALL/SELECT/INSERT/UPDATE/DELETE ON ALL TABLES`;
- explicit grant/revoke targeting `public.lesson_progress`.

The migrations do read and write progress within SECURITY DEFINER functions and admin reporting SQL. The repository does not supply the effective default privileges or actual grants for the table.

## 4. Security conclusion — source-supported, not production-certified

The repository's intended architecture is clear:
- learners may read their own progress subject to SELECT privileges and the own-row RLS policy;
- learner progress writes are intended to pass through `complete_lesson`;
- sequence checks happen inside that SECURITY DEFINER function;
- the composite primary key supports idempotent upsert semantics.

The source does **not** prove that the current production project has this exact table policy, function body, function owner, execute grants, or table privileges. Nor does it prove that no manual/dashboard policy was added later.

The correct conclusion is: **the repository baseline and latest Kurmanji migration describe an RPC-only progress write design, but live enforcement remains unverified.** Do not report a confirmed production vulnerability or confirmed production protection on repository evidence alone.

## 5. Required read-only production catalog checklist

An authorized read-only catalog inspection should establish:
1. `pg_class.relrowsecurity` and `relforcerowsecurity` for `public.lesson_progress`;
2. all policies on the table, including DELETE, with command, roles, USING and WITH CHECK;
3. effective table/column privileges for anon, authenticated, service_role and table owner;
4. table owner, primary key, other constraints, indexes and triggers;
5. `complete_lesson(text,text)` definition, owner, `prosecdef`, `proconfig`, and execute grants;
6. deployed `can_read_lesson_content` definition and execute grants;
7. migration ledger and any schema drift from the repository baseline.

Do not query learner progress rows. Catalog metadata is sufficient for this first verification.

## 6. Safe disposable-project tests after catalog review

In a disposable project, verify that an ordinary authenticated learner:
- can read only their own progress, if the app needs direct reads;
- cannot directly INSERT, UPDATE or DELETE progress;
- can complete the next lesson only after the prior lesson;
- cannot forge the prerequisite row;
- receives a denial when attempting out-of-order completion;
- cannot use the RPC to write another user's row.

Repeat for both Kurmanji courses. Do not run adversarial tests against production.

## 7. No implementation authorization inferred

This is a source audit only. Do not add or modify RLS policies, grants, revokes, functions, migrations, CI, or application code without explicit user approval and a verified production baseline.

## Backup and change record

- Work branch: `fix/kurmanji-ci-current-migration`
- Starting commit: `31aaed63dd556484944d7b3cbb75f831c5602550`
- Pre-work backup: `backup/kurmanji-rpc-write-boundary-before-2026-11-16`
- Post-work backup: `backup/kurmanji-rpc-write-boundary-after-2026-11-16`
- Change type: documentation only.
