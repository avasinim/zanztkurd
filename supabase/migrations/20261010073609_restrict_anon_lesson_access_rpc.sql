-- Keep lesson-access RPCs available to authenticated students only.
-- Both functions depend on auth.uid(); anonymous execution is unnecessary.
REVOKE EXECUTE ON FUNCTION public.can_read_lesson_content(text, text) FROM anon;
REVOKE EXECUTE ON FUNCTION public.student_has_enrollment(text) FROM anon;
