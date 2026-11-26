# Dengnasî course index and lesson-page wiring validation — 2026-11-26

## Scope

Static repository validation on `integration/dengnasi-content-bridge-plan-2026-11-25`. No production database, production deployment, or GitHub Pages release was changed or triggered.

## Course index

- Replaced the obsolete “under preparation” hold page at `kurmanji-dengnasi-course.html` with a Kurmancî Latin course index.
- The page contains exactly 27 unique lesson links in the expected numerical order.
- Each lesson entry displays the source's printed page range.
- The page explains that the course is organized from the source's topics and structure, but is not a PDF page-splitting exercise or verbatim book embedding.
- The page does not include tests, quizzes, questions, or exercises.
- The former hold-page wording is absent.

## Standalone lesson pages

All 27 lesson wrappers were inspected:

- Each has exactly the matching `data-lesson-key`.
- Each mounts a `.lesson-content` container.
- Each loads the shared `script.js`.
- All 27 stale hero descriptions that claimed the book text was preserved verbatim and that the PDF opens as the lesson were replaced with accurate wording: the lesson is organized from the book's sections and topics, paraphrased in Kurmancî Latin, with source information and distinctions preserved.
- The lesson-page wrappers and course index remain noindex; no public release was made.

## Payload and database parity

- The 27-row payload was compared with all 27 rows in the disposable test project's `public.lesson_content` table.
- All 27 `title` values and all 27 `content_html` bodies matched exactly.
- Every payload body contains headings and a source citation.
- The payload-body scan found no Arabic-script characters, script/iframe/form/input/audio/video tags, inline event-handler attributes, or `javascript:` URLs.
- The test database has 27 substantial lesson bodies and no PDF iframe wrappers for this course.

## Loader and access

- The Dengnasî-specific early-return hold guard is absent from `loadProtectedLessonContent`.
- The generic Supabase `lesson_content` query and `content_html` selection remain present.
- The existing protected-access path was not weakened.
- Rollback-only test-project RLS probes are documented in `docs/DENGNASI-RLS-VERIFICATION-2026-11-26.md`.

## Remaining limits

- No browser/Playwright end-to-end test with real Supabase Auth sessions has been run.
- The separate `kurmanji-dengnasi-reader.html` remains a PDF reference reader; it is not linked from the new course index or the lessons catalog. The learner-facing course route is now the 27-lesson index.
- GitHub Pages deployment and live URL rendering have not been independently verified.
- Production Supabase content parity has not been queried or established.

## Outcome

Static course navigation and lesson-wrapper wiring are prepared on the integration branch. The 27 lesson bodies in the disposable test project match the reviewed payload exactly, and the database-side access/progression probes passed. Keep PR #89 Draft/Open/Unmerged, leave `main` unchanged, and do not apply production migrations or deploy without separate explicit approval.


## Browser smoke-test harness — 2026-11-26

- Added `scripts/test_dengnasi_course_ui.py` with local Playwright coverage for the 27 content bodies, ordered course links, signed-out and non-enrolled redirects, and a locked second-lesson redirect.
- The harness uses a local Supabase stub populated from the reviewed payload. It does not contact Supabase and does not replace the database-side RLS probes.
- Updated `.github/workflows/validate-dengnasi-course.yml` to run the browser smoke suite when the course pages, shared loader, payload, or test script change.
- No workflow run is recorded for this branch yet; the suite has not been executed in GitHub Actions or a local browser in this turn.
