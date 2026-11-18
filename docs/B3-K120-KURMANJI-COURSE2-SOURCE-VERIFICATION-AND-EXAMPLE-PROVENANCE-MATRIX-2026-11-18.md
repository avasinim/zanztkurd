# B3-K120 — Course 2 source-verification and example-provenance matrix

**Date:** 2026-11-18  
**Repository:** `avasinim/zanztkurd`  
**Branch:** `fix/kurmanji-ci-current-migration`  
**Baseline:** `a867a8593ca6abd26aa89211ba80d265a07032e0`  
**Scope:** proposal-only source map for the 12 Course 2 lesson payloads. No lesson or assessment edits.

## 1. Backup and change boundary

- Pre-work backup: `backup/b3-k120-source-verification-matrix-before-2026-11-18`
- Pre-work SHA: `a867a8593ca6abd26aa89211ba80d265a07032e0`
- Main baseline: `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`
- Target: documentation only on `fix/kurmanji-ci-current-migration`.

No SQL was executed. No database, Auth, RLS, grants, migration, lesson content, seed, page, runtime code, test, workflow, PR, deployment or `main` was changed.

## 2. Source hierarchy and use rules

### Primary grammar source
Haig, Geoffrey. 2018. “Northern Kurdish (Kurmanjî),” in *The Languages and Linguistics of Western Asia: An Areal Perspective*, pp. 106–158, De Gruyter Mouton. DOI: https://doi.org/10.1515/9783110421682-004. University of Bamberg publication record: https://fis.uni-bamberg.de/entities/publication/06ab181d-1e09-43da-87f4-92453eaf5057

The previously reviewed chapter describes a **Standard Kurmanjî** grammar sketch and discusses regional variation separately. The former repository-hosted PDF URL currently redirects to a Bamberg corpus-move landing page; therefore this K120 pass does not claim to have freshly verified the complete Haig chapter PDF or every cited table. Section/page pointers below are the ones recorded in the repository's claim-level register and correction proposal; direct page-image confirmation remains a pre-publication task.

### Variety and dialect source
Haig, Geoffrey & Ergin Öpengin. 2018. “Kurmanji Kurdish in Turkey: Structure, varieties, and status,” pp. 157–229. University of Bamberg PDF: https://www.uni-bamberg.de/fileadmin/aspra/06_Team/Publications_and_CV/HaigOepengin2018_Kurmanji_Kurdish_.pdf

The accessible source describes its purpose as a synopsis of Kurmanji spoken in Turkey, with a grammar sketch of the standard variety and a separate account of major dialect divisions. It is a reminder not to turn one local paradigm into a universal Kurmanji rule.

### Case/agreement source
Baker, Mark & Ümit Atlamaz. 2014. “On the Relationship of Case to Agreement in Split-Ergative Kurmanji and Beyond.” Author-hosted PDF: https://sites.rutgers.edu/mark-baker/wp-content/uploads/sites/199/2019/07/kurmanji-split-erg-distributed-July-2014.pdf

The accessible paper explicitly identifies its core data as **Adıyaman Kurmanji**, described as similar to Standard/literary Kurmanji in relevant respects, and separately discusses Muş double-oblique data. It directly supports the present/past contrast in its own data; it must not be cited as if every dialect has identical forms. See its abstract and §§1.1–1.2, especially examples (1)–(8), and §2.1, examples (12)–(15).

### Negation source
Gündoğdu, Songül. 2015. “Negation in Kurmanji,” *Affix Ordering Across Languages and Frameworks*, pp. 154–172. DOI: https://doi.org/10.1093/acprof:oso/9780190210434.003.0007

Use for the analysis of negative-prefix ordering and its interaction with verbal morphology. The existing register notes the data's Muş scope. It is not a substitute for identifying the standard or regional variety of each lesson example.

## 3. Required provenance labels

Every Kurmanji example added or retained as a teaching example should receive one internal editorial label:

- **Q — exact quotation:** copied from the cited source with spelling, diacritics, hyphenation and gloss preserved. Record exact page/table/example number.
- **A — adapted:** source form modified for a stated teaching purpose. Record original form, every modification, reason, and variety. Do not use quotation marks or call it verbatim.
- **I — instructor-created:** not found as an exact source sentence. Record the grammar rule used to construct it and obtain written validation from a native Kurmanji specialist familiar with the named variety.
- **U — unresolved:** no example should be published as verified until the uncertainty is resolved.

Sorani translations need a separate native Sorani editorial check; Kurmanji grammar references do not validate Sorani gloss wording.

## 4. Lesson-by-lesson source-verification matrix

| Lesson | Core claim/example to verify | Source locator recorded in repository | Current evidence state | Pre-publication action |
|---:|---|---|---|---|
| 01 | `gund-ek`: noun + singular indefinite suffix | Haig 2018 §2.2.2 | Supported in existing claim register; example is a suitable candidate for Q | Check exact printed form and gloss in source; segment `gund + -ek`; label Q only if copied exactly |
| 02 | `di-bêj-im`: imperfective/present prefix + present stem + person ending | Haig 2018 §2.6.1 and verb tables; compare Baker & Atlamaz 2014 §2.1, (12) | General prefix/suffix architecture supported; exact segmentation of this specific verb remains a candidate | Verify this exact lexeme, stem boundary and orthography in Haig/Thackston; until then U, not a certified worked example |
| 03 | Direct plural, oblique plural `-a(n)`, and restricted direct indefinite `-in` | Haig 2018 §2.2.2, pp. 115–116 (repository locator) | General Standard Kurmanji pattern supported in the register; not universal across varieties | Inspect original table/page; verify noun forms and whether examples are Q or paradigm adaptation; label standard scope and regional qualification |
| 04 | `gund-ek-î` case ending contrasted with `bajar-ek-î mezin` ezafe | Haig 2018 §§2.2.2, 2.3.1 | Both constructions recorded as supported; same written `-î` has different function by construction | Verify each form in source and present side-by-side with distinct syntactic contexts; no claim that suffixes are interchangeable |
| 05 | `bajar-ek-î mezin`; head-noun ezafe agreement, adjective form | Haig 2018 §2.3.1 | Supported for Standard Kurmanji in register | Verify exact hyphenation and gloss; distinguish ezafe agreement from adjective inflection; label standard scope |
| 06 | `mal-a me`, direct/oblique pronouns, reflexive `xwe` | Haig 2018 §§2.2.3, 2.3.1, example (5) | Core examples supported; full possessive-pronoun paradigm not taught by current payload | Verify the exact paradigm and whether the proposed table is a direct extraction or a pedagogical reformatting; distinguish oblique personal forms from possessive suffixes |
| 07 | Direct/oblique pronouns; `min xwar` contrasted with present clause | Haig 2018 §2.2.3 Table 9 and §2.7.2; Baker & Atlamaz 2014 §§1.1–1.2, examples (1)–(8) | Split case/agreement pattern directly supported in the named source varieties | Preserve the source's own pronoun forms; identify direct vs oblique case, clause tense/stem, transitivity and variety; do not equate oblique with object |
| 08 | Agreement controller in present transitive, past intransitive and past transitive clauses | Haig 2018 §2.6.1/Table 13; Baker & Atlamaz 2014 §§1.1–1.2 and §2.1 | General contrast supported; present payload has no complete worked paradigm | Use source examples, not a constructed blend; show each argument and agreement suffix; identify source dialect and avoid “verb always agrees with subject” |
| 09 | `ez dibêjim`, `ez hatim`, `min xwar`; future particle + subjunctive | Haig 2018 §2.6.1/Table 14 and §2.6.4, pp. 128–129; Baker & Atlamaz 2014 fn. 7 | First three contrasts recorded as supported. Future construction independently corroborated in Baker & Atlamaz fn. 7; exact Haig quotation currently unresolved | Retrieve/inspect Haig's actual printed page before deciding whether current `ew dē mesel-ē ji te re bēž-e` is Q, A or erroneous. Do not silently normalize Latin diacritics |
| 10 | `na-`, `ne-`, `ni-`; `nizanim`, `nikarim`; yes/no and information questions | Haig 2018 §2.6.1 and §3; Gündoğdu 2015 pp. 154–172 | Verbal negation distribution supported with construction and variety qualifications; question examples unresolved; non-verbal examples need their own source | Build separate sourced paradigms for present indicative, subjunctive, simple past and past progressive. Find a dedicated interrogative source before adding any sentence. Label regional non-verbal examples exactly |
| 11 | Neutral SOV/SOVG, Goal/recipient placement, focus/fronting | Haig 2018 §2.7.1 | SOV default and information-structure caveat supported; Goal/recipient treatment underdeveloped in payload | Verify exact clause/example for `dan` and recipient placement from Haig; retain the regional qualification. Do not create a sentence from the rule and call it Q |
| 12 | Review vs scored final assessment | Not a linguistic-source question; curriculum/assessment specification | Current payload supports review/self-assessment only; no scoring blueprint or validated exam established | Owner decision: retain review label, or separately commission a scored assessment blueprint with items, answer key, accepted variants, rubric, threshold, retakes and persistence tests |

## 5. Special unresolved items — do not publish as verified yet

### 5.1 Lesson 02 segmentation
`di-bêj-im` is a plausible candidate, but the exact verb stem and segmentation must be checked in the primary grammar's verb table. Baker & Atlamaz (2014) demonstrates the general prefix + stem + agreement suffix architecture with other verbs (e.g. §2.1, examples (12)–(15)); that does not independently prove the exact segmentation of `dibêjim`.

### 5.2 Lesson 09 future quotation
The current lesson has `ew dē mesel-ē ji te re bēž-e`; the repository evidence register reports Haig's printed form as `ew dê mesel-ê ji te re bêj-ê`. The old Haig PDF URL now redirects to a landing page, so K120 has not freshly checked the original page image. The future construction itself is corroborated by Baker & Atlamaz (2014), footnote 7, as a periphrastic `(d)ê` + present subjunctive construction. That footnote does not validate the exact sentence or its current spelling. Keep the sentence U until primary-page inspection or specialist confirmation.

### 5.3 Lesson 10 questions
No verified yes/no or information-question sentence was found in the reviewed Course 2 evidence register. The general presence of interrogative words is not enough to certify a particular sentence. Keep examples on hold pending a source with exact form, gloss, variety and page/example locator, or a native specialist's explicit approval of an instructor-created sentence.

### 5.4 Lesson 11 Goal/recipient example
The current lesson's SOV example is attributed to Haig §2.7.1. The proposed SOVG refinement needs the exact recipient construction and its regional scope transcribed from the source before insertion. Do not derive a new Kurmanji sentence from a prose generalization.

## 6. Evidence from directly accessible sources in this pass

Baker & Atlamaz (2014) PDF was directly accessible and reviewed. Its abstract states that in the paper's Adıyaman data, present transitive clauses have direct subjects, oblique objects and subject agreement; past transitive clauses have oblique subjects, direct objects and object agreement. The paper also says its core data are from Adıyaman and separately discusses Muş double-oblique clauses. This confirms the need for variety-scoped teaching and supports the central pedagogical warning in Lessons 07–08. It does not establish the complete Haig paradigms for nominal plural, ezafe, negation, interrogatives or word order.

Haig & Öpengin (2018) PDF and University of Bamberg publication record were accessible. The opening chapter description separates the standard-variety grammar sketch from the discussion of regional dialect divisions. This supports the course's requirement to state a reference variety and keep regional forms labelled.

## 7. Ordered work plan

1. Obtain a stable copy or page-level scan of Haig 2018 from the publisher/library or an author-approved repository; inspect only the relevant pages/tables and record page numbers.
2. Close Lesson 09 transcription first, because the current payload contains a sentence represented as a source quotation but with a reported mismatch.
3. Verify Lesson 02 verb segmentation and Lesson 03 plural table directly against the source.
4. Verify Lessons 04–06 nominal morphology/ezafe and pronoun paradigms.
5. Build the Lessons 07–08 contrastive alignment table with explicit source variety.
6. Locate a dedicated source for Lesson 10 interrogatives; until then, no new question sentence.
7. Verify Lesson 11 recipient/Goal example and its dialect scope.
8. Keep Lesson 12 as review unless a separately specified assessment is commissioned.
9. Only after all linguistic checks, run native Kurmanji specialist review and Sorani copy-edit as separate approval stages.

## 8. Release disposition

**Course 2 remains NOT RELEASE-CERTIFIED.** The matrix is a source-navigation and editorial-control artifact, not a new linguistic certification. The key distinction is between a rule supported by a source, an exact source example, an adapted example and an instructor-created sentence. Each must be labelled honestly.

No lesson payload or application artifact was changed by K120.
