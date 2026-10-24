#!/usr/bin/env python3
"""Parse the Kurmanji migration and split seed SQL with PostgreSQL's parser.

This check is read-only. It never connects to a database or rewrites lesson text.
It validates SQL syntax only; it does not claim payload equivalence or schema validity.
"""
from pathlib import Path
import sys

from pglast import parse_sql
from pglast.parser import ParseError

ROOT = Path(__file__).resolve().parents[1]
FILES = [
    ROOT / "supabase/migrations/20261019090000_add_kurmanji_courses_and_protected_lessons.sql",
    *sorted((ROOT / "docs").glob("kurmanji-content-seed-part-*.sql")),
]

errors = []
for path in FILES:
    if not path.is_file():
        errors.append(f"Missing SQL file: {path.relative_to(ROOT)}")
        continue
    source = path.read_text(encoding="utf-8")
    try:
        statements = parse_sql(source)
    except ParseError as exc:
        errors.append(f"PostgreSQL SQL parse failed for {path.relative_to(ROOT)}: {exc}")
        continue
    print(f"PASS: {path.relative_to(ROOT)} parsed as {len(statements)} PostgreSQL statement(s)")

if errors:
    print("\nPostgreSQL SQL syntax validation failed:", file=sys.stderr)
    for error in errors:
        print(f"- {error}", file=sys.stderr)
    sys.exit(1)

print("PostgreSQL SQL syntax validation passed for the migration and all split seed files.")
