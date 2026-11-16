# Kurmanji Reference Variety & Editorial Policy — Decision Proposal

**Date:** 2026-11-16  
**Repository:** avasinim/zanztkurd  
**Branch:** fix/kurmanji-ci-current-migration  
**Status:** Proposal only — requires owner and specialist-editor approval.

## 1. Purpose

This policy proposal establishes a consistent, evidence-led framework for the two planned Kurmanji pathways:

- **Pathway A:** Sorani explanations teaching Kurmanji in Hawar-based Latin script.
- **Pathway B:** an independently authored Kurmanji-medium course, also in Hawar-based Latin script.

The proposal separates written-standard choices from spoken dialect choices. It does not declare one regional variety to be the only correct Kurmanji, and it does not authorize rewriting existing lessons.

## 2. Recommended language and script policy

### 2.1 Written target

**Recommendation:** use contemporary, widely recognizable Hawar-based Latin Kurmanji as the shared written target for both pathways.

This is a written editorial standard, not a claim that all speakers use identical forms. The project should publish a short orthography guide before lesson rewriting.

Policy:
1. Preserve the established Kurdish Latin characters and diacritics exactly: ç, ê, î, ş, û and other standard letters.
2. Do not replace Kurdish letters with visually similar Turkish, English or ASCII forms.
3. Distinguish alphabet letters/graphemes from phonemes, phones, digraphs and IPA symbols.
4. Treat the conventional 31-letter Hawar inventory separately from sound inventories.
5. Do not list **rr** as an additional alphabet letter. Where a source or variety writes a trill with **rr**, describe that as a digraph or convention and cite its scope.
6. Keep word spelling, pronunciation, phonetic transcription and dialect variation in separate fields.
7. Store and validate Unicode consistently (NFC is the recommended storage normalization); never strip diacritics as a “cleanup” step.
8. Test all Kurdish letters in the website, mobile layouts, search, sorting, keyboard input, copy/paste and exported documents.

### 2.2 Spoken reference variety

**Decision required:** the owner and Kurmanji language editor must select the spoken reference variety for audio and pronunciation models.

Until that decision:
- Do not generate or commission pronunciation audio as if it represented all Kurmanji.
- Do not describe the written standard as a spoken dialect.
- Mark pronunciation examples as “reference variety pending” where necessary.
- Keep attested regional variants with their location/variety metadata.
- Do not mix forms from different regions into one paradigm without clearly labelling the mixture.

A practical decision could select one spoken reference variety for beginner audio while retaining a documented “regional variants” layer. The project should not guess which variety the owner prefers.

## 3. Editorial scope and labels

Use these labels in internal records and, where useful, in learner-facing notes:

| Label | Meaning | Editorial treatment |
|---|---|---|
| Standard written form | Form selected for the course's common written target | Use consistently in core examples |
| Regional variant | Form supported for a named region/community | Preserve and label; do not mark wrong |
| Colloquial form | Informal spoken form with a defined scope | Label register and variety |
| Literary/formal form | Form associated with formal or literary usage | Label register |
| Historical/archaic form | Form not treated as ordinary contemporary usage | Keep out of beginner core unless pedagogically relevant |
| Unverified | Evidence is insufficient or conflicting | Do not teach as a settled rule |
| Instructor-created | Original teaching example, not a corpus quotation | May be used after expert review; never misattribute |

Every regional form should record its source and, when available, speaker/location information. “Dialectal” is not a synonym for “incorrect.”

## 4. Grammar and terminology policy

### 4.1 Core grammatical terms

Create one controlled glossary with:
- Kurmanji term (when an established, reviewed term exists);
- Sorani explanation/translation for Pathway A;
- plain-Kurmanji definition for Pathway B;
- scholarly English equivalent for editorial cross-reference;
- concise definition;
- one reviewed example;
- source and reviewer;
- status and version.

Do not invent a Kurmanji technical term by literal translation from Sorani or English. If no stable learner-friendly Kurmanji term exists, use a clear Kurmanji explanation and mark the technical term as provisional.

### 4.2 Required distinctions

The course must consistently distinguish:
- letter/grapheme, phoneme and phonetic realization;
- phonology and orthography;
- root, stem, morpheme, syllable and word;
- direct and oblique case (not a simplistic subject/object or nominative/accusative equation);
- head-noun ezafe agreement and case marking;
- linking ezafe and free/demonstrative ezafe;
- tense, aspect, mood and person agreement;
- canonical past-transitive split alignment and other clause patterns;
- neutral word order and discourse-driven fronting/focus;
- standard written forms and regional speech forms.

### 4.3 Grammar claims

A rule must state its scope. Use formulations such as “in the reference standard used in this lesson” rather than “always” where the evidence documents variation. Put important exceptions beside the rule and provide at least one worked example. Do not teach an introductory simplification as an exceptionless fact.

## 5. Example and citation policy

Every teaching example must be assigned one provenance type:

1. **Attested:** copied faithfully from an identifiable source or corpus, with citation and exact source form.
2. **Adapted:** derived from a source but altered for teaching; preserve the source reference and describe the adaptation.
3. **Instructor-created:** written for the course; reviewed by a proficient Kurmanji editor and never presented as an attested quotation.

For each example, record:
- unique example ID;
- exact Kurmanji text;
- morpheme segmentation where relevant;
- literal gloss (where useful);
- natural translation;
- grammatical feature(s);
- variety/location and register;
- provenance type and full citation;
- orthography status;
- reviewer and approval state.

A citation for a general grammar rule does not automatically validate every example in a lesson. Check the actual inflected sentence, not just the topic.

## 6. Pathway-specific language rules

### Pathway A — Sorani-mediated Kurmanji

- Explanations and teaching instructions are in Sorani.
- Target forms and all Kurmanji examples remain in Latin Kurmanji.
- Sorani contrast notes appear only when they clarify a real similarity or transfer risk.
- Sorani equivalents are contextual explanations, not claims of one-to-one lexical identity.
- Sorani spelling and terminology follow a separately approved Sorani house style.
- Do not use Sorani morphology or syntax as the template for a Kurmanji paradigm.

### Pathway B — Kurmanji-medium Latin

- Learner-facing titles, explanations, instructions, examples, exercises, answer keys, feedback, glossary definitions and assessments are in Kurmanji.
- Do not quietly insert Sorani or English translations into the learner-facing body.
- Start with controlled, high-frequency Kurmanji and short sentences; progressively increase lexical and grammatical complexity.
- Use pictures, diagrams, examples, repetition and simple Kurmanji paraphrases as scaffolding.
- Create an independently reviewed Kurmanji grammatical metalanguage.
- An editorial teacher guide may contain external-language notes, but it must be kept separate from the learner-facing course.

## 7. Assessment and proficiency claims

- Assess spelling, reading, grammar, vocabulary-in-context, comprehension, interaction, writing and pragmatic appropriateness.
- Use recognition, controlled production and meaningful open production; do not rely on multiple-choice questions alone.
- Provide answer rationales and error-specific feedback.
- Pilot tasks with learners and proficient Kurmanji reviewers.
- Do not label a course “A1”, “B1” or “CEFR-certified” solely because its content resembles a level descriptor. Such claims require an explicit outcome/task mapping, validated assessment and external review.

## 8. Approval checklist

Before applying this policy, the owner/editor should approve:

- [ ] Hawar-based contemporary written standard as the shared target.
- [ ] Spoken reference variety for pronunciation/audio.
- [ ] Variant labelling and regional metadata rules.
- [ ] Kurmanji grammatical terminology policy.
- [ ] Sorani house style for Pathway A.
- [ ] Citation and example-provenance policy.
- [ ] Pathway B audience and beginner-to-advanced staging.
- [ ] Whether an advanced linguistics/orthography strand is included.

## 9. Research basis

The proposal is informed by:
- Haig (2018), “Northern Kurdish (Kurmanjî),” *The Languages and Linguistics of Western Asia*, pp. 106–158: https://doi.org/10.1515/9783110421682-004
- Haig & Öpengin (2018), “Kurmanjî Kurdish in Turkey: Structure, varieties and status”: https://www.uni-bamberg.de/fileadmin/aspra/06_Team/Publications_and_CV/HaigOepengin2018_Kurmanji_Kurdish_.pdf
- Haig & Öpengin (2014), “Regional variation in Kurmanji: A preliminary classification of dialects”: https://kurdishstudies.net/menu-script/index.php/KS/article/download/62/53/54
- Baker & Atlamaz (2014), “On the Relationship of Case to Agreement in Split-Ergative Kurmanji and Beyond”: https://sites.rutgers.edu/mark-baker/wp-content/uploads/sites/199/2019/07/kurmanji-split-erg-distributed-July-2014.pdf
- University of Manchester, “The Dialects of Kurdish” project: https://bibliographiakurdica.org/publications/the-dialects-of-kurdish

These works support the need to distinguish structural description, dialect variation and editorial standardization. They do not replace claim-level review of course examples.

## 10. Status and protection

This file is a decision proposal only. No lesson text, seed, migration, application code, database, main branch, PR #3 or deployment is changed by this policy. Implementation requires review and approval. Production, merge and deployment actions remain separately permission-gated.
