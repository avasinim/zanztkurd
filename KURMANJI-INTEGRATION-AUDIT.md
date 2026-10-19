# Kurmanji course integration audit

**Branch:** `kurmanji-courses`  
**Status:** implementation audit only; this file does not change the live Supabase project.  
**Scope:** Kurmanji Course 1 (26 lessons) and Course 2 (12 lessons).

## Confirmed repository state

- Static course pages exist: `kurmanji-course-1.html`, `kurmanji-course-2.html`, and 38 lesson HTML files.
- The lesson pages currently contain their lesson body directly in HTML. The first inspected page, `kurmanji-course-1-lesson-01.html`, does not use the shared `.lesson-content` placeholder for server-loaded content.
- The shared `script.js` protected-target predicate only recognizes legacy `017.html`–`058.html` pages and `course-2-NN.html` pages.
- The shared script maps those targets to the two existing course IDs only: `orthography-kurdik` and `phonetics-phonology-kurdik`.
- Supabase `public.lesson_content` currently has 42 rows for `orthography-kurdik` and 32 rows for `phonetics-phonology-kurdik`; no Kurmanji course rows were returned in the audited course/content inventory.
- `public.can_read_lesson_content(text,text)` and `public.complete_lesson(text,text)` currently enumerate only the two existing course IDs. They reject unknown IDs.
- The `lesson_content` SELECT policy depends on enrollment and `can_read_lesson_content`; simply adding course rows without adding the correct RPC sequence and lesson content will not make the Kurmanji courses work.

## Security and readiness finding

**Do not describe the 38 Kurmanji lessons as Supabase-protected yet.** Their HTML body is currently embedded in static files, and the shared access gate does not recognize their filenames. Link-level restrictions alone would not protect direct URL access.

No live database rows, policies, or functions were changed during this audit.

## Required implementation order

1. **Preserve the source HTML.** Extract each lesson's exact title and body without correcting or rewriting its academic text. Keep a source-to-target mapping for all 38 lesson keys.
2. **Add a reviewed SQL migration on this branch.** Register the two Kurmanji courses (26 and 12 lessons), insert all 38 exact lesson bodies into `public.lesson_content`, and extend `can_read_lesson_content` and `complete_lesson` with separate ordered key arrays. Existing Kurdish-course ordering and completion-count logic must remain unchanged.
3. **Update the shared access script.** Recognize `kurmanji-course-1-lesson-NN.html` and `kurmanji-course-2-lesson-NN.html`, map each to its own course ID, and keep the progression check aligned with the database RPCs.
4. **Convert the 38 pages to protected shells.** Remove embedded lesson bodies from the static pages only after exact content has been transferred and verified in the database migration; use the shared `.lesson-content` loading mechanism and stable lesson keys.
5. **Verify RLS and authorization.** Test anonymous direct URL, signed-in but unenrolled user, enrolled user at lesson 1, next lesson before prerequisite completion, next lesson after completion, owner bypass, and the final lesson/completion status for both courses.
6. **Verify preservation.** Compare all 38 source bodies against migration payloads; check 26 + 12 unique lesson keys, exact titles, navigation, no missing rows, and no duplicate keys.
7. **Only after branch review:** apply the migration to a test project first, run SQL/security advisors, and then request explicit approval before any live-project change or PR merge.

## Acceptance checks

- Course registry: `kurmanji-course-1` = 26 lessons; `kurmanji-course-2` = 12 lessons.
- Lesson keys are unique and match the file mapping exactly.
- Existing `orthography-kurdik` and `phonetics-phonology-kurdik` progression behavior is unchanged.
- The 38 lessons are fetched from `lesson_content` only after authorization; the static HTML no longer exposes the lesson body.
- All 38 pages load for an enrolled user, and direct access is denied for a non-enrolled user.
- No live Supabase changes and no PR merge occur without explicit authorization.

## Implementation update — 2026-10-19

The baseline findings above describe the state before the current implementation commits. The following work is now staged on `kurmanji-courses`:

- Added `supabase/migrations/20261019090000_add_kurmanji_courses_and_protected_lessons.sql`: registers the two Kurmanji courses, seeds all 38 lesson bodies, and extends `can_read_lesson_content` / `complete_lesson`.
- Added `docs/kurmanji-content-seed-review.sql` as a rollback-only review copy. It contains 38 unique keys: 26 Course 1 lessons and 12 Course 2 lessons. The seed conflict target matches the existing `lesson_content` primary key on `lesson_key`.
- Converted all 38 lesson pages to protected shells and added the shared `script.js` loader.
- Extended `script.js` with Kurmanji course-ID mapping, access checks, progress synchronization, and server-backed completion controls.
- Added both Kurmanji courses to `dashboard.html`, including enrollment actions and per-course progress counting.
- Updated PR #2 description to reflect the protected-content work; PR #2 remains open and Draft.

### Checks completed

- Shared `script.js` compiles with `new Function`.
- Dashboard inline JavaScript compiles with `new Function`.
- Seed and migration checks report 38 unique lesson keys (26 + 12), both course IDs, and the expected RPC definitions.
- Representative first and final pages from both courses have a `.lesson-content` shell, load `script.js`, and no longer embed lesson-card bodies.

### Still required before release

- No migration has been applied to the live Supabase project.
- Browser-based end-to-end checks and test-project migration execution have not been performed.
- Verify every lesson body against the source pages and test direct URL access, enrollment, first lesson, locked next lesson, completion, owner bypass, and course-final status.
- Do not merge PR #2 or apply the migration until those checks pass and release is explicitly approved.
