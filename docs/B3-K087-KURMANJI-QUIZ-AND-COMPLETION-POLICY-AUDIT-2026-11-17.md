# B3-K087 — Kurmanji quiz and lesson-completion policy audit

Date: 2026-11-17  
Branch: `fix/kurmanji-ci-current-migration`  
Audited source commit: `8de147733d969be0b13af6c7f38191c031887968`

## Scope

Read-only inspection of the Kurmanji browser completion gate, `markLessonComplete`, and the checked-in `complete_lesson` database function to determine whether a quiz pass is required before lesson progress is recorded.

## Findings

- The Kurmanji lesson completion UI asks the learner to mark the lesson complete after reading it.
- On click, the browser calls `markLessonComplete(course.id, path)`; that helper invokes the server-authoritative `complete_lesson` RPC with the course ID and lesson key.
- The SQL function validates authentication, email or phone verification, course membership/enrollment, valid lesson key, and sequential predecessor completion before inserting/updating `lesson_progress`.
- Neither the browser completion path nor the checked-in `complete_lesson` function checks a quiz attempt, quiz score, or pass flag.
- Therefore, the current checked-in design enforces ordered lesson completion, but does not enforce quiz mastery as a prerequisite to recording completion.

## Interpretation / decision required

This is a confirmed behavior of the checked-in implementation, not automatically a defect. The repository does not establish that quiz passing is a required completion policy. If the intended educational rule is “read lesson, then mark complete,” current behavior is consistent. If the intended rule is “pass the quiz before completion/next lesson unlock,” a separate product decision and approved implementation are needed.

No change was made to quiz or completion policy in this audit. No quiz gate was invented or added.

## Verification context

The related browser regression and package-integrity workflow passed in GitHub Actions run https://github.com/avasinim/zanztkurd/actions/runs/44088113520. The browser regression validates the Course 1 lesson 1 RPC payload and next-page navigation using a synthetic client; it does not test quiz scoring.

## Limits and safety boundary

This audit is based on checked-in source and migration text, not live production database state. No lesson content, SQL migration, database, deployment, CI workflow definition, or `main` branch was changed.
