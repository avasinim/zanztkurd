# B3-K155 — Seed Scanner Unit-Test Compatibility Audit
Date: 2026-11-18

## Result

Reviewed the new `scripts/test_kurmanji_seed_parity.py` against the current helper implementation in `scripts/validate_kurmanji_seed_parity.py` and the existing package-validation workflow.

The test module:
- Imports the validator by an explicit file path, so it does not depend on `scripts` being an installed package.
- Imports only standard-library modules (`importlib.util`, `pathlib`, `unittest`).
- Uses the four helper functions that exist in the validator: `extract_rows`, `extract_values_rows`, `tuple_string_values`, and `row_key`.
- Does not call `main()`, read the real lesson corpus, or connect to a database.
- Is directly runnable from repository root with `python scripts/test_kurmanji_seed_parity.py`.

## Compatibility review

The 23 test methods map to the existing helper signatures and current documented behavior. The fixture for an unterminated SQL literal was corrected to leave the second literal unclosed. The row-key whitespace fixture was aligned with the helper's current contract: whitespace is allowed after the opening parenthesis, but the tuple string itself must begin with `(`.

No obvious import-time dependency or test-discovery blocker was found by source inspection.

## Execution and CI status

Important limitation: this was a source compatibility review, not an execution. The 23 tests have not been run in a local checkout or CI, so no passing result is claimed.

The existing workflow `.github/workflows/validate-kurmanji-package.yml`:
- Runs Python 3.x.
- Runs the SQL parser, seed parity validator, package validator and browser regression script.
- Does not currently invoke `scripts/test_kurmanji_seed_parity.py`.
- Does not include the new test file in either `push.paths` or `pull_request.paths`.

Therefore, changes only to this new test module will not trigger the existing workflow, and the test suite is not yet part of automated CI. Adding the test command and its path to the workflow is a CI configuration change and remains outside this task's authorization. The previously identified four SQL path-filter omissions also remain unchanged.

## Recommended next verification

Run from a clean checkout of the work branch:

```bash
python scripts/test_kurmanji_seed_parity.py
python scripts/validate_kurmanji_seed_parity.py
python scripts/validate_kurmanji_sql.py
python scripts/validate_kurmanji_package.py
```

Then, after explicit approval for the exact CI configuration edit, add the unit-test invocation and path to both relevant workflow filters. Keep the existing checks in place.

## Scope

This K155 task is documentation-only. No test or validator code, workflow, lesson, seed, migration, package dependency, database, Auth, RLS, grant, deployment, PR, merge or main branch was changed.

## Backup and branch references

- Work branch: `fix/kurmanji-ci-current-migration`
- Starting HEAD: `de034a2815dddab398a3d64520ae6cbc7839f0bc`
- Main observed before work: `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`
- Pre-work backup: `backup/b3-k155-test-compatibility-audit-before-2026-11-18`
- Post-work backup: recorded after the report commit.
