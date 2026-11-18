# Course 1 — integrated academic action register (26 lessons)

**Date:** 2026-11-17  
**Repository:** `avasinim/zanztkurd`  
**Working branch:** `fix/kurmanji-ci-current-migration`  
**Baseline HEAD:** `5ad041959902ab986507c760a8e5530a482f705a`  
**Pre-work backup:** `backup/c1-action-register-before-2026-11-17`  
**Status:** Proposal-only synthesis; not editorial approval, release certification, or permission to change lesson content.  
**Inventory protected:** Course 1 = 26 lessons; Course 2 = 12 lessons.
**Status synchronization:** 2026-11-18. This revision updates only C1-A02, C1-A03 and C1-A11 to reflect the verified reconciliation addendum and native-review ledger; it does not change course inventory or learner-facing content.

## 1. Purpose and governing documents

This register turns the existing Course 1 evidence reviews into a traceable, prioritized closure queue. It does not duplicate or replace the detailed lesson reports.

Governing synthesis documents:

- `docs/KURMANJI-COURSE-1-26-LESSON-INTEGRATED-EVIDENCE-CLOSURE-REPORT-2026-11-17.md`
- `docs/KURMANJI-COURSE-1-INTEGRATED-AUDIT-RECONCILIATION-ADDENDUM-2026-11-17.md`

The integrated closure report records that the 26-lesson evidence-review framework exists but is not a release certification. The later reconciliation addendum narrows several earlier claims, particularly the treatment of `r/rr`. Where a later lesson-specific audit or the reconciliation addendum is more precise, use it as the current review reference while preserving the earlier synthesis as a historical record.

## 2. Priority definitions

- **P0 — release-blocking editorial decision:** resolve before presenting a disputed rule as a universal learner-facing fact or before declaring the course editorially ready.
- **P1 — required validation/harmonization:** complete before final editorial approval; may require a qualified Kurmanji reviewer and a native Sorani copy-editor.
- **P2 — quality enhancement:** recommended for a stronger learning experience; does not justify changing existing content without approval.

No item in this register authorizes editing learner-facing lessons, seed data, code, database objects, or deployment artifacts.

## 3. Prioritized action register

| ID | Priority | Action / decision required | Scope and traceability | Evidence status and closure test |
|---|---|---|---|---|
| C1-A01 | P0 | Select and document the course's reference variety and orthographic house policy. | Lessons 1–26; five range registers listed in the closure report. | **Open.** Record the chosen reference variety, what “standard” means for this course, accepted regional alternatives, and how variants are labelled. Do not universalize one regional form without evidence. |
| C1-A02 | P0 | Preserve the reconciled distinction among `r` phonetics, occasional `rr` notation, and the 31-letter alphabet; obtain final house-style approval. | Lessons 4 and 26; `docs/KURMANJI-COURSE-1-ACTION-REGISTER-CURRENT-STATE-RECONCILIATION-ADDENDUM-2026-11-17.md` §2.2; `docs/KURMANJI-COURSE-1-R-RR-ORTHOGRAPHY-SOURCE-RECONCILIATION-2026-11-17.md`; Lesson 04 and Lesson 26 audits. | **Evidence reconciled; editorial approval open.** Haig (2018), printed p. 114, directly describes word-initial `r` as trilled and notes that trill/flap distribution elsewhere is not predictable in the described Standard Kurmanjî phonology. Thackston, “Alphabet and sounds,” reports sporadic `rr` notation (e.g. `pir/pirr`); this does not establish an obligatory, productive or universal spelling contrast. `rr` is not a 32nd letter; preserve `roj`. The exact Thackston page should be checked in the selected PDF copy because pagination differs. Closure requires owner/editor approval of wording and qualified native-editor review. |
| C1-A03 | P0 | Complete example provenance and sentence-level validation before editorial release. | Lessons 1–26; five claim-level registers; current-state reconciliation addendum §2.3; native-review ledger §§3–8; Lesson 26 audit. | **Open; mixed provenance.** One example, `Min ew dît`, is now directly verbatim-attested in Thackston, §18.2, printed p. 48, with the English gloss “I saw him”; this upgrade applies only to that item. The remaining learner-facing words, paradigms, sentences, dialogue turns, glosses and assessment prompts still require individual provenance labels and validation. Kurmanji form/context and Sorani gloss review remain separate. |
| C1-A04 | P1 | Harmonize pronouns, direct/oblique case, split alignment, and argument-role explanations. | Lessons 11, 17, 20, 23–25; especially Lesson 25 Direct/Oblique audit and Lesson 26 recap audit. | **Substantive evidence available; cross-lesson editorial harmonization open.** Keep case labels grammatical, not semantic shortcuts for subject/object. Explain present-transitive and past-transitive alignment separately; do not describe an oblique past-transitive agent as “not the subject.” Include oblique functions beyond objects and qualify dialect-sensitive morphology/agreement. |
| C1-A05 | P1 | Harmonize definiteness, indefiniteness, demonstratives, ezafe, possession, and reflexive `xwe`. | Lessons 11, 12, 21, 23, 24, 25. | **Substantive evidence available; integration open.** Keep case distinct from ezafe; demonstratives distinct from articles; explain head-noun agreement in ezafe and oblique possessor forms; teach `xwe` only in the appropriate coreference contexts. Do not infer morpheme identity from similar surface endings alone. |
| C1-A06 | P1 | Harmonize present tense, irregular stems, negation, interrogatives, and information structure. | Lessons 17–20 and Lesson 26 review. | **Substantive evidence available; example/context checks open.** Distinguish regular patterns from irregular verbs; distinguish verbal, non-verbal/existential, and imperative negation; qualify `kî/kê`, `çend/çiqas`, `ma`, and wh-in-situ; present SOV as a neutral tendency, not an invariant rule. |
| C1-A07 | P1 | Complete native Kurmanji review of examples, dialogue pragmatics, collocations, and dialect labels. | Lessons 1–26; all five range registers and lesson-specific audits. | **Open.** Review must be performed by a qualified speaker/editor of the chosen reference variety. Record reviewer, date, accepted form, alternatives, and unresolved disagreements. Source citation alone does not establish naturalness or pragmatic suitability. |
| C1-A08 | P1 | Complete native Sorani copy-edit and terminology review of explanations and glosses. | Sorani instructional text across Lessons 1–26. | **Open.** Check orthography, punctuation, fluency, consistency of grammar terminology, and learner clarity. Do not alter Kurmanji forms during Sorani copy-edit; do not run global substitutions before house style approval. |
| C1-A09 | P1 | Align Lesson 26 formative self-assessment with actual course outcomes and lesson coverage. | Lesson 26; all Lessons 1–25. | **Open.** Retain its low-stakes self-assessment status and explicit non-certification disclaimer. Build an outcome-to-task map; ensure the checklist and questions sample the skills and grammar actually taught. Do not call it a validated exam or CEFR proficiency measure. |
| C1-A10 | P2 | Add integrated communicative tasks across reading, writing, listening, and interaction. | Course closure and future learning design. | **Proposal.** Add only after outcome mapping and reviewer approval. A listening task must not create an unapproved audio dependency in the technical product. |
| C1-A11 | P2 | Complete and maintain consistent internal source locators and review metadata across the evidence corpus. | All 26 lessons; five range registers; native-review and example-provenance ledger. | **Partly implemented.** Five range registers, a native-review ledger and a provenance vocabulary are present; the ledger specifies source/page/section, claim, lesson, example provenance, variety, reviewer, decision and date. The remaining work is to apply and complete those fields for every exact learner-facing item, without implying that a reviewer has approved it. Keep learner-facing citations separate from internal editorial evidence notes. |

## 4. Traceability map

### Range-level registers

1. `docs/KURMANJI-COURSE-1-LESSONS-01-06-CLAIM-LEVEL-EVIDENCE-REGISTER-2026-11-16.md`
2. `docs/KURMANJI-COURSE-1-LESSONS-07-12-CLAIM-LEVEL-EVIDENCE-REGISTER-2026-11-16.md`
3. `docs/KURMANJI-COURSE-1-LESSONS-13-18-CLAIM-LEVEL-EVIDENCE-REGISTER-2026-11-16.md`
4. `docs/KURMANJI-COURSE-1-LESSONS-19-24-CLAIM-LEVEL-EVIDENCE-REGISTER-2026-11-16.md`
5. `docs/KURMANJI-COURSE-1-LESSONS-25-26-CLAIM-LEVEL-EVIDENCE-REGISTER-2026-11-16.md`

### Later detailed audits used for reconciliation

- Lesson 17: `docs/KURMANJI-C1-LESSON-17-PRESENT-TENSE-VERB-STEMS-AND-CLAUSE-STRUCTURE-AUDIT-2026-11-16.md`
- Lesson 18: `docs/KURMANJI-C1-LESSON-18-NEGATION-VERBAL-NONVERBAL-IMPERATIVE-AND-REGIONAL-AUDIT-2026-11-16.md`
- Lesson 19: `docs/KURMANJI-C1-LESSON-19-INTERROGATIVES-WH-CASE-QUANTIFIERS-POLAR-QUESTIONS-AUDIT-2026-11-16.md`
- Lesson 20: `docs/KURMANJI-C1-LESSON-20-WORD-ORDER-SOV-GOALS-FOCUS-AND-ALIGNMENT-AUDIT-2026-11-16.md`
- Lesson 21: `docs/KURMANJI-C1-LESSON-21-ADJECTIVES-EZAFE-GENDER-NUMBER-CASE-AUDIT-2026-11-16.md`
- Lesson 22: `docs/KURMANJI-C1-LESSON-22-COMPARATIVES-SUPERLATIVES-LEXICAL-ALTERNANTS-AUDIT-2026-11-16.md`
- Lesson 23: `docs/KURMANJI-C1-LESSON-23-DEFINITENESS-INDEFINITENESS-DEMONSTRATIVES-CASE-AUDIT-2026-11-17.md`
- Lesson 24: `docs/KURMANJI-C1-LESSON-24-POSSESSION-OBLIQUE-PRONOUNS-EZAFE-REFLEXIVES-AUDIT-2026-11-17.md`
- Lesson 25: `docs/KURMANJI-C1-LESSON-25-DIRECT-OBLIQUE-CASE-ALIGNMENT-DIALECT-AUDIT-2026-11-17.md`
- Lesson 26: `docs/KURMANJI-C1-LESSON-26-FINAL-REVIEW-SELF-ASSESSMENT-COURSE-CLOSURE-AUDIT-2026-11-17.md`

Use the two governing synthesis documents at the top of this register to navigate the earlier audits and interpret their chronology. This register intentionally does not claim that every example in the 26 lessons has passed native-speaker review.

## 5. Evidence and source hierarchy

Use descriptive grammars and peer-reviewed linguistic research for grammatical claims; dictionaries are useful for lexical verification but do not by themselves establish syntax, register, or naturalness. Where sources differ, record the variety, data source, and scope rather than selecting a form silently.

Principal sources already cited by the review corpus include:

- Geoffrey Haig (2018), “Northern Kurdish (Kurmanjî),” in *The Languages and Linguistics of Western Asia: An Areal Perspective*, pp. 106–158, DOI: https://doi.org/10.1515/9783110421682-004.
- Geoffrey Haig & Ergin Öpengin (2018), work on Kurmanji phonology/standardization as cited in the lesson-level registers; verify exact bibliographic entry and page locator before using a specific claim.
- W. M. Thackston (2006), *Kurmanji Kurdish: A Reference Grammar with Selected Readings*, https://sites.fas.harvard.edu/~iranian/Kurmanji/kurmanji_complete.pdf.
- Council of Europe (2020), *Common European Framework of Reference for Languages: Learning, Teaching, Assessment — Companion Volume*, https://book.coe.int/en/education-and-modern-languages/8150-common-european-framework-of-reference-for-languages-learning-teaching-assessment-companion-volume.html.
- Council of Europe, CEFR assessment guidance, https://www.coe.int/en/web/common-european-framework-reference-languages/assessment.

Do not attach a page number or claim of direct attestation unless the cited passage has been checked. CEFR guidance may inform task and assessment design; it does not certify this course or its current self-assessment.

## 6. Editorial workflow and closure gates

1. Approve the reference variety and house orthography.
2. Resolve C1-A02 with exact primary-source evidence and native-editor review.
3. Complete claim/example provenance and Kurmanji validation.
4. Complete Sorani copy-edit independently of Kurmanji form decisions.
5. Harmonize cross-lesson grammar explanations without changing inventory or silently rewriting content.
6. Map Lesson 26 self-assessment to course outcomes; preserve its formative status.
7. Only after explicit owner approval, prepare proposed lesson edits as a separate reviewable change set; do not edit production content directly.

A row is closed only when its stated evidence and review test are recorded. A source citation, a prior AI audit, or a successful technical test alone does not close a native-language editorial gate.

## 7. Explicitly out of scope

- No edits to existing lesson bodies or student-facing content.
- No edits to `kurmanji-content-seed-part-04.sql` or any other seed.
- No code, CI, runtime, migration, database, or Supabase operations.
- No production access, deployment, merge, rebase, force-push, or changes to PR #3.
- No changes to course inventory: Course 1 remains 26 lessons; Course 2 remains 12.
- No conflation of the Sorani-mediated course with the separate Kurmanji-medium Latin/Hawar pathway.

## 8. Next safe step

Next, obtain the owner's written decision on C1-A01 (reference variety and orthographic house policy), then complete the item-level provenance and qualified Kurmanji/Sorani reviews under C1-A03, C1-A07 and C1-A08. For C1-A02, do not reopen the settled evidence question as a universal r/rr rule; obtain only the remaining house-style approval and variety-matched editorial sign-off. Verify exact source passages for any newly disputed claim. Do not convert a proposal into a lesson edit without explicit approval.
