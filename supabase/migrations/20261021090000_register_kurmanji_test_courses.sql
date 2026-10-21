-- TEST BRANCH ONLY: register the two Kurmanji courses shown by dashboard.html.
-- Apply only to the Supabase project assigned to branch kurmanji-test-config.
-- Do not cherry-pick or merge this migration into production without a separate review.

insert into public.courses (id, title, description, total_lessons)
values
  (
    'orthography-kurdik',
    'کۆرسی زانستی و ئەکادێمیکی ڕێنوسی زوانی کوردیک',
    'دەورەی ١؛ ئەلفبێ، پیت، نوسین و سیستەمی ڕێنوسی زوانی کوردیک.',
    26
  ),
  (
    'phonetics-phonology-kurdik',
    'کۆرسی ئەکادێمیک و زانستی فۆنێتیک و فۆنۆلۆجی زوانی کوردیک',
    'دەورەی ٢؛ فۆنێتیک، فۆنۆلۆجی، ئەکوستیک، درک و توێژینەوە.',
    32
  ),
  (
    'kurmanji-course-1',
    'کۆرسی ١ — ڕێنووسی سەرەتاییی کورمانجی',
    'کۆرسی سەرەتایی بۆ فێربونی ڕێنووس و سیستەمی نوسینی کورمانجی.',
    26
  ),
  (
    'kurmanji-course-2',
    'کۆرسی ٢ — مۆرفۆلۆجی و ڕێزمانی کورمانجی',
    'کۆرسی مۆرفۆلۆجی و ڕێزمانی کورمانجی.',
    12
  )
on conflict (id) do update
set title = excluded.title,
    description = excluded.description,
    total_lessons = excluded.total_lessons;
