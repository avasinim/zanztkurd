# B3-K110 — Supabase test-project reconciliation readiness snapshot

- Date: 2026-11-18
- Repository: `avasinim/zanztkurd`
- Work branch: `fix/kurmanji-ci-current-migration`
- Starting HEAD: `f605284ea26c02f0633d98836b5f323eba5272e0`
- Supabase test project: `zanztkurd-kurmanji-test`
- Project ref: `juwsjljbdwyncicybwoq`
- Pre-work backup: `backup/b3-k110-test-project-readiness-before-2026-11-18`

## Read-only verification

The test project returned status `ACTIVE_HEALTHY` (PostgreSQL 17.11).

The current migration ledger ends at:

- `20261024121045_validate_kurmanji_release_course_data_and_progression`

The forward reconciliation migration `20261116120000_reconcile_kurmanji_seed_content` is not present in the test project's migration ledger.

A read-only aggregate query returned:

| Test-project content count | Rows |
|---|---:|
| Course 1 Kurmanji lesson rows | 26 |
| Course 2 Kurmanji lesson rows | 12 |
| All Kurmanji lesson rows | 38 |
| Target rows for the proposed 12-row reconciliation | 12 |

This confirms that the 12 target keys exist and that the two Kurmanji course row counts remain 26 + 12. The query returned aggregate counts only; it did not retrieve lesson bodies, student identifiers, or progress rows.

Earlier K106/K107 read-only preflight checks established that all 12 test-project target rows matched the migration's exact historical baseline values, and that the proposed overlay would update those 12 rows. This K110 snapshot does not independently repeat the full content-value comparison.

## Decision boundary

The test project is healthy and the target rows are present. However, the migration remains unapplied. This report is a readiness snapshot, not permission to write to the database.

No SQL migration, DDL, DML, migration-ledger insert, RLS/policy/grant change, Auth/Storage change, lesson-content edit, or deployment was performed.

Production project `zanztkurd` was not touched or queried in this K110 step.

## Recommendation

The remaining step is a test-only migration application followed by the authenticated learner postflight described in K108. It requires explicit approval for this specific write to `juwsjljbdwyncicybwoq`. Production rollout remains a separate decision and is outside this scope.

## Backup

- Pre-work backup: `backup/b3-k110-test-project-readiness-before-2026-11-18` at `f605284ea26c02f0633d98836b5f323eba5272e0`.
- Post-work backup: to be created at the report commit.
