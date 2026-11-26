#!/usr/bin/env python3
"""Deterministically generate draft Dengnasi HTML previews and JSON from authoring Markdown."""
from __future__ import annotations
import argparse, html, json, re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "docs/KURMANJI-DENGNASI-LESSON-AUTHORING.md"
MANIFEST = ROOT / "docs/kurmanji-dengnasi-course.json"
PAYLOAD = ROOT / "docs/previews/dengnasi-content-html-payload-preview.json"
PREVIEWS = ROOT / "docs/previews"
STYLE = """<style>
.klesson-preview{color:#202522;font:inherit;line-height:2}
.klesson-preview .lesson-preview-head{margin:0 0 1.4em;padding:0 0 1em;border-bottom:1px solid #e7e2d7}
.klesson-preview .lesson-preview-head p{margin:0;color:#8a6b43;font-size:.9em}
.klesson-preview h1{margin:.25em 0;color:#263d31;font-size:1.45rem;line-height:1.7}
.klesson-preview h2{margin:1.8em 0 .65em;color:#263d31;font-size:1.3rem;line-height:1.7;border-bottom:1px solid #e7e2d7;padding-bottom:.35em}
.klesson-preview h3{margin:1.4em 0 .5em;color:#315344;font-size:1.1rem;line-height:1.7}
.klesson-preview p{margin:.75em 0;line-height:2}
.klesson-preview ul,.klesson-preview ol{padding-inline-start:1.5em;line-height:2}
.klesson-preview li{margin:.4em 0}
.klesson-preview strong{color:#263d31}
.klesson-preview code{font-family:ui-monospace,monospace}
.klesson-preview .table-wrap{overflow-x:auto;margin:1.2em 0}
.klesson-preview table{border-collapse:collapse;width:100%;min-width:32rem}
.klesson-preview th,.klesson-preview td{border:1px solid #d9d6ce;padding:.55em .7em;text-align:start;vertical-align:top}
.klesson-preview th{background:#f2f0e9;color:#263d31}
</style>"""

def inline(value):
    value = html.escape(value, quote=False)
    tick = chr(96)
    value = re.sub(tick + r"([^" + tick + r"]+)" + tick, r"<code>\1</code>", value)
    value = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", value)
    return re.sub(r"\*([^*]+)\*", r"<em>\1</em>", value)

def render(markdown):
    lines, out, i = markdown.strip().splitlines(), [], 0
    while i < len(lines):
        line = lines[i].rstrip()
        if not line.strip() or line.strip() == "---":
            i += 1
        elif line.startswith("### "):
            out.append("<h3>" + inline(line[4:].strip()) + "</h3>"); i += 1
        elif line.startswith("## "):
            out.append("<h2>" + inline(line[3:].strip()) + "</h2>"); i += 1
        elif line.startswith("# "):
            out.append("<h1>" + inline(line[2:].strip()) + "</h1>"); i += 1
        elif line.startswith("|"):
            rows = []
            while i < len(lines) and lines[i].strip().startswith("|"):
                cells = [c.strip() for c in lines[i].strip().strip("|").split("|")]
                if not all(re.fullmatch(r":?-{3,}:?", c or "-") for c in cells):
                    rows.append(cells)
                i += 1
            if rows:
                head, *body = rows
                out.append('<div class="table-wrap"><table><thead><tr>' +
                    "".join("<th>" + inline(c) + "</th>" for c in head) +
                    "</tr></thead><tbody>" +
                    "".join("<tr>" + "".join("<td>" + inline(c) + "</td>" for c in row) + "</tr>" for row in body) +
                    "</tbody></table></div>")
        elif re.match(r"^\s*[-*] ", line):
            items = []
            while i < len(lines) and re.match(r"^\s*[-*] ", lines[i]):
                items.append(re.sub(r"^\s*[-*] ", "", lines[i]).strip()); i += 1
            out.append("<ul>" + "".join("<li>" + inline(x) + "</li>" for x in items) + "</ul>")
        elif re.match(r"^\s*\d+[.)] ", line):
            items = []
            while i < len(lines) and re.match(r"^\s*\d+[.)] ", lines[i]):
                items.append(re.sub(r"^\s*\d+[.)] ", "", lines[i]).strip()); i += 1
            out.append("<ol>" + "".join("<li>" + inline(x) + "</li>" for x in items) + "</ol>")
        else:
            paragraph = [line.strip()]; i += 1
            while i < len(lines):
                nxt = lines[i].rstrip()
                if (not nxt.strip() or nxt.strip() == "---" or nxt.startswith("#") or nxt.startswith("|")
                    or re.match(r"^\s*[-*] ", nxt) or re.match(r"^\s*\d+[.)] ", nxt)):
                    break
                paragraph.append(nxt.strip()); i += 1
            out.append("<p>" + inline(" ".join(paragraph)) + "</p>")
    return "\n".join(out)

def main():
    parser = argparse.ArgumentParser()
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument("--write", action="store_true")
    group.add_argument("--check", action="store_true")
    args = parser.parse_args()
    source = SOURCE.read_text(encoding="utf-8")
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    payload = json.loads(PAYLOAD.read_text(encoding="utf-8"))
    matches = list(re.finditer(r"(?m)^# Dersa (\d+) — (.+)$", source))
    if len(matches) != 27 or len(manifest["lessons"]) != 27 or len(payload["lessons"]) != 27:
        raise ValueError("Authoring source, manifest and payload must each contain 27 lessons")
    outputs, updated_lessons = {}, []
    for i, match in enumerate(matches):
        number, title = int(match.group(1)), match.group(2).strip()
        if number != i + 1:
            raise ValueError("Lesson headings are not sequential")
        end = matches[i + 1].start() if i + 1 < len(matches) else len(source)
        markdown = source[match.end():end].strip()
        meta, old = manifest["lessons"][i], payload["lessons"][i]
        if meta["number"] != number or old["number"] != number:
            raise ValueError("Manifest/payload lesson order mismatch")
        pages = meta["printedPages"]
        citation = re.search(r"Husein Muhammed, \*Dengnasî di kurdî de\*, rûpelên çapkirî \*\*(\d+)–(\d+)\*\*\.?", markdown)
        if not citation or (int(citation.group(1)), int(citation.group(2))) != (pages["start"], pages["end"]):
            raise ValueError("Lesson " + str(number) + ": source citation does not match manifest")
        body = render(markdown)
        content = '<section class="klesson-preview" lang="ku" dir="ltr">\n' + STYLE + "\n" + body + "\n</section>\n"
        header = '<header class="lesson-preview-head"><p><strong>Dersa ' + str(number) + ' / 27</strong></p><h1>' + inline(title) + '</h1></header>\n'
        preview = '<!-- DRAFT PREVIEW ONLY: generated from source Markdown; not connected to Supabase or site routes. -->\n<section class="klesson-preview" lang="ku" dir="ltr">\n' + STYLE + "\n" + header + body + "\n</section>\n"
        outputs[PREVIEWS / ("kurmanji-dengnasi-lesson-%02d-content-preview.html" % number)] = preview
        item = dict(old); item["title"] = title; item["content_html"] = content
        updated_lessons.append(item)
    new_payload = dict(payload); new_payload["lessons"] = updated_lessons; new_payload["lesson_count"] = 27
    outputs[PAYLOAD] = json.dumps(new_payload, ensure_ascii=False, indent=2) + "\n"
    changed = []
    for path, value in outputs.items():
        current = path.read_text(encoding="utf-8") if path.exists() else None
        if current != value:
            changed.append(str(path.relative_to(ROOT)))
            if args.write:
                path.write_text(value, encoding="utf-8")
    if args.check and changed:
        raise SystemExit("STALE generated artifacts: " + ", ".join(changed))
    print("PASS: verified 27 lesson headings, manifest order, and printed-page citations; " +
          (("updated " + str(len(changed)) + " generated artifacts.") if args.write else "all generated artifacts are current."))
if __name__ == "__main__":
    main()
