# Kurmanji RPC and RLS policy-chain source review — 2026-11-16

## Scope

Read-only review of repository SQL migrations governing protected lesson content for the Kurmanji pathways. This review follows the policy chain from the sequential-access migration through the Kurmanji course migration.

Files reviewed:
- `supabase/migrations/20261010073609_restrict_anon_lesson_access_rpc.sql`
- `supabase/migrations/20261010090000_align_lesson_content_owner_rls.sql`
- `supabase/migrations/20261010091000_enforce_sequential_lesson_content_access.sql`
- `supabase/migrations/20261024122051_add_kurmanji_courses_and_protected_lessons.sql`

No remote Supabase project was queried. No SQL was executed. No migration, policy, RPC, application code, test, CI, lesson, or deployment was changed.

## Findings

### 1. Lesson-content SELECT policy is authenticated-only and composes enrollment with sequence checks

The 20261010091000 migration creates the policy `Enrolled users and owners can read lesson content` for `SELECT TO authenticated`.

Its predicate permits:
- `public.is_site_owner()`; or
- an enrollment row for `auth.uid()` in the same course with status `active` or `completed`, together with `public.can_read_lesson_content(course_id, lesson_key)`.

The 20261024122051 migration replaces the body of `can_read_lesson_content` but does not recreate this policy. Therefore, by migration order in the repository, the policy's sequence-aware predicate remains in force after that later migration, assuming both migrations were applied in that order and no later migration or dashboard change replaced it.

The 20261010090000 migration, considered alone, has a weaker policy: owner OR enrollment without the sequence helper. The later 20261010091000 migration is the repository change that adds the sequence condition.

### 2. RPC hardening is explicit in the Kurmanji migration

The Kurmanji migration defines both `can_read_lesson_content(text,text)` and `complete_lesson(text,text)` as `SECURITY DEFINER` functions with an empty fixed `search_path`.

It revokes execution from `PUBLIC` and `anon`, then grants execution to `authenticated`. The earlier 20261010073609 migration also explicitly revokes anonymous execution from the enrollment and lesson-read RPCs.

This is a positive source-level hardening signal. It is not proof of the effective grants in the live database.

### 3. Server-side sequence validation has two layers

- `can_read_lesson_content` maps each Kurmanji course to a finite ordered key list (26 keys for Course 1, 12 for Course 2), rejects unknown keys, and for non-owners requires a progress row for the immediately preceding lesson.
- `complete_lesson` independently maps the same finite inventories, rejects unknown course/lesson keys, requires active/completed enrollment for non-owners, and requires the immediate predecessor before recording a non-owner's completion.
- Owners bypass sequencing for the Kurmanji courses; the function comments explicitly describe this policy.
- Completion uses an upsert on `(user_id, course_id, lesson_key)`, so repeated completion requests are intended to be idempotent at the row-key level.

### 4. Important unresolved dependency: who can write lesson_progress?

The sequence reader trusts the existence of the immediately preceding `lesson_progress` row. The completion RPC checks sequence before creating that row, but this source review did not establish the complete effective RLS and table-grant policy for direct writes to `public.lesson_progress`.

That matters: if an ordinary authenticated learner could directly insert arbitrary progress rows, the predecessor-row test alone would not prove sequential completion. The reviewed Kurmanji migration contains no `CREATE POLICY` or table-grant statements for `lesson_progress`; those controls must be traced to the table's original schema and every subsequent migration, then verified in the actual database before making a production-security claim.

This is an evidence gap, not a confirmed vulnerability. Do not assume direct writes are possible or impossible without that inspection.

### 5. Production state remains unverified

Repository headers and migration order do not prove which migration versions, policy definitions, function bodies, or grants are currently active in production. The earlier lineage audit also found two same-purpose Kurmanji migrations with different payloads and conflicting header statements about live application.

Do not run `supabase db push`, migration repair, or production SQL based on this repository-only review. First obtain explicit authorization for a read-only migration-ledger, `pg_policies`, function-definition, and privilege inspection against the intended project.

## Recommended next read-only verification

1. Trace the original creation of `public.lesson_progress`, including RLS enablement, all policies, table grants, and unique constraints.
2. Inspect all later migrations for any policy/grant changes to that table.
3. In an authorized read-only database session, compare the migration ledger with actual `pg_policies`, `pg_proc.prosecdef`, function definitions, and effective privileges for `anon` and `authenticated`.
4. Only after the above evidence, design a disposable-project integration test that attempts direct progress insertion and verifies that lesson N+1 cannot be read or completed without lesson N.

## Backup and change record

- Work branch: `fix/kurmanji-ci-current-migration`
- Starting commit: `17770f238588ba3292a94d2880b4741a686ba908`
- Pre-work backup: `backup/kurmanji-rpc-policy-chain-before-2026-11-16`
- Post-work backup: `backup/kurmanji-rpc-policy-chain-after-2026-11-16` (documentation-only resulting commit)
- No implementation changes are included.
