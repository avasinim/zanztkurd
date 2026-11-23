# Course 2 (Kurmanji morphology) — content risk register
**Date:** 2026-11-23
**Branch:** `review/c2-morph-content-risk-register-2026-11-23`
**Status:** review notes only; source verification pending.

## Scope
Read draft seed parts 04 and 05 and checked lesson wrappers 01–12. This register records topics needing source-backed review; it is not a grammar verdict. No lesson copy, SQL, database, deployment, or production changes were made.

## Risk register (candidates, not confirmed errors)
| Lesson | Review target | Why it needs careful verification | Status |
|---|---|---|---|
| 03 | Noun gender and number | Ensure terms and examples distinguish grammatical gender, number, and case rather than conflating them. | Open |
| 04 | Definite/indefinite and -ek | Verify the distribution and examples of -ek, including case endings and contextual usage. | Open |
| 05 | Ezafe | Confirm forms and example agreement against the selected Kurmanji variety and reference. | Open |
| 06 | Possessives | Check possessive forms and their interaction with direct/oblique forms. | Open |
| 07 | Direct/oblique pronouns | Check table completeness and avoid blanket statements about syntactic roles; content itself notes role depends on tense/construction. | Open |
| 08 | Verb agreement and ergativity | Verify all examples and claims against Haig (2018) Table 14; current seed includes `ez dibêjim`, `ez hatim`, `min xwar`. | Open |
| 09 | Present/past/future | Verify exact future example and source typography; current seed cites `ew dē mesel-ē ji te re bēž-e` and Haig §2.6.4. | Open |
| 10 | Negation and questions | Verify `na-` and `di-` distribution, exceptions, and examples; lesson text already warns against universalizing. | Open |
| 11 | Word order | Verify claims and examples, including information structure and transitivity limits. | Open |
| 12 | Review/final assessment | Check quiz prompts against lessons and ensure every assessed item is actually taught. | Open |

## Prior structural checks
- 12 lesson wrappers and matching keys exist.
- Course index and sequential wrapper navigation were checked; previous/next links in lessons 02–11 point to adjacent lessons.
- Seed parts 04/05 map lessons 01–06 and 07–12 respectively.

## Review protocol for next pass
1. Open the cited grammar source(s) and verify the claim—not just the bibliography URL.
2. Record source section/table/page and exact example form.
3. Classify each finding as confirmed correct, confirmed error, dialect/source mismatch, or unresolved.
4. Propose edits only for confirmed errors; keep historical migration files untouched.
5. Any database correction must remain a forward-only migration and receive separate approval before application.

## Current limitation
This pass has inspected source text in repository seeds but has not independently retrieved or checked the cited grammar references. The rows above are review targets, not claims of errors.

## Safety
No SQL was executed. No database, Supabase, main branch, deployment, or production environment was accessed or changed.
