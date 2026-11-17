# lesson_content live Supabase metadata-only verification query plan — 2026-11-17

## Purpose and authorization boundary

This document prepares a read-only, metadata-only verification plan for `public.lesson_content`. It is not authorization to connect to Supabase or execute queries. No project credentials, database connection, SQL session, production catalog, learner rows, lesson content, or Storage objects were accessed while preparing it.

Execution requires the user's explicit authorization for a named Supabase project and a read-only database role. Do not use a service-role key in a browser or paste credentials into chat. Prefer a temporary, least-privilege database connection or Supabase SQL editor session that cannot mutate data. If the available role cannot inspect a catalog item, record it as unknown rather than escalating privileges.

## Questions to answer

1. Is RLS enabled and/or forced on `public.lesson_content`?
2. What is the complete live policy inventory, including policy name, command, permissive/restrictive mode, role targets and expressions?
3. Which roles can reach the table through schema usage and table ACLs?
4. What are the effective table privileges for `anon`, `authenticated`, `service_role`, and the table owner?
5. Are there role memberships or inherited grants that change effective privileges?
6. Are there default privileges that may affect future objects? (These do not retroactively grant access to an existing table.)
7. Is the expected migration version present in the migration ledger?
8. What PostgREST exposed schemas and role settings are actually configured? Catalog SQL alone may not reveal environment-level configuration.

## Execution guardrails

- Obtain explicit approval before connecting to the named project.
- Use read-only access; start a transaction with `SET TRANSACTION READ ONLY` where supported.
- Run only the SELECT statements below.
- Do not select from `public.lesson_content`, `lesson_progress`, enrollment/student tables, auth tables, or Storage object tables.
- Do not invoke RPCs, functions with side effects, owner-editor actions, or PostgREST write endpoints.
- Do not run migrations, grants, revokes, policy changes, `ALTER DEFAULT PRIVILEGES`, or dashboard changes.
- Do not print secrets, connection strings, JWTs, email addresses, lesson HTML, or personal data.
- Capture only metadata results and redact project identifiers if the report will be shared publicly.

## Query 0 — session identity and read-only status

```sql
SELECT
  current_database() AS database_name,
  current_user AS current_role,
  session_user AS session_role,
  current_setting('transaction_read_only') AS transaction_read_only,
  current_setting('search_path') AS session_search_path;
```

Before running the remaining queries, the operator should ensure the session is read-only. If using an explicit transaction, issue `BEGIN READ ONLY;` first, then run the SELECT statements, and finish with `ROLLBACK;` (no writes should be attempted).

## Query 1 — table identity, owner and RLS flags

```sql
SELECT
  n.nspname AS schema_name,
  c.relname AS table_name,
  pg_get_userbyid(c.relowner) AS table_owner,
  c.relkind,
  c.relpersistence,
  c.relrowsecurity AS rls_enabled,
  c.relforcerowsecurity AS force_rls,
  c.relacl
FROM pg_class AS c
JOIN pg_namespace AS n ON n.oid = c.relnamespace
WHERE n.nspname = 'public'
  AND c.relname = 'lesson_content';
```

No row means the object is absent or not visible to the inspecting role; distinguish those possibilities before concluding.

## Query 2 — complete human-readable policy inventory

```sql
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename = 'lesson_content'
ORDER BY policyname, cmd;
```

Record every row, not only the expected policy name. Specifically compare policy roles and expressions with the repository's sequence-aware policy. Do not infer policy exclusivity from the presence of the expected row.

## Query 3 — underlying pg_policy details

```sql
SELECT
  p.polname AS policy_name,
  p.polcmd AS command_code,
  p.polpermissive AS is_permissive,
  ARRAY(
    SELECT CASE WHEN role_oid = 0 THEN 'PUBLIC'
                ELSE pg_get_userbyid(role_oid)
           END
    FROM unnest(p.polroles) AS role_oid
  ) AS target_roles,
  pg_get_expr(p.polqual, p.polrelid) AS using_expression,
  pg_get_expr(p.polwithcheck, p.polrelid) AS check_expression
FROM pg_policy AS p
WHERE p.polrelid = 'public.lesson_content'::regclass
ORDER BY p.polname, p.polcmd;
```

This is a second representation of the same policy inventory, useful if the view omits a detail. If the table is missing or inaccessible, do not substitute a guessed OID.

## Query 4 — table and schema privileges for relevant roles

```sql
WITH target_roles(role_name) AS (
  VALUES ('anon'), ('authenticated'), ('service_role')
)
SELECT
  r.role_name,
  to_regrole(r.role_name) IS NOT NULL AS role_exists,
  CASE WHEN to_regrole(r.role_name) IS NOT NULL
       THEN has_schema_privilege(r.role_name, 'public', 'USAGE')
       ELSE NULL END AS public_schema_usage,
  CASE WHEN to_regrole(r.role_name) IS NOT NULL
         AND to_regclass('public.lesson_content') IS NOT NULL
       THEN has_table_privilege(r.role_name, 'public.lesson_content', 'SELECT')
       ELSE NULL END AS can_select,
  CASE WHEN to_regrole(r.role_name) IS NOT NULL
         AND to_regclass('public.lesson_content') IS NOT NULL
       THEN has_table_privilege(r.role_name, 'public.lesson_content', 'INSERT')
       ELSE NULL END AS can_insert,
  CASE WHEN to_regrole(r.role_name) IS NOT NULL
         AND to_regclass('public.lesson_content') IS NOT NULL
       THEN has_table_privilege(r.role_name, 'public.lesson_content', 'UPDATE')
       ELSE NULL END AS can_update,
  CASE WHEN to_regrole(r.role_name) IS NOT NULL
         AND to_regclass('public.lesson_content') IS NOT NULL
       THEN has_table_privilege(r.role_name, 'public.lesson_content', 'DELETE')
       ELSE NULL END AS can_delete
FROM target_roles AS r
ORDER BY r.role_name;
```

These functions report effective SQL privileges, not whether RLS permits a particular row. Table privileges and row policies must be assessed together. Add the table owner as a separately identified role after Query 1; do not assume its name.

## Query 5 — explicit ACL entries on the table

```sql
SELECT
  COALESCE(grantee.rolname, 'PUBLIC') AS grantee,
  grantor.rolname AS grantor,
  privilege.privilege_type,
  privilege.is_grantable
FROM pg_class AS c
JOIN pg_namespace AS n ON n.oid = c.relnamespace
CROSS JOIN LATERAL aclexplode(COALESCE(c.relacl, acldefault('r', c.relowner))) AS privilege
LEFT JOIN pg_roles AS grantee ON grantee.oid = privilege.grantee
JOIN pg_roles AS grantor ON grantor.oid = privilege.grantor
WHERE n.nspname = 'public'
  AND c.relname = 'lesson_content'
ORDER BY grantee, privilege.privilege_type;
```

The table's ACL may be NULL when defaults apply; `acldefault` provides the default ACL representation. Compare this result with Query 4 rather than treating the raw ACL as the whole effective privilege picture.

## Query 6 — role memberships relevant to inherited privileges

```sql
SELECT
  member.rolname AS member_role,
  granted.rolname AS granted_role,
  membership.admin_option
FROM pg_auth_members AS membership
JOIN pg_roles AS member ON member.oid = membership.member
JOIN pg_roles AS granted ON granted.oid = membership.roleid
WHERE member.rolname IN ('anon', 'authenticated', 'service_role')
   OR granted.rolname IN ('anon', 'authenticated', 'service_role')
ORDER BY member_role, granted_role;
```

Interpret membership according to the PostgreSQL version's inheritance and SET ROLE semantics. Do not infer effective privileges solely from direct membership rows; Query 4 is the effective privilege check.

## Query 7 — default privileges (future objects only)

```sql
SELECT
  pg_get_userbyid(d.defaclrole) AS object_creator_role,
  n.nspname AS schema_name,
  d.defaclobjtype AS object_type,
  COALESCE(grantee.rolname, 'PUBLIC') AS grantee,
  grantor.rolname AS grantor,
  privilege.privilege_type,
  privilege.is_grantable
FROM pg_default_acl AS d
LEFT JOIN pg_namespace AS n ON n.oid = d.defaclnamespace
CROSS JOIN LATERAL aclexplode(d.defaclacl) AS privilege
LEFT JOIN pg_roles AS grantee ON grantee.oid = privilege.grantee
JOIN pg_roles AS grantor ON grantor.oid = privilege.grantor
WHERE d.defaclnamespace = 'public'::regnamespace
   OR d.defaclnamespace = 0
ORDER BY object_creator_role, schema_name, object_type, grantee, privilege.privilege_type;
```

Default privileges affect objects created later by the relevant creator role. They do not by themselves explain the current ACL of an already-existing table. Confirm the actual creator role(s) and schema scope.

## Query 8 — migration ledger presence (metadata only)

Only run this after confirming the ledger table exists in the project. Supabase projects commonly use `supabase_migrations.schema_migrations`, but installations may differ.

```sql
SELECT to_regclass('supabase_migrations.schema_migrations') AS migration_ledger;
```

If it exists, query only the version identifier:

```sql
SELECT version
FROM supabase_migrations.schema_migrations
WHERE version IN ('20261010090000', '20261010091000', '20261024122051')
ORDER BY version;
```

Do not edit, repair, or insert migration history. A ledger entry is evidence of recorded migration state, not a complete proof that no manual drift occurred.

## Query 9 — PostgREST configuration boundary

PostgREST exposed schemas and role settings are often configured outside ordinary table catalogs (for example, service environment variables, configuration files, or database settings). A database-only query may not reveal the deployed configuration. If permitted, inspect the deployment's configuration read-only through the authorized hosting interface. Record:
- exposed schemas;
- authenticator role and configured anonymous role;
- JWT role-claim mapping;
- connection pool role;
- any configured pre-request hook;
- schema-cache reload status.

Do not reveal secrets or JWT signing material. Do not change configuration or reload schema cache during this audit.

## Interpretation matrix

| Evidence | Interpretation |
|---|---|
| RLS disabled | Policies do not filter ordinary table access; investigate grants and ownership immediately. |
| RLS enabled, expected policy only | Supports intended row-level policy design, subject to table grants, role mapping and live migration/configuration evidence. |
| Additional permissive SELECT policy | May broaden row visibility because permissive policies OR together. Review its target roles and expression. |
| Additional restrictive SELECT policy | AND-combines with applicable permissive policies and may narrow access. |
| Authenticated UPDATE privilege with no applicable UPDATE policy | RLS normally denies row updates for that role; verify owner/bypass behavior and exact policies. |
| UPDATE privilege plus broad UPDATE policy | Potential write path; review separately and do not test against production data. |
| Service-role access | Service role may bypass RLS depending on role attributes; never expose its credential to clients. |
| Migration ledger differs from expected | Establish migration history and drift before considering any migration action. |

## Reporting template

For each query, record:
- execution date/time and project alias (not credentials);
- executing role and read-only confirmation;
- result row count;
- redacted metadata output;
- visibility/permission errors;
- whether the conclusion is confirmed, conditional, or unknown.

Do not label the system secure or vulnerable from a single query. Reconcile RLS flags, complete policy inventory, effective grants, role inheritance, ownership, migration history, and PostgREST deployment configuration.

## Repository findings this plan is intended to validate

The checked-in SQL inventory reviewed on 2026-11-17 contains one named sequence-aware SELECT policy for `public.lesson_content`, replacing an earlier policy with the same name. The later migration's `DROP POLICY IF EXISTS` is name-specific and does not remove differently named policies. The repository does not establish the live table bootstrap, full production ACL, full policy inventory, or actual PostgREST environment configuration.

## Change record

- Repository: `avasinim/zanztkurd`
- Work branch: `fix/kurmanji-ci-current-migration`
- Starting commit: `d7e4900aee8c883111e1aa30ad694d30e3ba3f26`
- Pre-work backup: `backup/lesson-content-live-metadata-query-plan-before-2026-11-17`
- Change: this documentation file only.
- No SQL was executed; no live database was accessed; no code, migration, test, CI, lesson content, production setting, or PR was changed.
