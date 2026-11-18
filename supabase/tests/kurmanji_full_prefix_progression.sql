-- Run only after 20261118100000_enforce_full_lesson_prefix_progression.sql
-- Pure SQL regression tests; no rows are inserted or modified.
DO $tests$
DECLARE
  order_26 text[];
  order_12 text[];
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

  IF public.has_completed_lesson_prefix(
    ARRAY[NULL]::text[], ARRAY['l01','l02'], 2
  ) THEN RAISE EXCEPTION 'NULL entries must not satisfy a required prefix'; END IF;

  IF public.has_completed_lesson_prefix(
    ARRAY[]::text[], ARRAY['l01','l02'], 2
  ) THEN RAISE EXCEPTION 'empty progress must not unlock lesson 2'; END IF;

  IF public.has_completed_lesson_prefix(
    ARRAY['l01'], ARRAY['l01','l02'], NULL
  ) THEN RAISE EXCEPTION 'NULL lesson index must be rejected'; END IF;

  IF public.has_completed_lesson_prefix(
    ARRAY['l01'], ARRAY['l01','l02'], 0
  ) THEN RAISE EXCEPTION 'zero lesson index must be rejected'; END IF;

  IF public.has_completed_lesson_prefix(
    ARRAY['l01'], NULL, 1
  ) THEN RAISE EXCEPTION 'NULL lesson order must be rejected'; END IF;

  IF public.has_completed_lesson_prefix(
    ARRAY['l01'], ARRAY[]::text[], 1
  ) THEN RAISE EXCEPTION 'empty lesson order must be rejected'; END IF;

  -- Exercise the exact final-index boundary for the 26- and 12-lesson courses.
  SELECT array_agg('l' || lpad(n::text, 2, '0') ORDER BY n)
    INTO order_26 FROM generate_series(1, 26) AS g(n);
  SELECT array_agg('l' || lpad(n::text, 2, '0') ORDER BY n)
    INTO order_12 FROM generate_series(1, 12) AS g(n);

  IF NOT public.has_completed_lesson_prefix(order_26[1:25], order_26, 26)
    THEN RAISE EXCEPTION 'complete 26-lesson prefix must allow the final lesson'; END IF;

  IF public.has_completed_lesson_prefix(order_26[1:24], order_26, 26)
    THEN RAISE EXCEPTION 'missing lesson 25 must block the final 26th lesson'; END IF;

  IF NOT public.has_completed_lesson_prefix(order_12[1:11], order_12, 12)
    THEN RAISE EXCEPTION 'complete 12-lesson prefix must allow the final lesson'; END IF;

  IF public.has_completed_lesson_prefix(order_12[1:10], order_12, 12)
    THEN RAISE EXCEPTION 'missing lesson 11 must block the final 12th lesson'; END IF;
END;
$tests$;
