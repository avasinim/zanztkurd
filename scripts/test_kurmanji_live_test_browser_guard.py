"""Unit tests for the fail-closed Test Supabase browser runner configuration."""
from __future__ import annotations

import os
import unittest
from unittest.mock import patch

from test_kurmanji_live_test_browser import read_test_config

VALID_ENV = {
    "AVASIN_TEST_SUPABASE_URL": "https://juwsjljbdwyncicybwoq.supabase.co",
    "AVASIN_TEST_SUPABASE_PUBLISHABLE_KEY": "sb_publishable_test_fixture",
    "AVASIN_TEST_STUDENT_EMAIL": "test-learner@example.invalid",
    "AVASIN_TEST_STUDENT_PASSWORD": "synthetic-test-password",
}


class TestSupabaseBrowserConfigTests(unittest.TestCase):
    def test_accepts_only_explicit_test_project_and_publishable_key(self):
        with patch.dict(os.environ, VALID_ENV, clear=True):
            url, key, email, password = read_test_config()
        self.assertEqual(url, "https://juwsjljbdwyncicybwoq.supabase.co")
        self.assertTrue(key.startswith("sb_publishable_"))
        self.assertEqual(email, "test-learner@example.invalid")
        self.assertTrue(password)

    def test_rejects_production_project_url(self):
        env = {**VALID_ENV, "AVASIN_TEST_SUPABASE_URL": "https://hjpmorabqdhuchpnowiw.supabase.co"}
        with patch.dict(os.environ, env, clear=True):
            with self.assertRaisesRegex(RuntimeError, "approved isolated Test project"):
                read_test_config()

    def test_rejects_url_query_override(self):
        env = {**VALID_ENV, "AVASIN_TEST_SUPABASE_URL": VALID_ENV["AVASIN_TEST_SUPABASE_URL"] + "?host=production"}
        with patch.dict(os.environ, env, clear=True):
            with self.assertRaisesRegex(RuntimeError, "approved isolated Test project"):
                read_test_config()

    def test_rejects_secret_or_service_role_key(self):
        env = {**VALID_ENV, "AVASIN_TEST_SUPABASE_PUBLISHABLE_KEY": "service_role_secret_fixture"}
        with patch.dict(os.environ, env, clear=True):
            with self.assertRaisesRegex(RuntimeError, "publishable key"):
                read_test_config()

    def test_rejects_missing_test_credentials(self):
        with patch.dict(os.environ, {}, clear=True):
            with self.assertRaisesRegex(RuntimeError, "Missing required Test-only"):
                read_test_config()


if __name__ == "__main__":
    unittest.main(verbosity=2)
