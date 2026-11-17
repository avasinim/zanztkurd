# Kurmanji Lexical Entry Review Protocol — Evidence, Editorial and Rights Gates — 2026-11-17

## Purpose and scope

This protocol defines how a candidate Kurmanji lexical record is researched, reviewed and either admitted to or withheld from the Academy's future learner lexicon. It is a documentation standard, not an implemented database schema and not a request to alter existing lessons.

The central rule is: **one headword is not one meaning, one spelling, one dialect or one grammatical paradigm.** Keep those claims separate and attach evidence to each claim.

## 1. Record architecture: keep the layers distinct

A candidate record should be reviewed across these layers:

1. **Lexeme identity** — the lexical unit being described; do not merge homographs automatically.
2. **Written form** — exact spelling, script, orthographic convention and normalized display form.
3. **Pronunciation evidence** — transcription, locality, speaker/source and method; never infer a pronunciation from spelling alone.
4. **Part of speech** — noun, verb, adjective, adverb, particle, etc.; allow unresolved or context-dependent cases.
5. **Sense** — one independently reviewable meaning, with a short independently authored definition.
6. **Morphology** — noun gender/plural/oblique forms, or verb infinitive/past stem/present stem and attested irregular forms, as relevant.
7. **Syntax and valency** — argument structure, transitivity evidence, prepositions/case frames and agreement behaviour; do not equate oblique case with object.
8. **Usage** — register, collocation, construction, region and dated/contextual examples.
9. **Provenance** — source, page/section/entry, exact evidence span or citation, date accessed and rights decision.
10. **Editorial decision** — reviewer, review date, unresolved questions, normalization history and publication status.

A form may be shared by multiple lexemes or senses. A sense may have multiple forms. A dialectal form must not silently become the standard headword.

## 2. Minimum review sheet for each candidate

Copy this checklist for each proposed entry. Leave unknown fields explicitly unknown; never fill them by analogy.

### A. Identity and variety
- Candidate ID:
- Proposed headword:
- Exact source spelling (verbatim, including diacritics):
- Display spelling:
- Script / orthographic standard:
- Variety / locality:
- Is the variety directly identified by the source? yes / no / unclear
- Is the item Standard Kurmanji, a regional form, historical evidence, or unresolved?
- Homograph / near-homograph check completed? yes / no

### B. Meaning and usage
- Part of speech:
- Sense number:
- Independently authored definition:
- Semantic domain:
- Register / pragmatic label:
- Attested collocations:
- Attested example (short, source-attributed, rights-cleared):
- Example independently authored by Academy:
- Native editor confirms naturalness? yes / no / pending
- Meaning distinction from neighbouring senses:

### C. Morphology and syntax
For nouns:
- Gender: masculine / feminine / not applicable / unknown
- Plural form(s):
- Oblique singular/plural forms, if attested:
- Construct/ezafe behaviour, if relevant and evidenced:
- Source and exact page/entry for each form:

For verbs:
- Infinitive:
- Past stem:
- Present stem:
- Participial form(s):
- Transitivity: transitive / intransitive / alternating / unknown
- Valency frame and required complements:
- Past-tense alignment evidence:
- Person/number agreement evidence:
- Irregularity and restrictions:
- Are these forms directly attested, rule-derived, or normalized?

For other parts of speech:
- Inflection / clitic behaviour:
- Syntactic distribution:
- Restrictions and examples:

### D. Evidence and rights
- Source title / author / edition:
- Page, section, entry or dataset record:
- Evidence type: primary dictionary / grammar / corpus / fieldwork / secondary study / native-editor judgement
- Exact claim supported by this source:
- Is the claim directly stated or inferred?
- Second independent source:
- Contradictions / variant readings:
- Licence and version:
- Commercial use permitted? yes / no / unclear
- Adaptation permitted? yes / no / unclear
- Redistribution permitted? yes / no / unclear
- Attribution and ShareAlike requirements:
- Rights decision: cleared / conditional / research-reference-only / blocked
- Permission evidence / contact reference:

### E. Editorial and publication decision
- Normalization performed?:
- Original source form preserved?:
- Normalization rationale:
- Kurmanji-medium editor:
- Linguistic reviewer:
- Rights reviewer:
- Review date:
- Status: candidate / evidence-incomplete / editorial-review / rights-hold / approved / rejected
- Outstanding questions:
- Change history:

## 3. Evidence classes: attach them to individual claims

Use the following controlled labels. A record can have different evidence classes for spelling, sense, morphology and syntax.

- **P1 — Direct primary attestation:** the exact form or claim is visible in a primary dictionary, grammar, corpus or documented field record.
- **P2 — Independent corroboration:** the same claim is supported by a separate source, not merely a citation copied from the first.
- **C1 — Corpus/context attestation:** the form occurs in a cited text with enough context to interpret it.
- **E1 — Native-editor judgement:** an identified qualified editor confirms naturalness or usage; this does not replace documentary evidence for historical claims.
- **N1 — Editorial normalization:** a display form has been normalized from a recorded source form; preserve both.
- **I1 — Inference:** a form or analysis is derived by a stated rule but is not directly attested.
- **U1 — Unresolved:** sources conflict, evidence is illegible, locality is unclear or the analysis remains uncertain.

Do not promote I1 or U1 to P1 merely because a form looks regular. A learner-facing irregular form requires direct evidence or explicit review and labelling.

## 4. Source hierarchy and triangulation

Use sources according to the claim being checked:

1. Primary locality-specific dictionaries and grammars for exact forms and locality labels.
2. Primary texts/corpora for contextual usage, checked against reliable editions.
3. Independent descriptive studies for grammatical interpretation and cross-checking.
4. General dictionaries for discovery, not as the sole authority for a contested inflection or dialect claim.
5. Native-editor review for contemporary naturalness, spelling policy and learner suitability.

Two websites repeating the same dictionary entry are not two independent sources. Record citation chains where possible.

For historical locality sources such as Blau's Amêdî and Sincarî materials, retain the locality label on every extracted claim. Never merge their paradigms into a generic Standard Kurmanji entry.

## 5. High-risk checks for Kurmanji

- **Variety leakage:** Is a regional, historical or contact variety being presented as the Academy's target standard?
- **Script leakage:** Are Latin and Arabic-script forms being conflated or silently converted?
- **Orthographic normalization:** Are diacritics and conventions preserved, and is the original form recoverable?
- **Homography:** Could identical spellings represent different lexemes, grammatical forms or senses?
- **Gender:** Is noun gender attested for this variety, rather than assumed from another dictionary?
- **Verb stems:** Are infinitive, past stem and present stem recorded separately?
- **Transitivity:** Is transitivity explicitly supported? Missing metadata means unknown, not intransitive.
- **Oblique case:** Is the analysis distinguishing oblique agent/subject from direct object?
- **Agreement:** Is the controller of verbal agreement supported by an example or paradigm?
- **Paradigm completion:** Are unprinted cells being generated by analogy? If so, mark inferred and keep out of approved learner data until reviewed.
- **Sense splitting:** Are distinct meanings and constructions incorrectly collapsed into one definition?
- **Example provenance:** Is every quoted example attributable and cleared for the intended reuse?
- **False corroboration:** Are sources genuinely independent?
- **Learner clarity:** Can a learner distinguish standard form, regional variant, register and irregularity?

## 6. Publication gates

An entry may move to **approved** only when all required gates pass:

| Gate | Pass condition | Failure action |
|---|---|---|
| Identity | Lexeme and sense are not ambiguously merged | Keep candidate / split records |
| Variety | Target variety is explicit and appropriate | Regional hold |
| Orthography | Source and display forms are traceable | Editorial hold |
| Meaning | Definition is independently authored and reviewed | Meaning review |
| Grammar | Every published grammatical claim has evidence status | Evidence hold |
| Examples | Authored or rights-cleared, contextual and editor-checked | Remove example / rights hold |
| Rights | Intended use is covered by documented permission/licence | Block publication |
| Editorial | Qualified Kurmanji-medium editor signs off | Editorial hold |
| Quality | No unresolved high-impact contradiction | Research hold |

No single overall “confidence score” should conceal a failed rights or variety gate. Rights clearance is a hard gate, not a weighted score.

## 7. Pilot protocol

Recommended first pilot: 20–30 entries from **one clearly defined variety and one documented source family**, with independent Academy-authored definitions and examples. This is a review-method pilot, not permission to copy source entries.

Pilot sequence:
1. Select candidate lemmas from independently authored course needs.
2. Record source discovery separately from source reuse.
3. Verify spelling and locality.
4. Split senses before writing definitions.
5. Verify principal parts and syntax claim by claim.
6. Record contradictions rather than smoothing them away.
7. Draft definitions and examples independently.
8. Complete rights review for every borrowed quotation or dataset element.
9. Obtain native Kurmanji editorial review.
10. Freeze the reviewed pilot and log all subsequent changes.

Measure pilot quality by proportion of claims with traceable evidence, proportion with independent corroboration, unresolved-issue rate, editorial correction rate, and rights-clearance completeness. Do not optimize for raw headword count.

## 8. Technical modelling note

OntoLex-Lemon is useful as an interoperability reference because it distinguishes lexical entries, forms and lexical senses; its documentation also describes how a lexical sense links an entry to a specific meaning/reference. It is a community specification/report, **not a W3C Standard or W3C Standards Track document**. The Academy may borrow the conceptual distinction without copying third-party lexical data or committing to RDF implementation.

The review sheet above remains a human editorial protocol. It does not prescribe database tables, SQL, JSON schema or runtime implementation.

## 9. References

- OntoLex Community Group, *Lexicon Model for Ontologies (lemon)*, community report: https://ontolex.github.io/ontolex/specification.html
- OntoLex final model specification, lexical sense and reference: https://www.w3.org/community/ontolex/wiki/Final_Model_Specification
- Creative Commons, CC BY-NC-SA 4.0 deed: https://creativecommons.org/licenses/by-nc-sa/4.0/
- Creative Commons, CC BY-NC-SA 4.0 legal code: https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode
- KurdishLexicography repository and its stated dataset licence: https://github.com/sinaahmadi/KurdishLexicography
- Ahmadi, Hassani & McCrae (2019), “Towards Electronic Lexicography for the Kurdish Language,” *eLex 2019*: https://elex.link/elex2019/wp-content/uploads/2019/10/eLex-2019_Proceedings.pdf

## 10. Project boundary

This is a documentation-only editorial protocol. It does not populate the lexicon, alter lesson text, implement a database schema, change SQL or migrations, modify seed/runtime/CI, access production data, alter PR #3, merge branches or deploy. All external lexical entries remain excluded until the individual rights and editorial gates are completed.
