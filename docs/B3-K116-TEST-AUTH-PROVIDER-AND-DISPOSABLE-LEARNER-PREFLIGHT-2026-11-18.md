# B3-K116 — Test Auth Provider and Disposable Learner Preflight

**Date:** 2026-11-18  
**Scope:** Read-only preparation for a real learner acceptance test in the isolated Kurmanji test project. No account was created, no OTP was sent, no sign-in was attempted, and no Auth provider setting or database record was changed.

## Repository and backup boundary

- Repository: `avasinim/zanztkurd`
- Working branch: `fix/kurmanji-ci-current-migration`
- Starting HEAD: `1b6e9f7d6e58916208fc1b903f786c419c95626e`
- Main at audit start: `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`
- Pre-work backup: `backup/b3-k116-auth-provider-preflight-before-2026-11-18`
- Pre-work backup SHA: `1b6e9f7d6e58916208fc1b903f786c419c95626e`

## 1. Test project status

- Project: `zanztkurd-kurmanji-test`
- Project ID: `juwsjljbdwyncicybwoq`
- Status: `ACTIVE_HEALTHY`
- PostgreSQL: `17.11.0.003`

The production project was not accessed for this preflight.

## 2. Aggregate Auth account state

A read-only aggregate query against `auth.users` returned:

| Aggregate | Count |
|---|---:|
| Total Auth users | 4 |
| Email verified | 4 |
| Phone verified | 0 |
| Both email and phone verified | 0 |
| Neither email nor phone verified | 0 |

No email addresses, phone numbers, user IDs, names, or metadata were selected or recorded. The four existing users are not assumed to be disposable test identities; no attempt was made to identify or reuse them.

## 3. Application Auth flow inspection

The current `auth.html` source provides:
- Email/password sign-in.
- Email registration with an email verification callback.
- Phone OTP sign-in with `shouldCreateUser: false`.
- Phone OTP registration with `shouldCreateUser: true` and a `full_name` user metadata value.
- SMS OTP verification via `verifyOtp({ phone, token, type: 'sms' })`.
- Password recovery and update.
- A same-origin / same-site check for the `next` redirect.

The source code demonstrates the intended client flow only. It does not expose the project's active Auth provider settings, delivery provider credentials, SMS sender configuration, email templates, rate limits, or delivery health.

## 4. Remaining unknowns before a real OTP run

The available Supabase project/database tools do not provide a verified read-only view of the Auth provider configuration or message-provider delivery configuration for this project. Therefore the following are **not verified**:
- Whether Phone provider is enabled for this test project.
- Whether an SMS provider is configured and operational.
- Whether test phone-number / OTP shortcuts are configured.
- Whether email confirmations and redirects are configured as intended.
- Whether an OTP message can actually be delivered.

The four existing Auth users are email-verified; none is phone-verified. This is an aggregate snapshot only, not evidence that email delivery or SMS delivery currently works.

## 5. Safe acceptance-test plan

When a disposable identity is explicitly authorized and the provider settings are confirmed, run the acceptance test only in this test project:
1. Create a clearly labeled disposable learner using a dedicated test mailbox or test phone number controlled by the project owner.
2. Verify the identity using the configured provider; record only pass/fail and a non-sensitive test label.
3. Enroll in Course 1 and confirm lesson 1 access.
4. Complete lesson 1 through the real `complete_lesson` RPC; confirm lesson 2 unlocks after server persistence.
5. Repeat independently for Course 2.
6. Confirm direct out-of-sequence and cross-course access is denied.
7. Refresh and re-authenticate; verify the learner's progress persists.
8. Delete the disposable account only after confirming its test-only scope and revoking/signing out sessions as appropriate. Account deletion must not be assumed to invalidate already-issued JWTs.

No real student identity, production credential, or production database is to be used.

## Outcome

The test project is healthy and contains four existing email-verified Auth users and no phone-verified users. The app has an SMS OTP client flow, but provider enablement and actual delivery remain unknown. K116 therefore stops at a read-only preflight and does not create an account or send an OTP.

## Change and safety boundary

This commit adds this report only. No app code, lesson content, SQL migration, database row, Auth user, provider setting, RLS policy, grant, Storage object, CI workflow, deployment, PR, merge, or `main` update was made.
