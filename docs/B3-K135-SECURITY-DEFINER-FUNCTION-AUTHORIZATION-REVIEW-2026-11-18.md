# B3-K135 — SECURITY DEFINER Function Authorization Review (2026-11-18)

## Scope and safety

- Repository: `avasinim/zanztkurd`
- Work branch: `fix/kurmanji-ci-current-migration`
- Supabase target: isolated Test project `zanztkurd-kurmanji-test` (`juwsjljbdwyncicybwoq`) only.
- Production was not queried or modified.
- Read-only review of nine advisor-flagged functions, function ACLs, bodies, and authorization boundaries.
- No SQL writes, DDL, GRANT/REVOKE, migration, Auth operation, deployment, PR, merge, or main update.

## Starting point and backup

- Starting work-branch HEAD: `f483f51213c35f3f7cfeaf049a80bbfa07b3fe38`
- Main: `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`
- Pre-work backup: `backup/b3-k135-security-definer-function-review-before-2026-11-18` at `f483f51213c35f3f7cfeaf049a80bbfa07b3fe38`

## Current advisor result

The Test project's Supabase security advisor reported nine `SECURITY DEFINER` functions executable by `authenticated`. It separately reported leaked-password protection disabled; that Auth setting is outside this function-only review and was not changed.

All nine functions:
- are owned by `postgres`;
- set an empty fixed `search_path`;
- have explicit ACL entries for `postgres`, `authenticated`, and `service_role`;
- do not show `anon` or `PUBLIC` in the inspected function ACL.

The warning therefore means signed-in users can call privileged functions, not that anonymous users can call them or that every signed-in caller passes the function's internal authorization checks.

## Function-by-function findings

| Function | Intended caller/use | Authorization in body | Review |
|---|---|---|---|
| `admin_list_enrollments()` | Site-owner dashboard | Calls `is_site_owner()` and raises `NOT_SITE_OWNER` otherwise | Owner-gated; returns enrollment and account-identifying fields, so keep restricted |
| `admin_list_progress()` | Site-owner dashboard | Calls `is_site_owner()` and raises otherwise | Owner-gated; returns learner progress and account-identifying fields |
| `admin_list_users()` | Site-owner dashboard | Calls `is_site_owner()` and raises otherwise | Owner-gated; returns account/profile fields |
| `admin_set_enrollment_status(uuid,text,text)` | Site-owner enrollment management | Owner check, status allowlist, target enrollment existence check | Owner-gated write RPC |
| `can_read_lesson_content(text,text)` | Learner protected-lesson gate | Requires `auth.uid()`, owner bypass, otherwise active/completed enrollment and lesson sequence check | Learner-facing by design; sequence rule has the K131 immediate-predecessor limitation |
| `complete_lesson(text,text)` | Learner completion/progress | Requires authenticated UID, verified email/phone (owner exception), valid course/key, enrollment (owner exception), prerequisite check | Learner-facing write RPC by design; K131 identified a non-contiguous-progress edge case |
| `enroll_in_course(text)` | Learner self-enrollment | Requires UID, verified contact (owner exception), and an existing course; writes enrollment for `auth.uid()` | Learner-facing by design; review whether every published course should permit self-enrollment |
| `is_site_owner()` | Shared authorization helper | Checks `site_owners` membership and also contains a hard-coded email fallback | Callable by authenticated users; exposes only a boolean, but the fallback is a fragile identity source that should be retired in a controlled change |
| `student_has_enrollment(text)` | Learner enrollment helper | Checks enrollment where `user_id = auth.uid()` and status active/completed | Learner-facing by design; returns only a boolean |

## Important distinctions

### A. Admin RPCs

The four `admin_*` functions are not unrestricted simply because they are callable by `authenticated`. Each checks the shared owner helper before reading learner data or changing enrollment status. Their current ACLs do not include `anon` or `PUBLIC`.

Recommendation: retain signed-in execution only if the frontend requires it, and retain the in-function owner check as the authoritative authorization boundary. Do not replace these with broad table grants. Add regression tests that call each RPC as a normal enrolled learner and verify `NOT_SITE_OWNER`, plus a separate owner-positive test. Existing browser mocks are not live JWT/RLS tests.

### B. Learner RPCs

`can_read_lesson_content`, `complete_lesson`, `enroll_in_course`, and `student_has_enrollment` are part of learner workflows. Revoking authenticated execution wholesale would break lesson access, completion, enrollment, or the frontend's access checks. Their advisor warnings are expected consequences of using privileged functions as controlled API endpoints; each still needs careful body-level authorization and regression coverage.

### C. Two previously identified logic issues remain open

1. K131 found that `can_read_lesson_content` and `complete_lesson` check only the immediately preceding lesson, not the complete earlier prefix. In non-contiguous progress states, a later lesson may be accepted if its immediate predecessor exists while an earlier lesson is missing. Ordinary sequential completion prevents creating this state, but imported or manually repaired progress could expose it. A server-side prefix check and SQL regression cases are recommended. No change was made.
2. `is_site_owner()` combines the `site_owners` table with a hard-coded email fallback. Prefer a single database-managed owner membership source with carefully controlled table writes. Do not remove the fallback until the owner membership row and recovery procedure are verified, to avoid locking out the site owner.

### D. Self-enrollment scope

`enroll_in_course` checks that the requested course exists but does not itself distinguish public/self-enrollable courses from restricted courses. This may be intended for the current catalog. Before changing it, define course visibility/enrollment policy and add tests for public, unpublished, and restricted course cases. No assumption is made that this is currently exploitable.

## Recommended disposition

- Do not revoke authenticated execution from all nine functions.
- Keep the four admin functions owner-gated and add explicit negative-path tests for each.
- Keep learner RPCs available to authenticated users only where required by the learner UI; their bodies must remain the authorization boundary.
- Plan a separate, carefully verified change to remove the hard-coded owner identity fallback after confirming the owner row and recovery path.
- Plan a separate migration and regression suite for the K131 full-prefix progression rule.
- Decide whether all existing courses should be self-enrollable before changing `enroll_in_course`.
- Review leaked-password protection separately through Auth configuration; it was not changed in this task.

## Limitations

- This is a static function-definition and ACL review against the isolated Test database, not an execution test with real learner and owner JWTs.
- No disposable users, sign-in, OTP, or live RPC calls were performed.
- The advisor's nine warnings are not proof of a vulnerability; they identify privileged functions callable by signed-in users and require contextual review.

## Verification

- Nine advisor-flagged functions inspected.
- All nine definitions, owners, fixed search paths, and explicit ACLs inspected.
- No `anon` or `PUBLIC` execution grant appeared in the inspected function ACLs.
- No database state, Auth settings, lesson content, source code, or production resource was changed.
