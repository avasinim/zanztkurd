# B3-K127 — Course 2 protected-content denial regression coverage

Date: 2026-11-18  
Branch: `fix/kurmanji-ci-current-migration`  
Pre-work HEAD: `27bd06607b59512c7c49e365f9ec070110be1757`

## Scope

Extend the existing synthetic Playwright coverage for the North Circle Kurmanji Course 2 pathway. The change is limited to `scripts/test_north_circle_ui.py`. It does not alter lesson payloads, application runtime, SQL, RLS policies, Auth settings, CI workflow definitions, or deployment configuration.

## Added regression coverage

New test: `test_kurmanji_course2_denies_unauthenticated_unenrolled_and_locked_content`.

The test opens Course 2 lesson 2 under four isolated browser-fixture scenarios:

1. **Unauthenticated:** Auth returns no session; the page must redirect to sign-in, must not call access RPCs, and must not query `lesson_content`.
2. **Authenticated but unenrolled:** the enrollment check returns false; the page must redirect to the dashboard before querying protected content.
3. **Enrolled but out of sequence:** the server sequence check returns false; the page must redirect to the dashboard's locked-lesson flow before querying protected content.
4. **RLS/content denial:** enrollment and sequence checks pass, but the mocked `lesson_content` query returns a row-level-security error; the page must show the controlled Kurdish access error and must not render the sentinel private content.

Every scenario asserts the exact expected `lesson_content` query count. The three pre-query denial paths expect zero; the RLS-denied path expects one. The test also asserts that the private-content sentinel never appears.

## Test boundary and interpretation

These are synthetic local-browser tests. Supabase is stubbed and points to `example.invalid`; no live Supabase Auth, RLS policy, JWT, OTP, or learner account is exercised. The tests verify the browser's handling of the mocked outcomes, not the live provider configuration or production database behavior.

## CI

The push triggered GitHub Actions run [44257368596](https://github.com/avasinim/zanztkurd/actions/runs/44257368596) for commit `cfdaa0cc10dbf781250f08a32918ebe4ab5c66cb`.

At the time this report was authored, PostgreSQL SQL parsing, migration/seed parity validation, and Kurmanji lesson-page/key validation had completed successfully. Playwright browser installation was still in progress and the browser regression step had not yet started. The final workflow conclusion must be checked separately; this report does not claim a completed browser-test pass.

## Safety boundary

- No Supabase project was queried or written in this task.
- No real learner or disposable Auth account was created.
- No OTP was sent and no Auth provider configuration was changed.
- No lesson content, course catalog, SQL migration, RLS/grants, or application runtime was changed.
- No deployment, pull request, merge, or `main` update was performed.
