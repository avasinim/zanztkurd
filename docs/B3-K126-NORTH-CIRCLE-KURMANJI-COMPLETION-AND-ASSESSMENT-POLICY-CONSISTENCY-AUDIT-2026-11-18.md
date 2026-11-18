# B3-K126 — North Circle Kurmanji course completion and assessment-policy consistency audit

**Date:** 2026-11-18  
**Repository:** `avasinim/zanztkurd`  
**Branch:** `fix/kurmanji-ci-current-migration`  
**Pre-work HEAD:** `f4694fee88044e95d87c28ebbb6c4376e25494c0`  
**Pre-work backup:** `backup/b3-k126-course-completion-assessment-audit-before-2026-11-18`  
**Main baseline:** `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`

## 1. Scope and preservation boundary

Read-only cross-course audit of the two North Circle Kurmanji courses:
- Course 1: 26 lessons, course ID `kurmanji-course-1`.
- Course 2: 12 lessons, course ID `kurmanji-course-2`.

Compared the shared protected-lesson access path, Kurmanji completion UI, server RPC call path, existing browser regression coverage, and the existing final-review/self-assessment audits for Course 1 Lesson 26 and Course 2 Lesson 12.

This pass is documentation-only. No lesson text, course page, runtime code, SQL, migration, database row, assessment item, score, threshold, enrollment, Auth setting, RLS policy, grant, workflow, deployment, PR, merge, or `main` was changed. No test learner was created and no live learner session or OTP was used.

## 2. Shared course identity and lesson sequence

The current shared `script.js` explicitly maps:
- Course 1 lesson files 01–26 to `kurmanji-course-1`.
- Course 2 lesson files 01–12 to `kurmanji-course-2`.

The protected-lesson access layer uses those same two IDs and ordered filename arrays. The Kurmanji sequential-completion UI separately declares the same 26/12 file lists, course IDs and distinct local-storage keys. The two Kurmanji course pages present 26 and 12 lessons respectively.

The generic older runtime for `course-2-NN.html` uses the different legacy course ID `phonetics-phonology-kurdik` and a 32-file sequence. It is a separate course path and must not be mistaken for Kurmanji Course 2. Likewise, the older generic Course 1 runtime uses `orthography-kurdik`; it is not the Kurmanji Course 1 entrypoint.

**Finding:** The inspected Kurmanji-specific page/access/completion mappings agree on course identity and sequence length. Legacy generic course IDs remain distinct in the same shared script; future changes must preserve that boundary.

## 3. Completion and access policy

The Kurmanji completion control asks the learner to mark a lesson complete after reading. It calls `markLessonComplete(course.id, path)`, which sends `p_course_id` and `p_lesson_key` to the server-authoritative `complete_lesson` RPC.

The protected-lesson page gate independently:
1. requires an authenticated session;
2. checks site-owner status or enrollment in the exact course;
3. checks the server-side sequence predicate before loading protected content;
4. loads `lesson_content` only after the access path allows it.

The earlier K115 test-project metadata/function audit records the corresponding test-project policies and functions, including `student_has_enrollment`, `can_read_lesson_content` and `complete_lesson`. That was metadata/source inspection, not a live learner-token test.

The K087 policy audit records that neither the browser completion call nor `complete_lesson` requires a quiz attempt, quiz score or pass flag. K115 further records that the completion RPC validates identity/verification, enrollment, lesson key and predecessor completion before recording progress.

**Finding:** Both Kurmanji courses share a consistent *lesson-completion* model: read lesson → mark complete → server validates course and sequence → progress is recorded → next lesson becomes available. Quiz mastery is not a prerequisite in the checked-in policy. This is not automatically a defect; it is the current product rule evidenced by the implementation.

## 4. Assessment status across both courses

| Course endpoint | Existing final activity | Evidence-backed classification | Scored final examination verified? |
|---|---|---|---|
| Course 1, Lesson 26 | Review prompts and self-assessment checklist | Formative review / learner self-assessment | No |
| Course 2, Lesson 12 | Open-ended synthesis and three broad review questions | Review / self-assessment / integrative practice | No |

The existing Course 1 Lesson 26 audit records that its own text explicitly disclaims official score/proficiency proof. It also identifies missing answer key, analytic criteria, point allocation, pass threshold, coverage/weighting blueprint, defined test conditions, retake/remediation rules and productive/listening evidence. The existing K125 Course 2 Lesson 12 audit independently finds no fixed scored items, answer key, rubric, threshold, feedback/retake policy or result persistence.

The public `assessment.html` page distinguishes lesson completion, quiz success, progress and evidence. It explicitly warns that a completion or quiz-success state is not by itself a formal grade, formal completion or university certificate. It does not supply either course with a final assessment implementation.

**Finding:** The two final lessons are consistent in their current low-stakes review/self-assessment role. Neither is evidenced as a scored final examination. The Course 2 Lesson 12 title's “final test” wording remains stronger than the implemented evidence supports; K125 recommends describing it as review/self-assessment until a separate scored assessment is specified and implemented. Course 1 Lesson 26 already has the more accurate self-assessment boundary.

## 5. Browser regression coverage and gaps

The checked-in Playwright suite includes synthetic tests for:
- Course 1 lesson 1 completion, exact RPC payload and navigation to lesson 2;
- Course 1 protected-content behavior for unauthenticated/unenrolled or sequence-denied states and RLS-denied content;
- Course 2 lesson 1 completion, exact RPC payload and navigation to lesson 2;
- direct out-of-sequence Course 2 lesson 3 access redirecting to the first incomplete lesson without querying the locked lesson body.

These tests mock Supabase Auth, RPC and PostgREST using synthetic JavaScript objects and `example.invalid`; they are browser regression tests, not live database acceptance tests. The Course 2 tests do not yet mirror the full Course 1 protected-content denial matrix. Neither course's current tests demonstrate scored assessment submission, answer checking, score persistence, pass thresholds, retakes or quiz-gated completion.

K115 also records that no real learner JWT/RLS acceptance flow, Auth/OTP delivery, or real learner progress write has been verified. This remains a release-acceptance gap, not a reason to create accounts or send OTP without approval.

## 6. Consistency matrix

| Policy area | Course 1 | Course 2 | Cross-course disposition |
|---|---|---|---|
| Course ID | `kurmanji-course-1` | `kurmanji-course-2` | Distinct and correctly mapped |
| Lesson sequence | 26 | 12 | Matches course plans and runtime arrays |
| Protected access | Shared server-side access path | Shared server-side access path | Same architecture |
| Completion RPC | `complete_lesson` | `complete_lesson` | Same RPC contract |
| Sequential prerequisite | Required | Required | Same policy |
| Quiz pass required to complete | No | No | Same policy |
| Final activity | Self-assessment/review | Review/synthesis | Both formative |
| Scored final exam verified | No | No | Neither verified |
| Browser completion test | Synthetic Course 1 journey | Synthetic Course 2 journey | Both have basic positive path |
| Browser denial coverage | Broader synthetic denial cases | Direct out-of-sequence case; narrower matrix | Coverage is asymmetric |
| Live learner acceptance | Not verified | Not verified | Remains open |

## 7. Recommended safe next actions (no implementation)

1. Preserve the current completion policy unless the Academy explicitly decides that quiz mastery must gate lesson completion. Do not silently add a quiz gate.
2. For editorial consistency, describe Course 1 Lesson 26 as review/self-assessment and Course 2 Lesson 12 as review/self-assessment/integrative practice. The Course 2 “final test” wording should be handled as an editorial decision; this audit does not alter it.
3. If scored assessments are desired, commission separate assessment blueprints for each course: learning outcomes, task coverage, items, accepted answer variants, scoring rubric, threshold justification, feedback, retake rules, persistence and validation.
4. Close the browser-test asymmetry by adding Course 2 synthetic unenrolled/authentication/content-denial cases and a shared policy matrix. Keep synthetic tests clearly distinguished from live Auth/RLS acceptance.
5. Obtain explicit authorization before creating disposable test learners, using OTP, or performing real learner writes in the isolated test project. No production learner data should be used.
6. Before any release claim, verify the exact current CI run and perform the separately authorized test-project learner acceptance flow. Do not describe the courses as release-certified based on static or synthetic evidence alone.

## 8. Release disposition

**North Circle Kurmanji Courses 1 and 2 remain NOT RELEASE-CERTIFIED.**

The inspected implementation is coherent for ordered lesson completion and does not enforce quiz mastery. Both final lessons are formative review activities, not verified scored examinations. The primary outstanding assurance gaps are live learner acceptance and broader Course 2 negative-path browser coverage; the principal editorial mismatch is Course 2 Lesson 12's “final test” wording.

## 9. Verification record

- Pre-work branch HEAD: `f4694fee88044e95d87c28ebbb6c4376e25494c0`.
- Pre-work backup created before report authoring.
- Main baseline: `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`.
- Documentation-only change; no runtime or database behavior changed.
