# Kurmanji migration/seed tuple mismatch source audit — 2026-11-17

## Scope and safety

Read-only comparison of the current isolated work-branch source at HEAD `30b9061f67221919ad0549926b02e99a148e1da5`. The audit compares the 38 `public.lesson_content` tuples in the 2026-10-24 migration with the ordered tuples in the five split seed files, following the extraction and exact-string comparison approach in `scripts/validate_kurmanji_seed_parity.py`.

No tests, validators, workflows, SQL, migrations, seed files, lesson pages, CI settings, Supabase projects, production resources, or PRs were changed or executed. No database was contacted. This document records source inspection only; it does not determine which copy is authoritative and does not authorize synchronization.

## Current source files and blob SHAs

| File | Blob SHA |
|---|---|
| `supabase/migrations/20261024122051_add_kurmanji_courses_and_protected_lessons.sql` | `06320c50a858e41d8ce21e7b4fdee3f6ae418cd9` |
| `docs/kurmanji-content-seed-part-01.sql` | `58723848f1e63d5a18fbafb6d28e6876e474948f` |
| `docs/kurmanji-content-seed-part-02.sql` | `aa5af4960256ee56955f0904c073c49bcc54a629` |
| `docs/kurmanji-content-seed-part-03.sql` | `b6f89841ac49adb256a7874179a258436e095909` |
| `docs/kurmanji-content-seed-part-04.sql` | `2367c5057b2b92b7fa482c64a30b05d26838d964` |
| `docs/kurmanji-content-seed-part-05.sql` | `e40298225e03921edb3ad31704191bdf0c20e880` |
| `scripts/validate_kurmanji_seed_parity.py` | `9b81a750e2c75144e8425313bd675cd6fba348bd` |

## Extraction and comparison result

The current files contain 38 migration tuples and 38 seed tuples, with the expected ordered keys. The exact tuple comparison finds **12 mismatches**. Every mismatch is in column 4 (`content_html`); the lesson key/course ID and other tuple columns do not account for the differences.

| Tuple row | Lesson key | Seed file | Observation |
|---:|---|---|---|
| 1 | `kurmanji-course-1-lesson-01.html` | part-01 | Material content-length divergence: migration 2,524 characters; seed 6,353 |
| 2 | `kurmanji-course-1-lesson-02.html` | part-01 | Material content-length divergence: migration 2,736; seed 6,265 |
| 3 | `kurmanji-course-1-lesson-03.html` | part-01 | Material text/structure divergence: migration 2,676; seed 4,236 |
| 4 | `kurmanji-course-1-lesson-04.html` | part-01 | Material text/structure divergence: migration 3,606; seed 5,307 |
| 5 | `kurmanji-course-1-lesson-05.html` | part-01 | Content divergence: migration 2,729; seed 2,992 |
| 6 | `kurmanji-course-1-lesson-06.html` | part-01 | Content divergence: migration 2,700; seed 3,406 |
| 10 | `kurmanji-course-1-lesson-10.html` | part-02 | Content divergence: migration 3,469; seed 3,555 |
| 25 | `kurmanji-course-1-lesson-25.html` | part-04 | Small but non-whitespace-only content divergence: 5,260 vs 5,261 |
| 30 | `kurmanji-course-2-lesson-04.html` | part-04 | Small but non-whitespace-only content divergence: 2,384 vs 2,385 |
| 32 | `kurmanji-course-2-lesson-06.html` | part-04 | Small but non-whitespace-only content divergence: 2,758 vs 2,759 |
| 35 | `kurmanji-course-2-lesson-09.html` | part-05 | Small but non-whitespace-only content divergence: 3,038 vs 3,037 |
| 36 | `kurmanji-course-2-lesson-10.html` | part-05 | Small but non-whitespace-only content divergence: 2,766 vs 2,765 |

For all 12 rows, removing/normalizing whitespace does **not** make the HTML payloads equal. Therefore none of these 12 can be explained as whitespace-only formatting drift. The one-character length differences in rows 25, 30, 32, 35 and 36 still need exact text-level review; length alone does not identify the changed character or its editorial significance.

The largest differences are concentrated in Course 1 lessons 1–6. For example, the seed version of lesson 1 continues beyond the migration's shorter payload with additional instructional sections. The seed version of lesson 3 has a different, more expanded opening section. This indicates substantive source-content divergence, not merely SQL tuple parsing.

## Historical CI row 1 / row 7 reconciliation

The previous browser/CI evidence audit recorded:
- Run 881 (commit `d87dc6230d42acc292be1293c69bf92743487e25`): exact parity failed at row 1, with lesson 01 key matching but tuple text differing.
- Run 880 (commit `8e0b5bc8cf2052ed66f276dc3d7f66b0951a5847`): exact parity failed at row 7, lesson 07.

At the current HEAD, row 1 still differs, and it is the first mismatch found by the exact ordered comparison. Row 7 (`kurmanji-course-1-lesson-07.html`) is byte-for-byte identical between migration and seed. Thus the historical row-7 mismatch is **not reproducible at current HEAD**; it was corrected or otherwise changed between the historical run and this snapshot. The exact intervening commit that resolved row 7 has not been isolated in this audit.

## Validator and migration comment

`scripts/validate_kurmanji_seed_parity.py`:
- reads migration `20261024122051_add_kurmanji_courses_and_protected_lessons.sql`;
- gathers the five `kurmanji-content-seed-part-*.sql` files;
- extracts ordered lesson tuples and compares the complete raw tuple strings;
- requires 38 tuples and the 26 + 12 ordered lesson keys.

The migration header currently states that the 38 lesson title/content payloads are synchronized exactly with the five split seed files. That assertion conflicts with the current source comparison: 12 of 38 content tuples differ. The comment is therefore stale or inaccurate for this branch snapshot; this audit does not infer whether migration or seed is authoritative.

## Required decision before any repair

1. Establish the authoritative lesson payload for each affected key from approved editorial/source history.
2. Review all 12 HTML differences, especially lessons 1–6, rather than copying one file over the other wholesale.
3. Determine whether the split seed package is intended as a canonical release artifact or only a review copy; confirm the recorded migration/production lineage before changing a migration.
4. Obtain explicit approval before editing any lesson content, seed, migration, validator, CI workflow, or database state.
5. After approval, validate SQL syntax and parity in a disposable/non-production environment and retain full logs. Do not use this document as evidence that CI or a database migration passed.

## Backup and change record

- Repository: `avasinim/zanztkurd`
- Work branch: `fix/kurmanji-ci-current-migration`
- Starting HEAD: `30b9061f67221919ad0549926b02e99a148e1da5`
- Pre-work backup: `backup/kurmanji-seed-tuple-mismatch-audit-before-2026-11-17`
- Change type: documentation only.
- No code, lesson content, SQL, migration, seed, CI, PR, or production resource changed.
