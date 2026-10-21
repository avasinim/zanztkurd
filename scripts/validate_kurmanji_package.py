#!/usr/bin/env python3
"""Static integrity checks for the Kurmanji lesson package; never edits lesson text."""
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
SEED_DIR = ROOT / "docs"
ERRORS = []

expected = {
    "kurmanji-course-1": 26,
    "kurmanji-course-2": 12,
}

seed_files = sorted(SEED_DIR.glob("kurmanji-content-seed-part-*.sql"))
if len(seed_files) < 1:
    ERRORS.append("No Kurmanji seed SQL files found under docs/")

seed_text = "\n".join(path.read_text(encoding="utf-8") for path in seed_files)

for course_id, count in expected.items():
    found_pages = sorted(ROOT.glob(f"{course_id}-lesson-*.html"))
    expected_names = {
        f"{course_id}-lesson-{number:02d}.html"
        for number in range(1, count + 1)
    }
    actual_names = {path.name for path in found_pages}

    for missing in sorted(expected_names - actual_names):
        ERRORS.append(f"Missing lesson page: {missing}")
    for unexpected in sorted(actual_names - expected_names):
        ERRORS.append(f"Unexpected lesson page: {unexpected}")

    for number in range(1, count + 1):
        key = f"{course_id}-lesson-{number:02d}.html"
        occurrences = len(re.findall(re.escape(key), seed_text))
        if occurrences == 0:
            ERRORS.append(f"Lesson key missing from seed SQL files: {key}")
        elif occurrences > 1:
            # Each key should appear exactly once as an INSERT row key.
            row_pattern = re.compile(
                r"\(['\"]" + re.escape(key) + r"['\"]\s*,"
            )
            row_count = len(row_pattern.findall(seed_text))
            if row_count != 1:
                ERRORS.append(
                    f"Expected one seed row for {key}; found {row_count}"
                )

if ERRORS:
    print("\n".join(f"ERROR: {item}" for item in ERRORS))
    sys.exit(1)

print(
    "OK: all 38 Kurmanji lesson pages exist and each expected lesson key "
    "appears in the seed SQL package. Lesson content was not modified."
)

# Trigger CI after adding this validator; lesson/source content remains untouched.
