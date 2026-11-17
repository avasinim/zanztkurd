# B3-K091 — Admin Surface and Student Data Access Audit

Date: 2026-11-17  
Branch: `fix/kurmanji-ci-current-migration`  
Scope: static review of `admin.html`, checked-in Supabase schema and migration files. No live database or Storage inspection was performed.

## Admin entry and primary RPCs

- `admin.html` obtains the current Supabase session and redirects unauthenticated visitors to `auth.html?next=admin.html`.
- It calls `public.is_site_owner()` before loading the admin dashboard and replaces the page with an access-denied view unless the RPC returns exactly `true`.
- The core user, enrollment, progress and enrollment-status RPCs each independently call `public.is_site_owner()` before returning or changing student data.
- The migration chain revokes `PUBLIC` execution on the core admin RPCs and grants execution to `authenticated`. This is an appropriate layered design: the UI gate is not the only authorization boundary.
- The later `admin_list_users` replacement retains its owner check. The original function's privileges are retained by PostgreSQL `CREATE OR REPLACE FUNCTION`; the earlier explicit revoke/grant remains in the migration chain.

## Findings requiring follow-up

### 1. Feedback moderation RPC definitions are absent from the checked-in SQL

The admin UI calls:
- `admin_list_site_feedback(p_status)`
- `admin_moderate_site_feedback(p_feedback_id, p_status)`

The complete checked-in migration list and `supabase/schema.sql` reviewed for this audit contain no definitions or explicit grants for these two RPCs. The feedback tab therefore depends on SQL deployed from outside the currently checked-in migration history, or it will fail with a missing-function/permission error.

This is a repository completeness and reproducibility finding, not proof that the live production functions are absent. Their live definitions, owner checks, grants, status validation and audit behavior must be inspected read-only before any code or migration is proposed.

### 2. Library operations rely on direct table and Storage access

The admin UI directly selects, inserts, updates and deletes `public.library_books`, and uploads/removes objects in the `avasin-library` Storage bucket. The reviewed checked-in schema and migration set do not define the library table's RLS policies or the bucket's object policies.

The page-level owner gate does not secure these direct REST/Storage operations by itself. Database RLS and Storage policies must independently enforce owner-only writes and appropriate read/published-file access. Because the policies are not present in the checked-in SQL reviewed here, their effective live behavior remains unverified.

### 3. Core admin RPCs have a consistent authorization pattern, but live assurance remains outstanding

The owner check in each core RPC is positive evidence in the source. However, this static audit cannot verify deployed function bodies, effective grants, role memberships, RLS state, Storage policies, or whether out-of-repository SQL was applied.

## Recommended next safe step

Perform an explicitly authorized, read-only inspection of the live Supabase catalog for the two feedback RPCs, `library_books` RLS policies, and `storage.objects` policies scoped to `avasin-library`. Capture the effective grants and function definitions. Do not create or apply migrations until the deployed state is known and the owner approves any production change.

## Change boundary

K-091 adds this report only. No application code, lesson content, SQL migration, schema, student data, production database, Storage object, deployment, CI workflow, or `main` branch was changed.
