# Kurmanji Passive, Middle and Anticausative — Diagnostic Boundaries and Evidence Audit — 2026-11-17

## 1. Purpose and scope

This is a documentation-only source audit for the fully Kurmanji-medium pathway. It distinguishes:
- canonical periphrastic passive;
- middle/event-centered constructions;
- anticausative/inchoative alternations;
- lexical intransitivity and labile/ambitransitive verbs.

It is not learner-facing content and does not authorize edits to lessons, seed data, code, schema, migrations, CI, production database, PR #3, main, or deployment.

## 2. Secure baseline: canonical Kurmanji passive

The core Kurmanji passive is periphrastic: a finite form of **hatin** ‘come’ combines with the infinitive of a transitive lexical verb. Haig (2004, §4.3.1.4, pp. 90–91) describes the active syntactic subject as suppressed and the active object (O) as advancing to passive subject position.

Haig's paired examples:
- Active present: **em vê avê vedixwin** — ‘We (can) drink this water’.
- Passive present: **ev av tê vexwarin** — ‘This water is drunk / drinkable’.
- Active past: **me ev av vexwar** — ‘We drank this water’.
- Passive past: **ev av hat vexwarin** — ‘This water was drunk / drinkable’.

The passive subject is the patient/undergoer and is the argument whose promotion and agreement behavior must be analyzed. The lexical predicate remains infinitival. The construction applies to transitive predicates; it is not a general device for turning any intransitive verb into a passive.

## 3. Diagnostic contrast: passive vs middle vs anticausative

Do not classify a construction from its English translation alone. A sentence that translates naturally with English ‘is opened’, ‘is broken’, or ‘is cooked’ may describe different event structures.

### 3.1 Passive
A canonical passive has:
- a transitive lexical predicate in the active counterpart;
- an undergoer/patient promoted to the passive subject;
- an external agent suppressed from the core;
- finite **hatin** plus lexical infinitive;
- the possibility, in appropriate registers and constructions, of an overt agent phrase.

The agent phrase is optional, not obligatory. Haig's descriptions characterize agented passives as associated with formal press/written language and rare in natural spoken discourse. Later grammars record examples, so this is a register warning, not an absolute grammatical ban.

### 3.2 Middle
A middle construction profiles the event or the subject's involvement/affectedness without necessarily presenting an external agent as a syntactic participant. It can have a passive-like interpretation, but passive-like meaning is not enough to make it a passive.

The 2026 Bingöl & Altınkılıç article uses the optional licensing of an overt agent phrase as a structural diagnostic in its comparison of Kurmanji and Zazaki. Its abstract argues that a purported additional “passive” pattern in some Zazaki descriptions is better analyzed as an event-centered middle because it resists an overt agent phrase. The article also reports verb-class restrictions on middle alternations.

Editorial limitation: the abstract's Zazaki-specific reanalysis must not be imported as a Kurmanji suffix paradigm. Its relevant contribution here is the diagnostic question—does the construction independently permit an agent phrase?—not a claim that every Kurmanji middle has one fixed morphology.

### 3.3 Anticausative / inchoative
An anticausative describes a change of state affecting the subject without asserting an external causer as a syntactic argument. It commonly contrasts with a causative/transitive use, but the exact marking and lexical availability are language- and verb-specific.

For Kurmanji course design, do not assume:
- every transitive verb has an anticausative counterpart;
- every intransitive change-of-state verb is morphologically derived;
- a passive-like English gloss proves passive syntax;
- an anticausative marker from Garrusi, Sorani, Hawrami, or Zazaki is productive in Kurmanji.

The 2026 study of Garrusi Kurdish is explicitly about Garrusi patterns and cannot establish a Kurmanji suffix. Haig's Northern Group account remains the safer baseline for Kurmanji passive.

## 4. A practical diagnostic sequence

For each candidate example, answer these questions in order:

1. **Is there a transitive active counterpart with an identifiable object?** If not, do not label it canonical passive without further evidence.
2. **Is finite hatin present with the lexical infinitive?** If yes, this is strong evidence for the canonical Kurmanji passive construction.
3. **Does the subject correspond to the active object/patient?** Record the mapping explicitly.
4. **Can an external agent be added naturally?** Record the exact phrase and source. Do not invent an agent phrase merely to satisfy a test.
5. **Does the construction instead describe a spontaneous change of state?** If so, investigate anticausative/inchoative analysis.
6. **Does it profile an event or an affected participant while resisting an agent phrase?** Consider a middle analysis, but require Kurmanji-specific evidence.
7. **Is the form lexicalized or variety-specific?** Mark it as such; do not generalize a productive rule from one item.

No single diagnostic should be treated as infallible. The analysis should combine form, argument structure, event semantics, agent licensing, corpus context, and variety.

## 5. Complex predicates: do not infer transitivity from the verb alone

Haig (2002) shows that passive formation can apply to some noun-plus-verb complex predicates, but the argument structure of the whole predicate matters. His examples include passivization of **av dan** ‘irrigate’ and **derman kirin** ‘treat’. He flags a problematic **hezkirin** example because the predicate ordinarily takes a prepositional complement rather than a direct object.

Therefore:
- identify the argument structure of the entire complex predicate;
- distinguish a true direct object from a nominal component incorporated into the predicate;
- do not assume that a noun-plus-verb expression is passivizable because its light verb is transitive elsewhere;
- record exceptional, coordinated, or literary examples separately.

## 6. Variety firewall

The sources describe different Kurdish varieties and must remain separate:

| Source / variety | What it can support | What it cannot establish for Kurmanji |
|---|---|---|
| Haig's Northern Group / Kurmanji analysis | **hatin + infinitive** passive; argument promotion | A universal middle/anticausative suffix |
| Bingöl & Altınkılıç (2026), Kurmanji–Zazaki comparison | Agent-phrase diagnostic; reported Kurmanji/Zazaki comparison | Every Zazaki pattern as a Kurmanji pattern |
| Asadpour & Zarei (2026), Garrusi Kurdish | Garrusi passive/anticausative distinctions | Kurmanji morphology |
| Sorani descriptions | Sorani-specific synthetic passive descriptions | Kurmanji passive suffixes |

In particular, do not transfer Garrusi anticausative markers or Sorani **-ra/-re** to Kurmanji. The canonical Kurmanji passive remains the auxiliary construction unless direct Kurmanji evidence demonstrates another construction.

## 7. Evidence record required for every candidate form

Store the following fields before a form enters a lesson or paradigm:
- exact source form and normalized Hawar transcription (separate fields);
- source, page, example number, and stable URL;
- variety/locality and speaker/writer profile if known;
- genre/register (conversation, narrative, press, pedagogical grammar);
- active counterpart and its arguments, if attested;
- subject role: agent, patient, experiencer, theme, or uncertain;
- transitivity and valency frame of the complete predicate;
- presence/absence and form of finite **hatin**;
- lexical verb form (infinitive or other);
- agent phrase: exact form, interpretation, and acceptability evidence;
- event type: causative, spontaneous change, event-centered middle, or unresolved;
- whether morphology is productive, lexicalized, or unknown;
- independent native-editor review status.

Suggested analysis labels:
- **canonical_periphrastic_passive**;
- **middle_candidate**;
- **anticausative_candidate**;
- **lexical_intransitive**;
- **complex_predicate_argument_structure_pending**;
- **variety_transfer_not_permitted**;
- **native_review_pending**.

## 8. Pathway B editorial policy

1. Teach canonical **hatin + infinitive** as the core passive.
2. Teach agentless examples first; treat agent phrases as optional and register-sensitive.
3. Do not introduce a productive Kurmanji anticausative suffix on the basis of Garrusi, Sorani, or Zazaki data.
4. Introduce middle voice only after Kurmanji-specific examples and diagnostics are independently verified.
5. Keep passive, middle, and anticausative examples in separate comparison sets; include active counterparts where available.
6. Do not use English translation as the sole grammatical label.
7. Do not create a full paradigm from one lexical item or one literary example.
8. Require native Kurmanji editorial review for naturalness, locality, and register before learner exercises are authored.

## 9. Findings

- The canonical Kurmanji passive is securely supported as finite **hatin + lexical infinitive**, with an active object promoted to passive subject.
- Passive-like meaning does not establish passive syntax.
- Agent-phrase availability is a useful diagnostic, but it must be evaluated with register and source context.
- Middle and anticausative labels require Kurmanji-specific evidence; do not transfer suffixes across varieties.
- Complex predicates must be analyzed for their own valency and direct-object status before passive formation.
- The 2026 Kurmanji–Zazaki article is valuable as a current diagnostic framework, while the Garrusi paper is comparative background only—not direct Kurmanji morphological evidence.

## 10. Sources

1. Geoffrey Haig (2004), *Alignment in Kurdish: a diachronic perspective*, §4.3.1.4, pp. 90–91. https://agorism.dev/book/kurdish/new/Haig%20Geoffrey%20L.J.%20-%20Alignment%20in%20Kurdish_%20a%20diachronic%20perspective.pdf
   - Northern Group passive: **hatin + infinitive**, transitivity restriction, argument promotion, agentless examples.
2. Geoffrey Haig (2002), “Noun-plus-verb complex predicates in Kurmanjî Kurdish: Argument sharing, argument incorporation, or what?”, *STUF* 55(1), pp. 15–48. https://doi.org/10.1524/stuf.2002.55.1.15
   - Passive of complex predicates; direct-object restriction; agented passive register.
3. İbrahim Bingöl & Ümran Altınkılıç (2026), “Middle Voice in Kurmanji and Zazaki”, *Revista Cultura Científica*, Issue 24, pp. 190–197, published 27 April 2026. https://revistasjdc.com/2026-issue-24/middle-voice-in-kurmanji-and-zazaki/
   - Agent phrase as diagnostic; Kurmanji/Zazaki comparison; verb-class restrictions on middle alternations. Abstract-level evidence reviewed; full examples require page-level review before teaching.
4. Asadpour & Zarei (2026), “Corpus and Experimental Analysis of Passive Structures in Garrusi Kurdish”, *Languages* 11(4), 63. https://doi.org/10.3390/languages11040063
   - Garrusi-only passive and anticausative distinctions; explicitly not a Kurmanji suffix source.
5. Universal Dependencies, Northern Kurdish (kmr) overview. https://universaldependencies.org/kmr/index.html
   - Identifies **hatin** as passive auxiliary combining with lexical infinitive; descriptive computational reference.

## Change boundary

Documentation only. No course lesson, seed data, code, schema, migration, CI, production database, PR #3, main branch, or deployment was changed.
