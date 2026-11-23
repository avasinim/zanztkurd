# Course 2 — Consolidated Instructional Audit Matrix (Lessons 01–12)
Date: 2026-11-23

## Purpose and scope
This document consolidates the available lesson-level instructional audits for the 12-lesson Kurmanji morphology course. It is a planning and quality-control matrix, not a replacement for source verification and not approval to alter lesson content. Existing lesson payloads remain unchanged.

Evidence basis:
- Lesson 01–10 and Lesson 12: the corresponding audit documents and the seed payloads inspected in those audits.
- Lesson 11: the stored lesson payload in `docs/kurmanji-content-seed-part-05.sql` was inspected for this matrix. A standalone Lesson 11 audit document was not recoverable from the refs checked during this consolidation; its row is therefore marked as a limited content review, not as a newly source-verified audit.
- Lesson 10's negation claims have a source-focused review; its interrogative section remains unverified against a dedicated question-construction source.

## Consolidated matrix

| Lesson | Topic | Verified teaching asset / strength | Main instructional gap | Priority |
|---|---|---|---|---|
| 01 | مۆرفۆلۆجی و پێکهاتەی وشە | Clear initial distinction of word, morpheme, root and grammatical marker; previews `-ek` | No worked segmentation; free word vs bound morpheme contrast and model answer absent | High |
| 02 | ڕەگ، پێشگر و پاشگر | Distinguishes root from base and warns against unsupported segmentation | No sourced prefix/suffix example or worked morphological analysis; root/base terminology needs alignment | High |
| 03 | ناو، ڕەگەزی ڕێزمانی و ژمارە | Cautious statements about gender, number, and ezafe agreement; avoids natural-gender confusion | No noun pair, plural example, or ezafe agreement illustration; review is conceptual | High |
| 04 | ناوی دیار و نادیار؛ پاشگری -ek | Useful `gund/gundek` contrast and distinction between case ending and ezafe | No labeled segmentation/gloss; examples are dense; no applied practice | High |
| 05 | ئەزافە و پەیوەندیی ناو و هاوەڵناو | Source-located adjective phrase `bajar-ek-î mezin` | No parallel fully glossed possessive phrase or phrase diagram; no applied practice | High |
| 06 | خاوەنداری و جێناوی خاوەندار | Source-located `mal-a me` and reflexive `xwe` example | No possessive paradigm, segmentation, or clear antecedent analysis for `xwe` | High |
| 07 | جێناوە کەسییەکان و حاڵەت | Direct/oblique forms and cautious explanation of case/ergativity | Inline lists are hard to compare; `ew` duplication unlabeled; no fully glossed transitive/intransitive contrast | High |
| 08 | کردار، ڕەگ، کەس و ژمارە | Three source-attributed forms from Haig Table 14 | No worked verb segmentation or mini-paradigm; examples vary in multiple factors, so comparison is not controlled | High |
| 09 | کاتی ئێستا، ڕابردوو و داهاتوو | Includes present, simple/imperfective past comparisons and a cited future example | Tense/aspect distinction unexplained; no segmentation/gloss; future translation needs contextual check | High |
| 10 | ڕستەی نەفی و پرسیاری | Negation distinctions `na-`, `ne-`, lexical `ni-` forms and past examples are source-supported by Haig (2018) | Unexplained heading “نەفیی ڕستەی ناوەکی”; interrogative word order/intonation claims lack dedicated source verification | Critical |
| 11 | ڕێکخستنی وشەکان و پێکهاتەی ڕستە | Seed includes SOV as basic order and source-attributed example `Wî mirov-î çay anî`; notes information structure can alter order | No worked parsing/phrase diagram or applied practice; goal/recipient order and focus need careful source-based treatment | Medium |
| 12 | پێداچوونەوە و تاقیکردنەوەی کۆتایی | Broadly revisits morphology, noun phrase, pronouns, verbs and clauses; promotes source discipline | Title promises a final assessment but there is no scored test, rubric, timing, or answer key; task is underspecified | Critical |

## Cross-course patterns

### A. Repeated instructional gaps
1. **Worked examples are scarce.** Most lessons explain a concept but do not model the full reasoning chain: form → segmentation → grammatical function → gloss/translation → source.
2. **Review questions are mostly recall-based.** Few require learners to identify, segment, compare, or analyze a complete Kurmanji phrase or clause.
3. **Model answers are generally absent.** Learners have little guidance about what counts as a complete and evidence-based response.
4. **Terminology needs a single editorial pass.** Align root/base/stem, morpheme, ezafe, direct/oblique case, tense/aspect, transitivity, and grammatical gender across the course.
5. **Dialect/source scope must remain explicit.** Preserve cautious qualifiers and do not turn a Standard Kurmanji observation into an unrestricted Kurdish rule.

### B. Source-verification risks
- Lesson 10 question formation: obtain a dedicated source for yes/no questions, interrogative words, word order, and intonation before changing claims or adding examples.
- Lesson 11 information structure and non-basic word orders: verify each claimed movement/focus pattern against a specific source and context.
- Lesson 09 future example: verify the Sorani rendering against the exact source context; retain the Latin transcription exactly as cited.
- Any new paradigms for gender/number, possessives, pronouns, or verb inflection must be sourced for the chosen Standard Kurmanji variety and not reconstructed from a single example.

## Recommended revision order (proposed; not performed)
1. **Resolve critical editorial issues:** clarify/replace the unsupported Lesson 10 heading after editorial approval; decide whether Lesson 12 is a review lesson or a formal exam.
2. **Build a shared terminology sheet:** settle Kurdish equivalents and definitions for root/base/stem, morpheme, ezafe, case, tense/aspect, and transitivity.
3. **Add source-verified worked examples:** prioritize Lessons 01–09, using examples already cited in the seed where their exact analysis can be verified. Do not create unsourced Kurmanji forms.
4. **Add applied practice and answer guidance:** one short task and model answer per lesson, using controlled examples and transparent source notes.
5. **Re-check Lesson 11 syntax teaching:** add a parsed SOV example and source-backed note on focus/fronting only after verification.
6. **Design Lesson 12 assessment only after objectives are mapped:** if it becomes an exam, include a blueprint linked to Lessons 01–11, item types, points, rubric, time, and answer key with accepted variants.

## Suggested minimum quality standard for every lesson
- One clearly stated learning objective.
- One source-verified Kurmanji example (or an explicit explanation why no example is added).
- A gloss or translation with scope/context.
- A segmentation/analysis where relevant.
- One applied exercise beyond recall.
- A concise model answer or marking criteria.
- Explicit dialect/source scope and consistent terminology.

## Change boundary
This is a documentation-only consolidation. No lesson HTML, seed SQL, migration, application code, database, Supabase, main branch, deployment, or production data was changed. The lesson payloads remain unchanged. This matrix is not an approval to implement proposed lesson revisions.
