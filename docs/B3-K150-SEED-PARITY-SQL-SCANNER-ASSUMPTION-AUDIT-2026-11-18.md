# B3-K150 — Kurmanji Seed-Parity SQL Scanner Assumption Audit
Date: 2026-11-18
Branch: `fix/kurmanji-ci-current-migration`
Scope: read-only source and current-input inspection; report-only commit

## Executive result

The seed-parity validator uses a purpose-built SQL text scanner to extract INSERT tuples and compare historical, overlay, preflight, and split-seed rows. Its scanner handles ordinary single-quoted SQL strings, doubled single quotes, and nested parentheses. It is not a general PostgreSQL lexer or parser.

Inspection of the current five split seed INSERT blocks, the canonical 38-row migration INSERT block, and the 12-row reconciliation INSERT block found none of the lexical constructs that the scanner does not handle (SQL comments, dollar-quoted literals, E-string literals, backslash escapes, or doubled single quotes). On the current committed inputs, the assumptions appear aligned with the actual SQL payload format. This is a source inspection, not execution of the validator or PostgreSQL.

## 1. Current source inventory

The five split seed files contain 38 expected course lesson rows across five INSERT blocks (8 + 8 + 8 + 8 + 6).
- Each file has one `INSERT INTO public.lesson_content` block.
- Each block contains exactly the expected number of Kurmanji row starts.
- The canonical historical migration has one lesson-content INSERT block with 38 Kurmanji rows.
- The forward reconciliation migration has one lesson-content INSERT block with 12 Kurmanji rows.

The current INSERT-block scan found:
- 0 line-comment markers (`--`)
- 0 block-comment openers (`/*`)
- 0 dollar-quote delimiters
- 0 E-string prefixes
- 0 backslashes
- 0 doubled single quotes

Semicolons do occur inside some lesson HTML/text values. The tuple scanner does not split on semicolons, so these do not interfere with its parenthesis/quote boundary tracking.

## 2. What the custom scanner handles

In `scripts/validate_kurmanji_seed_parity.py`:
- `extract_rows` locates the lesson-content INSERT, VALUES section, and ON CONFLICT boundary.
- It tracks parentheses only outside ordinary single-quoted strings.
- It skips doubled single quotes while inside a string.
- It rejects an unterminated ordinary string, unbalanced tuple parentheses, or an empty tuple block.
- `tuple_string_values` splits fields on commas outside ordinary single-quoted strings and nested parentheses.
- `row_key` requires the first two tuple fields to be SQL string literals.

These behaviors are adequate for the current constrained row format inspected here, but are not equivalent to PostgreSQL parsing. The separate `validate_kurmanji_sql.py` / `pglast` CI step is important because it validates SQL grammar independently.

## 3. Unsupported lexical cases to protect against

The custom scanner does not implement the full PostgreSQL lexical rules. In particular:
1. SQL comments inside a VALUES block are not skipped; parentheses or quotes in a comment could affect tuple-boundary detection.
2. Dollar-quoted strings inside a VALUES block are not recognized as opaque string bodies.
3. Escape-string literals such as `E'...'` and backslash-escaped quotes are not interpreted with PostgreSQL escape semantics.
4. The parser is deliberately specialized to tuples whose key/course fields are simple quoted literals; it is not a general INSERT/SQL AST parser.

None of these constructs appeared in the inspected current lesson INSERT blocks. This is therefore a future-proofing limitation, not evidence that current rows are being misparsed.

## 4. Additional parity-validator strengths and limits

The validator checks the historical migration's Git blob hash, expected ordered 26 + 12 keys, duplicate keys, exact 12-key overlay and matching preflight rows, row locks/count guards, content-only update scope, effective tuple equality with seed rows, and static H1/protected-key alignment.

It does not connect to a database, execute the migration, validate runtime schema constraints, or prove the behavior of PostgreSQL triggers/RLS. The parser CI step checks grammar, while the parity validator checks a constrained source-level payload contract; neither alone proves live database semantics.

## 5. Recommended hardening (not applied)

- Keep the current input format constrained to ordinary SQL string literals in lesson INSERT tuples; explicitly document that constraint near the scanner.
- If comments, E-strings, dollar-quoted fields, or richer SQL expressions are introduced into these INSERT blocks, replace the hand-written scanner with a PostgreSQL-aware parser/AST approach rather than extending ad-hoc regular expressions.
- Add small fixture-based tests for doubled quotes, nested function parentheses, commas/parentheses inside strings, and deliberate unsupported syntax. These can test the scanner without touching lesson content or any database.

## 6. Safety boundary

- Inspected repository source on `fix/kurmanji-ci-current-migration`.
- No validator, migration, seed, lesson, SQL test, or workflow file was modified.
- No SQL was executed; no Supabase project or database was accessed.
- No Auth, RLS, grants, deployment, PR, merge, or default-branch changes occurred.
- `main` was observed at `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3` at the start of this audit.
