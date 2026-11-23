-- Fix two Sorani spelling slips in Course 2 Lessons 9 and 11.
-- Keep the original seed/migration tuples intact; this guarded forward migration
-- only changes the exact known typo occurrences in the current lesson rows.
DO $migration$
DECLARE changed9 integer; changed11 integer;
BEGIN
  UPDATE public.lesson_content
  SET content_html = replace(content_html, 'پەیویستی', 'پێویستی'),
      updated_at = now()
  WHERE lesson_key = 'kurmanji-course-2-lesson-09.html'
    AND course_id = 'kurmanji-course-2'
    AND position('پەیویستی' in content_html) > 0;
  GET DIAGNOSTICS changed9 = ROW_COUNT;

  UPDATE public.lesson_content
  SET content_html = replace(content_html, 'پەیویستن', 'پێویستن'),
      updated_at = now()
  WHERE lesson_key = 'kurmanji-course-2-lesson-11.html'
    AND course_id = 'kurmanji-course-2'
    AND position('پەیویستن' in content_html) > 0;
  GET DIAGNOSTICS changed11 = ROW_COUNT;

  IF changed9 <> 1 OR changed11 <> 1 THEN
    RAISE EXCEPTION 'Expected exactly one typo fix in each lesson; lesson 9=%, lesson 11=%', changed9, changed11;
  END IF;
END
$migration$;
