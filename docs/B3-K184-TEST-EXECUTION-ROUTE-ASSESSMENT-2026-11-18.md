# B3-K184 — Test Execution Route Assessment
Date: 2026-11-18
Repository: `avasinim/zanztkurd`
Work branch: `fix/kurmanji-ci-current-migration`
Starting HEAD: `5c3ff84de4dc0ebe589f813c36e2daa977481487`

## Result
The repository source and test modules can be inspected through the connected GitHub file API, but this session has no complete writable checkout or supported command runner for executing repository Python scripts. The local container cannot fetch GitHub archives because its network is disabled, and the GitHub file-fetch interface returns text files rather than a materialized repository tree. The available GitHub connector exposes workflow run/job/log/artifact reads and rerun operations, but no workflow-dispatch operation or shell/Actions runner.

Therefore K184 identifies a viable execution route but cannot execute it from this session without an authorized external checkout/runner.

## Verified repository facts
- The isolated branch started at `5c3ff84de4dc0ebe589f813c36e2daa977481487`; `main` remains `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`.
- `scripts/kurmanji_sql_lexer.py` exists and exports `Token`, `tokenize_sql(source)`, `find_sql_marker(source, marker, start=0)`, and `find_dollar_quoted_do_block(source, tag, start=0)`.
- `scripts/test_kurmanji_sql_lexer.py` imports those lexer helpers directly.
- `scripts/test_kurmanji_seed_parity.py` dynamically loads `scripts/validate_kurmanji_seed_parity.py` and tests its helper functions.
- `scripts/validate_kurmanji_seed_parity.py` currently uses `str.find()` for the INSERT/VALUES/ON CONFLICT markers and for marker-delimited preflight VALUES extraction; it does not import the lexer in the inspected source.
- `.github/workflows/validate-kurmanji-package.yml` has `workflow_dispatch`, but its push/PR path filters do not include `scripts/kurmanji_sql_lexer.py`, `scripts/test_kurmanji_sql_lexer.py`, or a future integration-test module. Its job runs SQL parse, parity, package validation, and north-circle browser tests, but not the standalone lexer test module or seed-parity helper test module.

## Execution options and decision
1. **Preferred:** obtain a full checkout of the isolated branch in a trusted local/CI runner and run the K183 command list there. Record Python version, dependency installation, exact HEAD, each command exit status, and logs. Do not use production credentials; the validators are intended to be read-only.
2. **Existing Actions workflow:** a manual dispatch could run the current package validators, but it still would not execute the two standalone unit-test modules or the proposed integration test. No dispatch action is available in this session, and no dispatch was attempted.
3. **Future CI improvement:** add the lexer and test modules to workflow path filters and job steps only after the user separately authorizes CI changes. Do not treat a documentation-only push as a test run.

## Safe next implementation sequence
- First create a full isolated checkout and confirm branch/HEAD match.
- Inspect complete validator functions and migration block markers in that checkout.
- Implement the K183 synthetic fixture module and lexer integration behind the existing validator interface.
- Run the lexer, helper, integration, canonical parity, SQL, package, and browser checks.
- Review the diff to ensure no lesson content, seed payload, migration, or production configuration changed.
- Keep all DB operations out of this sequence; static validators need no database connection.
- Report each command independently; never infer a test pass from a workflow that did not run that test.

## Constraints / no-op record
No workflow was dispatched or rerun. No CI configuration was changed. No Python test, validator, SQL parser, browser test, or database operation was run. No migration, seed, lesson, application source, PR, merge, deployment, or `main` write occurred. This document is an execution-route assessment only.
