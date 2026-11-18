# B3-K128 — CI Playwright installation stall diagnosis

Date: 2026-11-18  
Branch: `fix/kurmanji-ci-current-migration`  
Starting HEAD: `3861c3fda525b69fd4f0ec90f99e30e5a8c57ebf`

## Purpose

Investigate the outstanding GitHub Actions run triggered by K127 without changing the workflow, code, or CI configuration.

## Run under review

- Run: [44257368596](https://github.com/avasinim/zanztkurd/actions/runs/44257368596)
- Commit: `cfdaa0cc10dbf781250f08a32918ebe4ab5c66cb`
- Workflow: `Validate Kurmanji course package`
- Created: `2026-11-18T07:14:49Z`
- Latest readable status during this audit: `in_progress`
- Last readable update: `2026-11-18T07:14:52Z`

## Evidence

The run's job summaries showed these steps completed successfully:

1. Checkout repository
2. Set up Python
3. Install PostgreSQL SQL parser
4. Parse Kurmanji migration and seed SQL
5. Verify migration/seed row parity
6. Validate Kurmanji lesson pages and seed keys

The run remained at **Install Playwright browser tests**. The next step, **Run north-circle browser regression tests**, had not started. The workflow definition shows the install step executes:

```sh
python -m pip install --upgrade pip playwright
python -m playwright install --with-deps chromium
```

The job-log download endpoint returned HTTP 404 / BlobNotFound while the job was still reported in progress. Therefore the underlying cause (network stall, package installation, browser/dependency download, runner issue, or stale GitHub job state) cannot be distinguished from the available evidence. No root cause is asserted.

A previous run, [44253505615](https://github.com/avasinim/zanztkurd/actions/runs/44253505615), completed successfully through both Playwright installation and the browser regression test step. This confirms the workflow has succeeded before, but does not prove the K127 test passes.

## K127 code review boundary

The K127 test is present in `scripts/test_north_circle_ui.py`. It covers unauthenticated, unenrolled, sequence-denied, and mocked content-RLS-denied Course 2 lesson access. The SQL parsing, seed parity, and static page/key validations completed successfully in run 44257368596, but the new browser test itself has not yet been executed by that run.

## Recommended next action

Do not modify the workflow or add caching/timeouts blindly based only on a missing log artifact. First obtain a fresh terminal status or a new controlled CI attempt and its logs. If the installation step fails again, use the actual error output to decide whether to adjust dependency installation, browser setup, or runner configuration. Any workflow change should remain isolated on the work branch and be separately verified.

## Safety boundary

- No CI workflow or runner configuration was modified.
- No code or lesson content was modified in K128.
- No database, Auth, RLS, migration, or learner account was accessed or changed.
- No workflow was cancelled or rerun by this audit.
- No deployment, pull request, merge, or `main` update was performed.
