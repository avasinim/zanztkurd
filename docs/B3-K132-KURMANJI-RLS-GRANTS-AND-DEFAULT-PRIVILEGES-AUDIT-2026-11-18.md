# B3-K132 — Kurmanji RLS, table grants, and function execution audit

Date: 2026-11-18  
Branch: `fix/kurmanji-ci-current-migration`  
Pre-audit HEAD: `1323347f3848b872edb13371a9dd1ae4c21afc1e`  
Database: isolated test project `zanztkurd-kurmanji-test` (`juwsjljbdwyncicybwoq`)  
Method: read-only catalog and function-definition queries.

## Scope and exclusions

Reviewed RLS state/policies, effective table privileges, selected SECURITY DEFINER function definitions and execute grants, and schema-level default privileges. No production project was queried. No SQL writes, migration, grants, policy changes, Auth operations, or application edits were performed.

## 1. RLS policies and effective table access

All six reviewed tables have RLS enabled: `courses`, `enrollments`, `lesson_content`, `lesson_progress`, `profiles`, and `site_owners`. All are owned by `postgres`; `FORCE ROW LEVEL SECURITY` is false.

- `courses`: anonymous SELECT is granted and the public-read policy has `USING (true)`. This is consistent with a public course catalogue. Authenticated write policies require `is_site_owner()`.
- `lesson_content`: authenticated SELECT policy requires site-owner status or active/completed enrollment plus `can_read_lesson_content(course_id, lesson_key)`. INSERT/UPDATE/DELETE policies are owner-only.
- `lesson_progress`: authenticated SELECT is limited to the caller's `user_id` or site owner; write policies are owner-only. Normal learner progress writes therefore rely on the SECURITY DEFINER `complete_lesson` RPC.
- `enrollments`: authenticated SELECT is limited to the caller's row or site owner; write policies are owner-only. Learner enrolment creation relies on `enroll_in_course`.
- `profiles`: authenticated SELECT and UPDATE are limited to the caller's own profile. No INSERT or DELETE policy was found.
- `site_owners`: authenticated SELECT is limited to the caller's row or site owner; writes are owner-only.

RLS filters rows but does not replace table privileges. The reviewed application tables grant authenticated broad table-level DML privileges in several cases; the corresponding RLS policies currently constrain the rows/actions. For example, authenticated has table-level INSERT/UPDATE/DELETE on `lesson_content`, but the applicable RLS write policies require owner status. This is not evidence that ordinary learners can write those rows, but it makes policy correctness a critical control.

Effective anonymous table privileges were checked across all public base tables in this project: only `courses` has an anonymous privilege, SELECT. Anonymous has no SELECT/INSERT/UPDATE/DELETE privilege on `lesson_content`, `lesson_progress`, `enrollments`, `profiles`, or `site_owners`.

## 2. Function execution boundary

The five reviewed functions — `complete_lesson`, `can_read_lesson_content`, `enroll_in_course`, `is_site_owner`, and `student_has_enrollment` — are SECURITY DEFINER, owned by `postgres`, and set an empty `search_path`.

Effective EXECUTE checks returned:
- `authenticated`: EXECUTE allowed on all five.
- `anon`: EXECUTE denied on all five.
- `PUBLIC`: EXECUTE denied on all five.

The function bodies inspected include explicit `auth.uid()` checks in `complete_lesson`, `can_read_lesson_content`, and `enroll_in_course`. The latter also checks verification (except site owner), course existence, and uses the authenticated UID for enrollment rows. SECURITY DEFINER remains a privileged design requiring continued review; the current findings do not justify removing it without redesigning the protected write/read paths.

## 3. High-priority configuration finding: broad default privileges

The test project's `pg_default_acl` contains default privileges in schema `public` for both `postgres` and `supabase_admin`:

- New tables (`defaclobjtype = r`): `anon` and `authenticated` receive broad `arwdDxtm` privileges by default.
- New functions (`defaclobjtype = f`): `anon` and `authenticated` receive EXECUTE by default.
- New sequences (`defaclobjtype = S`): `anon` and `authenticated` receive broad sequence privileges by default.

This is a forward-looking exposure risk: it does not mean every existing table/function is currently open. The effective privilege checks above show that, among current public base tables, only `courses` has anonymous SELECT, and none of the five reviewed functions is executable by anon or PUBLIC. However, a future object created by either affected owner in `public` could inherit overly broad access unless its grants and RLS are explicitly corrected. In particular, default table privileges do not automatically enable RLS.

### Recommended remediation (not applied)

Prepare a narrowly scoped default-privilege hardening migration for the affected object owners and schema:
1. Revoke default table privileges from `anon`; grant only deliberate future privileges to `authenticated` where needed.
2. Revoke default sequence privileges from `anon` and `authenticated` unless a documented use case requires them.
3. Revoke default function EXECUTE from `anon` and `authenticated`; explicitly grant EXECUTE per function to intended roles.
4. Preserve current explicit public course-catalogue SELECT and the existing intentional RPC grants.
5. Validate the migration on a disposable/test branch and inspect effective privileges plus RLS for every object affected.

Do not apply a broad `REVOKE` blindly: default privileges are owner-specific, and existing objects retain their own grants. Confirm the intended schema/API behavior and all migration-created objects first. This report does not authorize a migration or production changes.

## 4. Decision and next steps

The existing table-level RLS model and function EXECUTE boundaries appear internally consistent for the reviewed objects: anon is limited to course catalogue SELECT; authenticated learner reads are row-gated; write paths are routed through owner policies or authenticated RPCs. The principal hardening opportunity is the permissive default-privilege configuration, not an observed anonymous read of learner content.

Next safe step: inventory all public-schema objects and their explicit grants, trace which migration establishes each default ACL, then prepare a test-only hardening plan. No database changes should be made until the exact change set and test target are confirmed.

## Safety record

- Production database: not accessed.
- Test database: read-only catalog/function queries only.
- No migration created or applied.
- No GRANT/REVOKE, RLS, function, or policy changes.
- No Auth users or OTPs created.
- No lesson content or frontend code changed.
- No CI workflow, deployment, PR, merge, or `main` update.
