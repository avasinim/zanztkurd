#!/usr/bin/env python3
"""Local Playwright regression tests for the 27 Dengnasi protected lesson pages.

Supabase is deliberately mocked: this suite validates browser routing, the shared
loader, legacy-PDF fail-closed behavior, and page-shell wiring without contacting
any Supabase project or modifying student data.
"""
from __future__ import annotations

import json
import subprocess
import sys
import time
import unittest
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
BASE_URL = "http://127.0.0.1:8766"
PAYLOAD_PATH = ROOT / "docs" / "previews" / "dengnasi-content-html-payload-preview.json"

BOOTSTRAP_TEMPLATE = r"""
window.__DENGNASI_TEST_STATE = __STATE__;
window.__DENGNASI_TEST_PAYLOADS = __PAYLOADS__;
window.supabase = {
  createClient: () => {
    const state = window.__DENGNASI_TEST_STATE;
    return {
      auth: {
        getSession: async () => ({
          data: {
            session: state.session === false
              ? null
              : { user: { id: "dengnasi-browser-test-user" } }
          },
          error: null
        })
      },
      rpc: async (name) => {
        if (name === "is_site_owner") return { data: state.owner === true, error: null };
        if (name === "student_has_enrollment") return { data: state.enrolled === true, error: null };
        if (name === "can_read_lesson_content") return { data: state.canRead === true, error: null };
        return { data: false, error: null };
      },
      from: () => {
        let lessonKey = null;
        const query = {
          select() { return query; },
          eq(column, value) {
            if (column === "lesson_key") lessonKey = value;
            return query;
          },
          limit() { return query; },
          maybeSingle: async () => {
            if (state.queryError) return { data: null, error: { message: "mock query error" } };
            if (state.missing) return { data: null, error: null };
            if (state.legacy) {
              return {
                data: { content_html: '<iframe src="Dengnasiya_Zimane_Kurdi_27_Wane_corrected.pdf"></iframe>' },
                error: null
              };
            }
            const lesson = window.__DENGNASI_TEST_PAYLOADS[lessonKey];
            return { data: lesson ? { content_html: lesson.content_html } : null, error: null };
          }
        };
        return query;
      }
    };
  }
};
window.ZANSTI_OWNER_CHECK = Promise.resolve(window.__DENGNASI_TEST_STATE.owner === true);
window.ZANSTI_SYNC_PROGRESS = async (courseId, files, storage) => {
  const completed = window.__DENGNASI_TEST_STATE.completed || [];
  localStorage.setItem(storage, JSON.stringify(completed));
  return true;
};
"""

class DengnasiLessonBrowserTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        if not PAYLOAD_PATH.exists():
            raise RuntimeError(f"Missing draft payload: {PAYLOAD_PATH}")
        payload = json.loads(PAYLOAD_PATH.read_text(encoding="utf-8"))
        if payload.get("lesson_count") != 27 or len(payload.get("lessons", [])) != 27:
            raise RuntimeError("Dengnasi draft payload must contain exactly 27 lessons")
        cls.lessons = payload["lessons"]
        cls.payload_map = {item["lesson_key"]: item for item in cls.lessons}

        cls.server = subprocess.Popen(
            [sys.executable, "-m", "http.server", "8766", "--bind", "127.0.0.1"],
            cwd=ROOT,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )
        time.sleep(1)
        cls.playwright = sync_playwright().start()
        cls.browser = cls.playwright.chromium.launch()

    @classmethod
    def tearDownClass(cls):
        cls.browser.close()
        cls.playwright.stop()
        cls.server.terminate()
        cls.server.wait(timeout=5)

    def make_page(self, state: dict):
        context = self.browser.new_context(viewport={"width": 1280, "height": 900})
        bootstrap = (
            BOOTSTRAP_TEMPLATE
            .replace("__STATE__", json.dumps(state))
            .replace("__PAYLOADS__", json.dumps(self.payload_map, ensure_ascii=False))
        )
        context.add_init_script(bootstrap)
        context.route(
            "**/supabase-config.js*",
            lambda route: route.fulfill(
                status=200,
                content_type="application/javascript",
                body='window.ZANSTI_SUPABASE={ready:true,url:"https://example.invalid",publishableKey:"test"};',
            ),
        )
        context.route(
            "**/cdn.jsdelivr.net/npm/@supabase/supabase-js@2*",
            lambda route: route.fulfill(
                status=200,
                content_type="application/javascript",
                body="window.supabase = window.supabase || {};",
            ),
        )
        return context, context.new_page()

    def test_all_27_pages_load_the_matching_authored_payload(self):
        context, page = self.make_page({"owner": True, "session": True})
        try:
            for lesson in self.lessons:
                number = lesson["number"]
                url = f"{BASE_URL}/lessons/{lesson['lesson_key']}"
                page.goto(url, wait_until="domcontentloaded")
                preview = page.locator(".lesson-content .klesson-preview")
                preview.wait_for(state="attached", timeout=8000)
                rendered = page.locator(".lesson-content").inner_text()
                self.assertEqual(
                    page.locator(".klesson-hero h1").inner_text(),
                    lesson["title"],
                    f"Lesson {number}: page title mismatch",
                )
                self.assertGreater(
                    page.locator(".lesson-content .klesson-preview h2").count(),
                    0,
                    f"Lesson {number}: authored lesson sections missing",
                )
                heading_parity = preview.evaluate(
                    """(element, expectedHtml) => {
                        const expectedRoot = document.createElement("div");
                        expectedRoot.innerHTML = expectedHtml;
                        const headings = root => Array.from(root.querySelectorAll("h2"))
                            .map(node => node.textContent.trim());
                        const expectedPreview = expectedRoot.querySelector(".klesson-preview");
                        return {
                            expected: headings(expectedRoot),
                            rendered: headings(element),
                            expectedHtml: expectedPreview ? expectedPreview.innerHTML : null,
                            renderedHtml: element.innerHTML,
                        };
                    }""",
                    lesson["content_html"],
                )
                self.assertEqual(
                    heading_parity["rendered"],
                    heading_parity["expected"],
                    f"Lesson {number}: rendered section headings differ from payload",
                )
                self.assertIsNotNone(
                    heading_parity["expectedHtml"],
                    f"Lesson {number}: authored payload preview wrapper missing",
                )
                self.assertEqual(
                    heading_parity["renderedHtml"],
                    heading_parity["expectedHtml"],
                    f"Lesson {number}: rendered lesson HTML differs from the exact authored payload",
                )
                printed_pages = lesson["printed_pages"]
                source_citation = (
                    f"rûpelên çapkirî {printed_pages['start']}–{printed_pages['end']}"
                )
                rendered_preview_text = preview.inner_text()
                self.assertIn(
                    source_citation,
                    rendered_preview_text,
                    f"Lesson {number}: printed-page citation does not match payload metadata",
                )
                self.assertTrue(rendered.strip(), f"Lesson {number}: empty rendered content")
                self.assertNotIn("Naveroka dersê tê barkirin...", rendered)
                self.assertEqual(page.locator(".lesson-content iframe").count(), 0)
                self.assertEqual(page.locator(".lesson-content .klesson-preview").count(), 1)
                self.assertEqual(
                    page.locator(".lesson-content .klesson-preview").get_attribute("lang"),
                    "ku",
                )
                self.assertEqual(
                    page.locator(".lesson-content .klesson-preview").get_attribute("dir"),
                    "ltr",
                )
                rendered_html = page.locator(".lesson-content .klesson-preview").inner_html()
                self.assertNotRegex(
                    rendered,
                    r"[\u0600-\u06FF]",
                    f"Lesson {number}: Arabic-script text found in rendered lesson",
                )
                self.assertNotRegex(
                    rendered,
                    r"[\u0400-\u04FF]",
                    f"Lesson {number}: Cyrillic-script text found in rendered lesson",
                )
                self.assertEqual(
                    page.locator(".lesson-content .klesson-preview audio, .lesson-content .klesson-preview video, .lesson-content .klesson-preview iframe, .lesson-content .klesson-preview embed, .lesson-content .klesson-preview object").count(),
                    0,
                    f"Lesson {number}: embedded media/object found in rendered lesson",
                )
                self.assertNotRegex(
                    rendered_html,
                    r"""(?:src|href)\s*=\s*["'][^"']*(?:\.mp3|\.wav|\.ogg|\.m4a|\.mp4|\.webm|youtube\.com|youtu\.be|soundcloud\.com)""",
                    f"Lesson {number}: external audio/video dependency found",
                )
        finally:
            context.close()

    def test_legacy_pdf_payload_is_blocked_after_authenticated_query(self):
        context, page = self.make_page({"owner": True, "session": True, "legacy": True})
        try:
            page.goto(f"{BASE_URL}/lessons/kurmanji-dengnasi-lesson-01.html")
            page.locator(".lesson-content .klesson-note").wait_for(timeout=8000)
            self.assertEqual(page.locator(".lesson-content iframe").count(), 0)
            self.assertEqual(page.locator(".lesson-content .klesson-preview").count(), 0)
        finally:
            context.close()

    def test_anonymous_visitor_is_redirected_to_auth(self):
        context, page = self.make_page({"session": False})
        try:
            page.goto(f"{BASE_URL}/lessons/kurmanji-dengnasi-lesson-01.html")
            page.wait_for_function("() => location.pathname.endsWith('/auth.html')", timeout=8000)
            self.assertIn("auth.html", page.url)
        finally:
            context.close()

    def test_non_enrolled_student_is_redirected_to_enrollment(self):
        context, page = self.make_page(
            {"owner": False, "session": True, "enrolled": False, "canRead": False, "completed": [0]}
        )
        try:
            page.goto(f"{BASE_URL}/lessons/kurmanji-dengnasi-lesson-01.html")
            page.wait_for_function(
                "() => location.pathname.endsWith('/dashboard.html') && new URL(location.href).searchParams.get('enroll') === 'required'",
                timeout=8000,
            )
            self.assertIn("course=kurmanji-dengnasi-27", page.url)
        finally:
            context.close()

    def test_enrolled_student_is_blocked_when_sequence_is_locked(self):
        context, page = self.make_page(
            {"owner": False, "session": True, "enrolled": True, "canRead": False, "completed": [0]}
        )
        try:
            page.goto(f"{BASE_URL}/lessons/kurmanji-dengnasi-lesson-02.html")
            page.wait_for_function(
                "() => location.pathname.endsWith('/dashboard.html') && new URL(location.href).searchParams.get('lesson') === 'locked'",
                timeout=8000,
            )
            self.assertIn("lesson=locked", page.url)
        finally:
            context.close()

    def test_enrolled_student_can_load_lesson_when_server_gate_allows_it(self):
        context, page = self.make_page(
            {"owner": False, "session": True, "enrolled": True, "canRead": True, "completed": [0]}
        )
        try:
            page.goto(f"{BASE_URL}/lessons/kurmanji-dengnasi-lesson-02.html")
            page.locator(".lesson-content .klesson-preview").wait_for(timeout=8000)
            self.assertEqual(
                page.locator(".klesson-hero h1").inner_text(),
                self.payload_map["kurmanji-dengnasi-lesson-02.html"]["title"],
            )
        finally:
            context.close()

    def test_site_owner_bypasses_enrollment_and_sequence_gate(self):
        context, page = self.make_page(
            {"owner": True, "session": True, "enrolled": False, "canRead": False}
        )
        try:
            page.goto(f"{BASE_URL}/lessons/kurmanji-dengnasi-lesson-02.html")
            page.locator(".lesson-content .klesson-preview").wait_for(timeout=8000)
        finally:
            context.close()

    def test_query_error_and_missing_row_show_safe_error_states(self):
        for state in (
            {"owner": True, "session": True, "queryError": True},
            {"owner": True, "session": True, "missing": True},
        ):
            context, page = self.make_page(state)
            try:
                page.goto(f"{BASE_URL}/lessons/kurmanji-dengnasi-lesson-01.html")
                page.locator(".lesson-content-error").wait_for(timeout=8000)
                self.assertEqual(page.locator(".lesson-content .klesson-preview").count(), 0)
            finally:
                context.close()


if __name__ == "__main__":
    unittest.main(verbosity=2)
