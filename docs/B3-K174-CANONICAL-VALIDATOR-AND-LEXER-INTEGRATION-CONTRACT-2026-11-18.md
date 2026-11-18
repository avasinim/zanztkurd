# B3-K174 — Canonical Validator / SQL Lexer Integration Contract
Date: 2026-11-18
Branch: `fix/kurmanji-ci-current-migration`
Starting HEAD: `77975a61b234f57c01a9178efd5f58c4a246c038`

## Source snapshot
All files below were fetched from this exact branch revision. Blob identifiers are recorded to make the review reproducible.

| File | Blob |
|---|---|
| `scripts/kurmanji_sql_lexer.py` | `d377f7b3c46235a6df29b06c55734603f1e3ff9b` |
| `scripts/test_kurmanji_sql_lexer.py` | `dd7f2a65494619f47da1db94afcfecf7ff7903d5` |
| `scripts/validate_kurmanji_seed_parity.py` | `5d98e5e5e5b7ca950af7456530c0884514a626cc` |
| `scripts/test_kurmanji_seed_parity.py` | `cc0ffd06299557f27be859c7341af1fc2a4a72c8` |
| Reconciliation migration | `f7235b1f7919d4cf5af90e200e138d1cb45f9c47` |

## Confirmed module boundary
The standalone lexer exports:
- `tokenize_sql(source)`
- `find_sql_marker(source, marker, start=0)`
- `find_dollar_quoted_do_block(source, tag, start=0)`

The canonical seed-parity validator imports only standard-library modules and makes **zero** calls to any of those lexer functions. It continues to locate `INSERT`, `VALUES`, `ON CONFLICT`, and marker boundaries with raw `str.find()`.

Focused test inventory:
- Lexer test module: 29 test methods.
- Seed-parity helper test module: 30 test methods.
- These test counts are source inventory only; no test command was executed in a complete repository checkout in this session.

## Actual migration landmarks
The current reconciliation migration has 392 lines:
- `DO $preflight$`: line 10
- preflight `VALUES`: line 17
- preflight `) AS expected(...)`: line 124
- `DO $apply$`: line 143
- `INSERT INTO public.lesson_content`: line 148
- apply `VALUES`: line 150
- `ON CONFLICT (lesson_key) DO UPDATE`: line 371

This confirms why a generic global marker search is insufficient: the file intentionally has two separate DO bodies and more than one VALUES region.

## Safe incremental integration contract
A future code change should be deliberately narrow:

1. Keep the lexer a standalone module with no third-party dependency.
2. Import its functions explicitly in the parity validator; avoid copying lexer logic into the validator.
3. Identify the exact `$preflight$` and `$apply$` body spans independently. Fail closed if either is missing, unterminated, or duplicated in an unexpected way.
4. Restrict each marker lookup to the intended span. The preflight VALUES block must terminate at its own expected-table alias; the apply INSERT block must terminate at its own ON CONFLICT marker.
5. Validate marker ordering and uniqueness inside each selected span. A found marker elsewhere in a comment, string, or other DO body must not satisfy the contract.
6. Preserve the existing row/field extraction behavior initially; lexer integration for outer boundaries does not make the tuple parser fully PostgreSQL-aware.
7. Add cross-module fixtures for duplicate tags, decoy markers in comments/strings/dollar strings, malformed and unterminated DO bodies, reordered markers, and valid two-block migration structure.
8. Run both focused test modules and all existing canonical validators against the real five seed files and migration. Confirm the 38 baseline keys, 38 seed keys, exact 12-row overlay, and 38 static page bindings remain unchanged.

## Important helper limitations to preserve
- `find_dollar_quoted_do_block` returns the opening/closing delimiter span, not a full parsed top-level SQL statement. Its caller must enforce uniqueness, context, and correct start location.
- `find_sql_marker` tokenizes the supplied source and returns a marker offset outside opaque lexical spans. It does not establish SQL grammar or that markers belong to the same statement.
- Existing row extractors still use their own quote/parenthesis scanning. Comments, escape-string semantics, and dollar-quoted expressions inside tuple values remain separate hardening concerns.

## Execution and safety status
No code or test file changed. No unit test, package validator, PostgreSQL parser, browser test, workflow, or database command was run. No CI configuration, SQL, seed, lesson, website, deployment, PR, merge, or main update was performed.

The next code change should wait for a complete-checkout test execution path. Any workflow path-filter or step edit still requires separate explicit approval.
