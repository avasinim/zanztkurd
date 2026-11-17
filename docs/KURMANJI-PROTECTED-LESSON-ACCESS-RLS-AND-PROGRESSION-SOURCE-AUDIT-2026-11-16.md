# Kurmanji protected lesson access, RLS and progression source audit — 2026-11-16

## Scope and safety

Read-only source review on `fix/kurmanji-ci-current-migration`. This document records what the repository source declares; it does **not** certify the live Supabase project or migration ledger.

Reviewed:
- `supabase/schema.sql`
- `supabase/migrations/20261007160000_change_owner_email.sql`
- `supabase/migrations/20261010090000_align_lesson_content_owner_rls.sql`
- `supabase/migrations/20261010091000_enforce_sequential_lesson_content_access.sql`
- `supabase/migrations/20261010073609_restrict_anon_lesson_access_rpc.sql`
- `supabase/migrations/20261024122051_add_kurmanji_courses_and_protected_lessons.sql`
- `script.js`

No production or preview database was queried. No Supabase connector, SQL execution, migration, test, deployment, CI change, lesson edit, or source-code edit was performed. No claim is made that the inspected migration files have all been applied to the live database.

## Source-level conclusion

The checked-in source describes a coherent two-layer access model for the Kurmanji lessons:

1. Browser-side gate requires a signed-in session, checks owner status, checks enrollment for non-owners, asks the server-side progression RPC before opening later lessons, and only then fetches `lesson_content.content_html`.
2. Database RLS restricts `lesson_content` SELECT to authenticated users who are either the site owner or enrolled in the matching course and permitted by `can_read_lesson_content`.
3. `can_read_lesson_content` defines the 26-key Course 1 sequence and 12-key Course 2 sequence and requires the immediate predecessor to exist in the authenticated user's `lesson_progress`.
4. `complete_lesson` independently validates the requested course/key, enrollment (except owner), prior lesson (except owner in Kurmanji), writes progress with a composite-key upsert, and counts completion against the configured course total.

This is a source-level positive finding only. It does not prove that the production database has the same functions, policies, grants, tables, course rows, or migration history.

## Findings

### 1. Course inventory and key construction align

The 2026-10-24 Kurmanji migration inserts:
- `kurmanji-course-1`, total 26
- `kurmanji-course-2`, total 12

The same migration inserts the protected lesson content using the key pattern:
- `kurmanji-course-1-lesson-01.html` … `kurmanji-course-1-lesson-26.html`
- `kurmanji-course-2-lesson-01.html` … `kurmanji-course-2-lesson-12.html`

The SQL functions generate those exact ordered key patterns with `generate_series`. The browser's `courseIdForTarget`, `lessonOrderFor`, and Kurmanji completion configuration construct the same 26- and 12-key patterns. The content loader selects by the lesson key; the RLS policy evaluates the course and lesson key from the protected row.

### 2. Protected content read path

In `script.js`, the destination page gate:
- redirects unauthenticated visitors to the authentication flow;
- obtains the current owner status;
- determines the course ID from the lesson filename;
- redirects non-enrolled learners to the dashboard with the exact course ID;
- calls `can_read_lesson_content` for later lessons;
- calls the protected `lesson_content` SELECT only after those checks;
- leaves the document hidden until the gate resolves, then displays the fetched content or an error state.

The authoritative protection is not the browser redirect: the table's RLS policy is the actual database boundary. The policy is scoped to the `authenticated` role and permits a row only for the owner or for a user with an `active`/`completed` enrollment in that row's course and a successful `can_read_lesson_content` result.

### 3. Sequential read enforcement

The 2026-10-24 migration defines `public.can_read_lesson_content(text,text)` as `STABLE SECURITY DEFINER` with an empty search path. It:
- rejects a null `auth.uid()`;
- allows the registered site owner;
- checks an active/completed enrollment for non-owners;
- builds the correct 26- or 12-lesson Kurmanji order;
- rejects unknown course IDs and lesson keys;
- allows lesson 1;
- for later lessons, checks that the immediate predecessor exists in `lesson_progress` for the same user and course.

The function revokes execution from `PUBLIC` and `anon`, then grants it to `authenticated`. The earlier 2026-10-10 sequential-access migration also establishes the generic RLS policy shape; the later Kurmanji migration replaces the function with a version that adds both Kurmanji course sequences.

### 4. Completion RPC and progress ownership

The 2026-10-24 `complete_lesson(text,text)` function is `SECURITY DEFINER` with an empty search path. It:
- requires `auth.uid()`;
- requires email or phone verification for non-owners;
- rejects unsupported courses and unknown lesson keys;
- requires an active/completed enrollment unless the caller is the site owner;
- requires the immediate predecessor for all Kurmanji learners, while allowing the site owner to bypass sequencing;
- writes only the caller's progress row using `ON CONFLICT (user_id, course_id, lesson_key) DO UPDATE`;
- counts only keys in the generated sequence for the two Kurmanji courses;
- compares the completed count with the course's `total_lessons`;
- grants execution only to `authenticated` after revoking `PUBLIC` and `anon`.

The base schema grants authenticated users read access to their own progress but does not create direct client insert/update policies. Its stated design is that progress is written through the completion RPC. The composite primary key on `lesson_progress` prevents duplicate user/course/lesson rows.

### 5. Enrollment and owner checks

The base schema's `student_has_enrollment(text)` is a `STABLE SECURITY DEFINER` RPC. It checks `auth.uid()` against an active/completed enrollment and is executable by authenticated users only. The browser separately checks `is_site_owner()`, because the enrollment RPC does not itself grant an owner bypass.

The owner check is defined as a `SECURITY DEFINER` SQL function and returns true for a matching `site_owners.user_id` row or the configured owner email fallback. Its execution is revoked from `PUBLIC` and granted to `authenticated`. The Kurmanji read and completion functions call this owner check.

Owner bypasses are intentional in the inspected source: owner can read lessons without enrollment and can complete later Kurmanji lessons without completing every predecessor. Non-owner learner progression remains sequential.

### 6. Client-side completion state is a convenience layer

The Kurmanji completion UI synchronizes its local-storage completion list from `lesson_progress`, calls `complete_lesson` to persist completion, and uses local state to decide whether to show the next-lesson navigation affordance. The browser's local-storage state is not the security boundary: RLS and the server RPC independently enforce access and completion.

One usability weakness is visible: `ZANSTI_SYNC_PROGRESS` clears the local completion cache and returns false if the progress query fails, while the Kurmanji `setup()` path does not check that return value before computing the first incomplete lesson. A temporary progress-read failure can therefore make the local UI behave as though no lessons were completed and send the learner back to lesson 1. This is fail-closed rather than a server-side access bypass, but it can look like lost progress. It should be addressed only after an approved change and with an explicit retry/error state rather than trusting stale local data.

## Risks and unresolved verification

1. **Production migration state remains unknown.** The repository has two same-purpose Kurmanji migrations dated 2026-10-19 and 2026-10-24 with differing lesson tuples; their headers make different claims about application state. This review did not inspect `supabase_migrations.schema_migrations` or any live database. The exact deployed definitions and policy state are therefore unverified.
2. **The 2026-10-24 migration is essential for Kurmanji-aware progression.** The earlier generic 2026-10-10 function does not list the Kurmanji course IDs. The later migration adds them. Before release or any migration push, verify the remote ledger and deployed function definitions read-only in the authorized target environment.
3. **RLS is not validated by repository text alone.** Confirm the actual `lesson_content` table has RLS enabled, the expected SELECT policy is the effective policy, and no broader permissive policy grants another path. PostgreSQL permissive policies combine with OR semantics.
4. **RPC grants and function definitions need live confirmation.** Verify deployed `prosecdef`, `proconfig`, function source, and execute grants for `can_read_lesson_content`, `complete_lesson`, `student_has_enrollment`, and `is_site_owner`.
5. **The source-only audit does not establish real learner behavior.** The existing Playwright tests mock Supabase; they cannot prove RLS, authenticated enrollment, persistence, or real sequence blocking.
6. **Owner email fallback is an authorization dependency.** Verify the deployed owner email and `site_owners` rows are intentionally correct; do not edit them as part of this audit.
7. **Progress synchronization failure can mislead learners.** The client should distinguish a confirmed empty progress set from a failed progress read. This is a UX correction proposal, not an applied fix.

## Recommended read-only acceptance matrix

Run only against an explicitly authorized disposable Supabase project after confirming the intended migration set; never against production as part of this proposal.

| Actor/state | Attempt | Expected result |
|---|---|---|
| Anonymous | Read Course 1 lesson 01 | Denied by RLS; browser sends user to sign-in |
| Authenticated, unverified, not enrolled | Enroll in either course | Enrollment RPC rejects as unverified |
| Verified, not enrolled | Read either course lesson 01 | Denied; browser routes to matching course enrollment card |
| Verified, enrolled | Read Course 1 lesson 01 | Allowed |
| Verified, enrolled | Read Course 1 lesson 02 before lesson 01 completion | Denied |
| Verified, enrolled, lesson 01 completed | Read Course 1 lesson 02 | Allowed |
| Verified, enrolled | Read Course 2 lesson 12 before lesson 11 completion | Denied |
| Verified, enrolled, lesson 11 completed | Read Course 2 lesson 12 | Allowed |
| Verified, enrolled | Complete a non-next lesson directly through RPC | Rejected with previous-lesson requirement |
| Verified, enrolled | Complete the next lesson | Progress row persisted once; next lesson becomes readable |
| Verified, enrolled | Complete same lesson again | Idempotent composite-key upsert; no duplicate row |
| Site owner | Read/complete later Kurmanji lesson | Owner bypass behaves as documented |
| Other authenticated user | Read another user's progress | Denied by own-row progress policy |

Also inspect actual policy catalog entries for unexpected additional permissive policies and verify that a direct PostgREST `lesson_content` SELECT is denied even if the browser gate is bypassed.

## Exact repository evidence reviewed

- `supabase/schema.sql` — table keys, RLS enablement, own-row progress SELECT policy, enrollment RPC, student enrollment RPC, and baseline completion RPC.
- `supabase/migrations/20261007160000_change_owner_email.sql` — site-owner function and execute grant.
- `supabase/migrations/20261010091000_enforce_sequential_lesson_content_access.sql` — generic sequential access function, grants, and protected content SELECT policy.
- `supabase/migrations/20261010073609_restrict_anon_lesson_access_rpc.sql` — anon execute revocations for access RPCs.
- `supabase/migrations/20261024122051_add_kurmanji_courses_and_protected_lessons.sql` — 26/12 course records, protected content keys, Kurmanji-aware read and completion RPCs, and execute grants.
- `script.js` — destination page authentication/enrollment/progression gate, protected content fetch, progress synchronization, completion RPC call, and Kurmanji local completion UI.

## Backup and change record

- Work branch: `fix/kurmanji-ci-current-migration`
- Starting commit: `7c96a6389778c16a96c0f1e4bcf6623da9b705e7`
- Pre-work backup: `backup/access-control-before-2026-11-16` (created from the exact starting commit)
- Post-work backup: to be recorded after this dossier commit.
- No application source, SQL, policy, RPC, test, workflow, lesson, or deployment changes.
