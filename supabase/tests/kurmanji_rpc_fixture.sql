-- Disposable PostgreSQL fixture for the Kurmanji RPC integration test only.
-- This file must never be run against a shared or production database.
DO $roles$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'anon') THEN
    EXECUTE 'CREATE ROLE anon NOLOGIN';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'authenticated') THEN
    EXECUTE 'CREATE ROLE authenticated NOLOGIN';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'service_role') THEN
    EXECUTE 'CREATE ROLE service_role NOLOGIN';
  END IF;
END;
$roles$;

CREATE SCHEMA auth;

CREATE TABLE auth.users (
  id uuid PRIMARY KEY,
  email_confirmed_at timestamptz,
  phone_confirmed_at timestamptz
);

CREATE OR REPLACE FUNCTION auth.uid()
RETURNS uuid
LANGUAGE sql
STABLE
SET search_path TO ''
AS $function$
  SELECT NULLIF(current_setting('request.jwt.claim.sub', true), '')::uuid;
$function$;

CREATE TABLE public.courses (
  id text PRIMARY KEY,
  title text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  total_lessons integer NOT NULL DEFAULT 0
);

CREATE TABLE public.enrollments (
  user_id uuid NOT NULL REFERENCES auth.users(id),
  course_id text NOT NULL REFERENCES public.courses(id),
  status text NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'completed', 'withdrawn')),
  completed_at timestamptz,
  PRIMARY KEY (user_id, course_id)
);

CREATE TABLE public.lesson_progress (
  user_id uuid NOT NULL REFERENCES auth.users(id),
  course_id text NOT NULL REFERENCES public.courses(id),
  lesson_key text NOT NULL,
  completed_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, course_id, lesson_key)
);

INSERT INTO auth.users (id, email_confirmed_at, phone_confirmed_at) VALUES
  ('00000000-0000-0000-0000-000000000001', NULL, NULL),
  ('00000000-0000-0000-0000-000000000002', '2026-01-01T00:00:00Z', NULL),
  ('00000000-0000-0000-0000-000000000003', NULL, NULL);

INSERT INTO public.courses (id, title, description, total_lessons) VALUES
  ('kurmanji-course-1', 'Kurmanji course 1', '', 26),
  ('kurmanji-course-2', 'Kurmanji course 2', '', 12),
  ('phonetics-phonology-kurdik', 'Phonetics', '', 32),
  ('orthography-kurdik', 'Orthography', '', 42);

CREATE OR REPLACE FUNCTION public.is_site_owner()
RETURNS boolean
LANGUAGE sql
STABLE
SET search_path TO ''
AS $function$
  SELECT auth.uid() = '00000000-0000-0000-0000-000000000001'::uuid;
$function$;
