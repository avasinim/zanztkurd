# Course 2 Lessons 11–12 — word-order and assessment-claim closure audit

Date: 2026-11-17  
Repository: avasinim/zanztkurd  
Working branch: fix/kurmanji-ci-current-migration  
Baseline HEAD: da01601f190fdc11720d2d90858c52a193393728  
Pre-work backup: backup/c2-l11-l12-assessment-closure-before-2026-11-17  
Scope: static comparison of the current Course 2 lesson payloads, source review, claim register and correction proposal. Proposal-only; no lesson or assessment implementation changes.

## 1. Executive disposition

**Lesson 11 is broadly correct but under-specifies Goal/recipient placement. Lesson 12 is a review activity, not a demonstrable scored final examination.**

These are different closure problems:
- Lesson 11 needs a more accurate description of clause structure and variation, not replacement of its SOV teaching point.
- Lesson 12 needs an explicit product/editorial decision: retain an honest review/self-assessment label, or commission a separately specified and implemented scored assessment. A title alone does not create an assessment system.

Neither lesson is release-certified by this audit.

## 2. Exact repository artifacts inspected

All artifacts were read from baseline commit `da01601f190fdc11720d2d90858c52a193393728` on `fix/kurmanji-ci-current-migration`.

| Artifact | Blob SHA | Evidence used |
|---|---|---|
| `docs/kurmanji-content-seed-part-05.sql` | `e40298225e03921edb3ad31704191bdf0c20e880` | Current draft payload for lessons 07–12, including full Lesson 11 and Lesson 12 body |
| `docs/KURMANJI-COURSE-2-12-LESSON-SOURCE-REVIEW-2026-11-16.md` | `d7c316eae2affe446248bfd0aaafe06d592d1c53` | Lesson-by-lesson evidence disposition |
| `docs/KURMANJI-COURSE-2-LESSONS-01-12-CLAIM-LEVEL-EVIDENCE-REGISTER-2026-11-16.md` | `ac79c7ea0cee5187600eecb0cc67aca938436997` | Lesson 11 word-order claims and Lesson 12 assessment claims |
| `docs/KURMANJI-COURSE-2-12-LESSON-CORRECTION-PROPOSAL-2026-11-16.md` | `f969ee76227df5f8bda1e903cbf1c790d02ea636` | Existing proposed SOVG/Goal correction and review-versus-test decision |
| `docs/KURMANJI-COURSE-2-12-LESSON-INTEGRATED-EVIDENCE-CLOSURE-REPORT-2026-11-17.md` | `32aaf680fce979d18038a05b9d2a9932b6e86eee` | Integrated course-wide closure status |
| `kurmanji-course-2-lesson-11.html` | `1e59da2dec5c3f8a80ef0e0125e3060872899fd9` | Static shell only; protected body is loaded dynamically |
| `kurmanji-course-2-lesson-12.html` | `250553bf0b41419d428af215ed4fd5411c007357` | Static shell only; protected body is loaded dynamically |

The seed is a checked-in draft SQL artifact ending in `ROLLBACK`. It was read as text only. No SQL was executed, and this audit does not establish the contents of any live database. The HTML files are shells, not self-contained copies of the protected lesson body.

## 3. Lesson 11 — word order and clause structure

### 3.1 What the current lesson gets right

The current payload:
- asks learners to identify subject, verb and (where present) object;
- introduces noun phrases with modifiers, possessors and adjectives;
- warns that constituents can be moved for focus or information structure;
- gives Haig's example `Wî mirov-î çay anî` and analyses it as subject–object–verb;
- explicitly warns that SOV is a basic pattern, not an exceptionless rule.

This is a sound introductory foundation.

### 3.2 What is missing

The payload describes the neutral order as SOV and then mentions Goal/recipient variation only generally. Haig (2018, §2.7.1), as summarized in the existing source review and correction proposal, gives a more informative neutral clause description: **SOVG**, where G represents a Goal/recipient-type argument.

The repository's prior evidence review records these qualifications:
- Goal/recipient arguments have a position in the clause beyond the simple subject–object–verb template.
- With `dan` (“give”), recipients are commonly placed immediately after the verb and marked oblique in the described pattern.
- Some southeastern varieties permit post-predicate Goal placement.
- Pragmatic focus can front constituents; therefore observed non-SOV orders are not automatically grammatical errors.
- Goal placement varies regionally; no one fixed recipient position should be taught as universal.

The current Lesson 11 paragraph acknowledges that Goal placement depends on verb and variety, but does not actually teach the post-verbal recipient pattern or name the SOVG structure.

### 3.3 Recommended teaching correction — not applied

Retain the existing SOV explanation, then add a compact qualification:

1. Introduce SOV as the neutral core order, with Goal/recipient represented separately (SOVG).
2. Explain that the Goal is not simply another direct object; its case and placement depend on construction and variety.
3. Give the source-supported generalization that recipients with `dan` are commonly post-verbal and oblique in the described Standard pattern.
4. Mark post-predicate Goal placement as dialectal variation, not a universal rule.
5. Preserve the existing explanation of pragmatic fronting/focus.

The prior correction proposal already contains Sorani wording for the SOVG point. This audit does not re-author or silently insert that wording. A native Sorani editor and Kurmanji specialist should approve the final terminology and any added example before lesson changes.

### 3.4 Example provenance control

The current example `Wî mirov-î çay anî` is attributed to Haig §2.7.1 in the seed. Preserve its source spelling and analysis. Any new recipient example should be:
- directly source-attested, with exact citation and transcription; or
- explicitly labelled as adapted or instructor-created and reviewed by a native Kurmanji specialist.

Do not invent a new `dan` sentence from the general rule and then present it as a quotation.

## 4. Lesson 12 — review versus scored assessment

### 4.1 What the current lesson actually contains

The current draft payload is an open-ended review:
- morphology and word structure;
- noun phrase structure and ezafe;
- pronouns and case;
- verb tense and transitivity;
- negation and questions;
- clause analysis using a learner-selected Kurmanji sentence.

It includes three broad review questions and a methodological note reminding learners that the review does not replace reading source material.

This is useful as a synthesis and self-review task.

### 4.2 What it does not specify

The inspected lesson body does not specify:
- a fixed scored item set or item count;
- item formats and the learning outcome measured by each item;
- a verified answer key, including accepted orthographic/dialect variants;
- a scoring rubric and point allocation;
- a pass threshold or decision rule;
- retake and feedback rules;
- persistence of scores/results;
- whether a result is linked to learner progress;
- validation evidence for any proficiency-level or certification claim.

The course's existing source review and claim register independently reach the same conclusion. A review prompt is not evidence that a scored exam exists elsewhere in the application. No separate interactive final assessment was verified in this audit.

### 4.3 Safe editorial disposition

Until an implemented assessment is identified and tested, describe Lesson 12 as **review / self-assessment / integrative practice**, not a formal final examination.

If the owner intends a scored final test, create a separate assessment specification before implementation. At minimum it should define:

1. **Purpose and claims:** formative review, course achievement check, or external proficiency claim. These are not interchangeable.
2. **Construct and outcomes:** which taught skills are assessed (morphology, nominal structure, case, verb/TAM, negation, questions, clause analysis).
3. **Blueprint:** coverage by learning outcome and lesson; avoid over-weighting easy recall at the expense of grammatical analysis.
4. **Item formats:** selected response, short constructed response, sentence analysis, and/or production; each format needs explicit marking rules.
5. **Answer key and variants:** source-backed correct answers, accepted alternatives, orthographic tolerance, and dialect boundaries.
6. **Scoring:** point allocation, partial credit, rubric, and handling of open-ended responses.
7. **Decision rules:** pass threshold only if pedagogically justified and owner-approved; do not invent one.
8. **Feedback and retakes:** what learners see after submission and how repeated attempts work.
9. **Persistence and integrity:** whether results save, when they save, and how duplicate submissions are handled.
10. **Validation:** content review by Kurmanji specialist, Sorani editorial review, item pilot/review, and technical tests of scoring and persistence.

A course-completion quiz should not be described as CEFR-aligned or as a proficiency certification unless an appropriate validation argument and evidence exist.

## 5. Consolidated gap matrix

| Requirement | Current Lesson 11/12 status | Safe next action |
|---|---|---|
| SOV as neutral/default order | Present and appropriately qualified | Retain |
| Goal/recipient represented in clause model | Mentioned generally, not taught structurally | Add SOVG explanation after editorial approval |
| Recipient placement with `dan` | Not demonstrated in current payload | Add only a source-attested or specialist-verified example |
| Regional Goal-placement variation | Mentioned generally | Label specific pattern and scope; avoid universalization |
| Pragmatic fronting/focus | Present at introductory level | Retain and, if useful, add source-backed contrast |
| Lesson 12 synthesis/review | Present | Retain as review |
| Fixed scored items and answer key | Not specified in payload | Create separate blueprint if desired |
| Rubric, threshold, retakes and persistence | Not specified or verified | Decide and test before claiming formal assessment |
| Proficiency/certification validity | No evidence established | Make no such claim |

## 6. Source basis and limits

Primary descriptive source used by the existing repository reviews:
- Haig, Geoffrey. 2018. “Northern Kurdish (Kurmanjî).” In Geoffrey Haig & Geoffrey Khan (eds.), *The Languages and Linguistics of Western Asia: An Areal Perspective*, pp. 106–158. See §2.7.1 for clause order and Goal placement. DOI: https://doi.org/10.1515/9783110421682-004

The source review also cites:
- Haig & Öpengin (2018), for Kurmanji varieties and regional scope.
- Baker & Atlamaz (2014), for case/agreement and split-ergative analysis.

This audit relies on the exact repository source-review and correction records identified above for the prior claim-level findings. It does not claim a new independent page-by-page re-examination of the full Haig chapter or a new dialect survey.

## 7. Release and change-control boundary

This is a static evidence-to-payload audit only. It does not certify:
- live database content or whether the draft seed was applied;
- runtime lesson rendering, quiz functionality or result persistence;
- the accuracy of every example in the 12-lesson course;
- a formal assessment or proficiency level.

No lesson body, seed SQL, migration, schema, application code, validator, test, CI workflow, database, PR #3, main branch or deployment was changed. No SQL was executed and no production or staging database was accessed.

## Backup record

- Pre-work backup: `backup/c2-l11-l12-assessment-closure-before-2026-11-17`
- Baseline SHA: `da01601f190fdc11720d2d90858c52a193393728`
- Post-work backup: to be recorded after commit and exact ref/blob verification.
