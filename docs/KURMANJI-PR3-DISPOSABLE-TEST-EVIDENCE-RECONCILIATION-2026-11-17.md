# PR #3 disposable-test evidence reconciliation — 2026-11-17

## Executive finding

The available records do not establish that the final Kurmanji course migration was successfully executed in a disposable Supabase project.

There is evidence of:
1. a historical test-database snapshot/checklist note dated 2026-10-21;
2. a separate test-database self-enrollment policy change marked applied and verified;
3. passing static/catalog/navigation/package CI, including three browser tests focused on North Circle catalog routing and mobile overflow;
4. a later PR #3 body that explicitly says the Kurmanji migration had not been validated in a disposable Supabase project.

These are different scopes. They should not be collapsed into a claim that the current 38-row migration passed a real Supabase integration test.

## Evidence examined

### 1. PR #3 current state and explicit blockers

PR #3: `[DRAFT] Isolate Kurmanji courses and North Circle routing`

- URL: https://github.com/avasinim/zanztkurd/pull/3
- Current state at review: open, Draft, unmerged.
- Head branch: `kurmanji-clean-release`
- Base: `main`
- Head SHA observed through GitHub API: `6031f94c682eee2f2961cdb1b584956090956025`
- Updated: 2026-10-25 07:55:06 UTC.

Its description explicitly says:
- Playwright mocks Supabase and does not verify real authentication, enrollment, unlocking, or completion persistence.
- The Supabase migration had not been validated in a disposable test project; do not apply it to production.
- Source-by-source review of all 38 lessons remained outstanding.
- The Supabase Preview check was skipped and is not a database migration test.

This is direct evidence of the PR author's stated release status, not an inference.

### 2. PR #3 checks: what passed and what they tested

The three checks linked in PR #3 are:

| Workflow | Run ID | Result | Head SHA |
|---|---:|---|---|
| Validate academic lesson catalog | 39603846384 | success | `5005411cb4fc2222eff7cbea1f13f73b4fe36f58` |
| Validate lesson navigation | 39603846404 | success | `5005411cb4fc2222eff7cbea1f13f73b4fe36f58` |
| Validate Kurmanji course package | 39603846395 | success | `5005411cb4fc2222eff7cbea1f13f73b4fe36f58` |

The package workflow job log was inspected. It ran the static package validator and three Playwright tests:

- `test_catalog_north_circle_hides_general_catalog_and_routes_both_courses`
- `test_learning_north_circle_hides_general_curriculum_and_restores_it`
- `test_mobile_catalog_has_no_horizontal_overflow`

All three passed. These tests cover catalog visibility/routing and mobile layout. The job does not show a Supabase connection, migration execution, real authentication, RLS testing, or learner completion persistence.

The workflow therefore provides valid evidence of those front-end/static checks, but not of a database integration test.

### 3. The earlier test-database snapshot note

The PR #3 release checklist contains this explicit note:

> An earlier test-DB snapshot was reported on 2026-10-21; this checklist does not treat it as validation of the current reconciled migration.

This is evidence that a snapshot/report existed at that time. It does not identify, in the checklist itself, the exact migration SHA, schema baseline, test project, SQL command, or test run that produced the snapshot. It must not be upgraded into a claim that the final migration was applied and validated.

The checklist separately marks the test-database self-enrollment INSERT policy change as applied and verified. That is a distinct policy test and does not establish that the Kurmanji content migration, its RPC replacements, or all 38 lesson rows were successfully applied.

### 4. 2026-10-22 production readiness note

`docs/KURMANJI-PRODUCTION-DATA-READINESS.md` records a read-only inspection of the configured project `hjpmorabqdhuchpnowiw` on 2026-10-22:

- 42 rows for `orthography-kurdik`;
- 32 rows for `phonetics-phonology-kurdik`;
- zero rows for `kurmanji-course-1` and `kurmanji-course-2`.

That is a historical production snapshot and is consistent with the note's conclusion at that time that Kurmanji course data was not yet present in production. It is not evidence about a separate disposable project.

Later PR #4 and PR #5 descriptions (2026-10-24) assert that the production release migration was applied and that a read-only check found 26 + 12 = 38 Kurmanji lesson rows. Those are later release claims; they do not retroactively prove a disposable migration test. Their live state has not been independently queried in this review.

### 5. Migration and payload status

The 2026-10-24 release audit records static parser and seed-to-migration parity checks for all 38 row tuples. It explicitly distinguishes those checks from running the migration against a database.

The later 2026-11-16 reconciliation migration is another separate artifact and was not executed as part of this evidence review. Its preflight assumes the 12 target rows already exist and checks exact historical values; it is not a clean-bootstrap migration.

## Reconciled conclusion

| Claim | Evidence status |
|---|---|
| PR #3's catalog/navigation/package CI passed | Confirmed by linked workflow runs |
| Three browser tests passed | Confirmed by package job logs; they test catalog/routing/mobile layout |
| PR #3 Playwright proves real Supabase auth/RLS/progression | Not supported; PR explicitly says Supabase is mocked |
| An earlier test-DB snapshot was reported on 2026-10-21 | Confirmed as a checklist statement; underlying snapshot provenance is not identified here |
| A test-database self-enrollment policy was applied and verified | Checklist marks it complete; this is not the Kurmanji course migration |
| The final reconciled Kurmanji migration passed in disposable Supabase | Not established; PR #3 says it had not been validated, and the checklist asks to reconfirm |
| Production contained no Kurmanji rows on 2026-10-22 | Reported by the historical read-only readiness note |
| Production contained 26 + 12 Kurmanji rows after 2026-10-24 release | Asserted by PR #4/#5 descriptions; not independently verified in this review |

## What would close the remaining test-evidence gap

A reproducible disposable-project record must identify:

1. the exact disposable project reference and confirm it is not production;
2. the exact baseline schema artifact and migration ledger before the test;
3. the exact migration file/version and Git commit SHA applied;
4. the migration command/run output and resulting schema/data checks;
5. the resulting 26 + 12 course row counts, unique lesson keys, non-empty payloads, and RPC definitions;
6. real test identities/roles (synthetic only) and browser/API results for signed-out, unenrolled, enrolled, sequence-blocked, completion, owner, and cross-course cases;
7. explicit proof that the run used real Supabase Auth/RLS and did not mock the database boundary.

No credentials, connection strings, student data, or lesson bodies should be added to the report. A schema-only export and redacted logs are sufficient for the metadata portion.

## Safety record

- Work branch: `fix/kurmanji-ci-current-migration`
- Starting commit: `74b62f13d26df998e54f6d06c8a1dcdfb93810bf`
- Pre-work backup: `backup/kurmanji-pr3-test-evidence-reconciliation-before-2026-11-17`
- `main` at review start: `4ebd824ff9502ad71936ee9bdfa787ed898b11a8`
- No Supabase connection, SQL query, migration execution, CI modification, application-code change, lesson edit, PR edit, merge, or deployment was performed.
