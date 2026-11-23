-- Standardize Lesson 9 aspect terminology and make the Sorani future gloss explicit.
-- Preserve all source-attested Kurmanjî forms exactly.
DO $migration$
DECLARE affected integer;
BEGIN
  UPDATE public.lesson_content
  SET content_html = replace(
      replace(
        replace(content_html, $oldAspect$<p>بۆ جیاکردنەوەی ڕابردووی سادە لە ڕابردووی بەردەوام/ناکامڵ، سەرچاوە ئەم بەراوردەش دەدات: <code>ez hatim</code> (ڕابردووی سادەی ناتێپەڕ) لە بەرابەر <code>ez dihatim</code> (ڕابردووی بەردەوامی ناتێپەڕ)، هەروەها <code>min xwar</code> لە بەرابەر <code>min dixwar</code>.</p>$oldAspect$, $newAspect$<p>لە ڕوانگەی کرداردا (aspect)، سەرچاوە جیاوازی نێوان ڕابردووی سادە و ڕابردووی ناتەواو (imperfective) دەخاتەڕوو: <code>ez hatim</code> ڕابردووی سادەی کرداری ناتێپەڕە، بەرامبەر <code>ez dihatim</code> کە ڕابردووی ناتەواوی هەمان جۆری کردارە؛ هەروەها <code>min xwar</code> ڕابردووی سادەی کرداری تێپەڕە، بەرامبەر <code>min dixwar</code> کە ڕابردووی ناتەواویە. لێرەدا <code>di-</code> نیشانەی ڕوانگەی ناتەواوە؛ ئەمە جیاوازە لە واتای تەنها «لە ئێستادا».</p>$newAspect$),
        $oldFuture$«ئەو کێشەکە بۆ تۆ دەڵێت»$oldFuture$, $newFuture$«ئەو لە داهاتوودا کێشەکە بۆ تۆ دەڵێت»$newFuture$
      ),
      $oldMethod$<p class="klesson-note">ئەم وانەیە پێشەکییە بۆ سیستەمی کات و ڕەوش. خشتەی پارادایمی تەواو پەیویستی بە سەرچاوەی تایبەت و دیاریکردنی شێوەزار هەیە؛ لێرەدا فۆڕمی ناپشکنراو دروست نەکراوە.</p>$oldMethod$, $newMethod$<p class="klesson-note">ئەم وانەیە پێشەکییە بۆ کات و ڕوانگەی کردار. لەم کۆرسەدا «ڕوانگەی کردار» بۆ aspect و «ناتەواو» بۆ imperfective بەکاردێت. خشتەی پارادایمی تەواو پەیویستی بە سەرچاوەی تایبەت و دیاریکردنی شێوەزار هەیە؛ لێرەدا فۆڕمی ناپشکنراو دروست نەکراوە.</p>$newMethod$
    ),
    updated_at = now()
  WHERE lesson_key = 'kurmanji-course-2-lesson-09.html'
    AND course_id = 'kurmanji-course-2'
    AND position($oldAspect$<p>بۆ جیاکردنەوەی ڕابردووی سادە لە ڕابردووی بەردەوام/ناکامڵ، سەرچاوە ئەم بەراوردەش دەدات: <code>ez hatim</code> (ڕابردووی سادەی ناتێپەڕ) لە بەرابەر <code>ez dihatim</code> (ڕابردووی بەردەوامی ناتێپەڕ)، هەروەها <code>min xwar</code> لە بەرابەر <code>min dixwar</code>.</p>$oldAspect$ in content_html) > 0
    AND position($oldFuture$«ئەو کێشەکە بۆ تۆ دەڵێت»$oldFuture$ in content_html) > 0
    AND position($oldMethod$<p class="klesson-note">ئەم وانەیە پێشەکییە بۆ سیستەمی کات و ڕەوش. خشتەی پارادایمی تەواو پەیویستی بە سەرچاوەی تایبەت و دیاریکردنی شێوەزار هەیە؛ لێرەدا فۆڕمی ناپشکنراو دروست نەکراوە.</p>$oldMethod$ in content_html) > 0;
  GET DIAGNOSTICS affected = ROW_COUNT;
  IF affected <> 1 THEN
    RAISE EXCEPTION 'Expected exactly one Course 2 Lesson 9 row with old aspect wording and future gloss; updated % rows', affected;
  END IF;
END
$migration$;
