# B3-K176 — Successful CI Baseline vs Current Branch Delta
Date: 2026-11-18
Branch: `fix/kurmanji-ci-current-migration`
Starting HEAD: `9b8858720dec09fb4dac4253843ed67b55775532`
Successful CI baseline: `e32b863cce87e86aa968d7a3b460ce809552e956`

## Executive finding
The successful Run #936 does **not** validate the SQL lexer implementation added later. A direct GitHub compare from the successful run's SHA to the current branch HEAD shows 32 commits ahead. The complete compare file list contains only:
- 16 documentation reports (K160–K175);
- `scripts/kurmanji_sql_lexer.py` (new, 217 lines);
- `scripts/test_kurmanji_sql_lexer.py` (new, 160 lines).

No existing application, canonical validator, SQL migration, seed, lesson page, or workflow file changed in this 32-commit range.

## Exact CI chronology
Run #936:
- URL: https://github.com/avasinim/zanztkurd/actions/runs/44266415725
- SHA: `e32b863cce87e86aa968d7a3b460ce809552e956`
- Result: success for all configured workflow steps.
- This SHA predates all K160–K175 commits and therefore predates the new standalone lexer and its test module.

Current branch HEAD:
- `9b8858720dec09fb4dac4253843ed67b55775532`
- 32 commits ahead of the successful CI SHA.
- The 32-commit delta is documentation plus the two new lexer files listed above.

## What remains validated by the older run
The run remains useful evidence that, at its exact SHA, the configured canonical pipeline passed:
- PostgreSQL syntax parsing;
- canonical 38-row baseline / 38-row seed parity;
- exact 12-row overlay and preflight checks;
- package/page consistency checks;
- 11 browser regression tests.

Because the existing validator and app files are unchanged in the compared range, the old run still provides historical evidence for those unchanged components. It is not a fresh run on current HEAD and cannot be represented as current-HEAD CI.

## New code not covered by that run
- `scripts/kurmanji_sql_lexer.py` was introduced after the successful CI baseline.
- `scripts/test_kurmanji_sql_lexer.py` was introduced after the successful CI baseline.
- The workflow path filters omit both files.
- The workflow does not execute `python scripts/test_kurmanji_sql_lexer.py`.
- The workflow does not execute `python scripts/test_kurmanji_seed_parity.py`.
- The canonical validator imports no lexer functions.

Thus the standalone lexer and its focused tests still lack verified execution evidence from the configured CI pipeline.

## Decision
Do not integrate the lexer into the canonical validator yet. The safe gate remains:
1. Execute `python scripts/test_kurmanji_sql_lexer.py` from a complete checkout.
2. Execute `python scripts/test_kurmanji_seed_parity.py` from the same checkout.
3. Add cross-module regression cases proving both dollar-quoted DO spans and marker selection are scoped to their intended blocks.
4. Re-run all canonical validators and verify the exact 38-key baseline, 38 seed keys, 12-row overlay, and 38 static page bindings.
5. Obtain a successful workflow result on the exact current branch SHA.

Adding the omitted paths or test steps to the workflow is a CI configuration change and still requires separate explicit approval. The connector can inspect workflow runs but cannot dispatch one; no dispatch/rerun was performed.

## Safety and verification
- Documentation-only change in this task.
- No code, test, workflow, SQL, seed, lesson, website, database, deployment, PR, merge, or main update.
- No unit tests are claimed as run in this task.
- `main` remains `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`.

## References
- Successful CI Run #936: https://github.com/avasinim/zanztkurd/actions/runs/44266415725
- Failed earlier Run #935: https://github.com/avasinim/zanztkurd/actions/runs/44266381259
- Compare: `e32b863cce87e86aa968d7a3b460ce809552e956...9b8858720dec09fb4dac4253843ed67b55775532`
