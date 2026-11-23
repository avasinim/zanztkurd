# Course 2 — Lesson 06: Instructional Audit (2026-11-23)

## Scope
Reviewed the exact Course 2 Lesson 06 entry `kurmanji-course-2-lesson-06.html` in `docs/kurmanji-content-seed-part-04.sql`. This is a structural and pedagogical review, not a full independent validation of every Kurmanji grammar claim or dialect distinction.

## Current lesson content (verified)
- **Possession via ezafe:** `mal-a me` (‘our house’), attributed to Haig (2018), §2.3.1, example (5). The lesson identifies `-a` as the ezafe linker and `me` as the oblique form of the independent pronoun `em`, used here as possessor.
- **Possessive pronouns:** states that forms vary by person and number and distinguishes independent personal pronouns, possessive forms, and clause-internal pronouns.
- **Reflexive `xwe`:** describes `xwe` as invariant for person/number and gives `Ez li mal-a xwe me.` (‘I am at my own home’). It contrasts subject-coreferential `xwe` with `min` in this example.
- Includes a method note locating the examples in Haig (2018), and a dialect caution; review questions and references follow.

## Strengths
- The lesson uses a concrete, source-located possessive phrase rather than relying only on a general rule.
- It correctly foregrounds the distinction between the ezafe linker and the possessor form in the example.
- It introduces reflexive `xwe` separately from ordinary personal-pronoun forms.
- The method note cautions that dialectal variation must be treated separately.

## Gaps / points requiring care
- **No paradigm:** the section on possessive pronouns gives no person/number table or sourced set of forms, so the stated variation is not teachable or reviewable yet.
- **No segmentation/gloss:** `mal-a me` is not broken down visually into head noun, ezafe linker, and oblique possessor; the learner must infer the structure from prose.
- **Reflexive example is under-analysed:** `Ez li mal-a xwe me` is translated, but the lesson does not label the subject `Ez`, locative phrase, possessor, or the antecedent relation that motivates `xwe`.
- **Over-broad contrast risk:** the wording that learners should use `xwe`, not `min`, when the possessor refers back to the subject is framed around the stated Standard Kurmanji context. It should not be generalized to every clause type or dialect without a source-checked account of binding and argument structure.
- **No contrasting reference:** there is no parallel example where the possessor refers to a different person, which would help distinguish reflexive from non-reflexive reference.
- **Review questions are recall-only:** no exercise asks the learner to identify the possessor form or determine the antecedent of `xwe`; no answer key is provided.

## Conservative recommendation
Keep the current lesson content unchanged pending source verification. In a later approved revision, add (1) a segmented gloss of `mal-a me`, (2) a sourced person/number table only if the exact paradigm is confirmed for the chosen standard variety, and (3) a pair of source-checked examples contrasting subject-coreferential `xwe` with a possessor referring to another participant. State the clause/dialect scope explicitly; do not invent paradigms or broaden the `xwe` rule from the single example.

## Source inspected
`docs/kurmanji-content-seed-part-04.sql` — Course 2 Lesson 06 payload. The lesson cites Haig (2018), §2.3.1, example (5), and §2.2.3 (Pronouns), with a bibliographic entry for Thackston (2006).

## Change boundary
Documentation-only audit. No lesson HTML/SQL, seed data, application code, migrations, database, Supabase, main, or production changes.
