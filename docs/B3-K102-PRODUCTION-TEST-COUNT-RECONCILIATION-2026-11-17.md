# B3-K102 — Production/test content reconciliation and count-source verification

- Date: 2026-11-17
- Repository: `avasinim/zanztkurd`
- Work branch: `fix/kurmanji-ci-current-migration`
- Starting HEAD: `c1ad02182e5b5953a77d1f0b02dad88acd8474ec`
- Pre-work backup: `backup/b3-k102-count-reconciliation-before-2026-11-17`
- Production Supabase: `zanztkurd` (`hjpmorabqdhuchpnowiw`)
- Test Supabase: `zanztkurd-kurmanji-test` (`juwsjljbdwyncicybwoq`)
- Scope: read-only aggregate counts, project configuration, migration ledger and existing SQL source review.
- No lesson bodies, lesson titles, student identifiers, emails, or progress details were selected. No database writes or deployments.

## Executive result

Production and test must not be conflated. The production project is the one configured in `supabase-config.js`; it contains 112 lesson-content rows across four course IDs. The separate test project contains exactly 38 lesson-content rows, the two Kurmanji course inventories only.

The prior K101 report's aggregate count section is consistent with direct aggregate SQL. The separate `list_tables` metadata call returned a `rows: 0` field for every production table, which conflicts with direct SQL counts. Therefore, that metadata `rows` field is not a reliable production row count in this context and must not be repeated as proof that production is empty. Exact aggregate SELECTs against each project are the source used below.

## 1. Project identity

The repository's `supabase-config.js` points to `https://hjpmorabqdhuchpnowiw.supabase.co`, confirming `zanztkurd` as production. The other linked project is explicitly named `zanztkurd-kurmanji-test`; it is not the production endpoint.

Both projects reported `ACTIVE_HEALTHY`.

## 2. Exact aggregate lesson-content counts

Only grouped counts by `course_id` were queried; no lesson keys or content were selected.

| Course ID | Production | Test |
|---|---:|---:|
| `kurmanji-course-1` | 26 | 26 |
| `kurmanji-course-2` | 12 | 12 |
| `orthography-kurdik` | 42 | absent |
| `phonetics-phonology-kurdik` | 32 | absent |
| **Total lesson_content rows** | **112** | **38** |

The two Kurmanji course inventories match exactly at 26 and 12 rows in both projects. Production also contains 42 orthography rows and 32 phonetics rows.

## 3. Other aggregate table counts

| Table | Production | Test |
|---|---:|---:|
| `courses` | 4 | 4 |
| `lesson_content` | 112 | 38 |
| `profiles` | 5 | 4 |
| `enrollments` | 9 | 1 |
| `lesson_progress` | 47 | 5 |
| `site_owners` | 1 | 1 |

These are aggregate counts only. They do not identify any person or expose progress details.

## 4. Why the table-listing count looked different

The Supabase `list_tables(verbose=true)` response represented all production `rows` values as zero, even for tables where direct aggregate SQL returned nonzero counts. For the test project, that same metadata call returned nonzero values for some tables. This is an observed inconsistency between two metadata interfaces.

Do not use the `rows` property from that listing to conclude production is empty. For this audit, direct read-only `count(*)` and grouped `count(*)` queries are the authoritative count evidence. The discrepancy itself should be investigated as a connector/metadata reporting issue if future tooling depends on those estimates.

## 5. Migration and content release implications

- Production migration ledger ends at `20261024122051_add_kurmanji_courses_and_protected_lessons`.
- The repository contains `20261116120000_reconcile_kurmanji_seed_content.sql`, which is a forward-only reconciliation targeting 12 Kurmanji rows.
- The test project has its own test-specific migration history and does not represent a replay of the production ledger.
- The migration source includes a preflight intended to refuse updates when the existing row no longer matches the expected historical payload, and it checks that exactly 12 rows are changed.
- Neither the production nor test migration ledger listed the production reconciliation migration version at the time of this inspection.

This does not establish that production Kurmanji row counts are wrong: production already has the expected 26 + 12 Kurmanji row counts. It also does not establish that the 12 stored bodies match the latest repository seed text. No content comparison was performed because that would require reading lesson bodies. Do not apply the reconciliation migration solely because its version is absent; first compare its exact source payload and preflight behavior in a disposable, owner-authorized test environment, then obtain a separate approval for any production migration.

## 6. Safety record

- Both projects: read-only aggregate SQL only.
- No lesson body, lesson title, student identifier, email, enrollment detail, or individual progress row selected.
- No INSERT, UPDATE, DELETE, DDL, migration, privilege, RLS, Auth, Storage, or API setting changed.
- No CI workflow, public website, deployment, PR merge, or `main` update.
- The isolated Git branch is the only repository work area.

## 7. Next safe actions

1. Resolve why `list_tables` reports zero production rows while direct aggregate SQL reports nonzero values; do not use the former for production counts until understood.
2. If content parity needs to be established, compare deterministic hashes of lesson bodies inside each database and return only aggregate match/mismatch counts, never the bodies. This requires an explicitly reviewed read-only query design.
3. Test the 12-row reconciliation migration in a disposable database cloned from a known baseline, with no production writes.
4. Review the security advisor findings separately; do not revoke SECURITY DEFINER RPC execute grants blindly because several are required by the application and have owner checks.

## References

- K101 audit: `docs/B3-K101-PRODUCTION-METADATA-AND-MIGRATION-DRIFT-AUDIT-2026-11-17.md`
- Kurmanji validator: `scripts/validate_kurmanji_package.py`
- Reconciliation migration: `supabase/migrations/20261116120000_reconcile_kurmanji_seed_content.sql`
- Supabase RLS: https://supabase.com/docs/guides/database/postgres/row-level-security

## Backup and change record

- Pre-work backup: `backup/b3-k102-count-reconciliation-before-2026-11-17` at `c1ad02182e5b5953a77d1f0b02dad88acd8474ec`.
- Post-work backup: to be created at the report commit.
- Change type: documentation only.
- CI: not run; no executable code or application files changed.
