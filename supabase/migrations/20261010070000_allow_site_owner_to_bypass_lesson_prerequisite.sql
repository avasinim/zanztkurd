-- Repair the Course 1 owner completion failure seen as PREVIOUS_LESSON_REQUIRED.
-- Keep sequential progression for learners; the designated site owner can test any lesson.
create or replace function public.complete_lesson(p_course_id text, p_lesson_key text)
returns jsonb
language plpgsql
security definer
set search_path to ''
as $function$
declare
  uid uuid := auth.uid();
  total_count integer;
  completed_count integer := 0;
  new_status text := 'active';
  lesson_order text[];
  lesson_index integer;
  previous_key text;
begin
  if uid is null then raise exception 'AUTH_REQUIRED'; end if;

  if not exists (
    select 1 from auth.users u
    where u.id = uid and (u.email_confirmed_at is not null or u.phone_confirmed_at is not null)
  ) then raise exception 'EMAIL_NOT_VERIFIED'; end if;

  if p_course_id = 'phonetics-phonology-kurdik' then
    lesson_order := array[
      'course-2-01.html','course-2-02.html','course-2-03.html','course-2-04.html','course-2-05.html',
      'course-2-06.html','course-2-07.html','course-2-08.html','course-2-09.html','course-2-10.html',
      'course-2-11.html','course-2-12.html','course-2-13.html','course-2-14.html','course-2-15.html',
      'course-2-16.html','course-2-17.html','course-2-18.html','course-2-19.html','course-2-20.html',
      'course-2-21.html','course-2-22.html','course-2-23.html','course-2-24.html','course-2-25.html'
    ];
  elsif p_course_id = 'orthography-kurdik' then
    lesson_order := array[
      '017.html','018.html','019.html','020.html','021.html','022.html','023.html','024.html',
      '025.html','026.html','027.html','028.html','029.html','030.html','031.html','032.html',
      '033.html','034.html','035.html','036.html','037.html','038.html','039.html','040.html',
      '041.html','042.html','043.html','044.html','046.html','047.html','048.html','049.html',
      '050.html','051.html','045.html','052.html','053.html','054.html','055.html','056.html',
      '057.html','058.html'
    ];
  else raise exception 'COURSE_NOT_FOUND'; end if;

  lesson_index := array_position(lesson_order,p_lesson_key);
  if lesson_index is null then raise exception 'INVALID_LESSON'; end if;

  if not exists (
    select 1 from public.enrollments e
    where e.user_id=uid and e.course_id=p_course_id and e.status in ('active','completed')
  ) and not public.is_site_owner() then
    raise exception 'NOT_ENROLLED';
  end if;

  -- Owner bypass is limited to the sequential prerequisite; auth, verification,
  -- valid course/lesson checks, and learner enrollment checks remain enforced.
  if lesson_index > 1 and not public.is_site_owner() then
    previous_key := lesson_order[lesson_index-1];
    if not exists (
      select 1 from public.lesson_progress lp
      where lp.user_id=uid and lp.course_id=p_course_id and lp.lesson_key=previous_key
    ) then raise exception 'PREVIOUS_LESSON_REQUIRED'; end if;
  end if;

  insert into public.lesson_progress(user_id,course_id,lesson_key,completed_at)
  values(uid,p_course_id,p_lesson_key,now())
  on conflict(user_id,course_id,lesson_key)
  do update set completed_at=excluded.completed_at;

  select c.total_lessons into total_count from public.courses c where c.id=p_course_id;

  if p_course_id='phonetics-phonology-kurdik' then
    select count(*) into completed_count from public.lesson_progress lp
    where lp.user_id=uid and lp.course_id=p_course_id;
  else
    select count(*) into completed_count from public.lesson_progress lp
    where lp.user_id=uid and lp.course_id=p_course_id
      and lp.lesson_key=any(array[
        '017.html','018.html','019.html','020.html','021.html','022.html','023.html',
        '024.html','025.html','026.html','027.html','028.html','029.html','030.html',
        '031.html','032.html','033.html','034.html','035.html','036.html','037.html'
      ]);

    if (select count(*) from public.lesson_progress lp where lp.user_id=uid and lp.course_id=p_course_id
      and lp.lesson_key=any(array['038.html','039.html','040.html','041.html','042.html','043.html','044.html']))=7
      then completed_count:=completed_count+1; end if;
    if (select count(*) from public.lesson_progress lp where lp.user_id=uid and lp.course_id=p_course_id
      and lp.lesson_key=any(array['046.html','047.html','048.html','049.html','050.html','051.html']))=6
      then completed_count:=completed_count+1; end if;
    if exists(select 1 from public.lesson_progress lp where lp.user_id=uid and lp.course_id=p_course_id and lp.lesson_key='045.html')
      then completed_count:=completed_count+1; end if;
    if (select count(*) from public.lesson_progress lp where lp.user_id=uid and lp.course_id=p_course_id
      and lp.lesson_key=any(array['052.html','053.html','054.html','055.html','056.html','057.html']))=6
      then completed_count:=completed_count+1; end if;
    if exists(select 1 from public.lesson_progress lp where lp.user_id=uid and lp.course_id=p_course_id and lp.lesson_key='058.html')
      then completed_count:=completed_count+1; end if;
  end if;

  if completed_count >= total_count then
    new_status:='completed';
    update public.enrollments set status='completed',completed_at=coalesce(completed_at,now())
    where user_id=uid and course_id=p_course_id;
  end if;

  return jsonb_build_object('status',new_status,'completed_count',completed_count,
    'total_lessons',total_count,'course_completed',(new_status='completed'));
end;
$function$;
