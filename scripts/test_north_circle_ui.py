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

    def test_global_spelling_normalizer_never_rewrites_lesson_content(self):
        page = self.page
        page.goto(f"{BASE_URL}/index.html", wait_until="domcontentloaded")
        page.wait_for_load_state("networkidle")
        page.evaluate("""
            () => {
              const lesson = document.createElement("div");
              lesson.className = "lesson-content";
              lesson.innerHTML = '<p title="پێویست">پێویست نییە</p>';
              document.body.appendChild(lesson);

              const ordinary = document.createElement("p");
              ordinary.id = "normalizer-ui-fixture";
              ordinary.textContent = "پێویست";
              document.body.appendChild(ordinary);
            }
        """)
        page.wait_for_timeout(100)
        lesson_text = page.locator(".lesson-content p").inner_text()
        lesson_title = page.locator(".lesson-content p").get_attribute("title")
        ui_text = page.locator("#normalizer-ui-fixture").inner_text()
        self.assertEqual(lesson_text, "پێویست نییە")
        self.assertEqual(lesson_title, "پێویست")
        self.assertEqual(ui_text, "پەیویست")

    def test_unknown_kurmanji_lesson_key_is_rejected_before_content_query(self):
        context = self.browser.new_context(viewport={"width": 390, "height": 844})
        context.add_init_script("""
            window.__lessonContentQueries = 0;
            window.supabase = {
              createClient: () => ({
                auth: { getSession: async () => ({
                  data: { session: { user: { id: "synthetic-learner" } } }
                })},
                rpc: async (name) => ({
                  data: name === "is_site_owner" ? false :
                        name === "student_has_enrollment" ? true : true,
                  error: null
                }),
                from: (table) => {
                  if (table === "lesson_content") window.__lessonContentQueries += 1;
                  return {
                    select: () => ({
                      eq: () => ({
                        limit: () => ({
                          maybeSingle: async () => ({
                            data: { content_html: "<p>UNEXPECTED_CONTENT</p>" },
                            error: null
                          })
                        })
                      })
                    })
                  };
                }
              })
            };
        """)
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
                body="window.supabase=window.supabase||{};",
            ),
        )
        redirects = []

        def block_locked_dashboard(route):
            if "lesson=locked" in route.request.url:
                redirects.append(route.request.url)
                route.abort()
            else:
                route.continue_()

        context.route("**/dashboard.html*", block_locked_dashboard)
        page = context.new_page()
        lesson_html = (ROOT / "kurmanji-course-1-lesson-01.html").read_text(encoding="utf-8")
        page.route(
            "**/kurmanji-course-1-lesson-99.html",
            lambda route: route.fulfill(
                status=200,
                content_type="text/html",
                body=lesson_html,
            ),
        )
        page.goto(f"{BASE_URL}/kurmanji-course-1-lesson-99.html", wait_until="domcontentloaded")
        page.wait_for_timeout(300)
        self.assertTrue(redirects, "unknown lesson key did not enter the locked-lesson flow")
        self.assertEqual(
            page.evaluate("window.__lessonContentQueries"),
            0,
            "unknown lesson key must be rejected before querying lesson_content",
        )
        page.close()
        context.close()

    def test_phone_verified_student_can_open_course_scoped_learning_route(self):
        context = self.browser.new_context(viewport={"width": 390, "height": 844})
        context.add_init_script("""
            window.supabase = {
              createClient: () => ({
                auth: { getSession: async () => ({ data: { session: { user: {
                  id: "synthetic-phone-learner",
                  email_confirmed_at: null,
                  phone_confirmed_at: "2026-11-17T00:00:00Z"
                }}}})},
                rpc: async (name) => ({
                  data: name === "is_site_owner" ? false :
                        name === "student_has_enrollment" ? true : true,
                  error: null
                }),
                from: () => ({
                  select: () => ({
                    eq: () => ({
                      eq: async () => ({data: [], error: null})
                    })
                  })
                })
              })
            };
        """)
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
                body="window.supabase=window.supabase||{};",
            ),
        )
        page = context.new_page()
        page.goto(f"{BASE_URL}/learning.html?course=1", wait_until="domcontentloaded")
        page.wait_for_timeout(500)
        self.assertTrue(
            page.url.endswith("/learning.html?course=1"),
            f"phone-verified enrolled learner was redirected unexpectedly: {page.url}",
        )
        self.assertFalse("verify=required" in page.url)
        page.close()
        context.close()

    def test_kurmanji_completion_uses_server_rpc_then_opens_next_lesson(self):
        context = self.browser.new_context(viewport={"width": 390, "height": 844})
        context.add_init_script("""
            window.__rpcCalls = [];
            const session = {user: {
              id: "synthetic-kurmanji-learner",
              email_confirmed_at: "2026-01-01T00:00:00Z",
              phone_confirmed_at: null
            }};
            const client = {
              auth: { getSession: async () => ({data: {session}, error: null}) },
              rpc: async (name, args) => {
                window.__rpcCalls.push({name, args});
                if (name === "is_site_owner") return {data: false, error: null};
                if (name === "student_has_enrollment") return {data: true, error: null};
                if (name === "can_read_lesson_content") return {data: true, error: null};
                if (name === "complete_lesson") return {
                  data: {status: "active", completed_count: 1, total_lessons: 26},
                  error: null
                };
                return {data: null, error: null};
              },
              from: (table) => ({
                select: () => ({
                  eq: () => ({
                    eq: () => ({
                      limit: () => ({
                        maybeSingle: async () => ({
                          data: {content_html: "<p>synthetic lesson body</p>"},
                          error: null
                        })
                      }),
                      then: (resolve) => resolve({data: [], error: null})
                    })
                  })
                })
              })
            };
            window.supabase = {createClient: () => client};
            window.ZANSTI_GET_SUPABASE_CLIENT = () => client;
            window.ZANSTI_OWNER_CHECK = Promise.resolve(false);
            window.ZANSTI_SYNC_PROGRESS = async () => true;
        """)
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
                body="window.supabase=window.supabase||{};",
            ),
        )
        page = context.new_page()
        page.goto(
            f"{BASE_URL}/kurmanji-course-1-lesson-01.html",
            wait_until="domcontentloaded",
        )
        page.locator(".kurmanji-completion-gate button").wait_for(timeout=5000)
        page.locator(".kurmanji-completion-gate button").click()
        page.wait_for_url("**/kurmanji-course-1-lesson-02.html", timeout=5000)
        calls = page.evaluate("window.__rpcCalls")
        completion = [call for call in calls if call["name"] == "complete_lesson"]
        self.assertEqual(len(completion), 1)
        self.assertEqual(completion[0]["args"], {
            "p_course_id": "kurmanji-course-1",
            "p_lesson_key": "kurmanji-course-1-lesson-01.html",
        })
        page.close()
        context.close()

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
