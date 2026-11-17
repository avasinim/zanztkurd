# Evidence-Led Editorial Decision for Kurmanji Seed/Migration Reconciliation — 2026-11-17

## Decision

The project should treat the **post-release split seed package as the current editorial working source**, but not copy it blindly. The 2026-10-24 migration is a historical release snapshot and must remain immutable because repository release records state that version `20261024122051` was applied. Any future production change must be delivered through a new forward-only migration, never by editing or replaying the historical migration.

For the 12 mismatches, the chosen target is:

- Keep the enriched seed payloads for Course 1 lessons 01–06 and 10. These are substantive post-release teaching improvements, with clear commit provenance. Their factual claims must still be reviewed against the sources cited in the lessons.
- Lesson 25: keep the seed's grammatical wording `نەردەکەوێت` (the migration's `نەردرکێت` is a malformed spelling), but correct the seed's `ڕونتر` to `ڕوونتر`.
- Lessons 30 and 32: use `پێویستە`, not `پەیویستە`.
- Lessons 35 and 36: use `نووسینەی` and `نووسینی`, not `نوسینەی` and `نوسینی`.

The five small-row decisions concern the Sorani explanatory text, not Kurmanji target forms. They do not justify changing any Kurmanji Latin-script word.

## Why this is the defensible choice

### 1. Preserve the historical release artifact

PR #4's final release snapshot `96f5b8eaef364332e3aee39df7e599a8c994693b` contained exact parity: 38 ordered tuples in the migration and 38 in the five seeds, with zero mismatches. The current migration's lesson tuples remain the release snapshot; later seed-only commits introduced the current divergence.

Therefore, editing the historical migration in place would falsify the release record. A forward-only migration is the correct technical model if the post-release lesson improvements are to become the desired live content.

### 2. Prefer the substantive post-release teaching improvements

The seed-only commit history explicitly describes academic enrichment/revision of lessons 1–6, a greeting-context distinction in lesson 10, and the Avasin orthography pass. The enriched versions add:
- Lesson 1: language/alphabet/orthography/variety distinctions, provenance-aware example analysis, and analytical practice.
- Lesson 2: the 31-letter Hawar inventory, the 8-vowel/23-consonant-letter classification, diacritic preservation, and sorting/search awareness.
- Lesson 3: the eight Kurmanji vowel graphemes paired with IPA, examples and a dialect-variation qualification.
- Lesson 4: the distinction between grapheme, phoneme and phonetic realization; consonant examples and variation notes.
- Lesson 5: a focused treatment of the five marked letters.
- Lesson 6: a guided grapheme-to-word reading procedure and source-labelled examples.
- Lesson 10: a distinction between `Êvarbaş` (good evening) and `Şevbaş` (good night).

These additions are pedagogically useful and align with the cited specialist literature, but they are not automatically error-free merely because they are later.

### 3. Apply precise Sorani spelling corrections to the small differences

- **نووسین / نووسینی / نووسینەی:** the Sorani orthography note on Kurdipedia explicitly gives `نووسین` among forms written with double waw when the two waw positions are consonantal. This supports `نووسینی` and its inflected form rather than the single-waw variants.
- **ڕوونتر:** the same Sorani orthography discussion gives `ڕوون`; an orthography note specifically illustrates `ڕوونتر`. Use the double-waw form.
- **پێویستە:** this is the established Sorani spelling for “is necessary / must”; `پەیویستە` is not selected as the course form.
- **نەردەکەوێت:** this is the intelligible Sorani verbal phrase in the lesson context (“does not appear/become visible”). The migration's `نەردرکێت` is a malformed string and should not be retained.

Sources for these Sorani decisions are supporting editorial references rather than a claim that one web page is a binding language authority. Avasin's own house-style guide should eventually supersede general usage where it has a documented, internally consistent rule.

### 4. Confirm the Kurmanji language facts against specialist sources

- The University of Arizona Iranian Languages page describes eight Kurmanji monophthongs and provides the IPA/example set used in lesson 3: `a /ɑ/ qaz`, `e /æ/ belg`, `ê /e/ lêv`, `i /ɪ/ dil`, `î /i/ hîn`, `o /o/ nod`, `u /ʊ/ qul`, `û /u/ bûz`.
- Thackston's *Kurmanji Kurdish: A Reference Grammar with Selected Readings* begins its phonology section with alphabet/sounds and separately treats aspirated/unaspirated stops, orthographic variants and the furtive i. This supports teaching grapheme/phoneme distinctions and not collapsing all pronunciation into a simple one-letter/one-sound rule.
- The Institute of the Estonian Language KNAB table identifies the Kurmanji Roman alphabet as Hawar (1932), distinguishes Kurmanji Latin writing from Sorani Perso-Arabic writing, and lists relevant letter/IPA correspondences.
- Ergin Öpengin's 2017 review in *Kurdish Studies* explains the historical uptake of Hawar orthography while also describing the later need for standardization and the coexistence of regional and editorial variation. This argues against treating a single written standard as proof that every regional pronunciation or usage is identical.

### 5. Lesson-specific editorial notes

1. **Lesson 2:** the 31-letter alphabet with 8 vowel letters and 23 consonant letters is correct as a graphemic classification. Do not describe this as a claim that Kurmanji has only 23 consonant phonemes.
2. **Lesson 3:** the IPA table is aligned with the University of Arizona source. Preserve its dialect note; do not turn the listed values into an exceptionless pronunciation rule.
3. **Lesson 4:** `rr` must not be counted as a 32nd Hawar alphabet letter. It may be described in a separate note as a convention used in some descriptions to represent a trill, with the scope stated. The 31-letter inventory and phonetic consonant inventory are different objects.
4. **Lesson 5:** the source note currently overstates that every example comes from the University of Arizona table. The examples `çak`, `şaş` and `bûz` align with the cited table, but `êş` and `îro` need their own lexical/source verification or must be labelled as instructor-created examples. Do not cite the Arizona table as the direct source for examples it does not list.
5. **Lesson 6:** keep the source-backed examples `av`, `dil`, `lêv`, `hîn`, `qaz`, `qul`, `çak` and `şaş` intact. `yek` and `roj` should be separately sourced if their exact phonetic analysis is expanded.
6. **Lesson 10:** retain the distinction `Êvarbaş` = good evening and `Şevbaş` = good night. It is supported by multiple Kurmanji learning/phrase references, including Yari and the beginner reference grammar PDF. Do not imply that these are the only greetings used across all communities.

## Required technical implementation

The correct implementation is **not** to edit `20261024122051_add_kurmanji_courses_and_protected_lessons.sql`.

The next code change should:
1. Normalize the five small Sorani text differences in the relevant split seed rows to the chosen forms above.
2. Add a new, forward-only migration that updates the 12 selected lesson rows to the chosen canonical payloads. It must target only the 12 explicit lesson keys, verify the expected course/key set and affected-row count, and fail atomically if the preconditions are not met.
3. Change `scripts/validate_kurmanji_seed_parity.py` so it validates the **effective post-migration content** (historical release migration plus the new forward migration overlay) against the current five-seed package. It must separately assert that the historical migration remains an immutable 38-row release baseline. It must not falsely demand that a historical applied migration equal a later mutable seed package.
4. Update workflow paths so the new forward migration and validator are checked by CI. Do not broaden the task into unrelated CI cleanup.
5. Run the relevant parser/parity tests in an isolated local checkout and inspect the exact diff. Do not apply the migration to production, connect to production Supabase, merge, deploy, or alter main.

## Status of this decision record

This document records the editorial decision and the safe technical design. It does not claim the code implementation is already complete. No lesson body, seed, migration, validator, workflow, database, Supabase project, PR, main branch or deployment was changed while producing this decision record.

## Research references

- University of Arizona, Iranian Languages, “Kurmanji Kurdish” (phonology: eight vowels, IPA, examples, consonants and variety notes): https://iranian-languages.arizona.edu/node/7
- W. M. Thackston, *Kurmanji Kurdish: A Reference Grammar with Selected Readings* (phonology, pp. 1–5; see the cited reference copy): https://www.kurdipedia.org/files/books/2013/92279.PDF
- Institute of the Estonian Language, KNAB, “Kurdish / Kurmanji Roman alphabet (Hawar 1932)” (letter and IPA correspondences): https://arhiiv.eki.ee/knab/lat/kblku2.pdf
- Ergin Öpengin (2017), review of Mistefa Aydogan, *Rêbera Rastnivîsînê*, *Kurdish Studies* 5(1), pp. 118–122, DOI 10.1163/9789004506152_012: https://brill.com/display/book/9789004506152/9789004506152_webready_content_text.pdf
- Kurdish orthography note on double-waw spellings including `نووسین` and `ڕوون`: https://www.kurdipedia.org/default.aspx?lng=1&q=20221113205548445087
- Kurdish orthography note illustrating `ڕوونتر`: https://emrro.com/ewwishaney.htm
- Yari, “Kurmanji greetings and everyday phrases” (Êvarbaş / Şevbaş usage): https://yari.krd/learn/kurdish-greetings/
- *Kurmanji Kurdish for the Beginners*, lesson 1, greetings table (Êvarbaş / Şevbaş): https://www.internationalistcommune.com/wp-content/uploads/2024/01/Kurmanji_Kurdish_For_The_Beginners_compressed.pdf

## Backup record

- Pre-work backup: `backup/kurmanji-editorial-authority-decision-before-2026-11-17`
- Starting HEAD: `6a3f66844567be7dd35a305046172eb305a665eb`
- Post-work backup: to be recorded after the documentation commit and exact ref/blob verification.
