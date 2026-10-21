-- Test-only hardening: students may create only active enrollments for themselves.
-- Course completion must be earned through complete_lesson, not supplied at enrollment.
DROP POLICY IF EXISTS "Students enroll themselves" ON public.enrollments;
CREATE POLICY "Students enroll themselves"
ON public.enrollments
FOR INSERT
TO authenticated
WITH CHECK (
  (SELECT auth.uid()) = user_id
  AND status = 'active'
  AND completed_at IS NULL
);
