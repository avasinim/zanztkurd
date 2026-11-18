# B3-K151 — SQL Parser, Seed-Parity, Package Validator and CI Coverage Audit
Date: 2026-11-18

## Scope and safety

Read-only source audit of:
- `scripts/validate_kurmanji_sql.py`
- `scripts/validate_kurmanji_seed_parity.py`
- `scripts/validate_kurmanji_package.py`
- `.github/workflows/validate-kurmanji-package.yml`
- The SQL source paths referenced by those validators.

This report is documentation only. No validator, seed, lesson, SQL test, migration, workflow, Supabase project, Auth, RLS, grant, deployment, pull request, merge, or default-branch content was changed. No SQL was executed against PostgreSQL or Supabase in this audit. The review is based on committed source, not a runtime test.

## Validation responsibilities

### 1. PostgreSQL syntax parser

`validate_kurmanji_sql.py` calls `pglast.parse_sql` on:
1. `supabase/migrations/20261024122051_add_kurmanji_courses_and_protected_lessons.sql`
2. `supabase/migrations/20261116120000_reconcile_kurmanji_seed_content.sql`
3. `supabase/migrations/20261118100000_enforce_full_lesson_prefix_progression.sql`
4. `supabase/tests/kurmanji_full_prefix_progression.sql`
5. All matching `docs/kurmanji-content-seed-part-*.sql` files (currently five).

It checks file existence, UTF-8 readability and PostgreSQL parse syntax, and reports parse errors. It does not apply SQL, prove schema compatibility, execute assertions, compare lesson payloads, or validate runtime authorization.

A small completeness gap remains in this script itself: its seed list is a glob and it does not assert that exactly five split seed files were found. The seed-parity validator does enforce exactly five, and the package validator rejects an empty seed set, so the combined workflow has compensating checks as long as it is actually triggered. The parser's final success sentence also understates its actual input set: it says “migration and all split seed files” although it additionally parses the reconciliation migration, full-prefix migration and SQL regression test.

### 2. Seed parity and reconciliation validator

`validate_kurmanji_seed_parity.py` reads:
- The immutable canonical release migration `20261024122051_add_kurmanji_courses_and_protected_lessons.sql`.
- The forward content reconciliation migration `20261116120000_reconcile_kurmanji_seed_content.sql`.
- Exactly five split seed files.

It verifies the canonical migration's recorded Git blob SHA, the 38 ordered course lesson keys (26 + 12), uniqueness and exact drift set, the 12-row reconciliation/preflight key set, preflight baseline values, selected transaction/row-lock/row-count/scope guards, effective tuple parity against the split seeds, and the 38 static page H1/protected content-key bindings.

It uses a purpose-built SQL tuple scanner, not PostgreSQL's parser. It does not include the full-prefix migration or its SQL test in its parity model. It does not prove SQL runtime behavior or database state. The separate pglast check is therefore complementary, not redundant.

### 3. Package and application-integrity validator

`validate_kurmanji_package.py` checks broader source-level invariants: seed draft markers and key coverage, legacy and latest migration row counts, browser access-control/runtime markers, dashboard enrollment routing, lesson page shells and navigation, course plans, catalog/learning routes, the full-prefix migration and SQL test source contracts, and owner/learner RPC privilege tokens.

It reads these additional SQL sources that the pglast script does not currently parse:
- `supabase/migrations/20261019090000_add_kurmanji_courses_and_protected_lessons.sql`
- `supabase/migrations/20261007152000_admin_dashboard.sql`

Those checks are textual/static assertions. They do not establish PostgreSQL syntax validity, execute SQL, prove effective database ACLs, or test live JWT/RLS behavior. The validator's broad coverage complements the parser and parity checker but is not a replacement for either.

## Coverage matrix

| Source family | PostgreSQL parser | Seed parity | Package validator |
|---|---|---|---|
| Canonical Kurmanji migration 20261024122051 | Yes | Yes | Yes |
| Reconciliation migration 20261116120000 | Yes | Yes | No direct package contract |
| Full-prefix migration 20261118100000 | Yes | No | Yes, static source contract |
| Full-prefix SQL regression test | Yes | No | Yes, static case/RPC contract |
| Legacy course migration 20261019090000 | No | No | Yes, static checks |
| Owner-admin migration 20261007152000 | No | No | Yes, static checks |
| Five split seed files | Yes, globbed | Yes, exactly five | Yes, seed markers/key coverage |

“Package validator: Yes” means source text is inspected; it does not mean that SQL is parsed or executed.

## CI trigger gap — four SQL paths

The workflow invokes all three validators, but both `push.paths` and `pull_request.paths` omit four SQL files that one or more validators consume:

1. `supabase/migrations/20261118100000_enforce_full_lesson_prefix_progression.sql`
2. `supabase/tests/kurmanji_full_prefix_progression.sql`
3. `supabase/migrations/20261019090000_add_kurmanji_courses_and_protected_lessons.sql`
4. `supabase/migrations/20261007152000_admin_dashboard.sql`

Consequently, a change limited to any of those paths may not trigger this workflow through ordinary push or pull-request path filtering. The validators would inspect those files if the workflow ran for another matching path or was manually dispatched, but that does not close the automatic trigger gap.

The minimal workflow correction is to add all four exact paths to both `push.paths` and `pull_request.paths`. This is a CI configuration change and was deliberately not made: it requires the user's separate, explicit approval. A general instruction to continue work is not approval to modify workflow configuration.

## Recommendations

1. Approve and add the four missing SQL paths to both workflow path lists, then verify a workflow run is triggered by a change to each class of omitted SQL source.
2. Make the parser assert the expected five split seed files (or share a single explicit source manifest across the validators) and update its success message to name all parsed SQL categories.
3. Keep the three checks separate by responsibility: pglast for syntax, parity validator for exact source/payload consistency, and package validator for broader application/source contracts.
4. If future SQL constructs or payload format expands, extend the parity scanner with targeted fixtures or replace it with PostgreSQL-aware parsing/AST extraction. Do not treat scanner success as general SQL semantic validation.
5. Add disposable-PostgreSQL execution tests for migrations and RPC behavior separately from these static CI checks; do not infer live JWT/RLS or effective grants from source-text tokens.

## Verification limits

- This is a source-level coverage audit only. No local execution of the scripts is claimed.
- No live PostgreSQL parse or SQL execution was performed in this task.
- No Test or Production Supabase query/write was performed.
- No workflow run was dispatched.
- No production or default-branch change was made.

## Backup and branch references

- Work branch: `fix/kurmanji-ci-current-migration`
- Starting work-branch HEAD: `188a1fc46e846d8474eed22b72c5ef2c1ee76df5`
- Main observed before work: `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`
- Pre-work backup: `backup/b3-k151-parser-parity-boundary-before-2026-11-18`
- Post-work backup: recorded after the report commit is created.
