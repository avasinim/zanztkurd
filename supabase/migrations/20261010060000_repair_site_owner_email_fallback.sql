-- Repair the site-owner check in environments where the earlier migration
-- was not applied. This also handles a recreated Auth user for the designated
-- owner email while retaining the site_owners table as the primary mapping.

create or replace function public.is_site_owner()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.site_owners o
    where o.user_id = auth.uid()
  )
  or lower(coalesce(auth.email(), '')) = lower('ardian.teymouri@gmail.com');
$$;

revoke all on function public.is_site_owner() from public;
grant execute on function public.is_site_owner() to authenticated;
