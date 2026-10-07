-- ZANSTI KURD — Supabase/PostgreSQL production foundation
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  student_number text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table if not exists public.courses (
  id text primary key,
  title text not null,
  description text not null default '',
  total_lessons integer not null default 0,
  created_at timestamptz not null default now()
);
create table if not exists public.enrollments (
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id text not null references public.courses(id) on delete cascade,
  status text not null default 'active' check(status in ('active','completed','withdrawn')),
  enrolled_at timestamptz not null default now(),
  completed_at timestamptz,
  primary key(user_id,course_id)
);
create table if not exists public.lesson_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id text not null references public.courses(id) on delete cascade,
  lesson_key text not null,
  completed_at timestamptz not null default now(),
  primary key(user_id,course_id,lesson_key)
);

insert into public.courses(id,title,description,total_lessons) values
('orthography-kurdik','کۆرسی زانستی و ئەکادێمیکی ڕێنوسی زوانی کوردیک','دەورەی ١؛ ئەلفبێ، پیت، نوسین و سیستەمی ڕێنوسی زوانی کوردیک.',26),
('phonetics-phonology-kurdik','کۆرسی ئەکادێمیک و زانستی فۆنێتیک و فۆنۆلۆجی زوانی کوردیک','دەورەی ٢؛ فۆنێتیک، فۆنۆلۆجی، ئەکوستیک، درک و توێژینەوە.',25)
on conflict(id) do update set title=excluded.title,description=excluded.description,total_lessons=excluded.total_lessons;

alter table public.profiles enable row level security;
alter table public.courses enable row level security;
alter table public.enrollments enable row level security;
alter table public.lesson_progress enable row level security;

drop policy if exists "profiles own read" on public.profiles;
drop policy if exists "profiles own insert" on public.profiles;
drop policy if exists "profiles own update" on public.profiles;
drop policy if exists "courses public read" on public.courses;
drop policy if exists "enrollments own read" on public.enrollments;
drop policy if exists "enrollments own insert" on public.enrollments;
drop policy if exists "enrollments own update" on public.enrollments;
drop policy if exists "progress own read" on public.lesson_progress;
drop policy if exists "progress own insert" on public.lesson_progress;
drop policy if exists "progress own update" on public.lesson_progress;

create policy "profiles own read" on public.profiles for select using(auth.uid()=id);
create policy "profiles own insert" on public.profiles for insert with check(auth.uid()=id);
drop policy if exists "profiles own update" on public.profiles;
create policy "profiles own update" on public.profiles for update
using(auth.uid()=id)
with check(
  auth.uid()=id
  and student_number = (select p.student_number from public.profiles p where p.id=auth.uid())
);
create policy "courses public read" on public.courses for select using(true);
create policy "enrollments own read" on public.enrollments for select using(auth.uid()=user_id);
create policy "progress own read" on public.lesson_progress for select using(auth.uid()=user_id);

create or replace function public.enroll_in_course(p_course_id text)
returns public.enrollments
language plpgsql
security definer
set search_path=public,auth
as $$
declare result_row public.enrollments;
begin
  if auth.uid() is null then raise exception 'AUTH_REQUIRED'; end if;
  if not exists(select 1 from auth.users u where u.id=auth.uid() and u.email_confirmed_at is not null) then
    raise exception 'EMAIL_NOT_VERIFIED';
  end if;
  if not exists(select 1 from public.courses c where c.id=p_course_id) then
    raise exception 'COURSE_NOT_FOUND';
  end if;
  insert into public.enrollments(user_id,course_id,status)
  values(auth.uid(),p_course_id,'active')
  on conflict(user_id,course_id) do update
    set status='active', completed_at=null
  returning * into result_row;
  return result_row;
end;
$$;

revoke all on function public.enroll_in_course(text) from public;
grant execute on function public.enroll_in_course(text) to authenticated;

create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path=public
as $
declare
  generated_student_number text;
begin
  generated_student_number := 'AK-' || to_char(now(),'YYYY') || '-' ||
    upper(substr(replace(new.id::text,'-',''),1,6));
  insert into public.profiles(id,full_name,student_number)
  values(new.id,coalesce(new.raw_user_meta_data->>'full_name',''),generated_student_number)
  on conflict(id) do nothing;
  return new;
end;
$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

-- Lesson progress is intentionally server-owned by the lesson client/RLS layer.
-- The application only writes the authenticated user's own rows.
create policy "progress own insert" on public.lesson_progress for insert with check(auth.uid()=user_id);
create policy "progress own update" on public.lesson_progress for update using(auth.uid()=user_id) with check(auth.uid()=user_id);

-- Secure lesson completion: validates enrollment, writes progress, and
-- automatically marks the enrollment completed when the course is finished.
create or replace function public.complete_lesson(p_course_id text,p_lesson_key text)
returns jsonb
language plpgsql
security definer
set search_path=public,auth
as $$
declare
  uid uuid := auth.uid();
  total_count integer;
  completed_count integer;
  valid_lesson boolean := false;
  new_status text := 'active';
  lesson_order text[];
  lesson_index integer;
  previous_key text;
begin
  if uid is null then raise exception 'AUTH_REQUIRED'; end if;
  if not exists(select 1 from auth.users u where u.id=uid and u.email_confirmed_at is not null) then
    raise exception 'EMAIL_NOT_VERIFIED';
  end if;

  if p_course_id='phonetics-phonology-kurdik' then
    lesson_order := array[
      'course-2-01.html','course-2-02.html','course-2-03.html','course-2-04.html','course-2-05.html',
      'course-2-06.html','course-2-07.html','course-2-08.html','course-2-09.html','course-2-10.html',
      'course-2-11.html','course-2-12.html','course-2-13.html','course-2-14.html','course-2-15.html',
      'course-2-16.html','course-2-17.html','course-2-18.html','course-2-19.html','course-2-20.html',
      'course-2-21.html','course-2-22.html','course-2-23.html','course-2-24.html','course-2-25.html'
    ];
  elsif p_course_id='orthography-kurdik' then
    lesson_order := array[
      '017.html','018.html','019.html','020.html','021.html','022.html','023.html','024.html',
      '025.html','026.html','027.html','028.html','029.html','030.html','031.html','032.html',
      '033.html','034.html','035.html','036.html','037.html','038.html','039.html','040.html',
      '041.html','042.html','043.html','044.html','045.html','046.html','047.html','048.html',
      '049.html','050.html','051.html','052.html','053.html','054.html','055.html','056.html',
      '057.html','058.html'
    ];
  else
    raise exception 'COURSE_NOT_FOUND';
  end if;

  lesson_index := array_position(lesson_order,p_lesson_key);
  if lesson_index is null then raise exception 'INVALID_LESSON'; end if;

  if not exists(select 1 from public.enrollments e
    where e.user_id=uid and e.course_id=p_course_id and e.status in ('active','completed')) then
    raise exception 'NOT_ENROLLED';
  end if;

  if lesson_index > 1 then
    previous_key := lesson_order[lesson_index-1];
    if not exists(select 1 from public.lesson_progress lp
      where lp.user_id=uid and lp.course_id=p_course_id and lp.lesson_key=previous_key) then
      raise exception 'PREVIOUS_LESSON_REQUIRED';
    end if;
  end if;

  insert into public.lesson_progress(user_id,course_id,lesson_key,completed_at)
  values(uid,p_course_id,p_lesson_key,now())
  on conflict(user_id,course_id,lesson_key) do update set completed_at=excluded.completed_at;

  select c.total_lessons into total_count from public.courses c where c.id=p_course_id;
  select count(*) into completed_count from public.lesson_progress lp
    where lp.user_id=uid and lp.course_id=p_course_id;

  if completed_count >= array_length(lesson_order,1) then
    new_status := 'completed';
    update public.enrollments
      set status='completed', completed_at=coalesce(completed_at,now())
      where user_id=uid and course_id=p_course_id;
  end if;

  return jsonb_build_object(
    'status',new_status,
    'completed_count',completed_count,
    'total_lessons',total_count,
    'course_completed',(new_status='completed')
  );
end;
$$;

revoke all on function public.complete_lesson(text,text) from public;
grant execute on function public.complete_lesson(text,text) to authenticated;
