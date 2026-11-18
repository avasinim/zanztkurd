# B3-K180 — Focused Test Execution Route and Current CI Coverage
Date: 2026-11-18
Branch: `fix/kurmanji-ci-current-migration`
Starting HEAD: `f63201e8dd2258b559b92a6252d355c1cf694fd2`

## Scope
Determine whether the repository currently offers a safe, available route to execute the focused lexer/parity tests at the current branch head, without changing workflow configuration or protected branches.

## Verified workflow contract
Read `.github/workflows/validate-kurmanji-package.yml` at the starting HEAD. It declares:
- push trigger with path filters;
- pull_request trigger with path filters;
- manual `workflow_dispatch` trigger;
- Python 3.x setup and installation of `pglast`;
- four execution steps: SQL parser, seed parity validator, package validator, and north-circle Playwright tests.

The workflow does **not** execute:
- `python scripts/test_kurmanji_sql_lexer.py`
- `python scripts/test_kurmanji_seed_parity.py`

Its push and pull-request path filters also omit:
- `scripts/kurmanji_sql_lexer.py`
- `scripts/test_kurmanji_sql_lexer.py`
- `scripts/test_kurmanji_seed_parity.py`

Thus, changes confined to the lexer or its focused tests do not automatically trigger this workflow under the current filters. The workflow's manual dispatch trigger could run the four configured checks, but would still not execute the two focused unittest modules.

## Execution feasibility in this session
- The runtime contains no local `zanztkurd` checkout.
- Repository clone/archive retrieval was previously unavailable in this runtime; this session again found no local checkout.
- GitHub connector file reads provide source text but do not create a complete executable repository checkout.
- The available GitHub Actions connector operations expose run inspection and rerun of failed jobs, but no workflow-dispatch operation. No run was dispatched or rerun.
- No tests or validators were executed in this session.

## Safe execution sequence once a complete checkout is available
From the repository root, run:
```bash
python scripts/test_kurmanji_sql_lexer.py
python scripts/test_kurmanji_seed_parity.py
python scripts/validate_kurmanji_seed_parity.py
python scripts/validate_kurmanji_sql.py
python scripts/validate_kurmanji_package.py
python scripts/test_north_circle_ui.py
```
Record the exact commit SHA, Python version, dependency versions, command exit codes, and complete output. Do not infer focused-test success from a prior workflow run that did not invoke those modules.

## Decision
The next safe technical gate is to execute the above commands in a complete checkout at the exact current HEAD. CI workflow edits are intentionally not made here: adding the focused tests and their source paths to workflow triggers changes CI configuration and remains separately approval-gated. «بەردەوام بە» is not treated as authorization for that protected change.

## Safety / non-actions
This report is documentation-only. No source, test, workflow, SQL, seed, lesson, website, database, deployment, PR, merge, or main changes were made.
Main remains `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`.
