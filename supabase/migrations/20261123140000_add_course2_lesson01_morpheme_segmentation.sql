-- Add a source-attested worked free/bound morpheme example to Course 2 Lesson 1.
-- Haig (2018), Table 7, p. 115: gund / gund-ek (masculine singular direct/indefinite).
DO $migration$
DECLARE affected integer;
BEGIN
  UPDATE public.lesson_content
  SET content_html = replace(
    replace(
      replace(content_html, $oldExample$<section class="klesson-card"><h2>٣. نمونەی پشکنین</h2><p>بۆ نمونە، لە کورمانجی‌دا پاشگری -ek دەتوانێت لە ناوی تاکدا نادیاری پیشان بدات؛ ئەمە نمونەیەکە لەوەی چۆن مۆرفیمێک کارکردێکی ڕێزمانی هەیە. لە وانەی ٤دا وردتر دەخوێندرێتەوە.</p></section>$oldExample$, $newExample$<section class="klesson-card"><h2>٣. شیکردنەوەی نموونە: مۆرفیمی ئازاد و بەستراو</h2><p>لە خشتەی ٧ی Haig (2018، لاپەڕەی ١١٥)دا، <code>gund</code> بە واتای «گوند» و <code>gund-ek</code> وەک فۆڕمی نێری تاکی نادیار لە حاڵەتی ڕاستەوخۆ هاتووە. شیکردنەوەکەی: <code>gund</code> (ڕەگ و مۆرفیمی ئازاد) + <code>-ek</code> (مۆرفیمی بەستراوی نیشانەی نادیاری) = <code>gund-ek</code> («گوندێک»). <code>gund</code> دەتوانێت وەک وشەیەکی سەربەخۆ بەکاربهێنرێت؛ بەڵام <code>-ek</code> بە تەنیا وشەی سەربەخۆ نییە و دەبێت بە ناوەکەوە ببەسترێت. ئەم نموونەیە جیاوازیی مۆرفیمی ئازاد و بەستراو پیشان دەدات.</p></section>$newExample$),
      $oldQuestions$<section class="klesson-card"><h2>پرسیارەکانی پێداچوونەوە</h2><ol><li>مۆرفۆلۆجی چی دەخوێنێتەوە؟</li><li>جیاوازی وشە و مۆرفیم چیە؟</li><li>بۆچی نابێت هەر بەشێکی دەنگی وشە بە مۆرفیم دابنرێت؟</li></ol></section>$oldQuestions$, $newQuestions$<section class="klesson-card"><h2>پرسیارەکانی پێداچوونەوە</h2><ol><li>مۆرفۆلۆجی چی دەخوێنێتەوە؟</li><li>جیاوازی وشە و مۆرفیم چیە؟</li><li>لە <code>gund-ek</code>دا کام بەش مۆرفیمی ئازادە و کام بەش مۆرفیمی بەستراوە؟</li><li>بۆچی نابێت هەر بەشێکی دەنگی وشە بە مۆرفیم دابنرێت؟</li></ol></section><section class="klesson-card"><h2>وەڵامی نموونەیی</h2><p>لە <code>gund-ek</code>دا، <code>gund</code> ڕەگ و مۆرفیمی ئازادە؛ <code>-ek</code> مۆرفیمی بەستراوی نیشانەی نادیارییە. بۆیە <code>gund</code> دەتوانێت بە تەنیا وشە بێت، بەڵام <code>-ek</code> بە تەنیا بەکارناهێنرێت.</p></section>$newQuestions$
    ),
    $oldSource$<li>Haig, Geoffrey. (2018). “Northern Kurdish (Kurmanjî).” In Geoffrey Haig & Geoffrey Khan (eds.), <em>The Languages and Linguistics of Western Asia: An Areal Perspective</em>, pp. 106–158. Berlin: De Gruyter Mouton. <a href="https://doi.org/10.1515/9783110421682-004" target="_blank" rel="noopener">DOI: 10.1515/9783110421682-004</a>.</li>$oldSource$, $newSource$<li>Haig, Geoffrey. (2018). “Northern Kurdish (Kurmanjî).” In Geoffrey Haig & Geoffrey Khan (eds.), <em>The Languages and Linguistics of Western Asia: An Areal Perspective</em>, pp. 106–158. Berlin: De Gruyter Mouton. Table 7, p. 115 (case and indefiniteness in Standard Kurmanjî). <a href="https://doi.org/10.1515/9783110421682-004" target="_blank" rel="noopener">DOI: 10.1515/9783110421682-004</a>.</li>$newSource$
  ),
  updated_at = now()
  WHERE lesson_key = 'kurmanji-course-2-lesson-01.html'
    AND course_id = 'kurmanji-course-2'
    AND position($oldExample$<section class="klesson-card"><h2>٣. نمونەی پشکنین</h2><p>بۆ نمونە، لە کورمانجی‌دا پاشگری -ek دەتوانێت لە ناوی تاکدا نادیاری پیشان بدات؛ ئەمە نمونەیەکە لەوەی چۆن مۆرفیمێک کارکردێکی ڕێزمانی هەیە. لە وانەی ٤دا وردتر دەخوێندرێتەوە.</p></section>$oldExample$ in content_html) > 0
    AND position($oldQuestions$<section class="klesson-card"><h2>پرسیارەکانی پێداچوونەوە</h2><ol><li>مۆرفۆلۆجی چی دەخوێنێتەوە؟</li><li>جیاوازی وشە و مۆرفیم چیە؟</li><li>بۆچی نابێت هەر بەشێکی دەنگی وشە بە مۆرفیم دابنرێت؟</li></ol></section>$oldQuestions$ in content_html) > 0
    AND position($oldSource$<li>Haig, Geoffrey. (2018). “Northern Kurdish (Kurmanjî).” In Geoffrey Haig & Geoffrey Khan (eds.), <em>The Languages and Linguistics of Western Asia: An Areal Perspective</em>, pp. 106–158. Berlin: De Gruyter Mouton. <a href="https://doi.org/10.1515/9783110421682-004" target="_blank" rel="noopener">DOI: 10.1515/9783110421682-004</a>.</li>$oldSource$ in content_html) > 0;
  GET DIAGNOSTICS affected = ROW_COUNT;
  IF affected <> 1 THEN
    RAISE EXCEPTION 'Expected exactly one Course 2 Lesson 1 row with original example, review questions and Haig source; updated % rows', affected;
  END IF;
END
$migration$;
