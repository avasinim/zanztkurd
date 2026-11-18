# B3-K104 — Kurmanji repository seed vs migration vs database parity audit

- Date: 2026-11-18
- Repository: `avasinim/zanztkurd`
- Work branch: `fix/kurmanji-ci-current-migration`
- Starting HEAD: `8a35c83e6c7111b53e5716dbc6b6846aa4aeba2c`
- Pre-work backup: `backup/b3-k104-seed-migration-parity-before-2026-11-18`
- Production project: `zanztkurd`
- Test project: `zanztkurd-kurmanji-test`
- Scope: hash-only comparison of 38 lesson title/body payloads in the current checked-in production migration against both databases; separate hash-only comparison of the five split SQL seed files against both databases.

## Executive finding

The authoritative checked-in migration payload for Kurmanji and both connected databases match exactly for all 38 lesson titles and bodies. The five split files under `docs/kurmanji-content-seed-part-*.sql`, however, are marked as DRAFT DATA SEED and do not match the stored lesson bodies for 12 of the 38 lessons. Their titles match for all 38.

This distinction matters: production and test are synchronized with each other and with the current migration, but the older draft seed package is not a byte-for-byte source of truth for all current lesson bodies.

## 1. Current migration vs production and test

Parsed exactly 38 Kurmanji rows from:
`supabase/migrations/20261024122051_add_kurmanji_courses_and_protected_lessons.sql`

For each row, compared MD5 digests computed in SQL for the migration's literal title and `content_html` against the corresponding stored row in each project. Only lesson keys and boolean match results were returned.

| Measure | Production | Test |
|---|---:|---:|
| Expected rows | 38 | 38 |
| Rows present | 38 | 38 |
| Title hash matches | 38 | 38 |
| Body hash matches | 38 | 38 |
| Body mismatches | 0 | 0 |

Thus, both databases currently match the checked-in migration payload for all 38 Kurmanji lesson titles and bodies.

## 2. Five split draft seed files vs databases

Parsed the 38 lesson rows from:
- `docs/kurmanji-content-seed-part-01.sql`
- `docs/kurmanji-content-seed-part-02.sql`
- `docs/kurmanji-content-seed-part-03.sql`
- `docs/kurmanji-content-seed-part-04.sql`
- `docs/kurmanji-content-seed-part-05.sql`

The files identify themselves as draft data seeds. Comparison against both production and test produced identical outcomes:

| Measure | Production | Test |
|---|---:|---:|
| Expected rows | 38 | 38 |
| Rows present | 38 | 38 |
| Title hash matches | 38 | 38 |
| Body hash matches | 26 | 26 |
| Body hash mismatches | 12 | 12 |

The 12 body mismatches, in both environments, are:
- Course 1: lessons 01–06, 10, and 25.
- Course 2: lessons 04, 06, 09, and 10.

The remaining 26 bodies match. All 38 titles match. No lesson bodies or titles were returned to the client or included in this report.

## 3. Documentation inconsistency

The header comment in the current migration states that all 38 title/content payloads are synchronized exactly with the five split seed files after spelling fixes. The hash comparison contradicts the body-synchronization portion of that statement for 12 lessons.

The split seed files themselves explicitly identify as draft data seeds and caution against treating them as a production migration. The likely safe interpretation is that these files are historical/draft snapshots, while the current migration is the payload that matches both connected databases. This audit does not infer which wording is pedagogically preferred or authorize overwriting either source.

## 4. Safety and integrity limits

- Hashes were computed in SQL; only lesson keys and boolean match flags were returned.
- No lesson body, title text, student identifiers, profiles, enrollment details, or individual progress rows were retrieved.
- MD5 was used as a practical parity checksum, not as a cryptographic authenticity signature.
- No content was edited, normalized, or replaced.
- No SQL writes, DDL, migrations, grants, RLS, Auth, Storage, deployment, CI, merge, or `main` updates.
- Repository change is documentation only.

## 5. Recommended next actions

1. Treat `20261024122051_add_kurmanji_courses_and_protected_lessons.sql` as the current database-aligned snapshot for the 38 lesson payloads, subject to the normal content-owner approval process.
2. Do not apply the five draft seed files to either database; doing so could replace 12 currently synchronized lesson bodies with older/different content.
3. Ask the content owner to decide whether the five draft seed files should be refreshed from the migration, explicitly archived as historical drafts, or retained with a clear warning. Do not perform that content change automatically.
4. Correct the migration's misleading synchronization comment only through a separately reviewed documentation change; do not rewrite an already-applied migration.
5. Improve CI so it distinguishes draft seed key coverage from canonical migration/database payload parity. Do not make CI assume the draft files' bodies are authoritative.

## Backup and change record

- Pre-work backup: `backup/b3-k104-seed-migration-parity-before-2026-11-18` at `8a35c83e6c7111b53e5716dbc6b6846aa4aeba2c`.
- Post-work backup: to be created at the report commit.
- CI: not run; documentation-only change.
