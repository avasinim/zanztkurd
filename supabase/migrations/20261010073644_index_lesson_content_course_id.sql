-- Support course-scoped lesson-content access checks and joins.
CREATE INDEX IF NOT EXISTS idx_lesson_content_course_id
  ON public.lesson_content (course_id);
