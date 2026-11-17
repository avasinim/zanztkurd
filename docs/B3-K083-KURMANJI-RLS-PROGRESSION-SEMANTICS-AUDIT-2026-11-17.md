# B3-K083 — Kurmanji RLS and Progression Semantics Audit
Date: 2026-11-17
Repository: `avasinim/zanztkurd`
Branch reviewed: `fix/kurmanji-ci-current-migration`
Reviewed HEAD before report: `b55552d01d2640d301dd4a023d9b1e70f0fc7714`
Main baseline: `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`

## Scope and method
Read-only static review of the checked-in SQL schema and migrations governing `lesson_content`, `enrollments`, `lesson_progress`, `can_read_lesson_content`, and `complete_lesson`. Reviewed the browser gate in `script.js` for alignment. No SQL was executed, no connected production database was queried, and no migration, production data, deployment, or access policy was changed.

## Results

### 1. Lesson-content read path — consistent in checked-in migrations
- `20261010091000_enforce_sequential_lesson_content_access.sql` replaces the earlier lesson-content SELECT policy with an authenticated-user policy that permits the site owner, or an enrolled user whose target lesson passes `can_read_lesson_content`.
- The latest Kurmanji RPC definition in `20261024122051_add_kurmanji_courses_and_protected_lessons.sql` independently checks authentication, active/completed enrollment, supported course IDs, valid lesson keys, and the immediate predecessor's progress row.
- Unknown course IDs and lesson keys are rejected for non-owner users. The three sequences are generated as 32, 26, and 12 lessons respectively.
- `script.js` calls the same server RPC for progression rather than treating a browser-side progress lookup as authoritative.

### 2. Completion write path — constrained to the RPC in the checked-in baseline
- `supabase/schema.sql` enables RLS on `lesson_progress` and defines an own-row SELECT policy. It drops legacy own INSERT/UPDATE policies and does not recreate them.
- The migration inventory contains no later policy creation granting direct INSERT/UPDATE access to `lesson_progress`.
- `complete_lesson` is SECURITY DEFINER, requires an authenticated user, checks verification for non-owners, validates the course and lesson key, checks enrollment for non-owners, and enforces the predecessor rule. It writes with an upsert against the table's user/course/lesson primary key.
- Owners may bypass sequence checks in phonetics and the two Kurmanji courses; the existing orthography course retains sequential completion for the owner. This matches the comments and current implementation.

### 3. Progress accounting — structurally aligned for the Kurmanji courses
- The latest completion RPC counts only keys in the selected course's declared ordered array for phonetics (32), Kurmanji Course 1 (26), and Kurmanji Course 2 (12).
- The two Kurmanji course rows are created with totals 26 and 12 in the migration.
- The legacy orthography course retains its separate grouped completion calculation; this audit did not alter or re-interpret that product-specific accounting.

## Design note — not classified as a defect
The completion RPC verifies sequential order, but it does not prove that the learner viewed the lesson or passed a quiz before calling `complete_lesson`. A client with a valid enrolled session can call the RPC directly, beginning with lesson 1 and then advancing in order. This is consistent with a simple “mark lesson complete” workflow, but it is not an assessment/mastery gate. If course completion is intended to certify quiz performance or lesson engagement, that requirement needs an explicit product decision and a separately designed server-side assessment contract. No such behavior was added in this audit.

## Limitations
- `supabase/schema.sql` does not contain the `lesson_content` table definition, so the full deployed table grants and every historical policy on that table cannot be reconstructed from this file alone.
- Static repository inspection cannot establish the effective live PostgreSQL policy set, deployed function definitions, table grants, actual user enrollment rows, or runtime behavior. The migration header records the 2026-10-24 migration as applied to production, but this audit did not independently verify that statement against the live database.
- RLS and SECURITY DEFINER behavior should ultimately be exercised against a disposable Supabase/PostgreSQL test database with authenticated student, owner, unenrolled, withdrawn, and unverified-user cases.

## Conclusion
No confirmed critical RLS or progression defect was found in the checked-in definitions reviewed. The checked-in path is internally consistent for authentication, enrollment, sequential access, and Kurmanji completion counts. The remaining uncertainty is live-schema verification and the product decision about whether “completion” should require an assessment rather than a sequential RPC call.

## Change safety
This report is documentation only. No lesson text, course content, SQL migration, production database, deployment, workflow configuration, or `main` branch was changed.
