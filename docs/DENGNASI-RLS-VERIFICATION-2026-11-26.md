# Dengnasî course RLS verification — 2026-11-26

## Scope

Read-only inspection and rollback-only SQL probes were performed against the disposable Supabase test project `zanztkurd-kurmanji-test` (`juwsjljbdwyncicybwoq`). No production project, production database, migration, deployment, or GitHub Pages release was touched.

## Content inventory

For course `kurmanji-dengnasi-27`:

- Course record exists and declares 27 lessons.
- Exactly 27 `public.lesson_content` rows exist, with 27 valid lesson keys.
- All 27 rows contain substantial HTML text and headings.
- No PDF iframe was found in the 27 lesson bodies.
- No `DRAFT PREVIEW ONLY` marker was found in the 27 lesson bodies.
- HTML body lengths range from 4,690 to 24,388 characters.
- Before/after transaction checks show 0 enrollment rows and 0 progress rows for this course; the probes left no student records behind.

## RLS and progression probes

The SQL probes set a temporary `request.jwt.claim.sub` for an existing non-owner test identity, switched to the `authenticated` database role, and used explicit transactions with `ROLLBACK`. The results were:

| Scenario | Visible lesson rows |
|---|---:|
| Student without enrollment, course-wide query | 0 |
| Enrolled student, lesson 1 before any progress | 1 |
| Enrolled student, lesson 2 before lesson 1 completion | 0 |
| Enrolled student, lesson 1 after recording lesson 1 completion | 1 |
| Enrolled student, lesson 2 after recording lesson 1 completion | 1 |
| Enrolled student, lesson 3 before lesson 2 completion | 0 |
| Site owner, course-wide query | 27 |

The `anon` role does not have `SELECT` privilege on `public.lesson_content` (`has_table_privilege` returned false). An attempted direct anonymous query was denied by PostgreSQL permissions.

The relevant RLS policy for authenticated readers requires site-owner status, or an active/completed enrollment together with `can_read_lesson_content(course_id, lesson_key)`. The progression function recognizes the 27 ordered Dengnasî lesson keys and checks the completed-lesson prefix.

## Limitations

These are database-side role/JWT-claim simulations, not end-to-end Supabase Auth API requests from a real browser session. No Playwright/browser test, client-side fetch, enrollment UI test, navigation test, or live Pages verification was run in this audit. Therefore this report does **not** certify the whole learner experience.

## Outcome

The test database's RLS and lesson-prefix progression behavior passed the rollback-only probes above. No persistent rows were changed by the probes. The next verification step is an end-to-end browser test using a dedicated enrolled test account and an un-enrolled account, followed by a site-owner session. Keep the production database and deployment untouched until separately authorized.
