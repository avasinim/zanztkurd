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
_OPAQUE_KINDS = {
    "line_comment", "block_comment", "string", "escape_string",
    "dollar_string", "quoted_identifier",
}


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

        escape_prefix = (
            char in "eE"
            and i + 1 < size
            and source[i + 1] == "'"
            and (i == 0 or not _IDENT_CONTINUE.fullmatch(source[i - 1]))
        )
        if char == "'" or escape_prefix:
            if escape_prefix:
                i += 1
            i += 1
            while i < size:
                if escape_prefix and source[i] == "\\":
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
                close_at = source.find(tag, match.end())
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


def _is_identifier_continue(char: str) -> bool:
    """Match PostgreSQL unquoted identifier continuation characters."""
    return char.isalnum() or char in "_$"


def find_sql_marker(source: str, marker: str, start: int = 0) -> int:
    """Find a marker outside comments/quotes and at identifier boundaries.

    Markers may span multiple ordinary SQL tokens (for example ON CONFLICT).
    If a marker begins or ends with an identifier character, the adjacent
    source character must not continue an unquoted SQL identifier.
    """
    if not marker:
        raise ValueError("marker must not be empty")
    opaque_spans = [
        (token.start, token.end)
        for token in tokenize_sql(source)
        if token.kind in _OPAQUE_KINDS
    ]
    marker_starts_identifier = _is_identifier_continue(marker[0])
    marker_ends_identifier = _is_identifier_continue(marker[-1])
    candidate = source.find(marker, start)
    while candidate >= 0:
        candidate_end = candidate + len(marker)
        overlaps_opaque = any(
            candidate < end and candidate_end > span_start
            for span_start, end in opaque_spans
        )
        left_boundary_ok = (
            not marker_starts_identifier
            or candidate == 0
            or not _is_identifier_continue(source[candidate - 1])
        )
        right_boundary_ok = (
            not marker_ends_identifier
            or candidate_end == len(source)
            or not _is_identifier_continue(source[candidate_end])
        )
        if not overlaps_opaque and left_boundary_ok and right_boundary_ok:
            return candidate
        candidate = source.find(marker, candidate + 1)
    return -1
