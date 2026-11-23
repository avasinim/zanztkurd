# Course 2 — 12-Lesson Editorial Sign-off Register and Decision Log
Date: 2026-11-23
Status: Consolidated documentation-only control register. Not a learner-facing revision and not an approval to implement.

## 1. Executive status

**Course 2 is not yet ready for instructional sign-off or learner-facing implementation.**

The audit and implementation-planning phase now has implementation-ready editorial specifications for Lessons 01–12. Lessons 09 and 12 still have open owner/source gates; several course-wide decisions remain blocking. No lesson payload has been changed.

This register is the single coordination point for the remaining decisions, the evidence required to close each gate, and the order of work. It does not supersede the individual source audits or detailed specifications; where a conflict exists, the focused source audit and its exact source citation take precedence.

## 2. Scope and safety boundary

- Course: Course 2, Standard Kurmanjî morphology, 12 lessons.
- Repository: `avasinim/zanztkurd`.
- This phase is documentation-only.
- No learner-facing lesson HTML, SQL seed, application code, migrations, database, Supabase, `main`, deployment or production data is modified.
- No runtime, navigation, release or production test is claimed.
- Any future learner-facing implementation requires separate explicit approval and must begin on a non-main branch with verified pre/post backups and inspectable diffs.

## 3. Twelve-lesson readiness matrix

| Lesson | Main verified foundation | Required editorial closure | Planning status |
|---|---|---|---|
| 01 — مۆرفۆلۆجی و پێکهاتەی وشە | Word/morpheme distinction; source-attested `gund-ek` preview | Free vs bound morpheme; cautious segmentation; model answer; do not infer root/base/stem | Implementation spec drafted |
| 02 — ڕەگ، پێشگر و پاشگر | Root/base distinction; `-ek` as an attested suffix | Owner-approved stem terminology; no unsourced prefix example; source-backed analysis | Implementation spec drafted |
| 03 — ناو، ڕەگەزی ڕێزمانی و ژمارە | Gender/number concepts; Haig Table 7 noun forms | Use `gund` / `jin` as sourced singular contrast; explain head-noun ezafe agreement; no invented plurals | Implementation spec drafted |
| 04 — ناوی دیار و نادیار؛ پاشگری -ek | Haig Table 7 direct/oblique and indefinite forms | Segment `gund-ek-î`, `jin-ek-ê`; contrast oblique ending with ezafe in `bajar-ek-î mezin` | Implementation spec drafted |
| 05 — ئەزافە و پەیوەندیی ناو و هاوەڵناو | Haig §2.3.1 examples (4) and (5) | Distinguish head, ezafe, adjective and oblique possessor; qualify gender marking after indefinite `-ek` | Implementation spec drafted |
| 06 — خاوەنداری و جێناوی خاوەندار | `mal-a me`; `Ez li mal-a xwe me` | Owner chooses narrow scope/title or source-backed paradigm expansion; keep `xwe` within same-clause coreference | Implementation spec drafted |
| 07 — جێناوە کەسییەکان و حاڵەت | Haig pronoun paradigm and direct/oblique distribution | Legible paradigm; fully glossed clauses; explain syncretic `ew`; case ≠ subject/object | Implementation spec drafted |
| 08 — کردار، ڕەگ، کەس و ژمارە | Haig Table 14 transitive/intransitive contrasts | Three-way worked contrast; source-verified overt-object example; `min xwar` alone is not overt-object evidence | Implementation spec drafted |
| 09 — کاتی ئێستا، ڕابردوو و داهاتوو | Source-located `di-`, simple/imperfective past pairs and future form | Approve aspect terminology; owner/editor approves Sorani rendering of the source-verified future example; keep examples qualified | Implementation spec drafted; future source context verified; aspect terminology and Sorani-rendering approval remain open |
| 10 — نەفی و پرسیار | Haig §2.6.1 qualified negative patterns | Author clarifies ambiguous heading; current Standard Kurmanjî verification for `ma` and question words | Implementation spec drafted; owner/source gates open |
| 11 — ڕێکخستنی وشەکان و پێکهاتەی ڕستە | Haig §2.7.1 neutral SOVG; §2.7.2 example (32) ergativity | Critical: current seed and historical migration still misattribute example (32) to §2.7.1; correct only after explicit approval, using a forward migration if production change is authorized | Implementation spec drafted; learner-payload defect documented, not fixed |
| 12 — پێداچوونەوە و تاقیکردنەوەی کۆتایی | Cumulative review and source-based analysis | Owner confirms review vs formal exam; if exam, approve complete scoring/assessment design | Implementation spec drafted; D08 remains open |

“Implementation spec drafted” means a documentation plan exists; it does not mean the lesson has been edited, validated in the app or approved for release.

## 4. Blocking owner/editor decisions — decision log

No item below is presumed approved. Record each answer in this register or a linked decision record before changing learner-facing material.

| ID | Decision required | Why it blocks implementation | Closure evidence |
|---|---|---|---|
| D01 | Confirm course-wide Standard Kurmanjî target variety and policy for dialect variants | Prevents mixing forms or treating regional variants as universal | Owner's explicit scope statement |
| D02 | Approve the Sorani term and exact scope for “stem” | Root, base and stem cannot be used interchangeably | Approved glossary entry |
| D03 | Approve or replace provisional terms: inflection, derivation, syncretism, ergative alignment, aspect, focus/fronting | Prevents inconsistent technical vocabulary | Approved terminology register |
| D04 | Lesson 06: narrow title/content to ezafe possession and reflexive `xwe`, or expand with a complete source-verified possessive paradigm | Current title overpromises relative to the current content | Owner's A/B decision; if B, source list and verified paradigm |
| D05 | Clarify the intended meaning of Lesson 10 heading «نەفیی ڕستەی ناوەکی» | Ambiguous phrase must not be silently reinterpreted | Author's exact definition and approved title |
| D06 | Decide whether `ma` belongs in the Standard Kurmanjî yes/no question section | Historical/regional evidence alone is insufficient for a standard-course rule | Current Standard Kurmanjî source, context and owner approval |
| D07 | Approve the Lesson 10 information-question inventory | Forms and case/usage distinctions need current source verification | Form-by-form source and approved Sorani gloss |
| D08 | Confirm Lesson 12 remains a cumulative review or becomes a formal scored exam | The current content does not specify an exam framework | Owner's decision; if exam, approved duration, points, weights, threshold, rubric, key and variant policy |
| D09 | Approve the implementation sequence and learner-facing change scope | Documentation specifications do not authorize edits to course content | Explicit implementation approval naming branch/scope |

### Decision recording template

For each D01–D09, record:
- Decision ID;
- Owner's exact answer;
- Date;
- Source/reference, if linguistic evidence is required;
- Approved Sorani terminology or exact Kurmanjî form;
- Any accepted dialect/variant;
- Consequence for the affected lesson;
- Reviewer and review date.

Do not mark a decision closed because a plausible editorial option has been proposed. It closes only when the owner decision and any required source evidence are recorded.

## 5. Course-wide linguistic controls

These controls apply across all 12 lessons:

1. **Morphology vs morpheme:** `مۆرفۆلۆجی` names the field; `مۆرفیم` names the unit.
2. **Root/base/stem:** retain `ڕەگ` and `بنەڕەت` as distinct; stem remains provisional pending D02.
3. **Indefinite vs case vs ezafe:** do not conflate `-ek`, oblique endings and ezafe markers.
4. **Same visible ending, different function:** `gund-ek-î` / `jin-ek-ê` in the reviewed paradigm are indefinite oblique forms; `bajar-ek-î mezin` contains an ezafe marker in the adjective construction. Teach the whole phrase and context.
5. **Ezafe agreement:** identify the head noun as the agreement controller; do not say the following adjective/possessor determines the marker.
6. **Case vs grammatical role:** direct/oblique case is not a fixed subject/object mapping. Use complete source clauses and construction-specific explanations.
7. **Tense vs aspect:** keep separate; simple and imperfective past examples require contextual analysis.
8. **Negation:** keep `na-`, `ne-`, lexical `ni-` and past negative forms within the constructions where they are attested; no universal interchangeable-prefix rule.
9. **Questions:** do not import `ma` or a full interrogative list without current Standard Kurmanjî verification.
10. **Word order vs alignment:** Haig §2.7.1 neutral SOVG (G = goal) is not the same thing as ergative alignment. `Wî mirov-î çay anî` is §2.7.2 example (32), p.131, and illustrates past-transitive ergativity.
11. **Dialect discipline:** preserve source spellings and mark variants; do not blend dialects.
12. **Sorani style:** use `بڕگە` for syllable and `سەبز` for the color term where relevant.

## 6. Implementation specification index

The following planning documents are available in the repository. They are specifications, not implementation commits:

- Lessons 01–03 and 06:
  `docs/KURMANJI-COURSE-2-LESSONS-01-03-06-IMPLEMENTATION-READY-EDITORIAL-SPEC-2026-11-23.md`
- Lessons 04–05:
  `docs/KURMANJI-COURSE-2-LESSONS-04-05-IMPLEMENTATION-READY-EDITORIAL-SPEC-2026-11-23.md`
- Lessons 07–08:
  `docs/KURMANJI-COURSE-2-LESSONS-07-08-IMPLEMENTATION-READY-EDITORIAL-SPEC-2026-11-23.md`
- Lessons 10–11:
  `docs/KURMANJI-COURSE-2-LESSONS-10-11-IMPLEMENTATION-READY-EDITORIAL-SPEC-2026-11-23.md`
- Lesson 09:
  `docs/KURMANJI-COURSE-2-LESSON-09-IMPLEMENTATION-READY-EDITORIAL-SPEC-2026-11-23.md`
- Lesson 12:
  `docs/KURMANJI-COURSE-2-LESSON-12-IMPLEMENTATION-READY-EDITORIAL-SPEC-2026-11-23.md`

Course-wide source and readiness controls:
- `docs/KURMANJI-COURSE-2-MASTER-AUDIT-SYNTHESIS-AND-SIGNOFF-GATE-2026-11-23.md`
- `docs/KURMANJI-COURSE-2-FINAL-READINESS-AND-REVISION-REPORT-2026-11-23.md`
- `docs/KURMANJI-COURSE-2-WORKING-TERMINOLOGY-REGISTER-2026-11-23.md`
- `docs/KURMANJI-COURSE-2-INTEGRATED-REVISION-BLUEPRINT-2026-11-23.md`

Still required to complete the same planning level:
- final cross-lesson terminology reconciliation after D02–D03;
- final cross-lesson source and instructional reconciliation after all owner/source gates close.

## 7. Ordered remaining work

1. Obtain and record D01–D09, starting with the terminology and author-only decisions.
2. Close Lesson 09's source-context and owner gates: recheck the full future example and gloss, and retain provisional aspect terminology until D03 is resolved.
3. Close Lesson 12's D08 decision: keep it as a cumulative review by default, or obtain explicit approval and complete exam-policy decisions before designing a formal exam.
4. Reconcile all 12 lesson specifications against the approved terminology register.
5. Perform a source-by-source verification pass for every Kurmanjî example and gloss, recording exact source sections/pages.
6. Perform a separate instructional pass: objective → explanation → worked example → exercise → model answer/marking criteria.
7. Present the final implementation plan for explicit approval.
8. Only after approval, implement on a non-main branch, with a verified pre-work backup, small reviewable commits, post-work backup, diff inspection and appropriate tests.
9. Do not merge to `main`, modify production/Supabase, run migrations or deploy without separate explicit authorization.

## 8. Definition of course sign-off

Course 2 may be marked ready for instructional sign-off only when:
- all blocking owner/editor decisions D01–D09 are closed or explicitly scoped as non-applicable;
- all 12 lesson specifications are complete and reconciled;
- every learner-facing Kurmanjî example is source-attested and context-checked;
- every provisional Sorani term is approved or clearly kept provisional;
- case, ezafe, agreement, tense/aspect, negation, question forms, SOVG and ergativity are taught without conflation;
- exercises assess only taught material and have model answers or transparent criteria;
- a second linguistic/source review and an independent instructional review are complete;
- the final diff and relevant tests are reviewed after separately authorized implementation.

A documentation register alone does not satisfy these conditions.

## 9. Principal source

Geoffrey Haig (2018), “Northern Kurdish (Kurmanjî),” in *The Languages and Linguistics of Western Asia: An Areal Perspective*, pp.106–158. Principal reference for the reviewed grammatical analyses:
https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf

Kemal Badıllı (1965), *Türkçe İzahli Kürtçe Grameri (Kürmançça Lehçesi)*, may be used only as historical/regional corroboration where indicated; it is not a universal Standard Kurmanjî authority:
https://www.kurdolojiakademi.net/wp-content/uploads/2021/11/Turkce-izahli-Kurtce-grameri-Kurmancca-lehcesi.pdf

## 10. Change boundary

This register is documentation only. No learner-facing lesson, HTML, SQL seed, course payload, application code, migration, database, Supabase resource, `main` branch, deployment or production data was changed. No runtime, navigation, release or production test is claimed.
