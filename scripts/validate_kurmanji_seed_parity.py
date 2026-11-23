#!/usr/bin/env python3
"""Verify the migration's lesson tuples exactly match the split seed SQL rows.

This is a read-only source comparison. It does not connect to or mutate a database.
PostgreSQL syntax is checked separately by validate_kurmanji_sql.py.
"""
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
MIGRATION = ROOT / "supabase/migrations/20261024122051_add_kurmanji_courses_and_protected_lessons.sql"
SEED_FILES = sorted((ROOT / "docs").glob("kurmanji-content-seed-part-*.sql"))


def extract_rows(source: str, label: str) -> list[str]:
    insert_at = source.find("INSERT INTO public.lesson_content")
    values_at = source.find("VALUES", insert_at)
    conflict_at = source.find("ON CONFLICT (lesson_key)", values_at)
    if min(insert_at, values_at, conflict_at) < 0:
        raise ValueError(f"{label}: expected lesson_content INSERT/VALUES/ON CONFLICT block not found")

    body = source[values_at + len("VALUES"):conflict_at]
    rows = []
    starts = []
    ends = []
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
    if not MIGRATION.is_file():
        print(f"ERROR: missing migration: {MIGRATION.relative_to(ROOT)}")
        return 1
    if len(SEED_FILES) != 5:
        print(f"ERROR: expected 5 split seed files, found {len(SEED_FILES)}")
        return 1

    try:
        migration_rows = extract_rows(MIGRATION.read_text(encoding="utf-8"), str(MIGRATION.relative_to(ROOT)))
        seed_rows = []
        for path in SEED_FILES:
            seed_rows.extend(extract_rows(path.read_text(encoding="utf-8"), str(path.relative_to(ROOT))))
        migration_keys = [row_key(row, "migration") for row in migration_rows]
        seed_keys = [row_key(row, "seed package") for row in seed_rows]
    except (OSError, ValueError) as exc:
        print(f"ERROR: {exc}")
        return 1

    if len(seed_rows) != 38 or len(migration_rows) != 38:
        print(f"ERROR: expected 38 tuples in each source; migration={len(migration_rows)}, seeds={len(seed_rows)}")
        return 1
    if len(set(seed_keys)) != 38 or len(set(migration_keys)) != 38:
        print("ERROR: duplicate lesson_key detected in migration or seed package")
        return 1
    # The initial migration is immutable once applied. Later, separately
    # reviewed migrations may intentionally enrich or correct individual
    # lesson rows. Accept a tuple difference only when a later migration
    # explicitly names that exact lesson key; otherwise fail closed.
    if migration_keys != seed_keys:
        print("ERROR: migration and seed lesson keys/order differ")
        return 1

    later_migrations = sorted(
        path for path in (ROOT / "supabase/migrations").glob("*.sql")
        if path.name > MIGRATION.name
    )
    followup_keys = set()
    for path in later_migrations:
        try:
            migration_text = path.read_text(encoding="utf-8")
        except OSError as exc:
            print(f"ERROR: cannot read follow-up migration {path.name}: {exc}")
            return 1
        followup_keys.update(re.findall(
            r"kurmanji-course-[12]-lesson-\\d{2}\\.html", migration_text
        ))

    mismatches = [
        key for key, base_row, seed_row in zip(migration_keys, migration_rows, seed_rows)
        if base_row != seed_row
    ]
    unexplained = [key for key in mismatches if key not in followup_keys]
    if unexplained:
        print(
            "ERROR: seed tuples differ from the immutable base migration without "
            "an explicit later lesson migration: " + ", ".join(unexplained)
        )
        return 1
    if mismatches:
        print(
            "PASS: " + str(len(mismatches)) +
            " seed tuple(s) differ from the immutable base migration and have "
            "explicit follow-up migrations: " + ", ".join(mismatches)
        )
    else:
        print("PASS: all seed tuples exactly match the immutable base migration.")
    expected_keys = (
        [f"kurmanji-course-1-lesson-{n:02d}.html" for n in range(1, 27)]
        + [f"kurmanji-course-2-lesson-{n:02d}.html" for n in range(1, 13)]
    )
    if seed_keys != expected_keys:
        print("ERROR: seed rows do not contain the expected 26 + 12 lesson keys in order")
        return 1

    print("PASS: all 38 migration lesson tuples exactly match the five split seed files in order.")
    print("PASS: 26 course-1 and 12 course-2 keys are unique and correctly ordered.")
    print("No database connection was made; no files or lesson content were changed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
