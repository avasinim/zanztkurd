# B3-K140 — Kurmanji 38-Lesson Cross-Layer Integrity Audit (2026-11-18)

## Scope

Read-only cross-layer audit of the two Kurmanji course plans, their static lesson pages, the shared browser runtime, and the Test project's course catalog, protected lesson rows, and aggregate learner progress. No lesson text or database content was changed.

## Static website and runtime

- Course 1 plan links to 26 distinct lesson pages, in order from `kurmanji-course-1-lesson-01.html` through `kurmanji-course-1-lesson-26.html`.
- Course 2 plan links to 12 distinct lesson pages, in order from `kurmanji-course-2-lesson-01.html` through `kurmanji-course-2-lesson-12.html`.
- The 38 expected static lesson files were individually inspected. Each page has an H1 and a `data-lesson-key` matching its own filename.
- Shared `script.js` maps the two Kurmanji filename patterns to the exact IDs `kurmanji-course-1` and `kurmanji-course-2`.
- The runtime constructs the corresponding ordered key lists of 26 and 12 lessons and uses the protected `can_read_lesson_content` and `complete_lesson` RPCs.
- No static lesson body or course source file was changed during this audit.

## Test database integrity (read-only)

Target: `zanztkurd-kurmanji-test`, project ID `juwsjljbdwyncicybwoq`.

- Course catalog: Course 1 total_lessons = 26; Course 2 total_lessons = 12.
- Protected lesson_content: 38 expected keys; 38 actual rows; 38 exact course/key matches; 0 missing; 0 unexpected; 0 empty title/body payloads.
- Aggregate progress: 5 rows across 5 distinct keys in Course 1, from lesson 01 through lesson 05. No Course 2 progress rows were returned.
- This aggregate is consistent with a contiguous Course 1 prefix through lesson 5; no learner identifiers or individual histories were retrieved.

## Migration status and boundaries

The Test migration ledger still contains the previously recorded 16 entries and does not contain the proposed K137 `enforce_full_lesson_prefix_progression` migration. K137 remains unapplied.

This was a read-only audit. No Auth user was created, no OTP or login was initiated, no progress/enrollment/lesson rows were written, no RLS/grants/functions were changed, and no Production database was queried or modified. No deployment, PR, merge, or main-branch update occurred.

## Limitations

- This verifies file presence, filename/key mapping, plan link coverage, runtime source mapping, and database key-level integrity. It does not prove that all lesson HTML is pedagogically correct or that every browser route works against a live learner JWT.
- Existing Playwright coverage uses synthetic Supabase/Auth/RPC mocks; it is not a live end-to-end RLS test.
- This audit did not compare every HTML H1 string against every database title/body string for semantic equivalence.
- K139's corrected migration revision still has no observed CI run; K137's earlier CI success does not validate the later K139 change.

## Conclusion

The Course 1 and Course 2 structures reconcile across static plan links, page filenames/lesson keys, runtime course mapping, and the Test database: 26 + 12 = 38, with 38/38 protected lesson keys present and no empty payload rows. No structural mismatch was found in the audited scope. The full-prefix sequencing hardening remains a separate proposed migration and still requires explicit Test-only authorization before application.

## Backup and repository state

- Repository: `avasinim/zanztkurd`
- Work branch: `fix/kurmanji-ci-current-migration`
- Pre-work backup: `backup/b3-k140-kurmanji-38-lesson-cross-layer-audit-before-2026-11-18` at `0d7c7c2c8d99746212d3b22370f1582c89d963d7`
- Main baseline observed: `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`

This report records the audit only; it makes no application or database changes.
