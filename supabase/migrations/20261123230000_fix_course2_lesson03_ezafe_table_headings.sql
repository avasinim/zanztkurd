DO $$
DECLARE
  current_md5 text;
  changed_rows integer;
BEGIN
  SELECT md5(content_html) INTO current_md5
  FROM public.lesson_content
  WHERE course_id = 'kurmanji-course-2'
    AND lesson_key = 'kurmanji-course-2-lesson-03.html';

  IF current_md5 IS DISTINCT FROM 'aff0a6eb2f99a451283783ab1b93c0f3' THEN
    RAISE EXCEPTION 'Unexpected Course 2 Lesson 3 content; refusing to modify';
  END IF;

  UPDATE public.lesson_content
  SET content_html = replace(
    content_html,
    '<th>ناو</th><th>فۆڕمی ئەزافە</th><th>واتا</th>',
    '<th>فۆڕم</th><th>ڕەگەز/ژمارە</th><th>جۆری ئەزافە</th>'
  )
  WHERE course_id = 'kurmanji-course-2'
    AND lesson_key = 'kurmanji-course-2-lesson-03.html'
    AND content_html LIKE '%<th>ناو</th><th>فۆڕمی ئەزافە</th><th>واتا</th>%';

  GET DIAGNOSTICS changed_rows = ROW_COUNT;
  IF changed_rows <> 1 THEN
    RAISE EXCEPTION 'Expected exactly one Course 2 Lesson 3 row update; got %', changed_rows;
  END IF;
END $$;