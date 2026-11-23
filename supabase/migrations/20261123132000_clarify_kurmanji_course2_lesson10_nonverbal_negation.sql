-- Clarify Course 2 Lesson 10 as negation of non-verbal predicates.
-- Preserve all other Lesson 10 sections and the historical migration.
DO $migration$
DECLARE affected integer;
BEGIN
  UPDATE public.lesson_content
  SET content_html = replace(content_html, $old$<section class="klesson-card"><h2>٢. نەفیی ڕستەی ناوەکی</h2><p>نەفیی ڕستەی ناوەکی و نەفیی کردار هەمیشە بە هەمان فۆڕم دروست نابن. فۆڕمی نەفی دەبێت بە پێی جۆری پێکهاتە و کردار بپشکنرێت.</p></section>$old$, $new$<section class="klesson-card"><h2>٢. نەفیی پێکهاتەی ناوەکرداری</h2><p>نەفیی پێکهاتەی ناوەکرداری (non-verbal predicate) لەگەڵ نەفیی کردار جیاوازە. Haig (2018)، لە باسکردنی پێکهاتە ناوەکردارییەکان، تێبینی دەکات کە لە نموونەی نەفی‌کراودا نیشانەی ئەزافە بە نیشانەی نەفییەوە پەیوەست دەبێت. نموونەی سەرچاوە: <code>az nî birçî ma</code> (نێر) و <code>az nê birçî ma</code> (مێ)، بە واتای «من برسی نیم». فۆڕمە لاتینییەکان بە هەمان نووسینی سەرچاوە پارێزراون؛ ئەمانە وەک دوو نموونەی دیاریکراوی سەرچاوە بخوێنەوە، نەک وەک یاسای بێ‌استثنا بۆ هەموو شێوەزارەکان.</p></section>$new$),
      updated_at = now()
  WHERE lesson_key = 'kurmanji-course-2-lesson-10.html'
    AND course_id = 'kurmanji-course-2'
    AND position($old$<section class="klesson-card"><h2>٢. نەفیی ڕستەی ناوەکی</h2><p>نەفیی ڕستەی ناوەکی و نەفیی کردار هەمیشە بە هەمان فۆڕم دروست نابن. فۆڕمی نەفی دەبێت بە پێی جۆری پێکهاتە و کردار بپشکنرێت.</p></section>$old$ in content_html) > 0;
  GET DIAGNOSTICS affected = ROW_COUNT;
  IF affected <> 1 THEN
    RAISE EXCEPTION 'Expected exactly one Course 2 Lesson 10 row with the ambiguous non-verbal-negation block; updated % rows', affected;
  END IF;
END
$migration$;
