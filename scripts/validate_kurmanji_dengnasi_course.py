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
    "îade, idia",
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
