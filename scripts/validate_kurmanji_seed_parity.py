#!/usr/bin/env python3
"""Validate immutable Kurmanji release baseline plus forward seed reconciliation.

This is a read-only source comparison. It never connects to or mutates a database.
PostgreSQL syntax is checked separately by validate_kurmanji_sql.py.
"""
from pathlib import Path
import hashlib
import html
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



def extract_values_rows(source: str, label: str, start_marker: str, end_marker: str) -> list[str]:
    start = source.find(start_marker)
    values_at = source.find("VALUES", start)
    end = source.find(end_marker, values_at)
    if min(start, values_at, end) < 0:
        raise ValueError(f"{label}: expected VALUES tuple block not found")

    body = source[values_at + len("VALUES"):end]
    rows, depth, in_string, tuple_start = [], 0, False, -1
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
                tuple_start = i
            depth += 1
        elif char == ")":
            depth -= 1
            if depth < 0:
                raise ValueError(f"{label}: unmatched closing parenthesis")
            if depth == 0:
                rows.append(body[tuple_start:i + 1])
        i += 1

    if in_string or depth != 0:
        raise ValueError(f"{label}: unterminated SQL string or unbalanced tuple")
    if not rows:
        raise ValueError(f"{label}: no tuples found")
    return rows


def tuple_string_values(row: str, label: str) -> list[str]:
    if not (row.startswith("(") and row.endswith(")")):
        raise ValueError(f"{label}: malformed SQL tuple")
    body, fields, field_start = row[1:-1], [], 0
    depth, in_string, i = 0, False, 0
    while i < len(body):
        char = body[i]
        nxt = body[i + 1] if i + 1 < len(body) else ""
        if in_string:
            if char == "'" and nxt == "'":
                i += 2
                continue
            if char == "'":
                in_string = False
        else:
            if char == "'":
                in_string = True
            elif char == "(":
                depth += 1
            elif char == ")":
                depth -= 1
            elif char == "," and depth == 0:
                fields.append(body[field_start:i].strip())
                field_start = i + 1
        i += 1
    if in_string or depth != 0:
        raise ValueError(f"{label}: malformed SQL tuple fields")
    fields.append(body[field_start:].strip())

    decoded = []
    for field in fields:
        if field.startswith("'") and field.endswith("'"):
            decoded.append(field[1:-1].replace("''", "'"))
        else:
            decoded.append(field)
    return decoded


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
        forward_sql = FORWARD_MIGRATION.read_text(encoding="utf-8")
        overlay_rows = extract_rows(
            forward_sql,
            str(FORWARD_MIGRATION.relative_to(ROOT)),
        )
        preflight_rows = extract_values_rows(
            forward_sql,
            "forward migration preflight",
            "DO $preflight$",
            ") AS expected",
        )
        seed_rows = []
        for path in SEED_FILES:
            seed_rows.extend(extract_rows(path.read_text(encoding="utf-8"), str(path.relative_to(ROOT))))

        base_keys = [row_key(row, "historical migration") for row in base_rows]
        overlay_keys = [row_key(row, "forward migration") for row in overlay_rows]
        preflight_keys = [row_key(row, "forward migration preflight") for row in preflight_rows]
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
    if len(preflight_rows) != len(OVERLAY_KEYS) or preflight_keys != OVERLAY_KEYS:
        print("ERROR: forward migration preflight must guard exactly the 12 drifted lesson keys in canonical order")
        return 1

    base_by_key = dict(zip(base_keys, base_rows))
    overlay_by_key = dict(zip(overlay_keys, overlay_rows))
    preflight_by_key = dict(zip(preflight_keys, preflight_rows))
    seed_by_key = dict(zip(seed_keys, seed_rows))

    for key in OVERLAY_KEYS:
        baseline_values = tuple_string_values(base_by_key[key], f"historical row {key}")
        guarded_values = tuple_string_values(preflight_by_key[key], f"preflight row {key}")
        if baseline_values[:4] != guarded_values[:4]:
            print(f"ERROR: forward migration preflight does not exactly guard historical baseline values for {key}")
            return 1

    preflight_sql = forward_sql[forward_sql.find("DO $preflight$"):forward_sql.find("$preflight$;")]
    apply_sql = forward_sql[forward_sql.find("DO $apply$"):]
    required_guards = (
        (re.search(r"(?m)^BEGIN;\s*$", forward_sql), "transaction BEGIN"),
        (re.search(r"(?m)^COMMIT;\s*$", forward_sql), "transaction COMMIT"),
        (re.search(r"FOR UPDATE OF actual", preflight_sql, re.IGNORECASE), "preflight row lock"),
        (re.search(r"GET DIAGNOSTICS matched_rows = ROW_COUNT", preflight_sql, re.IGNORECASE), "preflight row count"),
        (re.search(r"IF matched_rows <> 12 THEN", preflight_sql, re.IGNORECASE), "12-row preflight abort"),
        (re.search(r"RAISE EXCEPTION", preflight_sql, re.IGNORECASE), "preflight exception"),
        (re.search(r"SELECT count\(\*\) INTO affected_rows FROM changed", apply_sql, re.IGNORECASE), "applied row count"),
        (re.search(r"IF affected_rows <> 12 THEN", apply_sql, re.IGNORECASE), "12-row apply abort"),
        (re.search(r"RAISE EXCEPTION", apply_sql, re.IGNORECASE), "apply exception"),
    )
    missing_guards = [label for matched, label in required_guards if not matched]
    if missing_guards:
        print("ERROR: forward migration is missing safety guard(s): " + ", ".join(missing_guards))
        return 1

    # Reconciliation must remain a content-only operation. Progress, enrollment,
    # course catalog, and other tables are outside this migration's write scope.
    if len(re.findall(r"(?im)^\s*INSERT\s+INTO\s+public\.lesson_content\b", apply_sql)) != 1:
        print("ERROR: forward migration must write to public.lesson_content exactly once")
        return 1
    if re.search(r"(?im)^\s*(?:INSERT\s+INTO|UPDATE|DELETE\s+FROM|TRUNCATE)\s+public\.(?!lesson_content\b)[a-z_]+", apply_sql):
        print("ERROR: forward migration contains a write to a table outside public.lesson_content")
        return 1
    if re.search(r"\b(?:lesson_progress|enrollments|courses)\b", apply_sql, re.IGNORECASE):
        print("ERROR: forward migration must not reference learner progress, enrollments, or course catalog in its apply phase")
        return 1
    if not re.search(
        r"(?is)DO\s+\$apply\$.*?ON\s+CONFLICT\s*\(\s*lesson_key\s*\)\s+DO\s+UPDATE\s+SET\s+title\s*=\s*EXCLUDED\.title\s*,\s*content_html\s*=\s*EXCLUDED\.content_html\s*,\s*updated_at\s*=\s*now\(\)\s+WHERE\s+public\.lesson_content\.course_id\s*=\s*EXCLUDED\.course_id",
        forward_sql,
    ):
        print("ERROR: forward migration update scope must remain title/content_html/updated_at with a course_id match")
        return 1

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

    # The static lesson shell and the protected database row must stay aligned.
    # The shared runtime injects content_html into .lesson-content, while the
    # page's visible H1 remains part of the static HTML shell.
    for key in EXPECTED_KEYS:
        page_path = ROOT / key
        if not page_path.is_file():
            print(f"ERROR: static lesson page is missing for {key}")
            return 1
        page_html = page_path.read_text(encoding="utf-8")
        title_values = tuple_string_values(effective[key], f"effective row {key}")
        expected_title = title_values[2]
        heading_match = re.search(r"<h1[^>]*>(.*?)</h1>", page_html, re.IGNORECASE | re.DOTALL)
        if not heading_match:
            print(f"ERROR: static lesson page has no H1 heading for {key}")
            return 1
        actual_heading = html.unescape(re.sub(r"<[^>]+>", "", heading_match.group(1))).strip()
        if actual_heading != expected_title:
            print(f"ERROR: static H1 heading differs from effective database title for {key}")
            return 1
        if ".lesson-content" not in page_html or f'data-lesson-key="{key}"' not in page_html:
            print(f"ERROR: static lesson page is not wired to its exact protected content key for {key}")
            return 1
            print(f"ERROR: static lesson page is not wired to its exact protected content key for {key}")
            return 1

    print("PASS: historical release migration remains byte-identical to its recorded Git blob.")
    print("PASS: 38 historical baseline tuples and 38 seed tuples have the expected ordered keys.")
    print("PASS: forward migration overlays exactly the 12 post-release drifted lesson rows.")
    print("PASS: preflight guards the exact historical values for those same 12 rows.")
    print("PASS: transaction, row-lock, 12-row preflight, and 12-row apply guards are present.")
    print("PASS: reconciliation writes only lesson_content title/body/timestamp; learner progress and enrollments are outside scope.")
    print("PASS: effective post-migration payload matches all five seed files exactly.")
    print("PASS: all 38 static H1 headings and protected lesson-content keys match the effective payload.")
    print("No database connection was made; no files or lesson content were changed by this validator.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
