#!/usr/bin/env python3
"""Extract exact source-book pages for the next Dengnasi lesson audit."""
from __future__ import annotations
import json
from pathlib import Path
from pypdf import PdfReader
ROOT = Path(__file__).resolve().parents[1]
manifest = json.loads((ROOT / "docs/kurmanji-dengnasi-course.json").read_text(encoding="utf-8"))
reader = PdfReader(str(ROOT / manifest["designedPdf"]["libraryFilename"]))
out = []
for number in (19, 20):
    lesson = manifest["lessons"][number - 1]
    pr = lesson["printedPages"]
    dr = lesson["designedPdfPages"]
    offset = dr["start"] - pr["start"]
    out.extend([f"LESSON {number}: {lesson['title']}", f"Printed pages: {pr['start']}-{pr['end']}", f"Designed PDF physical pages: {dr['start']}-{dr['end']}", ""])
    for physical in range(dr["start"], dr["end"] + 1):
        page_text = reader.pages[physical - 1].extract_text(extraction_mode="layout") or reader.pages[physical - 1].extract_text() or ""
        out.extend([f"===== DESIGNED PDF PAGE {physical} / PRINTED PAGE {physical-offset} =====", page_text, ""])
Path("dengnasi-source-page-audit-19-20.txt").write_text("\n".join(out), encoding="utf-8")
print(f"Extracted exact designed-PDF ranges for Lessons 19 and 20 from {len(reader.pages)} pages.")
