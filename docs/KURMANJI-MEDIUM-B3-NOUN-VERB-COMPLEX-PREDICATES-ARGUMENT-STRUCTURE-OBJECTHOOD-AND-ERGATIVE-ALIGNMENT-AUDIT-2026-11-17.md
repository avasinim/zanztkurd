# Kurmanji Noun + Verb Complex Predicates — Argument Structure, Objecthood, Valency and Ergative Alignment Audit — 2026-11-17

## 1. Scope and editorial status

This source-critical note audits Kurmanji noun + verb (N+V) complex predicates (CPs), especially the syntactic status of the noun element, argument realization, lexical versus clausal transitivity, and the interaction with past-tense ergative alignment.

The evidence base is deliberately separated:
- Haig (2002; republished in the University of Bamberg repository in 2023): broad Kurmanji corpus-based analysis, with a proposed distinction between incorporating, saturated, adpositional-complement and possessor-complement CPs.
- Gündoğdu (2016): a syntactic analysis explicitly based on the Muş dialect of Kurmanji, including a proposal that N+V CPs pattern like unergatives and that the N element is not a true direct object.

The two analyses must not be flattened into one universal rule. Their data, theoretical assumptions and diagnostic emphasis differ. This document is research documentation only; it does not modify lessons, course inventory, code, seed, CI, schema, migrations, databases, production, PRs, deployment or main.

## 2. Source-attested N+V predicates

Haig's list of established predicates includes (among others):

| Predicate | Meaning | Light verb | Haig's broad structural note |
|---|---|---|---|
| **alîkarî kirin** | help | kirin | possessor-complement type |
| **av dan** | irrigate / water | dan | incorporating type |
| **bang kirin** | call | kirin | N+V CP |
| **bar kirin** | load; move house | kirin | N+V CP; sense-sensitive |
| **bawer kirin** | believe | kirin | incorporating type |
| **behs kirin** | talk about, mention | kirin | N+V CP |
| **çap kirin** | publish | kirin | incorporating type |
| **derman kirin** | treat medically | kirin | incorporating type |
| **fahm/fêm kirin** | understand | kirin | incorporating type |
| **gazî kirin** | call | kirin | N+V CP |
| **guhdar(î) kirin** | listen | kirin | N+V CP |
| **hez kirin** | like, love, be fond of | kirin | adpositional-complement type |
| **maç kirin** | kiss | kirin | incorporating type |
| **mêze kirin** | look at, watch | kirin | adpositional-complement type |
| **nişan dan** | show | dan | hybrid: possessor expansion plus direct object |
| **qebûl kirin** | accept | kirin | incorporating type |
| **şerm kirin** | be ashamed | kirin | saturated type |
| **xwedî kirin** | bring up, raise | kirin | incorporating type |
| **can dan** | die | dan | saturated type |

This is a selection, not a complete lexicon. Haig reports that the commonest light verb in the N+V inventory is **kirin**, and that complex predicates are restricted to a relatively small set of light verbs. The meaning is often partly predictable from the noun, while the light verb's semantic contribution is comparatively underspecified. The individual predicates nevertheless differ in idiomaticity and argument structure.

## 3. Why the noun is not automatically a direct object

A noun immediately before **kirin** may superficially resemble an object. Haig tests that appearance against several diagnostics:
- whether the noun can take oblique case;
- whether it accepts the indefinite suffix **-ek**;
- whether it can be expanded by adjectives or quantifiers;
- whether it controls verbal agreement in past transitive clauses;
- whether it can become the subject of a passive;
- whether an additional direct object can co-occur.

For several predicates the nominal element resists ordinary object behavior. Haig notes, for example, that the N in **bawer kirin** does not behave like a freely case-marked, indefinite, modifiable object. In passive examples involving **avdan**, **hezkirin** and **dermankirin**, the nominal element does not itself become the passive subject. The passive construction uses **hatin** plus the infinitive of the predicate.

The orthographic joining of N and V in some examples (e.g. **hezkirin**, **dermankirin**) is an observed writing convention in the cited text; it is not sufficient by itself to prove a single morphological analysis or to impose joined spelling on all N+V combinations.

## 4. Four structural types in Haig's analysis

### 4.1 Incorporating CPs

Haig uses “incorporating” in a specifically syntactic sense: the N lacks independent argument status in the clause, allowing the complex predicate to govern an additional direct object. It does **not** mean that the noun stem is morphologically fused into the verb.

Examples listed by Haig include:
- **derman kirin** ‘treat’;
- **qebûl kirin** ‘accept’;
- **nişan dan** ‘show’;
- **çap kirin** ‘publish’;
- **av dan** ‘irrigate’;
- **xwedî kirin** ‘bring up’;
- **maç kirin** ‘kiss’;
- **fêm kirin** ‘understand’;
- **bar kirin** ‘move/carry’.

The key diagnostic is the availability of a separate direct object. In **maç kirin**, for example, the kissed body part (e.g. the hand) is the direct object; **maç** is not itself analyzed as that object. In **qebûl kirin**, the accepted person can be the direct object, and agreement is associated with that object rather than the N element.

Haig stresses that this Kurdish type remains transitive: it does not show the familiar cross-linguistic pattern where noun incorporation makes a transitive verb intransitive. His term “syntactic incorporation” refers to the N's loss of independent argument status.

### 4.2 Saturated CPs

These CPs need no additional core argument: the N element satisfies the predicate's participant requirements, and the whole expression denotes a single-participant event or state.

Examples:
- **baz dan** ‘run away; jump’;
- **şerm kirin** ‘be embarrassed’;
- **xwey dan** ‘sweat’;
- **can dan** ‘die’.

An event can therefore be semantically one-participant even though its light verb is lexically transitive and may show the transitive alignment pattern. This is a crucial distinction: semantic participant count, syntactic direct-object availability and lexical transitivity are not interchangeable labels.

### 4.3 Adpositional-complement CPs

Some CPs select an additional argument expressed as a PP. Haig's examples include:
- **mêze kirin** ‘look at’, with **li** ‘at’;
- **hez kirin** ‘like/love’, with **ji** ‘from’.

The PP is analyzed as an argument of the entire complex predicate, not merely a modifier inside the noun phrase. Haig supports this with constituent behavior, including coordination and separation of the PP from the nominal element. These predicates must not be taught as if the PP were an optional generic location adjunct.

### 4.4 Possessor-complement CPs

Some CPs require an additional participant expressed as a possessor linked to the N. Haig's example is **alîkarî kirin** ‘help’. The person helped is expressed through the possessive/linking structure associated with the nominal element, rather than being assumed to be a canonical direct object.

Haig also treats **nişan dan** ‘show’ as a hybrid: the N can be expanded with a possessor and the predicate can still take an additional direct object.

## 5. Lexical transitivity versus clausal/syntactic transitivity

Haig explicitly distinguishes:
- **lexical transitivity**: a property of the governing verb/predicate's lexical specification, diagnosed in Kurmanji partly through tense-sensitive alignment;
- **syntactic transitivity**: whether the clause can license a direct object NP.

These dimensions do not always match. A CP may express a semantically intransitive event and have no ordinary direct object, yet its light verb remains lexically transitive and triggers the alignment pattern associated with transitive predicates in the past.

For Haig's canonical past-tense ergative construction:
- A (transitive subject) is oblique;
- O (direct object) is absolute;
- the verb agrees in person/number with O.

Haig also cautions that actual dialectal/textual examples may depart from the canonical pattern; in his corpus the oblique marking of A is the feature shared most consistently by the ergative constructions he surveys. Accordingly, teaching materials must not reduce the whole system to a simplistic formula that every past-tense transitive has one invariant case-and-agreement shape.

## 6. Gündoğdu's Muş analysis: a distinct proposal

Gündoğdu (2016) explicitly studies N+V CPs in **Muş Kurmanji**. Her central claims are:
1. N+V CPs in the relevant class are comparable to unergative predicates in the Hale & Keyser framework;
2. their underlying structure is analyzed as transitive, with an agentive light verb selecting for or incorporating into its nominal element;
3. the N element is not a true direct object, even though it appears to satisfy the predicate's semantic/argument requirements;
4. the nominal element's objecthood status differs from that of an ordinary direct object.

Her paper contrasts the Muş data with deadjectival and locational/PP patterns. It proposes that the noun-only unergative CP group differs from adjective-, particle- and PP-containing predicates, which in her account often display intransitive/transitive alternations.

This is a dialect-specific analysis and a theoretical proposal. It should be cited as such, not silently generalized to every Kurmanji variety or treated as a settled consensus that overrides Haig's broader corpus-based structural typology.

## 7. A practical diagnostic sequence for lexical records

For each N+V candidate, the editorial record should answer:

1. **Attestation:** Is the exact form found in a named source? Give page/example and source variety where available.
2. **Lexical meaning:** Is the meaning compositional, partly predictable or strongly idiomatic?
3. **Light verb:** Is the verb **kirin**, **dan**, or another attested verb? Do not infer a productive inventory.
4. **N status:** Does the N take ordinary case, indefiniteness, modifiers or quantifiers?
5. **Additional object:** Can a separate direct object occur? If yes, does it control agreement in the relevant past construction?
6. **Complement type:** Is another participant encoded as a direct object, PP argument, possessor complement or not at all?
7. **Alignment:** Record present and past evidence separately; do not infer past alignment from an English gloss.
8. **Passivization:** Is there an attested passive? Identify which participant becomes subject; do not assume the N becomes subject.
9. **Dialect and register:** Keep Muş, Cizre/Botan-based standard, Behdinî and other local evidence distinct.
10. **Orthography:** Preserve the source form; record joined/separate spelling as a source convention, not a universal rule.

## 8. Teaching and editorial decisions

- Teach N+V CPs as lexical constructions with individual meanings and argument frames, not as a free rule “noun + do = verb”.
- Introduce **kirin** and **dan** as frequent light verbs, but do not imply they are interchangeable.
- Distinguish the N element from a direct object. A following participant may be the actual direct object, a PP argument, or a possessor complement depending on the lexical predicate.
- Explain lexical transitivity and syntactic transitivity separately before introducing past-tense ergative alignment.
- Do not classify **can dan** ‘die’ or **şerm kirin** ‘be ashamed’ as syntactically transitive merely because their light verbs are lexically transitive.
- Do not mark **hez kirin** or **mêze kirin** as taking a bare direct object when the source specifies a PP complement.
- Treat Gündoğdu's Muş analysis as a dialect-labelled research perspective and seek independent native-speaker review before making it the target-standard teaching account.
- Do not generate sample paradigms, case forms, passive examples or dialect variants not directly supported by inspected evidence.
- No existing lesson text or course data is changed by this audit.

## 9. Sources and limitations

1. Haig, Geoffrey. 2002. “Noun-plus-verb complex predicates in Kurmanjî Kurdish: Argument sharing, argument incorporation, or what?” *Sprachtypologie und Universalienforschung (STUF)* 55(1), 15–48. DOI: https://doi.org/10.1524/stuf.2002.55.1.15. Full author/institutional copy: https://fis.uni-bamberg.de/entities/publication/541fc7e7-8238-4c1c-a137-1a447afb71a4. Relevant sections: §3.2 (lexical/syntactic transitivity and alignment), §4 (N+V structures), §4.1–4.3 (incorporating, saturated, adpositional-complement and possessor-complement types).
2. Gündoğdu, Songül. 2016. “Noun-Verb Complex Predicates in Kurmanji: A Syntactic Account.” *Proceedings of ConSOLE XXIII*. Public full-text record: https://www.academia.edu/7519257/Noun_Verb_Complex_Predicates_in_Kurmanji_A_Syntactic_Account_Proceedings_of_ConSOLEXXIII_. The paper explicitly identifies its data as Muş Kurmanji. The present audit relies on the published paper's abstract, argument-structure discussion and displayed examples; it does not claim a pan-dialectal survey.
3. Haig, Geoffrey. 2018. “Northern Kurdish (Kurmanjî).” In *The Languages and Linguistics of Western Asia*. This chapter describes the Cizre/Botan-based written standard and the range of dialectal variation. https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf.

Access limitation: Haig's 2002 paper is fully available and was inspected. Gündoğdu's paper was available through its public full-text record and indexed extracts; any fine-grained claims not independently checked against its complete page sequence should remain provisional. No new fieldwork or elicitation was conducted.

## 10. Conclusion

Kurmanji N+V complex predicates are not a single uniform syntactic class. Haig's analysis distinguishes at least incorporating, saturated, adpositional-complement and possessor-complement structures, with the noun's objecthood varying by predicate. Gündoğdu's Muş study offers a distinct account of noun-only predicates as underlyingly transitive/unergative-like structures whose nominal element is not a true direct object. Both sources support the editorial principle that the noun's surface position alone cannot identify its grammatical function.

**Decision:** record N+V predicates individually with source, dialect, lexical sense, complement frame, transitivity diagnostics and alignment evidence. Teach no blanket noun + light verb rule, and do not conflate lexical transitivity with clause-level direct-object behavior.
