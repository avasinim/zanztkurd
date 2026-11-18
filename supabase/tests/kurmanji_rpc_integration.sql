-- End-to-end tests for the actual Kurmanji progression RPCs.
-- Executed only against the disposable PostgreSQL service created by CI.
DO $tests$
DECLARE
  result_row jsonb;
  learner uuid := '00000000-0000-0000-0000-000000000002';
  unverified uuid := '00000000-0000-0000-0000-000000000003';
  owner_id uuid := '00000000-0000-0000-0000-000000000001';
  n integer;
BEGIN
  -- Function grants: clients may call the two RPCs, but not the internal helper.
  IF has_function_privilege('anon', 'public.can_read_lesson_content(text,text)', 'EXECUTE') THEN
    RAISE EXCEPTION 'anon must not execute can_read_lesson_content';
  END IF;
  IF NOT has_function_privilege('authenticated', 'public.can_read_lesson_content(text,text)', 'EXECUTE') THEN
    RAISE EXCEPTION 'authenticated must execute can_read_lesson_content';
  END IF;
  IF has_function_privilege('anon', 'public.complete_lesson(text,text)', 'EXECUTE') THEN
    RAISE EXCEPTION 'anon must not execute complete_lesson';
  END IF;
  IF NOT has_function_privilege('authenticated', 'public.complete_lesson(text,text)', 'EXECUTE') THEN
    RAISE EXCEPTION 'authenticated must execute complete_lesson';
  END IF;
  IF has_function_privilege('authenticated', 'public.has_completed_lesson_prefix(text[],text[],integer)', 'EXECUTE') THEN
    RAISE EXCEPTION 'authenticated must not execute the internal progression helper';
  END IF;

  -- Unauthenticated calls are denied.
  PERFORM set_config('request.jwt.claim.sub', '', false);
  IF public.can_read_lesson_content('kurmanji-course-1', 'kurmanji-course-1-lesson-01.html') THEN
    RAISE EXCEPTION 'anonymous lesson read must be denied';
  END IF;
  BEGIN
    PERFORM public.complete_lesson('kurmanji-course-1', 'kurmanji-course-1-lesson-01.html');
    RAISE EXCEPTION 'expected AUTH_REQUIRED';
  EXCEPTION WHEN OTHERS THEN
    IF SQLERRM <> 'AUTH_REQUIRED' THEN RAISE; END IF;
  END;

  -- Unverified users cannot complete lessons.
  PERFORM set_config('request.jwt.claim.sub', unverified::text, false);
  BEGIN
    PERFORM public.complete_lesson('kurmanji-course-1', 'kurmanji-course-1-lesson-01.html');
    RAISE EXCEPTION 'expected EMAIL_NOT_VERIFIED';
  EXCEPTION WHEN OTHERS THEN
    IF SQLERRM <> 'EMAIL_NOT_VERIFIED' THEN RAISE; END IF;
  END;

  -- A verified but unenrolled learner gets no content and cannot complete.
  PERFORM set_config('request.jwt.claim.sub', learner::text, false);
  IF public.can_read_lesson_content('kurmanji-course-1', 'kurmanji-course-1-lesson-01.html') THEN
    RAISE EXCEPTION 'unenrolled learner must not read lesson content';
  END IF;
  BEGIN
    PERFORM public.complete_lesson('kurmanji-course-1', 'kurmanji-course-1-lesson-01.html');
    RAISE EXCEPTION 'expected NOT_ENROLLED';
  EXCEPTION WHEN OTHERS THEN
    IF SQLERRM <> 'NOT_ENROLLED' THEN RAISE; END IF;
  END;

  INSERT INTO public.enrollments(user_id, course_id, status)
  VALUES (learner, 'kurmanji-course-1', 'active');

  -- Lesson 1 is available; later lessons require the complete prefix.
  IF NOT public.can_read_lesson_content('kurmanji-course-1', 'kurmanji-course-1-lesson-01.html') THEN
    RAISE EXCEPTION 'enrolled learner must read lesson 1';
  END IF;
  IF public.can_read_lesson_content('kurmanji-course-1', 'kurmanji-course-1-lesson-02.html') THEN
    RAISE EXCEPTION 'lesson 2 must remain locked before lesson 1 completion';
  END IF;
  BEGIN
    PERFORM public.complete_lesson('kurmanji-course-1', 'kurmanji-course-1-lesson-02.html');
    RAISE EXCEPTION 'expected PREVIOUS_LESSON_REQUIRED for lesson 2';
  EXCEPTION WHEN OTHERS THEN
    IF SQLERRM <> 'PREVIOUS_LESSON_REQUIRED' THEN RAISE; END IF;
  END;

  -- Unknown course and lesson identifiers fail closed.
  IF public.can_read_lesson_content('not-a-course', 'lesson-01.html') THEN
    RAISE EXCEPTION 'unknown course must not grant lesson access';
  END IF;
  BEGIN
    PERFORM public.complete_lesson('kurmanji-course-1', 'not-a-real-lesson.html');
    RAISE EXCEPTION 'expected INVALID_LESSON';
  EXCEPTION WHEN OTHERS THEN
    IF SQLERRM <> 'INVALID_LESSON' THEN RAISE; END IF;
  END;
  BEGIN
    PERFORM public.complete_lesson('not-a-course', 'lesson-01.html');
    RAISE EXCEPTION 'expected COURSE_NOT_FOUND';
  EXCEPTION WHEN OTHERS THEN
    IF SQLERRM <> 'COURSE_NOT_FOUND' THEN RAISE; END IF;
  END;

  result_row := public.complete_lesson('kurmanji-course-1', 'kurmanji-course-1-lesson-01.html');
  IF (result_row->>'completed_count')::integer <> 1 THEN
    RAISE EXCEPTION 'course 1 lesson 1 should produce completed_count=1; got %', result_row;
  END IF;
  IF NOT public.can_read_lesson_content('kurmanji-course-1', 'kurmanji-course-1-lesson-02.html') THEN
    RAISE EXCEPTION 'lesson 2 should unlock after lesson 1 completion';
  END IF;
  PERFORM public.complete_lesson('kurmanji-course-1', 'kurmanji-course-1-lesson-02.html');

  -- A gap in progress cannot unlock the next lesson.
  INSERT INTO public.lesson_progress(user_id, course_id, lesson_key)
  VALUES (learner, 'kurmanji-course-1', 'kurmanji-course-1-lesson-04.html');
  IF public.can_read_lesson_content('kurmanji-course-1', 'kurmanji-course-1-lesson-05.html') THEN
    RAISE EXCEPTION 'a gap in lesson progress must keep lesson 5 locked';
  END IF;
  BEGIN
    PERFORM public.complete_lesson('kurmanji-course-1', 'kurmanji-course-1-lesson-05.html');
    RAISE EXCEPTION 'expected PREVIOUS_LESSON_REQUIRED across a progress gap';
  EXCEPTION WHEN OTHERS THEN
    IF SQLERRM <> 'PREVIOUS_LESSON_REQUIRED' THEN RAISE; END IF;
  END;
  DELETE FROM public.lesson_progress
  WHERE user_id = learner AND course_id = 'kurmanji-course-1'
    AND lesson_key = 'kurmanji-course-1-lesson-04.html';

  -- Verify the exact 26-lesson final boundary and completion accounting.
  FOR n IN 3..25 LOOP
    INSERT INTO public.lesson_progress(user_id, course_id, lesson_key)
    VALUES (learner, 'kurmanji-course-1',
      'kurmanji-course-1-lesson-' || lpad(n::text, 2, '0') || '.html');
  END LOOP;
  IF NOT public.can_read_lesson_content('kurmanji-course-1', 'kurmanji-course-1-lesson-26.html') THEN
    RAISE EXCEPTION 'complete prefix 1..25 must unlock lesson 26';
  END IF;
  result_row := public.complete_lesson('kurmanji-course-1', 'kurmanji-course-1-lesson-26.html');
  IF result_row->>'status' <> 'completed'
     OR (result_row->>'completed_count')::integer <> 26
     OR result_row->>'course_completed' <> 'true' THEN
    RAISE EXCEPTION 'course 1 final lesson should complete all 26 lessons; got %', result_row;
  END IF;

  -- Verify the 12-lesson course independently, including a missing lesson 11.
  INSERT INTO public.enrollments(user_id, course_id, status)
  VALUES (learner, 'kurmanji-course-2', 'active');
  FOR n IN 1..10 LOOP
    INSERT INTO public.lesson_progress(user_id, course_id, lesson_key)
    VALUES (learner, 'kurmanji-course-2',
      'kurmanji-course-2-lesson-' || lpad(n::text, 2, '0') || '.html');
  END LOOP;
  INSERT INTO public.lesson_progress(user_id, course_id, lesson_key)
  VALUES (learner, 'kurmanji-course-2', 'kurmanji-course-2-lesson-12.html');
  IF public.can_read_lesson_content('kurmanji-course-2', 'kurmanji-course-2-lesson-12.html') THEN
    RAISE EXCEPTION 'missing lesson 11 must keep lesson 12 locked';
  END IF;
  DELETE FROM public.lesson_progress
  WHERE user_id = learner AND course_id = 'kurmanji-course-2'
    AND lesson_key = 'kurmanji-course-2-lesson-12.html';
  INSERT INTO public.lesson_progress(user_id, course_id, lesson_key)
  VALUES (learner, 'kurmanji-course-2', 'kurmanji-course-2-lesson-11.html');
  IF NOT public.can_read_lesson_content('kurmanji-course-2', 'kurmanji-course-2-lesson-12.html') THEN
    RAISE EXCEPTION 'complete prefix 1..11 must unlock lesson 12';
  END IF;
  result_row := public.complete_lesson('kurmanji-course-2', 'kurmanji-course-2-lesson-12.html');
  IF result_row->>'status' <> 'completed'
     OR (result_row->>'completed_count')::integer <> 12
     OR result_row->>'course_completed' <> 'true' THEN
    RAISE EXCEPTION 'course 2 final lesson should complete all 12 lessons; got %', result_row;
  END IF;

  -- Preserve the documented site-owner sequencing bypass for the new courses.
  PERFORM set_config('request.jwt.claim.sub', owner_id::text, false);
  result_row := public.complete_lesson('kurmanji-course-1', 'kurmanji-course-1-lesson-02.html');
  IF (result_row->>'completed_count')::integer <> 1 THEN
    RAISE EXCEPTION 'site owner should retain the sequencing bypass; got %', result_row;
  END IF;
END;
$tests$;
