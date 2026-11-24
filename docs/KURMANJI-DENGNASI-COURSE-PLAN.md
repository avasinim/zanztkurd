# Dengnasîya Zimanê Kurdî — course integration plan

**Source:** Husein Muhammed, *Dengnasî di kurdî de* (432 printed pages).  
**Course language/script:** Kurmancî, Latin script.  
**Designed reading copy:** 462-page PDF with cover, contents, and 27 lesson divider pages.  
**Current status:** source mapping prepared; not published and not connected to the website's enrollment/runtime.

## Content rules

- Keep the source text, examples, tables, and illustrations exactly as supplied.
- The 27 lesson divisions are navigation boundaries based on the book's structure; they are not rewritten lesson summaries.
- Do not add quizzes, questions, tests, or exercises in this source-preservation phase.
- Keep this course separate from Kurmanji Course 1 (26 lessons) and Course 2 (12 lessons).
- Do not change the production Supabase schema, migrations, enrollment rules, or existing course mappings as part of this static preparation.

## Lesson map

| # | Lesson title (Kurmancî) | Printed source pages |
|---:|---|---:|
| 01 | Dergeh û ev vekolîn û yên berî wê | 4–7 |
| 02 | Vokal û konsonant; cih û awayên dengan; pifdarî | 8–15 |
| 03 | Hevdengî û pirdengî di nivîsîna kurdî de | 16–28 |
| 04 | Qelewîtî | 29–39 |
| 05 | Rêjeya herfan di nivîsên kurmancî de | 40–43 |
| 06 | Dengrêziya kurdî; peyv ji kîteyan pêk tên | 44–55 |
| 07 | Tesîra guherîna dengî li ser nivîsînê | 56–67 |
| 08 | Konsonantên B, C, Ç û D | 68–103 |
| 09 | Dengên F û G | 104–115 |
| 10 | Dengên H û J | 116–132 |
| 11 | Dengên K û L | 133–146 |
| 12 | Dengên M û N | 147–154 |
| 13 | Dengên P û Q | 155–167 |
| 14 | Dengên R û S | 168–186 |
| 15 | Dengên Ş û T | 187–202 |
| 16 | Dengên V, W, Y û Z | 203–232 |
| 17 | Eyn (ع) û hemû cotkonsonantên di kurdî de | 233–250 |
| 18 | Vokalên A û E | 251–269 |
| 19 | Vokalên Ê, I û Î | 270–297 |
| 20 | Vokalên O, U û Û | 298–314 |
| 21 | Hin mijarên taybet: dîftong û giranî | 315–347 |
| 22 | Nasandina KL û KE; cudahiyên herdu alfabeyan | 348–372 |
| 23 | Cudahiyên dengnasî di navbera kurmancî û soranî de | 373–386 |
| 24 | Cudahiyên dengnasî di navbera kurmancî û kurdiya başûrî de | 387–393 |
| 25 | Cudahiyên dengnasî di navbera kurmancî û zazakî de | 394–401 |
| 26 | Cudahiyên dengnasî di navbera kurdî û tirkî de | 402–417 |
| 27 | Cotdengiya Ç, K, P, T û rêgirtin di ser peyvan re | 418–432 |

## Publication dependencies

1. The corrected 462-page PDF is already committed to the public repository root on `main` as `Dengnasiya_Zimane_Kurdi_27_Wane_corrected.pdf`; the reader uses its stable `raw.githubusercontent.com` URL. Repository presence and blob identity are verified. GitHub Actions also downloaded the canonical raw PDF URL successfully (HTTP 200) and verified its SHA-256 and 462-page count. This confirms public delivery from GitHub's raw host; it does not confirm that the course preview or reader has been deployed through GitHub Pages. Before publishing the reader, test the Pages preview in a normal browser; if the reader needs a same-site PDF asset, copy the exact verified PDF to the site's public asset path and update the reader URL.
2. Build the course overview and 27 lesson reading routes against that hosted source, preserving original page layout.
3. Add a distinct course identity and navigation without reusing existing 26/12-lesson identifiers.
4. Test signed-out, enrolled, and owner access in a safe environment before any production enrollment/backend changes.
5. Keep production database and migrations untouched until separately authorized and tested.

## Page numbering

The manifest records both printed page ranges and page ranges in the corrected designed PDF. The 462-page copy includes three front-matter pages and 27 lesson dividers. The Lesson 15 divider is correctly placed at designed PDF page 204, immediately after printed source page 186 (designed page 203) and before Lesson 15 begins at printed source page 187 (designed page 205). The reader therefore opens Lesson 14 at page 185 and Lesson 15 at page 205.
