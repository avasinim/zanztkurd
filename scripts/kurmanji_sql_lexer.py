"""Small PostgreSQL-aware lexical scanner for seed-parity tooling.

This is a tokenizer, not a SQL parser. It preserves source spans and treats
comments and quoted constructs as opaque tokens so callers can safely ignore
marker-like text inside them.
"""
from typing import Iterator, NamedTuple
import re


class Token(NamedTuple):
    kind: str
    text: str
    start: int
    end: int


_DOLLAR_TAG = re.compile(r"\$(?:[A-Za-z_][A-Za-z_0-9]*)?\$")
_IDENT_CONTINUE = re.compile(r"[A-Za-z_0-9$]")


def tokenize_sql(source: str) -> Iterator[Token]:
    """Yield SQL tokens, handling strings, identifiers and nested comments.

    Recognized kinds: whitespace, line_comment, block_comment, string,
    escape_string, dollar_string, quoted_identifier, word, symbol.
    Raises ValueError for unterminated quoted constructs or block comments.
    """
    i, size = 0, len(source)
    while i < size:
        start = i
        char = source[i]

        if char.isspace():
            i += 1
            while i < size and source[i].isspace():
                i += 1
            yield Token("whitespace", source[start:i], start, i)
            continue

        if source.startswith("--", i):
            i += 2
            while i < size and source[i] not in "\r\n":
                i += 1
            yield Token("line_comment", source[start:i], start, i)
            continue

        if source.startswith("/*", i):
            i += 2
            depth = 1
            while i < size and depth:
                if source.startswith("/*", i):
                    depth += 1
                    i += 2
                elif source.startswith("*/", i):
                    depth -= 1
                    i += 2
                else:
                    i += 1
            if depth:
                raise ValueError("unterminated SQL block comment")
            yield Token("block_comment", source[start:i], start, i)
            continue

        # E'...' is an escape string only at an identifier boundary.
        escape_prefix = (
            char in "eE"
            and i + 1 < size
            and source[i + 1] == "'"
            and (i == 0 or not _IDENT_CONTINUE.fullmatch(source[i - 1]))
        )
        if char == "'" or escape_prefix:
            if escape_prefix:
                i += 1
            i += 1  # opening apostrophe
            while i < size:
                if escape_prefix and source[i] == "\\\\":
                    i += 2
                    continue
                if source[i] == "'":
                    if i + 1 < size and source[i + 1] == "'":
                        i += 2
                        continue
                    i += 1
                    break
                i += 1
            else:
                raise ValueError("unterminated SQL string literal")
            kind = "escape_string" if escape_prefix else "string"
            yield Token(kind, source[start:i], start, i)
            continue

        if char == '"':
            i += 1
            while i < size:
                if source[i] == '"':
                    if i + 1 < size and source[i + 1] == '"':
                        i += 2
                        continue
                    i += 1
                    break
                i += 1
            else:
                raise ValueError("unterminated quoted SQL identifier")
            yield Token("quoted_identifier", source[start:i], start, i)
            continue

        if char == "$":
            match = _DOLLAR_TAG.match(source, i)
            if match:
                tag = match.group(0)
                body_start = match.end()
                close_at = source.find(tag, body_start)
                if close_at < 0:
                    raise ValueError(f"unterminated dollar-quoted string {tag}")
                i = close_at + len(tag)
                yield Token("dollar_string", source[start:i], start, i)
                continue

        if char.isalpha() or char == "_":
            i += 1
            while i < size and (source[i].isalnum() or source[i] in "_$"):
                i += 1
            yield Token("word", source[start:i], start, i)
            continue

        i += 1
        yield Token("symbol", source[start:i], start, i)


def find_sql_marker(source: str, marker: str, start: int = 0) -> int:
    """Find a marker outside comments and quoted constructs; return -1 if absent."""
    if not marker:
        raise ValueError("marker must not be empty")
    for token in tokenize_sql(source):
        if token.end <= start:
            continue
        if token.kind in {
            "line_comment", "block_comment", "string", "escape_string",
            "dollar_string", "quoted_identifier",
        }:
            continue
        candidate_start = max(token.start, start)
        offset = source.find(marker, candidate_start, token.end)
        if offset >= 0:
            return offset
    return -1
