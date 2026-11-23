-- Narrow Course 2 Lesson 6 to the material actually taught.
-- Historical migrations are intentionally unchanged.
DO $migration$
DECLARE affected integer;
BEGIN
  UPDATE public.lesson_content
  SET title = 'ئەزافەی خاوەنداری و جێناوی خۆگەڕ (xwe)',
      content_html = replace(content_html, $old$<section class="klesson-card"><h2>٢. جێناوی خاوەنداری</h2><p>جێناوە خاوەندارییەکان لە سیاقە جیاوازەکاندا بەکاردێن و فۆڕمیان بە پێی کەس و ژمارە دەگۆڕێت. پەیویستە جێناوی کەسیی سەربەخۆ لە فۆڕمی خاوەنداری و لە جێناوی ناو ڕستە جیا بکرێتەوە.</p></section>$old$, $new$<section class="klesson-card"><h2>٢. سنووری بابەتی جێناوی خاوەنداری</h2><p>ئەم وانەیە فۆڕمی تەواوی جێناوە خاوەندارییەکان بە پێی کەس و ژمارە ڕیز ناکات؛ بەڵکو دوو پێکهاتەی دیاریکراو دەخاتەڕوو: خاوەنداری بە ئەزافە لە نموونەی <em>mal-a me</em> و جێناوی خۆگەڕی <em>xwe</em>. بۆیە ئەم وانەیە وەک خشتەی تەواوی جێناوە خاوەندارییەکان مەخوێنەوە.</p></section>$new$),
      updated_at = now()
  WHERE lesson_key = 'kurmanji-course-2-lesson-06.html'
    AND course_id = 'kurmanji-course-2'
    AND title = 'خاوەنداری و جێناوە خاوەندارییەکان'
    AND position($old$<section class="klesson-card"><h2>٢. جێناوی خاوەنداری</h2><p>جێناوە خاوەندارییەکان لە سیاقە جیاوازەکاندا بەکاردێن و فۆڕمیان بە پێی کەس و ژمارە دەگۆڕێت. پەیویستە جێناوی کەسیی سەربەخۆ لە فۆڕمی خاوەنداری و لە جێناوی ناو ڕستە جیا بکرێتەوە.</p></section>$old$ in content_html) > 0;
  GET DIAGNOSTICS affected = ROW_COUNT;
  IF affected <> 1 THEN
    RAISE EXCEPTION 'Expected exactly one Course 2 Lesson 6 row with old title and scope paragraph; updated % rows', affected;
  END IF;
END
$migration$;
