# Kurmanji Passive Agent Phrases — Register, Case, Agreement and Argument Mapping Audit — 2026-11-17

## 1. Purpose and scope

This document isolates the optional expression of the agent in the Kurmanji periphrastic passive. It builds on the canonical analysis **finite hatin + lexical infinitive**, but focuses on:
- agentless vs agented passive;
- attested agent phrases such as **bi destê ...** and **ji aliyê ... ve**;
- register and dialect limitations;
- promoted object, direct case and agreement on **hatin**;
- the interaction of passivization with complex predicates.

This is a source audit, not learner-facing lesson text. It does not alter course lessons, seed data, code, schema, migrations, CI, production database, PR, main branch or deployment.

## 2. Canonical passive and argument mapping

Haig (2004, §4.3.1.4, pp. 90–91) describes the Northern Group passive as a construction based on **hatin** ‘come’ plus the infinitive of a transitive verb. The active syntactic subject is deleted, and the active direct object (O) advances to the passive subject position.

The paired examples in Haig:
- Active present: **em vê avê vedixwin** — ‘We (can) drink this water’.
- Passive present: **ev av tê vexwarin** — ‘This water is drunk / drinkable’.
- Active past: **me ev av vexwar** — ‘We drank this water’.
- Passive past: **ev av hat vexwarin** — ‘This water was drunk / drinkable’.

The passive subject is in the direct form and controls person-number agreement on the finite auxiliary in the descriptive analysis of Gündoğdu Yücel (2018, §2.7.3). The lexical verb remains infinitival.

## 3. Agentless passive is the default evidence

The strongest descriptive baseline is agentless:
- the active A is omitted from the passive core;
- the promoted O is the passive subject;
- the clause does not need an overt agent phrase.

Haig (2004) explicitly notes that agented passives occur in the emergent language of the press, using a variety of adpositions, but are restricted to formal written language in the data he describes. Haig (2002) similarly says that agented passives had been introduced into emergent press language and were virtually non-existent in natural spoken discourse.

These statements should not be converted into an absolute ban: later descriptive work records agent phrases and cites earlier grammars. The correct editorial treatment is **marked and register-sensitive**, not “ungrammatical” and not “equally common in speech”.

## 4. Attested agent-phrase forms

Gündoğdu Yücel (2018, §2.7.3) lists two phrase types for expressing the agent:
- **bi destê ...** — literally ‘with/by the hand of ...’;
- **ji aliyê ...** — literally ‘from the side of ...’.

The thesis reproduces a passive example from Bedirxan & Lescot (2004, p.197):

**axa-yê me bi destê Mişo hatiy-e birîndar kirin**

Translation: ‘Our Agha has been wounded by Mişo.’

The clause contains:
- patient/passive subject: **axa-yê me** (‘our Agha’);
- agent phrase: **bi destê Mişo** (‘by the hand of Mişo’);
- finite auxiliary: **hatiy-e** (perfect form of ‘come’);
- lexical predicate: **birîndar kirin** (‘wound’).

This is an attested literary/descriptive example, not proof that the phrase is equally frequent or neutral in every spoken variety.

The teaching grammar *Kurmanji Kurdish Reader* (Deniz Ekici, 2007) gives **ji aliyê ... ve** as an equivalent of English ‘by’ and supplies examples such as:
- **Name ji aliyê wî ve tê şandin.** — ‘The letter is sent by him.’
- **Av ji aliyê me ve tê şandin.** — ‘The water is sent by us.’

Because this source is a pedagogical grammar and Haig emphasizes formal written distribution, these examples should be labeled as teaching/reference examples and not treated as frequency evidence for natural conversation.

## 5. Do not collapse agent, instrument and source meanings

The phrases are not transparently interchangeable in every context:
- **bi destê ...** literally contains ‘hand’; it may be interpreted as an agentive expression (‘by the hand of’) in the cited passive example, but the literal instrumental semantics must remain visible.
- **ji aliyê ... ve** literally means ‘from the side of’; it functions as a ‘by’-phrase in the cited teaching grammar.

Haig (2004) reports a variety of adpositions in emergent press agent phrases, rather than one single established marker. Therefore:
- do not claim that only one agent phrase is possible;
- do not claim that both phrases are freely interchangeable;
- do not replace either phrase with an oblique NP alone without evidence;
- do not teach **bi destê** as a universal passive agent marker independent of context.

For each attestation, store the exact preposition, literal meaning, source variety, register, and semantic interpretation.

## 6. Agreement, case and auxiliary inflection

Gündoğdu Yücel (2018) states that:
- **hatin** is inflected for TAM, negation and person-number agreement;
- the lexical verb remains infinitival;
- the passive subject (underlying active O) is in the direct form and controls agreement on the auxiliary.

Her example **ez dê bê-m girtin** (‘I will be arrested’) illustrates future marking plus subjunctive present **hatin** with first-person agreement, followed by infinitive **girtin**.

This makes it essential to distinguish:
1. the promoted patient/passive subject;
2. the optional agent phrase;
3. the finite auxiliary;
4. the unchanged lexical infinitive.

Do not assign agreement to the agent phrase. Do not conjugate the lexical infinitive as if it were the finite passive verb.

## 7. Negation scope

The finite auxiliary is the inflected verbal head in the periphrastic passive. A modern Kurmanji teaching reference gives:
- present negative: **kitêb nayê xwendin** — ‘the book is not read’;
- past negative: **nehat xwendin** — ‘was not read’.

These are useful teaching-reference examples, but the exact negative forms should be checked against the target standard and the selected auxiliary paradigm before a full course table is created. The lexical verb remains infinitival; do not put the ordinary finite progressive/present prefix on the infinitive.

The course should eventually compare positive and negative forms across present, past and future using verified forms of **hatin**, but this audit does not invent that paradigm.

## 8. Passive with complex predicates

Haig (2002) shows that passivization can apply to certain noun-plus-verb complex predicates. His analysis states that a direct object, and only a direct object, advances to subjecthood, while the original agent is deleted. Examples include:
- passive of **av dan** ‘irrigate’;
- passive of **derman kirin** ‘treat’;
- an example involving **naskirin** and **hezkirin**, with a warning that the passive of **hezkirin** is problematic because it normally takes a prepositional complement rather than a direct object.

This is a significant quality-control point: not every noun+verb complex predicate can be passivized merely because it has a verbal component. The argument structure of the entire predicate must be checked. A nominal element incorporated into the complex predicate does not automatically become the passive subject.

## 9. Register policy for the fully Kurmanji-medium pathway

Recommended editorial policy:
- Teach the **agentless passive** first as the default construction.
- Introduce agent phrases as an advanced, marked option, clearly labeled as formal/written or source-specific where appropriate.
- Keep **bi destê ...** and **ji aliyê ... ve** as separately attested forms, with literal gloss and source.
- Avoid artificial spoken dialogues in which every passive names its agent.
- Prefer an active clause in conversational examples when the agent is the communicative focus, unless the lesson is explicitly about passive voice.
- Do not claim a precise frequency for agented passives without a corpus study.
- Obtain a native editor's judgment on naturalness, locality and register before using either phrase in productive learner exercises.

## 10. Suggested construction metadata

For every agented passive example, preserve:
- exact source string;
- normalized Hawar transcription separately;
- source and page/example number;
- dialect/locality;
- genre and register (conversation, narrative, press, grammar example);
- passive patient/subject;
- active source clause if known;
- agent phrase form and literal gloss;
- whether the agent phrase is human, institutional, instrumental or uncertain;
- finite auxiliary form and its TAM/person/number;
- lexical infinitive;
- case marking and agreement controller;
- confidence and native-editor review status.

A useful status taxonomy:
- **attested_formal_written**;
- **attested_teaching_example**;
- **attested_spoken_corpus** (only if a spoken corpus citation exists);
- **editorial_judgment_pending**.

## 11. Editorial conclusions

1. Agentless **hatin + infinitive** remains the safest canonical Kurmanji passive model.
2. Agent phrases are attested, including **bi destê ...** and **ji aliyê ... ve**.
3. Their status is marked/register-sensitive: Haig (2004) restricts the emergent press examples to formal writing; Haig (2002) says they are virtually absent from natural spoken discourse.
4. Gündoğdu Yücel (2018) supplies later descriptive examples and confirms that passive subject agreement is carried by **hatin**.
5. The agent phrase does not control agreement; the promoted direct-form patient does.
6. Complex predicates require their own argument-structure analysis before passivization.
7. No single agent marker should be taught as universally required or freely interchangeable.

## 12. Sources

1. Geoffrey Haig (2004), *Alignment in Kurdish: a diachronic perspective*, §4.3.1.4, pp. 90–91. PDF: https://agorism.dev/book/kurdish/new/Haig%20Geoffrey%20L.J.%20-%20Alignment%20in%20Kurdish_%20a%20diachronic%20perspective.pdf
   - Agentless passive examples; agented passives in emergent press language; varied adpositions; formal written register; argument promotion.
2. Geoffrey Haig (2002), “Noun-plus-verb complex predicates in Kurmanjî Kurdish: Argument sharing, argument incorporation, or what?”, *STUF* 55(1), pp. 15–48. DOI: https://doi.org/10.1524/stuf.2002.55.1.15
   - Repository copy: https://fis.uni-bamberg.de/server/api/core/bitstreams/5f8631d6-c40d-4dd6-ad7c-c4914cc079ab/content
   - Agented passives virtually non-existent in natural spoken discourse; passivization and argument structure of complex predicates.
3. Songül Gündoğdu Yücel (2018), *Argument–Adjunct Distinction in Kurmanji Kurdish*, PhD dissertation, Boğaziçi University, §2.7.3, pp. 99–100. PDF: https://abis-files.bogazici.edu.tr/avesis/3420afbd-1f13-4de9-9948-dd86ee87f41c3
   - Passive auxiliary agreement, direct-form promoted subject, agent phrases **bi destê...** and **ji aliyê...**, and Bedirxan & Lescot example.
4. Deniz Ekici (2007), *Kurmanji Kurdish Reader*, “The Passive Voice”, pp. 78–79. PDF: https://www.kurdipedia.org/files/books/2022/426287.PDF?ver=133039986335973847
   - Teaching examples with **ji aliyê ... ve** and passive **hatin + infinitive**.
5. Kurdîzan, “Avaniya tebatî / Passive voice”, https://kurdizan.net/ders/avaniya-tebati
   - Modern teaching reference for passive subject promotion, finite **hatin**, infinitive, and negative auxiliary forms. Use as a pedagogical cross-check, not corpus-frequency evidence.

## Change boundary

Documentation only. No lesson, course content, seed, code, schema, migration, CI workflow, production database, PR, main branch or deployment was changed.
