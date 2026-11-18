# B3-K188 — SQL Lexer Boundary and Fail-Closed Risk Audit
Date: 2026-11-18
Repository: `avasinim/zanztkurd`
Branch: `fix/kurmanji-ci-current-migration`
Audited HEAD: `f2ee37d753119ca4699ec9d6bf69a9d027ca2ead`

## Scope

Read-only static review of the lexer, its unit tests, and the canonical seed-parity validator. This document records observable helper contracts and the remaining integration obligations. No implementation, test execution, database access, CI change, lesson change, or deployment was performed. The session has GitHub source access but no complete writable checkout or Python test runner.

## Audited source identities

- `scripts/kurmanji_sql_lexer.py`: blob `d377f7b3c46235a6df29b06c55734603f1e3ff9b`
- `scripts/test_kurmanji_sql_lexer.py`: blob `dd7f2a65494619f47da1db94afcfecf7ff7903d5`
- `scripts/validate_kurmanji_seed_parity.py`: blob `5d98e5e5e5b7ca950af7456530c0884514a626cc`
- `scripts/test_kurmanji_seed_parity.py`: blob `cc0ffd06299557f27be859c7341af1fc2a4a72c8`

## Findings

### K188-F1 — DO-block discovery returns one match, not a uniqueness proof
**Severity: High for integration; not a claim that the current migration is malformed.**

`find_dollar_quoted_do_block` iterates tokens and returns immediately on the first `DO` word followed (after whitespace/comments) by a dollar-string token with the requested tag. It does not count all matching DO blocks, reject duplicates, or prove that the returned block is the only owner of that tag in the file. The caller must explicitly enumerate/count candidates and require exactly one preflight and one apply block before trusting spans.

Required tests: duplicate preflight blocks; duplicate apply blocks; one valid block plus a decoy DO block; same tag reused in a second DO block; missing block; reversed phase order. Every ambiguous case must fail closed.

### K188-F2 — DO recognition is lexical adjacency, not full PostgreSQL statement parsing
**Severity: Medium; bounded by the documented lexer-not-parser contract.**

The helper accepts a word token equal to `DO` followed by a dollar-string after trivia. It does not parse statement grammar or prove that this token begins a top-level SQL DO statement. This is acceptable for a constrained fixture only if the caller also validates the exact supported statement shape and rejects unsupported forms (including the previously excluded `DO LANGUAGE ...` form). Do not broaden support by assuming this helper is a SQL parser.

Required tests: DO-like text in comments, strings, quoted identifiers, and dollar strings; DO embedded in an expression or another statement; unsupported language-clause form; ordinary valid top-level DO block.

### K188-F3 — Marker lookup returns the first lexical occurrence, not a unique marker
**Severity: High for boundary extraction.**

`find_sql_marker` tokenizes the source, ignores candidates overlapping opaque token spans, enforces outer identifier boundaries, and returns the first acceptable textual occurrence at or after `start`. It does not establish uniqueness. Callers must search again after the returned span (or use a dedicated collector) and reject a second acceptable occurrence within the same owner block.

Required tests: duplicate marker in one block; decoy marker before the owner; decoy after the owner; marker in every opaque token type; marker prefix/suffix identifier collisions; marker present exactly once in the correct block.

### K188-F4 — Whole-source tokenization is intentionally strict and has a performance cost
**Severity: Low for the current small, fixed seed inputs.**

Each `find_sql_marker` call tokenizes the complete source and constructs opaque spans before searching. This means an unterminated quoted construct anywhere in the source raises even if the requested marker occurs earlier, and repeated marker searches re-tokenize the source. The fail-closed behavior is defensible; the repeated work should be avoided by tokenizing once in validator orchestration and reusing the token stream/spans, as K186 proposed. Do not optimize by weakening malformed-source rejection.

Required tests: malformed trailing comment/string after an otherwise valid marker; several marker lookups over one token stream; preserve exact source offsets.

### K188-F5 — Existing lexer tests do not establish canonical-validator integration
**Severity: High as a release-evidence gap.**

The standalone lexer suite tests lexical helpers. The parity helper suite dynamically imports the validator and exercises its current legacy scanners. There is no committed integration suite proving that canonical validator orchestration uses lexer-derived spans, enforces uniqueness/ownership, and preserves all existing semantic gates. K183/K186's proposed synthetic integration test remains necessary.

## Integration acceptance contract

Before accepting an implementation:

1. Tokenize each SQL source once; retain the original source and token offsets.
2. Find all supported top-level phase candidates; require exactly one preflight and one apply owner, in the expected order. Explicitly reject unsupported DO syntax.
3. Find required markers only inside their owner span; require exactly one occurrence of each marker and correct relative order.
4. Extract tuple spans only from the bounded VALUES region; reject unmatched delimiters, unterminated opaque tokens, empty tuples, and unbalanced nesting.
5. Decode the expected literal fields using token-aware boundaries; retain existing literal-only key/course ID constraints.
6. Run all current semantic checks unchanged: immutable historical blob SHA, 38 ordered baseline and seed keys, 12 exact overlay and preflight keys, preflight baseline-value equality, exact drift set, effective tuple equality, 38 static page/H1 bindings, transaction/locking/row-count guards, and content-only write-scope checks.
7. Run the standalone lexer tests, validator helper tests, new integration tests, canonical parity validator, SQL validator, package validator, and north-circle browser regression tests in a complete checkout. Capture actual output and exit status.

## Next implementation slice

The smallest safe next code change is not to rewrite the lexer. Add validator-side orchestration helpers that collect and validate unique phase/marker spans from one tokenization, then route the existing extraction helpers through those bounded spans. Keep the lexer public API stable unless a demonstrated test requires a change. Implement only on the isolated work branch after obtaining a complete checkout and verifying this exact HEAD. Create and verify pre/post backup refs for the implementation. CI workflow edits remain separately gated by user approval.

## K188 outcome

One static audit document only. No source code, tests, validators, browser suite, CI, SQL, database, migration, seed, lesson content, PR, merge, deployment, or `main` branch was changed.
