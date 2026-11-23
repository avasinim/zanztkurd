-- Classify Course 2 Lesson 12 as an unscored final review/self-assessment.
-- This is a forward-only data correction; historical migrations remain unchanged.
DO $migration$
DECLARE affected integer;
BEGIN
  UPDATE public.lesson_content
  SET title = 'پێداچوونەوەی کۆتایی و خۆهەڵسەنگاندن',
      content_html = replace(
        content_html,
        $old$ئەم پێداچوونەوەیە تاقیکردنەوەی زانیارییە، نەک جێگرەوەی ڕاهێنانی لەگەڵ دەقی سەرچاوە. هەر نمونەیەکی نوێ پێش بەکارهێنانی فێرکاری دەبێت بە سەرچاوەی ڕێزمانی بەراورد بکرێت.$old$,
        $new$ئەم وانەیە بۆ پێداچوونەوەی کۆتایی و خۆهەڵسەنگاندنە؛ تاقیکردنەوەی فەرمی و نمرەدار نییە. هەر نموونەیەکی نوێ پێش بەکارهێنانی فێرکاری دەبێت بە سەرچاوەی ڕێزمانی بەراورد بکرێت.$new$
      ),
      updated_at = now()
  WHERE lesson_key = 'kurmanji-course-2-lesson-12.html'
    AND course_id = 'kurmanji-course-2'
    AND title = 'پێداچوونەوە و تاقیکردنەوەی کۆتایی'
    AND position($old$ئەم پێداچوونەوەیە تاقیکردنەوەی زانیارییە، نەک جێگرەوەی ڕاهێنانی لەگەڵ دەقی سەرچاوە. هەر نمونەیەکی نوێ پێش بەکارهێنانی فێرکاری دەبێت بە سەرچاوەی ڕێزمانی بەراورد بکرێت.$old$ in content_html) > 0;
  GET DIAGNOSTICS affected = ROW_COUNT;
  IF affected <> 1 THEN
    RAISE EXCEPTION 'Expected exactly one Course 2 Lesson 12 row with the old title and note; updated % rows', affected;
  END IF;
END
$migration$;
