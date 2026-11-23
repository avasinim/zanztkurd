-- Correct the one remaining preferred Sorani spelling in Kurmanji Course 2 Lesson 1.
DO $preflight$
DECLARE
  current_hash text;
  occurrences integer;
BEGIN
  SELECT md5(content_html),
         (length(content_html) - length(replace(content_html, 'پەیویستە', ''))) / length('پەیویستە')
    INTO current_hash, occurrences
  FROM public.lesson_content
  WHERE course_id='kurmanji-course-2'
    AND lesson_key='kurmanji-course-2-lesson-01.html';

  IF current_hash IS DISTINCT FROM '5285619ebedb49712b222e172fb224e6'
     OR occurrences IS DISTINCT FROM 1 THEN
    RAISE EXCEPTION 'Course 2 Lesson 1 spelling precondition failed; no content changed';
  END IF;
END
$preflight$;

UPDATE public.lesson_content
SET content_html = replace(content_html, 'پەیویستە', 'پێویستە')
WHERE course_id='kurmanji-course-2'
  AND lesson_key='kurmanji-course-2-lesson-01.html';