# B3-K183 — Synthetic Integration Fixture Plan for the Canonical SQL Validator
Date: 2026-11-18
Repository: `avasinim/zanztkurd`
Work branch: `fix/kurmanji-ci-current-migration`
Starting HEAD: `afac2cb634dc61ee8f16544f81a1db7b4ed08a71`

## Scope
This is a test-design document for the proposed lexer-to-validator integration. It does not add tests or alter source. Every fixture below is synthetic and must avoid real lesson text, seed payloads, credentials, or database access.

## Test harness design

### Proposed test module
Add a focused integration test module only after a complete checkout is available:
`scripts/test_kurmanji_seed_parity_lexer_integration.py`

The module should import the canonical validator and the lexer from the repository's scripts directory, following the existing `test_kurmanji_seed_parity.py` import pattern. Tests must call the canonical validator-side span selection/extraction entry points, not merely call lexer helpers directly.

### Synthetic migration fixture
Use a deliberately tiny SQL string with:
- one uniquely tagged preflight DO block;
- one uniquely tagged apply DO block;
- a minimal synthetic expected-key VALUES list (e.g. two opaque keys);
- a minimal synthetic INSERT/VALUES/ON CONFLICT sequence;
- no actual course text or production rows.

Keep the valid fixture's markers on separate lines and include comments/whitespace so the test asserts source-span behavior rather than formatting assumptions. Provide a helper that returns the SQL and expected exact source offsets. Avoid copying the real migration wholesale into tests.

### Assertion layers
For every valid fixture, assert:
1. preflight and apply spans are found exactly once;
2. the spans are ordered and non-overlapping;
3. each required marker's offset lies inside its owning body;
4. extracted tuples equal the fixture's expected synthetic tuples;
5. no decoy token is selected;
6. original source bytes/text remain unchanged.

For invalid fixtures, assert a deterministic validation exception and a useful diagnostic category (missing, duplicate, malformed, out-of-scope, unsupported grammar, or lexical error). Do not assert fragile full error prose unless the diagnostic is a documented public contract.

## Fixture matrix

| ID | Synthetic change from valid fixture | Expected outcome | Main assertion |
|---|---|---|---|
| I01 | Unmodified valid two-block fixture | Accept | Exact spans and tuple lists |
| I02 | Remove preflight block | Reject | Missing-preflight diagnostic |
| I03 | Remove apply block | Reject | Missing-apply diagnostic |
| I04 | Add a second preflight block with the same tag | Reject | Duplicate-preflight diagnostic |
| I05 | Add a second apply block with the same tag | Reject | Duplicate-apply diagnostic |
| I06 | Use a different tag for the block body | Reject | Mismatched-tag / missing-block diagnostic |
| I07 | Unterminated preflight dollar body | Reject | Lexical error |
| I08 | Unterminated nested block comment before a marker | Reject | Lexical error |
| I09 | Put fake `DO $preflight$` and fake close tag in a line comment | Ignore decoy | Real block alone selected |
| I10 | Put fake `DO $apply$` inside nested block comments | Ignore decoy | Real block alone selected |
| I11 | Put `VALUES` and `ON CONFLICT` inside standard strings | Ignore decoys | Real SQL tokens selected |
| I12 | Put marker text inside an E-prefixed escape string | Ignore decoys | Real SQL tokens selected |
| I13 | Put marker text inside a quoted identifier | Ignore decoy | Real SQL tokens selected |
| I14 | Put fake DO/VALUES markers in an unrelated dollar-quoted body | Ignore decoys | Real target block and markers selected |
| I15 | Move preflight VALUES marker outside preflight body | Reject | Out-of-scope marker |
| I16 | Move expected-row alias marker outside preflight body | Reject | Out-of-scope marker |
| I17 | Put apply guard only in preflight body | Reject | Apply scope not satisfied |
| I18 | Put apply write marker only in unrelated DO block | Reject | Apply scope not satisfied |
| I19 | Prefix/suffix marker word with identifier characters | Reject false match | Identifier-boundary validation |
| I20 | Add `DO LANGUAGE plpgsql $tag$...` | Reject | Explicit unsupported-grammar diagnostic |
| I21 | Put duplicate tag text in a non-DO SELECT dollar string | Ignore decoy | Not counted as a DO block |
| I22 | Add harmless whitespace and comments between DO and delimiter | Accept | Permitted separation recognized |
| I23 | Reorder apply before preflight | Reject | Required phase ordering |
| I24 | Use identical tags in separate but distinct blocks | Reject duplicates | Exactly-one rule applies by tag |
| I25 | Make tuple parentheses/string quotes malformed | Reject | Existing tuple parser remains fail-closed |

## Cross-module test responsibilities
- Lexer unit tests: token kinds, exact source spans, opaque lexical regions, malformed lexical constructs.
- Integration tests: unique block selection, marker ownership, marker decoys, phase order, extraction boundaries.
- Existing parity helper tests: row tuple parsing, lesson-key format, course-id matching.
- Canonical validator: real corpus and invariant checks.

Passing one layer must not be reported as passing another. In particular, passing the lexer tests does not establish canonical validator integration.

## Canonical acceptance gate
After integration is implemented, run from a complete repository checkout:
```bash
python scripts/test_kurmanji_sql_lexer.py
python scripts/test_kurmanji_seed_parity.py
python scripts/test_kurmanji_seed_parity_lexer_integration.py
python scripts/validate_kurmanji_seed_parity.py
python scripts/validate_kurmanji_sql.py
python scripts/validate_kurmanji_package.py
python scripts/test_north_circle_ui.py
```

The canonical checks must continue to prove, without weakening existing assertions:
- 38 ordered baseline keys;
- 38 ordered seed keys;
- exactly 12 overlay keys and 12 matching preflight rows;
- 38 static lesson-page bindings;
- exact protected migration identity and content-only write scope.

Review the final diff for unintended changes to migrations, seed files, lesson content, course structure, or page assets. The focused integration tests are not a substitute for the full validators.

## Execution constraints and status
The current runtime still lacks a complete checkout suitable for running the repository's Python test commands. This K183 artifact records test cases only; no fixture code was committed and no tests, validators, SQL parser, browser suite, CI run, or database operation was executed.

No CI/workflow edit, workflow dispatch, migration, seed, lesson page/content, application source, production/Test database write, deployment, pull request, merge, or `main` change is authorized or performed by this work item.
