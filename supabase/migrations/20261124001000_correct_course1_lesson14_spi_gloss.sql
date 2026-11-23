-- Correct the Sorani gloss for Kurmanji spî in Course 1 Lesson 14.
-- Guarded by the exact verified pre-change content hash.
do $$
declare
  changed integer;
begin
  update public.lesson_content
  set content_html = replace(content_html, '<td>سپێ</td>', '<td>سپی</td>')
  where course_id = 'kurmanji-course-1'
    and lesson_key = 'kurmanji-course-1-lesson-14.html'
    and md5(content_html) = '7492715cb2d7125eda591d66f5379bca'
    and position('<td>سپێ</td>' in content_html) > 0;
  get diagnostics changed = row_count;
  if changed <> 1 then
    raise exception 'Expected exactly one guarded Course 1 Lesson 14 row; updated %', changed;
  end if;
end $$;
