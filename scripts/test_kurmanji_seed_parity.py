"""Unit tests for the constrained Kurmanji seed SQL scanner helpers.

These fixtures are synthetic and intentionally do not contain lesson content.
Run from the repository root with:
    python scripts/test_kurmanji_seed_parity.py
"""
from importlib.util import module_from_spec, spec_from_file_location
from pathlib import Path
import unittest


ROOT = Path(__file__).resolve().parents[1]
MODULE_PATH = ROOT / "scripts" / "validate_kurmanji_seed_parity.py"
SPEC = spec_from_file_location("validate_kurmanji_seed_parity", MODULE_PATH)
if SPEC is None or SPEC.loader is None:
    raise RuntimeError(f"Cannot load validator module at {MODULE_PATH}")
VALIDATOR = module_from_spec(SPEC)
SPEC.loader.exec_module(VALIDATOR)

extract_rows = VALIDATOR.extract_rows
extract_values_rows = VALIDATOR.extract_values_rows
tuple_string_values = VALIDATOR.tuple_string_values
row_key = VALIDATOR.row_key


class ExtractRowsTests(unittest.TestCase):
    def test_extracts_two_top_level_rows(self):
        source = (
            "INSERT INTO public.lesson_content VALUES "
            "('k1','c1','first'), ('k2','c1','second') "
            "ON CONFLICT (lesson_key) DO NOTHING;"
        )
        self.assertEqual(
            extract_rows(source, "fixture"),
            ["('k1','c1','first')", "('k2','c1','second')"],
        )

    def test_commas_and_parentheses_inside_strings_do_not_split_rows(self):
        source = (
            "INSERT INTO public.lesson_content VALUES "
            "('k1','c1','comma, and (parentheses)'), "
            "('k2','c1','next') ON CONFLICT (lesson_key) DO NOTHING;"
        )
        self.assertEqual(len(extract_rows(source, "fixture")), 2)

    def test_doubled_apostrophe_is_kept_inside_string(self):
        source = (
            "INSERT INTO public.lesson_content VALUES "
            "('k1','c1','it''s valid') ON CONFLICT (lesson_key) DO NOTHING;"
        )
        self.assertEqual(
            extract_rows(source, "fixture"),
            ["('k1','c1','it''s valid')"],
        )

    def test_nested_parentheses_do_not_split_rows(self):
        source = (
            "INSERT INTO public.lesson_content VALUES "
            "('k1','c1',coalesce('x','y')), "
            "('k2','c1','next') ON CONFLICT (lesson_key) DO NOTHING;"
        )
        self.assertEqual(len(extract_rows(source, "fixture")), 2)

    def test_missing_insert_values_or_conflict_marker_fails(self):
        samples = (
            "SELECT 1;",
            "INSERT INTO public.lesson_content SELECT 1;",
            "INSERT INTO public.lesson_content VALUES ('k1','c1','x');",
        )
        for source in samples:
            with self.subTest(source=source):
                with self.assertRaises(ValueError):
                    extract_rows(source, "fixture")

    def test_empty_tuple_block_fails(self):
        source = (
            "INSERT INTO public.lesson_content VALUES "
            "ON CONFLICT (lesson_key) DO NOTHING;"
        )
        with self.assertRaises(ValueError):
            extract_rows(source, "fixture")

    def test_unmatched_closing_parenthesis_fails(self):
        source = (
            "INSERT INTO public.lesson_content VALUES "
            ") ('k1','c1','x') ON CONFLICT (lesson_key) DO NOTHING;"
        )
        with self.assertRaises(ValueError):
            extract_rows(source, "fixture")

    def test_unclosed_tuple_fails(self):
        source = (
            "INSERT INTO public.lesson_content VALUES "
            "('k1','c1','x' ON CONFLICT (lesson_key) DO NOTHING;"
        )
        with self.assertRaises(ValueError):
            extract_rows(source, "fixture")

    def test_unterminated_string_fails(self):
        source = (
            "INSERT INTO public.lesson_content VALUES "
            "('k1','c1','unterminated) ON CONFLICT (lesson_key) DO NOTHING;"
        )
        with self.assertRaises(ValueError):
            extract_rows(source, "fixture")


class ExtractValuesRowsTests(unittest.TestCase):
    START = "DO $preflight$"
    END = ") AS expected"

    def test_extracts_marker_delimited_values(self):
        source = (
            self.START
            + " SELECT * FROM (VALUES ('k1','c1'), ('k2','c1') "
            + self.END
        )
        self.assertEqual(
            extract_values_rows(source, "fixture", self.START, self.END),
            ["('k1','c1')", "('k2','c1')"],
        )

    def test_missing_start_values_or_end_marker_fails(self):
        samples = (
            "SELECT * FROM (VALUES ('k1','c1')) ) AS expected",
            self.START + " SELECT 1 " + self.END,
            self.START + " SELECT * FROM (VALUES ('k1','c1'))",
        )
        for source in samples:
            with self.subTest(source=source):
                with self.assertRaises(ValueError):
                    extract_values_rows(source, "fixture", self.START, self.END)

    def test_empty_values_block_fails(self):
        source = self.START + " SELECT * FROM (VALUES ) " + self.END
        with self.assertRaises(ValueError):
            extract_values_rows(source, "fixture", self.START, self.END)

    def test_unterminated_string_fails(self):
        source = self.START + " VALUES ('k1,c1) " + self.END
        with self.assertRaises(ValueError):
            extract_values_rows(source, "fixture", self.START, self.END)


class TupleStringValuesTests(unittest.TestCase):
    def test_splits_fields_without_splitting_quoted_commas(self):
        row = "('key','course','a,b','plain')"
        self.assertEqual(
            tuple_string_values(row, "fixture"),
            ["key", "course", "a,b", "plain"],
        )

    def test_decodes_doubled_apostrophes(self):
        row = "('key','course','it''s fine')"
        self.assertEqual(
            tuple_string_values(row, "fixture"),
            ["key", "course", "it's fine"],
        )

    def test_keeps_nested_expression_as_one_field(self):
        row = "('key','course',coalesce('x','y'),'tail')"
        self.assertEqual(
            tuple_string_values(row, "fixture"),
            ["key", "course", "coalesce('x','y')", "tail"],
        )

    def test_accepts_empty_string_literal(self):
        self.assertEqual(
            tuple_string_values("('key','course','')", "fixture"),
            ["key", "course", ""],
        )

    def test_retains_non_string_sql_expression(self):
        self.assertEqual(
            tuple_string_values("('key','course',NULL,42)", "fixture"),
            ["key", "course", "NULL", "42"],
        )

    def test_malformed_tuple_boundary_fails(self):
        for row in ("'key','course'", "('key','course'"):
            with self.subTest(row=row):
                with self.assertRaises(ValueError):
                    tuple_string_values(row, "fixture")

    def test_unclosed_string_or_nested_parenthesis_fails(self):
        for row in ("('key','course','open)", "('key','course',coalesce('x','y')"):
            with self.subTest(row=row):
                with self.assertRaises(ValueError):
                    tuple_string_values(row, "fixture")


class RowCourseIdTests(unittest.TestCase):
    def test_reads_course_id_from_second_literal_field(self):
        self.assertEqual(
            VALIDATOR.row_course_id("('lesson-01','kurmanji-course-1','title')", "fixture"),
            "kurmanji-course-1",
        )

    def test_decodes_doubled_apostrophe_in_course_id(self):
        self.assertEqual(
            VALIDATOR.row_course_id("('lesson-01','course''s-id','title')", "fixture"),
            "course's-id",
        )

    def test_rejects_unquoted_or_missing_course_id(self):
        for row in ("('lesson-01',course-1,'title')", "('lesson-01')", "('lesson-01',NULL,'title')"):
            with self.subTest(row=row):
                with self.assertRaises(ValueError):
                    VALIDATOR.row_course_id(row, "fixture")

    def test_maps_only_expected_kurmanji_course_keys(self):
        self.assertEqual(VALIDATOR.expected_course_id("kurmanji-course-1-lesson-01.html"), "kurmanji-course-1")
        self.assertEqual(VALIDATOR.expected_course_id("kurmanji-course-2-lesson-12.html"), "kurmanji-course-2")
        with self.assertRaises(ValueError):
            VALIDATOR.expected_course_id("other-course-lesson-01.html")


class RowKeyTests(unittest.TestCase):
    def test_reads_key_from_two_literal_prefix_fields(self):
        self.assertEqual(
            row_key("( 'lesson-01' , 'course-1' , 'title' )", "fixture"),
            "lesson-01",
        )

    def test_decodes_apostrophe_in_key(self):
        self.assertEqual(
            row_key("('lesson''s-01','course-1','title')", "fixture"),
            "lesson's-01",
        )

    def test_rejects_unquoted_or_missing_prefix_fields(self):
        samples = (
            "(lesson-01,'course-1','title')",
            "('lesson-01',course-1,'title')",
            "('lesson-01')",
            "(NULL,'course-1','title')",
        )
        for row in samples:
            with self.subTest(row=row):
                with self.assertRaises(ValueError):
                    row_key(row, "fixture")


if __name__ == "__main__":
    unittest.main()
