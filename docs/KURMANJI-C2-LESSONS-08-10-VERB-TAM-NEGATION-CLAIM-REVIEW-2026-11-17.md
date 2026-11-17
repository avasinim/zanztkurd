# Course 2 lessons 08–10 — verb morphology, TAM, negation and questions claim review

Date: 2026-11-17  
Branch: fix/kurmanji-ci-current-migration  
Baseline HEAD: 8be2490548cb8e8f49ca56717c7fbfffd3bd31a5  
Pre-work backup: backup/kurmanji-c2-l08-10-verb-morphology-review-before-2026-11-17  
Scope: claim-level review of the current Course 2 candidate seed payloads for lessons 08–10 against primary descriptive and specialist sources. Documentation only.

## 1. Executive disposition

**Lessons 08–10 are evidence-reviewed but not release-certified.** Their conceptual direction is sound, but current teaching coverage is too abstract in places and the exact future example needs transcription correction or explicit adaptation metadata.

Principal findings:

1. **Lesson 08 — verb, stem, person and number:** its core propositions are supported, but the body gives too few worked paradigms and does not adequately teach the agreement controller. Haig (2018), Table 13, gives distinct present- and past-stem agreement suffixes; Table 14 demonstrates the contrast among present transitive, past intransitive and past transitive forms. Agreement indexes the intransitive subject in all tenses, the transitive subject in present, and the transitive object in past. It is false to say that the same suffix always indexes the subject.
2. **Lesson 09 — present, past and future:** the three contrast examples ez dibêjim, ez hatim, and min xwar are directly attested in Haig (2018), Table 14, p. 126. The future construction is also directly supported as particle (d)ê/wê plus a present subjunctive verb. But the lesson's current form ew dē mesel-ē ji te re bēž-e does **not** reproduce Haig's printed example verbatim. Haig prints ew dê mesel-ê ji te re bêj-ê. Differences in diacritics, consonant and final ending must be recorded; do not call the lesson form a direct quotation until a Kurmanji specialist confirms whether it is a deliberate variety/house-style adaptation.
3. **Lesson 10 — negation and questions:** the general claim that negation interacts with stem/TAM structure is supported. Haig's Standard Kurmanjî description distinguishes na- (present indicative), ne- (subjunctive and past forms), and lexical ni- forms with zanîn and karîn. Gündoğdu (2015) provides a templatic analysis, but her study's elicited data are from Muş; the results must not be generalized to every variety without cross-checking. The current lesson has too few worked examples for nominal/existential negation, and its question section contains no source-verified question examples.
4. The seed's negative copula pattern Ez ne mamosteyek im is structurally supported by a closely matching attested pattern Ez ne xwandekar im in Gündoğdu Yücel's 2018 dissertation. It is an adapted example, not the source's exact sentence.
5. The existential form nîne is attested in a separate example, vêrê hirç nîne (“there are no bears here”), but the exact lesson sentence Ew li vir nîne was not located in the sources checked. It should remain a candidate example pending whole-sentence validation.
6. The negative imperative in the current lesson uses ne- and notes a regional me- variant. Thackston documents né- in the written pedagogical norm, while Gündoğdu Yücel's Muş-oriented dissertation lists prohibitive me-. Keep the variety distinction explicit; do not imply one form is universal.

No lesson, seed, migration, code, database, PR or deployment was changed.

## 2. Evidence base and source scope

### A. Haig (2018) — primary descriptive grammar

Geoffrey Haig (2018), “Northern Kurdish (Kurmanjî),” in Geoffrey Haig & Geoffrey Khan (eds.), *The Languages and Linguistics of Western Asia: An Areal Perspective*, pp. 106–158.  
DOI: https://doi.org/10.1515/9783110421682-004  
Author-hosted PDF: https://www.uni-bamberg.de/fileadmin/aspra/06_Team/Publications_and_CV/haig_2018_ch.2.3_northern_kurdish.pdf

Exact locations:
- §2.6.1, pp. 125–126: present and past stems, person marking, TAM and negation prefixes, Tables 13–15.
- Table 13, p. 125: present- vs past-stem agreement suffixes.
- Table 14, p. 126: six-person contrasts across present transitive, past intransitive, past transitive, past progressive intransitive and past progressive transitive.
- §2.6.2, p. 127: suppletive stems of çûn and hatin.
- §2.6.3, pp. 127–128: indicative/subjunctive distinctions.
- §2.6.4, pp. 128–129: future particle and subjunctive construction, exact example (27), and negative future.
- §3.4, pp. 146–147: western Kurmanjî verbal morphology and dialect variation, including negation.

Haig's chapter explicitly scopes its main grammatical sketch to Standard Kurmanjî, loosely based on Cizre/Botan, then treats selected regional variation separately. It must not be generalized to every Kurmanji dialect.

### B. Gündoğdu (2015) — negation and affix ordering

Songül Gündoğdu (2015), “Negation in Kurmanji,” in Stela Manova (ed.), *Affix Ordering Across Languages and Frameworks*, Oxford University Press, pp. 154–172.  
DOI: https://doi.org/10.1093/acprof:oso/9780190210434.003.0007  
Accessible full chapter copy: https://www.academia.edu/3342645/Negation_in_Kurmanji_In_Manova_ed_Affix_Ordering_Across_Languages_and_Frameworks_Oxford_University_Press

Important source-scope qualification:
- The chapter states that its elicited data are from native speakers of Kurmanji living in Muş (p. 154), alongside examples from Thackston and Bedirxan & Lescot.
- §2 describes distinct present and past verb stems, agreement patterns and TAM morphology.
- §2.3, pp. 159–160 onward, analyzes negation prefix forms and their interaction with TAM prefixes.
- The analysis is a valuable specialist account of affix ordering; it is not a license to treat every Muş pattern as the universal Standard Kurmanji paradigm.

### C. Gündoğdu Yücel (2018) — doctoral dissertation

Songül Gündoğdu Yücel (2018), *Argument–Adjunct Distinction in Kurmanji Kurdish*, PhD dissertation, Boğaziçi University.  
Repository PDF: https://abis-files.bogazici.edu.tr/avesis/3420afbd-1f13-4de9-9948-d86ee87f41c3

Exact locations:
- §2.6.2, pp. 79–81: TAM, present/past stems, agreement and conjugation of çûn.
- §2.6.3, pp. 81–82: negation forms, paradigm and prefix placement.
- §2.6.4, pp. 82–84: copula and negative copula examples.
- §2.2.2, p. 53: existential nîne example vêrê hirç nîne.
- The dissertation's empirical thesis concerns Muş Kurmanji. It compares it with other Kurmanji descriptions, but Muş-specific claims must remain labelled.

### D. Thackston — pedagogical reference grammar

W. M. Thackston, *Kurmanji Kurdish: A Reference Grammar with Selected Readings*.  
PDF: https://zimannas.wordpress.com/wp-content/uploads/2020/04/kurmanji_complete.pdf

Relevant locations:
- §14, present tense, pp. 32–34.
- §16.2, future tense, pp. 40–41.
- §17, imperative, p. 42.
- §18.2, simple past transitive/ergative, pp. 47–49.
- The negative imperative paradigm on p. 42 uses né- (e.g. néçe, néke).

Thackston describes a written norm adopted by many writers but acknowledges extensive regional differences and the lack of complete standardization.

## 3. Lesson 08 — verb, stem, person and number

### 3.1 Distinct present and past stems

**Status: SUPPORTED**

Haig (2018), §2.6.1 and the stem table immediately preceding it, lists separate present and past stems for many common verbs. Examples include:
- gotin: past stem got-, present stem -bêj-;
- xwarin: past stem xwar-, present stem -xw-;
- dîtin: past stem dît-, present stem -bîn-;
- çûn: past stem çû-, present stem -ç- / -her-;
- hatin: past stem hat-, present stem -(h)ê- / -wer-.

The current lesson's statement that one must identify the relevant stem before analyzing affixes is correct.

**Pedagogical gap:** the current lesson states the principle but does not show a usable stem table or enough segmentation to teach it.

### 3.2 Person-number agreement suffixes

**Status: SUPPORTED, BUT THE CONTROLLER MUST BE TAUGHT**

Haig (2018), Table 13, p. 125, gives:
- 1SG: present -(i)m; past -(i)m;
- 2SG: present -î (imperative -e); past -(y)î;
- 3SG: present -e; past zero (-Ø);
- plural 1/2/3: present -(i)n; past -(i)n.

The surface suffix alone does not identify the grammatical relation it indexes. Haig states that finite verbs index:
- the intransitive subject in all tenses;
- the transitive subject in present tenses;
- the transitive object in past tenses.

Thus the lesson must not teach agreement as invariably “the subject ending.”

### 3.3 Directly sourced contrast set

**Status: SUPPORTED**

Haig (2018), Table 14, p. 126, directly gives the following first-person singular contrast:
- ez dibêjim — present transitive “I say”;
- ez hatim — simple past intransitive “I came”;
- min xwar — simple past transitive “I ate (something)”;
- ez dihâtim — past progressive intransitive “I was coming”;
- min dixwar — past progressive transitive “I was eating”.

The same table gives the full person contrasts:
- present transitive: ez dibêjim, tu dibêjî, ew dibêje, em dibêjin, hûn dibêjin, ew dibêjin;
- past intransitive: ez hatim, tu hatî, ew hat, em hatin, hûn hatin, ew hatin;
- past transitive: min xwar, te xwar, wî/wê xwar, me xwar, we xwar, wan xwar.

This is a suitable evidence-backed compact paradigm. It should be segmented and glossed only after an editor checks the chosen variety and Sorani terminology.

### 3.4 What must not be simplified

**Status: NOT SUPPORTED if stated as a universal**

- The same person suffix does not always index the subject.
- The past transitive agent is Oblique and the verb agrees with the Direct patient in the canonical Standard Kurmanji pattern.
- Muş/Serhed varieties may show double-oblique patterns and default third-person singular agreement; Gündoğdu's work is especially important for those patterns.
- Third-person singular past agreement may be zero; do not omit zero agreement from a full paradigm without explanation.

**Proposed action (not applied):** add a short source-attested contrast table with present transitive, past intransitive and past transitive examples, then a note explaining which argument controls agreement in each construction.

## 4. Lesson 09 — present, past and future

### 4.1 Present/past contrast examples

**Status: SUPPORTED**

The lesson's three examples ez dibêjim, ez hatim, and min xwar are directly present in Haig (2018), Table 14, p. 126. The lesson should explicitly label them:
- present transitive;
- past intransitive;
- past transitive.

They do not illustrate interchangeable tense endings. Their argument case and agreement controller differ.

### 4.2 Past simple versus past progressive

**Status: SUPPORTED**

Haig Table 14 contrasts:
- ez hatim (simple past intransitive) with ez dihâtim (past progressive intransitive);
- min xwar (simple past transitive) with min dixwar (past progressive transitive).

The seed lesson's use of ez dihatim and min dixwar as contrast examples is directionally supported, but it should preserve Haig's exact spelling and diacritics if presented as a quotation.

### 4.3 Future construction

**Status: SUPPORTED FOR THE STANDARD DESCRIPTION**

Haig (2018), §2.6.4, pp. 128–129, states that future is expressed by a particle (d)ê or wê plus a present subjunctive form. The particle commonly occurs in clause-second position. High-frequency verbs such as gotin ‘say’ generally omit the subjunctive prefix bi- in the future construction.

Direct source example (Haig's printed form):
ew dê mesel-ê ji te re bêj-ê  
Gloss: “He will tell you the issue.”

### 4.4 Current lesson transcription is not verbatim

**Status: PARTLY SUPPORTED; EXACT QUOTATION CLAIM NOT SUPPORTED**

The current seed lesson has:
ew dē mesel-ē ji te re bēž-e

Haig's printed form is:
ew dê mesel-ê ji te re bêj-ê

The visible differences include:
- dē versus dê;
- mesel-ē versus mesel-ê;
- bēž-e versus bêj-ê;
- differing macron/circumflex and consonant notation.

These may reflect an intended transcription convention or a regional/house-style adaptation, but no evidence in the reviewed material establishes that. The sentence must not be labelled a verbatim Haig quotation as it currently stands.

**Proposed action (not applied):**
- Either reproduce Haig's exact source transcription and label it as a quotation;
- or retain the lesson's form only after a Kurmanji specialist confirms it, and label it an adapted example with the relevant variety/transcription convention.

Do not silently normalize diacritics or consonants without an approved orthography policy.

### 4.5 Negative future

**Status: SUPPORTED, WITH DIALECT DISTINCTION**

Haig (2018), p. 129, says Standard Kurmanjî and contemporary written Kurdish can retain the future auxiliary in negative clauses, using subjunctive negation ne-. In Behdinî, there is no dedicated negative future construction in the described pattern; negative indicative is used instead.

**Editorial consequence:** if negative future is taught in this lesson or elsewhere, distinguish Standard K. from Behdinî; do not turn one pattern into a pan-dialectal rule.

## 5. Lesson 10 — negation and questions

### 5.1 Negation is morphologically sensitive to stem and TAM

**Status: SUPPORTED**

Haig (2018), §2.6.1, pp. 125–126, and Gündoğdu (2015), §§2–3, describe the interaction between present/past stems, TAM markers and negative prefixes. The lesson's broad statement that negation cannot be reduced to one invariant prefix is correct.

### 5.2 Standard Kurmanji negation distribution

**Status: SUPPORTED FOR THE STANDARD DESCRIPTION**

Haig (2018), pp. 125–126, gives the following broad distribution:
- present indicative na- replaces the affirmative di-;
- present subjunctive ne- replaces bi-;
- present-stem exceptions zanîn ‘know’ and karîn ‘be able’ use ni- (e.g. nizanim, nikarim);
- simple past and past progressive use ne- in the Standard K. description (e.g. ne-hatin, ne-di-hatin).

Haig's footnote records a western Kurmanjî (Adıyaman–Urfa) past-progressive negation pattern using na-, e.g. na-de-kir-in. This is an explicit dialect exception.

Gündoğdu (2015), pp. 154–172, analyzes the three forms n(a)-, n(e)-, ni- and their competition with TAM prefixes. However, her elicited data are from Muş. Use the chapter as a specialist analysis of templatic morphology, while grounding the standard paradigm in Haig and explicitly identifying dialect scope.

### 5.3 Prefix blocking and past progressive

**Status: SUPPORTED, WITH A CRUCIAL DISTINCTION**

For present-stem forms, the negative prefix and TAM prefixes di-/bi- compete for the same prefix position:
- diçim — I am going;
- naçim — I am not going;
- biçim — that I go;
- neçim — that I do not go.

The negative prefix replaces the present-stem TAM prefix in these examples.

For past progressive, however, the past-stem di- can remain after the negative prefix:
- diçûm — I was going;
- nediçûm / ne-di-çû-m — I was not going.

Therefore the simplified statement “negation always removes di-” is false. The position and compatibility depend on whether the verb form is based on the present or past stem.

### 5.4 Non-verbal/nominal predicate negation

**Status: STRUCTURE SUPPORTED; CURRENT EXACT EXAMPLE IS ADAPTED**

Gündoğdu Yücel (2018), §2.6.4, pp. 82–84, directly attests:
Ez ne xwandekar im.
“I am not a student.”

The lesson's:
Ez ne mamosteyek im.
“I am not a teacher.”

follows the same non-verbal negative-copula structure but is not the exact source sentence. It should be labelled adapted/instructor-created unless separately attested.

The same dissertation explains that non-verbal negation and negation of the copula verb bûn are different constructions. It provides separate present, past and inchoative examples. The lesson should not collapse nominal predicate negation, copular bûn and verbal negation into one formula.

### 5.5 Existential/location negation

**Status: CONSTRUCTION SUPPORTED; EXACT LESSON SENTENCE UNRESOLVED**

Gündoğdu Yücel (2018), §2.2.2, p. 53, gives:
vêrê hirç nîne
“There are no bears here.”

This confirms an existential negative construction with nîne. However, the exact seed example:
Ew li vir nîne
“He/she is not here.”

was not found verbatim in the sources checked. Its intended locative reading should be validated as a whole sentence by a native Kurmanji specialist. Do not assume that a source's existential example automatically authenticates every location/copular use of nîne.

### 5.6 Negative imperative

**Status: SUPPORTED WITH VARIETY/REFERENCE DIFFERENCES**

Thackston §17, p. 42, gives negative imperatives with né-, including forms corresponding to “do not go” and “do not do it.” Gündoğdu Yücel (2018), §2.6.3, identifies prohibitive me- in the paradigm she describes.

The current seed uses ne- and mentions me- as an older/regional form. The broad distinction is plausible, but the exact regional distribution and the label “older” require stronger evidence than the currently cited lesson provides.

**Proposed action (not applied):** retain the selected written-standard imperative only after confirming it with the reference grammar; present me- as a variety-specific prohibitive form only with a precise source and locality label.

### 5.7 Question formation section

**Status: PEDAGOGICALLY UNDER-SUPPORTED**

The current lesson has a general description of yes/no and information questions but does not include worked Kurmanji question sentences in its body. The earlier source register correctly marks the exact intended examples unresolved.

The existence of general Kurmanji interrogative words and question strategies elsewhere in the course does not certify this lesson's own question section. Do not invent examples to fill the gap. Any future addition should be source-attested or reviewed by a native speaker, with the question type and variety stated.

## 6. Cross-lesson consistency requirements

| Topic | Required consistent treatment |
|---|---|
| Present/past stems | Teach separate stems and identify suppletive/apophonic verbs; do not assume one unchanged lexical stem |
| Person-number agreement | State the controller: intransitive subject all tenses; transitive subject present; transitive object past in the canonical standard pattern |
| Third singular | Explain zero past agreement (-Ø) rather than implying every form has an audible suffix |
| Present indicative | di- plus present stem and agreement; scope as a standard pattern |
| Present subjunctive | bi- plus present stem and agreement, with dialectal zero-prefix patterns where documented |
| Future | (d)ê/wê plus subjunctive; high-frequency verbs such as gotin may omit bi- |
| Present negation | na- generally replaces di-; ne- replaces bi- |
| Lexical negation | nizanim, nikarim are specific lexical forms; do not generalize ni- to all verbs |
| Past negation | Standard simple/past-progressive ne-; note Western Kurmanjî past-progressive na- variant |
| Past progressive | Negation may precede and coexist with past-stem di-; do not claim di- is always deleted |
| Non-verbal negation | Distinguish ne- + predicate + enclitic copula from verbal negation |
| Existential negation | Use a source-attested existential example; separately validate locative/copular examples |
| Negative imperative | Keep reference-standard ne-/né- separate from dialect-specific prohibitive me- |
| Questions | Do not leave only a generic description under a lesson heading promising question formation; add no unsourced sentences |

## 7. Priority closure queue

### P0 — before scientific certification
1. Expand Lesson 08 with source-checked present transitive, past intransitive and past transitive paradigms; identify the agreement controller.
2. Correct Lesson 09's future example transcription or explicitly classify it as an adapted form; do not present it as a verbatim Haig quotation.
3. Keep the negative-prefix table tied to stem/TAM, and explicitly show that past-progressive di- can coexist after ne-.
4. Separate verbal, non-verbal copula and existential negation in Lesson 10.
5. Validate Ew li vir nîne as a complete sentence or replace it only after specialist/editor approval.
6. Add no question examples until a source and native speaker verify the exact forms; otherwise narrow the lesson title/outcome so it does not promise unprovided content.

### P1 — after P0
7. Confirm the course reference variety and label all Muş, Western, Behdinî and Standard K. forms accurately.
8. Native Kurmanji specialist checks every inflected example and the transcription of the future example.
9. Native Sorani editor reviews the explanations and all Sorani glosses.
10. Tag each example as source-attested, adapted or instructor-created.

## 8. Actions not taken

No lesson body, static shell, seed SQL, migration, schema, site code, validator, CI workflow, test, database, PR, deployment or main branch was changed. No SQL was executed. This is a source review and proposal-only action queue.

## 9. References

1. Haig, Geoffrey. 2018. “Northern Kurdish (Kurmanjî).” In Geoffrey Haig & Geoffrey Khan (eds.), *The Languages and Linguistics of Western Asia: An Areal Perspective*, pp. 106–158. DOI: https://doi.org/10.1515/9783110421682-004. Key locations: §2.6.1, pp. 125–126; §2.6.2, p. 127; §2.6.3, pp. 127–128; §2.6.4, pp. 128–129; §3.4, pp. 146–147. PDF: https://www.uni-bamberg.de/fileadmin/aspra/06_Team/Publications_and_CV/haig_2018_ch.2.3_northern_kurdish.pdf
2. Gündoğdu, Songül. 2015. “Negation in Kurmanji.” In Stela Manova (ed.), *Affix Ordering Across Languages and Frameworks*, pp. 154–172. Oxford University Press. DOI: https://doi.org/10.1093/acprof:oso/9780190210434.003.0007. Accessible copy: https://www.academia.edu/3342645/Negation_in_Kurmanji_In_Manova_ed_Affix_Ordering_Across_Languages_and_Frameworks_Oxford_University_Press
3. Gündoğdu Yücel, Songül. 2018. *Argument–Adjunct Distinction in Kurmanji Kurdish*. PhD dissertation, Boğaziçi University. Relevant sections: §2.6.2–2.6.4, pp. 79–84; §2.2.2, p. 53. https://abis-files.bogazici.edu.tr/avesis/3420afbd-1f13-4de9-9948-d86ee87f41c3
4. Thackston, W. M. *Kurmanji Kurdish: A Reference Grammar with Selected Readings*. §14, pp. 32–34; §16.2, pp. 40–41; §17, p. 42; §18.2, pp. 47–49. https://zimannas.wordpress.com/wp-content/uploads/2020/04/kurmanji_complete.pdf

## Backup record

- Pre-work backup: backup/kurmanji-c2-l08-10-verb-morphology-review-before-2026-11-17
- Baseline SHA: 8be2490548cb8e8f49ca56717c7fbfffd3bd31a5
- Post-work backup: to be recorded after commit and exact ref/blob verification.
