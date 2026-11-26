#!/usr/bin/env python3
"""Browser smoke tests for the Dengnasi course UI using a local Supabase stub.

These tests validate page wiring and client behavior only. Database RLS and
progression are covered separately by rollback-only probes in the test project.
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
PAYLOAD_PATH = ROOT / "docs/previews/dengnasi-content-html-payload-preview.json"


class DengnasiCourseBrowserTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        payload = json.loads(PAYLOAD_PATH.read_text(encoding="utf-8"))
        rows = {item["lesson_key"]: item["content_html"] for item in payload["lessons"]}
        cls.rows_json = json.dumps(rows, ensure_ascii=False)
        cls.server = subprocess.Popen(
            [sys.executable, "-m", "http.server", "8766", "--bind", "127.0.0.1"],
            cwd=ROOT,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )
        time.sleep(1)
        cls.playwright = sync_playwright().start()
        cls.browser = cls.playwright.chromium.launch()
        cls.context = cls.browser.new_context(viewport={"width": 390, "height": 844})
        cls.config_js = r"""
(() => {
  const rows = __ROWS__;
  const mode = () => new URLSearchParams(location.search).get("test_access") || "owner";
  const client = {
    auth: {
      getSession: async () => ({
        data: { session: mode() === "signed_out" ? null : {
          user: { id: mode() === "owner" ? "test-owner" : "test-student" }
        }},
        error: null
      })
    },
    rpc: async (name, args = {}) => {
      if (name === "is_site_owner") return {data: mode() === "owner", error: null};
      if (name === "student_has_enrollment") {
        return {data: !["signed_out", "unenrolled"].includes(mode()), error: null};
      }
      if (name === "can_read_lesson_content") {
        const allowed = mode() !== "locked" ||
          args.p_lesson_key === "kurmanji-dengnasi-lesson-01.html";
        return {data: allowed, error: null};
      }
      return {data: null, error: null};
    },
    from: (table) => ({
      select: () => ({
        eq: (column, key) => ({
          limit: () => ({
            maybeSingle: async () => ({
              data: rows[key] ? {content_html: rows[key]} : null,
              error: null
            })
          })
        })
      })
    })
  };
  window.ZANSTI_SUPABASE = {
    ready: true, url: "https://example.invalid", publishableKey: "test-only"
  };
  window.supabase = {createClient: () => client};
  window.ZANSTI_GET_SUPABASE_CLIENT = () => client;
})();
""".replace("__ROWS__", cls.rows_json)
        cls.context.route(
            "**/supabase-config.js*",
            lambda route: route.fulfill(
                status=200, content_type="application/javascript", body=cls.config_js
            ),
        )
        cls.context.route(
            "**/cdn.jsdelivr.net/npm/@supabase/supabase-js@2*",
            lambda route: route.fulfill(
                status=200,
                content_type="application/javascript",
                body="window.supabase=window.supabase||{};",
            ),
        )
        cls.context.route(
            "**/*.supabase.co/**",
            lambda route: route.abort(),
        )
        cls.page = cls.context.new_page()

    @classmethod
    def tearDownClass(cls):
        cls.browser.close()
        cls.playwright.stop()
        cls.server.terminate()
        cls.server.wait(timeout=5)

    def test_course_index_has_all_27_ordered_lesson_links(self):
        page = self.page
        page.goto(f"{BASE_URL}/kurmanji-dengnasi-course.html")
        links = page.locator(".deng-lessons a")
        self.assertEqual(links.count(), 27)
        for index in range(27):
            expected = f"kurmanji-dengnasi-lesson-{index + 1:02}.html"
            self.assertTrue(links.nth(index).get_attribute("href").endswith(expected))
        self.assertNotIn("ئامادەکردندایە", page.locator("body").inner_text())

    def test_owner_can_render_all_27_protected_lesson_bodies(self):
        page = self.page
        for number in range(1, 28):
            key = f"kurmanji-dengnasi-lesson-{number:02}.html"
            page.goto(f"{BASE_URL}/lessons/{key}?test_access=owner")
            box = page.locator(".lesson-content")
            box.wait_for(state="visible")
            page.wait_for_function(
                "() => document.querySelector('.lesson-content')?.getAttribute('aria-busy') === 'false'"
            )
            self.assertTrue(box.locator("h2").count() > 0, key)
            self.assertIn("Çavkanî", box.inner_text(), key)
            self.assertEqual(box.get_attribute("data-lesson-key"), key)

    def test_enrolled_student_can_open_first_lesson_and_unlocked_second_lesson(self):
        page = self.page
        for number in (1, 2):
            key = f"kurmanji-dengnasi-lesson-{number:02}.html"
            page.goto(f"{BASE_URL}/lessons/{key}?test_access=student")
            page.wait_for_function(
                "() => document.querySelector('.lesson-content')?.getAttribute('aria-busy') === 'false'"
            )
            self.assertTrue(page.locator(".lesson-content h2").count() > 0)

    def test_signed_out_user_is_redirected_to_auth(self):
        page = self.page
        page.goto(f"{BASE_URL}/lessons/kurmanji-dengnasi-lesson-01.html?test_access=signed_out")
        page.wait_for_url("**/auth.html?next=**")
        self.assertIn("auth.html?next=", page.url)

    def test_non_enrolled_user_is_redirected_to_enrollment(self):
        page = self.page
        page.goto(f"{BASE_URL}/lessons/kurmanji-dengnasi-lesson-01.html?test_access=unenrolled")
        page.wait_for_url("**/dashboard.html?enroll=required&course=kurmanji-dengnasi-27")
        self.assertIn("enroll=required", page.url)

    def test_locked_second_lesson_is_redirected(self):
        page = self.page
        page.goto(f"{BASE_URL}/lessons/kurmanji-dengnasi-lesson-02.html?test_access=locked")
        page.wait_for_url("**/dashboard.html?lesson=locked")
        self.assertIn("lesson=locked", page.url)

    def test_mobile_course_index_has_no_horizontal_overflow(self):
        page = self.page
        page.set_viewport_size({"width": 390, "height": 844})
        page.goto(f"{BASE_URL}/kurmanji-dengnasi-course.html")
        sizes = page.evaluate(
            "() => ({width: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth})"
        )
        self.assertLessEqual(sizes["scroll"], sizes["width"] + 1, str(sizes))


if __name__ == "__main__":
    unittest.main(verbosity=2)
