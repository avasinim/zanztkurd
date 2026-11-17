# Lesson-content table provenance and migration-chain audit — 2026-11-17

## Scope

Read-only repository audit on `fix/kurmanji-ci-current-migration`, starting at `a9bd2c955b501fe0ffb57b1b6cb76ad6f5e80028`. Reviewed the complete checked-in migration inventory, the schema snapshot, and the migrations that seed lesson content, add the course index, define the access policy, and replace the access/progress RPCs.

No Supabase connection was made. No database catalog or row was queried. No migration was run. No SQL, schema, lesson, application code, CI, PR, or deployment was changed.

## 1. Finding: no checked-in creation definition for public.lesson_content

The checked-in migration inventory contains 17 migration files. Across that inventory:
- `20261007152000_admin_dashboard.sql` creates admin RPCs but does not create `lesson_content`.
- `20261010073644_index_lesson_content_course_id.sql` creates an index on `public.lesson_content(course_id)`, presuming the relation already exists.
- `20261010090000_align_lesson_content_owner_rls.sql` drops/recreates a SELECT policy on `public.lesson_content`, presuming the relation already exists.
- `20261010091000_enforce_sequential_lesson_content_access.sql` creates the access RPC and SELECT policy, again presuming the relation exists.
- `20261019090000_add_kurmanji_courses_and_protected_lessons.sql` inserts/upserts lesson rows into `public.lesson_content`; it does not create the table.
- `20261024122051_add_kurmanji_courses_and_protected_lessons.sql` inserts/upserts the release rows and replaces access/progress RPCs; it does not create the table.
- `20261116120000_reconcile_kurmanji_seed_content.sql` reconciles existing rows; it does not create the table.

The checked-in `supabase/schema.sql` defines profiles, courses, enrollments, lesson_progress and site_owners, but has no `CREATE TABLE public.lesson_content` statement and no `ALTER TABLE public.lesson_content ENABLE ROW LEVEL SECURITY` statement.

Therefore the repository does not identify the original creation source of `public.lesson_content`. It may have been created in an earlier untracked migration, manually in the Supabase dashboard, or in another schema artifact not present in this branch. Those possibilities are not distinguishable from checked-in evidence and must not be presented as fact.

## 2. Consequence: table-level RLS state cannot be inferred from policy presence

The migration `20261010091000_enforce_sequential_lesson_content_access.sql` creates a SELECT policy named `Enrolled users and owners can read lesson content`. The later Kurmanji migration replaces the function called by that policy but does not enable RLS on the relation.

In PostgreSQL, a policy is enforced only when row-level security is enabled for the table. Thus:
- a policy definition in source is evidence that a policy was intended;
- it is not evidence that RLS was enabled on the relation;
- the absence of a table-creation migration means the repository does not show the table's initial RLS state;
- the absence of `FORCE ROW LEVEL SECURITY` means the checked-in source does not establish forced RLS for table owners (and table-owner behavior must be interpreted with the actual relation owner and role context).

The live relation may nevertheless have RLS enabled by an out-of-repository action. This audit cannot determine that.

## 3. Migration dependencies and ordering

The relevant checked-in sequence is:

1. `20261007152000_admin_dashboard.sql`: owner/admin RPCs.
2. `20261007160000_change_owner_email.sql`: owner predicate implementation.
3. `20261010060000_repair_site_owner_email_fallback.sql`: replaces owner predicate with fixed empty search_path and fallback logic.
4. `20261010070000_allow_site_owner_to_bypass_lesson_prerequisite.sql`: modifies completion prerequisite behavior for owner.
5. `20261010073609_restrict_anon_lesson_access_rpc.sql`: revokes anon EXECUTE on access/enrollment RPCs.
6. `20261010073644_index_lesson_content_course_id.sql`: adds course_id index to the pre-existing lesson_content relation.
7. `20261010090000_align_lesson_content_owner_rls.sql`: creates owner/enrollment SELECT policy.
8. `20261010091000_enforce_sequential_lesson_content_access.sql`: defines sequential access RPC and replaces the SELECT policy with a predicate that combines owner/enrollment and progression checks.
9. `20261019090000_add_kurmanji_courses_and_protected_lessons.sql`: adds Kurmanji course rows and replaces access/progress RPCs for the expanded course inventory.
10. `20261024122051_add_kurmanji_courses_and_protected_lessons.sql`: later release snapshot with revised seed rows and corresponding expanded RPC definitions.
11. `20261116120000_reconcile_kurmanji_seed_content.sql`: forward-only content reconciliation for selected existing rows.

This chain shows how the checked-in code evolved after the table was already assumed to exist. It does not establish the relation's initial DDL or the live migration ledger.

## 4. Constraint and privilege questions still open

The two Kurmanji content migrations use `ON CONFLICT (lesson_key) DO UPDATE`. This syntax requires a matching unique or exclusion constraint/index on `lesson_key`. The checked-in schema snapshot does not define the table or this constraint. The migrations therefore depend on an untracked/external table definition or prior schema state for successful execution.

The repository also does not provide a complete relation-level ACL record for `lesson_content`. Function-level EXECUTE grants/revokes are present for the access and completion RPCs, but those do not substitute for table SELECT/INSERT/UPDATE/DELETE grants. The effective access boundary depends on both:
- RLS enabled and the expected policies active; and
- role/table grants not independently allowing unintended access.

No conclusion about current production grants, policies, owner, constraints, or RLS flags can be made from the checked-in SQL alone.

## 5. Recommended metadata-only verification (requires explicit user authorization)

Before any live read, obtain explicit authorization for a strictly read-only inspection. Use catalog metadata only; do not select lesson bodies, student rows, enrollment rows, progress rows, or user identifiers.

The inspection should return:
1. `pg_class.relrowsecurity` and `relforcerowsecurity` for `public.lesson_content`;
2. relation owner and relation kind;
3. all policies from `pg_policies`, including command, roles, USING and WITH CHECK expressions;
4. effective table ACL from `information_schema.table_privileges` / `aclexplode`;
5. existence and definition of unique indexes/constraints on `lesson_key` and the `course_id` index;
6. deployed definitions and EXECUTE ACLs for `is_site_owner()`, `can_read_lesson_content(text,text)`, and `complete_lesson(text,text)`;
7. migration ledger entries for the relevant migrations, without applying or repairing anything.

If the user does not authorize a live read, keep this as an unresolved production verification gate. Do not infer state from a deployment note or from the presence of source migration files.

## 6. Release and safety conclusion

**Repository-supported:** later migrations assume `public.lesson_content` already exists; the checked-in schema and migration set do not show its creation; policy creation does not itself enable RLS; content upserts depend on a unique key constraint that is not defined in the checked-in schema snapshot.

**Not established:** where the live table was created, whether RLS is enabled/forced, its owner and grants, whether the expected policies are deployed, whether unique constraints exist, and whether the production migration ledger matches the checked-in branch.

The correct status is **production table provenance and effective access controls unverified**. Do not mark protected lesson content security as complete until metadata-only live verification and isolated-database migration tests are authorized and pass.

## Change record and backups

- Branch: `fix/kurmanji-ci-current-migration`
- Starting commit: `a9bd2c955b501fe0ffb57b1b6cb76ad6f5e80028`
- Pre-work backup: `backup/lesson-content-migration-provenance-before-2026-11-17`
- Change type: documentation only.
- No live DB connection/query, migration execution, code/SQL/lesson change, PR change, or deployment.
