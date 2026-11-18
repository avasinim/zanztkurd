# B3-K137 — Full Lesson-Prefix Progression Hardening (2026-11-18)

## Objective

Address the K131 finding: the protected lesson reader and completion RPCs previously checked only the immediately preceding lesson. In an imported or manually repaired non-contiguous progress state, a learner could therefore pass the immediate-predecessor check while an earlier lesson remained incomplete.

## Implementation prepared (not applied)

Added `supabase/migrations/20261118100000_enforce_full_lesson_prefix_progression.sql`.

The migration:
- Adds internal immutable helper `public.has_completed_lesson_prefix(text[],text[],integer)`.
- Requires every key before the requested lesson index to exist in the user's completed progress set.
- Rejects invalid indexes, missing keys, NULL progress arrays, and NULL entries.
- Revokes helper execution from `PUBLIC`, `anon`, `authenticated`, and `service_role`. It is intended to be called internally by the SECURITY DEFINER RPCs.
- Updates `can_read_lesson_content` to check the complete prefix before allowing a non-owner to read a protected lesson.
- Updates `complete_lesson` to check the complete prefix before recording completion.
- Preserves existing owner behavior: `can_read_lesson_content` retains the site-owner bypass; `complete_lesson` retains the existing sequencing exception for site owners outside the orthography course.
- Preserves the existing course lesson ordering, enrollment checks, verified-contact checks, progress writes, and completion accounting.

The migration does not change lesson content, course IDs, lesson keys, enrollments, or existing progress rows.

## SQL regression cases

Added `supabase/tests/kurmanji_full_prefix_progression.sql`, a read-only `DO` block covering:
1. A complete contiguous prefix is accepted.
2. Missing lesson 1 rejects access to lesson 3, even when lesson 2 is complete.
3. A missing middle lesson rejects access to a later lesson, even if a later key is present.
4. Lesson 1 is allowed with no prior progress.
5. An out-of-range lesson index is rejected.
6. NULL progress and NULL entries cannot satisfy a required prefix.

These SQL cases were parsed by PostgreSQL's parser in CI. They were not executed against either Supabase project because the migration has not been applied.

## CI and source validation

Updated:
- `scripts/validate_kurmanji_sql.py` to parse the new migration and SQL regression file.
- `scripts/validate_kurmanji_package.py` to enforce source contracts: helper presence and restricted execution, both RPCs call the prefix helper, immediate-predecessor-only logic is absent, and all regression cases are present.

CI run: [44260091018](https://github.com/avasinim/zanztkurd/actions/runs/44260091018)

Result: SUCCESS.
- PostgreSQL SQL parser: passed for migration and regression SQL.
- Seed parity: passed.
- Package/source-contract validator: passed.
- Playwright: 11/11 passed.

The Playwright suite uses synthetic browser-side Supabase mocks. It is not a live JWT/RLS or database execution test of this new migration.

## Explicit safety boundary

This is a repository-only preparation. The new migration has **not** been applied to the Test project or Production. No Supabase project was queried or modified in K137. No SQL write, DDL, migration application, Auth operation, GRANT/REVOKE on a live database, workflow-file change, deployment, PR, merge, or main update occurred.

Applying the migration and executing the SQL regression block against Test remains a separate database change and requires explicit authorization.

## Backup and verification

- Repository: `avasinim/zanztkurd`
- Work branch: `fix/kurmanji-ci-current-migration`
- Pre-work backup: `backup/b3-k137-kurmanji-full-prefix-progression-before-2026-11-18` at `b0f98afb9ed0a52cc1f85b408eec06a8c5cfbd4c`
- Final work-branch commit: `1193e2aea35a8fcf1acc43a3dc8c70569a4f68a1`
- Main baseline: `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`

No production branch or default branch was changed.
