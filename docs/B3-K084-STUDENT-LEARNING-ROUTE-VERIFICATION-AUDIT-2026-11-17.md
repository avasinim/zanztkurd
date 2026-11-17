# B3-K084 — Student Learning Route and Verification Consistency
Date: 2026-11-17
Repository: `avasinim/zanztkurd`
Working branch: `fix/kurmanji-ci-current-migration`
Final implementation HEAD before this report: `60bc94dec40933316a3138cb5b2a6558176cf5c6`
Main baseline: `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`

## Finding
The course-scoped learning portal gate in `learning.html` required `session.user.email_confirmed_at` to be truthy. Elsewhere in the same student journey, the dashboard and enrollment/completion server functions accept either email verification or phone verification. The authentication page also exposes a phone OTP flow. As a result, a learner with a verified phone and no verified email could be accepted by the enrollment and completion backend but redirected from `learning.html?course=1` or `?course=2` to the email-verification notice.

## Change
Updated the learning portal gate to require neither verification field to be present before redirecting:
`!session.user.email_confirmed_at && !session.user.phone_confirmed_at`.
This now matches the dashboard and server-side verification contract. No course IDs, course visibility, lesson text, sequence rules, SQL, or database state were changed.

Added a Playwright browser regression test:
`test_phone_verified_student_can_open_course_scoped_learning_route`.
The test uses a synthetic phone-verified learner, a stubbed Supabase client, and an enrolled response; it verifies the learner remains on the course-scoped learning route rather than being sent to `verify=required`.

## Validation
GitHub Actions run: https://github.com/avasinim/zanztkurd/actions/runs/44086745319
- PostgreSQL migration/seed SQL parsing: passed
- Exact migration and seed row parity: passed
- Kurmanji lesson page and seed-key validation: passed
- Playwright browser regression suite, including the new phone-verification case: passed
- Overall workflow conclusion: `success`

The preceding run for the learning-gate-only commit also passed: https://github.com/avasinim/zanztkurd/actions/runs/44086738805.

## Safety and limitations
- Work remained on `fix/kurmanji-ci-current-migration`.
- No lesson content, SQL migrations, production database, deployment, CI workflow, or `main` branch was changed.
- This is a code and browser-test validation, not a live production Supabase account test. It does not independently confirm any actual user's phone verification or enrollment state.
