# B3-K157 — Seed Scanner Unit-Test Execution Readiness Review
Date: 2026-11-18

## Executive result

A source-level review of `scripts/test_kurmanji_seed_parity.py` confirms 23 synthetic `unittest` cases across four helper groups. The module loads the validator from its explicit file path and binds the four helper functions under test. Its fixtures are synthetic and do not embed actual lesson text.

This review does not establish that the tests pass: no Python interpreter was run in this task, and no CI workflow run was dispatched.

## Test inventory

| Test class | Cases | Main coverage |
|---|---:|---|
| `ExtractRowsTests` | 9 | Multiple top-level tuples; commas/parentheses in strings; doubled apostrophes; nested expressions; missing markers; empty block; unmatched close; unclosed tuple; unterminated string |
| `ExtractValuesRowsTests` | 4 | Marker-delimited VALUES extraction; missing markers/VALUES; empty block; unterminated string |
| `TupleStringValuesTests` | 7 | Quoted commas; doubled apostrophes; nested expression; empty string; non-string SQL expressions; malformed tuple boundary; unclosed string/parenthesis |
| `RowKeyTests` | 3 | Whitespace and key extraction; apostrophe decoding; unquoted/missing/NULL prefix rejection |
| **Total** | **23** | |

Run command documented in the file: `python scripts/test_kurmanji_seed_parity.py`.

## Source-level execution readiness

- The test file uses only Python standard-library modules: `importlib.util`, `pathlib`, and `unittest`.
- The validator source imports standard-library modules and does not import Supabase clients or open a database connection at module import.
- The test file invokes `unittest.main()` only when executed as the main module.
- The validator's production validation routine is guarded by its own main-module check, so importing the validator for helper access does not run the full corpus scan.
- The helper names referenced by the test file exist in the validator source.
- No third-party test dependency is needed for this unit-test file.

These are static source observations, not an executed test result.

## Coverage gaps and boundaries

1. The scanner is deliberately a constrained SQL text scanner, not a full PostgreSQL lexer. Tests do not establish support for comments inside VALUES blocks, dollar-quoted strings, E-string escapes, backslash escape semantics, or arbitrary SQL expressions.
2. The tuple parser tests preserve nested expressions as a field but do not prove that arbitrary expressions can be safely decoded as SQL literals.
3. `row_key` validates that the first two tuple fields are quoted string literals but returns only the first field. The second `course_id` is not independently compared to the expected course for each lesson key.
4. The suite does not explicitly test malformed tuple field counts against the expected lesson_content schema.
5. Marker handling is based on exact textual markers. The tests cover missing markers but do not fully exercise repeated, reordered, or misleading marker text.
6. No disposable PostgreSQL integration test is included. These tests do not validate PostgreSQL execution, database schema, RPC authorization, RLS, grants, JWT identity, or live migration behavior.

The known limitations are not evidence of a current parser failure in the checked-in lesson corpus. They define the scanner's supported-input boundary and future hardening opportunities.

## CI integration status

The workflow `.github/workflows/validate-kurmanji-package.yml` currently runs:
- `scripts/validate_kurmanji_sql.py`
- `scripts/validate_kurmanji_seed_parity.py`
- `scripts/validate_kurmanji_package.py`
- `scripts/test_north_circle_ui.py`

It does not invoke `scripts/test_kurmanji_seed_parity.py`, and the test file is absent from both `push.paths` and `pull_request.paths`. Thus, the 23 tests are available for manual execution but are not currently part of the automated workflow gate.

Recommended separate CI enhancement:
- Add `scripts/test_kurmanji_seed_parity.py` to both path filters.
- Add a dedicated workflow step running `python scripts/test_kurmanji_seed_parity.py` before or after the seed parity validation step.

No workflow changes were made. CI configuration edits still require separate explicit approval.

## Recommended next technical improvements

- Execute the 23-test suite in a controlled Python environment and record the actual exit code/output.
- Add fixtures for repeated/reordered markers and unsupported SQL constructs, asserting fail-closed behavior where intended.
- Add an explicit lesson-key-to-course-id invariant in the parity validator and focused tests for cross-course mismatches.
- Add expected tuple arity checks for the relevant seed row schema.
- Keep PostgreSQL runtime/RPC/JWT/RLS integration testing as a separate layer rather than implying the pure helper suite covers it.

## Scope and safety

Documentation-only review. No test code, validator, workflow, migration, seed, lesson content, package/dependency file, Supabase project, database, Auth, RLS, grant, deployment, PR, merge, or main branch was changed. No CI run was dispatched and no test pass is claimed.

## Backup and branch references

- Work branch: `fix/kurmanji-ci-current-migration`
- Starting HEAD: `cdf9d1537260576547db489c321fff08317ce39b`
- Main observed before work: `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`
- Pre-work backup: `backup/b3-k157-scanner-unit-test-execution-readiness-before-2026-11-18`
- Post-work backup: recorded after the report commit.
