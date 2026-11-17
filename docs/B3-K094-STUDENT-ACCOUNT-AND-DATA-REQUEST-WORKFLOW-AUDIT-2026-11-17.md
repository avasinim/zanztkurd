# B3-K094 — Student Account and Data-Request Workflow Audit

- Date: 2026-11-17
- Repository: `avasinim/zanztkurd`
- Working branch: `fix/kurmanji-ci-current-migration`
- Starting HEAD: `3223078d696453be2754922813a0abf67296399c`
- Protected `main`: `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`
- Scope: static inspection of `auth.html`, `dashboard.html`, `privacy.html`, `terms.html`, `admin.html`, `supabase/schema.sql`, and relevant checked-in SQL/migration references.
- Method: source review only. No live Supabase query or account data access.

## Executive summary

The current application supports sign-in, sign-up, email/phone verification, password recovery and profile-name editing. The reviewed source does not expose a student self-service account deletion, data export, privacy request submission, or account closure workflow. This is a repository-level finding, not proof that an operator cannot handle requests manually outside the application.

## Confirmed current flows

1. `auth.html` supports email/password registration and login, phone OTP registration/login, email verification resend, and password recovery using `resetPasswordForEmail` followed by `updateUser({password})`.
2. `dashboard.html` reads the signed-in user's profile and allows updating `profiles.full_name`. It does not expose an email/phone change workflow or account deletion control in the reviewed page.
3. Student number is displayed read-only in the dashboard; the checked-in schema/trigger generates it on profile creation.
4. Student can sign out. Sign-out is not account deletion.
5. The schema links `profiles.id`, `enrollments.user_id`, and `lesson_progress.user_id` to `auth.users` with `ON DELETE CASCADE`. This describes database referential behavior if the Auth user row is deleted; it is not itself a user-facing deletion request process, confirmation, identity check, audit workflow, or guarantee covering Storage/backups/logs/third-party systems.
6. The admin interface can view student, enrollment and progress information under owner authorization. No reviewed admin UI action deletes an Auth account or initiates a student data export.
7. Privacy/terms pages provide general information but no defined privacy request form or step-by-step access/correction/deletion instructions.

## Findings

### K094-F1 — No self-service account deletion identified
No account deletion control or client-side deletion workflow was identified in the reviewed student pages. The browser uses the public Supabase client; no secure server-side administrative deletion endpoint was found in the reviewed files.

**Impact:** A student cannot determine from the application how to close/delete their account.

### K094-F2 — No documented manual request channel/process
The site has a general contact email, but the privacy notice does not define it as a privacy-request channel or specify required information, identity verification, response timeline, appeal/escalation or request tracking.

**Impact:** Requests may be handled inconsistently and users lack clear expectations.

### K094-F3 — No export/access workflow identified
No student-facing export/download of profile, enrollment or lesson-progress data was identified in the reviewed dashboard/auth pages.

### K094-F4 — Profile correction is limited
The dashboard supports changing `full_name`, but not a broader correction workflow for email, phone, or other identity/account data. Student number is intentionally read-only in the interface and protected/generated in the schema.

### K094-F5 — Cascade behavior is not a complete deletion policy
Foreign-key cascades cover the checked-in profile, enrollment and progress relations when an Auth user is actually deleted. The repository does not establish whether related Storage objects, logs, backups, provider-side records or external copies are covered by the same action.

### K094-F6 — No deletion authorization/audit workflow identified
No reviewed endpoint records a verified deletion request, checks request ownership, requires a second confirmation, handles pending course/payment/legal holds, or records a minimal audit outcome. This is an absence in reviewed source, not a claim about manual operator practice.

## Recommended next steps (not applied)

1. Publish a dedicated privacy request route using the site's confirmed contact channel, with a clear process for access, correction, export and deletion requests.
2. Decide and document an identity-verification method that does not ask users to send passwords or OTP codes to staff.
3. If self-service deletion is desired, implement it through a server-side, owner-verified workflow using privileged credentials only on the server; never expose a service-role key in browser code.
4. Before deletion, define treatment of profile, enrollments, lesson progress, feedback, library uploads, logs, backups and third-party provider data. Decide whether progress should be deleted, anonymized or retained under a documented lawful basis.
5. Provide a confirmation step and clear irreversible-action warning; record request status without retaining unnecessary personal data.
6. Define response targets, exceptions, and a user-facing completion notice.
7. Have the process and wording reviewed for applicable jurisdictions before launch.

## Limitations

- Static source review only; no live Auth users, database rows, Storage objects, logs, provider settings or support inbox were inspected.
- The checked-in schema is not proof of current production schema or provider-side deletion/backup behavior.
- No actual student account was created, modified or deleted.
- This is not legal advice or a compliance determination.

## Change and safety record

- Documentation-only audit.
- No app code, lesson content, SQL schema/migrations, database, Storage, Auth settings, CI workflow, deployment, or `main` changes.
- CI was not run for this documentation-only audit.
