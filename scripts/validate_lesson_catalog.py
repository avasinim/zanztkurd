#!/usr/bin/env python3
"""Validate the complete lesson catalog before GitHub Pages deployment."""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LESSONS_DIR = ROOT / "lessons"
INDEX_PATH = LESSONS_DIR / "index.json"
EXPECTED = {
    "course-current": {"physical": 42, "logical": 26},
    "course-2": {"physical": 32, "logical": 32},
}
# Course 1's multi-part lessons must be represented in the catalog completely.
COURSE1_PARTS = {**{n: 1 for n in range(1, 22)}, 22: 7, 23: 6, 24: 1, 25: 6, 26: 1}


def collect_entries(value: object, output: list[dict]) -> None:
    if isinstance(value, dict):
        if "pagePath" in value:
            output.append(value)
        for child in value.values():
            collect_entries(child, output)
    elif isinstance(value, list):
        for child in value:
            collect_entries(child, output)


def main() -> int:
    errors: list[str] = []
    if not INDEX_PATH.is_file():
        print("ERROR: lessons/index.json نەدۆزرایەوە")
        return 1

    try:
        index = json.loads(INDEX_PATH.read_text(encoding="utf-8"))
    except (UnicodeDecodeError, json.JSONDecodeError) as exc:
        print(f"ERROR: lessons/index.json ناتوانرێت بخوێندرێتەوە: {exc}")
        return 1

    entries: list[dict] = []
    collect_entries(index, entries)
    if not entries:
        errors.append("هیچ تۆمارێکی وانە لە index.json نییە")

    ids: list[str] = []
    page_paths: list[str] = []
    by_course: dict[str, list[dict]] = {}

    for i, entry in enumerate(entries, start=1):
        lesson_id = entry.get("id")
        page_path = entry.get("pagePath")
        course_id = entry.get("courseId")
        title = entry.get("title")
        logical_number = entry.get("courseLessonNumber")

        if not isinstance(lesson_id, str) or not lesson_id.strip():
            errors.append(f"تۆماری {i}: id ـی دروست نییە")
        else:
            ids.append(lesson_id)

        if not isinstance(title, str) or not title.strip():
            errors.append(f"تۆماری {i}: ناونیشانی وانە بەتاڵە")

        if not isinstance(page_path, str) or not page_path.strip():
            errors.append(f"تۆماری {i}: pagePath نییە")
            continue

        # Catalog entries must reference a file directly inside lessons/.
        if Path(page_path).name != page_path or page_path in {".", ".."}:
            errors.append(f"بەستەری نادروست: {page_path!r}")
            continue

        page_paths.append(page_path)
        if not (LESSONS_DIR / page_path).is_file():
            errors.append(f"فایلی وانە ونە: lessons/{page_path}")

        if course_id not in EXPECTED:
            errors.append(f"{page_path}: courseId ـی نەناسراوە {course_id!r}")
            continue

        if not isinstance(logical_number, int) or isinstance(logical_number, bool):
            errors.append(f"{page_path}: courseLessonNumber ـی ژمارەیی نییە")
            continue

        by_course.setdefault(course_id, []).append(entry)

    for value, label in ((ids, "id"), (page_paths, "pagePath")):
        seen: set[str] = set()
        for item in value:
            if item in seen:
                errors.append(f"{label} ـی دووبارە: {item}")
            seen.add(item)

    # Detect lesson HTML files that exist on disk but are missing from the catalog.
    actual_lesson_files = {
        path.name
        for pattern in ("[0-9][0-9][0-9].html", "course-2-*.html")
        for path in LESSONS_DIR.glob(pattern)
    }
    catalog_lesson_files = set(page_paths)
    for missing_from_catalog in sorted(actual_lesson_files - catalog_lesson_files):
        errors.append(f"فایلی هەیە بەڵام لە کاتەلۆگدا نییە: lessons/{missing_from_catalog}")

    for course_id, expected in EXPECTED.items():
        course_entries = by_course.get(course_id, [])
        if len(course_entries) != expected["physical"]:
            errors.append(
                f"{course_id}: {len(course_entries)} تۆمار هەیە؛ "
                f"{expected['physical']} پێویستە"
            )

        numbers = [
            entry.get("courseLessonNumber")
            for entry in course_entries
            if isinstance(entry.get("courseLessonNumber"), int)
            and not isinstance(entry.get("courseLessonNumber"), bool)
        ]
        expected_numbers = set(range(1, expected["logical"] + 1))
        found_numbers = set(numbers)
        if found_numbers != expected_numbers:
            missing = sorted(expected_numbers - found_numbers)
            unexpected = sorted(found_numbers - expected_numbers)
            errors.append(
                f"{course_id}: ژمارەی وانەکان ناتەواون؛ "
                f"ون={missing}، زیادە/نەگونجاو={unexpected}"
            )

        for number in sorted(expected_numbers):
            count = numbers.count(number)
            if count == 0:
                continue
            expected_parts = COURSE1_PARTS[number] if course_id == "course-current" else 1
            if count != expected_parts:
                errors.append(
                    f"{course_id}: وانەی {number} دەبێت {expected_parts} پەڕەی هەبێت؛ "
                    f"ئێستا {count} تۆمارە"
                )

    course1_files = [
        entry.get("pagePath")
        for entry in by_course.get("course-current", [])
    ]
    if any(not re.fullmatch(r"\d{3}\.html", str(path)) for path in course1_files):
        errors.append("کۆرسی یەکەم پێویستە ناوی فایلە سێ‌ژمارەییەکان بەکاربهێنێت")

    if errors:
        print("\n".join("ERROR: " + error for error in errors))
        return 1

    print(
        "OK: کاتەلۆگ دروستە؛ ٢٦ وانەی کۆرسی یەکەم، "
        "٣٢ وانەی کۆرسی دووەم، ٧٤ تۆمار، ژمارەی پارتەکان و هەموو فایلەکان بەردەستن."
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
