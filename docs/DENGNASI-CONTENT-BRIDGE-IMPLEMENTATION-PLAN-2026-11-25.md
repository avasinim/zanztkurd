# Dengnasî 27-lesson content bridge — implementation plan

Date: 2026-11-25

## Purpose

Prepare a safe, reviewable path to replace the existing PDF-only lesson payloads with the 27 source-based Kurmanji Latin lesson drafts on PR #89. This document is a repository-only implementation plan. It is not a release, a migration, or authorization to change production.

## Verified repository facts

- PR #89 remains Draft, Open and Unmerged. Its head is `b33b7088b5674929b48de87080e5cb2d64682e64`; its base is `a32992580c520ba64bdbea24cca982f488fb0cd1`.
- PR #89 contains the authoring draft at `docs/KURMANJI-DENGNASI-LESSON-AUTHORING.md`, with 27 lesson sections. The course authoring rules require source-based paraphrase, Kurmanji Latin script, no invented/unsourced material, and no added quizzes, questions, exercises, objectives, recaps or answer keys.
- The main-branch activation migration `supabase/migrations/20261124130000_activate_kurmanji_dengnasi_course.sql` already inserts the course `kurmanji-dengnasi-27` and exactly 27 lesson keys, `kurmanji-dengnasi-lesson-01.html` through `-27.html`.
- Those 27 existing `lesson_content` rows currently hold PDF iframe wrappers, not the 27 authored lesson bodies. The migration contains 27 iframe elements.
- All inspected lesson pages use `.lesson-content[data-lesson-key]` and the shared `script.js` loader.
- The loader queries `public.lesson_content` for `content_html` by `lesson_key`. The Dengnasî-specific early-return guard has been removed on the integration branch; the generic protected query path remains.
- The existing lesson-page files are under `lessons/`, not at repository root.
- The course manifest records the same course ID and 27 lessons. The current production activation status text does not prove that the draft content from PR #89 has been seeded.
- Existing security/access functions and sequential lesson gating must be preserved. The disposable test project was queried and its 27 lesson rows were verified; no production catalog query was made.

## Correct implementation shape

This is a content replacement in an existing course, not a new course/schema design.

1. Keep course ID `kurmanji-dengnasi-27` unchanged.
2. Keep the existing 27 lesson keys unchanged and in order.
3. Preserve existing enrollment, lesson_progress, completion RPCs, sequence checks, RLS policies, grants and access rules. Do not reset, delete or rewrite learner progress.
4. Prepare a separately reviewed follow-up migration that updates only the 27 matching `public.lesson_content` rows (the intended fields are `title`, `content_html`, and, only if required by established conventions, `updated_at`). Use fail-closed preconditions: assert the expected course exists, assert all 27 keys exist exactly once, and verify the current payload is the known PDF-wrapper version before replacing it. Abort if any row differs unexpectedly. Do not use a blind upsert that could silently overwrite an unexpected state.
5. Build each `content_html` body from the corresponding source-checked authoring section in PR #89. Convert only the authored lesson material into the existing lesson-card HTML pattern. Do not embed the source PDF iframe as the lesson body; a small source citation may remain, but the learner-facing content must be the authored lesson, not a page-sliced book.
6. Completed on the integration branch: remove only the early-return guard in `loadProtectedLessonContent`, allowing the existing authenticated Supabase SELECT path to run for this course. The loading, missing-row, error, and `aria-busy` handling remain intact.
7. Keep authentication, enrollment, previous-lesson completion checks and server-side `can_read_lesson_content` enforcement unchanged. Do not weaken or bypass them to make the content visible.
8. Verify the course landing page and reader link to the existing `lessons/` pages, and ensure each page's `data-lesson-key` matches exactly one of the 27 seeded keys.
9. Resolved on the integration branch: the 27 authored lesson H1 headings are canonical and are aligned with the manifest and standalone page title/H1 metadata. Stable IDs, lesson keys and all printed/original/designed PDF page ranges remain unchanged. See `docs/DENGNASI-TITLE-CANONICALIZATION-RECOMMENDATION-2026-11-26.md` and the validation report.
10. Test in a disposable Supabase project first. Do not connect to or mutate production as part of this work.

## Required validation before review

- Static validation: exactly 27 unique ordered keys, no missing/duplicate lesson records, and title parity between the manifest, lesson-page headings and content seed.
- Content validation: all 27 bodies are non-empty; Lessons 18–20 remain Latin-only; no invented quizzes/exercises or external audio links; every lesson stays within its source range.
- SQL validation: syntax check, exact precondition checks, affected-row count = 27, and rollback test in a disposable database.
- Runtime validation: owner and enrolled learner can load allowed lessons; anonymous and non-enrolled users remain blocked; lesson 2 remains locked until lesson 1 completion; failed/missing content shows the existing safe error state.
- Regression validation: no changes to other courses, enrollments, progress, completion records, course order or access policies.
- Capture test output and review the generated migration diff before opening any release PR.

## Supabase migration workflow constraint

When implementation is authorized and performed in a local project checkout, create the migration file using `supabase migration new <descriptive-name>` as required by the installed Supabase workflow. Do not invent a timestamped migration filename by hand. This branch currently contains no generated migration and no SQL has been applied.

## Explicit non-actions / safety boundary

- No production Supabase connection or SQL query was made.
- The disposable test project `zanztkurd-kurmanji-test` was inspected read-only, with rollback-only RLS/progression probes.
- All 27 test-project `lesson_content` rows were compared against the payload artifact; all 27 titles and `content_html` bodies matched exactly.
- No migration was created or applied as part of this integration-branch work, and no production row, enrollment, progress record, course metadata or access policy was changed.
- No deployment or publication was triggered.
- PR #89 remains Draft/Open/Unmerged and is not modified by this plan.
- `main` is not modified by this branch.

## Completed integration preparation

- Canonical title parity is complete across all 27 authoring H1s, Manifest titles, and standalone page `<title>`/`<h1>` values.
- All 27 HTML previews have been regenerated and checked for normalized source-text parity, list-item parity, table-row parity, balanced HTML, Latin-only script, source citations, and absence of quizzes/forms. See `docs/DENGNASI-HTML-PREVIEW-VALIDATION-2026-11-26.md`.
- The preview audit found and corrected list, table-separator, literal-asterisk and inline-emphasis conversion defects.
- A 27-row `content_html` payload artifact is stored at `docs/previews/dengnasi-content-html-payload-preview.json`. It has exact title and HTML-body parity with all 27 rows currently present in the disposable test project. This verifies the test database state only; it does not establish when or by which migration/process those rows were seeded, and it does not establish production parity.

## Next implementation sequence

1. Completed: remove only the Dengnasî loader pause guard while preserving the generic protected Supabase query path.
2. Completed: replace the obsolete course hold page with a 27-lesson index and correct all 27 lesson-page descriptions so they no longer claim the book is copied verbatim or that PDF is the lesson.
3. Completed: verify all 27 course-index links, lesson keys, content mounts, and shared loader references; see `docs/DENGNASI-COURSE-INDEX-VALIDATION-2026-11-26.md`.
4. Added: `scripts/test_dengnasi_course_ui.py` runs local Playwright smoke tests for all 27 rendered lesson bodies, course-index navigation, signed-out redirect, non-enrollment redirect, and locked-lesson redirect using a local Supabase stub. The validation workflow now installs Chromium and runs this suite when the relevant paths change. The suite has not yet run on this branch; it is a UI simulation, not a real Auth/RLS test.
5. Still pending: a browser session against the disposable Supabase test project with dedicated test identities, to verify actual Auth, enrollment, and progression end-to-end. Do not use production credentials or weaken RLS to make a test pass.
5. Only after browser evidence and explicit authorization: compare the production content state, determine whether any migration is actually needed, and prepare a fail-closed release proposal. Do not assume a new migration is required merely because the repository contains a draft payload.


## Test-project verification update — 2026-11-26

- The disposable test project currently contains the course record and 27 `lesson_content` rows for `kurmanji-dengnasi-27`.
- Each of the 27 database `title` and `content_html` values was compared byte-for-byte with the corresponding payload JSON entry; all 27 matched exactly.
- RLS probes passed for no-enrollment denial, first-lesson access, sequential lesson unlocking, owner access, and anonymous-role privilege denial. Probe transactions were rolled back; no test enrollment or progress rows remain.
- This supersedes earlier statements in this plan that no Supabase query was made or that the payload had not been applied to any database. The verified scope is the disposable test project only.
- End-to-end browser authentication and live GitHub Pages delivery remain unverified.


## Course navigation and page-copy update — 2026-11-26

- The course landing page is now a Kurmancî Latin 27-lesson index on the integration branch, with ordered lesson links and printed source-page ranges.
- All 27 standalone lesson hero descriptions now accurately describe the lessons as source-based, pedagogically organized Kurmancî Latin writing in new wording. They no longer say the source text is reproduced verbatim or that the PDF opens as the lesson.
- Static checks confirm 27 unique ordered course links and matching lesson keys, each page has a content mount and loads the shared script. This is repository validation only; browser runtime and Pages deployment remain unverified.
- The separate PDF reader remains a source-reference page and is not linked from the course index or lessons catalog.
