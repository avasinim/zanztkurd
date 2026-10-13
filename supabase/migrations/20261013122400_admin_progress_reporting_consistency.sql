-- Avasin: keep owner enrollment available and make admin progress reporting match course completion rules.
-- No student progress or enrollment rows are modified by this migration.

create or replace function public.enroll_in_course(p_course_id text)
returns public.enrollments
language plpgsql
security definer
set search_path to ''
as $function$
declare
  result_row public.enrollments;
  verified_account boolean := false;
begin
  if auth.uid() is null then
    raise exception 'AUTH_REQUIRED';
  end if;

  if not public.is_site_owner() then
    select exists (
      select 1
      from auth.users u
      where u.id = auth.uid()
        and (u.email_confirmed_at is not null or u.phone_confirmed_at is not null)
    ) into verified_account;

    if not verified_account then
      raise exception 'EMAIL_NOT_VERIFIED';
    end if;
  end if;

  if not exists (select 1 from public.courses c where c.id = p_course_id) then
    raise exception 'COURSE_NOT_FOUND';
  end if;

  select * into result_row
  from public.enrollments
  where user_id = auth.uid() and course_id = p_course_id;

  if result_row.status = 'completed' then
    return result_row;
  end if;

  insert into public.enrollments(user_id, course_id, status)
  values (auth.uid(), p_course_id, 'active')
  on conflict (user_id, course_id)
  do update set status = 'active', completed_at = null
  returning * into result_row;

  return result_row;
end;
$function$;

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
set search_path to ''
as $function$
begin
  if not public.is_site_owner() then
    raise exception 'NOT_SITE_OWNER';
  end if;

  return query
  select e.user_id,
         e.course_id::text,
         coalesce(c.title, e.course_id)::text,
         u.email::text,
         p.full_name::text,
         e.status::text,
         e.enrolled_at
  from public.enrollments e
  join auth.users u on u.id = e.user_id
  left join public.profiles p on p.id = e.user_id
  left join public.courses c on c.id = e.course_id
  order by e.enrolled_at desc;
end;
$function$;

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
set search_path to ''
as $function$
begin
  if not public.is_site_owner() then
    raise exception 'NOT_SITE_OWNER';
  end if;

  return query
  select e.user_id,
         e.course_id::text,
         coalesce(c.title, e.course_id)::text,
         u.email::text,
         p.full_name::text,
         (
           case
             when e.course_id = 'phonetics-phonology-kurdik' then
               count(lp.lesson_key) filter (
                 where lp.lesson_key = any(array[
                   'course-2-01.html','course-2-02.html','course-2-03.html','course-2-04.html',
                   'course-2-05.html','course-2-06.html','course-2-07.html','course-2-08.html',
                   'course-2-09.html','course-2-10.html','course-2-11.html','course-2-12.html',
                   'course-2-13.html','course-2-14.html','course-2-15.html','course-2-16.html',
                   'course-2-17.html','course-2-18.html','course-2-19.html','course-2-20.html',
                   'course-2-21.html','course-2-22.html','course-2-23.html','course-2-24.html',
                   'course-2-25.html','course-2-26.html','course-2-27.html','course-2-28.html',
                   'course-2-29.html','course-2-30.html','course-2-31.html','course-2-32.html'
                 ])
               )
             else
               count(lp.lesson_key) filter (
                 where lp.lesson_key = any(array[
                   '017.html','018.html','019.html','020.html','021.html','022.html','023.html',
                   '024.html','025.html','026.html','027.html','028.html','029.html','030.html',
                   '031.html','032.html','033.html','034.html','035.html','036.html','037.html'
                 ])
               )
               + case when count(lp.lesson_key) filter (
                   where lp.lesson_key = any(array[
                     '038.html','039.html','040.html','041.html','042.html','043.html','044.html'
                   ])
                 ) = 7 then 1 else 0 end
               + case when count(lp.lesson_key) filter (
                   where lp.lesson_key = any(array[
                     '046.html','047.html','048.html','049.html','050.html','051.html'
                   ])
                 ) = 6 then 1 else 0 end
               + case when count(lp.lesson_key) filter (where lp.lesson_key = '045.html') > 0
                      then 1 else 0 end
               + case when count(lp.lesson_key) filter (
                   where lp.lesson_key = any(array[
                     '052.html','053.html','054.html','055.html','056.html','057.html'
                   ])
                 ) = 6 then 1 else 0 end
               + case when count(lp.lesson_key) filter (where lp.lesson_key = '058.html') > 0
                      then 1 else 0 end
           end
         )::bigint,
         (array_agg(lp.lesson_key order by lp.completed_at desc nulls last)
           filter (where lp.lesson_key is not null))[1]::text,
         max(lp.completed_at)
  from public.enrollments e
  join auth.users u on u.id = e.user_id
  left join public.profiles p on p.id = e.user_id
  left join public.courses c on c.id = e.course_id
  left join public.lesson_progress lp
    on lp.user_id = e.user_id and lp.course_id = e.course_id
  group by e.user_id, e.course_id, c.title, u.email, p.full_name
  order by max(lp.completed_at) desc nulls last;
end;
$function$;

create or replace function public.admin_set_enrollment_status(
  p_user_id uuid,
  p_course_id text,
  p_status text
)
returns boolean
language plpgsql
security definer
set search_path to ''
as $function$
begin
  if not public.is_site_owner() then
    raise exception 'NOT_SITE_OWNER';
  end if;

  if p_status is null or p_status not in ('active', 'completed') then
    raise exception 'INVALID_STATUS';
  end if;

  update public.enrollments
  set status = p_status,
      completed_at = case
        when p_status = 'completed' then coalesce(completed_at, now())
        else null
      end
  where user_id = p_user_id and course_id = p_course_id;

  if not found then
    raise exception 'ENROLLMENT_NOT_FOUND';
  end if;

  return true;
end;
$function$;

revoke all on function public.enroll_in_course(text) from public;
revoke all on function public.admin_list_enrollments() from public;
revoke all on function public.admin_list_progress() from public;
revoke all on function public.admin_set_enrollment_status(uuid, text, text) from public;

grant execute on function public.enroll_in_course(text) to authenticated;
grant execute on function public.admin_list_enrollments() to authenticated;
grant execute on function public.admin_list_progress() to authenticated;
grant execute on function public.admin_set_enrollment_status(uuid, text, text) to authenticated;
