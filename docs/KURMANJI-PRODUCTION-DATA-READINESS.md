# Kurmanji production data readiness — 2026-10-22

## Scope and safety

This is a read-only release-readiness note for `kurmanji-clean-release`. No SQL was applied. No rows, schema, migration history, production branch, or live site were changed.

## Confirmed checks

- The current site's `supabase-config.js` points to project ref `hjpmorabqdhuchpnowiw`.
- A read-only query of `public.lesson_content` in that project found 42 rows for `orthography-kurdik` and 32 for `phonetics-phonology-kurdik`. A query for `kurmanji-course-1` and `kurmanji-course-2` returned no rows.
- The five split SQL content packages contain 38 unique Kurmanji lesson keys: 26 for course 1 and 12 for course 2. All 38 expected keys are represented; no duplicate or missing key was found in the extracted key sets.
- Migration `supabase/migrations/20261019090000_add_kurmanji_courses_and_protected_lessons.sql` also contains those same 38 unique lesson keys.
- The split content SQL files explicitly use `BEGIN` and `ROLLBACK`, so they are review/dry-run scripts rather than a data load that persists rows.
- The migration header explicitly warns that the migration and split seed package are not byte-identical and that explanatory Sorani text was normalized in the migration. Key coverage matching does not prove content equivalence.
- The migration also changes course registration/progression behavior and grants/revokes access on functions. It therefore needs a separate schema, RLS, RPC-authorization, and content-equivalence review; it is not safe to treat it as a simple content-only import.

## Release decision

**Not ready to publish the Kurmanji course pages as a working live course.** The live database has no rows for the new Kurmanji course IDs, while the lesson pages fetch lesson bodies from `public.lesson_content`.

## Required next actions before any production change

1. Compare all 38 lesson bodies in the migration against the approved split seed/source, not just lesson-key coverage; resolve every substantive or orthographic difference under Avasin Code without altering Latin Kurmanji forms or unsupported scientific claims.
2. Review the migration's course updates, RPC definitions, function grants, sequential-access logic, and RLS assumptions against the actual live schema and existing policies.
3. Test the reviewed package in an isolated non-production database/project with explicit authorization, then verify content loading, lesson progression, access controls, and course counts.
4. Only after that review, prepare a narrowly scoped release plan. Do not merge the 529-commit/137-file PR wholesale, apply the migration, or write to production without separate explicit approval.

## Verified references

- Release audit: `docs/KURMANJI-RELEASE-AUDIT.md`
- Split SQL packages: `docs/kurmanji-content-seed-part-01.sql` through `part-05.sql`
- Proposed migration: `supabase/migrations/20261019090000_add_kurmanji_courses_and_protected_lessons.sql`


## Content-by-content comparison — 2026-10-22 follow-up

A structured comparison of the five split SQL packages against the 38 lesson rows embedded in `20261019090000_add_kurmanji_courses_and_protected_lessons.sql` found:

- All 38 lesson keys exist in both places, but **all 38 lesson HTML bodies differ** after whitespace normalization.
- Six lesson titles differ as well: course 1 lessons 01, 03, 07, 26 and course 2 lessons 09, 12.
- The differences are not merely formatting. Examples include the migration changing Avasin spellings such as `ڕێنووسی` to `ڕێنوسی`, `دوور` to `دور` and `دوو` to `دو`, `بەرابەر` to `بەرامبەر`, and `نوسراو`-related wording; it also shortens or rewrites lesson sections. Course 1 lesson 25's extracted HTML is 1,034 characters shorter in the migration than in the split seed, and course 2 lesson 06 is 693 characters shorter. These length differences alone do not establish which version is scientifically correct, but they require review before release.
- Bibliography attribution differs in some migration lesson bodies: split seed references cite Haig (2018), while migration text sometimes attributes the same material to “Haig and Öpengin (2018)”. This needs source-level correction; do not accept the migration text automatically.

### Updated release decision

The migration is **not content-equivalent** to the approved split SQL package and must not be applied as-is. Preserve the split seed/source as the comparison baseline, review each discrepancy, restore Avasin Code spellings in Sorani explanatory text, preserve Latin Kurmanji forms, and verify scientific statements and citations against the source. Do not mechanically replace all migration content without that review. No database write or production change was made during this comparison.


## RPC and access-control static review — 2026-10-22 follow-up

Reviewed the proposed migration's `can_read_lesson_content(text,text)` and `complete_lesson(text,text)` definitions, grants, and transaction boundary. This was source inspection only; no function was executed against a database.

### Positive controls present

- Both functions are declared `SECURITY DEFINER` with an empty `search_path`; application objects are schema-qualified in the reviewed function bodies.
- Both reject unauthenticated callers; `complete_lesson` also rejects non-owner users without a confirmed email or phone.
- `complete_lesson` checks enrollment for non-owners, validates the course and lesson key, and enforces prior-lesson completion for ordinary learners.
- Execute privileges are revoked from `PUBLIC` and `anon`, then granted to `authenticated`.
- The SQL file is wrapped in a transaction.

### Release-blocking review items

1. **Broad change surface:** this is not a content-only migration. It upserts both Kurmanji course records, changes the phonetics course total from any non-32 value to 32, and replaces two shared progression/access functions. The effects on existing courses must be tested against the exact live schema and client expectations before approval.
2. **Access-policy dependency:** the migration defines an access-check RPC but does not itself create or verify the RLS policy on `lesson_content`. Before release, inspect the live policy definition and confirm that it invokes the intended check, that direct table access remains appropriately restricted, and that function ownership/grants match the deployment model.
3. **Owner shortcut:** `can_read_lesson_content` returns true for a site owner before validating the requested course ID or lesson key. This may be intentional for owner-wide content access, but should be explicitly approved and checked against the RLS policy's use of the function.
4. **Progression compatibility:** the migration hard-codes lesson-key order arrays for four course IDs, including the existing phonetics and orthography courses. Compare every key to the deployed catalog and current progress records; the orthography completion-count grouping and the special placement of `045.html` deserve regression tests.
5. **Source/content defects:** the migration's lesson 07 course-2 bibliography duplicates the same DOI link twice, and the migration content uses inconsistent source attribution relative to the split seed. Review these while reconciling the 38 body differences.
6. **Prerequisite assumptions:** the functions depend on existing tables, columns, and `public.is_site_owner()`. Confirm those definitions and their security properties in the target schema before applying; this migration does not establish them itself.

### Static-review decision

Do not apply this migration to production yet. Next, read the exact live definitions of `lesson_content` RLS policies, `public.is_site_owner()`, course enrollment constraints, and existing progression functions, then test the proposed replacement in an isolated non-production database. No production or test database was changed during this review.
