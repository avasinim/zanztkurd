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
