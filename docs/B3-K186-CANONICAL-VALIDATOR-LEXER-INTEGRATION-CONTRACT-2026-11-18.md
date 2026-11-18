# B3-K186 — Canonical Validator / SQL Lexer Integration Contract
Date: 2026-11-18
Repository: `avasinim/zanztkurd`
Work branch: `fix/kurmanji-ci-current-migration`
Starting HEAD: `a0bce2e8977a12660ba70919193688f07803c2f6`

## Purpose

Define a safe, testable integration boundary between `scripts/kurmanji_sql_lexer.py` and `scripts/validate_kurmanji_seed_parity.py`. This is an implementation contract, not an implementation. It preserves the validator's existing course/content invariants while replacing fragile raw substring selection and independent character scanners with one source-offset-aware lexical model.

## Current-state facts carried forward

- The lexer yields source-preserving tokens with `kind`, `text`, `start`, and `end` offsets; it recognizes whitespace, line and nested block comments, standard strings, escape strings, dollar strings, quoted identifiers, words and symbols.
- The lexer raises on unterminated quoted constructs and block comments.
- It provides `find_sql_marker()` and `find_dollar_quoted_do_block()`.
- The canonical validator currently implements `extract_rows()`, `extract_values_rows()`, and `tuple_string_values()` with separate raw-string / character-scanning logic; its `main()` also slices preflight/apply regions with `str.find()`.
- The validator does not currently import or invoke the lexer.
- Existing parity-helper tests test the current extraction helpers; lexer tests test lexer helpers separately. There is no confirmed integration test proving canonical validation uses lexer-derived boundaries.

## Proposed internal contract

Keep the public CLI and `main() -> int` behavior stable. Introduce a small set of private, source-offset-oriented helpers in the validator (names may be adjusted during implementation, but responsibilities must remain separate):

| Helper responsibility | Required behavior |
|---|---|
| `_lex_source(source, label)` | Materialize the token stream once; wrap lexical `ValueError` with the source label; retain the original source and offsets |
| `_find_unique_do_body(tokens, source, tag, label)` | Find exactly one actual DO statement whose body is delimited by the exact requested tag; ignore comments/strings; return the body delimiter span and owning DO statement span |
| `_find_marker_in_span(tokens, source, marker, span, label)` | Find exactly one executable marker in the permitted source span; ignore opaque tokens and identifier-prefix/suffix collisions; report missing/duplicate/out-of-scope markers |
| `_extract_top_level_tuple_spans(tokens, source, values_span, label)` | Return exact tuple source spans using executable parentheses and commas only; ignore punctuation in opaque tokens |
| `_decode_supported_tuple_fields(tuple_text, label)` | Preserve current supported literal semantics; explicitly reject unsupported string literal forms rather than silently mis-decoding them |

The source offsets are authoritative. Avoid repeatedly slicing and re-tokenizing fragments where the full-source token stream can be filtered by offset.

## Required orchestration order

1. Read source bytes as UTF-8 exactly as today; preserve the historical Git blob SHA check before interpreting baseline content.
2. Lex the complete baseline, each seed file, and forward migration once per source. Fail closed on malformed lexical constructs.
3. For the baseline, each seed file and forward migration, locate the required INSERT statement, VALUES keyword and ON CONFLICT clause as executable tokens in the correct order.
4. For the forward migration, locate exactly one `DO $preflight$` and one `DO $apply$` block. Require preflight to precede apply and require their spans not to overlap.
5. Locate preflight VALUES start and `) AS expected` end markers only within the preflight body. Verify both delimiters and all extracted tuple spans are fully contained in that body.
6. Locate the apply INSERT / VALUES / ON CONFLICT markers only within the apply body. Verify all tuple spans and write-scope guards belong to that body.
7. Extract tuples from exact spans, decode the required literal fields, then run the existing ordered-key, duplicate, course-id, overlay, preflight equality, drift, effective-seed, and static-page binding checks.
8. Keep all write-scope and transaction guard checks. A lexical integration must not weaken or delete any current invariant.

## Token and SQL grammar constraints

- Marker matching is case-insensitive only where the existing SQL contract is case-insensitive; dollar-quote tags remain exact and case-sensitive.
- Comments and all quoted constructs are opaque for structural marker matching.
- Identifier boundaries must be checked on both sides of every marker token sequence.
- A marker must be unique in its owning span. If duplicates exist, reject instead of silently selecting the first.
- Require the exact phase order: transaction BEGIN, preflight DO body, apply DO body, transaction COMMIT. Do not accept a decoy token outside the appropriate region.
- The scanner is a constrained recognizer, not a general PostgreSQL parser. Keep the accepted migration grammar deliberately narrow and document every accepted form.
- Standard SQL string literals with doubled apostrophes remain supported. If a tuple field uses an E-string, dollar-quoted string, or another unsupported expression, reject it with a clear diagnostic unless explicit decoding support and dedicated tests are added first.
- Parentheses and commas inside standard strings, E-strings, dollar strings, quoted identifiers and comments must never affect tuple depth or field splitting.
- Do not interpret arbitrary SQL expressions as literal key/course/title fields. The first required fields must remain the expected quoted string literals.
- Do not mutate or normalize source text while finding offsets. Token text concatenation must reconstruct the original source exactly.

## Diagnostics contract

Raise or return deterministic validation errors with a stable category and contextual label. Suggested categories:

- `lexical_error`: unterminated string, dollar body, quoted identifier or block comment.
- `missing_marker`: required executable marker absent from its allowed span.
- `duplicate_marker`: more than one executable candidate in the allowed span.
- `out_of_scope_marker`: marker exists, but only outside the owning DO body.
- `phase_order_error`: preflight/apply/transaction boundaries are reversed or overlapping.
- `malformed_tuple`: tuple boundaries or field syntax are invalid.
- `unsupported_literal`: SQL literal/expression is outside the intentionally supported grammar.

The CLI may continue printing a concise `ERROR:` line and returning 1. Tests should assert category and relevant source label, not fragile complete prose.

## Integration test plan

Create `scripts/test_kurmanji_seed_parity_lexer_integration.py` using synthetic SQL only. Import the validator module using the same isolated import pattern as `test_kurmanji_seed_parity.py`. Every test must call a validator-side integration helper or the canonical validator entry point; direct lexer-only tests are not integration evidence.

| Test group | Required cases | Expected result |
|---|---|---|
| Valid structure | One preflight, one apply, ordered markers, two synthetic rows | Accept exact spans and rows |
| Comment decoys | Fake INSERT/VALUES/ON CONFLICT in line and nested block comments | Ignore decoys |
| Literal decoys | Marker text in standard string, E-string, dollar string and quoted identifier | Ignore decoys |
| DO body identity | Fake DO tags in comments/literals; wrong-case tag; duplicate real DO blocks | Ignore decoys; reject wrong or duplicate block |
| Scope ownership | Preflight marker only in apply; apply marker only in preflight; marker before/after block | Reject out-of-scope marker |
| Phase boundaries | Apply before preflight; overlapping/duplicate boundaries; missing BEGIN/COMMIT | Reject with phase/order category |
| Tuple structure | Parentheses/commas in all opaque forms; nested expression; doubled apostrophe | Split only on executable top-level punctuation |
| Malformed input | Unterminated quote/comment/dollar body; unmatched tuple parenthesis | Reject closed and deterministically |
| Marker boundaries | Prefix/suffix identifier collisions; whitespace variants of multiword marker | Ignore collision; accept only exact structural marker |
| Source integrity | Reconstruct token text and compare input; assert source unchanged after extraction | Exact equality |

At least one adversarial fixture must contain a fake complete-looking INSERT sequence before the actual INSERT, and another must contain a fake DO opening/closing pair inside an opaque literal. Both must be passed through the validator-side extraction path.

## Regression gates that must remain unchanged

- 38 ordered historical baseline lesson keys.
- 38 ordered seed lesson keys across the five split seed files.
- Exactly 12 ordered forward-overlay keys.
- Exactly 12 matching preflight rows, with exact first-four-field equality against the protected historical baseline.
- Correct course_id for every key, with the existing 26 + 12 course structure.
- Historical release migration byte identity against blob `06320c50a858e41d8ce21e7b4fdee3f6ae418cd9`.
- Exact baseline-to-seed drift set and effective post-overlay tuple equality.
- All 38 static lesson-page H1 and `data-lesson-key` bindings.
- Transaction, row-lock, count/abort, and content-only write-scope safeguards.
- No learner progress, enrollment, course-catalog or unrelated table writes.

## Acceptance commands (future execution only)

Run from the repository root in a complete checkout with the project's supported Python environment:

```bash
python scripts/test_kurmanji_sql_lexer.py
python scripts/test_kurmanji_seed_parity.py
python scripts/test_kurmanji_seed_parity_lexer_integration.py
python scripts/validate_kurmanji_seed_parity.py
python scripts/validate_kurmanji_sql.py
python scripts/validate_kurmanji_package.py
python scripts/test_north_circle_ui.py
```

The integration test must be added to the relevant validation workflow in a separately authorized CI change. This K186 work does not authorize or make that workflow edit. A successful unit test alone is not an acceptance pass; all commands above must be run and their outputs recorded.

## Explicit non-goals and safety boundaries

- No changes to SQL migrations, seed files, lesson text/pages, course inventory, application code, database state or credentials.
- No Supabase operation, migration application, SQL execution against Test or Production, or database inspection.
- No workflow / CI configuration change, workflow dispatch, PR change, merge, deployment, or `main` write.
- No claim that tests or validators passed; no complete checkout or test runner was available during this documentation-only task.
- Do not use this contract as authorization to implement or deploy the integration. It is the reviewable design gate for a later isolated implementation task.

## K186 completion record

One documentation artifact only. No tests, validators, parser, browser suite, CI, database operation or deployment was executed. The work branch receives this commit; the before/after backup refs are verified separately in the task close-out.
