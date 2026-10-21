# Kurmanji course release audit — 2026-10-19

## Current state
- PR #3 is the current draft review path for the Kurmanji course changes; it is open and unmerged.
- The course content migration defines 26 lessons for `kurmanji-course-1` and 12 lessons for `kurmanji-course-2`.
- Static GitHub Actions checks have passed, but those checks are not a substitute for a browser end-to-end test or a successful test-database migration.
- Do not apply the migration to the production Supabase project or merge the PR until the release gates below are met.

## Release gates
1. **Source verification:** Review all 38 lesson bodies against their cited academic sources, recording lesson-by-lesson checks for examples, morphology, grammatical claims, and translations. Citations in the lesson alone do not establish that every claim was verified.
2. **Preserve source text:** Do not silently change scientific lesson text, examples, or orthography. Propose any content corrections separately for user review.
3. **Database migration:** Establish the precise cause of the Supabase test branch's `MIGRATIONS_FAILED` state, then run the migration in a safe test environment and inspect its results.
4. **Authorization and progression:** End-to-end test signed-out access, a signed-in but unenrolled student, an enrolled student, the site owner, previous-lesson completion requirements, and persistence of completion.
5. **Release confirmation:** Only after the above checks pass should the PR be considered ready for merge and production rollout.

## Automated seed-to-migration comparison — 2026-10-21

A read-only comparison of the SQL row tuples in the migration and the five split seed files found 38 unique lesson rows in each package. All 38 lesson bodies differ byte-for-byte; several titles differ too. The first differences in sampled lessons are consistent with Sorani spelling variants (for example `چیە`/`چییە`, `نوسین`/`نووسین`, and `ڕێنوسی`/`ڕێنووسی`), but normalization of a small known replacement set does not make the bodies identical. This comparison does not establish that all differences are orthographic or that the teaching examples are semantically equivalent. Treat every lesson as unverified until reviewed against its cited sources; do not copy either package over the other automatically.

The `PDF` link-label correction in the migration and split seed files changes only the label of the De Gruyter DOI link to `DOI`; it does not resolve the lesson-content mismatch.

## Technical caution
The SQL migration replaces `public.can_read_lesson_content` and `public.complete_lesson`. Since these are shared application functions, regression tests must confirm that existing orthography and phonetics/phonology courses still behave correctly after the migration.

## Scope of this audit
This document records the release gates; it does not certify that all 38 lessons have already been source-verified. No production database writes are authorized by this document.
