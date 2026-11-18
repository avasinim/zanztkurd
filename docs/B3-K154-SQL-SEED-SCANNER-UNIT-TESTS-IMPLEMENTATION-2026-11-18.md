# B3-K154 — Synthetic Unit Tests for Kurmanji Seed Scanner
Date: 2026-11-18

## Outcome

Added `scripts/test_kurmanji_seed_parity.py`, a standard-library `unittest` module containing 23 focused synthetic tests for the existing parser helpers. The tests import the validator module by file path and do not invoke its `main()` routine.

Test groups:
- `extract_rows`: 9 cases covering ordinary rows, commas/parentheses in strings, doubled apostrophes, nested expressions, missing markers, empty blocks, unbalanced tuples and unterminated strings.
- `extract_values_rows`: 4 cases covering marker-delimited rows, missing markers, empty blocks and unterminated strings.
- `tuple_string_values`: 7 cases covering quoted commas, doubled apostrophes, nested expressions, empty literals, raw SQL expressions and malformed boundaries.
- `row_key`: 3 cases covering valid literal prefixes, escaped apostrophes and invalid/missing literal fields.

## Running the tests

From the repository root:

```bash
python scripts/test_kurmanji_seed_parity.py
```

The test module uses only Python's standard library; no dependency or package configuration was changed.

## Verification status and limitation

The test file was reviewed from the committed GitHub source, including corrections to the unterminated-string and row-key whitespace fixtures. However, this environment did not provide an execution of the repository checkout, so the 23 tests have NOT been run. No passing test result is claimed. The next safe step is to execute the command in a local checkout or a separately authorized CI workflow.

The tests cover the current constrained scanner contract. They do not establish support for SQL comments, dollar-quoted strings, E-strings, backslash escapes, arbitrary PostgreSQL syntax, SQL runtime behavior, JWT, RLS or effective grants. PostgreSQL syntax parsing remains a separate layer.

## Scope and safety

- Added one test file only; no validator implementation was changed.
- No lesson content, seed SQL, migration, SQL regression test, package manifest or requirements file was changed.
- No CI workflow was changed and no workflow was dispatched.
- No Supabase query/write, migration, Auth, RLS, grant, deployment, PR, merge or main-branch update was performed.
- The four known CI path-filter omissions remain unchanged and require separate explicit approval to modify workflow configuration.

## Backup and branch references

- Work branch: `fix/kurmanji-ci-current-migration`
- Starting HEAD: `9522056e9ee6e5cc3d79a328f9e94796f85d3745`
- Main observed before work: `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`
- Pre-work backup: `backup/b3-k154-scanner-unit-tests-before-2026-11-18`
- Post-work backup: recorded after the report commit.
