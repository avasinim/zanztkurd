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

## Remaining integration work

- Build a reviewable 27-row `content_html` payload from the validated previews.
- Remove the deliberate course-specific loader guard only on an isolated implementation branch, retaining authentication, enrollment, sequential gating, error handling and server-side authorization.
- Generate and validate a fail-closed migration in a disposable Supabase project only; no production access or mutation is authorized here.
- Reconcile the catalog card status with the course landing page before any release: the catalog currently describes the course as active while `kurmanji-dengnasi-course.html` is an under-preparation hold page.

## Safety boundary

No Supabase connection, query, migration, row update, learner-progress change, access-policy change, deployment, publication, main-branch update or PR merge was performed in this validation.
