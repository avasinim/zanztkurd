# `lesson_content` PR and release evidence chronology — 2026-11-17

## Scope

This addendum records the newly checked pull-request evidence relevant to the origin and production history of `public.lesson_content`. It complements:

- `docs/LESSON-CONTENT-TABLE-PROVENANCE-AND-RLS-MIGRATION-CHAIN-AUDIT-2026-11-17.md`
- `docs/LESSON-CONTENT-HISTORICAL-GIT-SCHEMA-PROVENANCE-2026-11-17.md`
- `docs/LESSON-CONTENT-ORIGINAL-DDL-SEARCH-AND-OWNER-RECOVERY-HANDOFF-2026-11-17.md`

No Supabase connection was made for this addendum. The evidence below is from GitHub PR metadata, descriptions, changed-file inventories, and checked-in repository files. PR descriptions are historical assertions by their authors; they are not substitutes for an independent live database inspection.

## Chronology

### 2026-10-19 — PR #2: relation and key described as pre-existing

PR #2, “Add Kurmanji courses and protected 38-lesson pathway”, was opened from `kurmanji-courses`. Its description says the seed uses the existing `lesson_content` primary key `lesson_key`. Its change set adds the Kurmanji content rows and protected-lesson logic; it does not add a `CREATE TABLE public.lesson_content` statement.

The branch's `KURMANJI-INTEGRATION-AUDIT.md` records a read-only production check on 2026-10-19 that found no rows in `public.courses` for the two new Kurmanji course IDs, and says the Kurmanji migration had not been applied to production. That observation concerns course rows, not the original creation of `lesson_content`.

**Interpretation:** by this point the PR author treated the relation and its `lesson_key` key as existing prerequisites. The PR does not identify the artifact or actor that created them.

### 2026-10-21 — PR #3 draft: separate test-project evidence

The PR #3 draft's historical continuity/audit material records a test Supabase project with 38 `lesson_content` rows for the two Kurmanji courses (26 + 12) and zero rows for two other course IDs. It explicitly labels this as test-project state and warns not to interpret it as production state.

PR #3 remained draft and its blockers stated that the migration had not been validated in a disposable test project. The historical continuity note and PR body are not fully reconciled; they appear to describe different testing snapshots or scopes. Do not treat the 38-row test-project note as proof of production state or as proof that the migration was safely tested.

### 2026-10-24 — PR #4: production migration application asserted

PR #4, “Release Kurmanji courses 1–2 (26 + 12 lessons)”, was merged into `main` at 2026-10-24 12:24:16 UTC. Its body asserts that the production migration had been applied and verified after the first CI run passed, under migration version `20261024122051_add_kurmanji_courses_and_protected_lessons`.

The PR's changed-file list includes that migration and the split seed files, but no table-creation DDL for `lesson_content`.

**Interpretation:** this is a release assertion that the Kurmanji migration was applied; it does not establish when or how the underlying relation was originally created.

### 2026-10-24 — PR #5: read-only production row-count assertion

PR #5, “fix: restore Kurmanji lesson access on main”, was merged into `main` at 2026-10-24 13:23:05 UTC. Its body states that a read-only production check found:

- `kurmanji-course-1`: 26 lessons
- `kurmanji-course-2`: 12 lessons
- exactly 38 distinct `lesson_content` rows across those courses

Its changed-file list contains only `dashboard.html` and `script.js`; it does not add or alter schema or migration files. The PR says it intentionally excludes migration and seed files to avoid overwriting production lesson content.

**Interpretation:** the repository records a production read-only assertion of 38 rows after the PR #4 migration release. This corroborates the intended production content state on 2026-10-24, but the query text, raw result, schema definition, RLS state, and table creation provenance are not included in PR #5.

## Reconciled timeline

| Date | Evidence | What it supports | What it does not prove |
|---|---|---|---|
| 2026-10-07 | Initial tracked `supabase/schema.sql` | Initial tracked schema lacks `lesson_content` | Whether an external/untracked DDL existed |
| 2026-10-10 | First tracked index/policy migrations assume the relation | The relation was an assumed prerequisite by then | Its creation source/date |
| 2026-10-19 | PR #2 calls `lesson_key` the existing primary key | PR author regarded relation/key as pre-existing | Exact DDL or live table metadata |
| 2026-10-21 | PR #3 continuity note reports 38 rows in a test project | A test project held 38 course rows in that snapshot | Production state or successful migration integration test |
| 2026-10-24 | PR #4 asserts production migration application | Release author reports migration applied | Independent migration ledger/schema verification |
| 2026-10-24 | PR #5 reports 38 distinct production rows | Release author reports the expected production data | Original DDL, ACL/RLS, ownership, constraints, or triggers |

## Updated conclusion

The evidence now narrows the operational history:

1. The initial tracked schema still does not create `lesson_content`.
2. By the 2026-10-10 migration chain, the relation was already assumed to exist.
3. On 2026-10-19, PR #2 explicitly described its `lesson_key` primary key as existing.
4. By 2026-10-24, PR #4 reported the Kurmanji migration applied in production and PR #5 reported 38 corresponding production rows.

This strengthens the conclusion that `lesson_content` was a pre-existing platform relation later populated with Kurmanji content. It does **not** establish the table's original DDL, creation date, creator, or exact live security configuration. The origin may still be an untracked SQL file, an earlier manual/dashboard action, another repository, or another setup process; these remain hypotheses only.

## Required owner evidence remains unchanged

The next authoritative artifact is still the original schema-only DDL/export for `public.lesson_content`, including:

- columns, types, nullability, defaults, owner;
- primary/unique/foreign/check constraints and indexes;
- RLS enabled/forced state and all policies;
- table/column grants and relevant default privileges;
- triggers, dependent functions/views/sequences;
- migration ledger/history around the relation's creation.

Do not include lesson bodies, student rows, personal identifiers, enrollments, or progress records. Do not execute guessed DDL or attempt to reconstruct the relation from later assumptions.

## Verification and safety

- Active branch before this addendum: `fix/kurmanji-ci-current-migration`
- Starting commit: `dd09563765efaa932bc4977f80efbf00a36764fc`
- Pre-work backup: `backup/lesson-content-release-evidence-before-2026-11-17`
- `main` remains `4ebd824ff9502ad71936ee9bdfa787ed898b11a8`
- No database connection/query, SQL execution, migration, lesson-content edit, application-code edit, CI change, PR edit, merge, or deployment was performed.
