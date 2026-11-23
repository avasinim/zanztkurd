DO $$
DECLARE
  r record;
  v_actual text;
  v_rows integer;
BEGIN
  FOR r IN
    SELECT * FROM (VALUES
('kurmanji-course-1-lesson-01.html','8e919d517229f75cf3f26a76ad9022d8'),
('kurmanji-course-1-lesson-02.html','a7d8b60aae9f1acf1b493f6d582e81ef'),
('kurmanji-course-1-lesson-03.html','d75fc2e610a33afc7d7b49d7a0d82a31'),
('kurmanji-course-1-lesson-04.html','757fcfe2ad2756264bb670e565774233'),
('kurmanji-course-1-lesson-05.html','9b7aecb524b4b3b610d9db4b89893448'),
('kurmanji-course-1-lesson-06.html','8fa8eb71f2709bdcee26f250730941fa'),
('kurmanji-course-1-lesson-07.html','ab0c21bf3553a4ac602ba2414aff854a'),
('kurmanji-course-1-lesson-08.html','50dcf51d61ce11f88d6ce62ff45ab373'),
('kurmanji-course-1-lesson-09.html','e5446a02f64be30702f9e74a5762a3dd'),
('kurmanji-course-1-lesson-10.html','665a0db5a87fe7ddef45446455906c99'),
('kurmanji-course-1-lesson-11.html','e09526ff59857ceeafd69ce2f72d5cf0'),
('kurmanji-course-1-lesson-12.html','05947c564efa29aeef416f4571e18f9d'),
('kurmanji-course-1-lesson-13.html','0d5df36a89169a07f4f0f182e02ea396'),
('kurmanji-course-1-lesson-14.html','a7ecbc93d82f6978c16897c57145ec11'),
('kurmanji-course-1-lesson-15.html','0b249e5f52fe022008b3381330f3a20a'),
('kurmanji-course-1-lesson-16.html','99f95ce96e36085f4e0c5100d435f73b'),
('kurmanji-course-1-lesson-17.html','4ebeae4914622f8e9ca896d24f3f59bc'),
('kurmanji-course-1-lesson-18.html','bd40c8d2bef6e48d262ea674ab43b014'),
('kurmanji-course-1-lesson-19.html','cad4398548c1af9c7ca700c7cb156d53'),
('kurmanji-course-1-lesson-20.html','31e2bec6dfbcb5964345c7a9177f5bba'),
('kurmanji-course-1-lesson-21.html','c6ffdda694da4d926c8c89ffff8aae62'),
('kurmanji-course-1-lesson-22.html','2cf66ef7a49e0e667ea2ef6d56ce7b6d'),
('kurmanji-course-1-lesson-23.html','2e26f0b54b9065d434d1c445da9602e2'),
('kurmanji-course-1-lesson-24.html','d42dee16d994f22eb34cf20c7c535ac6'),
('kurmanji-course-1-lesson-25.html','838a5fe419a0f8eae0be225e6aaabd19'),
('kurmanji-course-1-lesson-26.html','5ca17c7de1ce4188fbfbd60ac833f41f')
    ) AS expected(lesson_key, expected_md5)
  LOOP
    SELECT md5(content_html) INTO v_actual
    FROM public.lesson_content
    WHERE course_id = 'kurmanji-course-1' AND lesson_key = r.lesson_key;

    IF v_actual IS DISTINCT FROM r.expected_md5 THEN
      RAISE EXCEPTION 'Precondition failed for %, expected %, got %', r.lesson_key, r.expected_md5, v_actual;
    END IF;

    UPDATE public.lesson_content
    SET content_html =
      replace(
        regexp_replace(
          replace(
            replace(
              replace(
                replace(content_html, 'نوس', 'نووس'),
                'نمون', 'نموون'
              ),
              'فێربون', 'فێربوون'
            ),
            'نیە', 'نییە'
          ),
          'هەموو?', 'هەموو', 'g'
        ),
        'ڕون', 'ڕوون'
      )
    WHERE course_id = 'kurmanji-course-1' AND lesson_key = r.lesson_key;

    GET DIAGNOSTICS v_rows = ROW_COUNT;
    IF v_rows <> 1 THEN
      RAISE EXCEPTION 'Expected exactly one row update for %, got %', r.lesson_key, v_rows;
    END IF;
  END LOOP;
END $$;