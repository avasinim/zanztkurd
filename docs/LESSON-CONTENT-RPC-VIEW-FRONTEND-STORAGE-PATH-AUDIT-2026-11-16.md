# lesson_content RPC, view, frontend and storage path audit — 2026-11-16

## Scope

Read-only repository audit on `fix/kurmanji-ci-current-migration` at starting commit `2d8aba006dbda1165bfedc988aa2d201b4426a98`. Inspected the application scripts, lesson-content policy and RPC migrations, baseline schema, admin RPC SQL, library page and homepage storage/library integrations. The prior API privilege/default-grant dossier is complementary and should be read with this one.

No live Supabase or PostgREST request was made. No database rows, lesson bodies from a live system, student records, secrets, or storage objects were accessed. No SQL, source code, tests, CI, lesson content, production configuration, or deployment was changed.

## 1. Direct lesson-content reads

The application loader in `script.js` performs a direct Supabase table query against `lesson_content`, selecting `content_html` for the lesson key after the client-side session, enrollment/owner and server-side access checks.

This is the actual lesson-body delivery path visible in the source:
1. browser obtains the authenticated session;
2. browser calls enrollment and owner helper RPCs;
3. browser calls `can_read_lesson_content(course_id, lesson_key)`;
4. browser performs a direct `lesson_content` SELECT;
5. returned `content_html` is inserted into the lesson container.

The database SELECT RLS policy remains the decisive row-level boundary if RLS is enabled and the table ACL grants the required SELECT privilege. The browser-side checks are not a substitute for RLS.

## 2. RPC inventory relevant to lesson_content

### `can_read_lesson_content(text,text)`

The inspected migration versions define this as SECURITY DEFINER with an empty fixed search_path. The latest Kurmanji migration revokes EXECUTE from PUBLIC and anon and grants it to authenticated.

Its declared return type is boolean. Its body checks the authenticated user, owner status, enrollment and lesson sequence by reading enrollment/progress metadata. It does not SELECT or return `content_html`, a lesson title, or a lesson_content row.

The function can reveal a boolean access decision for a supplied course/lesson key to an authenticated caller. That is an intentional authorization helper in the current source design, not a second lesson-body delivery endpoint. It should not be described as a way to fetch lesson content.

### `complete_lesson(text,text)`

The latest migration defines this as SECURITY DEFINER with an empty fixed search_path, revokes PUBLIC/anon EXECUTE, and grants authenticated EXECUTE. Its body validates identity, verification, enrollment and sequence, then writes `lesson_progress` and may update enrollment completion status. It does not return or read lesson-body HTML.

### Other inspected functions

The inspected baseline schema and admin dashboard RPC definitions do not expose lesson_content. Admin reporting functions return account, enrollment and progress metadata; the reviewed definitions do not query lesson_content. The repository-wide code search results for `lesson_content` identify the direct loader, spelling-tool, policy/index migrations, seed inserts and validation references, rather than a view or alternate content-returning RPC.

## 3. Views and materialized views

No `CREATE VIEW` or `CREATE MATERIALIZED VIEW` definition exposing `lesson_content` was found in the inspected SQL sources or repository code-search results. This is a source-tree finding only. It does not exclude manually created views, functions, policies, grants, or objects in the live Supabase database.

## 4. Owner spelling utility

`spelling-tool.js` directly SELECTs lesson key, course, title and content_html from `lesson_content`, then performs direct UPDATEs to `content_html` and `updated_at`. It checks `is_site_owner()` in browser code before enabling the operation.

This confirms a second direct-table client path, but not a separate privilege boundary. It depends on the same effective table ACL/RLS configuration. As documented in the companion API privilege audit, the checked-in migrations show the SELECT policy but no UPDATE policy or explicit table-level UPDATE grant. Consequently the source does not prove the editor can write in production; if RLS is enabled and no applicable UPDATE policy exists, the update should be denied. Conversely, a client-side owner check alone is not a security boundary if the database allows broader writes.

## 5. Storage and public library distinction

The inspected `library.html` and homepage integration query `library_books` and use the `avasin-library` Storage bucket to create signed URLs or public URLs for library files. These are a distinct document-library feature. No inspected code maps lesson keys or `lesson_content.content_html` into that bucket, and no lesson-body storage mirror was found.

This does not prove the live bucket has no lesson copies or public objects; the live Storage inventory and policies were not queried. It only means the repository code inspected does not present Storage as an alternate lesson_content endpoint.

## 6. Other API paths

The homepage uses other tables such as `site_feedback_submissions`; the public library uses `library_books`. Those are unrelated data surfaces and are not evidence of a path to protected lesson bodies.

The checked-in source contains a publishable Supabase client configuration, which is expected for browser access. No service-role key was found or used in the inspected frontend paths. This audit did not inspect GitHub secrets, deployment environment variables, or live Supabase project settings.

## 7. Consolidated conclusion

Repository evidence currently supports this model:
- **Lesson-body read:** direct `lesson_content` table SELECT in `script.js`, guarded by browser checks and intended RLS.
- **Owner content preview/write:** direct table SELECT and UPDATE in `spelling-tool.js`, guarded by a browser owner check and dependent on database UPDATE ACL/RLS.
- **Access decision RPC:** `can_read_lesson_content` returns boolean metadata only.
- **Progress RPC:** `complete_lesson` writes progress/enrollment state and does not return lesson body.
- **Views/admin RPCs:** no inspected alternate content-returning view or admin function found.
- **Storage:** repository references concern `library_books` and `avasin-library`, not a lesson-body mirror.

This is not a production security certification. Effective RLS, ACL, exposed schemas, manually added objects, Storage policies/objects, and migration application state remain unverified.

## 8. Read-only live verification still required

With explicit read-only authorization, inspect metadata only:
1. all relations, views and materialized views referencing `lesson_content`;
2. all routines whose source or dependencies reference `lesson_content`;
3. relation RLS/force-RLS, owner, every policy and effective table privileges;
4. exposed PostgREST schemas and role configuration;
5. function owners, SECURITY DEFINER, search_path and EXECUTE ACLs;
6. Storage bucket metadata and policies only if a lesson-content mirror is suspected, without listing/downloading object bodies;
7. migration ledger and schema drift.

Do not select lesson bodies, student records or progress rows. Do not test writes or call the owner editor against production.

## Backup and change record

- Work branch: `fix/kurmanji-ci-current-migration`
- Starting commit: `2d8aba006dbda1165bfedc988aa2d201b4426a98`
- Pre-work backup: `backup/lesson-content-rpc-view-paths-before-2026-11-16`
- Post-work backup: `backup/lesson-content-rpc-view-paths-after-2026-11-16`
- Change type: documentation only.
