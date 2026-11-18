# B3-K115 — Kurmanji Authenticated Learner Flow and Test-Project Access Audit

**Date:** 2026-11-18  
**Scope:** Read-only review of repository auth/enrollment/lesson flows and live metadata/function definitions in the isolated test Supabase project. No users were created, no sign-in or SMS was attempted, no RPC was invoked as a learner, and no database write was made.

## Repository and backup boundary

- Repository: `avasinim/zanztkurd`
- Working branch: `fix/kurmanji-ci-current-migration`
- Starting HEAD: `5bb061a6fe70e3aab14730ffd0ba7fcd53de48ff`
- Main at audit start: `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`
- Pre-work backup: `backup/b3-k115-authenticated-learner-flow-audit-before-2026-11-18`
- Pre-work backup SHA: `5bb061a6fe70e3aab14730ffd0ba7fcd53de48ff`

## 1. Authentication source review

`auth.html` contains:
- Email/password sign-in through `signInWithPassword`.
- Email registration through `signUp`, with a verification callback.
- Phone sign-in and registration through OTP, followed by `verifyOtp(type: 'sms')`.
- Password recovery through `resetPasswordForEmail` and `updateUser`.
- Same-origin, same-site validation for the `next` redirect target.

The source supports both email and phone verification in the access checks reviewed. This does not prove that the test project's email provider or SMS provider is configured, that a message is delivered, or that a real account can complete verification.

## 2. Kurmanji lesson access and completion source review

The Kurmanji lesson pages load the shared `script.js` runtime. Its protected-page gate:
1. Hides the lesson page while access is being checked.
2. Requires an authenticated session.
3. Checks the site-owner predicate or an active/completed enrollment for the exact Kurmanji course ID.
4. For lessons after the first, asks `can_read_lesson_content` whether the current lesson is readable.
5. Loads `lesson_content.content_html` only after those checks.
6. Shows an error rather than lesson content if the content request is denied or fails.

Course identifiers and ordered keys are explicitly mapped:
- Course 1: `kurmanji-course-1`, 26 lesson keys.
- Course 2: `kurmanji-course-2`, 12 lesson keys.

The Kurmanji completion control calls `complete_lesson` with the course ID and current lesson filename. The local completion cache is refreshed from server-side `lesson_progress` before the sequential gate is evaluated. The SQL RPC remains authoritative: it checks authenticated identity, verification, enrollment, valid course/key, and predecessor completion before recording progress.

The separate generic `lesson.html` runtime maps its legacy page paths to the older orthography/phonetics IDs. That is not the entry point used by the Kurmanji lesson HTML files, which use the Kurmanji-specific shared `script.js` path. No change was made to the generic runtime.

## 3. Test-project database metadata

Target: `zanztkurd-kurmanji-test` (`juwsjljbdwyncicybwoq`), status `ACTIVE_HEALTHY`.

Read-only PostgreSQL metadata inspection found:

- `public.lesson_content` exists and RLS is enabled.
- `FORCE ROW LEVEL SECURITY` is false; relation owner is `postgres`.
- Four policies are present: one authenticated SELECT policy requiring owner or enrolled access plus the server sequence check, and owner-only INSERT, UPDATE, and DELETE policies.
- The relation grants SELECT/INSERT/UPDATE/DELETE to `authenticated`; row access remains governed by the listed RLS policies. No `anon` table grant was returned.
- The five inspected RPCs exist: `is_site_owner`, `student_has_enrollment`, `can_read_lesson_content`, `complete_lesson`, and `enroll_in_course`.
- Each inspected RPC is SECURITY DEFINER with an empty fixed search_path.
- EXECUTE is granted to `authenticated`; the inspected functions do not have EXECUTE via `PUBLIC` or `anon`.
- The live test definitions include the two Kurmanji course IDs and their 26/12 lesson sequences. `complete_lesson` checks verification, enrollment, and prior-lesson completion for non-owner learners.

These are metadata and function-definition findings, not proof that a particular learner token or direct API request succeeds or is denied at runtime.

## 4. Existing browser-test coverage and its limits

The repository's Playwright tests include:
- navigation to the two Kurmanji course plans;
- rejection of an unknown Kurmanji lesson key before content is requested;
- a synthetic phone-verified learner route check;
- Course 1 lesson 1 completion with an asserted `complete_lesson` payload and navigation to lesson 2;
- synthetic unauthenticated/enrollment/sequence/content-denial cases for Course 1 lesson 2.

The relevant test fixtures replace Supabase Auth, RPCs, and PostgREST responses with synthetic JavaScript objects. They are useful frontend regression tests, but they do not authenticate against the live test project, exercise actual RLS through a learner JWT, send OTP, or persist a real learner's progress.

Course 2 has source-level sequence and RPC coverage in the shared runtime and SQL function definitions, but the inspected browser suite does not contain an equivalent Course 2 live learner journey. No actual authenticated learner acceptance test was run during K115.

## 5. Release-readiness decision

**Source and test-project metadata: structurally aligned. Real learner acceptance: still unverified.**

The next safe acceptance test needs explicit permission to create disposable synthetic learner accounts in the test project and use its Auth/OTP provider. It should test, at minimum:
1. verified learner enrollment in Course 1;
2. Course 1 lesson 1 load and server completion;
3. Course 1 lesson 2 unlock only after lesson 1 completion;
4. Course 2 enrollment and its independent lesson 1 → 2 progression;
5. cross-course isolation and refresh/re-login persistence;
6. direct content requests for unenrolled and out-of-sequence learners.

Do not use production identities, real student records, or production project credentials. Do not claim SMS delivery until it is observed. The migration-ledger version discrepancy recorded in K113/K114 remains unresolved and is outside this audit.

## Change and safety boundary

This K115 change adds this report only. No application code, lesson text, SQL migration, Auth provider setting, RLS policy, grant, database row, Storage object, CI workflow, deployment, PR, merge, or `main` branch was changed. No synthetic users were created. No live learner session was used.
