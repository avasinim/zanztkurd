# Kurmanji Light Verbs kirin, bûn and dan — TAM, Agreement and Argument-Structure Audit — 2026-11-17

## Purpose and scope

This audit examines the three frequently used Kurmanji light verbs **kirin** ‘do/make’, **bûn** ‘be/become’ and **dan** ‘give’ as components of complex predicates. It focuses on how construction type affects argument structure, case, agreement, tense/aspect/mood (TAM), negation and causative interpretation.

The evidence is deliberately layered:
- Haig (2018) provides the Standard Kurmanjî grammatical sketch, common light-verb inventory, and the general present/past agreement contrast.
- Haig (2002) tests argument-sharing and incorporation analyses for noun+verb predicates and supplies construction-level examples.
- Gündoğdu's analysis of noun+verb complex predicates shows that some apparently intransitive LVCs still trigger past ergative alignment.
- Akin and Bouveret (2021) specifically investigate the polysemy, productivity and grammaticalization of **dan**, including light-verb and causative constructions.

This is documentation/research only, not approved lesson material. No code, course seed, database, schema, migration, CI, production environment or deployment is changed.

## 1. The light verb is not the whole predicate

Haig (2018, §2.6.6) identifies **kirin**, **bûn** and **dan** as the most commonly used light verbs in Kurmanjî. Examples include:
- **ava kirin** ‘build, establish’;
- **bawer kirin** ‘believe’;
- **fêm kirin** ‘understand’;
- **hez kirin** ‘like, love’;
- **şerm kirin** ‘be ashamed’;
- **nîşan dan** ‘show’;
- **bar kirin** ‘load, move house’;
- **dest pê kirin** ‘start, begin’.

These are not transparent combinations in which the light verb independently contributes a complete lexical event. The construction meaning and argument frame must be recorded as a unit, linked to the component lexemes.

## 2. kirin: different argument structures inside one formal family

Haig (2002) shows that N+kirin predicates do not all have the same syntax.

### 2.1 Incorporating predicates with an additional direct object

In some predicates, the non-verbal noun is incorporated into the complex predicate, and the construction can take an additional direct object. Haig gives **qebûl kirin** ‘accept’:
- **Ewî ez ... qebûl kirim** — ‘He accepted/welcomed me ...’.
- The additional direct object **ez** controls the person agreement on **kirim**; the nominal component **qebûl** does not.

Haig lists predicates such as **derman kirin** ‘treat’, **qebûl kirin** ‘accept’, **çap kirin** ‘publish’, **maç kirin** ‘kiss’, **fehm kirin** ‘understand’, **bar kirin** ‘move/carry’ among incorporating complex predicates. The lexical noun is not simply an ordinary direct object alongside another object.

### 2.2 Non-incorporating predicates with oblique/adpositional complements

Other predicates do not allow an additional direct object but license an adpositional complement. Haig's example:
- **Avukat ... li saetê mêze kir** — ‘The lawyer looked at the clock.’

Here **li saetê** is an adpositional complement. It does not control agreement as a direct object would. Haig places **hez kirin** ‘love/like’ and **mêze kirin** ‘look’ in this non-incorporating group.

### 2.3 A further distinction: possessive complements

Some constructions license a possessor associated with the nominal component. Haig's classification includes **alîkarî kirin** ‘help’, **deng kirin** ‘call’, **gazî kirin** ‘call’, **behs kirin** ‘mention/discuss’ and **telefon kirin** ‘phone’ in this group.

Editorial rule: never assign one transitivity value to all **kirin** LVCs. Store the complement frame at the level of the individual construction and sense.

## 3. Past TAM and ergative alignment: do not infer from the English gloss

In Standard Kurmanjî, Haig's general clause-level description is:
- in the present, transitive subjects are in the direct case and control person agreement;
- in past transitive clauses, the agent is oblique, the direct object is direct, and the verb agrees with the direct object;
- intransitive subjects remain direct and control agreement.

This general rule does not by itself decide whether the nominal component of an LVC is a direct object, an incorporated element, or a possessor-like constituent. The construction's internal analysis must be established first.

Haig's **qebûl kirin** example shows an additional direct object controlling past agreement, while **mêze kirin** takes an adpositional complement that does not control agreement. Gündoğdu's work further argues that some noun+transitive-light-verb predicates are underlyingly transitive even where the semantic English translation looks intransitive (for example, ‘work’, ‘make a fire’, ‘fast’, ‘speak’). In her analysis, the nominal element saturates the argument requirement of the light verb, and the complex predicate triggers ergative alignment in the past despite the lack of an independent direct object.

Therefore:
- Do not classify LVCs as intransitive solely because the translation has no overt patient.
- Do not identify the noun component as a direct object solely because it is nominal.
- Test past agreement, case marking, additional direct-object compatibility, adpositional complements, possessor complements and passive behavior separately.
- Record the specific analysis and its source; where analyses differ, preserve both with evidence status rather than forcing consensus.

## 4. bûn: copular, inchoative and light-verb uses must be separated

Haig translates **bûn** as ‘be, become’ and includes it among the most frequent light verbs. A single dictionary gloss is insufficient to unify all its uses.

At minimum, distinguish:
1. **Copular use**: bûn supplies finite person/tense/mood morphology to a non-verbal predicate. Haig's sketch shows present non-verbal predicates with copular person markers and notes that past or subjunctive non-verbal predicates require the appropriate form of **bûn**.
2. **Inchoative/change-of-state use**: the predicate denotes becoming or entering a state. This must be recorded with its own sense and argument frame.
3. **N+ bûn complex predicate**: the non-verbal component and bûn jointly form a lexicalized predicate. The nominal component must be checked for its syntactic and semantic role.
4. **Borrowed or contact-derived non-verbal + bûn combinations**: Gündoğdu's examples include **sağ bûn** ‘heal/get well’ and Turkish participle + bûn formations. These should be tagged with variety/register/source, not generalized as standard productive forms without corpus evidence.

Do not treat every occurrence of finite **bûn** as a light verb. In a clause such as **ez xwendekar im** (‘I am a student’), the copula is grammatical predicate support, not automatically an LVC lexical entry.

## 5. dan: lexical ‘give’, light verb, and causative auxiliary are distinct construction types

Akin and Bouveret (2021, pp. 223–243) specifically examine the grammaticalization of **dan** in Kurmanji. Their chapter distinguishes two major domains:
- **light-verb constructions**;
- **causative constructions**, including three types.

Their outline explicitly includes:
- **dan + kirin + infinitive** causative;
- simple **dan + infinitive** causation;
- double causation with **dan + causative morpheme** and **dan + V-and** in transitive/intransitive alternation;
- a complex construction where light-verb and causative structures overlap.

This establishes that **dan** cannot be represented as one undifferentiated ‘give’ verb in a learner lexicon. The full verb ‘give’, a light-verb use, and an auxiliary/causative use require separate construction records, even when historically or synchronically related.

Haig's inventory includes **nîşan dan** ‘show’ and **dest avêtin** ‘reach for, begin’; the first should be stored as a complex predicate with dan, while the latter requires its own lexical analysis and must not be automatically treated as a dan construction.

The accessible publisher record gives the chapter's abstract and section outline, but not the complete paradigms or corpus examples. Accordingly, this audit does not invent full conjugations or claim a complete list of the three causative patterns. Exact forms must be transcribed from the full chapter or verified corpus examples before learner use.

## 6. TAM and negation: attach morphology to the finite verbal head, then test the construction

For Standard K., Haig describes present indicative **di-**, present subjunctive **bi-**, negative indicative **na-**, and negative subjunctive **ne-**. Past simple forms use the past stem and agreement; past progressive uses **di-**; both simple and progressive past are negated with **ne-** (e.g. **ne-hatin**, **ne-di-hatin**).

For an LVC, this general pattern is a starting hypothesis, not a substitute for checking the construction:
- identify which component bears finite agreement;
- determine whether the nominal component is incorporated, argument-sharing, or an independent constituent;
- identify whether a given **dan** is a full lexical verb, light verb, or causative auxiliary;
- verify prefix placement where a preverb or lexicalized non-verbal component is present;
- test present, past, subjunctive, imperative, negative and causative forms separately.

The negation prefix belongs to the finite verbal morphology. It should not be attached mechanically to the nominal component. Where a causative auxiliary construction contains more than one verbal element, the scope and placement of negation must be confirmed from actual examples rather than inferred from the simple LVC pattern.

## 7. Construction record template

For every **kirin**, **bûn** or **dan** predicate, record:

1. Construction lemma and sense ID.
2. Exact source spelling and normalized Hawar form in separate fields.
3. Non-verbal component and its lexical category.
4. Light verb / copula / lexical verb / causative auxiliary classification.
5. Finite verbal head and its present/past stem.
6. Construction-specific valency: no complement, direct object, adpositional complement, possessor, causee, or unresolved.
7. Present and past case frames, including oblique agent and direct patient where applicable.
8. Person/number agreement controller in each attested frame.
9. TAM forms: indicative, subjunctive, imperative, simple past, progressive, perfect and future only where attested.
10. Negative forms and scope, with prefix segmentation.
11. Causative structure and number of causation layers where relevant.
12. Variety, locality, register and corpus provenance.
13. Source page/example/table, transcription verification and confidence.
14. Native-editor review and any unresolved competing analysis.

## 8. Quality-control tests before any learner content is authored

- **Argument test:** Does the construction allow an additional direct object? If yes, does that object control agreement?
- **Adposition test:** Is the complement introduced by **li**, **ji**, **bi** or another adposition? Does it fail to control agreement?
- **Possessor test:** Is the participant encoded inside the non-verbal component's noun phrase?
- **Past alignment test:** Does the agent become oblique and the patient control agreement? Does the LVC trigger ergativity despite lacking an independent object?
- **Passive test:** Can the nominal component become the subject of a passive with **hatin + infinitive**? Gündoğdu's study uses passive behavior as a diagnostic for incorporation/argument status.
- **Finite-head test:** Which verbal element carries person agreement and TAM?
- **Causative test:** Is **dan** the lexical verb ‘give’, a light verb, or an auxiliary in a causative construction?
- **Variety test:** Are the forms from Standard K., Behdînî, Şemzînan, Western Kurmanjî, or another explicitly named variety?

A construction remains **unresolved** if these diagnostics are unavailable or contradictory. It must not be promoted to a high-confidence learner paradigm.

## 9. Sources

1. Geoffrey Haig (2018), “Northern Kurdish (Kurmanjî)”, §2.6.6 (light-verb inventory), §2.6.1 (TAM and agreement), §2.7 (ergative construction), in *The Languages and Linguistics of Western Asia*. University of Bamberg PDF:
   https://www.uni-bamberg.de/fileadmin/aspra/06_Team/Publications_and_CV/haig_2018_ch.2.3_northern_kurdish.pdf
2. Geoffrey Haig (2002), “Noun-plus-verb complex predicates in Kurmanjî Kurdish: Argument sharing, argument incorporation, or what?”, *Sprachtypologie und Universalienforschung* 55(1), pp. 15–48. DOI: https://doi.org/10.1524/stuf.2002.55.1.15. University of Bamberg full text:
   https://extern.fis.uni-bamberg.de/files/5f8631d6-c40d-4dd6-ad7c-c4914cc079ab/fisba92514.pdf
3. Songül Gündoğdu, “Noun-Verb Complex Predicates in Kurmanji: A Syntactic Account”, *Proceedings of ConSOLE XXIII*. Used for the analysis of unergative complex predicates, incorporated nominal elements, ergative alignment and passive diagnostics:
   https://www.academia.edu/7519257/Noun_Verb_Complex_Predicates_in_Kurmanji_A_Syntactic_Account_Proceedings_of_ConSOLEXXIII_
4. Salih Akin and Myriam Bouveret (2021), “Grammar in usage and grammaticalization of dan ‘give’ constructions in Kurmanji Kurdish”, in *Give Constructions across Languages*, Constructional Approaches to Language 29, pp. 223–243. DOI: https://doi.org/10.1075/cal.29.09aki. Publisher abstract and section outline:
   https://www.benjamins.com/catalog/cal.29.09aki

## Change boundary

Documentation only. No existing lesson or course content, course seed, code, schema, migration, CI workflow, production database, PR, default branch or deployment was changed. The dan causative section is explicitly a research map, not a complete paradigm or learner-ready explanation.
