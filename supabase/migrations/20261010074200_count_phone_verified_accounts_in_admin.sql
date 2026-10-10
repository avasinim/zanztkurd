-- Treat either verified email or verified phone as a verified account in Owner Console.
-- The returned boolean is displayed as the account's verification status.
CREATE OR REPLACE FUNCTION public.admin_list_users()
RETURNS TABLE(
  id uuid,
  email text,
  full_name text,
  student_number text,
  email_confirmed boolean,
  created_at timestamp with time zone
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO ''
AS $function$
BEGIN
  IF NOT public.is_site_owner() THEN
    RAISE EXCEPTION 'NOT_SITE_OWNER';
  END IF;

  RETURN QUERY
  SELECT
    u.id,
    u.email::text,
    p.full_name::text,
    p.student_number::text,
    (u.email_confirmed_at IS NOT NULL OR u.phone_confirmed_at IS NOT NULL),
    u.created_at
  FROM auth.users u
  LEFT JOIN public.profiles p ON p.id = u.id
  ORDER BY u.created_at DESC;
END;
$function$;
