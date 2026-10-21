# Supabase test migration reconciliation audit — 2026-10-21

## Scope and safety

- Repository: `avasinim/zanztkurd`
- Branch: `kurmanji-test-config`
- Test project ref: `juwsjljbdwyncicybwoq`
- Production project ref: `hjpmorabqdhuchpnowiw` — not inspected or modified during this audit.
- This is a read-only audit record. No migrations were replayed, no database rows were changed, and migration history was not edited.
- This is not a claim that student browser E2E has passed.

## Verified migration ledger

The test database reports these 14 migration records:

```
20261020052016 test_baseline_schema
20261020052024 add_kurmanji_courses_and_protected_lessons_test
20261020052056 restrict_test_rpc_anon_execution
20261020052347 mirror_production_rls_policies_for_kurmanji_test
20261021051149 add_student_has_enrollment_rpc
20261021052625 register_kurmanji_test_courses
20261021053900 tighten_profile_trigger_and_course_indexes
20261021054729 restrict_student_enrollment_insert_status
20261021060103 restrict_anon_table_privileges_test
20261021070221 restore_owner_admin_dashboard_rpcs_test
20261021070238 lock_down_owner_admin_rpcs_test
20261021111049 harden_course_enrollment_test
20261021111825 revoke_authenticated_truncate_test
20261021112047 remove_redundant_student_enrollment_insert_policy_test
```

The branch contains 21 SQL migration files. The ledger and repository file list are not a one-to-one match; do not infer that a missing file means its SQL should be replayed.

## Current database facts observed

### Tables, RLS, policies and privileges

A catalog query found six public relations in the inspected database: `courses`, `enrollments`, `lesson_content`, `lesson_progress`, `profiles`, and `site_owners`. All six are tables with RLS enabled. None has FORCE ROW LEVEL SECURITY enabled. No public views or materialized views appeared in that catalog query.

The current policy list was read for all six tables:

- `courses`: public SELECT policy; insert/update/delete policies require `is_site_owner()`.
- `enrollments`: authenticated SELECT is limited to the current user's rows or site owner; insert/update/delete policies are owner-only. There is currently no student self-insert policy.
- `lesson_content`: authenticated SELECT policy requires site-owner access or an active/completed enrollment plus the lesson-access function; writes are owner-only.
- `lesson_progress`: authenticated SELECT is limited to the current user's rows or site owner; insert/update/delete policies are owner-only. The lesson-completion RPC is the intended student progress write path.
- `profiles`: SELECT and UPDATE policies are limited to the caller's own `id`. The UPDATE policy has both USING and WITH CHECK predicates.
- `site_owners`: SELECT is limited to the caller's own registry row or site owner; writes are owner-only.

The `authenticated` role does not have direct INSERT privilege on `enrollments`, and has no TRUNCATE privilege on the six inspected tables. A table-level or column-level grant alone does not bypass RLS; evaluate grants and policy predicates together. The profile table has column-level grants for its existing columns, so any future tightening should account for the signup/profile-trigger flow and the intended ability to update a profile rather than revoking privileges blindly.

This audit only covers the six public tables returned by the current database catalog query; it is not a universal claim about other schemas, storage, Auth configuration, or every possible database object.

### Functions

Read-only `pg_get_functiondef` inspection confirmed the live test-database definitions for `is_site_owner()`, `student_has_enrollment(text)`, `enroll_in_course(text)`, `can_read_lesson_content(text,text)`, `complete_lesson(text,text)`, and the four admin RPCs. The inspected functions use an empty search path and SECURITY DEFINER where expected. Student-facing functions check authentication/enrollment/lesson ordering as appropriate; admin RPCs check `is_site_owner()`. Previous privilege inspection reported anon EXECUTE disabled and authenticated EXECUTE enabled for the student-facing RPCs, with admin RPC access guarded by owner checks and anon execution revoked.

A SECURITY DEFINER warning from the advisor should not be “fixed” by indiscriminately revoking authenticated execution: the website uses these RPCs. Review each function's guard, grants and call path together.

## File-to-ledger mapping findings

| Database ledger record | Branch file | Current interpretation |
|---|---|---|
| `20261020052024 add_kurmanji_courses_and_protected_lessons_test` | `20261019090000_add_kurmanji_courses_and_protected_lessons.sql` | Name/timestamp mismatch. File includes course/content inserts and sequential-access/completion functions. Do not replay it to repair the ledger. |
| `20261021052625 register_kurmanji_test_courses` | `20261021090000_register_kurmanji_test_courses.sql` | Timestamp mismatch. File upserts four course catalog records with totals 26, 32, 26, and 12. |
| `20261021054729 restrict_student_enrollment_insert_status` | `20261021060000_restrict_student_enrollment_insert_status.sql` | Timestamp mismatch. File creates a student INSERT policy allowing only self-owned active enrollments with NULL completed_at. A later recorded migration removes this redundant policy; the current database has no student enrollment INSERT policy and direct authenticated INSERT is revoked. Treat the file as a historical intermediate state, not current truth. |
| `20261021053900 tighten_profile_trigger_and_course_indexes` | Same timestamp/name file | Timestamp/name match. Current database has the listed course-related indexes from previous read-only inspection; no changes made. |
| `20261021060103 restrict_anon_table_privileges_test` | Same timestamp/name file | Match. File revokes anon privileges on student/content/owner tables and leaves anon SELECT on courses. |
| `20261021070221 restore_owner_admin_dashboard_rpcs_test` | Same timestamp/name file | Match. Current function definitions include the owner guards; the following migration narrows execution privileges. |
| `20261021070238 lock_down_owner_admin_rpcs_test` | Same timestamp/name file | Match. File revokes PUBLIC/anon execution and grants authenticated execution for the four owner-guarded admin RPCs. |
| `20261021111049 harden_course_enrollment_test` | `20261021120000_harden_course_enrollment_test.sql` | Timestamp mismatch. The current `enroll_in_course(text)` definition matches the test-only hardening intent: verified account unless owner, known course, completed status preserved, and direct authenticated INSERT revoked. |

### DB-only records without a same-named file on this branch

- `test_baseline_schema`
- `restrict_test_rpc_anon_execution`
- `mirror_production_rls_policies_for_kurmanji_test`
- `add_student_has_enrollment_rpc`
- `revoke_authenticated_truncate_test`
- `remove_redundant_student_enrollment_insert_policy_test`

Their effects must be reconstructed from actual database state and trustworthy historical source/commit evidence before proposing any repository file. The final item is partly observable in current state (no student INSERT policy remains); that does not by itself establish the exact historical SQL. Do not synthesize or apply a migration solely from its name.

## Remaining gaps and next safe steps

1. Recover historical SQL for the six DB-only migration records from reliable Git commit/history evidence if available; otherwise label exact SQL as unrecovered.
2. Compare each recovered SQL statement with current catalog definitions, grants, RLS policies, indexes, triggers, and relevant data state.
3. Build a final matrix with one row per DB ledger entry: exact DB version/name, matching branch file, content equivalence status, and evidence.
4. Only then propose a reconciliation strategy. Do not reset the test database, replay migrations, rewrite migration history, force-push, merge PR #2, edit `main`, or touch production.
5. Student browser E2E remains outstanding. It must be performed with the existing student account through a safe browser flow; never request the password in chat.
6. Auth leaked-password protection was previously reported disabled by the Supabase security advisor; inspect the Auth setting separately and do not change it without approval.

## Verification boundaries

The database queries in this audit are read-only snapshots of the test project's state at the time of execution. They do not prove that browser login, self-enrollment, lesson locking/unlocking, or progress persistence has passed end-to-end testing.


## Follow-up checks — 2026-10-21

### Historical-source search

GitHub code/file search and commit search were run for each of the six DB-only migration names listed above. No results were returned for any of the six. This means the connector search did not recover their source; it does not prove the files never existed or that they are absent from every historical ref. Exact SQL remains unrecovered unless found through further commit/tree inspection.

### Current catalog objects checked

The current index catalog for the six public tables contains:
- Primary/unique indexes: `courses_pkey`, `enrollments_pkey`, `lesson_content_pkey`, `lesson_progress_pkey`, `profiles_pkey`, `profiles_student_number_key`, `site_owners_pkey`.
- Course-related secondary indexes: `enrollments_course_id_idx`, `lesson_content_course_id_idx`, `lesson_progress_course_id_idx`.

These three secondary indexes exist in the test database. This establishes current presence, not which historical migration first created them.

A follow-up trigger query across schemas found `auth.on_auth_user_created_profile`, an AFTER INSERT trigger on `auth.users` calling `public.create_profile_for_new_user()`. The current function is SECURITY DEFINER with an empty search path; it inserts `id` and `full_name` into `public.profiles` from the new auth user and does nothing on ID conflict. No profile trigger was returned by a query limited to public tables, so trigger inspection must include the auth schema.

The public-function catalog query found 10 functions: the four owner-admin RPCs, `can_read_lesson_content`, `complete_lesson`, `create_profile_for_new_user`, `enroll_in_course`, `is_site_owner`, and `student_has_enrollment`. All were SECURITY DEFINER and had `search_path=''`. Catalog privilege checks showed anon EXECUTE false for all 10. Authenticated EXECUTE is true for the website RPCs and owner-guarded functions; it is false for `create_profile_for_new_user()`, which is trigger-invoked. This is a current-state snapshot and not proof of historical migration equivalence.

### Audit limitations

The repository search did not recover the six migration bodies, so the final ledger is still incomplete. Current schema inspection helps validate effects but cannot uniquely reconstruct the exact original SQL, transaction boundaries, comments, or the order in which policies were created and later removed. Do not write replacement migration files or mutate the migration ledger based only on inferred effects.
