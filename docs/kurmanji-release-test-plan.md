# Kurmanji release test plan

Status: preparation only. This document does not indicate that the migration or browser tests have been run in a disposable test project.

## Safety boundary

- Do not apply `20261019090000_add_kurmanji_courses_and_protected_lessons.sql` to production as a test.
- Run the migration first in a disposable/test Supabase project, then execute the checks below.
- The production project was inspected read-only on 2026-10-19: neither `kurmanji-course-1` nor `kurmanji-course-2` exists in `public.courses`. The production database was not modified.
- The live `lesson_content` SELECT policy requires owner access or active/completed enrollment plus `can_read_lesson_content(course_id, lesson_key)`. Keep this second layer when testing the branch.

## Read-only SQL checks

Run these in the test project's SQL editor after applying the migration. They make no changes.

```sql
-- 1. Course definitions and seeded lesson counts.
SELECT c.id, c.total_lessons, count(lc.lesson_key) AS actual_lesson_rows
FROM public.courses c
LEFT JOIN public.lesson_content lc ON lc.course_id = c.id
WHERE c.id IN ('kurmanji-course-1', 'kurmanji-course-2')
GROUP BY c.id, c.total_lessons
ORDER BY c.id;

-- Expected: kurmanji-course-1 = 26/26; kurmanji-course-2 = 12/12.

-- 2. Missing or duplicate lesson keys in each expected sequence.
WITH expected AS (
  SELECT 'kurmanji-course-1'::text AS course_id,
         'kurmanji-course-1-lesson-' || lpad(n::text, 2, '0') || '.html' AS lesson_key
  FROM generate_series(1, 26) AS g(n)
  UNION ALL
  SELECT 'kurmanji-course-2',
         'kurmanji-course-2-lesson-' || lpad(n::text, 2, '0') || '.html'
  FROM generate_series(1, 12) AS g(n)
)
SELECT e.course_id, e.lesson_key
FROM expected e
LEFT JOIN public.lesson_content lc
  ON lc.course_id = e.course_id AND lc.lesson_key = e.lesson_key
WHERE lc.lesson_key IS NULL
ORDER BY e.course_id, e.lesson_key;

-- Expected: zero rows.

-- 3. Ensure both RPCs are present, SECURITY DEFINER, and pin search_path.
SELECT p.proname,
       p.prosecdef AS security_definer,
       p.proconfig AS function_settings,
       pg_get_function_identity_arguments(p.oid) AS arguments
FROM pg_proc p
JOIN pg_namespace n ON n.oid = p.pronamespace
WHERE n.nspname = 'public'
  AND p.proname IN ('can_read_lesson_content', 'complete_lesson')
ORDER BY p.proname;

-- Expected: both functions exist, security_definer=true, search_path set to empty.

-- 4. Confirm lesson_content remains protected by RLS and has the expected SELECT policy.
SELECT c.relname, c.relrowsecurity AS rls_enabled
FROM pg_class c
JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE n.nspname = 'public' AND c.relname = 'lesson_content';

SELECT policyname, roles, cmd, qual
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename = 'lesson_content'
  AND cmd = 'SELECT';
```

## Required authenticated browser tests

Use separate student accounts in the test project, with no real student data.

1. **Not enrolled:** direct lesson URL and direct `lesson_content` request must not reveal the lesson body; the read RPC must not report access.
2. **Enrolled, first lesson:** lesson 01 can load; completing it records exactly that lesson's progress.
3. **Sequence enforcement:** lesson 02 remains blocked until lesson 01 is completed. Repeat at a later boundary (for example, lesson 25 → 26 in course 1).
4. **Course isolation:** completing a lesson in course 1 does not unlock course 2.
5. **Completion totals:** course 1 reaches 26/26 and course 2 reaches 12/12 only after all lessons are completed; enrollment status changes to completed.
6. **Owner bypass:** owner can access lesson content and bypass sequence gates as intended.
7. **Regression:** existing orthography and phonetics progression remains unchanged.
8. **Dashboard:** counts and statuses match the server-side progress records after refresh and re-login.

Record each test as PASS/FAIL with the test account role and browser console/network errors. Do not mark the release ready until these runtime tests have actually run.
