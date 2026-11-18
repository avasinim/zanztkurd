# B3-K111 — Forward migration artifact identity and CI boundary audit

- Date: 2026-11-17
- Repository: `avasinim/zanztkurd`
- Work branch: `fix/kurmanji-ci-current-migration`
- Starting HEAD: `ffa6b807a8634c37a4aed595b38151cfd9e6359f`
- Pre-work backup: `backup/b3-k111-migration-artifact-boundary-before-2026-11-17`
- Forward migration: `supabase/migrations/20261116120000_reconcile_kurmanji_seed_content.sql`
- Forward migration Git blob SHA: `f7235b1f7919d4cf5af90e200e138d1cb45f9c47`

## Work performed

A final source review confirmed that the forward migration remains a separate, forward-only reconciliation. The historical release migration remains untouched. The forward migration has an explicit transaction, a row-locked preflight against the exact historical baseline for the 12 intended keys, an exact 12-row preflight count guard, and an exact 12-row apply count guard.

The apply phase contains one insert/upsert targeting `public.lesson_content`. Its update set is restricted to `title`, `content_html`, and `updated_at`, with a `course_id` match. It does not write to learner progress, enrollments, or the course catalog. The migration is not applied by this audit.

One harmless validator cleanup was made in `scripts/validate_kurmanji_seed_parity.py`: removed a duplicate unreachable diagnostic print immediately after a `return 1`. No validation logic, migration SQL, lesson text, or application runtime behavior changed.

## CI verification

GitHub Actions run: [44249297648](https://github.com/avasinim/zanztkurd/actions/runs/44249297648)

- Result: success.
- PostgreSQL parser: passed for the historical migration, forward migration, and all five split seed files.
- Seed parity validator: passed; 38 baseline rows, 38 seed rows, exact 12-row overlay and preflight, effective payload parity, and all 38 static H1/protected-key checks.
- Kurmanji package validator: passed.
- Playwright browser regression suite: 8 tests passed.

## Database authorization boundary

The test project's latest read-only readiness snapshot is documented in K110. The forward migration remains unapplied. A general request to continue work is not treated as approval for a database write. Applying this migration still requires explicit approval limited to the test project `juwsjljbdwyncicybwoq`. Production project `hjpmorabqdhuchpnowiw` remains out of scope and requires a separate authorization.

## Safety and scope

- No Supabase connection or database query was made in K111.
- No migration, DDL, DML, migration-ledger, RLS, policy, grant, Auth, or Storage change was made.
- No lesson page, lesson content, seed file, or migration payload was changed.
- No deployment, PR, merge, or `main` update was performed.

## Backup

- Pre-work backup: `backup/b3-k111-migration-artifact-boundary-before-2026-11-17` at `ffa6b807a8634c37a4aed595b38151cfd9e6359f`.
- Post-work backup: to be created at the report commit.
