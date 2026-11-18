# B3-K141 — Kurmanji HTML and Protected-Content Alignment Review (2026-11-18)

## Scope and method

Read-only review of all 38 Kurmanji static lesson shells, their visible H1 titles and `data-lesson-key` attributes, the shared runtime loader, and the Test project's `public.lesson_content` rows. No lesson text was edited.

## Static page ↔ database title/key alignment

- Inspected all 26 Course 1 lesson files and all 12 Course 2 lesson files.
- All 38 expected files exist.
- Every page's `data-lesson-key` equals its own filename.
- All 38 page H1 titles match the corresponding Test database `lesson_content.title` values.
- The course plan link counts remain 26 and 12, respectively, with unique links and ordered first/last keys verified in K140.
- Database check: 38 rows in scope; no globally duplicated `lesson_key` values were found.

## Runtime content loading

The shared runtime:
1. Derives the Kurmanji course ID from the lesson filename pattern.
2. Uses the matching 26- or 12-item lesson order.
3. Requests `can_read_lesson_content` for the protected sequence check.
4. Loads `content_html` from `public.lesson_content` using the page's `data-lesson-key`.
5. Inserts the returned content into the `.lesson-content` container.

The static HTML pages are therefore lesson shells; the protected body is served from the database after the runtime's access path. The site-wide spelling normalizer explicitly skips nodes inside `.lesson-content`, so it does not rewrite the database lesson body during its normal page-text pass.

## Database content checks (Test only)

Target: `zanztkurd-kurmanji-test`, project ID `juwsjljbdwyncicybwoq`.

- 38 protected lesson rows reviewed; titles and body payloads are non-empty.
- Body lengths range from 2,000 to 6,351 characters in the returned aggregate.
- 0 globally duplicated lesson keys.
- 0 matches for the limited active-markup scan (`<script`, inline `on...=` attributes, or `javascript:`) in the 38 content bodies.
- The first heading inside each body is a section heading (for example, Course 1 Lesson 1 begins with `١. کورمانجی چیە؟`), not the database's page-level `title`. A first-heading-vs-title comparison therefore is not a valid mismatch test; this was checked against sample body starts and is documented to avoid a false positive.

## Defensive observation (not a current defect)

The runtime content query filters by `lesson_key` but does not additionally filter by `course_id`. This is unambiguous in the current dataset because the 38 keys are globally unique and include the course ID in the key. A future defensive improvement could pass the course ID into the content loader and filter by both columns. No code change is made because the current data does not demonstrate a collision and this audit is report-only.

## Limits

- This is static/source and read-only Test database evidence, not a live authenticated learner browser session.
- The active-markup scan is a narrow pattern check, not a full HTML sanitizer or security penetration test.
- No claims are made about pedagogical accuracy, source citation validity, or correctness of every example; those require a separate academic review.
- The proposed K137 full-prefix progression migration remains unapplied in Test and Production.

## Change and safety boundary

- No lesson body, title, key, HTML page, runtime code, database row, Auth setting, RLS policy, grant, or migration was changed.
- No user was created, no OTP/login was initiated.
- No Production database was queried or modified.
- No deployment, PR, merge, or main-branch update occurred.

## Repository and backups

- Repository: `avasinim/zanztkurd`
- Work branch: `fix/kurmanji-ci-current-migration`
- Pre-work backup: `backup/b3-k141-kurmanji-html-db-content-review-before-2026-11-18` at `0f0b05ec11c3311e67b9a46b9f1b075ef96ea153`
- Main baseline observed: `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`

This report records review findings only.
