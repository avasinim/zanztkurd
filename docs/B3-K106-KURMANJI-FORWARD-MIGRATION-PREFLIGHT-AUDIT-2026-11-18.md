# B3-K106 — Kurmanji forward-migration preflight and atomicity audit

- Date: 2026-11-18
- Repository: `avasinim/zanztkurd`
- Work branch: `fix/kurmanji-ci-current-migration`
- Starting HEAD: `3fb4b786276853cedf6970783de1c118913e0d40`
- Pre-work backup: `backup/b3-k106-forward-migration-preflight-before-2026-11-18`
- Production project: `zanztkurd` (`hjpmorabqdhuchpnowiw`)
- Test project: `zanztkurd-kurmanji-test` (`juwsjljbdwyncicybwoq`)
- Forward migration reviewed: `20261116120000_reconcile_kurmanji_seed_content.sql`

## Executive finding

The forward migration's 12-row preflight matches the current stored baseline exactly in both production and test. The migration itself is structured as one transaction, locks the 12 rows during its preflight, refuses to proceed if the expected baseline rows are not all present and exact, then applies a 12-row upsert and checks the affected-row count before commit.

This confirms the migration's current precondition against both connected projects. It does **not** mean the migration has been applied or that the new lesson content is approved for publication.

## 1. Live read-only preflight simulation

The preflight VALUES block was parsed from the checked-in forward migration. It contains exactly 12 expected baseline tuples:
- Course 1: lessons 01–06, 10, and 25 (8 rows).
- Course 2: lessons 04, 06, 09, and 10 (4 rows).

A read-only SQL comparison checked each tuple against `public.lesson_content` by exact equality of `lesson_key`, `course_id`, `title`, and `content_html`. The query returned only aggregate counts and mismatching keys; no lesson text was returned.

| Result | Production | Test |
|---|---:|---:|
| Expected preflight rows | 12 | 12 |
| Exact matches | 12 | 12 |
| Mismatches / missing rows | 0 | 0 |

The simulation mirrors the migration's expected-data comparison but does not acquire persistent locks and does not execute the migration.

## 2. Migration safety review

Static inspection confirmed:

1. One explicit `BEGIN` and one `COMMIT`.
2. The preflight uses `FOR UPDATE OF actual`, retaining row locks through the transaction.
3. The preflight checks that exactly 12 expected baseline rows matched; otherwise it raises an exception.
4. The write phase inserts the 12 seed payloads and uses `ON CONFLICT (lesson_key) DO UPDATE`.
5. The conflict update is restricted to rows whose existing `course_id` matches the expected course.
6. The write phase counts the changed rows and raises an exception unless exactly 12 rows changed.
7. Any raised exception prevents the transaction from committing partial content changes.

## 3. Migration history

Read-only migration-ledger inspection confirms:
- Production still ends at `20261024122051_add_kurmanji_courses_and_protected_lessons`.
- The forward reconciliation migration is not recorded in production.
- The test project also does not record this forward migration in its migration ledger.

The live preflight rows match the migration's expected baseline in both projects, but neither ledger establishes that the reconciliation has been applied.

## 4. CI hardening

Updated `scripts/validate_kurmanji_seed_parity.py` to verify:
- the preflight contains exactly the same 12 keys as the intended overlay;
- each guarded baseline tuple exactly matches the corresponding historical migration tuple (the four content fields are compared, while the historical insert's timestamp expression is intentionally excluded);
- transaction BEGIN/COMMIT boundaries exist;
- row locking, the 12-row preflight abort, and the 12-row apply-count abort remain present;
- the existing immutable-baseline, exact 12-row overlay, and effective 38-row seed parity checks continue to pass.

No lesson titles or bodies were edited.

## 5. CI verification

GitHub Actions:
- Run ID: `44246645015`
- Commit: `c228c95ec46a32d642174cab524f26451314a9b6`
- Result: **success**
- PostgreSQL parser: passed for both migrations and all five split seed files.
- Forward-migration/preflight and exact seed parity validator: passed.
- Kurmanji package validator: passed.
- Playwright: all 8 north-circle browser regression tests passed.

Run URL: https://github.com/avasinim/zanztkurd/actions/runs/44246645015

Intermediate CI attempts during validator development exposed validator implementation issues (tuple parsing of the historical timestamp expression and a mismatch in the SQL row-count pattern). Those checks were corrected; the final run above is green. No application/runtime failure was found in those intermediate runs.

## 6. Safety boundary and recommendation

- No migration was applied to test or production.
- No lesson content was changed in either database or repository.
- No DDL, RLS, grants, Auth, Storage, deployment, merge, or `main` update.
- No student-level records or lesson bodies were retrieved in the live SQL checks.
- The public website remains unchanged.

The 12-row preflight is currently satisfied in both projects. The next responsible step, before any content change, is content-owner approval of the 12-row payload and an explicitly approved test-environment application. Only after the test result, row hashes, and learner-facing rendering are verified should production rollout be considered separately.

## Backup and change record

- Pre-work backup: `backup/b3-k106-forward-migration-preflight-before-2026-11-18` at `3fb4b786276853cedf6970783de1c118913e0d40`.
- Post-work backup: to be created at the report commit.
- Code change: `scripts/validate_kurmanji_seed_parity.py` only.
- Report change: this file.
