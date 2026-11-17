# Kurmanji-medium Pathway B2–B3 — Specialist Grammar Terminology and Evidence Matrix

**Date:** 2026-11-17  
**Repository:** `avasinim/zanztkurd`  
**Working branch:** `fix/kurmanji-ci-current-migration`  
**Baseline / pre-work backup:** `d974c5955667a385c67232abbc19f92c6ec09ece`  
**Pre-work backup ref:** `backup/b2-b3-grammar-terminology-evidence-matrix-before-2026-11-17`  
**Status:** internal research and editorial control; proposal-only; no owner-approved terminology decisions; no learner-facing text changed.

## 1. Purpose and boundary

This matrix extends the B0–B5 master terminology register into the grammar concepts most likely to cause conceptual errors in B2/B3:

1. ezafe and noun-phrase agreement;
2. Direct and Oblique case;
3. grammatical functions versus semantic roles;
4. transitivity and intransitivity;
5. tense, aspect and verbal stems;
6. agreement in intransitive, present-transitive and past-transitive clauses;
7. dialect-sensitive alignment and agreement.

The goal is not to prescribe a new grammar or rewrite existing lessons. It is to give editors a source-traceable way to distinguish a grammatical concept, a provisional Kurmanji label, a learner-friendly explanation and a claim that still needs a specialist decision.

**No term below is house-approved.** The proposed reference baseline in earlier project notes—Standard Kurmanjî, Hawar-based modified Roman, loosely Cizre/Botan—is still a proposal, not an owner-approved variety policy. Published descriptions of that baseline must not be represented as universal descriptions of every Kurmanji-speaking community.

This document does not authorize changes to the 26 + 12 lesson inventory, learner-facing lesson text, seed SQL, application code, tests, migrations, database, CI, PR #3 or deployment.

## 2. Evidence hierarchy and interpretation rules

Use sources in this order for the relevant claim:

1. descriptive grammars and peer-reviewed syntactic/morphological studies for grammatical structure;
2. variety-specific studies for regional patterns and exceptions;
3. orthographic guides for spelling conventions, not as sole authorities for syntax;
4. dictionaries for lexical forms and meanings, not as proof of argument structure or agreement;
5. native Kurmanji editorial review for idiomaticity, pragmatic fit and the selected written variety.

A source-attested example proves that the form occurs in that source and variety. It does not, by itself, prove that it is the best teaching example for this course or that every regional variety uses it.

The terms **Direct** and **Oblique** are retained as grammatical case labels. Avoid silently replacing them with nominative/accusative or ergative labels unless the chosen theoretical analysis explicitly justifies that terminology. Haig and Öpengin emphasize that Direct/Oblique cannot simply be equated with nominative/accusative.

## 3. Core alignment matrix

The following is the canonical pattern described for Standard Kurmanjî in Haig (2018), with regional qualifications recorded below.

| Clause type | Core subject | Direct object | Usual agreement controller in the described standard pattern |
|---|---|---|---|
| Intransitive, present | Direct | — | Intransitive subject |
| Intransitive, past | Direct | — | Intransitive subject |
| Transitive, present | Direct | Oblique | Transitive subject |
| Transitive, past | Oblique | Direct | Direct object / patient |

Three controls follow:

- **Past tense alone does not make a subject Oblique.** The crucial condition is the past-tense transitive construction. Past intransitive subjects remain Direct in the canonical pattern.
- **Oblique does not mean object.** A past-transitive Oblique argument can remain the grammatical subject and agent.
- **Agreement is construction-sensitive.** In past transitive clauses in the canonical pattern, the verb agrees with the Direct object, not simply with “the person doing the action”.

This matrix is a teaching summary, not a complete account of every dialect, person/number combination, discourse condition or exceptional agreement pattern.

## 4. Concept-by-concept evidence matrix

Status codes follow the master register: A = attested in a source; P = attributed proposal; W = internal working form; D = deferred; H = owner/editor approved. No H status is assigned here.

| Concept ID | Grammatical concept | Candidate Kurmanji label / wording | Evidence status | B2/B3 teaching requirement | Main risk / decision still open |
|---|---|---|---|---|---|
| NP.EZAFE | Ezafe/linking element | `îzafe` / `îzafeyê` | A/W | Explain the linker as a relation inside the noun phrase; show head noun + linker + following dependent | Exact learner-facing headword and definition require Kurmanji editor approval |
| NP.EZAFE_HEAD_AGREEMENT | Gender/number agreement of ezafe | descriptive phrase; specialist label D | A | Show that the linker is selected with reference to the head noun, not the possessor | Do not merge linker agreement with possessor gender |
| NP.OBLIQUE_POSSESSOR | Oblique possessor in ezafe phrase | `xwedî`-phrase / descriptive wording; label D | A | Show noun + ezafe + oblique possessor, e.g. `mal-a me` | Do not label `min/te/wî/wê` as possessive suffixes |
| NP.FREE_EZAFE | Free/anaphoric ezafe | `yê / ya / yên` constructions | A | Distinguish a free ezafe meaning “the one(s)” from a linker inside a full noun phrase | Do not teach all surface ezafe forms as one undifferentiated function |
| NP.REFLEXIVE_POSSESSOR | Reflexive possessor | `xwe` | A | Explain the same-clause subject/coreference condition and contrast with ordinary oblique pronouns | Scope must be exact; do not generalize to any owner mentioned earlier in discourse |
| CASE.DIRECT | Direct case | `rewşa rasterast` | W | Introduce as one of the two grammatical cases; identify its distribution by construction | Existing term is provisional; check idiomaticity and specialist precision |
| CASE.OBLIQUE | Oblique case | `rewşa nerasterast` | W | Introduce as the other grammatical case; show several functions, not just objects | Existing term is provisional; never gloss simply as “object case” |
| SYNTAX.SUBJECT | Grammatical subject | candidate requires editor review | D | Separate syntactic subject from agent/actor and from case marking | Avoid defining subject as “the doer” |
| SYNTAX.OBJECT | Object / patient | candidate requires editor review | D | Distinguish direct object from recipient/goal and from semantic patient | Avoid assuming every object is Oblique |
| SEM.AGENT | Agent | explanatory wording; label D | A/D | Use only when semantic role matters; compare with syntactic subject | Agent and subject are not interchangeable |
| SEM.PATIENT | Patient | explanatory wording; label D | A/D | Use to describe the participant affected by an event | Patient and direct object often align, but the concepts are not identical |
| CASE.ALIGNMENT | Case alignment | specialist term deferred | A/D | At B3, show the patterns through examples before introducing specialist terminology | Do not oversimplify as “past = ergative” |
| VERB.TRANSITIVITY | Transitivity | `lêkera gerguhêz` | W | Define by the verb's argument structure in a clause, not by whether an action feels active | Existing term needs specialist/editor review; do not conflate transitivity with agentivity |
| VERB.INTRANSITIVITY | Intransitivity | `lêkera negerguhêz` | W | Show an intransitive predicate with one core argument; contrast with transitive use | Some predicates allow multiple frames; avoid claiming every verb is permanently one class |
| VERB.PRESENT_STEM | Present stem | `stema niha` / descriptive wording | A/D | Identify stem as a morphological base, not the same thing as tense | Exact term requires editor approval; keep stem separate from prefix and ending |
| VERB.PAST_STEM | Past stem | `stema borî` / descriptive wording | A/D | Compare present and past stems using source-checked paradigms | Do not assume every verb forms the past stem by one regular operation |
| TAM.TENSE | Tense | `dem` | W | Distinguish grammatical tense from real-world time reference | The everyday word may be too broad as a technical headword |
| TAM.ASPECT | Aspect | candidate requires editor review | D | Keep aspect separate from tense; identify habitual/progressive or other aspectual meanings only when supported | Do not translate every `di-` pattern as a tense marker |
| TAM.MOOD | Mood | candidate requires editor review | D | Distinguish indicative, subjunctive and imperative forms where relevant | Avoid using “mood”, “intention” and “future” interchangeably |
| AGR.CONTROLLER | Agreement controller | descriptive phrase; specialist term D | A/D | State explicitly which argument controls person/number morphology in each construction | “Verb agrees with the subject” is not a safe universal rule |
| AGR.PAST_TRANSITIVE | Past-transitive agreement | descriptive phrase | A | Teach object-controlled agreement in the canonical pattern with a fully analysed example | Regional and discourse-sensitive deviations require qualification |
| VAR.DOUBLE_OBLIQUE | Double-oblique pattern | technical label; internal only | A/D | Keep as a documented regional pattern, not the default beginner paradigm | Must name variety/source; do not mix into a standard paradigm without labels |

## 5. Ezafe: separate the functions

### 5.1 Head noun and possessor

Haig (2018) gives the structure `mal-a me` (“our house”). The possessor is in the Oblique form `me`; the ezafe linker follows the head noun `mal`.

The learner-facing explanation should make two independent facts visible:

- the linker belongs to the noun-phrase relation between the head and its dependent;
- the possessor appears in an Oblique form.

Do not describe the oblique pronoun as a possessive suffix attached to the noun.

### 5.2 Ezafe agreement is not possessor agreement

Haig and Öpengin (2015) describe the linker as sensitive to the gender and definiteness of the modified/head noun. The possessor pronoun has its own person/number and, for third-person singular Oblique forms, gender distinctions.

The example `pirtûka wê` is useful for the analysis:
- `-a` is the linker associated with the feminine head noun `pirtûk`;
- `wê` is the Oblique feminine third-person possessor.

These endings/forms do not encode the same relation. Do not say that the linker is feminine “because the owner is female”.

### 5.3 Free ezafe and anaphoric “one(s)”

Haig (2018) gives examples such as `yê spî`, `ya te` and `yên mezin`. These are not simply another possessive suffix paradigm. The free ezafe can stand for an understood noun (“the one(s)”) or introduce an additional dependent after a noun phrase is already complete.

A B2 lesson should distinguish these functions with context, not merely present a list of endings.

### 5.4 Reflexive possessor

Haig (2018) documents the same-clause coreference use of `xwe`, including the contrast `Ez li mala xwe me` and the rejected intended reading `*Ez li mala min me`. This is a high-value contrast because learners may otherwise overextend the ordinary Oblique pronoun `min`.

Keep the condition narrow: the reflexive is linked to the subject of the relevant clause. Native editorial review should approve the learner-facing explanation and any adapted example.

## 6. Direct and Oblique case: teach distribution, not labels alone

The case distinction should be taught through a small, controlled set of contrasts:

1. an intransitive present clause;
2. an intransitive past clause;
3. a transitive present clause;
4. a transitive past clause.

A minimal source-backed contrast from the literature includes:
- `Ez di-rev-im` — present intransitive (“I am running”);
- `Ez revi-m` — past intransitive (“I ran”);
- `Ez cil-an di-şû-m` — present transitive (“I am washing the clothes”);
- a past transitive construction in which the agent is Oblique and the patient is Direct.

Do not use the table as a substitute for teaching nominal and pronominal paradigms. Case marking on nouns can vary by gender, definiteness and number; pronouns have their own direct/oblique forms. The Oblique also appears with adpositions, possessors, and certain Goal/Recipient arguments.

### 6.1 Grammatical function, semantic role and case

Keep three dimensions separate:

| Dimension | Question it answers | Example of why it matters |
|---|---|---|
| Grammatical function | What syntactic relation does the constituent have? | A constituent can remain the subject even when it is Oblique |
| Semantic role | What part does the participant play in the event? | Agent and patient describe event roles, not case endings |
| Morphological case | What case form is marked on the noun/pronoun? | Direct/Oblique form does not by itself identify subject/object |

Haig (2018, §2.7.2) explicitly notes that subjecthood remains robust in the past transitive construction and is not determined solely by surface case. Therefore, never teach “the Oblique noun is the object” or “the Direct noun is always the subject”.

## 7. Transitivity, stems, tense and agreement

### 7.1 Transitivity is a clause-level relation

A transitive clause has a predicate with a direct object; an intransitive clause does not have that direct-object configuration. The distinction matters because Kurmanji alignment is sensitive to both transitivity and tense/aspect form.

Avoid defining a transitive verb simply as “an action done to something”. That shortcut fails for many predicates and hides argument structure. Some verbs can occur in more than one frame; examples should be checked individually.

### 7.2 Present and past stems are morphological distinctions

The descriptive literature distinguishes present and past stems. Do not call the stem itself a tense, and do not teach a single suffix or prefix as if it generated every past form. The course should show a source-checked paradigm with:
- the lexical verb;
- the present stem;
- the past stem;
- relevant TAM marking;
- person/number endings;
- the clause type and agreement controller.

The exact terminology for “stem” and the segmentation conventions require Kurmanji editor approval before learner-facing adoption.

### 7.3 Tense is not aspect

A B3 explanation should not collapse tense, aspect and mood into one category. In particular:
- tense concerns grammatical location in time;
- aspect concerns how an event or state is viewed internally (for example, habitual or progressive distinctions);
- mood concerns the grammatical status or presentation of the event (for example, indicative or subjunctive).

The examples and labels used in the actual course must follow the chosen reference variety and the source's analysis. Avoid assigning a progressive or habitual meaning to every surface `di-` form without examining the construction.

### 7.4 Agreement controller

The course must not teach a universal statement such as “the verb always agrees with the subject”. A safer teaching sequence is:

- in intransitive clauses, show agreement with the intransitive subject;
- in present transitive clauses, show the canonical subject-controlled pattern;
- in past transitive clauses, show the canonical Direct-object-controlled pattern.

Then add a carefully scoped note that some dialects and discourse configurations show deviations, including plural agreement associated with a non-overt plural subject and double-oblique patterns in some varieties. These are not errors to be silently “corrected”; they are evidence of variation and require named variety labels.

## 8. Dialect and standardization controls

The sources do not describe a single homogeneous Kurmanji system. Haig (2018) describes a Standard Kurmanjî baseline and also notes variation. Haig and Öpengin (2018) document differences between Western and Southeastern varieties, including differences in ezafe/aspect interactions and Oblique marking. Other work reports double-oblique patterns in certain dialects.

Editorial controls:

1. Do not combine examples from Standard Kurmanjî, Muş, Western Kurmanji and Behdinî into one unlabeled paradigm.
2. Do not present double-oblique marking as the default Standard Kurmanjî pattern.
3. Do not erase a regional form merely because it differs from the chosen teaching baseline.
4. Preserve the source spelling and transcription during evidence review; do not silently normalize diacritics or morpheme boundaries.
5. A native editor familiar with the intended user community must validate naturalness and pragmatic fit.
6. The Academy owner must approve the reference variety before any house form is marked H.

## 9. Proposed B2/B3 teaching sequence

| Stage | Content | Minimum evidence shown to learner | Gate |
|---|---|---|---|
| B2-1 | Ezafe and head-noun agreement | Two noun phrases with contrasting head-noun gender/number; explicit identification of head noun | Kurmanji editor validates forms and explanation |
| B2-2 | Oblique possessors and reflexive `xwe` | Personal Oblique paradigm in context; one same-clause reflexive contrast | Specialist confirms scope; Sorani-mediated material must not be copied mechanically |
| B2-3 | Direct and Oblique case | Four clause-type contrasts: intransitive present/past and transitive present/past | All examples source-checked and variety-labelled |
| B2-4 | Subject, object, agent and patient | One example where Oblique constituent is still the subject | Linguist checks conceptual explanation |
| B3-1 | Transitivity and intransitivity | Contrastive predicates with explicit argument frames | Native speaker confirms idiomatic examples |
| B3-2 | Present/past stems and TAM | One regular and one irregular verb paradigm, including zero marking if applicable | Morphology reviewed against descriptive grammar |
| B3-3 | Agreement controller | Intransitive, present-transitive and past-transitive paradigms | Agreement statements scoped to the chosen variety |
| B3-4 | Variation and advanced alignment | A clearly labelled regional comparison, only if learning outcomes require it | No regional generalization without named source and reviewer |

B2/B3 are internal design bands. This table does not claim CEFR alignment or certification.

## 10. Open decisions and review checklist

| ID | Decision / review item | Current disposition |
|---|---|---|
| B23-01 | Approve the project wording for ezafe and free ezafe | Open; no H status |
| B23-02 | Approve the Kurmanji terms for Direct and Oblique case | Open; current forms remain W |
| B23-03 | Approve the terms for transitive and intransitive verb | Open; current forms remain W |
| B23-04 | Approve the terms for present stem and past stem | Open |
| B23-05 | Approve a precise Kurmanji explanation of grammatical subject vs agent | Open |
| B23-06 | Select the written reference variety for Pathway B | Owner decision required |
| B23-07 | Select the exact paradigms and examples for B2/B3 | Native Kurmanji specialist review required |
| B23-08 | Decide whether regional alignment variation belongs in learner text or teacher notes | Owner/editor decision required |
| B23-09 | Cross-check the new B2/B3 terminology against the master register | Open; update only after editorial approval |
| B23-10 | Confirm that no B2/B3 example is presented as a verbatim quotation if adapted | Required for every example |

A decision may move to H only after the owner and qualified Kurmanji editor explicitly approve the form, and a linguist confirms technical accuracy where needed. Silence, a source citation, or a prior AI audit is not approval.

## 11. Sources

1. **Haig, Geoffrey (2018).** “Northern Kurdish (Kurmanjî).” In Geoffrey Haig & Geoffrey Khan (eds.), *The Languages and Linguistics of Western Asia: An Areal Perspective*, pp. 106–158. DOI: https://doi.org/10.1515/9783110421682-004.  
   University of Bamberg PDF: https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf  
   Relevant sections: nominal case and ezafe (§§2.2–2.3); verb stems and agreement (§2.6); Goals, word order and alignment (§2.7).

2. **Haig, Geoffrey & Ergin Öpengin (2015).** “Grammatical gender in the case system and the linking elements of Kurmanji Kurdish.”  
   University of Bamberg offprint: https://www.uni-bamberg.de/fileadmin/aspra/06_Team/Publications_and_CV/haig_opengin_2015_gender_kurdish_offprint.pdf  
   Supports the distinction between Direct/Oblique case, split alignment, and ezafe/linker agreement with the modified noun.

3. **Haig, Geoffrey & Ergin Öpengin (2018).** “Kurmanji Kurdish in Turkey: Structure, varieties and status.”  
   University of Bamberg PDF: https://www.uni-bamberg.de/fileadmin/aspra/06_Team/Publications_and_CV/HaigOepengin2018_Kurmanji_Kurdish_.pdf  
   Relevant for variety-sensitive differences in ezafe/aspect interactions and Oblique marking.

4. **Atlamaz, Ümit & Mark Baker (2015/2016 proceedings version).** “Agreement With and Past Oblique Subjects: New Considerations from Kurmanji.”  
   Rutgers PDF: https://sites.rutgers.edu/mark-baker/wp-content/uploads/sites/199/2019/07/AtlamazBaker_NELS-46-Proceedings-Atlamaz-Baker_withEdits-3.pdf  
   Supports the distinction between Direct/Oblique forms and agreement in present vs past transitive clauses.

5. **Baker, Mark & Ümit Atlamaz (2014).** “On the Relationship of Case to Agreement in Split-Ergative Kurmanji and Beyond.”  
   Rutgers PDF: https://sites.rutgers.edu/mark-baker/wp-content/uploads/sites/199/2019/07/kurmanji-split-erg-distributed-July-2014.pdf  
   Further specialist analysis of case/agreement interaction.

6. **University of Arizona, Iranian Languages.** “Kurmanji Kurdish.”  
   https://iranian-languages.arizona.edu/node/7  
   Accessible overview of pronoun case, ezafe, verb forms and agreement. Use as a pedagogical orientation source, not as the sole authority for dialect-sensitive claims.

7. **Thackston, W. M. (2006).** *Kurmanji Kurdish: A Reference Grammar with Selected Readings.*  
   https://sites.fas.harvard.edu/~iranian/Kurmanji/kurmanji_complete.pdf  
   Pedagogical reference grammar for paradigms and examples; compare with later descriptive work and variety-specific studies.

## 12. Actions not taken and verification plan

- No learner-facing lesson body or HTML was edited.
- No SQL seed, including `docs/kurmanji-content-seed-part-04.sql`, was edited.
- No course inventory, code, tests, CI, migration, database, Supabase project, PR #3, or deployment was changed.
- No live database access or SQL execution occurred.
- No merge, rebase, force-push or main-branch write occurred.

After the document commit, verify:
1. active branch head is the new documentation commit;
2. the active branch differs from the baseline by exactly this one new document;
3. the pre-work backup remains at the exact baseline SHA;
4. the post-work backup points to the exact resulting active-branch SHA;
5. the new document blob SHA is identical on the active and post-work backup refs;
6. the Course 1 seed SHA remains `2367c5057b2b92b7fa482c64a30b05d26838d964`;
7. `main` remains `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`.

**Final disposition:** source-backed B2/B3 grammar terminology matrix prepared for editorial review only. No lesson is certified or rewritten by this document.
