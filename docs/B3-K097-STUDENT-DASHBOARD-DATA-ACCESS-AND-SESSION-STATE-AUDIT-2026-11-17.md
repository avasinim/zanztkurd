# B3-K097 — Student Dashboard Data Access and Session-State Audit

- Date: 2026-11-17
- Repository: `avasinim/zanztkurd`
- Working branch: `fix/kurmanji-ci-current-migration`
- Starting HEAD: `8506026d328ce17a197c0fdbb24b735b67e227c9`
- Protected `main`: `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`
- Scope: static review of `dashboard.html`, `auth.html`, `script.js`, `supabase/schema.sql`, selected admin and Kurmanji migrations, and relevant prior audit context.
- Method: checked-in source and migration review only. No live database, Auth configuration, browser session, or production data was accessed.

## Executive summary

The dashboard retrieves the signed-in user's profile, enrollments and lesson progress using queries filtered by the current Auth user ID. The checked-in baseline RLS policies for profiles, enrollments and lesson progress also scope access to `auth.uid()`. Admin reporting functions are separately guarded by `is_site_owner()` in their SQL bodies.

No cross-student data exposure path was established in the reviewed code. However, several robustness and privacy improvements remain: profile-query errors are silently ignored, the verification notice is email-centric despite phone OTP being supported, and browser-local course progress keys are not explicitly cleared at sign-out. These are not proof of a production authorization bypass.

## Confirmed implementation

1. `dashboard.html` requires an Auth session; without one it redirects to `auth.html?next=dashboard.html`.
2. The dashboard reads the current user's email from the Auth session and reads `full_name, student_number` from `profiles` using `.eq('id', user.id)`.
3. The profile form updates only `full_name` for `userId()`, then updates the Auth user's `full_name` metadata. The student number input is readonly.
4. Enrollment queries filter on `user_id = user.id`; progress queries also filter on `user_id = user.id` and the selected course ID.
5. The checked-in baseline schema enables RLS and defines own-row SELECT policies for `profiles`, `enrollments` and `lesson_progress`. Profile INSERT/UPDATE policies are also limited to `auth.uid() = id`.
6. Dashboard course enrollment uses `enroll_in_course`; it does not directly insert an enrollment row from the browser.
7. The admin reporting migration's list/update functions call `is_site_owner()` before returning or changing student-related data. Their execute grants are for authenticated users, with the owner check inside the functions.
8. `auth.html` supports both email/password and phone OTP registration/login. Dashboard verification checks either `email_confirmed_at` or `phone_confirmed_at`.
9. The dashboard's sign-out action calls `sb.auth.signOut()` and navigates to `auth.html`.
10. `script.js` keeps some course completion snapshots in browser `localStorage`. The shared sync helper reads the signed-in user's server-side `lesson_progress` and replaces the corresponding local snapshot; on query failure it clears that course's local cache rather than trusting stale completion data.

## Findings

### K097-F1 — Profile read errors are not surfaced

The dashboard destructures `data` from the profile query but does not inspect its `error`. A failed read is treated like a missing profile and the page silently falls back to Auth metadata or blank values.

**Impact:** A transient permission/network/schema error can look like a learner has no profile or student number. This is primarily a support and data-integrity/diagnostics issue, not evidence of cross-user access.

### K097-F2 — Verification messaging is email-specific despite phone OTP support

The dashboard correctly treats either confirmed email or confirmed phone as verified. However, the verification notice heading and explanatory copy refer to email, and its resend action calls the email resend flow using `currentUser.email`. A phone-only unverified account may not have an email address to resend to.

**Impact:** Learners using phone OTP may receive an irrelevant verification instruction or a failed resend action if the phone account is not yet verified. The access decision itself checks both verification fields.

### K097-F3 — App-owned local progress keys are not cleared on sign-out

The sign-out handler calls Supabase `signOut()`, but does not explicitly clear the app's course-progress `localStorage` keys. The sync helper normally replaces local completion snapshots from the currently signed-in user's server rows and clears the cache on read failure.

**Impact:** On a shared browser, old course-progress values can remain locally between sessions until a relevant course page runs its sync. The reviewed helper reduces the risk of stale progress being treated as authoritative, but a clear-on-sign-out policy and user-scoped cache keys would be more robust. This review did not establish that another user can read the previous learner's server-side records.

### K097-F4 — Live RLS and Auth configuration remain unverified

The repository baseline and checked-in migrations show own-row policies and server-side owner checks, but they do not prove the current live database has exactly those policies, grants, function definitions, or Auth settings.

**Impact:** A production assurance conclusion requires an explicitly authorized read-only live inspection. No claim is made that the live database is configured correctly or incorrectly.

## Positive controls observed

- Dashboard queries use the authenticated user's ID rather than accepting an arbitrary student ID from the URL.
- Profile, enrollment and progress reads are additionally constrained by the checked-in RLS baseline.
- Profile update targets the current user's own ID; student number is readonly in the UI and generated/protected by the checked-in database design.
- Enrollment and lesson completion use server-side RPCs rather than trusting browser-side writes.
- Admin data functions include independent owner checks; the admin page's visual gate is not the only checked-in authorization layer.
- Kurmanji progress sync refuses to trust stale local cache when the server query fails.

## Recommended next steps (not applied)

1. Handle and display profile-query errors distinctly from a genuinely missing profile.
2. Make verification guidance channel-aware: email resend for email identities and a clear phone OTP retry/restart flow for phone identities.
3. Clear app-owned progress cache keys on sign-out, or namespace local keys by Auth user ID; retain server progress as the authoritative source.
4. Add regression tests for phone-only unverified accounts, profile read failures, sign-out cache cleanup, and switching between two accounts in the same browser.
5. With explicit authorization, inspect live RLS policies, grants, RPC definitions, Auth verification settings and session behavior before making any production-security claim.

## Limitations and change record

- Static source review only; no live Supabase or production user data accessed.
- No application code, lesson content, SQL schema/migrations, database, Storage, Auth settings, CI workflow, deployment, or `main` changed.
- Documentation-only audit. CI was not run.
