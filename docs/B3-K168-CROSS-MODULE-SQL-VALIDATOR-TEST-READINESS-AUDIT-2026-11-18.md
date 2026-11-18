# B3-K168 — Cross-Module SQL Validator Test Readiness Audit
Date: 2026-11-18
Branch: `fix/kurmanji-ci-current-migration`
Starting HEAD: `cbbc913c211edef5a5b0282f570daf9e41416f0e`

## Scope
Read-only review of the committed lexer tests, seed-parity scanner tests, canonical validator, and reconciliation migration. The objective was to define the minimum cross-module proof needed before integrating the K166 DO-block locator. No code or test files were changed.

## Verified starting state
- Work branch HEAD: `cbbc913c211edef5a5b0282f570daf9e41416f0e`.
- `main`: `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`.
- K167 pre backup exists at `cbbc913c211edef5a5b0282f570daf9e41416f0e`.
- Unique K168 pre-work backup created:
  `backup/b3-k168-cross-module-test-readiness-before-2026-11-18`.

## Test inventory and execution-path findings
- `scripts/test_kurmanji_sql_lexer.py` contains 29 unittest methods, including 8 focused DO-block locator cases.
- `scripts/test_kurmanji_seed_parity.py` contains 30 unittest methods for the existing validator helpers.
- The lexer test imports sibling module `kurmanji_sql_lexer`; running it as `python scripts/test_kurmanji_sql_lexer.py` from the repository root is structurally compatible with Python's script-directory import behavior.
- The seed-parity test explicitly loads `scripts/validate_kurmanji_seed_parity.py` from the repository root and documents `python scripts/test_kurmanji_seed_parity.py`.
- These are two separate test modules. There is currently no cross-module test proving that the canonical validator uses the lexer locator, and no test directly exercises the proposed combined extraction path.
- No complete repository checkout is mounted in this execution environment. The committed modules were inspected through GitHub file reads, but neither committed test module nor the canonical parity validator was executed. No test-pass claim is made.

## Source-contract findings
1. The current reconciliation migration has one `DO $preflight$` block (opening at line 10, closing at line 141) and one `DO $apply$` block (opening at line 143, closing at line 389). These are the expected named tags for K166's exact-tag locator.
2. The canonical validator still uses raw `.find()` calls for the insert/VALUES/ON CONFLICT boundaries, the preflight start/end markers, and the apply start marker. It does not import the lexer.
3. The current preflight extraction starts from the textual marker `DO $preflight$`, then finds `VALUES` and `) AS expected` independently. It does not prove that the VALUES block and end marker belong to the same dollar-quoted body.
4. The apply guard slice starts at the first textual `DO $apply$` and extends to end-of-file. Consequently, guard regexes are not structurally confined to the apply block.
5. The existing lexer helper returns only the dollar-quoted body span. It finds the first matching `DO` followed by the requested tag, not necessarily a top-level statement, and tokenizes the entire source. A future caller must explicitly handle duplicate matching tags, statement context, and exact span boundaries.
6. The existing row extractors still use independent single-quote and parenthesis loops. Integrating only the DO locator would not make row tuple extraction robust to SQL comments, E-strings, or dollar-quoted expressions inside row data.

## Minimum cross-module regression matrix
Before integration, add tests that call the canonical validator's actual extraction helpers against:
- the real reconciliation migration and verify the preflight and apply body spans match the exact expected delimiters;
- comments and whitespace between `DO` and its dollar delimiter;
- decoy `DO $preflight$` / `DO $apply$` text inside comments, standard strings, E-strings, and unrelated dollar-quoted bodies;
- duplicate matching tags and explicit rejection or deterministic selection;
- missing closing delimiters, wrong case, malformed dollar bodies, and a missing apply block;
- decoy `VALUES` and `) AS expected` text outside the selected preflight body;
- preservation of all existing 30 seed-parity helper test expectations and all 29 lexer test expectations.

Then run, from a complete repository checkout:
```bash
python scripts/test_kurmanji_sql_lexer.py
python scripts/test_kurmanji_seed_parity.py
python scripts/validate_kurmanji_seed_parity.py
```
The final validator run must confirm 38 ordered baseline keys, 38 seed keys, the exact 12-row overlay, and all 38 static lesson page bindings. Any changed output must be investigated, not normalized away.

## Decision
Do not integrate the lexer into the canonical validator yet. The test modules are separately invocable by their documented commands, but actual execution remains unverified and no cross-module coverage currently exists. The absence of a complete checkout means corpus parity cannot responsibly be claimed from this environment. Keep this as a report-only step until a complete checkout-based test run is available.

## Validation and non-actions
- Inspected the 29 lexer tests, 30 seed-parity tests, canonical validator, and reconciliation migration source.
- Confirmed the reconciliation migration's exact named DO delimiters and line positions from the fetched source.
- Did not execute either test module or the canonical validator.
- Did not run PostgreSQL parsing, CI, Supabase queries, or live database tests.
- No code, tests, seed files, migration files, lesson content, CI workflow, website, or deployment files changed.
- No Test or Production database operation, PR, merge, or `main` update occurred.

## Next safe step
Obtain or establish a complete checkout-based execution path, run the existing 59 committed synthetic tests and canonical 38-row parity validator unchanged, then implement the smallest cross-module integration with the regression matrix above. CI workflow changes and all database operations remain outside scope unless separately authorized.
