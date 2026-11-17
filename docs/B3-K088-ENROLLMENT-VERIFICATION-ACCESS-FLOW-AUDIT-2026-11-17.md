# B3-K088 — Enrollment, Verification, and Protected Access Flow Audit

Date: 2026-11-17  
Branch: `fix/kurmanji-ci-current-migration`  
Scope: static repository review only; no live Supabase requests or production changes.

## Scope reviewed

- `auth.html`: email/password signup and login, phone OTP signup and login, OTP verification, recovery callback, and same-site `next` URL handling.
- `dashboard.html`: session requirement, email-or-phone verification state, enrollment display and enrollment RPC call.
- `learning.html`: course-scoped access gate, email-or-phone verification, and enrollment RPC check.
- `supabase/migrations/20261024122051_add_kurmanji_courses_and_protected_lessons.sql`: protected lesson and completion RPC definitions.
- Existing browser regression suite in `scripts/test_north_circle_ui.py`.

## Findings

1. **Email and phone verification are both represented in the browser access checks.** The dashboard derives its verified state from `email_confirmed_at || phone_confirmed_at`. The course-scoped learning gate rejects only when both values are absent.
2. **Phone OTP is wired through the expected client flow.** Phone login calls `signInWithOtp` with user creation disabled; phone registration requests OTP with user creation enabled and stores the supplied full name as user metadata; OTP submission calls `verifyOtp` with `type: 'sms'`.
3. **Protected lesson completion is guarded server-side.** The current migration's `complete_lesson` function requires an authenticated user and accepts either email or phone verification for non-owner users before applying the lesson-order and progress logic.
4. **Enrollment and access are separate checks.** The dashboard invokes `enroll_in_course`; the course-scoped learning route invokes `student_has_enrollment`. The Kurmanji lesson route and completion flow are covered by the existing static validators and browser tests.
5. **No new functional defect was established in this static review.** The reviewed browser checks consistently recognize email-or-phone verification. This audit does not prove live provider configuration, SMS delivery, production grants, or live database state.

## Existing regression coverage

The repository's browser suite includes a phone-verified learner opening a course-scoped learning route, a completion RPC/navigation test, and the protected Kurmanji lesson navigation and key checks. The latest verified CI run before this report is [44088113520](https://github.com/avasinim/zanztkurd/actions/runs/44088113520), which passed the then-current code revision. This documentation-only audit does not claim that run tested this report commit.

## Decision

No authentication policy, enrollment policy, lesson content, SQL migration, or application code was changed. A live Supabase verification pass would require an explicitly authorized test account/environment and must not be inferred from repository inspection.

## Change boundary

Only this audit report is added by K-088. No production database, migration, deployment, CI workflow definition, lesson content, or `main` branch change is included.
