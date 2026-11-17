# B3-K098 — Protected Lesson Content Access Boundary Audit

- Date: 2026-11-17
- Repository: `avasinim/zanztkurd`
- Working branch: `fix/kurmanji-ci-current-migration`
- Starting HEAD: `3d9dd87a8c77e19df478d34c9f86dd694fcc5623`
- Test commit: `ad695cdfa744c44fd37e3c4e05e6d8e21063d72a`
- Protected `main`: `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`
- Scope: shared protected-lesson loader and page gate in `script.js`; current Kurmanji access/completion RPC migration; earlier `lesson_content` SELECT policy migrations; baseline schema; browser regression tests.
- Method: static repository review plus synthetic Playwright browser tests and the repository CI validators. No live Supabase, PostgREST, production lesson body, learner record or database catalog was accessed.

## Executive summary

The checked-in design uses layered access checks. The browser requires a session, checks owner status, checks enrollment for non-owners, and checks the requested lesson's sequence before loading lesson HTML. The content loader then selects `content_html` from `public.lesson_content`; errors and missing rows produce an error message rather than a successful lesson body.

The current Kurmanji SQL RPC includes explicit finite orders for 26 Course 1 lessons and 12 Course 2 lessons. It requires active/completed enrollment for non-owners, rejects unknown keys and requires the immediate predecessor's progress row for lessons after the first. The intended SELECT policy also requires owner status or enrollment plus the server-side access RPC.

**Production protection is not certified by source review alone.** The checked-in baseline does not create `public.lesson_content` or enable RLS on it. The policy migrations assume the relation already exists and create a named SELECT policy, but a policy is effective only when RLS is enabled and the effective policy/ACL set is correct. Additional permissive policies may broaden access. A read-only live metadata inspection remains necessary.

## Confirmed browser implementation

1. Protected lesson pages are classified by filename and hidden while the gate runs.
2. `getSession()` requires an authenticated session; absent session redirects to authentication.
3. The page gate calls `is_site_owner()`. A non-owner must pass `student_has_enrollment(course_id)`.
4. A non-owner must pass `can_read_lesson_content(course_id, lesson_key)` for lesson targets after the first lesson. The first lesson is allowed by the frontend sequence helper, while the subsequent content SELECT remains subject to database authorization.
5. `loadProtectedLessonContent()` selects only `content_html` from `lesson_content`, filtered by the shell's `data-lesson-key`.
6. A query error, missing row or exception inserts an error message instead of lesson HTML. The page may be shown with that error message, but the loader does not turn a failed read into a successful content result.
7. All 38 Kurmanji lesson shells (26 + 12) were previously inventoried in the protected-loader audit; they carry matching lesson keys and use the shared loader. This K098 review did not repeat the full 38-file inventory.

## Confirmed SQL design

### Access RPC

The latest Kurmanji migration replaces `public.can_read_lesson_content(text,text)` as a SECURITY DEFINER function with an empty fixed search path. For non-owners it:

- rejects a null Auth UID;
- requires an active or completed enrollment for the supplied course;
- builds the finite course order for phonetics (32), Kurmanji Course 1 (26), Kurmanji Course 2 (12), or the existing orthography sequence;
- rejects unknown course IDs and lesson keys;
- permits the first lesson;
- otherwise requires the immediately preceding lesson's `lesson_progress` row for the same user and course.

The migration revokes function execution from PUBLIC and anon and grants it to authenticated. The function retains the site-owner bypass.

### Content SELECT policy

The earlier migration `20261010091000_enforce_sequential_lesson_content_access.sql` drops and recreates the named policy `Enrolled users and owners can read lesson content`. Its SELECT condition permits:

- `is_site_owner()`; or
- an active/completed enrollment for the same user and course, plus `can_read_lesson_content(course_id, lesson_key)`.

The policy migration does not itself enable or force RLS on `lesson_content`. It also drops only the same-named policy; a differently named permissive policy created outside the checked-in migration history would not be removed by that statement.

## K098 browser regression coverage

Added `test_protected_lesson_content_requires_auth_enrollment_and_server_sequence` to `scripts/test_north_circle_ui.py`. It uses a synthetic Supabase client and exercises three cases against a second lesson:

1. **Not enrolled:** redirects before the browser requests lesson content.
2. **Server sequence denied:** redirects before the browser requests lesson content.
3. **Content SELECT denied:** the browser makes the expected content request, receives a simulated RLS denial, and renders an error instead of the synthetic private lesson body.

This test verifies frontend behavior with mocked RPC and PostgREST responses. It does not prove the live database's RLS configuration or actual Postgres policy behavior.

## CI result

GitHub Actions run [44100803470](https://github.com/avasinim/zanztkurd/actions/runs/44100803470) completed successfully on `ad695cdfa744c44fd37e3c4e05e6d8e21063d72a`.

- PostgreSQL parser validation: passed.
- Kurmanji migration/seed row parity: passed.
- Lesson page and seed-key validator: passed.
- Playwright browser regression suite: **8 tests passed**.

The initial test attempt exposed two fixture mistakes (using lesson 1, which is intentionally the first accessible lesson, and querying a shell after a blocked redirect). The fixture was corrected to test lesson 2 and to inspect the document safely after redirect. The successful CI run is on the corrected commit above.

## Findings and residual risks

### K098-F1 — Live RLS enablement and table provenance are not established

The checked-in `supabase/schema.sql` does not define `public.lesson_content` or enable RLS on it. The policy migrations assume the table exists. The repository therefore cannot prove that RLS is enabled or forced on the live relation.

**Risk:** If RLS is disabled, table privileges may allow a client role to read lesson rows directly, bypassing browser-side gates.

### K098-F2 — Effective live policy set and ACLs are unknown

The checked-in migration creates one named permissive SELECT policy and removes only an earlier policy with the same name. It cannot remove or enumerate differently named policies created manually or by another deployment path. Table-level SELECT grants and PostgREST exposure are also not established by the policy statement alone.

**Risk:** An additional permissive policy or broader grant could weaken the intended boundary. No evidence is presented that such a live policy or grant exists.

### K098-F3 — Browser checks are defense in depth, not the security boundary

The client can be modified or bypassed and the `lesson_content` table can be queried directly if a role has access. The database's RLS and ACL configuration must independently enforce the intended authorization.

### K098-F4 — Site owner has an intentional bypass

Both the browser and SQL access function allow the site owner to bypass enrollment and sequential lesson restrictions. This is an intentional owner workflow in the checked-in design; production correctness depends on the owner predicate and its grants being correct.

## Required next step (not performed)

With explicit authorization for a read-only production metadata inspection, verify metadata only:

1. `pg_class.relrowsecurity` and `relforcerowsecurity` for `public.lesson_content`;
2. every `pg_policies` / `pg_policy` entry, including permissive/restrictive status, command, roles and expressions;
3. effective SELECT/INSERT/UPDATE/DELETE table privileges for anon, authenticated, service_role and table owner;
4. deployed definitions and EXECUTE ACLs for `is_site_owner`, `student_has_enrollment`, `can_read_lesson_content` and `complete_lesson`;
5. migration ledger and relation owner.

Do not select lesson bodies, student records, enrollments or progress rows. Do not change production policies, grants, migrations or data during this verification.

## Change and backup record

- Added this audit report and one Playwright regression test only.
- No lesson content, lesson shell, application runtime, SQL migration, database, Storage, Auth setting, CI workflow definition, deployment or `main` change.
- CI run: `44100803470`, successful.
