-- Standardize Sorani spellings in Kurmanji Course 2 prose.
-- Only the eight rows whose pre-change MD5s were audited are eligible.
do $$
declare changed integer;
begin
 update public.lesson_content l
 set content_html = replace(replace(replace(l.content_html,'هەمو ','هەموو '),'نیە','نییە'),'نمون','نموون')
 from (values ('kurmanji-course-2-lesson-01.html','0c3ffaf11732a931106a4149ff76c793'),('kurmanji-course-2-lesson-02.html','ff8af077810a44bae70a012f715f7d38'),('kurmanji-course-2-lesson-06.html','ce1fd7f415f31f647f54b3b1ea110a0a'),('kurmanji-course-2-lesson-08.html','b37e23745675ec676c8c25bb47f47b4e'),('kurmanji-course-2-lesson-09.html','9b49c0e83875a4c7207b2746298f5409'),('kurmanji-course-2-lesson-10.html','567eb2d7be84cbf73408451e33ff3bf3'),('kurmanji-course-2-lesson-11.html','1f24b0f364aa9262f6455663acab3f7e'),('kurmanji-course-2-lesson-12.html','3764e7ceb38973f1c5ac6667fbcdeb5c')) as expected(lesson_key, old_md5)
 where l.course_id='kurmanji-course-2'
   and l.lesson_key=expected.lesson_key
   and md5(l.content_html)=expected.old_md5
   and (position('هەمو ' in l.content_html)>0 or position('نیە' in l.content_html)>0 or position('نمون' in l.content_html)>0);
 get diagnostics changed = row_count;
 if changed <> 8 then
   raise exception 'Expected exactly 8 audited Course 2 lessons; updated %', changed;
 end if;
end $$;
