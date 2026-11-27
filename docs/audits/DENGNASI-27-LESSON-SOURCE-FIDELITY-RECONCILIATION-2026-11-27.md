# Dengnasî — 27-lesson source-fidelity reconciliation and correction register

**Date:** 2026-11-27  
**Branch:** `implementation/dengnasi-content-html-bridge-2026-11-26`  
**Source:** Husein Muhammed, *Dengnasî di kurdî de*  
**Scope:** All 27 lesson payloads in `docs/previews/dengnasi-content-html-payload-preview.json`, checked against the 27 source-audit records.

## 1. Executive finding

The first-pass source audit is complete for all 27 lessons. This is a coverage milestone, **not** a source-fidelity sign-off. The payloads broadly cover the book's chapter structure, but several lessons are compressed adaptations rather than exact transfers. The strict requirement—retain all book information, add nothing, omit nothing—has therefore **not yet been demonstrated**.

Three distinct kinds of issue must remain separate:

1. **Payload defects or unverified fidelity:** duplicated notes, compressed lists, omitted notes/tables, and terminology not explicitly present in the source.
2. **Source-level irregularities:** arithmetic, typographical, or explanatory contradictions already present in the book. These must be transcribed faithfully and flagged, not silently “fixed”.
3. **Database drift:** the current test database content is not byte-identical to the latest preview payload. This is an integration/parity issue, not evidence that the book or payload itself is wrong.

No lesson is approved for activation by this register.

## 2. Prioritized correction register

| Priority | Lesson(s) | Finding | Required action before sign-off |
|---|---:|---|---|
| P0 | 21 | **Resolved in payload**: one duplicated notes block was removed; the retained block contains exactly 40 unique entries (229–268). The retained notes still need source-by-source content verification. | Keep the one validated block; next compare the text of each note 229–268 against printed pages 316–347 and review the rendered layout. |
| P1 | 22 | The KL/KE comparison chapter is broadly represented, but long itemized lists are compressed; item-by-item no-omission fidelity is not established. | Reconcile each source list, table row, example, and footnote on printed pp.348–372 against the payload. Restore missing items verbatim in Kurmanji Latin. |
| P1 | 23 | The Kurmanji–Sorani comparison is broadly covered, but some material is summarized; a source inconsistency exists in the K/G discussion. | Check each comparison, example, dialect qualifier, and note on pp.373–386. Keep the source's conflicting K/G statements visible as source inconsistency; do not harmonize without an editorial note. |
| P1 | 24 | The Kurmanji–Southern Kurdish comparison is represented through 12 main comparison groups, but the payload is compressed and exact completeness is not certified. | Compare all source paragraphs, examples, qualifiers, tables and notes on pp.387–393 line by line. |
| P1 | 25 | The Kurmanji–Zazaki comparison is compressed. The source's K/H heading/examples conflict with a following sentence that repeats H/Ş. | Reconcile all 12 comparison groups and notes on pp.394–401; preserve and flag the source's K/H vs H/Ş inconsistency rather than silently correcting it. |
| P1 | 26 | The Kurdish–Turkish comparison is compressed. The full alphabet table, notes 290–292, and references 296–302 are not fully reproduced. | Restore/check the complete alphabet table, all examples and all notes/references on pp.402–417. Preserve the source's p.407 wording conflict (“P û T (lê ne K û T)” followed by “K û P”) as a flagged source issue. |
| P1 | 27 | Broad chapter coverage is present, but notes 303–319 are not all reproduced in full; the vowel-combination table has a source irregularity and needs visual/item-level verification. | Verify every table cell and every note on pp.418–432; establish exact note parity and retain source irregularities with explicit flags. |
| P2 | 16 | **Resolved in payload (27 Nov):** the unsupported W terminology (“paşzimanî” / labio-velar) and added tongue-dorsum/velum explanation were removed; the description now follows source p.210 (“dulêvî-tengav”). | Retain the correction; still include Lesson 16 in the final glyph/example/footnote parity review. |
| P2 | 17 | Footnote 159 uses “nerm” ambiguously for K; European-loan examples on p.241 need direct visual confirmation. | Inspect the printed page image and footnote; preserve ambiguity, verify spellings and avoid inferred normalization. |
| P2 | 5 | Source corpus count: 31 listed letter frequencies sum to 53,001 although the stated corpus total is 52,705; rounded percentages sum to 100.43%. | Keep all printed values and add a clearly attributed source arithmetic note; do not recalculate or replace the author's values silently. |
| P2 | 14 | Source p.169 has a *birîn* gloss conflict; p.175 describes S using stop/affricate-like language despite [s] being a fricative. | Preserve the source wording in the source-faithful text and mark both as source inconsistencies; keep any phonetic clarification separate and attributed. |
| P2 | 15 | Source p.187 explains Ş with closure/release language inconsistent with [ʃ] as a fricative; the author also cautions that some apparent T/Ş alternations are not direct historical sound change. | Preserve and flag the source's terminology issue; ensure the caveat about *firotin/firoş-* and *dotin/doş-* remains intact. |
| P2 | 19 | Source p.290 appears to label the Î frequency (4.2%) as Ê in the Î section. | Preserve the printed label and record the contextual reading as an editorial/source note, not as an unmarked correction. |
| P2 | 20 | Source p.305 appears to print Ê instead of U in the 1.3% frequency sentence. | Retain the printed form with a source-typo note; do not silently substitute U. |
| P2 | 4 | Source uses a phoneme/allophone distinction and dialect-limited emphatic sounds; payload broadly aligns, but source claims and author opinions must remain clearly attributed. | Verify that the dialect limitation for Ḅ and the author's judgments are not generalized beyond the source. |
| P2 | 6 | Source p.47 lists xw- while the summary on p.48 omits it. Payload flags the inconsistency. | Retain both source statements and the discrepancy note; do not choose one silently. |
| P2 | 13 | Source p.155 appears to print [b] for P, while surrounding context and the chart on p.162 support [p]. | Keep the correction explicitly documented as a probable source typo; never present the inferred correction as a verbatim source reading. |
| P2 | 18 | A/E content is broadly aligned; no major topic omission identified in first pass. | Retain as provisionally aligned; still check every example, note and table cell during final exact-parity pass. |
| P2 | 1–3, 7–12 | First-pass audits found broad topic coverage and no clear major contradiction/omission, but they do not establish word-for-word or footnote parity. | Run the final line-by-line inventory of examples, tables, notes, dialect labels and source qualifications before marking these lessons exact. |

## 3. Source-boundary and chapter-map verification

The printed-page boundaries were checked against the book's chapter starts/next-section starts in the lesson audits. The 27 lesson ranges in the course manifest are intended to be retained as the source map. Do not change page ranges or lesson titles merely to make them resemble the database's older titles; any title change must be based on the book's actual heading and recorded as a separate metadata correction.

## 4. Required workflow for exact source fidelity

Complete the following in order. Do not skip directly to database synchronization.

1. **Freeze the current preview and backup references.** Preserve the existing 27-row test DB backup at `docs/backups/kurmanji-dengnasi-test-lesson-content-before-resync-20261127T130608Z.json`; never overwrite it.
2. **Repair confirmed payload defects first.** The duplicated Lesson 21 notes block has been removed and the note-number inventory revalidated. Continue with source-by-source verification of notes 229–268, then complete the missing/condensed tables, notes and lists in Lessons 22–27.
3. **Use a source ledger per lesson.** For each printed page, list every heading, paragraph/topic, example, table row, footnote and bibliography item. Mark each as reproduced, intentionally not applicable, or unresolved. An unresolved item blocks fidelity sign-off.
4. **Separate transcription from editorial commentary.** The lesson body should contain the book's information. Any source typo, arithmetic inconsistency or contradiction must be marked as a source note, not silently rewritten or “improved”.
5. **No unsupported additions.** Remove or segregate scientific elaborations not present in the source, including the W terminology issue in Lesson 16, unless the book itself supports them.
6. **Run structural and content comparisons.** Check exact heading inventory, table row counts, example inventory, footnote numbering and normalized text comparison. HTML byte equality alone is not a meaningful source-fidelity test because wrappers/styles can differ.
7. **Only after content sign-off, prepare a separate DB reconciliation proposal.** Compare the exact approved payload with all 27 test rows; show per-row title/content hashes and a reviewable diff. Do not write to Supabase until separately authorized.
8. **Keep activation separate.** Course activation, production changes, deployment and PR merge remain blocked pending explicit approval and the relevant technical release gates.

## 5. Test database drift — independent integration blocker

The latest read-only comparison found:

- Expected lesson rows: 27.
- Current test DB rows for this course: 27.
- Exact HTML payload matches: **0/27**.
- Title mismatches: **9/27**.
- The differing titles include Lessons 1, 2, 4, 6, 16, 17, 21, 22 and 27.
- Every HTML string differs from the current preview; removing style tags and HTML tags still leaves content differences. This is not merely CSS/wrapper drift.
- A verified pre-resynchronization backup exists at the path above.
- Migration ledger history includes prior activation entries; do not replay or recreate them under alternate timestamps.

**Interpretation:** The database may contain a different earlier payload revision. This register does not assume which side is authoritative. The source book must decide lesson content; the approved preview must then be explicitly reconciled with test DB rows. No write has been made.

## 6. Release and branch guardrails

- Work remains on `implementation/dengnasi-content-html-bridge-2026-11-26`.
- Latest recorded commit before this register: `6654a8719ea3cad34fedb5eec7b057474221a4af`.
- PR #3 remains Draft and unmerged.
- This branch is not deployed/live.
- No Supabase writes, migrations, production changes, deployment, PR merge, student-data access/change or course activation were performed.
- CI/workflow results must be checked for each new commit; an empty status/run response is not a passing test.

## 7. Completion criteria

The course may be called source-faithful only when all of the following are true:

- Every one of the 27 lessons has a complete page-by-page source ledger.
- All examples, tables, notes, references, dialect labels and qualifications have been accounted for.
- The Lesson 21 duplicated note block is resolved.
- The compressed material in Lessons 22–27 is reconciled item by item. Lessons 26–27 now have supplemental restorations for selected source details and footnotes, but their complete table/note parity is still outstanding.
- All source-level errors are preserved and explicitly flagged, not silently repaired.
- No unsupported additions remain.
- Independent review finds no unresolved omission or unexplained discrepancy.
- The approved payload has a reviewable, backed-up parity plan for the test DB.

**Current status: first-pass source audit complete; Lesson 21 duplicate block corrected (note-content parity still pending); Lesson 22 has confirmed item-level omissions/compression and is not source-complete; exact fidelity not yet certified; database parity unresolved; course not activated.**


## 8. Follow-up work recorded — 27 November 2026

- Lesson 26: selected source details and footnotes from printed pp.402–417 were restored in the payload and recorded in its audit. The complete alphabet table, all notes/references and word-by-word fidelity remain open.
- Lesson 27: selected details and notes 303–319 were restored in the payload and recorded in its audit. The vowel-combination table still needs visual/item-level verification; exact note and glyph parity remains open.
- Lesson 16: the unsupported expansion of W as “dulêvî-paşzimanî-tengav / labio-velar approximant”, including the extra tongue-dorsum/velum explanation, was removed after rereading printed p.210. This closes that specific P2 item only.
- The Lesson 21 notes 229–268 still require item-by-item source verification; their duplicate block is resolved, not their content parity.
- Test-project drift is still unresolved. No synchronization/write was performed.
