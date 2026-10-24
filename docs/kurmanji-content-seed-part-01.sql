-- DRAFT DATA SEED — Course 1 lessons 01–08 only; not a production migration.
-- Exact HTML lesson-card sections extracted from the current static lesson pages.
-- Keep static pages unchanged until the complete 38-row seed and RPC changes are reviewed.
BEGIN;
INSERT INTO public.lesson_content (lesson_key, course_id, title, content_html, updated_at)
VALUES
  ('kurmanji-course-1-lesson-01.html','kurmanji-course-1','ناسینی کورمانجی و چوارچێوەی ڕێنووسی لاتینی','<section class="klesson-card"><h2>١. کورمانجی چیە؟</h2><p>کورمانجی (Kurmancî) یەکێکە لە شێوە و ڕێڕەوە زمانیە سەرەکییەکانی کوردی. لە زۆرێک لە بەکارهێنانە نوسراوە هاوچەرخەکاندا، کورمانجی بە ئەلفبێی لاتینیی هاوار دەنووسرێت. ئەم وانەیە ئەم سیستەمەی نوسین دەکاتە بابەتی سەرەکی؛ بەڵام نابێت ئەلفبێی نوسین لە خودی زمان یان لە هەمو تایبەتمەندییە دەنگییەکانی جیاوازییە زمانیەکان یەکسان بگیرێت.</p></section>
<section class="klesson-card"><h2>٢. جیاوازیی زمان، ئەلفبێ و ڕێنووس</h2><ul><li><strong>زمان:</strong> سیستەمی گشتیی پەیوەندی و ڕێکخستنی زمانیە.</li><li><strong>ئەلفبێ:</strong> کۆمەڵە نیشانەی نوسینە کە بۆ نوسینی زمان بەکاردێن.</li><li><strong>ڕێنووس:</strong> ڕێساکانی نوسینی وشە و بەکارهێنانی نیشانەکانی نوسینە.</li></ul><p>لە فێربونی کورمانجی‌دا، ناسینی پیتەکان پێشەنگییەکی گرنگە؛ بەڵام تەنیا زانینی ناوی پیتەکان بەس نیە. فێرخواز دەبێت فۆڕمی نووسراو، خوێندنەوەی باو و شوێنی پیتەکان لە وشەدا بە یەکەوە فێرببێت.</p></section>
<section class="klesson-card"><h2>٣. سنووری ڕێڕەوی ئەم کۆرسە</h2><p>کۆرسی یەکەم لە ٢٦ وانەدا لە ناساندنی سیستەمی نوسینەوە دەگاتە خوێندنەوە و نوسینی وشە و ڕستەی سادە. بابەتەکانی مۆرفۆلۆجی و ڕێزمان بە شێوەیەکی ڕێک‌خراوتر لە کۆرسی دووەمدا دەخوێندرێنەوە.</p><div class="klesson-note">تێبینیی زانستی: کورمانجی لە ناوچە و کۆمەڵگە جیاوازەکاندا هەندێک جیاوازیی دەربڕین و بەکارهێنانی هەیە. لە وانەکانی داهاتوودا نمونەکان بە پشت‌بەستن بە سەرچاوەی دیاریکراو دەخرێنەڕوو؛ نابێت شێوەیەکی تایبەت بە هەمو بەکارهێنانەکان بگشتێندرێت.</div></section>
<section class="klesson-card"><h2>٤. پێداچوونەوە</h2><ol><li>جیاوازی نێوان ئەلفبێ و ڕێنووس چیە؟</li><li>بۆچی پەیویستە سیستەمی نوسین لە خودی زمان جیا بکرێتەوە؟</li><li>ئەم کۆرسە چی دەگرێتەوە و بابەتە وردترەکانی ڕێزمان لە کوێ دەخوێندرێنەوە؟</li></ol></section>
<section class="klesson-card"><h2>٥. چوار یەکی جیاواز: زمان، ئەلفبێ، ڕێنووس و شێوەزار</h2>
<p>بۆ خوێندنەوەی زانستیی کورمانجی، ئەم چەمکانە دەبێت لە یەکدی جیا بکرێنەوە:</p>
<ul>
<li><strong>زمان و شێوەی زمانی:</strong> کورمانجی بە شێوەیەکی گشتی وەک یەکێک لە ڕێڕەوە سەرەکییەکانی کوردی باس دەکرێت؛ بەڵام لە ناوچە و کۆمەڵگە جیاوازەکاندا تایبەتمەندیی دەنگی، وشەسازی و بەکارهێنان هەیە.</li>
<li><strong>ئەلفبێ:</strong> کۆمەڵە پیت و نیشانەیەکە کە بۆ نوسین بەکاردێت. ئەلفبێی لاتینیی هاوار ڕێکخستنێکی باوی نووسینی کورمانجییە.</li>
<li><strong>ڕێنووس:</strong> ڕێسای هەڵبژاردن و ڕیزکردنی پیتەکان لە وشەی نووسراودا؛ بۆیە نیشانەیەکی وەک <em>ç</em> نابێت بە بێ پشکنین لە <em>c</em> بگۆڕدرێت.</li>
<li><strong>دەنگ و دەنگناسی:</strong> دەنگەکان پەیوەندییان بە شێوەی دەربڕین و جیاوازییە دەنگییەکانەوە هەیە. پیت و دەنگ پەیوەستن، بەڵام یەک چەمک نین.</li>
</ul>
<p class="klesson-note">بەڵگەی زمان‌ناسی: Haig (2018) ڕێنووسی نووسراوی باوی کورمانجی لەگەڵ جیاوازیی ناوچەیی باس دەکات. بۆیە لەم کۆرسەدا ڕێنووسی ستانداردی بەکارهاتوو دەناسێنین، بەڵام جیاوازییە زمانییەکان بە هەڵە وەک «هەڵەی ڕێنووس» ناناسێنین، مەگەر سەرچاوەی دیاریکراو پشتگیری بکات.</p>
</section>
<section class="klesson-card"><h2>٦. چۆنیەتی خوێندنەوەی نمونە</h2>
<p>نمونەی <em>Kurmancî</em> ناوی ئەم شێوە زمانییە بە شێوەی نووسینی لاتینی پیشان دەدات؛ <em>Kurdî</em> فۆڕمی نووسینی وشەی «کوردی»یە. لە وشەکانی <em>çav</em> («چاو») و <em>şev</em> («شەو»)دا، پیتی نیشانەدارەکانی <em>ç</em> و <em>ş</em> بەشێکن لە ڕێنووسی وشەکە، نەک ڕازاندنەوەی تایپۆگرافی.</p>
<p>کاتی شیکردنەوەی هەر نمونەیەک، ئەم زانیارییانە تۆمار بکە: فۆڕمی نووسراو، واتا، جۆری پیتە گرنگەکان، سەرچاوەی نمونەکە، و ئەوەی نمونەکە بۆ ڕێنووسی ستانداردە یان بۆ شێوەزارێکی دیاریکراوە.</p>
<table class="klesson-table"><thead><tr><th>نمونە</th><th>تێبینیی ڕێنووسی</th><th>مەبەستی فێربون</th></tr></thead><tbody>
<tr><td><em>Kurmancî</em></td><td>پیتی <em>î</em> لە کۆتایی ناوەکەدا هەیە</td><td>پاراستنی نیشانەی پیت</td></tr>
<tr><td><em>Kurdî</em></td><td><em>î</em> لە کۆتایی وشەکەدا هەیە</td><td>جیاکردنەوەی فۆڕمی نووسراو لە شێوەی نیشانەبێ</td></tr>
<tr><td><em>çav</em></td><td><em>ç</em> پیتێکی سەربەخۆی ئەلفبێیە</td><td>تێبینیی جیاوازیی <em>c</em> و <em>ç</em></td></tr>
<tr><td><em>şev</em></td><td><em>ş</em> پیتێکی سەربەخۆی ئەلفبێیە</td><td>تێبینیی جیاوازیی <em>s</em> و <em>ş</em></td></tr>
</tbody></table>
<p class="klesson-note">ئەم نمونانە بۆ ڕاهێنانی سەرەتاییی ڕێنووسن. لە وانەکانی دواتردا سیستەمی ڤاوڵ، کۆنسۆنانت و پەیوەندیی پیت و دەنگ بە وردیتر دەخوێندرێنەوە؛ لێرەدا لە پێشدا بڕیارێکی دەنگناسیی ورد لەسەر هەر پیتێک نادرێت.</p>
</section>
<section class="klesson-card"><h2>٧. ڕاهێنانی شیکاری</h2>
<ol><li>بە وشەی خۆت جیاوازیی نێوان ئەلفبێ و ڕێنووس ڕوون بکەرەوە.</li><li>لە <em>çav</em> و <em>şev</em>دا کام پیتەکان نابێت لە نووسینی فەرمی بسڕدرێنەوە یان بگۆڕدرێن؟</li><li>ئەگەر لە سەرچاوەیەکدا فۆڕمێکی ناوچەیی ببینیت کە لە ڕێنووسی ستاندارد جیاوازە، پێش ئەوەی بە هەڵە دایبنێیت چ زانیارییەکت پێویستە؟</li><li>بۆ یەک وشە، خشتەیەک دروست بکە کە فۆڕمی نووسراو، واتا، سەرچاوە و تێبینیی شێوەزاری تێدا بێت.</li></ol>
</section>
<section class="klesson-card"><h2>تێبینیی مێتۆدی</h2>
<p>لە وانەیەکی ئەکادێمیکدا، سەرچاوە تەنها لیستی کتێب نیە: دەبێت ڕوون بێت کام بەش یان خشتە پشتگیریی ئەو یاسا یان نمونەیە دەکات. لەو شوێنانەی لاپەڕە یان بەش پشتڕاست نەکراوەتەوە، نابێت ژمارەی لاپەڕە بە خەمڵاندن زیاد بکرێت. هەر زیادکردنێکی داهاتووی نمونەی زمانەوانی دەبێت بە سەرچاوەیەکی دیاریکراو و بە پاراستنی فۆڕمی لاتینیی ڕەسەن بکرێت.</p>
</section>
<section class="klesson-card"><h2>سەرچاوەکان</h2><ol><li>Haig, Geoffrey. (2018). “Northern Kurdish (Kurmanjî).” In Geoffrey Haig & Geoffrey Khan (eds.), <em>The Languages and Linguistics of Western Asia: An Areal Perspective</em>, pp. 106–158. Berlin: De Gruyter Mouton. <a href="https://doi.org/10.1515/9783110421682-004" target="_blank" rel="noopener">DOI: 10.1515/9783110421682-004</a>.</li><li>Thackston, W. M. (2006). <em>Kurmanji Kurdish: A Reference Grammar with Selected Readings</em>. سەرچاوەی ڕێزمان و خوێندنەوەی کورمانجی.</li><li>Haig, Geoffrey &amp; Ergin Öpengin. (2018). “Kurmanjî Kurdish in Turkey: Structure, varieties, and status.” In Christiane Bulut (ed.), <em>Linguistic Minorities in Turkey and Turkic-speaking Minorities of the Peripheries</em>, pp. 157–230. Harrassowitz. <a href="https://fis.uni-bamberg.de/handle/uniba/45103" target="_blank" rel="noopener">زانیاریی کتێبناسی لە زانکۆی بامبێرگ</a>.</li></ol><p class="klesson-note">سەرچاوەکان چوارچێوەی گشتیی زمان، ڕێنووس و جیاوازیی ناوچەیی پشتگیری دەکەن؛ بەڵام پێش بڵاوکردنەوەی کۆتایی، دەبێت هەر نمونەیەکی ورد بە چاپ و بەشی پەیوەندیداری سەرچاوەکەوە بگونجێندرێت. ژمارەی لاپەڕەی نەپشکنراو بە خەمڵاندن زیاد نەکراوە.</p></section>',now()),
  ('kurmanji-course-1-lesson-02.html','kurmanji-course-1','ئەلفبێی هاوار و ٣١ پیتەکەی','<section class="klesson-card"><h2>١. ڕیزبەندی ئەلفبێ</h2><p>لە ڕێنووسی لاتینیی باوی کورمانجی، ئەلفبێکە ٣١ پیت لەخۆ دەگرێت. ئەم ڕیزبەندییە بۆ ناسینەوە و ڕێکخستنی وشەکان گرنگە:</p><div class="klesson-alphabet" aria-label="ئەلفبێی کورمانجی"><span>A</span><span>B</span><span>C</span><span>Ç</span><span>D</span><span>E</span><span>Ê</span><span>F</span><span>G</span><span>H</span><span>I</span><span>Î</span><span>J</span><span>K</span><span>L</span><span>M</span><span>N</span><span>O</span><span>P</span><span>Q</span><span>R</span><span>S</span><span>Ş</span><span>T</span><span>U</span><span>Û</span><span>V</span><span>W</span><span>X</span><span>Y</span><span>Z</span></div><p class="klesson-note">تێبینی: پیتەکانی ئەم ئەلفبێیە بە ڕێنووسی لاتینیی کورمانجی پەیوەستن. نابێت نیشانەی پیتەکان لە نوسینی کوردی بە ئەلفبێی عەرەبی یان لە سیستەمەکانی دیکەدا بە هەمان شێوە لێک بدرێنەوە.</p></section>
<section class="klesson-card"><h2>٢. پیتەکانی نیشانەدار</h2><ul><li><strong>Ç / ç</strong></li><li><strong>Ê / ê</strong></li><li><strong>Î / î</strong></li><li><strong>Ş / ş</strong></li><li><strong>Û / û</strong></li></ul><p>ئەم نیشانانە بەشێکن لە شێوەی نوسینی پیتەکە؛ لە نوسینی فەرمی‌دا نابێت بە پیتی بێ‌نیشانە بگۆڕدرێن، چونکە جیاوازیی ڕێنووسی دەهێننە ئاراوە. پیتەکانی Q، W و Xیش لە ئەلفبێی لاتینیی کورمانجی بەکاردێن.</p></section>
<section class="klesson-card"><h2>٣. پیت و دەنگ یەک شت نین</h2><p>پیت نیشانەی نوسراوە؛ دەنگ ئەو یەکەیە کە لە قسەکردندا دەبیسترێت. پەیوەندیی نێوان پیت و دەنگ بابەتێکی گرنگی فێربونی ڕێنووسە، بەڵام نابێت بە بێ پشکنینی دەنگییەوە وا دابنرێت کە هەر پیتێک لە هەمو وشە و شێوەزارێکدا تەنیا یەک دەنگی هەیە.</p></section>
<section class="klesson-card"><h2>٤. ڕاهێنان</h2><ol><li>ئەلفبێکە بە ڕیزبەندییەوە بخوێنەوە و بنووسە.</li><li>پیتە نیشانەدارەکان لە لیستەکەدا دیاری بکە.</li><li>بۆچی Ç و C، یان Ş و S، لە نوسینی فەرمی‌دا نابێت بە یەک شت دابنرێن؟</li></ol></section>
<section class="klesson-card"><h2>٥. پۆلێنکردنی پیتەکان: ڤاوڵ و کۆنسۆنانت</h2>
<p>لە ئەلفبێی لاتینیی کورمانجی، ٣١ پیت هەیە. لە پۆلێنکردنی سەرەتاییدا، ٨ پیت بە ڤاوڵ دادەنرێن: <em>A, E, Ê, I, Î, O, U, Û</em>؛ ٢٣ پیتەکەی دیکە کۆنسۆنانتن. ئەم پۆلێنکردنە بۆ فێربونی سیستەمی دەنگی گرنگە، بەڵام خۆی بە تەنیا هەمو تایبەتمەندیی دەنگیی وشەکان ڕوون ناکاتەوە.</p>
<table class="klesson-table"><thead><tr><th>گروپ</th><th>پیتەکان</th><th>ئەرکی فێربون</th></tr></thead><tbody>
<tr><td>ڤاوڵ</td><td><em>A E Ê I Î O U Û</em></td><td>ناسینەوەی هەشت پیتی ڤاوڵ و پاراستنی نیشانەکانیان</td></tr>
<tr><td>کۆنسۆنانت</td><td><em>B C Ç D F G H J K L M N P Q R S Ş T V W X Y Z</em></td><td>ناسینەوەی ٢٣ پیتی کۆنسۆنانت و ڕیزبەندییان</td></tr>
</tbody></table>
<p class="klesson-note">ئەمە پۆلێنکردنێکی ئەلفبێییە. بۆ دیاریکردنی شوێنی دەربڕین، شێوەی دەربڕین یان جیاوازیی فۆنێمی، پێویستە بەڵگەی دەنگناسیی تایبەت بە وشە و شێوەزاری دیاریکراو بەکاربهێنرێت.</p>
</section>
<section class="klesson-card"><h2>٦. پیتە نیشانەدارەکان و هەڵەی گۆڕینی نووسین</h2>
<p>لە ئەلفبێی کورمانجی، <em>Ç/ç</em>، <em>Ê/ê</em>، <em>Î/î</em>، <em>Ş/ş</em> و <em>Û/û</em> پیتە جیاوازەکانن. نیشانەی سەر پیت بەشێکە لە فۆڕمی نووسراوەکە؛ نابێت لە کاتی کۆپی‌کردن، گەڕان، نوسینی داتابەیس یان دروستکردنی فهرستدا بەبێ هۆکار بسڕدرێتەوە.</p>
<ul><li><strong>پاراستنی فۆڕم:</strong> فۆڕمی <em>şev</em> بە <em>sev</em> یەکسان نیە لە ڕووی ڕێنووسەوە.</li><li><strong>جیاوازیی پیت:</strong> <em>c</em> و <em>ç</em> نابێت بە یەک پیت دابنرێن؛ هەمان شت بۆ <em>s</em> و <em>ş</em>یش ڕاستە.</li><li><strong>پیتی گەورە و بچووک:</strong> <em>Ç/ç</em> و <em>Ş/ş</em> دوو شێوەی هەمان پیتن، بەڵام ئەمە بە مانای یەکسانبوونیان لەگەڵ <em>C/c</em> و <em>S/s</em> نیە.</li></ul>
<p class="klesson-note">لە سیستەمی دیجیتاڵدا، بۆ بەراوردکردنی دەقی ڕەسەن پێویستە فۆڕمی پیتەکان بپارێزرێت. گەڕانێک کە نیشانەکان لادەبات دەتوانێت بۆ ئاسانکاریی گەڕان بەکاربهێنرێت، بەڵام نابێت دەقی ڕەسەن بگۆڕێت یان جێگای نووسینی دروست بگرێتەوە.</p>
</section>
<section class="klesson-card"><h2>٧. ڕیزبەندی و فهرستکردنی وشە</h2>
<p>ڕیزبەندیی ئەلفبێ تەنها بۆ لەبەرکردنی پیتەکان نیە؛ لە فهرستی وشە، فەرهەنگ، کتێب‌خانە و گەڕانی دیجیتاڵدا بەکاردێت. کاتێک دوو وشە بە پیتە سەرەتاییەکاندا هاوشێوەن، پیتەکانی دواتر لە دیاریکردنی شوێنیاندا گرنگ دەبن. لە هەمان کاتدا، پیتە نیشانەدارەکان دەبێت بەپێی ڕێسای ڕیزبەندیی سیستەمەکە مامەڵەیان لەگەڵ بکرێت، نەک بە خەمڵاندن.</p>
<ol><li>ئەلفبێی ٣١ پیتی لە سەرەتاوە بنووسە و پیتە نیشانەدارەکان بە جیا نیشان بکە.</li><li>لە فهرستێکی خەیاڵیدا وشەکان بە پیتی یەکەم ڕیز بکە؛ دواتر وشە هاوشێوەکان بە پیتی دووەم جیا بکەرەوە.</li><li>ڕوون بکەرەوە بۆچی گۆڕینی <em>ş</em> بۆ <em>s</em> دەتوانێت لە گەڕان یان فهرستکردندا کێشە دروست بکات.</li></ol>
</section>
<section class="klesson-card"><h2>٨. ڕاهێنانی پشکنینی زانستی</h2>
<ol><li>ژمارەی پیتەکانی ئەلفبێ بنووسە و ژمارەی ڤاوڵ و کۆنسۆنانتەکان بە جیا دیاری بکە.</li><li>پیتە نیشانەدارەکان بنووسە و بۆ هەر یەکێک شێوەی گەورە و بچووکی بنووسە.</li><li>بە وشەی خۆت جیاوازیی نێوان پیت و دەنگ ڕوون بکەرەوە.</li><li>بۆچی نابێت لە کاتی ڕێکخستنی دەقی لاتینیی کورمانجی نیشانەکانی پیتەکان بە شێوەی ئۆتۆماتیکی بسڕدرێنەوە؟</li><li>ئەگەر فهرستێک پیتە نیشانەدارەکان لەبەرچاو نەگرێت، چ جۆرە هەڵەیەک لە دۆزینەوەی وشەکاندا ڕوودەدات؟</li></ol>
</section>
<section class="klesson-card"><h2>تێبینیی مێتۆدی</h2>
<p>ژمارەی پیتەکان و ڕیزبەندیی ئەلفبێ بە ئاسانی دەتوانرێت بە لیستی فەرمیی ئەلفبێ بپشکنرێت؛ بەڵام بانگەشەی دەنگناسیی ورد پێویستی بە سەرچاوەی دەنگناسی و نمونەی پشتڕاستکراوە هەیە. لەم وانەیەدا نمونەکان بۆ فێربونی پیت و ڕێنووسن، نەک بۆ دیاریکردنی تەواوی سیستەمی فۆنۆلۆژی.</p>
</section>
<section class="klesson-card"><h2>سەرچاوەکان</h2><ol><li>Haig, Geoffrey. (2018). “Northern Kurdish (Kurmanjî).” In Geoffrey Haig & Geoffrey Khan (eds.), <em>The Languages and Linguistics of Western Asia: An Areal Perspective</em>, pp. 106–158. De Gruyter Mouton. <a href="https://doi.org/10.1515/9783110421682-004" target="_blank" rel="noopener">DOI: 10.1515/9783110421682-004</a>.</li><li>Thackston, W. M. (2006). <em>Kurmanji Kurdish: A Reference Grammar with Selected Readings</em>. Harvard University.</li><li>University of Arizona, Iranian Languages. <a href="https://iranian-languages.arizona.edu/node/7" target="_blank" rel="noopener">Kurmanji Kurdish</a>.</li></ol><p class="klesson-note">سەرچاوەکان بۆ چوارچێوەی گشتیی زمان و ڕێنووس دانراون. بۆ وەشانی کۆتایی، دەبێت هەر نمونەیەکی ورد بە چاپی سەرچاوەی ڕێنووسەکەوە بگونجێندرێت.</p></section>',now()),
  ('kurmanji-course-1-lesson-03.html','kurmanji-course-1','ڤاوڵەکان و نیشانەنووسییان','<section class="klesson-card"><h2>١. هەشت پیتی ڤاوڵ و هاوتاکانیان لە IPA</h2>
<p>لە ڕێنووسی لاتینیی باوی کورمانجی، هەشت پیتی ڤاوڵ بۆ نوێنەرایەتیی هەشت مۆنۆفتۆنگی سەرەکی بەکاردێن. خشتەی خوارەوە فۆڕمی نووسراو، نیشانەی دەنگناسیی نێودەوڵەتی (IPA)، نمونە و واتای ئینگلیزیی سەرچاوەکە نیشان دەدات. IPA وەسفی دەنگە، نەک پیتی ئەلفبێ.</p>
<table class="klesson-table"><thead><tr><th>پیت</th><th>IPA</th><th>نمونە</th><th>واتا</th></tr></thead><tbody>
<tr><td>A a</td><td>/ɑ/</td><td>qaz</td><td>قاز / goose</td></tr>
<tr><td>E e</td><td>/æ/</td><td>belg</td><td>گەڵا / leaf</td></tr>
<tr><td>Ê ê</td><td>/e/</td><td>lêv</td><td>لێو / lip</td></tr>
<tr><td>I i</td><td>/ɪ/</td><td>dil</td><td>دڵ / heart</td></tr>
<tr><td>Î î</td><td>/i/</td><td>hîn</td><td>هێشتا / still</td></tr>
<tr><td>O o</td><td>/o/</td><td>nod</td><td>نەوەد / ninety</td></tr>
<tr><td>U u</td><td>/ʊ/</td><td>qul</td><td>کون / hole</td></tr>
<tr><td>Û û</td><td>/u/</td><td>bûz</td><td>سەهۆڵ / ice</td></tr>
</tbody></table>
<p class="klesson-note">IPA و واتاکانی ئینگلیزی لە خشتەی دەنگناسیی پەڕەی Iranian Languages ـی زانکۆی ئەریزۆنا وەرگیراون. وەرگێڕانی کوردیی واتاکان بۆ یارمەتیی فێرخواز زیاد کراوە؛ ئەگەر لە فەرهەنگ یان شێوەزارێکدا فۆڕمی جیاواز هەبێت، پێویستە بە سەرچاوەی تایبەت پشتڕاست بکرێتەوە.</p></section>
<section class="klesson-card"><h2>٢. نیشانەی پیت بەشێکە لە ڕێنووس</h2>
<p>لە نووسینی کورمانجی، <strong>e</strong> و <strong>ê</strong>، <strong>i</strong> و <strong>î</strong>، هەروەها <strong>u</strong> و <strong>û</strong> پیتە جیاوازن و لە خشتەی دەنگناسیشدا بە IPAی جیاواز نیشان دەدرێن. نیشانەی چەرخەک (circumflex) لە <em>ê, î, û</em> بەشێکە لە فۆڕمی پیتەکە؛ نابێت لە کاتی نووسین، کۆپی‌کردن یان فهرستکردندا بەبێ هۆکار بسڕدرێتەوە.</p>
<p>خشتەی زانکۆی ئەریزۆنا بۆ ئەم هەشت ڤاوڵە بە ڕیزبەندییەکی دیاریکراو IPA بەکاردهێنێت: <em>a /ɑ/، e /æ/، ê /e/، i /ɪ/، î /i/، o /o/، u /ʊ/، û /u/</em>. ئەم نیشانەکانە وەسفی سیستەمی گشتیی ڕێنووس و دەنگن؛ نابێت لەوەوە وا تێبگەین کە وردەکاریی دەربڕین لە هەمو ناوچە و قسەکەرێکدا یەکسانە.</p></section>
<section class="klesson-card"><h2>٣. جیاوازیی شێوەزار و ڕێبازی خوێندنەوە</h2>
<p>پەڕەی زانکۆی ئەریزۆنا تێبینی دەکات کە ڤاوڵی نووسراو بە <em>e</em> کە بە /æ/ نیشان دەدرێت، لە هەندێک شێوەزاردا دەتوانێت هەڵگری دەربڕینی نزیک لە /ə/ یان /ɛ/ بێت؛ بۆ زۆر قسەکەر دەربڕینەکە لە هەمو ژینگەکاندا نزیکترە لە /ɛ/. بۆیە IPA لێرەدا وەسفێکی ڕێنووس-دەنگیی گشتییە، نەک یاسایەکی بێ‌جیاوازی بۆ هەمو شێوەزارەکان.</p>
<p>کاتی فێربون، وشەکە بە نووسینی ڕەسەن بخوێنەوە، پیتی ڤاوڵ دیاری بکە، و تەنیا کاتێک کە سەرچاوەی دەنگی بەردەستە بڕیار لەسەر وردەکاریی دەربڕین بدە. هاوتاکردنەوەی دەنگەکان بە دەنگی ئینگلیزی یان کوردیی ناوەندی تەنیا ڕێنماییەکی نزیکە، نەک جێگرەوەی سەرچاوەی دەنگناسی.</p></section>
<section class="klesson-card"><h2>٤. ڕاهێنانی شیکاری</h2><ol>
<li>هەشت پیتی ڤاوڵ بە پیتی گەورە و بچووک بنووسە.</li>
<li>لە خشتەکەدا e/ê، i/î و u/û بە بەراوردی IPA جیا بکەرەوە.</li>
<li>وشەکانی <em>qaz, belg, lêv, dil, hîn, nod, qul, bûz</em> بخوێنەوە و پیتی ڤاوڵی هەر یەک دیاری بکە.</li>
<li>بۆچی ناتوانین بە تەنیا لەسەر پیتی نووسراو بڕیار بدەین کە دەربڕینی هەمو قسەکەرێک بە تەواوی یەکسانە؟ بە تێبینیی سەرچاوە و جیاوازیی ناوچەیی وەڵام بدەوە.</li>
<li>لە کۆپی‌کردنی وشەکاندا نیشانەکانی <em>ê, î, û</em> بپارێزە و پاشان فۆڕمی نووسراو لەگەڵ سەرچاوەکە بەراورد بکە.</li>
</ol></section>
<section class="klesson-card"><h2>سەرچاوەکان</h2><ol>
<li>University of Arizona, Iranian Languages. <a href="https://iranian-languages.arizona.edu/node/7" target="_blank" rel="noopener">Kurmanji Kurdish — Phonology and Orthography</a> (خشتەی هەشت ڤاوڵ، IPA، نمونە و تێبینیی شێوەزار).</li>
<li>Haig, Geoffrey. (2018). “Northern Kurdish (Kurmanjî).” In Geoffrey Haig &amp; Geoffrey Khan (eds.), <em>The Languages and Linguistics of Western Asia: An Areal Perspective</em>, pp. 106–158. De Gruyter Mouton. <a href="https://doi.org/10.1515/9783110421682-004" target="_blank" rel="noopener">DOI</a>.</li>
<li>Thackston, W. M. (2006). <em>Kurmanji Kurdish: A Reference Grammar with Selected Readings</em>. Harvard University.</li>
</ol><p class="klesson-note">سەرچاوەی زانکۆی ئەریزۆنا بۆ نمونە و IPA بە شێوەی ڕاستەوخۆ پشکنراوە. ئەم وانەیە پێشەکییە بۆ ڤاوڵەکان؛ وردەکاریی فۆنۆلۆژی و جیاوازیی شێوەزارەکان لە پێویستیدا دەبێت لە سەرچاوەی تایبەتیانەوە بخوێندرێنەوە.</p></section>',now()),
('kurmanji-course-1-lesson-04.html','kurmanji-course-1','کۆنسۆنەنتەکان و پەیوەندییان بە نوسینەوە','<section class="klesson-card"><h2>١. کۆنسۆنەنت چیە؟</h2>
<p>کۆنسۆنەنت (consonant) دەنگێکە کە لە دروستبوونیدا هەوا لە ڕێگای دەمداندا بە تەنگەبەر یان بەربەستێک ڕووبەڕوو دەبێتەوە. لە زانستی زماندا دەبێت جیاوازی بکەین لە نێوان <strong>پیت</strong>، کە نیشانەیەکی نووسراوە، و <strong>فونیم</strong>، کە یەکەیەکی دەنگییە و دەتوانێت واتای وشە جیا بکاتەوە. بۆیە خشتەی ئەلفبێ بە تەنیا هەمو جیاوازییە دەنگییەکانی کورمانجی نیشان نادات.</p>
<p>لە ڕێنووسی لاتینیی ستاندارددا ٢٣ پیتی کۆنسۆنەنت هەن؛ بەڵام لە پەڕەی دەنگناسیی زانکۆی ئەریزۆنا تێبینی کراوە کە ژمارە و جۆری جیاوازیی دەنگی بە پێی شێوەزار دەتوانێت بگۆڕێت. بۆ خوێندنەوەی ورد، نیشانەکانی IPA بەکاربهێنە و جیاوازیی ناوچەیی لەبەرچاو بگرە.</p></section>
<section class="klesson-card"><h2>٢. پیتە کۆنسۆنەنتەکان و IPA</h2>
<p>ئەم خشتەیە پەیوەندیی گشتیی نێوان پیت و دەنگی نوێنەرایەتی‌کراویان نیشان دەدات. IPA وەسفی دەنگە؛ نابێت بە پیتی لاتینی تێکەڵ بکرێت.</p>
<table class="klesson-table"><thead><tr><th>پیت</th><th>IPAی گشتی</th><th>تێبینی</th></tr></thead><tbody>
<tr><td>B b</td><td>/b/</td><td>وەستانی دەنگدار</td></tr>
<tr><td>C c</td><td>/d͡ʒ/</td><td>دەنگی تێکەڵەی وەستان و سایش</td></tr>
<tr><td>Ç ç</td><td>/t͡ʃ/</td><td>هاوتای بێ‌دەنگی C لە خشتەی گشتی</td></tr>
<tr><td>D d</td><td>/d/</td><td>وەستانی دەنگدار</td></tr>
<tr><td>F f</td><td>/f/</td><td>سایشدار</td></tr>
<tr><td>G g</td><td>/g/</td><td>وەستانی دەنگدار</td></tr>
<tr><td>H h</td><td>/h/</td><td>سایشدار</td></tr>
<tr><td>J j</td><td>/ʒ/</td><td>وەک دەنگی ناوەڕاستی وشەی ژ لە زۆر وەسفەکاندا</td></tr>
<tr><td>K k</td><td>/k/</td><td>وەستانی بێ‌دەنگ</td></tr>
<tr><td>L l</td><td>/l/</td><td>نزیکەدەنگی لایەنی</td></tr>
<tr><td>M m</td><td>/m/</td><td>لووتی</td></tr>
<tr><td>N n</td><td>/n/</td><td>لووتی</td></tr>
<tr><td>P p</td><td>/p/</td><td>وەستانی بێ‌دەنگ</td></tr>
<tr><td>Q q</td><td>/q/</td><td>وەستانی لووتکەیی</td></tr>
<tr><td>R r</td><td>/ɾ/</td><td>tap/flap؛ لە زۆر وەسفەکاندا</td></tr>
<tr><td>RR rr</td><td>/r/</td><td>trill؛ جیاوازییەکە لە هەمو شێوەزار و شێوەنووسێکدا بە یەک شێوە نانووسرێت</td></tr>
<tr><td>S s</td><td>/s/</td><td>سایشدار</td></tr>
<tr><td>Ş ş</td><td>/ʃ/</td><td>سایشدار؛ جیاوازە لە S</td></tr>
<tr><td>T t</td><td>/t/</td><td>وەستانی بێ‌دەنگ</td></tr>
<tr><td>V v</td><td>/v/</td><td>سایشدار</td></tr>
<tr><td>W w</td><td>/w/</td><td>نزیکەدەنگی لێو-کامی</td></tr>
<tr><td>X x</td><td>/χ/؛ لە هەندێک شێوەزار /ʁ/</td><td>هەردوو دەنگەکە لە ڕێنووسی ستاندارددا بە X نووسراون</td></tr>
<tr><td>Y y</td><td>/j/</td><td>نزیکەدەنگی کامی</td></tr>
<tr><td>Z z</td><td>/z/</td><td>سایشداری دەنگدار</td></tr>
</tbody></table>
<p class="klesson-note">ئەمە خشتەی پێشەکیی پیتەکانە، نەک تۆماری تەواوی وردەکاریی دەنگناسی. سەرچاوەکە جیاوازیی /r/ و /ɾ/، هەروەها جیاوازییەکانی aspirated/unaspirated و دەنگەکانی /χ/ و /ʁ/ بۆ هەندێک شێوەزار باس دەکات.</p></section>
<section class="klesson-card"><h2>٣. پیت و دەنگ هەمیشە یەک‌بەیەک ناگونجێن</h2>
<ul>
<li><strong>C / Ç:</strong> لە خشتەی گشتیی IPAدا C بە /d͡ʒ/ و Ç بە /t͡ʃ/ نوێنەرایەتی دەکرێن؛ نیشانەی چەسپاو لە Ç بەشێکە لە پیتەکە.</li>
<li><strong>S / Ş:</strong> /s/ و /ʃ/ دوو دەنگی جیاوازن؛ لابردنی نیشانەی Ş دەکرێت ڕێنووس و خوێندنەوە بگۆڕێت.</li>
<li><strong>R / RR:</strong> لە وەسفی گشتیی زانکۆی ئەریزۆنا، /ɾ/ دەنگی tap/flap و /r/ دەنگی trill ـە؛ لە هەندێک شێوەی نووسین، RR جیاوازیی trill نیشان دەدات، بەڵام ڕێنووس لە هەمو شوێنێکدا ئەم جیاوازییە بە یەک شێوە نانووسێت.</li>
<li><strong>K, P, T و Ç:</strong> لە هەندێک شێوەزاردا جیاوازیی دەنگی لە نێوان بێ‌هەناسە/کەم‌هەناسە و پڕهەناسە هەیە؛ زۆرجار ڕێنووسی لاتینیی ستاندارد ئەم جیاوازییە بە نیشانەی تایبەت نانووسێت.</li>
<li><strong>X:</strong> لە ڕێنووسی ستاندارددا X پیتی سەربەخۆیە؛ لە سەرچاوەکەدا /χ/ و /ʁ/ هەردووکیان لە هەندێک شێوەزاردا بە X نووسراون، بۆیە نابێت هەمیشە تەنیا یەک دەنگ بۆی دابنرێت.</li>
</ul></section>
<section class="klesson-card"><h2>٤. ڕاهێنانی شیکاری</h2>
<ol>
<li>لە خشتەکەدا پیتەکانی C، Ç، S، Ş و X بدۆزەوە و IPAی هەر یەک بنووسە.</li>
<li>بە دوو ڕستە ڕون بکەرەوە بۆچی پیت و فونیم یەک شت نین.</li>
<li>جیاوازیی /ɾ/ و /r/ دیاری بکە و ڕون بکەرەوە بۆچی نووسینی RR لە هەمو شێوەزارێکدا بە یەک شێوە بەکارناهێنرێت.</li>
<li>بە پشت‌بەستن بە سەرچاوەکە، بڵێ بۆچی ناتوانین لەسەر بنەمای ڕێنووس تەنیا بڕیار بدەین کە جیاوازیی aspirated/unaspirated لە هەمو شێوەزارەکاندا هەیە.</li>
<li>وشەیەک کە Ç یان Şی تێدایە لە سەرچاوەی فێرکارییەکەت هەڵبژێرە و پیتەکە بە نیشانەی ڕەسەنی خۆی بنووسە.</li>
</ol></section>
<section class="klesson-card"><h2>سەرچاوەکان</h2>
<ol>
<li>University of Arizona, Iranian Languages. <a href="https://iranian-languages.arizona.edu/node/7" target="_blank" rel="noopener">Kurmanji Kurdish — Phonology and Orthography</a> (خشتەی IPA و تێبینیی شێوەزارەکان).</li>
<li>Haig, Geoffrey. (2018). “Northern Kurdish (Kurmanjî).” In Geoffrey Haig &amp; Geoffrey Khan (eds.), <em>The Languages and Linguistics of Western Asia: An Areal Perspective</em>, pp. 106–158. De Gruyter Mouton. <a href="https://doi.org/10.1515/9783110421682-004" target="_blank" rel="noopener">DOI</a>.</li>
<li>Thackston, W. M. (2006). <em>Kurmanji Kurdish: A Reference Grammar with Selected Readings</em>. Harvard University.</li>
</ol><p class="klesson-note">سەرچاوەی زانکۆی ئەریزۆنا سەرچاوەی سەرەکیی ئەم خشتەیەیە. لەوانەیە ڕێنووس یان وردەکاریی دەربڕین لە شێوەزارێکەوە بۆ شێوەزارێکی دیکە جیاواز بێت؛ لە کاتی تێبینیی شێوەزاردا دەبێت ناوچە و سەرچاوەکە دیاری بکرێن.</p></section>',now()),
('kurmanji-course-1-lesson-05.html','kurmanji-course-1','پیتە تایبەتەکان: ç، ş، ê، î، û','<section class="klesson-card"><h2>١. پێنج پیتەکە</h2><p>ئەلفبێی لاتینیی کورمانجی ٣١ پیتی هەیە. پێنج پیتی نیشانەدار بریتین لە <strong>ç، ş، ê، î، û</strong>؛ ئەم نیشانانە جوانکاری نین، بەڵکو بەشێکن لە شێوەی فەرمیی پیتەکە و دەبێت لە نوسین و خوێندنەوەدا بپارێزرێن.</p><p><strong>جیاوازیی شێوە و ئەرک:</strong> <em>ç</em> و <em>ş</em> کۆنسۆنەنتن؛ <em>ê</em>، <em>î</em> و <em>û</em> ڤاوڵن. نیشانەی ژێرەوەی ç/ş (cedilla) و هێمای سەرەوەی ê/î/û (circumflex) لە فۆڕمی پیتەکە جیاوازی دروست دەکەن، نەک تەنها لە شێوازی جوانکاری.</p><table class="klesson-table"><thead><tr><th>پیت</th><th>نمونەی کورمانجی</th><th>واتا</th><th>تێبینی</th></tr></thead><tbody>
<tr><td>ç</td><td>çak</td><td>باش</td><td>لە خشتەی زانکۆی ئەریزۆنا بە /t͡ʃ/ نوێنەرایەتی دەکرێت.</td></tr>
<tr><td>ş</td><td>şaş</td><td>هەڵە</td><td>/ʃ/؛ پیتی ş لە s جیاوازە.</td></tr>
<tr><td>ê</td><td>êş</td><td>ئازار</td><td>ڤاوڵێکی جیاواز لە e.</td></tr>
<tr><td>î</td><td>îro</td><td>ئەمڕۆ</td><td>ڤاوڵێکی جیاواز لە i.</td></tr>
<tr><td>û</td><td>bûz</td><td>سەهۆڵ</td><td>ڤاوڵێکی جیاواز لە u.</td></tr></tbody></table>
<p class="klesson-note">نمونە و واتاکان لە خشتەی ڕێنووس و دەنگناسیی کورمانجیی زانکۆی ئەریزۆنا وەردەگیرێن. دەربڕینی وردی دەنگەکان دەتوانێت بە شێوەزار بگۆڕێت؛ بۆیە ئەم وانەیە بنەمای نوسین دەخاتەڕوو، نەک هەمو جیاوازییە دەنگییەکان.</p></section>
<section class="klesson-card"><h2>٢. نیشانەکە لە نوسین دابمەزرێنە</h2><ul><li><strong>ç</strong> هەمیشە لە نوسین لە <strong>c</strong> جیاوازە؛ لەبیرت نەچێت نیشانەکە لاببەیت.</li><li><strong>ş</strong> لە <strong>s</strong> جیاوازە؛ نوسینی şaş بە شێوەی sash یان sas هەمان ڕێنووس نیە.</li><li><strong>ê</strong> لە <strong>e</strong>، <strong>î</strong> لە <strong>i</strong>، و <strong>û</strong> لە <strong>u</strong> جیاوازن. نیشانەی پیتەکە بە وردی بنووسە.</li><li>لە پیتی گەورەدا شێوەکان بریتین لە <strong>Ç، Ş، Ê، Î، Û</strong>.</li></ul></section>
<section class="klesson-card"><h2>٣. ڕاهێنانی نوسین</h2><ol><li>هەر پیتێک پێنج جار بە شێوەی گەورە و بچووک بنووسە: Ç ç، Ş ş، Ê ê، Î î، Û û.</li><li>ئەم وشانە لە ڕووی پیتە تایبەتەکەوە پۆلێن بکە: çak، şaş، êş، îro، bûz.</li><li>بە بێ گۆڕینی نیشانەکان، هەر وشەیەک لە خشتەکەوە دووبارە بنووسە.</li><li>بە وشەیەکی ڕاستەقینە لە سەرچاوەی فێرکاری، نمونەیەک بۆ ç و ş بدۆزەوە و لەگەڵ وانەکەدا تۆماری بکە.</li></ol></section>
<section class="klesson-card"><h2>سەرچاوەکان</h2><ol><li>University of Arizona, Iranian Languages. <a href="https://iranian-languages.arizona.edu/node/7" target="_blank" rel="noopener">Kurmanji Kurdish — Phonology and Orthography</a> (خشتەی پیت و نمونە وشەکان).</li><li>Haig, Geoffrey. (2018). “Northern Kurdish (Kurmanjî).” In Geoffrey Haig & Geoffrey Khan (eds.), <em>The Languages and Linguistics of Western Asia: An Areal Perspective</em>, pp. 106–158. De Gruyter Mouton. <a href="https://doi.org/10.1515/9783110421682-004" target="_blank" rel="noopener">DOI</a>.</li><li>Thackston, W. M. (2006). <em>Kurmanji Kurdish: A Reference Grammar with Selected Readings</em>. Harvard University.</li></ol></section>',now()),
  ('kurmanji-course-1-lesson-06.html','kurmanji-course-1','خوێندنەوە و نوسینی وشەی سادە','<section class="klesson-card"><h2>١. ڕێکاری خوێندنەوە</h2><ol><li>سەرەتا هەمو پیتەکانی وشەکە دیاری بکە؛ بە تایبەتی ç، ş، ê، î و û.</li><li>وشەکە بە پیتەکانی خۆی دابەش بکە، بەڵام لە خوێندنەوەدا وشەکە بە شێوەیەکی سروشتی پێکەوە بخوێنەوە.</li><li>جیاوازیی e/ê، i/î و u/û بپارێزە؛ ئەم جیاوازییانە لە ڕێنووسدا گرنگن.</li><li>واتای وشەکە لە سەرچاوەی باوەڕپێکراو بپشکنە؛ لە تەنیا لەسەر هاوشێوەیی بە کوردیی ناوەندی یان ئینگلیزی بڕیار مەدە.</li></ol></section>
<section class="klesson-card"><h2>٢. وشەی سادە و نمونە</h2><table class="klesson-table"><thead><tr><th>وشە</th><th>واتای کوردی</th><th>تێبینیی ڕێنووسی</th></tr></thead><tbody>
<tr><td>av</td><td>ئاو</td><td>پیتی a و کۆنسۆنەنتی v</td></tr>
<tr><td>dil</td><td>دڵ</td><td>پیتی i جیاوازە لە î</td></tr>
<tr><td>lêv</td><td>لێو</td><td>ê بە نیشانەی خۆی بنووسە</td></tr>
<tr><td>hîn</td><td>هێشتا</td><td>î لە i جیاوازە</td></tr>
<tr><td>qaz</td><td>قاز</td><td>q پیتێکی سەربەخۆیە</td></tr>
<tr><td>qul</td><td>کون</td><td>u لە û جیاوازە</td></tr>
<tr><td>çak</td><td>باش</td><td>ç لە c جیاوازە</td></tr>
<tr><td>şaş</td><td>هەڵە</td><td>ş لە s جیاوازە</td></tr>
<tr><td>roj</td><td>ڕۆژ</td><td>j لە ڕێنووسی کورمانجی پیتی جیاوازە</td></tr>
<tr><td>yek</td><td>یەک</td><td>y دەنگی /j/ نیشان دەدات</td></tr>
</tbody></table><p class="klesson-note">واتاکان بەپێی خشتەی ڕێنووس و نمونەکانی زانکۆی ئەریزۆنا و سەرچاوەی وشەنامەی کورمانجی هاتوون. لە وشەنامەکاندا هەندێک وشە دەتوانێت واتای زیاتر هەبێت؛ لێرەدا تەنیا واتای سەرەکیی پەیوەندیدار بە ڕاهێنانەکە هاتووە.</p></section>
<section class="klesson-card"><h2>٣. ڕاهێنانی نوسین</h2><ol><li>وشەکانی av، dil، lêv، hîn و qaz بە پیتی گەورە و بچووک بنووسە.</li><li>لە وشەکانی çak و şaş نیشانەی تایبەتەکە دیاری بکە و ڕون بکەرەوە بۆچی نابێت لاببرێت.</li><li>وشەکانی qul و hîn بەراورد بکە و جیاوازیی u و î لە نوسینەکەدا دیاری بکە.</li><li>سێ وشە لە خشتەکە هەڵبژێرە؛ سەرەتا لەسەر کاغەز بنووسە، پاشان بە سەرچاوەکەوە بەراوردیان بکە.</li></ol></section>
<section class="klesson-card"><h2>٤. خۆهەڵسەنگاندن</h2><ul><li>دەتوانم پیتە تایبەتەکان بەبێ لابردنی نیشانەکانیان بنووسم.</li><li>دەتوانم جیاوازیی e/ê، i/î و u/û دیاری بکەم.</li><li>دەتوانم بۆ هەر وشەیەک واتا لە سەرچاوەدا بپشکنم، نەک بە گومان دیاری بکەم.</li></ul></section>
<section class="klesson-card"><h2>سەرچاوەکان</h2><ol><li>University of Arizona, Iranian Languages. <a href="https://iranian-languages.arizona.edu/node/7" target="_blank" rel="noopener">Kurmanji Kurdish — Phonology and Orthography</a>.</li><li>Yari. <a href="https://yari.krd/dictionary/" target="_blank" rel="noopener">Kurmanji–English word list</a>.</li><li>Thackston, W. M. (2006). <em>Kurmanji Kurdish: A Reference Grammar with Selected Readings</em>. Harvard University.</li></ol></section>',now()),
  ('kurmanji-course-1-lesson-07.html','kurmanji-course-1','ڕێنووسی وشە باوەکان','<section class="klesson-card"><h2>١. وشەی ڕۆژانە و شێوەی ڕاستی نوسین</h2><p>لە فێربونی ڕێنووسدا، باشترە وشەکان لە سەرچاوەی فێرکاری یان وشەنامەی کورمانجی بپشکنرێن. ئەم خشتەیە نمونەی وشە و دەربڕینە باوەکان دەخاتەڕوو؛ واتاکان بە کوردیی ناوەندی وەرگێڕدراون بۆ یارمەتیدانی فێرخواز.</p><table class="klesson-table"><thead><tr><th>کورمانجی</th><th>واتا</th><th>نکته‌ی ڕێنووسی</th></tr></thead><tbody>
<tr><td>Silav</td><td>سڵاو</td><td>پیتی v لە کۆتایی وشەکەدا دێت.</td></tr>
<tr><td>Rojbaş</td><td>ڕۆژ باش / ڕۆژباش</td><td>j و ş بە پیتی جیاواز دەنووسرێن.</td></tr>
<tr><td>Şevbaş</td><td>شەو باش</td><td>ş نابێت بە s بگۆڕدرێت.</td></tr>
<tr><td>Spas</td><td>سوپاس</td><td>شێوەی spas باوە؛ sipasیش وەک شێوەیەکی جیاوازی ناوچەیی دەبینرێت.</td></tr>
<tr><td>Erê</td><td>بەڵێ</td><td>ê پیتی جیاوازە لە e.</td></tr>
<tr><td>Na</td><td>نەخێر</td><td>دوو پیت: n + a.</td></tr>
<tr><td>Bi xêr hatî</td><td>بەخێربێیت</td><td>x و ê لە نوسینەکەدا بپارێزە.</td></tr>
<tr><td>Tu çawa yî?</td><td>تۆ چۆنی؟</td><td>ç و î گرنگن؛ لە پرسیاردا نیشانەی ? بەکاربهێنە.</td></tr>
<tr><td>Ez baş im.</td><td>من باشم.</td><td>ş لە baş پیتێکی جیاوازە.</td></tr>
<tr><td>Ji kerema xwe</td><td>تکایە</td><td>x بە پیتی x دەنووسرێت، نەک ks.</td></tr>
</tbody></table>
<p class="klesson-note">شێوە و واتاکان لە ڕێنمایی دەربڕینە ڕۆژانەکانی Yari و سەرچاوەی ڕێنووسەوە پشکنراون. هەندێک دەربڕین، وەک spas/sipas، دەتوانێت جیاوازیی ناوچەیی یان شێوەی نوسینی هەبێت؛ لە وانەدا شێوەی باو پێشکەش کراوە، نەک ئەوەی شێوەیەکی تر بە هەڵە دابنرێت.</p></section>
<section class="klesson-card"><h2>٢. پێنج هەڵەی ڕێنووسی کە پەیویستە لێیان دوور بکەویت</h2><ol><li>لابردنی نیشانە لە ç، ş، ê، î یان û.</li><li>تێکەڵکردنی c و ç یان s و ş.</li><li>گۆڕینی x بۆ ks، بە پێی خوێندنەوەی زمانێکی تر.</li><li>گۆڕینی ڕێنووسی وشە لەسەر بنەمای دەنگی کوردیی ناوەندی، بەبێ پشکنینی وشەنامە.</li><li>گۆڕینی شێوەی ناوچەیی بە شێوەی ستاندارد بەبێ ئەوەی جیاوازییەکە تۆمار بکرێت.</li></ol></section>
<section class="klesson-card"><h2>٣. ڕاهێنانی ڕێنووس</h2><ol><li>دەربڕینەکانی Silav، Rojbaş، Şevbaş و Spas بنووسە و پیتە تایبەتەکان ژمارە بکە.</li><li>لە Tu çawa yî? پیتەکانی ç و î دیاری بکە.</li><li>وشەی Bi xêr hatî دوو جار بنووسە و دڵنیابە لەوەی x و ê لە شوێنی خۆیانن.</li><li>وشەیەکی تر لە وشەنامەی کورمانجی هەڵبژێرە، واتاکەی بپشکنە و هەردووکیان لە تۆماری وانەکەدا بنووسە.</li></ol></section>
<section class="klesson-card"><h2>٤. سەرچاوەکان</h2><ol><li>Yari. <a href="https://yari.krd/learn/kurdish-greetings/" target="_blank" rel="noopener">Greetings and everyday phrases for beginners (Kurmanji)</a>.</li><li>Yari. <a href="https://yari.krd/dictionary/" target="_blank" rel="noopener">Kurmanji–English word list</a>.</li><li>University of Arizona, Iranian Languages. <a href="https://iranian-languages.arizona.edu/node/7" target="_blank" rel="noopener">Kurmanji Kurdish — Phonology and Orthography</a>.</li><li>Haig, Geoffrey. (2018). “Northern Kurdish (Kurmanjî).” In Geoffrey Haig &amp; Geoffrey Khan (eds.), <em>The Languages and Linguistics of Western Asia: An Areal Perspective</em>, pp. 106–158. Berlin: De Gruyter Mouton. <a href="https://doi.org/10.1515/9783110421682-004" target="_blank" rel="noopener">DOI: 10.1515/9783110421682-004</a>.</li></ol></section>',now()),
  ('kurmanji-course-1-lesson-08.html','kurmanji-course-1','جیاوازی نێوان نوسین و دەربڕین','<section class="klesson-card"><h2>١. سێ چەمکی جیاواز</h2><ul><li><strong>پیت:</strong> نیشانەیەکی نوسراوە، وەک ç یان ş.</li><li><strong>فونیم:</strong> یەکەیەکی دەنگییە کە دەتوانێت لە زماندا جیاوازیی واتا دروست بکات.</li><li><strong>دەربڕین:</strong> شێوەی ڕاستەقینەی دروستکردنی دەنگەکان لە قسەکردندا؛ دەتوانێت بە پێی شێوەزار، خێرایی و دەوروبەری دەنگی بگۆڕێت.</li></ul><p>ڕێنووس ڕێککەوتنێکی نوسینیە بۆ نوێنەرایەتیی وشەکان. دەربڕین پەیوەندی بە دەنگی قسەکردنەوە هەیە. بۆیە نابێت چاوەڕێ بکەین هەر وردەکارییەکی دەنگی بە پیتێکی جیاواز بنووسرێت.</p></section>
<section class="klesson-card"><h2>٢. نمونە لە کورمانجیدا</h2><table class="klesson-table"><thead><tr><th>نمونە</th><th>چی دەبینین؟</th><th>ڕونکردنەوە</th></tr></thead><tbody>
<tr><td>e / ê</td><td>دوو پیتی جیاواز</td><td>هەشت ڤاوڵی کورمانجی لە ڕێنووسدا بە هەشت پیت نیشان دەدرێن؛ e و ê جیاوازیی دەنگییان هەیە.</td></tr>
<tr><td>i / î</td><td>دوو پیتی جیاواز</td><td>i و î لە ڕێنووسدا جیاوازن؛ لە نمونەکاندا dil «دڵ» و hîn «هێشتا» هەن.</td></tr>
<tr><td>u / û</td><td>دوو پیتی جیاواز</td><td>u و û جیاوازن؛ qul «کون» و bûz «سەهۆڵ» نمونەن.</td></tr>
<tr><td>r / rr</td><td>جیاوازیی دەنگی هەیە</td><td>لە هەندێک ڕێنووسدا rr بۆ trill و r بۆ tap بەکاردێت؛ بەڵام ئەم جیاوازییە لە نوسینی ستاندارددا هەمیشە بە ڕونی نیشان نادرێت.</td></tr>
<tr><td>p / pˤ</td><td>جیاوازیی دەنگیی شێوەزاری</td><td>لە هەندێک شێوەزاردا /p/ و /pˤ/ دوو دەنگی جیاوازن؛ /pˤ/ وەستانێکی بێ‌هەناسەیە کە زۆرجار لەگەڵ فەرینجالیزەبوون دێت. ئەم جیاوازییە لە ڕێنووسی لاتینیی ستاندارددا بە پیتی جیاواز نانووسرێت و لە هەمو شێوەزارەکانیشدا بە یەک شێوە نیە.</td></tr>
</tbody></table><p class="klesson-note">جیاوازییەکان لە هەمو ناوچەکاندا بە یەک شێوە نیین. ئەم خشتەیە بنەمای گشتی پیشان دەدات، نەک یاسایەک کە بۆ هەمو شێوەزارەکان بەبێ جیاوازی جێبەجێ بکرێت.</p></section>
<section class="klesson-card"><h2>٣. بۆچی دەربڕین دەتوانێت جیاواز بێت؟</h2><ul><li><strong>جیاوازیی شێوەزاری:</strong> هەندێک دەنگ لە ناوچەیەکدا هەیە و لە ناوچەیەکی تر کەمترە یان جیاواز دەردەکەوێت.</li><li><strong>دەنگە هاوسێیەکان:</strong> دەنگێک دەتوانێت بەهۆی دەنگی پێش یان دوای خۆیەوە کەمێک بگۆڕێت.</li><li><strong>ڕێنووسی ستاندارد:</strong> شێوەی نوسین بۆ خوێندنەوە و پەیوەندیی نووسراو ڕێکخراوە؛ هەمو وردەکارییەکانی دەنگی تۆمار ناکات.</li></ul></section>
<section class="klesson-card"><h2>٤. ڕاهێنان</h2><ol><li>بە وشەیەکی نمونە ڕون بکەرەوە کە بۆچی e و ê یەک پیت نین.</li><li>جیاوازیی نێوان پیت، فونیم و دەربڕین بە وشەی خۆت بنووسە.</li><li>لە سەرچاوەکەدا بگەڕێ بۆ نمونەیەک کە جیاوازیی دەنگی لە نوسینی ستاندارددا بە تەواوی نیشان نەدراوە.</li><li>ئەگەر دەربڕینی وشەیەک لە ناوچەیەکی تر جیاوازت بیست، بە خێرایی بە هەڵە ناوی مەبە؛ شێوە و ناوچەکە تۆمار بکە و بە سەرچاوە بەراوردی بکە.</li></ol></section>
<section class="klesson-card"><h2>٥. سەرچاوەکان</h2><ol><li>University of Arizona, Iranian Languages. <a href="https://iranian-languages.arizona.edu/node/7" target="_blank" rel="noopener">Kurmanji Kurdish — Phonology and Orthography</a>.</li><li>Haig, Geoffrey. (2018). “Northern Kurdish (Kurmanjî).” In Geoffrey Haig &amp; Geoffrey Khan (eds.), <em>The Languages and Linguistics of Western Asia: An Areal Perspective</em>, pp. 106–158. Berlin: De Gruyter Mouton. <a href="https://doi.org/10.1515/9783110421682-004" target="_blank" rel="noopener">DOI: 10.1515/9783110421682-004</a>.</li><li>Yari. <a href="https://yari.krd/learn/kurmanji-alphabet/" target="_blank" rel="noopener">The Kurmanji Kurdish alphabet: all 31 letters and how to say them</a>.</li></ol></section>',now())
ON CONFLICT (lesson_key) DO UPDATE
SET title=EXCLUDED.title, content_html=EXCLUDED.content_html, updated_at=now();
ROLLBACK;
