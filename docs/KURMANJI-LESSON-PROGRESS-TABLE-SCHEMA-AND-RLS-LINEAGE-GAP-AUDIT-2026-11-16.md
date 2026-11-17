# Kurmanji lesson_progress schema and policy lineage gap audit — 2026-11-16

## Scope and method

Read-only repository audit of all 15 SQL migration files present under `supabase/migrations/` on `fix/kurmanji-ci-current-migration`. Searched for table creation, RLS enable/force statements, policies, table grants/revokes, and every reference to `public.lesson_progress`.

No database was queried. No SQL was executed. No source, migration, test, CI, lesson, or deployment file was changed.

## Principal finding — the tracked migration history does not define lesson_progress security

Across all 15 tracked migration files:
- no `CREATE TABLE public.lesson_progress` or equivalent table creation was found;
- no `ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY` or `FORCE ROW LEVEL SECURITY` was found;
- no `CREATE POLICY` or `DROP POLICY` targeting `public.lesson_progress` was found;
- no explicit table-level `GRANT` or `REVOKE` targeting `public.lesson_progress` was found.

The migrations repeatedly read and write the table, including `complete_lesson` SECURITY DEFINER RPCs and admin reporting views/functions, but the repository migration set does not establish how direct client access to the table is controlled.

This is a material provenance and verification gap. It is **not proof** that the live table lacks RLS or is directly writable: the table and its policies may have been created manually, in an untracked initial schema, or through dashboard configuration. The tracked migration history alone cannot answer that question.

## Why it matters to sequential access

The Kurmanji `can_read_lesson_content` function checks whether the immediately previous lesson has a row in `lesson_progress`. The `complete_lesson` RPC also checks the predecessor row before inserting the current lesson. Both functions are SECURITY DEFINER and use a fixed empty search_path; the Kurmanji migration revokes PUBLIC/anon execution and grants execution to authenticated.

Those checks provide a coherent sequence rule only if ordinary authenticated users cannot forge predecessor rows through a direct table write. Because the table's RLS and grants are absent from the tracked migration history, the repository cannot demonstrate that prerequisite.

If direct inserts are possible, a learner may be able to create a predecessor progress row without completing its lesson and thereby satisfy the next-lesson predicate. This is a conditional risk scenario, not a confirmed exploit.

## Additional schema assumptions not established by tracked migrations

The Kurmanji RPC uses:
- columns `user_id`, `course_id`, `lesson_key`, and `completed_at`;
- an `ON CONFLICT (user_id, course_id, lesson_key)` target, implying a matching unique or exclusion constraint;
- the `public.enrollments` and `public.courses` relations.

The reviewed migration files do not create `lesson_progress` or establish its unique constraint. The actual table definition, indexes, foreign keys, RLS flags, policies, and privileges therefore need to be obtained from the target database's catalog or a canonical schema dump.

## Required authorized read-only verification

Before claiming that sequential progress is protected in production, inspect the intended Supabase project using a read-only role and record:

1. `pg_class.relrowsecurity` and `relforcerowsecurity` for `public.lesson_progress`.
2. All `pg_policies` rows for that table, including command, roles, USING and WITH CHECK expressions.
3. Effective table and column privileges for `anon`, `authenticated`, and relevant owner/service roles.
4. The table definition, unique constraints, indexes, foreign keys, triggers, and ownership.
5. The active definitions and security mode of `complete_lesson` and `can_read_lesson_content`.
6. The migration ledger and any manual/dashboard-managed changes.

Do not expose user progress records or personal data during this verification; catalog metadata is sufficient for the first pass.

## Safe test design after catalog verification

In a disposable Supabase project only:
- attempt direct INSERT, UPDATE, and DELETE on `lesson_progress` as an ordinary authenticated enrolled user;
- verify the expected denial or narrowly scoped permitted behavior;
- attempt lesson 02 access before lesson 01 completion;
- attempt to forge lesson 01 progress and then read lesson 02;
- repeat for both Kurmanji courses;
- verify that the owner bypass remains limited to its documented scope;
- confirm that the unique key and RPC upsert behave as intended.

Never run these adversarial tests against production.

## Conclusion

The next critical dependency is no longer simply whether the RPC code checks sequential order; it does. The missing evidence is whether the underlying `lesson_progress` table prevents clients from bypassing that RPC and inserting forged completion rows. The repository does not contain the schema/policy lineage needed to prove this.

No remediation is proposed in this dossier because the correct policy depends on the actual table ownership, existing app behavior, and production grants. Do not create or alter policies, issue grants/revokes, run migrations, or change production state without explicit authorization.

## Backup and change record

- Work branch: `fix/kurmanji-ci-current-migration`
- Starting commit: `1096e76066c3c5b05f9549aa163939bdf78b5245`
- Pre-work backup: `backup/kurmanji-progress-table-lineage-before-2026-11-16`
- Post-work backup: `backup/kurmanji-progress-table-lineage-after-2026-11-16` (documentation-only resulting commit)
- This document is documentation only.
