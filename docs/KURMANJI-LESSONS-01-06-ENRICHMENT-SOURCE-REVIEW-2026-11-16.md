# Kurmanji lessons 01–06 enrichment source review — 2026-11-16

## Scope and preservation

This is a documentation-only review of the later split-seed enrichments for Course 1, lessons 01–06. It compares the reviewed additions in the Git history with the existing `docs/KURMANJI-RELEASE-AUDIT.md` source notes and the stated references in the lesson payloads.

No lesson body, seed row, migration, static page, application code, production database, `main` branch, pull request, or deployment was changed by this review. The split seed remains a review candidate, not an instruction to synchronize or replace the historical migration.

## Executive result

The later enrichment is pedagogically more careful overall: it more explicitly separates letters from sounds, distinguishes orthographic inventory from phonological variation, and adds IPA where the cited University of Arizona resource supports it. However, the evidence is not uniform:

- **Directly corroborated core material:** lessons 03 and 05; the lexical/IPA examples in lesson 06 are also substantially corroborated.
- **Partly corroborated, with source-quality or scope limits:** lesson 02's 31-letter inventory and vowel/consonant split; lesson 04's general IPA table.
- **Still not source-verified at claim level:** lesson 01's new conceptual expansion and examples.
- **Specific unresolved issue:** lesson 04 still presents **RR rr** as a row in the consonant table. The cited source supports a phonetic tap/trill distinction, but the existing audit correctly notes that this does not establish RR as a standard Hawar letter or a universal orthographic convention.

This report does not certify the lessons for release. Kurdish/Sorani glosses still need a separate language-editor review, and no broad normalization or automatic seed-to-migration replacement is recommended.

## Lesson-by-lesson findings

### Course 1 — lesson 01: language, alphabet, orthography, dialect

**What changed:** The enrichment adds a four-way conceptual distinction (language/variety, alphabet, orthography, sound/phonology), examples such as `Kurmancî`, `Kurdî`, `çav`, and `şev`, a method for recording example provenance, and a note that unverified page numbers must not be invented.

**Evidence assessment:** The existing audit's Thackston and Haig references support the broad need to distinguish Kurmanji as a language variety from the writing systems used for it, and to acknowledge regional variation. They do not yet provide pinpoint pages for each new definition or directly document every new example and its intended teaching function.

**Status: PARTIAL / NOT CLAIM-LEVEL VERIFIED.** The methodological caution is sound. The new definitions and examples should remain provisional until exact source sections are recorded. Do not add guessed page numbers.

### Course 1 — lesson 02: Hawar alphabet and letter classes

**What changed:** The enrichment retains the 31-letter Hawar inventory and adds a classification of 8 vowels (`A E Ê I Î O U Û`) and 23 consonant letters, plus notes about preserving diacritics and digital text handling.

**Evidence assessment:** The 31-letter order and five marked letters were previously cross-checked in the audit against the published alphabet sequence, though the cited article is corroborative rather than a dedicated linguistics source. The University of Arizona resource supports the eight-vowel inventory. The 23-consonant count follows from the 31-letter inventory minus the eight vowel letters; it is a graphemic classification, not a complete phoneme inventory. The enrichment appropriately warns against treating letters and sounds as identical.

**Status: PARTIAL / INVENTORY CORROBORATED.** Keep the distinction between alphabet-letter counts and phoneme counts explicit. The general remarks about digital sorting/search are useful technical guidance, not claims established by the cited linguistic sources; cite a Unicode/collation reference if they are to be presented as technical rules.

### Course 1 — lesson 03: vowels and IPA

**What changed:** The vowel table was expanded to show IPA alongside the eight written vowel letters, examples, and glosses. The Sorani gloss for `qaz` was corrected from `غاز` to `قاز`.

**Evidence assessment:** The University of Arizona, Iranian Languages, “Kurmanji Kurdish” vowel table directly supports the eight grapheme/IPA/example/English-gloss pairs recorded in the earlier audit: `a/qaz`, `e/belg`, `ê/lêv`, `i/dil`, `î/hîn`, `o/nod`, `u/qul`, and `û/bûz`. The later correction to `قاز` is an editorial correction to the Sorani gloss; the English source gloss is “goose.” The source does not independently validate all Sorani translations.

**Status: CORE TABLE CORROBORATED.** Preserve the IPA-versus-letter distinction and the source's dialect/phonetic caveats. A Kurdish editor should still review all Sorani glosses, especially words whose short gloss may be ambiguous.

### Course 1 — lesson 04: consonants and IPA

**What changed:** The lesson was substantially rebuilt with an IPA table for the 23 consonant letters, an explicit `/q/` description, an `X` entry that allows `/χ/` and `/ʁ/` in relevant varieties, and a more careful discussion of tap/trill and aspiration.

**Evidence assessment:**
- The University of Arizona resource is cited for the broad consonant-to-IPA correspondences and for variation in `x`, `r`, and aspiration. The revised `X` entry is more careful than the previous categorical `/χ/` wording.
- Describing `/q/` as a voiceless uvular stop is the appropriate IPA-level description; the Sorani technical wording should be checked for clarity.
- The revised lesson still includes `RR rr` as a separate table row and gives it `/r/`, while `R r` is given `/ɾ/`. The source's phonetic distinction between trill and tap does **not** by itself prove that doubled `rr` is a standard letter or a universal spelling rule. The lesson itself acknowledges that the spelling distinction varies, but the table layout can still mislead learners into treating RR as a separate alphabet letter.
- The inventory count of 23 applies to the consonant letters; RR should not silently be counted as an additional letter.

**Status: PARTIAL / IMPORTANT ORTHOGRAPHIC QUALIFICATION REQUIRED.** Before release, either document RR strictly as a source-specific spelling convention with a pinpoint reference, or remove it from the alphabet-letter table and discuss the phonetic distinction separately. Do not erase the tap/trill phonetic distinction; separate it from the orthographic claim.

### Course 1 — lesson 05: marked Hawar letters

**What changed:** The enrichment explicitly classifies `ç` and `ş` as consonants and `ê`, `î`, and `û` as vowels, and explains why the diacritics must be preserved.

**Evidence assessment:** The University of Arizona table directly attests the five lesson examples and their English glosses: `çak` (“good”), `şaş` (“wrong”), `êş` (“pain”), `îro` (“today”), and `bûz` (“ice”), as recorded in the earlier audit. The letter-class distinction is consistent with the eight-vowel inventory and the Hawar alphabet table. Sorani glosses are translations and still merit Kurdish editorial review.

**Status: CORE TEACHING POINT CORROBORATED.** No material source discrepancy was identified in the five letter/example pairs.

### Course 1 — lesson 06: reading and writing simple words

**What changed:** The enrichment adds IPA guidance to the word table, distinguishes IPA symbols from alphabet letters, adds a more explicit reading workflow, and advises using dictionary/audio evidence without treating a recording as a substitute for a speaker.

**Evidence assessment:** The University of Arizona source directly supports the forms and English glosses for the core examples `av`, `dil`, `lêv`, `hîn`, `qaz`, `qul`, `çak`, and `şaş`, including the vowel/consonant correspondences shown in the revised table. The earlier audit also records Yari's dictionary as an additional lexical resource. The lesson's Sorani translations are not the source's English glosses. In particular, the Sorani gloss `کون` for `qul` needs editorial clarification so it unambiguously conveys the intended sense “hole/opening.” The lesson treats `roj` cautiously and does not assert a universal R/RR rule; retain that caution.

**Status: CORE WORD FORMS AND IPA SUBSTANTIALLY CORROBORATED; SORANI GLOSSES NEED EDITORIAL REVIEW.** The audio suggestion is optional learner guidance, not a dependency or a claim that a particular recording has been checked.

## Source and release implications

1. Keep the historical migration as a historical snapshot. The later split seed has subsequent authored enrichments; that provenance does not establish that production contains either version.
2. Do not automatically copy the six later rows into the migration or database.
3. Preserve the existing audit caveat that all 38 lesson bodies require source verification; this six-lesson review does not satisfy the full release gate.
4. Resolve lesson 04's RR table presentation before claiming the consonant chart is fully orthography-verified.
5. Arrange a Kurdish/Sorani editorial pass for translations, especially lesson 03's glosses and lesson 06's `qul`.
6. For lesson 01, add pinpoint references only after the relevant source text and page/section have actually been checked.
7. Re-run the package and parity checks only after any approved content reconciliation. No migration execution, production write, merge, or deployment is authorized by this review.

## References already cited in the repository audit

- University of Arizona, Iranian Languages, “Kurmanji Kurdish”: https://iranian-languages.arizona.edu/node/7
- Haig, Geoffrey (2018), “Northern Kurdish (Kurmanjî),” in *The Languages and Linguistics of Western Asia: An Areal Perspective*: https://doi.org/10.1515/9783110421682-004
- Thackston, W. M. (2006), *Kurmanji Kurdish: A Reference Grammar with Selected Readings*.
- Yari, Kurmanji–English dictionary: https://yari.krd/dictionary/
- Existing repository source audit: `docs/KURMANJI-RELEASE-AUDIT.md`

The references above are inherited from the repository's existing audit and lesson source lists; this report does not claim that every cited book chapter or external page was independently re-opened during this pass.
