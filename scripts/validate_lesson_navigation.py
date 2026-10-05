#!/usr/bin/env python3
"""Validate navigation for Course 1 lessons 9–15 before deployment."""
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
LESSONS = {
    9: ("025.html", None, "026.html"),
    10: ("026.html", "025.html", "027.html"),
    11: ("027.html", "026.html", "028.html"),
    12: ("028.html", "027.html", "029.html"),
    13: ("029.html", "028.html", "030.html"),
    14: ("030.html", "029.html", "031.html"),
    15: ("031.html", "030.html", "032.html"),
}

errors = []
for number, (filename, previous, next_file) in LESSONS.items():
    path = ROOT / "lessons" / filename
    if not path.exists():
        errors.append(f"وانەی {number}: {filename} نەدۆزرایەوە")
        continue
    html = path.read_text(encoding="utf-8")
    nav = re.search(r'<nav class="lesson-nav"[^>]*>(.*?)</nav>', html, re.S)
    if not nav:
        errors.append(f"وانەی {number}: lesson-nav نیە")
        continue
    body = nav.group(1)
    links = re.findall(r'<a\s+href="([^"]+)"[^>]*>(.*?)</a>', body, re.S)
    if len(links) != 2:
        errors.append(f"وانەی {number}: پێویستە تەنیا دوو navigation link هەبێت")
        continue
    hrefs = [x[0] for x in links]
    if previous and hrefs[0] != previous:
        errors.append(f"وانەی {number}: previous = {hrefs[0]!r}، پێویستە {previous!r} بێت")
    if next_file and hrefs[1] != next_file:
        errors.append(f"وانەی {number}: next = {hrefs[1]!r}، پێویستە {next_file!r} بێت")
    if number == 9 and hrefs[0] != "024.html":
        errors.append("وانەی ٩: previous دەبێت 024.html بێت")
    if "0NaN" in body or "undefined" in body or "null.html" in body:
        errors.append(f"وانەی {number}: navigation ـی ناسروشتی/شکستوو هەیە")

if errors:
    print("\n".join("ERROR: " + e for e in errors))
    sys.exit(1)

print("OK: navigation ـی وانەکانی ٩ تا ١٥ دروستە و هیچ 0NaN/undefined/null.html نیە.")
