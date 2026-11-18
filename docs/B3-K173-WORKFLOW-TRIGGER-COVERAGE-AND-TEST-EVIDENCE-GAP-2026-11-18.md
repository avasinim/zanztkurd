# B3-K173 — Workflow Trigger Coverage and Test Evidence Gap
Date: 2026-11-18
Branch: `fix/kurmanji-ci-current-migration`
Starting HEAD: `a383c357d788b6d5d0128315b606a536bc51ebd7`

## Scope
Read-only inspection of the existing workflow and its relationship to the two focused test modules. This report is documentation only.

## Confirmed workflow configuration
File: `.github/workflows/validate-kurmanji-package.yml`

- `workflow_dispatch` is enabled.
- `push.branches` includes `fix/kurmanji-ci-current-migration`.
- `pull_request.branches` targets `main`.
- Both push and pull_request path filters include the canonical validators, migration/seed paths, package files, and the browser test.
- Both path filters omit:
  - `scripts/kurmanji_sql_lexer.py`
  - `scripts/test_kurmanji_sql_lexer.py`
  - `scripts/test_kurmanji_seed_parity.py`

The workflow commands currently run:
1. `python scripts/validate_kurmanji_sql.py`
2. `python scripts/validate_kurmanji_seed_parity.py`
3. `python scripts/validate_kurmanji_package.py`
4. `python scripts/test_north_circle_ui.py`

It does not invoke either focused unittest module.

## Trigger implications
A documentation-only commit such as K172 does not match the listed push path filters. A change to the lexer implementation or either focused test file also does not match the current filters. Therefore an ordinary push containing only those files is not a dependable automatic trigger for this workflow. Manual dispatch is the existing no-config-change route, provided the maintainer selects the isolated branch.

The workflow's `workflow_dispatch` trigger does not itself run anything; a user must start it in GitHub Actions. No dispatch or rerun was performed here.

## Workflow run evidence limitation
The available commit-run lookup is explicitly limited to pull-request-triggered runs and returned no associated runs for K172 HEAD. This does not establish that no workflow runs exist for the branch, and it is not evidence of test success or failure. A full run-history listing or manual dispatch result is still needed.

## Validator integration status
The canonical seed parity validator still does not call the SQL lexer. Its marker extraction and row parsing remain separate. The K170/K171 integration blockers remain:
- actual checkout-based execution of both focused test modules;
- cross-module tests for exact preflight/apply block isolation and malformed/duplicate blocks;
- unchanged 38-key/12-overlay parity on the actual seed corpus;
- successful existing workflow run on the isolated branch.

Do not infer that the existing workflow passing would cover the omitted unit tests.

## Exact next execution plan
1. From GitHub Actions, manually dispatch **Validate Kurmanji course package** on `fix/kurmanji-ci-current-migration`.
2. Verify the run's branch and SHA before treating it as relevant.
3. Run the two omitted unit-test commands from a complete checkout.
4. Record outputs and exit codes.
5. Only then decide whether the lexer can be integrated into the canonical validator.
6. Any edit to workflow path filters or steps requires separate explicit approval.

## Safety
No workflow dispatch/rerun, workflow edit, application code change, SQL/migration/seed change, database operation, lesson-content edit, website edit, deployment, PR, merge, or main update was performed. No tests are claimed as passed.
