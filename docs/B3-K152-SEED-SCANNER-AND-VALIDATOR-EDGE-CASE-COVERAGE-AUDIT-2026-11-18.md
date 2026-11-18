# B3-K152 — Seed Scanner and Static Validator Edge-Case Test Coverage Audit
Date: 2026-11-18

## Scope and safety

Read-only source review of:
- `scripts/validate_kurmanji_seed_parity.py`
- `scripts/validate_kurmanji_sql.py`
- `scripts/validate_kurmanji_package.py`
- `scripts/test_north_circle_ui.py`
- The CI workflow that invokes these checks.

This task adds documentation only. No validator, unit test, seed, lesson, SQL test, migration, workflow, Supabase project, Auth, RLS, grant, deployment, pull request, merge, or default-branch content was changed. No database query or SQL execution was performed. No local script execution is claimed.

## Existing automated coverage

The parity validator enforces:
- Exactly five split seed files.
- The immutable canonical migration blob SHA.
- Exactly 38 ordered lesson keys (26 + 12), with no duplicate keys.
- Exactly 12 overlay keys and the matching preflight key set.
- Preflight first four tuple values against the canonical baseline.
- Presence of selected transaction, row-lock, row-count and content-only write guards.
- Exact effective tuple equality against the five split seeds.
- Static H1 title and protected lesson-key alignment for all 38 pages.

The PostgreSQL parser separately validates syntax of its configured SQL files. The package validator checks a broad set of source-text contracts, including progression helper labels, RPC token/privilege contracts and page/runtime invariants. Browser tests use Playwright with synthetic Supabase behavior; they are not live database/JWT/RLS integration tests.

## Edge-case coverage review

### A. SQL tuple scanner

The scanner correctly accounts for ordinary single-quoted strings, doubled single quotes, nested parentheses and commas inside quoted/nested values. K150 separately documented the current corpus constraints and the absence of comments, dollar quotes, E-string prefixes, backslashes and doubled quotes in current INSERT blocks.

No dedicated unit-test module was found for the parity scanner's helper functions. The current parity validator exercises the helpers only against the production-shaped checked-in corpus. Therefore, its important lexical assumptions are not protected by isolated fixtures.

Recommended future fixture cases:
1. A quoted value containing a comma and parentheses.
2. A quoted value containing doubled apostrophes.
3. A nested expression containing commas and parentheses.
4. An empty or whitespace-only VALUES block.
5. An unmatched closing parenthesis, unclosed opening parenthesis and unterminated string.
6. A row with too few/many fields or a non-literal first/second field.
7. A comment or dollar-quoted/E-string/backslash construct, which should either be explicitly rejected or parsed with PostgreSQL-aware tooling rather than silently mis-scanned.
8. A marker-order case where INSERT, VALUES or ON CONFLICT is missing or appears in an unexpected location.

### B. Tuple field and key validation

`tuple_string_values` splits fields outside quoted strings and nested parentheses, then decodes fields that begin and end with a single quote. It is not a complete SQL literal parser. The separate pglast check protects against malformed SQL syntax in files it parses, but does not make this helper a general-purpose SQL decoder.

`row_key` requires the row to begin with two quoted string literals and captures both, but returns only the first value. The caller validates the first key against expected lists; it does not independently compare the second captured course identifier with the expected course for that key. The complete tuple equality checks strongly constrain the current canonical/overlay/seed corpus, but a focused course-id-to-key invariant would make the intended relationship explicit and easier to diagnose.

### C. Marker and block-boundary assumptions

The extraction helpers use exact, case-sensitive textual markers:
- `INSERT INTO public.lesson_content`
- `VALUES`
- `ON CONFLICT (lesson_key)`
- `DO $preflight$`
- `DO $apply$`

This is acceptable for the current controlled migration format, but it is a deliberate format constraint. A harmless SQL formatting/refactoring change could fail extraction even when PostgreSQL accepts the SQL. Conversely, a future source containing misleading marker text in comments or strings could cause the scanner to select an unintended range. Add fixtures for missing, repeated and misleading markers before broadening the accepted SQL format.

### D. Static package-validator tests

The package validator's SQL/RPC checks are primarily substring and regular-expression contracts. The full-prefix SQL test labels are required as text; that ensures the expected assertion descriptions remain present, but does not prove each label is attached to a live assertion with the intended operands. Likewise, required tokens may appear in comments or unrelated regions unless the relevant function-body extraction happens to constrain them.

The current validator itself documents that these are static checks, not live PostgreSQL/JWT/RLS tests. Keep that distinction explicit in CI summaries and release decisions.

## Prioritized recommendations

1. Add a small standard-library unit-test file for the parity scanner helpers, using synthetic SQL snippets and explicit expected failures. Keep fixtures independent of lesson content.
2. Add an explicit invariant mapping each lesson key to its expected course identifier; assert the second tuple field against that mapping.
3. Define and document the accepted SQL subset. Reject unsupported comments/dollar-quoted/E-string/backslash constructs with a clear error, or migrate extraction to PostgreSQL AST-based parsing if the format needs to expand.
4. Add validator tests proving malformed or missing marker blocks fail closed, and that repeated markers do not select the wrong block.
5. For SQL behavior, add disposable-PostgreSQL execution tests; for authorization, add real JWT/RLS integration tests in an isolated test environment. Do not infer these behaviors from textual token presence or mocked browser tests.
6. Keep the previously identified four CI path-filter omissions visible: full-prefix migration, full-prefix SQL test, legacy course migration and owner-admin migration are consumed by validators but absent from both push and pull-request path lists. Their path-filter correction remains a separate CI configuration change requiring explicit user approval.

## Findings classification

- Current checked-in corpus: no new evidence of a parity mismatch or current scanner misparse was established by this source review.
- Testability gap: scanner helpers lack dedicated edge-case unit fixtures.
- Format-maintenance risk: marker extraction and lexical scanning intentionally support a narrow SQL subset.
- Semantic-coverage gap: static SQL/RPC source checks and mocked browser tests do not establish live database behavior or effective permissions.
- CI trigger gap: four SQL paths remain omitted from both automatic path filters.

## Verification limits

- Source-level audit only; no local validator or test suite execution is claimed.
- No PostgreSQL or Supabase SQL execution/query was performed.
- No workflow run was dispatched.
- No Test or Production database was modified.
- No lesson text or seed content was changed.
- No CI workflow, PR, merge, deployment or main-branch change was made.

## Backup and branch references

- Work branch: `fix/kurmanji-ci-current-migration`
- Starting work-branch HEAD: `d5845727b081f38cf6101bcf625488e535aea876`
- Main observed before work: `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`
- Pre-work backup: `backup/b3-k152-validator-edge-tests-before-2026-11-18`
- Post-work backup: recorded after the report commit is created.
