DO $$
DECLARE
  v_actual text;
  v_rows integer;
BEGIN
  SELECT md5(content_html) INTO v_actual
  FROM public.lesson_content
  WHERE course_id = 'kurmanji-course-1'
    AND lesson_key = 'kurmanji-course-1-lesson-14.html';

  IF v_actual IS DISTINCT FROM '7492715cb2d7125eda591d66f5379bca' THEN
    RAISE EXCEPTION 'Precondition failed for Course 1 Lesson 14: expected original MD5, got %', v_actual;
  END IF;

  UPDATE public.lesson_content
  SET content_html = replace(content_html, '<td>سپێ</td>', '<td>سپی</td>')
  WHERE course_id = 'kurmanji-course-1'
    AND lesson_key = 'kurmanji-course-1-lesson-14.html';

  GET DIAGNOSTICS v_rows = ROW_COUNT;
  IF v_rows <> 1 THEN
    RAISE EXCEPTION 'Expected exactly one Course 1 Lesson 14 update, got %', v_rows;
  END IF;

  IF EXISTS (
    SELECT 1 FROM public.lesson_content
    WHERE course_id = 'kurmanji-course-1'
      AND lesson_key = 'kurmanji-course-1-lesson-14.html'
      AND content_html LIKE '%<td>سپێ</td>%'
  ) THEN
    RAISE EXCEPTION 'Old gloss remains after update';
  END IF;
END $$;