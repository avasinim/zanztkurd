#!/usr/bin/env python3
"""Validate the authored 27-lesson Dengnasi draft without changing production data."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "docs/KURMANJI-DENGNASI-LESSON-AUTHORING.md"
text = SOURCE.read_text(encoding="utf-8")

matches = list(re.finditer(r"^# Dersa (\d+) — (.+)$", text, re.MULTILINE))
numbers = [int(match.group(1)) for match in matches]
expected = list(range(1, 28))
assert numbers == expected, f"expected exactly 27 sequential lesson headings, got {numbers}"

citation_pattern = re.compile(
    r"^Husein Muhammed, \*Dengnasî di kurdî de\*, rûpelên çapkirî .+\.$",
    re.MULTILINE,
)
for index, match in enumerate(matches):
    end = matches[index + 1].start() if index + 1 < len(matches) else len(text)
    block = text[match.start():end]
    assert citation_pattern.search(block), (
        f"lesson {numbers[index]} is missing its printed-page source citation"
    )

# Kurmanji lesson prose must use Latin script. Arabic comma punctuation is allowed.
arabic_letters = re.search(r"[\u0621-\u063A\u0641-\u064A]", text)
assert arabic_letters is None, (
    f"Arabic-script character found in authoring document: U+{ord(arabic_letters.group()):04X}"
)

forbidden_heading = re.compile(
    r"^\s{0,3}#{1,6}\s+.*"
    r"(?:quiz|quizzes|exercise|exercises|test|tests|"
    r"pirs|pirsên|temrîn|rahênan|îmtîhan)",
    re.IGNORECASE | re.MULTILINE,
)
for index, match in enumerate(matches):
    end = matches[index + 1].start() if index + 1 < len(matches) else len(text)
    block = text[match.start():end]
    assert forbidden_heading.search(block) is None, (
        f"question/test/exercise heading found in lesson {numbers[index]}"
    )

audio_reference = re.search(
    r"(?:<audio\b|https?://[^\s)]+\.(?:mp3|ogg|wav|m4a|flac)(?:[?#)\s]|$))",
    text,
    re.IGNORECASE,
)
assert audio_reference is None, "external audio or audio element found"

print(
    "PASS: 27 sequential lesson headings; 27 printed-page citations; "
    "Latin-script lesson text; no quiz/test/exercise headings; no external audio."
)

# Protect the reader-to-lesson handoff and the test-only database boundary.
READER = ROOT / "kurmanji-dengnasi-reader.html"
COURSE_PAGE = ROOT / "kurmanji-dengnasi-course.html"
LOADER = ROOT / "script.js"
SUPABASE_CONFIG = ROOT / "supabase-config.js"

reader = READER.read_text(encoding="utf-8")
course_page = COURSE_PAGE.read_text(encoding="utf-8")
loader = LOADER.read_text(encoding="utf-8")
supabase_config = SUPABASE_CONFIG.read_text(encoding="utf-8")

assert 'id="openLesson"' in reader, "reader is missing its primary lesson action"
assert (
    'lessons/kurmanji-dengnasi-lesson-"+String(current).padStart(2,"0")+".html"'
    in reader
), "reader primary action must open the protected lesson route"
assert (
    'a.href="lessons/kurmanji-dengnasi-lesson-"+String(i+1).padStart(2,"0")+".html"'
    in reader
), "lesson index entries must open protected lesson routes"
assert (
    'a.href="lessons/kurmanji-dengnasi-lesson-"+String(current-1).padStart(2,"0")+".html"'
    in reader
), "previous-lesson navigation must use protected lesson routes"
assert (
    'a.href="lessons/kurmanji-dengnasi-lesson-"+String(current+1).padStart(2,"0")+".html"'
    in reader
), "next-lesson navigation must use protected lesson routes"
assert 'href="kurmanji-dengnasi-reader.html"' in course_page, (
    "course hold page must link to the 27-lesson reader index"
)
assert "لە ئامادەکردندایە" in course_page, (
    "course page must remain explicitly marked as not activated"
)

loader_start = loader.index("async function loadProtectedLessonContent")
loader_end = loader.index("async function hasPreviousLessonCompleted", loader_start)
loader_block = loader[loader_start:loader_end]
project_guard = 'configuredProject!=="juwsjljbdwyncicybwoq"'
content_query = '.from("lesson_content")'
assert project_guard in loader_block, (
    "Dengnasi lesson loader is missing its fail-closed test-project guard"
)
assert loader_block.index(project_guard) < loader_block.index(content_query), (
    "Dengnasi project guard must execute before any lesson_content query"
)
assert "هیچ داواکارییەک بۆ بنکەدراوەی بەرهەمهێنان نانێردرێت" in loader_block, (
    "non-test project guard must explain that no production query is sent"
)
configured_url = re.search(
    r'url\\s*:\\s*["\\']https://([a-z0-9]+)\\.supabase\\.co',
    supabase_config,
)
assert configured_url, "Supabase browser URL could not be identified"
assert configured_url.group(1) != "juwsjljbdwyncicybwoq", (
    "committed site config must not be switched to the test Supabase project"
)

print(
    "PASS: reader index and previous/next links use protected lesson routes; "
    "course page remains held; Dengnasi loader fails closed before database "
    "queries outside the dedicated test project; committed site config is not "
    "pointed at the test project."
)
