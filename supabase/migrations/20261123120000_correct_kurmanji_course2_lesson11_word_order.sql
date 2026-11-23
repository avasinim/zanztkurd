-- Forward-only correction for Course 2, Lesson 11.
-- The historical migration is intentionally left unchanged.
DO $migration$
DECLARE
  affected integer;
BEGIN
  UPDATE public.lesson_content
  SET content_html = $lesson$
<section class="klesson-card"><h2>٤. ڕیزبەندیی وشەکان و نموونەی ڕستە</h2><p>لە کورمانجی‌دا ڕیزبەندیی بێ‌نیشانەی ڕستەی ئاسایی بە شێوەی <strong>بکەر–بەرکار–کردار–ئامانج (SOVG)</strong> دەخرێتەڕوو. پیتی G کورتکراوەی <em>Goal</em> ـە و بۆ ئەو بەشەی ڕستە بەکاردێت کە ئامانج، وەرگر یان ئەو کەسە دیاری دەکات کە قسە بۆی دەکرێت. هەموو ڕستەیەک پێویستی بە بەشی G نییە. ڕیزبەندیی وشەکانیش بە تەواوی جێگیر نییە؛ بۆ مەبەستی زانیاری یان جەخت، بەرکار دەتوانێت بگوازرێتەوە بۆ پێشەوە.</p><p>نموونەی <code>Wî mirov-î çay anî</code> بە واتای «ئەو پیاوە چای هێنا» لە Haig (2018)، §2.7.2، نموونەی (32) ـە. ئەم نموونەیە ڕیزبەندیی SOVی ئاسایی ناساندن ناکات؛ بەڵکو ڕستەیەکی تێپەڕی ڕابردوو پیشان دەدات کە تێیدا بکەر بە حاڵەتی ناڕاستەوخۆ (Oblique) هاتووە و بەرکار بە حاڵەتی ڕاستەوخۆ (Direct) ـە. لەو پێکهاتەیەدا کردار لەگەڵ بەرکار ڕێکدەکەوێت. بۆیە دەبێت ئەم نموونەیە وەک نموونەی هاوتەریبەندیی ئەرگاتیڤ لە ڕستەی تێپەڕی ڕابردوودا بخوێندرێتەوە، نەک وەک بەڵگەی §2.7.1 بۆ ڕیزبەندیی بنەڕەتی.</p></section>
<section class="klesson-card"><h2>تێبینیی مێتۆدی</h2><p class="klesson-note">SOVG ڕیزبەندیی بێ‌نیشانەیە، نەک یاسایەکی بێ‌استثنا. نموونەی <code>Wî mirov-î çay anî</code> نموونەی (32)ی §2.7.2 ـە و بۆ ڕستەی تێپەڕی ڕابردووی ئەرگاتیڤ بەکاردێت.</p></section>
<section class="klesson-card"><h2>پرسیارەکانی پێداچوونەوە</h2><ol><li>لە SOVGدا پیتی G چی دەگەیەنێت؟</li><li>بۆچی نابێت نموونەی <code>Wî mirov-î çay anî</code> وەک بەڵگەی §2.7.1 بۆ ڕیزبەندیی بنەڕەتی بەکاربهێنین؟</li><li>لە ڕستە تێپەڕەکانی ڕابردووی ئەرگاتیڤدا، حاڵەتی بکەر و بەرکار چۆن جیاوازن؟</li></ol></section>
$lesson$,
      updated_at = now()
  WHERE lesson_key = 'kurmanji-course-2-lesson-11.html'
    AND course_id = 'kurmanji-course-2'
    AND content_html LIKE '%Haig (2018)، لە §2.7.1%';
  GET DIAGNOSTICS affected = ROW_COUNT;
  IF affected <> 1 THEN
    RAISE EXCEPTION 'Expected exactly one outdated Course 2 Lesson 11 row; updated % rows', affected;
  END IF;
END
$migration$;
