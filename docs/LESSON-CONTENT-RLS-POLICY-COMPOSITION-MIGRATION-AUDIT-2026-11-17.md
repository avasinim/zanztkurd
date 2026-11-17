# lesson_content RLS policy composition and migration replacement audit — 2026-11-17

## Scope and method

Repository-only audit on `fix/kurmanji-ci-current-migration`, starting at commit `7f70e26042dd787eaf16f4c9fe81f5f4ef492766`. Inspected the complete recursive Git tree's SQL inventory (22 SQL files, including schema, migrations, admin SQL and archived seed SQL), the two policy migrations, the current Kurmanji migration, and the existing lesson-content access dossiers.

The purpose is to test a specific assumption: whether the checked-in sequence-aware SELECT policy is the only policy that can apply to `public.lesson_content`, and whether the migrations guarantee that it replaces every possible earlier policy.

No live Supabase catalog, SQL session, PostgREST endpoint, migration ledger, or production configuration was queried. No lesson bodies, learner records, secrets, or Storage objects were accessed. No code, migration, tests, CI, production setting, or lesson content was changed.

## 1. Repository inventory result

Across the inspected SQL files, the only `CREATE POLICY` declarations targeting `public.lesson_content` are in:

- `supabase/migrations/20261010090000_align_lesson_content_owner_rls.sql`
- `supabase/migrations/20261010091000_enforce_sequential_lesson_content_access.sql`

Both use the same policy name:

`Enrolled users and owners can read lesson content`

The later migration drops that exact named policy and recreates it. It adds the sequence-aware predicate through `public.can_read_lesson_content(course_id, lesson_key)`. The earlier migration's same-named policy is therefore replaced in the repository's intended migration order.

No other checked-in SQL file in the 22-file inventory creates a second policy for `lesson_content`. The baseline `supabase/schema.sql` does not create the table or enable RLS on it. The seed and data-maintenance migrations insert or update rows but do not declare additional RLS policies.

## 2. Important limit: DROP POLICY is name-specific

The later policy migration executes:

```sql
DROP POLICY IF EXISTS
  "Enrolled users and owners can read lesson content"
ON public.lesson_content;
```

That statement removes only a policy with that exact name. It does not remove differently named policies already attached to the table. The repository does not contain a comprehensive `DROP POLICY` inventory for unknown/manual production policies, and source inspection cannot enumerate policies created through the Supabase dashboard or other out-of-repository processes.

Therefore the source establishes one intended policy declaration, not that the live table has exactly one applicable policy.

## 3. Why additional permissive policies matter

The migration's `CREATE POLICY` statement does not specify `AS RESTRICTIVE`. PostgreSQL policies are `PERMISSIVE` by default.

Under PostgreSQL row-security semantics, multiple applicable policies for the same command are combined as follows:

- permissive policy expressions are OR-combined;
- restrictive policy expressions are AND-combined;
- at least one permissive policy must pass, and every applicable restrictive policy must pass.

Consequently, if production contains an additional permissive SELECT policy for `authenticated` or `PUBLIC` whose expression is broader than the intended owner/enrollment/sequence condition, that extra policy may widen the visible row set. The presence of the intended sequence-aware policy does not cancel it.

This is a conditional risk model, not evidence that such an additional policy exists in production.

Authoritative PostgreSQL references:
- Row Security Policies: https://www.postgresql.org/docs/current/ddl-rowsecurity.html
- CREATE POLICY, including default permissive behavior and multiple-policy combination: https://www.postgresql.org/docs/18/sql-createpolicy.html
- `pg_policy` catalog records policy command, permissive flag, roles and expressions: https://www.postgresql.org/docs/18/catalog-pg-policy.html

## 4. Source-level policy statement

The strongest defensible source-level statement is:

1. The repository defines one named, sequence-aware `SELECT` policy for `public.lesson_content`.
2. The later migration replaces the earlier version of that same named policy.
3. The later migration does not remove differently named policies.
4. The repository baseline does not provide the original table bootstrap, RLS enablement, complete ACL, or live policy inventory.
5. Therefore repository source alone cannot establish the effective production policy set or prove that the sequence gate is the only SELECT rule.

This narrows the earlier policy-chain conclusions: migration order explains the intended named policy, but does not prove policy exclusivity in the deployed database.

## 5. Read-only metadata verification proposal

With explicit read-only authorization for the intended Supabase project, inspect metadata only:

1. Enumerate every `pg_policy` row joined to `pg_class` and `pg_namespace` for `public.lesson_content`.
2. Capture `polname`, `polcmd`, `polpermissive`, `polroles`, `polqual` and `polwithcheck` (or the supported human-readable `pg_policies` view).
3. Confirm `pg_class.relrowsecurity` and `relforcerowsecurity`.
4. Resolve role membership/inheritance for every policy role, especially `PUBLIC`, `anon`, and `authenticated`.
5. Compare the complete live policy inventory with the two checked-in migration definitions.
6. Separately inspect table ACLs and migration ledger; policy inventory alone does not establish SQL table privileges or applied migration history.

Do not SELECT `content_html`, learner progress, enrollment rows or personal data. Do not call the owner editor's UPDATE path. Do not make policy or grant changes as part of this verification.

## 6. Remediation is deliberately not proposed as an automatic change

Do not automatically drop unknown policies: they may be intentional, and the repository cannot identify their owner or purpose. Do not convert the intended policy to restrictive, add new policies, alter RLS, or modify production grants without a reviewed design and explicit approval.

If a live metadata review finds additional policies, first document each policy's owner, role scope, command, expression and operational purpose. Then prepare a separate least-privilege design and disposable-project test matrix.

## 7. Change and backup record

- Repository: `avasinim/zanztkurd`
- Work branch: `fix/kurmanji-ci-current-migration`
- Starting commit: `7f70e26042dd787eaf16f4c9fe81f5f4ef492766`
- Pre-work backup: `backup/lesson-content-policy-composition-before-2026-11-17`
- Change type: documentation only.
- No merge, rebase, force-push, deployment, production SQL, schema or policy change.
