# B0 Lessons 01–04 — Specialist Source and Claim-Level Evidence Review
**Date:** 2026-11-16  
**Repository:** `avasinim/zanztkurd`  
**Working branch:** `fix/kurmanji-ci-current-migration`  
**Baseline:** `cb6d5fd2a26d580f736b51e507e509d92fa1c7f0`  
**Status:** proposal-only research memo; no lesson text edited; not a linguistic certification or release approval.

## 1. Scope and method

This memo strengthens the integrated correction dossier with source-level checks for the claims in B0 pilot lessons 01–04. It uses specialist descriptive work, a published dialect-classification study, a reference grammar, and technical orthography documentation. The goal is to distinguish (a) claims directly supported by published sources, (b) plausible but insufficiently evidenced claims, and (c) claims that require a proficient Kurmanji editor or a project-owner decision.

It does **not** certify every authored phrase, settle the project's reference variety, or authorize changes to lesson text.

## 2. High-confidence findings

### 2.1 Hawar alphabet and orthographic identity — Lesson 02
**Finding:** The displayed 31-letter sequence is the conventional Hawar-based Latin inventory for Kurmanji. The five letters with diacritics are distinct alphabetic letters in this orthography: `Ç/ç`, `Ê/ê`, `Î/î`, `Ş/ş`, `Û/û`.

**Evidence:**
- KNAB's technical reference identifies the Kurdish/Kurmanji Roman alphabet and its Hawar-based conventions: https://arhiiv.eki.ee/knab/lat/kblku2.pdf
- R12a documents dedicated vowel letters, case forms and encoding behavior in the Hawar Latin orthography: https://r12a.github.io/scripts/latn/kmr.html
- Haig (2018) treats Standard Kurmanjî as a written standard loosely based on Cizre/Botan and distinguishes that standard from regional variation.

**Safe lesson wording principle:** say “the 31-letter Hawar alphabet adopted in this course” rather than claiming one universal Kurdish alphabet across all languages, dialects, scripts and transcription practices.

**Not established by the inventory alone:** the learner's keyboard layout, successful input on their device, Unicode normalization, collation/sorting behavior, or the project's treatment of foreign names and additional transcription symbols. Those require explicit tests.

### 2.2 Eight vowel phonemes and Hawar spellings — Lesson 04
**Finding:** Haig's analysis supports eight vowel phonemes in the described Standard Kurmanjî system, mapped to the eight Hawar vowel letters:
- five full/tense: /aː/ `a`, /iː/ `î`, /eː/ `ê`, /oː/ `o`, /uː/ `û`;
- three weak/lax: /æ/ `e`, /ʊ/ `u`, /ɪ/ `i`.

Haig explicitly cautions that the full vowels are often phonetically longer, particularly in open syllables, but vowel length alone is not phonemically distinctive in the analysis. See Haig (2018), §2.1.1, pp. 109–112; Haig & Öpengin (2018), §3.1.1.

**Important precision:** “eight vowel letters/graphemes” and “eight vowel phonemes” are related but not interchangeable statements. The lesson should teach written forms at B0 and reserve phonemic/phonetic analysis for teacher notes or later levels.

**Source references:**
- Haig, Geoffrey (2018), “Northern Kurdish (Kurmanjî),” in *The Languages and Linguistics of Western Asia*, pp. 106–158, especially §2.1.1, pp. 109–112: https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf
- Haig & Öpengin (2018), “Kurmanji Kurdish in Turkey: Structure, varieties, and status,” especially §3.1.1: https://www.uni-bamberg.de/fileadmin/aspra/06_Team/Publications_and_CV/HaigOepengin2018_Kurmanji_Kurdish_.pdf

### 2.3 Lesson 04 example words — evidence attribution
The Haig vowel tables explicitly provide examples including:
- full-vowel examples: `mal`, `sêv`, `spî`, `bûk`, `toz` (among others);
- weak-vowel examples: `em`, `guh`, `dest`, `ser`, `dev`, `gund` (among others).

The prior QA identified `dil` as not present in the cited Haig tables, while it appears in the University of Arizona Kurmanji overview. The exact source attribution should therefore be per item, not a blanket “all examples from Haig”.

**Recommendation:** either replace `dil` with a weak-vowel example explicitly present in Haig's table (e.g. `dest`, after editorial confirmation of its suitability for the target lesson), or cite the University of Arizona page specifically for `dil`. Do not imply every word in the teaching list is from one source.

Supplementary source: University of Arizona, Iranian Languages, “Kurmanji Kurdish”: https://iranian-languages.arizona.edu/node/7

### 2.4 Standard variety and regional variation — all lessons
Haig (2018) describes a broadly accepted written Standard Kurmanjî as loosely based on Cizre/Botan in southeastern Turkey, while also discussing regional variation. Haig & Öpengin (2014) classify regional variation using lexical, phonological and morphosyntactic data from five localities in southeastern Turkey. Their paper explicitly treats the dialect continuum and cautions against treating every local realization as identical.

**Implication:** the project must name its intended reference variety or publish a carefully bounded pluricentric policy. “Standard Hawar spelling” does not mean “one uniform pronunciation” or “every phrase is equally natural everywhere”.

**Sources:**
- Haig (2018), §1 and §2, same PDF above.
- Öpengin, Ergin & Haig, Geoffrey (2014), “Regional variation in Kurmanji: A preliminary classification of dialects,” *Kurdish Studies* 2(2), 143–176, DOI: https://doi.org/10.67145/ks.v2i2.62 ; article page: https://kurdishstudies.net/menu-script/index.php/KS/article/view/62

## 3. Grammar and phrase-level evidence

### 3.1 Second-person singular imperatives — Lesson 01
The reference grammar literature confirms that Kurmanji imperative formation is morphological and depends on verb-stem shape and verbal class/construction; it is not safe to validate an imperative by translating an English gloss alone. Thackston's *Kurmanji Kurdish: A Reference Grammar with Selected Readings* (2006), §17, gives singular and plural imperative paradigms, including distinct patterns for vowel-final and consonant-final stems. Gündoğdu's chapter “Negation in Kurmanji” also describes imperative forms in relation to subjunctive morphology and person/number marking.

**What this evidence supports:** the need to check the morphology and person/number of each imperative.

**What it does not certify:** the exact classroom collocation, object case, register, pragmatic force, or naturalness of every phrase in the draft.

**Review targets remain:**
- `Binêre.`
- `Bixwîne.`
- `Binivîse.`
- `Dubare bike.`
- `Nîşan bide.`
- `Hilbijêre.`
- `Raweste.`

A proficient editor should check each form against its intended infinitive and present stem, confirm singular informal address, and review any object/complement. `Raweste` needs a context-specific gloss so that “stop”, “wait” and “stand still” are not collapsed into one vague instruction.

**Sources:**
- Thackston, W. M. (2006), *Kurmanji Kurdish: A Reference Grammar with Selected Readings*, §17 “The Imperative” (bibliographic record): https://books.google.com/books?id=fXhwvwEACAAJ
- Gündoğdu, Songül, “Negation in Kurmanji,” in *Affix Ordering Across Languages and Frameworks* (Oxford University Press): https://www.academia.edu/3342645/Negation_in_Kurmanji_In_Manova_ed_Affix_Ordering_Across_Languages_and_Frameworks_Oxford_University_Press

### 3.2 Greetings and leave-taking — Lesson 01
Available learner-oriented phrase lists corroborate that forms such as `Silav`, `Roj baş`, `Tu çawa yî?`, and `Bi xatirê te` occur in Kurmanji teaching materials. A vocabulary list also glosses `Ser çavan` as “with pleasure”, not as a universal automatic response to “thank you”.

**Evidence limitation:** phrase lists are not controlled pragmatic studies and do not establish the most natural reciprocal dialogue across regional varieties. They cannot certify the draft's use of `Ser çavan!` after `Spas!`, or the identical farewell on both sides of a dialogue.

**Recommendation:** treat these expressions as candidates. A proficient editor familiar with the selected target variety should approve the exchange, register, response sequence, and context. Do not mark any exact line “source-certified” on the basis of a phrase list.

Supplementary materials (not primary scholarly authority):
- Kurdish beginner phrase material: https://www.skytower.org/~ernstjtremel/downloadableKurdishFiles/nord-Kurmanji_deutsch.pdf
- Kurdish Academy learning material: https://www.thekurdishacademy.com/en-de/blogs/learn-kurdish/kurdish-greetings-and-phrases

### 3.3 Written word, grapheme and speech sound — Lesson 03
**Finding:** the conceptual correction remains mandatory. A spoken word is not literally made of written letters. Writing represents language through orthographic symbols; speech is realized in sound. The B0 explanation must distinguish:
- the visible written grapheme/letter;
- the audible speech sound;
- the lexical word, which can occur in spoken and written modalities.

This is a basic linguistic distinction; it is consistent with the orthography/phonology separation used in Haig's descriptive account and in R12a's orthography documentation. However, neither source provides a ready-made beginner Kurmanji sentence. A proficient Kurmanji editor must author the final wording.

**Recommendation:** do not translate the English conceptual definition mechanically. Have the editor write two short, idiomatic learner-level statements and then back-check them against this distinction.

## 4. Correction priorities updated by evidence

| Lesson | Claim or text | Evidence status | Required closure |
|---|---|---|---|
| 01 | Greetings and leave-taking forms exist in teaching/reference materials | Partly supported; pragmatic sequence unverified | Editor review in selected variety |
| 01 | `Ser çavan` is a universal response to `Spas` | Not established | Remove universal implication; editor decision |
| 01 | Imperative forms are correct in context | Grammar supports morphological patterns, not these exact classroom strings | Stem-by-stem editor review |
| 02 | 31-letter Hawar inventory | Supported as conventional Hawar inventory | State scope as adopted course standard |
| 02 | Five diacritic letters are distinct letters | Supported by Hawar orthographic convention | Preserve marks in content and software |
| 02 | Keyboard and Unicode work for learners | Not established | Device/input and Unicode acceptance tests |
| 03 | Written word is composed of letters; spoken word too | Conceptually incorrect | Rewrite with modality distinction; editor approval |
| 03 | Examples count written graphemes | Supported as an orthographic task | Label task as written-letter segmentation |
| 04 | Eight vowel graphemes map to eight phonemes in the described standard analysis | Supported, with variety qualifications | Separate grapheme and phoneme terminology |
| 04 | Full/weak vowel groupings and length | Supported in Haig's analysis | Teacher note only; no simplified long/short rule |
| 04 | All eight sample words are from Haig | Not supported as a blanket claim | Item-level citation or replace/label authored |
| 04 | Three contrast tasks test both members of each pair | Not supported by current task | Add verified examples for both sides |

## 5. Items that cannot be responsibly closed from public sources alone

1. Whether the exact dialogue in Lesson 01 is idiomatic for the project's intended learner community.
2. Whether each imperative and its object/complement is the most natural classroom instruction.
3. Whether the proposed `dil` example should be retained, replaced, or attributed to a different source.
4. Which local pronunciation and lexical variants the project intends to teach.
5. Whether the beginner wording in Lesson 03 is comprehensible and idiomatic after the conceptual distinction is corrected.
6. Whether the platform's font, keyboard and Unicode pipeline preserves the five diacritic letters and search behavior.

These require, respectively, a proficient Kurmanji editor, a linguist, an owner decision, or technical testing. A web citation cannot substitute for those checks.

## 6. Recommended next safe work

1. Obtain owner decision on reference variety and orthographic house style.
2. Ask a proficient Kurmanji editor to annotate the exact strings in Lessons 01–04, not just give an overall approval.
3. Ask a Kurmanji linguist to sign off Lesson 03's written/spoken terminology and Lesson 04's grapheme/phoneme distinction.
4. Produce a second version of the correction dossier with reviewer decisions and accepted wording only after those reviews are received.
5. Run keyboard/Unicode tests separately from linguistic review.
6. Do not alter any learner-facing file until the owner explicitly approves the final correction list.

## 7. Project safety and release status

No lesson file, existing 38-lesson payload, seed SQL, migration, database, application code, CI, `main`, PR #3, or deployment was changed by this research memo.

**Status: RESEARCH REVIEW — PROPOSAL ONLY — NOT APPROVED FOR RELEASE.**
