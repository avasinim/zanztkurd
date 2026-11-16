# Northern Kurmanji Courses 1–2 — Integrated 38-Lesson Claim Evidence Matrix and Closure Plan
**Date:** 2026-11-16
**Repository:** avasinim/zanztkurd
**Working branch:** fix/kurmanji-ci-current-migration
**Baseline:** 7f9f382faf13f53ec48dc056d45e6cd4f244556d
**Scope:** Course 1 (26 lessons) + Course 2 (12 lessons) = 38 lesson bodies
**Status:** documentation-only synthesis; proposal-only; neither course is release-certified.

## 1. Purpose and evidence boundary

This matrix integrates the five Course 1 claim-level registers, the Course 1 integrated 26-lesson matrix, the Course 2 12-lesson claim-level register, the Course 2 Lesson 10 interrogative addendum, and the existing integrated 38-lesson release action register.

It is a navigation and decision document. It does not replace lesson-specific evidence registers, does not independently re-audit every sentence, and does not authorize editing any lesson, seed, migration, application code, database or deployment.

### Source documents

Course 1:
- docs/KURMANJI-COURSE-1-INTEGRATED-26-LESSON-CLAIM-EVIDENCE-MATRIX-AND-CLOSURE-PLAN-2026-11-16.md
- docs/KURMANJI-COURSE-1-LESSONS-01-06-CLAIM-LEVEL-EVIDENCE-REGISTER-2026-11-16.md
- docs/KURMANJI-COURSE-1-LESSONS-07-12-CLAIM-LEVEL-EVIDENCE-REGISTER-2026-11-16.md
- docs/KURMANJI-COURSE-1-LESSONS-13-18-CLAIM-LEVEL-EVIDENCE-REGISTER-2026-11-16.md
- docs/KURMANJI-COURSE-1-LESSONS-19-24-CLAIM-LEVEL-EVIDENCE-REGISTER-2026-11-16.md
- docs/KURMANJI-COURSE-1-LESSONS-25-26-CLAIM-LEVEL-EVIDENCE-REGISTER-2026-11-16.md

Course 2:
- docs/KURMANJI-COURSE-2-LESSONS-01-12-CLAIM-LEVEL-EVIDENCE-REGISTER-2026-11-16.md
- docs/KURMANJI-COURSE-2-LESSON-10-INTERROGATIVE-EVIDENCE-ADDENDUM-2026-11-16.md

Cross-course baseline:
- docs/KURMANJI-COURSES-1-2-INTEGRATED-38-LESSON-RELEASE-ACTION-REGISTER-2026-11-16.md
- docs/KURMANJI-SEED-MIGRATION-DIFF-REVIEW-2026-11-16.md

### Evidence statuses
- SUPPORTED: the core linguistic proposition has appropriate source support for a stated construction and variety.
- PARTIAL: the principle is supported but exact examples, transcription, dialect scope, glosses or pedagogy still need checking.
- OPEN: a material claim/example or design decision is unresolved.
- EDITORIAL: Sorani explanation, translation, terminology, style or assessment design requires qualified human editorial review.

A supported grammar rule does not authenticate every sentence in a lesson. Each exact example must ultimately be labelled source-attested, adapted, or instructor-created. No example may be described as a quotation until its text and provenance have been checked.

## 2. Executive disposition

**All 38 lessons now have claim-level evidence registers or integrated claim matrices. Neither course is release-certified.**

Course 1 has an integrated 26-lesson evidence matrix. Course 2 has an independent 12-lesson claim-level register, plus a dedicated Lesson 10 interrogative addendum that narrows a previously open question-formation gap. This is stronger than a first-pass topic review, but it is not a final expert attestation of every existing lesson sentence.

No numerical percentage verified is assigned. The registers use different claim granularities, and a percentage would imply false precision.

## 3. Integrated 38-lesson matrix

### Course 1 — 26 lessons

| Lesson | Topic | Evidence status | Main closure before release |
|---:|---|---|---|
| 01 | Kurmanji, language, script, orthography, dialect | PARTIAL | Pinpoint source support for definitions/examples; distinguish Hawar from other Kurdish writing contexts |
| 02 | Hawar alphabet, letter classes, digital order | SUPPORTED / PARTIAL | Approve exact 31-letter sequence; verify Unicode sorting/normalization separately |
| 03 | Eight vowel letters, IPA and examples | SUPPORTED / PARTIAL | Separate graphemes from phonemes; verify dialectal realization and glosses |
| 04 | Consonants, IPA, R/RR | PARTIAL | Separate rhotic phonetics from alphabet inventory and spelling convention |
| 05 | Five marked Hawar letters | SUPPORTED / PARTIAL | Preserve diacritics; verify word examples and Sorani glosses |
| 06 | Reading and writing simple words | PARTIAL | Audit each sample and lexical gloss; do not treat trill/tap as an extra letter |
| 07 | Common words and phrases | PARTIAL | Verify register, regional variants, spelling house style and translations |
| 08 | Writing versus pronunciation | PARTIAL | Distinguish aspiration from pharyngealization; label dialect scope |
| 09 | Personal and place names | PARTIAL | Verify inflected place-name forms and locality-sensitive usage |
| 10 | Beginner expressions | SUPPORTED / PARTIAL | Verify time-of-day distinctions, addressee number, pragmatics and spelling |
| 11 | Personal pronouns | SUPPORTED / PARTIAL | Keep Direct/Oblique distinct from subject/object; explain copula and reflexive forms |
| 12 | Demonstratives | SUPPORTED / PARTIAL | Label introductory paradigm and regional noun-phrase variation |
| 13 | Cardinal numbers | PARTIAL | Check object marking and duration morphology in inflected examples |
| 14 | Colours and everyday objects | PARTIAL | Check lexical inventory, locative marking and sentence morphology |
| 15 | Family vocabulary | PARTIAL | Resolve lexical senses and variety; defer normalization until house style is approved |
| 16 | Weekdays and time | SUPPORTED / PARTIAL | Verify temporal use and each sample clause |
| 17 | Present tense | SUPPORTED / PARTIAL | Audit inflected forms; distinguish regular, irregular and compound verbs |
| 18 | Negation | SUPPORTED / PARTIAL | Review karîn → nikarim; separate verbal, imperative, copular and existential negation |
| 19 | Questions | SUPPORTED / PARTIAL | Check kî/kê, çend/çiqas and exact examples |
| 20 | Word order | SUPPORTED / PARTIAL | SOV is a neutral tendency, not an absolute rule; verify Goal/recipient example |
| 21 | Adjectives and ezafe | SUPPORTED / PARTIAL | Check examples; distinguish ezafe agreement from case marking |
| 22 | Comparative and superlative | SUPPORTED / PARTIAL | Check variants, word order and exact gloss distinctions |
| 23 | Nouns and determiners | SUPPORTED / PARTIAL | Qualify claims by variety; verify restricted exceptions and paradigms |
| 24 | Possession | SUPPORTED / PARTIAL | Distinguish linking ezafe, free/demonstrative ezafe and case |
| 25 | Direct/Oblique case | SUPPORTED / PARTIAL | Preserve dialect caveats; verify exact forms and agreement |
| 26 | Recap and self-assessment | PARTIAL | Treat as formative review; verify recap examples and R/RR explanation |

### Course 2 — 12 lessons

| Lesson | Topic | Evidence status | Main closure before release |
|---:|---|---|---|
| 01 | Morphology and word structure | SUPPORTED / PARTIAL | Add checked segmentation demonstrating root, stem, morpheme and affix |
| 02 | Root, stem, prefix and suffix | SUPPORTED / PARTIAL | Add a verified prefix example; do not rely only on suffix -ek |
| 03 | Noun, gender and number | SUPPORTED / PARTIAL | Teach the Standard Kurmanji direct/oblique plural paradigm and restricted -in |
| 04 | Definite/indefinite nouns and -ek | SUPPORTED / PARTIAL | Distinguish case suffixes from ezafe; explain context-dependent definiteness |
| 05 | Ezafe and noun–adjective relation | SUPPORTED / PARTIAL | Show head-controlled gender/number agreement; avoid claiming adjective agreement in bajar-ek-î mezin |
| 06 | Possession and possessive pronouns | PARTIAL / OPEN | Either provide a verified possessive paradigm or narrow the lesson title/objective |
| 07 | Personal pronouns and Direct/Oblique case | SUPPORTED / PARTIAL | Do not equate Direct with subject or Oblique with object; label split alignment and dialect variation |
| 08 | Verb, stem, person and number | SUPPORTED / PARTIAL | Add contrastive, fully segmented paradigms; agreement target depends on TAM/transitivity |
| 09 | Present, past and future | SUPPORTED / PARTIAL | Verify exact future transcription against source; separate future particle from subjunctive form |
| 10 | Negation and questions | SUPPORTED / PARTIAL / OPEN | Teach na-/ne-/ni- with TAM scope; question formation supported in addendum; non-verbal negation still open |
| 11 | Word order and clause structure | SUPPORTED / PARTIAL | Teach SOV as default; include information structure and Goal/recipient variation |
| 12 | Review and final test | EDITORIAL / OPEN | Decide whether review or scored test; do not imply psychometric validation or certification |

## 4. Cross-course consistency requirements

### 4.1 Hawar orthography, grapheme and phonetics — C1 L01–08, L26

Keep four distinct levels:
1. Letter/grapheme: a unit of the adopted Hawar writing system.
2. Phoneme: a contrastive sound category in linguistic analysis.
3. Phonetic realization: a pronunciation, which may vary by context and dialect.
4. Orthographic convention: how the writing system represents a sound or contrast.

Haig (2018) reports word-initial r as trilled, with other tap/trill distribution not predictable in all environments, and documents cross-dialect phonetic variation. This supports a phonetic distinction; it does not establish rr as an additional Hawar alphabet letter or require changing roj. Do not add a 32nd letter or invent a form such as rroj.

### 4.2 Nominal gender, number, case, indefiniteness and ezafe — C1 L21–25; C2 L03–07

These concepts form a dependency system and must not be taught as unrelated suffix lists.

For the Standard Kurmanji description in Haig (2018):
- Nouns have masculine/feminine grammatical gender.
- Singular Oblique marking is gender-sensitive.
- Gender distinctions are neutralized in the plural.
- Direct plural is generally unmarked; Oblique plural commonly has -a(n).
- Direct indefinite plural -in is restricted/variable and must not be presented as universal.
- The indefinite singular suffix -ek combines with case and ezafe morphology in construction-dependent ways.
- Ezafe agrees with its head noun in gender and number in the Standard paradigm.
- Linking ezafe and free/demonstrative ezafe are related but functionally distinct.

Haig & Öpengin (2018) document significant regional divergence in western Kurmanji, including phonology, pronouns, ezafe and nominal morphology. Do not silently impose the Standard paradigm on every regional variety.

### 4.3 Direct/Oblique case and split alignment — C1 L11–12, L19–25; C2 L04, L06–09

Use the terms Direct and Oblique consistently. They are case labels, not synonyms for subject and object. In the canonical Standard Kurmanji past transitive pattern, the agent is Oblique and the direct object is Direct; agreement behavior follows the relevant alignment. Baker & Atlamaz (2014) additionally document dialectal variation, including double-oblique patterns in Muş/Serhed data.

Every teaching example must identify tense/aspect, transitivity, case and agreement. Avoid a role-only rule such as “Oblique always means object.”

### 4.4 Verb stems, TAM, agreement and negation — C1 L17–18; C2 L08–10

Gündoğdu (2015) describes Kurmanji verb stems with distinct present and past shapes and a templatic affix system. Negation includes n(a)-, n(e)- and ni-; affix co-occurrence is restricted by position and blocking effects. This means:
- na-, ne- and ni- must not be collapsed into one universal prefix.
- The interaction with di- and bi- depends on the construction and stem.
- Past transitive agreement cannot be taught as an unconditional subject-agreement rule.
- Non-verbal, existential and imperative negation need their own examples and variety labels.

### 4.5 Questions and word order — C1 L19–20; C2 L10–11

The Course 2 Lesson 10 addendum supplies direct evidence from Gündoğdu (2011) for wh-in-situ in the studied Standard/Muş varieties and intonation-based yes/no questions without an obligatory particle. It also cautions that ma is not an obligatory universal neutral question marker and that gelo needs register/variety clarification.

SOV is a neutral/default tendency, not an exceptionless rule. Information structure, focus and Goal/recipient placement must be treated with care.

### 4.6 Assessment language — C1 L26; C2 L12

A recap, checklist or open-ended reflection is not automatically a scored proficiency examination. If a formal assessment is intended, it needs an explicit blueprint, item count, answer key, scoring rules, pass threshold, feedback, retake policy and validation. Until then, describe these pages as review or formative self-assessment.

## 5. Integrated priority closure queue

### P0 — owner/editor decisions before any content edits
1. Select the intended spoken/reference variety for the two courses and define what “standard teaching form” means.
2. Approve the Sorani editorial house style and technical terminology.
3. Decide how regional forms appear: main form with variant note, dialect-labelled parallel forms, or separate advanced material.
4. Decide whether academic citations appear in student-facing lessons, teacher notes or editorial documentation.
5. Select the canonical content source when historical migration and split-seed lesson payloads differ.
6. Confirm whether Course 1 L26 and Course 2 L12 are reviews, formative self-assessments or scored final assessments.

### P0 — Kurmanji specialist validation
1. Verify every exact inflected example in the two courses, not just the general rule.
2. Verify pronoun, demonstrative, nominal gender/case, plural, ezafe and possessive paradigms.
3. Verify present, past intransitive, past transitive, subjunctive, future and negative forms.
4. Verify all interrogatives, question contours and non-verbal negation examples.
5. Review R/RR, IPA and pronunciation claims without conflating them with alphabet inventory.
6. Label every example as source-attested, adapted or instructor-created and record its variety/provenance.

### P1 — pedagogy and completeness
- C1 L01–08 and L26: consistent grapheme/phoneme/pronunciation framework.
- C1 L11–12 and C2 L07: one consistent pronoun/case explanation and worked paradigm.
- C1 L17–20 and C2 L08–11: coherent verb, negation, interrogative and word-order progression.
- C1 L21–25 and C2 L03–06: progressive teaching of gender, number, case, -ek, ezafe and possession.
- C2 L01–02: worked morphology segmentation and a verified prefix example.
- C2 L06: resolve possessive-pronoun title/content mismatch.
- C2 L09: verify future quotation/transcription against source.
- C2 L10: source-check exact question examples and complete non-verbal negation coverage.
- C2 L12: specify assessment status honestly.

### P1 — native Sorani editorial pass
All 38 lessons need a dedicated Sorani review for spelling, punctuation, clarity, translation, terminology and consistency. Kurmanji grammar sources do not certify Sorani copy quality. Existing flags include variants such as پەیویست/پێویست, نوسین/نووسین, and ڕون/ڕوون; no global substitutions should be applied until the owner approves the house style.

### P2 — technical orthography and software behavior
Unicode normalization, collation, sorting and diacritic storage need technical specifications and tests, not only linguistic grammar references.

### P2 — independent technical release gates
Academic review does not certify:
- the exact 26 + 12 lesson key/order inventory;
- split seed/migration parity;
- PostgreSQL syntax or migration behavior;
- authentication, enrollment, RLS and lesson unlock;
- quiz scoring, progress persistence and access control;
- browser regression tests in a disposable environment.

The previously recorded 12 non-identical payloads remain a separate integrity blocker: Course 1 lessons 01–06, 10, 25; Course 2 lessons 04, 06, 09, 10. Preserve the historical migration and split seed with their separate provenance until the owner approves a canonical source and a row-level reconciliation plan. Do not rewrite historical migration just to make parity pass.

## 6. Research source map

1. Haig, Geoffrey (2018), “Northern Kurdish (Kurmanjî),” in The Languages and Linguistics of Western Asia: An Areal Perspective, pp. 106–158. DOI: https://doi.org/10.1515/9783110421682-004. Full chapter: https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf
   Main support: phonology, nominal morphology, gender, case, plural, ezafe, verb morphology, TAM, negation, future, clause structure and word order.
2. Haig, Geoffrey & Ergin Öpengin (2018), “Kurmanji Kurdish in Turkey: Structure, varieties, and status.” https://www.uni-bamberg.de/fileadmin/aspra/06_Team/Publications_and_CV/HaigOepengin2018_Kurmanji_Kurdish_.pdf
   Main support: regional variation across phonology, pronouns, ezafe and nominal morphology.
3. Gündoğdu, Songül (2015), “Negation in Kurmanji,” in Affix Ordering Across Languages and Frameworks, pp. 154–172. DOI: https://doi.org/10.1093/acprof:oso/9780190210434.003.0007
   Main support: present/past stem distinctions, negation markers n(a)-, n(e)-, ni-, TAM affix ordering and blocking.
4. Gündoğdu, Songül (2011), “The Phrase Structure of Two Dialects of Kurmanji Kurdish: Standard Dialect and Muş Dialect.” MA thesis, Boğaziçi University. Institutional PDF: https://digitalarchive.library.bogazici.edu.tr/bitstreams/c22fcd85-97d8-4c48-98ab-8cc623449fff/download
   Main support: wh-in-situ and yes/no question intonation in the studied varieties.
5. Baker, Mark & Ümit Atlamaz (2014), “On the Relationship of Case to Agreement in Split-Ergative Kurmanji and Beyond.” https://sites.rutgers.edu/mark-baker/wp-content/uploads/sites/199/2019/07/kurmanji-split-erg-distributed-July-2014.pdf
   Main support: case/agreement and split alignment, including regional patterns.
6. Haig & Öpengin (2015), “Gender in Kurdish: structural and semantic dimensions.” Transactions of the Philological Society 113(3), 356–375. DOI: https://doi.org/10.1075/impact.36.10hai
   Supporting source for gender and its structural/semantic dimensions.
7. Gündoğdu & Erbasi (2023), “Ezafe as a linking feature within DP.” DOI: https://doi.org/10.1075/cilt.361.06gun
   Supporting research on ezafe as a linking feature; use with the more comprehensive Kurmanji grammar and dialect scope.
8. University of Arizona, Iranian Languages, “Kurmanji Kurdish.” https://iranian-languages.arizona.edu/node/7
   Useful overview for pronouns, case, gender and syntax; any internally inconsistent table row must be independently checked before use.

The references have different scopes and evidential strength. None independently certifies all learner-facing examples or Sorani translations.

## 7. Change-control, backup and final disposition

This integration is documentation-only:
- No lesson text, Latin Kurmanji form or Sorani translation was edited.
- No seed file or historical migration was edited.
- No application code, schema, database or production SQL was changed.
- No CI or deployment action was taken.
- main and PR #3 were not changed.
- Pre-work backup: backup/integrated-38-claim-matrix-before-2026-11-16, exact baseline 7f9f382faf13f53ec48dc056d45e6cd4f244556d.
- A post-work backup must point to the exact final commit of this document and be verified against the working branch.
- This synthesis is not permission to merge, alter production or deploy.

**Final disposition: 38/38 lessons have claim-level or integrated evidence coverage; 0/2 courses are release-certified.** The next safe stage is to turn the closure queue into a proposal-only, exact-snippet correction dossier after the owner/editor decides the reference variety and Sorani house style. No corrections should be applied until explicitly approved.
