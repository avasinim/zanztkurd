# Kurmanji Forward Reconciliation Implementation and CI Verification — 2026-11-16

## Outcome

Implemented a guarded, forward-only reconciliation for the 12 Kurmanji lesson payloads that drifted between the historical release migration and the later split seed package. The historical migration and all five seed files remain unchanged. The effective payload is now statically validated against the current seed package.

## Editorial rule retained

The current split seeds are the working source for post-release content. The Sorani explanatory text follows the repository's documented Avasin house style. In particular, the forms `نوسین`, `پەیویست`, and `ڕون` are intentional project mappings in `script.js` and are required by `scripts/validate_kurmanji_package.py`; they were not normalized to general Sorani spellings.

The earlier editorial decision note was corrected accordingly:
- [Evidence-led editorial decision and forward repair plan](KURMANJI-EVIDENCE-LED-EDITORIAL-DECISION-AND-FORWARD-REPAIR-PLAN-2026-11-17.md)

## Changes made on the isolated work branch

Branch: `fix/kurmanji-ci-current-migration`

1. Added `supabase/migrations/20261116120000_reconcile_kurmanji_seed_content.sql`.
   - Updates only the 12 known post-release drift rows.
   - Locks and checks all 12 existing rows against the exact historical release payload (course, title and HTML) before writing.
   - Aborts the transaction if any row is missing or differs from the recorded release baseline.
   - Uses the exact current seed tuples as the target payload.
   - Checks that exactly 12 rows were affected.
   - Does not alter the historical migration or the other 26 lesson rows.

2. Reworked `scripts/validate_kurmanji_seed_parity.py`.
   - Verifies the historical migration's Git blob SHA is still `06320c50a858e41d8ce21e7b4fdee3f6ae418cd9`.
   - Verifies the 38 ordered historical keys and 38 ordered seed keys.
   - Requires the forward migration to contain exactly the 12 known drift keys.
   - Applies the overlay in memory and compares the effective 38 tuples exactly with the five seed files.

3. Updated `scripts/validate_kurmanji_sql.py` to parse the new forward migration.

4. Updated `.github/workflows/validate-kurmanji-package.yml` so both push and pull-request path filters include the new migration.

No seed file, lesson page, runtime code, production setting or database was changed.

## Verification

GitHub Actions run: [44030537924](https://github.com/avasinim/zanztkurd/actions/runs/44030537924)

**Status: success** All job steps completed successfully:
- PostgreSQL parser: historical migration, new forward migration, and all five seed files parsed.
- Parity validator: historical baseline blob unchanged; 38 keys in expected order; exactly 12 overlay rows; effective payload exactly matches all five seed files.
- Package validator: all 38 lesson pages, seed keys, route/navigation and runtime integration checks passed.
- Playwright browser tests: 3/3 passed (catalog routing, learning-path visibility/restoration, and 390px mobile overflow).

The Playwright tests use the repository's existing mocked Supabase/browser harness. They do not prove live Supabase authentication, RLS, database state, or production migration execution.

## Safety boundary

- The new migration has **not** been applied to any database.
- No Supabase connection or production query was made.
- No merge, deployment, PR creation, or change to `main` was made.
- The preflight guard is designed to stop if the live rows are not exactly the expected release snapshot. This is a source-level safety design, not a substitute for a separately authorized disposable-database rehearsal.
- Before any eventual production application, first rehearse the migration against a disposable database built from the recorded schema/release snapshot and inspect its exact before/after rows.

## Commit sequence

- Corrected Avasin house-style decision: `9a9e22ae7b37c84e54043bf01f656829ca2043b3`
- Guarded forward migration: `d4d211ef6cd453dcb8aa900dc8e4e9b4eb2d6509`
- SQL parser coverage: `74ade8c0fdb274342d214d6e861d37e01dc1ad64`
- Effective parity validator: `cd5500dc7da0d47e69e33fb242ca98401e3b8230`
- Workflow path coverage / successful CI: `e34497b8e07ee773c4d267aa63ec8ebe674ada3c`

## Branch and backup record

- Work branch HEAD: `e34497b8e07ee773c4d267aa63ec8ebe674ada3c`
- `main` HEAD independently rechecked: `4ebd824ff9502ad71936ee9bdfa787ed898b11a8` (unchanged by this work).
- Pre-work backup: `backup/kurmanji-forward-reconciliation-before-2026-11-16` at `c3735c5bd4ef1931dbd2e2c50dc28cc4eb3bd660`.
- Post-work backup: to be created at the final documentation commit and verified against the work branch HEAD.
