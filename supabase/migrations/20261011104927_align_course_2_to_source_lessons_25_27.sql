-- Align Course 2 with the agreed source scope: lessons 1-27.
-- Lessons 25-27 cover printed pages 172-255 of Sabir Zhakaw's book.
-- Do not delete the additional 28-30 lesson rows or any student progress.

UPDATE public.courses
SET total_lessons = 27,
    description = 'دەورەی ٢؛ فۆنێتیک و فۆنۆلۆجی، لەگەڵ وانەکانی ٢٥–٢٧ بە پشت‌بەستن بە لاپەڕەکانی ١٧٢–٢٥٥ی کتێبی سابیر ژاکاو.'
WHERE id = 'phonetics-phonology-kurdik';

CREATE OR REPLACE FUNCTION public.can_read_lesson_content(p_course_id text, p_lesson_key text)
RETURNS boolean
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO ''
AS $function$
DECLARE
  uid uuid := auth.uid();
  lesson_order text[];
  lesson_index integer;
BEGIN
  IF uid IS NULL THEN RETURN false; END IF;
  IF public.is_site_owner() THEN RETURN true; END IF;

  IF p_course_id = 'phonetics-phonology-kurdik' THEN
    lesson_order := ARRAY[
      'course-2-01.html','course-2-02.html','course-2-03.html','course-2-04.html','course-2-05.html',
      'course-2-06.html','course-2-07.html','course-2-08.html','course-2-09.html','course-2-10.html',
      'course-2-11.html','course-2-12.html','course-2-13.html','course-2-14.html','course-2-15.html',
      'course-2-16.html','course-2-17.html','course-2-18.html','course-2-19.html','course-2-20.html',
      'course-2-21.html','course-2-22.html','course-2-23.html','course-2-24.html','course-2-25.html',
      'course-2-26.html','course-2-27.html'
    ];
  ELSIF p_course_id = 'orthography-kurdik' THEN
    lesson_order := ARRAY[
      '017.html','018.html','019.html','020.html','021.html','022.html','023.html','024.html',
      '025.html','026.html','027.html','028.html','029.html','030.html','031.html','032.html',
      '033.html','034.html','035.html','036.html','037.html','038.html','039.html','040.html',
      '041.html','042.html','043.html','044.html','046.html','047.html','048.html','049.html',
      '050.html','051.html','045.html','052.html','053.html','054.html','055.html','056.html',
      '057.html','058.html'
    ];
  ELSE
    RETURN false;
  END IF;

  lesson_index := array_position(lesson_order, p_lesson_key);
  IF lesson_index IS NULL THEN RETURN false; END IF;
  IF lesson_index = 1 THEN RETURN true; END IF;

  RETURN EXISTS (
    SELECT 1 FROM public.lesson_progress lp
    WHERE lp.user_id = uid
      AND lp.course_id = p_course_id
      AND lp.lesson_key = lesson_order[lesson_index - 1]
  );
END;
$function$;

REVOKE ALL ON FUNCTION public.can_read_lesson_content(text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.can_read_lesson_content(text, text) TO authenticated;

CREATE OR REPLACE FUNCTION public.complete_lesson(p_course_id text, p_lesson_key text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
DECLARE
  uid uuid := auth.uid();
  total_count integer;
  completed_count integer := 0;
  new_status text := 'active';
  lesson_order text[];
  lesson_index integer;
  previous_key text;
BEGIN
  IF uid IS NULL THEN RAISE EXCEPTION 'AUTH_REQUIRED'; END IF;

  IF NOT EXISTS (
    SELECT 1 FROM auth.users u
    WHERE u.id = uid AND (u.email_confirmed_at IS NOT NULL OR u.phone_confirmed_at IS NOT NULL)
  ) THEN RAISE EXCEPTION 'EMAIL_NOT_VERIFIED'; END IF;

  IF p_course_id = 'phonetics-phonology-kurdik' THEN
    lesson_order := ARRAY[
      'course-2-01.html','course-2-02.html','course-2-03.html','course-2-04.html','course-2-05.html',
      'course-2-06.html','course-2-07.html','course-2-08.html','course-2-09.html','course-2-10.html',
      'course-2-11.html','course-2-12.html','course-2-13.html','course-2-14.html','course-2-15.html',
      'course-2-16.html','course-2-17.html','course-2-18.html','course-2-19.html','course-2-20.html',
      'course-2-21.html','course-2-22.html','course-2-23.html','course-2-24.html','course-2-25.html',
      'course-2-26.html','course-2-27.html'
    ];
  ELSIF p_course_id = 'orthography-kurdik' THEN
    lesson_order := ARRAY[
      '017.html','018.html','019.html','020.html','021.html','022.html','023.html','024.html',
      '025.html','026.html','027.html','028.html','029.html','030.html','031.html','032.html',
      '033.html','034.html','035.html','036.html','037.html','038.html','039.html','040.html',
      '041.html','042.html','043.html','044.html','046.html','047.html','048.html','049.html',
      '050.html','051.html','045.html','052.html','053.html','054.html','055.html','056.html',
      '057.html','058.html'
    ];
  ELSE
    RAISE EXCEPTION 'COURSE_NOT_FOUND';
  END IF;

  lesson_index := array_position(lesson_order, p_lesson_key);
  IF lesson_index IS NULL THEN RAISE EXCEPTION 'INVALID_LESSON'; END IF;

  IF NOT EXISTS (
    SELECT 1 FROM public.enrollments e
    WHERE e.user_id = uid AND e.course_id = p_course_id AND e.status IN ('active','completed')
  ) AND NOT public.is_site_owner() THEN
    RAISE EXCEPTION 'NOT_ENROLLED';
  END IF;

  IF lesson_index > 1 AND NOT public.is_site_owner() THEN
    previous_key := lesson_order[lesson_index - 1];
    IF NOT EXISTS (
      SELECT 1 FROM public.lesson_progress lp
      WHERE lp.user_id = uid AND lp.course_id = p_course_id AND lp.lesson_key = previous_key
    ) THEN RAISE EXCEPTION 'PREVIOUS_LESSON_REQUIRED'; END IF;
  END IF;

  INSERT INTO public.lesson_progress(user_id, course_id, lesson_key, completed_at)
  VALUES(uid, p_course_id, p_lesson_key, now())
  ON CONFLICT(user_id, course_id, lesson_key)
  DO UPDATE SET completed_at = excluded.completed_at;

  SELECT c.total_lessons INTO total_count FROM public.courses c WHERE c.id = p_course_id;

  IF p_course_id = 'phonetics-phonology-kurdik' THEN
    SELECT count(*) INTO completed_count
    FROM public.lesson_progress lp
    WHERE lp.user_id = uid AND lp.course_id = p_course_id
      AND lp.lesson_key = ANY(lesson_order);
  ELSE
    SELECT count(*) INTO completed_count
    FROM public.lesson_progress lp
    WHERE lp.user_id = uid AND lp.course_id = p_course_id
      AND lp.lesson_key = ANY(ARRAY[
        '017.html','018.html','019.html','020.html','021.html','022.html','023.html',
        '024.html','025.html','026.html','027.html','028.html','029.html','030.html',
        '031.html','032.html','033.html','034.html','035.html','036.html','037.html'
      ]);

    IF (SELECT count(*) FROM public.lesson_progress lp WHERE lp.user_id=uid AND lp.course_id=p_course_id
        AND lp.lesson_key=ANY(ARRAY['038.html','039.html','040.html','041.html','042.html','043.html','044.html']))=7
      THEN completed_count := completed_count + 1; END IF;
    IF (SELECT count(*) FROM public.lesson_progress lp WHERE lp.user_id=uid AND lp.course_id=p_course_id
        AND lp.lesson_key=ANY(ARRAY['046.html','047.html','048.html','049.html','050.html','051.html']))=6
      THEN completed_count := completed_count + 1; END IF;
    IF EXISTS(SELECT 1 FROM public.lesson_progress lp WHERE lp.user_id=uid AND lp.course_id=p_course_id AND lp.lesson_key='045.html')
      THEN completed_count := completed_count + 1; END IF;
    IF (SELECT count(*) FROM public.lesson_progress lp WHERE lp.user_id=uid AND lp.course_id=p_course_id
        AND lp.lesson_key=ANY(ARRAY['052.html','053.html','054.html','055.html','056.html','057.html']))=6
      THEN completed_count := completed_count + 1; END IF;
    IF EXISTS(SELECT 1 FROM public.lesson_progress lp WHERE lp.user_id=uid AND lp.course_id=p_course_id AND lp.lesson_key='058.html')
      THEN completed_count := completed_count + 1; END IF;
  END IF;

  IF completed_count >= total_count THEN
    new_status := 'completed';
    UPDATE public.enrollments SET status='completed', completed_at=coalesce(completed_at, now())
    WHERE user_id=uid AND course_id=p_course_id;
  END IF;

  RETURN jsonb_build_object('status', new_status, 'completed_count', completed_count,
    'total_lessons', total_count, 'course_completed', (new_status='completed'));
END;
$function$;

REVOKE ALL ON FUNCTION public.complete_lesson(text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.complete_lesson(text, text) TO authenticated;
