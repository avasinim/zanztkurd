-- The profile function is a trigger handler, not a client-callable RPC.
REVOKE EXECUTE ON FUNCTION public.create_profile_for_new_user() FROM PUBLIC, anon, authenticated;

-- Add indexes for foreign-key joins used by course enrollment, lesson access, and progress.
CREATE INDEX IF NOT EXISTS enrollments_course_id_idx ON public.enrollments (course_id);
CREATE INDEX IF NOT EXISTS lesson_content_course_id_idx ON public.lesson_content (course_id);
CREATE INDEX IF NOT EXISTS lesson_progress_course_id_idx ON public.lesson_progress (course_id);
