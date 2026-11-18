# B3-K178 — Static SQL Lexer Review and Missing Edge-Case Evidence
Date: 2026-11-18
Branch: `fix/kurmanji-ci-current-migration`
Reviewed HEAD: `3986591e863fe6288e4c105e27d84fd94b31291d`

## Scope and execution limitation
Reviewed the exact committed source for:
- `scripts/kurmanji_sql_lexer.py`
- `scripts/test_kurmanji_sql_lexer.py`
- `scripts/validate_kurmanji_seed_parity.py`
- `scripts/test_kurmanji_seed_parity.py`

A complete repository checkout could not be obtained in this runtime: outbound DNS/network access for `git clone` and archive download is unavailable. GitHub source retrieval worked. Therefore this is a static source review, not test execution. No PASS result is claimed.

## Test inventory
- Lexer module: 29 test methods.
- Existing seed-parity helper module: 30 test methods.
- Both use standard-library `unittest`.
- Neither module is currently invoked by the configured CI workflow.

## Findings requiring explicit regression coverage

### K178-F1 — PostgreSQL dollar-tag character set
The lexer currently defines `_DOLLAR_TAG` using ASCII-only `[A-Za-z_][A-Za-z_0-9]*`. PostgreSQL dollar-quote tags follow unquoted-identifier character rules (with dollar excluded from the tag), which are broader than ASCII. Confirm the intended supported identifier character set and add a test for a valid non-ASCII tag before describing the scanner as fully PostgreSQL-aware. Existing project migration tags are ASCII, so this does not by itself establish a defect in the current migration parse.

### K178-F2 — Inconsistent identifier-boundary predicates
The escape-string prefix check uses ASCII-only `_IDENT_CONTINUE`, while `_is_identifier_continue` uses Python's Unicode-aware `isalnum()`. This makes the two lexical-boundary decisions inconsistent for non-ASCII identifier characters. Add boundary fixtures around E/e-prefixed strings adjacent to non-ASCII identifier characters, and choose one documented PostgreSQL-compatible predicate.

### K178-F3 — Duplicate DO-block ambiguity
`find_dollar_quoted_do_block` returns the first matching DO block for the requested tag. It does not establish uniqueness. The migration integration contract requires duplicate/missing/malformed blocks to fail closed. Add tests with two `DO $preflight$` blocks, two `DO $apply$` blocks, and a decoy block before the intended block; the integration caller should count and reject duplicates rather than silently accepting the first match.

### K178-F4 — DO LANGUAGE form not covered
The helper expects a dollar-string token immediately after optional whitespace/comments following `DO`. PostgreSQL's DO syntax permits an optional `LANGUAGE lang_name` clause before the code string. Current reconciliation migration uses the simpler `DO $tag$` form, so this is a general lexer/helper completeness question rather than evidence that the current migration fails. Either support the optional clause or document the intentionally restricted grammar and add a rejection test.

## Integration status
The canonical seed-parity validator still uses direct `str.find()` marker selection and its own quote/parenthesis scanning. It does not import the standalone lexer. The standalone lexer and its tests remain unintegrated and are not covered by the workflow's configured steps or path filters.

## Recommended next gate
1. Decide whether the helper is intentionally restricted to the exact migration grammar or meant to support general PostgreSQL DO syntax.
2. Add regression tests for F1–F4 (or document a deliberately narrower contract with rejection tests).
3. Add an integration layer that independently locates exactly one preflight and exactly one apply DO block, and scopes each marker search to its block.
4. Preserve the 38 baseline keys, 38 seed keys, exact 12-row overlay, and 38 static page bindings.
5. Run both focused test modules and all canonical validators from a complete checkout.
6. Obtain CI evidence for the exact resulting branch SHA. Workflow edits remain separately approval-gated.

## Safety
- Static review only; no tests or validators executed.
- No source code, tests, workflow, SQL, seed, lesson, website, database, deployment, PR, merge, or main update.
- Main remains `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`.
