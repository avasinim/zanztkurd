# Course 1 Lesson 04 — RR row and cross-lesson orthography consistency audit

Date: 2026-11-17  
Repository: avasinim/zanztkurd  
Working branch: fix/kurmanji-ci-current-migration  
Baseline HEAD: 266c048d5740f322f280db4c4d6a4c0397a54203  
Pre-work backup: backup/c1-l04-rr-cross-lesson-consistency-before-2026-11-17  
Scope: compare the exact Lesson 04 RR row in the current draft seed with the Course 1 alphabet inventory and the later primary-source verification record for Lessons 25–26. Proposal-only; no lesson content changed.

## 1. Executive finding

**The current Lesson 04 RR row is not literally counted as a 32nd letter, but its placement and one-to-one IPA presentation can still mislead learners about the relationship between orthography and pronunciation.**

The row is explicitly labelled `RR rr (دووپیت، نەک پیتی سەربەخۆ)`, so the payload does make clear that RR is a digraph rather than an independent alphabet letter. That qualification is important and should not be erased.

However:
- Lesson 02 defines the Hawar alphabet as 31 letters and lists the inventory without RR.
- Lesson 04 places RR inside the main consonant-letter/IPA table, with `/r/` as its value and `/ɾ/` assigned to `R r`.
- The primary-source verification update for Lessons 25–26 establishes a more nuanced statement: initial written `r` is trilled, but it remains written with one `r`; the trill is only sporadically represented by `rr` in some orthographic practices, with Thackston's example `pir/pirr`.

The risk is therefore not a false alphabet count, but a teaching implication that RR is a regular, contrastive, predictable companion to R across words and varieties. The sources reviewed do not support that as a universal rule.

## 2. Exact repository artifacts inspected

All files were read at baseline commit `266c048d5740f322f280db4c4d6a4c0397a54203`.

| Artifact | Blob SHA | Relevant content |
|---|---|---|
| `docs/kurmanji-content-seed-part-01.sql` | `71f84f993e97b91605b68abccabbbabc9ab07a25` | Course 1 Lessons 01–06 draft payloads |
| `docs/KURMANJI-COURSE-1-LESSONS-01-06-CLAIM-LEVEL-EVIDENCE-REGISTER-2026-11-16.md` | `bee0e45abb4b45aaf2d5fbb69ef6ef1010197f90` | C1-L04-03 flags RR orthographic presentation as unresolved |
| `docs/KURMANJI-C1-LESSONS-25-26-PRIMARY-SOURCE-VERIFICATION-UPDATE-2026-11-17.md` | `6ff091d3233053cc8d726d9735f51bf02bfbacf6` | Verifies initial-r pronunciation and sporadic rr representation |
| `docs/KURMANJI-COURSE-1-LESSONS-25-26-CLAIM-LEVEL-EVIDENCE-REGISTER-2026-11-16.md` | `8c7ab1d2b48d207f635dff508c4193c922305b40` | Earlier RR/roj scope and Arizona source inconsistency |
| `docs/KURMANJI-38-LESSON-EVIDENCE-GAP-AND-RELEASE-PRIORITY-MATRIX-2026-11-17.md` | `86c1333f89aa79b219c1d19635af594268787978` | P0 requirement to separate alphabet inventory, phonetics and RR convention |

The seed is a checked-in draft SQL file, not proof of live database content. It was read as text only; no SQL was executed.

## 3. Exact Lesson 04 payload claim

The current Lesson 04 table contains these rows:
- `R r` → `/ɾ/`, described as tap/flap.
- `RR rr (دووپیت، نەک پیتی سەربەخۆ)` → `/r/`, described as trill, with a note that the distinction is not written identically in all dialects or orthographies.

The following paragraph repeats the R/RR contrast and says that in some writing practices RR indicates the trill. The same lesson also says the table is introductory and does not represent the complete phonological system.

**Strength:** RR is explicitly not counted as an independent letter.  
**Weakness:** placing RR as a peer row in a table titled around consonant letters and their IPA values can make the digraph look like a standard grapheme with a stable one-to-one sound value.

## 4. Primary-source reconciliation

### 4.1 Haig (2018)

Geoffrey Haig, “Northern Kurdish (Kurmanjî),” in *The Languages and Linguistics of Western Asia: An Areal Perspective*, 2018:
- pp. 107–109: the written Standard Kurmanjî is a widely used norm based loosely on Cizre/Botan and Hawar conventions.
- p. 109: the standard orthography is described as parsimonious; it ignores some phonemic distinctions, including trilled versus flapped r-sounds.
- p. 114: word-initial written `r` is trilled; elsewhere, the distribution of flap and trill is not predictable.

Source: https://doi.org/10.1515/9783110421682-004  
Author-hosted PDF: https://www.uni-bamberg.de/fileadmin/aspra/06_Team/Publications_and_CV/haig_2018_ch.2.3_northern_kurdish.pdf

### 4.2 Thackston

W. M. Thackston, *Kurmanji Kurdish: A Reference Grammar with Selected Readings*, “The Phonology of Kurmanji Kurdish,” printed p. 3:
- word-initial `r` is trilled;
- the trill is only sporadically represented in writing by `rr`;
- the cited example is `pir`, sometimes written `pirr`;
- this does not imply that every trill is written `rr`.

PDF: https://zimannas.wordpress.com/wp-content/uploads/2020/04/kurmanji_complete.pdf

### 4.3 Consequence

These descriptions support a phonetic distinction between flap and trill, but not a universal orthographic rule `r = /ɾ/` and `rr = /r/` for every context. In particular, a word beginning with `r` can have a trill while remaining spelled with one `r`, as in `roj`.

## 5. Cross-lesson consistency matrix

| Lesson | Current representation | Consistency assessment |
|---|---|---|
| 02 | 31-letter Hawar inventory; no RR | Correctly keeps RR outside the alphabet count |
| 04 | Main consonant table includes RR as a digraph row | Explicit caveat helps, but placement risks over-teaching a regular grapheme-to-sound pair |
| 26 | Recap distinguishes 31 letters from occasional RR spelling practice | Compatible with sources if RR remains a limited convention, not a universal rule |
| 25–26 evidence update | `roj` has initial trill but is spelled with one `r`; `pir/pirr` is the limited example | Strongest current source-specific clarification |

This is a presentation consistency issue, not proof that the Lesson 04 statement is wholly false.

## 6. Minimal proposed editorial resolution — not applied

Preferred approach:
1. Keep the 31-letter alphabet inventory unchanged.
2. Keep `R r` in the consonant-letter table, but avoid presenting `/ɾ/` as the only possible realization in all environments and dialects.
3. Move `rr` out of the main alphabet/consonant-letter rows into a separate note titled “Tap and trill: pronunciation versus spelling.”
4. State that initial `r` is trilled in the described Standard Kurmanji pattern but is still written with one `r`, as in `roj`.
5. State that some descriptions/practices occasionally use `rr` to mark a trill, with `pir/pirr` as the source-attested example in Thackston.
6. Do not add `rroj`, invent a minimal pair, or teach RR as obligatory.
7. Keep dialect and transcription conventions explicitly named.

If the editor wants to retain the RR row in the table, it should be visually and semantically separated from the 31-letter inventory and labelled as an occasional digraph convention, not a regular alphabet letter.

## 7. Evidence status and remaining approvals

- **31-letter inventory excluding RR:** supported by the reviewed alphabet references.
- **Initial r is trilled in the described Standard Kurmanji:** supported by Haig and Thackston.
- **RR occasionally represents a trill in some written descriptions:** supported by Thackston's limited example.
- **RR is a universal, predictable orthographic representation of every trill:** not supported.
- **Every dialect uses the same tap/trill distinction and spelling:** not supported.
- **Sorani wording and terminology in Lesson 04:** still requires native Sorani copy-edit.
- **Final pedagogical table layout:** requires owner/editor approval before any content change.

## 8. Actions not taken

No lesson body, seed SQL, migration, schema, static shell, application code, validator, test, database, PR #3, main branch, merge state or deployment was changed. No SQL was executed. No claim is made about live database content.

## Backup record

- Pre-work backup: `backup/c1-l04-rr-cross-lesson-consistency-before-2026-11-17`
- Baseline SHA: `266c048d5740f322f280db4c4d6a4c0397a54203`
- Post-work backup: `backup/c1-l04-rr-cross-lesson-consistency-after-2026-11-17` (advanced to the final documentation commit after verification).
