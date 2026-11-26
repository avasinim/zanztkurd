#!/usr/bin/env python3
"""Validate the source map and static reader wiring for the 27-lesson course."""
from __future__ import annotations

import hashlib
import json
import re
from pathlib import Path

from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[1]
manifest = json.loads((ROOT / "docs/kurmanji-dengnasi-course.json").read_text(encoding="utf-8"))
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
preview = (ROOT / "kurmanji-dengnasi-course.html").read_text(encoding="utf-8")
reader = (ROOT / "kurmanji-dengnasi-reader.html").read_text(encoding="utf-8")
lessons = manifest["lessons"]

assert len(lessons) == 27, f"expected 27 lessons, got {len(lessons)}"
assert [lesson["number"] for lesson in lessons] == list(range(1, 28)), "lesson numbering is not sequential"
assert len({lesson["id"] for lesson in lessons}) == 27, "lesson IDs must be unique"

for previous, current in zip(lessons, lessons[1:]):
    assert current["printedPages"]["start"] == previous["printedPages"]["end"] + 1, "source page ranges must be contiguous"

for lesson in lessons:
    printed = lesson["printedPages"]
    original = lesson["originalPdfPages"]
    designed = lesson["designedPdfPages"]
    assert printed == original, f"source page mismatch in lesson {lesson['number']}"
    assert printed["start"] <= printed["end"], f"invalid source range in lesson {lesson['number']}"
    assert designed["start"] <= designed["end"], f"invalid designed range in lesson {lesson['number']}"
    offset = pdf["frontMatterPages"] + lesson["number"]
    assert designed["start"] == printed["start"] + offset, f"designed start page mismatch in lesson {lesson['number']}"
    expected_end = printed["end"] + offset
    assert designed["end"] == expected_end, f"designed end page mismatch in lesson {lesson['number']}"
    if lesson["number"] == 14:
        assert printed == {"start": 168, "end": 185}, "Lesson 14 must end at printed source page 185"
        assert designed == {"start": 185, "end": 202}, "Lesson 14 must end at designed PDF page 202"
    if lesson["number"] == 15:
        assert printed == {"start": 186, "end": 202}, "Lesson 15 must begin at printed source page 186"
        assert designed == {"start": 204, "end": 220}, "Lesson 15 must begin at designed PDF page 204"
        assert lesson.get("dividerPage") == 203, "Lesson 15 divider must be documented at designed PDF page 203"
        previous_lesson = lessons[13]
        assert previous_lesson["designedPdfPages"]["end"] + 1 == lesson["dividerPage"], "Lesson 15 divider must immediately follow Lesson 14"
        assert lesson["dividerPage"] + 1 == designed["start"], "Lesson 15 content must immediately follow its divider"
    n = lesson["number"]
    lesson_path = ROOT / "lessons" / f"kurmanji-dengnasi-lesson-{n:02}.html"
    assert lesson_path.is_file(), f"missing standalone lesson page for lesson {n}"
    assert f'data-lesson-key="kurmanji-dengnasi-lesson-{n:02}.html"' in lesson_path.read_text(encoding="utf-8"), f"lesson {n} page key mismatch"

assert "دۆخی ئێستا: لە ئامادەکردندایە" in preview, "course landing page must remain on hold until lesson integration is approved"
assert "const lessons=" in reader, "reader does not embed the lesson manifest"
assert "lessons.forEach" in reader and 'a.href="lessons/kurmanji-dengnasi-lesson-"+String(i+1).padStart(2,"0")+".html"' in reader, "reader index must link to the protected lesson routes"
assert 'id="openLesson"' in reader and 'openLesson").href="lessons/kurmanji-dengnasi-lesson-"+String(current).padStart(2,"0")+".html"' in reader, "reader primary action must open the selected protected lesson"
assert 'String(current-1).padStart(2,"0")+".html"' in reader and 'String(current+1).padStart(2,"0")+".html"' in reader, "previous/next links must open protected lesson routes"
assert "lesson.designedPdfPages.start" in reader, "reader does not link to the current lesson PDF page"
assert "raw.githubusercontent.com/avasinim/zanztkurd/main/Dengnasiya_Zimane_Kurdi_27_Wane_corrected.pdf" in reader, "reader corrected PDF source URL missing"
assert 'href="https://raw.githubusercontent.com/avasinim/zanztkurd/main/Dengnasiya_Zimane_Kurdi_27_Wane_corrected.pdf#page=8"' in reader, "reader no-script PDF fallback must use the verified raw PDF URL"
assert 'params.get("lesson")' in reader, "reader does not read the requested lesson"
assert 'id="prevLesson"' in reader and 'id="nextLesson"' in reader, "reader navigation controls missing"
assert not any(token in reader.lower() for token in ('id="quiz"', 'id="quiz-container"', 'id="quiz-question"')), "unexpected quiz UI added"

print("PASS: PDF asset, 27 lessons, unique IDs, exact designed-page offsets, PDF lesson anchors, 27 reader links, and previous/next navigation.")
