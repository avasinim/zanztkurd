# Dengnasî title canonicalization recommendation — 2026-11-26

## Purpose

Prepare a safe, reviewable decision for the nine learner-facing lesson-title mismatches before generating database payloads. This report does not change lesson text, manifest titles, lesson IDs, database rows, site pages, or publication state.

## Evidence and recommendation

The authoring document contains three distinct title layers: its overview table, each lesson's own H1, and the manifest's display title. The lesson H1 is the strongest canonical candidate for the learner-facing title because it is attached to the authored lesson body itself. The overview table is a compact navigation summary and may use shortened wording. The manifest is a structured display/navigation index, so it should follow the chosen canonical H1 rather than silently override it.

Recommended rule: use each numbered lesson section's H1 as the canonical display title; align the manifest title and standalone page title metadata to it in a later reviewed integration change. Keep all 27 lesson IDs, lesson keys, source-page ranges, and body content unchanged.

## Nine mismatches

| Lesson | Lesson H1 (recommended canonical title) | Current manifest title | Editorial note |
|---:|---|---|---|
| 1 | Dergeh: ev vekolîn û yên berî wê | Dergeh û ev vekolîn û yên berî wê | Preserve the authored lesson heading; do not alter the body. |
| 2 | Vokal, konsonant; cih û awayên dengan; pifdarî | Vokal û konsonant; cih û awayên dengan; pifdarî | Preserve the authored lesson heading; do not alter the body. |
| 4 | Qelewîtî: dengên qelew û zirav | Qelewîtî | Preserve the authored lesson heading; do not alter the body. |
| 6 | Dengrêziya kurmancî û avaniya kîteyan | Dengrêziya kurdî; peyv ji kîteyan pêk tên | Preserve the authored lesson heading; do not alter the body. |
| 17 | Eyn û komên konsonantî di kurdî de | Eyn (ع) û hemû cotkonsonantên di kurdî de | Preserve the authored lesson heading; do not alter the body. |
| 21 | Dîftong û giranî di dengnasiya kurdî de | Hin mijarên taybet: dîftong û giranî | Preserve the authored lesson heading; do not alter the body. |
| 22 | Nasandina KL û KE û cudahiyên herdu alfabeyan | Nasandina KL û KE; cudahiyên herdu alfabeyan | Preserve the authored lesson heading; do not alter the body. |
| 26 | Cudahiyên dengnasî di navbera kurmancî û tirkî de | Cudahiyên dengnasî di navbera kurdî û tirkî de | Preserve the authored lesson heading; do not alter the body. |
| 27 | Cotdengiya Ç, K, P, T û rêgirtina li ber hiyatusê | Cotdengiya Ç, K, P, T û rêgirtin di ser peyvan re | Preserve the authored lesson heading; do not alter the body. |

## Important handling notes

- Lesson 1: retain the H1's colon construction; do not substitute the overview-table wording.
- Lesson 2: retain the H1's comma-separated terms; this is a title-only distinction.
- Lesson 4: the H1's explanatory subtitle is appropriate as the full learner-facing title; the manifest may retain a shorter navigation label only if the UI explicitly supports separate short and full titles. No such separate field is assumed here.
- Lesson 6: use the authored H1, not the manifest's alternate paraphrase; do not infer a change to lesson content.
- Lesson 17: the H1 avoids embedding an Arabic-script glyph in the title. Keep the Latin-script course presentation consistent.
- Lesson 21: use the authored H1; the lesson's content remains unchanged.
- Lesson 22: retain the H1's conjunction and punctuation.
- Lesson 26: retain “kurmancî” because the authored title explicitly scopes the comparison that way; do not broaden it to “kurdî”.
- Lesson 27: retain the authored H1's reference to hiyatus; the existing content audit already documented the source's terminology and its internal inconsistency separately.

## Validation still required before payload generation

1. Align all 27 manifest titles with the canonical H1s, not just the nine differences.
2. Align the 27 standalone HTML page title/H1 metadata.
3. Confirm course catalogue and navigation use the same canonical display title.
4. Re-run exact parity checks across authoring H1, manifest, standalone page, and final lesson-content title payload.
5. Confirm all stable IDs and printed/designed PDF page ranges are byte-for-byte unchanged.

## Safety boundary

This is documentation and recommendation only. It does not alter `main`, production Supabase, student data, access policies, migrations, deployment, or publication. It does not merge or change PR #89.


## Implementation and validation — 2026-11-26

The recommendation above has now been implemented on the isolated implementation branch:

- The manifest's 27 display titles follow the numbered authoring H1 headings.
- The nine stale titles in the reader's embedded lesson array have been aligned to those canonical headings.
- Standalone lesson pages retain their matching H1 and document title metadata.
- `scripts/validate_kurmanji_dengnasi_course.py` now checks, for every lesson, exact equality among the authoring H1, manifest title, reader title, standalone page title, and standalone page H1.
- Stable lesson IDs, keys, source citations, printed/original/designed page ranges, and lesson body content were not changed by this title-parity update.

The new validation will be exercised by the Dengnasi GitHub Actions workflow. Until that run passes, this is an implemented change awaiting CI confirmation, not a claim of passing validation. The course remains held under preparation; no activation, migration, database write, publication, deployment, or merge was performed.
