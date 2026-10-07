-- Avasin Owner Admin — change the primary site owner email
-- The requested Owner account is ardian.teymouri@gmail.com.

create or replace function public.is_site_owner()
returns boolean
language sql
stable
security definer
set search_path=public,auth
as $$
  select exists(
    select 1 from public.site_owners o
    where o.user_id=auth.uid()
  )
  or lower(coalesce(auth.email(),'')) = lower('ardian.teymouri@gmail.com');
$$;

revoke all on function public.is_site_owner() from public;
grant execute on function public.is_site_owner() to authenticated;
