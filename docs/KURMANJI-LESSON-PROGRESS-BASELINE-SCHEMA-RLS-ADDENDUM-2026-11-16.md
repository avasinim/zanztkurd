# Addendum — lesson_progress baseline schema and RLS policy evidence — 2026-11-16

## Purpose

This addendum corrects and extends the repository-only audit in `KURMANJI-LESSON-PROGRESS-TABLE-SCHEMA-AND-RLS-LINEAGE-GAP-AUDIT-2026-11-16.md`. The earlier search was confined to the migration directory. This pass inspected the separate baseline schema file, `supabase/schema.sql`.

## Newly identified source

File: `supabase/schema.sql`
Blob SHA: `017a243dc1c2a68536d272267aaee03c2e145b09`
Length: 271 lines.

The baseline schema contains the following evidence:

1. It creates `public.lesson_progress` with:
   - `user_id uuid NOT NULL`, referencing `auth.users(id)` with cascade delete;
   - `course_id text NOT NULL`, referencing `public.courses(id)` with cascade delete;
   - `lesson_key text NOT NULL`;
   - `completed_at timestamptz NOT NULL DEFAULT now()`;
   - primary key `(user_id, course_id, lesson_key)`.

2. It explicitly enables RLS on `public.lesson_progress`.

3. It drops policies named `progress own read`, `progress own insert`, and `progress own update`, then creates only:
   `progress own read` — `FOR SELECT USING (auth.uid() = user_id)`.

4. It does not create an INSERT, UPDATE, or DELETE policy in the inspected section. For a fresh table initialized from this schema, the absence of matching write policies means RLS does not authorize ordinary API roles to insert, update, or delete rows, even if table-level SQL privileges are granted.

5. It does not explicitly revoke or grant table privileges on `public.lesson_progress`. The exact effective table privileges therefore remain to be checked independently.

## Updated assessment

The previous report's statement that no table definition or RLS policy existed in the tracked migration set remains accurate for `supabase/migrations/`, but it must not be read as saying the repository contains no schema definition at all.

The repository's baseline schema gives a plausible and comparatively strong design explanation for why ordinary authenticated clients should be able to read only their own progress and should not be able to forge progress rows directly. The completion RPC is the intended write path in this baseline design.

This reduces the uncertainty identified in the earlier report, but does not close the production verification gap. Repository source cannot establish:
- whether this baseline schema was actually applied to the current Supabase project;
- whether the live table was created or modified by a different schema history;
- whether later dashboard/manual SQL added policies or changed grants;
- whether the effective role privileges differ from the baseline assumptions;
- whether the deployed function owner and RLS execution context behave as expected.

### Important rerun caveat

The schema file drops named read/insert/update policies, but the inspected block does not drop a possible `progress own delete` policy. On a fresh table created by this file, no delete policy is created here. If the file is rerun against an existing table that already has a separately named delete policy, this script does not itself remove that policy. This is another reason to inspect the live catalog rather than infer it from the file alone.

## RPC relationship

The baseline schema defines an earlier `complete_lesson` implementation. Later migration `20261010070000_allow_site_owner_to_bypass_lesson_prerequisite.sql` replaces it, and migration `20261024122051_add_kurmanji_courses_and_protected_lessons.sql` replaces it again for the Kurmanji courses. The latter uses an empty fixed `search_path`, revokes execution from PUBLIC/anon, and grants execution to authenticated.

The baseline schema's table primary key matches the RPC's `ON CONFLICT (user_id, course_id, lesson_key)` target.

## Exact next verification

Use an authorized read-only connection to the intended Supabase project and inspect only catalog metadata:
- table RLS enabled/forced flags;
- all current policies on `public.lesson_progress`, including DELETE;
- effective privileges for `anon`, `authenticated`, and relevant owner/service roles;
- primary key and other constraints;
- table owner;
- deployed `complete_lesson` definition, owner, SECURITY DEFINER flag, and execute grants;
- migration ledger and any schema drift.

Do not read learner progress rows. Do not run SQL writes, policy changes, migrations, or production tests. A read-only catalog inspection is the appropriate next step, but it has not been performed in this repository-only task.

## Change and backup record

- Work branch: `fix/kurmanji-ci-current-migration`
- Starting commit: `9aae42077bfa120d5a98f6aa5a189ce250a29566`
- Pre-work backup: `backup/kurmanji-progress-schema-policy-before-2026-11-16`
- Post-work backup: `backup/kurmanji-progress-schema-policy-after-2026-11-16`
- Scope: documentation only; no SQL or application code changed.
