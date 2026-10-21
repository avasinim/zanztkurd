#!/usr/bin/env python3
"""Real-browser regression checks for the north-circle Kurmanji pathway."""
from __future__ import annotations

import subprocess
import sys
import time
import unittest
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
BASE_URL = "http://127.0.0.1:8765"


class NorthCircleBrowserTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.server = subprocess.Popen(
            [sys.executable, "-m", "http.server", "8765", "--bind", "127.0.0.1"],
            cwd=ROOT,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )
        time.sleep(1)
        cls.playwright = sync_playwright().start()
        cls.browser = cls.playwright.chromium.launch()
        cls.context = cls.browser.new_context(viewport={"width": 390, "height": 844})
        # Learning portal auth is stubbed locally so the test never contacts Supabase.
        cls.context.add_init_script("""
            window.supabase = {
              createClient: () => ({
                auth: { getSession: async () => ({
                  data: { session: { user: {
                    email_confirmed_at: "2026-01-01T00:00:00Z",
                    phone_confirmed_at: null
                  }}}
                })},
                rpc: async (name) => ({data: name === "is_site_owner" ? true : true, error: null})
              })
            };
        """)
        cls.context.route(
            "**/supabase-config.js*",
            lambda route: route.fulfill(
                status=200,
                content_type="application/javascript",
                body='window.ZANSTI_SUPABASE={ready:true,url:"https://example.invalid",publishableKey:"test"};',
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
        cls.page = cls.context.new_page()

    @classmethod
    def tearDownClass(cls):
        cls.browser.close()
        cls.playwright.stop()
        cls.server.terminate()
        cls.server.wait(timeout=5)

    def test_catalog_north_circle_hides_general_catalog_and_routes_both_courses(self):
        page = self.page
        page.goto(f"{BASE_URL}/lessons/catalog.html", wait_until="domcontentloaded")
        page.locator('[data-region="north"]').click()
        self.assertFalse(page.locator("#northChoices").is_hidden())
        self.assertTrue(page.locator("#catalogTools").is_hidden())
        self.assertTrue(page.locator("#catalog").is_hidden())
        self.assertTrue(page.locator("#overallProgress").is_hidden())
        self.assertTrue(page.locator(".catalog-hero").is_hidden())
        self.assertTrue(page.locator(".student-access-strip").is_hidden())
        self.assertTrue(page.locator(".catalog-intro").is_hidden())
        self.assertEqual(
            page.locator('#northChoices [data-language^="kurmanji-course-"]').count(), 2
        )
        self.assertTrue(page.locator("#northChoices").inner_text().find("58") == -1)

        page.locator('[data-language="kurmanji-course-1"]').click()
        self.assertTrue(page.url.endswith("/kurmanji-course-1.html"))

        page.goto(f"{BASE_URL}/lessons/catalog.html", wait_until="domcontentloaded")
        page.locator('[data-region="north"]').click()
        page.locator('[data-language="kurmanji-course-2"]').click()
        self.assertTrue(page.url.endswith("/kurmanji-course-2.html"))

    def test_learning_north_circle_hides_general_curriculum_and_restores_it(self):
        page = self.page
        page.goto(f"{BASE_URL}/learning.html", wait_until="domcontentloaded")
        page.locator('[data-learning-region="north"]').click()
        self.assertTrue(page.locator(".learning-lessons").is_hidden())
        self.assertFalse(page.locator("#learningNorthChoices").is_hidden())
        page.locator('[data-learning-choice="kurmanji"]').click()
        self.assertFalse(page.locator("#learningKurmanjiCourses").is_hidden())
        self.assertEqual(page.locator("#learningKurmanjiCourses [data-learning-course]").count(), 2)

        page.locator('[data-learning-region="central"]').click()
        self.assertFalse(page.locator(".learning-lessons").is_hidden())
        self.assertTrue(page.locator("#learningKurmanjiCourses").is_hidden())

    def test_mobile_catalog_has_no_horizontal_overflow(self):
        page = self.page
        page.goto(f"{BASE_URL}/lessons/catalog.html", wait_until="domcontentloaded")
        page.locator('[data-region="north"]').click()
        sizes = page.evaluate(
            """() => ({width: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth, offenders: [...document.querySelectorAll("body *")].map(e => ({tag:e.tagName, id:e.id, cls:typeof e.className === "string" ? e.className : "", left:Math.round(e.getBoundingClientRect().left), right:Math.round(e.getBoundingClientRect().right), display:getComputedStyle(e).display})).filter(e => e.display !== "none" && (e.right > document.documentElement.clientWidth + 2 || e.left < -2)).sort((a,b) => b.right-a.right).slice(0,12)})"""
        )
        self.assertLessEqual(sizes["scroll"], sizes["width"] + 1, f"mobile horizontal overflow: {sizes}")


if __name__ == "__main__":
    unittest.main(verbosity=2)
