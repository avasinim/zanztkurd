-- ZANSTI KURD — Supabase/PostgreSQL foundation
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
insert into public.courses(id,title,total_lessons) values
('phonetics-phonology-kurdik','کۆرسی ئەکادێمیک و زانستی فۆنێتیک و فۆنۆلۆجی زوانی کوردیک',25)
on conflict(id) do nothing;
alter table public.profiles enable row level security;
alter table public.courses enable row level security;
alter table public.enrollments enable row level security;
alter table public.lesson_progress enable row level security;
create policy "profiles own read" on public.profiles for select using(auth.uid()=id);
create policy "profiles own insert" on public.profiles for insert with check(auth.uid()=id);
create policy "profiles own update" on public.profiles for update using(auth.uid()=id);
create policy "courses public read" on public.courses for select using(true);
create policy "enrollments own read" on public.enrollments for select using(auth.uid()=user_id);
create policy "enrollments own insert" on public.enrollments for insert with check(auth.uid()=user_id);
create policy "enrollments own update" on public.enrollments for update using(auth.uid()=user_id);
create policy "progress own read" on public.lesson_progress for select using(auth.uid()=user_id);
create policy "progress own insert" on public.lesson_progress for insert with check(auth.uid()=user_id);
create policy "progress own update" on public.lesson_progress for update using(auth.uid()=user_id);
create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path=public as $$
begin insert into public.profiles(id,full_name) values(new.id,coalesce(new.raw_user_meta_data->>'full_name','')); return new; end; $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();