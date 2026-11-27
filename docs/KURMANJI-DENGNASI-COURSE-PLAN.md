# Dengnasîya Zimanê Kurdî — course integration plan

**Source:** Husein Muhammed, *Dengnasî di kurdî de* (432 printed pages).  
**Course language/script:** Kurmancî, Latin script only.  
**Designed source reference:** 462-page PDF with cover, contents, and 27 lesson divider pages.

## Verified status — 27 November 2026

- The 27-lesson source-derived authoring draft is complete on the draft branch. It reorganizes the book's own sections and topics into original explanatory Kurmanji prose; the PDF is a reference, not lesson-body content.
- All 27 lesson titles and printed-page ranges are aligned across the authoring document, course manifest, reader index, and lesson routes.
- Lessons 1–27 have been source-checked. Lessons 24–27 were most recently rechecked against printed pages 387–432.
- The latest test-only refresh wrote 27 lesson-content rows to isolated Supabase project `juwsjljbdwyncicybwoq`. Verification confirmed 27/27 exact matches, 27 unique keys, 515,310 HTML characters, zero Arabic-script characters, no audio/media URLs, and no quiz/test/exercise/question headings. The pre-refresh 27 rows are backed up in `docs/backups/kurmanji-dengnasi-test-lesson-content-before-resync-2026-11-27.json`.
- All five course validation workflows passed at content/audit commit `5c56944c5c2299bc2e46f4c0e92a404e0bd642a4`; the same five workflows also passed at the later documentation-only test-sync verification commit `b01508d1bee397276a4d7eedf5d971b30bb51601`.
- PR #89 (`Draft source-based lessons for Dengsazîya Zimanê Kurdî`) remains open and Draft. It is not merged. Its current known head is `b01508d1bee397276a4d7eedf5d971b30bb51601`, 596 commits ahead of `main` at `a32992580c520ba64bdbea24cca982f488fb0cd1`, 0 behind.
- The latest `main` commit explicitly pauses the Dengnasi course: it removes PDF-as-course rendering, replaces the landing page with a redesign notice, and hides the unfinished course from the student dashboard. Therefore no live/public lesson delivery or current Pages activation is claimed for the revised 27 source-derived lessons.
- Historical backend note: PR #86 was merged as `3b7aa32aea4c89fd36253dbf67bca00656a3e903` and its description records that an additive migration deployed the production course row, 27 lesson-content rows, and access/progression RPCs. That historical backend activation must not be confused with publication of the revised lesson authoring in PR #89. The current `main` pause and the unmerged PR #89 mean the revised lesson experience is not publicly activated. Do not rerun the old migration or change production data as part of this authoring work.
- No student, profile, enrollment, progress, or auth-user records were read or changed during the 27 November test refresh. No production Supabase writes, schema changes, migrations, merge, deployment, or public activation were performed as part of PR #89.

## Content and editorial rules

- Use the book's own contents, section structure, topics, examples, tables, qualifications, and printed page boundaries to organize the 27 lessons.
- Write source-faithful explanatory prose in Kurmanji Latin script. Preserve the book's information and caveats without copying the entire book verbatim, embedding the PDF as lesson content, or adding unsupported material.
- Preserve unresolved source inconsistencies as explicit source notes; do not silently guess or normalize them.
- Do not add questions, quizzes, tests, exercises, answer keys, or external audio.
- Keep this course separate from Kurmanji Course 1 (26 lessons) and Course 2 (12 lessons).
- Keep the course landing page/lesson loader on hold until the source-derived lesson package passes final preview and integration checks and the publication step is separately authorized.

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
| 17 | Eyn û hemû cotkonsonantên di kurdî de | 233–250 |
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

## PDF source reference and page numbering

- The corrected 462-page PDF is committed to the public repository root on `main` as `Dengnasiya_Zimane_Kurdi_27_Wane_corrected.pdf`. Its recorded SHA-256 is `35f02f32bb835b5c5d05a39b0fea8de68382c1276e5bd66d5f7d3d2bbc929a0c`; the canonical raw URL has previously passed HTTP 200, checksum, and 462-page validation.
- The manifest records both printed source pages and designed-PDF pages. The 462-page copy includes three front-matter pages and 27 lesson dividers.
- Corrected boundary: Lesson 14 is printed pp. 168–186 (designed pp. 185–203); Lesson 15 is printed pp. 187–202 (designed pp. 205–220), with its divider at designed page 204. The reader should open Lesson 14 at page 185 and Lesson 15 at page 205.

## Remaining release gates

1. Complete the academic/source-preview-generated-file review of all 27 lessons and verify every route, title, page range, and rendered lesson body against the manifest and source.
2. Run a real authorized test-account browser check for authentication, enrollment, lesson access, sequential progression, and completion persistence. Existing Playwright tests use controlled Supabase mocks and are not a live service login.
3. Reconcile the historical PR #86 production backend state with the currently paused `main` UI before any future release; do not apply another migration by assumption.
4. Only after those checks, prepare a separate, reviewed publication change. PR #89 itself remains Draft and must not be merged or described as live without explicit release approval and deployment proof.
