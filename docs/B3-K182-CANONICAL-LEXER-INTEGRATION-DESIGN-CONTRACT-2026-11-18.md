# B3-K182 — Canonical Lexer Integration Design Contract
Date: 2026-11-18
Repository: `avasinim/zanztkurd`
Work branch: `fix/kurmanji-ci-current-migration`
Starting HEAD: `d459183fa570443eef70a8541c3c94d258767dc3`

## Purpose
Define a safe, implementable integration boundary between the standalone PostgreSQL-aware lexer and the canonical Kurmanji seed-parity validator. This is a design artifact only; no source code or workflow was changed.

## Source-grounded current behavior
Reviewed the exact branch versions of:
- `scripts/kurmanji_sql_lexer.py`
- `scripts/test_kurmanji_sql_lexer.py`
- `scripts/test_kurmanji_seed_parity.py`
- `scripts/validate_kurmanji_seed_parity.py`

The lexer emits source-preserving tokens with `kind`, `text`, `start`, and `end`; it treats comments and quoted constructs as opaque. The DO locator returns the first matching DO dollar-string body span. The canonical validator does not import the lexer and continues to locate markers using raw `str.find()` and private quote/parenthesis loops.

## Proposed implementation boundary

### 1. Import and tokenize once
The validator should import the lexer through its existing script execution context and call `tokenize_sql(forward_sql)` once for the forward migration. Convert the iterator to a stable token sequence for the duration of validation. A lexical error (unterminated string, dollar quote, quoted identifier, or block comment) must fail closed with a clear validation error.

Do not change the lexer token model or rewrite seed/tuple decoding as part of the first integration patch.

### 2. Identify unique DO bodies from tokens
Add a small validator-side selector that:
- walks only ordinary `word` tokens whose text is `DO` (case-insensitive);
- skips only whitespace and SQL comment tokens between `DO` and its body;
- accepts a following `dollar_string` token only when its opening and closing delimiter exactly match the requested tag;
- records the full body token span and opening/closing delimiter positions;
- requires exactly one `$preflight$` DO block and exactly one `$apply$` DO block;
- rejects missing, duplicate, mismatched, malformed, or unterminated blocks.

The helper `find_dollar_quoted_do_block` can remain a low-level first-match convenience function, but it must not be used as proof of uniqueness. Uniqueness belongs to the canonical validator's caller-level scan.

### 3. Explicit grammar decision for DO LANGUAGE
For this migration-specific validator, use a deliberately restricted grammar: `DO [whitespace/comments] $tag$...$tag$`.
Reject a DO statement with an intervening `LANGUAGE lang_name` clause using an explicit unsupported-form diagnostic. This is preferable to partially parsing a broader PostgreSQL grammar in a narrow seed-integrity validator. The current reconciliation migration uses the restricted form. If broader DO syntax becomes a real repository requirement, expand it in a separate reviewed change with dedicated grammar tests.

### 4. Scope every marker to its owning block
Use the selected preflight body span as the only search region for:
- the preflight `VALUES` keyword;
- the expected-row alias marker `) AS expected`;
- the exact preflight tuple extraction.

Use the selected apply body span as the only search region for apply-phase safety guards and write-scope checks.

For the outer INSERT/VALUES/ON CONFLICT extraction, use lexer-aware marker positions in the whole migration and verify ordering and containment in the expected apply body. Marker candidates must be ordinary SQL tokens, not substrings of opaque tokens. Existing row tuple extraction should receive only the already validated source slice.

Do not use a marker located in a comment, string, escape string, dollar string, quoted identifier, or a different DO block to satisfy a required condition.

### 5. Preserve data invariants and write-scope checks
The integration must not relax or rewrite any of the existing canonical checks:
- exactly 38 ordered historical baseline lesson keys;
- exactly 38 ordered seed lesson keys;
- exactly 12 ordered overlay keys, in the existing canonical order;
- exactly 12 preflight keys matching that same overlay order;
- baseline first-four-field preflight comparison for all 12 rows;
- exact historical migration blob hash;
- effective post-migration tuple equality with all five seed files;
- exactly 38 static lesson H1 and protected content-key bindings;
- only one apply-phase write to `public.lesson_content`;
- no writes to other public tables and no progress, enrollment, or course-catalog mutation;
- unchanged title/content_html/updated_at conflict-update scope and course_id match.

No lesson text, seed payload, migration bytes, page content, or course structure may be altered by this integration.

## Cross-module regression fixtures required before implementation is accepted
Create synthetic fixtures (no real lesson payload) and test the canonical validator path, not only isolated lexer helpers.

| Fixture | Expected behavior |
|---|---|
| Current valid preflight + apply structure | Accept and select exact spans |
| Missing preflight or apply DO block | Reject |
| Two preflight blocks | Reject duplicate |
| Two apply blocks | Reject duplicate |
| Wrong-case or mismatched dollar tag | Reject |
| DO / VALUES / ON CONFLICT decoys in line and nested block comments | Ignore decoys |
| Marker-like text in standard and escape strings | Ignore decoys |
| Marker-like text in quoted identifiers | Ignore decoys |
| Marker-like text in unrelated dollar-quoted body | Ignore decoys |
| Preflight VALUES or end marker outside preflight body | Reject |
| Apply guard text only in preflight or decoy block | Reject |
| Unterminated comment/string/dollar body | Reject |
| `DO LANGUAGE plpgsql $tag$...` | Reject with documented restricted-grammar diagnostic |
| Valid markers with identifier-prefix/suffix collisions | Reject false marker match |
| Canonical full source corpus | Preserve all 38 / 12 / 38 invariants |

Existing lexer tests and parity-helper tests remain valuable, but passing them independently is insufficient. At least one integration-level test must call the new canonical span-selection path and assert the exact extracted preflight rows, overlay rows, and apply-body scope.

## Implementation sequencing and gates
1. Add validator-side unique DO-block selection and source-span scoping only.
2. Add cross-module synthetic fixtures.
3. Run, from a complete checkout:
   ```bash
   python scripts/test_kurmanji_sql_lexer.py
   python scripts/test_kurmanji_seed_parity.py
   python scripts/validate_kurmanji_seed_parity.py
   python scripts/validate_kurmanji_sql.py
   python scripts/validate_kurmanji_package.py
   python scripts/test_north_circle_ui.py
   ```
4. Inspect the diff to confirm only the intended validator/test files changed.
5. Obtain CI evidence for the exact resulting SHA. Existing workflow does not currently run the two focused test modules and path filters omit the lexer/test modules. Any workflow edit or dispatch outside available connector capabilities is separately approval-gated.

## Evidence limits and non-actions
No complete checkout was available in the runtime; no Python test, validator, SQL parser, CI workflow, database query/write, or browser test was executed for K182. This document does not claim runtime correctness or PASS status.

No source code, test file, workflow, migration, seed file, lesson page/content, database, deployment, pull request, merge, or `main` branch was changed. No production or Test database action was taken.
