# Historical Git provenance of public.lesson_content — 2026-11-17

## Scope

A repository-history investigation to determine whether the missing `public.lesson_content` bootstrap DDL can be recovered from the tracked schema history or the first migrations that depend on the table.

Repository: `avasinim/zanztkurd`  
Work branch: `fix/kurmanji-ci-current-migration`  
Starting HEAD: `3ad386be758e4af649bd6fb1e30cb297c0e25ad9`

No Supabase project was connected. No database/catalog was queried. No SQL was executed. No user data or lesson body was accessed. No migration, code, tests, CI, PR, or production configuration was changed.

## 1. Initial tracked schema is recoverable — and it does not create lesson_content

The initial tracked schema commit is:

- Commit: `d61db7616fdadf10016ec79e77e8642c2849b520`
- Date: 2026-10-07 05:44:45 UTC
- Message: `Add Supabase database schema and RLS foundation`
- File introduced: `supabase/schema.sql`

The complete `supabase/schema.sql` content at that initial commit creates:
- `public.profiles`
- `public.courses`
- `public.enrollments`
- `public.lesson_progress`

It enables RLS and defines policies for those four tables, plus the user-creation trigger. It does not create `public.lesson_content`, define a lesson-content primary/unique key, or define its table ACL/RLS baseline.

The same omission remains in the current branch's `supabase/schema.sql`.

## 2. Tracked schema file history does not show a later bootstrap addition

The GitHub path history for `supabase/schema.sql` returns 15 commits between 2026-10-07 and 2026-10-09. The file's tracked history therefore provides a direct route to the original baseline, but no tracked version retrieved in this review contains a `CREATE TABLE public.lesson_content` definition.

The relevant conclusion is limited to the tracked schema file and its returned history. It does not prove what was manually created in the Supabase dashboard, executed from an untracked SQL editor, provisioned by another deployment process, or stored in another repository.

## 3. First identified migration dependencies assume the table already exists

Two early migration commits demonstrate the dependency without supplying the missing DDL:

### 2026-10-10 course index

- Commit: `7d65e9c80f1a82c9c073dba04fb944c73032b1d4`
- New file: `supabase/migrations/20261010073644_index_lesson_content_course_id.sql`
- SQL: `CREATE INDEX IF NOT EXISTS idx_lesson_content_course_id ON public.lesson_content (course_id);`

This operation requires the relation and `course_id` column to exist. It does not create the table or establish a unique lesson key.

### 2026-10-10 owner/enrollment policy

- Commit: `937bf095fd20e5d568964dc9b8a27420da0354d8`
- New file: `supabase/migrations/20261010090000_align_lesson_content_owner_rls.sql`
- It drops/recreates a SELECT policy on `public.lesson_content` and refers to `course_id`.

This also assumes the relation exists. It does not create the relation or enable RLS on it.

The later 2026-10-10 sequence-aware policy migration continues the same assumption. Subsequent Kurmanji content migrations use `ON CONFLICT (lesson_key)`, which additionally requires a matching unique constraint/index that is not declared in the tracked baseline schema.

## 4. What the history does and does not establish

**Established by tracked Git evidence:**
1. The first tracked Supabase foundation schema on 2026-10-07 did not create `lesson_content`.
2. The tracked schema file's subsequent history through 2026-10-09 does not provide a recovered table bootstrap.
3. By 2026-10-10, migrations were written that assume `public.lesson_content` already existed.
4. The first identified course index and SELECT policy migrations modify the assumed table but do not create it.

**Not established:**
- whether a person created the table manually in the Supabase SQL editor/dashboard;
- whether an untracked/local migration or a file outside this repository created it;
- the exact creation timestamp, owner, column types, defaults, constraints, indexes, triggers, grants, or initial RLS state;
- whether a unique constraint on `lesson_key` existed in the target environment when later `ON CONFLICT (lesson_key)` migrations were applied;
- whether the deployed database matches any tracked file or migration.

Do not label manual dashboard creation as fact. It is one possible explanation among several.

## 5. Next evidence needed to close provenance

The safest route is to obtain the authoritative DDL or metadata export from the project owner/authorized administrator without reading lesson bodies or learner records.

Preferred evidence, in order:
1. A previously saved schema-only SQL export from the original project setup.
2. A local migration/archive or deployment artifact outside this Git repository, with its source and date documented.
3. An explicitly authorized read-only catalog export from the relevant Supabase project containing only relation metadata: columns, types, nullability, defaults, constraints, indexes, triggers, owner, RLS flags, policies and effective table grants. Exclude all table row contents.
4. If none exists, record the provenance as unresolved; do not reverse-engineer and invent a replacement bootstrap from later INSERT/SELECT references.

Once the DDL is recovered, compare it against the currently tracked `supabase/schema.sql`, migration chain and the disposable integration-test readiness protocol. Do not connect to production or apply any migration as part of this source-history task.

## 6. Change and backup record

- Pre-work backup: `backup/lesson-content-original-schema-history-before-2026-11-17`
- Work branch commit: to be recorded after documentation commit.
- Post-work backup: to be created at the exact resulting commit.
- Change type: documentation only.
- No Supabase project or database connection, SQL query, migration execution, schema change, user fixture, CI edit, PR update, merge, or deployment.
