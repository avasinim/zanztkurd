# B3-K090 — RPC Privilege and SECURITY DEFINER Audit

Date: 2026-11-17  
Branch: `fix/kurmanji-ci-current-migration`  
Scope: static review of checked-in Supabase migrations and schema only. No live database privileges or production settings were queried.

## RPCs reviewed

- Owner/admin RPCs: `admin_list_users()`, `admin_list_enrollments()`, `admin_list_progress()`, `admin_set_enrollment_status(uuid,text,text)`.
- Owner predicate: `is_site_owner()`.
- Student access helpers: `student_has_enrollment(text)`, `can_read_lesson_content(text,text)`.
- Enrollment and completion: `enroll_in_course(text)`, `complete_lesson(text,text)`.
- Trigger functions: `handle_new_user()`, `protect_student_number()`.

## Confirmed static safeguards

1. **Admin RPC bodies check the owner predicate.** Each of the four admin functions calls `public.is_site_owner()` and raises `NOT_SITE_OWNER` before returning or changing student data.
2. **Admin RPC execute grants are restricted.** The admin migration revokes all privileges from `PUBLIC` on all four functions and grants execute to `authenticated`. No explicit grant to `anon` for these four RPCs was found in the checked-in migration chain.
3. **Owner predicate is not public.** The later owner-predicate migration revokes all from `PUBLIC` and grants execute to `authenticated`. The function checks the `site_owners` mapping and the configured owner-email fallback.
4. **Student access RPCs are not anonymous endpoints.** The migration chain explicitly revokes `anon` execution from `can_read_lesson_content` and `student_has_enrollment`; the current Kurmanji migration also revokes `PUBLIC` and `anon` from the current lesson-read and completion RPCs before granting authenticated execution.
5. **SECURITY DEFINER functions set a search path.** The current lesson-read and completion RPCs use an empty search path and schema-qualified application objects. The admin and earlier enrollment helper functions set explicit schema search paths. Trigger functions are invoked by their database triggers in the checked-in schema.
6. **Server-side authorization is layered.** The admin RPCs perform their own owner check; the lesson RPCs validate authenticated identity, verification, enrollment and lesson order rather than relying solely on browser visibility.

## Hardening observations

- The admin and older helper functions use `SET search_path=public,auth` or `SET search_path=public`, rather than the empty search path used by the newest lesson RPCs. Their application table/function references are schema-qualified in the inspected definitions. This is a consistency-hardening opportunity, not evidence of an exploitable path in the deployed database.
- A repository audit cannot establish actual effective privileges, role memberships, object ownership, schema CREATE grants, or whether every migration has been applied in production.
- The owner-email fallback is part of the checked-in authorization design. Its continued appropriateness and the deployed `site_owners` rows require owner confirmation/live inspection; this audit did not access account records.
- `admin_set_enrollment_status` accepts `active` or `completed`; its status update does not itself validate lesson completion totals. This is an administrative override capability guarded by the owner predicate, not an ordinary student RPC. Whether the owner workflow should retain that override is a product/operations decision.

## Result

No proven privilege-escalation defect was established from the checked-in definitions. No code or grant changes were made. A production assurance requires a separately authorized read-only inspection of effective grants and deployed function definitions, followed by controlled disposable-database tests before any hardening migration is proposed.

## Change boundary

K-090 adds this audit report only. No SQL migration, schema, student data, lesson content, application code, CI workflow, deployment, or `main` branch was changed.
