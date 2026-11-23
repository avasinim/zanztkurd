# Course 2 — Lesson 12: Implementation-Ready Editorial Specification
Date: 2026-11-23
Status: Documentation-only specification. Conservative review-only path is recommended, but the course owner's D08 decision remains open. No learner-facing change is authorized or performed.

## 1. Lesson identity and present state

**Current title:** پێداچوونەوە و تاقیکردنەوەی کۆتایی

**Current instructional function:** cumulative review plus an open-ended grammatical analysis task.

The current lesson revisits morphology and morphemes, roots and affixes, nouns and agreement, ezafe and possession, pronouns and case, verbs, tense, negation, questions and word order. It asks the learner to analyze a selected Kurmanjî sentence and emphasizes source/context support.

The current payload does not define a formal scored examination: it has no approved duration, point allocation, weighting, pass threshold, marking rubric, controlled test paper or answer key. The word “تاقیکردنەوە” in the title can therefore promise more than the lesson currently provides.

## 2. Evidence and source limits

Primary planning evidence:
- Existing proposal: `docs/KURMANJI-COURSE-2-LESSON-12-ASSESSMENT-DESIGN-PROPOSAL-2026-11-23.md`, blob SHA `2ef6c2be4afcf0953d134c56ac77eabf5b9b9345`.
- Course 2 master audit and 12-lesson sign-off register.
- The course's reviewed lesson audits and implementation-ready specifications for Lessons 01–11.

The SQL seed filename and exact Lesson 12 payload location were not independently recovered in this pass. This specification does not claim a fresh payload-level verification. Before learner-facing implementation, fetch the exact Lesson 12 seed row from the correct repository path and compare it with the previously audited content.

No new Kurmanjî sentence, grammatical rule, translation, test item or answer key is introduced here.

## 3. Owner decision D08 — review or formal examination

This is a blocking decision. Neither path is presumed approved.

### Option A — Cumulative review (recommended conservative default)

If the owner confirms Option A:
- Rename the lesson to **پێداچوونەوەی کۆتایی** so the title accurately describes its function.
- Retain a cumulative review of the 12-lesson course.
- Add a concise topic-to-lesson index so learners can return to the relevant earlier lesson.
- Include one worked grammatical analysis using only a source-verified example already taught in the course.
- Convert the current open-ended task into a structured guided analysis with clear steps and transparent criteria.
- Include model answers or criteria for the review prompts.
- Do not show a score, pass/fail result, exam duration or exam rules.
- Keep unresolved material from earlier lessons out of the review's required answers until it has been taught and approved.

This is the recommended path for the current course version because several earlier lessons still have open source and terminology gates.

### Option B — Formal scored examination

If the owner chooses Option B, do not implement until the following are explicitly approved:
- purpose: diagnostic, formative or summative;
- duration and delivery conditions;
- total points and outcome-based weighting;
- pass threshold or grading bands;
- permitted references and whether source citation is assessed;
- accepted Standard Kurmanjî and orthographic variants;
- answer key and marking rubric;
- accommodations, retakes and feedback policy, if applicable.

Do not invent the duration, point totals, pass threshold or grading bands. Build the exam only after Lessons 01–11 have passed their own instructional and source gates. The review and formal exam should be separately labeled sections, not conflated under one ambiguous title.

## 4. Recommended review structure (Option A)

### Section 1 — پێداچوونەوەی پێکهاتەی وشە
Revisit the distinction between word, morpheme, root and base using only forms taught in Lessons 01–02. Keep “stem” provisional until the course terminology decision is closed.

### Section 2 — پێداچوونەوەی ناو و ئەزافە
Revisit noun gender/number, indefinite marking, ezafe and possession using the contextualized examples taught in Lessons 03–06. Do not ask learners to identify a suffix by shape alone: require the whole phrase and its grammatical context.

### Section 3 — پێداچوونەوەی جێناو و حاڵەت
Revisit direct/oblique pronouns and the relevant clause patterns from Lesson 07. Do not reduce case to a fixed subject/object mapping.

### Section 4 — پێداچوونەوەی کردار
Revisit the source-verified verb contrasts from Lessons 08–09. Keep transitivity, case, tense and aspect distinct. Do not generalize `di-` as a universal marker.

### Section 5 — پێداچوونەوەی نەفی و پرسیار
Include only those negative and interrogative patterns that have been source-verified and explicitly taught in Lesson 10. Exclude unresolved question particles and any ambiguous heading content.

### Section 6 — پێداچوونەوەی ڕێکخستنی ڕستە
Revisit neutral SOVG and the separately analyzed past-transitive ergative example from Lesson 11. Do not treat word order and alignment as the same concept.

### Section 7 — شیکردنەوەی ڕێزمانیی ڕێکخراو
Use one complete, source-verified sentence already taught in the course. The learner follows a fixed sequence:
1. identify the whole clause and its context;
2. identify the relevant word classes;
3. segment only those forms whose analysis has been taught;
4. identify case and agreement without assuming a one-to-one subject/object mapping;
5. explain the construction using approved terminology;
6. point to the taught example/source supporting the analysis.

The selected sentence must not be invented for this lesson. Its exact source, translation, segmentation and acceptable analysis must be checked before inclusion. If no single sentence covers the intended structures without overloading the learner, use a short set of separate, already-taught examples rather than forcing an artificial all-in-one sentence.

## 5. Review prompt design and feedback

Use application prompts rather than a long list of isolated definitions. Each prompt should:
- refer to a form or distinction already explained and practiced;
- identify the earlier lesson where the topic was taught;
- avoid testing unresolved terms or unverified variants;
- include a model answer or a transparent list of required answer elements;
- distinguish a wrong grammatical analysis from a reasonable variant accepted by the course's stated scope.

Suggested prompt categories (not final learner-facing questions):
- distinguish a morpheme from a word and identify the taught root/base distinction;
- explain why two similar-looking endings may have different grammatical functions in different contexts;
- analyze a taught ezafe phrase by identifying its head noun and ezafe relation;
- explain a direct/oblique pronoun contrast in its full clause;
- compare one taught simple/imperfective past pair without turning it into a universal prefix rule;
- distinguish the neutral word-order description from the past-transitive ergative analysis;
- perform a structured analysis of the approved course sentence.

Do not write new Kurmanjî examples or a final answer key until the exact examples and accepted terminology have passed the relevant source and owner gates.

## 6. Model-answer and review criteria

For each applied task, the model answer or marking guidance should make clear:
1. **Identification:** the target form or construction is correctly recognized.
2. **Context:** the full phrase/clause is considered, not an isolated suffix.
3. **Analysis:** grammatical function is explained without conflating case, role, agreement, tense, aspect, word order or alignment.
4. **Evidence:** the answer points to a taught example or source where the lesson requires it.
5. **Terminology:** approved course terms are used consistently.
6. **Scope:** the learner does not generalize beyond the examples and rules actually taught.

For Option A, these are feedback criteria, not a numerical grading rubric. Do not display a score or pass/fail status unless the owner separately approves an assessment policy.

## 7. Prerequisite gates

- [ ] **G01 — D08 owner decision:** Option A review or Option B formal exam is explicitly selected.
- [ ] **G02 — Title:** title matches the approved function; if Option A, approve «پێداچوونەوەی کۆتایی».
- [ ] **G03 — Lesson 01–11 readiness:** only content already taught, source-checked and approved may be reviewed.
- [ ] **G04 — Terminology:** root/base/stem, case, ezafe, tense/aspect and alignment labels are reconciled with the approved terminology register.
- [ ] **G05 — Source example:** exact sentence, source location, transcription, segmentation and Sorani gloss are verified.
- [ ] **G06 — Model feedback:** every applied prompt has model answer elements or transparent criteria.
- [ ] **G07 — Variant policy:** accepted dialect and orthographic variants are stated consistently with the course scope.
- [ ] **G08 — Independent review:** linguistic/source and instructional reviewers approve the final review content.

For Option B, add the separate exam-policy approvals listed in Section 3 before creating any exam item.

## 8. Acceptance checklist

- [ ] Lesson title accurately describes the approved function.
- [ ] The review maps each topic to its earlier lesson.
- [ ] No unresolved or untaught rule is assessed.
- [ ] Every Kurmanjî example is already taught, source-verified and context-checked.
- [ ] The worked analysis is complete and uses approved terminology.
- [ ] Case and grammatical role remain distinct.
- [ ] Tense and aspect remain distinct.
- [ ] SOVG and ergative alignment remain distinct.
- [ ] Questions and negation include only verified course forms.
- [ ] Model answers or transparent review criteria are present.
- [ ] No invented score, threshold, duration or pass/fail promise appears in Option A.
- [ ] The final content passes independent linguistic and instructional review.

## 9. Relationship to the course sign-off register

After this specification is committed:
- update the 12-lesson register to mark Lesson 12's implementation specification as drafted;
- keep D08 open until the owner explicitly selects Option A or B;
- keep final Course 2 sign-off blocked until all course-wide owner decisions and lesson gates are closed;
- do not interpret completion of this document as approval to edit the learner-facing lesson.

## 10. Change boundary

This is a documentation-only specification. No Lesson 12 HTML, SQL seed, learner-facing payload, application code, migration, database, Supabase resource, `main` branch, deployment or production data was changed. No runtime, navigation, release or production test is claimed.


## 11. Direct Lesson 12 payload verification — 2026-11-23

The exact Lesson 12 SQL tuple was recovered and compared in the current repository snapshot from both `docs/kurmanji-content-seed-part-05.sql` and `supabase/migrations/20261024122051_add_kurmanji_courses_and_protected_lessons.sql`. The extracted tuple, including the title, `content_html` and `now()` tail, is byte-for-byte identical in the two files (2,398 characters after removing only leading SQL indentation). This closes the earlier evidence gap about whether the Lesson 12 payload had been freshly fetched. It verifies repository artifact parity only, not live database state or deployed content.

### 11.1 What the stored payload actually asks learners to do

The payload contains four recap sections: morphology; nominal structure; verbs and clauses; and a final analysis task. The task asks learners to choose a Kurmanjî sentence and identify nouns and verbs, pronoun forms and case, ezafe and suffixes, tense and negation/questions, then support each decision with source and context. It also has three recap questions and a methodological note warning that new examples must be checked against a grammar source before instructional use.

This is an open, learner-selected analysis task, not a controlled examination passage. It does not specify the sentence's length, accepted variety/source, minimum structures, expected response format, model answer, or feedback criteria. In addition, it asks the learner to inspect negation and questions even though Lesson 10's heading and question inventory remain unresolved. It can also invite learners to analyze forms not securely taught in the preceding lessons.

### 11.2 Editorial disposition

1. The evidence supports describing the current function as **cumulative review plus an open-ended source-based analysis task**.
2. The title's `تاقیکردنەوە` wording and the methodological note's `تاقیکردنەوەی زانیارییە` (“knowledge check/test”) describe a review with a self-check element. They do **not** establish a formal scored examination: there are no controlled test items, timing, points, weighting, pass threshold, rubric or answer key. Editorial wording should preserve this distinction rather than claiming the lesson contains no test-like activity at all.
3. The conservative review path remains preferable, but changing the title to «پێداچوونەوەی کۆتایی» still requires the owner's D08 approval.
4. If Option A is approved, narrow the analysis task to already taught, source-verified forms; explicitly exclude unresolved Lesson 10 material and any unsupported learner-selected sentence. Prefer a controlled set of separate taught examples if no single complete sentence safely covers the target structures.
5. Supply model answer elements or transparent feedback criteria, but do not add points, pass/fail rules, duration or a formal answer key without the corresponding content and assessment approvals.

### 11.3 Verification checklist

- [x] Exact Lesson 12 tuple fetched from the seed file.
- [x] Exact Lesson 12 tuple fetched from the historical migration.
- [x] Extracted tuples compared byte-for-byte (2,398 characters; identical).
- [x] Actual four-section task and recap questions reviewed.
- [x] Open-ended task and unresolved Lesson 10 dependency recorded.
- [ ] Owner decision D08: cumulative review or formal examination.
- [ ] Owner approval of any title/content revision.

**Boundary:** this section documents existing payload content only. No lesson HTML, seed SQL, historical/new migration, application code, database, Supabase resource, `main` branch or deployment was changed. No live database or runtime test is claimed.


### 11.4 Wording precision note

The methodological note in the existing HTML says `ئەم پێداچوونەوەیە تاقیکردنەوەی زانیارییە` (“this review is a knowledge check/test”). Accordingly, the accurate classification is **cumulative review with a knowledge-check/self-check element and an open-ended analysis task**, not simply “review only” and not a formal scored examination. This nuance should be preserved in any owner-facing decision about D08 and any future title revision.
