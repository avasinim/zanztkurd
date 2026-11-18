# B3-K171 — Workflow Execution and Validator Integration Gate Correction
Date: 2026-11-18
Branch: `fix/kurmanji-ci-current-migration`
Starting HEAD: `b87c24b4607139d10569c97fcad4bc2ccda63d9f`

## Purpose
Reconcile the K169/K170 execution-path statements against the actual workflow file and set the next safe integration gate. This is a documentation-only audit.

## Verified workflow
The repository workflow is `.github/workflows/validate-kurmanji-package.yml` (not `.github/workflows/ci.yml`; that guessed path does not exist).

Verified workflow properties:
- Has `workflow_dispatch`.
- Checks out the repository with `actions/checkout@v4`.
- Installs Python and `pglast`.
- Runs `python scripts/validate_kurmanji_sql.py`.
- Runs `python scripts/validate_kurmanji_seed_parity.py`.
- Runs `python scripts/validate_kurmanji_package.py`.
- Installs Playwright and runs `python scripts/test_north_circle_ui.py`.
- Its push and pull_request path filters include the canonical seed parity validator, but omit both focused unittest modules:
  - `scripts/test_kurmanji_sql_lexer.py`
  - `scripts/test_kurmanji_seed_parity.py`

Therefore the workflow does provide an existing CI execution path for the canonical validator and package checks. It does not currently execute the two focused unittest modules. The GitHub connector tools available in this session provide workflow-run inspection and rerun actions, but no workflow-dispatch action. No workflow was dispatched in this audit.

## Canonical validator integration findings
The inspected canonical validator still imports no lexer functions. It uses raw `str.find()` boundaries for INSERT/VALUES/ON CONFLICT and for the preflight/apply DO markers. The lexer locator remains preparatory.

The K170 regression contract remains appropriate:
- locate exact preflight/apply dollar-quoted blocks;
- reject missing, duplicate, malformed, or misordered reserved blocks;
- confine preflight and apply extraction to their own bodies;
- keep baseline and split-seed parsing unchanged;
- prove current 38 baseline keys, 38 seed keys, exact 12-row overlay/preflight, and 38 static page bindings.

Important limitation: this integration would harden DO-block selection only. It would not turn the existing row scanners into a complete PostgreSQL parser.

## Execution status
No complete checkout was available in the runtime during this audit. No committed unittest module, canonical validator, PostgreSQL parser, or CI workflow was executed. No test pass is claimed.

A valid next execution route exists in principle: the existing `validate-kurmanji-package.yml` workflow can be manually dispatched from GitHub's UI, or the repository can be checked out in a suitable local environment. Until the two focused tests are run against the actual checkout and the regression matrix is covered, do not integrate the lexer into the canonical validator.

## Scope and safety
- Documentation only: this report is the sole intended file change.
- No CI workflow edit or dispatch.
- No SQL migration, seed, lesson content, or website change.
- No Test or Production database operation.
- No PR, merge, deployment, or `main` update.

## Recommendation
First obtain a real complete checkout and run:
```bash
python scripts/test_kurmanji_sql_lexer.py
python scripts/test_kurmanji_seed_parity.py
python scripts/validate_kurmanji_sql.py
python scripts/validate_kurmanji_seed_parity.py
python scripts/validate_kurmanji_package.py
```
Then add and run cross-module regression cases before the narrowly scoped integration. If using the existing workflow, explicitly add the two focused unittest commands and their path filters only after separate approval for CI changes.
