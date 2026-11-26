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


## Current reconciliation gate — 2026-11-26 (after authoring-source sync)

- The reviewed authoring document was synchronized to the implementation branch in commit `a70b2131ac807108a010f9d8032f0f7ee1682b01`. Its content now matches the current authoring branch.
- A fresh direct content check of `docs/previews/dengnasi-content-html-payload-preview.json` against the synchronized authoring source found that the payload is **not yet source-current**:
  - Lesson 22 does not contain the restored Hawar KL/K-Q alternation examples (`kurd/qurd`, `qenc/kenc`) or the KE short-vowel note.
  - Lesson 24 does not contain the restored historical B/P correspondence chain and examples (`sêp/sêb/sêv/sêw`, `şeb/şev/şew`, `x(v)ab/xew`).
  - Lesson 27 does contain both source-print anomaly notes for printed pages 426 and 428. These must be retained in any regeneration; they are not missing from the current payload.
- The existing validation report records an earlier 27/27 parity result, but that historical result is not evidence that the payload still matches the authoring source after later source edits and synchronization. Re-run parity against the exact current authoring commit after regeneration.
- The manifest status on the implementation branch is correctly `under preparation`; do not change it to active or release-ready.
- The implementation plan and validation report do not identify a reproducible generator command or script path. Before changing the payload, locate and inspect the actual generation method or establish a deterministic, reviewable generator. Do not hand-edit the JSON payload or infer a generator filename.
- **Gate remains closed:** no payload regeneration is claimed, no SQL/migration or database write is authorized or performed, and no deployment/publication/activation is performed. Required next evidence: generator provenance, regenerated 27-row payload, current-source parity, HTML/list/table/metadata checks, and browser suite execution through CI.


## Preview-file source parity recheck — 2026-11-26

- The 27 individual HTML preview files were located under `docs/previews/kurmanji-dengnasi-lesson-NN-content-preview.html`. The repository tree contains no dedicated Dengnasî Markdown-to-HTML generator under `scripts/`; the available scripts are the course validator, PDF checker, and mocked browser test.
- Directly compared the current synchronized authoring sections with the corresponding Lesson 22, 24 and 27 HTML previews. The HTML previews are also stale, not just the JSON payload:
  - Lesson 22 source contains `qurd`, `qenc` and `kenc`; its HTML preview does not.
  - Lesson 24 source contains `sêp`, `sêb`, `sêv`, `sêw`, `şeb`, `şev`, `şew` and `xew`; its HTML preview does not.
  - Lesson 27 source contains the printed-page 426 form `neyînîn` and the page-428 repeated `dîsa, dîsa` note; its HTML preview has the alternate forms `neînin` and `dîsa/dîsan`, but not the source-anomaly notes.
- Therefore the historical validation report's 27/27 parity results do not describe the current source-to-preview state. Both the three affected HTML previews and the JSON payload require regeneration/revalidation.
- The authoring document has 27 lesson headings, but no reproducible generator command or source script was found in the implementation branch's complete `scripts/` and workflow file list. A deterministic generator must be added or recovered and run in a local checkout before updating the artifacts.
- **Gate remains closed.** No HTML preview or payload was modified in this step; no migration, database write, deployment, publication, activation, or student-data change occurred.


## Deterministic preview generator added — 2026-11-26

- Added `scripts/generate_dengnasi_previews.py` in commit `ac5dff303448003d8d4ea56f3227190b0ab86167`. It reads the 27 source sections, verifies sequential numbering and each lesson's printed-page citation against the course manifest, and defines deterministic outputs for the 27 HTML preview files plus `docs/previews/dengnasi-content-html-payload-preview.json`.
- Updated `.github/workflows/validate-dengnasi-course.yml` in commit `84d23305079c057d5a6150945ebcdde01715c808` so authoring-source, generator and individual HTML-preview changes trigger validation, and CI runs the generator in `--check` mode before the existing course and browser checks.
- This is generator/CI scaffolding only. The generator has **not yet been executed** against a complete local checkout; no HTML preview or JSON payload was regenerated. The workflow is configured for pull requests and manual dispatch, and no run is currently reported for this implementation-branch commit.
- The generator uses a deliberately limited standard-library Markdown renderer (headings, paragraphs, lists, tables, bold/italic/code). Before trusting generated artifacts, it must be run and its output reviewed against source structure, including nested lists, table edge cases, inline syntax and the known Lesson 22/24/27 corrections. If those checks expose unsupported Markdown constructs, extend the renderer before regeneration.
- Current authoring-to-preview drift remains confirmed for Lessons 22, 24 and 27; the gate is still closed. Do not update the payload or HTML files until a local run and structural/source-parity review succeed.
- No SQL, migration, Supabase write, production/student data, deployment, publication, activation, main-branch update or PR merge was performed.


## Generator preflight findings and metadata alignment — 2026-11-26

- Preflighted the generator against the actual authoring Markdown structure. It has 27 sequential lesson headings, 27 lesson-level source citations, 52 Markdown table blocks / 368 table rows, and no nested lists, blockquotes, inline links or raw HTML in the authoring source. All table rows have internally consistent column counts.
- Found a generator precondition defect: most source citations use unbolded printed page ranges, while the initial regex required bold page ranges. Fixed the citation parser to accept either plain or bold page ranges in commit `69e42ee8bc26f33d4c19895d57d364696a88132a`.
- Reconciliation then exposed manifest errors: Lesson 14's printed-page end was 186 instead of 185; Lesson 15's printed-page start was 187 instead of 186. Corrected only `printedPages` in the manifest to match the source citations in commit `ed850454172d0106318f69ae30cab3c10ffb3d95`. The separate `originalPdfPages` and `designedPdfPages` metadata were left unchanged pending independent PDF-pagination verification.
- Updated the generator so regenerated payload entries take `printed_pages` from the verified manifest, rather than preserving stale page ranges, in commit `f4c1d423598ff3ed9c8de2edbb37d361145d2a59`.
- Recheck now confirms all 27 authoring citations match the corrected manifest. The committed payload remains stale for Lessons 14 and 15 until the generator is actually run; this is expected and remains a failing `--check` condition.
- Markdown structure preflight found no nested-list, blockquote, inline-link or raw-HTML constructs in the source; 52 tables (368 rows) all have consistent row column counts. This narrows renderer risk but does not replace running the script and inspecting rendered output.
- **Still not executed:** Python syntax/runtime test, `--write`, `--check`, full HTML structural parity, payload parity, or browser Playwright suite. No Actions run has been reported for the implementation-branch commits. The workflow is configured on pull requests and manual dispatch; no dispatch was invoked.
- No SQL/migration, Supabase write, production/student data, deployment, publication, activation, main-branch update, or PR merge was performed.


## CI generator execution and integration blockers — 2026-11-26

- Created isolated Draft PR #90 from `test/dengnasi-generator-ci-2026-11-26` into the implementation branch only (not `main`) to execute the new generator in GitHub Actions. PR remains open, draft, and unmerged.
- CI run `45773037735` proved `python scripts/generate_dengnasi_previews.py --check` executes successfully but correctly reports all 27 HTML previews and the JSON payload as stale.
- A follow-up isolated run `45773129828` changed the test workflow to execute `--write` in the runner workspace and upload a review artifact. Generator execution and artifact upload both succeeded. Artifact: `dengnasi-generated-previews` (28 files; 27 HTML + 1 JSON; 242,449 bytes).
- Inspected the downloaded artifact: 27 HTML files and 27 payload lesson rows; HTML tag-stack checks found no unbalanced/misnested tags; zero Arabic-script characters in the generated outputs; Lessons 22, 24 and 27 now include the source details previously missing (`qurd/qenc/kenc`, B/P historical examples, and the page-426/page-428 notes). Payload page ranges for Lessons 14 and 15 match the corrected manifest.
- The next CI stage then failed in `scripts/validate_kurmanji_dengnasi_course.py` at line 61: the existing `kurmanji-dengnasi-course.html` does not contain the expected standalone lesson-page links. Later PDF/page-range checks and browser tests were skipped.
- A second diagnostic run confirms the designed PDF contains an explicit Lesson 15 divider page between the source-content ranges. The validator currently asserts `printedPages == originalPdfPages` and hard-codes the former Lesson 14/15 printed-page ranges, while the authoring citations and corrected manifest now record the lesson-source ranges as 168–185 and 186–202. These are distinct metadata concepts and must be reconciled against the original PDF page map before changing the validator or reverting the manifest.
- **Do not commit the generated artifact yet:** although generation succeeded and structural spot-checks passed, course-page link integration and page-range semantics remain failing/ambiguous. Keep the generated artifact as a review output until the validator and navigation model are corrected and the full CI sequence passes.
- Temporary workflow modifications and diagnostic steps exist only on PR #90's test branch. They are not part of the implementation branch and must be removed before that test branch is used for any integration.
- No live site, main branch, production database, student data, migration, publication or course activation was changed.


## Generated preview integration and full CI validation — 2026-11-26

- Regenerated all 27 HTML lesson previews and the JSON payload from the canonical authoring Markdown using `scripts/generate_dengnasi_previews.py --write`. The 28 generated artifacts were committed to the implementation branch in commit `c10b2a775842a864808d87f8b7b4db879f2de67e`.
- A subsequent CI run verified `--check` against the committed files and reported all generated artifacts current. It also passed the revised course-map validator and public PDF delivery/checksum/page-count check.
- Browser regression suite passed all 8 tests: all 27 routes load their matching authored payload; anonymous auth redirect; enrolled lesson access; locked sequence behavior; legacy PDF fail-closed; non-enrolled enrollment redirect; query-error/missing-row safe states; site-owner bypass.
- The test fixture now explicitly mocks the shared local progression sync and server owner state, preventing the local fallback gate from redirecting tests to lesson 1 before the server-authoritative gate can be tested. This is test-only; production progression logic was not changed.
- The corrected page metadata remains intentionally distinct: Lesson 14 printed pages 168–185, original PDF pages 168–186, designed PDF pages 185–203; Lesson 15 printed pages 186–202, original PDF pages 187–202, designed PDF pages 205–220 with divider page 204.
- CI runs `45775488081` and `45775625220` completed successfully. The latter used `--check` and confirmed the committed generated artifacts already match the source. The sync step made no additional changes.
- The reader and course hold page remain non-indexable / under preparation. No course activation, production database write, migration, student-data change, deployment, main-branch update, or PR merge was performed.
