# B3-K145 — Full-Prefix Progression Helper Edge-Case Test Expansion (2026-11-18)

## Objective
Expand the existing pure-SQL regression assertions for the proposed full-prefix progression helper. This is a repository-only test change; no migration or database was executed.

## Change
Updated `supabase/tests/kurmanji_full_prefix_progression.sql` with additional assertions for:
- Empty progress does not unlock lesson 2.
- NULL and zero lesson indexes are rejected.
- NULL and empty lesson-order arrays are rejected.
- The exact final lesson boundary for a 26-lesson course.
- The exact final lesson boundary for a 12-lesson course.
- A missing penultimate prerequisite blocks the final lesson in each course length.

The previous seven cases remain. The file now contains 15 helper-level assertions in total.

## Scope and limitations
- This SQL file calls the proposed helper and therefore can run only after the corresponding migration is applied in a disposable/test database.
- The assertions have **not** been executed against Test or Production.
- The repository CI status observed for this commit contains only a completed/skipped Supabase Preview check; no PostgreSQL parser or SQL-runtime check was observed for this commit.
- These remain helper-level tests, not live RPC/JWT/RLS/ACL integration tests. They do not prove enrollment, owner bypass, verified-contact, grants, or end-to-end content denial.
- No source migration, course content, lesson key, course mapping, application code, or workflow was changed.

## Safety
No Supabase project was queried or modified. No migration was applied. No Auth, user, OTP, RLS, grant, deployment, PR, merge, or main-branch operation occurred.

## Repository and backups
- Repository: `avasinim/zanztkurd`
- Work branch: `fix/kurmanji-ci-current-migration`
- Starting HEAD: `9bc5f9a23c78a33283d3d2482ae0b961bd1f3690`
- Pre-work backup: `backup/b3-k145-prefix-edge-tests-before-2026-11-18` at `9bc5f9a23c78a33283d3d2482ae0b961bd1f3690`
- Test update commit: `68cdda78404506ed349a5c46fef79349a5928e6b`
- Main observed unchanged: `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`

The change is limited to the SQL regression test file.
