# `lesson_content` original DDL search and owner recovery handoff — 2026-11-17

## Purpose and safety boundary

This is a repository-history investigation and a handoff for obtaining the authoritative original definition of `public.lesson_content`. It is not a proposed replacement schema. No SQL was run, no Supabase project was connected, and no live database metadata or lesson rows were queried during this investigation.

The active work branch is `fix/kurmanji-ci-current-migration`. The pre-work backup branch is `backup/lesson-content-ddl-discovery-before-2026-11-17`, created at the exact starting commit recorded below. `main` was not changed.

## Findings

### 1. The repository's initial tracked schema does not define the relation

The original tracked Supabase foundation is commit `d61db7616fdadf10016ec79e77e8642c2849b520` (2026-10-07). Its `supabase/schema.sql` defines `profiles`, `courses`, `enrollments`, and `lesson_progress`; it does not create `public.lesson_content`.

The current `supabase/schema.sql` likewise does not contain `CREATE TABLE public.lesson_content`. The schema snapshot also does not declare its `lesson_key` primary/unique key, table-level grants, or an RLS enablement statement for this relation.

### 2. The first tracked dependencies assume the relation already exists

The migration `20261010073644_index_lesson_content_course_id.sql` creates an index on `public.lesson_content(course_id)`; it is not a table-creation migration.

The migration `20261010090000_align_lesson_content_owner_rls.sql` creates/replaces a SELECT policy; it does not create the table or enable RLS.

Other tracked migrations update or seed `lesson_content` and likewise presuppose the relation. The checked-in migration history therefore does not establish the original DDL.

### 3. PR #2 confirms that the table was treated as pre-existing

PR #2, “Add Kurmanji courses and protected 38-lesson pathway”, is an open Draft PR with head `8e6239801aec2247ace994031be96fc212f3b316` on branch `kurmanji-courses`. Its description says the Kurmanji seed uses the existing `lesson_content` primary key `lesson_key`. Its migration inserts 38 lesson records; it does not create the relation.

PR #2's own audit file says the Kurmanji migration had not been applied to production and records a read-only production inspection on 2026-10-19 that found neither Kurmanji course row in `public.courses`. This is evidence of how the PR author described the pre-existing schema and release state, not an independently re-run verification of the live database.

PR #2 changed-file inventory includes the five draft content seed SQL files, an RPC draft, the Kurmanji course migration, and the tracked `supabase/schema.sql`; it contains no separate original `lesson_content` table-creation artifact.

### 4. Additional branch/tree discovery did not reveal a dedicated DDL artifact

Inspected the repository trees for the PR #2 head and the named historical branches `kurmanji-clean-release`, `kurmanji-live-access-hotfix`, `kurmanji-test-config`, and `release/kurmanji-track-2026-10-24`, focusing on SQL/schema/database/setup/migration paths.

The branch trees expose the same baseline schema and the known migrations. The test-config branch adds test-focused migrations, but its tree does not expose a separate schema dump or setup document that identifies the original `lesson_content` table creation. The PR #2 head's `supabase/admin-dashboard.sql`, `docs/kurmanji-protection-rpc-draft.sql`, and seed review files are not table-creation DDL.

This is a bounded repository-artifact search, not proof that no untracked local SQL, external repository, dashboard history, backup, or manually executed SQL exists.

## What can and cannot be concluded

**Supported by tracked artifacts:**
- The original tracked schema snapshot does not define `public.lesson_content`.
- By the time the 2026-10-10 migrations were added, tracked migrations already assumed the relation existed.
- PR #2 explicitly described `lesson_key` as the existing primary key and added content rows rather than creating the relation.
- No authoritative original table-creation DDL has been located in the inspected repository artifacts/branch trees.

**Not established:**
- The exact creation date, actor, or mechanism.
- Whether the original DDL was run manually in the Supabase Dashboard, stored in an untracked/local file, supplied by another repository or project, or created through another deployment process.
- The live relation's exact columns/types/nullability/defaults, primary and foreign keys, indexes, owner, grants, RLS state, policies, triggers, or migration-ledger history.
- Whether the live database still matches the historical state described in PR #2.

Do not convert any of these unknowns into guessed DDL.

## Owner recovery request — preferred evidence

Please retrieve the original, authoritative schema-only definition from the Supabase project that owns `public.lesson_content`, or identify the original SQL file/commit that created it. Prefer an export or source artifact that preserves:

1. `CREATE TABLE` definition, exact column names and PostgreSQL types, nullability, defaults, generated/identity attributes, and table owner.
2. Primary key, unique constraints, foreign keys, check constraints, and all indexes (including whether `lesson_key` is a primary key or a separate unique index).
3. RLS enabled/forced state and every table policy, with command, role, USING and WITH CHECK expressions.
4. Table and column privileges, including grants to `anon`, `authenticated`, `service_role`, and any custom roles; relevant default privileges.
5. Triggers, dependent functions, views, sequences, and any other dependencies required for the relation to work.
6. The migration ledger/history relevant to the relation's creation, if available.

A schema-only export or SQL file is sufficient for the next offline comparison. Do not include lesson bodies, student records, email addresses, auth identifiers, enrollment records, or progress data in the handoff.

If the only available source is the Dashboard, use its schema/DDL viewing or export capability to copy the definition without executing edits. If a CLI/database dump is used, it must be explicitly schema-only and read-only. No credentials or connection strings should be pasted into GitHub or this report.

## Next safe steps after the owner supplies the artifact

1. Preserve the supplied DDL as a review artifact outside production; record its source, retrieval date, project identity label (not secrets), and checksum.
2. Compare it offline with the tracked migration assumptions and schema snapshot.
3. Identify missing prerequisites: relation, columns, key/index semantics, RLS, policies, ACLs, owner, dependencies, and migration ledger.
4. Draft a proposed canonical baseline migration only after the exact live/original definition is known and discrepancies are understood.
5. Validate the baseline in an isolated disposable Supabase project, with synthetic identities and no production data.
6. Obtain explicit approval before any production metadata inspection, migration, CI integration change, PR update, merge, or deployment.

## Verification record

- Active branch before this report: `fix/kurmanji-ci-current-migration`
- Starting commit: `91bdcb66cc79462e21aa18ce47e4d89c8abc66f4`
- Pre-work backup: `backup/lesson-content-ddl-discovery-before-2026-11-17`
- `main` before this work: `4ebd824ff9502ad71936ee9bdfa787ed898b11a8`
- Scope: repository metadata, tracked files, branch trees, PR #2 metadata/diff/comments; no live Supabase access.
- No lesson content, application code, SQL, migration, CI, PR, or production data was changed.
