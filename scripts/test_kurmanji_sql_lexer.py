"""Tests for the standalone PostgreSQL lexical scanner."""
import unittest

from kurmanji_sql_lexer import find_sql_marker, tokenize_sql


class TokenizeSqlTests(unittest.TestCase):
    def kinds(self, source):
        return [token.kind for token in tokenize_sql(source)]

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
        token = list(tokenize_sql(r"E'escaped \' quote'"))[0]
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
        source = r"SELECT E'VALUES \' still string'; VALUES"
        self.assertEqual(find_sql_marker(source, "VALUES"), source.rfind("VALUES"))

    def test_source_spans_reconstruct_exact_input(self):
        source = "SELECT /* c */ E'a\\'b', $x$z$x$;"
        tokens = list(tokenize_sql(source))
        self.assertEqual("".join(token.text for token in tokens), source)
        self.assertEqual(tokens[0].start, 0)
        self.assertEqual(tokens[-1].end, len(source))


if __name__ == "__main__":
    unittest.main()
