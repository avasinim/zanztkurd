# Protected Kurmanji lesson loader and access-boundary audit — 2026-11-17

## Scope and method

Read-only source audit on `fix/kurmanji-ci-current-migration`, starting at `4cf9a8f6402c704276e26b56672f22a135a4e878`. Reviewed the shared `script.js` gate and loader, the 38 root-level Kurmanji lesson shells (Course 1: 26; Course 2: 12), the sequential-access and Kurmanji release migrations, `supabase/schema.sql`, and the existing access-control audit dossiers.

All 38 lesson pages were fetched individually. Each page has:
- a `.lesson-content` shell with a `data-lesson-key`;
- a loading placeholder rather than the lesson body in that element;
- a reference to the shared `script.js`;
- a `data-lesson-key` exactly equal to its own filename.

No live Supabase or PostgREST request was made. No database metadata or rows were queried. No lesson body was fetched from production. No code, SQL, lesson, test, CI, PR, deployment, or production setting was changed.

## 1. Static shell inventory — 38/38 consistent

- Course 1: `kurmanji-course-1-lesson-01.html` through `kurmanji-course-1-lesson-26.html` — all 26 have matching keys and the shared loader.
- Course 2: `kurmanji-course-2-lesson-01.html` through `kurmanji-course-2-lesson-12.html` — all 12 have matching keys and the shared loader.
- No mismatch was found between a shell filename and its `data-lesson-key`.
- The lesson body is not embedded in the inspected `.lesson-content` shell; that element initially contains only a loading placeholder.

This verifies the checked-in shell pattern, not the deployed HTML/CDN version or the content returned by a live database.

## 2. Frontend loading sequence

The relevant implementation is in `script.js`:

1. The page is classified as a protected lesson by its filename pattern. The document is hidden immediately and marked `noindex,follow`.
2. The shared Supabase client is initialized.
3. `getSession()` requires an authenticated session; otherwise the user is redirected to authentication.
4. The client calls `is_site_owner()`. A non-owner must pass `student_has_enrollment(course_id)`.
5. A non-owner must pass `can_read_lesson_content(course_id, lesson_key)` before the page is allowed to continue.
6. `loadProtectedLessonContent()` performs a direct SELECT of only `content_html` from `public.lesson_content`, filtered by `lesson_key`.
7. If the request fails or returns no content, an error message is inserted. The page is then made visible; the protected lesson HTML is not replaced with an empty successful result.

Relevant source locations: `script.js` approximately lines 93–116 (protected-page classification and initial hiding), 170–190 (session/enrollment/owner helpers), 194–220 (direct content SELECT and error handling), and 246–305 (page gate and content load).

The owner is exempted from the browser enrollment/progression checks. That exemption is only safe if the database-side owner predicate and the deployed RLS policy are correct.

## 3. Database-side design found in source

### Sequential SELECT policy

`supabase/migrations/20261010091000_enforce_sequential_lesson_content_access.sql` defines a SELECT policy on `public.lesson_content` for authenticated users. Its predicate allows:
- the site owner; or
- an active/completed enrollment for the same course, together with `can_read_lesson_content(course_id, lesson_key)`.

The same migration defines `can_read_lesson_content(text,text)` as SECURITY DEFINER with an empty fixed search_path, revokes PUBLIC execution, and grants execution to authenticated.

### Kurmanji course expansion

`supabase/migrations/20261024122051_add_kurmanji_courses_and_protected_lessons.sql` replaces the access RPC to include explicit finite lesson orders for:
- Course 1: 26 Kurmanji lesson keys;
- Course 2: 12 Kurmanji lesson keys;
- the existing phonetics/phonology and orthography pathways.

For non-owners, the RPC checks active/completed enrollment before reporting access, rejects keys outside the selected course order, permits the first lesson, and otherwise requires the immediately preceding lesson-progress row. It revokes execution from PUBLIC and anon and grants it to authenticated.

The same migration defines `complete_lesson(text,text)` as SECURITY DEFINER with an empty fixed search_path. It rejects unknown course/lesson keys, checks enrollment (except the owner), enforces predecessor completion according to the course rules, and writes progress. Its EXECUTE privilege is revoked from PUBLIC and anon and granted to authenticated.

### Important migration dependency

The Kurmanji migration replaces the access RPC but does not create the `lesson_content` SELECT policy itself. The policy is defined by the earlier 2026-10-10 migration. Therefore the intended final behavior depends on the policy migration having been applied successfully and remaining effective in the live database.

## 4. Important unresolved database prerequisite: RLS enablement and table provenance

The checked-in `supabase/schema.sql` does not define `public.lesson_content`. It enables RLS on `profiles`, `courses`, `enrollments`, and `lesson_progress`, but not on `lesson_content`.

The inspected lesson-content policy migrations create or replace a policy on `public.lesson_content`, but do not themselves issue `ALTER TABLE public.lesson_content ENABLE ROW LEVEL SECURITY` or `FORCE ROW LEVEL SECURITY`.

A PostgreSQL policy does not by itself prove that RLS is enabled on the table. The repository therefore does not establish:
- where and how the live `lesson_content` table was created;
- whether RLS is enabled or forced on that table;
- its owner and effective SELECT/UPDATE/INSERT/DELETE grants;
- whether additional policies or grants exist in the live project;
- whether the 2026-10-10 policy and 2026-10-24 function replacement are the deployed definitions.

This is the most important outstanding security-verification item. Do not describe the production lesson bodies as certified protected based on the frontend gate or the presence of a CREATE POLICY statement alone.

## 5. Frontend edge case: unknown Kurmanji lesson number

The client-side helper `lessonOrderFor(target)` constructs the finite 26- and 12-key orders. However, `hasPreviousLessonCompleted()` currently treats `index <= 0` as allowed. For an unknown key, `indexOf(target)` returns `-1`, so the frontend sequence helper returns true for an invalid lesson target.

The page classifier's two-digit Kurmanji pattern can classify an out-of-range number such as lesson 99 as a lesson route. This is a frontend fail-open validation defect. It is not evidence of a content-read bypass: the current SQL RPC returns false for a key outside its finite course order, and the SELECT policy independently applies the database predicate, assuming the deployed RLS policy is active and effective.

A previously documented proposal is to distinguish an invalid index from the first lesson:
- index < 0 → reject;
- index = 0 → first lesson is allowed;
- index > 0 → ask the server-side access check.

No fix is implemented in this audit. The existing regression-test proposal in `docs/KURMANJI-PROTECTED-LESSON-FRONTEND-FAIL-CLOSED-EDGE-CASE-REVIEW-2026-11-16.md` should remain open until approved and tested.

## 6. Cross-cutting copy mutation observation

At the start of `script.js`, a global DOM text normalizer applies Avasin spelling substitutions and observes future DOM mutations. This includes text nodes added after the protected lesson body is injected, although it skips script/style/textarea and code-like elements.

This means fetched lesson copy may be rewritten in the browser after loading. It is not an access-control bypass, but it is relevant to lesson fidelity and editorial QA: database HTML and rendered text are not necessarily byte-for-byte identical. Any decision to alter or remove this behavior requires a separate content/editorial review; no change is proposed here.

## 7. Security conclusion

**What is supported by repository evidence**
- All 38 Kurmanji shells consistently use the shared protected loader and matching lesson keys.
- The frontend checks authentication, enrollment, owner status and progression before requesting the lesson body.
- The checked-in SQL contains a sequential SELECT policy and course-specific server-side access logic.
- The checked-in Kurmanji migration rejects unknown lesson keys and limits RPC execution to authenticated users.

**What is not established**
- Whether RLS is enabled on the live `lesson_content` table.
- Whether the expected policy, RPC definitions and ACLs are active in production.
- Whether live table privileges or additional policies weaken or alter the intended boundary.
- Whether the deployed site serves the same 38 shells and shared script audited here.

Accordingly, the source design is layered, but production security remains **unverified** until an explicitly authorized read-only catalog inspection confirms the live table's RLS state, policies, grants, function definitions/ACLs, and migration ledger. That verification should inspect metadata only and must not read lesson bodies, student records, enrollments or progress rows.

## 8. Recommended next steps (proposal only)

1. With explicit read-only authorization, inspect the live catalog metadata for `lesson_content`: relation owner, RLS/force-RLS flags, all policies, and effective role grants.
2. Inspect deployed definitions and EXECUTE ACLs for `is_site_owner`, `can_read_lesson_content`, and `complete_lesson`, plus the migration ledger.
3. In a disposable Supabase project, test anonymous, unenrolled, enrolled-first-lesson, locked-next-lesson, unlocked-next-lesson, owner, invalid-key, and direct PostgREST read cases.
4. Separately obtain approval before changing the frontend invalid-index behavior or the global text normalizer.

## Backup and change record

- Work branch: `fix/kurmanji-ci-current-migration`
- Starting commit: `4cf9a8f6402c704276e26b56672f22a135a4e878`
- Pre-work backup: `backup/protected-lesson-loader-audit-before-2026-11-17`
- Change type: documentation only.
- No database connection, query, migration execution, code change, test change, PR change, or deployment was performed.
