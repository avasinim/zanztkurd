# B3-K167 — Dollar-Quoted DO-Block Integration Readiness Audit
Date: 2026-11-18
Branch: `fix/kurmanji-ci-current-migration`
Starting HEAD: `2f71e26931d693e1f376a80cb7e5e0ba67a0b753`

## Scope
Read-only source audit of the K166 standalone SQL lexer, its synthetic tests, the canonical seed-parity validator, and the two relevant migration sources. This step does not integrate the lexer into the validator.

## Verified starting state
- Work branch HEAD was `2f71e26931d693e1f376a80cb7e5e0ba67a0b753`.
- `main` remained `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`.
- K166 before backup exists at `6f92c3eaccce09287f4d057c4aca4b97eb517efa`.
- K166 after backup exists at `2f71e26931d693e1f376a80cb7e5e0ba67a0b753`.
- A unique K167 pre-work backup was created at the starting HEAD:
  `backup/b3-k167-do-block-corpus-audit-before-2026-11-18`.

## Findings

### 1. K166 helper is a useful locator, not a parser
`find_dollar_quoted_do_block(source, tag, start=0)` tokenizes the source, ignores comments and quoted strings while searching for a standalone `DO` word, skips whitespace/comments before its body, and returns the exact dollar-string span when its delimiter matches the requested tag. This is appropriate as a narrow lexical locator for the current `DO $preflight$` and `DO $apply$` forms.

The helper does not establish that `DO` begins a top-level SQL statement; it only establishes that the token is a word equal to `DO` followed by a matching dollar-string token. It also returns the first matching block for a tag, so callers must make uniqueness/selection explicit when the same tag could occur more than once. It tokenizes the entire supplied source and therefore fails closed on an unterminated quoted construct anywhere in that source, even if the defect is outside the requested block.

### 2. Current migration uses the expected exact forms
The reconciliation migration contains the named dollar-quoted blocks `DO $preflight$ ... $preflight$;` and `DO $apply$ ... $apply$;`. The K166 locator's exact-tag model matches these forms. The full-prefix migration also contains dollar-quoted function bodies, but those are not the reconciliation validator's current extraction target.

### 3. Canonical validator remains independent of the lexer
`scripts/validate_kurmanji_seed_parity.py` does not import `kurmanji_sql_lexer`. It still uses raw `.find()` calls for:
- `INSERT INTO public.lesson_content`, `VALUES`, and `ON CONFLICT (lesson_key)` in `extract_rows`;
- start marker, `VALUES`, and end marker in `extract_values_rows`;
- `DO $preflight$`, `$preflight$;`, and `DO $apply$` when slicing the migration in `main`.

Its row scanners independently track single-quoted strings and parentheses. They do not yet share the lexer's handling of comments, E-strings, dollar-quoted strings, or quoted identifiers. Replacing only the DO-block slice would therefore not make the full validator lexer-safe.

### 4. Test invocation path is compatible, but execution is unverified
The standalone lexer test imports `kurmanji_sql_lexer` directly. The canonical seed-parity test file documents invocation from the repository root and loads the validator by an explicit path. When Python executes `python scripts/test_kurmanji_sql_lexer.py`, the script directory is on the import path, so the sibling-module import is structurally compatible with that invocation.

However, this audit did not execute either committed test module in a complete repository checkout. The available GitHub file reads do not constitute test execution. No test-pass claim is made.

## Decision
Do not wire the locator into the canonical validator in this step. A safe integration needs:
1. explicit handling for duplicate matching DO tags and statement-context assumptions;
2. cross-module regression tests that exercise the actual validator extraction functions against comments, whitespace, decoy text, malformed blocks, and duplicate tags;
3. unchanged parity results over all 38 canonical lesson keys, the 12 overlay keys, and the five seed files;
4. a complete checkout-based execution of the committed test modules and canonical validator.

The current row scanners have independent lexical limitations, so a narrow DO-block integration alone must not be represented as full SQL-scanner hardening.

## Validation and non-actions
- Source files were fetched and inspected; no committed test module was executed.
- No 38-row corpus parity run, PostgreSQL parser check, CI run, Supabase query, or live database test was performed.
- No code, test, seed, migration, lesson content, CI workflow, website, or deployment file was changed.
- No Test or Production database operation was performed.
- No PR, merge, or `main` update was performed.

## Next safe step
Build an isolated cross-module test plan and, when a complete checkout-based execution path is available, implement the smallest validator integration that can be proven against the actual corpus. Keep CI workflow edits and all database operations outside scope unless separately authorized.
