#!/usr/bin/env python3
"""Validate the source map and static reader wiring for the 27-lesson course."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
manifest = json.loads((ROOT / "docs/kurmanji-dengnasi-course.json").read_text(encoding="utf-8"))
preview = (ROOT / "kurmanji-dengnasi-course.html").read_text(encoding="utf-8")
reader = (ROOT / "kurmanji-dengnasi-reader.html").read_text(encoding="utf-8")
lessons = manifest["lessons"]

assert len(lessons) == 27, f"expected 27 lessons, got {len(lessons)}"
assert [lesson["number"] for lesson in lessons] == list(range(1, 28)), "lesson numbering is not sequential"
assert len({lesson["id"] for lesson in lessons}) == 27, "lesson IDs must be unique"

for lesson in lessons:
    printed = lesson["printedPages"]
    original = lesson["originalPdfPages"]
    designed = lesson["designedPdfPages"]
    assert printed == original, f"source page mismatch in lesson {lesson['number']}"
    assert printed["start"] <= printed["end"], f"invalid source range in lesson {lesson['number']}"
    assert designed["start"] <= designed["end"], f"invalid designed range in lesson {lesson['number']}"
    n = lesson["number"]
    link = f'kurmanji-dengnasi-reader.html?lesson={n}'
    assert link in preview, f"missing preview link for lesson {n}"

assert "const lessons=" in reader, "reader does not embed the lesson manifest"
assert 'params.get("lesson")' in reader, "reader does not read the requested lesson"
assert 'id="prevLesson"' in reader and 'id="nextLesson"' in reader, "reader navigation controls missing"
assert "Quiz" not in reader and "quiz" not in reader, "unexpected quiz content added"

print("PASS: 27 lessons, unique IDs, valid source/designed page ranges, 27 reader links, and previous/next navigation.")
