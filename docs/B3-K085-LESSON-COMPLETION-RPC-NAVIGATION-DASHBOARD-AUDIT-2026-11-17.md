# B3-K085 — Kurmanji lesson completion, RPC, navigation and dashboard audit

Date: 2026-11-17  
Branch: `fix/kurmanji-ci-current-migration`  
Validated commit before this report: `9a4f6ece59cf5640288a654a485c89bcf82eb97a`

## Scope

Read-only review of the Kurmanji lesson-page completion flow, server RPC contract, next-lesson links, and dashboard progress key calculation. No lesson text, SQL migration, database, production setting, or deployment was changed.

## Findings

- Course 1 uses the `kurmanji-course-1` course ID and 26 ordered lesson keys of the form `kurmanji-course-1-lesson-XX.html`.
- Course 2 uses `kurmanji-course-2` and 12 ordered lesson keys of the form `kurmanji-course-2-lesson-XX.html`.
- Dashboard progress reads `lesson_progress.lesson_key` for the matching course ID and counts only the expected ordered keys for each Kurmanji course.
- The lesson-page completion action calls the `complete_lesson` RPC with `p_course_id` and `p_lesson_key`; the next-lesson navigation is a separate page link.
- No mismatch was found in the checked-in identifiers between the Kurmanji lesson pages, the server migration contract and dashboard key generation.
- The new browser regression test exercises the Course 1 first-lesson completion flow with a synthetic authenticated/enrolled learner. It verifies exactly one `complete_lesson` call with `kurmanji-course-1` and `kurmanji-course-1-lesson-01.html`, then verifies navigation to `kurmanji-course-1-lesson-02.html`.
- The test fixture preserves its RPC trace in sessionStorage because navigation reloads the page context.

## Verification

GitHub Actions run: https://github.com/avasinim/zanztkurd/actions/runs/44088113520

Result: success. The workflow completed PostgreSQL parsing of migration/seed SQL, exact migration/seed parity checks, Kurmanji lesson-page and seed-key validation, Playwright browser installation, and the north-circle browser regression suite.

## Limits

This is a repository/static audit plus browser testing against a synthetic Supabase client. It is not a live production database query and does not prove the live database's current rows, grants, or policies. The new completion/navigation regression directly exercises Course 1 lesson 1 to lesson 2; Course 2 identifiers and dashboard counting were statically inspected, not independently browser-driven in this test. No claim is made about deployment or production runtime.

## Change and safety boundary

The K-085 code change is confined to `scripts/test_north_circle_ui.py` and adds a browser regression test. No application behavior or lesson content was changed for K-085. No SQL migration, production database, deployment, CI workflow definition, or `main` branch was modified.
