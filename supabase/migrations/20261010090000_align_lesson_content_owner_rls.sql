-- Keep lesson-content RLS aligned with the canonical owner check.
-- is_site_owner() includes the registered owner email fallback as well as site_owners rows.
DROP POLICY IF EXISTS "Enrolled users and owners can read lesson content" ON public.lesson_content;

CREATE POLICY "Enrolled users and owners can read lesson content"
ON public.lesson_content
FOR SELECT
TO authenticated
USING (
  public.is_site_owner()
  OR EXISTS (
    SELECT 1
    FROM public.enrollments e
    WHERE e.user_id = (SELECT auth.uid())
      AND e.course_id = lesson_content.course_id
      AND e.status IN ('active', 'completed')
  )
);
