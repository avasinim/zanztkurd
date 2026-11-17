# Kurmanji Complex Predicates and Light-Verb Constructions — Argument Structure and Editorial Classification Audit — 2026-11-17

## Purpose and scope

This audit establishes an evidence-aware classification for Kurmanji complex predicates (CPs), especially light-verb constructions (LVCs). It distinguishes noun+verb, adjective+verb, particle+verb, and prepositional-phrase+verb patterns; it also records why the non-verbal element cannot automatically be treated as either an ordinary object or an incorporated morpheme.

Primary sources:
- Geoffrey Haig (2002), “Noun-plus-verb complex predicates in Kurmanjî Kurdish: Argument sharing, argument incorporation, or what?”, pp. 15–48.
- Geoffrey Haig (2018), “Northern Kurdish (Kurmanjî)”, §2.6.6.
- Memduh Gökırmak and Francis M. Tyers (2017), “A Dependency Treebank for Kurmanji Kurdish”, §5.5.

This is research documentation only. No lesson text, seed, code, database, schema, migration, CI or deployment is changed.

## 1. Why “light verb” is not a single complete analysis

Haig (2002) defines the central issue of noun+verb complex predicates as follows: two recognizable lexical items can behave in many respects like a single predicate, but the syntactic status of the noun and its contribution to argument structure are not uniform.

Haig tests two broad analyses:
- **Argument sharing:** both the noun and the verb contribute to the clause's argument structure.
- **Incorporation:** the non-verbal element is incorporated into the verbal complex and does not independently assign an argument.

His conclusion is explicitly non-uniform: argument sharing explains a subset of Kurdish N+V predicates; incorporation is more adequate for a particular type; neither analysis explains the entire range. Consequently, the Academy must not encode every LVC with one universal syntactic template.

## 2. Surface categories of complex predicates

Haig's taxonomy distinguishes the category of the non-verbal component:

| Type | Source examples | Initial classification |
|---|---|---|
| Particle + verb | **der-ketin** “go out”; **ve-xwarin** “drink” | Preverb/particle verb |
| Adjective + verb | **pîroz kirin** “celebrate” | Adjective + light verb |
| Noun + verb | **av dan** “irrigate”; **alîkarî kirin** “help” | Noun + verb complex predicate |
| Prepositional phrase + verb | PP-based predicates discussed in the broader Kurmanji CP literature | Keep as a separate construction pending lexical evidence |

Haig also cautions that boundaries are not always clear: **çê** in **çêkirin** and **çêbûn** has an adjectival history (“good, whole”) but functions as a preverb in these predicates. Historical category, present-day distribution and synchronic editorial label should therefore be stored separately.

## 3. Noun + verb: subtypes according to argument structure

Haig (2002, §4.3.1) distinguishes non-incorporating CPs by the type of additional complement they require. His table separates:

### A. Saturated complex predicates
These do not require an additional complement in the cited analysis:
- **şerm kirin** — “be embarrassed”;
- **baz dan** — “jump, spring”;
- **xwey dan** — “sweat”.

### B. Adpositional-complement predicates
These require an additional argument introduced by an adposition:
- **hez kirin** — “love, like”;
- **mêze kirin** — “look”;
- **guhdarî kirin** — “listen”;
- **bawer kirin** — “believe”;
- **qal kirin** — “discuss”.

### C. Possessor-complement predicates
These require a possessor linked to the nominal component:
- **alîkarî kirin** — “help”;
- **deng kirin** — “call”;
- **gazî kirin** — “call”;
- **behs kirin** — “mention, discuss”;
- **telefon kirin** — “phone”.

Haig's example for **alîkarî kirin** shows the beneficiary/recipient as a possessor inside the nominal phrase headed by **alîkarî**. It is not automatically an independent argument of the verb **kirin**. This is a crucial difference from adpositional complements that function as arguments of the whole complex predicate.

The categories are analytical groupings, not immutable lexical truths. Haig explicitly notes intermediate forms and cross-dialectal variation.

## 4. A nominal component may be discontinuous from its light verb

The Kurmanji dependency-treebank paper by Gökırmak and Tyers (2017, §5.5) annotates light-verb constructions with the dependency relation **compound:lvc**. It gives **Min bêriya te kiriye** (“I missed you”, literally “I did a before of you”) as an example in which an argument occurs between the nominal component and the light verb.

The paper also describes **şermezar kirin** (“condemn”, literally “shame do”) as a light-verb construction whose predicate takes a direct object.

Editorial consequences:
- Do not assume that the two lexical components must be adjacent in every finite clause.
- Do not tokenize every multiword predicate as two unrelated words simply because a constituent can intervene.
- Do not assume that the nominal component always has the same case or argument status.
- A treebank relation such as **compound:lvc** is a useful annotation convention, not proof that all LVCs share one syntactic derivation.

## 5. Light verbs and semantic contribution

Haig (2018, §2.6.6) identifies **kirin** (“do, make”), **bûn** (“be, become”) and **dan** (“give”) as the most commonly used light verbs in Kurmanjî. His illustrative inventory includes:
- **ava kirin** — build, establish;
- **bang kirin** — call;
- **alî(karî) kirin** — help;
- **bawer kirin** — believe;
- **fêm kirin** — understand;
- **şerm kirin** — be ashamed;
- **ji bîr kirin** — forget;
- **guhdarî kirin** — listen;
- **xwedî kirin** — bring up, raise;
- **bar kirin** — load / move house;
- **hez kirin** — like, love;
- **dest pê kirin** — start, begin;
- **nîşan dan** — show;
- **dev jê berdan** — leave alone, cease doing.

The light verb may contribute broad event, valency or grammatical information while the non-verbal component carries much of the lexical meaning. But this division varies by construction. For example, do not infer that **kirin** always means the same thing or that every noun+kirin combination is semantically predictable from its parts.

## 6. Distinguish particle verbs from nominal light-verb predicates

A particle verb such as **der-ketin** (“go out”) belongs to a different surface category from a nominal predicate such as **bawer kirin** (“believe”). They may both form a complex predicate, but their morphology and lexicalization differ.

Haig (2002) proposes a broad historical trajectory from particle+verb to adjective+verb to noun+verb constructions. This is a diachronic proposal, not a synchronic rule for classifying every current lexical item. The Academy must not use the historical hypothesis to infer the present-day syntactic category of an individual lexeme.

For particle verbs, retain:
- source infinitive spelling;
- preverb/particle identity;
- inflected forms and prefix placement;
- whether the source treats the form as a lexicalized verb;
- variety and locality.

For nominal LVCs, retain:
- nominal component and its lexical sense;
- light-verb lemma;
- construction sense;
- complement type and argument realization;
- attested discontinuity and linking morphology;
- variety and source.

## 7. Recommended lexical data model (conceptual only)

Each complex predicate should be represented as a construction record linked to, but not collapsed into, its component lexemes.

Minimum fields:
1. construction ID and normalized headword;
2. source-attested surface form(s), with orthography preserved;
3. component lexemes and their independent senses;
4. component category: noun, adjective, particle/preverb, PP, uncertain;
5. light-verb or lexical-verb identity;
6. construction meaning and sense-specific usage;
7. argument structure: saturated, adpositional complement, possessor complement, direct object, or unresolved;
8. case, adposition, ezafe/linking morphology and agreement evidence;
9. whether components can be discontinuous in finite clauses;
10. inflectional and negation placement;
11. dialect/variety and locality;
12. source citation, page, example number and verification method;
13. editorial normalization separated from source spelling;
14. native-editor review status.

Do not infer intransitivity from the absence of a complement in one citation. Do not infer transitivity solely from an English translation. Argument structure must be established from the Kurmanji construction and its attested clause frames.

## 8. Evidence quality and limitations

- Haig (2002) provides detailed analysis of N+V CPs and explicitly rejects a single account for all constructions.
- Haig (2018) provides a concise inventory of frequent light verbs and examples, but its list is illustrative rather than an exhaustive dictionary.
- Gökırmak and Tyers (2017) offer a practical dependency-annotation treatment and document discontinuity, but a treebank annotation convention should not be treated as a complete theoretical account.
- Haig's discussion includes traditional literary examples and cross-dialectal evidence. Each lexical record must retain its source variety; forms should not be silently standardized into a single Hawar spelling without editorial review.
- The category of borderline items such as **çê-** may be synchronically ambiguous. Mark uncertainty rather than forcing a category.

## 9. Sources

1. Geoffrey Haig (2002), “Noun-plus-verb complex predicates in Kurmanjî Kurdish: Argument sharing, argument incorporation, or what?”, *Sprachtypologie und Universalienforschung* 55(1), pp. 15–48. DOI: https://doi.org/10.1524/stuf.2002.55.1.15. University of Bamberg full text: https://extern.fis.uni-bamberg.de/files/5f8631d6-c40d-4dd6-ad7c-c4914cc079ab/fisba92514.pdf
2. Geoffrey Haig (2018), “Northern Kurdish (Kurmanjî)”, §2.6.6, in *The Languages and Linguistics of Western Asia*. PDF: https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf
3. Memduh Gökırmak and Francis M. Tyers (2017), “A Dependency Treebank for Kurmanji Kurdish”, *Proceedings of the Fourth International Conference on Dependency Linguistics (Depling 2017)*, pp. 64–72. PDF: https://aclanthology.org/W17-6509.pdf
4. Songül Gündoğdu, “Noun-Verb Complex Predicates in Kurmanji: A Syntactic Account”, *Proceedings of ConSOLE XXIII*. Consulted for the distinction between particle/preverb constructions and N+V predicates, including prefix placement: https://www.academia.edu/7519257/Noun_Verb_Complex_Predicates_in_Kurmanji_A_Syntactic_Account_Proceedings_of_ConSOLEXXIII_

## Change boundary

Documentation only. No existing lesson, course seed, application code, schema, migration, CI workflow, production database, PR, default branch or deployment was changed. This document is not learner-facing content and does not approve any particular dialect or orthographic policy.
