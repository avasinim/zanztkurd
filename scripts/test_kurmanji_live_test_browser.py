#!/usr/bin/env python3
"""Read-only real-browser smoke test against the isolated Kurmanji Test project.

This runner never registers users, enrolls accounts, completes lessons, writes
progress, runs migrations, or seeds data. It requires a pre-provisioned Test
student enrolled in both Kurmanji courses.
"""
from __future__ import annotations

import json
import os
import subprocess
import sys
import time
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1]
BASE_URL = "http://127.0.0.1:8766"
EXPECTED_TEST_URL = "https://juwsjljbdwyncicybwoq.supabase.co"
PRODUCTION_HOST = "hjpmorabqdhuchpnowiw.supabase.co"
READ_ONLY_RPC = {"is_site_owner", "student_has_enrollment", "can_read_lesson_content"}
COURSES = (
    ("kurmanji-course-1-lesson-01.html", "kurmanji-course-1-lesson-01.html"),
    ("kurmanji-course-2-lesson-01.html", "kurmanji-course-2-lesson-01.html"),
)


def read_test_config() -> tuple[str, str, str, str]:
    """Validate explicit Test-only settings without printing secret values."""
    url = os.environ.get("AVASIN_TEST_SUPABASE_URL", "").strip()
    key = os.environ.get("AVASIN_TEST_SUPABASE_PUBLISHABLE_KEY", "").strip()
    email = os.environ.get("AVASIN_TEST_STUDENT_EMAIL", "").strip()
    password = os.environ.get("AVASIN_TEST_STUDENT_PASSWORD", "")

    missing = [
        name
        for name, value in (
            ("AVASIN_TEST_SUPABASE_URL", url),
            ("AVASIN_TEST_SUPABASE_PUBLISHABLE_KEY", key),
            ("AVASIN_TEST_STUDENT_EMAIL", email),
            ("AVASIN_TEST_STUDENT_PASSWORD", password),
        )
        if not value
    ]
    if missing:
        raise RuntimeError("Missing required Test-only environment variable(s): " + ", ".join(missing))

    parsed = urlsplit(url)
    if (
        url != EXPECTED_TEST_URL
        or parsed.scheme != "https"
        or parsed.netloc != "juwsjljbdwyncicybwoq.supabase.co"
        or parsed.path
        or parsed.query
        or parsed.fragment
        or parsed.hostname == PRODUCTION_HOST
    ):
        raise RuntimeError("Refusing to run: Supabase URL is not the approved isolated Test project.")

    if not key.startswith("sb_publishable_"):
        raise RuntimeError("Refusing to run: browser key must be a Supabase publishable key, never a secret/service-role key.")

    return url, key, email, password


def lesson_text_is_real(text: str) -> bool:
    normalized = " ".join(text.split())
    if len(normalized) < 80:
        return False
    blocked_phrases = (
        "بارکردنی نێوەڕۆکی وانەکە",
        "نەتوانرا نێوەڕۆکی وانەکە",
        "هەڵەیەک لە بارکردنی نێوەڕۆکی وانەکە",
        "UNEXPECTED_PRIVATE_CONTENT",
    )
    return not any(phrase in normalized for phrase in blocked_phrases)


def run_browser_smoke_test() -> None:
    url, key, email, password = read_test_config()

    try:
        from playwright.sync_api import sync_playwright
    except ImportError as exc:
        raise RuntimeError("Playwright is required: install it with python -m pip install playwright and python -m playwright install chromium.") from exc

    server = subprocess.Popen(
        [sys.executable, "-m", "http.server", "8766", "--bind", "127.0.0.1"],
        cwd=ROOT,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    browser = None
    blocked_hosts: list[str] = []
    blocked_writes: list[str] = []
    try:
        time.sleep(1)
        if server.poll() is not None:
            raise RuntimeError("Local static test server failed to start.")

        with sync_playwright() as playwright:
            browser = playwright.chromium.launch()
            context = browser.new_context(viewport={"width": 390, "height": 844})

            def isolate_supabase(route):
                request = route.request
                parsed = urlsplit(request.url)
                host = parsed.hostname or ""

                if parsed.path.endswith("/supabase-config.js"):
                    config_js = (
                        "window.ZANSTI_SUPABASE={ready:true,"
                        f"url:{json.dumps(url)},"
                        f"publishableKey:{json.dumps(key)}"
                        "};"
                    )
                    route.fulfill(status=200, content_type="application/javascript", body=config_js)
                    return

                test_host = urlsplit(url).hostname
                if host.endswith(".supabase.co") and host != test_host:
                    blocked_hosts.append(host)
                    route.abort()
                    return

                if host == test_host:
                    method = request.method.upper()
                    path = parsed.path
                    is_auth_token = path == "/auth/v1/token" and method == "POST"
                    rpc_name = path.rsplit("/", 1)[-1] if "/rest/v1/rpc/" in path else ""
                    is_read_only_rpc = path.startswith("/rest/v1/rpc/") and rpc_name in READ_ONLY_RPC and method == "POST"
                    is_read = method in {"GET", "HEAD", "OPTIONS"}
                    if not (is_auth_token or is_read_only_rpc or is_read):
                        blocked_writes.append(f"{method} {path}")
                        route.abort()
                        return

                route.continue_()

            context.route("**/*", isolate_supabase)
            page = context.new_page()
            page.goto(
                f"{BASE_URL}/auth.html?next=kurmanji-course-1-lesson-01.html",
                wait_until="domcontentloaded",
            )
            page.locator("#loginEmail").wait_for(state="visible", timeout=15000)
            page.locator("#loginEmail").fill(email)
            page.locator("#loginPassword").fill(password)
            page.locator("#loginSubmit").click()
            page.wait_for_url("**/kurmanji-course-1-lesson-01.html", timeout=20000)

            for page_name, expected_key in COURSES:
                if not page.url.endswith(page_name):
                    page.goto(f"{BASE_URL}/{page_name}", wait_until="domcontentloaded")

                box = page.locator(".lesson-content")
                box.wait_for(state="visible", timeout=10000)
                page.wait_for_function(
                    """() => {
                      const box = document.querySelector('.lesson-content');
                      return !!box && box.getAttribute('aria-busy') === 'false'
                        && (box.innerText || '').trim().length >= 80;
                    }""",
                    timeout=20000,
                )
                actual_key = box.get_attribute("data-lesson-key")
                rendered = box.inner_text()
                if actual_key != expected_key or not lesson_text_is_real(rendered):
                    raise AssertionError(f"Test lesson content check failed for {page_name}.")
                print(f"PASS: authenticated Test learner read {page_name} (content body not logged).")

            # Reuse the routed context so the anonymous check cannot fall back
            # to the production supabase-config.js. Clear all browser auth state
            # first, then navigate in the same Test-isolated request context.
            context.clear_cookies()
            page.evaluate("() => { localStorage.clear(); sessionStorage.clear(); }")
            page.goto(
                f"{BASE_URL}/kurmanji-course-1-lesson-01.html",
                wait_until="domcontentloaded",
            )
            page.wait_for_url("**/auth.html**", timeout=15000)
            if "auth.html" not in page.url:
                raise AssertionError("Unauthenticated browser was not redirected to the login page.")
            print("PASS: unauthenticated browser was redirected before protected lesson access.")

            if blocked_hosts:
                raise AssertionError("Unexpected non-Test Supabase host was blocked; isolation check failed.")
            if blocked_writes:
                raise AssertionError("A non-read-only Supabase request was blocked: " + ", ".join(blocked_writes))

            print("PASS: no lesson completion, enrollment, progress, or other database write was issued.")
    finally:
        if browser is not None:
            browser.close()
        server.terminate()
        try:
            server.wait(timeout=5)
        except subprocess.TimeoutExpired:
            server.kill()
            server.wait(timeout=5)


if __name__ == "__main__":
    try:
        run_browser_smoke_test()
    except Exception as exc:
        print(f"FAIL: {exc}", file=sys.stderr)
        raise SystemExit(1)
