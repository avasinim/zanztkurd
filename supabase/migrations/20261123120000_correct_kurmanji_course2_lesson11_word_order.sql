-- Forward-only correction for Course 2, Lesson 11.
-- Preserve the first three sections and source list; replace only the inaccurate section 4, method note, and review questions.
-- The historical migration is intentionally left unchanged.
DO $migration$
DECLARE
  affected integer;
BEGIN
  UPDATE public.lesson_content
  SET content_html = replace(content_html, $old$<section class="klesson-card"><h2>٤. نمونەی ڕستە و ڕیزبەندیی بنەڕەتی</h2><p>Haig (2018)، لە §2.7.1، ڕیزبەندیی بێ‌نیشانەی ڕستەی ئاسایی بە شێوەی بکەر–بەرکار–کردار (SOV) دەناسێنێت و نمونەی <code>Wî mirov-î çay anî</code> دەهێنێتەوە: «ئەو پیاوە چای هێنا». لەم نمونەیەدا <code>Wî mirov-î</code> بکەرە، <code>çay</code> بەرکارە و <code>anî</code> کردارە؛ بۆیە کردار لە کۆتایی دێت.</p><p>بەڵام سەرچاوە جەخت دەکاتەوە کە ڕیزبەندیی وشەکان بە تەواوی جێگیر نیە: بەرکار دەتوانێت بۆ مەبەستی زانیاریی یان جەختکردن بخرێتە پێشەوە، و شوێنی بەشەکانی ئامانج/وەرگر بە جۆری کردار و شێوەزارەوە پەیوەستە. بۆیە SOV وەک ڕیزبەندیی بنەڕەتی فێر دەکرێت، نەک وەک یاسایەکی بێ‌استثنا.</p></section>
<section class="klesson-card"><h2>تێبینیی مێتۆدی</h2><p class="klesson-note">ڕیزبەندیی بکەر–بەرکار–کردار وەک ڕێڕەوی بنەڕەتی فێر دەکرێت، نەک وەک یاسایەکی بێ‌استثنا. جیاوازییە زمانیەکان و جەخت لەبەرچاو بگرە.</p></section>
<section class="klesson-card"><h2>پرسیارەکانی پێداچوونەوە</h2><ol><li>لە شیکردنەوەی ڕستەدا چ ئەرکەکان دیاری دەکرێن؟</li><li>ئەزافە لە پێکهاتەی ناوی‌دا چ ڕۆڵێک هەیە؟</li><li>بۆچی ڕیزبەندیی وشەکان هەمیشە بێ‌استثنا نیە؟</li></ol></section>$old$, $new$<section class="klesson-card"><h2>٤. ڕیزبەندیی وشەکان و نموونەی ڕستە</h2><p>لە کورمانجی‌دا ڕیزبەندیی بێ‌نیشانەی ڕستەی ئاسایی بە شێوەی <strong>بکەر–بەرکار–کردار–ئامانج (SOVG)</strong> دەخرێتەڕوو. پیتی G کورتکراوەی <em>Goal</em> ـە و بۆ ئەو بەشەی ڕستە بەکاردێت کە ئامانج، وەرگر یان ئەو کەسە دیاری دەکات کە قسە بۆی دەکرێت. هەموو ڕستەیەک پێویستی بە بەشی G نییە. ڕیزبەندیی وشەکانیش بە تەواوی جێگیر نییە؛ بۆ مەبەستی زانیاری یان جەخت، بەرکار دەتوانێت بگوازرێتەوە بۆ پێشەوە.</p><p>نموونەی <code>Wî mirov-î çay anî</code> بە واتای «ئەو پیاوە چای هێنا» لە Haig (2018)، §2.7.2، نموونەی (32) ـە. ئەم نموونەیە ڕیزبەندیی SOVی ئاسایی ناساندن ناکات؛ بەڵکو ڕستەیەکی تێپەڕی ڕابردوو پیشان دەدات کە تێیدا بکەر بە حاڵەتی ناڕاستەوخۆ (Oblique) هاتووە و بەرکار بە حاڵەتی ڕاستەوخۆ (Direct) ـە. لەو پێکهاتەیەدا کردار لەگەڵ بەرکار ڕێکدەکەوێت. بۆیە دەبێت ئەم نموونەیە وەک نموونەی هاوتەریبەندیی ئەرگاتیڤ لە ڕستەی تێپەڕی ڕابردوودا بخوێندرێتەوە، نەک وەک بەڵگەی §2.7.1 بۆ ڕیزبەندیی بنەڕەتی.</p></section>
<section class="klesson-card"><h2>تێبینیی مێتۆدی</h2><p class="klesson-note">SOVG ڕیزبەندیی بێ‌نیشانەیە، نەک یاسایەکی بێ‌استثنا. نموونەی <code>Wî mirov-î çay anî</code> نموونەی (32)ی §2.7.2 ـە و بۆ ڕستەی تێپەڕی ڕابردووی ئەرگاتیڤ بەکاردێت.</p></section>
<section class="klesson-card"><h2>پرسیارەکانی پێداچوونەوە</h2><ol><li>لە SOVGدا پیتی G چی دەگەیەنێت؟</li><li>بۆچی نابێت نموونەی <code>Wî mirov-î çay anî</code> وەک بەڵگەی §2.7.1 بۆ ڕیزبەندیی بنەڕەتی بەکاربهێنین؟</li><li>لە ڕستە تێپەڕەکانی ڕابردووی ئەرگاتیڤدا، حاڵەتی بکەر و بەرکار چۆن جیاوازن؟</li></ol></section>$new$),
      updated_at = now()
  WHERE lesson_key = 'kurmanji-course-2-lesson-11.html'
    AND course_id = 'kurmanji-course-2'
    AND content_html LIKE '%Haig (2018)، لە §2.7.1%'
    AND position($old$<section class="klesson-card"><h2>٤. نمونەی ڕستە و ڕیزبەندیی بنەڕەتی</h2><p>Haig (2018)، لە §2.7.1، ڕیزبەندیی بێ‌نیشانەی ڕستەی ئاسایی بە شێوەی بکەر–بەرکار–کردار (SOV) دەناسێنێت و نمونەی <code>Wî mirov-î çay anî</code> دەهێنێتەوە: «ئەو پیاوە چای هێنا». لەم نمونەیەدا <code>Wî mirov-î</code> بکەرە، <code>çay</code> بەرکارە و <code>anî</code> کردارە؛ بۆیە کردار لە کۆتایی دێت.</p><p>بەڵام سەرچاوە جەخت دەکاتەوە کە ڕیزبەندیی وشەکان بە تەواوی جێگیر نیە: بەرکار دەتوانێت بۆ مەبەستی زانیاریی یان جەختکردن بخرێتە پێشەوە، و شوێنی بەشەکانی ئامانج/وەرگر بە جۆری کردار و شێوەزارەوە پەیوەستە. بۆیە SOV وەک ڕیزبەندیی بنەڕەتی فێر دەکرێت، نەک وەک یاسایەکی بێ‌استثنا.</p></section>
<section class="klesson-card"><h2>تێبینیی مێتۆدی</h2><p class="klesson-note">ڕیزبەندیی بکەر–بەرکار–کردار وەک ڕێڕەوی بنەڕەتی فێر دەکرێت، نەک وەک یاسایەکی بێ‌استثنا. جیاوازییە زمانیەکان و جەخت لەبەرچاو بگرە.</p></section>
<section class="klesson-card"><h2>پرسیارەکانی پێداچوونەوە</h2><ol><li>لە شیکردنەوەی ڕستەدا چ ئەرکەکان دیاری دەکرێن؟</li><li>ئەزافە لە پێکهاتەی ناوی‌دا چ ڕۆڵێک هەیە؟</li><li>بۆچی ڕیزبەندیی وشەکان هەمیشە بێ‌استثنا نیە؟</li></ol></section>$old$ in content_html) > 0;
  GET DIAGNOSTICS affected = ROW_COUNT;
  IF affected <> 1 THEN
    RAISE EXCEPTION 'Expected exactly one outdated Course 2 Lesson 11 row with the exact old block; updated % rows', affected;
  END IF;
END
$migration$;
