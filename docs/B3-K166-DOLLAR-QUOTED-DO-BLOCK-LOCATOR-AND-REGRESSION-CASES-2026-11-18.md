# B3-K166 — Dollar-Quoted DO Block Locator and Focused Regression Cases
Date: 2026-11-18

## Scope
Added a narrowly scoped locator to the standalone SQL lexer and focused synthetic tests:
- `scripts/kurmanji_sql_lexer.py`
- `scripts/test_kurmanji_sql_lexer.py`

The canonical validator was not modified and does not yet import the lexer. This change is a preparatory helper, not an integration.

## Starting state and backup
- Work branch: `fix/kurmanji-ci-current-migration`
- Starting HEAD: `6f92c3eaccce09287f4d057c4aca4b97eb517efa`
- `main`: `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`
- Pre-work backup: `backup/b3-k166-dollar-do-block-locator-before-2026-11-18` at `6f92c3eaccce09287f4d057c4aca4b97eb517efa`

## Implementation
Added `find_dollar_quoted_do_block(source, tag, start=0)`:
- Requires an exact PostgreSQL dollar delimiter (for example, `$preflight$` or `$$`).
- Tokenizes SQL and looks for a `DO` word followed by optional whitespace/comments and a dollar-string token.
- Returns the full source span of the dollar-quoted body, or `None` if no matching DO block is found.
- Rejects invalid tags and negative offsets.
- Fails closed when tokenization encounters an unterminated quoted construct/comment.

Added eight synthetic regression cases covering named tags, comments/whitespace between DO and the body, decoy DO text in comments/strings, case-sensitive tag matching, start offsets, invalid arguments, unterminated bodies, and absence of a DO block.

A source review caught and corrected one test's expected opening-delimiter offset before finalizing this change.

## Integration boundary
The helper intentionally does not expose or parse the body contents. The ordinary marker finder continues to treat dollar-quoted bodies as opaque. The canonical validator remains unchanged; no marker call sites were switched. A later integration must use this span helper with explicit block-specific checks and cross-module tests, not blindly search inside opaque bodies.

## Verification limits
The committed test file was inspected after the final correction, but the repository's committed unittest module was not executed in a complete checkout. No claim is made that these eight new cases or the existing lexer suite pass at runtime. No full repository test suite, CI run, PostgreSQL parser, Supabase query, or live database test was run. No full 38-row corpus comparison was performed in this step.

## Safety
No lesson text, seed SQL, canonical validator, CI workflow, migration, database, Auth/RLS/grants, website, deployment, PR, merge, or `main` change. No Test or Production database operation was performed. The prior Test-only K113 authorization was not used.

## Next step
Obtain a complete checkout or reliable repository test execution path, run the committed lexer and validator tests, and compare extraction output against the 38-row corpus before considering any canonical validator integration. CI workflow changes remain gated on separate explicit approval.
