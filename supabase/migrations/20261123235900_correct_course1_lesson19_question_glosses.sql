-- Correct two Sorani glosses in Kurmanji Course 1, Lesson 19.
-- Guarded by the exact pre-change content hash to prevent overwriting newer edits.
do $$
declare
  changed integer;
begin
  update public.lesson_content
  set content_html = replace(
      replace(content_html, 'Tu çi dixwazî? — تۆ چی دەوێت؟', 'Tu çi dixwazî? — تۆ چی دەتەوێت؟'),
      'ناوی تۆ چیە؟', 'ناوی تۆ چییە؟'
  )
  where course_id = 'kurmanji-course-1'
    and lesson_key = 'kurmanji-course-1-lesson-19.html'
    and md5(content_html) = 'c0e5c1769d0a5e802f41e4482c6348c2'
    and position('Tu çi dixwazî? — تۆ چی دەوێت؟' in content_html) > 0
    and position('ناوی تۆ چیە؟' in content_html) > 0;

  get diagnostics changed = row_count;
  if changed <> 1 then
    raise exception 'Expected exactly one guarded Course 1 Lesson 19 row; updated %', changed;
  end if;
end $$;
