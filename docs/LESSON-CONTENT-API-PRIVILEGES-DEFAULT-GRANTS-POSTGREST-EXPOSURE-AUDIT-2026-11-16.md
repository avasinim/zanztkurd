# lesson_content API privileges, default grants and PostgREST exposure audit — 2026-11-16

## Scope and method

Repository-only inspection on `fix/kurmanji-ci-current-migration` of `supabase/schema.sql`, `supabase/admin-dashboard.sql`, all SQL migrations, lesson-content policy definitions, RPC grants, and the owner browser editor references.

The repository contains no `supabase/config.toml` at the inspected branch path. A targeted search found no `ALTER DEFAULT PRIVILEGES`, broad `GRANT ... ON ALL TABLES`, explicit table-level grant for `public.lesson_content`, or migration enabling RLS on that table.

No live Supabase/PostgREST catalog or API configuration was queried. No SQL or HTTP request was executed. No code, migration, test, lesson, CI, or production setting was changed.

## 1. What the repository explicitly grants

The source explicitly grants selected RPC execution to `authenticated`, including:
- `enroll_in_course(text)`;
- `student_has_enrollment(text)`;
- `complete_lesson(text,text)`;
- `is_site_owner()`;
- admin dashboard RPCs;
- `can_read_lesson_content(text,text)` in the lesson-access migrations.

The later Kurmanji migration revokes the relevant learner-facing RPCs from PUBLIC and anon and grants execution to authenticated. Earlier definitions generally revoke PUBLIC and grant authenticated.

These are function EXECUTE privileges. They do not grant table SELECT or UPDATE on `lesson_content`.

## 2. What the repository does not establish for lesson_content

The checked-in `supabase/schema.sql` enables RLS on profiles, courses, enrollments and lesson_progress, but not on `lesson_content`. It does not define the lesson_content table, its owner, or table-level API grants.

The lesson-content access migrations define a policy named `Enrolled users and owners can read lesson content` with:
- `FOR SELECT`;
- `TO authenticated`;
- owner access through `public.is_site_owner()`, OR
- active/completed enrollment plus `public.can_read_lesson_content(course_id, lesson_key)`.

No UPDATE, INSERT, DELETE or ALL policy for `lesson_content` was found in the inspected SQL sources. No explicit table-level GRANT or REVOKE for this table was found. No default-privilege alteration was found.

A policy alone is not a complete API permission declaration. PostgreSQL table privileges and RLS are separate gates: a role needs the relevant SQL privilege, and when RLS is enabled it must also satisfy an applicable policy. Therefore source code cannot establish whether authenticated users can SELECT, whether owner-tool UPDATE works, or whether anon is excluded by effective ACLs.

## 3. PostgREST/API exposure boundary

The repository does not include a Supabase API configuration file declaring exposed schemas, extra search paths, or API role settings. The project’s live API exposure configuration is consequently unknown.

The presence of a browser Supabase client and direct `from("lesson_content").select("content_html")` call indicates intended PostgREST access, but does not prove:
- that `public` is currently exposed;
- that anon/authenticated have table SELECT;
- that RLS is enabled or forced;
- that anon has no inherited or direct table privileges;
- that service_role privileges are limited (service_role is normally privileged and must not be treated as a learner role);
- that no manually created policy or grant exists.

The owner tool’s direct browser-side UPDATE additionally depends on effective UPDATE privilege and an applicable UPDATE policy. The source audit found no such policy or explicit table grant, so the editor path is unproven and may be nonfunctional if RLS is enabled. If RLS is disabled while authenticated has UPDATE, the client-side owner check alone is insufficient protection.

## 4. Security interpretation

The strongest source-level statement is that the repository defines a sequence-aware authenticated SELECT policy, but does not define the underlying table’s complete RLS/ACL/API exposure configuration in the inspected schema/migration files.

This is a configuration/provenance gap, not proof of public data exposure or a production vulnerability. It is also not proof that the current production table is safe. Both conclusions require live catalog inspection.

## 5. Read-only catalog verification checklist

With explicit read-only authorization for the intended project, inspect metadata only:

1. `pg_class` / `pg_namespace`: relation existence, owner, `relrowsecurity`, `relforcerowsecurity`.
2. `pg_policies`: every policy on `public.lesson_content`, including command, roles, USING and WITH CHECK.
3. `has_table_privilege` and `information_schema.role_table_grants`: SELECT/INSERT/UPDATE/DELETE for anon, authenticated, service_role and table owner.
4. `pg_default_acl` and `pg_namespace`: default privileges for the actual object-creating role and exposed schema.
5. `information_schema.schemata` / Supabase API settings: exposed schemas and extra search path.
6. `pg_proc`: owner, security-definer flag, search_path and effective EXECUTE grants for the access/owner RPCs.
7. `supabase_migrations.schema_migrations`: verify that the two policy migrations and the intended Kurmanji migration versions were applied.

Do not select lesson bodies, student progress, enrollment rows or personal data. Do not call the owner editor's UPDATE path. A metadata-only query set should be prepared and reviewed before any connection is made.

## 6. Recommended next decision (not implemented)

Before release, decide whether the browser owner editor is meant to write directly:
- If yes, design a narrow owner-only UPDATE policy and matching least-privilege table grant, with tests proving authenticated non-owners cannot update via direct API requests.
- If no, remove/disable the direct browser write path through a separately approved code change and ensure no unnecessary authenticated UPDATE privilege remains.

In either case, first establish the live table RLS state and ACL. Do not infer or alter production grants based on repository absence.

## 7. No remediation performed

No SQL, schema, API configuration, browser code, RLS policy, table privilege, migration, test, CI, lesson content, or production setting was changed. This document is an audit record only.

## Backup and change record

- Work branch: `fix/kurmanji-ci-current-migration`
- Starting commit: `2762b1381926b25720c2b6e790c80c4fabda59c9`
- Pre-work backup: `backup/lesson-content-api-grants-before-2026-11-16`
- Post-work backup: `backup/lesson-content-api-grants-after-2026-11-16`
- Change type: documentation only.
