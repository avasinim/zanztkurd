# B3-K164 — SQL Lexer Identifier-Boundary Fix and Regression Coverage
Date: 2026-11-18

## Scope
Updated only:
- `scripts/kurmanji_sql_lexer.py`
- `scripts/test_kurmanji_sql_lexer.py`

The scanner remains a standalone tokenizer/marker helper; it is not integrated into the canonical seed-parity validator.

## Starting state and backup
- Work branch: `fix/kurmanji-ci-current-migration`
- Starting HEAD: `dd2f7048649e348ed8a8c294296f2d48aeba67ab`
- `main`: `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`
- Pre-work backup: `backup/b3-k164-lexer-token-boundary-fix-before-2026-11-18` at `dd2f7048649e348ed8a8c294296f2d48aeba67ab`

## Implementation
Added an identifier-continuation predicate for PostgreSQL unquoted identifier characters (alphanumeric characters, underscore, and dollar sign). Marker candidates are now rejected when an identifier character immediately precedes a marker that begins with an identifier character, or immediately follows a marker that ends with one.

This preserves exact literal matching and existing opaque-span suppression while preventing false positives such as:
- `NOTVALUES` matching `VALUES`
- `VALUES_suffix` matching `VALUES`
- `XVALUES` matching `VALUES`
- `ON   CONFLICTING` matching `ON   CONFLICT`

Added four regression tests for identifier prefixes/suffixes and multi-token marker suffixes. Corrected two multi-token test expectations: `rfind("ON")` was itself incorrect because it also finds the `ON` substring inside `CONFLICT`; the assertions now locate the complete marker string.

## Test evidence and limits
A local 21-case unittest harness mirroring the committed scanner implementation and the 21 test scenarios was run after the assertion corrections: **21 passed, 0 failures, 0 errors**.

Important limitation: the repository's committed `scripts/test_kurmanji_sql_lexer.py` was not invoked as a checkout-based test command in this session. The local harness was reconstructed from the fetched source and test cases; this is focused evidence, not proof that the repository test command or full project suite passes. No CI workflow, PostgreSQL server, Supabase project, or live database test was run.

## Safety
No lesson text, seed SQL, canonical validator, CI workflow, migration, database, Auth/RLS/grants, website, deployment, PR, merge, or `main` change. No Test or Production database operation was performed. The previous Test-only K113 authorization was not used.

## Next step
In a complete checkout, run `python -m unittest scripts/test_kurmanji_sql_lexer.py` (or the project's supported equivalent) and then inspect all canonical validator marker call sites before considering integration. Keep CI workflow edits gated on separate explicit approval.
