#!/usr/bin/env python3
"""Validate the 27-lesson source map, generated previews, PDF pages and protected reader routes."""
from __future__ import annotations

import hashlib
import json
import re
from pathlib import Path

from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[1]
manifest = json.loads((ROOT / "docs/kurmanji-dengnasi-course.json").read_text(encoding="utf-8"))
payload = json.loads((ROOT / "docs/previews/dengnasi-content-html-payload-preview.json").read_text(encoding="utf-8"))
source = (ROOT / "docs/KURMANJI-DENGNASI-LESSON-AUTHORING.md").read_text(encoding="utf-8")
assert not re.search(r"[\u0600-\u06FF]", source), "Arabic-script text found in authoring source"
assert not re.search(r"[\u0400-\u04FF]", source), "Cyrillic-script text found in authoring source"
hold_page = (ROOT / "kurmanji-dengnasi-course.html").read_text(encoding="utf-8")
reader = (ROOT / "kurmanji-dengnasi-reader.html").read_text(encoding="utf-8")

pdf = manifest["designedPdf"]
pdf_path = ROOT / pdf["repositoryPath"]
assert pdf["pdfPages"] == 462, "designed PDF page count must remain 462"
assert pdf_path.is_file(), "designed PDF is missing from the repository tree"
assert pdf_path.stat().st_size > 1_000_000, "designed PDF appears incomplete"
actual_sha256 = hashlib.sha256(pdf_path.read_bytes()).hexdigest()
assert actual_sha256 == pdf["sha256"], f"designed PDF SHA-256 mismatch: {actual_sha256}"
actual_pages = len(PdfReader(str(pdf_path)).pages)
assert actual_pages == pdf["pdfPages"], f"designed PDF page count mismatch: expected {pdf['pdfPages']}, got {actual_pages}"
assert pdf["repositoryUrl"].startswith("https://github.com/avasinim/zanztkurd/blob/main/"), "missing canonical GitHub PDF URL"
assert pdf["rawUrl"].startswith("https://raw.githubusercontent.com/avasinim/zanztkurd/main/"), "missing raw PDF URL"

lessons = manifest["lessons"]
assert len(lessons) == 27, f"expected 27 lessons, got {len(lessons)}"
assert [lesson["number"] for lesson in lessons] == list(range(1, 28)), "lesson numbering is not sequential"
assert len({lesson["id"] for lesson in lessons}) == 27, "lesson IDs must be unique"
assert payload.get("lesson_count") == 27 and len(payload.get("lessons", [])) == 27, "generated payload must contain exactly 27 lessons"

source_headings = list(re.finditer(r"(?m)^# Dersa (\d+) — (.+)$", source))
assert len(source_headings) == 27, f"expected 27 authoring headings, got {len(source_headings)}"
assert [int(match.group(1)) for match in source_headings] == list(range(1, 28)), "authoring lesson headings are not sequential"

printed_ranges = []
original_ranges = []
for index, lesson in enumerate(lessons):
    number = lesson["number"]
    printed = lesson["printedPages"]
    original = lesson["originalPdfPages"]
    designed = lesson["designedPdfPages"]
    assert printed["start"] <= printed["end"], f"invalid printed-page range in lesson {number}"
    assert original["start"] <= original["end"], f"invalid original-PDF range in lesson {number}"
    assert designed["start"] <= designed["end"], f"invalid designed-PDF range in lesson {number}"
    printed_ranges.append(printed)
    original_ranges.append(original)

    offset = pdf["frontMatterPages"] + number
    assert designed["start"] == original["start"] + offset, f"designed start page mismatch in lesson {number}"
    assert designed["end"] == original["end"] + offset, f"designed end page mismatch in lesson {number}"

    section_end = source_headings[index + 1].start() if index + 1 < len(source_headings) else len(source)
    section = source[source_headings[index].start():section_end]
    citation = re.search(
        r"Husein Muhammed, \*Dengnasî di kurdî de\*, rûpelên çapkirî (?:\*\*)?(\d+)–(\d+)(?:\*\*)?",
        section,
    )
    assert citation, f"missing source citation for lesson {number}"
    assert printed == {"start": int(citation.group(1)), "end": int(citation.group(2))}, (
        f"printed source-page citation mismatch in lesson {number}"
    )

    payload_lesson = payload["lessons"][index]
    assert payload_lesson["number"] == number, f"payload lesson ordering mismatch at {number}"
    assert payload_lesson["id"] == lesson["id"], f"payload lesson ID mismatch at {number}"
    assert payload_lesson["printed_pages"] == printed, f"payload printed-page range mismatch in lesson {number}"
    assert payload_lesson["original_pdf_pages"] == original, f"payload original-PDF range mismatch in lesson {number}"
    assert payload_lesson["designed_pdf_pages"] == designed, f"payload designed-PDF range mismatch in lesson {number}"
    assert payload_lesson["lesson_key"] == f"kurmanji-dengnasi-lesson-{number:02}.html", f"payload route mismatch in lesson {number}"
    assert payload_lesson["content_html"].strip(), f"empty payload content in lesson {number}"

    preview_path = ROOT / "docs" / "previews" / f"kurmanji-dengnasi-lesson-{number:02}-content-preview.html"
    assert preview_path.is_file(), f"missing generated HTML preview for lesson {number}"
    preview_html = preview_path.read_text(encoding="utf-8")
    assert '<section class="klesson-preview" lang="ku" dir="ltr">' in preview_html, f"preview language/direction mismatch in lesson {number}"
    payload_body = payload_lesson["content_html"].split("</style>", 1)[1].rsplit("</section>", 1)[0].strip()
    preview_body = preview_html.split("</header>", 1)[1].rsplit("</section>", 1)[0].strip()
    assert payload_body == preview_body, f"preview/payload body mismatch in lesson {number}"
    assert not re.search(r"[\u0600-\u06FF]", preview_html), f"Arabic-script text found in lesson {number}"
    assert not re.search(r"[\u0400-\u04FF]", preview_html), f"Cyrillic-script text found in lesson {number}"
    assert "iframe" not in preview_html.lower(), f"PDF iframe unexpectedly embedded in lesson {number}"

for label, ranges in (("printed source", printed_ranges), ("original PDF", original_ranges)):
    for previous, current in zip(ranges, ranges[1:]):
        assert current["start"] == previous["end"] + 1, f"{label} page ranges are not contiguous"

assert lessons[13]["printedPages"] == {"start": 168, "end": 186}, "Lesson 14 printed-page citation mismatch"
assert lessons[13]["originalPdfPages"] == {"start": 168, "end": 186}, "Lesson 14 original-PDF range mismatch"
assert lessons[14]["printedPages"] == {"start": 187, "end": 202}, "Lesson 15 printed-page citation mismatch"
assert lessons[15]["title"] == "Dengên V, W, X, Y û Z", "Lesson 16 title must include source section X"
assert "- **-RC, -RÇ, -RD, -RF, -RG, -RM, -RN, -RŞ, -RS, -RX, -RZ**" in source, "Lesson 17 is missing source cluster -RŞ"
assert "*ferş, merş, marş*" in source, "Lesson 17 is missing source examples for cluster -RŞ"

lesson4_match = re.search(r"(?ms)^# Dersa 4 —.*?(?=^# Dersa 5 —)", source)
assert lesson4_match, "Lesson 4 authoring section is missing"
lesson4 = lesson4_match.group(0)
for required in (
    "*șed, mișaș*",
    "*ẓivișṭan, beẓîn, beẓ*",
    "*berdan* di hin devokan de",
    "zan, zer, hezar",
    "zayîden, zerd, hezar",
    "ẓana, ẓava",
    "dana, damad",
    "ba/bad",
    "bû/bûd",
    "nav/nam",
    "gav/gam",
    "p’ê, p’êç’an/pêç’an, p’êk",
    "pênc [pênc]",
    "perde [ṕerde]",
    "pez [ṗez]",
    "*zivistan* [ẓivișṭan]",
):
    assert required in lesson4, f"Lesson 4 is missing source-backed detail: {required}"
assert "*ṣed, miṣaṣ*" not in lesson4, "Lesson 4 legacy S transcription must be corrected"
assert "*ẓiviṣṭan, beẓîn, beẓ*" not in lesson4, "Lesson 4 legacy Ẓ example transcription must be corrected"

lesson22_match = re.search(r"(?ms)^# Dersa 22 —.*?(?=^# Dersa 23 —)", source)
assert lesson22_match, "Lesson 22 authoring section is missing"
lesson22 = lesson22_match.group(0)
for required in (
    "L-ya qelew",
    "*welat*",
    "*sal*",
    "*wê salê*",
    "*sala 2013*",
    "*milet*",
    "*mela*",
    "herfa **ł**",
    "du L bên nivîsîn",
    "yek L tercîh dike",
    "heywan",
    "kesê ku baş nabihîze",
    "*Ew kerr e*",
):
    assert required in lesson22, f"Lesson 22 is missing source-backed detail: {required}"
assert "K-ya bipif û R-ya nerm" in lesson22, "Lesson 22 animal ker pronunciation contrast is missing"
assert "K-ya nerm û R-ya şidandî" in lesson22, "Lesson 22 deaf ker pronunciation contrast is missing"

lesson26_match = re.search(r"(?ms)^# Dersa 26 —.*?(?=^# Dersa 27 —)", source)
assert lesson26_match, "Lesson 26 authoring section is missing"
lesson26 = lesson26_match.group(0)
for required in (
    "beran, erzan",
    "bi taybetî di peyvên ji erebî wergirtî de",
    "di beramberî ermeniyan de bûne gelê kêmîne",
    "BL, BR, FL, FR, KL, KR, PS, KST",
    "blond, Brîtanya, flora, Fransa, klasîk, krîz, psîkolojî, tekst",
    "karîn/kanîn, law, savar, aman, xaç",
    "*çi, ker* û *ti/tu*",
    "îspatkirina hebûn an nebûna wê diyardeyê",
):
    assert required in lesson26, f"Lesson 26 is missing source-backed detail: {required}"
assert "berî vokalên **A û O**" in lesson26, "Lesson 26 Turkish K scope must remain A/O"
assert "berî vokalên paşîn **A, I, O, U**" not in lesson26, "Lesson 26 overgeneralizes the Turkish K scope"

lesson5_match = re.search(r"(?ms)^# Dersa 5 —.*?(?=^# Dersa 6 —)", source)
assert lesson5_match, "Lesson 5 authoring section is missing"
lesson5 = lesson5_match.group(0)
for required in ("*waN kesaN*", "*wa kesa*", "*kitêbêN miN*", "*kitêbê mi*", "*kitêbêT mi[N]*", "*kitêbêD mi[N]*", "53 001", "100,43%"):
    assert required in lesson5, f"Lesson 5 is missing source detail or discrepancy note: {required}"
assert "| E | 11,6% | 6 121 |" in lesson5 and "| F | 0,26% | 138 |" in lesson5, "Lesson 5 letter-frequency table endpoints are missing"
lesson6_match = re.search(r"(?ms)^# Dersa 6 —.*?(?=^# Dersa 7 —)", source)
assert lesson6_match, "Lesson 6 authoring section is missing"
lesson6 = lesson6_match.group(0)
for required in ("Urdin/Ûrdin", "gwêz=gûz", "xwa.ri.na", "alîstin, ristin", "ḥefs, ḥeps, hevs", "zeft, zept, zevt", "plica vocalis", "Pêraweja 42", "| CVCC | *dest* | *da.girt* | *da.ne.xist* |", "| Bilerz | b | d | g | z | j | v | c | ẍ |"):
    assert required in lesson6, f"Lesson 6 is missing restored source detail: {required}"
assert "rûpelên çapkirî 44–55" in lesson6, "Lesson 6 source citation mismatch"

assert "krdn" in lesson6 and "kirdin" in lesson6, "Lesson 6 Persian-script short-vowel example is missing"
assert "`*dezt, *hevt, *teẍt*`" in lesson6, "Lesson 6 mixed-voicing counterexamples are missing"
assert "`Tag/Täge`" in lesson6, "Lesson 6 German final-devoicing comparison is missing"
lesson7_match = re.search(r"(?ms)^# Dersa 7 —.*?(?=^# Dersa 8 —)", source)
assert lesson7_match, "Lesson 7 authoring section is missing"
lesson7 = lesson7_match.group(0)
for required in (
    "*ad*",
    "*leyîstin, lehîstin, axaftin*",
    "*futbol*",
    "*jinbab/jinbav*",
    "*dergistî*",
    "*himban*",
    "*eşte-*",
    "*neve-*",
    "*new*",
    "*noh*",
    "*heşt/heyşt*",
    "*lo*",
    "*jo*",
    "*hindir/hundir*",
    "*tê ve*",
    "*bin/ban*",
):
    assert required in lesson7, f"Lesson 7 is missing source note/example: {required}"
assert "| Ziman | bi | di | ji | li |" in lesson7, "Lesson 7 preposition comparison table is missing"
assert "| Ziman | de / da | re / ra | ve / va |" in lesson7, "Lesson 7 postposition comparison table is missing"

lesson8_match = re.search(r"(?ms)^# Dersa 8 —.*?(?=^# Dersa 9 —)", source)
assert lesson8_match, "Lesson 8 authoring section is missing"
lesson8 = lesson8_match.group(0)
for required in (
    "*wefr*",
    "*vewre*",
    "*gebhre*",
    "*vinçatî-*",
    "*ḥeb, ḥev, ḥew*",
    "*latînî ferre*",
    "*bher-*",
    "*derî/dergeh*",
    "*dîtin/bînan*",
    "*yihûdî → yihûd/cehûd → cohûd → cihû*",
    "*Yêşûa → Iesus → Jésus → Jesus*",
    "*gamêş/gavmîş/camûs/gawmêş*",
    "*jîn/cenî/zen/cêni-*",
    "*jiyan-ciwayen-zindegî-cey-*",
    "*diya min → ca min*",
    "*pêncî, pêncem, pêncê, pêncan, pênca*",
    "*centum* [kêntum]",
    "*badem/bahîv/behîv/be’îv/ba’îv*",
    "*tinûru*",
):
    assert required in lesson8, f"Lesson 8 is missing source note/example: {required}"
assert "| Kurmancî | Farisî | Pehlewî | Avestayî | Sanskrîtî |" in lesson8, "Lesson 8 C historical table is missing"
assert "| cuda, cihê, ciya | coda | cudî | yuta- | — |" in lesson8, "Lesson 8 C/J/Z historical table is incomplete"
assert "Di pêraweja 69 de" in lesson8, "Lesson 8 B clitic footnote is missing"

lesson9_match = re.search(r"(?ms)^# Dersa 9 —.*?(?=^# Dersa 10 —)", source)
assert lesson9_match, "Lesson 9 authoring section is missing"
lesson9 = lesson9_match.group(0)
for required in (
    "*funduq*",
    "*felsefe*",
    "*pandokeîon*",
    "*philosophîa*",
    "*p-l-h*",
    "*pale*",
    "*kolah, kohen/kohnê*",
    "*rewag/rewac*",
    "*gwem-*",
    "*gimti*",
    "*come* ya îngilîzî wek *kam*",
    "*göç, göçer*",
    "*qenc/genc*",
    "Feylî, Kelhurî û Kirmaşanî",
):
    assert required in lesson9, f"Lesson 9 is missing source note/example: {required}"
assert "| Kurmancî | Farisî | Pehlewî | Avestayî |" in lesson9, "Lesson 9 F/P comparison table is missing"
assert "| Yûnaniya kevn | — | baru | — |" in lesson9, "Lesson 9 historical G comparison table is incomplete"
assert "ketina C/G/D ji dawiya peyvê" in lesson9, "Lesson 9 source footnote 81 is missing"

lesson25_match = re.search(r"(?ms)^# Dersa 25 —.*?(?=^# Dersa 26 —)", source)
assert lesson25_match, "Lesson 25 authoring section is missing"
lesson25 = lesson25_match.group(0)
for required in (
    "*stran*",
    "*studyo*",
    "*şkeft / eşkewt*",
    "*spî*",
    "*şkandin*",
    "*çar*",
    "*çaw*",
    "*çwar*",
    "*deh / de*",
    "*reh, rih / reg, rîş*",
    "*pehn / pan*",
    "*tehl / tał*",
    "*bêhn / bon*",
    "*hesp, hêsan, hejmartin, hesin / esp, asan, jimardin, asin*",
    "*war / hewar*",
    "*erd / herd, ’erz*",
    "*diçîne / deçênê*",
    "*dinivîse / denûsê*",
    "*belê / bełê*",
    "*hilbijartin / hełbijardin*",
    "*mał → mar*",
    "*xwedî, xwedan / xudan, xweyî / xawen*",
    "*xwendin, xwandin / xwêndin*",
    "*cento* [çênto]",
    "*cinque* [çînkwê]",
    "*kʷis*",
    "*qui* [kî]",
):
    assert required in lesson25, f"Lesson 25 is missing source detail: {required}"
assert "K ya kurmancî li hember H ya zazakî ye" in lesson25, "Lesson 25 K/H comparison is missing"
assert "xeletî" in lesson25 and "K/H" in lesson25, "Lesson 25 source inconsistency note is missing"

lesson2_match = re.search(r"(?ms)^# Dersa 2 —.*?(?=^# Dersa 3 —)", source)
assert lesson2_match, "Lesson 2 authoring section is missing"
lesson2 = lesson2_match.group(0)
for required in (
    "[ʔ]** di IPA",
    "*’Elî, ’Emer, ’Arif, ’erd, ’esman*",
    "*plica vocalis*",
    "neynik an cama ku mirov xwe tê re dibîne",
    "*pidî, pûk, pok*",
    "*diran, dan, digan*",
):
    assert required in lesson2, f"Lesson 2 is missing source footnote detail: {required}"

lesson3_match = re.search(r"(?ms)^# Dersa 3 —.*?(?=^# Dersa 4 —)", source)
assert lesson3_match, "Lesson 3 authoring section is missing"
lesson3 = lesson3_match.group(0)
for required in (
    "*out* wek [awt]",
    "O dengê [a] û U dengê [w]",
    "rastnivîsîna kurdî bi gelemperî du vokal li pey hev qebûl nake",
    "R-ya şidandî bi [r] û R-ya sist bi [ɾ]",
    "*ser* û *sed*",
    "*axa* (serokeşîr), *bax* û *oxir / wexer*",
    "*silav* û *lazim*",
    "*belem* û *lepik*",
    "Ç-ya bipif di soranî, farisî, tirkî û îngilîzî",
    "K-ya destpêka peyvê di soranî, farisî, erebî, tirkî û îngilîzî",
    "*pind* wek nimûneyeke kêm",
    "*ta* (ben / germayî), *tam* (çêj / temamî) û *tu*",
):
    assert required in lesson3, f"Lesson 3 is missing source-backed detail: {required}"

lesson23_match = re.search(r"(?ms)^# Dersa 23 —.*?(?=^# Dersa 24 —)", source)
assert lesson23_match, "Lesson 23 authoring section is missing"
lesson23 = lesson23_match.group(0)
for required in (
    "*hevde* (17)",
    "*kat*",
    "*gehandin / gehiştin*",
    "*ez têm / tînim*",
    "devokên mukrî û hewlêrî",
    "devokên silêmanî û kerkûkî",
    "*cento* [çênto]",
    "*cinque* [çînkwê]",
    "*dijûn*",
    "sixêr, xeber",
    "denge-h-peydabun-u-guherina-wi",
):
    assert required in lesson23, f"Lesson 23 is missing source note/example: {required}"

lesson27_match = re.search(r"(?ms)^# Dersa 27 —.*$", source)
assert lesson27_match, "Lesson 27 authoring section is missing"
lesson27 = lesson27_match.group(0)
for required in (
    "di nêzîkî sedsalekê de",
    "naelimînin",
    "Haîtî",
    "meaş, seat",
    "tîpa kelijandinê",
    "du-y-em, du-w-em",
    "hevalînî",
    "kitêban, bajaran",
    "yûnaniya kevn",
    "helbestan",
    "rûpela 422ê",
    "automat, autonom",
    "iade, idia",
    "îade, îdîa",
    "diore",
    "Ewropa, ewro",
    "dijî + e",
    "du kurda dibînim",
):
    assert required in lesson27, f"Lesson 27 is missing source-backed detail: {required}"
assert "| Koma vokalan |" in lesson27 and "| (AE) |" in lesson27, "Lesson 27 vowel-combination table is incomplete"
assert "li ber kelijandinê" in lesson27, "Lesson 27 must distinguish hiatus prevention from linking terminology"
assert lessons[14]["originalPdfPages"] == {"start": 187, "end": 202}, "Lesson 15 original-PDF range mismatch"
assert lessons[14].get("dividerPage") == 204, "Lesson 15 designed-PDF divider must be documented"
assert lessons[13]["designedPdfPages"]["end"] + 1 == lessons[14]["dividerPage"], "Lesson 15 divider must immediately follow Lesson 14"
assert lessons[14]["dividerPage"] + 1 == lessons[14]["designedPdfPages"]["start"], "Lesson 15 content must immediately follow its divider"
assert pdf["pdfPages"] == manifest["source"]["printedPages"] + pdf["frontMatterPages"] + pdf["lessonDividerPages"], "designed PDF page total does not reconcile"

assert 'name="robots" content="noindex,nofollow"' in hold_page, "course hold page must remain non-indexable"
assert "لە ئامادەکردندایە" in hold_page, "course must remain explicitly under preparation"
assert "Dengnasiya_Zimane_Kurdi_27_Wane_corrected.pdf" not in hold_page, "hold page must not expose a PDF/course activation link"

assert 'name="robots" content="noindex,nofollow"' in reader, "reader route must remain non-indexable until activation"
assert "const lessons=" in reader, "reader does not embed its lesson navigation data"
reader_match = re.search(r"const lessons=(\[.*?\]);\s*const params=", reader, re.S)
assert reader_match, "reader lesson array or query-route parser is missing"
reader_lessons = json.loads(reader_match.group(1))
assert len(reader_lessons) == 27, "reader must expose exactly 27 lesson routes"
for index, lesson in enumerate(lessons):
    embedded = reader_lessons[index]
    assert embedded["number"] == lesson["number"] and embedded["id"] == lesson["id"], "reader lesson identity mismatch"
    assert embedded["title"] == source_headings[index].group(2).strip() == lesson["title"], (
        f"reader/authoring/manifest title mismatch in lesson {lesson['number']}"
    )
    assert embedded["printedPages"] == lesson["printedPages"], f"reader printed-page range mismatch in lesson {lesson['number']}"
    assert embedded["originalPdfPages"] == lesson["originalPdfPages"], f"reader original-PDF range mismatch in lesson {lesson['number']}"
    assert embedded["designedPdfPages"] == lesson["designedPdfPages"], f"reader designed-PDF range mismatch in lesson {lesson['number']}"
assert 'params.get("lesson")' in reader, "reader does not read the requested lesson"
assert 'id="lessonIndex"' in reader, "reader lesson index is missing"
assert 'id="prevLesson"' in reader and 'id="nextLesson"' in reader, "reader previous/next navigation controls missing"
assert "raw.githubusercontent.com/avasinim/zanztkurd/main/Dengnasiya_Zimane_Kurdi_27_Wane_corrected.pdf" in reader, "reader PDF source URL missing"
assert not any(token in reader.lower() for token in ('id="quiz"', 'id="quiz-container"', 'id="quiz-question"')), "unexpected quiz UI added"

for number in range(1, 28):
    lesson_path = ROOT / "lessons" / f"kurmanji-dengnasi-lesson-{number:02}.html"
    assert lesson_path.is_file(), f"missing protected lesson route for lesson {number}"
    lesson_html = lesson_path.read_text(encoding="utf-8")
    canonical_title = source_headings[number - 1].group(2).strip()
    assert f"<title>Ders {number} — {canonical_title} | Dengnasîya Zimanê Kurdî</title>" in lesson_html, (
        f"standalone page title mismatch in lesson {number}"
    )
    h1_match = re.search(r"<h1[^>]*>(.*?)</h1>", lesson_html, re.S)
    assert h1_match, f"standalone lesson H1 missing in lesson {number}"
    h1_text = re.sub(r"<[^>]+>", "", h1_match.group(1)).strip()
    assert h1_text == canonical_title, f"standalone page H1 mismatch in lesson {number}"

print("PASS: PDF integrity; 27 source citations; distinct printed/original/designed page maps; generated HTML/payload parity; authoring/manifest/reader/standalone-title parity; protected 27-lesson reader routing; course remains held and non-indexable.")


# Lesson 10 source-audit assertions (printed pp. 116–132)
lesson10_match = re.search(r"(?ms)^# Dersa 10 —.*?(?=^# Dersa 11 —)", source)
assert lesson10_match, "Lesson 10 authoring section is missing"
lesson10 = lesson10_match.group(0)
for required in ("pêçêbûn û jêhatin", "bi wateya sûk an bazarê", "bazara sergirtî", "hevbera îngilîzî *hall*", "*ḧesin* (li hember *asin*)", "*ser* ji *ḱér*", "*spî* ji *ḱweyt-*", "*sed* ji *ḱm̥tóm*", "*rêt*; ne *rijt*"):
    assert required in lesson10, f"Lesson 10 is missing source detail: {required}"
assert "rûpelên çapkirî 116–132" in lesson10, "Lesson 10 source citation mismatch"


lesson11_match = re.search(r"(?ms)^# Dersa 11 —.*?(?=^# Dersa 12 —)", source)
assert lesson11_match, "Lesson 11 authoring section is missing"
lesson11 = lesson11_match.group(0)
for required in (
    "Pêraweja 103", "Pêraweja 104", "Pêraweja 105", "Pêraweja 106", "Pêraweja 107", "Pêraweja 108",
    "*que*", "*cuanto*", "*köç*", "*göç*", "*vulpes*", "*alopêks*", "*urupis*",
    "*zered-*", "*nemeh-*", "*nimac*", "*enoeşe-*", "*li, lê*", "*në*", "*Qurdistan*", "*kenc*",
    "| Proto-hindûewropî | Kurmancî | Farisî | Latînî | Îngilîzî |",
    "| Avestayî | *zered-* | *veridhe-* | *berez(+ent-)* |",
):
    assert required in lesson11, f"Lesson 11 is missing source-backed detail: {required}"
assert "https://en.wikipedia.org/wiki/File/" not in lesson11, "Lesson 11 must not add audio dependencies"
assert "pêraweja 103" in lesson11.lower() and "pêraweja 108" in lesson11.lower(), "Lesson 11 source footnote coverage is incomplete"

assert "| *ka* | Li kû ye? | *ka* | Giyayê hişkkirî |" in lesson11, "Lesson 11 K aspiration minimal-pair table is missing"


lesson12_match = re.search(r"(?ms)^# Dersa 12 —.*?(?=^# Dersa 13 —)", source)
assert lesson12_match, "Lesson 12 authoring section is missing"
lesson12 = lesson12_match.group(0)
for required in (
    "rûpelên çapkirî 147–154", "Pêraweja 109", "Pêraweja 110", "Pêraweja 111", "Pêraweja 112",
    "*name*", "*nomen*", "*gamen-*", "*come*", "*gendom*", "*gentum*", "*cendum*",
    "*ziban*", "*uzvan*", "*cihve-*", "*nwêj*", "*nûstin*", "*ena*", "*ên*", "*ën*",
    "Feylî, Kelhurî û Kirmaşanî",
):
    assert required in lesson12, f"Lesson 12 is missing source detail: {required}"
assert "https://en.wikipedia.org/wiki/File/" not in lesson12, "Lesson 12 must not add audio dependencies"
