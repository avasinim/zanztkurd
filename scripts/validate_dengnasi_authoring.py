#!/usr/bin/env python3
"""Validate the authored 27-lesson Dengnasi draft without changing production data."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "docs/KURMANJI-DENGNASI-LESSON-AUTHORING.md"
text = SOURCE.read_text(encoding="utf-8")

matches = list(re.finditer(r"^# Dersa (\\d+) — (.+)$", text, re.MULTILINE))
numbers = [int(match.group(1)) for match in matches]
expected = list(range(1, 28))
assert numbers == expected, f"expected exactly 27 sequential lesson headings, got {numbers}"

citation_pattern = re.compile(
    r"^Husein Muhammed, \\*Dengnasî di kurdî de\\*, rûpelên çapkirî .+\\.$",
    re.MULTILINE,
)
for index, match in enumerate(matches):
    end = matches[index + 1].start() if index + 1 < len(matches) else len(text)
    block = text[match.start():end]
    assert citation_pattern.search(block), (
        f"lesson {numbers[index]} is missing its printed-page source citation"
    )

# Kurmanji lesson prose must use Latin script. Arabic comma punctuation is allowed.
arabic_letters = re.search(r"[\\u0621-\\u063A\\u0641-\\u064A]", text)
assert arabic_letters is None, (
    f"Arabic-script character found in authoring document: U+{ord(arabic_letters.group()):04X}"
)

forbidden_heading = re.compile(
    r"^\\s{0,3}#{1,6}\\s+.*"
    r"(?:quiz|quizzes|exercise|exercises|test|tests|"
    r"pirs|pirsên|temrîn|rahênan|îmtîhan)",
    re.IGNORECASE | re.MULTILINE,
)
assert forbidden_heading.search(text) is None, "question/test/exercise heading found"

audio_reference = re.search(
    r"(?:<audio\\b|https?://[^\\s)]+\\.(?:mp3|ogg|wav|m4a|flac)(?:[?#)\\s]|$))",
    text,
    re.IGNORECASE,
)
assert audio_reference is None, "external audio or audio element found"

print(
    "PASS: 27 sequential lesson headings; 27 printed-page citations; "
    "Latin-script lesson text; no quiz/test/exercise headings; no external audio."
)
