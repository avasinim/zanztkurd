# B3-K172 — Safe Manual Workflow Runbook and Test Evidence Gate
Date: 2026-11-18
Branch: `fix/kurmanji-ci-current-migration`
Starting HEAD: `b23b93abf639d3a0b2739041f6dd2c2edc354148`

## Goal
Provide a reproducible route to obtain real CI evidence without changing workflow configuration, protected branches, lesson content, SQL, or databases.

## Existing workflow
Workflow file: `.github/workflows/validate-kurmanji-package.yml`
Workflow name: `Validate Kurmanji course package`
Manual trigger: `workflow_dispatch`
The workflow's existing steps run SQL parsing, canonical seed parity, package validation, and north-circle Playwright tests.

## Manual dispatch runbook
A repository maintainer can start the existing workflow from GitHub:
1. Open the repository's Actions tab.
2. Select **Validate Kurmanji course package**.
3. Select **Run workflow**.
4. Choose branch `fix/kurmanji-ci-current-migration` (do not choose `main`).
5. Start the workflow and record its run URL and run ID.
6. Confirm the run's event is `workflow_dispatch`, branch is `fix/kurmanji-ci-current-migration`, and head SHA is the intended branch HEAD.
7. Inspect all job steps and logs; do not infer success from a green summary if any required step was skipped.

This is a manual UI action. No dispatch was performed by this audit; the connected GitHub tools available here expose workflow-run inspection and reruns, but not the workflow-dispatch endpoint.

## Coverage limitation
The existing workflow does not run:
- `python scripts/test_kurmanji_sql_lexer.py`
- `python scripts/test_kurmanji_seed_parity.py`

Those two commands must be run from a complete checkout before integration is considered. Since the current workflow does not include them, a successful manual dispatch is necessary evidence for the existing validator/package pipeline but is not evidence that the two focused unittest modules pass.

## Complete-checkout command sequence
Run from repository root on the same branch and record raw exit codes/output:
```bash
python scripts/test_kurmanji_sql_lexer.py
python scripts/test_kurmanji_seed_parity.py
python scripts/validate_kurmanji_sql.py
python scripts/validate_kurmanji_seed_parity.py
python scripts/validate_kurmanji_package.py
```

Required parity assertions to preserve:
- 38 baseline ordered lesson keys.
- 38 seed lesson keys.
- Exact 12-row overlay and expected preflight result.
- All 38 static lesson-page bindings.
- No duplicate or orphan lesson keys.

## Next gate
Do not wire the lexer into the canonical validator until:
1. the two committed unittest modules pass from the actual checkout;
2. cross-module regression tests cover the K170 matrix;
3. canonical validator parity output is unchanged on the real seed corpus;
4. the existing workflow passes on this isolated branch.

Adding focused tests to workflow commands and path filters is a CI configuration change and remains out of scope without separate explicit approval.

## Safety / work completed
This report is documentation only. No workflow dispatch, rerun, CI edit, code change, SQL change, database call, website edit, deployment, PR, merge, or main update was performed.
