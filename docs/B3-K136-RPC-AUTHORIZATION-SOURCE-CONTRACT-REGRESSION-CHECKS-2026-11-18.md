# B3-K136 — RPC Authorization Source-Contract Regression Checks (2026-11-18)

## Scope

Add static regression checks to the existing Kurmanji package validator for privileged RPC definitions. The checks are deliberately source-only: they parse committed SQL files and do not connect to Supabase, call RPCs, create users, or modify database state.

## Change

Updated `scripts/validate_kurmanji_package.py`, which is already executed by the existing `validate-kurmanji-package.yml` workflow.

New checks cover:

- The four owner-admin RPCs in `20261007152000_admin_dashboard.sql`: `admin_list_users`, `admin_list_enrollments`, `admin_list_progress`, and `admin_set_enrollment_status`.
- Each admin function must retain its in-function `is_site_owner()` guard, an explicit `search_path` on its SECURITY DEFINER definition, revocation of default `PUBLIC` execution, and an explicit `authenticated` grant.
- The committed latest Kurmanji migration's `can_read_lesson_content` and `complete_lesson` functions must retain identity, enrollment, sequence, and verified-contact checks.

The checks are source-contract regression guards, not a live database authorization test. Three other advisor-flagged helpers (`enroll_in_course`, `is_site_owner`, and `student_has_enrollment`) have no matching canonical definitions in the inspected tracked migration files; their current Test database definitions were reviewed in K135, but this task does not invent or reconstruct missing migration history.

## CI verification

- Workflow run: [44259533948](https://github.com/avasinim/zanztkurd/actions/runs/44259533948)
- Result: SUCCESS.
- PostgreSQL SQL parser: passed.
- Seed parity validator: passed.
- Kurmanji package/source validator including the new RPC contracts: passed.
- Playwright browser suite: 11/11 passed.
- Playwright suite uses synthetic browser-side Supabase mocks; it is not a real learner JWT, live RPC, or live RLS test.

An earlier intermediate commit's run failed because the first regex-based source extractor did not account robustly for SQL dollar-quoting. The validator was corrected to use explicit SQL function delimiters; the final run above passed. No CI workflow file was changed.

## Backups and branch boundaries

- Work branch: `fix/kurmanji-ci-current-migration`
- Pre-work backup: `backup/b3-k136-rpc-authorization-regression-tests-before-2026-11-18` at `5e84520b340d9c6fbac9ea1c61b2a441d07f29a6`
- Final code commit: `6d4005fa0862169801586fe8c5ecffbb30a91584`
- Main baseline remained `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`

## Safety

No Supabase project was queried or modified in K136. No SQL write, DDL, migration, GRANT/REVOKE, Auth operation, lesson content edit, workflow change, deployment, PR, merge, or main update was performed.
