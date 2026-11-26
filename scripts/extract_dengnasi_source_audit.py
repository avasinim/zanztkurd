#!/usr/bin/env python3
"""Extract source-book page text for a focused, auditable lesson comparison."""
from __future__ import annotations
import json
from pathlib import Path
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[1]
manifest = json.loads((ROOT / "docs/kurmanji-dengnasi-course.json").read_text(encoding="utf-8"))
pdf_path = ROOT / manifest["designedPdf"]["libraryFilename"]
reader = PdfReader(str(pdf_path))
out = []
for lesson_number in (18, 21):
    lesson = manifest["lessons"][lesson_number - 1]
    page_range = lesson["designedPdfPages"]
    out.append(f"LESSON {lesson_number}: {lesson['title']}")
    out.append(f"Printed pages: {lesson['printedPages']['start']}-{lesson['printedPages']['end']}")
    out.append(f"Designed PDF physical pages: {page_range['start']}-{page_range['end']}")
    out.append("")
    for physical_page in range(page_range["start"], page_range["end"] + 1):
        page = reader.pages[physical_page - 1]
        text = page.extract_text(extraction_mode="layout") or page.extract_text() or ""
        out.append(f"===== DESIGNED PDF PAGE {physical_page} / PRINTED PAGE {physical_page - (page_range['start'] - lesson['printedPages']['start'])} =====")
        out.append(text)
        out.append("")
Path("dengnasi-source-page-audit.txt").write_text("\n".join(out), encoding="utf-8")
print(f"Extracted lesson 18 and 21 source ranges from {len(reader.pages)}-page PDF.")
