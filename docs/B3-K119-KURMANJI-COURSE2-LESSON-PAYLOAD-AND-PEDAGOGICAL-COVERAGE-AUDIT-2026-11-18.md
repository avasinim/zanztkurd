# B3-K119 — Kurmanji Course 2 Lesson-Payload and Pedagogical Coverage Audit

**Date:** 2026-11-18  
**Repository:** `avasinim/zanztkurd`  
**Branch:** `fix/kurmanji-ci-current-migration`  
**Scope:** Read-only audit of all 12 Course 2 lesson payloads in the isolated Test Supabase project, using the prior claim-level evidence register and integrated closure report as the review baseline.

## 1. Backup and scope boundary

- Starting branch HEAD: `a4741faf95c92fc57d10f68dfc0119e6466e47c1`
- Pre-work backup: `backup/b3-k119-course2-content-audit-before-2026-11-18` at the same SHA.
- Main baseline at start: `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`.
- Target database: isolated `zanztkurd-kurmanji-test`, project ID `juwsjljbdwyncicybwoq`.
- Database access: read-only SELECT statements only.

No lesson body, page shell, seed, migration, runtime code, test, database row, Auth setting, RLS policy, grant, workflow, deployment, PR, or main branch was changed in this audit.

## 2. Evidence reviewed

The audit examined the 12 current `public.lesson_content` payloads for `kurmanji-course-2`, the course plan and page shells, and these existing repository evidence documents:

- `docs/KURMANJI-COURSE-2-LESSONS-01-12-CLAIM-LEVEL-EVIDENCE-REGISTER-2026-11-16.md`
- `docs/KURMANJI-COURSE-2-12-LESSON-INTEGRATED-EVIDENCE-CLOSURE-REPORT-2026-11-17.md`
- `docs/KURMANJI-COURSE-2-12-LESSON-CORRECTION-PROPOSAL-2026-11-16.md`
- `docs/KURMANJI-C2-LESSONS-08-10-VERB-TAM-NEGATION-CLAIM-REVIEW-2026-11-17.md`
- `docs/KURMANJI-C2-LESSONS-11-12-WORD-ORDER-AND-ASSESSMENT-CLOSURE-AUDIT-2026-11-17.md`
- `docs/KURMANJI-COURSE-2-12-LESSON-PAGE-SEED-EXACT-PAYLOAD-COMPARISON-2026-11-17.md`

The prior academic evidence register scopes Haig's grammatical sketch to Standard Kurmanjî (loosely Cizre/Botan-based) and distinguishes this from regional varieties. That scope must remain explicit. A source supporting a rule does not authenticate every exact lesson example or its Sorani gloss.

## 3. Structural integrity — Test project

Read-only aggregate verification found:
- 12 expected lesson keys and 12 actual distinct keys.
- 12/12 expected keys present.
- 0 missing, duplicate, or unexpected keys.
- 12/12 rows have one non-empty title and body.
- All 12 lesson pages exist in the repository and are linked exactly once from the Course 2 plan.

This establishes structural presence, not linguistic correctness or release certification.

## 4. Lesson-by-lesson coverage findings

| Lesson | Current payload coverage | Evidence / teaching gap to close |
|---:|---|---|
| 01 Morphology and word structure | Defines word/morpheme and mentions `-ek`; no worked segmentation | Add no example until source/native review confirms it; the existing `gund-ek` mention needs a root + suffix + gloss breakdown. Distinguish morpheme from phoneme/syllable in an actual Kurmanji example. |
| 02 Root, prefix and suffix | Defines root/stem and prefix/suffix; `-ek` is the concrete example | It still does not show a fully worked verbal prefix/root/person ending. The proposed `di-bêj-im` segmentation requires exact source transcription review before use. |
| 03 Noun, gender and number | Explains grammatical gender, number and ezafe agreement | No nominal plural paradigm is taught. Standard direct plural vs oblique plural `-a(n)`, and regional restriction of direct indefinite `-in`, remain essential coverage gaps. |
| 04 Definite/indefinite nouns; `-ek` | Gives `gund/gundek`, `gund-ek-î`, `jin-ek-ê`, and contrasts case with ezafe | Stronger than the first three lessons, but a side-by-side segmentation and explicit case context would make the homophony of `-î` teachable rather than merely described. |
| 05 Ezafe and noun/adjective | Gives `bajar-ek-î mezin` and explains head-noun agreement and possessor distinction | Needs a worked contrast among linking ezafe, possessor marking, and other ezafe constructions; avoid implying the adjective itself inflects in the example. |
| 06 Possession and possessive pronouns | Gives `mal-a me` and reflexive `xwe` example | Title promises a broader possessive-pronoun system, but there is no complete scoped paradigm. Distinguish oblique personal pronouns in possessor position from independent possessive forms. |
| 07 Personal pronouns and direct/oblique case | Lists direct and oblique pronoun forms; explains case is not a simple subject/object label | Needs contrastive full-sentence examples that show present transitive vs past transitive alignment and the agreement controller. |
| 08 Verb, stem, person and number | Includes `ez dibêjim`, `ez hatim`, `min xwar` | The three examples are useful but not a worked paradigm. Explicitly show present transitive subject agreement, past intransitive subject agreement, and past transitive object agreement; identify zero third-person marking where relevant. |
| 09 Present, past and future | Compares present/past forms, simple vs progressive past, and gives a future particle + subjunctive example | Direct inspection of Haig (2018), p. 129, example (27), confirms the current payload's `ew dē mesel-ē ji te re bēž-e` matches the printed source form. The earlier repository evidence-register variant `ew dê mesel-ê ji te re bêj-ê` was a transcription error. Keep the exact source form and citation; do not normalize its macrons/circumflexes. |
| 10 Negation and questions | Covers `na-`, `nizanim/nikarim`, past negative forms, and question categories | The question section has no exact Kurmanji examples. Separate verbal, non-verbal and existential negation; clarify the past-progressive `ne-` + `di-` pattern. Question examples need source/variety labels and native review before insertion. |
| 11 Word order and clause structure | Gives one SOV sentence and discusses focus/fronting and Goal/recipient variation | A useful introductory rule, but only one worked sentence. Add an independently verified Goal/recipient example and label neutral order vs pragmatic fronting; avoid presenting SOV as invariant. |
| 12 Review and final test | Contains open-ended analysis instructions and three review questions | This is review/self-assessment, not a specified scored examination. No item count, answer key, scoring, threshold, retake policy, or result-persistence contract is defined in the lesson body. |

## 5. Cross-course observations

### 5.1 Pedagogical density

Lessons 01–07 mostly explain concepts in prose and have few or no concrete Kurmanji worked examples. Lessons 08–11 include more source forms, but still lack complete paradigms and contrastive exercises. Lesson 12 asks learners to perform a broad analysis without providing a scoring rubric or answer key.

The read-only SQL structure scan found no HTML `<table>` paradigm in any of the 12 lesson bodies. This is a structural observation, not a claim that tables are mandatory; carefully designed examples may be preferable. The key deficiency is not formatting but missing worked, source-verified teaching material.

### 5.2 Source and example provenance

For each future example, record one of:
- exact source quotation (preserve exact transcription and page/table);
- adapted example (explicitly labelled, with adaptation and variety stated);
- instructor-created example (native specialist validated).

Lesson 09's future sentence has now been verified as an exact Haig (2018:129, example 27) transcription. The earlier claim-register mismatch was an internal transcription error and is corrected in K121. Do not silently change Kurmanji Latin forms, diacritics, morpheme boundaries, or dialect forms.

### 5.3 Sorani editorial consistency

The current Sorani explanatory prose contains variants previously identified in the repository review, including `پەیویستە/پێویستە`, `نمونە/نموونە`, and `نوسین/نووسین`. This audit does not choose the Academy's house style. A native Sorani copy-edit should apply an approved terminology/spelling sheet consistently, without touching Kurmanji Latin source forms.

## 6. Recommended closure order

1. **P0 — Reference and transcription:** formally identify the pedagogical reference variety; preserve the now-verified Lesson 09 future quotation and resolve remaining source quotation/adaptation labels.
2. **P1 — Core paradigms:** prepare specialist-checked worked material for Lessons 03, 06, 07 and 08 (plural, possessive pronouns, direct/oblique contrast, and agreement controller).
3. **P1 — Verb system and negation:** refine Lessons 09–10 with exact TAM/negation contrasts and named variety boundaries; add question examples only after validation.
4. **P2 — Syntax:** add a source-attested Goal/recipient example and distinguish neutral word order from pragmatic fronting in Lesson 11.
5. **P2 — Assessment decision:** either label Lesson 12 as review/self-assessment, or separately specify and implement a scored test before calling it a final examination.
6. **P3 — Copy-edit:** apply the Academy-approved Sorani spelling and terminology sheet across all 12 payloads.

All proposed changes remain editorial proposals. No lesson content is changed by K119.

## 7. Release disposition

**Course 2 remains NOT RELEASE-CERTIFIED.**

Technical integrity is good: the 12 lesson rows and page navigation are structurally complete, and K118 CI passed. Linguistic/pedagogical closure is incomplete because the examples, paradigms, variety labels, exact transcription and final assessment need the work described above.

## 8. Next safe step

Prepare a proposal-only, lesson-by-lesson source-verification matrix with exact source page/table references and explicit “quote / adapted / instructor-created” labels. Obtain specialist/native editorial approval before changing any lesson payload. Keep all work on the isolated branch; no production migration or deployment is authorized by this audit.
