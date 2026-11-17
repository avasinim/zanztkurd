# Pathway B0–B5 — Master terminology register and decision protocol

**Date:** 2026-11-17  
**Repository:** `avasinim/zanztkurd`  
**Working branch:** `fix/kurmanji-ci-current-migration`  
**Baseline / pre-work backup:** `f5d3008c5ef99db2ff4eadd02950b7acea0c3bd3`  
**Pre-work backup ref:** `backup/b0-terminology-master-register-before-2026-11-17`  
**Status:** internal editorial control document; proposal-only; no owner-approved terminology policy; no learner-facing text changed.

## 1. Purpose and decision boundary

This register provides one controlled place to record terminology used or proposed across the Kurmanji-medium Pathway B (B0–B5). It is designed to prevent:
- one concept being named by several untracked terms;
- one term being used for two different linguistic concepts;
- a specialist term being introduced before learners can understand it;
- a proposal from one orthographic guide being represented as a universal Kurmanji rule;
- the terminology of the Sorani-mediated pathway being copied mechanically into the Kurmanji-medium pathway.

This document does **not** approve any term for learner-facing publication. It does not change the existing 26 + 12 lesson inventory, source lesson text, seed, code, database, migrations, CI, PRs or deployment.

## 2. Evidence principles

1. Distinguish attested usage, an author's proposal, the project's provisional working choice and an owner-approved house form.
2. A terminology recommendation in one guide is not proof of universal consensus.
3. Record the source, author, date, intended variety/register and exact concept for every disputed form.
4. Do not decide by etymology alone. Consider intelligibility, actual written usage, consistency, regional reach and teaching usefulness.
5. Do not create a calque merely to make a term look more “pure”. If a technical term is unsettled, explain the concept in clear Kurmanji and record the terminology question for later.
6. Keep the written standard and spoken regional variants separate. Do not silently convert a regional spoken form into a spelling rule.
7. B0 explanations should be example-led and non-technical. The master register may contain specialist labels that are not taught until B4/B5.
8. English labels in this document are editorial metadata only; they must not leak into Pathway B learner payloads.

## 3. Terminology status codes

| Code | Meaning | Permitted use |
|---|---|---|
| A — Attested | Form occurs in an identifiable source or established corpus | Cite with source and context; not automatically the project's preferred form |
| P — Proposal | A named author/editor recommends the form | Attribute the proposal; do not present as consensus |
| W — Working | Temporary project choice used for consistency in drafts | Internal use only until owner/editor approval |
| H — House-approved | Owner and qualified language editor have explicitly approved the form | May be used consistently in new learner-facing content |
| D — Deferred | Decision is not needed at the current stage or evidence is insufficient | Avoid introducing it; retain in decision queue |
| X — Rejected | Owner/editor has explicitly rejected the form for this project | Do not use in new content; preserve historical provenance |

No item in this register is marked H or X. The current `tîp` working choice is W, not H.

## 4. Core master register

The register is organized by concept rather than alphabetically. Candidate forms are recorded as research leads, not as an approved synonym list.

### 4.1 Writing system and sound

| Concept | Candidate / current form | Status | Scope and decision note |
|---|---|---|---|
| Letter / grapheme | `tîp`; alternative proposal `herf` | W / P | Keep `tîp` provisionally in B0 drafts; Aydogan's proposal for `herf` must remain attributed to that guide |
| Alphabet | `alfabe` | A/W | Verify preferred spelling and register with the Kurmanji editor; use consistently |
| Uppercase / lowercase | `tîpa mezin / tîpa biçûk` | W | Prefer concrete paired examples at B0; check idiomatic phrasing |
| Vowel | `dengdêr` | A/W | Appears in collective orthography guide; Aydogan also proposes it as part of a paired system |
| Consonant | `nedengdêr` | A/W | Candidate paired term; avoid the ambiguous use of `dengdêr` for consonant |
| Sound (general) | `deng` | A/W | Broad everyday term; do not automatically equate with a phoneme |
| Speech sound | Explanatory phrase based on `deng` | D | Exact phrase needs editor review; no new technical compound should be coined casually |
| Phoneme | `fonem` | A/D | Specialist term; internal notes/B5 only unless a reviewed earlier introduction is justified |
| Phonetics | `fonetîk` | A/D | Specialist discipline label; teacher/editor notes, not B0 |
| Phonology | `fonolojî` | A/D | Specialist discipline label; teacher/editor notes, not B0 |
| Grapheme | `grafem` or plain explanation | D | Do not introduce as a synonym for phoneme; decide only if B5 requires the term |
| Diacritic / letter mark | `nîşan` and a more precise compound | D | `nîşan` alone is too broad; select a precise phrase after editor review |
| Orthography / spelling | `rastnivîsîn` | A/W | Retain provisionally; do not confuse spelling conventions with pronunciation |
| Syllable | Candidate requires source/editor confirmation | D | Keep distinct from a letter or grapheme; no syllabification task should be labelled letter segmentation |
| Stress / accent | Candidate requires source/editor confirmation | D | B4/B5 only; distinguish word stress from diacritic and punctuation |
| IPA | `IPA` | A/D | Internal specialist notation; never a B0 requirement |

### 4.2 Lexical categories and word structure

| Concept | Candidate / current form | Status | Scope and decision note |
|---|---|---|---|
| Word | `peyv` | W | Retain as working form; define independently of written letters |
| Noun | `nav` | A/W | Appears in current course vocabulary; verify inflection and idiomatic examples |
| Verb | `lêker` | A/W | Retain as working form; use examples before technical definition |
| Pronoun | `cînav` | A/W | Verify subtypes and spelling; distinguish pronoun from determiner where relevant |
| Adjective | `rengdêr` | A/W | Verify examples; distinguish adjective from adverbial use |
| Adverb | `hoker` or alternative | D | Do not lock without source comparison; formal analyses differ on category boundaries |
| Numeral / number word | `hejmar` | W | Distinguish number as a value from the word expressing it |
| Determiner | Candidate requires editor confirmation | D | Avoid collapsing determiners, demonstratives and pronouns into one category |
| Demonstrative | `nîşander` or descriptive phrase | D | Existing course content uses demonstratives; precise Kurmanji term needs a named source |
| Preposition | Candidate requires editor confirmation | D | Kurmanji has prepositions and postpositions; do not assume a single generic “preposition” label |
| Postposition | Candidate requires editor confirmation | D | Keep distinct from preposition in specialist notes |
| Conjunction | Candidate requires editor confirmation | D | B3+; record examples and syntactic function |
| Particle | `parçik` / source-specific form | D | Broad category; define by function rather than an assumed one-to-one translation |
| Morpheme | `morfem` | A/D | B5 specialist label; distinguish from syllable and word |
| Root / stem | Candidate requires source confirmation | D | Distinguish lexical root, present stem and past stem in verb morphology |
| Prefix / suffix | Candidate requires source/editor confirmation | D | Use only where morphological analysis requires it; distinguish derivation from inflection |
| Derivation / inflection | Specialist labels require review | D | B5; keep word formation separate from grammatical endings |

### 4.3 Noun phrase, reference and case

| Concept | Candidate / current form | Status | Scope and decision note |
|---|---|---|---|
| Gender (grammatical) | `zayend` | W | Always label as grammatical gender; do not imply natural sex |
| Number (singular/plural) | `hejmar`, `yekjimar / pirjimar` | D | Verify exact paired forms; distinguish grammatical number from numeral |
| Definiteness | Candidate requires editor confirmation | D | B2; do not equate definiteness with a separate article system without evidence |
| Indefiniteness | Candidate requires editor confirmation | D | B2; examples must be checked against actual Kurmanji morphology |
| Ezafe | `îzafe` / `îzafeyê` | W | Retain as a technical label provisionally; use the same spelling and explain its function in Kurmanji |
| Possession | Candidate requires editor confirmation | D | Distinguish possessive forms, possessor marking and ezafe construction |
| Direct case | `rewşa rasterast` | W | Existing project wording; verify with specialist source and ensure the term maps to the intended grammatical category |
| Oblique case | `rewşa nerasterast` | W | Existing project wording; do not assume all syntactic uses reduce to a simple “indirect object” |
| Vocative | Candidate requires editor confirmation | D | B5 or relevant reading; avoid inventing a calque |
| Agreement | Candidate requires editor confirmation | D | B2+; specify what agrees with what (gender, number, person) |
| Demonstrative reference | Candidate requires editor confirmation | D | Keep demonstrative pronouns/adjectives and deictic function distinct |

### 4.4 Verb, clause and discourse

| Concept | Candidate / current form | Status | Scope and decision note |
|---|---|---|---|
| Tense | `dem` | W | Verify exact grammatical use; distinguish tense from time reference |
| Aspect | Candidate requires editor confirmation | D | B3/B5; do not translate every aspectual contrast as tense |
| Mood | Candidate requires editor confirmation | D | B3/B5; distinguish mood from modality |
| Person | `kes` / technical phrase | D | Need a precise grammatical label distinct from a human person |
| Transitive verb | `lêkera gerguhêz` | W | Existing course wording; specialist review required |
| Intransitive verb | `lêkera negerguhêz` | W | Existing course wording; specialist review required |
| Present tense | `dema niha` | W | Use only for the construction actually taught; check dialect/standard examples |
| Past tense | `dema borî` | W | Do not imply a single past construction covers all aspect/alignment patterns |
| Future | `dema pêşerojê` | W | Distinguish future reference from intention/modal meaning |
| Imperative | Candidate requires editor confirmation | D | B0 classroom commands are not a full imperative morphology lesson |
| Negation | Candidate requires editor confirmation | D | B2+; distinguish negative particle and negative clause |
| Question / interrogative | `pirs` / `pirsiyarî` | W | Everyday question vs grammatical interrogative category must be distinguished |
| Word order | `rêza peyvan` | W | Keep as plain descriptive phrase; do not imply that all clauses have rigid order |
| Clause / sentence | `hevok`; alternative proposal `komek` | W / P | Keep current `hevok` provisionally; Aydogan's proposal for `komek` is not universal consensus |
| Subject | Candidate requires editor confirmation | D | B2/B5; define syntactic function, not merely “the person doing the action” |
| Object | Candidate requires editor confirmation | D | Distinguish direct/indirect object and case marking |
| Predicate | Candidate requires editor confirmation | D | B5; avoid using “verb” and “predicate” interchangeably |
| Alignment / ergativity | Specialist terms require review | D | B5 only; essential to avoid misleading explanations of past transitive constructions |
| Agreement in past transitive clauses | Specialist phrasing requires review | D | B3/B5; explain with source-checked paradigms, not oversimplified subject/object slogans |
| Clause linking / subordination | Candidate requires editor confirmation | D | B3+; distinguish conjunction, complementizer and relative marker |

### 4.5 Text, register and learning

| Concept | Candidate / current form | Status | Scope and decision note |
|---|---|---|---|
| Sentence / utterance | `hevok` plus descriptive distinction | W/D | Do not assume sentence, clause and utterance are interchangeable |
| Paragraph | Candidate requires editor confirmation | D | B3+; learner-facing term needs review |
| Text | Candidate requires editor confirmation | D | Distinguish text from writing as an activity |
| Register | `tomar` / technical alternative | D | Must be checked; do not use a broad everyday word as a specialist term without context |
| Formal / informal style | Candidate requires editor confirmation | D | B3+; label social context without ranking varieties |
| Cohesion / coherence | Specialist candidates require review | D | B4/B5; define separately if both are taught |
| Summary | Candidate requires editor confirmation | D | B4; use plain instruction first |
| Editing / revision | Candidate requires editor confirmation | D | B4/B5; distinguish proofreading from substantive revision |
| Self-assessment | Candidate requires editor confirmation | D | Low-stakes reflection only; never imply CEFR certification |

## 5. Cross-level teaching policy

| Level | Terminology load | Teaching rule |
|---|---|---|
| B0 | Everyday Kurmanji labels; very small number of concrete language terms | Show, point, match, read, type and compare. Avoid abstract grammar definitions |
| B1 | Familiar word classes only when needed | Use short examples and stable labels; no dense metalanguage |
| B2 | Core noun phrase, pronoun, ezafe, tense, negation, question and case labels | Explain a pattern with examples before naming it |
| B3 | Verb morphology, transitivity, clause linking, modality and discourse | Introduce one technical distinction at a time; show paradigms and meaningful contexts |
| B4 | Text structure, register, orthographic editing and stylistic choice | Distinguish descriptive facts from editorial conventions |
| B5 | Phoneme, morpheme, case/alignment, syntax and variation | Use precise definitions, source citations and explicit theoretical framework |

The B0–B5 labels are internal course-design bands, not CEFR equivalences or certificates.

## 6. Rules for a learner-facing glossary entry

Every approved entry must include:

1. **Headword:** one approved spelling and capitalization pattern.
2. **Concept ID:** stable internal identifier, e.g. `ORTH.LETTER`, `PHON.SPEECH_SOUND`, `MORPH.EZAFE`.
3. **Plain Kurmanji explanation:** not an English or Sorani definition translated word-for-word.
4. **One reviewed example:** spelling, morphology, meaning and variety all checked.
5. **Contrast:** only if the learner might confuse it with a nearby concept.
6. **Level gate:** earliest level at which the label is explicitly taught.
7. **Source/provenance:** source, page/section or corpus evidence.
8. **Reviewer:** named proficient Kurmanji editor; linguist where the concept is technical.
9. **Decision state:** A/P/W/H/D/X.
10. **Revision history:** date, reason and approving reviewer.

Do not put an unreviewed glossary entry into a released lesson simply because it appears in an internal draft.

## 7. Required decision log

| ID | Decision | Recommendation | Status |
|---|---|---|---|
| MTR-01 | `tîp` vs `herf` | Keep `tîp` as current working form; attribute `herf` to Aydogan's proposal | Owner/editor approval pending |
| MTR-02 | Vowel/consonant pair | Use `dengdêr / nedengdêr` as a coherent candidate pair | Owner/editor approval pending |
| MTR-03 | `hevok` vs `komek` | Keep `hevok` provisionally; document `komek` as Aydogan's proposal | Owner/editor approval pending |
| MTR-04 | Word vs written letters | Define `peyv` independently of its written realization | P0; specialist/editor review required |
| MTR-05 | Letter vs sound vs phoneme | Maintain three distinct concepts; B0 teaches letter recognition first | Editorial principle; owner sign-off pending |
| MTR-06 | Direct/oblique terminology | Preserve existing project pair only as working wording until source validation | Specialist review pending |
| MTR-07 | Transitivity terminology | Preserve existing pair as working wording; verify with Kurmanji grammar sources | Specialist review pending |
| MTR-08 | Technical terms in B0 | Keep phoneme, phonetics, phonology, morpheme and alignment out of B0 learner text | Recommended; owner sign-off pending |
| MTR-09 | Regional vocabulary | Label regional alternatives with location/source; do not flatten them into one undifferentiated list | Editorial principle; owner sign-off pending |
| MTR-10 | CEFR labels | Treat B0–B5 as internal design bands only | Existing design constraint |

## 8. Source register

### 8.1 Orthographic and terminological guides

**Komxebata Kurmancîyê (2019), *Rêbera Rastnivîsînê*, Mezopotamya Vakfı.**  
Publisher catalogue: https://www.wmezopotamyaye.org/ku/d/wesan/1-rebera-rastnivisine.html  
Accessible alphabet/terminology chapter: https://nlpkurdi.com/rebera-rastnivisine/chapter_1_1.html  
Use for the guide's own alphabet inventory and terminology choices. Do not treat its choices as proof that all competing forms are invalid.

**Mistefa Aydogan (2012), *Rêbera Rastnivîsînê*, as reviewed by Ergin Öpengin (2017), Kurdish Studies Archive 5, pp. 103–122.**  
Review: https://kurdishstudies.net/menu-script/index.php/KS/article/download/137/127/128  
DOI-hosted collection: https://brill.com/display/book/9789004506152/9789004506152_webready_content_text.pdf  
Use for the attributed proposals `herf`, `dengdêr/nedengdêr` and `komek`. Öpengin's review also cautions that standardization proposals can reflect a particular user base and contact-language environment; do not universalize them without review.

### 8.2 Descriptive grammar and morphology

**Thackston, W. M. (2006), *Kurmanji Kurdish: A Reference Grammar with Selected Readings*.**  
Accessible copy: https://kurdshop.net/content/upload/1/root/kurmanji-complete.pdf  
Use as one descriptive reference for nominal case, ezafe, verbal morphology and clause patterns. It is not the sole authority for every regional variety.

**Walther, Géraldine; Sagot, Benoît; Fort, Karën (2010), “Fast Development of Basic NLP Tools: Towards a Lexicon and a POS Tagger for Kurmanji Kurdish.”**  
https://hal.science/hal-00510999/document  
Use for formal lexical category distinctions and the methodological point that category inventories require explicit decisions. NLP tagsets are not automatically pedagogical glossaries.

**“Ji Aliyê Binyatî ve Lêker û Lêkerên Veqetînbar di Zaravayê Kurmancî de” (2018), Journal of Mesopotamian Studies.**  
https://dergipark.org.tr/en/pub/jms/article/427751  
Use as evidence that Kurmanji grammatical descriptions and classifications may differ; do not treat a single classification as universally settled.

**“Prensîpên Amadekirina Ferhengeka Ortografîk ji bo Kurdîya Kurmancî” (2023), Nûbihar Akademî.**  
https://dergipark.org.tr/en/pub/nubihar/article/1376298  
Use for principles of orthographic dictionary compilation and handling lexical variants: frequency, distribution, borrowing and Kurdish-adapted forms. This supports transparent editorial decision-making, not automatic selection of one variant.

## 9. Open questions requiring owner/editor decisions

1. Does the project adopt `tîp` as its official term for letter, while recording `herf` as an alternative?
2. Does the project adopt `dengdêr / nedengdêr` as its official vowel/consonant pair?
3. Does the project retain `hevok` or adopt another term for sentence? If `komek` is considered, what is its evidence of current usage and learner comprehension?
4. Which Kurmanji reference grammar and which target written variety govern the terms for case, ezafe, tense, transitivity and agreement?
5. Which terms are appropriate for Behdinî/Northern Iraq users, and which require a regional label?
6. Which technical labels should be deferred to B5 and explained descriptively before then?

No default answer should be inferred from silence.

## 10. Release gate

A terminology item can move to H only after:
- a proficient Kurmanji editor confirms idiomatic spelling and morphology;
- a linguist confirms conceptual precision where needed;
- the project owner selects the house form;
- source and regional scope are recorded;
- the learner-facing definition and examples are reviewed at the intended level;
- the decision is applied consistently in new content and recorded in a revision log.

**Final status:** This is a master register and decision protocol, not a final terminology policy. No existing lesson content has been altered.
