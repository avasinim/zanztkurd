# Kurmanji Passive Voice — Hatin + Infinitive, Argument Promotion and Dialect Boundaries Audit — 2026-11-17

## 1. Purpose and correction

This audit documents the passive construction of Northern Kurdish (Kurmanji), with special attention to the distinction between Kurmanji and Central Kurdish (Sorani) morphology.

**Important correction to the previous working note:** the suffixes **-rê / -ra** (and related descriptions such as **-ran / -rê**) must not be presented as the general Kurmanji passive paradigm. The sources reviewed here identify the canonical Kurmanji/Northern Kurdish passive as a **periphrastic construction: a finite form of hatin ‘come’ + the infinitive of a transitive lexical verb**. By contrast, Sorani is described as having a synthetic passive marked on the verb stem, commonly with -ra/-re in the relevant descriptions. The prior proposal to audit -ran/-rê as Kurmanji passive morphology was therefore based on a cross-variety conflation and is withdrawn.

This is a documentation-only correction and research audit. It does not change any course lesson, seed data, code, schema, migration, CI, production database, PR, main branch or deployment.

## 2. Core Kurmanji construction

Haig (2004, §4.3.1.4, pp. 90–91) describes a reasonably productive passive in the Northern Group, restricted to transitive verbs, built from:
- finite **hatin** ‘come’;
- the lexical verb in its infinitive form.

The canonical analysis identifies two syntactic changes:
1. the active clause's syntactic subject is suppressed/deleted;
2. the active object (O) advances to the subject position of the passive clause.

The source examples (orthography and segmentation as transcribed in Haig) are:

| Voice / tense | Kurmanji example | Meaning |
|---|---|---|
| Active, present | **em vê avê vedixwin** | We (can) drink this water |
| Passive, present | **ev av tê vexwarin** | This water is drunk / drinkable |
| Active, past | **me ev av vexwar** | We drank this water |
| Passive, past | **ev av hat vexwarin** | This water was drunk / drinkable |

The finite verb **hatin** carries tense and person agreement; the lexical predicate remains infinitival. Do not turn the infinitive into a synthetic passive suffix form.

A pedagogical grammar independently gives the pattern **hatin + infinitive**, with examples such as **hatim girtin** ‘I was taken’. Universal Dependencies' Northern Kurdish overview also identifies **hatin** as the passive auxiliary and states that it combines with a lexical infinitive.

## 3. Future and other finite forms

A secondary descriptive source reproducing Thackston's examples gives:
- **hatim dîtin** — ‘I was seen’;
- **ez-ê bê-m dît-in** — ‘I will be seen’.

The latter shows that future expression involves the future particle **dê** and a finite present form of **hatin**, while the lexical verb remains infinitival. Exact clitic segmentation, spelling and variety should be checked against the cited primary grammar before it is adopted as a model paradigm.

This audit does not supply a full hatin paradigm. A paradigm must be independently checked against the target standard and native-editor judgment.

## 4. Restriction to transitive verbs

Haig explicitly describes the construction as restricted to transitive verbs. The promoted passive subject corresponds to the active object. This means:
- a transitive verb is the canonical input;
- the active object becomes the passive subject;
- the active agent is normally unexpressed;
- intransitive verbs are not passivized by simply placing hatin before their infinitive.

The claim is about the canonical construction in Haig's Northern Group description. It should not be generalized into an assertion that every dialect, lexical item, or innovative press register has no other voice-related construction.

## 5. Agent phrases and register

Haig's footnote notes that agented passives occur in the emergent language of the press, with agents coded by different adpositions, but that these examples are restricted to formal written language in the data he discusses.

A pedagogical explanation should therefore distinguish:
- canonical agentless passive;
- formal written/press agent phrase;
- active clauses with an overt agent.

Do not teach a single fixed agent marker as universal without a dedicated source audit. The exact adposition and its distribution need separate evidence.

## 6. Why the passive is not a Kurmanji -ran/-rê suffix

The suffix confusion likely arises from comparing distinct Kurdish varieties:
- Kurmanji/Northern Kurdish: periphrastic **hatin + infinitive**;
- Sorani/Central Kurdish: synthetic passive morphology on a verbal stem, described in the comparative literature with **-ra/-re** and related forms;
- Hawrami and Southern Kurdish varieties: other synthetic or periphrastic strategies, depending on variety.

A 2026 study of Garrusi (Southern Kurdish) reviews this areal diversity and explicitly summarizes Haig's Kurmanji analysis as periphrastic **hatin + infinitive**, while describing Sorani's -ra/-re strategy separately. The Garrusi study is useful as a cross-variety contrast, not as a source for Kurmanji forms.

Therefore:
- do not list **-ran / -rê** as Kurmanji passive affixes;
- do not derive Kurmanji passive infinitives by adding these suffixes;
- do not mix Sorani synthetic passive examples into the fully Kurmanji-medium course;
- preserve dialect labels on every passive example.

## 7. Relationship to past ergativity

Haig emphasizes that the passive operation applies in both present and past clauses, and that the different morphology of active A and O in the past does not block passive formation. In the passive, the promoted O behaves as the syntactic subject. The passive therefore provides evidence about syntactic subjecthood that is not reducible to the case/agreement morphology of active past transitive clauses.

This is pedagogically important: do not infer passive formation from the active past ergative pattern alone. Teach the passive as its own construction, with its own finite auxiliary and argument mapping.

## 8. Historical/constructional interpretation

Haig proposes that the passive developed from a more restricted construction involving **hatin** ‘come’ plus a deverbal noun. In some dialects, the infinitive appears in oblique case, as in **hat kuştin-ê** ‘was killed’. He interprets the literal structure as something like ‘came to being-killed’, with the infinitive originally functioning as a goal-like complement. The construction later expanded in press language.

This is Haig's diachronic analysis, not a required synchronic parse for learners. In the learner course, the construction should be taught descriptively as finite **hatin + infinitive**, while the historical account belongs in teacher/editor notes.

## 9. Lexicalized and non-canonical exceptions

A secondary source on Northern Kurdish reports some lexicalized passive-looking forms that do not use **hatin**, including **kuzrîn** ‘have been burned’ in a poetic text. This is not sufficient evidence for a productive alternative suffixal passive rule. Treat such forms as lexical exceptions pending verification in the original source and in a reputable dictionary/grammar.

The correct editorial distinction is:
- canonical productive construction: **hatin + infinitive**;
- lexicalized passive/anticausative-looking forms: individual entries with source evidence;
- synthetic passive morphology from Sorani or other varieties: excluded from Kurmanji paradigms unless explicitly introduced in a comparative note.

## 10. Recommended construction record

For every passive example, store:
- exact source string and normalized Hawar transcription separately;
- variety, locality, register and date/source;
- active transitive base verb;
- active argument frame (A, O);
- passive subject corresponding to O;
- finite form of **hatin**, with person/number, tense, mood and polarity;
- lexical infinitive form;
- agent phrase presence/absence and exact adposition;
- aspectual/modal interpretation (e.g. eventive passive vs generic possibility ‘drinkable’);
- source page/example and whether the original page image was checked;
- evidence grade and native-editor review status.

Do not use a single passive suffix field for Kurmanji. Use a construction type field such as **periphrastic_hatin_infinitive**.

## 11. Editorial quality gates

1. Label all forms as Kurmanji/Northern Kurdish, Sorani/Central Kurdish, Hawrami, Southern Kurdish or another documented variety.
2. Teach canonical Kurmanji passive as finite **hatin + lexical infinitive**.
3. Never present **-ran/-rê** as the Kurmanji passive paradigm on the basis of Sorani or other-variety descriptions.
4. Verify exact finite forms of hatin and the infinitive independently; do not invent a full conjugation.
5. Check that the base verb is transitive and identify the active object promoted to passive subject.
6. Keep agentless and agented passives distinct; record register and adposition.
7. Distinguish eventive passive from generic/modal readings such as ‘is drinkable’.
8. Treat exceptional lexical forms as lexical entries, not proof of a productive suffix.
9. Keep the historical account separate from the synchronic learner rule.
10. Require native Kurmanji editor review before lesson use.

## 12. Sources

1. Geoffrey Haig (2004), *Alignment in Kurdish: a diachronic perspective*, §4.3.1.4 “The passive”, pp. 90–91. Full PDF: https://agorism.dev/book/kurdish/new/Haig%20Geoffrey%20L.J.%20-%20Alignment%20in%20Kurdish_%20a%20diachronic%20perspective.pdf
   - Primary descriptive evidence for Northern Group passive **hatin + infinitive**, transitivity restriction, active/passive present and past examples, agentless default, formal press agent phrases, and diachronic analysis.
2. Universal Dependencies, “Northern Kurdish”, Morphology: https://universaldependencies.org/kmr/index.html
   - Identifies **hatin** as the passive auxiliary combining with a lexical infinitive. Annotation cross-check, not a substitute for a grammar.
3. Hiwa Asadpour & Masoumeh Zarei (2026), “Corpus and Experimental Analysis of Passive Structures in Garrusi Kurdish”, *Languages* 11(4), 63. DOI: https://doi.org/10.3390/languages11040063
   - Comparative overview (§2) explicitly distinguishes Kurmanji **hatin + infinitive** from Sorani **-ra/-re** and other Kurdish varieties. Garrusi data are not treated as Kurmanji evidence.
4. Daneshpazhouh & Karimi Doostan (2016), “Passive in Sorani and Kurmanji Kurdish based on Role and Reference Grammar”, *Language Related Research* 7(2), 49–71. Abstract/metadata: https://www.magiran.com/paper/1531634/passive-in-s-ran-and-kurmanji-kurdish-based-on-role-and-reference-grammar?lang=en
   - Comparative confirmation of morphological Sorani vs periphrastic Kurmanji passive.
5. Thackston (2006), *Kurmanji Kurdish: A Reference Grammar*, cited through a secondary source for examples **hatim dîtin** and **ez-ê bê-m dît-in**. Secondary excerpt: https://studyres.com/doc/7894113/northern-kurdish-poetic-features-with-an-application-to?page=122
   - Exact transcription and paradigm details require primary-source verification before teaching.
6. Kurmanji Grammar, “The Passive Voice”, PDF: https://www.kurdipedia.org/files/books/2022/426287.PDF?ver=133039986335973847
   - Pedagogical description of **hatin + infinitive**, including agent phrase with **ji aliyê ... ve**. This is a teaching reference, not a basis for universalizing agent marking.

## Change boundary

Documentation-only correction and audit. No lesson, seed, code, schema, migration, CI, production database, PR, main branch or deployment was changed.
