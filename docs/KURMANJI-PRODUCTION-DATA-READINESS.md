# Kurmanji production data readiness — 2026-10-22

## Scope and safety

This is a read-only release-readiness note for `kurmanji-clean-release`. No SQL was applied. No rows, schema, migration history, production branch, or live site were changed.

## Confirmed checks

- The current site's `supabase-config.js` points to project ref `hjpmorabqdhuchpnowiw`.
- A read-only query of `public.lesson_content` in that project found 42 rows for `orthography-kurdik` and 32 for `phonetics-phonology-kurdik`. A query for `kurmanji-course-1` and `kurmanji-course-2` returned no rows.
- The five split SQL content packages contain 38 unique Kurmanji lesson keys: 26 for course 1 and 12 for course 2. All 38 expected keys are represented; no duplicate or missing key was found in the extracted key sets.
- Migration `supabase/migrations/20261019090000_add_kurmanji_courses_and_protected_lessons.sql` also contains those same 38 unique lesson keys.
- The split content SQL files explicitly use `BEGIN` and `ROLLBACK`, so they are review/dry-run scripts rather than a data load that persists rows.
- **Superseded by the 2026-10-24 reconciliation:** all 38 migration lesson title/content payloads now exactly match the five split seed files after coordinated Avasin Code Sorani spelling corrections. This verifies payload synchronization only; it does not replace source verification or live release testing.
- The migration also changes course registration/progression behavior and grants/revokes access on functions. It therefore needs a separate schema, RLS, RPC-authorization, and content-equivalence review; it is not safe to treat it as a simple content-only import.

## Release decision

**Not ready to publish the Kurmanji course pages as a working live course.** The live database has no rows for the new Kurmanji course IDs, while the lesson pages fetch lesson bodies from `public.lesson_content`.

## Required next actions before any production change

1. The 38 seed/migration title and content payloads have been synchronized and statically rechecked. Before release, complete source-level academic review and live test-project migration/authentication/progression tests; preserve Latin Kurmanji forms unless source evidence supports a change.
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
- Bibliography attribution defect found in the migration was corrected on 2026-10-22: 23 DOI-linked list items now cite Geoffrey Haig as chapter author and Geoffrey Haig & Geoffrey Khan as book editors, matching the institutional publication record. This citation-only fix does not resolve the broader lesson-body differences.

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


## Live schema and function compatibility check — 2026-10-22

A read-only inspection of the live Supabase project `hjpmorabqdhuchpnowiw` compared the currently deployed access/progression functions and RLS policies with the proposed migration. No writes were issued.

### Confirmed live-state mismatch

- The live `lesson_content` SELECT policy, **“Enrolled users and owners can read lesson content,”** requires enrollment and calls `can_read_lesson_content(course_id, lesson_key)` for non-owner users.
- The currently deployed `public.can_read_lesson_content(text,text)` recognizes only `phonetics-phonology-kurdik` and `orthography-kurdik`; all other course IDs return `false`. It has no Kurmanji course branches.
- The currently deployed `public.complete_lesson(text,text)` also recognizes only those two existing course IDs; a Kurmanji course ID falls through to `COURSE_NOT_FOUND`. It has no Kurmanji lesson-order or completion-count branch.
- Therefore, even if Kurmanji content rows were inserted by a separate means, the current live access and completion functions would not support learner access/completion for those new courses. The proposed migration's function changes are a necessary compatibility dependency, not optional cleanup.
- The deployed `public.enroll_in_course(text)` does check for a confirmed email or phone for non-owners, and the four inspected functions are `SECURITY DEFINER`, owned by `postgres`, configured with an empty `search_path`, and currently executable by `authenticated` and `service_role` (not `anon`/PUBLIC according to the returned ACL).
- The live RLS policy for `lesson_content` has an explicit owner shortcut before its enrollment/progression expression. The proposed migration's helper function also returns true for a site owner before validating the course and lesson key. This is a deliberate-looking owner bypass, but must be reviewed as part of the intended authorization model.

### Consequence for release sequencing

Do not publish the Kurmanji catalog/pages or load lesson rows in isolation. A safe release must treat the course rows, all 38 reconciled lesson bodies, the access/progression function updates, and the RLS behavior as one coordinated change. Before production approval, test: (a) enrolled learner can read lesson 1, (b) later lessons remain blocked until the preceding lesson is complete, (c) non-enrolled learner cannot read content, (d) unverified user cannot enroll/complete, (e) site-owner behavior is intentional, and (f) existing phonetics and orthography progression remains unchanged.

This is a static/read-only compatibility finding. No database state was modified, and no production deployment is approved by this note.


## Owner progression behavior — explicit release decision required — 2026-10-22

A focused read of the proposed `complete_lesson(text,text)` body found a course-specific owner behavior that should be explicitly accepted or changed before release:

- For `phonetics-phonology-kurdik` and both Kurmanji course IDs, a site owner can complete a later lesson without the preceding lesson being present in `lesson_progress`.
- For `orthography-kurdik`, the function intentionally keeps sequential completion even for the owner.
- The access-check helper `can_read_lesson_content(text,text)` also returns `true` for the site owner before validating the course ID or lesson key. The live RLS policy has a similar owner shortcut, as documented above.
- For ordinary learners, the proposed completion function checks enrollment and prior-lesson completion; this note is about the exceptional owner path only.

This may be a deliberate administrator convenience, not automatically a defect. However, the different owner behavior between courses is material and should not be accidental. Before approving the migration, choose one policy explicitly: (a) owners may bypass lesson sequencing for all courses, (b) owners must follow sequencing for all courses, or (c) preserve the existing course-specific behavior with a documented reason and tests. Test owner access to an unknown course/key as well as owner completion of a later lesson without prior progress.

This is a static code review only. No function was executed, and no migration, database, lesson content, or production branch was changed.


## Migration lesson-key coverage check — 2026-10-22

A static scan of the current proposed migration (`supabase/migrations/20261019090000_add_kurmanji_courses_and_protected_lessons.sql`, blob `d1f17442ddb3bb8e6b5f2384bdcd14f6e1e451a9`) checked the lesson-content VALUES keys against the intended course ranges:

- Course 1: 26 matching lesson keys, numbered 01–26.
- Course 2: 12 matching lesson keys, numbered 01–12.
- Total: 38 keys; no duplicate, missing, or unexpected Kurmanji lesson keys found by this static check.
- The SQL file has an explicit `BEGIN` / `COMMIT` transaction boundary.
- The migration does not create a `lesson_content` RLS policy and does not define `enroll_in_course(text)`; it relies on the existing target schema's policy and enrollment RPC. This dependency must be rechecked against the exact deployment target and is not evidence that a live rollout is ready.

This check validates key coverage only; it does not validate lesson-body scientific accuracy, seed equivalence, database execution, or learner-facing runtime behavior. No database or application code was changed.


## Front-end RPC integration cross-check — 2026-10-22

Read-only comparison of `script.js`, the two Kurmanji lesson HTML shells, the proposed migration, and the live production function catalog found:

- The client calls `student_has_enrollment(p_course_id)`, `is_site_owner()`, `can_read_lesson_content(p_course_id, p_lesson_key)`, and `complete_lesson(p_course_id, p_lesson_key)`.
- The live production function catalog contains these same function names and argument signatures. The proposed migration replaces the two lesson-access/progress functions but does not replace the enrollment or owner-check functions.
- The lesson HTML shells carry matching `data-lesson-key` values, and the client reads `content_html` from `lesson_content` using that key. Course IDs are inferred from the Kurmanji lesson-key prefix.
- The client-side progression check delegates to `can_read_lesson_content`; completion delegates to `complete_lesson`. No RPC name or argument mismatch was found in this static cross-check.

Limitations: this is source inspection plus a read-only catalog query, not an authenticated end-to-end test. It does not establish that the new Kurmanji rows exist in production, that the proposed migration is safe to apply, or that RLS behavior has been runtime-tested. No database, migration, application code, or `main` branch was changed.


## Source-backed citation correction — 2026-10-22

The DOI `10.1515/9783110421682-004` identifies Geoffrey Haig's chapter “Northern Kurdish (Kurmanjî)” in *The Languages and Linguistics of Western Asia: An Areal Perspective*, edited by Geoffrey Haig and Geoffrey Khan. The migration's 23 affected bibliography items were corrected to this attribution; section-specific citation notes were retained. The migration was not applied, and no production database was changed.

Verification references:
- University of Bamberg publication record: https://fis.uni-bamberg.de/entities/publication/06ab181d-1e09-43da-87f4-92453eaf5057
- DOI: https://doi.org/10.1515/9783110421682-004


## Updated content synchronization status — 2026-10-24

The earlier static report that all 38 migration bodies differed from the split seed is now historical and superseded. On the protected branch, the 38 migration lesson title/content values have been synchronized directly to the corresponding seed records, and Avasin Code spelling corrections were applied to both seed and migration in tandem. A field-aware reparse verified 38 rows on each side and zero title/content mismatches.

This does not change the live readiness decision: the production Supabase project still has no `lesson_content` rows for the two Kurmanji course IDs. No SQL was executed against production. Remaining release gates are source-backed review of the scientific material and a safe test-project migration plus end-to-end access/progression checks.
