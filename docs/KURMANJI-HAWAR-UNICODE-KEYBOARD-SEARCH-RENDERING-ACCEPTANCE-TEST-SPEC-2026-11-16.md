# Hawar Latin Text — Unicode, Keyboard, Search and Rendering Acceptance-Test Specification
**Date:** 2026-11-16  
**Repository:** `avasinim/zanztkurd`  
**Working branch:** `fix/kurmanji-ci-current-migration`  
**Baseline:** `f7ba2c900d0ca44aeddf8093c7bf682631ff2428`  
**Status:** proposal-only technical test specification; no source code, lesson payload, database, CI or runtime changed.

## 1. Purpose and boundary

This specification defines a reproducible acceptance-test plan for the 31-letter Hawar-based Kurmanji Latin inventory used by the independent Kurmanji-medium pathway. It focuses on the five letters with diacritics:

- `Ç ç`
- `Ê ê`
- `Î î`
- `Ş ş`
- `Û û`

It also checks the important distinction between `I/i` and `Î/î`.

The purpose is to verify that these letters survive typing, copy/paste, storage, retrieval, search, display, editing and export. It does not decide the project's linguistic reference variety, change alphabet policy, implement a keyboard, modify any lesson or authorize a production migration.

**No runtime test has been executed as part of this document.** The test cases below are acceptance criteria for a later, explicitly authorized technical test run.

## 2. Standards basis and engineering decisions

### 2.1 Canonical equivalence

Unicode encodes some text in precomposed form and some as canonically equivalent sequences of a base character plus combining mark. Unicode recommends that programs compare canonically equivalent strings as equal; NFC is generally recommended for general text, while NFD is useful for internal processing. UAX #15 defines the normalization forms and conformance requirements.

References:
1. Unicode Consortium, **Unicode Standard Annex #15: Unicode Normalization Forms**, Version 58 / Unicode 18.0.0 (2026-08-12): https://www.unicode.org/reports/tr15/
2. Unicode Consortium, **FAQ — Normalization**: https://www.unicode.org/faq/normalization.html

### 2.2 Project-level policy proposed for approval

- Store and emit learner-facing text in **NFC** as the canonical application form, unless a documented platform constraint requires otherwise.
- Accept canonically equivalent NFC and NFD input; normalize before equality-sensitive lookup and persistence.
- Preserve the original intended letters and diacritics. Normalization must never mean accent stripping, transliteration or conversion to ASCII.
- Do not use NFKC/NFKD as a blanket substitute for NFC/NFD in learner-text storage. Compatibility normalization has a different purpose and may erase distinctions in other character sets.
- For case-insensitive matching, apply a documented Unicode-aware case policy after canonical normalization. Do not apply Turkish-locale-specific casing that maps Hawar `I` to dotless `ı`.
- Display the stored/canonical Hawar spelling, not a stripped search key.
- Treat collation/alphabetical sorting as a separate Kurmanji orthographic product decision. Do not infer sorting behavior from Unicode code-point order.

These are recommendations, not changes already implemented.

## 3. Character identity test fixtures

The expected code points for the five Hawar letters are:

| Letter | Uppercase code point | Lowercase code point | Canonical decomposition |
|---|---|---|---|
| Ç / ç | U+00C7 | U+00E7 | C/c + U+0327 COMBINING CEDILLA |
| Ê / ê | U+00CA | U+00EA | E/e + U+0302 COMBINING CIRCUMFLEX ACCENT |
| Î / î | U+00CE | U+00EE | I/i + U+0302 COMBINING CIRCUMFLEX ACCENT |
| Ş / ş | U+015E | U+015F | S/s + U+0327 COMBINING CEDILLA |
| Û / û | U+00DB | U+00FB | U/u + U+0302 COMBINING CIRCUMFLEX ACCENT |

The exact NFC/NFD equivalence pairs should be asserted by a Unicode-conformant library, not by visual inspection alone.

### 3.1 Confusable and near-neighbour cases

Include explicit negative tests so that similar-looking or related characters are not silently merged:

- `I` (U+0049) versus `i` (U+0069);
- `Î` (U+00CE) versus `I`;
- `î` (U+00EE) versus `i`;
- `S` versus `Ş`; `s` versus `ş`;
- `C` versus `Ç`; `c` versus `ç`;
- `E` versus `Ê`; `e` versus `ê`;
- `U` versus `Û`; `u` versus `û`;
- Turkish dotless `ı` (U+0131) and dotted capital `İ` (U+0130), which must not be substituted for Hawar `I/i` by locale-sensitive casing;
- a plain ASCII transliteration such as `s` for `ş` must not be treated as an exact orthographic match.

## 4. Acceptance test matrix

| ID | Area | Test action | Expected result | Evidence to retain |
|---|---|---|---|---|
| U01 | Character identity | Inspect each of the ten uppercase/lowercase characters by code point | Exact code points in §3; no replacement glyph or mojibake | Code-point dump |
| U02 | NFC input | Enter each letter in precomposed form | Character accepted and stored/displayed correctly | Input/output capture |
| U03 | NFD input | Enter base letter + combining mark for each of the ten forms | Accepted as canonically equivalent; no mark loss | Input/output code points |
| U04 | Normalization | Normalize each NFC/NFD pair to NFC and compare | Pair resolves to identical NFC sequence | Automated assertion log |
| U05 | Idempotence | Apply NFC twice to every fixture | Second application makes no change | Automated assertion log |
| U06 | Preservation | Normalize complete Kurmanji words and paragraphs containing all five letters | No diacritic removed, substituted or reordered incorrectly | Before/after fixture diff |
| U07 | Case | Test uppercase/lowercase pairs, including `I/i` and `Î/î` | Case handling follows approved Hawar mapping; no Turkish-locale dotless-I substitution | Locale and test log |
| U08 | Typing | Type all five letters on each supported OS, browser and keyboard layout | Every required letter is reachable or documented input method works | Device/layout matrix |
| U09 | Copy/paste | Copy from reference text, paste into editor, form, chat and lesson preview | Exact spelling preserved; no mojibake or lost combining mark | Per-surface capture |
| U10 | Rendering | Display letters in every supported font, size and responsive layout | Correct glyph, diacritic placement, no clipping or fallback inconsistency | Screenshot set |
| U11 | Editing | Move cursor, select, delete and replace a decomposed letter | Combining sequence behaves as one user-perceived character where expected; no orphan mark | Manual test notes |
| U12 | Persistence | Save and retrieve a fixture through the actual application storage path | Retrieved text is valid UTF-8 and canonical form matches policy | Round-trip output |
| U13 | Search | Search an NFC-stored term using NFC and NFD query forms | Canonically equivalent queries return the same intended result | Query/result log |
| U14 | Exact distinction | Search for `s` and `ş`, `i` and `î`, etc. | Exact orthographic distinctions remain distinguishable; no accidental accent folding | Positive/negative search log |
| U15 | Case-insensitive search | Search uppercase against lowercase forms | Approved Unicode case-insensitive behavior works without changing stored spelling | Search matrix |
| U16 | Sorting | Sort all 31 letters using the product's approved Kurmanji collation | Matches an owner-approved alphabet order; no reliance on raw code-point order | Collation fixture and expected order |
| U17 | Import/export | Export and re-import lesson text and CSV/JSON/backup artifacts, where supported | Exact spelling survives both directions | Artifact hash and text diff |
| U18 | API boundary | Send/receive strings through every API boundary used by the app | UTF-8 and normalization policy preserved end-to-end | Request/response fixture |
| U19 | Validation | Submit malformed UTF-8 or isolated combining marks where the interface permits | Safely reject or handle according to documented validation; never silently corrupt valid text | Error/validation log |
| U20 | Regression | Run all fixtures after dependency, database, font or browser changes | No previously passing character test regresses | Versioned test report |

## 5. Test data set

Create a small, version-controlled fixture set only after owner approval. It should contain:

1. All 31 letters in the adopted sequence, uppercase and lowercase.
2. The ten precomposed diacritic forms listed in §3.
3. Their canonically decomposed equivalents.
4. Minimal negative fixtures contrasting plain and diacritic forms.
5. Short, linguistically reviewed Kurmanji words containing each target letter.
6. A paragraph with mixed uppercase/lowercase and all five diacritics.
7. A deliberately mixed NFC/NFD fixture to test ingestion and normalization.

Do not invent lexical examples for the test corpus. Select words from already approved course material or obtain them from a proficient Kurmanji editor, with provenance recorded. Technical fixtures may use isolated letters and Unicode code points without making lexical claims.

## 6. Environment and evidence record

For each run, record:

| Field | Required value |
|---|---|
| Test run ID / date | Pending |
| Application commit | Pending |
| Branch / environment | Pending |
| OS and version | Pending |
| Browser and version | Pending |
| Keyboard layout / input method | Pending |
| Font family and version | Pending |
| Runtime / language version | Pending |
| Database and encoding | Pending |
| Unicode library and version | Pending |
| Locale settings | Pending |
| Tester | Pending |
| Result | Not run |

A test report must distinguish **PASS**, **FAIL**, **BLOCKED** and **NOT RUN**. A test without reproducible evidence is not a pass.

## 7. Failure severity and release gate

### P0 — release blocker
- Any of the five letters is lost, replaced or corrupted during save/retrieve.
- NFC/NFD-equivalent input fails equality-sensitive search or lookup.
- `I/i` and `Î/î`, or plain and diacritic letters, are incorrectly merged in exact orthographic content.
- Any supported platform cannot display a required letter.

### P1 — must resolve before broad learner rollout
- Required letters cannot be typed through the documented learner workflow.
- Search, export/import, cursor editing or sorting behaves inconsistently with the approved policy.
- A font or responsive layout clips or obscures a diacritic.

### P2 — document and schedule
- Unsupported keyboard layouts or browsers have not been tested but are outside the declared support matrix.
- Non-blocking visual differences that preserve the correct character identity.

**Release gate:** all P0 tests must pass; P1 tests must pass for every platform declared supported or have an explicit owner-approved limitation. The reference variety, orthographic house style and collation order remain owner decisions.

## 8. Ownership and authorization

- **Project owner:** approve the normalization policy, supported platforms, test scope and collation order.
- **Kurmanji editor:** approve the lexical fixture words and orthographic spellings.
- **Technical reviewer:** execute tests and attach reproducible logs/screenshots.
- **Maintainer:** only after explicit authorization, implement any required fixes on the isolated work branch and add automated regression tests.

This document does not authorize code changes, schema changes, migrations, CI modifications, production tests or edits to lesson payloads.

## 9. Status

**SPECIFICATION COMPLETE — TESTS NOT RUN — PROPOSAL ONLY.** No source code, existing 38-lesson payload, seed SQL, migration, database, CI, runtime, `main`, PR #3 or deployment was changed.

## 10. References

- Unicode Consortium. **Unicode Standard Annex #15: Unicode Normalization Forms**, Version 58, 2026-08-12. https://www.unicode.org/reports/tr15/
- Unicode Consortium. **FAQ — Normalization**. https://www.unicode.org/faq/normalization.html
- Unicode Consortium. **Character Encoding Stability Policy**. https://unicode.org/policies/stability_policy.html
