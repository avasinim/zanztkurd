# Dengnasî 27-lesson HTML preview fidelity validation — 2026-11-26

## Scope and method

Validated all 27 draft preview files under `docs/previews/` against their corresponding numbered sections in `docs/KURMANJI-DENGNASI-LESSON-AUTHORING.md`. The check compares normalized rendered text with source Markdown text after removing only Markdown presentation markers; it also compares list-item counts and table-row counts.

## Results

- Lesson previews checked: **27/27**.
- Normalized source-text parity: **27/27**.
- List-item parity: **27/27**; **843** source list items are represented as HTML list items.
- Table-row parity: **27/27**; **288** source table rows are represented across **51** HTML tables.
- HTML element nesting: balanced in all 27 files.
- Markdown table separator rows rendered as data: **0**.
- Arabic-script characters in the 27 preview files: **0**.
- Preview-only marker and `lang="ku" dir="ltr"`: present in every file.
- Source-page citation: present in every file.
- Quiz/form/input elements: none added.

## Corrections made during this validation

1. Lessons 1–3: repaired list parsing so each source bullet becomes its own list item rather than being merged into one item.
2. Lesson 5: preserved both unordered and ordered list entries.
3. Lessons 18 and 21–27: removed Markdown table separator rows from the rendered data tables and matched source table row counts.
4. Lessons 6, 9, 13 and 22: preserved literal phonological asterisks and bold emphasis next to hyphens, avoiding accidental Markdown emphasis conversion.

The HTML previews remain drafts in `docs/previews/`; they are not connected to site routes or Supabase.

## Metadata parity

The nine title differences identified in the earlier reconciliation have been resolved. The authored lesson H1 is now the canonical display title in the 27-entry manifest and in each standalone lesson page's `<title>` and visible `<h1>`. Lesson IDs, lesson keys, printed-page ranges, original PDF page ranges and designed PDF page ranges were compared with the pre-alignment manifest and remain unchanged.

## Site-page shell audit and copy corrections — 2026-11-26

- Verified all 27 standalone pages under `lessons/kurmanji-dengnasi-lesson-01.html` through `-27.html` exist on the isolated implementation branch.
- All 27 have the matching `data-lesson-key`, a `.lesson-content` injection container, and load the shared `../script.js` protected-content loader.
- All 27 page `<title>` values match their visible `<h1>` and the corresponding authored lesson H1. The 27 manifest titles also match the authored H1s exactly; lesson IDs and page metadata were not changed in this copy correction.
- Replaced the misleading shell sentence claiming the book text was preserved verbatim and the PDF opened from the lesson page. The corrected Kurmancî Latin copy states that lesson topics are organized according to the source's section/topic order and that the book text is not copied verbatim.
- Replaced the Arabic-script transient loading placeholder with `Naveroka dersê tê barkirin...` in all 27 pages.
- Revalidated 27/27 pages in three batches: correct title/H1 parity, corrected source explanation, Latin-script loading placeholder, stable lesson key, and shared loader reference. The hero text contains no Arabic-script characters.
- These changes are limited to page-shell explanatory/loading copy. The authored lesson content, source examples, IDs, keys, page ranges, database rows, enrollment and progress were not edited.

## Supabase test-project reconciliation

- The disposable `zanztkurd-kurmanji-test` project already contained 27 authored HTML rows matching the prepared 27-row payload exactly; no iframe/PDF wrapper remained.
- A rollback-only replacement attempt stopped at its first fail-closed legacy-wrapper precondition. The UPDATE statement was not reached.
- A simple `BEGIN / SELECT / ROLLBACK` probe succeeded. Read-only progression helper checks matched all six expected cases.
- The test DB migration ledger contains two Dengnasî activation versions (`20261124093604`, `20261124112742`) without same-version migration files on this branch. The repository's `20261124130000` migration contains 27 legacy PDF iframe payloads. This drift is documented; no migration or ledger repair is authorized or needed for the already-matching test rows.
- The dedicated Dengnasi mocked Playwright suite was executed in GitHub Actions run `45776754621` and all 8 tests passed. It covers all 27 payload-to-route mappings and mocked access-gate states. It still does not prove real test-student Supabase authentication, RLS, enrollment, or live progression; those require a separate authorized test-project session.

## Browser regression suite prepared — 2026-11-26

- Added `scripts/test_dengnasi_lesson_browser.py`, a local Playwright suite using a mocked Supabase client and the DRAFT ONLY 27-row payload. It never contacts a Supabase project or modifies student data.
- Eight test cases cover: loading all 27 authored payloads into the correct lesson pages; legacy PDF iframe fail-closed behavior; anonymous redirect; non-enrolled redirect; sequence-locked lesson redirect; enrolled learner allowed by the server-side gate; site-owner bypass; and safe query-error/missing-row states.
- Updated `.github/workflows/validate-dengnasi-course.yml` on this implementation branch so a future PR affecting the 27 lesson pages, loader, payload, or browser test installs Playwright/Chromium and runs the suite after the existing static PDF/course checks.
- Static inspection confirms the script contains eight test cases, checks each page H1 against the payload title, checks for authored section headings, rejects iframe content, and checks `lang="ku" dir="ltr"`.
- **Execution status: PASS.** GitHub Actions run `45776754621` completed successfully; all 8 browser regression tests passed. The run also passed preview regeneration/check, course-map validation, PDF delivery/checksum/page-count, and source-page extraction.

## Catalog status reconciliation — 2026-11-26

- The Dengnasî preview card in `lessons/catalog.html` previously claimed the course was active, enrollment-enabled, and that a designed PDF was part of the active offering, while `kurmanji-dengnasi-course.html` was an under-preparation hold page.
- Updated the card kicker and description to state that the 27-lesson course is under preparation and that the lesson topics are organized from the source book rather than copied verbatim.
- Removed the active/enrollment and designed-PDF badges; the card now says the course is not active and the link label opens the course status page.
- Updated the COURSE 03 language-choice subtitle to explicitly say “لە ئامادەکردندایە”.
- Read-only verification confirms the card no longer contains the former active/enrollment/PDF claims, the catalog link still routes to the hold page, and the landing page remains under preparation. No course activation, enrollment, or deployment occurred.

## Remaining integration work

1. The mocked Playwright suite is complete and passing (run `45776754621`); separately run real authenticated test-project browser checks with the existing test-student secrets before making any claim about real Supabase auth/RLS/enrollment.
2. Separately run real authenticated test-project browser checks with the existing test-student secrets; the mocked suite does not prove real Supabase auth/RLS/enrollment behavior.
3. Recover exact source SQL/provenance for test-project migration ledger versions `20261124093604` and `20261124112742` before any migration-history decision.
4. Reconcile the course catalog card with the under-preparation landing page; do not expose a contradictory active status.
5. Only after all tests and review, prepare a release proposal. Production, `main`, deployment, and PR merge remain outside scope without explicit approval.

## Safety boundary

Test-project queries were read-only except for a transaction probe rolled back immediately. No course, lesson, enrollment, progress, policy, or migration data was modified. No production project was accessed. No deployment, publication, `main` update, or PR merge occurred.

## Draft payload artifact

The 27-row payload preview is stored at `docs/previews/dengnasi-content-html-payload-preview.json`. Static checks confirm 27 unique sequential lesson keys, title/ID/page metadata parity with the manifest, balanced HTML, and no preview-only header, form, quiz, or input UI in the injected content bodies. Totals: 843 list items, 51 tables, and 288 table rows. Status remains DRAFT ONLY; no database write was performed.


## Source-book audit of Lessons 18 and 21 — 2026-11-26

- Extracted and reviewed the exact designed-PDF physical pages for Lesson 18 (272–290; printed 251–269) and Lesson 21 (339–371; printed 315–347).
- Lesson 18's authored content was verified against the source's vowel articulation, distribution, historical/dialectal/inflectional alternations, and spelling recommendations; no correction was required in this pass.
- Lesson 21's authored text was expanded only with source-backed details previously underrepresented: Sorani `key` and `xoy`; Y as a grammatical linker in `Ew mamoste ye` and `name-yek`; `hemû/hemî` stress; omitted adverb/adposition examples; Sorani `de-/e-` versus Persian `mî-`; primary stress in the final constituent; and explicit meanings for `piştî` and `gelî`. The source's Pashto comparison was also restored.
- A mixed-script term introduced during editing was caught by the Arabic-script validator and replaced with Kurmancî Latin wording before the passing run.
- Detailed findings: `docs/DENGNASI-SOURCE-AUDIT-LESSONS-18-21-2026-11-26.md`.
- CI run `45776754621` passed all stages, including generator `--write/--check`, course-map validator, PDF delivery/checksum/page count, source extraction, and all 8 mocked browser tests. Generated preview HTML and JSON were synced to the isolated implementation branch.


## Source-book audit of Lessons 19 and 20 — 2026-11-26

- Extracted and reviewed the exact designed-PDF pages for Lesson 19 (292–319; printed 270–297) and Lesson 20 (321–337; printed 298–314).
- Lesson 19 was strengthened with the source's Ê grammatical distribution examples, Ê/H alternations, Ê plus linking Y contrasts, I/Î-before-Y spelling rationale, etymological comparison of `bira`, `germ` and `kevn`, and additional historical/loanword examples.
- Lesson 20 was strengthened with the full O-final exception/variant list, the source's note on the word `ol`, and the dialectal distinctions in `dû`.
- CI run `45777982614` passed generator `--write/--check`, course-map validation, public PDF delivery/checksum/page-count, source-page extraction, and all 8 mocked Playwright browser tests. Generated preview HTML and JSON were synchronized to the isolated implementation branch.
- Detailed findings: `docs/DENGNASI-SOURCE-AUDIT-LESSONS-19-20-2026-11-26.md`.
- Temporary source-audit PR #93 was closed unmerged after the artifact was reviewed. No course activation, database write, migration, student-data change, deployment, publication, `main` update, or PR merge occurred.


## Canonical lesson-title parity — 2026-11-26

- Reconciled the nine reader-title mismatches against the numbered authoring H1s and manifest titles.
- Updated the reader's embedded title values; no lesson IDs, keys, source-page ranges, or lesson body content changed.
- Extended `scripts/validate_kurmanji_dengnasi_course.py` to assert exact title equality across authoring H1, manifest, reader array, standalone document title, and standalone H1 for all 27 lessons.
- The first validation attempt correctly caught two stale generated artifacts (Lesson 19 preview HTML and the payload JSON). The workflow then regenerated them from the canonical authoring Markdown.
- Full Actions run `45778867403` passed: generator `--write/--check`, course-map/PDF/page/title validator, public PDF HTTP/checksum/page-count check, and all 8 mocked Playwright tests.
- After all checks passed, the workflow synchronized generated HTML previews and JSON to the isolated implementation branch.
- Temporary PR #94 was closed unmerged. No main update, production/test database write, migration, course activation, deployment, publication, or student-data change occurred.


## CI confirmation — 2026-11-26

The complete workflow run [45780142032](https://github.com/avasinim/zanztkurd/actions/runs/45780142032) passed after the latest source-authoring updates through Lesson 7:

- Generator `--write` and `--check` passed.
- 27-lesson course map, source-page mapping, PDF integrity and protected reader-route validation passed.
- Public PDF HTTP delivery, checksum and 462-page count passed.
- All 8 mocked Playwright browser tests passed.
- Only after all checks passed, regenerated lesson HTML previews and the JSON payload were synchronized to the isolated implementation branch.

The Playwright tests use mocked Supabase state; they do not establish real student authentication, RLS, enrollment, or live progress synchronization. The workflow did not deploy or activate the course.


## CI confirmation — 2026-11-26

Full workflow run [45780729755](https://github.com/avasinim/zanztkurd/actions/runs/45780729755) passed:
- regenerated preview HTML and payload from the current authoring source;
- checked all 27 lesson source/page maps and title parity;
- confirmed the authoring Markdown and generated lesson previews contain neither Arabic nor Cyrillic script;
- validated the 462-page PDF, its checksum and public HTTP delivery;
- passed all 8 mocked Playwright tests;
- synchronized the regenerated previews to the isolated implementation branch after every validation step passed.

The first run (45780571219) passed the generator, course/PDF, script and browser checks but its final preview-sync push was rejected as non-fast-forward because the implementation branch advanced during the run. No source or production change was lost; a rerun against the latest branch passed and completed the sync. PR #96 was closed unmerged.
