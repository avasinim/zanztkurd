#!/usr/bin/env python3
"""Validate the authored 27-lesson Dengnasi draft without changing production data."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "docs/KURMANJI-DENGNASI-LESSON-AUTHORING.md"
MANIFEST = ROOT / "docs/kurmanji-dengnasi-course.json"
text = SOURCE.read_text(encoding="utf-8")
manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
manifest_lessons = manifest["lessons"]

matches = list(re.finditer(r"^# Dersa (\d+) — (.+)$", text, re.MULTILINE))
numbers = [int(match.group(1)) for match in matches]
expected = list(range(1, 28))
assert numbers == expected, f"expected exactly 27 sequential lesson headings, got {numbers}"

assert len(manifest_lessons) == len(matches), (
    "course manifest and authoring document must contain the same number of lessons"
)
for index, match in enumerate(matches):
    lesson = manifest_lessons[index]
    assert lesson["number"] == int(match.group(1)), (
        f"manifest lesson order differs at lesson {index + 1}"
    )
    assert lesson["title"] == match.group(2), (
        f"manifest title differs from authoring heading for lesson {index + 1}"
    )
    end = matches[index + 1].start() if index + 1 < len(matches) else len(text)
    block = text[match.start():end]
    citation = re.search(
        r"rûpelên çapkirî\s+\*{0,2}(\d+)\s*[–-]\s*(\d+)\*{0,2}",
        block,
    )
    assert citation, f"lesson {index + 1} has no parseable printed-page range"
    source_range = (int(citation.group(1)), int(citation.group(2)))
    manifest_range = (
        lesson["printedPages"]["start"],
        lesson["printedPages"]["end"],
    )
    assert source_range == manifest_range, (
        f"printed-page range differs for lesson {index + 1}: "
        f"authoring={source_range}, manifest={manifest_range}"
    )

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
    "PASS: 27 sequential lesson headings; manifest titles and printed-page ranges aligned; 27 citations; "
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
    r'url\s*:\s*["\']https://([a-z0-9]+)\.supabase\.co',
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

assert "window.ZANSTI_IS_DENGNASI_TEST_PROJECT = function()" in loader, (
    "shared Dengnasi test-project predicate is missing"
)
assert "window.ZANSTI_WAIT_FOR_SUPABASE = async function()" in loader, (
    "shared Supabase readiness gate must enforce the Dengnasi project boundary"
)
assert "return window.ZANSTI_IS_DENGNASI_TEST_PROJECT?.() !== false;" in loader, (
    "shared Supabase readiness gate does not reject the production project on Dengnasi routes"
)

page_gate_start = loader.index("(async function pageGate(){")
page_gate_end = loader.index("})();", page_gate_start)
page_gate = loader[page_gate_start:page_gate_end]
project_check = "!window.ZANSTI_IS_DENGNASI_TEST_PROJECT()"
session_read = "const got=await getSession();"
assert project_check in page_gate and session_read in page_gate, (
    "Dengnasi page gate must check its project before reading auth session"
)
assert page_gate.index(project_check) < page_gate.index(session_read), (
    "Dengnasi project check must precede auth/session requests"
)

progress_start = loader.index("window.ZANSTI_SYNC_PROGRESS=async function(courseId,files,storage,includeOwner=false){")
progress_end = loader.index("\n  };", progress_start)
progress_sync = loader[progress_start:progress_end]
assert "window.ZANSTI_WAIT_FOR_SUPABASE()" in progress_sync, (
    "lesson progress sync must use the shared project guard"
)
assert progress_sync.index("window.ZANSTI_WAIT_FOR_SUPABASE()") < progress_sync.index(
    '.from("lesson_progress")'
), "Dengnasi progress sync must reject production before querying lesson_progress"

completion_start = loader.index("async function markLessonComplete(courseId, lessonKey){")
completion_end = loader.index("\n}", completion_start)
completion = loader[completion_start:completion_end]
assert "window.ZANSTI_WAIT_FOR_SUPABASE()" in completion, (
    "lesson completion writes must use the shared project guard"
)
assert completion.index("window.ZANSTI_WAIT_FOR_SUPABASE()") < completion.index(
    'sb.rpc("complete_lesson"'
), "Dengnasi completion RPC must be blocked outside the test project"

print(
    "PASS: every Dengnasi auth, progress, lesson-content and completion path "
    "is guarded by the isolated test-project boundary before data access."
)

owner_copy_start = loader.index("(async function verifyOwnerCopyPermission(){")
owner_copy_end = loader.index("})();", owner_copy_start)
owner_copy = loader[owner_copy_start:owner_copy_end]
assert (
    'typeof window.ZANSTI_WAIT_FOR_SUPABASE!=="function" || '
    '!await window.ZANSTI_WAIT_FOR_SUPABASE())return;'
    in owner_copy
), "owner-copy permission check must stop before auth if the project guard rejects the route"

owner_status_start = loader.index("window.ZANSTI_OWNER_CHECK=(async function(){")
owner_status_end = loader.index("})();", owner_status_start)
owner_status = loader[owner_status_start:owner_status_end]
assert (
    'typeof window.ZANSTI_WAIT_FOR_SUPABASE!=="function" || '
    '!await window.ZANSTI_WAIT_FOR_SUPABASE())return false;'
    in owner_status
), "shared owner status check must stop before auth if the project guard rejects the route"
