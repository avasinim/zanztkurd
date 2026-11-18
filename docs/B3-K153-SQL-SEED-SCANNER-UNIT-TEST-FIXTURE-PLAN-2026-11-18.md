# B3-K153 — SQL Seed Scanner Unit-Test Fixture Plan
Date: 2026-11-18

## Purpose

Define a small, isolated unit-test suite for the helper functions in `scripts/validate_kurmanji_seed_parity.py`. The goal is to protect the scanner's documented SQL subset against accidental regressions without changing lesson text, seed files, migration SQL, or the validator's current behavior.

This is a plan and source review only. No test file or validator code was added or modified in this task.

## Current helper surface

The parity script exposes four focused parsing helpers suitable for direct unit tests:

- `extract_rows(source, label)`: extracts top-level tuples from the lesson-content INSERT block.
- `extract_values_rows(source, label, start_marker, end_marker)`: extracts tuples from a marker-delimited VALUES block, used for migration preflight rows.
- `tuple_string_values(row, label)`: splits a tuple into fields, respecting ordinary single-quoted strings, doubled apostrophes and nested parentheses.
- `row_key(row, label)`: requires the first two tuple fields to be SQL string literals and returns the lesson key.

The test suite should import these helpers without invoking `main()`, opening repository data files, or connecting to a database.

## Proposed test file and execution

Suggested file: `scripts/test_kurmanji_seed_parity.py`

Use Python's built-in `unittest` framework to avoid adding a dependency. Run with:

```bash
python -m unittest scripts.test_kurmanji_seed_parity -v
```

If the repository's script directory is not a Python package, use direct discovery or place the test under an existing test package; do not add packaging scaffolding solely for this test. CI integration should be a later, separately reviewed workflow edit. The existing workflow currently has explicit path filters, so adding a new test invocation/path would require updating CI configuration and separate user approval under the project's current guardrail.

## Fixture matrix

### 1. Top-level tuple extraction

| Case | Synthetic SQL shape | Expected |
|---|---|---|
| Basic rows | Two simple tuples | Two exact tuple strings |
| Comma in string | `('key','course','a,b',...)` | Comma does not split tuple |
| Parentheses in string | `('key','course','text (x)',...)` | Parentheses do not affect nesting |
| Doubled apostrophe | `('key','course','it''s fine',...)` | Quote remains inside literal |
| Nested expression | `('key','course',coalesce('x','y'),...)` | Nested parentheses do not split rows |
| No tuples | Empty/whitespace VALUES region | ValueError |
| Unbalanced close | Extra `)` | ValueError |
| Unbalanced open | Missing closing `)` | ValueError |
| Unterminated literal | Missing final quote | ValueError |
| Missing markers | INSERT/VALUES/ON CONFLICT absent | ValueError |

### 2. Preflight VALUES extraction

- Happy path with two expected tuples and exact start/end markers.
- Missing start marker.
- Missing VALUES marker.
- Missing end marker.
- Nested parentheses and quoted closing-marker text inside a string.
- Empty block.
- Unclosed string or unbalanced tuple.

The test should document that marker selection is a constrained text-format contract, not a general SQL parser.

### 3. Tuple field splitting

- Commas inside a quoted literal.
- Doubled apostrophes inside a literal.
- Nested function arguments containing commas.
- Empty string literal.
- SQL expressions retained as raw field strings.
- Malformed tuple boundary.
- Unclosed quote and unbalanced nested parentheses.

Do not assert that arbitrary PostgreSQL expressions are semantically decoded. The helper's job is field-boundary extraction for the constrained current seed format.

### 4. Lesson-key extraction

- Valid first and second string literals.
- Escaped apostrophe in lesson key.
- Unquoted key rejected.
- Unquoted course id rejected.
- Missing second field rejected.
- Extra spaces around literals accepted.
- A different second-field course id: assert the helper returns the key, then add a separate validator-level invariant in a future code change if/when approved.

## Test design principles

1. Every fixture is synthetic and short; never copy lesson bodies or learner data into tests.
2. Assertions target exact return values or the documented `ValueError`, not implementation line numbers.
3. Keep success and failure cases in separate test methods for readable diagnostics.
4. Avoid fixtures that imply support for SQL comments, dollar-quoted strings, E-strings or backslash escape semantics. Those constructs are outside the currently documented scanner subset; if they appear in a fixture, the expected behavior should be explicit rejection after a separately reviewed hardening change.
5. Keep the PostgreSQL syntax parser as an independent CI layer. Unit tests do not replace `pglast`.
6. Do not use these fixtures as evidence of database runtime, RLS, ACL or JWT correctness.

## Suggested acceptance criteria for a future implementation

- The new test module imports the four helper functions without side effects.
- All positive fixtures pass on current helper behavior.
- All malformed-input fixtures fail closed with the documented exception type.
- Existing seed parity validator output remains unchanged when run against the current repository.
- Existing SQL parser, package validator and browser tests continue to run unchanged.
- No lesson, seed, migration or database data changes.
- CI invocation is added only after explicit approval for the precise workflow path and command changes.

## Scope and guardrails

This K153 task adds this plan document only. It does not implement the test suite, change validator logic, change SQL, alter the workflow, execute a database statement, or run CI. The four CI path-filter omissions previously identified remain open and unchanged.

## Backup and branch references

- Work branch: `fix/kurmanji-ci-current-migration`
- Starting work-branch HEAD: `8f822cf75f2b67146e913ce0374c5c6e821b512b`
- Main observed before work: `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`
- Pre-work backup: `backup/b3-k153-scanner-fixture-plan-before-2026-11-18`
- Post-work backup: recorded after the report commit is created.
