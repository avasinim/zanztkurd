#!/usr/bin/env python3
"""Validate the source map and static reader wiring for the 27-lesson course."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
manifest = json.loads((ROOT / "docs/kurmanji-dengnasi-course.json").read_text(encoding="utf-8"))
pdf = manifest["designedPdf"]
pdf_path = ROOT / pdf["repositoryPath"]
assert pdf["pdfPages"] == 462, "designed PDF page count must remain 462"
assert pdf_path.is_file(), "designed PDF is missing from the repository tree"
assert pdf_path.stat().st_size > 1_000_000, "designed PDF appears incomplete"
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
    if lesson["number"] == 15:
        assert lesson.get("dividerPage") == 204, "Lesson 15 divider must be documented at designed PDF page 204"
    n = lesson["number"]
    link = f'kurmanji-dengnasi-reader.html?lesson={n}'
    assert link in preview, f"missing preview link for lesson {n}"

assert "const lessons=" in reader, "reader does not embed the lesson manifest"
assert "lesson.designedPdfPages.start" in reader, "reader does not link to the current lesson PDF page"
assert "raw.githubusercontent.com/avasinim/zanztkurd/main/Dengnasiya_Zimane_Kurdi_27_Wane.pdf" in reader, "reader PDF source URL missing"
assert 'params.get("lesson")' in reader, "reader does not read the requested lesson"
assert 'id="prevLesson"' in reader and 'id="nextLesson"' in reader, "reader navigation controls missing"
assert not any(token in reader.lower() for token in ('id="quiz"', 'id="quiz-container"', 'id="quiz-question"')), "unexpected quiz UI added"

print("PASS: PDF asset, 27 lessons, unique IDs, exact designed-page offsets, PDF lesson anchors, 27 reader links, and previous/next navigation.")
