# Course 2 — Integrated Revision Blueprint and Acceptance Criteria
Date: 2026-11-23
Status: Planning document only; no lesson-content changes authorized or performed.

## 1. Purpose
This blueprint brings together the existing instructional audits, terminology audit, source reviews and the newly completed Lesson 3–8 and Lesson 10–11 focused reviews. It translates findings into an ordered, testable revision plan for the 12-lesson Standard Kurmanjî morphology course.

It does not replace the source audit documents. It is not permission to edit lesson HTML, SQL seed payloads, application code, database records, migrations, Supabase, the main branch or production.

## 2. Evidence set and status
The plan is grounded in:
- Lesson 01 and 02 instructional audits.
- Lesson 03–06 ezafe/case source audit.
- Lesson 07–08 case/agreement source audit.
- Lesson 09 tense/aspect audit.
- Lesson 10 negation/question source review and the joint Lessons 10–11 source audit.
- Lesson 11 example (32) correction note, which relocates `Wî mirov-î çay anî` to Haig §2.7.2, not §2.7.1.
- Lesson 12 final-review audit.
- Consolidated lesson matrix and course terminology audit.

The earlier consolidated matrix described Lesson 11 as a limited content review because a standalone audit note was not then recoverable. That status is superseded by the subsequent Lesson 10–11 source audit and the separate Lesson 11 example (32) correction note.

## 3. Non-negotiable editorial rules
1. Preserve all Kurmanji Latin forms exactly as they appear in the verified source until a specific source-backed correction is approved.
2. Keep the course scope explicitly Standard Kurmanjî; mark dialect variation where the sources identify it.
3. Do not infer grammatical function from a matching letter sequence alone. Analyze morphology in its full construction and context.
4. Keep these concepts distinct:
   - root = `ڕەگ`;
   - base = `بنەڕەت`;
   - stem = terminology not yet agreed; do not silently substitute it for root or base;
   - morpheme = `مۆرفیم` (distinguish from the discipline `مۆرفۆلۆجی`);
   - ezafe = `ئەزافە`;
   - direct/oblique case = `حاڵەتی ڕاستەوخۆ / ناڕاستەوخۆ`.
5. Use `بڕگە` for syllable where needed; do not replace it with هجا.
6. Use `سەبز` if a color term is required in Sorani copy.
7. Do not add invented examples, paradigms, answer keys or rules. Every new Kurmanji form requires an identified source and a checked gloss.
8. Each lesson should contain at least one worked example, a short applied task, and a clear expected answer or assessment criterion where the lesson objective requires application.

## 4. Priority-ordered revision plan

### P0 — Resolve editorial decisions before editing
These are blocking decisions because different choices produce different lesson designs:
- Agree one Sorani term and definition for “stem”; preserve `ڕەگ` and `بنەڕەت` as distinct concepts.
- Decide whether Lesson 6 remains titled “خاوەنداری و جێناوە خاوەندارییەکان” and receives a verified possessive paradigm, or is retitled to match its actual focus on ezafe possession and reflexive `xwe`.
- Decide whether Lesson 12 remains a recap lesson or becomes a scored final assessment. If it becomes an exam, define duration, points, pass threshold, rubric and answer key.
- Confirm the exact editorial interpretation intended by the ambiguous Lesson 10 heading `نەفیی ڕستەی ناوەکی`; do not replace it based on guesswork.
- Confirm whether the Lesson 10 yes/no question section will teach the `ma` particle alongside intonation, with an explicitly Standard Kurmanjî source policy.

### P1 — Correct high-impact teaching ambiguity
1. Lessons 4–5: place `gund-ek-î` / `jin-ek-ê` next to `bajar-ek-î mezin`, segment each morpheme, and label case versus ezafe separately. Explain that the same surface `-î` can have different grammatical functions in different constructions.
2. Lessons 7–8: teach a three-way contrast:
   - present transitive: direct-case subject;
   - simple past intransitive: direct-case subject;
   - simple past transitive: oblique subject and direct object, with verb agreement as described by Haig.
   Use a complete source-verified example with an overt object; `min xwar` alone does not display one.
3. Lesson 11: separate neutral SOVG word order (§2.7.1) from past-transitive ergative alignment (§2.7.2, example 32). Keep `Wî mirov-î çay anî` attributed to example (32) in §2.7.2.
4. Lesson 10: separate verified negation patterns from interrogative claims that still need a dedicated Standard Kurmanjî source.

### P2 — Strengthen learning design
- Lesson 1: add one worked segmentation distinguishing a free word from a bound morpheme; retain `-ek` as a preview only.
- Lesson 2: use a consistent example to distinguish root, base and (once agreed) stem; do not force unsupported segmentation.
- Lesson 3: add source-checked masculine/feminine and number examples, explicitly showing that ezafe agrees with the head noun.
- Lesson 5: pair the adjective example with a verified possessor construction; distinguish head noun, ezafe and possessor.
- Lesson 6: explain `xwe` only within its verified same-clause coreference scope; contrast with an external possessor only using source-verified material.
- Lesson 8–9: add a compact tense/aspect contrast and keep tense distinct from aspect; do not extrapolate from one verb.
- Lesson 11: add a parsed phrase/constituent example and explain pragmatic fronting without implying free word order.
- Lesson 12: align questions with the course's actual learning outcomes and include scoring/feedback only after the assessment decision.

### P3 — Course-wide polish and validation
- Apply the approved terminology register consistently to titles, body copy, questions and model answers.
- Ensure every example has a source or an explicit “course-generated” label approved by the user; no generated Kurmanji examples are to be introduced in this audit phase.
- Check that each question assesses something taught in the lesson.
- Provide an answer key or marking criteria for applied questions.
- Check lesson navigation and course sequence without changing application behavior as part of this documentation-only phase.

## 5. Lesson-by-lesson acceptance criteria

| Lesson | Must be true before approval |
|---|---|
| 01 | At least one fully worked word/morpheme segmentation; root and morpheme terminology stable. |
| 02 | Root and base distinguished; stem term resolved before use; segmentation source-checked. |
| 03 | Gender/number examples are sourced; ezafe agreement is explicitly with the head noun. |
| 04 | Indefiniteness `-ek`, oblique endings and ezafe are not conflated; both forms are segmented. |
| 05 | Adjective and possessor ezafe patterns are separately demonstrated; `-î` is analyzed in context. |
| 06 | Title matches scope or a sourced paradigm is added; `xwe` remains correctly scoped. |
| 07 | Direct/oblique pronoun paradigm is legible; grammatical role is distinguished from case. |
| 08 | Present transitive, past intransitive and past transitive contrasts are all shown; object case/agreement uses an overt, verified object. |
| 09 | Tense and aspect are distinguished; all translations and forms remain source-verified. |
| 10 | Negation claims remain qualified; question construction is sourced; ambiguous heading is resolved by author. |
| 11 | SOVG and ergative alignment are separate learning points; example (32) cited to §2.7.2. |
| 12 | Recap vs exam decision made; assessment format, scoring and answer guidance are explicit if assessed. |

## 6. Recommended implementation sequence
1. Obtain decisions on the P0 items.
2. Approve the shared terminology register.
3. Revise Lessons 4–5 together (morphological ambiguity), then Lessons 7–8 together (case/agreement).
4. Revise Lessons 10–11 together (negation, questions and syntax) while preserving the distinction between their source sections.
5. Revise Lessons 1–3 and 6 to align definitions and nominal morphology.
6. Revise Lessons 9 and 12 after tense/aspect and assessment decisions.
7. Run a final course-wide linguistic/source review and a separate instructional/UX review.
8. Only after explicit approval, prepare content edits on a non-main branch with verified before/after backups and inspectable diffs.

## 7. Current release-readiness assessment
The course has a usable 12-lesson topic sequence and several claims already supported by Haig (2018), but it is **not yet ready for a final instructional sign-off**. The principal blockers are unresolved terminology and editorial decisions, insufficient worked examples and applied answer guidance, the Lesson 10 question-source gap, and the need to teach case/ezafe distinctions through complete constructions.

This is a quality assessment of the reviewed lesson content, not a claim that the course runtime or application has been tested.

## 8. Change boundary
This blueprint is documentation only. It does not change lesson HTML, seed SQL, app code, database content, migrations, Supabase, the main branch, deployment or production. All original Kurmanji source forms remain untouched.
