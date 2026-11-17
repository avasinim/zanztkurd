# B3-K092 — Digital Library and Storage Policy Audit

Date: 2026-11-17  
Branch: `fix/kurmanji-ci-current-migration`  
Scope: static review of `admin.html`, `library.html`, `supabase/schema.sql`, `supabase/admin-dashboard.sql`, and every SQL migration currently checked into `supabase/migrations/`. No live Supabase catalog, RLS state, Storage bucket, or object policy was queried.

## 1. What the application expects

### Public library page
- Reads `public.library_books` with the publish filter `is_published = true`.
- Displays metadata fields including title, author, category, description, file path, filename and MIME type.
- Requests a 60-second signed URL from the `avasin-library` bucket for read/download actions.
- It does not expose a direct public object URL in the inspected page.

### Admin library page
- The page first requires a session and a successful `is_site_owner()` result.
- It directly selects all rows from `library_books`.
- It directly inserts new book rows, updates metadata and publication state, and deletes book rows.
- It uploads files and removes objects through the `avasin-library` bucket.
- The browser-side owner gate is a usability/access gate, not an authorization boundary for direct PostgREST and Storage requests.

## 2. Repository evidence and gaps

A search across the complete checked-in Supabase schema and migration file list found:
- No `CREATE TABLE` or `ALTER TABLE` definition for `public.library_books`.
- No `ENABLE ROW LEVEL SECURITY` statement for `public.library_books`.
- No policies for `library_books` SELECT, INSERT, UPDATE or DELETE.
- No bucket creation/configuration for `avasin-library`.
- No policies on `storage.objects` scoped to `avasin-library`.

The baseline schema enables RLS on profiles, courses, enrollments, lesson progress and site owners, but does not include the library table. Therefore the repository alone cannot tell whether the library table exists with RLS enabled, whether policies are configured manually in Supabase, or whether the Storage bucket is private and policy-protected.

## 3. Security and functional implications

1. **Admin UI gate is insufficient by itself.** If a non-owner can obtain a valid authenticated session, direct API calls are not stopped by the JavaScript owner check. Owner-only write policies must be enforced in Postgres and Storage.
2. **Public visibility needs a deliberate read policy.** The public page expects anonymous readers to list published book metadata and create short-lived signed URLs. The effective table and Storage policies must allow only the intended published records and files, without granting anonymous write/delete access.
3. **Private bucket behavior should be verified.** The client requests signed URLs, which is consistent with a private-bucket design. The checked-in SQL does not prove the bucket is private or that the signed-URL creation path is restricted to published book files.
4. **Object and row lifecycle can diverge.** The admin delete flow removes the Storage object first and then deletes the database row. If the row deletion fails after object removal, metadata remains with a missing file; the UI reports this possibility. This is an operational consistency risk, not a demonstrated unauthorized access issue.
5. **No live security conclusion is possible.** Missing policies in source control are a reproducibility/documentation gap. They do not prove that live Supabase has no policies.

## 4. Required verification before any implementation

A separately authorized read-only production inspection should capture:
- Whether `public.library_books` exists and its columns, constraints, owner and RLS/Force-RLS state.
- Every effective policy on `library_books`, including roles, commands, `USING` and `WITH CHECK`.
- The `avasin-library` bucket's existence and `public` flag.
- All `storage.objects` policies affecting that bucket, including anonymous and authenticated behavior.
- Effective grants for anon/authenticated on the table and Storage schema.
- Whether signed URL creation is limited to published rows and matching object paths.

After evidence is captured, propose a reproducible migration and tests for: anonymous published-book listing; anonymous unpublished-book denial; owner-only insert/update/delete; non-owner write denial; published-file signed URL access; unpublished-file denial; and object deletion behavior. Do not apply changes to production without explicit approval.

## Result and change boundary

No live policy state was inspected and no exploit was claimed. K-092 adds this report only. No application code, lesson content, SQL migration, database row, Storage bucket/object, deployment, CI workflow, or `main` branch was changed.
