# Dual Kurmanji Curriculum — Academic Design Framework

**Date:** 2026-11-16  
**Repository:** avasinim/zanztkurd  
**Working branch:** fix/kurmanji-ci-current-migration  
**Status:** Curriculum architecture proposal; owner review required before lesson rewrites or product changes.

## 1. Purpose and governing decision

Develop two parallel, academically grounded Kurmanji learning pathways. They share a verified linguistic core and assessment standards, but they are not translations of one another.

### Pathway A — Sorani-mediated Kurmanji
- Instruction language: Sorani Kurdish.
- Target language: Northern Kurdish / Kurmanji.
- Script: Hawar-based Latin orthography for target-language forms.
- Learner profile: Sorani readers who want to acquire Kurmanji.
- Method: contrastive and explicit instruction. Explain Kurmanji in Sorani, identify genuine similarities/differences, then require learners to understand and produce Kurmanji.
- Safeguard: never treat Sorani morphology, spelling, vocabulary or syntax as a default template for Kurmanji. Similar-looking forms must be checked, not assumed equivalent.

### Pathway B — Kurmanji-medium Latin course
- Instruction language: Kurmanji.
- Target language: Kurmanji.
- Script: Hawar-based Latin orthography.
- Learner profile: Kurmanji readers/speakers seeking systematic literacy, grammar, orthography and advanced written competence; a staged beginner route may be added.
- Method: direct instruction in Kurmanji, with Kurmanji definitions, examples, exercises, feedback and assessment. Learner-facing explanations must not quietly switch into Sorani.
- Safeguard: this is an independently authored Kurmanji curriculum, not a line-by-line translation of Pathway A.

Both pathways should be complete, coherent, source-traceable and versioned independently.

## 2. Academic standard and source hierarchy

Use a source hierarchy rather than treating every internet page as equally authoritative.

### Tier 1 — Peer-reviewed research and scholarly grammars

1. **Haig, Geoffrey (2018), “Northern Kurdish (Kurmanjî),”** in *The Languages and Linguistics of Western Asia: An Areal Perspective*, pp. 106–158. DOI: https://doi.org/10.1515/9783110421682-004. Open author PDF: https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf  
   Core descriptive grammar reference for phonology, nominal morphology, case, ezafe, pronouns, verb morphology, negation, clause structure and examples. Cite section/page for each grammar claim.

2. **Haig, Geoffrey & Ergin Öpengin (2018), “Kurmanjî Kurdish in Turkey: Structure, varieties and status,”** in *Linguistic Minorities in Turkey and Turkic speaking minorities of the peripheries*, pp. 157–230. Harrassowitz. Open PDF: https://www.uni-bamberg.de/fileadmin/aspra/06_Team/Publications_and_CV/HaigOepengin2018_Kurmanji_Kurdish_.pdf  
   Use for dialect variation, sociolinguistic context, standard-language status and the warning that descriptions based on one variety must not be universalised.

3. **Öpengin, Ergin (2017), work on orthographic standardization and contemporary written Kurmanji,** published in the Brill *Kurdish Studies Archive* volume. Open access PDF: https://brill.com/display/book/9789004506152/9789004506152_webready_content_text.pdf  
   Use the relevant chapter/review to frame Hawar orthography, development of written conventions, and continuing variation in editorial practice. A widespread standard does not mean every spelling convention is fully settled.

4. **Baker & Atlamaz (2014), “On the Relationship of Case to Agreement in Split-Ergative Kurmanji and Beyond.”** https://sites.rutgers.edu/mark-baker/wp-content/uploads/sites/199/2019/07/kurmanji-split-erg-distributed-July-2014.pdf  
   Use for case, agreement and split-ergative clause analysis. Do not simplify direct/oblique into subject/object labels.

5. **Haig & Öpengin (2014), “Regional variation in Kurmanji: A preliminary classification of dialects.”** https://kurdishstudies.net/menu-script/index.php/KS/article/download/62/53/54  
   Use for regional variation, transcription and dialect-sensitive examples. It distinguishes pan-regional standard Roman orthography from phonetic/philological representations used for local dialect description.

6. **Thackston, W. M., *Kurmanji Kurdish: A Reference Grammar with Selected Readings*.** https://sites.fas.harvard.edu/~iranian/Kurmanji/kurmanji_complete.pdf  
   A useful reference grammar and exercise source. Treat it as a reference to cross-check, not the sole authority; reconcile older terminology and examples with more recent descriptive work and the selected house standard.

### Tier 2 — Specialist dialect data, corpora and language resources

7. **The Dialects of Kurdish survey/database, University of Manchester.** Overview: https://bibliographiakurdica.org/publications/the-dialects-of-kurdish ; database and speech samples linked from that page.  
   Use for attested regional variants, recorded speech, elicited structures and the difference between a standard written form and locally documented speech. Preserve location/variety metadata with every example.

8. **BGN/PCGN, “Romanization of Kurdish” (revised presentation October 2022).** https://geonames.nga.mil/geonames/GNSSearch/GNSDocs/romanization/ROMANIZATION_OF_KURDISH.pdf  
   Use only as a technical romanization cross-reference, not as the final authority for Kurmanji grammar or preferred literary style. It covers Kurdish more broadly and combines Hawar-based and additional conventions; it must not override the project's chosen Hawar standard.

9. **Yari Kurmanji dictionary and learning resources.** https://yari.krd/dictionary/ and https://yari.krd/learn/  
   Useful as a supplementary lexical and usage check. A dictionary entry alone does not prove a full sentence's grammar, dialect neutrality or pedagogical suitability.

10. **Saeed & Jacksi (2026), “Dasinya: A dataset and preprocessing pipeline for the Badini Kurdish dialect,” *Data in Brief* 68, 113129.** DOI: https://doi.org/10.1016/j.dib.2026.113129 ; corpus: https://doi.org/10.5281/zenodo.20729060  
    A recent, valuable computational-linguistics resource for Badini written in Perso-Arabic script. It is not a Kurmanji-Hawar Latin teaching corpus and must not be treated as direct evidence for Latin orthography or all Kurmanji varieties. Its methodological lessons—Unicode validation, orthographic normalization, retaining morpheme boundaries, genre-aware processing and expert validation—can inform our data-quality process.

### Evidence rule

- A grammar claim should cite a scholarly grammar/research source and, where relevant, section/page.
- A lexical form should be checked against a specialist dictionary and, where possible, attested in a sentence/corpus.
- A dialect claim must carry a location/variety label and source.
- A pronunciation claim should distinguish phonemic representation from phonetic realization and use IPA when it adds precision.
- A teaching example must be tagged as **attested**, **adapted from a source**, or **instructor-created**. Instructor-created examples are valid teaching material but must not be presented as quotations or field-attested data.
- Where credible sources disagree, record the disagreement and editorial decision. Do not silently blend variants.
- Recent does not automatically mean authoritative: a 2026 NLP dataset is not a substitute for a descriptive grammar.

## 3. Shared linguistic specification

Before rewriting lessons, approve a concise project style/linguistic specification.

### 3.1 Reference variety and variation
- Define the teaching target as a transparent written Kurmanji standard based on Hawar Latin orthography.
- Choose a declared reference variety for spoken examples. Do not label it simply “all Kurmanji.”
- Decide how to display Badini, Botan, Serhed and other regional variants: main form, variant box or advanced note.
- Preserve a variant only when its provenance is known. Never combine a Badini form, a Serhed pronunciation and a standard written example into one supposedly universal paradigm.
- Keep spoken variation and written standard conventions distinct.

### 3.2 Orthography and typography
- Adopt one canonical Hawar alphabet inventory and a project-approved spelling guide.
- Preserve standard Kurdish Latin letters and diacritics exactly; do not transliterate or normalize them into Turkish, English or Sorani spellings.
- Distinguish letters/graphemes, digraphs, phonemes and phones.
- Do not count rr as an extra Hawar alphabet letter. If a source or variety uses rr to indicate a trill or transcriptional distinction, explain that convention separately and cite it.
- Define word boundaries, compounds, clitics, prefixes, suffixes, apostrophes, capitalization, loanwords, proper names and punctuation in a house-style guide.
- Use Unicode NFC for storage/display validation; do not strip diacritics. Test search, sorting, copy/paste, fonts and PDF rendering with all Kurdish Latin letters.
- Maintain a canonical spelling list and a documented exception list. Avoid global find/replace without linguistic review.

### 3.3 Phonetics and phonology
Teach separately: speech sounds and articulatory features; phonemes and contrasts; grapheme-to-sound correspondences; syllable structure and stress; dialectal phonetic variation; IPA transcription conventions.

Do not confuse aspiration, pharyngealization, voicing, place of articulation, tap and trill. A phonetic detail must not be presented as an orthographic rule unless evidence supports that connection.

### 3.4 Morphology and morphosyntax
The shared grammar map must cover, with examples and exceptions:
- noun gender, number, definiteness/indefiniteness and case;
- direct and oblique forms, including interaction with tense/aspect and split alignment;
- personal, demonstrative, interrogative, reflexive and possessive pronouns;
- ezafe: linking and free/demonstrative uses, agreement and phrase structure;
- adjective placement, agreement and comparison;
- adpositions and postpositions, spatial relations and case selection;
- verb stems, person/number agreement, tense, aspect, mood, polarity, auxiliaries and irregular verbs;
- transitivity, valency, argument structure, direct objects, goals and recipients;
- questions, negation, imperatives, subordination, coordination and clause linking;
- word order, information structure, focus and pragmatic fronting.

Never teach an introductory generalisation as exceptionless. Put scope and exceptions next to the rule, not in a distant footnote.

### 3.5 Lexicon and semantics
- Use a controlled glossary with headword, part of speech, inflection, meaning, example, source, variety and spelling status.
- Distinguish near-synonyms, false friends, polysemy, register, idioms and regional vocabulary.
- For each lexical item, verify meaning in context; do not rely on one-word Sorani equivalents.
- Mark formal, informal, literary, colloquial, technical and regionally restricted forms.

### 3.6 Pragmatics, discourse and sociolinguistics
Include greetings, address forms, politeness, requests, refusals, turn-taking, register, narrative, reported speech, discourse markers, idioms, language contact and social contexts of standard and regional varieties. Avoid implying one community's convention is universal.

## 4. Curriculum architecture

The existing 26 + 12 lesson structure is a useful starting inventory, not a final claim that 38 lessons alone constitute a complete proficiency course. Retain verified material, then expand and sequence it according to learning outcomes. No lesson count or proficiency level should be certified until the full curriculum map and assessment blueprint are approved.

### Pathway A — Sorani-mediated Kurmanji

**Stage A0 — Orientation and transfer awareness**
- What Kurmanji is; relationship to Sorani without collapsing them into one language.
- Hawar Latin reading, sound-letter mapping, diacritics and spelling.
- How to use contrast notes without substituting Sorani grammar.

**Stage A1 — Foundational communication and literacy**
- Pronunciation, alphabet, syllables and high-frequency words.
- Greetings, identity, family, places, numbers, time and everyday needs.
- Basic noun phrases, pronouns, present-tense clauses, questions and negation.
- Short dialogues, listening/reading comprehension and controlled writing.

**Stage A2 — Core grammar and extended communication**
- Gender, number, direct/oblique case, ezafe and possession.
- Past and present verb systems, common irregulars, aspect and future.
- Adpositions, word order, goals/recipients and comparisons.
- Narration, practical writing, messages and short connected texts.

**Stage A3 — Independent use and language awareness**
- Split-ergative constructions, complex clauses, subordination and discourse.
- Register, dialect variation, idiomatic expressions and lexical nuance.
- Longer reading, summarising, argumentation and structured writing.
- Editing for standard spelling and grammatical accuracy.

Each Sorani explanation should contain: concise explanation in Sorani; Kurmanji form in Latin script; contrastive note only where it prevents a likely transfer error; source-checked paradigm/example; controlled practice; communicative task; short retrieval review.

### Pathway B — Kurmanji-medium Latin

**Stage B0 — Kurmanji literacy bridge**
- Read and write Hawar Latin.
- Sound-letter relationships, diacritics, spelling and punctuation.
- Kurmanji classroom instructions and basic grammatical terminology.

**Stage B1 — Kurmanji through Kurmanji**
- Simple definitions, short dialogues and highly controlled texts.
- Vocabulary in context, sentence frames and semantic/visual scaffolds.
- Grammar explained with simple Kurmanji, then progressively richer Kurmanji.
- No hidden Sorani or English translation in learner-facing lesson bodies.

**Stage B2 — Structured grammar and communication**
- Full noun phrase, pronouns, case, ezafe, verbs, tense/aspect/mood and negation.
- Question formation, clause linking, word order and everyday discourse.
- Reading and writing coherent paragraphs, narratives and practical texts.

**Stage B3 — Advanced literacy and language analysis**
- Morphosyntax, split alignment, valency, information structure and register.
- Orthographic editing, lexical precision, dialect awareness and stylistics.
- Analytical reading, summarising, explanation, argumentation and revision.

The Kurmanji-medium course must include a Kurmanji glossary of grammar terms, Kurmanji instructions, model answers and feedback messages. At the earliest stage, explanations should use controlled vocabulary and short sentences; difficulty can increase gradually. Do not simply translate Sorani explanations word-for-word.

## 5. Mandatory lesson specification

Every lesson in both pathways should have a complete editorial record:

1. Lesson identity: course, stage, unit, lesson number, title and version.
2. Prerequisites: what the learner should already know.
3. Measurable outcomes: observable “can do” statements.
4. Core concept: one main teaching objective, with secondary objectives separated.
5. Language input: verified forms, paradigms, examples and vocabulary.
6. Scientific note: concise explanation of relevant phonology/grammar and limits of the rule.
7. Contrast/variation note: Sorani transfer note in Pathway A; internal Kurmanji variation note in both where needed.
8. Guided examples: source-labelled and morphologically checked.
9. Practice sequence: recognition → discrimination → controlled production → meaningful use → free production.
10. Comprehension: reading/listening or text interpretation appropriate to the stage.
11. Assessment: answer key, scoring criteria and error-specific feedback.
12. Retrieval practice: short spaced review of prior material.
13. References: bibliography plus page/section for the actual claim.
14. Editorial status: draft, linguistically reviewed, native-speaker reviewed, pedagogically reviewed, approved.
15. Change history: who/when/what and why.

A lesson must not be marked “scientifically verified” merely because its topic appears in a grammar book. Every example and rule needs its own evidence and review.

## 6. Assessment design

Use a balanced assessment blueprint rather than relying on multiple-choice quizzes alone.

- Orthographic accuracy: reading, spelling, diacritic recognition, correction and dictation where audio is available.
- Phonological awareness: sound discrimination and grapheme/phoneme mapping; IPA only where suitable.
- Grammar: form recognition, paradigm completion, sentence construction, error correction and explanation.
- Lexical competence: meaning in context, collocations, register and appropriate use.
- Comprehension: short and extended texts; later include authentic sourced material with rights and difficulty checked.
- Production: dialogues, descriptions, narratives, messages, summaries and arguments.
- Pragmatic competence: appropriate greeting, request, register and response for a stated context.

For every test: state what it measures and does not measure; distinguish item difficulty from linguistic importance; use unambiguous distractors; provide answer rationale; include a marking rubric for open responses; pilot questions with proficient Kurmanji reviewers and representative learners; analyse item difficulty/discrimination only after enough learner responses exist; do not claim CEFR certification without validated mapping and external review.

## 7. Pedagogical principles

- Use communicative, task-based learning supported by explicit form-focused instruction.
- Move from input and noticing to guided practice and meaningful production.
- Use retrieval practice and spaced review to strengthen retention.
- Introduce one major new grammar load at a time; recycle vocabulary and structures.
- Use contrastive Sorani–Kurmanji teaching in Pathway A only when it clarifies a real difference.
- In Pathway B, keep learner-facing language in Kurmanji and scaffold comprehension through controlled wording, examples and visuals.
- Separate teaching simplification from linguistic fact; label simplifications and return to exceptions later.
- Build accessibility into text layout, font support, contrast, keyboard entry and mobile display.

## 8. Corpus and example governance

Create an internal example bank with these required fields:
- example_id
- kurmanji_text
- morpheme_gloss
- free_translation
- ipa (optional, only when checked)
- variety_or_location
- source_type (attested / adapted / instructor-created)
- source_reference
- grammar_features
- orthography_status
- reviewer
- approval_status

Never invent a citation or label an instructor-created sentence as a corpus attestation. Keep original source wording separate from pedagogically adapted versions. Where possible, include a literal gloss and natural translation so learners can see structure without confusing it with idiomatic meaning.

## 9. Quality assurance and release gates

### Linguistic review
- Each grammar rule checked against at least one specialist grammar and a second source where disputed or dialect-sensitive.
- All paradigms checked for consistency across lessons.
- All examples checked for morphology, syntax, orthography, semantics and variety.
- All Sorani explanations reviewed by a native Sorani editor.
- All Kurmanji learner-facing text reviewed by proficient native Kurmanji editors from the declared reference variety; regional review for marked variants.

### Pedagogical review
- Outcomes measurable and aligned with lesson activities.
- Difficulty progression appropriate; prerequisites explicit.
- Exercises measure the stated outcome.
- Answer keys and feedback independently checked.
- Pathway B remains genuinely Kurmanji-medium.

### Technical review
- Unicode and font QA for every Hawar character.
- Search, sort, copy/paste, keyboard input and rendering tested.
- Course boundaries, prerequisites, enrolment, progress persistence and scoring tested.
- Seed/migration differences reconciled through an explicit content decision, not by blindly copying one source over another.
- Database, production, main, merge and deployment remain separate owner-approved actions.

### Approval status vocabulary
- draft
- source_checked
- linguist_reviewed
- native_editor_reviewed
- pedagogy_reviewed
- owner_approved
- released

No lesson may skip directly from draft to released.

## 10. Project-specific risks to avoid

1. Do not mix Kurmanji and Sorani examples or scripts.
2. Do not treat Badini Perso-Arabic NLP data as direct proof for Hawar Latin spelling.
3. Do not confuse the 31-letter Hawar alphabet with phoneme counts, digraphs or IPA symbols.
4. Do not treat rr as an additional Hawar letter without a precise, source-backed convention.
5. Do not reduce direct/oblique case to subject/object.
6. Do not teach SOV as a rigid rule without Goal/recipient and information-structure notes.
7. Do not universalise dialect-specific forms.
8. Do not equate a word-level dictionary gloss with a verified sentence.
9. Do not convert every Sorani term into a Kurmanji term by literal translation; approve a Kurmanji grammatical terminology list.
10. Do not call a course A1/B1 or CEFR-aligned until outcomes, tasks and assessment are mapped and reviewed.
11. Do not rewrite source lesson text before owner/editor approval.
12. Do not change production data, main, PR merge state or deployment under a general “continue” instruction.

## 11. Proposed work sequence

**Phase 1 — Freeze the academic specification**
- Select reference written standard and spoken reference variety.
- Approve orthography and terminology guide.
- Approve Sorani and Kurmanji editorial conventions.
- Establish source citation and example provenance rules.

**Phase 2 — Audit and map the existing 38 lessons**
- Map each lesson to measurable outcomes and curriculum stage.
- Identify duplication, gaps, incorrect sequencing and unsupported examples.
- Retain valid material; do not rewrite it during the audit.
- Produce separate pathway maps.

**Phase 3 — Complete Pathway A**
- Resolve high-priority linguistic issues.
- Native Sorani edit and Kurmanji source review.
- Add practice, comprehension, production and assessments.
- Validate all examples and references.

**Phase 4 — Author Pathway B independently**
- Create Kurmanji terminology and instruction-language guide.
- Draft original Kurmanji explanations and examples.
- Add staged language scaffolding and assessment.
- Native Kurmanji editorial review.

**Phase 5 — Pilot and release**
- Pilot with representative learners.
- Analyse error patterns and assessment items.
- Revise and version lessons.
- Run technical, accessibility and course-progression QA.
- Seek explicit owner approval before production, merge or deployment.

## 12. Decisions required from the owner

Before full lesson authoring, confirm:
1. Written standard: Hawar-based contemporary standard Latin Kurmanji as the core orthography (recommended).
2. Reference spoken variety: which regional variety should anchor pronunciation/audio; other forms can be labelled as variants.
3. Pathway B audience: native/proficient Kurmanji speakers seeking literacy/grammar, or beginners learning Kurmanji through Kurmanji from zero. A staged course can serve both, but entry path and scaffolding differ.
4. Course breadth: should both pathways cover the same complete grammar and communication domains with different teaching languages, or should Pathway B also include a deeper advanced linguistics/orthography strand?
5. Terminology policy: should we create a consistent Kurmanji metalanguage glossary and publish it as part of Pathway B?

## Final status

This document defines the academic architecture for two independent but aligned Kurmanji learning pathways. It is a proposal, not a claim that the courses are already complete or certified. Existing lesson content, seeds, migrations, database, main branch, PR #3 and deployment have not been modified by this design document.
