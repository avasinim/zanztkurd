# Course 1, Lesson 19 — Interrogatives, Wh-Forms, Case and Polar Questions: Evidence Audit

**Date:** 2026-11-16  
**Repository:** `avasinim/zanztkurd`  
**Branch:** `fix/kurmanji-ci-current-migration`  
**Scope:** Review of the existing Course 1 Lesson 19 seed payload against descriptive and pedagogical sources. Proposal-only; no lesson edits.

## 1. Executive findings

The lesson has a useful beginner inventory, but it needs five substantive qualifications before it can be considered a reliable account of Kurmanji interrogatives:

1. **Add the oblique form of “who”, but label its scope carefully.** `kê` is used as the oblique counterpart of `kî` in common Standard Kurmanji teaching descriptions. However, descriptive work on the Muş variety also analyses `kî/kê` as a masculine/feminine distinction. The course must not present every `kê` token as a universally invariant case form without deciding which variety it teaches.
2. **Teach `çend` and `çiqas` distinctly.** `çend` normally asks for the number/count of countable items; `çiqas` asks for amount, quantity, degree or extent. Their semantic ranges overlap in some contexts, and `çend` can also mean “some/a few”; avoid an absolute countable/uncountable rule.
3. **Explain wh-in-situ as the neutral pattern, not a ban on all fronting.** In Kurmanji, wh-phrases commonly occupy the same syntactic position as the constituent they replace. Published examples include `Tu diçî ku?`, `Kî pirtûkê dixwîne?`, `Zana çi dixwîne?`, and `Zana kîngê pirtûkê dixwîne?`.
4. **Do not teach `ma` as a neutral, obligatory yes/no marker.** Polar questions can be formed with declarative-like word order and interrogative intonation. `ma` is attested, but Thackston describes expectation/confirmation and discourse uses; `gelo` is also documented. Their pragmatic force and regional/register distribution need explanation.
5. **Separate question words from question syntax.** The lesson lists lexical items but does not show how case, prepositions, argument position and word order shape a full question. A small set of complete, case-sensitive models would improve the payload more than expanding the vocabulary list alone.

## 2. Exact payload reviewed

File: `docs/kurmanji-content-seed-part-03.sql`  
Blob SHA: `b6f89841ac49adb256a7874179a258436e095909`  
Lesson key: `kurmanji-course-1-lesson-19.html`  
Title: `پرسیار و وشە پرسیارییەکان`

The seed contains:
- Basic interrogatives: `kî`, `çi`, `li ku`, `kengî`, `çima`, `çawa`, `çiqas`, `kîjan`.
- Polar-question examples: `Tu baş î?`, `Tu kurdî dizanî?`, `Ew li malê ye?`, with an explanation of intonation and punctuation.
- Open-question examples: `Tu li ku dijî?`, `Navê te çi ye?`, `Tu kengî dixebitî?`, `Tu çima kurdî hîn dibî?`, `Tu bi çi awayî hatî?`.
- Exercises, a note on variation, and references to Haig (2018), Thackston, and the University of Arizona.

## 3. Evidence and grammatical analysis

### 3.1 `kî` and `kê`: case and variety must not be conflated

The current lesson teaches `kî` as “who” but gives no object/oblique counterpart.

A Kurmanji basic grammar resource gives the learner-facing pair `kî` (direct) and `kê` (oblique), with examples `Ev kî bû?` “Who was that?” and `Tu kê dixwazî?` “Who do you want?”. The older descriptive grammar by Bedir Khan and Lescot also records both forms, though it describes a gender contrast in its own analysis. Gündoğdu's 2011 thesis explicitly distinguishes Standard and Muş dialects and notes that the Muş variety has the additional feminine form of “who”; it also discusses wh-phrases in their base positions. This is a warning against treating every surface `kê` as the same grammatical contrast across varieties.

**Editorial proposal:** add a short note that learners will encounter `kê` in oblique/object contexts, but mark the paradigm as subject to the course's chosen reference variety. Before adding a full paradigm, confirm the course's standard with a native Kurmanji editor and compare the exact form in the intended dialect. Do not infer that `kê` is always a feminine form or always only an oblique form.

### 3.2 `çi`, `kîjan`, and `li ku`

The seed's core glosses are broadly supported:
- `çi`: what
- `kîjan`: which
- `li ku`: where / at what place
- `çima`: why
- `çawa`: how
- `kengî` (also documented as `kengê`): when

The Bogazici thesis lists `kî`, `çi`, `ku(der)`, `kîngê`, `kîjan`, `çima`, `çan(kî)`, `çend`, and `çi qas` among Kurmanji wh-forms. Its examples show the wh-word in the corresponding argument/adverbial position:
- `Tu diçî ku?` — Where are you going?
- `Kî pirtûkê dixwîne?` — Who is reading the book?
- `Zana çi dixwîne?` — What is Zana reading?
- `Zana kîngê pirtûkê dixwîne?` — When is Zana reading the book?

The current `kengî` spelling is common in contemporary teaching sources; `kengê/kîngê` variants are also documented. Choose a house form and list alternatives without implying they are interchangeable in every region.

### 3.3 `çend` versus `çiqas`

The lesson includes `çiqas` with the gloss “how much/how far” and the example `Ev çiqas e?`. It omits `çend`, a major gap because learners need to ask how many countable items there are.

Michael L. Chyet's *Kurdish-English Dictionary* entry for `çend` explicitly contrasts it with `çiqas` (“how much” for mass nouns) and gives count/amount examples. The beginner grammar *Kurmanji Basic* includes:
- `Çend hene?` — How many are there?
- `Çend pênûs hene?` — How many pens are there?
- `Tu çend pirtûkan dixwazî?` — How many books do you want?
- `Çiqasî dûr e?` — How far is it?

A descriptive dictionary and teaching materials support the practical distinction:
- `çend`: how many / what number; commonly used with countable plural referents.
- `çiqas`: how much / how much of a mass or extent; also used for degree and distance.

However, do not impose an inflexible “count nouns vs uncountable nouns” binary. Chyet documents broader senses for `çend`, including “some/a few”, and contemporary usage may overlap. `Ev çiqas e?` is context-dependent; it needs an explicit referent or context (price, amount, extent) to be pedagogically unambiguous.

### 3.4 Wh-in-situ: the question word normally remains in its argument position

Gündoğdu's 2011 Boğaziçi thesis, §1.3.2, describes Kurmanji as a wh-in-situ language: wh-words stand in their base positions rather than undergoing obligatory overt movement as in English. It supplies complete examples including `Tu diçî ku?`, `Kî pirtûkê dixwîne?`, `Zana çi dixwîne?`, and `Zana kîngê pirtûkê dixwîne?`.

This supports the seed's sentence-level approach: `Tu li ku dijî?`, `Navê te çi ye?`, `Tu kengî dixebitî?`, and `Tu çima kurdî hîn dibî?` put the question expression in a plausible semantic/syntactic slot. But a beginner lesson should state that this is the common neutral pattern, not claim that all Kurmanji varieties and all discourse contexts prohibit fronting or focus-related order changes.

The seed's fragment `Kîjan pirtûk?` is a noun phrase (“which book?”), not a complete clause. It is useful as a phrase example but should be distinguished typographically from full-sentence models.

### 3.5 Yes/no (polar) questions and intonation

Gündoğdu's 2011 thesis, in its discussion of polar questions in Standard and Muş Kurmanji, describes yes/no questions with no obligatory overt question particle; the clause can retain its declarative word order, with intonation/focus marking the interrogative reading. Its example `Te vê pirtûkê xilas kir?` is interpreted as a polar question through prosody; stress placement can distinguish a contrastive reading.

This supports the current lesson's core point that intonation and unchanged word order can form a yes/no question. The three seed examples are structurally plausible, but exact sentence naturalness and translations still require native review.

### 3.6 `ma` and `gelo`: not neutral obligatory question particles

The current seed does not teach `ma`, which is a good restraint. It should not be added as if every yes/no question requires it.

Thackston §34 describes `ma` as an interrogative particle with a particular expectation/confirmation force: it can introduce an affirmative proposition expecting a negative answer, or a negative question expecting an affirmative answer. Thackston also documents `ma` with wh-words in contradictory “but” or wondering contexts, and notes `gelo` as a wondering-question marker. Indiana University's CeLCAR structural list records both `ma` and `gelo`, but that inventory does not establish that either is mandatory or neutral in every dialect/register.

**Editorial proposal:** keep intonation-based polar questions as the unmarked beginner pattern. If `ma` or `gelo` is introduced, give it a separate pragmatic note with examples and a register/variety label. Do not make either a universal yes/no particle.

### 3.7 Review of each current example

| Seed item | Assessment | Recommendation |
|---|---|---|
| `Kî ye?` | Grammatically plausible; case/gender scope needs a chosen standard | Keep provisional; native review |
| `Tu çi dixwazî?` | Consistent with ordinary wh-in-situ syntax | Retain provisionally |
| `Tu li ku yî?` | Supported beginner model | Retain |
| `Tu kengî têyî?` | Understandable; exact form and future/present reading need reference-variety review | Verify with native editor |
| `Tu çima dereng hatî?` | Structurally plausible past question | Retain provisionally; native review |
| `Tu çawa yî?` | Supported beginner model | Retain |
| `Ev çiqas e?` | Context-dependent and ambiguous without context | Add context or pair with a clearer amount/extent example |
| `Kîjan pirtûk?` | Correct as a noun-phrase question, not a full clause | Label as phrase example |
| `Tu baş î?` | Plausible polar question using intonation | Retain provisionally |
| `Tu kurdî dizanî?` | Plausible polar question; native sentence review | Retain provisionally |
| `Ew li malê ye?` | Plausible polar question; native sentence review | Retain provisionally |
| `Tu li ku dijî?` | Wh-in-situ structure supported | Retain provisionally |
| `Navê te çi ye?` | Strongly supported beginner model | Retain |
| `Tu kengî dixebitî?` | Wh-in-situ structure plausible | Retain provisionally |
| `Tu çima kurdî hîn dibî?` | Structurally plausible; lexical construction merits native review | Retain provisionally |
| `Tu bi çi awayî hatî?` | Case/preposition pattern plausible; exact idiomaticity needs native review | Retain provisionally |

## 4. Missing learner outcomes and recommended sequence

Without changing the existing lesson, the following additions are recommended for a future approved revision:

1. **Who / whom:** introduce `kî` and, with an explicit reference-variety note, `kê`; show at least one subject and one oblique/object example.
2. **What / which:** contrast `çi` and `kîjan` in complete clauses and short noun phrases.
3. **Where / when / why / how:** retain `li ku`, `kengî`, `çima`, `çawa`; include documented spelling variants only as a note.
4. **Count / amount:** add `çend` for number and `çiqas` for amount/degree, with a clear countable example and a clear amount/distance example.
5. **Wh-in-situ:** explain that the question word normally occupies the slot of the missing constituent; use source-attested examples.
6. **Polar questions:** explain declarative-like order plus interrogative intonation; introduce `ma/gelo` only as pragmatically marked alternatives.
7. **Case-sensitive question forms:** add a brief reminder that prepositions and object roles may require oblique forms; do not teach wh-words as an isolated uninflected list.

## 5. Editorial and linguistic gates

- The course's reference variety is not yet formally fixed. This blocks a definitive universal paradigm for `kî/kê`, as well as a single unlabelled form for `kengî/kengê`.
- Have a native Kurmanji editor check the exact sentence-level examples, especially `Tu kengî têyî?`, `Tu çima kurdî hîn dibî?`, and `Tu bi çi awayî hatî?`.
- Have a Sorani copy-editor review all Sorani glosses independently.
- Keep phrase fragments (e.g. `Kîjan pirtûk?`) distinct from complete sentence examples.
- Do not overstate `çend/çiqas` as an exceptionless countable/uncountable rule.
- Do not introduce `ma` as a neutral or obligatory polar-question particle.

## 6. Sources

1. **Gündoğdu, Songül (2011).** *The Phrase Structure of Two Dialects of Kurmanji Kurdish: Standard Dialect and Muş Dialect*, M.A. thesis, Boğaziçi University. §1.3.2 “Wh-in-situ”, pp. 37–38; the thesis also discusses polar questions and prosody. https://digitalarchive.library.bogazici.edu.tr/bitstreams/c22fcd85-97d8-4c48-98ab-8cc623449fff/download
2. **Thackston, W. M. (2006).** *Kurmanji Kurdish: A Reference Grammar with Selected Readings*. §34 “Questions with Ma”, pp. 79–80; interrogative and case patterns throughout. https://kurdshop.net/content/upload/1/root/kurmanji-complete.pdf
3. **Chyet, Michael L. (2003).** *Kurdish-English Dictionary: Ferhenga Kurmancî-Inglîzî*. Entry `çend`, which distinguishes count “how many” from `çiqas` “how much” for mass nouns and records broader meanings.
4. **Kurmanji Basic.** §11.6 “Question Words”, with `çend` count examples, `çiqas` amount/distance, and `kî`/`kê` direct/oblique examples. https://internationalistcommune.com/wp-content/uploads/2024/01/kurmanji-basic.pdf
5. **CeLCAR, Indiana University.** *Proficiency Testing Project: Structural List (Kurdish/Kurmanji)*. Records `ma` and `gelo` among interrogative particles and lists basic interrogative vocabulary. https://celcar.indiana.edu/assessment/proficiency_guidelines/Kurmanji%20Grammar.pdf
6. **Bedir Khan, Celadet Alî & Roger Lescot.** *Grammaire kurde (dialecte kurmandji)*, section 247 on interrogative adjectives/pronouns. Useful historical description, but its gendered analysis should not be treated as a universal current standard.
7. **University of Arizona, Iranian Languages.** “Kurmanji Kurdish: grammar and language description.” https://iranian-languages.arizona.edu/node/7

## 7. Change boundary

Documentation-only review. No lesson text, seed SQL, migration, application code, CI, Supabase, production data, PR #3, `main`, or deployment was modified. No database was accessed.
