# B3-K181 — Static Lexer / Seed-Parity Integration Audit
Date: 2026-11-18
Branch: `fix/kurmanji-ci-current-migration`
Starting HEAD: `d45cb71b738bb21a733d4f97c28a60aeb2cc5e5f`

## Scope and evidence
Static source review only. Read the current branch versions of:
- `scripts/kurmanji_sql_lexer.py`
- `scripts/test_kurmanji_sql_lexer.py`
- `scripts/validate_kurmanji_seed_parity.py`
- `scripts/test_kurmanji_seed_parity.py`
- `.github/workflows/validate-kurmanji-package.yml`
- `supabase/migrations/20261116120000_reconcile_kurmanji_seed_content.sql`

No complete checkout is available in this runtime. No Python tests, validators, SQL parser, database operation, or workflow run was executed.

## Current integration state
The standalone lexer is not imported by the canonical seed-parity validator. The validator continues to use direct `str.find()` marker selection and its own quote/parenthesis loops. In particular:
- `extract_rows` selects INSERT, VALUES, and ON CONFLICT with unqualified substring searches.
- `extract_values_rows` selects the start marker, next VALUES, and end marker with substring searches.
- the main preflight/apply spans are sliced using `forward_sql.find("DO $preflight$")`, `find("$preflight$;")`, and `find("DO $apply$")`.
- the existing helper `find_dollar_quoted_do_block` returns the first matching DO-body span; it does not count or reject duplicate matching blocks.
- the helper recognizes DO followed by a dollar-string token, optionally separated by whitespace/comments. It does not recognize the optional `LANGUAGE lang_name` clause before the body.
- current reconciliation migration uses the simpler `DO $preflight$` and `DO $apply$` forms, so the LANGUAGE limitation is a general grammar limitation, not evidence of a defect in the current migration.

## Concrete integration risks
1. **Marker scope is not lexical.** A marker-like substring in a comment, string, or unrelated block can influence the current validator's `find()` slicing before tuple parsing begins.
2. **The DO-body locator is first-match only.** A duplicate `DO $preflight$` or `DO $apply$` can be silently resolved to the first match unless the caller independently counts occurrences.
3. **The VALUES extractor is not scoped to the identified body.** The current call uses a start marker and end marker but does not first prove that both markers occur inside the same uniquely identified DO block.
4. **The two scanners have different lexical models.** The validator's private loops do not account for nested comments, dollar-quoted bodies, or escape strings in the same way as the standalone lexer.
5. **Test suites are separate.** The lexer tests exercise the lexer; parity tests exercise the validator helpers. There is no cross-module fixture proving that lexer-derived spans constrain the canonical validator's extraction.

## Recommended integration contract (proposal; not implemented)
A future code change should:
- tokenize the forward migration once and retain source spans;
- locate exactly one preflight DO block and exactly one apply DO block, failing closed on missing, duplicate, malformed, or unterminated blocks;
- use the selected preflight body span as the only permitted search region for its VALUES / expected-row markers;
- use the selected apply body span as the only permitted region for apply-phase guard and write-scope checks;
- ensure decoy marker text in comments, standard strings, escape strings, quoted identifiers, and unrelated dollar-quoted bodies cannot satisfy required markers;
- keep the existing canonical invariants unchanged: 38 ordered baseline keys, 38 ordered seed keys, exactly 12 ordered overlay keys, matching 12 preflight rows, content-only write scope, and 38 static page bindings;
- add cross-module synthetic fixtures for decoys, missing blocks, duplicate blocks, mismatched tags, malformed blocks, and valid current-migration shape;
- preserve current migration bytes and lesson content during parser integration.

## Acceptance matrix
| Case | Required result |
|---|---|
| One valid preflight and one valid apply block | Accept |
| Missing preflight or apply block | Reject |
| Two preflight blocks or two apply blocks | Reject |
| Decoy DO / VALUES / ON CONFLICT text in comments or strings | Ignore decoy; use actual code only |
| Unterminated dollar body or comment | Reject |
| Preflight VALUES markers outside the unique preflight body | Reject |
| Apply guard text only inside a decoy block | Reject |
| Current canonical 38 + 12 + 38 invariants | Preserve exactly |
| Optional DO LANGUAGE form | Either support explicitly with tests or reject with a documented restricted-grammar error |

## Execution / CI status
- No tests or validators executed; no PASS claim is made.
- The current workflow still does not invoke `test_kurmanji_sql_lexer.py` or `test_kurmanji_seed_parity.py`, and its path filters omit the lexer and both focused test modules.
- No workflow dispatch or rerun was available through the connected GitHub actions.
- CI workflow edits remain separately approval-gated; «بەردەوام بە» is not treated as approval for CI changes.

## Safety and non-actions
Documentation-only audit. No application or validator source, SQL migration, seed file, lesson page/content, workflow, database, deployment, pull request, merge, or `main` branch was changed.
