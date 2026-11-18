# B3-K156 — CI SQL Path-Filter Coverage Audit
Date: 2026-11-18

## Executive result

The existing workflow `.github/workflows/validate-kurmanji-package.yml` runs the PostgreSQL syntax parser and seed/package validators, but its `push.paths` and `pull_request.paths` lists do not cover four SQL files that are either direct parser inputs or relevant historical migrations.

The omission is confirmed in both event filters. This is a trigger-coverage defect, not evidence that SQL is invalid or that the workflow itself failed.

## Exact missing paths

| SQL file | Why it matters | Current workflow filter |
|---|---|---|
| `supabase/migrations/20261118100000_enforce_full_lesson_prefix_progression.sql` | Direct input to `scripts/validate_kurmanji_sql.py`; proposed full-prefix RPC/helper migration | Missing from push and pull_request |
| `supabase/tests/kurmanji_full_prefix_progression.sql` | Direct parser input; pure helper regression test source | Missing from push and pull_request |
| `supabase/migrations/20261019090000_add_kurmanji_courses_and_protected_lessons.sql` | Historical/legacy Kurmanji course and protected lesson migration; not currently in parser FILES list, but changes are safety-relevant and should trigger review | Missing from push and pull_request |
| `supabase/migrations/20261007152000_admin_dashboard.sql` | Owner-admin RPC migration; outside the Kurmanji parser input list but changes security-sensitive database functions | Missing from push and pull_request |

The first two are especially direct: the SQL parser explicitly lists them, yet changing either file alone does not match the workflow's current path filters. The latter two are not currently parser inputs; adding their paths would provide a workflow trigger, but would not by itself parse or test their contents.

## Existing workflow behavior

- Push events are restricted to three named branches, including `fix/kurmanji-ci-current-migration`.
- Pull requests are filtered to target `main`.
- Both events use explicit path allowlists.
- `workflow_dispatch` exists as a manual trigger.
- Job steps install `pglast`, run the SQL parser, seed parity validator, package validator, then Playwright browser tests.
- The new K154 unit test file is not invoked by the workflow and is not in either path list.
- The workflow currently has no explicit test command for `scripts/test_kurmanji_seed_parity.py`.

## Proposed minimal correction — not applied

For both `push.paths` and `pull_request.paths`, add these four exact entries:

```yaml
- "supabase/migrations/20261118100000_enforce_full_lesson_prefix_progression.sql"
- "supabase/tests/kurmanji_full_prefix_progression.sql"
- "supabase/migrations/20261019090000_add_kurmanji_courses_and_protected_lessons.sql"
- "supabase/migrations/20261007152000_admin_dashboard.sql"
```

A separate, small CI enhancement would add the new scanner test path to both filters and add a workflow step:

```yaml
- name: Run seed parity scanner unit tests
  run: python scripts/test_kurmanji_seed_parity.py
```

This K156 report does not bundle that second change into the SQL path patch. It is a distinct workflow behavior change and should be reviewed as its own explicit scope.

## Important migration boundary

The full-prefix migration `20261118100000_enforce_full_lesson_prefix_progression.sql` states that it is prepared for review only. It has not been applied to Test or Production. Adding a path filter only makes changes trigger CI; it does not apply the migration, prove runtime behavior, or alter database state.

## Recommended next action

Obtain explicit approval for the exact workflow-only change. If approved, update only the two path lists with the four SQL paths, create pre/post backups, inspect the workflow diff, and verify the branch/main references. Do not run a migration, change database state, deploy, create a PR, merge, or update main as part of that patch. The separate K154 unit-test invocation should be handled only if its scope is explicitly approved too.

## Scope and safety

This K156 task is documentation-only. No workflow, validator, test, migration, seed, lesson, package file, Supabase project, database, Auth, RLS, grant, deployment, PR, merge or main branch was changed. No CI run was dispatched.

## Backup and branch references

- Work branch: `fix/kurmanji-ci-current-migration`
- Starting HEAD: `4444ab132ddf01dbb35b5bc5f5b1301c0a35ab3b`
- Main observed before work: `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`
- Pre-work backup: `backup/b3-k156-ci-sql-path-audit-before-2026-11-18`
- Post-work backup: recorded after the report commit.
