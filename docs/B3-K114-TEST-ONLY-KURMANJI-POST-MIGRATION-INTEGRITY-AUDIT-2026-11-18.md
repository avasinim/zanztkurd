# B3-K114 — Test-Only Kurmanji Post-Migration Integrity Audit

**Date:** 2026-11-18  
**Scope:** Read-only verification of the test Supabase project after K113. No database writes, schema changes, migration applications, production access, deployment, merge, or lesson-content edits were performed.

## Repository and backup boundary

- Repository: `avasinim/zanztkurd`
- Working branch: `fix/kurmanji-ci-current-migration`
- Starting HEAD: `cb1dfd5ac13a5c0564ff7b761a10ef00092021e6`
- Main at audit start: `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`
- Pre-work backup: `backup/b3-k114-post-migration-audit-before-2026-11-18`
- Pre-work backup SHA: `cb1dfd5ac13a5c0564ff7b761a10ef00092021e6`

## Test project identity

- Project: `zanztkurd-kurmanji-test`
- Project ID: `juwsjljbdwyncicybwoq`
- Status: `ACTIVE_HEALTHY`
- PostgreSQL: `17.11.0.003`

The production project `hjpmorabqdhuchpnowiw` was not queried or modified during this audit.

## Lesson catalog integrity

A read-only SQL audit generated the expected 38 lesson keys from the fixed sequence (Course 1: 1–26; Course 2: 1–12) and compared them with `public.lesson_content`.

| Check | Result |
|---|---:|
| Expected Kurmanji lesson rows | 38 |
| Actual Kurmanji lesson rows | 38 |
| Expected keys found | 38 |
| Correct course assignments | 38 |
| Missing keys | 0 |
| Unexpected keys | 0 |
| Duplicate keys | 0 |
| Cross-course assignments | 0 |
| Empty title/body rows | 0 |
| Orphaned progress rows | 0 |

Course catalog values also match the expected structure:

- `kurmanji-course-1`: 26 lessons, keys 01–26.
- `kurmanji-course-2`: 12 lessons, keys 01–12.
- Total course records in the test project: 4.

The 12 rows in the K113 overlay key set all exist and have non-null `updated_at` values. K113's separate exact payload postflight had already established 12/12 exact content matches against the migration payload.

## Learner and catalog state

The read-only aggregate counts remain:

- `lesson_progress`: 5
- `enrollments`: 1
- `profiles`: 4
- `site_owners`: 1
- `courses`: 4

The audit found no progress row whose `lesson_key` and `course_id` fail to match a lesson-content row. These are aggregate integrity checks only; they do not constitute a sign-in or authenticated learner end-to-end test.

## Migration ledger observation — unresolved

The test project's migration ledger records the reconciliation as:

- Name: `reconcile_kurmanji_seed_content`
- Recorded version: `20261118062448`

The checked-in migration filename prefix is `20261116120000`. These values differ. This audit confirms the discrepancy remains; it does not establish its root cause. No attempt was made to edit, delete, reinsert, or otherwise repair migration history. Before any future CLI migration push/pull or migration deployment, the repository and test ledger must be reconciled deliberately using a documented, non-destructive plan.

## Outcome and limits

The test database's Kurmanji lesson catalog is structurally complete and internally consistent after K113: 26 + 12 lessons, correct course assignment, no missing/extra/duplicate keys, no empty lesson payloads, and no orphaned progress. The 12 reconciled rows remain present.

This audit does **not** establish that a real learner account can sign in, enroll, open protected lessons, complete lessons, or synchronize progress in a live browser session. CI/browser tests from earlier work are synthetic regression coverage, not a substitute for an authenticated learner acceptance test.

No content was changed. No production database write, test database write, schema change, migration application, RLS/grant/Auth/Storage change, site deployment, PR, merge, or update to `main` occurred.
