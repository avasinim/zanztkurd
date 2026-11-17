# Kurmanji dan Causatives — Construction Types, Argument Roles, Morphology and Word Order Audit — 2026-11-17

## Purpose and scope

This audit deepens the treatment of **dan** as a causative auxiliary in Kurmanji. It separates:
1. simple periphrastic causation **dan + infinitive**;
2. morphological causatives in **-and** and their combination with **dan**;
3. complex/double causatives with **dan + kirin + infinitive**;
4. the distinct lexical, light-verb and auxiliary uses of **dan**.

It also records a significant word-order issue: the Akin & Bouveret corpus examples commonly show finite **dan** before the infinitive, whereas Haig & Öpengin's Standard Kurmanji sketch describes an inverted order **bi + infinitive + dan**. These descriptions must not be collapsed into a single universal template.

This is a documentation-only research audit. It is not learner-facing material and does not change lessons, seed data, code, database schema, migrations, CI, production systems or deployment.

## 1. Evidence base and limits

### 1.1 Akin & Bouveret (2021)

The chapter “Grammar in usage and grammaticalization of dan ‘give’ constructions in Kurmanji Kurdish” is based on dictionaries, contemporary newspaper material and the Manchester Kurdish Dialects Database. It treats **dan** as a polyfunctional item, moving across lexical ‘give’, light-verb constructions and causative auxiliary constructions. The authors identify three causative types and discuss an additional complex construction in which causative **dan** combines with a causative light-verb construction using **kirin**.

The chapter's own outline distinguishes:
- **[dan + kirin V-Inf]**;
- **[dan V-Inf]**;
- **[dan + V-and]**;
- a complex **dan + kirin V-Inf** pattern in which LVC and causative structures overlap.

The article's accessible full text gives examples and analysis, but its corpus and dialect profile should be retained. Its frequency claims refer to its own corpus, not automatically to every Kurmanji variety or modern educational register.

### 1.2 Haig & Öpengin (2015 pre-publication draft)

Their chapter “Kurmanji Kurdish in Turkey: structure, varieties, and status” gives a Standard Kurmanji description of the periphrastic causative and explicitly notes the order **bi + infinitive + dan**. It provides an example translated ‘I will introduce you to him’. This is crucial evidence that the order used in a particular standard description is not identical to the dominant order illustrated in Akin & Bouveret's newspaper examples.

The difference may reflect construction type, variety, register, or analysis. The available evidence does not justify silently choosing one and normalizing all examples to it.

## 2. Simple periphrastic causative: dan + infinitive

Akin & Bouveret describe the simple construction as a finite form of **dan** followed by a lexical infinitive:
- **bidin nasîn** — “make known / teach” (the cited example uses plural present **didin** with **nasîn**).
- **bide berdan** — “let/release” or “make free”, with subjunctive **bide** and infinitive **berdan**.

Their analysis distinguishes weaker permissive/indirect causation (“let”) from stronger direct or directive causation (“order”). They describe a continuum of force rather than treating every **dan + infinitive** clause as equally coercive.

The Academy should record at least:
- causer (the entity causing the event);
- causee (the participant induced or permitted to act);
- embedded event/predicate;
- whether the relation is permissive, enabling, direct, directive or unresolved;
- the finite form of **dan** and its TAM/person marking;
- the exact infinitive form;
- case marking and adpositions on causee and other arguments.

Do not translate every causative **dan** as “make”; context may support “let”, “allow”, “cause”, “have”, “order” or another sense.

## 3. Morphological causative -and and double causation

Akin & Bouveret describe an intransitive/transitive alternation in which **-and** marks the transitive causative member:
- **firîn** “fly” → **firandin** “make fly”;
- **meşîn** “run” → **meşandin** “make run”;
- **gerîn** “walk” → **gerandin** “make walk”.

Their detailed discussion gives:
- **nasîn** “know”;
- **nasandin** “make know”;
- **dan nasandin** “make know” with both the morphological causative and the periphrastic causative **dan**.

They call the last pattern double causation: the lexical verb has already been morphologically causativized, and the additional **dan** introduces another causative layer. The chapter explicitly states that **-and** marks transitivity in the intransitive/transitive alternation; it does not establish that the suffix is etymologically derived from **dan**. The authors say there is no evidence for that etymology given the lack of research.

Important: do not automatically segment every sequence ending in **-andin** as a synchronically productive causative suffix. Check the actual intransitive/transitive pair, present and past stems, and lexical status. Some forms may be lexicalized or have non-transparent paradigms.

## 4. Double causation with dan + an already causative verb

The article's example **dan rûniştandin** is analyzed as an extended/double causative:
- **rûniştandin** is already a causative/transitive lexical form;
- **dan** is added before its infinitive;
- the example describes the mothers making another participant sit/seat herself.

The authors note that the form without **dan** can be sufficient in the standard grammatical pattern, while the form with **dan** occurs in newspaper material and may show extension of the **dan** manipulative construction. Their reported Google count (110 occurrences) belongs to their particular search at the time of research; it is not a current frequency estimate and should not be copied into a modern course as a quantitative fact.

The authors also note variety differences in the alternative expression of the causer/agent, including an ergative construction in other Kurmanji varieties. Record the actual source variety and case frame for each example.

## 5. Complex causative: dan + kirin + infinitive

Akin & Bouveret describe a further complex pattern in which:
- **dan** functions as a grammaticalized semi-auxiliary of causation;
- **kirin** functions as a light verb in a lexicalized causative construction;
- the construction therefore contains two causative layers.

Examples:
- **dan çapkirin** — “cause to print / publish”;
- **dan guftûgokirin** — “make [someone] negotiate”;
- **dan qebûlkirin** — “make [something] accepted”.

The authors analyze the structure as an agent/causer plus **dan**, a causative LVC involving **kirin**, an object and a result. This should be stored as a constructional unit, not as a mechanical concatenation of three dictionary headwords.

## 6. Word order: preserve the evidence instead of forcing one rule

Two sources give different surface orders:

### Akin & Bouveret corpus examples
Finite **dan** precedes the infinitive:
- **didin nasîn**;
- **bide berdan**;
- **bidin çapkirin**.

Their chapter describes simple causation as **[dan V-Inf]** and complex causation as **[dan + kirin V-Inf]**.

### Haig & Öpengin Standard Kurmanji sketch
The draft describes the Standard K. periphrastic causative as having an inverted order:
- **bi + infinitive + dan**;
- example: **ez=ē te bi wî bi naskirin bidim** (the source's segmentation and orthography should be checked directly on the page image before any editorial transcription). The translation is “I will introduce you to him.”

These descriptions should be represented as two attested construction patterns with source and variety metadata. It is unsafe to infer that one source is simply wrong, or that one order is universal. The exact syntactic status of **bi** and the form of the infinitive should be reviewed in the primary source and by a native Kurmanji editor.

## 7. Argument structure and case: required analysis

Causative constructions normally introduce or reorganize participants. For every source example, annotate:
1. **Causer** — initiator of the causing event;
2. **Causee** — participant who performs or undergoes the embedded event;
3. **Embedded subject / patient** — argument of the infinitive, if present;
4. **Other complements** — recipients, beneficiaries, locations, instruments or obliques.

Then record:
- direct vs indirect/permissive causation;
- whether causee is direct, oblique, or introduced by an adposition;
- whether the embedded verb is intransitive or transitive;
- whether a morphological causative **-and** changes the embedded verb's valency;
- which finite verb carries person agreement;
- which argument controls agreement in past and present;
- whether the construction has one or two causative layers.

Do not infer the case of the causee from the English translation. Use the source gloss and the actual Kurmanji form. Do not assume the causee and embedded object are the same participant.

## 8. Distinguish dan's four roles

| Role | Diagnostic | Example / evidence |
|---|---|---|
| Full lexical verb “give” | Has a transferred theme and recipient | Ordinary giving examples in Akin & Bouveret |
| Light verb | Forms a lexicalized predicate with a nominal/adverbial/other component | **agahî dan**, **piştgirî dan**, **zorê dan** |
| Causative auxiliary | Combines with an infinitive and introduces a causing relation | **didin nasîn**, **bidin çapkirin** |
| Part of a fixed or lexicalized expression | Meaning and syntax are construction-specific | **dan ber xwe**, **dan ber hev**, and other idioms |

The source chapter documents multiple LVC templates, including noun+dan, dan+preposition+indirect object, dan+reciprocal, and reflexive constructions. A dictionary entry for **dan** alone cannot encode all these constructional meanings.

## 9. Recommended data structure

Create a construction record separate from the component verb records. Minimum fields:
- construction lemma, sense and type;
- source-attested exact surface string;
- source variety/locality/register/corpus;
- finite dan form, person/number and TAM;
- infinitive or causativized infinitive;
- morphological causative marker, with segmentation evidence;
- causative layer count (one, two, uncertain);
- causer, causee and embedded arguments;
- case/adposition and agreement controller;
- semantic force (permit, enable, cause, direct, order, uncertain);
- word order template;
- competing source analyses;
- source page/example and visual verification status;
- normalized Hawar form kept separate from source form;
- native-editor review status.

## 10. Editorial quality gates

Before any learner paradigm is authored:
1. Verify the exact example and diacritics against the primary page image, not only OCR.
2. Confirm which Kurmanji variety and register the example represents.
3. Check the base intransitive/transitive pair before labeling **-and** productive.
4. Distinguish simple **dan + Inf**, double **dan + V-and**, and complex **dan + kirin + Inf**.
5. Establish causer/causee roles and case marking from the Kurmanji clause.
6. Check the finite agreement controller.
7. Record both source-attested word orders; do not harmonize without editorial policy.
8. Obtain native editor review of the construction and naturalness.
9. Do not fabricate a full tense paradigm from one finite example.

## 11. Sources

1. Salih Akin & Myriam Bouveret (2021 online; volume publication listed 2022 in the deposited manuscript), “Grammar in usage and grammaticalization of dan ‘give’ constructions in Kurmanji Kurdish”, *Give Constructions across Languages*, Constructional Approaches to Language 29, pp. 223–243. DOI: https://doi.org/10.1075/cal.29.09aki
   - Publisher abstract and chapter outline: https://www.benjamins.com/catalog/cal.29.09aki
   - Author-deposited manuscript (HAL Id hal-03949788): https://hal.science/hal-03949788/document
   - Sections 3.3.1–3.3.4: simple causation, morphological -and, double causation, and dan+kirin causative LVC.
2. Geoffrey Haig & Ergin Öpengin (2015 pre-publication draft), “Kurmanji Kurdish in Turkey: structure, varieties, and status”, §3, p. 55 of the draft (periphrastic causative; Standard K. order). PDF: https://www.kurdipedia.org/docviewer.aspx?document=0001.PDF&id=421405
3. Geoffrey Haig (2018), “Northern Kurdish (Kurmanjî)”, for general Kurmanji TAM, case and agreement background. University of Bamberg author PDF: https://www.uni-bamberg.de/fileadmin/aspra/06_Team/Publications_and_CV/haig_2018_ch.2.3_northern_kurdish.pdf
4. Universal Dependencies, Northern Kurdish overview, identifies **dan** as the causative auxiliary combining with an infinitive. Used only as a compact annotation cross-check, not as a replacement for descriptive grammar: https://universaldependencies.org/kmr/

## Change boundary

Documentation only. No lesson, course content, seed, code, schema, migration, CI workflow, production database, PR, default branch or deployment was changed. This audit preserves source-specific ordering differences and does not establish a single universal Kurmanji causative template.
