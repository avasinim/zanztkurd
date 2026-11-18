# B3-K143 — Kurmanji Learner Route and Completion Flow Audit (2026-11-18)

## Scope
Read-only source and Test-database review of the learner journey: authentication, enrollment, lesson-route gating, protected content retrieval, lesson completion, and next-lesson access. No live learner login or OTP was performed.

## Frontend route and authentication findings
- `auth.html` supports email/password sign-in, email registration with verification callback, phone OTP sign-in/registration, SMS OTP verification, password recovery, and password update.
- The `next` return URL is constrained to the same origin and site path before redirect.
- The protected lesson page starts hidden, checks for an authenticated session, checks site-owner status, checks enrollment for the course mapped from the lesson filename, and asks `can_read_lesson_content` for the requested lesson before loading body content.
- Course 1 filenames map to `kurmanji-course-1`; Course 2 filenames map to `kurmanji-course-2`.
- The lesson body is fetched from `lesson_content` and placed into `.lesson-content`. The current query filters by `lesson_key` only; K142 documented that adding the already-known `course_id` would be a useful defense-in-depth improvement.
- On a content query error or missing body, the loader replaces the content area with an error message. The page gate then reveals the page; it does not reveal a stale lesson body from the database response.
- The protected route does not rely on the browser's local progress cache as the authorization authority; it calls the server RPC.

## Completion flow findings
- The client completion flow calls `complete_lesson` with the mapped course ID and lesson key, then synchronizes the returned progress and course completion information.
- The Test database's deployed `complete_lesson(text,text)` checks authenticated identity, verified email or phone (except site owner), enrollment, course-specific lesson key membership, and the immediately preceding lesson before recording progress.
- The Test database's deployed `can_read_lesson_content(text,text)` similarly checks authentication, enrollment, course-specific lesson key membership, and the immediately preceding lesson.
- Both functions are SECURITY DEFINER with an empty fixed search_path in the inspected Test configuration.

## Important outstanding server-side gap
The repository's proposed K137 full-prefix progression migration and K139 compatibility correction are not present in the Test project's migration ledger and have not been applied there. The deployed Test RPC definitions inspected for this audit still require only the immediately previous lesson, rather than every earlier lesson in the course.

This means a non-contiguous legacy/imported progress state could satisfy the deployed immediate-predecessor test for a later lesson while an older lesson is missing. The currently observed Test progress aggregate is 5 Kurmanji progress rows for 1 learner and 1 active/completed enrollment; prior K138 audit found those rows contiguous through lesson 5 with no missing earlier keys. No gap was observed in current Test data, but this does not remove the potential edge case for future/manual/imported progress.

The K137/K139 full-prefix migration remains a repository proposal only. This report does not authorize or apply it. A separate explicit approval is required before any Test database migration write; Production remains out of scope.

## Existing synthetic test coverage
The repository Playwright suite includes mocked tests for:
- unknown Kurmanji lesson keys being rejected before content query;
- authenticated/enrolled route and completion RPC behavior;
- protected content denied for unauthenticated, unenrolled, sequence-denied and RLS-denied scenarios;
- Course 2 completion and next-lesson unlock;
- Course 2 direct out-of-sequence navigation.

These browser tests mock Supabase/Auth/RPC/PostgREST; they are not real Auth, JWT, or live RLS tests. Course 1 and Course 2 test coverage is not identical in every scenario. No live learner session, real OTP, or real account was used in this audit.

## Test project aggregate snapshot
Target: `zanztkurd-kurmanji-test`, project ID `juwsjljbdwyncicybwoq`.
- Kurmanji lesson rows: 38.
- Kurmanji progress rows: 5.
- Distinct learners with Kurmanji progress: 1.
- Active/completed Kurmanji enrollments: 1.
- No individual user identifiers or per-user history included in this report.

## Recommended next work
1. Obtain separate approval before applying the already-reviewed full-prefix progression migration to Test, then run its SQL regression tests against the actual database and verify existing progress remains accepted.
2. In a separate safe code change, consider passing `courseId` into the protected content loader and filtering by both `lesson_key` and `course_id`.
3. Expand mocked tests so Course 1 and Course 2 both cover unauthenticated, unenrolled, sequence-denied, RLS-denied, and successful content-load cases.
4. When explicitly authorized, conduct a disposable authenticated learner end-to-end test after verifying Test Auth provider configuration; this audit did not create users or send OTP.

## Boundaries and repository state
- Report-only; no code or lesson content changed.
- Test project read-only; no database writes, migrations, Auth changes, RLS or grant changes.
- Production was not queried or modified.
- No user creation, OTP, login, deployment, PR, merge, or main-branch update.
- Work branch: `fix/kurmanji-ci-current-migration`.
- Starting HEAD: `6031872424757cde0574f92a0aa3f7354f7f6dad`.
- Pre-work backup: `backup/b3-k143-learner-route-flow-audit-before-2026-11-18` at `6031872424757cde0574f92a0aa3f7354f7f6dad`.
- Main baseline observed: `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`.

This report records static source and read-only Test metadata/function inspection, not a live learner security test.
