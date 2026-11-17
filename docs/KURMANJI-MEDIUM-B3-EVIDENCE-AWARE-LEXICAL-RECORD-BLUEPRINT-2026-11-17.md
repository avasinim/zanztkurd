# Kurmanji Pathway B3: Evidence-Aware Lexical Record Blueprint — 2026-11-17

## Purpose and status

This is a research and data-design proposal for a future Kurmanji lexical resource. It is not an implementation, migration, or authorization to change the current application, seed data, lessons, or database. It synthesizes the lexical limitations documented in Blau (1975), established Kurmanji lexicographic practice, and published electronic-lexicography work.

## 1. Evidence behind the design

### 1.1 Blau's locality-bound glossaries

Joyce Blau's 1975 work contains separate Amêdî and Sincarî glossaries associated with the oral texts collected in those localities. The glossaries record noun gender and verbal present stems but do not mark verbal transitivity. Therefore:
- locality must be explicit;
- a missing transitivity label must remain unknown;
- lexical information from the glossary must not be generalized to Standard Kurmanji;
- grammatical examples elsewhere in the book may support a valency claim only for the attested construction.

### 1.2 More complete lexicographic records

The Kurdish Academy of Languages' review describes Bakaev (1957) as recording noun gender, verb transitivity and present stems, with example sentences and grammatical tables. It describes Feryad Fazil Omar (1992) as systematically marking noun gender and verb transitivity/present stems, and as using both Latin and Arabic scripts. The review also cautions that dictionaries vary in dialect scope and reliability.

Michael L. Chyet's dictionary entry-format description provides a concrete model: headword in multiple scripts, part of speech, noun gender and inflections, verb transitivity, present stem and irregularities, with source labels for conflicting evidence. This is useful as a design precedent, not a mandate to copy its dialect decisions.

### 1.3 Digital lexical-resource models

Published work on electronic lexicography for Kurdish describes machine-readable lexical data using OntoLex-Lemon/RDF. The University of Manchester's *Dialects of Kurdish* resource separately tags phonological, morphosyntactic, part-of-speech and verbal features, including transitivity/intransitivity. These demonstrate the value of separating lexical entries, forms, senses, grammatical tags and provenance rather than storing a headword as one flat string.

## 2. Proposed record layers

The following is a conceptual model only. It does not prescribe SQL tables or production schema.

### A. Lexeme identity

| Field | Meaning | Rule |
|---|---|---|
| lexeme_id | Stable internal identifier | Never derived from spelling; never reused. |
| lemma_source | Diplomatic source headword | Preserve exact source spelling and diacritics. |
| lemma_normalized | Editorially normalized form | Optional; never overwrites lemma_source. |
| language_variety | Controlled variety label | Required; do not silently default to Standard Kurmanji. |
| locality | Geographic provenance | Required where known; e.g. Amêdî or Sincarî. |
| source_id | Bibliographic source identifier | Required for every imported claim. |
| source_page | Printed page / glossary locator | Required for direct source claims. |
| part_of_speech | Noun, verb, adjective, etc. | Mark unknown if not established. |

### B. Senses and meanings

| Field | Meaning | Rule |
|---|---|---|
| sense_id | Stable sense identifier | Separate distinct meanings of one lexeme. |
| gloss | Short semantic gloss | Keep distinct from a full definition. |
| definition | Explanation of the sense | Cite evidence and language of definition. |
| translation | Translation equivalent | Record target language and source. |
| usage_domain | Folk narrative, daily speech, technical, etc. | Only when supported by source/context. |
| example_id | Linked attestation | Do not invent examples. |

### C. Inflection and principal parts

| Field | Meaning | Rule |
|---|---|---|
| noun_gender | Masculine, feminine, both/variable, unknown | Preserve source disagreement; do not force one value. |
| ezafe_form | Attested ezafe form | Store only if documented. |
| oblique_form | Attested oblique form | Store only if documented. |
| infinitive | Verbal citation form | Preserve source form. |
| past_stem | Past stem | Require explicit evidence. |
| present_stem | Present stem | Require explicit evidence and variety tag. |
| other_stem | Other lexical stem | Label its function; do not merge with TAM prefixes. |
| irregularity | Irregular behavior | Attach evidence and a human-readable note. |

### D. Valency and alignment

Transitivity is not a simple boolean field. Use a controlled state:
- **attested_transitive**;
- **attested_intransitive**;
- **variable_or_construction_dependent**;
- **not_specified**;
- **conflicting_evidence**.

Each value should be attached to a source and, where possible, a construction/example. Keep transitivity separate from case alignment: an oblique agent in a past transitive clause is not an object. Store alignment/case observations at construction or attestation level, not as a crude property of the lemma.

### E. Attestations and provenance

Each example should be its own evidence record:
- exact source string;
- diplomatic transcription;
- normalized transcription (optional, separate);
- translation;
- locality/speaker/register if known;
- source page/text number;
- grammatical feature being evidenced;
- confidence/status;
- reviewer and review date.

This avoids turning a source-specific narrative example into a universal rule.

## 3. Evidence-status vocabulary

Use a small explicit evidence scale:

| Status | Meaning | Permitted use |
|---|---|---|
| direct_primary | Read directly in the primary source | May support a source-attributed claim. |
| direct_secondary | Read directly in a scholarly secondary source | May support a secondary-source claim. |
| attested_example | Present in a cited sentence/text | Supports that example/construction only. |
| cross_source_corroborated | Independently supported by another source | May raise confidence, preserving differences. |
| editorial_normalization | Form transformed by declared orthographic policy | Never present as diplomatic source form. |
| inferred | Analytical inference | Must be labelled; not learner-ready by itself. |
| unresolved | Illegible, contradictory or insufficient | Must not be silently completed. |

No evidence status should be represented by a confidence number alone. Provenance and the reason for the status are more important than a spurious precision score.

## 4. Editorial and technical safeguards

1. Do not conflate Kurmanji varieties, dialects, localities, registers or historical periods.
2. Distinguish source spelling, phonetic transcription, Hawar normalization and Arabic/Cyrillic transliteration.
3. Never treat an omitted field as a negative grammatical value.
4. Keep noun gender, number, ezafe and oblique inflection distinct.
5. Keep verb infinitive, past stem, present stem, participle, prefixes, agreement and tense/aspect/mood construction distinct.
6. Store transitivity/valency separately from ergative alignment and direct/oblique case.
7. Preserve conflicting source values with citations rather than selecting one silently.
8. A source's vocabulary coverage is bounded by its corpus and locality.
9. No learner-facing entry is approved until a native Kurmanji editor checks the form, sense and usage.
10. No automated generation of paradigms from a single principal part unless a separately validated rule explicitly licenses it for that variety.

## 5. Recommended first pilot

If approved later, begin with a small, manually curated pilot of 20–30 lexemes from a single declared variety and source. Include nouns and verbs, regular and irregular stems, multiple senses, and a few directly attested examples. Test:
- whether a learner can distinguish source form from normalized form;
- whether conflicting genders/stems remain visible;
- whether unknown transitivity stays unknown;
- whether examples retain locality and context;
- whether search returns the right variety and script;
- whether no entry silently leaks into the Standard Kurmanji course.

Do not bulk-import Blau's two glossaries into the Standard Kurmanji pathway. Treat Amêdî and Sincarî as separate historical comparison datasets.

## 6. References

- Blau, Joyce. 1975. *Le Kurde de ʿAmadiya et de Djabal Sindjar: analyse linguistique, textes folkloriques, glossaires*. Paris: C. Klincksieck.
- Kurdish Academy of Languages. “Kurmanji Kurdish Lexicography.” https://kurdishacademy.org/wp/kurmanji-kurdish-lexicography/
- Chyet, Michael L. *Kurdish-English Dictionary* — entry-structure description, including scripts, part of speech, gender, inflections, transitivity, present stems and source labels. (Consulted via available digitized text; bibliographic record should be verified before formal citation.)
- Ahmadi, Sina, and Hossein Hassani. “Towards Electronic Lexicography for the Kurdish Language.” eLex 2019. https://www.insight-centre.org/wp-content/uploads/2020/05/Towards-Electronic-Lexicography-for-the-Kurdish-Language-1-1.pdf
- *The Dialects of Kurdish*, University of Manchester, “Database glosses.” https://kurdish.humanities.manchester.ac.uk/database-glosses/
- KurdishLex, “Kurdish Lexicographical Resources.” https://kailab.org/datasets/dataset-23/

## 7. Project boundary

This proposal is research documentation only. No schema, SQL, migration, seed, application code, CI workflow, production database, lesson text, PR #3, or deployment was changed. It does not authorize any of those changes. Any implementation requires separate approval and a verified backup/review plan.
