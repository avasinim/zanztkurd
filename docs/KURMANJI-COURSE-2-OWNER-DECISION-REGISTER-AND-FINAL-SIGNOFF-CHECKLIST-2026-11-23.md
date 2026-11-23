# Course 2 — Owner Decision Register and Final Sign-off Checklist

**Date:** 2026-11-23  
**Status:** Editorial decisions pending; Course 2 is **not ready for final instructional sign-off**.  
**Scope:** Documentation-only decision register for the 12-lesson Standard Kurmanjî morphology course.

This register consolidates the remaining editorial decisions and records verified implementation. On 2026-11-23, the owner explicitly directed that completed work be activated without waiting for further approval. That instruction authorized the Lesson 11 correction and associated test/production data updates recorded below. It does not authorize rewriting historical migrations or unrelated destructive/schema changes.

## 1. Decision protocol

For every item below, the owner/editor should record one of: **Approve**, **Revise**, **Defer**, or **Reject**, with the exact approved wording or scope where applicable. A source finding can be closed while its learner-facing wording remains open. Do not infer approval from silence.

**Implementation status and boundaries:**
- The Lesson 11 correction was implemented under the owner's explicit 2026-11-23 instruction, using a separate forward migration and coordinated seed update.
- The historical migration `supabase/migrations/20261024122051_add_kurmanji_courses_and_protected_lessons.sql` remains unchanged.
- The test and production Course 2 lesson payloads are now identical across all 12 lesson keys.
- The remaining owner decisions below concern course-wide editorial scope and final instructional sign-off; they do not block the already completed Lesson 11 source correction.

## 2. Critical owner decisions

| ID | Decision required | Evidence / current position | Owner action |
|---|---|---|---|
| D01 | **Resolved — Standard Kurmanjî source boundary** | The course follows Haig (2018), “Northern Kurdish (Kurmanjî),” as its primary grammatical description and the Standard Kurmanjî variety represented there. Regional variants are not generalized into course rules; any future regional note must be explicitly sourced and labelled. | Apply this source boundary to all 12 lessons; retain the source-attested Kurmanjî forms and mark dialect-sensitive evidence separately. |
| D02 | Approve the core morphology terminology | The working register distinguishes root (`ڕەگ`) from base (`بنەڕەت`); “stem” and several technical Sorani equivalents remain provisional. | Approve exact terms and definitions for root, base, stem, morpheme, inflection, derivation, syncretism, gender, number, transitivity, tense, aspect, and ergative alignment. |
| D03 | **Resolved — clarify non-verbal predicate negation** | The intended topic is negation of non-verbal predicates, distinct from verbal negation. Haig (2018) reports source-attested examples `az nî birçî ma` and `az nê birçî ma` (citing Kömür 2003:19) and notes the ezafe/negation interaction. | Section 2 is now titled `نەفیی پێکهاتەی ناوەکرداری`; both source forms are included exactly as cited and explicitly labelled as source transcription, not generalized to every dialect. |
| D04 | **Resolved — narrow Lesson 6 title and scope** | The lesson's actual sourced content is ezafe possession (`mal-a me`) and reflexive `xwe`; it does not teach a complete possessive-pronoun paradigm. | The title now names ezafe possession and reflexive `xwe`. The second section explicitly states that a full person/number paradigm is not taught here; no unsupported paradigm was added. |
| D05 | **Resolved — Lesson 11 source correction** | The seed was corrected to teach neutral SOVG in §2.7.1 and identify `Wî mirov-î çay anî` as example (32) in §2.7.2, illustrating past-transitive ergative alignment. The separate forward migration and seed update were merged to `main`; the migration was applied to test and production. Both database rows now contain the corrected explanation. See [Haig (2018), pp. 130–131, §§2.7.1–2.7.2](https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf#page=25). | Implemented and verified in both databases. Historical migration remains unchanged. Browser-rendered learner output still needs live end-to-end verification. |
| D07 | **Resolved — classify Lesson 12 as an unscored final review** | The lesson summarizes Lessons 1–11, contains cumulative reflection and an open-ended analysis exercise, and has no timer, points, weighting, rubric, pass threshold, or formal answer key. | Title and method note now explicitly identify a final review/self-assessment, not a formal scored exam. No scoring system or pass/fail rule has been invented. |
| D06 | **Resolved — standardize Lesson 9 aspect terminology and future gloss** | Haig Table 14 supports the simple past vs. past imperfective contrasts (`ez hatim` / `ez dihatim`; `min xwar` / `min dixwar`). Haig §2.6.4, p.129, example (27), supports `ew dē mesel-ē ji te re bēž-e`. | Use `ڕوانگەی کردار` for aspect and `ناتەواو` for imperfective. Sorani gloss now explicitly marks the future meaning: «ئەو لە داهاتوودا کێشەکە بۆ تۆ دەڵێت». Preserve the source-attested Kurmanjî form exactly. |
| D08 | **Deferred — no interrogative-particle inventory in this course release** | `ma`, `gelo`, and `ka` have context- and variety-sensitive behaviour; the available Yücel evidence concerns Muş Kurmanji and is not a sufficient basis for a universal Standard Kurmanjî lesson. | Keep these particles out of the current learner-facing rule set. The existing generic distinction between yes/no and information questions remains; a sourced, variety-labelled particle lesson is future work. |
| D09 | **Resolved — formative, unscored checks only** | The current 12-lesson release contains practice and review questions but no approved exam blueprint, marks, rubric, timing, or pass threshold. | Treat all current lesson checks as formative/self-assessment, not graded tests. Lesson 12 remains an unscored final review. Any future scored assessment requires a separate approved blueprint before implementation. |

## 3. Lesson-by-lesson editorial decisions

These are not claims that every lesson is linguistically wrong. They identify the minimum owner/editor decision or teaching gap recorded in the audits.

| Lesson | Current evidence-based gap | Required decision / acceptance condition |
|---|---|---|
| 01 | No worked segmentation, free/bound morpheme contrast, or model answer. | Approve a source-checked worked example and model analysis, or explicitly retain a narrower introductory objective. |
| 02 | Title promises prefix coverage, but no source-verified Kurmanjî prefix example is present. | Supply/approve a source-attested prefix example or narrow the title and objective. |
| 03 | No concrete sourced gender/number paradigm and sufficiently explained ezafe example. | Approve a variety-appropriate paradigm and a worked example with segmentation. |
| 04 | Learner may confuse oblique case and ezafe; `-ek-î` has different functions in different contexts. | Approve explicit contrast: in `gund-ek-î`, indefinite suffix + oblique case; in `bajar-ek-î mezin`, the final `-î` is ezafe. Require full phrase analysis. |
| 05 | `bajar-ek-î mezin` is not accompanied by a full segmentation/possessor phrase model. | Approve a complete phrase analysis and a source-verified possessor construction, or keep scope limited. |
| 06 | Current `mal-a me` and `xwe` examples do not establish a full possessive-pronoun paradigm. | Resolve D04; do not reconstruct a paradigm from isolated examples. |
| 07 | Direct/oblique pronouns need a complete worked example; `ew` form syncretism and case cannot be reduced to a fixed subject/object mapping. | Approve a sourced paradigm and contextual analysis with the relevant tense/transitivity qualifications. |
| 08 | Verb-root discussion lacks a worked segmentation/paradigm; `min xwar` alone is not a transparent overt-object illustration. | Approve a source-attested, fully parsed example or narrow the objective. |
| 09 | Simple past vs past imperfective needs explicit distinction; present `di-` must not be generalized as identical in every tense. Future gloss and aspect label remain open. | Resolve D06; retain exact source forms and explain the contrast with source scope. |
| 10 | Negation forms `na-`, `ne-`, lexical `ni-` are not interchangeable; heading and question inventory remain open. | Resolve D03 and D08; add no unsourced full clause or universal question rule. |
| 11 | Critical source-attribution and grammatical-framing defect; no clean worked neutral SOVG example has yet been verified for this lesson. | Resolve D05. Teach SOVG notation accurately; do not repurpose the ergative example as SOVG. |
| 12 | Current task is review/knowledge check, not a fully specified scored exam; it asks about topics whose Lesson 10 scope remains open. | Resolve D07 and D09; align all tasks with approved taught content and publish model answers/marking criteria. |

## 4. Source findings already verified (not owner decisions)

The following are evidence findings from the cited source reviews. They can be treated as closed at the level of source interpretation, while learner-facing wording and implementation remain subject to approval.

1. **Noun case and indefiniteness:** Haig and Öpengin's Standard Kurmanjî Table 7 distinguishes masculine and feminine singular direct/oblique forms, including `gund`, `gund-î`, `gund-ek`, `gund-ek-î`, `jin`, `jin-ê`, `jin-ek`, and `jin-ek-ê`. Oblique marking has stated syntactic functions and must not be equated with a single semantic role.
2. **Ezafe:** `bajar-ek-î mezin` is a sourced example in which the final `-î` is ezafe; do not analyse it as the same function as the oblique `-î` in `gund-ek-î`. In `mal-a me`, `-a` is feminine ezafe and `me` is the oblique first-person plural possessor.
3. **Reflexive:** `xwe` is used for same-clause subject coreference in the reviewed source analysis; do not infer a complete possessive paradigm from this fact.
4. **Tense/aspect examples:** Haig Table 14 supports the reviewed contrasts `ez hatim` / `ez dihatim` and `min xwar` / `min dixwar`. Distinguish simple past from past imperfective; do not turn these examples into exceptionless rules beyond their source context.
5. **Future example:** Haig §2.6.4 p.129 example (27), `ew dē mesel-ē ji te re bēž-e`, is source-attested as a future construction.
6. **Word order:** Haig §2.7.1 uses **SOVG**, with G = Goal (including relevant spatial goals, recipients, and addressees); word order is not rigidly fixed. §2.7.2 separately discusses past-transitive ergative alignment. `Wî mirov-î çay anî` is example (32) under §2.7.2, not a neutral SOV/SOVG example under §2.7.1.
7. **Dialect caution:** The question-particle discussion based on Yücel's thesis is tied to Muş Kurmanji evidence. It must not be promoted to an unrestricted Standard Kurmanjî rule without additional evidence.

## 5. Critical Lesson 11 defect — corrected and deployed

**Status: Resolved in source, seed, test and production.**

Haig (2018) §2.7.1 describes neutral SOVG (Subject–Object–Goal), with variation in Goal placement and pragmatic fronting. Example (32), `Wî mirov-î çay anî`, appears in §2.7.2 and illustrates past-transitive ergative alignment (oblique subject, direct object).

**Implemented on 2026-11-23:**
1. Corrected the Part 05 seed payload without changing the historical migration.
2. Added a separate forward migration: `supabase/migrations/20261123120000_correct_kurmanji_course2_lesson11_word_order.sql`.
3. Updated the static Lesson 11 page summary to SOVG.
4. Applied the forward migration to test project `zanztkurd-kurmanji-test` (`juwsjljbdwyncicybwoq`) and production project `zanztkurd` (`hjpmorabqdhuchpnowiw`).
5. Queried both databases after application: Lesson 11 contains SOVG, cites §2.7.2 and example (32), and no longer contains the incorrect §2.7.1 attribution.
6. Rechecked all 12 Course 2 rows in both databases. Every corresponding `content_html` has the same MD5 hash across test and production.

**Navigation/source checks:** all 12 lesson shell files and the course overview exist in `main`; each lesson shell has its matching `data-lesson-key`, previous/next links, and a link back to the course plan. `script.js` maps the 12 lesson paths to `kurmanji-course-2` and loads `content_html` from `lesson_content` at runtime.

**Still unverified:** the live GitHub Pages page could not be fetched through the available browser verification path, so a real browser render and a learner login/progress/completion end-to-end test are not claimed. The database and source checks are verified; visual/runtime behavior is not yet independently confirmed.

## 6. Final sign-off checklist

- [x] D01 course variety fixed as the Standard Kurmanjî description in Haig (2018); regional variants must be sourced and labelled.
- [ ] D02 terminology sheet approved and applied consistently.
- [x] D03 Lesson 10 section clarified as non-verbal predicate negation with two source-attested forms, preserved in source transcription and bounded against dialect overgeneralization.
- [x] D04 Lesson 6 title narrowed to ezafe possession and reflexive `xwe`; scope note explicitly excludes an unprovided full possessive-pronoun paradigm.
- [x] D05 Lesson 11 source correction implemented through a separate forward migration and verified in test and production; historical migration unchanged.
- [x] D07 Lesson 12 classified and titled as an unscored final review/self-assessment; no formal exam scoring or pass threshold.
- [x] D06 Lesson 9 uses `ڕوانگەی کردار` for aspect and `ناتەواو` for imperfective; Sorani gloss explicitly marks the source-attested future meaning.
- [x] D08 interrogative particles `ma`, `gelo`, `ka` explicitly deferred from this release; no unsupported universal rule added.
- [x] D09 current checks designated formative/unscored; any future scored assessment requires a separate blueprint.
- [ ] Each lesson has a clear objective, source-scoped example, appropriate analysis, applied practice, and model answer/marking criteria (or a documented reason for omission).
- [ ] Cross-lesson terminology and Latin forms have been checked against the approved source boundary.
- [ ] All learner-facing changes have a separate review and approval record.
- [ ] Seed and migration parity is checked after any authorized change.
- [ ] Runtime, database and release tests are performed only in the authorized environment and their results are recorded.

**Sign-off rule:** Course 2 remains **not ready** until all critical decisions are resolved, the Lesson 11 defect has an approved disposition, and the lesson-by-lesson acceptance conditions are met.

## 7. Related audit and specification documents

- [Master audit synthesis and sign-off gate](KURMANJI-COURSE-2-MASTER-AUDIT-SYNTHESIS-AND-SIGNOFF-GATE-2026-11-23.md)
- [Final readiness and revision report](KURMANJI-COURSE-2-FINAL-READINESS-AND-REVISION-REPORT-2026-11-23.md)
- [Working terminology register](KURMANJI-COURSE-2-WORKING-TERMINOLOGY-REGISTER-2026-11-23.md)
- [Consolidated instructional audit matrix](KURMANJI-COURSE-2-CONSOLIDATED-INSTRUCTIONAL-AUDIT-MATRIX-2026-11-23.md)
- [Cross-specification consistency audit](KURMANJI-COURSE-2-CROSS-SPECIFICATION-CONSISTENCY-AUDIT-2026-11-23.md)
- [Lessons 01–06 seed/migration payload audit](KURMANJI-COURSE-2-LESSONS-01-06-SEED-MIGRATION-PAYLOAD-AUDIT-2026-11-23.md)
- [Lessons 07–12 seed/migration payload audit](KURMANJI-COURSE-2-LESSONS-07-12-SEED-MIGRATION-PAYLOAD-AUDIT-2026-11-23.md)
- [Lesson 09 implementation-ready editorial spec](KURMANJI-COURSE-2-LESSON-09-IMPLEMENTATION-READY-EDITORIAL-SPEC-2026-11-23.md)
- [Lessons 10–11 implementation-ready editorial spec](KURMANJI-COURSE-2-LESSONS-10-11-IMPLEMENTATION-READY-EDITORIAL-SPEC-2026-11-23.md)
- [Lesson 12 implementation-ready editorial spec](KURMANJI-COURSE-2-LESSON-12-IMPLEMENTATION-READY-EDITORIAL-SPEC-2026-11-23.md)

## 8. Change boundary and verification status

This register records completed source/seed/forward-migration work and verified test/production database content. The historical migration was not changed. The Lesson 11 shell summary was updated in `main`; all 12 Course 2 shell routes and their key/previous/next/course-plan links were checked in repository source. All 12 lesson payloads have matching MD5 hashes between test and production. A real browser-rendered GitHub Pages session, learner authentication, progression gates, and completion flow have **not** been end-to-end tested. The remaining D01–D04 and D06–D09 decisions, plus the lesson-by-lesson acceptance checklist, still prevent final course sign-off.
