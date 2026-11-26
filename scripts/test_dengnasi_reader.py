#!/usr/bin/env python3
"""Browser integration checks for Dengnasi lesson access and test-project isolation."""
from __future__ import annotations

import subprocess
import sys
import time
import unittest
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
BASE_URL = "http://127.0.0.1:8766"
LESSON_URL = f"{BASE_URL}/lessons/kurmanji-dengnasi-lesson-01.html"
TEST_PROJECT_URL = "https://juwsjljbdwyncicybwoq.supabase.co"
PRODUCTION_PROJECT_URL = "https://hjpmorabqdhuchpnowiw.supabase.co"


class DengnasiReaderBrowserTests(unittest.TestCase):
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

    @classmethod
    def tearDownClass(cls):
        cls.browser.close()
        cls.playwright.stop()
        cls.server.terminate()
        cls.server.wait(timeout=5)

    def open_lesson(self, project_url: str):
        context = self.browser.new_context(viewport={"width": 1280, "height": 900})
        context.add_init_script("""
            window.__dengnasiTest = { fromCalls: [], lessonKeys: [], rpcCalls: [] };
            window.supabase = {
              createClient: (url) => {
                window.__dengnasiTest.projectUrl = url;
                return {
                  auth: {
                    getSession: async () => ({
                      data: { session: { user: { id: "browser-test-user" } } },
                      error: null
                    })
                  },
                  rpc: async (name) => {
                    window.__dengnasiTest.rpcCalls.push(name);
                    if (name === "is_site_owner") return { data: false, error: null };
                    if (name === "student_has_enrollment") return { data: true, error: null };
                    if (name === "can_read_lesson_content") return { data: true, error: null };
                    return { data: true, error: null };
                  },
                  from: (table) => {
                    window.__dengnasiTest.fromCalls.push(table);
                    return {
                      select: () => ({
                        eq: (_column, value) => {
                          window.__dengnasiTest.lessonKeys.push(value);
                          return {
                            limit: () => ({
                              maybeSingle: async () => ({
                                data: {
                                  content_html:
                                    '<article id="dengnasi-test-content"><h2>Test-project lesson body</h2><p>Rendered from the isolated browser fixture.</p></article>'
                                },
                                error: null
                              })
                            })
                          };
                        }
                      })
                    };
                  }
                };
              }
            };
        """)
        context.route(
            "**/cdn.jsdelivr.net/npm/@supabase/supabase-js@2*",
            lambda route: route.fulfill(
                status=200,
                content_type="application/javascript",
                body="window.supabase=window.supabase||{};",
            ),
        )
        config = (
            "window.ZANSTI_SUPABASE={ready:true,"
            f'url:"{project_url}",publishableKey:"browser-test-key"'
            "};"
        )
        context.route(
            "**/supabase-config.js*",
            lambda route: route.fulfill(
                status=200,
                content_type="application/javascript",
                body=config,
            ),
        )
        page = context.new_page()
        page.goto(LESSON_URL, wait_until="domcontentloaded")
        return context, page

    def test_production_project_fails_closed_before_lesson_query(self):
        context, page = self.open_lesson(PRODUCTION_PROJECT_URL)
        try:
            page.get_by_text("وانەکان لە ژینگەی تاقیکردنەوەدان").wait_for()
            state = page.evaluate("window.__dengnasiTest")
            self.assertEqual(state["projectUrl"], PRODUCTION_PROJECT_URL)
            self.assertEqual(state["fromCalls"], [])
            self.assertEqual(state["lessonKeys"], [])
            self.assertFalse(page.locator("#dengnasi-test-content").count())
        finally:
            context.close()

    def test_test_project_loads_content_after_auth_and_enrollment(self):
        context, page = self.open_lesson(TEST_PROJECT_URL)
        try:
            page.locator("#dengnasi-test-content").wait_for()
            state = page.evaluate("window.__dengnasiTest")
            self.assertEqual(state["projectUrl"], TEST_PROJECT_URL)
            self.assertEqual(state["fromCalls"], ["lesson_content"])
            self.assertEqual(state["lessonKeys"], ["kurmanji-dengnasi-lesson-01.html"])
            self.assertIn("student_has_enrollment", state["rpcCalls"])
            self.assertIn("Test-project lesson body", page.locator(".lesson-content").inner_text())
        finally:
            context.close()


if __name__ == "__main__":
    unittest.main(verbosity=2)
