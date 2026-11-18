# B3-K160 — Exact Lesson-Key / Course-ID Invariant Tests
Date: 2026-11-18

## Purpose

K160 follows K159 by tightening the new lesson-key/course-ID guard. K159's prefix-based mapping was sufficient when combined with the validator's later canonical-key list check, but the helper itself accepted malformed suffixes and out-of-range lesson numbers. Its unit tests also exercised extraction and mapping separately without directly asserting that a mismatched row is rejected.

## Changes

Only two source files changed:

1. `scripts/validate_kurmanji_seed_parity.py`
   - `expected_course_id` now requires a full key match: `kurmanji-course-[1|2]-lesson-NN.html`.
   - Enforces course 1 lesson range 01–26 and course 2 lesson range 01–12.
   - Adds `validate_row_course_id`, which extracts the row's second SQL literal, derives the expected course from the exact lesson key, and raises a diagnostic error if they differ.
   - The main validator now calls this single guard for every extracted row group.

2. `scripts/test_kurmanji_seed_parity.py`
   - Expands the course-key test to cover upper/lower range boundaries and malformed key shapes.
   - Adds direct acceptance coverage for a matching row.
   - Adds rejection coverage for a course-1 lesson assigned to course 2.
   - Adds rejection coverage for malformed lesson keys even when their prefix appears plausible.

## Verification

- A local Python check of the exact regex shape and lesson-range decision table passed 7/7 positive/negative cases.
- This was a focused regex/range check, not execution of the repository's Python test module.
- The repository unit test module now contains 30 tests, but the canonical command `python scripts/test_kurmanji_seed_parity.py` was not run against a complete checkout.
- The full seed parity validator was not run against all repository files in this task.
- No CI run, PostgreSQL query, Supabase connection, or database operation was performed.

## Known limits retained

The seed scanner remains a deliberately constrained SQL subset parser, not a complete PostgreSQL parser. Existing documented gaps remain, including SQL comments, dollar-quoted strings, E-strings/backslash escaping, and broader SQL syntax. The current task does not claim to solve those cases.

The test file remains uninvoked by the current CI workflow, and the SQL path-filter omissions from K156 remain unchanged. Workflow changes still require explicit approval.

## Safety boundary

No lesson text, seed SQL, migration, SQL test, workflow, dependency, database, Auth, RLS, grants, deployment, PR, merge, or `main` branch was changed.

The full-prefix progression migration remains unapplied to Test and Production.

## Backup and refs

- Work branch: `fix/kurmanji-ci-current-migration`
- Starting HEAD: `a7e95cb3b03a47dab5ddd5a9756f7510bbc14ab8`
- Main before work: `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`
- Pre-work backup: `backup/b3-k160-seed-validator-structural-audit-before-2026-11-18`
- Post-work backup: recorded after this report commit.
