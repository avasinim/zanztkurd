# B3-K185 — Canonical Validator Lexical-Boundary Implementation Audit
Date: 2026-11-18
Repository: `avasinim/zanztkurd`
Work branch: `fix/kurmanji-ci-current-migration`
Starting HEAD: `f7fd818d834f3d11bfaec71b454d67b5520f38d4`

## Scope and result

This is a read-only static audit of the current canonical seed-parity validator, its standalone SQL lexer, the corresponding unit tests, the reconciliation migration, and the package-validation workflow. It adds no source or test code and does not execute a validator.

**Finding:** the lexer exists and has meaningful unit coverage, but the canonical validator still uses independent character-level scanners and raw `str.find()` calls. The lexer is not imported or called by the validator. Consequently, the current passing/future lexer unit tests cannot protect the canonical validator's actual marker selection or tuple extraction path.

## Verified implementation map

| Area | Current implementation | Boundary |
|---|---|---|
| `extract_rows()` | Locates INSERT, VALUES and ON CONFLICT with `str.find()`; scans parentheses and ordinary single-quoted strings manually | Does not use SQL tokens to ignore comments, E-strings, dollar strings, or quoted identifiers |
| `extract_values_rows()` | Locates start marker, VALUES and end marker with `str.find()`; uses a second manual parenthesis/string scanner | Same lexical blind spots; marker scope is not tied to a DO-block span |
| `tuple_string_values()` | Splits fields using commas, parentheses and ordinary quote state | Does not share a common PostgreSQL lexical model with the lexer |
| `main()` block slicing | Uses raw `find()` calls to slice `DO $preflight$`, `$preflight$;`, and `DO $apply$` sections | A marker-like decoy earlier in a comment or literal can redirect the slice |
| `kurmanji_sql_lexer.py` | Exposes `tokenize_sql`, `find_sql_marker`, and `find_dollar_quoted_do_block` | No import or call from the canonical validator was present in the inspected source |
| Tests | Lexer tests cover tokenization and marker helpers; parity tests cover simple tuples, doubled apostrophes, nested parentheses and malformed ordinary strings | No executed evidence here; test coverage is not yet end-to-end through the canonical validator |
| Workflow | Package workflow runs SQL parse, parity, package and browser checks | Path filters and steps omit the standalone lexer test and parity-helper test modules |

## Specific failure surfaces

1. **Marker decoys can redirect the canonical extraction.** The validator's raw searches do not distinguish executable SQL from comments, quoted strings, escape strings, quoted identifiers or dollar-quoted bodies. A synthetic comment such as `-- INSERT INTO public.lesson_content VALUES ... ON CONFLICT (lesson_key)` before the real statement can influence the first marker offsets.
2. **Tuple boundaries can be changed by lexical content.** The manual scanners only understand ordinary single-quoted strings with doubled apostrophes. Parentheses inside comments or dollar-quoted text are counted as structural parentheses; backslash-escaped quotes in an E-string are not treated as escapes. This can cause false tuple boundaries or a false malformed-input rejection.
3. **Preflight/apply ownership is not enforced by offsets.** The helper `find_dollar_quoted_do_block()` can identify a DO body span, but the canonical validator does not use it. The current raw slice logic does not prove that the VALUES block and its ending alias are inside the intended preflight body, or that apply guards are inside the intended apply body.
4. **The current helper tests do not close the integration gap.** Unit tests for the lexer demonstrate helper behavior in isolation. Existing parity-helper tests exercise the old manual extraction functions. Neither suite demonstrates that canonical validation ignores decoys and selects only markers within the exact owning block.

These are static risks in the inspected implementation, not a claim that the current checked-in migration contains such a decoy or that the production migration is malformed.

## Recommended implementation contract

Do not make a partial change that only imports the lexer into one extraction function. When an authorized full checkout and runner are available, implement the following as one coherent validator-side boundary:

1. Tokenize the complete source once; retain exact source offsets and fail closed on unterminated lexical constructs.
2. Locate exactly one preflight DO body and exactly one apply DO body using the exact dollar tags. Reject missing, duplicate, mismatched, or reversed blocks.
3. Require each preflight marker and its VALUES/end-alias markers to fall inside the preflight span. Require apply-only guards and write markers to fall inside the apply span.
4. Select INSERT, VALUES and ON CONFLICT markers outside opaque tokens and at identifier boundaries; reject duplicate or out-of-order structural markers rather than silently taking the first occurrence.
5. Extract tuple spans using token kinds/source offsets so parentheses and commas inside strings, E-strings, dollar strings, comments and quoted identifiers do not affect tuple depth.
6. Reuse the same lexical rules in tuple-field parsing, or explicitly reject unsupported SQL literal forms. Do not silently decode an E-string or dollar string as an ordinary string literal.
7. Keep the current exact invariants unchanged: 38 ordered baseline keys, 38 ordered seed keys, exactly 12 ordered overlay rows, exactly 12 matching preflight rows, matching course IDs, historical migration blob identity, and the 38 page bindings.

## Focused synthetic regression cases still required

The following should be added to the K183 fixture plan's integration harness once a complete checkout is available:

- A fake INSERT/VALUES/ON CONFLICT sequence in a line comment before the real INSERT.
- The same decoy inside a nested block comment.
- A fake preflight opening/closing tag in an ordinary string and in an unrelated dollar-quoted body.
- An E-string containing a backslash-escaped quote and parentheses before a real tuple.
- A dollar-quoted value containing parentheses, commas and marker words inside the VALUES payload.
- A quoted identifier containing a marker word.
- Duplicate structural markers both inside and outside the owning DO block.
- A valid-looking preflight marker located only in the apply block, and vice versa.
- A reversed or duplicated preflight/apply block pair.
- A marker word embedded in a longer unquoted identifier.

Each case must call the canonical validator-side entry point, not only the lexer helper. Keep all fixtures synthetic and free of lesson text, credentials and database access.

## Execution and safety record

- Source files were inspected through GitHub's file interface at the isolated work branch.
- No Python test, validator, SQL parser, browser test, CI workflow, or database operation was run.
- No CI/workflow configuration, migration, seed file, lesson page/content, application source, PR, merge, deployment, production/Test database, or `main` was changed.
- This report is a static implementation audit only; it must not be represented as a test pass or as proof of a live database state.
