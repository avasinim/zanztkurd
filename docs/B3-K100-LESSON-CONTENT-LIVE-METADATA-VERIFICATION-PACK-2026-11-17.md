# B3-K100 — Lesson Content Live Metadata Verification Pack

- Date: 2026-11-17
- Repository: `avasinim/zanztkurd`
- Branch: `fix/kurmanji-ci-current-migration`
- Starting HEAD: `451ae99d03568133ba97d4ccbf25894e04a0faa0`
- Protected `main`: `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`
- Scope: prepare a strictly read-only catalog inspection for `public.lesson_content` after K098/K099 repository audits.
- Live database access: **not performed**. No project was selected or connected, and no SQL was executed.

## Executive summary

K098/K099 established a repository-level gap: the checked-in SQL does not create `public.lesson_content`, enable RLS on it, or declare its full table ACL; the checked-in policies define SELECT behavior, while the browser spelling tool performs direct UPDATEs without a matching checked-in UPDATE policy. These source findings do not prove the current production state.

This task prepares a small metadata-only SQL pack to resolve the open questions safely. The queries below inspect catalog metadata only; they do not select lesson text, student records, enrollment rows, or progress records, and they contain no write statements.

**No production access is authorized by this task.** Before running the pack, the project owner must explicitly authorize read-only metadata inspection of the specific Supabase project. No migration, DDL, grant, policy, API setting, or data change is part of this work.

## 1. Repository facts to verify against live metadata

1. Does `public.lesson_content` exist, and what role owns it?
2. Are `relrowsecurity` and `relforcerowsecurity` enabled?
3. What is the complete policy set, including policy command, roles, USING and WITH CHECK?
4. Which of `anon`, `authenticated`, `service_role`, and the relation owner have SELECT/INSERT/UPDATE/DELETE privileges?
5. Does the relation have a unique constraint/index on `lesson_key`, as required by the seed upserts?
6. What are the deployed definitions, owners, security-definer flags, search paths, and EXECUTE privileges for the owner/access/completion functions?
7. Does the migration ledger contain the expected lesson-content policy and Kurmanji release migrations?

## 2. Read-only SQL pack (prepared, not executed)

Run these statements only in the intended Supabase project's SQL Editor or a read-only database session. Review the project reference before execution. Each query is a standalone SELECT.

### Q1 — relation existence, owner and RLS flags

```sql
SELECT
  n.nspname AS schema_name,
  c.relname AS relation_name,
  c.relkind,
  pg_get_userbyid(c.relowner) AS relation_owner,
  c.relrowsecurity AS rls_enabled,
  c.relforcerowsecurity AS force_rls
FROM pg_class c
JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE n.nspname = 'public'
  AND c.relname = 'lesson_content';
```

Expected interpretation: zero rows means the relation is absent under this exact schema/name. `rls_enabled=false` means the table's policies are not enforced for ordinary roles. `force_rls` is a separate flag and does not replace checking the actual owner and privileged roles.

### Q2 — every policy on the relation

```sql
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual AS using_expression,
  with_check
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename = 'lesson_content'
ORDER BY policyname;
```

Review all policies, not only the policy name present in the repository. Multiple permissive policies can widen access because PostgreSQL combines permissive policies with OR semantics.

### Q3 — effective table privileges by database role

```sql
SELECT
  r.rolname AS role_name,
  has_table_privilege(r.oid, 'public.lesson_content', 'SELECT') AS can_select,
  has_table_privilege(r.oid, 'public.lesson_content', 'INSERT') AS can_insert,
  has_table_privilege(r.oid, 'public.lesson_content', 'UPDATE') AS can_update,
  has_table_privilege(r.oid, 'public.lesson_content', 'DELETE') AS can_delete,
  has_table_privilege(r.oid, 'public.lesson_content', 'TRUNCATE') AS can_truncate,
  has_table_privilege(r.oid, 'public.lesson_content', 'REFERENCES') AS can_reference,
  has_table_privilege(r.oid, 'public.lesson_content', 'TRIGGER') AS can_trigger
FROM pg_roles r
WHERE r.rolname IN ('anon', 'authenticated', 'service_role')
   OR r.oid = (
     SELECT c.relowner
     FROM pg_class c
     JOIN pg_namespace n ON n.oid = c.relnamespace
     WHERE n.nspname = 'public'
       AND c.relname = 'lesson_content'
   )
ORDER BY r.rolname;
```

This inspects effective privileges, including inherited role membership. It does not expose credentials or row data. If the relation does not exist, the query may return no rows or a relation-resolution error; record that fact rather than substituting another relation.

### Q4 — explicit table grants visible in information_schema

```sql
SELECT
  grantee,
  privilege_type,
  is_grantable
FROM information_schema.role_table_grants
WHERE table_schema = 'public'
  AND table_name = 'lesson_content'
ORDER BY grantee, privilege_type;
```

Use Q3 for effective privileges; Q4 is a complementary listing of grants visible through information_schema.

### Q5 — constraints and indexes relevant to lesson keys

```sql
SELECT
  idx.relname AS index_name,
  i.indisprimary AS is_primary,
  i.indisunique AS is_unique,
  pg_get_indexdef(i.indexrelid) AS index_definition
FROM pg_index i
JOIN pg_class tbl ON tbl.oid = i.indrelid
JOIN pg_namespace n ON n.oid = tbl.relnamespace
JOIN pg_class idx ON idx.oid = i.indexrelid
WHERE n.nspname = 'public'
  AND tbl.relname = 'lesson_content'
ORDER BY idx.relname;
```

Verify a unique key/index suitable for `ON CONFLICT (lesson_key)`. Do not infer it from seed SQL alone.

### Q6 — owner/access/completion function metadata and ACLs

```sql
SELECT
  n.nspname AS schema_name,
  p.proname AS function_name,
  pg_get_function_identity_arguments(p.oid) AS identity_arguments,
  pg_get_userbyid(p.proowner) AS function_owner,
  p.prosecdef AS security_definer,
  p.proconfig AS function_settings,
  p.proacl AS function_acl,
  has_function_privilege('anon', p.oid, 'EXECUTE') AS anon_can_execute,
  has_function_privilege('authenticated', p.oid, 'EXECUTE') AS authenticated_can_execute
FROM pg_proc p
JOIN pg_namespace n ON n.oid = p.pronamespace
WHERE n.nspname = 'public'
  AND (
    (p.proname = 'is_site_owner' AND pg_get_function_identity_arguments(p.oid) = '')
    OR (p.proname = 'can_read_lesson_content' AND pg_get_function_identity_arguments(p.oid) = 'p_course_id text, p_lesson_key text')
    OR (p.proname = 'complete_lesson' AND pg_get_function_identity_arguments(p.oid) = 'p_course_id text, p_lesson_key text')
  )
ORDER BY p.proname;
```

This lists function metadata and effective EXECUTE rights, not learner records. If the deployed argument names differ, use the returned identity arguments to identify the correct overload; do not call the functions as part of this inspection.

### Q7 — relevant migration ledger entries

```sql
SELECT version, name
FROM supabase_migrations.schema_migrations
WHERE version IN (
  '20261010090000',
  '20261010091000',
  '20261024122051',
  '20261116120000'
)
ORDER BY version;
```

This reads migration history metadata only. If the migration ledger schema/table differs or is inaccessible, record the limitation; do not create or repair it.

## 3. Dashboard checks not covered by these SQL statements

The Data API exposed-schema configuration is a project setting and should be inspected in the Supabase Dashboard under Integrations → Data API. Record the exposed schemas and extra search path. Do not change them.

Default privileges are object-creator-specific. If required after Q1-Q4, inspect `pg_default_acl` and identify the actual relation-creating role first. Do not apply any `ALTER DEFAULT PRIVILEGES` command.

## 4. Decision rules after authorized inspection

- **RLS disabled:** treat the lesson-content API boundary as unverified/high risk until RLS is enabled and policies are reviewed through a separately approved change. Do not enable it in this task.
- **RLS enabled, unexpected permissive policies:** document the exact policy names/expressions and request approval before changing them.
- **No authenticated SELECT privilege:** the browser lesson loader may not be able to read content even if its RLS policy is correct.
- **Authenticated UPDATE privilege plus no restrictive owner-only UPDATE policy:** treat direct lesson-content editing as potentially over-permissive; do not test a write.
- **RLS enabled but no applicable UPDATE policy:** the spelling tool's Apply operation is expected to be rejected or return zero updated rows. Do not run Apply as a diagnostic.
- **Missing unique key for `lesson_key`:** migration upserts may not be reproducible; investigate separately in an isolated database before proposing schema changes.
- **Migration ledger mismatch:** stop and reconcile deployment history before considering any migration.

A passing metadata inspection is necessary but not sufficient. It does not replace isolated-database tests of anonymous, authenticated non-owner, enrolled sequential learner, and site-owner paths.

## 5. Safety boundary

Not performed:
- no live Supabase project listing/selection or connection;
- no database query or catalog inspection;
- no lesson content or learner data read;
- no test UPDATE, INSERT, DELETE or RPC call;
- no SQL migration, grant, policy, schema or API setting change;
- no code, lesson content, CI workflow, deployment or `main` change.

Supabase's current documentation says RLS should be enabled on tables in exposed schemas and that table grants and row policies are separate access gates. It also notes that UPDATE requires a matching SELECT policy and an applicable UPDATE policy. Reference: [Supabase Row Level Security guide](https://supabase.com/docs/guides/database/postgres/row-level-security).

## 6. Change and backup record

- Report-only preparation; no application or database changes.
- Starting HEAD: `451ae99d03568133ba97d4ccbf25894e04a0faa0`.
- Main HEAD: `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`.
- Pre-work backup: `backup/b3-k100-lesson-content-live-metadata-plan-before-2026-11-17`.
- Post-work backup will point to the report commit.
- CI not run; this is a documentation-only change.
