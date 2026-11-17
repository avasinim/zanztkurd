# B3-K089 — Student Data Access and Privacy Surface Audit

Date: 2026-11-17  
Branch: `fix/kurmanji-ci-current-migration`  
Scope: static repository review only. No live database, Auth provider, or production configuration was queried.

## Files reviewed

- `supabase/schema.sql`: profile, enrollment, course and lesson-progress tables; RLS policies; enrollment helper functions; profile creation and student-number trigger.
- `dashboard.html`: profile read/update and student-facing enrollment/progress queries.
- `privacy.html`: currently published privacy-policy copy.
- Related protected-course migration and prior K-088 verification-flow findings.

## Confirmed controls in checked-in schema

1. **Profile rows are owner-scoped.** RLS is enabled on `profiles`; SELECT, INSERT and UPDATE policies require `auth.uid() = id`.
2. **Enrollment and progress reads are owner-scoped.** The baseline policies permit SELECT only where `auth.uid() = user_id`. No direct client INSERT/UPDATE policy is created for either table in this schema file.
3. **Completion writes are intended to be server-controlled.** The schema documents that progress is written through the SECURITY DEFINER completion RPC rather than direct client writes.
4. **Student number is system-managed.** A trigger overwrites an attempted changed value with the existing `student_number`; the dashboard also renders that field read-only.
5. **New profile rows are created from Auth metadata.** The trigger copies `full_name` from user metadata and generates a student number. This is a profile initialization mechanism, not proof that the metadata has been independently verified.

## Findings and limitations

- Dashboard profile updates are scoped to the current authenticated user's profile ID and update only `full_name` and `updated_at` from the browser. The client then updates Auth user metadata. The checked-in profile policies and trigger provide additional server-side restrictions.
- The privacy page is very brief. It broadly describes account, enrollment, progress and local browser data, but does not spell out retention/deletion periods, account/data deletion request steps, the identity of a privacy contact, or specific third-party processing details. This is a documentation completeness observation, not a legal compliance conclusion.
- `supabase/schema.sql` is a checked-in baseline. It cannot establish the exact current production policies, grants, function owners, Auth settings, backups, logs, or provider retention behavior. No live DB query was made.
- The student-number trigger is a protection against client-side edits in the represented schema; the actual production behavior depends on whether the corresponding trigger/function is deployed and active.

## Recommended follow-up decisions

1. Have the project owner confirm the intended data-retention periods and deletion/request process before adding concrete promises to the privacy page.
2. Identify the correct privacy contact channel and document the actual third-party services and data categories after checking the deployed configuration.
3. If an implementation-level privacy assurance is required, run a separately authorized live audit of deployed RLS policies, table grants, RPC privileges, triggers and Auth provider settings. Do not infer these from the repository baseline.

## Change boundary

K-089 is documentation-only. No profile policy, database schema, migration, user data, lesson content, application code, CI workflow, deployment or `main` branch was changed.
