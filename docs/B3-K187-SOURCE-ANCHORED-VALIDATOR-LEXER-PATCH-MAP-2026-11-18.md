# B3-K187 — Source-Anchored Validator/Lexer Patch Map
Date: 2026-11-18
Repository: `avasinim/zanztkurd`
Work branch: `fix/kurmanji-ci-current-migration`
Starting HEAD: `c2865ccc4f23fe69c6d6c2cc27817ca8ef4bcfb1`

## Scope and status

This is a read-only implementation map based on the exact files fetched from the work branch. It is not an implementation, test result, migration, CI change, or approval to modify protected resources. No Python runtime or complete writable checkout was available in this session, so no tests or validators were executed.

## Source identity

| File | Blob SHA |
|---|---|
| `scripts/validate_kurmanji_seed_parity.py` | `5d98e5e5e5b7ca950af7456530c0884514a626cc` |
| `scripts/kurmanji_sql_lexer.py` | `d377f7b3c46235a6df29b06c55734603f1e3ff9b` |
| `scripts/test_kurmanji_seed_parity.py` | `cc0ffd06299557f27be859c7341af1fc2a4a72c8` |
| `scripts/test_kurmanji_sql_lexer.py` | `dd7f2a65494619f47da1db94afcfecf7ff7903d5` |
| `.github/workflows/validate-kurmanji-package.yml` | `6b6b1389af21a48d400cd24e29ee5ee0a36f8b1c` |

## Exact patch boundaries

1. **Keep the standalone lexer as the lexical source of truth.** Its public surface is `Token` (line 11), `tokenize_sql` (line 26), `find_sql_marker` (line 138), and `find_dollar_quoted_do_block` (line 176). It preserves source spans and classifies comments and quoted constructs as opaque tokens.
2. **Replace validator-local structural scanning, not business invariants.** In `validate_kurmanji_seed_parity.py`, the legacy scanners begin at `extract_rows` (line 39), `extract_values_rows` (line 85), and `tuple_string_values` (line 127). The literal key/course readers are at lines 165 and 172. The next implementation should route structural boundary discovery and tuple field splitting through lexer-backed private helpers while preserving the existing public helper signatures until all callers/tests are migrated.
3. **Make marker ownership explicit in orchestration.** `main` begins at line 200. It extracts preflight rows at line 228. Raw phase slicing currently occurs at lines 287–288 using `str.find`; required guard checks begin at line 289. Replace those raw slices with unique, token-aware DO-block spans, then locate marker spans only inside their owning blocks. Reject missing, duplicate, out-of-owner, or ambiguous markers before row extraction.
4. **Preserve semantic and safety checks.** Keep the historical blob SHA check, 38 ordered baseline/seed keys, 12 overlay and 12 preflight keys, exact baseline preflight values, course-ID checks, drift set, effective tuple equality, static H1/page bindings, transaction and row-lock guards, exact 12-row bounds, and the content-only write-scope assertions. The lexer integration must not weaken or reorder these gates.

## Test integration map

- Existing validator helper tests are in `scripts/test_kurmanji_seed_parity.py`: row extraction begins at line 26, preflight extraction at 108, tuple decoding at 145, course-ID checks at 192, and key parsing at 250.
- Existing standalone lexical tests are in `scripts/test_kurmanji_sql_lexer.py`; they cover opaque comments/strings, escape strings, dollar quotes, identifier boundaries, token span reconstruction, and DO-block discovery.
- Add the new synthetic integration module specified by K183/K186. It must call the validator-side integration helper (and, where practical, the canonical validator entry point), not merely test the lexer in isolation. Include marker decoys in every opaque token class; duplicate/missing phase blocks; wrong or repeated tags; phase-order errors; markers outside their owner; tuple punctuation inside strings/comments/dollar strings; malformed tuples; and fail-closed behavior.
- Run the full acceptance sequence from K186 in a complete checkout: standalone lexer tests, validator helper tests, new integration tests, canonical parity validator, SQL validator, package validator, and north-circle browser regression tests. Record actual command output and exit status; do not infer success from static inspection.

## CI gate remains separate

The fetched workflow currently installs Python and runs the SQL validator, parity validator, package validator, and browser tests. Its path filters list the canonical validator but do not list the lexer module, its standalone test, or the proposed integration test; the job also has no explicit lexer/integration test commands. Any workflow/path-filter change remains outside this work item and requires the user's separate explicit approval.

## Execution prerequisites and stop conditions

- Obtain a complete checkout of the exact work-branch HEAD and a supported Python environment.
- Verify the checkout HEAD equals the starting SHA above before patching; create a fresh pre-work backup at that exact SHA.
- Implement only on `fix/kurmanji-ci-current-migration`; do not switch to or update `main`.
- If helper contracts or source files differ from the blob SHAs above, stop and re-audit before applying a patch.
- If any baseline, content, lesson, migration, database, CI, PR, merge, or deployment scope is implicated, stop rather than expanding scope.
- After implementation and actual tests, create a unique post-work backup at the resulting HEAD and verify both backup refs, the work branch, and unchanged `main`.

## K187 outcome

One source-anchored documentation artifact only. No Python tests, validators, browser tests, CI workflow, database operation, migration, seed, lesson content, PR, merge, deployment, or `main` write was performed.
