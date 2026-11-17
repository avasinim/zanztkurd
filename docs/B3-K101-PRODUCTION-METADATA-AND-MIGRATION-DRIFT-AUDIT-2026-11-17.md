# B3-K101 — Production metadata verification and migration drift audit

- Date: 2026-11-17
- Repository: `avasinim/zanztkurd`
- Work branch: `fix/kurmanji-ci-current-migration`
- Starting HEAD: `4c27dc29f89ac458ff5bd017dc62071d294f2551`
- Production Supabase project: `zanztkurd` (`hjpmorabqdhuchpnowiw`)
- Test Supabase project: `zanztkurd-kurmanji-test` (`juwsjljbdwyncicybwoq`)
- Inspection: read-only catalog metadata, exact aggregate counts, migration ledger and security advisor findings.
- No production writes, migrations, row edits, lesson-body reads, or deployment were performed.

## Executive findings

1. Production `public.lesson_content` exists, is owned by `postgres`, and has RLS enabled. FORCE RLS is false.
2. The live production policy set includes SELECT for authenticated enrolled learners/owners and owner-only INSERT, UPDATE and DELETE policies. The repository's K099 concern about a missing owner UPDATE policy is resolved by live metadata.
3. The `anon` role has no direct SELECT/INSERT/UPDATE/DELETE privilege on this table. `authenticated` has all four table privileges, constrained for writes by the live owner-only RLS policies.
4. The production and test projects both have broad schema-level default privileges for objects created by `postgres` and `supabase_admin`: future tables and sequences receive grants to anon/authenticated/service_role, and future functions receive EXECUTE grants. This is a future-object least-privilege concern, not evidence that the existing lesson table is anonymously readable.
5. Production contains 112 lesson-content rows and test contains 38. These are aggregate counts only; no lesson text was selected.
6. Production migration ledger ends at `20261024122051`; the repository's later migration `20261116120000_reconcile_kurmanji_seed_content` is not recorded in production. This is migration drift requiring a content-safe review before release.
7. Supabase security advisors report 11 authenticated-callable SECURITY DEFINER functions and leaked-password protection disabled. The inspected admin function bodies explicitly check `is_site_owner()`; the generic advisor warning is not proof of an authorization bypass.

## 1. Production and test project identification

The repository's `supabase-config.js` points to project `hjpmorabqdhuchpnowiw`, named `zanztkurd`. The second linked project, `juwsjljbdwyncicybwoq`, is named `zanztkurd-kurmanji-test`.

Both projects reported healthy/active status.

## 2. Live `lesson_content` relation metadata

Production catalog query returned:

| Property | Live value |
|---|---|
| Relation | `public.lesson_content` |
| Owner | `postgres` |
| Relation kind | ordinary table |
| RLS enabled | yes |
| FORCE RLS | no |
| Primary key | `lesson_key` |
| Unique key | primary key on `lesson_key` |
| Additional index | btree index on `course_id` |

The test project reported the same table shape and RLS enabled.

## 3. Live production RLS policies

All four policies are PERMISSIVE and scoped to `authenticated`:

| Policy | Command | Predicate |
|---|---|---|
| Enrolled users and owners can read lesson content | SELECT | owner OR active/completed enrollment plus `can_read_lesson_content(course_id, lesson_key)` |
| Site owner can insert lesson content | INSERT | `is_site_owner()` |
| Site owner can update lesson content | UPDATE | `is_site_owner()` in USING and WITH CHECK |
| Site owner can delete lesson content | DELETE | `is_site_owner()` |

No policy for `anon` was returned. This resolves the specific read/write policy uncertainty from K098/K099 for the current production relation.

## 4. Effective table privileges

Effective privilege checks:

| Role | SELECT | INSERT | UPDATE | DELETE | TRUNCATE |
|---|---:|---:|---:|---:|---:|
| anon | no | no | no | no | no |
| authenticated | yes | yes | yes | yes | no |
| postgres (owner) | yes | yes | yes | yes | yes |
| service_role | yes | yes | yes | yes | yes |

The RLS policies are the row-level gate for authenticated operations. The presence of authenticated table-level UPDATE does not mean every authenticated user can update rows: the live UPDATE policy requires the site-owner predicate. No write probe was attempted.

## 5. Default privileges — future-object concern

Both production and test show schema-specific default ACLs for the object-creating roles `postgres` and `supabase_admin` in schema `public`.

The returned ACLs grant:
- future tables: broad table privileges to `anon`, `authenticated`, and `service_role`;
- future sequences: usage/select/update to those roles;
- future functions: EXECUTE to those roles.

No global-scope default ACL row was returned in the inspected catalog query; the broad entries were specifically scoped to `public`.

This does not change the effective grants on already-created tables. It means each newly created object in `public` may be API-accessible unless its creating migration explicitly revokes/restricts grants and configures RLS. A safe project-wide fix must be applied by an appropriately privileged database owner and tested for the exact object-creating roles.

### Attempted isolated test validation — blocked

A proposed `ALTER DEFAULT PRIVILEGES` migration was prepared on the isolated Git branch and submitted only to the test Supabase project. Supabase returned:

`ERROR: 42501: permission denied to change default privileges`

The test migration ledger was re-read afterward and does not contain the proposed migration version; no database change was recorded. The unvalidated migration file was removed from the Git branch. No attempt was made against production.

This means the connector's migration execution role lacks authority to change those default ACLs. Do not work around this by broadening privileges or running unreviewed commands. The change requires an authorized SQL session as the appropriate object-creating role/database owner, or a platform-supported owner-controlled procedure.

## 6. Aggregate course/content reconciliation

The following exact counts were retrieved from production using aggregate queries only:

| Course ID | Configured total | Stored lesson-content rows |
|---|---:|---:|
| `kurmanji-course-1` | 26 | 26 |
| `kurmanji-course-2` | 12 | 12 |
| `orthography-kurdik` | 26 | 42 |
| `phonetics-phonology-kurdik` | 32 | 32 |
| **Total** | **96** | **112** |

The 42 orthography content records are not automatically a defect: the application uses grouped lesson/completion accounting for that course. Confirm that mapping in its source validators before changing counts or content.

The test project contains 38 `lesson_content` rows, matching the 26+12 Kurmanji inventory. Production also contains the 38 Kurmanji rows, plus the existing phonetics and orthography course content.

Additional aggregate row counts:

| Table | Production | Test |
|---|---:|---:|
| courses | 4 | 4 |
| lesson_content | 112 | 38 |
| enrollments | 9 | 1 |
| lesson_progress | 47 | 5 |
| profiles | 5 | 4 |

No user identifiers, names, emails, lesson titles, or lesson bodies were queried in the aggregate count statements. Do not infer that production is empty; it is not.

## 7. Migration ledger drift

Production's applied migration list ends at:

`20261024122051_add_kurmanji_courses_and_protected_lessons`

The repository includes a later forward-only content reconciliation migration:

`20261116120000_reconcile_kurmanji_seed_content`

That migration version was not present in the production ledger returned by Supabase. The test project's ledger also ends at its own test baseline and validation migrations, not the production migration chain.

This does not prove that production content is incorrect. It does mean the repository's latest content reconciliation has not been recorded as applied to production. Before any migration, compare the intended changes and exact lesson source files in an isolated database, confirm the expected row/key set and preserve a backup. Never replay a migration merely because it is absent without understanding its idempotency and current row state.

## 8. SECURITY DEFINER functions and Auth advisor findings

Production security advisor returned:
- 11 authenticated-callable SECURITY DEFINER functions;
- 1 Auth warning: leaked-password protection disabled.

The inspected function definitions for admin list/moderation/enrollment-status RPCs explicitly call `public.is_site_owner()` and raise `NOT_SITE_OWNER` before returning or changing protected data. Learner-facing access/completion/enrollment RPCs also have authentication, verification, enrollment, and/or sequence checks in their bodies.

Supabase's generic warning describes a review requirement for authenticated-callable SECURITY DEFINER functions; it does not, by itself, demonstrate a bypass. Keep EXECUTE grants where the application requires them, but retain the owner checks, fixed empty search paths, and tests. Leaked-password protection is an Auth dashboard setting; no Auth setting was changed.

## 9. Remediation decisions

### Confirmed safe current state
- Keep the current `lesson_content` RLS policies and table grants unchanged.
- No emergency change is indicated by this lesson-content table audit.
- Preserve the owner-only write policy; do not remove authenticated table grants without a reviewed replacement path.

### Requires owner-level action and a controlled test
- Revoke broad default privileges for `anon`, `authenticated`, and `service_role` on future `public` tables, sequences and functions for each actual object-creating role.
- Add explicit grants per migration for API-facing objects.
- Re-run metadata checks in test after an owner-authorized change, including effective privileges and default ACLs.
- Review the 11 SECURITY DEFINER advisor findings one by one, distinguishing intended application RPCs from unintended functions.
- Enable leaked-password protection after reviewing Auth UX impact and plan compatibility.
- Review the unapplied content reconciliation migration against production without selecting lesson bodies into this report.

## 10. Changes and safety record

- Production: read-only metadata/catalog queries and aggregate counts only.
- Test: read-only metadata/catalog queries and aggregate counts; one default-privilege migration attempt failed with permission denied and was not recorded.
- No production/test table rows, lesson bodies, student identifiers, emails or progress details were selected.
- No production/test migration was applied successfully.
- No table grants, RLS policies, functions, Auth settings, Storage objects, API settings, or user records were changed.
- No public site deployment, PR merge, or `main` change.
- An unvalidated migration proposal was removed from the isolated Git branch after its test execution was denied.

## 11. References

- K100 metadata verification pack: `docs/B3-K100-LESSON-CONTENT-LIVE-METADATA-VERIFICATION-PACK-2026-11-17.md`
- Supabase RLS documentation: https://supabase.com/docs/guides/database/postgres/row-level-security
- Supabase leaked-password protection: https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection

## Backup and change record

- Pre-work backup: `backup/b3-k101-default-privileges-before-2026-11-17`
- Starting commit: `4c27dc29f89ac458ff5bd017dc62071d294f2551`
- Post-work backup: to be created at the report commit.
- Change type: documentation only after removing the unvalidated SQL proposal.
- CI: not run; this is an audit report only.
