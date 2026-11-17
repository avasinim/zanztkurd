# lesson_content read/write boundary and owner-tool audit — 2026-11-16

## Scope

Repository-only review on `fix/kurmanji-ci-current-migration` of:
- the lesson-content SELECT policy migrations;
- the latest Kurmanji access RPC replacement;
- `script.js` protected lesson loading;
- `spelling-tool.js` owner-only preview/update workflow;
- `supabase/schema.sql` and the release-test plan.

No live Supabase catalog was queried. No SQL, tests, browser session, or write operation was run. No source, migration, lesson, CI, or production file was modified.

## 1. Read path: layered protection is present in source

The protected lesson page loads its body from `public.lesson_content` using a direct Supabase client SELECT of `content_html` filtered by `lesson_key` (script.js, approximately lines 191–220).

Before loading, the browser gate checks the session, owner status or enrollment, and calls `can_read_lesson_content(course_id, lesson_key)` for non-owners (script.js, approximately lines 222–237 and 238–305). This is a navigation/UI layer, not the final security boundary.

The database migration `20261010091000_enforce_sequential_lesson_content_access.sql` creates the SELECT policy:
- role: authenticated;
- owner path: `public.is_site_owner()`;
- learner path: active/completed enrollment for the same course AND `public.can_read_lesson_content(course_id, lesson_key)`.

The RPC checks authenticated identity, owner status, enrollment, finite course-specific lesson-key lists and immediate predecessor progress. The latest Kurmanji migration (`20261024122051_add_kurmanji_courses_and_protected_lessons.sql`) replaces the RPC body to include the 32-lesson phonetics course and 26/12 Kurmanji courses. It does not recreate the SELECT policy, so the policy created by the earlier migration is expected to persist if migrations were applied in order and not changed remotely.

The earlier `20261010090000` policy only required owner or enrollment. The later `20261010091000` migration drops and replaces that named policy with the sequence-aware version. This migration-order dependency remains material.

## 2. High-priority owner-tool write-path finding

`spelling-tool.js` contains a direct browser-side owner utility:
- `preview()` selects `lesson_key, course_id, title, content_html` from `lesson_content`;
- `apply()` issues `UPDATE public.lesson_content` through the authenticated browser client, changing `content_html` and `updated_at`;
- the UI checks `is_site_owner()` before enabling the tool.

The inspected migrations create a SELECT policy for `lesson_content`, but repository code search found no `FOR UPDATE` policy, `FOR ALL` policy, or explicit `GRANT UPDATE` for this table. The baseline `supabase/schema.sql` also does not define `lesson_content`, enable RLS on it, or define its table grants/policies.

**Conditional consequence:** if the live table has RLS enabled and no separate applicable UPDATE policy, an authenticated site owner using this browser tool will not be able to update rows: the SELECT policy does not authorize UPDATE. The client-side owner check does not substitute for a database UPDATE policy. This is a likely functional mismatch in the source design, not proof of a live production failure.

**Opposite risk if RLS is not enabled:** if authenticated has table UPDATE privilege while RLS is disabled, the client-side owner check alone is not a secure database boundary; a user could bypass the UI and send direct PostgREST requests. The actual live RLS flag and ACL are therefore essential to determine which case applies.

No fix is made. If the owner editor is intended to remain, the safe design should be reviewed separately: authenticated owner-only UPDATE policy using the canonical owner predicate, explicit narrow table privileges, and a test proving non-owner updates are denied. Alternatively, remove/disable the direct browser write feature and use a separately authorized server-side workflow. Do not implement either without approval.

## 3. Read privilege and schema provenance gaps

The reviewed repository sources do not establish:
- where `public.lesson_content` was originally created;
- whether RLS is enabled or forced on the live table;
- table owner and effective SELECT/UPDATE privileges for anon, authenticated and service_role;
- all live policies, including policies added manually or under different names;
- whether a later migration or dashboard edit added an UPDATE policy;
- whether the expected SELECT policy is the one actually deployed.

The release-test plan states that the live SELECT policy requires owner or enrolled learner plus the sequence RPC, and proposes checking RLS/policies after migration in a disposable project. That plan is not evidence that the current production catalog was re-queried during this audit.

## 4. Browser and database boundaries

- Browser route guards are UX and defense-in-depth only; direct REST/PostgREST calls must be denied by RLS/privileges.
- The lesson body is fetched from the table only after the browser gate, but the database policy must independently enforce access.
- The spelling tool's client-side owner check is bypassable by a modified client; only database-side UPDATE authorization can protect the write operation.
- The owner SELECT path exposes all lesson rows to the authenticated owner by design; verify that the live owner predicate and execute grants are correct.
- The latest Kurmanji migration's RPC replacement does not itself alter lesson_content table privileges or policy definitions.

## 5. Read-only verification plan

On the intended Supabase project, with explicit read-only authorization, inspect:
1. `pg_class.relrowsecurity`, `relforcerowsecurity`, relation owner and schema for `public.lesson_content`;
2. every row in `pg_policies` for this table, including command, roles, USING and WITH CHECK;
3. effective privileges for anon, authenticated, service_role and table owner (SELECT, INSERT, UPDATE, DELETE);
4. `information_schema.role_table_grants` and relevant default privileges;
5. the deployed definitions and ACL of `is_site_owner()` and `can_read_lesson_content(text,text)`;
6. migration ledger entries for the two lesson-content policy migrations and both competing Kurmanji migrations.

Do not read lesson bodies, learner progress, enrollment rows or personal data as part of this catalog check. Do not call `spelling-tool.js` apply or issue any write request.

## 6. Test matrix for a disposable project

- Anonymous SELECT: denied.
- Authenticated non-enrolled SELECT: denied.
- Enrolled learner, first lesson SELECT: allowed.
- Enrolled learner, next lesson before predecessor completion: denied.
- Enrolled learner, next lesson after predecessor completion: allowed.
- Owner SELECT: allowed.
- Non-owner UPDATE: denied even when calling PostgREST directly.
- Owner UPDATE: expected behavior must be decided; if editor is retained, allow only owner and verify updated row count.
- If editor is not intended to write through browser, ensure no authenticated UPDATE privilege/policy remains.
- Verify errors and response bodies do not leak protected `content_html`.

## 7. No remediation performed

This dossier documents a conditional policy/write-path mismatch and unresolved live catalog facts. No SQL, application code, grants, RLS policies, migrations, lessons, tests, CI, or production settings were changed.

## Backup and change record

- Work branch: `fix/kurmanji-ci-current-migration`
- Starting commit: `0754d1b382cdfd93025fe1f67bf8c7b6a1b46c8a`
- Pre-work backup: `backup/lesson-content-policy-write-path-before-2026-11-16`
- Post-work backup: `backup/lesson-content-policy-write-path-after-2026-11-16`
- Change type: documentation only.
