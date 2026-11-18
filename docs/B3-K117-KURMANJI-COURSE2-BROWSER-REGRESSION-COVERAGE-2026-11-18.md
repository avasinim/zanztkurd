# B3-K117 — Kurmanji Course 2 Browser Regression Coverage

**Date:** 2026-11-18  
**Scope:** Add synthetic Playwright coverage for the Kurmanji Course 2 (12-lesson) learner journey. The tests stub Supabase locally and do not contact the test or production projects.

## Repository and backups

- Repository: `avasinim/zanztkurd`
- Working branch: `fix/kurmanji-ci-current-migration`
- Starting HEAD: `b8be62364263b3b0111d53ebd7db90f58543c49b`
- Main at audit start and after code changes: `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`
- Pre-work backup: `backup/b3-k117-course2-browser-coverage-before-2026-11-18` at `b8be62364263b3b0111d53ebd7db90f58543c49b`
- Code/test commit: `b5e97af8d5b370fb83cd150ea6a00d7c6a3a3ba3`, followed by test-fixture corrections `42e86993aaef0fd912dc02dc30bd73ac588d07d6` and `7372fdfa1e0438b33aa81a3232f4d82949edc366`.

## Findings from runtime review

The Kurmanji-specific shared runtime contains explicit course definitions:
- Course 1: `kurmanji-course-1`, 26 ordered lesson pages.
- Course 2: `kurmanji-course-2`, 12 ordered lesson pages.

The Kurmanji-specific completion gate is separate from an older generic Course 2 runtime for a different course ID (`phonetics-phonology-kurdik`). The tests deliberately exercise the Kurmanji-specific page names and verify that Course 2 uses `kurmanji-course-2`, not the legacy ID.

## New browser tests

Two synthetic Playwright tests were added to `scripts/test_north_circle_ui.py`:

1. **Course 2 completion and unlock**
   - Opens Kurmanji Course 2 lesson 1 with a synthetic enrolled learner.
   - Clicks the Kurmanji completion control.
   - Verifies the RPC payload is exactly `p_course_id=kurmanji-course-2` and `p_lesson_key=kurmanji-course-2-lesson-01.html`.
   - Persists the synthetic completion in the fixture and verifies navigation to lesson 2.

2. **Direct out-of-sequence access**
   - Opens Kurmanji Course 2 lesson 3 with no completed progress.
   - Verifies redirect to lesson 1, the first incomplete lesson.
   - Verifies the lesson-content query list contains only lesson 1; lesson 3 content is never requested.

These are mocked browser-flow tests. They do **not** prove live Auth, live RLS, live database persistence, or real SMS/email delivery.

## CI history and current verification status

The first CI run (`44252818165`, commit `b5e97af...`) failed on both new tests:
- The completion trace was not yet persisted across navigation in the fixture.
- The redirect test incorrectly asserted that the redirected-to, unlocked lesson 1 should not render its content.

The next run (`44252840113`, commit `42e8699...`) confirmed the Course 2 completion/RPC/unlock test passed; the only remaining failure was the incorrect assertion about the unlocked lesson 1. That assertion was removed and the redirect test continues to assert that lesson 3 was never queried.

The corrected commit `7372fdfa1e0438b33aa81a3232f4d82949edc366` triggered CI run:
- Run: `44252967674`
- URL: https://github.com/avasinim/zanztkurd/actions/runs/44252967674
- At report creation, the run had completed SQL parsing, migration/seed parity, and package validation successfully; Playwright installation was still in progress, so the final browser-test result was **pending**.

Do not treat the pending run as a pass. Re-check this run before claiming K117's CI is green.

## Safety boundary

- No source lesson text, Kurmanji course HTML, runtime logic, SQL migration, database rows, Auth accounts, provider settings, RLS policies, grants, Storage, CI configuration, deployment, PR, merge, or production project was changed.
- Only `scripts/test_north_circle_ui.py` was changed.
- The synthetic tests use `example.invalid` and local stubs; no external Supabase request is intended.

## Outcome

Course 2 now has dedicated browser regression coverage for server-RPC completion and direct out-of-sequence protection. Final CI verification for corrected commit `7372fdfa...` remains pending at the time this report was written.
