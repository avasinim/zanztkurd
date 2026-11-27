# Dengnasî payload structural checkpoint — 2026-11-27

## Scope
Read-only structural comparison of `docs/previews/dengnasi-content-html-payload-preview.json` against `docs/kurmanji-dengnasi-course.json` on branch `implementation/dengnasi-content-html-bridge-2026-11-26`. This is not a source-text fidelity certification and does not authorize database synchronization or course activation.

## Results
- Payload lessons: 27.
- Manifest lessons: 27.
- Sequential numbering: 1–27 in both.
- Lesson IDs: all 27 match by index.
- Titles: all 27 match by index.
- Printed-page start/end ranges: all 27 match by index.
- Lesson keys: all present and unique (27/27).
- Empty lesson bodies: 0. Plain-text lengths after stripping style/HTML tags and normalizing whitespace range from 5,678 to 23,589 characters.
- Embedded PDF iframe/reference in lesson HTML: 0 occurrences.
- Exact repeated text segments of at least 100 characters across different lessons: 0 found by sentence/colon-segment scan. This is a heuristic, not a semantic duplication proof.

## Per-lesson plain-text lengths
| Lesson | Characters |
|---:|---:|
| 1 | 5,678 |
| 2 | 9,469 |
| 3 | 9,052 |
| 4 | 12,112 |
| 5 | 5,843 |
| 6 | 14,376 |
| 7 | 14,571 |
| 8 | 18,278 |
| 9 | 10,742 |
| 10 | 10,226 |
| 11 | 14,558 |
| 12 | 7,890 |
| 13 | 11,884 |
| 14 | 12,495 |
| 15 | 13,172 |
| 16 | 17,954 |
| 17 | 10,422 |
| 18 | 14,026 |
| 19 | 21,858 |
| 20 | 12,186 |
| 21 | 23,589 |
| 22 | 22,093 |
| 23 | 12,072 |
| 24 | 7,052 |
| 25 | 10,808 |
| 26 | 14,261 |
| 27 | 15,115 |

## Known unresolved issues retained
- Structural alignment does not establish source fidelity. Lesson 21 note content (229–268) still needs item-by-item comparison.
- Lesson 22 remains incompletely reconciled against all source details, tables and notes, despite the supplemental restoration work.
- Lessons 23–27 still require a complete source ledger of every example, table row, note, reference and qualification.
- Test DB drift remains: 27 rows exist; exact current-payload HTML matches 0/27; title mismatches 9/27. The existing pre-resynchronization backup must not be overwritten.
- No Supabase write, migration, production change, deployment, PR merge, student-data access/change or activation was performed.

## Interpretation
The manifest and payload are structurally aligned and internally well-formed under the checks above. This is a useful precondition for further review, not evidence that the course is ready to publish. Continue source-level reconciliation before preparing any test-database write proposal.
