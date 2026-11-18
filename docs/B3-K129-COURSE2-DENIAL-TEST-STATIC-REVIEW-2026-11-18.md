# B3-K129 — Static review of Course 2 denial regression test

Date: 2026-11-18  
Branch: `fix/kurmanji-ci-current-migration`  
Pre-review HEAD: `e4393a7b728e2ee2e8351be388ec378211cb7e6b`

## Scope

A read-only review of the K127 synthetic browser test and the exact protected-lesson page gate in `script.js`. No code, workflow, database, or lesson content was changed in this work item.

## Test-to-runtime correspondence

The new test `test_kurmanji_course2_denies_unauthenticated_unenrolled_and_locked_content` opens `kurmanji-course-2-lesson-02.html`, which exercises the Course 2 page gate for a non-initial lesson.

The runtime order observed in `script.js` is:

1. Obtain Supabase session.
2. If no session, replace the current location with the sign-in URL.
3. Check site-owner status.
4. For a non-owner, check enrollment for the resolved course ID.
5. For a non-owner, ask `can_read_lesson_content` for the lesson key.
6. Only after all gates pass, query `lesson_content` and render `content_html`.

The test's four fixture cases align with those branches:

| Fixture | Expected behavior | Expected content query |
|---|---|---:|
| Unauthenticated | Redirect to sign-in; no access RPC | 0 |
| Authenticated, unenrolled | Redirect to dashboard | 0 |
| Enrolled, sequence denied | Redirect to locked/dashboard path | 0 |
| Enrolled, sequence allowed, content RLS error | Render controlled Kurdish error, never private sentinel | 1 |

The mocked query chain (`select → eq → limit → maybeSingle`) matches the runtime's content query. The asserted Kurdish error prefix is present in the runtime's actual error message. The private sentinel is asserted absent from the rendered lesson container.

## Important test limits

- The fixtures stub Supabase client, session, RPCs, and PostgREST; the URL is `example.invalid`.
- This is not a live Supabase RLS or JWT test and cannot establish actual database policy behavior.
- The test uses a fixed 450 ms wait, consistent with the surrounding synthetic suite style; CI execution is still needed to validate timing and browser behavior.
- The new test has not yet been executed in the pending K127 workflow run.

## CI state at review

Run [44257368596](https://github.com/avasinim/zanztkurd/actions/runs/44257368596), commit `cfdaa0cc10dbf781250f08a32918ebe4ab5c66cb`, was still reported `in_progress` at the latest read. PostgreSQL SQL parsing, migration/seed parity, and static lesson-page/key validation had succeeded. Playwright browser installation remained `in_progress`; the browser regression step remained `pending`.

The job-log endpoint continued to return HTTP 404 / BlobNotFound. This does not reveal whether installation is downloading dependencies, stalled, or whether the runner/log artifact is unavailable. No cause is inferred.

## Decision

The static code review found no definite mismatch requiring a K127 test correction. Do not change the workflow or test based on an unobserved failure. Next action is to obtain a terminal workflow state and inspect actual logs if installation fails. If the run remains indefinitely active, use repository Actions administration or a maintainer with the required permission to cancel/retry it; no such cancellation or retry was issued here.

## Safety boundary

- No CI workflow or runner settings changed.
- No database or Auth project accessed.
- No test learner or OTP created/sent.
- No content, runtime, SQL, RLS, or grants changed.
- No deployment, PR, merge, or `main` update.


## CI completion addendum — verified 2026-11-18

After this static review was committed, workflow run [44257368596](https://github.com/avasinim/zanztkurd/actions/runs/44257368596) completed with conclusion **success** at `2026-11-18T07:19:08Z`.

All workflow steps completed successfully, including:

- Install Playwright browser tests
- Run north-circle browser regression tests

This confirms that the K127 synthetic browser suite, including the new Course 2 unauthenticated, unenrolled, sequence-denied, and mocked content-RLS-denied cases, passed in GitHub Actions. It does not convert the mocked fixtures into live Supabase Auth/RLS acceptance tests.
