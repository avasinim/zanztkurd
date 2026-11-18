# B3-K162 — Standalone PostgreSQL Lexical Scanner and Regression Fixtures
Date: 2026-11-18

## Scope

Added a small standalone lexical scanner and a synthetic unit-test module. This is a preparatory implementation: it is deliberately not yet wired into the existing seed parity validator. That separation avoids silently changing production validation behavior before the new lexical handling is tested and reviewed.

## Files added

1. `scripts/kurmanji_sql_lexer.py`
   - Emits tokens with exact source spans.
   - Recognizes whitespace, words, symbols, line comments, nested block comments, standard single-quoted strings with doubled apostrophes, E-strings with backslash escapes, dollar-quoted strings (including empty and tagged delimiters), and quoted identifiers with doubled double-quotes.
   - Rejects unterminated block comments, string literals, dollar-quoted strings, and quoted identifiers.
   - Provides `find_sql_marker`, which ignores marker text occurring inside comments and quoted constructs and supports markers spanning multiple ordinary SQL tokens.

2. `scripts/test_kurmanji_sql_lexer.py`
   - Adds 17 synthetic unittest methods covering the supported lexical states, malformed input, marker discovery, and exact source-span reconstruction.
   - Uses only the Python standard library and synthetic SQL strings; no lesson content is embedded.

## Important implementation boundary

The scanner is a lexical helper, not a complete PostgreSQL parser. It does not parse SQL grammar, resolve PostgreSQL configuration such as `standard_conforming_strings`, or validate SQL syntax. The E-string handling explicitly models backslash escapes. The standard-string handling models doubled apostrophes and does not treat backslashes as escapes.

The current validator still uses its existing helper functions. This K162 change does not claim that comments, dollar-quoted strings, or E-strings are now supported by the canonical parity validation path. Integration is deferred until the standalone scanner and fixtures can be executed and reviewed in a complete checkout.

## Verification

- Both new files were committed to the isolated work branch.
- Source was fetched back from GitHub for inspection after each write.
- The 17-test module has **not** been executed in a complete repository checkout in this task.
- The existing 30-test seed-parity module and full parity validator were not run.
- No CI run, PostgreSQL syntax check, Supabase query, or database operation was performed.

## Safety boundary

No lesson text, seed SQL, migration, existing validator, existing test module, workflow, dependency, database, Auth, RLS, grants, deployment, PR, merge, or `main` branch was changed. No changes were made to the live website. The full-prefix progression migration remains unapplied to Test and Production.

## Backup and refs

- Work branch: `fix/kurmanji-ci-current-migration`
- Starting HEAD: `e5ffd9d56f695fb46051190d795de46dc9a21e25`
- Main observed before work: `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`
- Pre-work backup: `backup/b3-k162-lexer-module-tests-before-2026-11-18`
- Post-work backup: created after this report commit.
