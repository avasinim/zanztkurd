-- Avasin Owner Admin Dashboard — Supabase RPCs
-- ئەم migration ـە تەنیا بۆ Owner ـی ماڵپەڕە.
-- پێش جێبەجێکردن، دڵنیابە لەوەی schema ـی سەرەکیی زانستی کورد پێشتر دانراوە.

create or replace function public.admin_list_users()
returns table(
  id uuid,
  email text,
  full_name text,
  student_number text,
  email_confirmed boolean,
  created_at timestamptz
)
language plpgsql
stable
security definer
set search_path=public,auth
as $$
begin
  if not public.is_site_owner() then
    raise exception 'NOT_SITE_OWNER';
  end if;

  return query
  select
    u.id,
    u.email::text,
    p.full_name::text,
    p.student_number::text,
    (u.email_confirmed_at is not null),
    u.created_at
  from auth.users u
  left join public.profiles p on p.id=u.id
  order by u.created_at desc;
end;
$$;

create or replace function public.admin_list_enrollments()
returns table(
  user_id uuid,
  course_id text,
  course_name text,
  email text,
  full_name text,
  status text,
  enrolled_at timestamptz
)
language plpgsql
stable
security definer
set search_path=public,auth
as $$
begin
  if not public.is_site_owner() then
    raise exception 'NOT_SITE_OWNER';
  end if;

  return query
  select
    e.user_id,
    e.course_id::text,
    coalesce(c.title,c.name,e.course_id::text)::text as course_name,
    u.email::text,
    p.full_name::text,
    e.status::text,
    e.enrolled_at
  from public.enrollments e
  join auth.users u on u.id=e.user_id
  left join public.profiles p on p.id=e.user_id
  left join public.courses c on c.id=e.course_id
  order by e.enrolled_at desc;
end;
$$;

create or replace function public.admin_list_progress()
returns table(
  user_id uuid,
  course_id text,
  course_name text,
  email text,
  full_name text,
  completed_count bigint,
  last_lesson text,
  last_completed_at timestamptz
)
language plpgsql
stable
security definer
set search_path=public,auth
as $$
begin
  if not public.is_site_owner() then
    raise exception 'NOT_SITE_OWNER';
  end if;

  return query
  select
    e.user_id,
    e.course_id::text,
    coalesce(c.title,c.name,e.course_id::text)::text as course_name,
    u.email::text,
    p.full_name::text,
    count(lp.*)::bigint as completed_count,
    (array_agg(lp.lesson_key order by lp.completed_at desc nulls last))[1]::text as last_lesson,
    max(lp.completed_at) as last_completed_at
  from public.enrollments e
  join auth.users u on u.id=e.user_id
  left join public.profiles p on p.id=e.user_id
  left join public.courses c on c.id=e.course_id
  left join public.lesson_progress lp
    on lp.user_id=e.user_id and lp.course_id=e.course_id
  group by e.user_id,e.course_id,c.title,c.name,u.email,p.full_name
  order by max(lp.completed_at) desc nulls last;
end;
$$;

create or replace function public.admin_set_enrollment_status(
  p_user_id uuid,
  p_course_id text,
  p_status text
)
returns boolean
language plpgsql
security definer
set search_path=public,auth
as $$
begin
  if not public.is_site_owner() then
    raise exception 'NOT_SITE_OWNER';
  end if;

  if p_status not in ('active','completed') then
    raise exception 'INVALID_STATUS';
  end if;

  update public.enrollments
  set status=p_status
  where user_id=p_user_id and course_id=p_course_id;

  if not found then
    raise exception 'ENROLLMENT_NOT_FOUND';
  end if;

  return true;
end;
$$;

revoke all on function public.admin_list_users() from public;
revoke all on function public.admin_list_enrollments() from public;
revoke all on function public.admin_list_progress() from public;
revoke all on function public.admin_set_enrollment_status(uuid,text,text) from public;

grant execute on function public.admin_list_users() to authenticated;
grant execute on function public.admin_list_enrollments() to authenticated;
grant execute on function public.admin_list_progress() to authenticated;
grant execute on function public.admin_set_enrollment_status(uuid,text,text) to authenticated;
