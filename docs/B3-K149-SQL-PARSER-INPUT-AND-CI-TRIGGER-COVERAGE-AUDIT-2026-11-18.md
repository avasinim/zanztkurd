# B3-K149 — Kurmanji SQL Parser Inputs and CI Trigger Coverage Audit
Date: 2026-11-18
Branch: `fix/kurmanji-ci-current-migration`
Scope: read-only source inspection; report-only commit

## Executive result

The PostgreSQL parser script includes and parses both the proposed full-prefix migration and its SQL regression file. The package workflow invokes that parser before seed parity, package validation, and browser regression checks. However, the workflow path filters do not cover every SQL file consumed by the validators. The K148 gap remains, and this audit identifies two additional validator-input gaps.

No workflow, migration, SQL test, lesson content, database, Auth, RLS, deployment, PR, merge, or default-branch file was changed.

## 1. PostgreSQL parser input coverage

`scripts/validate_kurmanji_sql.py` defines these inputs:
- `supabase/migrations/20261024122051_add_kurmanji_courses_and_protected_lessons.sql`
- `supabase/migrations/20261116120000_reconcile_kurmanji_seed_content.sql`
- `supabase/migrations/20261118100000_enforce_full_lesson_prefix_progression.sql`
- `supabase/tests/kurmanji_full_prefix_progression.sql`
- all `docs/kurmanji-content-seed-part-*.sql` files

For each input, it checks file existence, reads UTF-8 source, and calls `pglast.parse_sql`. A missing file or parser exception causes a non-zero exit. This is PostgreSQL grammar/syntax validation only; it does not execute the SQL, validate live schema dependencies, test function semantics, or establish effective grants/RLS.

## 2. Workflow invocation

`.github/workflows/validate-kurmanji-package.yml` runs:
1. `python scripts/validate_kurmanji_sql.py`
2. `python scripts/validate_kurmanji_seed_parity.py`
3. `python scripts/validate_kurmanji_package.py`
4. Playwright installation and north-circle browser regression tests

Both `push.paths` and `pull_request.paths` include the parser and package-validator scripts, plus the two older migration paths and split seed pattern. Therefore a change to a tracked validator script triggers the workflow, but a change solely to an omitted SQL input does not.

## 3. Workflow path-filter omissions

The source dependencies inspected in `scripts/validate_kurmanji_package.py` and `scripts/validate_kurmanji_sql.py` reveal four SQL inputs absent from BOTH `push.paths` and `pull_request.paths`:

| SQL input | Consumed by | Consequence |
|---|---|---|
| `supabase/migrations/20261118100000_enforce_full_lesson_prefix_progression.sql` | SQL parser + package validator | A migration-only edit will not automatically trigger this workflow |
| `supabase/tests/kurmanji_full_prefix_progression.sql` | SQL parser + package validator | A regression-test-only edit will not automatically trigger this workflow |
| `supabase/migrations/20261019090000_add_kurmanji_courses_and_protected_lessons.sql` | Package validator | A change to this validator-checked migration alone will not trigger this workflow |
| `supabase/migrations/20261007152000_admin_dashboard.sql` | Package validator privilege-contract checks | A change to this validator-checked admin RPC migration alone will not trigger this workflow |

The first two omissions were already identified in K148. The latter two are additional dependency/trigger mismatches discovered by tracing the package validator's file reads.

## 4. Static regression-test validator limitation

The package validator requires all 16 expected case-description strings to occur in the SQL test file. This is useful as a completeness sentinel, but it is a textual presence check: it does not prove that each description is attached to an executable `IF ... THEN RAISE EXCEPTION` assertion, nor that the assertion's boolean condition is the intended one.

Likewise, the RPC contract checks search function source text for required tokens, SECURITY DEFINER, empty search_path, and explicit privilege statements. They are source-contract checks, not AST-level semantic verification or live PostgreSQL/JWT/RLS tests. The SQL parser separately checks grammar, but syntax parsing does not close that semantic gap.

Suggested future hardening (not applied): tie each regression-case label to a bounded executable assertion block, or use a structured SQL test format; consider adding disposable PostgreSQL integration tests for the helper and RPC boundaries when a safe isolated database harness is available.

## 5. Parser status message

The parser's final success message says it passed for “the migration and all split seed files”, although the configured list also includes the reconciliation migration, proposed full-prefix migration, and the full-prefix SQL test. This is a minor reporting/observability imprecision, not a parsing failure.

## 6. Recommended minimal CI correction

When separately authorized to edit CI configuration, add all four omitted SQL paths to BOTH `push.paths` and `pull_request.paths`. Keep the existing triggers and workflow steps unchanged. This report does not authorize that edit; no workflow file was modified in this work unit.

## 7. Safety and verification boundary

- Inspected source only on `fix/kurmanji-ci-current-migration`.
- No SQL was executed against Test or Production.
- No migration was applied; no database, Auth, RLS, grant, or storage state was changed.
- No CI workflow configuration was edited or dispatched.
- No lesson/course content was edited.
- No PR was opened, merged, or deployed.
- `main` remained at the independently observed starting SHA `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3` at audit start.
