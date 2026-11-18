# B3-K159 — Lesson-Key / Course-ID Parity Hardening
Date: 2026-11-18

## Executive result

K159 closes a concrete validation gap identified during K157. Previously, the scanner extracted the lesson key from the first SQL tuple field but did not independently validate that the second field (`course_id`) belonged to the course encoded in that key.

The validator now extracts the second literal field and checks key-to-course consistency for every row in four source groups:
- Historical canonical migration (38 rows)
- Forward reconciliation migration (12 rows)
- Forward migration preflight VALUES block (12 rows)
- Five split seed files combined (38 rows)

Expected mapping:
- `kurmanji-course-1-lesson-XX.html` → `kurmanji-course-1`
- `kurmanji-course-2-lesson-XX.html` → `kurmanji-course-2`

A mismatch now fails validation with the source group, lesson key, expected course id, and observed course id.

## Code changes

1. Added `row_course_id(row, label)` to extract and SQL-unescape the second quoted tuple field. It rejects missing, unquoted, or NULL course identifiers.
2. Added `expected_course_id(lesson_key)` to map the two supported Kurmanji key prefixes to their canonical course IDs and reject unrelated keys.
3. Added a parity loop over all four row groups before the validator proceeds with row counts, ordered-key checks, preflight equality, and content parity.
4. Added four focused unit tests:
   - Extracts second literal field.
   - Decodes doubled apostrophe.
   - Rejects unquoted/missing/NULL course IDs.
   - Maps the two known key prefixes and rejects unknown prefixes.

## Verification

- Four focused helper/mapping tests were executed in an isolated Python harness: 4 passed, 0 failed, 0 errors.
- The full repository test module (now 27 tests) was not executed end-to-end in a complete checkout during this task.
- The validator was not run against the complete repository corpus locally.
- No CI run was dispatched. No PostgreSQL execution or database connection was made.
- The four focused harness tests exercise the exact helper logic added, but do not substitute for the full canonical test command.

## CI and migration boundary

The test module remains absent from the current CI workflow; adding it to workflow path filters and invoking it is a separate workflow edit requiring explicit approval. The four SQL path-filter omissions identified in K156 are also unchanged.

The full-prefix progression migration remains unapplied to Test and Production. This K159 source-level validator hardening does not change migration/runtime behavior or database state.

## Scope and safety

Only these files changed:
- `scripts/validate_kurmanji_seed_parity.py`
- `scripts/test_kurmanji_seed_parity.py`

No workflow, SQL migration, SQL test, seed, lesson content, package/dependency, Supabase project, database, Auth, RLS, grants, deployment, PR, merge, or main branch changed.

## Backup and branch references

- Work branch: `fix/kurmanji-ci-current-migration`
- Starting HEAD: `0861738944693e023e5f14f3a3062d179ca165fe`
- Main observed before work: `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`
- Pre-work backup: `backup/b3-k159-seed-course-key-invariant-audit-before-2026-11-18`
- Post-work backup: recorded after this report commit.
