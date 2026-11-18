# B3-K177 — Focused Test Execution Feasibility and Evidence Gate
Date: 2026-11-18
Branch: `fix/kurmanji-ci-current-migration`
Starting HEAD: `77c1b5e38626920425e682abe7b270cc60bd0852`

## Scope
Read-only inspection of the two focused test modules, their target implementation, the canonical parity validator, the SQL syntax validator, and current branch Actions history. No code or CI changes were made.

## Exact test commands
From a complete repository checkout at the repository root:
```bash
python scripts/test_kurmanji_sql_lexer.py
python scripts/test_kurmanji_seed_parity.py
python scripts/validate_kurmanji_seed_parity.py
python scripts/validate_kurmanji_sql.py
python scripts/validate_kurmanji_package.py
python scripts/test_north_circle_ui.py
```

The lexer test imports `kurmanji_sql_lexer` directly; invoking it by its script path from the repository root makes the `scripts` directory available for that import. The parity test explicitly loads `scripts/validate_kurmanji_seed_parity.py` from the repository root. The two focused tests are standard-library `unittest` entry points.

## Execution status — not run
These commands were **not executed**. The active tool runtime contains no checked-out `zanztkurd` Git working tree (no repository `.git` directory was found in the available mounted workspace). The GitHub connector can retrieve source text and metadata but does not provide a local checkout or Python execution against the repository tree. Running copied fragments or synthetic snippets would not constitute verification of the repository tests, so no such substitute is claimed.

## Source inspection findings
- `scripts/kurmanji_sql_lexer.py`: standalone tokenizer and marker / dollar-quoted DO-block helpers; 217 lines.
- `scripts/test_kurmanji_sql_lexer.py`: imports the standalone lexer and ends with `unittest.main()`; 160 lines.
- `scripts/test_kurmanji_seed_parity.py`: loads the canonical parity validator by file path and ends with `unittest.main()`; its header documents `python scripts/test_kurmanji_seed_parity.py`.
- `scripts/validate_kurmanji_seed_parity.py`: read-only source comparison; no database connection.
- `scripts/validate_kurmanji_sql.py`: depends on `pglast`; validates SQL parsing and is separate from the two focused standard-library tests.

## Actions evidence
The current branch Actions history query returned 60 runs. No run was found with the exact starting HEAD SHA `77c1b5e38626920425e682abe7b270cc60bd0852`, nor with the immediately preceding K175 HEAD `9b8858720dec09fb4dac4253843ed67b55775532`. Run #936 remains evidence for its own earlier SHA only. The workflow still does not invoke either focused test module, and the path filters omit the lexer implementation and its test module.

## Safe next execution path
A maintainer with a complete checkout can run the six commands above locally, or dispatch the existing workflow manually and inspect the exact tested SHA. To obtain CI coverage for the focused modules automatically, the workflow path filters and steps would need a separate approved CI change. No workflow dispatch capability was available through the connected GitHub actions tools in this session.

## Safety
- No unit tests or validators are claimed as executed.
- No code, CI, SQL, seed, lesson, website, database, deployment, PR, merge, or main update.
- `main` was unchanged at `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`.
