# B0 Pilot Lessons 01–04 — Linguistic and Pedagogical QA Review
**Date:** 2026-11-16  
**Repository:** `avasinim/zanztkurd`  
**Working branch:** `fix/kurmanji-ci-current-migration`  
**Reviewed baseline:** `18d19e0784972c36a8e3a97dfb9a76bac576d046`  
**Status:** proposal-only review; no lesson text edited; no release approval.

## 1. Scope and decision

This review covers the three B0 pilot drafts (lessons 01–03) and the newly added vowel lesson 04. It is an editorial and evidence audit, not native-speaker certification. No existing lesson, seed SQL, migration, application code, database, `main`, PR #3, or deployment was changed.

**Decision:** retain all four as drafts. Lesson 04 has a sound academic foundation for introducing the eight Hawar vowel graphemes, but its terminology, contrast exercise, and claim-level source attribution need revision before a language editor signs it off. Lessons 01–03 remain unapproved pending full phrase-level Kurmanji review.

## 2. High-priority findings for Lesson 04

### L04-01 — Distinguish written vowel letters from vowel sounds
**Severity:** P0 — conceptual accuracy.

The lesson alternates between “tîpên dengdêr” (written vowel letters/graphemes) and “dengdêr” as a sound category. The definition “Dengdêr tîpek e...” treats a vowel as a letter, then describes it as a sound. This collapses orthography and phonology immediately after Lesson 03 has introduced the distinction between `tîp` and `deng`.

**Evidence:** Haig describes eight vowel phonemes and maps them to Hawar spellings: five full/tense vowels and three weak/lax vowels. The orthographic forms are `a, ê, î, o, û, e, u, i`; the phonetic values are a separate level of description. Haig also notes that vowel length itself is not phonemically distinctive. See Haig (2018), §2.1.1, pp. 109–112; Haig & Öpengin (2018), §3.1.1.

**Recommendation (do not apply without editorial approval):**
- In learner-facing text, introduce the eight written forms as **tîpên dengdêr**.
- Define **dengdêr** as a speech sound, and **tîpa dengdêr** as its written representation.
- Keep IPA and tense/lax terminology in teacher notes, not in the B0 learner explanation.
- Avoid saying that the written letter itself is the sound.

### L04-02 — The three contrast exercises do not yet test both sides
**Severity:** P0 — assessment validity.

Exercise 3 presents:
- `e / ê` with only `sêv` (which contains `ê`);
- `i / î` with only `spî` (which contains `î`);
- `u / û` with only `bûk` (which contains `û`).

The learner is asked to choose the correct letter, but the provided word does not contrast the other member of each pair. The exercise therefore tests recognition of only one side, not discrimination.

**Recommendation (proposal only):** use paired examples containing both members, for example `em / sêv`, `dil / spî`, and `guh / bûk`. Ask learners to identify the vowel grapheme in each word and then match each grapheme to its word. Have a Kurmanji editor verify the examples and the prompt wording before adoption.

### L04-03 — Correct the example-level evidence attribution
**Severity:** P1 — source traceability.

The evidence note says the listed words are drawn from Haig’s documented examples. Haig (2018), pp. 109–112, supports several listed items, including `mal`, `sêv`, `spî`, `bûk`, `toz`, `em`, and `guh`. The word `dil` appears in the University of Arizona Kurmanji reference, but not in the cited Haig vowel example tables surfaced for this review.

**Recommendation:** annotate the source for each example individually. Do not imply that every example is sourced from Haig. The dialogue, instructions, and exercises remain instructor-authored and are not corpus attestations.

### L04-04 — Keep vowel-length claims precise
**Severity:** P1 — phonological precision.

The teacher notes correctly warn that vowel length alone is not phonemic. Preserve this qualification wherever “long”, “short”, “tense”, “full”, “lax”, or “weak” is used. Do not teach the five-versus-three grouping as a simple phonemic length contrast. Haig describes the full vowels as generally realized phonetically long, particularly in open syllables, while explicitly stating that length by itself is not phonemically distinctive.

**Recommendation:** use “full/tense” and “weak/lax” as labels in teacher-facing notes, and explain that these labels are not a claim that length alone distinguishes word meaning. Do not add IPA to B0.

### L04-05 — Regional variation and transcription conventions
**Severity:** P1 — dialect control.

The sources differ in how they transcribe the weak high vowel represented by `i` (e.g. `/ɪ/` versus `/ɨ/` in different descriptions/transcription conventions). This is a reason to avoid a single IPA value in the beginner lesson and to keep the spoken reference variety unresolved until an editorial decision is made.

**Recommendation:** retain the written inventory for this lesson; record the chosen phonetic transcription convention in the teacher/research documentation only after the reference variety is approved.

### L04-06 — Glossary and instruction consistency
**Severity:** P2 — editorial polish.

The glossary item `binê xêzê de bîne` does not match the imperative used in the exercise (`di bin de xêz bike` / “underline”). Review the exact Kurmanji form and use one consistent expression across instruction, glossary, and answer key. Also review `Carga nû` and all classroom imperatives for idiomaticity; this report does not certify them.

## 3. Evidence matrix for Lesson 04

| Claim or example | Review result | Evidence / action |
|---|---|---|
| Hawar vowel graphemes: a, e, ê, i, î, o, u, û | Supported | Haig (2018), §2.1.1; Haig & Öpengin (2018), §3.1.1 |
| Eight-vowel phonological analysis | Supported for the described standard analysis | Haig (2018); Haig & Öpengin (2018); University of Arizona overview |
| Five full/tense and three weak/lax categories | Supported, terminology needs care | Preserve the note that length itself is not phonemic |
| `mal, sêv, spî, bûk, toz` | Found in Haig’s example tables | Haig (2018), pp. 109–110 |
| `em, guh` | Found in Haig’s weak-vowel examples | Haig (2018), pp. 111–112 |
| `dil` | Not found in the cited Haig tables; found in Arizona reference | Attribute to Arizona or replace with a Haig-attested example |
| No single pronunciation universalized | Appropriate safeguard | Keep until reference variety is selected |
| Contrast exercise tests all six letters in three pairs | Not yet supported by task design | Add both sides of each pair |

## 4. Carry-forward checks for Lessons 01–03

The three earlier drafts remain **not approved**. Their own document correctly labels them as instructor-created drafts and calls for editor review. Before release, a proficient Kurmanji editor should check:

1. **Lesson 01 — greetings and classroom language:** idiomaticity and regional acceptability of `Tu çawa yî?`, `Ez baş im, spas`, `Ser çavan`, `Bi xatirê te`, and all imperative forms; verify that each answer is pragmatically appropriate for the described context.
2. **Lesson 02 — alphabet:** verify the 31-letter Hawar sequence, the five diacritic letters, and every instruction/answer. Preserve the distinction between letters and phonetic values.
3. **Lesson 03 — letter, sound, word:** verify the pedagogical definitions. The current simple definition of `peyv` and the claim that words are composed of written letters should not be allowed to imply that spoken words are literally made of written symbols.
4. **All three:** verify every learner-facing sentence for morphology, idiom, spelling, consistency of address, and beginner comprehensibility. Confirm that the no-Arabic-script/no-Sorani learner-facing policy remains satisfied after any future edits.
5. Do not treat the lack of Arabic-script characters as proof of linguistic correctness.

## 5. Cross-lesson sequence and assessment

The sequence 02 (letter inventory) → 03 (letter versus sound) → 04 (vowel letters) is pedagogically plausible. However, Lesson 04 should explicitly refer back to the *written* distinction from Lesson 03, not silently redefine `dengdêr` as a letter. Lesson 01's greeting and classroom-language material is a separate communicative strand and should not be treated as evidence that the learner has mastered the alphabet.

Assessment design should follow the taught objective:
- recognition tasks should show all target graphemes;
- contrast tasks must include examples for both members of each contrast;
- spelling tasks should preserve diacritics;
- no pronunciation score should be introduced before the spoken reference variety and assessment rubric are approved.

## 6. Research sources consulted

1. **Haig, Geoffrey (2018), “Northern Kurdish (Kurmanjî),”** in *The Languages and Linguistics of Western Asia*, §2.1.1, pp. 109–112.  
   https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf  
   Supports the eight-vowel analysis, the five full/tense versus three weak/lax description, example words, and the qualification that phonetic length is not itself phonemic.

2. **Haig, Geoffrey & Öpengin, Ergin (2018), “Kurmanji Kurdish in Turkey: Structure, varieties, and status,”** §3.1.1.  
   https://www.uni-bamberg.de/fileadmin/aspra/06_Team/Publications_and_CV/HaigOepengin2018_Kurmanji_Kurdish_.pdf  
   Supports the vowel phoneme inventory and grapheme mappings; useful for the transcription and variety discussion.

3. **University of Arizona, Iranian Languages, “Kurmanji Kurdish.”**  
   https://iranian-languages.arizona.edu/node/7  
   Supplementary reference for vowel-to-orthography mapping and the example `dil`; use alongside, not instead of, specialist descriptive work.

4. **Gündoğdu, Songül, “Remarks on Vowels and Consonants in Kurmanji.”**  
   https://www.researchgate.net/publication/303040378_Remarks_on_Vowels_and_Consonants_in_Kurmanji  
   Useful as a dialect-specific caution: Muş Kurmanji may show a more complex phonetic vowel realization than the simplified eight-grapheme classroom chart. Do not generalize its local findings to all Kurmanji varieties.

## 7. Release gate

**Current status: DRAFT — NOT APPROVED.**

Required before any lesson is promoted:
- named proficient Kurmanji language editor signs off on all learner-facing text;
- linguist reviews vowel terminology, source mapping, and dialect boundaries;
- exercise answer keys are checked against the actual task;
- all examples have traceable sources or are explicitly labelled instructor-created;
- project owner selects/approves the reference variety and editorial policy;
- accessibility, font rendering, keyboard entry, and Unicode normalization are tested.

This report is a proposal-only QA artifact. It does not authorize changes to the four lesson drafts or any application content.
