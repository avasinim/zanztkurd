-- Least-privilege grants for the Kurmanji test environment only.
-- Public visitors may read the course catalog, but not student data or lesson content.
REVOKE ALL PRIVILEGES ON TABLE public.profiles, public.enrollments, public.lesson_progress, public.lesson_content, public.site_owners FROM anon;
REVOKE ALL PRIVILEGES ON TABLE public.courses FROM anon;
GRANT SELECT ON TABLE public.courses TO anon;
