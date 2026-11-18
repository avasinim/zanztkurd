# B3-K105 — Kurmanji reconciliation migration and CI source-of-truth clarification

- Date: 2026-11-18
- Repository: `avasinim/zanztkurd`
- Work branch: `fix/kurmanji-ci-current-migration`
- Pre-work HEAD: `b619a47004c73b38c9426f1453eaf10b1749f9df`
- Pre-work backup: `backup/b3-k105-draft-seed-ci-guard-before-2026-11-18`
- Final code HEAD before this report: `f119a019c916356545e38dc135cc8e43eec85cda`
- Production project: `zanztkurd` (`hjpmorabqdhuchpnowiw`)
- Test project: `zanztkurd-kurmanji-test` (`juwsjljbdwyncicybwoq`)

## Executive correction to K-104

K-104 correctly found that the five split seed files differ from the historical release migration on exactly 12 lesson bodies, while both databases matched the historical migration snapshot at the time of the hash query. However, its recommendation to treat the historical migration as the sole current source and simply avoid the split seeds was incomplete.

The repository also contains a forward-only migration:
`supabase/migrations/20261116120000_reconcile_kurmanji_seed_content.sql`

That migration intentionally reconciles the 12 post-release content changes. The companion validator `scripts/validate_kurmanji_seed_parity.py` verifies:
- the historical migration remains byte-identical to its recorded Git blob;
- the five split files contain all 38 expected ordered lesson keys;
- the forward migration updates exactly the 12 identified drifted rows;
- the effective payload after the forward migration matches all five split seed files exactly.

Therefore, the split seed files are not standalone production migrations, but they are the declared content source for the controlled forward reconciliation. Do not apply them directly. The reviewed forward migration is the mechanism that coordinates those changes.

## Live migration-ledger verification

Read-only `list_migrations` checks were performed again:

- Production ledger ends at `20261024122051_add_kurmanji_courses_and_protected_lessons`.
- Production ledger does not contain `20261116120000_reconcile_kurmanji_seed_content`.
- Test project ledger also does not contain that forward migration (its recorded history is a separate test-specific chain).

This is a migration-history finding, not a claim that the forward migration is safe to apply without preflight. No database writes were performed. The forward migration contains a preflight intended to refuse unexpected baseline drift; it still requires a controlled review and an approved test-first rollout.

## K-105 CI validator improvements

Updated only `scripts/validate_kurmanji_package.py` to add explicit static checks:
1. Every split seed file must retain its `DRAFT DATA SEED` header marker.
2. The latest checked-in migration must contain exactly one row for each of the 38 expected Kurmanji lesson keys.
3. The split seed package must contain exactly one reference row for each expected key.
4. Existing package/page/navigation/access checks remain in place.

The dedicated `validate_kurmanji_seed_parity.py` remains responsible for validating the exact 12-row forward overlay and the effective post-migration payload. No lesson title/body content was edited.

## CI verification

GitHub Actions run:
- Run ID: `44246224035`
- Commit: `f119a019c916356545e38dc135cc8e43eec85cda`
- Result: **success**
- PostgreSQL parser: both migrations and all five split seed SQL files parsed successfully.
- Seed parity: historical baseline, 12-row overlay, and effective seed payload checks passed.
- Package validator: passed.
- Playwright: all 8 north-circle browser regression tests passed.

Run URL: https://github.com/avasinim/zanztkurd/actions/runs/44246224035

Earlier failed runs during development were caused by validator-edit issues (first a Python syntax error, then an overly strict header check on two valid concise draft headers). Both were corrected; the final run above is green.

## Safety boundary

- No lesson content was changed.
- No SQL was executed against either database except read-only migration-ledger inspection.
- No migration, DDL, RLS, grants, Auth, Storage, or production data was changed.
- No workflow configuration, `main`, merge, pull request, or deployment was changed.
- Production public site remains unchanged.

## Recommendation

Before any deployment, run the forward migration against a disposable copy or the designated test environment using its documented preflight, verify the resulting 38-row hashes, then obtain explicit production rollout approval. Since production does not yet record the forward migration, do not assume the 12-row reconciliation has been deployed there.

## Backup and change record

- Pre-work backup: `backup/b3-k105-draft-seed-ci-guard-before-2026-11-18` at `b619a47004c73b38c9426f1453eaf10b1749f9df`.
- Post-work backup: to be created at the report commit.
- Code change: `scripts/validate_kurmanji_package.py` only.
- Report change: this file.
