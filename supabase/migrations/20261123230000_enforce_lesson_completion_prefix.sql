-- Align production lesson sequencing with the validated test environment.
-- Requires every earlier lesson in a course to be completed before a later lesson
-- can be read or marked complete. No student rows or course content are modified.
DO $preflight$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.courses WHERE id='kurmanji-course-1' AND total_lessons=26)
     OR NOT EXISTS (SELECT 1 FROM public.courses WHERE id='kurmanji-course-2' AND total_lessons=12) THEN
    RAISE EXCEPTION 'Kurmanji course catalogue preflight failed';
  END IF;
END
$preflight$;

CREATE OR REPLACE FUNCTION public.has_completed_lesson_prefix(
  p_completed_keys text[],
  p_lesson_order text[],
  p_lesson_index integer
)
RETURNS boolean
LANGUAGE sql
IMMUTABLE
SET search_path TO ''
AS $function$
  SELECT CASE
    WHEN p_lesson_index IS NULL
      OR p_lesson_index < 1
      OR p_lesson_index > COALESCE(array_length(p_lesson_order, 1), 0)
      THEN false
    WHEN p_lesson_index = 1 THEN true
    ELSE NOT EXISTS (
      SELECT 1
      FROM unnest(p_lesson_order[1:(p_lesson_index - 1)]) AS required(lesson_key)
      WHERE NOT COALESCE(required.lesson_key = ANY(COALESCE(p_completed_keys, ARRAY[]::text[])), false)
    )
  END;
$function$;

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
  completed_keys text[];
BEGIN
  IF uid IS NULL THEN RETURN false; END IF;
  IF public.is_site_owner() THEN RETURN true; END IF;

  IF NOT EXISTS (
    SELECT 1 FROM public.enrollments e
    WHERE e.user_id = uid
      AND e.course_id = p_course_id
      AND e.status IN ('active','completed')
  ) THEN
    RETURN false;
  END IF;

  IF p_course_id = 'phonetics-phonology-kurdik' THEN
    SELECT array_agg('course-2-' || lpad(n::text,2,'0') || '.html' ORDER BY n)
      INTO lesson_order FROM generate_series(1,32) AS g(n);
  ELSIF p_course_id = 'kurmanji-course-1' THEN
    SELECT array_agg('kurmanji-course-1-lesson-' || lpad(n::text,2,'0') || '.html' ORDER BY n)
      INTO lesson_order FROM generate_series(1,26) AS g(n);
  ELSIF p_course_id = 'kurmanji-course-2' THEN
    SELECT array_agg('kurmanji-course-2-lesson-' || lpad(n::text,2,'0') || '.html' ORDER BY n)
      INTO lesson_order FROM generate_series(1,12) AS g(n);
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

  SELECT COALESCE(array_agg(lp.lesson_key), ARRAY[]::text[])
    INTO completed_keys
  FROM public.lesson_progress lp
  WHERE lp.user_id = uid AND lp.course_id = p_course_id;

  RETURN public.has_completed_lesson_prefix(completed_keys, lesson_order, lesson_index);
END;
$function$;

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
  completed_keys text[];
BEGIN
  IF uid IS NULL THEN RAISE EXCEPTION 'AUTH_REQUIRED'; END IF;

  IF NOT public.is_site_owner() AND NOT EXISTS (
    SELECT 1 FROM auth.users u
    WHERE u.id = uid AND (u.email_confirmed_at IS NOT NULL OR u.phone_confirmed_at IS NOT NULL)
  ) THEN RAISE EXCEPTION 'EMAIL_NOT_VERIFIED'; END IF;

  IF p_course_id = 'phonetics-phonology-kurdik' THEN
    SELECT array_agg('course-2-' || lpad(n::text,2,'0') || '.html' ORDER BY n)
      INTO lesson_order FROM generate_series(1,32) AS g(n);
  ELSIF p_course_id = 'kurmanji-course-1' THEN
    SELECT array_agg('kurmanji-course-1-lesson-' || lpad(n::text,2,'0') || '.html' ORDER BY n)
      INTO lesson_order FROM generate_series(1,26) AS g(n);
  ELSIF p_course_id = 'kurmanji-course-2' THEN
    SELECT array_agg('kurmanji-course-2-lesson-' || lpad(n::text,2,'0') || '.html' ORDER BY n)
      INTO lesson_order FROM generate_series(1,12) AS g(n);
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

  IF lesson_index > 1 AND (p_course_id = 'orthography-kurdik' OR NOT public.is_site_owner()) THEN
    SELECT COALESCE(array_agg(lp.lesson_key), ARRAY[]::text[])
      INTO completed_keys
    FROM public.lesson_progress lp
    WHERE lp.user_id = uid AND lp.course_id = p_course_id;

    IF NOT public.has_completed_lesson_prefix(completed_keys, lesson_order, lesson_index) THEN
      RAISE EXCEPTION 'PREVIOUS_LESSON_REQUIRED';
    END IF;
  END IF;

  INSERT INTO public.lesson_progress(user_id, course_id, lesson_key, completed_at)
  VALUES (uid, p_course_id, p_lesson_key, now())
  ON CONFLICT (user_id, course_id, lesson_key)
  DO UPDATE SET completed_at = EXCLUDED.completed_at;

  SELECT c.total_lessons INTO total_count FROM public.courses c WHERE c.id = p_course_id;

  IF p_course_id IN ('phonetics-phonology-kurdik','kurmanji-course-1','kurmanji-course-2') THEN
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
    UPDATE public.enrollments SET status='completed', completed_at=COALESCE(completed_at, now())
    WHERE user_id=uid AND course_id=p_course_id;
  END IF;

  RETURN jsonb_build_object('status', new_status, 'completed_count', completed_count,
    'total_lessons', total_count, 'course_completed', (new_status='completed'));
END;
$function$;
