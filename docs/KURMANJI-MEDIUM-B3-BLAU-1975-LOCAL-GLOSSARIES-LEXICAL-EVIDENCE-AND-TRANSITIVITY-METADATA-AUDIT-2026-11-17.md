# Blau (1975): Local Glossaries, Lexical Evidence and Transitivity Metadata Audit — 2026-11-17

## Executive finding

Blau's 1975 study is not only a comparative grammar and folklore-text collection: it also contains two locality-specific glossaries, one for Amêdî and one for the Kurdish variety of Jabal Sinjar. An independent bibliographic/lexicographic review by the Kurdish Academy of Languages describes these glossaries as covering the vocabulary of the accompanying oral texts, recording noun gender and verbal present stems, but not indicating verbal transitivity.

This creates a concrete data-quality rule for any future Academy lexical resource: **absence of a transitivity label in Blau's glossary is missing metadata, not evidence that a verb is intransitive or transitive.** Do not infer valency from the glossary alone; consult the grammar discussion and the cited narrative context.

## 1. Source identity and scope

Blau, Joyce. 1975. *Le Kurde de ʿAmadiya et de Djabal Sindjar: analyse linguistique, textes folkloriques, glossaires*. Paris: C. Klincksieck, 252 pp. (Some library catalogues report 253 pages; the discrepancy is not resolved here.)

The study is based on field research in Amadiya and Sinjar in 1967–1968. Van Bruinessen's 2025 biographical study characterizes it as field linguistics on two dialects that differ considerably from Standard Kurmanji, with recorded oral narratives transcribed, analysed and translated. It should therefore be treated as two local corpora, not as a normative Standard Kurmanji dictionary.

## 2. What the glossaries document

The Kurdish Academy of Languages' review of Kurmanji lexicography explicitly describes Blau's two glossaries as:
- one glossary for Amadiya and one for Jabal Sinjar;
- vocabulary associated with the accompanying oral texts;
- noun gender information;
- present stems of verbs;
- no explicit indication of whether verbs are transitive or intransitive.

This is a useful independent description of the book's lexicographic architecture. It is not a substitute for checking individual entries in the primary scan, and it does not license us to claim that every lexical item in the entire dialect is represented: the review says these are glossaries for the accompanying oral texts.

## 3. Implications for lexical data modelling

A future research lexicon derived from this source should keep the following fields separate:

| Field | Recommended treatment |
|---|---|
| Lemma / headword | Preserve source spelling; store any normalized Hawar form separately. |
| Locality | Required controlled value: Amêdî or Sincarî; never collapse to generic “Badini”. |
| Part of speech | Record only when source evidence supports it. |
| Noun gender | Transcribe Blau's explicit label; otherwise mark unknown. |
| Infinitive | Preserve the source form, with printed page and glossary location. |
| Past stem | Record only when directly attested in the glossary or grammar. |
| Present stem | Record the glossary's stated stem; do not assume it is predictable. |
| Transitivity / valency | Use a three-way state: attested transitive, attested intransitive, or not specified. Never encode missing as false. |
| Example/context | Link to the exact folk text, sentence, page and translation when available. |
| Evidence class | Distinguish direct glossary entry, grammar statement, contextual example, and editorial inference. |
| Editorial normalization | Store separately from the diplomatic/source form and document the conversion. |

The three-way transitivity field is essential. A blank or absent label in Blau's glossary must be represented as **not specified**, not as an inferred grammatical property. If a verb's transitivity is established elsewhere in the book, cite that separate grammar section or example.

## 4. Cross-check against the primary grammar audit

The earlier primary-source audit records that Blau's §94 discusses two-actant verbs in past tenses: the agent is oblique, the patient is direct, and the verb agrees with the direct patient in the construction described. That section supplies grammatical evidence about transitivity and alignment for the examples it actually discusses. It does not retrospectively fill every glossary entry.

Likewise, the earlier chart audit documents locality-specific verbal stems and conjugation tables. A present stem in the glossary is lexical evidence; a complete conjugation paradigm must be taken from the relevant chart or grammar section, not generated automatically from the glossary headword.

## 5. Safe use in the Academy project

1. Treat Blau as a historical, locality-labelled field source, not a prescriptive standard.
2. Keep Amêdî and Sincarî records distinct, even when headwords look similar.
3. Never import the two glossaries as a generic Kurmanji vocabulary list without locality and provenance.
4. Do not infer transitivity from absence of a glossary marker.
5. Do not synthesize missing stems, gender labels, or paradigms by analogy.
6. Keep source spelling, normalized spelling, gloss, translation, and editorial notes in separate fields.
7. Before any learner-facing use, require page-level verification and a native-speaker/editor review.
8. No existing lesson or seed content is changed by this research note.

## 6. Source links

- Kurdish Academy of Languages, “Kurmanji Kurdish Lexicography” — independent review describing the two locality-specific glossaries, noun gender and present stems, and the absence of transitivity marking: https://kurdishacademy.org/wp/kurmanji-kurdish-lexicography/
- Van Bruinessen, Martin. 2025. “A Life Devoted to the Kurds: Joyce Blau, 1932–2024.” *Kurdish Studies Journal* 3(1): 109–126: https://www.institutkurde.org/images/mediapdf/XUEDRQF5HZ.pdf
- Google Books catalogue record for Blau 1975: https://books.google.com/books?id=-3QDAAAAMAAJ
- Primary scan record: Kurdipedia document viewer, record 2016110900430397605.
- Internal primary-source evidence: `docs/KURMANJI-MEDIUM-B3-BLAU-1975-AMEDI-SINCARI-PRIMARY-TEXT-EVIDENCE-AUDIT-2026-11-17.md`.
- Internal visual chart evidence: `docs/KURMANJI-MEDIUM-B3-BLAU-1975-CONJUGATION-CHARTS-VISUAL-VERIFICATION-2026-11-17.md`.

## Change log and safety

Documentation-only lexicographic evidence audit. No lesson, seed, application code, CI, migration, database, production service, PR #3, or deployment was changed.
