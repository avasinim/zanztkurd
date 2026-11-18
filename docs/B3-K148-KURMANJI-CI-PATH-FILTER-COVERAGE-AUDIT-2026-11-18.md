# B3-K148 — Kurmanji CI Path-Filter Coverage Audit (2026-11-18)

## Scope and decision
Read-only review of `.github/workflows/validate-kurmanji-package.yml` on `fix/kurmanji-ci-current-migration`. The workflow file is protected by the project's explicit CI-configuration approval boundary. This audit therefore makes no workflow edit and does not dispatch a run.

## Verified trigger configuration
The workflow has:
- `push` branch filters including `fix/kurmanji-ci-current-migration`.
- `pull_request` targeting `main`.
- `workflow_dispatch`.
- Matching `paths` lists under both push and pull_request.

The current paths include the validator scripts and two earlier Kurmanji migrations, but omit both of these artifacts:
1. `supabase/migrations/20261118100000_enforce_full_lesson_prefix_progression.sql`
2. `supabase/tests/kurmanji_full_prefix_progression.sql`

## Impact
A push or pull request that changes only either omitted file will not satisfy the workflow's current path filter, so the package-integrity workflow will not automatically run for that change. This matters because the SQL parser step parses the migration inputs selected by its script, and the package validator reads the proposed migration and SQL regression test. The validator path itself is included, which is why K147's validator change triggered CI successfully.

The existing `workflow_dispatch` trigger offers a manual-run path where an authorized operator selects the relevant branch; no manual run was initiated as part of this audit.

## Minimal proposed patch (not applied)
Add the following two entries to BOTH the `push.paths` and `pull_request.paths` lists:
- `supabase/migrations/20261118100000_enforce_full_lesson_prefix_progression.sql`
- `supabase/tests/kurmanji_full_prefix_progression.sql`

No other path-filter broadening is recommended by this focused audit. In particular, do not use a blanket `supabase/**` filter unless a separate review justifies the wider trigger surface.

## Safety
- No workflow or CI configuration changed.
- No run was dispatched manually.
- No Supabase project queried or modified.
- No migration applied; no Auth, RLS, GRANT/REVOKE, deployment, PR, merge, or main-branch change.
- No course or lesson content changed.

## Repository state
- Repository: `avasinim/zanztkurd`
- Work branch: `fix/kurmanji-ci-current-migration`
- Starting HEAD: `6f832053bc1a73419a9181c83cb29ec436dc206f`
- Pre-work backup: `backup/b3-k148-ci-path-filter-audit-before-2026-11-18` at `6f832053bc1a73419a9181c83cb29ec436dc206f`
- Main baseline observed: `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`

A separate explicit approval is required before applying this CI configuration patch.
