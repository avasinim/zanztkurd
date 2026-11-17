# Kurmanji Lexical Sources: Rights, Attribution and Reuse Gate — 2026-11-17

## Executive decision

Do not bulk-copy or import any external dictionary dataset into the Avasin Academy product until its exact licence, intended distribution model, attribution requirements and derivative-work obligations have been reviewed. A source being publicly readable or downloadable is not permission to reproduce its entries.

A concrete restriction was confirmed for the public KurdishLex repository: it labels all four lexical resources, including the Kurmanji RDF dataset, **CC BY-NC-SA 4.0**. The repository explicitly states that the material cannot be redistributed for commercial purposes. If the Academy's present or future use is commercial, this licence is not a safe basis for importing or redistributing that data without separate permission or legal review.

## 1. Source-by-source reuse status

| Resource | What it contributes | Rights / reuse status | Safe current use |
|---|---|---|---|
| KurdishLex / KurdishLexicography (Kurmanji.ttl) | Machine-readable Kurmanji lexical entries in OntoLex-Lemon; repository reports 4,053 Kurmanji headwords | Repository states CC BY-NC-SA 4.0 for all resources. Non-commercial condition and ShareAlike obligation apply; commercial redistribution is not permitted under that licence. | Inspect schema and methodology; do not import or redistribute entries unless use is confirmed non-commercial and all licence conditions are met, or separate permission is obtained. |
| Ahmadi, Hassani & McCrae (2019) paper | Lexicographic methodology, data modelling, conversion pipeline, example RDF representation | Paper copyright/licence must be checked independently; citing the paper does not grant rights to copy dataset entries. | Cite and paraphrase methodology within applicable quotation/copyright limits; do not copy the example dictionary content as a data source. |
| Kurdish Academy of Languages lexicography review | Comparative description of dictionaries, coverage and editorial features | Public article is a secondary source; no dataset reuse licence established by this audit. | Cite bibliographic and methodological observations; verify each claim against primary dictionaries where possible. |
| Chyet, *Kurdish-English Dictionary* (2003) | Extensive modern Kurmanji lexical documentation, senses, variants, examples, inflections | Commercially published book; no open data licence identified here. | Use as a consulted reference with bibliographic/page citations; do not scrape, transcribe or bulk reproduce entries without permission. |
| Blau (1975) | Historical locality-specific Amêdî and Sincarî glossaries and oral texts | Published work; no open data licence established here. | Use brief, attributed research evidence with page references; no bulk transcription or redistribution without rights review. |
| Bakaev (1957), Omar (1992), other printed dictionaries | Gender, transitivity, stems, meanings and examples depending on source | Rights status not established by this audit. | Bibliographic research and limited source-attributed analysis only; no bulk import until rights are cleared. |

## 2. What the public KurdishLex repository actually says

The repository README identifies four datasets: Sorani, Kurmanji, Hawrami and Southern Kurdish. It lists 4,053 Kurmanji headwords and provides a citation for the 2019 eLex paper. Its licence section states that all resources are CC BY-NC-SA 4.0 and expressly says that commercial redistribution is not allowed.

The licence is not merely a citation requirement:
- **BY:** appropriate attribution is required.
- **NC:** commercial use is restricted.
- **SA:** adapted material shared publicly must remain under the same licence or a compatible licence, according to the licence terms.

The Academy must determine whether its intended product, hosting, monetization, institutional distribution and downstream exports count as commercial use. This note does not make that legal determination.

## 3. Important separation: ideas, facts, examples and expression

A lexicographic schema or general linguistic fact is not the same thing as the protected expression of a dictionary entry. Nevertheless, the source-specific selection, wording, definitions, examples, translations and compilation may carry copyright or database rights depending on jurisdiction and circumstances.

Therefore:
1. It is appropriate to learn from a published data model and design an independent schema.
2. It is appropriate to cite the existence and reported size of a public dataset.
3. It is not automatically appropriate to copy its headwords, definitions, examples or RDF triples into the Academy database.
4. Rewriting a definition does not automatically clear rights in a systematically extracted database.
5. A citation does not substitute for a licence or permission.
6. A public URL does not establish an open licence.

## 4. Required clearance checklist before any dataset import

For each proposed source, record:
- exact source title, author/editor, publisher and edition;
- exact source URL or physical holding and date accessed;
- explicit licence name and version, or “no licence located”;
- copyright owner / database right holder, if identifiable;
- whether commercial use is permitted;
- whether modification and redistribution are permitted;
- attribution wording and required notices;
- ShareAlike or other downstream conditions;
- whether examples/translations have separate rights;
- whether permission was requested and granted;
- the intended Academy use: internal research, public website, paid course, downloadable dataset, API or commercial service;
- reviewer and clearance decision.

Use one of four decisions:
- **cleared** — documented permission/licence covers the exact use;
- **conditional** — permitted only under stated conditions;
- **research-reference-only** — citation and analysis, no dataset copying;
- **blocked** — licence incompatible, unclear or permission denied.

No item should enter a distributable lexicon until its source-level rights decision is cleared.

## 5. Independent lexical dataset strategy

The safest path for the Academy is to author its own entries from:
- original, independently written definitions;
- examples created by the Academy and checked by native Kurmanji editors;
- directly cited, limited evidence from scholarly sources;
- independently verified locality and variety labels;
- grammatical analysis recorded with provenance.

Where a published dictionary is consulted, keep a source note and page reference. Do not copy its full definition, example sentence or entry structure wholesale. For Blau, preserve Amêdî and Sincarî as separate historical corpora; do not absorb their entries into the proposed Standard Kurmanji learner lexicon.

## 6. References

- KurdishLexicography repository README and licence section: https://github.com/sinaahmadi/KurdishLexicography (especially repository lines 182–225 in the public page).
- KurdishLex dataset description: https://kailab.org/datasets/dataset-23/
- Ahmadi, Sina, Hossein Hassani & John P. McCrae. 2019. “Towards Electronic Lexicography for the Kurdish Language.” *Proceedings of eLex 2019*, pp. 881–906. https://elex.link/elex2019/wp-content/uploads/2019/10/eLex-2019_Proceedings.pdf
- Kurdish Academy of Languages, “Kurmanji Kurdish Lexicography”: https://kurdishacademy.org/wp/kurmanji-kurdish-lexicography/
- Chyet, Michael L. 2003. *Kurdish-English Dictionary: Ferhenga Kurmancî-Inglîzî*. New Haven: Yale University Press.
- Blau, Joyce. 1975. *Le Kurde de ʿAmadiya et de Djabal Sindjar*. Paris: C. Klincksieck.

## 7. Project boundary

This is a rights and provenance research note only. No third-party lexical dataset was downloaded, copied, imported or redistributed. No application schema, SQL, migration, seed, course lesson, runtime, CI workflow, production database, PR #3 or deployment was changed. The note does not authorize any such change.
