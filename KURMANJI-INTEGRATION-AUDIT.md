# Kurmanji course integration audit

**Branch:** `kurmanji-courses`  
**Updated:** 2026-10-19  
**Scope:** Kurmanji Course 1 (26 lessons) and Course 2 (12 lessons).

## Current repository state

- The branch contains two course overview pages and 38 lesson pages.
- The inspected lesson page `kurmanji-course-1-lesson-01.html` now uses a `.lesson-content` placeholder; the shared `script.js` fetches the lesson body from Supabase after the access RPC returns true.
- `script.js` recognizes both Kurmanji lesson filename patterns and maps them to `kurmanji-course-1` and `kurmanji-course-2`.
- The migration seeds 26 + 12 = 38 lesson-content records and replaces `can_read_lesson_content(text,text)` and `complete_lesson(text,text)` with ordered progression logic.
- The migration includes explicit `REVOKE ALL ... FROM PUBLIC` and `GRANT EXECUTE ... TO authenticated` statements for both RPCs, and wraps its work in `BEGIN` / `COMMIT`.
- Read-only production inspection on 2026-10-19 found no rows in `public.courses` for either Kurmanji course ID. The migration has not been applied to production.
- Latest GitHub Actions runs associated with this branch's current commit both completed successfully: “Validate academic lesson catalog” and “Validate lesson navigation”. These are static checks, not browser or database integration tests.

## Outstanding release blockers

1. **Test migration:** Supabase lists the `main` branch status as `MIGRATIONS_FAILED`. The available recent PostgreSQL logs did not show an error or migration message, so the root cause remains unconfirmed. Do not infer a cause without a migration-specific error.
2. **End-to-end access tests:** Not yet completed for signed-out visitors, enrolled and unenrolled students, sequential lesson unlocking, completion totals, owner bypass, and regression of the two existing courses.
3. **Scientific source review:** All 38 lesson bodies still need lesson-by-lesson comparison with their cited academic sources. A citation list alone does not verify each example, translation, or grammatical claim.
4. **Browser test:** Static CI success does not establish that Supabase loading, access checks, or completion controls work in a real browser session.

## Safety and preservation requirements

- Do not apply the migration to production as a test.
- Do not merge PR #2 until the test migration and access tests pass.
- Do not silently rewrite scientific content, examples, or source spelling. Submit proposed content corrections for user review before changing them.
- No production database writes were made during this audit.

## Recommended next action

Run the migration in a separate disposable test project, capture the exact migration error if it fails, and then run the release test plan in `docs/kurmanji-release-test-plan.md`. The current project exposes no separate ready-to-use development branch in the branch list; creating one may incur charges and requires cost approval.
