# B3-K179 — SQL Lexer Edge-Case Regression Specification
Date: 2026-11-18
Branch: `fix/kurmanji-ci-current-migration`
Starting HEAD: `2e0a73bac105a9a031f7a25e4eb2e231872c6308`

## Purpose
Turn the four K178 review findings into a testable, fail-closed specification without changing implementation before a complete checkout and test execution are available.

## Test specification

### T1 — Non-ASCII PostgreSQL dollar-quote tag
Input example:
```sql
DO $étiquette$ BEGIN PERFORM 1; END $étiquette$;
```
Expected decision: explicitly choose the PostgreSQL-compatible identifier character set for tags. If the lexer claims PostgreSQL lexical compatibility, the tokenizer should recognize a valid non-ASCII tag and preserve the exact delimiter case. If the project intentionally supports only ASCII tags, document that restricted subset and add a clear rejection test; do not label the scanner fully PostgreSQL-aware.

Current source observation: `_DOLLAR_TAG` accepts ASCII letters/digits/underscore only. The example above is not currently recognized as a dollar-string opener.

### T2 — E-string prefix and Unicode identifier boundary
Construct cases where `E'` is immediately preceded by:
- ASCII identifier continuation;
- non-ASCII letter;
- underscore and dollar;
- punctuation / whitespace.

Expected decision: `E'` is an escape-string prefix only when PostgreSQL's identifier-boundary rule permits it. The prefix-boundary predicate must be consistent with the word-token continuation predicate. Assert both token kinds and exact source spans.

Current source observation: `_IDENT_CONTINUE` is ASCII-only, while `_is_identifier_continue` and word scanning use Unicode-aware `isalnum()`. The test must first establish which input positions are reachable as token starts, then lock the correct PostgreSQL-compatible behavior.

### T3 — Duplicate same-tag DO blocks
Input contains two executable `DO $preflight$ ... $preflight$` bodies and two `DO $apply$ ... $apply$` bodies, plus comment/string decoys.

Expected decision: the helper may remain a first-match locator, but the integration layer must enumerate/count executable matching DO blocks and reject anything other than exactly one preflight and exactly one apply block. Tests must prove that marker-like text in comments, ordinary strings, escape strings and unrelated dollar strings does not affect counts.

Current source observation: `find_dollar_quoted_do_block` returns the first matching span. It has no uniqueness/count API.

### T4 — Optional DO LANGUAGE clause
Input:
```sql
DO LANGUAGE plpgsql $body$ BEGIN NULL; END $body$;
```
Expected decision: either support the optional language clause and add positive tests, or explicitly narrow the helper contract to the repository's tagged DO form and add a negative test proving that unsupported syntax is rejected / not misidentified. Do not silently skip over arbitrary words between DO and the body.

Current source observation: the helper accepts only whitespace/comments between `DO` and a dollar-string token. The repository reconciliation migration uses the simpler `DO $tag$` form.

## Cross-module integration cases
Once the canonical validator is integrated with the lexer, add fixtures that verify:
1. exactly one preflight block is found;
2. exactly one apply block is found;
3. missing, duplicate, malformed, or unterminated blocks fail closed;
4. each required marker is searched only inside its owning DO block;
5. marker decoys in comments, quoted strings, unrelated dollar bodies, and the other DO block are ignored;
6. extracted rows remain exactly 38 baseline / 38 seed keys and the overlay remains exactly 12 rows;
7. all 38 static lesson-page bindings remain unchanged.

## Execution and status
- This document is a test design, not test output.
- No tests were executed. The active runtime still has no complete local repository checkout; GitHub connector source reads cannot be substituted for running the committed test suite.
- No failing tests were added to the repository. This avoids introducing an intentionally red test suite without the ability to execute and diagnose it.
- No implementation or CI changes were made.

## Next gate
Obtain a complete checkout in a runtime that can execute Python, implement T1–T4 in a test-first change, run the focused modules, then integrate only after the cross-module fixtures pass. CI workflow edits remain separately approval-gated.

## Safety
Only this report is added. No application, lexer, test, workflow, SQL, seed, lesson, website, database, deployment, PR, merge, or main change.
Main remains `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`.
