# B3-K175 — GitHub Actions Run Evidence and Current-Head Coverage
Date: 2026-11-18
Branch: `fix/kurmanji-ci-current-migration`
Inspected HEAD: `744362f5e2c4e3b8e43f4de7c812ef70b5191229`

## New finding: complete branch run history is accessible
The GitHub Actions run-list endpoint was successfully queried for this branch. It returned 60 runs (first page contained all 60). This corrects the narrower K173 commit-run lookup limitation: that wrapper only returns pull-request-triggered runs, whereas the repository Actions runs endpoint exposes push runs.

## Latest inspected workflow runs
### Run #936 — successful
- Run ID: `44266415725`
- URL: https://github.com/avasinim/zanztkurd/actions/runs/44266415725
- Event: `push`
- Branch: `fix/kurmanji-ci-current-migration`
- Exact tested SHA: `e32b863cce87e86aa968d7a3b460ce809552e956`
- Created: `2026-11-18T08:22:27Z`
- Job `kurmanji-package-integrity`: success.
- All configured steps succeeded: PostgreSQL parser, seed parity validator, package validator, Playwright installation, browser regression suite.
- SQL parser reported the historical migration as 11 statements, reconciliation migration as 4, full-prefix migration as 10, and all split seed files parsed.
- Seed parity reported 38 historical baseline tuples and 38 seed tuples with expected ordered keys; exact 12-row overlay and preflight; all 38 static H1 headings and protected lesson-content keys matched.
- Package validator reported all 38 lesson pages and canonical migration rows present and consistent.
- Browser suite reported 11 tests run, all successful.

This is genuine CI evidence for the exact SHA above, not for the later K172/K173/K174 documentation-only HEAD.

### Run #935 — failed, then corrected by #936
- Run ID: `44266381259`
- URL: https://github.com/avasinim/zanztkurd/actions/runs/44266381259
- Exact tested SHA: `68db187f9d535aa4cf27199035a811e592113c22`
- SQL parser step passed.
- Seed parity step failed with:
  `ERROR: unexpected Kurmanji lesson key: kurmanji-course-1-lesson-01.html`
- Package and browser steps were skipped.
- The following successful run #936 tested the later commit and passed the configured pipeline.

## What this evidence does and does not establish
Established for SHA `e32b863cce87e86aa968d7a3b460ce809552e956`:
- PostgreSQL SQL syntax checks passed.
- Existing canonical seed parity checks passed (38 baseline, 38 seed, exact 12-row overlay).
- Existing package validator passed.
- 11 browser regression tests passed.

Not established:
- No evidence that the focused modules `scripts/test_kurmanji_sql_lexer.py` or `scripts/test_kurmanji_seed_parity.py` were invoked by that workflow; their commands are absent from the workflow definition.
- No CI run was found for current HEAD `744362f5e2c4e3b8e43f4de7c812ef70b5191229`. Recent K172–K175 changes are documentation-only and omitted by the workflow path filters.
- No evidence that the canonical validator imports or uses the SQL lexer.
- CI static checks do not prove live database/RPC/RLS/JWT behavior.

## Recommended next step
Use the existing manual `workflow_dispatch` on the current isolated branch if a fresh CI result is required, then execute both focused test modules from the runner or a complete checkout. The GitHub connector has read access to Actions runs/jobs/logs but no workflow-dispatch action; no dispatch or rerun was performed.

## Safety
No source code, workflow configuration, SQL, seed, lesson content, website, database, deployment, PR, merge, or main branch was changed. This report is documentation only. No local unit tests are claimed as executed.
