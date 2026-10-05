#!/usr/bin/env python3
"""Validate navigation for Course 1 lessons 1–19 before deployment."""
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
LESSONS = {n: (f"{n+16:03d}.html", (f"{n+15:03d}.html" if 1 < n < 19 else None), (f"{n+17:03d}.html" if n < 19 else "036.html")) for n in range(1, 20)}

errors = []
for number, (filename, previous, next_file) in LESSONS.items():
    path = ROOT / "lessons" / filename
    if not path.exists():
        errors.append(f"وانەی {number}: {filename} نەدۆزرایەوە")
        continue
    html = path.read_text(encoding="utf-8")
    nav = re.search(r'<nav class="lesson-nav" aria-label="ناوبەری وانەکان">(.*?)</nav>', html, re.S)
    if not nav:
        errors.append(f"وانەی {number}: lesson-nav نیە")
        continue
    body = nav.group(1)
    links = re.findall(r'<a\s+href="([^"]+)"\s+aria-label="[^"]+">\s*<span class="lesson-nav-direction">([^<]+)</span>\s*<span class="lesson-nav-label">([^<]+)</span>\s*</a>', body, re.S)
    expected_count = 1 if number == 1 else 2
    if len(links) != expected_count:
        errors.append(f"وانەی {number}: پێویستە {expected_count} navigation link هەبێت")
        continue
    if "<small>" in body or "<strong>" in body or "وانەی داهاتو" in body:
        errors.append(f"وانەی {number}: قاڵبی کۆنی navigation هێشتا ماوە")
    hrefs = [x[0] for x in links]
    if previous and hrefs[0] != previous:
        errors.append(f"وانەی {number}: previous = {hrefs[0]!r}، پێویستە {previous!r} بێت")
    if next_file:
        next_index = 0 if number in (1, 19) else 1
        if hrefs[next_index] != next_file:
            errors.append(f"وانەی {number}: next = {hrefs[next_index]!r}، پێویستە {next_file!r} بێت")
    if any(x in body for x in ("0NaN", "undefined", "null.html")):
        errors.append(f"وانەی {number}: navigation ـی ناسروشتی/شکستوو هەیە")
    if "lesson-nav-direction" not in body or "lesson-nav-label" not in body:
        errors.append(f"وانەی {number}: قاڵبی navigation ـی ستاندارد ناتەواوە")

if errors:
    print("\n".join("ERROR: " + e for e in errors))
    sys.exit(1)

print("OK: navigation ـی وانەکانی ١ تا ١٩ بە تەواوی ستاندارد و دروستە.")
