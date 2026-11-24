#!/usr/bin/env python3
"""Smoke-test public delivery of the canonical designed course PDF."""
from __future__ import annotations

import hashlib
import io
import json
from pathlib import Path
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
manifest = json.loads(
    (ROOT / "docs/kurmanji-dengnasi-course.json").read_text(encoding="utf-8")
)
pdf = manifest["designedPdf"]
request = Request(
    pdf["rawUrl"],
    headers={"User-Agent": "Avasin-Academy-course-asset-check/1.0"},
)
with urlopen(request, timeout=45) as response:
    if response.status != 200:
        raise RuntimeError(f"Public PDF returned HTTP {response.status}")
    content = response.read()

actual_hash = hashlib.sha256(content).hexdigest()
if actual_hash != pdf["sha256"]:
    raise RuntimeError(
        f"Public PDF SHA-256 mismatch: expected {pdf['sha256']}, got {actual_hash}"
    )

from pypdf import PdfReader

actual_pages = len(PdfReader(io.BytesIO(content)).pages)
if actual_pages != pdf["pdfPages"]:
    raise RuntimeError(
        f"Public PDF page count mismatch: expected {pdf['pdfPages']}, got {actual_pages}"
    )

print(
    f"PASS: public PDF returned HTTP 200; {len(content)} bytes; "
    f"{actual_pages} pages; SHA-256 {actual_hash}."
)
