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
- The loader already queries `public.lesson_content` for `content_html` by `lesson_key`, but it has a deliberate early-return guard for keys matching `kurmanji-dengnasi-lesson-\d{2}\.html`. That guard writes an “under preparation” message and prevents the generic query from running.
- The existing lesson-page files are under `lessons/`, not at repository root.
- The course manifest records the same course ID and 27 lessons. The current production activation status text does not prove that the draft content from PR #89 has been seeded.
- Existing security/access functions and sequential lesson gating must be preserved. No live Supabase catalog query was made during this audit.

## Correct implementation shape

This is a content replacement in an existing course, not a new course/schema design.

1. Keep course ID `kurmanji-dengnasi-27` unchanged.
2. Keep the existing 27 lesson keys unchanged and in order.
3. Preserve existing enrollment, lesson_progress, completion RPCs, sequence checks, RLS policies, grants and access rules. Do not reset, delete or rewrite learner progress.
4. Prepare a separately reviewed follow-up migration that updates only the 27 matching `public.lesson_content` rows (the intended fields are `title`, `content_html`, and, only if required by established conventions, `updated_at`). Use fail-closed preconditions: assert the expected course exists, assert all 27 keys exist exactly once, and verify the current payload is the known PDF-wrapper version before replacing it. Abort if any row differs unexpectedly. Do not use a blind upsert that could silently overwrite an unexpected state.
5. Build each `content_html` body from the corresponding source-checked authoring section in PR #89. Convert only the authored lesson material into the existing lesson-card HTML pattern. Do not embed the source PDF iframe as the lesson body; a small source citation may remain, but the learner-facing content must be the authored lesson, not a page-sliced book.
6. Remove the early-return guard in `loadProtectedLessonContent` only in the isolated implementation branch, so the existing authenticated Supabase SELECT path can run for this course. Retain the existing loading, missing-row, error, and `aria-busy` handling.
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

- No live Supabase connection or SQL query was made.
- No migration was created, applied or deployed.
- No production row, enrollment, progress record, course metadata or access policy was changed.
- No deployment or publication was triggered.
- PR #89 remains Draft/Open/Unmerged and is not modified by this plan.
- `main` is not modified by this branch.

## Completed integration preparation

- Canonical title parity is complete across all 27 authoring H1s, Manifest titles, and standalone page `<title>`/`<h1>` values.
- All 27 HTML previews have been regenerated and checked for normalized source-text parity, list-item parity, table-row parity, balanced HTML, Latin-only script, source citations, and absence of quizzes/forms. See `docs/DENGNASI-HTML-PREVIEW-VALIDATION-2026-11-26.md`.
- The preview audit found and corrected list, table-separator, literal-asterisk and inline-emphasis conversion defects.
- A 27-row DRAFT ONLY `content_html` payload artifact has been generated at `docs/previews/dengnasi-content-html-payload-preview.json` and statically validated for stable keys, titles, page metadata, and HTML structure; it has not been applied to any database.

## Next implementation sequence

1. Implement the narrow loader-guard removal on this integration branch.
4. Generate the follow-up migration through the Supabase CLI in a local checkout, add fail-closed row/hash checks, and validate it in a disposable project.
5. Review the complete diff and test evidence before proposing a separate Draft PR for user review.


- Corrected all 27 standalone page-shell introductions and loading placeholders; verified page title/H1/manifest parity and stable lesson keys. See `docs/DENGNASI-HTML-PREVIEW-VALIDATION-2026-11-26.md`.
- Next: add a dedicated Playwright suite for the 27 Dengnasî pages and design a separate test-project authenticated browser workflow. Recover exact provenance for migration ledger versions `20261124093604` and `20261124112742` before any migration-history decision. No production access, `main` update, deployment, or PR merge is authorized here.


## Browser test harness — 2026-11-26

- Added `scripts/test_dengnasi_lesson_browser.py` with eight mocked-Supabase Playwright cases, including all 27 lesson routes, legacy PDF fail-closed behavior, auth/enrollment/sequence gates, owner bypass, and query failure/missing-row states.
- Updated `.github/workflows/validate-dengnasi-course.yml` on this branch to run the suite in Chromium on relevant pull requests.
- The suite is prepared but **not executed**. A PR/approved CI run is still required; mocked browser tests are separate from real test-project authenticated browser checks.
- No test-project data or production data was changed.


## Catalog status reconciliation — 2026-11-26

- Updated the Dengnasi card and COURSE 03 selector in `lessons/catalog.html` to show “under preparation”, remove active/enrollment/PDF claims, and link to the hold/status page.
- Read-only check confirms the card and landing page status are consistent. The course remains unavailable to students; no deployment or database activation was performed.


## Migration provenance recovery — 2026-11-26

- Recovered both activation SQL statements read-only from `supabase_migrations.schema_migrations.statements` in the test project.
- Ledger version `20261124112742` is byte-for-byte identical to repository file `20261124130000_activate_kurmanji_dengnasi_course.sql` (timestamp/name mismatch only).
- Ledger version `20261124093604` is a distinct earlier 36,301-character statement, recoverable from the DB ledger but not represented by a same-version repository file. Both statements contain 27 legacy PDF iframe rows and the same two access/progress RPCs. The current authored HTML rows do not match either historical activation payload; no later replacement migration was identified.
- Do not replay either statement, add the older one under `supabase/migrations/`, or rewrite migration history. See `docs/DENGNASI-MIGRATION-LEDGER-RECONCILIATION-2026-11-26.md`.
