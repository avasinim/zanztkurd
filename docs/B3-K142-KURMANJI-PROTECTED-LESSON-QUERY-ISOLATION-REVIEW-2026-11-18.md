# B3-K142 — Kurmanji Protected Lesson Query Isolation Review (2026-11-18)

## Scope
Read-only review of the shared browser runtime's protected lesson body query and the Test project's database constraints/RLS policy. The question was whether filtering by `lesson_key` alone can cross the Course 1/Course 2 boundary, and whether adding `course_id` to the client query is a useful defense-in-depth improvement.

## Repository source findings
- `courseIdForTarget(target)` maps Course 1 lesson filenames to `kurmanji-course-1` and Course 2 filenames to `kurmanji-course-2`.
- The protected lesson route computes `courseId` before loading the body.
- `loadProtectedLessonContent(sb,target)` currently queries `lesson_content` with `.eq("lesson_key", lessonKey)`, then inserts `content_html` into `.lesson-content`.
- The call site has `courseId` in scope but does not pass it to the body loader.
- The loader query does not itself filter by `course_id`.

## Test database evidence (read-only)
Target: `zanztkurd-kurmanji-test`, project ID `juwsjljbdwyncicybwoq`.

- 38 Kurmanji lesson rows, 38 distinct lesson keys.
- Duplicate lesson keys within the two-course scope: 0.
- Keys shared across different courses: 0.
- Course 1 rows carrying Course 2-prefixed keys: 0.
- Course 2 rows carrying Course 1-prefixed keys: 0.
- `lesson_content.lesson_key` is the primary key (unique); `course_id` has a foreign key to `courses(id)` and a non-unique index.
- RLS is enabled on `public.lesson_content`; FORCE RLS is false; table owner is `postgres`.
- The authenticated SELECT policy permits site owners, or enrolled users whose enrollment course matches the row's `course_id` and whose `can_read_lesson_content(course_id, lesson_key)` check succeeds.
- The Test `can_read_lesson_content(text,text)` function checks enrollment against the supplied course ID and validates the key against that course's ordered lesson list.

## Assessment
No current cross-course content collision was found. The globally unique primary key prevents duplicate `lesson_key` rows, and the RLS SELECT policy independently binds the visible row to an enrollment for that row's own `course_id` plus the server-side course/key progression check. Therefore the present query does not, by itself, demonstrate a cross-course disclosure in the inspected Test configuration.

A small defense-in-depth improvement remains reasonable: pass the already-computed `courseId` into `loadProtectedLessonContent` and add `.eq("course_id", courseId)` alongside the key filter. This would make the client query's intended course boundary explicit and protect against future changes to policy or key conventions. It is not required to repair a demonstrated current data defect.

## Decision and boundaries
- Report-only; no runtime change was made.
- No lesson titles, keys, HTML bodies, or course mappings were changed.
- No database rows, policies, grants, functions, Auth settings, or migrations were changed.
- Test project only was queried; Production was not queried or modified.
- No user was created, no OTP/login was initiated, and no live learner session was simulated.
- No deployment, PR, merge, or main-branch update occurred.
- This metadata/source review is not a live JWT/RLS penetration test.

## Repository state
- Repository: `avasinim/zanztkurd`
- Work branch: `fix/kurmanji-ci-current-migration`
- Starting HEAD: `a0538c46d61ef92407298b6667de36786d76648e`
- Pre-work backup: `backup/b3-k142-course-content-query-isolation-before-2026-11-18` at `a0538c46d61ef92407298b6667de36786d76648e`
- Main baseline observed: `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`

This report records the review only.
