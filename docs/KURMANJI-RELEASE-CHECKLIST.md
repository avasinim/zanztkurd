# Kurmanji release acceptance checklist

Scope: test branch `kurmanji-test-config` and Supabase test project only. Do not merge into production until every required check passes.

## Automated checks

- [x] 26 Course 1 lesson HTML pages are present.
- [x] 12 Course 2 lesson HTML pages are present.
- [x] Expected lesson keys are represented in the Kurmanji seed SQL package.
- [x] GitHub Actions package-integrity workflow passed (2026-10-24; see current run linked in the release audit).
- [x] Shared text-normalization script excludes `.lesson-content` text and attributes; validator checks this safeguard.
- [x] Latest catalog, navigation, and package validation workflows passed for the reconciled branch head (2026-10-24; see release audit links).
- [ ] Reconfirm in the currently designated isolated test Supabase project that the migration applies cleanly and yields 26 Course 1 and 12 Course 2 lesson-content rows, with no empty rows. (An earlier test-DB snapshot was reported on 2026-10-21; this checklist does not treat it as validation of the current reconciled migration.)

## Required browser acceptance checks

Use a dedicated test student account, not the site-owner account. Do not write the password into this checklist or into GitHub.

- [ ] Register a test student or sign in with an existing test student.
- [ ] Enroll in Kurmanji Course 1.
- [ ] Open lesson 1; verify content loads and is readable.
- [ ] Try opening lesson 2 before completing lesson 1; verify the gate returns the student to the first incomplete lesson.
- [ ] Complete lesson 1; verify the UI confirms success.
- [ ] Verify the student dashboard shows the updated progress.
- [ ] Refresh the page and sign in again; verify progress remains.
- [ ] Open lesson 2 after completing lesson 1; verify it is accessible.
- [ ] Repeat the same sequence for Kurmanji Course 2.
- [ ] Sign out and verify a protected lesson redirects to sign-in without exposing lesson content.
- [ ] Verify the owner account remains able to inspect lessons and that student progress is not mixed with owner progress.

## Security and release checks

- [ ] Confirm leaked-password protection is enabled in Supabase Auth settings.
- [ ] Review Supabase security-advisor warnings for SECURITY DEFINER RPCs; retain authenticated execution only where required by the application and validate authorization inside each function.
- [x] Tighten the student self-enrollment INSERT policy to require `status = 'active'` and `completed_at IS NULL` (test DB migration applied and policy verified).
- [ ] Verify RLS and enrollment checks using a student account.
- [ ] Confirm production database and production branch have not been changed by test-only migrations.
- [ ] Confirm no scientific lesson text or source-book examples were changed during technical testing.

## Release decision

Do not label the Kurmanji courses fully tested until the browser acceptance checks above are completed. Static integrity checks do not prove end-to-end authentication, enrollment, or sequential access behavior.
