-- TEST BRANCH ONLY: require verified accounts for self-enrollment and
-- prevent authenticated clients from bypassing the enrollment RPC with direct INSERT.
-- Do not apply to production without review and explicit approval.
BEGIN;

CREATE OR REPLACE FUNCTION public.enroll_in_course(p_course_id text)
RETURNS public.enrollments
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
DECLARE
  result_row public.enrollments;
  verified_account boolean := false;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'AUTH_REQUIRED';
  END IF;

  -- The site owner may enroll without email/phone verification; students may not.
  IF NOT public.is_site_owner() THEN
    SELECT EXISTS (
      SELECT 1
      FROM auth.users u
      WHERE u.id = auth.uid()
        AND (u.email_confirmed_at IS NOT NULL OR u.phone_confirmed_at IS NOT NULL)
    ) INTO verified_account;

    IF NOT verified_account THEN
      RAISE EXCEPTION 'EMAIL_NOT_VERIFIED';
    END IF;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM public.courses c WHERE c.id = p_course_id
  ) THEN
    RAISE EXCEPTION 'COURSE_NOT_FOUND';
  END IF;

  SELECT * INTO result_row
  FROM public.enrollments e
  WHERE e.user_id = auth.uid() AND e.course_id = p_course_id;

  -- Never downgrade an already completed enrollment to active.
  IF FOUND AND result_row.status = 'completed' THEN
    RETURN result_row;
  END IF;

  INSERT INTO public.enrollments (user_id, course_id, status)
  VALUES (auth.uid(), p_course_id, 'active')
  ON CONFLICT (user_id, course_id)
  DO UPDATE SET status = 'active', completed_at = NULL
  RETURNING * INTO result_row;

  RETURN result_row;
END;
$function$;

REVOKE ALL ON FUNCTION public.enroll_in_course(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.enroll_in_course(text) TO authenticated;

-- All student enrollment inserts must go through the guarded SECURITY DEFINER RPC.
-- This also blocks attempts to forge completed status or bypass verification.
REVOKE INSERT ON TABLE public.enrollments FROM authenticated;

COMMIT;
