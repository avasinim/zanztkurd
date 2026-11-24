-- Production activation for the 27-lesson Kurmancî phonology course.
-- Seed and RPC definitions are copied from the verified test project.
-- Existing courses, enrollments, progress and lesson records are not deleted or rewritten.
BEGIN;

INSERT INTO public.courses (id,title,description,total_lessons)
VALUES (
  'kurmanji-dengnasi-27',
  'Dengnasîya Zimanê Kurdî',
  'Kurmancî, tîpên Latînî; 27 dersên li ser bingeha Dengnasî di kurdî de ya Husein Muhammed.',
  27
)
ON CONFLICT (id) DO NOTHING;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM public.courses
    WHERE id='kurmanji-dengnasi-27'
      AND title='Dengnasîya Zimanê Kurdî'
      AND total_lessons=27
  ) THEN
    RAISE EXCEPTION 'Course row conflicts with expected Dengnasi course metadata';
  END IF;
END $$;

INSERT INTO public.lesson_content (lesson_key,course_id,title,content_html,updated_at)
VALUES
('kurmanji-dengnasi-lesson-01.html','kurmanji-dengnasi-27','Dergeh û ev vekolîn û yên berî wê','<section class="klesson-card"><h2>Çavkaniya bingehîn</h2><p>Ev ders ji çavkaniya Husein Muhammed, <em>Dengnasî di kurdî de</em>, hatiye. Rûpelên çapkirî: 4–7. Rûpelên PDF-ya sêwirandî: 8–11.</p><p>Metn, nimûne, tablo û wêneyên çavkaniyê bê guhertin tên parastin. Tu quiz, pirs an rahênana nû li vê dersê nehatiye zêdekirin.</p><div style="margin:16px 0;border:1px solid #d8ddd6;border-radius:12px;overflow:hidden"><iframe title="Dergeh û ev vekolîn û yên berî wê" src="https://raw.githubusercontent.com/avasinim/zanztkurd/main/Dengnasiya_Zimane_Kurdi_27_Wane_corrected.pdf#page=8" loading="lazy" style="display:block;width:100%;height:76vh;min-height:620px;border:0" allow="fullscreen"></iframe></div><p><a href="https://raw.githubusercontent.com/avasinim/zanztkurd/main/Dengnasiya_Zimane_Kurdi_27_Wane_corrected.pdf#page=8" target="_blank" rel="noopener">Vekirina PDF-ê li rûpela 8 ↗</a></p></section>',now()),
('kurmanji-dengnasi-lesson-02.html','kurmanji-dengnasi-27','Vokal û konsonant; cih û awayên dengan; pifdarî','<section class="klesson-card"><h2>Çavkaniya bingehîn</h2><p>Ev ders ji çavkaniya Husein Muhammed, <em>Dengnasî di kurdî de</em>, hatiye. Rûpelên çapkirî: 8–15. Rûpelên PDF-ya sêwirandî: 13–20.</p><p>Metn, nimûne, tablo û wêneyên çavkaniyê bê guhertin tên parastin. Tu quiz, pirs an rahênana nû li vê dersê nehatiye zêdekirin.</p><div style="margin:16px 0;border:1px solid #d8ddd6;border-radius:12px;overflow:hidden"><iframe title="Vokal û konsonant; cih û awayên dengan; pifdarî" src="https://raw.githubusercontent.com/avasinim/zanztkurd/main/Dengnasiya_Zimane_Kurdi_27_Wane_corrected.pdf#page=13" loading="lazy" style="display:block;width:100%;height:76vh;min-height:620px;border:0" allow="fullscreen"></iframe></div><p><a href="https://raw.githubusercontent.com/avasinim/zanztkurd/main/Dengnasiya_Zimane_Kurdi_27_Wane_corrected.pdf#page=13" target="_blank" rel="noopener">Vekirina PDF-ê li rûpela 13 ↗</a></p></section>',now()),
('kurmanji-dengnasi-lesson-03.html','kurmanji-dengnasi-27','Hevdengî û pirdengî di nivîsîna kurdî de','<section class="klesson-card"><h2>Çavkaniya bingehîn</h2><p>Ev ders ji çavkaniya Husein Muhammed, <em>Dengnasî di kurdî de</em>, hatiye. Rûpelên çapkirî: 16–28. Rûpelên PDF-ya sêwirandî: 22–34.</p><p>Metn, nimûne, tablo û wêneyên çavkaniyê bê guhertin tên parastin. Tu quiz, pirs an rahênana nû li vê dersê nehatiye zêdekirin.</p><div style="margin:16px 0;border:1px solid #d8ddd6;border-radius:12px;overflow:hidden"><iframe title="Hevdengî û pirdengî di nivîsîna kurdî de" src="https://raw.githubusercontent.com/avasinim/zanztkurd/main/Dengnasiya_Zimane_Kurdi_27_Wane_corrected.pdf#page=22" loading="lazy" style="display:block;width:100%;height:76vh;min-height:620px;border:0" allow="fullscreen"></iframe></div><p><a href="https://raw.githubusercontent.com/avasinim/zanztkurd/main/Dengnasiya_Zimane_Kurdi_27_Wane_corrected.pdf#page=22" target="_blank" rel="noopener">Vekirina PDF-ê li rûpela 22 ↗</a></p></section>',now()),
('kurmanji-dengnasi-lesson-04.html','kurmanji-dengnasi-27','Qelewîtî','<section class="klesson-card"><h2>Çavkaniya bingehîn</h2><p>Ev ders ji çavkaniya Husein Muhammed, <em>Dengnasî di kurdî de</em>, hatiye. Rûpelên çapkirî: 29–39. Rûpelên PDF-ya sêwirandî: 36–46.</p><p>Metn, nimûne, tablo û wêneyên çavkaniyê bê guhertin tên parastin. Tu quiz, pirs an rahênana nû li vê dersê nehatiye zêdekirin.</p><div style="margin:16px 0;border:1px solid #d8ddd6;border-radius:12px;overflow:hidden"><iframe title="Qelewîtî" src="https://raw.githubusercontent.com/avasinim/zanztkurd/main/Dengnasiya_Zimane_Kurdi_27_Wane_corrected.pdf#page=36" loading="lazy" style="display:block;width:100%;height:76vh;min-height:620px;border:0" allow="fullscreen"></iframe></div><p><a href="https://raw.githubusercontent.com/avasinim/zanztkurd/main/Dengnasiya_Zimane_Kurdi_27_Wane_corrected.pdf#page=36" target="_blank" rel="noopener">Vekirina PDF-ê li rûpela 36 ↗</a></p></section>',now()),
('kurmanji-dengnasi-lesson-05.html','kurmanji-dengnasi-27','Rêjeya herfan di nivîsên kurmancî de','<section class="klesson-card"><h2>Çavkaniya bingehîn</h2><p>Ev ders ji çavkaniya Husein Muhammed, <em>Dengnasî di kurdî de</em>, hatiye. Rûpelên çapkirî: 40–43. Rûpelên PDF-ya sêwirandî: 48–51.</p><p>Metn, nimûne, tablo û wêneyên çavkaniyê bê guhertin tên parastin. Tu quiz, pirs an rahênana nû li vê dersê nehatiye zêdekirin.</p><div style="margin:16px 0;border:1px solid #d8ddd6;border-radius:12px;overflow:hidden"><iframe title="Rêjeya herfan di nivîsên kurmancî de" src="https://raw.githubusercontent.com/avasinim/zanztkurd/main/Dengnasiya_Zimane_Kurdi_27_Wane_corrected.pdf#page=48" loading="lazy" style="display:block;width:100%;height:76vh;min-height:620px;border:0" allow="fullscreen"></iframe></div><p><a href="https://raw.githubusercontent.com/avasinim/zanztkurd/main/Dengnasiya_Zimane_Kurdi_27_Wane_corrected.pdf#page=48" target="_blank" rel="noopener">Vekirina PDF-ê li rûpela 48 ↗</a></p></section>',now()),
('kurmanji-dengnasi-lesson-06.html','kurmanji-dengnasi-27','Dengrêziya kurdî; peyv ji kîteyan pêk tên','<section class="klesson-card"><h2>Çavkaniya bingehîn</h2><p>Ev ders ji çavkaniya Husein Muhammed, <em>Dengnasî di kurdî de</em>, hatiye. Rûpelên çapkirî: 44–55. Rûpelên PDF-ya sêwirandî: 53–64.</p><p>Metn, nimûne, tablo û wêneyên çavkaniyê bê guhertin tên parastin. Tu quiz, pirs an rahênana nû li vê dersê nehatiye zêdekirin.</p><div style="margin:16px 0;border:1px solid #d8ddd6;border-radius:12px;overflow:hidden"><iframe title="Dengrêziya kurdî; peyv ji kîteyan pêk tên" src="https://raw.githubusercontent.com/avasinim/zanztkurd/main/Dengnasiya_Zimane_Kurdi_27_Wane_corrected.pdf#page=53" loading="lazy" style="display:block;width:100%;height:76vh;min-height:620px;border:0" allow="fullscreen"></iframe></div><p><a href="https://raw.githubusercontent.com/avasinim/zanztkurd/main/Dengnasiya_Zimane_Kurdi_27_Wane_corrected.pdf#page=53" target="_blank" rel="noopener">Vekirina PDF-ê li rûpela 53 ↗</a></p></section>',now()),
('kurmanji-dengnasi-lesson-07.html','kurmanji-dengnasi-27','Tesîra guherîna dengî li ser nivîsînê','<section class="klesson-card"><h2>Çavkaniya bingehîn</h2><p>Ev ders ji çavkaniya Husein Muhammed, <em>Dengnasî di kurdî de</em>, hatiye. Rûpelên çapkirî: 56–67. Rûpelên PDF-ya sêwirandî: 66–77.</p><p>Metn, nimûne, tablo û wêneyên çavkaniyê bê guhertin tên parastin. Tu quiz, pirs an rahênana nû li vê dersê nehatiye zêdekirin.</p><div style="margin:16px 0;border:1px solid #d8ddd6;border-radius:12px;overflow:hidden"><iframe title="Tesîra guherîna dengî li ser nivîsînê" src="https://raw.githubusercontent.com/avasinim/zanztkurd/main/Dengnasiya_Zimane_Kurdi_27_Wane_corrected.pdf#page=66" loading="lazy" style="display:block;width:100%;height:76vh;min-height:620px;border:0" allow="fullscreen"></iframe></div><p><a href="https://raw.githubusercontent.com/avasinim/zanztkurd/main/Dengnasiya_Zimane_Kurdi_27_Wane_corrected.pdf#page=66" target="_blank" rel="noopener">Vekirina PDF-ê li rûpela 66 ↗</a></p></section>',now()),
('kurmanji-dengnasi-lesson-08.html','kurmanji-dengnasi-27','Konsonantên B, C, Ç û D','<section class="klesson-card"><h2>Çavkaniya bingehîn</h2><p>Ev ders ji çavkaniya Husein Muhammed, <em>Dengnasî di kurdî de</em>, hatiye. Rûpelên çapkirî: 68–103. Rûpelên PDF-ya sêwirandî: 79–114.</p><p>Metn, nimûne, tablo û wêneyên çavkaniyê bê guhertin tên parastin. Tu quiz, pirs an rahênana nû li vê dersê nehatiye zêdekirin.</p><div style="margin:16px 0;border:1px solid #d8ddd6;border-radius:12px;overflow:hidden"><iframe title="Konsonantên B, C, Ç û D" src="https://raw.githubusercontent.com/avasinim/zanztkurd/main/Dengnasiya_Zimane_Kurdi_27_Wane_corrected.pdf#page=79" loading="lazy" style="display:block;width:100%;height:76vh;min-height:620px;border:0" allow="fullscreen"></iframe></div><p><a href="https://raw.githubusercontent.com/avasinim/zanztkurd/main/Dengnasiya_Zimane_Kurdi_27_Wane_corrected.pdf#page=79" target="_blank" rel="noopener">Vekirina PDF-ê li rûpela 79 ↗</a></p></section>',now()),
('kurmanji-dengnasi-lesson-09.html','kurmanji-dengnasi-27','Dengên F û G','<section class="klesson-card"><h2>Çavkaniya bingehîn</h2><p>Ev ders ji çavkaniya Husein Muhammed, <em>Dengnasî di kurdî de</em>, hatiye. Rûpelên çapkirî: 104–115. Rûpelên PDF-ya sêwirandî: 116–127.</p><p>Metn, nimûne, tablo û wêneyên çavkaniyê bê guhertin tên parastin. Tu quiz, pirs an rahênana nû li vê dersê nehatiye zêdekirin.</p><div style="margin:16px 0;border:1px solid #d8ddd6;border-radius:12px;overflow:hidden"><iframe title="Dengên F û G" src="https://raw.githubusercontent.com/avasinim/zanztkurd/main/Dengnasiya_Zimane_Kurdi_27_Wane_corrected.pdf#page=116" loading="lazy" style="display:block;width:100%;height:76vh;min-height:620px;border:0" allow="fullscreen"></iframe></div><p><a href="https://raw.githubusercontent.com/avasinim/zanztkurd/main/Dengnasiya_Zimane_Kurdi_27_Wane_corrected.pdf#page=116" target="_blank" rel="noopener">Vekirina PDF-ê li rûpela 116 ↗</a></p></section>',now()),
('kurmanji-dengnasi-lesson-10.html','kurmanji-dengnasi-27','Dengên H û J','<section class="klesson-card"><h2>Çavkaniya bingehîn</h2><p>Ev ders ji çavkaniya Husein Muhammed, <em>Dengnasî di kurdî de</em>, hatiye. Rûpelên çapkirî: 116–132. Rûpelên PDF-ya sêwirandî: 129–145.</p><p>Metn, nimûne, tablo û wêneyên çavkaniyê bê guhertin tên parastin. Tu quiz, pirs an rahênana nû li vê dersê nehatiye zêdekirin.</p><div style="margin:16px 0;border:1px solid #d8ddd6;border-radius:12px;overflow:hidden"><iframe title="Dengên H û J" src="https://raw.githubusercontent.com/avasinim/zanztkurd/main/Dengnasiya_Zimane_Kurdi_27_Wane_corrected.pdf#page=129" loading="lazy" style="display:block;width:100%;height:76vh;min-height:620px;border:0" allow="fullscreen"></iframe></div><p><a href="https://raw.githubusercontent.com/avasinim/zanztkurd/main/Dengnasiya_Zimane_Kurdi_27_Wane_corrected.pdf#page=129" target="_blank" rel="noopener">Vekirina PDF-ê li rûpela 129 ↗</a></p></section>',now()),
('kurmanji-dengnasi-lesson-11.html','kurmanji-dengnasi-27','Dengên K û L','<section class="klesson-card"><h2>Çavkaniya bingehîn</h2><p>Ev ders ji çavkaniya Husein Muhammed, <em>Dengnasî di kurdî de</em>, hatiye. Rûpelên çapkirî: 133–146. Rûpelên PDF-ya sêwirandî: 147–160.</p><p>Metn, nimûne, tablo û wêneyên çavkaniyê bê guhertin tên parastin. Tu quiz, pirs an rahênana nû li vê dersê nehatiye zêdekirin.</p><div style="margin:16px 0;border:1px solid #d8ddd6;border-radius:12px;overflow:hidden"><iframe title="Dengên K û L" src="https://raw.githubusercontent.com/avasinim/zanztkurd/main/Dengnasiya_Zimane_Kurdi_27_Wane_corrected.pdf#page=147" loading="lazy" style="display:block;width:100%;height:76vh;min-height:620px;border:0" allow="fullscreen"></iframe></div><p><a href="https://raw.githubusercontent.com/avasinim/zanztkurd/main/Dengnasiya_Zimane_Kurdi_27_Wane_corrected.pdf#page=147" target="_blank" rel="noopener">Vekirina PDF-ê li rûpela 147 ↗</a></p></section>',now()),
('kurmanji-dengnasi-lesson-12.html','kurmanji-dengnasi-27','Dengên M û N','<section class="klesson-card"><h2>Çavkaniya bingehîn</h2><p>Ev ders ji çavkaniya Husein Muhammed, <em>Dengnasî di kurdî de</em>, hatiye. Rûpelên çapkirî: 147–154. Rûpelên PDF-ya sêwirandî: 162–169.</p><p>Metn, nimûne, tablo û wêneyên çavkaniyê bê guhertin tên parastin. Tu quiz, pirs an rahênana nû li vê dersê nehatiye zêdekirin.</p><div style="margin:16px 0;border:1px solid #d8ddd6;border-radius:12px;overflow:hidden"><iframe title="Dengên M û N" src="https://raw.githubusercontent.com/avasinim/zanztkurd/main/Dengnasiya_Zimane_Kurdi_27_Wane_corrected.pdf#page=162" loading="lazy" style="display:block;width:100%;height:76vh;min-height:620px;border:0" allow="fullscreen"></iframe></div><p><a href="https://raw.githubusercontent.com/avasinim/zanztkurd/main/Dengnasiya_Zimane_Kurdi_27_Wane_corrected.pdf#page=162" target="_blank" rel="noopener">Vekirina PDF-ê li rûpela 162 ↗</a></p></section>',now()),
('kurmanji-dengnasi-lesson-13.html','kurmanji-dengnasi-27','Dengên P û Q','<section class="klesson-card"><h2>Çavkaniya bingehîn</h2><p>Ev ders ji çavkaniya Husein Muhammed, <em>Dengnasî di kurdî de</em>, hatiye. Rûpelên çapkirî: 155–167. Rûpelên PDF-ya sêwirandî: 171–183.</p><p>Metn, nimûne, tablo û wêneyên çavkaniyê bê guhertin tên parastin. Tu quiz, pirs an rahênana nû li vê dersê nehatiye zêdekirin.</p><div style="margin:16px 0;border:1px solid #d8ddd6;border-radius:12px;overflow:hidden"><iframe title="Dengên P û Q" src="https://raw.githubusercontent.com/avasinim/zanztkurd/main/Dengnasiya_Zimane_Kurdi_27_Wane_corrected.pdf#page=171" loading="lazy" style="display:block;width:100%;height:76vh;min-height:620px;border:0" allow="fullscreen"></iframe></div><p><a href="https://raw.githubusercontent.com/avasinim/zanztkurd/main/Dengnasiya_Zimane_Kurdi_27_Wane_corrected.pdf#page=171" target="_blank" rel="noopener">Vekirina PDF-ê li rûpela 171 ↗</a></p></section>',now()),
('kurmanji-dengnasi-lesson-14.html','kurmanji-dengnasi-27','Dengên R û S','<section class="klesson-card"><h2>Çavkaniya bingehîn</h2><p>Ev ders ji çavkaniya Husein Muhammed, <em>Dengnasî di kurdî de</em>, hatiye. Rûpelên çapkirî: 168–186. Rûpelên PDF-ya sêwirandî: 185–203.</p><p>Metn, nimûne, tablo û wêneyên çavkaniyê bê guhertin tên parastin. Tu quiz, pirs an rahênana nû li vê dersê nehatiye zêdekirin.</p><div style="margin:16px 0;border:1px solid #d8ddd6;border-radius:12px;overflow:hidden"><iframe title="Dengên R û S" src="https://raw.githubusercontent.com/avasinim/zanztkurd/main/Dengnasiya_Zimane_Kurdi_27_Wane_corrected.pdf#page=185" loading="lazy" style="display:block;width:100%;height:76vh;min-height:620px;border:0" allow="fullscreen"></iframe></div><p><a href="https://raw.githubusercontent.com/avasinim/zanztkurd/main/Dengnasiya_Zimane_Kurdi_27_Wane_corrected.pdf#page=185" target="_blank" rel="noopener">Vekirina PDF-ê li rûpela 185 ↗</a></p></section>',now()),
('kurmanji-dengnasi-lesson-15.html','kurmanji-dengnasi-27','Dengên Ş û T','<section class="klesson-card"><h2>Çavkaniya bingehîn</h2><p>Ev ders ji çavkaniya Husein Muhammed, <em>Dengnasî di kurdî de</em>, hatiye. Rûpelên çapkirî: 187–202. Rûpelên PDF-ya sêwirandî: 205–220.</p><p>Metn, nimûne, tablo û wêneyên çavkaniyê bê guhertin tên parastin. Tu quiz, pirs an rahênana nû li vê dersê nehatiye zêdekirin.</p><div style="margin:16px 0;border:1px solid #d8ddd6;border-radius:12px;overflow:hidden"><iframe title="Dengên Ş û T" src="https://raw.githubusercontent.com/avasinim/zanztkurd/main/Dengnasiya_Zimane_Kurdi_27_Wane_corrected.pdf#page=205" loading="lazy" style="display:block;width:100%;height:76vh;min-height:620px;border:0" allow="fullscreen"></iframe></div><p><a href="https://raw.githubusercontent.com/avasinim/zanztkurd/main/Dengnasiya_Zimane_Kurdi_27_Wane_corrected.pdf#page=205" target="_blank" rel="noopener">Vekirina PDF-ê li rûpela 205 ↗</a></p></section>',now()),
('kurmanji-dengnasi-lesson-16.html','kurmanji-dengnasi-27','Dengên V, W, Y û Z','<section class="klesson-card"><h2>Çavkaniya bingehîn</h2><p>Ev ders ji çavkaniya Husein Muhammed, <em>Dengnasî di kurdî de</em>, hatiye. Rûpelên çapkirî: 203–232. Rûpelên PDF-ya sêwirandî: 222–251.</p><p>Metn, nimûne, tablo û wêneyên çavkaniyê bê guhertin tên parastin. Tu quiz, pirs an rahênana nû li vê dersê nehatiye zêdekirin.</p><div style="margin:16px 0;border:1px solid #d8ddd6;border-radius:12px;overflow:hidden"><iframe title="Dengên V, W, Y û Z" src="https://raw.githubusercontent.com/avasinim/zanztkurd/main/Dengnasiya_Zimane_Kurdi_27_Wane_corrected.pdf#page=222" loading="lazy" style="display:block;width:100%;height:76vh;min-height:620px;border:0" allow="fullscreen"></iframe></div><p><a href="https://raw.githubusercontent.com/avasinim/zanztkurd/main/Dengnasiya_Zimane_Kurdi_27_Wane_corrected.pdf#page=222" target="_blank" rel="noopener">Vekirina PDF-ê li rûpela 222 ↗</a></p></section>',now()),
('kurmanji-dengnasi-lesson-17.html','kurmanji-dengnasi-27','Eyn (ع) û hemû cotkonsonantên di kurdî de','<section class="klesson-card"><h2>Çavkaniya bingehîn</h2><p>Ev ders ji çavkaniya Husein Muhammed, <em>Dengnasî di kurdî de</em>, hatiye. Rûpelên çapkirî: 233–250. Rûpelên PDF-ya sêwirandî: 253–270.</p><p>Metn, nimûne, tablo û wêneyên çavkaniyê bê guhertin tên parastin. Tu quiz, pirs an rahênana nû li vê dersê nehatiye zêdekirin.</p><div style="margin:16px 0;border:1px solid #d8ddd6;border-radius:12px;overflow:hidden"><iframe title="Eyn (ع) û hemû cotkonsonantên di kurdî de" src="https://raw.githubusercontent.com/avasinim/zanztkurd/main/Dengnasiya_Zimane_Kurdi_27_Wane_corrected.pdf#page=253" loading="lazy" style="display:block;width:100%;height:76vh;min-height:620px;border:0" allow="fullscreen"></iframe></div><p><a href="https://raw.githubusercontent.com/avasinim/zanztkurd/main/Dengnasiya_Zimane_Kurdi_27_Wane_corrected.pdf#page=253" target="_blank" rel="noopener">Vekirina PDF-ê li rûpela 253 ↗</a></p></section>',now()),
('kurmanji-dengnasi-lesson-18.html','kurmanji-dengnasi-27','Vokalên A û E','<section class="klesson-card"><h2>Çavkaniya bingehîn</h2><p>Ev ders ji çavkaniya Husein Muhammed, <em>Dengnasî di kurdî de</em>, hatiye. Rûpelên çapkirî: 251–269. Rûpelên PDF-ya sêwirandî: 272–290.</p><p>Metn, nimûne, tablo û wêneyên çavkaniyê bê guhertin tên parastin. Tu quiz, pirs an rahênana nû li vê dersê nehatiye zêdekirin.</p><div style="margin:16px 0;border:1px solid #d8ddd6;border-radius:12px;overflow:hidden"><iframe title="Vokalên A û E" src="https://raw.githubusercontent.com/avasinim/zanztkurd/main/Dengnasiya_Zimane_Kurdi_27_Wane_corrected.pdf#page=272" loading="lazy" style="display:block;width:100%;height:76vh;min-height:620px;border:0" allow="fullscreen"></iframe></div><p><a href="https://raw.githubusercontent.com/avasinim/zanztkurd/main/Dengnasiya_Zimane_Kurdi_27_Wane_corrected.pdf#page=272" target="_blank" rel="noopener">Vekirina PDF-ê li rûpela 272 ↗</a></p></section>',now()),
('kurmanji-dengnasi-lesson-19.html','kurmanji-dengnasi-27','Vokalên Ê, I û Î','<section class="klesson-card"><h2>Çavkaniya bingehîn</h2><p>Ev ders ji çavkaniya Husein Muhammed, <em>Dengnasî di kurdî de</em>, hatiye. Rûpelên çapkirî: 270–297. Rûpelên PDF-ya sêwirandî: 292–319.</p><p>Metn, nimûne, tablo û wêneyên çavkaniyê bê guhertin tên parastin. Tu quiz, pirs an rahênana nû li vê dersê nehatiye zêdekirin.</p><div style="margin:16px 0;border:1px solid #d8ddd6;border-radius:12px;overflow:hidden"><iframe title="Vokalên Ê, I û Î" src="https://raw.githubusercontent.com/avasinim/zanztkurd/main/Dengnasiya_Zimane_Kurdi_27_Wane_corrected.pdf#page=292" loading="lazy" style="display:block;width:100%;height:76vh;min-height:620px;border:0" allow="fullscreen"></iframe></div><p><a href="https://raw.githubusercontent.com/avasinim/zanztkurd/main/Dengnasiya_Zimane_Kurdi_27_Wane_corrected.pdf#page=292" target="_blank" rel="noopener">Vekirina PDF-ê li rûpela 292 ↗</a></p></section>',now()),
('kurmanji-dengnasi-lesson-20.html','kurmanji-dengnasi-27','Vokalên O, U û Û','<section class="klesson-card"><h2>Çavkaniya bingehîn</h2><p>Ev ders ji çavkaniya Husein Muhammed, <em>Dengnasî di kurdî de</em>, hatiye. Rûpelên çapkirî: 298–314. Rûpelên PDF-ya sêwirandî: 321–337.</p><p>Metn, nimûne, tablo û wêneyên çavkaniyê bê guhertin tên parastin. Tu quiz, pirs an rahênana nû li vê dersê nehatiye zêdekirin.</p><div style="margin:16px 0;border:1px solid #d8ddd6;border-radius:12px;overflow:hidden"><iframe title="Vokalên O, U û Û" src="https://raw.githubusercontent.com/avasinim/zanztkurd/main/Dengnasiya_Zimane_Kurdi_27_Wane_corrected.pdf#page=321" loading="lazy" style="display:block;width:100%;height:76vh;min-height:620px;border:0" allow="fullscreen"></iframe></div><p><a href="https://raw.githubusercontent.com/avasinim/zanztkurd/main/Dengnasiya_Zimane_Kurdi_27_Wane_corrected.pdf#page=321" target="_blank" rel="noopener">Vekirina PDF-ê li rûpela 321 ↗</a></p></section>',now()),
('kurmanji-dengnasi-lesson-21.html','kurmanji-dengnasi-27','Hin mijarên taybet: dîftong û giranî','<section class="klesson-card"><h2>Çavkaniya bingehîn</h2><p>Ev ders ji çavkaniya Husein Muhammed, <em>Dengnasî di kurdî de</em>, hatiye. Rûpelên çapkirî: 315–347. Rûpelên PDF-ya sêwirandî: 339–371.</p><p>Metn, nimûne, tablo û wêneyên çavkaniyê bê guhertin tên parastin. Tu quiz, pirs an rahênana nû li vê dersê nehatiye zêdekirin.</p><div style="margin:16px 0;border:1px solid #d8ddd6;border-radius:12px;overflow:hidden"><iframe title="Hin mijarên taybet: dîftong û giranî" src="https://raw.githubusercontent.com/avasinim/zanztkurd/main/Dengnasiya_Zimane_Kurdi_27_Wane_corrected.pdf#page=339" loading="lazy" style="display:block;width:100%;height:76vh;min-height:620px;border:0" allow="fullscreen"></iframe></div><p><a href="https://raw.githubusercontent.com/avasinim/zanztkurd/main/Dengnasiya_Zimane_Kurdi_27_Wane_corrected.pdf#page=339" target="_blank" rel="noopener">Vekirina PDF-ê li rûpela 339 ↗</a></p></section>',now()),
('kurmanji-dengnasi-lesson-22.html','kurmanji-dengnasi-27','Nasandina KL û KE; cudahiyên herdu alfabeyan','<section class="klesson-card"><h2>Çavkaniya bingehîn</h2><p>Ev ders ji çavkaniya Husein Muhammed, <em>Dengnasî di kurdî de</em>, hatiye. Rûpelên çapkirî: 348–372. Rûpelên PDF-ya sêwirandî: 373–397.</p><p>Metn, nimûne, tablo û wêneyên çavkaniyê bê guhertin tên parastin. Tu quiz, pirs an rahênana nû li vê dersê nehatiye zêdekirin.</p><div style="margin:16px 0;border:1px solid #d8ddd6;border-radius:12px;overflow:hidden"><iframe title="Nasandina KL û KE; cudahiyên herdu alfabeyan" src="https://raw.githubusercontent.com/avasinim/zanztkurd/main/Dengnasiya_Zimane_Kurdi_27_Wane_corrected.pdf#page=373" loading="lazy" style="display:block;width:100%;height:76vh;min-height:620px;border:0" allow="fullscreen"></iframe></div><p><a href="https://raw.githubusercontent.com/avasinim/zanztkurd/main/Dengnasiya_Zimane_Kurdi_27_Wane_corrected.pdf#page=373" target="_blank" rel="noopener">Vekirina PDF-ê li rûpela 373 ↗</a></p></section>',now()),
('kurmanji-dengnasi-lesson-23.html','kurmanji-dengnasi-27','Cudahiyên dengnasî di navbera kurmancî û soranî de','<section class="klesson-card"><h2>Çavkaniya bingehîn</h2><p>Ev ders ji çavkaniya Husein Muhammed, <em>Dengnasî di kurdî de</em>, hatiye. Rûpelên çapkirî: 373–386. Rûpelên PDF-ya sêwirandî: 399–412.</p><p>Metn, nimûne, tablo û wêneyên çavkaniyê bê guhertin tên parastin. Tu quiz, pirs an rahênana nû li vê dersê nehatiye zêdekirin.</p><div style="margin:16px 0;border:1px solid #d8ddd6;border-radius:12px;overflow:hidden"><iframe title="Cudahiyên dengnasî di navbera kurmancî û soranî de" src="https://raw.githubusercontent.com/avasinim/zanztkurd/main/Dengnasiya_Zimane_Kurdi_27_Wane_corrected.pdf#page=399" loading="lazy" style="display:block;width:100%;height:76vh;min-height:620px;border:0" allow="fullscreen"></iframe></div><p><a href="https://raw.githubusercontent.com/avasinim/zanztkurd/main/Dengnasiya_Zimane_Kurdi_27_Wane_corrected.pdf#page=399" target="_blank" rel="noopener">Vekirina PDF-ê li rûpela 399 ↗</a></p></section>',now()),
('kurmanji-dengnasi-lesson-24.html','kurmanji-dengnasi-27','Cudahiyên dengnasî di navbera kurmancî û kurdiya başûrî de','<section class="klesson-card"><h2>Çavkaniya bingehîn</h2><p>Ev ders ji çavkaniya Husein Muhammed, <em>Dengnasî di kurdî de</em>, hatiye. Rûpelên çapkirî: 387–393. Rûpelên PDF-ya sêwirandî: 414–420.</p><p>Metn, nimûne, tablo û wêneyên çavkaniyê bê guhertin tên parastin. Tu quiz, pirs an rahênana nû li vê dersê nehatiye zêdekirin.</p><div style="margin:16px 0;border:1px solid #d8ddd6;border-radius:12px;overflow:hidden"><iframe title="Cudahiyên dengnasî di navbera kurmancî û kurdiya başûrî de" src="https://raw.githubusercontent.com/avasinim/zanztkurd/main/Dengnasiya_Zimane_Kurdi_27_Wane_corrected.pdf#page=414" loading="lazy" style="display:block;width:100%;height:76vh;min-height:620px;border:0" allow="fullscreen"></iframe></div><p><a href="https://raw.githubusercontent.com/avasinim/zanztkurd/main/Dengnasiya_Zimane_Kurdi_27_Wane_corrected.pdf#page=414" target="_blank" rel="noopener">Vekirina PDF-ê li rûpela 414 ↗</a></p></section>',now()),
('kurmanji-dengnasi-lesson-25.html','kurmanji-dengnasi-27','Cudahiyên dengnasî di navbera kurmancî û zazakî de','<section class="klesson-card"><h2>Çavkaniya bingehîn</h2><p>Ev ders ji çavkaniya Husein Muhammed, <em>Dengnasî di kurdî de</em>, hatiye. Rûpelên çapkirî: 394–401. Rûpelên PDF-ya sêwirandî: 422–429.</p><p>Metn, nimûne, tablo û wêneyên çavkaniyê bê guhertin tên parastin. Tu quiz, pirs an rahênana nû li vê dersê nehatiye zêdekirin.</p><div style="margin:16px 0;border:1px solid #d8ddd6;border-radius:12px;overflow:hidden"><iframe title="Cudahiyên dengnasî di navbera kurmancî û zazakî de" src="https://raw.githubusercontent.com/avasinim/zanztkurd/main/Dengnasiya_Zimane_Kurdi_27_Wane_corrected.pdf#page=422" loading="lazy" style="display:block;width:100%;height:76vh;min-height:620px;border:0" allow="fullscreen"></iframe></div><p><a href="https://raw.githubusercontent.com/avasinim/zanztkurd/main/Dengnasiya_Zimane_Kurdi_27_Wane_corrected.pdf#page=422" target="_blank" rel="noopener">Vekirina PDF-ê li rûpela 422 ↗</a></p></section>',now()),
('kurmanji-dengnasi-lesson-26.html','kurmanji-dengnasi-27','Cudahiyên dengnasî di navbera kurdî û tirkî de','<section class="klesson-card"><h2>Çavkaniya bingehîn</h2><p>Ev ders ji çavkaniya Husein Muhammed, <em>Dengnasî di kurdî de</em>, hatiye. Rûpelên çapkirî: 402–417. Rûpelên PDF-ya sêwirandî: 431–446.</p><p>Metn, nimûne, tablo û wêneyên çavkaniyê bê guhertin tên parastin. Tu quiz, pirs an rahênana nû li vê dersê nehatiye zêdekirin.</p><div style="margin:16px 0;border:1px solid #d8ddd6;border-radius:12px;overflow:hidden"><iframe title="Cudahiyên dengnasî di navbera kurdî û tirkî de" src="https://raw.githubusercontent.com/avasinim/zanztkurd/main/Dengnasiya_Zimane_Kurdi_27_Wane_corrected.pdf#page=431" loading="lazy" style="display:block;width:100%;height:76vh;min-height:620px;border:0" allow="fullscreen"></iframe></div><p><a href="https://raw.githubusercontent.com/avasinim/zanztkurd/main/Dengnasiya_Zimane_Kurdi_27_Wane_corrected.pdf#page=431" target="_blank" rel="noopener">Vekirina PDF-ê li rûpela 431 ↗</a></p></section>',now()),
('kurmanji-dengnasi-lesson-27.html','kurmanji-dengnasi-27','Cotdengiya Ç, K, P, T û rêgirtin di ser peyvan re','<section class="klesson-card"><h2>Çavkaniya bingehîn</h2><p>Ev ders ji çavkaniya Husein Muhammed, <em>Dengnasî di kurdî de</em>, hatiye. Rûpelên çapkirî: 418–432. Rûpelên PDF-ya sêwirandî: 448–462.</p><p>Metn, nimûne, tablo û wêneyên çavkaniyê bê guhertin tên parastin. Tu quiz, pirs an rahênana nû li vê dersê nehatiye zêdekirin.</p><div style="margin:16px 0;border:1px solid #d8ddd6;border-radius:12px;overflow:hidden"><iframe title="Cotdengiya Ç, K, P, T û rêgirtin di ser peyvan re" src="https://raw.githubusercontent.com/avasinim/zanztkurd/main/Dengnasiya_Zimane_Kurdi_27_Wane_corrected.pdf#page=448" loading="lazy" style="display:block;width:100%;height:76vh;min-height:620px;border:0" allow="fullscreen"></iframe></div><p><a href="https://raw.githubusercontent.com/avasinim/zanztkurd/main/Dengnasiya_Zimane_Kurdi_27_Wane_corrected.pdf#page=448" target="_blank" rel="noopener">Vekirina PDF-ê li rûpela 448 ↗</a></p></section>',now())
ON CONFLICT (lesson_key) DO NOTHING;

DO $$
DECLARE lesson_count integer;
BEGIN
  SELECT count(*) INTO lesson_count
  FROM public.lesson_content
  WHERE course_id='kurmanji-dengnasi-27';
  IF lesson_count <> 27 THEN
    RAISE EXCEPTION 'Expected 27 Dengnasi lessons, found %', lesson_count;
  END IF;
  IF EXISTS (
    SELECT 1 FROM public.lesson_content
    WHERE course_id='kurmanji-dengnasi-27'
      AND lesson_key !~ '^kurmanji-dengnasi-lesson-(0[1-9]|1[0-9]|2[0-7])\.html$'
  ) THEN
    RAISE EXCEPTION 'Unexpected Dengnasi lesson key found';
  END IF;
END $$;

CREATE OR REPLACE FUNCTION public.can_read_lesson_content(p_course_id text, p_lesson_key text)
 RETURNS boolean
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO ''
AS $function$
DECLARE
  uid uuid := auth.uid();
  lesson_order text[];
  lesson_index integer;
  completed_keys text[];
BEGIN
  IF uid IS NULL THEN RETURN false; END IF;
  IF public.is_site_owner() THEN RETURN true; END IF;

  IF NOT EXISTS (
    SELECT 1 FROM public.enrollments e
    WHERE e.user_id = uid
      AND e.course_id = p_course_id
      AND e.status IN ('active','completed')
  ) THEN
    RETURN false;
  END IF;

  IF p_course_id = 'phonetics-phonology-kurdik' THEN
    SELECT array_agg('course-2-' || lpad(n::text,2,'0') || '.html' ORDER BY n)
      INTO lesson_order FROM generate_series(1,32) AS g(n);
  ELSIF p_course_id = 'kurmanji-dengnasi-27' THEN
    SELECT array_agg('kurmanji-dengnasi-lesson-' || lpad(n::text,2,'0') || '.html' ORDER BY n)
      INTO lesson_order FROM generate_series(1,27) AS g(n);
  ELSIF p_course_id = 'kurmanji-course-1' THEN
    SELECT array_agg('kurmanji-course-1-lesson-' || lpad(n::text,2,'0') || '.html' ORDER BY n)
      INTO lesson_order FROM generate_series(1,26) AS g(n);
  ELSIF p_course_id = 'kurmanji-course-2' THEN
    SELECT array_agg('kurmanji-course-2-lesson-' || lpad(n::text,2,'0') || '.html' ORDER BY n)
      INTO lesson_order FROM generate_series(1,12) AS g(n);
  ELSIF p_course_id = 'orthography-kurdik' THEN
    lesson_order := ARRAY[
      '017.html','018.html','019.html','020.html','021.html','022.html','023.html','024.html',
      '025.html','026.html','027.html','028.html','029.html','030.html','031.html','032.html',
      '033.html','034.html','035.html','036.html','037.html','038.html','039.html','040.html',
      '041.html','042.html','043.html','044.html','046.html','047.html','048.html','049.html',
      '050.html','051.html','045.html','052.html','053.html','054.html','055.html','056.html',
      '057.html','058.html'
    ];
  ELSE
    RETURN false;
  END IF;

  lesson_index := array_position(lesson_order, p_lesson_key);
  IF lesson_index IS NULL THEN RETURN false; END IF;
  IF lesson_index = 1 THEN RETURN true; END IF;

  SELECT COALESCE(array_agg(lp.lesson_key), ARRAY[]::text[])
    INTO completed_keys
  FROM public.lesson_progress lp
  WHERE lp.user_id = uid AND lp.course_id = p_course_id;

  RETURN public.has_completed_lesson_prefix(completed_keys, lesson_order, lesson_index);
END;
$function$;


CREATE OR REPLACE FUNCTION public.complete_lesson(p_course_id text, p_lesson_key text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
DECLARE
  uid uuid := auth.uid();
  total_count integer;
  completed_count integer := 0;
  new_status text := 'active';
  lesson_order text[];
  lesson_index integer;
  completed_keys text[];
BEGIN
  IF uid IS NULL THEN RAISE EXCEPTION 'AUTH_REQUIRED'; END IF;

  IF NOT public.is_site_owner() AND NOT EXISTS (
    SELECT 1 FROM auth.users u
    WHERE u.id = uid AND (u.email_confirmed_at IS NOT NULL OR u.phone_confirmed_at IS NOT NULL)
  ) THEN RAISE EXCEPTION 'EMAIL_NOT_VERIFIED'; END IF;

  IF p_course_id = 'phonetics-phonology-kurdik' THEN
    SELECT array_agg('course-2-' || lpad(n::text,2,'0') || '.html' ORDER BY n)
      INTO lesson_order FROM generate_series(1,32) AS g(n);
  ELSIF p_course_id = 'kurmanji-dengnasi-27' THEN
    SELECT array_agg('kurmanji-dengnasi-lesson-' || lpad(n::text,2,'0') || '.html' ORDER BY n)
      INTO lesson_order FROM generate_series(1,27) AS g(n);
  ELSIF p_course_id = 'kurmanji-course-1' THEN
    SELECT array_agg('kurmanji-course-1-lesson-' || lpad(n::text,2,'0') || '.html' ORDER BY n)
      INTO lesson_order FROM generate_series(1,26) AS g(n);
  ELSIF p_course_id = 'kurmanji-course-2' THEN
    SELECT array_agg('kurmanji-course-2-lesson-' || lpad(n::text,2,'0') || '.html' ORDER BY n)
      INTO lesson_order FROM generate_series(1,12) AS g(n);
  ELSIF p_course_id = 'orthography-kurdik' THEN
    lesson_order := ARRAY[
      '017.html','018.html','019.html','020.html','021.html','022.html','023.html','024.html',
      '025.html','026.html','027.html','028.html','029.html','030.html','031.html','032.html',
      '033.html','034.html','035.html','036.html','037.html','038.html','039.html','040.html',
      '041.html','042.html','043.html','044.html','046.html','047.html','048.html','049.html',
      '050.html','051.html','045.html','052.html','053.html','054.html','055.html','056.html',
      '057.html','058.html'
    ];
  ELSE
    RAISE EXCEPTION 'COURSE_NOT_FOUND';
  END IF;

  lesson_index := array_position(lesson_order, p_lesson_key);
  IF lesson_index IS NULL THEN RAISE EXCEPTION 'INVALID_LESSON'; END IF;

  IF NOT EXISTS (
    SELECT 1 FROM public.enrollments e
    WHERE e.user_id = uid AND e.course_id = p_course_id AND e.status IN ('active','completed')
  ) AND NOT public.is_site_owner() THEN
    RAISE EXCEPTION 'NOT_ENROLLED';
  END IF;

  IF lesson_index > 1 AND (p_course_id = 'orthography-kurdik' OR NOT public.is_site_owner()) THEN
    SELECT COALESCE(array_agg(lp.lesson_key), ARRAY[]::text[])
      INTO completed_keys
    FROM public.lesson_progress lp
    WHERE lp.user_id = uid AND lp.course_id = p_course_id;

    IF NOT public.has_completed_lesson_prefix(completed_keys, lesson_order, lesson_index) THEN
      RAISE EXCEPTION 'PREVIOUS_LESSON_REQUIRED';
    END IF;
  END IF;

  INSERT INTO public.lesson_progress(user_id, course_id, lesson_key, completed_at)
  VALUES (uid, p_course_id, p_lesson_key, now())
  ON CONFLICT (user_id, course_id, lesson_key)
  DO UPDATE SET completed_at = EXCLUDED.completed_at;

  SELECT c.total_lessons INTO total_count FROM public.courses c WHERE c.id = p_course_id;

  IF p_course_id IN ('phonetics-phonology-kurdik','kurmanji-course-1','kurmanji-course-2','kurmanji-dengnasi-27') THEN
    SELECT count(*) INTO completed_count
    FROM public.lesson_progress lp
    WHERE lp.user_id = uid AND lp.course_id = p_course_id
      AND lp.lesson_key = ANY(lesson_order);
  ELSE
    SELECT count(*) INTO completed_count
    FROM public.lesson_progress lp
    WHERE lp.user_id = uid AND lp.course_id = p_course_id
      AND lp.lesson_key = ANY(ARRAY[
        '017.html','018.html','019.html','020.html','021.html','022.html','023.html',
        '024.html','025.html','026.html','027.html','028.html','029.html','030.html',
        '031.html','032.html','033.html','034.html','035.html','036.html','037.html'
      ]);

    IF (SELECT count(*) FROM public.lesson_progress lp WHERE lp.user_id=uid AND lp.course_id=p_course_id
      AND lp.lesson_key=ANY(ARRAY['038.html','039.html','040.html','041.html','042.html','043.html','044.html']))=7
      THEN completed_count := completed_count + 1; END IF;
    IF (SELECT count(*) FROM public.lesson_progress lp WHERE lp.user_id=uid AND lp.course_id=p_course_id
      AND lp.lesson_key=ANY(ARRAY['046.html','047.html','048.html','049.html','050.html','051.html']))=6
      THEN completed_count := completed_count + 1; END IF;
    IF EXISTS(SELECT 1 FROM public.lesson_progress lp WHERE lp.user_id=uid AND lp.course_id=p_course_id AND lp.lesson_key='045.html')
      THEN completed_count := completed_count + 1; END IF;
    IF (SELECT count(*) FROM public.lesson_progress lp WHERE lp.user_id=uid AND lp.course_id=p_course_id
      AND lp.lesson_key=ANY(ARRAY['052.html','053.html','054.html','055.html','056.html','057.html']))=6
      THEN completed_count := completed_count + 1; END IF;
    IF EXISTS(SELECT 1 FROM public.lesson_progress lp WHERE lp.user_id=uid AND lp.course_id=p_course_id AND lp.lesson_key='058.html')
      THEN completed_count := completed_count + 1; END IF;
  END IF;

  IF completed_count >= total_count THEN
    new_status := 'completed';
    UPDATE public.enrollments SET status='completed', completed_at=COALESCE(completed_at, now())
    WHERE user_id=uid AND course_id=p_course_id;
  END IF;

  RETURN jsonb_build_object('status', new_status, 'completed_count', completed_count,
    'total_lessons', total_count, 'course_completed', (new_status='completed'));
END;
$function$


REVOKE ALL ON FUNCTION public.can_read_lesson_content(text,text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.can_read_lesson_content(text,text) TO authenticated;
REVOKE ALL ON FUNCTION public.complete_lesson(text,text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.complete_lesson(text,text) TO authenticated;

COMMIT;
