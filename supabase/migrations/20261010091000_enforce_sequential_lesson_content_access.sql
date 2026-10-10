-- Enforce sequential lesson access at the database boundary as well as in the browser.
-- The site owner remains exempt; enrolled learners can read only the first lesson
-- or a lesson whose immediate predecessor is recorded as completed.

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
  IF uid IS NULL THEN
    RETURN false;
  END IF;

  IF public.is_site_owner() THEN
    RETURN true;
  END IF;

  IF p_course_id = 'phonetics-phonology-kurdik' THEN
    lesson_order := ARRAY[
      'course-2-01.html','course-2-02.html','course-2-03.html','course-2-04.html','course-2-05.html',
      'course-2-06.html','course-2-07.html','course-2-08.html','course-2-09.html','course-2-10.html',
      'course-2-11.html','course-2-12.html','course-2-13.html','course-2-14.html','course-2-15.html',
      'course-2-16.html','course-2-17.html','course-2-18.html','course-2-19.html','course-2-20.html',
      'course-2-21.html','course-2-22.html','course-2-23.html','course-2-24.html','course-2-25.html'
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
  IF lesson_index IS NULL THEN
    RETURN false;
  END IF;
  IF lesson_index = 1 THEN
    RETURN true;
  END IF;

  RETURN EXISTS (
    SELECT 1
    FROM public.lesson_progress lp
    WHERE lp.user_id = uid
      AND lp.course_id = p_course_id
      AND lp.lesson_key = lesson_order[lesson_index - 1]
  );
END;
$function$;

REVOKE ALL ON FUNCTION public.can_read_lesson_content(text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.can_read_lesson_content(text, text) TO authenticated;

DROP POLICY IF EXISTS "Enrolled users and owners can read lesson content" ON public.lesson_content;

CREATE POLICY "Enrolled users and owners can read lesson content"
ON public.lesson_content
FOR SELECT
TO authenticated
USING (
  public.is_site_owner()
  OR (
    EXISTS (
      SELECT 1
      FROM public.enrollments e
      WHERE e.user_id = (SELECT auth.uid())
        AND e.course_id = lesson_content.course_id
        AND e.status IN ('active', 'completed')
    )
    AND public.can_read_lesson_content(lesson_content.course_id, lesson_content.lesson_key)
  )
);
