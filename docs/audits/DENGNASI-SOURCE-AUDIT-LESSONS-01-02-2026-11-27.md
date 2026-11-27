# Dengnasî lesson source audit — lessons 01–02 — 2026-11-27

## Scope

A focused comparison of the current branch payload with Husein Muhammed, *Dengnasî di kurdî de*, using the printed-page ranges in the course authoring plan. This is a source-fidelity review, not a general linguistic peer review.

- Lesson 01: printed pages 4–7.
- Lesson 02: printed pages 8–15.
- Payload: `docs/previews/dengnasi-content-html-payload-preview.json`.
- Authoring map: `docs/KURMANJI-DENGNASI-LESSON-AUTHORING.md`.
- Book PDF: `Dengnasiya_Zimane_Kurdi_27_Wane_corrected.pdf`.

## Lesson 01 — Dergeh: ev vekolîn û yên berî wê

### Source coverage observed

The source pages 4–7 cover:
- phonology as a branch of linguistics and its relationship with other linguistic fields;
- earlier Kurdish phonology research, including Ferdinand Justi and Celadet Bedirxan;
- other named studies and their specific scope limitations;
- Kurdish phonology in relation to neighboring languages;
- the stated aims, comparative method, and intended accessible presentation of the book.

### Payload comparison

The payload includes these subject areas and expands the organization into six numbered sections plus a source list. Its added section headings “Lêkolînên din û sînorên wan” and “Çavkaniyên dengnasî yên zimanên cîran” organize material that is present in the cited source pages; the source itself lists the researchers and neighboring-language references. The payload also makes explicit that one assessment of prior literature is the author's view at the time, rather than a new review of all later research. This is a useful qualification, not a new historical claim.

**Assessment:** source-topic coverage is consistent with pages 4–7 in the inspected passages. The payload is a structured paraphrase, not a verbatim transcription. No specific unsupported factual addition was established in this focused check.

## Lesson 02 — Vokal, konsonant; cih û awayên dengan; pifdarî

### Source coverage observed

The source pages 8–15 cover:
- the distinction between vowels and consonants;
- the eight Kurdish Latin vowel symbols and the distinction between written consonant letters and phonemic consonants;
- terminology for vowels/consonants;
- place and manner of articulation, including the consonant table and its notation key;
- vocal folds, voicing, and examples using M, N, F, V, P, and B;
- aspiration contrasts for Ç, K, P, and T, including their distribution and lexical examples.

### Payload comparison

The payload contains corresponding sections and explanatory examples. In particular:
- it preserves the source's distinction between letter count and phoneme count;
- it retains the source's contrast between P in *pênc* and *perde*;
- it explains the source's place/manner terminology and the role of vocal-fold vibration;
- it records the source's unusual duplicate classification of ẓ in the table key as an editorial inconsistency rather than silently resolving it.

The payload uses a more segmented heading structure (subsections 3.1–3.5) than the database version. That is a structural difference; it does not by itself mean material was added or removed.

**Assessment:** the inspected payload passages are consistent with the corresponding source pages. No specific unsupported factual addition was established in this focused check.

## Limits and next work

- This audit only covers lessons 01–02. It must not be generalized to the remaining 25 lessons.
- Exact HTML parity with the test database remains 0/27, and the 9 title mismatches remain unresolved.
- A complete source-fidelity check must continue lesson by lesson, especially where the payload has appended “pêrawej”, “têbînî”, or expanded historical-comparison sections.
- No Supabase data was changed. No migration, production change, deployment, PR merge, or course activation was performed.
