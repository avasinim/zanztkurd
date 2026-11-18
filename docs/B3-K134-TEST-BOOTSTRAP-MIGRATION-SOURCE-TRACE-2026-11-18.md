# B3-K134 — Test Bootstrap Migration Source Trace and Evidence Gap (2026-11-18)

## Scope and safety boundary

- Repository: `avasinim/zanztkurd`
- Work branch: `fix/kurmanji-ci-current-migration`
- Supabase target: isolated `zanztkurd-kurmanji-test` (`juwsjljbdwyncicybwoq`) only.
- Production project was not queried or modified.
- Read-only trace of the Test project's migration ledger and repository history. No SQL writes, DDL, GRANT/REVOKE, migration, Auth operation, deployment, PR, merge, or main-branch change.

## Starting point and backup

- Starting work-branch HEAD: `9c32919b27c989f59f62aa31f4f4c9fd9fd361f3`
- Main remained at: `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`
- Pre-work backup: `backup/b3-k134-test-bootstrap-migration-source-trace-before-2026-11-18` at `9c32919b27c989f59f62aa31f4f4c9fd9fd361f3`

## Test project's migration ledger

The live Test project's migration ledger returned 16 entries:

| Version | Migration name |
|---|---|
| 20261020052016 | `test_baseline_schema` |
| 20261020052024 | `add_kurmanji_courses_and_protected_lessons_test` |
| 20261020052056 | `restrict_test_rpc_anon_execution` |
| 20261020052347 | `mirror_production_rls_policies_for_kurmanji_test` |
| 20261021051149 | `add_student_has_enrollment_rpc` |
| 20261021052625 | `register_kurmanji_test_courses` |
| 20261021053900 | `tighten_profile_trigger_and_course_indexes` |
| 20261021054729 | `restrict_student_enrollment_insert_status` |
| 20261021060103 | `restrict_anon_table_privileges_test` |
| 20261021070221 | `restore_owner_admin_dashboard_rpcs_test` |
| 20261021070238 | `lock_down_owner_admin_rpcs_test` |
| 20261021111049 | `harden_course_enrollment_test` |
| 20261021111825 | `revoke_authenticated_truncate_test` |
| 20261021112047 | `remove_redundant_student_enrollment_insert_policy_test` |
| 20261024121045 | `validate_kurmanji_release_course_data_and_progression` |
| 20261118062448 | `reconcile_kurmanji_seed_content` |

## Repository-source trace

1. The current work branch's tracked `supabase/migrations/` directory contains 16 SQL files, none named for the Test bootstrap migrations above.
2. The tracked SQL files were inspected for `ALTER DEFAULT PRIVILEGES`; none contains that statement.
3. GitHub repository code search for the exact `test_baseline_schema` migration name returned zero matching files.
4. The historical `kurmanji-test-config` branch's migration directory was inspected; it contains the shared production-style migration series, not the Test bootstrap SQL names listed in the Test project's ledger.
5. The Test ledger itself proves that those migration names and versions are recorded in the database. It does not preserve their SQL bodies or prove the original authoring mechanism.
6. No migration SQL body for `test_baseline_schema`, `restrict_test_rpc_anon_execution`, `restrict_anon_table_privileges_test`, or the other Test-only ledger entries was recovered from the repository sources inspected in this pass.

## Interpretation

The exact SQL source for the Test-only bootstrap migrations is not available in the repository refs inspected. Consequently, this audit cannot determine whether a particular bootstrap migration created, modified, or intentionally preserved the current default ACL entries for `postgres` and `supabase_admin`.

The live catalog remains the authoritative snapshot of current state; the migration ledger is evidence of recorded migration names and versions, not a substitute for missing migration bodies.

The absence of source in the inspected repository refs does not prove that the SQL never existed elsewhere, was never applied, or was not generated/applied through another workflow. It only means the original source has not been recovered from the available repository evidence.

## Safe disposition

- Do not reconstruct or invent the missing SQL from migration names.
- Do not replay any Test ledger migration.
- Do not add a guessed migration-history row or edit the ledger.
- Do not change defaults for `supabase_admin`; platform-managed role behavior and ownership have not been established.
- Keep any proposed `postgres` default-ACL adjustment separate until the application migration execution role and intended object grants are confirmed.
- If the original SQL can be recovered from the original operator's local migration folder, CI artifact, or an independently preserved backup, verify its exact contents and checksum before considering any change.

## Result

This pass closes the repository-source trace as an evidence gap, not as a root-cause finding. It does not authorize or perform any database privilege change.

No production access, database writes, migration application, Auth changes, source lesson edits, CI changes, deployment, PR, merge, or main-branch update occurred.
