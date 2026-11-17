# Kurmanji Lesson / Seed / Migration Canonical-Source Audit
Date: 2026-11-17
Branch: fix/kurmanji-ci-current-migration
Starting HEAD: eee3be5a4b716fe214951b8d91bb38adc5d33058
Pre-work backup: backup/kurmanji-canonical-source-audit-before-2026-11-17
Scope: static repository inspection only; no database connection or migration execution.

## Executive result

The repository has several distinct layers that must not be conflated:

1. The root-level files `kurmanji-course-1-lesson-01.html` … `kurmanji-course-1-lesson-26.html` and `kurmanji-course-2-lesson-01.html` … `kurmanji-course-2-lesson-12.html` are the visible standalone lesson pages for the two Kurmanji courses. The first Course 2 page identifies itself as «مۆرفۆلۆجی و پێکهاتەی وشە» and says it is a lesson of the Kurmanji morphology/grammar course.
2. The five `docs/kurmanji-content-seed-part-*.sql` files are explicitly labelled DRAFT DATA SEED. Their headers say their HTML card sections were extracted from current static lesson pages. They are database payload snapshots, not proof of editorial approval or live deployment.
3. The migration `20261024122051_add_kurmanji_courses_and_protected_lessons.sql` is the historical 38-row release snapshot. Its header states it was applied to production on 2026-10-24; this audit did not independently query the live database.
4. The migration `20261116120000_reconcile_kurmanji_seed_content.sql` is a later forward-only reconciliation overlay. It declares the five split seed files as its source and contains exactly 12 distinct lesson keys: 8 Course 1 rows and 4 Course 2 rows. It is not a replacement for the historical migration and has not been executed or verified against the live database here.
5. The separate `lessons/course-2-01.html` … `lessons/course-2-12.html` files belong to the older phonetics/phonology course navigation, not the Kurmanji morphology/grammar Course 2. For example, `course-2.html` titles itself «فۆنێتیک و فۆنۆلۆجی زوانی کوردیک», while root `kurmanji-course-2-lesson-01.html` is «مۆرفۆلۆجی و پێکهاتەی وشە». This naming collision is a high-risk source-selection trap.

## Repository object inventory and hashes

| Object | Git blob SHA | Bytes / note |
|---|---|---:|
| `kurmanji-course-2-lesson-01.html` | `7bbff150b81323b730b55044d33202c269b1aff4` | 3,424 |
| `kurmanji-course-2-lesson-07.html` | `cdfe36d254b8f52268c8f2fa7c96f5e9185d0671` | 3,501 |
| `docs/kurmanji-content-seed-part-04.sql` | `2367c5057b2b92b7fa482c64a30b05d26838d964` | 34,331 |
| `docs/kurmanji-content-seed-part-05.sql` | `e40298225e03921edb3ad31704191bdf0c20e880` | 24,128 |
| `supabase/migrations/20261019090000_add_kurmanji_courses_and_protected_lessons.sql` | `e97e15162763918f7b712fb804847ab68c647bc4` | 205,902 |
| `supabase/migrations/20261024122051_add_kurmanji_courses_and_protected_lessons.sql` | `06320c50a858e41d8ce21e7b4fdee3f6ae418cd9` | 187,231 |
| `supabase/migrations/20261116120000_reconcile_kurmanji_seed_content.sql` | `f7235b1f7919d4cf5af90e200e138d1cb45f9c47` | 127,460 |
| `course-2.html` | `45393930fe354c69ca1e8bba48a2535925ddbab3` | 17,188 |

The complete Course 2 standalone page family is present as root files `kurmanji-course-2-lesson-01.html` through `kurmanji-course-2-lesson-12.html`. The seed partition is explicit: part 04 contains Course 2 lessons 01–06 after Course 1 lessons 25–26; part 05 contains Course 2 lessons 07–12.

## Course 2 row map (12 lessons)

| Lesson | Standalone page | Seed partition | Historical release migration | Reconciliation migration | Current authority |
|---:|---|---|---|---|---|
| 01 | root `kurmanji-course-2-lesson-01.html` | part 04 | row present | no row | unresolved |
| 02 | root `kurmanji-course-2-lesson-02.html` | part 04 | row present | no row | unresolved |
| 03 | root `kurmanji-course-2-lesson-03.html` | part 04 | row present | no row | unresolved |
| 04 | root `kurmanji-course-2-lesson-04.html` | part 04 | row present | row present | unresolved; overlay payload selected by migration |
| 05 | root `kurmanji-course-2-lesson-05.html` | part 04 | row present | no row | unresolved |
| 06 | root `kurmanji-course-2-lesson-06.html` | part 04 | row present | row present | unresolved; overlay payload selected by migration |
| 07 | root `kurmanji-course-2-lesson-07.html` | part 05 | row present | no row | unresolved |
| 08 | root `kurmanji-course-2-lesson-08.html` | part 05 | row present | no row | unresolved |
| 09 | root `kurmanji-course-2-lesson-09.html` | part 05 | row present | row present | unresolved; overlay payload selected by migration |
| 10 | root `kurmanji-course-2-lesson-10.html` | part 05 | row present | row present | unresolved; overlay payload selected by migration |
| 11 | root `kurmanji-course-2-lesson-11.html` | part 05 | row present | no row | unresolved |
| 12 | root `kurmanji-course-2-lesson-12.html` | part 05 | row present | no row | unresolved |

The reconciliation migration's 12 unique keys are exactly:
- Course 1: lessons 01–06, 10, 25 (8 rows)
- Course 2: lessons 04, 06, 09, 10 (4 rows)

Therefore, describing the 12-row overlay as a Course 1-only repair would be incorrect. The overlay affects four Course 2 lessons as well.

## Provenance and chronology

- Seed part 04 history includes successive content/source refinements on 2026-10-22 and spelling corrections on 2026-10-24/25. The visible history includes source-attribution and grammar-clarification commits, followed by Sorani house-spelling changes.
- Seed part 05 history includes source-backed revisions for Course 2 lessons 7–11 on 2026-10-22, Avasin spelling changes on 2026-10-22/24, and citation adjustments. This confirms that the current seed is a later editorial snapshot, not a frozen original.
- The historical migration `20261024122051` is present in repository history as an immutable release file. Its header claims production application on 2026-10-24. Its source comment says the 38 payloads were synchronized with the five split seed files at that time.
- The earlier `20261019090000` migration is a distinct pre-release migration object. It is not interchangeable with the 2026-10-24 release snapshot.
- The 2026-11-16 reconciliation migration explicitly says the historical release migration remains unchanged and the five split seed files are its intended source. Its history shows a guarded forward reconciliation commit and a subsequent RR-digraph correction. The repository's commit history alone does not prove that the overlay ran successfully on production.

## Authority classification

| Layer | What it can establish | What it cannot establish |
|---|---|---|
| Root standalone lesson HTML | Current authored/rendered page content in this branch | That the DB row equals the page or that this is formally approved final copy |
| Split seed SQL | Explicit database row keys, titles, payload snapshots and intended seed partition | That it is editorially canonical merely because it is called a source by a migration |
| 2026-10-24 migration | Historical release payload and recorded production-application claim | Current live row state or approval of later seed edits |
| 2026-11-16 reconciliation migration | Exact guarded forward overlay payload and the 12 target keys | Successful execution, live DB equality, or independent editorial sign-off |
| `lessons/course-2-XX.html` | Phonetics/phonology course pages | Kurmanji morphology Course 2 source |

**Conclusion:** the repository provides an operational precedence rule for the forward overlay (the split seed files are the stated payload source), but it does not establish a complete editorial canonical-source policy. For each Course 2 lesson, the root page and seed row must be compared at the decoded HTML payload level, and the seed-to-release delta must be reviewed. No layer should be declared the final editorial authority solely from filenames or comments.

## Required next verification before any correction

1. Decode and compare all 12 Course 2 page bodies against the corresponding seed `content_html` values, preserving exact Unicode and HTML. Record page/seed hashes and classify differences as content, spelling, markup, or metadata.
2. Compare the six Course 2 rows in seed parts 04–05 against the historical 2026-10-24 migration and the four Course 2 rows in the 2026-11-16 overlay. Record exact before/after payload hashes and the reason each overlay row exists.
3. Obtain explicit editorial authority for any disputed Sorani house spellings or lesson-body changes; do not infer approval from commit authorship or migration comments.
4. If live-state verification is later authorized, use the separately prepared read-only metadata plan. Do not execute migrations as a substitute for read-only verification.
5. Keep the separate phonetics course pages and the Kurmanji morphology Course 2 pages distinct in all future queries, documentation, and tests.

## Change and safety statement

- Documentation-only audit.
- No lesson page, seed SQL, migration, schema, validator, application code, test, or CI workflow changed.
- No Supabase connection, database query, migration execution, deployment, PR edit, or merge occurred.
- `main` remains untouched.
- This report is an evidence inventory, not release certification and not editorial approval.
