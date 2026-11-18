# B3-K169 — Complete-Checkout and Existing CI Execution-Path Audit
Date: 2026-11-18
Branch: `fix/kurmanji-ci-current-migration`
Starting HEAD: `65987d9352ad09431005f7e066a2be690e4cf95d`

## Scope
Determine whether the committed lexer and seed-parity unit tests can be executed against the current branch without changing CI configuration, production settings, or databases. This is a source/configuration and run-history audit only.

## Verified starting state
- Work branch HEAD: `65987d9352ad09431005f7e066a2be690e4cf95d`.
- `main`: `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`.
- K168 post-work backup exists at `65987d9352ad09431005f7e066a2be690e4cf95d`.
- Unique K169 pre-work backup created:
  `backup/b3-k169-checkout-execution-path-before-2026-11-18`.

## Findings

### 1. No complete checkout execution path is available in this session
The repository connector exposes repository file reads and Git data, but not a repository archive/clone materialization into the local execution environment. The local container has no network access. GitHub binary archive downloads are not supported by the repository fetch action. Therefore the complete working tree and its fixtures cannot be run locally in this session.

### 2. Existing GitHub Actions workflow has a manual trigger, but no dispatch action is available here
`.github/workflows/validate-kurmanji-package.yml` declares `workflow_dispatch`, so the repository workflow itself supports manual runs. The available GitHub connector actions in this session expose workflow/run reads and reruns, but no workflow-dispatch action. I did not attempt a direct API write or alter workflow configuration.

### 3. Existing workflow does not run the two focused unittest modules
The current workflow runs:
- `python scripts/validate_kurmanji_sql.py`
- `python scripts/validate_kurmanji_seed_parity.py`
- `python scripts/validate_kurmanji_package.py`
- `python scripts/test_north_circle_ui.py`

It does not invoke:
- `python scripts/test_kurmanji_sql_lexer.py`
- `python scripts/test_kurmanji_seed_parity.py`

The workflow installs `pglast` and Playwright, but does not add the two synthetic unittest commands. Adding those commands would require a CI workflow edit, which is outside the approved scope and remains unmodified.

### 4. Recent successful workflow runs are not proof for the current HEAD
The latest listed successful package workflow run is `44266415725` at commit `e32b863cce87e86aa968d7a3b460ce809552e956`, not current branch HEAD `65987d9352ad09431005f7e066a2be690e4cf95d`. Earlier successful runs are also attached to different commits. They cannot be reported as validation of K169 or the current branch head.

## Decision
Do not modify the CI workflow or claim tests passed. The best safe route to actual execution is to obtain a complete repository checkout in an environment with repository access, then run the two focused test modules and the canonical validators. Alternatively, a separately authorized CI change could add the missing unit-test commands to the existing workflow and ensure the relevant file paths trigger it. No such CI change is made here.

## Exact commands for a complete checkout
Run from the repository root:
```bash
python scripts/test_kurmanji_sql_lexer.py
python scripts/test_kurmanji_seed_parity.py
python scripts/validate_kurmanji_sql.py
python scripts/validate_kurmanji_seed_parity.py
python scripts/validate_kurmanji_package.py
```
The first two commands are the 29 lexer and 30 seed-parity synthetic unittest methods. The remaining commands exercise canonical validators and must be evaluated against the complete repository fixtures. Record exact outputs and exit codes; do not substitute isolated reconstructed harnesses for these runs.

## Validation and non-actions
- Read the current workflow file and recent Actions run metadata.
- Confirmed manual dispatch is declared in YAML but no dispatch action is available in this connector session.
- Confirmed current workflow omits both focused unittest commands.
- Confirmed latest successful workflow run belongs to a different SHA than current HEAD.
- Did not execute tests or validators.
- Did not change workflow, code, tests, migrations, seed data, lessons, website, or deployment configuration.
- No Test or Production database operation, PR, merge, or `main` update occurred.

## Next safe step
Continue read-only audits and prepare the integration patch/test cases without representing them as executed. To get real test evidence, use a complete checkout or separately authorize adding the two unittest commands and their path filters to the existing CI workflow. All database operations remain separately gated.
