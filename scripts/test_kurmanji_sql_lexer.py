"""Tests for the standalone PostgreSQL lexical scanner."""
import unittest

from kurmanji_sql_lexer import (
    find_dollar_quoted_do_block,
    find_sql_marker,
    tokenize_sql,
)


class TokenizeSqlTests(unittest.TestCase):
    def test_line_comment_is_opaque(self):
        tokens = list(tokenize_sql("-- VALUES ('x')\nVALUES (1)"))
        self.assertEqual(tokens[0].kind, "line_comment")
        self.assertEqual(tokens[2].text, "VALUES")

    def test_nested_block_comments_are_supported(self):
        token = list(tokenize_sql("/* outer /* inner */ tail */ SELECT"))[0]
        self.assertEqual(token.kind, "block_comment")
        self.assertEqual(token.text, "/* outer /* inner */ tail */")

    def test_unterminated_block_comment_fails(self):
        with self.assertRaisesRegex(ValueError, "block comment"):
            list(tokenize_sql("/* never closed"))

    def test_standard_string_with_doubled_quote(self):
        token = list(tokenize_sql("'it''s VALUES'"))[0]
        self.assertEqual(token.kind, "string")
        self.assertEqual(token.text, "'it''s VALUES'")

    def test_escape_string_backslash_quote(self):
        source = "E'escaped " + chr(92) + "' quote'"
        token = list(tokenize_sql(source))[0]
        self.assertEqual(token.kind, "escape_string")

    def test_e_prefix_inside_identifier_is_not_escape_prefix(self):
        tokens = list(tokenize_sql("someE'word'"))
        self.assertEqual(tokens[0].kind, "word")
        self.assertEqual(tokens[1].kind, "string")

    def test_dollar_quote_empty_tag(self):
        token = list(tokenize_sql("$$ VALUES (') $$"))[0]
        self.assertEqual(token.kind, "dollar_string")

    def test_dollar_quote_named_tag(self):
        token = list(tokenize_sql("$payload$ (VALUES) $payload$"))[0]
        self.assertEqual(token.kind, "dollar_string")

    def test_unterminated_dollar_quote_fails(self):
        with self.assertRaisesRegex(ValueError, "dollar-quoted"):
            list(tokenize_sql("$body$ unfinished"))

    def test_dollar_tag_case_is_exact(self):
        with self.assertRaisesRegex(ValueError, "dollar-quoted"):
            list(tokenize_sql("$Body$ text $body$"))

    def test_quoted_identifier_and_doubled_quote(self):
        token = list(tokenize_sql('"a""b"'))[0]
        self.assertEqual(token.kind, "quoted_identifier")

    def test_unterminated_quoted_identifier_fails(self):
        with self.assertRaisesRegex(ValueError, "identifier"):
            list(tokenize_sql('"unfinished'))

    def test_marker_inside_comment_is_ignored(self):
        source = "-- VALUES\nSELECT 1; /* ON CONFLICT */ VALUES"
        self.assertEqual(find_sql_marker(source, "VALUES"), source.rfind("VALUES"))

    def test_marker_inside_string_or_dollar_quote_is_ignored(self):
        source = "SELECT 'VALUES', $$ ON CONFLICT $$; VALUES"
        self.assertEqual(find_sql_marker(source, "VALUES"), source.rfind("VALUES"))

    def test_marker_inside_escape_string_is_ignored(self):
        source = "SELECT E'VALUES " + chr(92) + "' still string'; VALUES"
        self.assertEqual(find_sql_marker(source, "VALUES"), source.rfind("VALUES"))

    def test_multi_token_marker_is_supported(self):
        source = "SELECT 'ON CONFLICT'; ON   CONFLICT (lesson_key)"
        self.assertEqual(find_sql_marker(source, "ON   CONFLICT"), source.index("ON   CONFLICT"))

    def test_marker_inside_larger_identifier_is_ignored(self):
        source = "INSERT NOTVALUES; VALUES (1)"
        self.assertEqual(find_sql_marker(source, "VALUES"), source.rfind("VALUES"))

    def test_marker_with_identifier_suffix_is_ignored(self):
        source = "INSERT VALUES_suffix; VALUES (1)"
        self.assertEqual(find_sql_marker(source, "VALUES"), source.rfind("VALUES"))

    def test_multi_token_marker_with_identifier_suffix_is_ignored(self):
        source = "ON   CONFLICTING; ON   CONFLICT (lesson_key)"
        self.assertEqual(find_sql_marker(source, "ON   CONFLICT"), source.index("ON   CONFLICT", source.index(";") + 1))

    def test_marker_with_identifier_prefix_is_ignored(self):
        source = "XVALUES; VALUES (1)"
        self.assertEqual(find_sql_marker(source, "VALUES"), source.rfind("VALUES"))

    def test_source_spans_reconstruct_exact_input(self):
        source = "SELECT /* c */ E'a" + chr(92) + "'b', $x$z$x$;"
        tokens = list(tokenize_sql(source))
        self.assertEqual("".join(token.text for token in tokens), source)
        self.assertEqual(tokens[0].start, 0)
        self.assertEqual(tokens[-1].end, len(source))



class DollarQuotedDoBlockTests(unittest.TestCase):
    def test_finds_named_do_block_span(self):
        source = "DO $preflight$ BEGIN PERFORM 1; END $preflight$;"
        start = source.index("$preflight$")
        end = source.rindex("$preflight$") + len("$preflight$")
        self.assertEqual(find_dollar_quoted_do_block(source, "$preflight$"), (start, end))

    def test_allows_whitespace_and_comments_between_do_and_body(self):
        source = "DO /* comment */\n $apply$ BEGIN NULL; END $apply$;"
        start = source.index("$apply$")
        end = source.rindex("$apply$") + len("$apply$")
        self.assertEqual(find_dollar_quoted_do_block(source, "$apply$"), (start, end))

    def test_ignores_do_text_inside_comment_and_string(self):
        source = (
            "-- DO $preflight$ fake $preflight$\n"
            "SELECT 'DO $preflight$ fake $preflight$';\n"
            "DO $preflight$ BEGIN NULL; END $preflight$;"
        )
        start = source.index("$preflight$", source.rindex("DO $preflight$"))
        end = source.rindex("$preflight$") + len("$preflight$")
        self.assertEqual(find_dollar_quoted_do_block(source, "$preflight$"), (start, end))

    def test_requires_exact_tag(self):
        source = "DO $Preflight$ BEGIN NULL; END $Preflight$;"
        self.assertIsNone(find_dollar_quoted_do_block(source, "$preflight$"))

    def test_respects_start_offset(self):
        source = (
            "DO $preflight$ BEGIN NULL; END $preflight$; "
            "DO $apply$ BEGIN NULL; END $apply$;"
        )
        second_do = source.index("DO $apply$")
        start = source.index("$apply$")
        end = source.rindex("$apply$") + len("$apply$")
        self.assertEqual(find_dollar_quoted_do_block(source, "$apply$", second_do), (start, end))

    def test_rejects_invalid_tag_and_negative_start(self):
        with self.assertRaisesRegex(ValueError, "exact PostgreSQL"):
            find_dollar_quoted_do_block("DO $x$ body $x$", "preflight")
        with self.assertRaisesRegex(ValueError, "non-negative"):
            find_dollar_quoted_do_block("DO $$ body $$", "$$", -1)

    def test_unterminated_dollar_body_fails_closed(self):
        with self.assertRaisesRegex(ValueError, "unterminated dollar-quoted"):
            find_dollar_quoted_do_block("DO $body$ unfinished", "$body$")

    def test_returns_none_when_no_matching_do_body_exists(self):
        self.assertIsNone(
            find_dollar_quoted_do_block("SELECT $preflight$ text $preflight$;", "$preflight$")
        )


if __name__ == "__main__":
    unittest.main()
