# B3-K113 — Test-only Kurmanji reconciliation migration execution and postflight

- Date: 2026-11-17
- Repository: `avasinim/zanztkurd`
- Work branch: `fix/kurmanji-ci-current-migration`
- Starting HEAD: `f509cfabcfab5832676c8adee54bebea21f117d3`
- Pre-apply backup: `backup/b3-k113-test-migration-apply-before-2026-11-18`
- Target project: `zanztkurd-kurmanji-test` (`juwsjljbdwyncicybwoq`)
- Production project: `zanztkurd` (`hjpmorabqdhuchpnowiw`) — not accessed for writes
- Source migration: `supabase/migrations/20261116120000_reconcile_kurmanji_seed_content.sql`
- Verified source blob SHA: `f7235b1f7919d4cf5af90e200e138d1cb45f9c47`

## Authorization and execution

The user explicitly authorized applying this exact reconciliation migration to the test project only. No authorization was given or used for production.

Before application:
- Confirmed test project ref exactly matched `juwsjljbdwyncicybwoq` and status was `ACTIVE_HEALTHY`.
- Confirmed the migration was absent from the test migration ledger.
- Created the unique pre-apply Git backup at the exact starting HEAD.
- Re-fetched the source migration and verified the reviewed blob SHA.
- Executed the migration's exact `DO $preflight$` guard inside a transaction that was rolled back; it completed successfully.
- Pre-apply aggregate counts: Course 1 = 26 lessons, Course 2 = 12, Kurmanji total = 38, lesson_progress = 5, enrollments = 1, courses = 4, target rows = 12.

Applied only the source migration to test project `juwsjljbdwyncicybwoq`. Supabase migration action returned `success: true`.

## Postflight verification

Read-only postflight reconstructed the exact expected 12-row overlay from the reviewed migration source and compared the database rows field-for-field:

| Check | Result |
|---|---:|
| Expected target rows | 12 |
| Actual target rows | 12 |
| Exact title + content + course_id matches | 12 |
| Mismatches | 0 |
| Course 1 lesson rows | 26 |
| Course 2 lesson rows | 12 |
| Total Kurmanji lesson rows | 38 |
| lesson_progress rows | 5 |
| enrollments rows | 1 |
| courses rows | 4 |

The progress, enrollment, and course counts match the immediately pre-apply aggregate snapshot. No student identifiers or lesson bodies were included in the verification output.

The test migration ledger now contains one entry named `reconcile_kurmanji_seed_content`, with recorded version `20261118062448`. **Important history detail:** this recorded version differs from the source file's timestamp prefix `20261116120000`. The migration application tool recorded the ledger version shown by the live database. This discrepancy is documented, not silently rewritten. Do not edit or delete the migration history entry; assess future CLI/repository migration synchronization before any additional migration deployment.

## Validation and limitations

- The latest repository package CI run before application, `44249297648`, succeeded. The prior migration/seed parity and browser regression CI checks were also successful (including 8/8 Playwright tests).
- The browser suite is synthetic; no real learner credentials were available or used, so a real authenticated learner journey was not claimed.
- No automatic rollback was attempted. Any reverse migration is a separate database write requiring separate explicit approval.

## Scope and safety boundary

- Test project only; no production SQL write.
- No changes to lesson keys, course IDs, progress, enrollments, course catalog, RLS, grants, Auth, Storage, site files, deployment, PR, merge, or `main`.
- No split draft seed file was executed.

## Backups

- Pre-apply backup: `backup/b3-k113-test-migration-apply-before-2026-11-18` at `f509cfabcfab5832676c8adee54bebea21f117d3`.
- Post-work backup: to be created at the report commit.
