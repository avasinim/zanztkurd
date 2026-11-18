# B3-K170 — Cross-Module DO-Block Regression Design
Date: 2026-11-18
Branch: `fix/kurmanji-ci-current-migration`
Starting HEAD: `e800ca9f0136c45f93dbe94aec10571399916579`

## Purpose
Turn the K168/K169 findings into an implementation-ready regression specification for safely using the PostgreSQL dollar-quoted DO-block locator from the canonical seed-parity validator. This is a report-only design step; it does not claim execution or integration.

## Source files inspected
- `scripts/kurmanji_sql_lexer.py` — `find_dollar_quoted_do_block`, `tokenize_sql`, `find_sql_marker`.
- `scripts/test_kurmanji_sql_lexer.py` — 29 unittest methods, including 8 DO-block locator cases.
- `scripts/validate_kurmanji_seed_parity.py` — raw marker searches in `extract_rows`, `extract_values_rows`, and `main`; tuple scanners remain independent.
- `scripts/test_kurmanji_seed_parity.py` — 30 unittest methods for constrained scanner helpers.
- `supabase/migrations/20261116120000_reconcile_kurmanji_seed_content.sql` — current real migration structure.

## Exact integration boundaries
The current migration has:
- Preflight block: `DO $preflight$` begins at line 10 and closes with `$preflight$;` at line 141.
- Apply block: `DO $apply$` begins at line 143 and closes with `$apply$;` at line 389.
- Transaction commit follows at line 391.

The locator returns the full dollar-string token span, including opening and closing delimiters. It does not return the inner body span. An integration caller must derive the inner body carefully from the exact tag length, and must keep all downstream marker searches confined to that body.

## Proposed integration contract
1. Import only `find_dollar_quoted_do_block` from the lexer initially; do not refactor tuple parsing in the same change.
2. Locate the preflight block from offset 0. Reject a missing block.
3. Locate the apply block beginning at or after the end of the preflight block. Reject a missing block.
4. Explicitly define duplicate-tag behavior. Preferred fail-closed policy: reject a second matching DO block for either reserved tag rather than silently accepting the first. If a minimal helper API cannot detect duplicates cleanly, add a separate caller-side check and unit coverage.
5. Extract each inner body by removing exactly one opening and closing delimiter; do not use global string replacement.
6. Run preflight VALUES extraction only against the preflight body. Run the lesson INSERT row extraction only against the apply body.
7. Keep baseline migration and split seed file parsing behavior unchanged in this integration patch.
8. Preserve the existing expected row/key/course invariants and output wording unless a test demonstrates a necessary change.

## Required cross-module regression matrix

### Real migration boundaries
- Locate `$preflight$` and `$apply$` in the committed reconciliation migration.
- Assert each returned span equals the exact opening delimiter start and closing delimiter end.
- Assert the preflight span ends before the apply block begins.
- Assert the extracted preflight body contains the expected comparison VALUES clause and does not include the apply INSERT.
- Assert the extracted apply body contains the `lesson_content` INSERT/VALUES/ON CONFLICT section and excludes the preflight comparison VALUES clause.

### Lexical decoys and formatting
- `DO` plus whitespace/newline plus named tag.
- Comments between `DO` and opening dollar delimiter.
- Fake `DO $preflight$` text in line comments, nested block comments, standard strings, E-strings, and unrelated dollar-quoted strings.
- Matching tag text inside a different dollar-quoted body.
- Exact tag case sensitivity.
- Prefix/suffix identifier decoys and unrelated SQL statements before and after the blocks.

### Structural failure cases
- Missing preflight block.
- Missing apply block.
- Unterminated dollar body.
- Duplicate preflight tag and duplicate apply tag; verify explicit fail-closed policy.
- Apply block appearing before preflight.
- Wrong tag case.
- A preflight VALUES decoy outside the selected preflight body, including an outside ` ) AS expected ` marker.
- An apply INSERT/VALUES/ON CONFLICT decoy outside the selected apply body.
- Missing end marker and malformed tuple body continue to raise the validator's documented errors.

### Compatibility assertions
- Preserve all 29 lexer test expectations.
- Preserve all 30 seed-parity helper test expectations.
- Confirm current migration still yields exactly 12 overlay rows and 12 preflight rows.
- Confirm the canonical validator still compares 38 ordered baseline keys, 38 seed keys, the exact 12-row overlay, and 38 static lesson-page bindings.

## Important scope boundary
This integration would improve DO-block selection only. It would not make `extract_rows`, `extract_values_rows`, or `tuple_string_values` a complete PostgreSQL parser. They still have narrower quote/parenthesis scanning assumptions, including no general lexical handling of comments, E-strings, or dollar-quoted expressions inside tuple values. Do not imply otherwise or bundle a full parser rewrite into this patch.

## Execution gate before integration
No complete checkout is available through the current connector/runtime combination. The repository's current Actions workflow also omits the two focused unittest commands, and the connector exposes no workflow-dispatch action. Therefore no committed test module or canonical validator was executed in this step.

Before integration, obtain a complete checkout and run:
```bash
python scripts/test_kurmanji_sql_lexer.py
python scripts/test_kurmanji_seed_parity.py
python scripts/validate_kurmanji_sql.py
python scripts/validate_kurmanji_seed_parity.py
python scripts/validate_kurmanji_package.py
```
After implementation, run the same commands again and retain the actual output/exit codes. A synthetic local harness is not a substitute for these repository commands.

## No changes outside this report
- No lexer, validator, or test code changed.
- No CI workflow or workflow dispatch.
- No SQL migration, seed data, lesson content, or website changed.
- No Test or Production database operation.
- No PR, merge, deployment, or `main` update.

## Recommendation
The next code change should be a narrowly scoped cross-module integration plus regression tests, but only after the committed test suite can be executed in a complete checkout. Until then, preserve the locator as a preparatory utility and do not claim canonical parity validation has been hardened.
