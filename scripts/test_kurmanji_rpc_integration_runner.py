"""Safety tests for the disposable PostgreSQL integration runner URL guard."""
import unittest

from test_kurmanji_rpc_integration import validate_database_url


class ValidateDatabaseUrlTests(unittest.TestCase):
    def test_accepts_ci_localhost_database(self):
        validate_database_url("postgresql://postgres:postgres@localhost:5432/kurmanji_test")

    def test_accepts_ipv4_loopback(self):
        validate_database_url("postgresql://postgres@127.0.0.1:5432/kurmanji_test")

    def test_accepts_ipv6_loopback(self):
        validate_database_url("postgresql://postgres@[::1]:5432/kurmanji_test")

    def test_rejects_remote_host(self):
        with self.assertRaisesRegex(ValueError, "host must be localhost"):
            validate_database_url("postgresql://user:pass@db.example.com:5432/kurmanji_test")

    def test_rejects_lookalike_localhost_hostname(self):
        with self.assertRaisesRegex(ValueError, "host must be localhost"):
            validate_database_url("postgresql://localhost.attacker.example/kurmanji_test")

    def test_rejects_shared_or_production_database_name(self):
        with self.assertRaisesRegex(ValueError, "database name must be exactly"):
            validate_database_url("postgresql://postgres@localhost:5432/production")

    def test_rejects_unexpected_port(self):
        with self.assertRaisesRegex(ValueError, "must explicitly use port 5432"):
            validate_database_url("postgresql://postgres@localhost:6543/kurmanji_test")

    def test_rejects_missing_port(self):
        with self.assertRaisesRegex(ValueError, "must explicitly use port 5432"):
            validate_database_url("postgresql://postgres@localhost/kurmanji_test")

    def test_rejects_non_postgresql_scheme(self):
        with self.assertRaisesRegex(ValueError, "postgres or postgresql"):
            validate_database_url("https://localhost/kurmanji_test")

    def test_rejects_malformed_url(self):
        with self.assertRaisesRegex(ValueError, "valid PostgreSQL URL"):
            validate_database_url("postgresql://[invalid/kurmanji_test")

    def test_rejects_url_fragment(self):
        with self.assertRaisesRegex(ValueError, "must not contain a fragment"):
            validate_database_url("postgresql://postgres@localhost/kurmanji_test#other")

    def test_rejects_query_parameters_that_could_override_connection_target(self):
        unsafe_urls = (
            "postgresql://postgres@localhost:5432/kurmanji_test?host=db.example.com",
            "postgresql://postgres@localhost:5432/kurmanji_test?port=6543",
            "postgresql://postgres@localhost:5432/kurmanji_test?dbname=production",
        )
        for database_url in unsafe_urls:
            with self.subTest(database_url=database_url):
                with self.assertRaisesRegex(ValueError, "query parameters are not permitted"):
                    validate_database_url(database_url)


if __name__ == "__main__":
    unittest.main()
