# Dengnasi source-page boundary audit — Lessons 14–15 (2026-11-26)

## Scope and evidence

This is a targeted check of the original source PDF `dengnasi.pdf` (432 PDF pages) and the redesigned 27-lesson PDF `Dengnasiya_Zimane_Kurdi_27_Wane_corrected.pdf` (462 PDF pages). The original source PDF was read directly at physical PDF pages 168–204; page text and page boundaries were checked against the lesson headings and printed folio numbers.

## Verified source boundary

| Lesson | Topic | Original source PDF pages | Printed folios visible in source |
|---|---|---:|---:|
| 14 | Dengên R û S | 168–186 | 168–186 |
| 15 | Dengên Ş û T | 187–202 | 187–202 |

Evidence:
- Original source PDF physical page 168 begins the section **“R – herfek û du deng”** and carries printed folio 168.
- Original source PDF physical page 175 begins **“S – pidûyî-xişok-vizok yê bêlerz”**.
- Original source PDF physical page 185 continues the S-section consonant chart; physical page 186 contains the chart continuation and its footnote. This is still part of Lesson 14.
- Original source PDF physical page 187 begins the **Ş** section and carries printed folio 187. Lesson 15 continues through physical page 202, which carries the final discussion of Ş/T.
- Original source PDF physical page 203 begins **V**, so it is outside Lesson 15.

## Discrepancy found

The JSON course manifest currently records:
- Lesson 14 `printedPages`: 168–185; `originalPdfPages`: 168–186.
- Lesson 15 `printedPages`: 186–202; `originalPdfPages`: 187–202.

The `originalPdfPages` ranges are supported by the source PDF. The `printedPages` ranges and the redesigned PDF divider captions are off by one at the lesson boundary:
- Lesson 14 divider caption says source pages 168–185, but source pages 168–186 belong to the R/S section.
- Lesson 15 divider caption says source pages 186–202, but page 186 is the final S-section chart continuation; Ş starts on page 187.

## Required follow-up

1. Keep the verified `originalPdfPages` ranges unchanged: Lesson 14 = 168–186; Lesson 15 = 187–202.
2. Reconcile the manifest's `printedPages` values to those same source folio ranges.
3. Regenerate the redesigned PDF and its two divider captions so Lesson 14 reads 168–186 and Lesson 15 reads 187–202.
4. Regenerate affected lesson previews/payload only if the page-map metadata is embedded there.
5. Re-run the course validator and confirm the public PDF checksum/page count for the newly generated artifact.

No source wording, examples, tables, or lesson text were changed during this audit. No manifest, PDF, student data, Supabase, `main`, deployment, or activation changes were made. Course remains under preparation and not activated.
