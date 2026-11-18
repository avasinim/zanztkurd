# K197 — Isolated read-only Test Supabase browser smoke-test proposal

**Date:** 2026-11-18  
**Repository:** `avasinim/zanztkurd`  
**Working branch:** `fix/kurmanji-ci-current-migration`  
**Starting HEAD:** `e854514358b6faf409b5ed768a2031102485ab5a`  
**Pre-work backup:** `backup/b3-k197-isolated-test-browser-config-before-2026-11-18`  
**Status:** Documentation-only implementation plan. No app configuration, test code, secrets, database rows, migrations, deployment, or learner content changed.

## 1. Why this is needed

The current root `supabase-config.js` points at the production Supabase project. The Kurmanji lesson pages load the shared `script.js`, which dynamically loads that root config when Supabase is not already initialized. Separately, the Test project has been verified to contain 26 Course 1 rows and 12 Course 2 rows, all with non-empty `content_html`.

The existing Playwright browser suite deliberately intercepts `supabase-config.js` and supplies an `example.invalid` URL plus synthetic Supabase methods. This is useful for deterministic UI and access-control regression tests, but it does **not** test a real connection to the Test project or verify that its RLS policies return the stored lesson content in a browser.

## 2. Required isolation boundary

The next implementation should add an opt-in browser smoke test that is completely separate from the production site configuration:

- Keep root `supabase-config.js` unchanged.
- Keep the existing mocked Playwright suite unchanged and deterministic.
- The new test runner must require explicit Test-only environment variables:
  - `AVASIN_TEST_SUPABASE_URL`
  - `AVASIN_TEST_SUPABASE_PUBLISHABLE_KEY`
  - `AVASIN_TEST_STUDENT_EMAIL`
  - `AVASIN_TEST_STUDENT_PASSWORD`
- The Playwright context must intercept only the browser request for `supabase-config.js` and fulfill it with a generated JavaScript config built from those environment variables. Never write the Test credentials or key into tracked files, HTML, logs, artifacts, screenshots, or commit messages.
- Fail closed if any variable is absent, if the URL does not match the explicitly approved Test project, or if it resolves to the production project.
- Use only the Test project's publishable/anon key. Never use a service-role or secret key in browser automation.
- The runner must use an isolated test account that already has enrollment in both Kurmanji courses. Do not create accounts, enroll users, change settings, or write progress as part of this smoke test.
- CI secrets must be configured only after explicit confirmation that the selected GitHub repository/environment is the intended test-only target. The workflow must not expose these values to pull requests from forks or untrusted contexts.

## 3. Read-only browser assertions

The smoke test should run against a local static server and the existing lesson HTML, while routing the Supabase config request to the Test project. It should:

1. Confirm the configured project URL is the expected Test project before opening a lesson.
2. Sign in using the dedicated Test learner account without registering or modifying the account.
3. Open Course 1 lesson 01 and Course 2 lesson 01; verify the page passes the normal authentication, enrollment, and lesson-sequence gates.
4. Verify each lesson's `.lesson-content` contains actual HTML returned by `lesson_content`, not the loading placeholder or a generic error.
5. Read the first and last lesson keys of each course to check the full 26/12 boundary without marking lessons complete.
6. Confirm the rendered page reports the correct `data-lesson-key` and the content query is scoped to that key.
7. Verify a logged-out browser cannot retrieve protected lesson content.
8. Verify an unenrolled Test account cannot retrieve protected content, if a separately provisioned unenrolled fixture account is already available.
9. Capture only non-sensitive pass/fail diagnostics. Do not save page HTML, credentials, session tokens, or lesson body text to CI artifacts.

The smoke test must not click completion controls or call `complete_lesson`, `lesson_progress` writes, enrollment mutations, admin RPCs, migrations, or seed scripts.

## 4. Workflow integration

Add a separate manual-only workflow job or workflow-dispatch path for the real Test browser smoke test. It should:

- Be opt-in through `workflow_dispatch` (not an automatic deployment trigger).
- Run only from the protected working branch or an explicitly protected environment.
- Require environment-scoped Test secrets and fail before starting the browser if they are missing.
- Use a dedicated job with read-only repository permissions.
- Avoid exposing secrets to untrusted pull requests.
- Keep the current local mock-based browser regression step unchanged.
- Upload no browser trace, storage state, screenshot, or HTML artifact containing authenticated session data.

A successful run would prove the browser can read the Test project's protected lesson content. It would not authorize production changes or imply that the production site is connected to Test.

## 5. Acceptance criteria

- [ ] Root production `supabase-config.js` has no diff.
- [ ] Production project URL and publishable key remain unchanged.
- [ ] No service-role key or Test credential is committed.
- [ ] Existing mock-based Playwright tests still pass.
- [ ] Test runner rejects missing credentials and any non-Test URL.
- [ ] Authenticated enrolled Test learner can read the first and last lesson of both courses.
- [ ] Logged-out and unenrolled fixtures cannot read protected lesson content.
- [ ] No completion, enrollment, progress, seed, migration, or other database writes occur.
- [ ] No deployment, merge to `main`, or production operation occurs.

## 6. Current verified baseline and limitations

- Test project: `zanztkurd-kurmanji-test` (project ref `juwsjljbdwyncicybwoq`).
- Test database contains 26 rows for `kurmanji-course-1` and 12 rows for `kurmanji-course-2`; no empty lesson bodies were found in the read-only count query.
- Root browser config currently targets a different Supabase project, so the public site must not be used as a Test browser target.
- Existing Playwright tests use mocked Supabase responses and do not prove live Test-project browser connectivity.
- No dedicated Test learner credentials or GitHub environment secrets have been verified in this task.

## 7. Explicit non-goals

This proposal does not change any lesson text, course inventory, RLS policy, RPC, Supabase configuration, user enrollment, progress, production data, deployment, or PR #3. It does not approve the outstanding Course 1 editorial decisions or any migration execution.
