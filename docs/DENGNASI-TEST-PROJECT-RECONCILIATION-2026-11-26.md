# Dengnasî test-project reconciliation — 2026-11-26

## Verified test-project state

Project: `zanztkurd-kurmanji-test` (`juwsjljbdwyncicybwoq`), status `ACTIVE_HEALTHY`.

Read-only inspection found exactly 27 `lesson_content` rows for `kurmanji-dengnasi-27`. All 27 currently contain authored HTML with the `.klesson-preview` wrapper; none contain an iframe, the legacy PDF asset path, or the literal draft-preview marker. All 27 rows share `updated_at = 2026-11-26 05:12:22.429815+00`.

The database content was compared directly with the prepared payload:
- Lessons 1–13: exact `content_html` and title match, after removing the preview-only outer lesson header from the source preview.
- Lessons 14–27: exact `content_html` and title match with the payload.
- Total: **27/27 exact content/title matches**.
- Stable lesson keys remain the 27 expected sequential keys.
- The test project currently has 1 enrollment row and 5 lesson-progress rows; those records were not modified.

## Transaction probe and attempted replacement

A simple `BEGIN / SELECT / ROLLBACK` probe succeeded.

A separate rollback-only replacement test was prepared with fail-closed checks for 27 legacy iframe rows. It stopped at its first content precondition because the database already contains the authored HTML and no longer contains the expected legacy PDF iframe wrappers. The replacement `UPDATE` was therefore never reached. No data was written by that failed test. This was treated as unexpected pre-existing test-project state and reconciled by exact comparison with the payload artifact.

## Access-control observations

- The `anon` database role has no direct SELECT privilege on `public.lesson_content`; the attempted role-level read was denied by PostgreSQL privileges.
- A simulated authenticated, non-owner identity returned `false` from `can_read_lesson_content('kurmanji-dengnasi-27','kurmanji-dengnasi-lesson-01.html')`.
- The test project's existing RLS policies and progression function were inspected; no policy, RPC, enrollment or progress data was changed.
- No real browser sign-in, enrolled-student or sequential-lock runtime test has been performed.

## Remaining work

1. Inspect the test project's migration history and compare its current 27 content rows with the local migration ledger. The test DB has two Dengnasî activation migrations recorded; local repository migration files must be reconciled before proposing another migration.
2. Run actual browser tests against the test project for owner, enrolled student, non-enrolled student, anonymous visitor and sequence-locked lessons.
3. Confirm the course landing/catalog status consistency before any release.

## Safety

No production project was accessed. No test-project data, enrollments, progress, course rows, policies or migrations were modified in this reconciliation. No deployment, publication, main-branch update, PR merge or live-site claim is made.
