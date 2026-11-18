# B3-K165 — Canonical Seed-Parity Validator / SQL Lexer Integration Audit
Date: 2026-11-18

## Scope
Read-only source audit of:
- `scripts/kurmanji_sql_lexer.py`
- `scripts/validate_kurmanji_seed_parity.py`
- `scripts/test_kurmanji_seed_parity.py`
- `scripts/test_kurmanji_sql_lexer.py`

No integration code was changed. The lexer remains standalone.

## Starting state and backup
- Work branch: `fix/kurmanji-ci-current-migration`
- Starting HEAD: `1e1866b35927580a873184428ed4b226938a936f`
- `main`: `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`
- Pre-work backup: `backup/b3-k165-validator-marker-integration-audit-before-2026-11-18` at `1e1866b35927580a873184428ed4b226938a936f`

## Canonical validator marker inventory
The canonical validator currently does not import or call the lexer. Its source-marker lookups are:

| Function / line | Current lookup | Purpose |
|---|---|---|
| `extract_rows` L40 | `source.find("INSERT INTO public.lesson_content")` | Locate target INSERT |
| `extract_rows` L41 | `source.find("VALUES", insert_at)` | Locate tuple block |
| `extract_rows` L42 | `source.find("ON CONFLICT (lesson_key)", values_at)` | End tuple block |
| `extract_values_rows` L86 | `source.find(start_marker)` | Locate a caller-supplied block start |
| `extract_values_rows` L87 | `source.find("VALUES", start)` | Locate preflight VALUES |
| `extract_values_rows` L88 | `source.find(end_marker, values_at)` | Locate preflight tuple-block end |
| `main` L287–288 | `source.find("DO $preflight$")`, `source.find("$preflight$;")`, `source.find("DO $apply$")` | Isolate SQL sections for static guard checks |

The production call sites are for the historical baseline migration, the forward reconciliation migration, five split seed files, and the forward migration's preflight VALUES table. The validator also performs its own constrained tuple/string scanning after extracting those regions.

## Integration assessment
A direct, blanket replacement of every `str.find` call with `find_sql_marker` is **not safe**.

1. **Dollar-quoted DO block delimiters are intentionally opaque to the lexer.** The lexer recognizes `$preflight$ ... $preflight$` and `$apply$ ... $apply$` as dollar-quoted string tokens. Consequently, asking `find_sql_marker` to find `DO $preflight$` or the closing `$preflight$;` would overlap an opaque dollar-string span and be rejected. These delimiters need a dedicated, state-aware block-boundary routine (or a token API that exposes dollar-string opening/closing delimiter positions), not the ordinary opaque-marker helper.

2. **The helper uses exact source text, not token-sequence matching.** A marker such as `ON CONFLICT (lesson_key)` only matches that exact whitespace spelling. It will not automatically match legal formatting such as newlines or multiple spaces between tokens. Existing validator markers are currently exact literals, so this is not an immediate regression, but it limits the helper's generality.

3. **Opaque-span scanning is stricter than the current marker search.** `find_sql_marker` tokenizes the entire source before searching. An unterminated quote/comment/dollar block anywhere in a file raises `ValueError`, even if the malformed region is after the desired marker. That may be a useful fail-closed property, but it changes failure behavior and must be covered by validator-level tests before adoption.

4. **The row extractors remain independent parsers.** Replacing only marker discovery does not make tuple extraction PostgreSQL-aware. `extract_rows`, `extract_values_rows`, and `tuple_string_values` still scan standard single-quoted strings and parentheses themselves; they do not consume lexer tokens and do not fully model comments, E-strings, dollar strings, or all SQL expressions. A partial marker-only integration must not be described as a complete SQL parser.

5. **Current tests do not cover the integration contract.** The lexer tests exercise the standalone tokenizer and marker function; the seed-parity tests exercise validator helper functions with synthetic SQL. There are no cross-module tests proving that canonical validator extraction uses the lexer correctly, that DO-block boundaries remain discoverable, or that all current migration/seed inputs retain the same extracted rows.

## Recommended safe sequence
1. Keep the standalone lexer unchanged until its repository test module can be run in a complete checkout.
2. If integration is pursued, first add a narrowly scoped routine for locating a named dollar-quoted DO block and its exact closing delimiter while preserving opaque body semantics.
3. Add cross-module fixtures for comments and quoted marker decoys, whitespace variants, malformed/unterminated constructs, and both preflight/apply blocks.
4. Compare extracted row spans and all 38 canonical lesson keys / 12 overlay keys against the current validator output before switching production call sites.
5. Only then consider replacing the simple marker lookups. Keep tuple grammar and the content contract narrowly constrained; do not expand the validator into an incomplete general-purpose SQL parser.

## Verification limits
This was a source-level audit using the committed files and their visible call sites. No complete repository checkout was available to execute the committed test modules in place. No repository test command, full project suite, CI run, PostgreSQL parser, Supabase query, or live database test was run. No row extraction was recomputed against the complete seed corpus in this audit.

## Safety
No lesson text, seed SQL, validator code, lexer code, CI workflow, migration, database, Auth/RLS/grants, website, deployment, PR, merge, or `main` change. No Test or Production database operation was performed. The prior Test-only K113 authorization was not used.

## Next step
Implementing a safe dollar-quoted block locator and cross-module tests would be the next technical step, but should be done only after obtaining a complete checkout or another reliable way to run the committed test files and compare the real 38-row corpus. CI workflow changes remain gated on separate explicit approval.
