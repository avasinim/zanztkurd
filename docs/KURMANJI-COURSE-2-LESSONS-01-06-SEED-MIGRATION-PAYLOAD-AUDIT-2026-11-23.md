# Course 2 — Lessons 01–06 Seed/Migration Payload Audit
Date: 2026-11-23
Status: Documentation-only audit. No learner-facing correction or release approval.

## 1. Scope and method

This audit compares the six Course 2 lesson payloads in:
- `docs/kurmanji-content-seed-part-04.sql`
- `supabase/migrations/20261024122051_add_kurmanji_courses_and_protected_lessons.sql`

Repository ref inspected: `backup/c2-course2-payload-audit-after-2026-11-23q`.

The six lesson rows were located by their exact `lesson_key`. For each row, the complete SQL value tuple was compared between the split seed and the migration. All six tuples match byte-for-byte in the extracted row comparison. This establishes seed/migration parity for Lessons 01–06 only; it does not establish linguistic correctness, runtime behavior, or the live database's current contents.

Source-file blob SHAs at inspection:
- `docs/kurmanji-content-seed-part-04.sql`: `0e4bf967e3a0f7ce2d55b53199c0b417807b4930`
- `supabase/migrations/20261024122051_add_kurmanji_courses_and_protected_lessons.sql`: `06320c50a858e41d8ce21e7b4fdee3f6ae418cd9`

## 2. Parity result

| Lesson | Seed row found | Migration row found | Exact row match |
|---|---:|---:|---:|
| 01 | Yes | Yes | Yes |
| 02 | Yes | Yes | Yes |
| 03 | Yes | Yes | Yes |
| 04 | Yes | Yes | Yes |
| 05 | Yes | Yes | Yes |
| 06 | Yes | Yes | Yes |

No seed or migration row was changed by this audit.

## 3. Lesson-by-lesson editorial and source-control findings

### Lesson 01 — مۆرفۆلۆجی و پێکهاتەی وشە

**Observed payload:** Defines word and morpheme, distinguishes the field from the unit, and previews `-ek` as a suffix indicating singular indefiniteness. It cautions against treating every sound segment as a morpheme.

**Gap:** The lesson has no worked segmentation and does not explicitly contrast a free morpheme with a bound morpheme. The `-ek` preview is not segmented against a complete noun form. The learner is asked to explain the word/morpheme distinction without a model analysis.

**Editorial action:** Add a fully sourced, simple segmentation and one free/bound contrast; include a model answer. Do not label a root, base or stem in an example until the course terminology decision is approved. The existing mention of `-ek` can remain a preview, but should not be treated as a full analysis.

### Lesson 02 — ڕەگ، پێشگر و پاشگر

**Observed payload:** Separates root and base conceptually and defines prefix/suffix by position. It uses `-ek` as the suffix example but provides no Kurmanjî prefix example.

**Gap:** The title promises both prefix and suffix, while the only concrete Kurmanjî example is a suffix. The lesson correctly warns against inventing affixes, but learners are not shown a verified prefix form. The term “base” is used descriptively while the course-wide “stem” decision remains open.

**Editorial action:** Either add a current Standard Kurmanjî prefix example with a precise source and segmentation, or narrow the lesson title/objective to the evidence actually taught. Keep `ڕەگ` and `بنەڕەت` distinct; do not promote provisional “stem” terminology to approved status.

### Lesson 03 — ناو، ڕەگەزی ڕێزمانی و ژمارە

**Observed payload:** Explains grammatical gender and number in general terms and says ezafe forms reflect the gender and number of the head noun.

**Gap:** There is no concrete masculine/feminine noun pair, no singular/plural paradigm, and no fully shown ezafe pair. The learner is asked about the relationship between gender, number and ezafe without a worked form. A broad statement about plural forms is avoided, appropriately, but the lesson therefore remains conceptual rather than demonstrative.

**Editorial action:** Use only source-attested Standard Kurmanjî forms. The already verified Haig Table 7 singular pair `gund` / `jin` and their oblique forms may support a gender/case contrast; ezafe agreement needs a separate complete source-attested phrase. Do not invent plural forms or imply that all plural gender distinctions remain overt.

### Lesson 04 — ناوی دیار و نادیار؛ پاشگری -ek

**Observed payload:** Explains `-ek`, the context-dependence of bare nouns, and distinguishes `gund-ek-î` / `jin-ek-ê` as indefinite oblique forms from `bajar-ek-î mezin`, where `-î` is ezafe.

**Strength:** This is a valuable distinction and the payload explicitly warns that similar surface endings can have different grammatical functions.

**Remaining gap:** The forms are not fully segmented in a learner-facing paradigm, and the learner does not practise identifying each morpheme in context.

**Editorial action:** Preserve the distinction. Add a compact, source-backed segmentation and contrastive exercise; do not simplify the forms into one universal suffix rule.

### Lesson 05 — ئەزافە و پەیوەندیی ناو و هاوەڵناو

**Observed payload:** Uses Haig (2018) `bajar-ek-î mezin` and correctly identifies `-ek` as indefiniteness, `-î` as masculine ezafe, and `mezin` as the adjective. It also notes the possessor's oblique form.

**Gap:** The lesson does not provide a complete worked segmentation of the phrase, nor a complete possessor phrase to demonstrate the separate possessor construction. The general description of noun-phrase ordering is cautious but abstract.

**Editorial action:** Keep the attested Haig example and add the full segmentation. If teaching possession in this lesson, include a separate source-attested possessor phrase and explicitly distinguish it from the adjective construction. Do not infer that the adjective controls ezafe agreement.

### Lesson 06 — خاوەنداری و جێناوە خاوەندارییەکان

**Observed payload:** Explains `mal-a me` (“our house”) and `Ez li mal-a xwe me`; distinguishes the ezafe marker from the oblique possessor and introduces reflexive `xwe`.

**Gap:** The title promises possessive pronouns in the plural, but the body does not provide a person/number possessive paradigm. The two examples support a narrower lesson on ezafe possession and reflexive `xwe`, not a complete lesson on possessive pronouns. The scope decision D04 remains open.

**Editorial action:** Obtain the owner's D04 choice: (A) narrow the title and scope to ezafe possession plus reflexive `xwe`; or (B) expand with a complete, source-verified Standard Kurmanjî possessive paradigm. Do not fabricate missing paradigm cells.

## 4. Cross-lesson controls

1. Seed/migration parity is confirmed for Lessons 01–06, but content correctness remains a separate gate.
2. Keep `ڕەگ` and `بنەڕەت` distinct; “stem” remains provisional pending D02.
3. Distinguish suffix `-ek), oblique case endings and ezafe markers; identical-looking sequences do not guarantee identical function.
4. Do not teach a prefix inventory without a current Standard Kurmanjî source.
5. Teach gender, number and ezafe through complete sourced forms; avoid unsupported plural paradigms.
6. Keep direct/oblique case distinct from grammatical role.
7. Use `بڕگە` for syllable and `سەبز` for the color term where relevant.
8. Do not mix dialect forms or silently normalize source spellings.

## 5. Decision gates and implementation boundary

- D01–D03 remain course-wide owner/editor decisions.
- D04 remains open for Lesson 06 scope.
- The lesson-specific editorial specifications remain planning documents, not approval to edit learner-facing payloads.
- Any future seed correction must be coordinated with a new forward migration if a production correction is separately authorized. Do not rewrite the historical migration.
- Before implementation, require explicit approval naming the exact lesson scope and target branch; then perform SQL validation, seed/migration parity checks and appropriate tests.
- No live production database query was made during this audit. The migration header's historical “applied” comment is repository text, not proof of the current database state.

## 6. Conclusion

Lessons 01–06 are exactly synchronized between the split seed and the historical migration, but the instructional content is not yet ready for final sign-off. The main gaps are insufficient worked morphology in Lessons 01–03, the missing verified prefix example or narrower scope in Lesson 02, the need for segmentation and complete phrases in Lessons 04–05, and the title/content mismatch in Lesson 06. These findings are documentation-only; no learner content, SQL, migration, application code, database, Supabase, `main), deployment or production data was changed.
