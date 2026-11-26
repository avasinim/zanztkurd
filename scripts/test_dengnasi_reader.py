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
LESSON17_URL = f"{BASE_URL}/lessons/kurmanji-dengnasi-lesson-17.html"
LESSON17_TITLE = "Eyn, K/G/Q û komên konsonantî di kurdî de"
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

    def open_lesson(self, project_url: str, lesson_url: str = LESSON_URL):
        context = self.browser.new_context(viewport={"width": 1280, "height": 900})
        context.add_init_script("""
            window.__dengnasiTest = { fromCalls: [], lessonKeys: [], rpcCalls: [], authCalls: [] };
            window.supabase = {
              createClient: (url) => {
                window.__dengnasiTest.projectUrl = url;
                return {
                  auth: {
                    getSession: async () => {
                      window.__dengnasiTest.authCalls.push("getSession");
                      return {
                      data: { session: { user: { id: "browser-test-user" } } },
                      error: null
                    };
                    }
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
                    const builder = {
                      select: () => builder,
                      eq: (column, value) => {
                        if (column === "lesson_key") window.__dengnasiTest.lessonKeys.push(value);
                        return builder;
                      },
                      limit: () => builder,
                      maybeSingle: async () => ({
                        data: {
                          content_html:
                            '<article id="dengnasi-test-content"><h2>Test-project lesson body</h2><p>Rendered from the isolated browser fixture.</p></article>'
                        },
                        error: null
                      }),
                      then: (resolve, reject) =>
                        Promise.resolve({ data: [], error: null }).then(resolve, reject)
                    };
                    return builder;
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
        page.goto(lesson_url, wait_until="domcontentloaded")
        return context, page

    def assert_source_note_is_normalized(self, page):
        note = page.locator(".klesson-hero p").inner_text()
        self.assertIn("Naveroka dersê ji nû ve hatiye avakirin", note)
        self.assertNotIn("bê guhertin", note)
        self.assertNotIn("PDF li ser rûpela destpêkê", note)
        self.assertNotIn("بارکردنی نێوەڕۆکی وانەکە", page.content())

    def test_production_project_fails_closed_before_lesson_query(self):
        context, page = self.open_lesson(PRODUCTION_PROJECT_URL)
        try:
            page.get_by_text("وانەکان لە ژینگەی تاقیکردنەوەدان").wait_for()
            self.assert_source_note_is_normalized(page)
            self.assertEqual(page.locator(".klesson-hero h1").inner_text(), "Dergeh: dengnasî û lêkolînên pêşîn")
            state = page.evaluate("window.__dengnasiTest")
            self.assertEqual(page.evaluate("window.ZANSTI_SUPABASE.url"), PRODUCTION_PROJECT_URL)
            self.assertEqual(state["fromCalls"], [])
            self.assertEqual(state["lessonKeys"], [])
            self.assertEqual(state["authCalls"], [])
            self.assertEqual(state["rpcCalls"], [])
            self.assertFalse(page.locator("#dengnasi-test-content").count())
        finally:
            context.close()

    def test_test_project_loads_content_after_auth_and_enrollment(self):
        context, page = self.open_lesson(TEST_PROJECT_URL)
        try:
            page.locator("#dengnasi-test-content").wait_for()
            self.assert_source_note_is_normalized(page)
            self.assertEqual(page.locator(".klesson-hero h1").inner_text(), "Dergeh: dengnasî û lêkolînên pêşîn")
            state = page.evaluate("window.__dengnasiTest")
            self.assertEqual(state["projectUrl"], TEST_PROJECT_URL)
            self.assertEqual(state["fromCalls"].count("lesson_content"), 1)
            self.assertIn("lesson_progress", state["fromCalls"])
            self.assertEqual(state["lessonKeys"], ["kurmanji-dengnasi-lesson-01.html"])
            self.assertIn("student_has_enrollment", state["rpcCalls"])
            self.assertIn("Test-project lesson body", page.locator(".lesson-content").inner_text())
        finally:
            context.close()


    def test_lesson_17_title_covers_all_source_topics_in_latin_script(self):
        context, page = self.open_lesson(TEST_PROJECT_URL, LESSON17_URL)
        try:
            page.locator("#dengnasi-test-content").wait_for()
            self.assertEqual(page.locator(".klesson-hero h1").inner_text(), LESSON17_TITLE)
            self.assertEqual(page.title(), f"Ders 17 — {LESSON17_TITLE} | Dengnasîya Zimanê Kurdî")
            self.assertNotRegex(page.locator(".klesson-hero h1").inner_text(), r"[\\u0621-\\u064A]")
            self.assertNotRegex(page.title(), r"[\\u0621-\\u064A]")
        finally:
            context.close()


if __name__ == "__main__":
    unittest.main(verbosity=2)
