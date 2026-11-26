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
- No real browser session test has been run. The existing Dengnasî GitHub Actions workflow only runs the static course/PDF validator; the existing Playwright workflow is for a different course pathway and stubs auth locally. It does not prove real Dengnasî Supabase authentication, enrollment, or sequence access.

## Remaining integration work

1. Add a dedicated Playwright suite for the 27 Dengnasî pages using the existing local server and mocked Supabase response to verify loader injection, fallback, navigation, and page shell behavior.
2. Add or adapt a separately approved test-project browser workflow for actual authenticated access tests, using only the existing test secrets. Do not expose credentials in logs or artifacts.
3. Recover the exact provenance/source SQL for the two earlier test-project migration versions before making any migration-ledger decision.
4. Reconcile the course catalog card with the current under-preparation landing page. The catalog/landing status must be consistent before release.
5. Only after all tests and review, prepare a release proposal. Production, `main`, deployment, and PR merge remain outside scope without explicit approval.

## Safety boundary

Test-project queries were read-only except for a transaction probe rolled back immediately. No course, lesson, enrollment, progress, policy, or migration data was modified. No production project was accessed. No deployment, publication, `main` update, or PR merge occurred.

## Draft payload artifact

The 27-row payload preview is stored at `docs/previews/dengnasi-content-html-payload-preview.json`. Static checks confirm 27 unique sequential lesson keys, title/ID/page metadata parity with the manifest, balanced HTML, and no preview-only header, form, quiz, or input UI in the injected content bodies. Totals: 843 list items, 51 tables, and 288 table rows. Status remains DRAFT ONLY; no database write was performed.
