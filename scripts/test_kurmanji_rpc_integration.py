#!/usr/bin/env python3
"""Run Kurmanji progression RPC integration tests on a disposable PostgreSQL database.

This test creates a minimal Supabase-compatible auth/schema fixture, applies the
feature-branch migration to that isolated database, and exercises the real RPCs.
It never reads credentials from the repository or connects to a shared project.
"""
from __future__ import annotations

import os
import sys
from pathlib import Path

import psycopg

ROOT = Path(__file__).resolve().parents[1]
FIXTURE = ROOT / "supabase/tests/kurmanji_rpc_fixture.sql"
MIGRATION = ROOT / "supabase/migrations/20261118100000_enforce_full_lesson_prefix_progression.sql"
HELPER_TESTS = ROOT / "supabase/tests/kurmanji_full_prefix_progression.sql"
RPC_TESTS = ROOT / "supabase/tests/kurmanji_rpc_integration.sql"


def run_file(connection: psycopg.Connection, path: Path) -> None:
    if not path.is_file():
        raise FileNotFoundError(f"Required integration-test file is missing: {path.relative_to(ROOT)}")
    sql = path.read_text(encoding="utf-8")
    # Use the simple-query protocol so transaction-control statements and
    # multiple SQL statements in each checked-in test file execute as written.
    connection.execute(sql, prepare=False)
    print(f"PASS: {path.relative_to(ROOT)}")


def main() -> int:
    database_url = os.environ.get("DATABASE_URL")
    if not database_url:
        print("ERROR: DATABASE_URL must point to a disposable PostgreSQL database.", file=sys.stderr)
        return 2

    try:
        with psycopg.connect(database_url, autocommit=True) as connection:
            run_file(connection, FIXTURE)
            run_file(connection, MIGRATION)
            run_file(connection, HELPER_TESTS)
            run_file(connection, RPC_TESTS)
    except Exception as exc:  # Preserve the database error in CI logs.
        print(f"FAIL: Kurmanji PostgreSQL RPC integration: {exc}", file=sys.stderr)
        return 1

    print("PASS: Kurmanji progression helper and RPC integration tests.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
