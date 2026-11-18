-- Run only after 20261118100000_enforce_full_lesson_prefix_progression.sql
-- Pure SQL regression tests; no rows are inserted or modified.
DO $tests$
BEGIN
  IF NOT public.has_completed_lesson_prefix(
    ARRAY['l01','l02'], ARRAY['l01','l02','l03'], 3
  ) THEN RAISE EXCEPTION 'contiguous prefix should be accepted'; END IF;

  IF public.has_completed_lesson_prefix(
    ARRAY['l02'], ARRAY['l01','l02','l03'], 3
  ) THEN RAISE EXCEPTION 'missing first lesson must reject access to lesson 3'; END IF;

  IF public.has_completed_lesson_prefix(
    ARRAY['l01','l03'], ARRAY['l01','l02','l03','l04'], 4
  ) THEN RAISE EXCEPTION 'missing middle lesson must reject access to lesson 4'; END IF;

  IF NOT public.has_completed_lesson_prefix(
    ARRAY[]::text[], ARRAY['l01','l02','l03'], 1
  ) THEN RAISE EXCEPTION 'lesson 1 must be available with an empty progress set'; END IF;

  IF public.has_completed_lesson_prefix(
    ARRAY['l01','l02','l03'], ARRAY['l01','l02','l03'], 4
  ) THEN RAISE EXCEPTION 'out-of-range lesson index must be rejected'; END IF;

  IF public.has_completed_lesson_prefix(
    NULL, ARRAY['l01','l02'], 2
  ) THEN RAISE EXCEPTION 'NULL progress must not satisfy a required prefix'; END IF;
END;
$tests$;
