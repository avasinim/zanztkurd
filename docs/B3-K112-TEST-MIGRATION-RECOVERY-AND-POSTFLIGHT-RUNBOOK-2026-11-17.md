# B3-K112 — Test-only migration recovery and postflight runbook

- Date: 2026-11-17
- Repository: `avasinim/zanztkurd`
- Work branch: `fix/kurmanji-ci-current-migration`
- Starting HEAD: `16519399131f5b75cf09e73160573314ea89dc87`
- Pre-work backup: `backup/b3-k112-test-migration-recovery-plan-before-2026-11-17`
- Target test project: `zanztkurd-kurmanji-test` (`juwsjljbdwyncicybwoq`)
- Production project: `zanztkurd` (`hjpmorabqdhuchpnowiw`) — explicitly out of scope
- Migration: `20261116120000_reconcile_kurmanji_seed_content.sql`
- Migration blob SHA reviewed: `f7235b1f7919d4cf5af90e200e138d1cb45f9c47`

## Purpose and current status

This is a procedural runbook for a possible future test-project-only application. It does not grant permission to apply the migration and does not execute SQL.

The forward migration is transactional. It locks the 12 intended `public.lesson_content` rows, verifies each still matches the exact historical baseline tuple, applies the 12-row overlay, checks the affected-row count is exactly 12, and commits. Any failed guard raises an exception and rolls back the transaction.

The migration has no automatic down migration. It updates only `title`, `content_html`, and `updated_at` for those 12 rows. It does not update lesson keys, course IDs, progress, enrollments, or course catalog rows.

## Mandatory stop conditions before any write

Do not apply the migration unless every condition below is true:

1. The user has explicitly approved this exact migration write to test project `juwsjljbdwyncicybwoq`.
2. The active work branch, migration file, and reviewed migration blob SHA are re-verified immediately before application.
3. A new unique pre-apply Git backup exists at the exact active HEAD.
4. The Supabase project name/ref are confirmed from the live project metadata; the ref must equal `juwsjljbdwyncicybwoq`.
5. The test project's migration ledger does not already contain `20261116120000_reconcile_kurmanji_seed_content`.
6. A fresh read-only preflight confirms exactly 12 target rows, correct course IDs, and exact historical baseline values for all 12 rows.
7. The exact forward migration has passed the current repository CI checks.
8. No unexpected migration, schema, content, or permission drift is detected.

If any item fails, stop. Do not repair live data manually, skip guards, re-run the migration blindly, or switch to production.

## Application procedure (future, only after explicit approval)

1. Re-read the exact migration source and verify its blob SHA.
2. Confirm the target project ref again in the same execution context.
3. Apply only `20261116120000_reconcile_kurmanji_seed_content.sql` to the test project using the supported migration action. Never execute the five split draft seed files as migrations.
4. Capture the complete migration result. A successful tool response alone is not sufficient postflight evidence.
5. Do not run a second application attempt if the result is ambiguous. Inspect the migration ledger and data first.

## Required postflight checks

All checks must be read-only and target only the test project:

- Migration ledger contains the exact migration version/name once.
- Exactly 38 Kurmanji lesson rows remain: 26 in Course 1 and 12 in Course 2.
- All 12 target lesson keys still exist exactly once and retain their original `course_id`.
- The 12 target title/body values match the expected effective payload from the five split seed reference files (using the validated parity logic).
- Non-target Kurmanji lesson rows remain unchanged.
- Course catalog rows and enrollment rows are unchanged.
- `lesson_progress` row count and all progress records remain unchanged; use aggregate/key-level comparisons without exposing student identifiers.
- No unrelated table, policy, grant, Auth, or Storage change occurred.
- Run the existing browser regression suite. It is synthetic and does not substitute for a real authenticated learner session.
- If an authorized test learner account is available, verify login, enrollment, protected lesson rendering, sequential navigation, and completion through the server RPC. Do not invent credentials or use production learner accounts.

Any mismatch is a stop condition. Preserve evidence and investigate; do not make compensating writes automatically.

## Recovery / rollback decision

There is no automatic rollback in the forward migration. Recovery is a separate, explicitly approved test-database write and must never be improvised.

If rollback is needed:

1. Stop all further content edits and learner testing on the test project.
2. Take and verify a fresh post-incident backup/snapshot using the available approved database backup mechanism.
3. Read the migration ledger and compare the 12 current rows against the exact post-migration payload. If any target row has changed since application, stop: a blind restoration could overwrite legitimate newer work.
4. Prepare a separate, reviewed reverse script from the immutable historical migration payload for those same 12 keys. It must lock the rows, assert all 12 still equal the exact forward-migration result, update only `title`, `content_html`, and `updated_at`, and assert exactly 12 rows changed in one transaction.
5. Have the user explicitly approve that separate rollback write to the test project before execution.
6. After approved rollback, verify the 12 rows match the historical baseline, lesson keys/course IDs remain unchanged, progress/enrollment counts remain unchanged, and record migration-ledger handling accurately. Do not delete or falsify the original migration history entry.

If no exact guarded reverse script has been prepared and reviewed, the safe action is to leave the applied data untouched and escalate for a deliberate recovery plan.

## Authorization and safety boundary

- This runbook does not authorize any database write.
- General `continue` instructions are not treated as approval for this specific migration or a rollback.
- Test project only; production remains untouched and requires a separate explicit authorization.
- No lesson text, migration, database, schema, RLS, grants, Auth, Storage, deployment, PR, merge, or `main` changes were made in K112.

## Backup

- Pre-work backup: `backup/b3-k112-test-migration-recovery-plan-before-2026-11-17` at `16519399131f5b75cf09e73160573314ea89dc87`.
- Post-work backup: to be created at the report commit.
