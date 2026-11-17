#!/usr/bin/env python3
"""Validate immutable Kurmanji release baseline plus forward seed reconciliation.

This is a read-only source comparison. It never connects to or mutates a database.
PostgreSQL syntax is checked separately by validate_kurmanji_sql.py.
"""
from pathlib import Path
import hashlib
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
BASE_MIGRATION = ROOT / "supabase/migrations/20261024122051_add_kurmanji_courses_and_protected_lessons.sql"
FORWARD_MIGRATION = ROOT / "supabase/migrations/20261116120000_reconcile_kurmanji_seed_content.sql"
SEED_FILES = sorted((ROOT / "docs").glob("kurmanji-content-seed-part-*.sql"))
EXPECTED_BASE_BLOB_SHA = "06320c50a858e41d8ce21e7b4fdee3f6ae418cd9"

EXPECTED_KEYS = (
    [f"kurmanji-course-1-lesson-{n:02d}.html" for n in range(1, 27)]
    + [f"kurmanji-course-2-lesson-{n:02d}.html" for n in range(1, 13)]
)
OVERLAY_KEYS = [
    "kurmanji-course-1-lesson-01.html",
    "kurmanji-course-1-lesson-02.html",
    "kurmanji-course-1-lesson-03.html",
    "kurmanji-course-1-lesson-04.html",
    "kurmanji-course-1-lesson-05.html",
    "kurmanji-course-1-lesson-06.html",
    "kurmanji-course-1-lesson-10.html",
    "kurmanji-course-1-lesson-25.html",
    "kurmanji-course-2-lesson-04.html",
    "kurmanji-course-2-lesson-06.html",
    "kurmanji-course-2-lesson-09.html",
    "kurmanji-course-2-lesson-10.html",
]


def extract_rows(source: str, label: str) -> list[str]:
    insert_at = source.find("INSERT INTO public.lesson_content")
    values_at = source.find("VALUES", insert_at)
    conflict_at = source.find("ON CONFLICT (lesson_key)", values_at)
    if min(insert_at, values_at, conflict_at) < 0:
        raise ValueError(f"{label}: expected lesson_content INSERT/VALUES/ON CONFLICT block not found")

    body = source[values_at + len("VALUES"):conflict_at]
    starts, ends = [], []
    depth = 0
    in_string = False
    i = 0
    while i < len(body):
        char = body[i]
        nxt = body[i + 1] if i + 1 < len(body) else ""
        if in_string:
            if char == "'" and nxt == "'":
                i += 2
                continue
            if char == "'":
                in_string = False
            i += 1
            continue
        if char == "'":
            in_string = True
        elif char == "(":
            if depth == 0:
                starts.append(i)
            depth += 1
        elif char == ")":
            depth -= 1
            if depth < 0:
                raise ValueError(f"{label}: unmatched closing parenthesis in VALUES block")
            if depth == 0:
                ends.append(i + 1)
        i += 1

    if in_string or depth != 0 or len(starts) != len(ends):
        raise ValueError(f"{label}: unterminated SQL string or unbalanced VALUES tuple")
    rows = [body[start:end] for start, end in zip(starts, ends)]
    if not rows:
        raise ValueError(f"{label}: no lesson tuples found")
    return rows


def row_key(row: str, label: str) -> str:
    match = re.match(r"\(\s*'((?:''|[^'])*)'\s*,\s*'((?:''|[^'])*)'\s*,", row)
    if not match:
        raise ValueError(f"{label}: row does not start with lesson_key and course_id string literals")
    return match.group(1).replace("''", "'")


def main() -> int:
    if len(SEED_FILES) != 5:
        print(f"ERROR: expected 5 split seed files, found {len(SEED_FILES)}")
        return 1
    required_files = [BASE_MIGRATION, FORWARD_MIGRATION, *SEED_FILES]
    missing = [path.relative_to(ROOT) for path in required_files if not path.is_file()]
    if missing:
        print("ERROR: missing required source file(s): " + ", ".join(map(str, missing)))
        return 1

    base_bytes = BASE_MIGRATION.read_bytes()
    git_blob = hashlib.sha1(
        f"blob {len(base_bytes)}\0".encode("ascii") + base_bytes
    ).hexdigest()
    if git_blob != EXPECTED_BASE_BLOB_SHA:
        print(
            "ERROR: historical release migration changed; "
            f"expected blob {EXPECTED_BASE_BLOB_SHA}, found {git_blob}"
        )
        return 1

    try:
        base_rows = extract_rows(base_bytes.decode("utf-8"), str(BASE_MIGRATION.relative_to(ROOT)))
        overlay_rows = extract_rows(
            FORWARD_MIGRATION.read_text(encoding="utf-8"),
            str(FORWARD_MIGRATION.relative_to(ROOT)),
        )
        seed_rows = []
        for path in SEED_FILES:
            seed_rows.extend(extract_rows(path.read_text(encoding="utf-8"), str(path.relative_to(ROOT))))

        base_keys = [row_key(row, "historical migration") for row in base_rows]
        overlay_keys = [row_key(row, "forward migration") for row in overlay_rows]
        seed_keys = [row_key(row, "seed package") for row in seed_rows]
    except (OSError, UnicodeError, ValueError) as exc:
        print(f"ERROR: {exc}")
        return 1

    if len(base_rows) != 38 or len(seed_rows) != 38:
        print(f"ERROR: expected 38 baseline and seed tuples; baseline={len(base_rows)}, seeds={len(seed_rows)}")
        return 1
    if len(set(base_keys)) != 38 or len(set(seed_keys)) != 38:
        print("ERROR: duplicate lesson_key detected in historical migration or seed package")
        return 1
    if base_keys != EXPECTED_KEYS or seed_keys != EXPECTED_KEYS:
        print("ERROR: historical migration or seed package does not contain the expected 26 + 12 ordered keys")
        return 1
    if len(overlay_rows) != len(OVERLAY_KEYS) or overlay_keys != OVERLAY_KEYS:
        print("ERROR: forward migration must update exactly the 12 post-release drifted lesson keys in canonical order")
        return 1
    if len(set(overlay_keys)) != len(overlay_keys):
        print("ERROR: duplicate lesson_key detected in forward migration")
        return 1

    base_by_key = dict(zip(base_keys, base_rows))
    overlay_by_key = dict(zip(overlay_keys, overlay_rows))
    seed_by_key = dict(zip(seed_keys, seed_rows))
    observed_drift = [key for key in EXPECTED_KEYS if base_by_key[key] != seed_by_key[key]]
    if observed_drift != OVERLAY_KEYS:
        print("ERROR: the exact baseline-to-seed drift set changed; review the forward migration key list")
        print("Observed: " + ", ".join(observed_drift))
        return 1

    effective = dict(base_by_key)
    effective.update(overlay_by_key)
    for key in EXPECTED_KEYS:
        if effective[key] != seed_by_key[key]:
            print(f"ERROR: effective post-migration tuple differs from seed for {key}")
            return 1

    print("PASS: historical release migration remains byte-identical to its recorded Git blob.")
    print("PASS: 38 historical baseline tuples and 38 seed tuples have the expected ordered keys.")
    print("PASS: forward migration overlays exactly the 12 post-release drifted lesson rows.")
    print("PASS: effective post-migration payload matches all five seed files exactly.")
    print("No database connection was made; no files or lesson content were changed by this validator.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
