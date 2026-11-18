# B3-K158 — Scanner Test Fixture Defect Diagnosis and Correction
Date: 2026-11-18

## Executive result

K158 investigated the K154 scanner unit-test suite rather than assuming that source-level readiness implied passing tests. An isolated local harness using the four helper implementations copied from the checked-in validator reproduced two fixture defects in the 23-case suite:

1. The marker-delimited VALUES fixture contained one extra closing parenthesis, so the test's expected-valid input was structurally malformed for the scanner's selected end marker.
2. The unterminated-string fixture accidentally contained a closing apostrophe after `k1,`, so it was not actually an unterminated SQL string.

Both fixture inputs were corrected in `scripts/test_kurmanji_seed_parity.py`. No validator helper implementation was changed.

After correction, all 23 test cases passed in the isolated helper harness. This is not a claim that the canonical repository script was executed end-to-end: the complete repository checkout/full validator module was not available in the local runtime, and GitHub clone access from the container was unavailable. The run used the helper implementations reproduced from the source review and a local test harness mirroring the checked-in 23 cases.

## Exact corrections

- `ExtractValuesRowsTests.test_extracts_marker_delimited_values`: removed the redundant closing parenthesis from the fixture prefix. The `END = ") AS expected"` marker now supplies the outer close exactly once.
- `ExtractValuesRowsTests.test_unterminated_string_fails`: changed the fixture from `'k1,'c1)` (which closes a string before `c1`) to `'k1,c1)` (which truly leaves the string unterminated before the end marker).

## Verification performed

- Initial isolated harness: 23 cases; 21 passed, 1 failed, 1 errored.
- Failure analysis traced both outcomes to malformed test fixture construction, not a demonstrated defect in the four scanner helper implementations.
- After the two fixture corrections: 23 cases executed; 23 passed; 0 failures; 0 errors.
- No PostgreSQL parser, database, Supabase, JWT, RLS, Auth, migration, or live CI run was performed.
- The canonical `python scripts/test_kurmanji_seed_parity.py` command still needs execution against a complete checkout to establish the repository-native result.

## Scope of code change

Only `scripts/test_kurmanji_seed_parity.py` changed, with two fixture-string corrections. The validator `scripts/validate_kurmanji_seed_parity.py`, workflow, SQL files, seeds, lessons, dependencies, and database were not changed.

The test remains absent from the CI workflow. Adding its path filters and invocation is a separate workflow configuration change requiring explicit approval. The four SQL path-filter omissions from K156 also remain unchanged.

## Safety and release boundary

No workflow file edit, CI dispatch, SQL execution, migration apply, Test or Production database write, Auth/RLS/grant change, deployment, PR, merge, or main-branch update occurred. The proposed full-prefix progression migration remains unapplied.

## Backup and branch references

- Work branch: `fix/kurmanji-ci-current-migration`
- Starting HEAD: `d8154a69bfcdc3079d8ff308988787dc65dfb4e8`
- Main observed before work: `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`
- Pre-work backup: `backup/b3-k158-unit-test-execution-method-audit-before-2026-11-18`
- Post-work backup: recorded after this report commit.
