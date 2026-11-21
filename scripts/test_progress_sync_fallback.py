#!/usr/bin/env python3
"""Browser regression tests for stale local progress after a server sync failure."""
from __future__ import annotations

import subprocess
import sys
import time
import unittest
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
BASE_URL = "http://127.0.0.1:8766"

MOCK_SUPABASE = r"""
(() => {
  window.ZANSTI_SUPABASE = {
    ready: true,
    url: "https://example.invalid",
    publishableKey: "test-publishable-key"
  };
  const session = {
    user: {
      id: "browser-regression-user",
      email_confirmed_at: "2026-01-01T00:00:00Z",
      phone_confirmed_at: null
    }
  };
  const progressError = { message: "simulated temporary lesson_progress read failure" };
  function query(table) {
    const q = {
      select() { return q; },
      eq() { return q; },
      limit() { return q; },
      maybeSingle() {
        if (table === "lesson_content") {
          return Promise.resolve({
            data: { content_html: "<p>Mock protected lesson content.</p>" },
            error: null
          });
        }
        return Promise.resolve({ data: null, error: progressError });
      },
      then(resolve, reject) {
        return Promise.resolve({ data: null, error: progressError }).then(resolve, reject);
      }
    };
    return q;
  }
  window.supabase = {
    createClient() {
      return {
        auth: { getSession: async () => ({ data: { session }, error: null }) },
        rpc: async (name) => {
          if (name === "is_site_owner") return { data: false, error: null };
          if (name === "student_has_enrollment") return { data: true, error: null };
          if (name === "can_read_lesson_content") return { data: true, error: null };
          return { data: null, error: null };
        },
        from: (table) => query(table)
      };
    }
  };
})();
"""


class ProgressSyncFallbackBrowserTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.server = subprocess.Popen(
            [sys.executable, "-m", "http.server", "8766", "--bind", "127.0.0.1"],
            cwd=ROOT,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )
        time.sleep(1)
        cls.playwright = sync_playwright().start()
        cls.browser = cls.playwright.chromium.launch()
        cls.context = cls.browser.new_context(viewport={"width": 1280, "height": 900})
        cls.context.add_init_script(MOCK_SUPABASE)
        cls.context.route(
            "**/cdn.jsdelivr.net/npm/@supabase/supabase-js@2*",
            lambda route: route.fulfill(
                status=200,
                content_type="application/javascript",
                body="window.supabase=window.supabase||{};",
            ),
        )
        cls.page = cls.context.new_page()

    @classmethod
    def tearDownClass(cls):
        cls.browser.close()
        cls.playwright.stop()
        cls.server.terminate()
        cls.server.wait(timeout=5)

    def test_course1_stale_completion_does_not_redirect_or_disable_button(self):
        page = self.page
        page.goto(f"{BASE_URL}/lessons/018.html", wait_until="domcontentloaded")
        page.evaluate(
            """() => localStorage.setItem(
              "zanztkurd_course1_completed_v2",
              JSON.stringify([0, 1, 2, 3, 4])
            )"""
        )
        page.reload(wait_until="domcontentloaded")
        page.locator(".course1-gate").wait_for(state="visible", timeout=10000)

        self.assertTrue(page.url.endswith("/lessons/018.html"))
        button = page.locator(".course1-complete-btn")
        self.assertTrue(button.is_visible())
        self.assertFalse(button.is_disabled())
        self.assertEqual(
            page.evaluate('localStorage.getItem("zanztkurd_course1_completed_v2")'),
            "[]",
        )

    def test_course2_stale_completion_does_not_redirect_or_disable_button(self):
        page = self.page
        page.goto(f"{BASE_URL}/lessons/course-2-02.html", wait_until="domcontentloaded")
        page.evaluate(
            """() => localStorage.setItem(
              "zanztkurd_course2_completed_v2",
              JSON.stringify([0, 1, 2, 3, 4])
            )"""
        )
        page.reload(wait_until="domcontentloaded")
        page.locator(".course2-gate").wait_for(state="visible", timeout=10000)

        self.assertTrue(page.url.endswith("/lessons/course-2-02.html"))
        button = page.locator(".course2-complete-btn")
        self.assertTrue(button.is_visible())
        self.assertFalse(button.is_disabled())
        self.assertEqual(
            page.evaluate('localStorage.getItem("zanztkurd_course2_completed_v2")'),
            "[]",
        )


if __name__ == "__main__":
    unittest.main(verbosity=2)
