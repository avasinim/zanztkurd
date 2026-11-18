# B3-K161 — SQL Seed Scanner Lexical-Boundary Audit
Date: 2026-11-18

## Scope

Read-only source audit of `scripts/validate_kurmanji_seed_parity.py` and its 30 synthetic unit tests. The purpose is to define the scanner's actual lexical boundary before attempting parser changes. No lesson data or SQL source was modified.

## Confirmed implementation behavior

The scanner is a constrained character walker, not a PostgreSQL lexer/parser:

- `extract_rows` and `extract_values_rows` track ordinary single-quoted strings, doubled apostrophes, and parenthesis depth.
- `tuple_string_values` tracks ordinary quoted strings and nested parentheses while splitting top-level commas.
- `row_key` and `row_course_id` use anchored regular expressions to extract the first two literal fields.
- Marker discovery uses plain `str.find` for INSERT, VALUES, ON CONFLICT, and preflight delimiters.

The implementation correctly handles the synthetic cases currently covered: doubled apostrophes, commas and parentheses inside ordinary strings, nested parentheses, and malformed ordinary-string/tuple boundaries.

## Lexical gaps and concrete failure modes

1. **Line and block comments are not skipped.**
   - A parenthesis, quote, or comma in `-- ...` or `/* ... */` can change tuple depth or string state even though PostgreSQL treats it as comment text.
   - Marker text such as `VALUES` or `ON CONFLICT (lesson_key)` inside a comment can be selected by the current first-match search.

2. **Dollar-quoted strings are not recognized.**
   - PostgreSQL bodies such as `$body$ ... $body$` and tagged forms such as `$payload$ ... $payload$` are opaque string literals to the SQL lexer.
   - Parentheses, apostrophes, commas, and marker-like text inside those bodies are currently interpreted as ordinary SQL characters by this scanner.

3. **Escape strings are not recognized.**
   - PostgreSQL `E'...'` strings can use backslash escapes, including escaped quotes.
   - The current walker only understands doubled apostrophes. An escaped quote can prematurely end its string state, and later parentheses/commas can then be miscounted.
   - The same issue applies to any source using backslash-escape semantics under a relevant string-literal mode.

4. **Marker selection is lexical-context blind.**
   - `str.find` does not establish that a marker occurs in executable SQL rather than a comment or string.
   - The current repository's authored migration shape is compatible with the expected markers, but the helper is not safe for arbitrary SQL formatting or comments around those markers.

5. **Tuple field parsing is intentionally incomplete.**
   - It retains non-string expressions as raw text and does not implement PostgreSQL casts, dollar quoting, array syntax, or the full literal grammar.
   - The course-id guard correctly requires the first two tuple fields to be simple string literals; that is a contract for the current seed files, not a general SQL guarantee.

## Recommended safe remediation sequence

1. Add a small dedicated lexical-state scanner with explicit states for normal text, single-quoted strings, E-strings, double-quoted identifiers, line comments, nested block comments, and tagged dollar-quoted strings.
2. Reuse that tokenizer in all three tuple helpers and in marker discovery; avoid separate subtly different state machines.
3. Keep the accepted seed-row contract narrow: the first two fields must remain ordinary string literals, and row tuple boundaries must be validated before extracting fields.
4. Add synthetic regression tests for each lexical state, including nested block comments, repeated dollar tags, escaped quotes, and marker-like text in comments/strings.
5. Run the canonical repository test command and the complete parity validator in a full checkout before describing the parser as hardened.
6. Do not broaden this into a general PostgreSQL parser; use PostgreSQL itself for syntax validation.

## Verification status

- Source and existing unit-test file were fetched from the isolated work branch.
- The unit-test file currently contains 30 test methods.
- This task was a source-level audit only. No canonical test command, full parity validator, PostgreSQL parser, CI workflow, or live database was executed.
- No claim is made that the current scanner supports comments, dollar-quoted strings, or E-strings.

## Safety boundary

This is a documentation-only audit. No validator code, tests, lesson content, seed SQL, migration, workflow, dependency, database, Auth, RLS, grants, deployment, PR, merge, or `main` branch was changed. The full-prefix progression migration remains unapplied to Test and Production.

## Backup and refs

- Work branch: `fix/kurmanji-ci-current-migration`
- Starting HEAD: `45f25d76e14aa2ca8a5bfb46a7097eb5e1adf650`
- Main observed before work: `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`
- Pre-work backup: `backup/b3-k161-sql-scanner-lexical-audit-before-2026-11-18`
- Post-work backup: created after this report commit.
