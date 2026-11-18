# B3-K133 — Provenance Audit of Public-Schema Default Privileges (2026-11-18)

## Scope and safety boundary

- Repository: `avasinim/zanztkurd`
- Work branch: `fix/kurmanji-ci-current-migration`
- Isolated Supabase target: `zanztkurd-kurmanji-test` (`juwsjljbdwyncicybwoq`) only.
- Production project was not queried or modified.
- This is a read-only database and repository-history audit. No SQL writes, DDL, GRANT/REVOKE, migration, Auth operation, deployment, PR, merge, or main-branch change was performed.

## Backup and starting point

- Starting work-branch HEAD: `e5100a4bcbd18de20866a5a54b7273ecd0222748`
- Main remained at: `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`
- Pre-work backup: `backup/b3-k133-default-privilege-origin-before-2026-11-18` at `e5100a4bcbd18de20866a5a54b7273ecd0222748`

## Findings

### 1. Default ACLs are present for two object-creator roles in schema public

Read-only inspection of `pg_default_acl` returned these entries for `public`:

| Creator role | Object type | Default grantees and privileges |
|---|---|---|
| `postgres` | tables (`r`) | `anon`, `authenticated`, and `service_role`: all table privileges |
| `postgres` | functions (`f`) | `anon`, `authenticated`, and `service_role`: EXECUTE |
| `postgres` | sequences (`S`) | `anon`, `authenticated`, and `service_role`: USAGE/SELECT/UPDATE |
| `supabase_admin` | tables, functions, sequences | Corresponding broad grants to `anon`, `authenticated`, and `service_role` |

These ACLs are creator-role-specific defaults, not evidence that every existing object currently has those privileges. They affect future objects created by the respective role in the configured scope.

No `PUBLIC` grantee appears in the returned ACL strings. The schema-level privilege check showed `anon` and `authenticated` have USAGE on `public`, but not CREATE. That is distinct from object-level privileges.

### 2. Existing application tables do not all inherit the broad default ACL

The current explicit ACL snapshot showed:
- `courses`: `anon` has SELECT; `authenticated` and `service_role` have broader table privileges.
- `enrollments`, `lesson_content`, `lesson_progress`, `profiles`, and `site_owners`: no `anon` table grant in the current ACL snapshot; `authenticated` and `service_role` have the recorded table privileges.

RLS policies remain a separate row-level control. This audit does not treat table grants as proof that a caller can read or modify protected rows.

### 3. Tracked migration history does not identify the origin of these defaults

All 16 SQL files currently tracked in `supabase/migrations/` were inspected for `ALTER DEFAULT PRIVILEGES`, broad `GRANT`, and `REVOKE` statements.

- No tracked migration contains an `ALTER DEFAULT PRIVILEGES` statement.
- Tracked migrations do contain targeted function privilege restrictions, including revokes from `PUBLIC` and/or `anon`, followed by grants to `authenticated`.
- The isolated test project's migration ledger includes test/bootstrap entries such as `test_baseline_schema`, `restrict_test_rpc_anon_execution`, `mirror_production_rls_policies_for_kurmanji_test`, and `restrict_anon_table_privileges_test`; these test-specific migration source files are not present in the repository's tracked migration directory.

Therefore, the repository's tracked SQL does not establish who originally set the current `postgres` and `supabase_admin` defaults, when they were set, or whether the test bootstrap created or inherited them. The exact origin remains unverified. It would be unsafe to attribute them to a particular migration, dashboard action, or Supabase platform process without additional source evidence.

### 4. Current Supabase security advisor findings

The test project's security advisor reported:
- 9 warnings for `SECURITY DEFINER` functions executable by `authenticated`.
- 1 warning that leaked-password protection is disabled.

The nine functions include owner/admin functions and the learner-facing access/progression helpers. This is a static advisor warning, not proof of an exploitable authorization bypass. Their bodies and explicit authorization checks require function-by-function review before deciding whether each RPC should remain callable by signed-in users. No function privilege or Auth setting was changed.

## Assessment

The defensible finding is a future-object privilege exposure risk for objects created by `postgres` or `supabase_admin` in `public`, not a finding that all existing protected tables are currently anonymously accessible.

The two creator roles must be treated separately:
- `supabase_admin` may be used by Supabase-managed operations; do not alter its defaults without authoritative confirmation of ownership and platform impact.
- `postgres` defaults are relevant to application-created objects, but their provenance and intended future-object access model have not been established by the tracked migrations.

A blanket revoke across all object types or creator roles is not recommended. It could disrupt platform-managed objects, API RPCs, sequences, or legitimate application workflows.

## Recommended next steps (not executed)

1. Obtain the missing source for the test bootstrap migrations, especially `test_baseline_schema` and `restrict_anon_table_privileges_test`, and compare their exact SQL with the live `pg_default_acl` state.
2. Identify which role actually creates each category of application object during migrations and dashboard operations.
3. Design narrowly scoped, role-specific defaults for application-owned objects only; preserve deliberate public read access to `courses` and required authenticated RPC calls.
4. Before any change, produce a privilege impact matrix for tables, sequences, and functions, then test it in an isolated disposable schema or project.
5. Review the nine SECURITY DEFINER advisor warnings individually; do not revoke all authenticated execution indiscriminately because some RPCs are part of the learner flow.

No proposed GRANT/REVOKE or migration was applied. Any database privilege change remains a separate operation requiring explicit approval.

## Verification

- Test project queried: `juwsjljbdwyncicybwoq` only.
- Repository migrations inspected: 16.
- Tracked `ALTER DEFAULT PRIVILEGES` statements found: 0.
- Existing table ACLs and schema privileges were read-only inspected.
- Supabase security advisor was read-only.
- No source content, lesson payload, application code, SQL migration, Auth configuration, or database state was changed.
