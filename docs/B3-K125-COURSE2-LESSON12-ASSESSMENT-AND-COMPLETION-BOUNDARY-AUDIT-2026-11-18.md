# B3-K125 — Course 2 Lesson 12 assessment and completion-boundary audit

**Date:** 2026-11-18  
**Repository:** `avasinim/zanztkurd`  
**Branch:** `fix/kurmanji-ci-current-migration`  
**Pre-work HEAD:** `8c386d40ca0a91975b7c9144fbf381d77f87b443`  
**Pre-work backup:** `backup/b3-k125-course2-assessment-audit-before-2026-11-18`  
**Main baseline:** `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`

## 1. Scope and preservation boundary

Read-only audit of Course 2 Lesson 12, the course plan, the public assessment explainer, and the checked-in completion path. This pass determines whether the lesson title's claim of a “final test” is supported by an implemented, specified, scored assessment.

No lesson copy, course plan, page shell, JavaScript, SQL, migration, database row, assessment item, scoring rule, answer key, Auth setting, RLS policy, grant, workflow, deployment, PR, merge, or `main` was changed. No assessment was invented or implemented.

## 2. Lesson 12 payload and page

Source payload: `docs/kurmanji-content-seed-part-05.sql`, key `kurmanji-course-2-lesson-12.html`.

Current title: «پێداچوونەوە و تاقیکردنەوەی کۆتایی» (“Review and final test”).

The page shell's hero repeats that title and says the lesson synthesizes Lessons 1–11. Its learning goal is to analyse Kurmanji word and sentence structure and avoid unsupported generalization.

The protected lesson body currently contains:
- a morphology review (morphemes, roots, prefixes/suffixes, `-ek`);
- a noun-phrase review (gender, number, ezafe, adjective and possessor);
- a verb/sentence review (direct/oblique pronouns, tense, transitivity, negation/questions and word order);
- one open-ended integrative analysis task with five instructions;
- a methodological note explicitly describing the activity as knowledge review, not a replacement for source reading;
- three broad review questions.

The body does not contain a fixed test form, a set of scored items, selectable or submitted responses, an answer key, or item-level feedback. The three questions are prompts for reflection, not a demonstrably scored exam.

## 3. Assessment page and product-language boundary

The repository's `assessment.html` page explains four concepts: lesson completion, quiz success, course progress and progress evidence. It says quiz success is distinct from lesson completion and warns that a completion state or a quiz-success state must not be treated as a formal grade, formal completion or university certificate without explicit rules and evidence.

This page is a conceptual explanation. It does not provide a Course 2 Lesson 12 assessment, item bank, submission UI, scoring implementation, answer key or assessment-result workflow. Its existence therefore does not establish that the Course 2 final exam is implemented.

## 4. Completion-path cross-check

The existing `docs/B3-K087-KURMANJI-QUIZ-AND-COMPLETION-POLICY-AUDIT-2026-11-17.md` inspected the Kurmanji browser completion path, `markLessonComplete`, and the checked-in `complete_lesson` database function. It records that neither the browser completion path nor the database function checks a quiz attempt, score or pass flag. The checked-in policy enforces ordered lesson completion, not quiz mastery as a prerequisite.

The current `script.js` completion helper calls `complete_lesson` with a course ID and lesson key after confirming an authenticated session; the helper does not send an assessment response or score. This is consistent with K087's documented boundary. It does not prove that no assessment feature could exist elsewhere, but no separate Course 2 Lesson 12 assessment was identified in the inspected lesson, course-plan or assessment-page artifacts.

## 5. Assessment-specification completeness

| Required component for a scored final assessment | Evidence in Lesson 12 / inspected artifacts |
|---|---|
| Purpose and construct (review, achievement check, or proficiency claim) | Review purpose is evident; scored-test construct is not specified |
| Learning-outcome coverage / assessment blueprint | Broad topic list only; no item-to-outcome map |
| Fixed item set and item count | Not present |
| Response formats and submission flow | Not present in Lesson 12 |
| Verified answer key and accepted variants | Not present |
| Point allocation, partial credit and rubric | Not present |
| Pass threshold / decision rule | Not present |
| Feedback after submission | Not specified |
| Retake and attempt policy | Not specified |
| Result persistence and reporting | Not specified for a Course 2 final assessment |
| Technical validation of scoring and persistence | No Course 2 scored-assessment test was identified in this pass |

The absence of these components means the current evidence does not support describing this lesson as a scored final examination. It is not a judgment that the lesson's review activity is useless; the synthesis task is a valid formative/self-assessment activity when labelled honestly.

## 6. Recommended disposition (no implementation)

**Recommended current classification:** review / self-assessment / integrative practice.

Until a separately specified and implemented assessment exists, avoid presenting the current three open questions as a scored final exam. The lesson's existing review activity can remain useful without a grade or pass claim.

If the Academy later chooses to commission a scored assessment, specify it as a separate product/academic task before implementation. The specification should define:
1. intended purpose and assessed construct;
2. measurable outcomes from Lessons 1–11 and a coverage blueprint;
3. item count, formats and difficulty distribution;
4. source-verified answers, accepted spelling/orthographic variants and dialect boundaries;
5. points, partial credit and rubric for open responses;
6. any justified and owner-approved pass threshold;
7. feedback, retakes and attempt limits;
8. persistence, reporting and privacy boundaries;
9. Kurmanji specialist and Sorani editorial review;
10. browser, RPC, scoring, persistence and regression tests.

Do not invent a pass threshold, grade, CEFR level, certificate, or quiz gate. Any change to completion policy requires a separate product decision and implementation approval.

## 7. Release disposition

**Course 2 remains NOT RELEASE-CERTIFIED.** Lesson 12 is presently a review/self-assessment activity with a misleadingly broad “final test” title; no specified or verified scored examination is evidenced by the inspected artifacts. The appropriate next action is editorial/product classification, not a speculative code or database change.

## 8. Verification record

- Work branch was at `8c386d40ca0a91975b7c9144fbf381d77f87b443` before this pass.
- `main` baseline remained `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`.
- Pre-work backup was created before editing this report.
- This pass changes documentation only.
