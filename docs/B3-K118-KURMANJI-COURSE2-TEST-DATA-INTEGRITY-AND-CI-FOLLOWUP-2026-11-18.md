# B3-K118 — Kurmanji Course 2 Live Test-Data Integrity and CI Regression Follow-up

**Date:** 2026-11-18  
**Repository:** `avasinim/zanztkurd`  
**Working branch:** `fix/kurmanji-ci-current-migration`

## Scope

Follow up K117 by diagnosing the completed CI result, correcting the regression in the Course 1 synthetic browser test, inspecting all 12 Course 2 page shells and navigation, and performing read-only integrity checks against the isolated Test Supabase project. No lesson text or production data was changed.

## Backups and branch boundary

- K118 pre-work backup: `backup/b3-k118-ci-regression-diagnosis-before-2026-11-18`
- Pre-work HEAD: `d1a7df0dedbbebecef176299a7acf39731d9c4bd`
- Main baseline: `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`
- Corrective test commit: `0fcc8ae72a76f1f6de1bbed8cad03b05fbccf9f3`

## 1. K117 CI diagnosis and correction

The corrected K117 CI run `44252967674` completed with failure. Its SQL parser, migration/seed parity, package integrity, and Playwright installation steps succeeded. The browser suite had 9 passing tests and one failure.

The failure was in the existing Course 1 completion test, not in either new Course 2 test. A broad test-fixture replacement had caused the Course 1 assertion to read the Course 2 sessionStorage trace key. The Course 2 tests both passed in that run:
- Course 2 lesson 1 completion used the exact `kurmanji-course-2` ID and lesson-01 key, then navigated to lesson 2.
- Direct navigation to Course 2 lesson 3 redirected to lesson 1; the fixture confirmed lesson 3 was never queried.

Correction: restore the Course 1 test to read its original `__rpcCalls` sessionStorage key. No application runtime code was changed.

A new CI run was triggered on corrective commit `0fcc8ae72a76f1f6de1bbed8cad03b05fbccf9f3`:
- Run ID: `44253505615`
- URL: https://github.com/avasinim/zanztkurd/actions/runs/44253505615
- At report creation, SQL parsing, migration/seed parity and package validation had passed; Playwright browser installation was still running. Final result remains **pending**. Do not claim the suite is green until this run completes.

## 2. Static Course 2 page and navigation audit

Inspected all 12 root-level files:
`kurmanji-course-2-lesson-01.html` through `kurmanji-course-2-lesson-12.html`.

Results:
- All 12 expected lesson pages exist.
- Each page has a lesson-specific `data-lesson-key`, loading placeholder, H1, course/lesson sequence eyebrow, and protected runtime script.
- All 12 H1 titles correspond to the expected Course 2 lesson titles.
- The Course 2 plan page links to all 12 lesson pages exactly once; no missing or duplicate lesson link was found.
- The pages are shells. Lesson-body HTML is fetched by the protected loader from `public.lesson_content`; a static page check does not prove what a real learner sees after authentication.

The Kurmanji runtime explicitly maps Course 2 to `kurmanji-course-2` and 12 ordered lesson keys.

## 3. Read-only Test Supabase integrity check

Target: isolated `zanztkurd-kurmanji-test`, project ID `juwsjljbdwyncicybwoq`.

Read-only SQL grouped `public.lesson_content` by Course 2 lesson key and checked the expected sequence 01–12, duplicate keys, title/body non-emptiness and unexpected keys.

Result:
- Expected keys: 12
- Actual distinct keys: 12
- Expected keys present: 12
- Missing keys: 0
- Duplicate keys: 0
- Unexpected keys: 0
- Single, non-empty title/body rows: 12

All 12 rows have non-empty body payloads. Four rows (lessons 04, 06, 09, 10) show `updated_at` of 2026-11-18 06:24:48 UTC, consistent with the previously documented four Course 2 payload updates; the other eight retain the historical 2026-10-24 timestamp. This query did not update any rows and did not expose learner PII.

This confirms structural presence and non-empty content in the Test project. It is not a live authenticated learner session test, nor a proof that every lesson is linguistically release-certified.

## 4. Content-quality boundary retained

The existing Course 2 integrated evidence closure report classifies the 12-lesson course as **not release-certified**. Known pedagogical closure gaps include worked morphology paradigms, explicit direct/oblique and agreement-controller teaching, transcription/variety labelling, more developed negation/question examples, and a clear distinction between Lesson 12 review/self-assessment and a scored examination.

No lesson body was changed in K118. Those are editorial/linguistic decisions and must not be silently rewritten by a technical test task.

## 5. Safety and change inventory

- Only `scripts/test_north_circle_ui.py` received a corrective test-fixture change in K118.
- No lesson HTML, seed SQL, migration, runtime application code, schema, Auth settings, RLS, grants, Storage, workflow configuration, database rows, or learner accounts were changed.
- Test Supabase access was read-only.
- Production Supabase was not queried or modified in K118.
- No deployment, PR, merge, or main update occurred.

## Outcome and next gate

Course 2 has two dedicated synthetic browser regression tests, all 12 page shells and plan links are present, and the isolated Test project's 12 lesson rows are structurally complete and non-empty. The final CI result for corrective commit `0fcc8ae...` remains pending at the time of writing.

Next safe gate: wait for and verify CI run `44253505615`. If it passes, continue with read-only per-lesson payload/claim coverage and keep the Course 2 editorial closure separate from technical integrity.
