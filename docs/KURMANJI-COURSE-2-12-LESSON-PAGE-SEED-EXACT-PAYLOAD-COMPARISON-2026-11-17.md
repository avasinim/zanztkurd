# Course 2: Page Shell, Seed Payload and Historical Migration — Exact 12-Lesson Comparison
Date: 2026-11-17
Branch: fix/kurmanji-ci-current-migration
Starting HEAD: c80121bf1c5aae2b7dc6104515479a53f634d968
Pre-work backup: backup/kurmanji-c2-page-seed-payload-audit-before-2026-11-17
Scope: static Git object comparison only. No database access or migration execution.

## Executive findings

- All 12 root-level Course 2 lesson pages have the expected lesson key in a `data-lesson-key` attribute, a loading placeholder, a page heading, and a separate introductory paragraph in the hero.
- All 12 page headings match their corresponding seed row titles exactly (12/12).
- The page files are shells, not complete lesson-body snapshots: the lesson-body element is a placeholder and the client script loads the corresponding `content_html` by lesson key. Therefore, comparing the entire page file byte-for-byte with the seed payload would be a category error. The actual visible lesson body is represented by the seed/database payload.
- All 12 Course 2 rows are present in the five-part seed set and in the historical 2026-10-24 release migration.
- Eight of the 12 seed body payloads are byte-for-byte identical to the historical migration payloads.
- Four rows (Course 2 lessons 04, 06, 09, 10) differ from the historical release payload by a single Sorani orthographic spelling change in the seed. The 2026-11-16 reconciliation migration contains all four and its decoded HTML payload matches the current seed payload exactly for each.
- No evidence in this comparison indicates substantive grammar, example, exercise, or lesson-structure edits in those four release-to-seed deltas; the observed deltas are orthographic normalization only.

## Exact comparison table

Payload lengths are decoded SQL string lengths (Unicode characters counted by JavaScript string length, not byte counts).

| Lesson | Page heading = seed title | Seed body length | Historical release body length | Seed = release | In 2026-11-16 overlay | Overlay = seed |
|---:|---|---:|---:|---|---|---|
| 01 | Yes | 2,011 | 2,011 | Yes | No | — |
| 02 | Yes | 2,080 | 2,080 | Yes | No | — |
| 03 | Yes | 2,000 | 2,000 | Yes | No | — |
| 04 | Yes | 2,383 | 2,382 | No | Yes | Yes |
| 05 | Yes | 2,385 | 2,385 | Yes | No | — |
| 06 | Yes | 2,757 | 2,756 | No | Yes | Yes |
| 07 | Yes | 2,307 | 2,307 | Yes | No | — |
| 08 | Yes | 2,588 | 2,588 | Yes | No | — |
| 09 | Yes | 3,035 | 3,036 | No | Yes | Yes |
| 10 | Yes | 2,763 | 2,764 | No | Yes | Yes |
| 11 | Yes | 2,638 | 2,638 | Yes | No | — |
| 12 | Yes | 2,297 | 2,297 | Yes | No | — |

Counts: 12 page/seed title matches; 12 seed rows; 12 historical migration rows; 8 exact seed/release payload matches; 4 orthography-only seed/release differences; 4 corresponding overlay rows; 4/4 overlay payloads exactly equal to seed.

## The four exact payload deltas

The decoded SQL HTML payloads differ at one spelling location per row:

| Lesson | Historical release form | Current seed / overlay form | Classification |
|---:|---|---|---|
| 04 | `پەیویستە` | `پێویستە` | Sorani house-spelling normalization |
| 06 | `پەیویستە` | `پێویستە` | Sorani house-spelling normalization |
| 09 | `نوسینەی` | `نووسینەی` | Sorani house-spelling normalization |
| 10 | `نوسینی` | `نووسینی` | Sorani house-spelling normalization |

The difference is localized to these spellings. The current seed row and the reconciliation row have identical decoded `content_html` for each of the four lessons. The overlay's titles also match the seed titles. This establishes payload consistency between the overlay and current seed for these rows; it does not independently establish editorial approval of the house spelling.

## Page-shell architecture and implication

The 12 root page files contain:
- the course/lesson eyebrow and the page's `<h1>`;
- a lesson-specific introductory paragraph;
- a `<div class="lesson-content" data-lesson-key="...">` with a loading placeholder;
- a script reference to the protected lesson loader.

They do not embed the complete lesson card HTML. The data key exactly matches the row key in seed/migration. Thus:
- page heading ↔ seed title can be checked statically and matches for all 12;
- hero introduction is page-shell copy and should be reviewed as a separate field;
- lesson body ↔ seed/migration `content_html` is the relevant payload comparison;
- live rendered content remains unverified until an authorized runtime or read-only live-state check.

## Authority and release interpretation

1. The 2026-10-24 migration is the historical release baseline. Its header records production application, but this audit did not query production.
2. The split seed files contain the later intended content snapshot and are explicitly identified as the source for the 2026-11-16 forward reconciliation.
3. For the four changed Course 2 rows, the reconciliation migration reproduces the seed payload exactly and guards against unexpected live-row drift before updating.
4. The repository evidence therefore establishes a technical lineage: historical release → four later spelling-normalized Course 2 payloads in seed → matching four-row overlay. It does not prove the overlay has run, that production currently matches it, or that the spellings have formal editorial sign-off.
5. The standalone HTML files are page shells; they are not an alternative copy of the lesson body.

## Required follow-up

- Review the four house-spelling choices against the project's approved Sorani orthographic authority before calling them canonical.
- If authorized later, perform a read-only live-state comparison of the 12 rows and record the actual database payload hashes. Do not apply a migration to discover state.
- Review hero introduction paragraphs independently from the injected lesson-body payload; they are separate content surfaces.
- Keep Course 2 morphology pages distinct from the unrelated phonetics Course 2 pages under `lessons/course-2-XX.html`.

## Safety statement

- Documentation-only audit.
- No lesson page, seed file, migration, app code, schema, validator, test, or workflow changed.
- No Supabase connection, live query, migration execution, deployment, PR edit, or merge occurred.
- `main` remains unchanged.
- This is a static repository comparison, not live database verification, editorial approval, or release certification.
