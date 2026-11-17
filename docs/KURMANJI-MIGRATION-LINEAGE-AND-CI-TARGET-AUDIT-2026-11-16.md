# Kurmanji migration lineage and CI target audit

**Date:** 2026-11-16  
**Repository:** `avasinim/zanztkurd`  
**Branch:** `fix/kurmanji-ci-current-migration`  
**Inspection HEAD:** `8746be614742d5fd81765dedeb48ad93b9db0119`  
**Scope:** read-only comparison of migration files, static validators and workflow path filters. No database access, migration execution, CI edit, lesson edit or deployment.

## 1. Executive finding

The repository contains two timestamped migrations with the same broad purpose:

- `20261019090000_add_kurmanji_courses_and_protected_lessons.sql`
- `20261024122051_add_kurmanji_courses_and_protected_lessons.sql`

Their headers make different status claims:
- The 2026-10-19 file says it has **not** been applied to the live Supabase project.
- The 2026-10-24 file says it **was applied to production** on 2026-10-24, recorded version `20261024122051`.

The current validation path is split across both files:
- `validate_kurmanji_sql.py` parses the 2026-10-24 migration.
- `validate_kurmanji_seed_parity.py` compares the 2026-10-24 migration's 38 lesson tuples against the five split seed files.
- `validate_kurmanji_package.py` instead reads the 2026-10-19 migration for safety-invariant checks and lesson-key counts.
- The GitHub Actions path filter watches the 2026-10-24 migration, not the 2026-10-19 migration.

This means the migration being parsed and compared to the seeds is not the same migration whose safety invariants are inspected by the package validator.

## 2. File identity and recorded status

| Item | 2026-10-19 file | 2026-10-24 file |
|---|---|---|
| Path | `supabase/migrations/20261019090000_add_kurmanji_courses_and_protected_lessons.sql` | `supabase/migrations/20261024122051_add_kurmanji_courses_and_protected_lessons.sql` |
| Git blob SHA | `e97e15162763918f7b712fb804847ab68c647bc4` | `06320c50a858e41d8ce21e7b4fdee3f6ae418cd9` |
| Lines | 645 | 545 |
| Characters | 148,399 | 136,818 |
| Header status | Says NOT applied to live Supabase | Says applied to production on 2026-10-24; recorded version 20261024122051 |
| Transaction | BEGIN … COMMIT | BEGIN … COMMIT |

The status statements above are statements in the committed file headers. This inspection did not query the live Supabase migration-history table and cannot independently certify the actual remote migration ledger.

## 3. Lesson payload comparison

A quote-aware extraction of the `INSERT INTO public.lesson_content … VALUES … ON CONFLICT` tuples found:

- 38 lesson tuples in the 2026-10-19 migration.
- 38 lesson tuples in the 2026-10-24 migration.
- All 38 expected lesson keys occur exactly once in each migration.
- **13 of the 38 full SQL tuples are not byte-for-byte identical** between the two migrations.

Different tuple positions and keys:

| Tuple | Lesson key | Older tuple chars | Newer tuple chars |
|---:|---|---:|---:|
| 1 | `kurmanji-course-1-lesson-01.html` | 6,461 | 2,632 |
| 2 | `kurmanji-course-1-lesson-02.html` | 6,357 | 2,828 |
| 3 | `kurmanji-course-1-lesson-03.html` | 4,327 | 2,767 |
| 4 | `kurmanji-course-1-lesson-04.html` | 5,412 | 3,711 |
| 5 | `kurmanji-course-1-lesson-05.html` | 3,088 | 2,825 |
| 6 | `kurmanji-course-1-lesson-06.html` | 3,500 | 2,794 |
| 7 | `kurmanji-course-1-lesson-07.html` | 3,320 | 3,276 |
| 25 | `kurmanji-course-1-lesson-25.html` | 5,353 | 5,354 |
| 26 | `kurmanji-course-1-lesson-26.html` | 4,061 | 4,062 |
| 30 | `kurmanji-course-2-lesson-04.html` | 2,481 | 2,480 |
| 32 | `kurmanji-course-2-lesson-06.html` | 2,858 | 2,857 |
| 35 | `kurmanji-course-2-lesson-09.html` | 3,132 | 3,133 |
| 36 | `kurmanji-course-2-lesson-10.html` | 2,851 | 2,852 |

Tuple-length differences alone do not establish which lesson wording is academically preferable. They do establish that the two migration snapshots are not interchangeable and that the older header's claim of exact synchronization with the split seeds is stale relative to the current files.

The existing seed-parity validator points to the 2026-10-24 migration and reports its expected contract in code: 38 tuples, 26 + 12 unique ordered lesson keys, exact tuple equality against the five split seed files. This audit inspected that validator's target and comparison logic but did not execute the validator.

## 4. Validator and workflow target matrix

| Component | Migration target | Relevant behavior |
|---|---|---|
| `scripts/validate_kurmanji_package.py` | 2026-10-19 | Checks five safety strings and one row per expected lesson key against the older migration |
| `scripts/validate_kurmanji_sql.py` | 2026-10-24 | PostgreSQL syntax-parses the newer migration and five split seed files |
| `scripts/validate_kurmanji_seed_parity.py` | 2026-10-24 | Exact tuple comparison between newer migration and split seeds |
| `.github/workflows/validate-kurmanji-package.yml` path filter | 2026-10-24 | A change to the newer migration triggers the workflow; the older migration is not in the listed SQL path filter |

The five safety strings currently checked by `validate_kurmanji_package.py` were found in **both** migration files:
- `SET total_lessons = 32`
- `p_course_id = 'orthography-kurdik' OR NOT public.is_site_owner()`
- revoke of PUBLIC/anon execute on `can_read_lesson_content(text,text)`
- revoke of PUBLIC/anon execute on `complete_lesson(text,text)`
- `SET search_path TO ''`

So this audit does **not** claim that the newer migration currently lacks those controls. The defect is in the validator's target selection: a future change that removes one of these controls from the 2026-10-24 migration could escape the package validator's safety-string assertions because that validator reads the 2026-10-19 file instead. The SQL parser and seed-parity checks would not detect missing RPC security invariants.

## 5. Migration-history risk — unresolved, must be checked before any future push

Supabase migration files are timestamped and the two files have distinct versions. The older file header says it was not applied; the newer header says version `20261024122051` was applied. If the remote migration ledger does not record the older version as applied or otherwise reconciled, a future migration push may treat the 2026-10-19 file as pending and attempt to run it before the 2026-10-24 version.

That could matter because the older file contains different lesson payloads and replaces the same access/progression RPCs. Whether this can happen depends on the actual remote migration ledger and the precise CLI migration state; neither was inspected here.

**Do not run `supabase db push`, apply either migration, or alter migration history based only on these repository files.** Before any deployment work, an authorized maintainer should inspect the remote migration list/status read-only, compare it with both filenames, and decide whether the older migration is already recorded, intentionally excluded, or requires a formally reviewed reconciliation. Do not use `migration repair` or edit migration history as an informal fix.

## 6. Recommended remediation proposal (not applied)

1. Confirm the authoritative migration sequence against the actual remote migration ledger in a read-only review.
2. Declare one canonical current migration target in the repository's validation design.
3. Update the static safety-invariant validator to inspect the same migration as the SQL parser and seed-parity validator, or explicitly validate both snapshots with clear expected status and purpose.
4. Add a test assertion that all three validators agree on the selected migration path; fail if they drift.
5. Keep the seed-parity check against the intended deployable migration, and separately document any historical/superseded snapshot.
6. Add a release gate requiring a clean migration-status review before any database push.
7. Only after approval, change validator/workflow files in an isolated proposal branch. No production DB action is implied by this audit.

## 7. Verification boundaries

- Read-only GitHub file inspection and local in-memory comparison of returned file contents only.
- No CI workflow was run.
- No Python validator was run.
- No PostgreSQL parser was run.
- No Supabase connection or database query was made.
- No migration was applied or repaired.
- No lesson content, SQL, validator, workflow, application runtime or database file was modified.
- `main`, PR #3 and production deployment/database were not modified.

## 8. Files inspected

- `supabase/migrations/20261019090000_add_kurmanji_courses_and_protected_lessons.sql`
- `supabase/migrations/20261024122051_add_kurmanji_courses_and_protected_lessons.sql`
- `scripts/validate_kurmanji_package.py`
- `scripts/validate_kurmanji_sql.py`
- `scripts/validate_kurmanji_seed_parity.py`
- `.github/workflows/validate-kurmanji-package.yml`
- `docs/KURMANJI-SEED-MIGRATION-DIFF-REVIEW-2026-11-16.md`
- `docs/KURMANJI-PRODUCTION-DATA-READINESS.md`
