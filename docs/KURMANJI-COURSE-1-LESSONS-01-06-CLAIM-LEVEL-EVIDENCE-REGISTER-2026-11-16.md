# Course 1 Lessons 01–06 — Claim-Level Evidence Register

**Date:** 2026-11-16  
**Repository:** avasinim/zanztkurd  
**Branch:** fix/kurmanji-ci-current-migration  
**Source under review:** docs/kurmanji-content-seed-part-01.sql (lesson payloads 01–06)  
**Related review:** docs/KURMANJI-LESSONS-01-06-ENRICHMENT-SOURCE-REVIEW-2026-11-16.md  
**Status:** Editorial evidence register. No lesson or seed content is changed.

## 1. Purpose and audit method

This register turns the existing lessons 01–06 source review into actionable claim-level checks. It distinguishes:
- a claim supported by a source at the level currently checked;
- a claim that is plausible but lacks a pinpoint source location;
- an orthographic or dialect-scope issue that must be resolved;
- a translation/editing issue that is separate from the Kurmanji linguistic evidence.

The register does not claim that all lesson content has been re-read by an external specialist. Page numbers are deliberately omitted wherever they have not been independently checked.

## 2. Executive status

| Lesson | Main subject | Evidence status | Release decision |
|---:|---|---|---|
| 01 | Kurmanji, alphabet, orthography and variety | Partial; broad framework supported, individual definitions/examples lack pinpoint references | HOLD for claim-level citations |
| 02 | 31-letter Hawar alphabet and letter classes | Partial; alphabet/vowel inventory corroborated, technical digital claims need technical source | HOLD for orthography-policy sign-off |
| 03 | Eight vowel letters and IPA | Core table corroborated by University of Arizona reference as recorded in prior source audit | Linguistic table provisionally supported; Sorani gloss review remains |
| 04 | Consonants, IPA, R/RR | Partial; core IPA chart has source support, RR row risks conflating phonetic realization and orthographic inventory | HOLD until RR presentation resolved |
| 05 | Five marked letters | Core letter classes and example pairs corroborated in prior source audit | Linguistic point provisionally supported; Sorani gloss review remains |
| 06 | Reading/writing words | Core forms and IPA substantially corroborated in prior source audit | HOLD for Sorani gloss and lexical-sense review |

**Overall:** 0/6 lessons are certified release-ready by this register. This is not a judgement that the lessons are unusable; it means the evidence, dialect metadata and editorial checks are not all complete.

## 3. Claim register — Lesson 01

### C1-L01-01 — Kurmanji is a major variety/branch of Kurdish

- **Lesson claim:** Kurmanji is one of the principal varieties/paths of Kurdish.
- **Evidence:** Haig & Öpengin (2018), structural and sociolinguistic description of Kurmanji in Turkey; Haig (2018), Northern Kurdish grammar sketch.
- **Scope:** broad linguistic classification; sociolinguistic naming and classification should follow the cited authors' terminology.
- **Status:** SUPPORTED AT GENERAL LEVEL.
- **Action:** cite exact section/page after checking the PDF/book copy. Avoid turning a broad classification into an unsupported claim about every community's identity or preferred label.

### C1-L01-02 — Contemporary written Kurmanji commonly uses Hawar-based Latin orthography

- **Lesson claim:** much contemporary written Kurmanji uses the Hawar Latin alphabet.
- **Evidence:** Haig & Öpengin (2018); Haig (2018); project orthography policy to be approved.
- **Scope:** written practice; not a claim that all Kurmanji is written in one script.
- **Status:** SUPPORTED WITH SCOPE.
- **Action:** state explicitly that this course selects a Hawar-based Latin written target, while acknowledging other writing practices and contexts where relevant.

### C1-L01-03 — Language, alphabet, orthography and sound are distinct concepts

- **Lesson claim:** these four concepts must not be conflated.
- **Evidence:** standard linguistic distinctions; Haig (2018) and Haig & Öpengin (2018) provide relevant structural context.
- **Scope:** conceptual teaching definitions.
- **Status:** CONCEPTUALLY SOUND; PINPOINT SUPPORT INCOMPLETE.
- **Action:** cite an introductory linguistics/orthography reference for the definitions themselves, then check the Sorani wording for precision. Do not attribute every pedagogical definition to Haig without a matching passage.

### C1-L01-04 — Examples Kurmancî, Kurdî, çav and şev demonstrate marked-letter preservation

- **Lesson claim:** ç and ş are part of the written forms, not decorative typography.
- **Evidence:** the examples illustrate the orthographic distinction; direct word attestations and glosses need a traceable dictionary/text source.
- **Scope:** spelling demonstration, not a full phonetic analysis.
- **Status:** PARTIAL.
- **Action:** attach a lexicon or source-text citation for each word and verify the glosses. Keep the point about preserving diacritics, but do not present the four forms as sourced quotations unless their provenance is recorded.

### C1-L01-05 — Regional variation should not automatically be treated as spelling error

- **Lesson claim:** Kurmanji has regional variation in pronunciation, morphology and usage.
- **Evidence:** Öpengin & Haig (2014); Haig & Öpengin (2018); Manchester dialect database.
- **Scope:** documented regional variation, not unrestricted acceptance of every spelling variant.
- **Status:** SUPPORTED.
- **Action:** link future variant notes to locality and source; distinguish a regional spoken form from an orthographic typo.

## 4. Claim register — Lesson 02

### C1-L02-01 — Hawar-based Kurmanji alphabet contains 31 letters in the listed order

- **Lesson claim:** 31-letter alphabet and exact sequence.
- **Evidence:** the current course's cited alphabet references and the reviewed inventory; specialist orthography confirmation still required for the project's chosen house standard.
- **Scope:** the alphabet convention adopted by the course.
- **Status:** PARTIAL / CORROBORATED, NOT FINAL HOUSE-STYLE APPROVAL.
- **Action:** obtain sign-off from a Kurmanji orthography editor and cite the exact alphabet table/reference. Preserve the list exactly once approved.

### C1-L02-02 — Eight vowel letters: A, E, Ê, I, Î, O, U, Û

- **Lesson claim:** eight vowel graphemes in the selected alphabet.
- **Evidence:** University of Arizona Iranian Languages, “Kurmanji Kurdish,” as recorded in the earlier source review; Haig (2018) as a structural cross-check.
- **Scope:** graphemic vowel inventory in the described orthographic system.
- **Status:** CORROBORATED.
- **Action:** explicitly label these as vowel letters/graphemes, not as an exhaustive phoneme count.

### C1-L02-03 — Remaining 23 letters are consonant letters

- **Lesson claim:** 31 minus 8 gives 23 consonant letters.
- **Evidence:** arithmetic over the adopted 31-letter inventory and eight-vowel classification.
- **Scope:** letter classes only.
- **Status:** CORROBORATED AS GRAPHEMIC CLASSIFICATION.
- **Action:** retain the sentence that this does not describe the full phonological system.

### C1-L02-04 — Diacritics must be preserved in digital text

- **Lesson claim:** removing marks changes the written form and can damage exact matching.
- **Evidence:** orthographic distinction; Unicode/normalization/collation standards are needed for technical claims about digital processing.
- **Scope:** text preservation and data engineering.
- **Status:** ORTHOGRAPHIC POINT SOUND; TECHNICAL DETAILS NEED A TECHNICAL REFERENCE.
- **Action:** cite Unicode normalization/collation documentation for NFC, search and sorting behavior. Keep any diacritic-insensitive search as a separate search convenience; never overwrite source text.

### C1-L02-05 — Alphabet ordering and digital sorting

- **Lesson claim:** alphabet sequence is relevant to dictionaries, catalogues and digital sorting.
- **Evidence:** pedagogical/technical rationale; no dedicated collation specification is currently attached.
- **Scope:** alphabetic order versus software collation.
- **Status:** PARTIAL.
- **Action:** do not imply that every operating system or database sorts Kurmanji letters identically. Specify the project's own collation rules and test them.

## 5. Claim register — Lesson 03

### C1-L03-01 — Eight vowel-letter / IPA / word correspondences

- **Lesson claim:** a, e, ê, i, î, o, u, û correspond to the IPA values and sample words in the lesson table.
- **Evidence:** University of Arizona Iranian Languages, “Kurmanji Kurdish” vowel table, as recorded in the prior source review.
- **Scope:** the source's transcription and variety description.
- **Status:** CORE TABLE CORROBORATED.
- **Action:** preserve the source's IPA symbols and note its dialect/phonetic scope. Do not imply every regional pronunciation is identical.

### C1-L03-02 — Sorani glosses for qaz, belg, lêv, dil, hîn, nod, qul and bûz

- **Lesson claim:** Sorani glosses are added beside the source's English glosses.
- **Evidence:** source supports the English meanings, not necessarily the Sorani translation choices.
- **Scope:** translation/editorial accuracy.
- **Status:** NEEDS SORANI LANGUAGE EDIT.
- **Action:** have a Sorani editor check each gloss in context. Preserve the correction of qaz to قاز. Review qul carefully so its meaning is unambiguous and appropriate.

### C1-L03-03 — IPA symbols are not alphabet letters

- **Lesson claim:** IPA is a phonetic notation, not the Hawar alphabet.
- **Evidence:** International Phonetic Alphabet conventions; linguistic terminology.
- **Scope:** basic phonetics/orthography distinction.
- **Status:** CONCEPTUALLY SUPPORTED.
- **Action:** add a short IPA key or link to an IPA reference; avoid mixing slash-delimited phonemic notation and square-bracket phonetic transcription without explanation.

### C1-L03-04 — Regional realization of e may vary

- **Lesson claim:** the vowel written e can have regionally variable phonetic realizations.
- **Evidence:** University of Arizona page as recorded in the prior review; S1/S3 provide broader variation context.
- **Scope:** only the variants documented by the cited sources.
- **Status:** SUPPORTED WITH SCOPE.
- **Action:** keep the note tied to the named source and do not expand it into a universal statement about every locality.

## 6. Claim register — Lesson 04

### C1-L04-01 — Consonant letters and IPA correspondences

- **Lesson claim:** table links Kurmanji consonant letters to IPA values.
- **Evidence:** University of Arizona resource and Haig (2018), as recorded in the prior source review.
- **Scope:** source's standard/dialect description.
- **Status:** PARTIAL / CORE TABLE NEEDS PINPOINT CHECK.
- **Action:** preserve only correspondences directly supported by the source; mark alternatives and regional variation rather than forcing a single IPA value.

### C1-L04-02 — X may represent more than one relevant fricative realization

- **Lesson claim:** x has source-dependent/variety-dependent IPA alternatives such as /χ/ and /ʁ/.
- **Evidence:** University of Arizona resource as recorded in the prior source review; S1 for dialectal phonetic variation.
- **Scope:** the varieties and environments described in the sources.
- **Status:** PARTIAL, QUALIFIED VERSION PREFERABLE TO A CATEGORICAL RULE.
- **Action:** attach the exact source passage and identify whether the alternatives are phonemic, allophonic or dialect-specific.

### C1-L04-03 — R and RR distinguish tap/trill in some descriptions

- **Lesson claim:** r and rr may be associated with distinct tap/trill realizations.
- **Evidence:** source material supports a phonetic tap/trill distinction in relevant descriptions, but this does not establish rr as an additional Hawar alphabet letter or universal spelling convention.
- **Scope:** source-specific phonetic and orthographic practice.
- **Status:** UNRESOLVED ORTHOGRAPHIC PRESENTATION.
- **Action:** do not include RR as a 32nd alphabet letter. Either move it out of the alphabet table into a clearly labelled source-specific phonetic/orthographic note with pinpoint evidence, or remove the claim from the core alphabet inventory. Preserve the phonetic distinction only where directly supported.

### C1-L04-04 — Aspiration and other consonant detail

- **Lesson claim:** certain consonant realizations may involve aspiration or other phonetic detail.
- **Evidence:** University of Arizona reference as recorded in the prior review.
- **Scope:** exact segments, environments and variety stated by the source.
- **Status:** PARTIAL.
- **Action:** keep detailed aspiration out of the beginner core unless a source and learner objective justify it; provide a teacher note and a reliable audio/phonetic source.

## 7. Claim register — Lesson 05

### C1-L05-01 — ç, ş, ê, î, û are five distinct marked Hawar letters

- **Lesson claim:** the five letters have their own marked forms and must be preserved.
- **Evidence:** adopted 31-letter inventory and University of Arizona examples; S1/S2 as structural cross-check.
- **Scope:** Hawar-based Latin orthography selected for the course.
- **Status:** CORE TEACHING POINT CORROBORATED.
- **Action:** preserve the distinction between consonant letters ç/ş and vowel letters ê/î/û.

### C1-L05-02 — Example words and English glosses

- **Lesson claim:** çak, şaş, êş, îro and bûz illustrate the marked letters.
- **Evidence:** University of Arizona table, as recorded in the prior source review.
- **Scope:** source's forms and English glosses.
- **Status:** CORROBORATED AT SOURCE LEVEL.
- **Action:** Sorani glosses remain a separate copy-edit task; record source location before final release.

## 8. Claim register — Lesson 06

### C1-L06-01 — Word forms and IPA examples

- **Lesson claim:** av, dil, lêv, hîn, qaz, qul, çak and şaş illustrate reading and letter-sound correspondences.
- **Evidence:** University of Arizona source as recorded in the prior review; Yari dictionary cited as a supplementary lexical resource.
- **Scope:** source spellings, IPA and English meanings.
- **Status:** CORE FORMS AND IPA SUBSTANTIALLY CORROBORATED.
- **Action:** retain only the exact source-backed IPA and meanings; add a citation at the table level.

### C1-L06-02 — Sorani gloss for qul

- **Lesson claim:** Sorani translation of qul is used for the intended sense “hole/opening.”
- **Evidence:** source's English gloss does not by itself validate the Sorani word choice.
- **Scope:** Sorani translation accuracy and learner comprehension.
- **Status:** NEEDS EDITORIAL CLARIFICATION.
- **Action:** ask a Sorani editor to select a clear, context-appropriate gloss; avoid an ambiguous or unintended colloquial reading.

### C1-L06-03 — Use of audio/dictionary resources

- **Lesson claim:** learners may consult dictionary/audio evidence while practising.
- **Evidence:** sound samples and dictionary references can supplement literacy work; no single recording should be treated as universal.
- **Scope:** optional teaching support.
- **Status:** PEDAGOGICALLY REASONABLE; NO AUDIO DEPENDENCY.
- **Action:** retain as optional guidance only. Label any audio by speaker/locality and obtain appropriate consent/rights.

## 9. Cross-lesson corrective action list

| Priority | Item | Required action | Owner/reviewer |
|---|---|---|---|
| P0 | L04 RR row | Resolve alphabet-table versus phonetic-note presentation | Kurmanji orthography/phonetics specialist |
| P0 | L02 alphabet sequence | Approve the project's exact 31-letter Hawar list | Kurmanji orthography editor |
| P1 | L01 definitions/examples | Add pinpoint sources and word provenance | Linguistics editor |
| P1 | L03 Sorani glosses | Review all eight translations, preserve qaz → قاز correction | Sorani language editor |
| P1 | L05 Sorani glosses | Review translations of five example words | Sorani language editor |
| P1 | L06 qul gloss | Clarify intended sense in Sorani | Sorani language editor |
| P2 | L02 digital sorting/search | Add Unicode and collation technical references; define application behavior | Technical editor |
| P2 | L03/L04 IPA | Add consistent IPA convention/key and source scope | Phonetics editor |
| P2 | L06 audio guidance | Keep optional; require variety and rights metadata for any future recording | Course editor |

## 10. Required approval record

Before any lesson text is changed, record:
- owner approval for the specific lesson batch;
- Kurmanji specialist approval for forms and examples;
- Sorani editorial approval for Pathway A explanations/glosses;
- exact source locations for every source-backed claim;
- a change log that preserves the previous approved text;
- a backup of the current content and a separate post-change backup.

## 11. Protection statement

This register is documentation-only. It does not alter:
- lesson bodies or static HTML shells;
- the 38-row split seed package;
- historical migrations or production data;
- application code, schema or database;
- main branch, PR #3, merge state or deployment.

**Release status:** Lessons 01–06 remain not release-certified. The highest-priority unresolved item is the Lesson 04 RR table presentation, followed by Sorani editorial review and pinpoint citations for Lesson 01.
