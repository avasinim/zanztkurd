-- Standardize the Sabir Zhakaw source card across lesson content.
-- The update is intentionally idempotent so it can be applied after the live repair.
begin;

update public.lesson_content
set content_html = replace(
  replace(content_html,
    '<li>پرشەدارێکی زمانەوانی ١</li>',
    '<li><em>پرشەدارێکی زمانەوانی ١</em></li>'),
    '<li>پرشەدارێکی زمانەوانی ٢</li>',
    '<li><em>پرشەدارێکی زمانەوانی ٢</em></li>')
where content_html like '%class="lesson-source-title"%';

update public.lesson_content
set content_html = replace(
  content_html,
  '<p class="lesson-copy-note lesson-source-final">سەرچاوە: سابیر ژاکاو · <em>فۆنێتیک و فۆنۆلۆجی کوردیک</em></p>',
  '<div class="lesson-copy-note lesson-source-final"><div class="lesson-source-title">سەرچاوەی وانە: سابیر ژاکاو · <em>فۆنێتیک و فۆنۆلۆجی کوردیک</em></div><ol class="linguistic-notes"><li><em>پرشەدارێکی زمانەوانی ١</em></li><li><em>پرشەدارێکی زمانەوانی ٢</em></li></ol></div>')
where course_id = 'orthography-kurdik'
  and lesson_key in ('025.html','026.html','027.html','028.html','029.html','030.html','031.html','033.html');

update public.lesson_content
set content_html = replace(
  content_html,
  '<p class="lesson-copy-note"></p>',
  '<div class="lesson-copy-note lesson-source-final"><div class="lesson-source-title">سەرچاوەی وانە: سابیر ژاکاو · <em>فۆنێتیک و فۆنۆلۆجی کوردیک</em></div><ol class="linguistic-notes"><li><em>پرشەدارێکی زمانەوانی ١</em></li><li><em>پرشەدارێکی زمانەوانی ٢</em></li></ol></div>')
where course_id = 'orthography-kurdik'
  and lesson_key = '024.html';

update public.lesson_content
set content_html = content_html ||
  E'\n<div class="lesson-copy-note lesson-source-final"><div class="lesson-source-title">سەرچاوەی وانە: سابیر ژاکاو · <em>فۆنێتیک و فۆنۆلۆجی کوردیک</em></div><ol class="linguistic-notes"><li><em>پرشەدارێکی زمانەوانی ١</em></li><li><em>پرشەدارێکی زمانەوانی ٢</em></li></ol></div>'
where course_id = 'orthography-kurdik'
  and lesson_key = '022.html'
  and content_html not like '%lesson-source-title%';

update public.lesson_content
set content_html = replace(
  content_html,
  '<p class="lesson-source-final">سەرچاوەی وانە: سابیر ژاکاو · <em>فۆنێتیک و فۆنۆلۆجی کوردیک</em></p><div class="linguistic-notes"><div>پرشەدارێکی زمانەوانی ١</div><div>پرشەدارێکی زمانەوانی ٢</div></div>',
  '<div class="lesson-copy-note lesson-source-final"><div class="lesson-source-title">سەرچاوەی وانە: سابیر ژاکاو · <em>فۆنێتیک و فۆنۆلۆجی کوردیک</em></div><ol class="linguistic-notes"><li><em>پرشەدارێکی زمانەوانی ١</em></li><li><em>پرشەدارێکی زمانەوانی ٢</em></li></ol></div>')
where course_id = 'orthography-kurdik'
  and lesson_key = '021.html';

commit;
