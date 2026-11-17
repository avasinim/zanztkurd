# Northern Kurmanji Course 2 — integrated 12-lesson evidence closure report

Date: 2026-11-17  
Branch: fix/kurmanji-ci-current-migration  
Baseline HEAD: d957bd6ccddbb3bad8559712e57900e617edfc7b  
Pre-work backup: backup/kurmanji-c2-integrated-12-lesson-closure-before-2026-11-17  
Scope: consolidate the 12-lesson source review, claim-level evidence register, correction proposal, Lesson 10 interrogative addendum, and detailed Lessons 08–10 claim review. Documentation only.

## 1. Executive disposition

**Course 2 (12 lessons): evidence review consolidated; not release-certified.**

The course's overall grammar sequence is coherent and broadly supported by descriptive research on Northern Kurmanji. However, a source-supported grammar statement is not the same as a fully taught, learner-ready lesson. Across the course, the main deficiencies are missing worked paradigms, incomplete coverage of what lesson titles promise, transcription/variety labelling, and an assessment design that is not yet specified.

The latest review of Lessons 08–10 adds important detail:
- verb agreement must not be taught as always indexing the subject;
- the future example in Lesson 09 differs from Haig's printed transcription and must not be represented as a verbatim quotation;
- negation depends on stem and TAM structure; present and past-progressive forms cannot be collapsed into one prefix rule;
- Lesson 10 now has credible academic evidence for wh-questions and yes/no questions, but the exact lesson body has not yet been updated and the source varieties must remain explicit.

No lesson text, seed SQL, migration, schema, application code, test, database, PR, deployment or main branch was changed.

## 2. Consolidated status by lesson

| Lesson | Topic | Evidence status | Remaining closure requirement |
|---:|---|---|---|
| 01 | Morphology and word structure | Core definitions supported | Add segmented, source-checked Kurmanji examples for root, morpheme and word; distinguish morpheme from phoneme/syllable |
| 02 | Root, stem, prefix and suffix | Definitions supported | Add at least one verified prefix and one suffix example with careful segmentation; do not make morphology appear suffix-only |
| 03 | Noun, gender and number | Gender and case relevance supported | Teach Standard Kurmanji direct/oblique plural paradigm; mark direct indefinite -in as restricted/variable, not universal |
| 04 | Definite/indefinite nouns and -ek | Main contrast supported | Keep oblique case endings -î/-ê distinct from ezafe -î; add side-by-side segmentation and full case context |
| 05 | Ezafe and noun–adjective relation | Strongly supported | Explain head-noun gender/number agreement, oblique possessor marking, and linking vs free/demonstrative ezafe as distinct matters |
| 06 | Possession and possessive pronouns | mal-a me and reflexive xwe example supported | Title promises more than the body supplies; add a scoped paradigm or narrow the lesson scope. Distinguish oblique personal pronouns used as possessors from independent possessive forms |
| 07 | Personal pronouns and direct/oblique case | Six direct/oblique pairs supported | Add contrastive sentence examples; explain that oblique is not simply “object” and direct is not simply “subject” |
| 08 | Verb, stem, person and number | Core rules supported; pedagogy incomplete | Add source-attested present transitive, past intransitive and past transitive paradigms; teach which argument controls agreement |
| 09 | Present, past and future | Tense/TAM framework supported; exact future transcription unresolved | Verify ew dē mesel-ē ji te re bēž-e against Haig's ew dê mesel-ê ji te re bêj-ê; classify as adapted or quote verbatim |
| 10 | Negation and questions | Verbal negation and question strategies supported with scope; lesson body incomplete | Separate verbal, non-verbal and existential negation; add sourced interrogatives only after native specialist review; label variety |
| 11 | Word order and clause structure | SOV default and information-structure sensitivity supported | Include Goal/recipient placement and pragmatic fronting; avoid one universal fixed template |
| 12 | Review and final test | Curriculum review scope supported; formal test claim unsupported | State honestly whether this is self-review or a scored assessment; do not imply validated proficiency or certification without a specification |

## 3. Consolidated high-priority linguistic findings

### 3.1 Nominal morphology, plural and ezafe (Lessons 03–06)

Haig's Standard Kurmanjî description supports the distinction among grammatical gender, direct/oblique case, plural marking, indefinite -ek, and ezafe. The course should not merge these into one “noun ending” concept.

Required distinctions:
- In the Standard Kurmanji paradigm, direct plural is generally unmarked, while oblique plural commonly has -a(n).
- Direct indefinite plural -in is regionally restricted/variable and must not be taught as a universal marker.
- Singular -ek marks indefiniteness; it is not a definite article.
- Ezafe agrees with the head noun in gender/number. This agreement is separate from external case marking.
- An oblique possessor and the ezafe on the head noun perform different grammatical functions.
- Linking ezafe, free ezafe and demonstrative constructions should not be treated as interchangeable.

The existing lessons identify much of this framework but need actual paradigms and segmentations to teach it.

### 3.2 Direct/oblique case and split alignment (Lessons 04, 06–09, 11)

The direct/oblique distinction is not equivalent to a simple subject/object distinction. In the canonical Standard Kurmanji pattern:
- intransitive subjects are direct;
- present transitive subjects are direct;
- past transitive agents are oblique;
- the direct object/patient in past transitive clauses controls verbal agreement.

This is a tense-sensitive alignment pattern, not a universal shortcut for all Kurmanji dialects. Regional varieties may differ, including patterns with double-oblique marking and default agreement. Lesson examples must identify the reference variety and not silently generalize Standard Kurmanji.

### 3.3 Verb stems, agreement and TAM (Lessons 08–09)

Haig (2018), §2.6.1 and Tables 13–14, documents distinct present and past stems and person/number agreement patterns. The source-attested contrast is:
- ez dibêjim — present transitive;
- ez hatim — past intransitive;
- min xwar — past transitive.

The same surface person ending does not always index the same grammatical relation. The lesson should explain the controller:
- intransitive subject in all tenses;
- transitive subject in present;
- transitive object in past in the canonical Standard Kurmanji pattern.

Third-person singular past agreement may be zero; a full teaching paradigm must make zero marking visible rather than implying every person has an audible suffix.

### 3.4 Future construction and exact transcription (Lesson 09)

Haig §2.6.4 describes future as particle (d)ê or wê plus a present subjunctive form; it is not a simple future suffix. High-frequency verbs such as gotin may omit the subjunctive bi- prefix in this construction.

Haig's printed example is:
ew dê mesel-ê ji te re bêj-ê

The lesson's current seed transcription is:
ew dē mesel-ē ji te re bēž-e

These are not textually identical. Until a Kurmanji specialist confirms the lesson's notation as an intentional variety/house-style adaptation, it must not be described as a verbatim quotation. Do not silently normalize Latin forms or diacritics.

### 3.5 Negation (Lesson 10)

The standard description distinguishes:
- na- in many present indicative forms, replacing di-;
- ne- in subjunctive forms, replacing bi-;
- lexical ni- forms with zanîn and karîn, e.g. nizanim, nikarim;
- ne- in Standard Kurmanji simple past and past progressive.

Crucial qualification: present-stem negation can replace a TAM prefix, but in past-progressive forms ne- can coexist with past-stem di- (e.g. nediçûm). Therefore “negation always deletes di-” is not a safe rule.

The negative copula, verbal negation and existential negation are different constructions. A source example Ez ne xwandekar im supports the negative non-verbal pattern; the seed's Ez ne mamosteyek im is an adapted example, not the exact cited sentence. The existential nîne is attested in vêrê hirç nîne, but the exact seed sentence Ew li vir nîne still needs whole-sentence native validation.

Muş, Western Kurmanji, Behdinî and Standard Kurmanji forms must remain labelled. Gündoğdu's 2015 negation study uses elicited Muş data; Haig's standard sketch is loosely Cizre/Botan-based and treats regional variation separately.

### 3.6 Question formation — updated evidence (Lesson 10)

The earlier register marked interrogative evidence unresolved. The 2016-11-16 addendum now supports a narrower conclusion:

**Wh-questions:** Gündoğdu (2011), pp. 37–38, documents wh-in-situ in the Standard and Muş varieties studied. Source examples include:
- Tu diçî ku? — “Where are you going?”
- Kî pirtûkê dixwîne? — “Who is reading the book?”
- Zana çi dixwîne? — “What is Zana reading?”
- Zana kîngê pirtûkê dixwîne? — “When is Zana reading the book?”

**Yes/no questions:** Gündoğdu (2011), pp. 39–40, documents intonation-based yes/no questions without an obligatory question particle in the studied data. Example:
- Te vê pirtûkê xilas kir? — “Did you finish this book?”

**Particles:** do not teach ma as an obligatory neutral universal question marker. Thackston §34 describes pragmatic/expectation-sensitive uses. gelo remains register- and variety-sensitive in the evidence reviewed.

This addendum resolves the general evidence gap, but it does not certify that the current lesson body already contains these exact source-verified examples. Before insertion, check case, spelling, dialect, Sorani gloss and lesson context. Do not translate examples into Kurmanji by guesswork.

### 3.7 Word order, Goals and information structure (Lesson 11)

Haig §2.7.1 supports SOV as a pragmatically neutral/default order in the described Standard Kurmanji pattern. It does not support a rigid invariant order:
- pragmatic focus/fronting can move constituents;
- Goal/recipient arguments require separate treatment;
- recipients with dan are commonly placed immediately after the verb in oblique case in the described pattern;
- regional varieties may place goals differently, including post-predicate positions.

The current lesson's general SOV explanation is sound but should include this Goal/recipient qualification. Any added examples must be source-attested or native-checked.

### 3.8 Review versus final assessment (Lesson 12)

The current visible lesson page is a review/open-ended analysis task. It revisits the course's grammar sequence, which is appropriate. But it does not itself specify:
- number and type of scored items;
- answer key and accepted variants;
- scoring rubric and pass threshold;
- retake rules;
- whether results are stored or linked to learner progress;
- evidence that the assessment measures a proficiency level.

Therefore call it review/self-assessment unless a separately specified and implemented assessment exists. Do not claim validated final examination, proficiency certification or pass/fail behavior from the current lesson body alone.

## 4. Required course-wide editorial controls

1. **Reference variety:** choose and document the pedagogical reference variety. Haig's Standard Kurmanjî sketch is loosely based on Cizre/Botan; it is not a universal description of every dialect.
2. **Example provenance:** tag each Kurmanji example as source-attested, adapted, or instructor-created. Do not call adapted examples quotations.
3. **Latin orthography:** preserve source spellings during evidence review. Do not normalize circumflex/macron, consonants, hyphens or morpheme boundaries without an approved orthography policy and specialist check.
4. **Sorani house style:** native Sorani copy-edit is still required. Previously recorded alternatives include پەیویستە/پێویستە and نوسین/نووسین. Do not globally replace them until the Academy's house style is approved.
5. **Terminology:** use Direct/Oblique consistently; do not equate case with grammatical role. Keep the Academy's preferred Sorani linguistic terminology consistent.
6. **Dialect labels:** Standard, Muş, Western, Behdinî and other regional forms must not be mixed in one undifferentiated paradigm.
7. **Pedagogical evidence:** where a title promises a category (plural, possessive pronouns, interrogatives, final test), the lesson must actually teach or assess it with worked examples, not only mention it.

## 5. Release-priority closure queue

### P0 — correctness and transparency
1. Select and document the reference variety.
2. Correct or classify the Lesson 09 future example transcription.
3. Teach the Lesson 08 agreement controller and present/past stem contrast.
4. Separate the Lesson 10 verbal, non-verbal and existential negation constructions.
5. Preserve the stem/TAM distinction in the negative-prefix explanation.
6. Add source-backed interrogative examples to Lesson 10 only after specialist review, or clearly state that the section is introductory and not a worked paradigm.
7. Include Goal/recipient and focus qualifications in Lesson 11.
8. Describe Lesson 12 as review/self-assessment unless a formal assessment specification is produced.

### P1 — pedagogical completeness
9. Add the Standard Kurmanji plural paradigm to Lesson 03 with regional qualification.
10. Add worked segmentation to Lessons 01–02 and case/ezafe comparisons to Lessons 04–06.
11. Add a full, scoped possessive-pronoun treatment to Lesson 06 or narrow the title.
12. Add learner-facing contrastive paradigms to Lessons 07–09.
13. Add sourced examples for nominal/existential negation and question formation to Lesson 10 after native review.
14. Define a separate assessment blueprint if Lesson 12 is intended to become a scored final test.

### P2 — editorial and technical gates
15. Complete a native Sorani editorial pass on all 12 lessons.
16. Complete a native Kurmanji specialist pass on all inflected examples and dialect labels.
17. Resolve the known seed/migration content differences only after the owner approves the canonical text source and spelling policy.
18. Independently test the approved migration against a disposable PostgreSQL/Supabase project before any production consideration.
19. Verify live lesson retrieval, authentication, enrollment/unlock, quiz scoring and progress persistence separately from static HTML/source checks.

## 6. Evidence map and source limitations

### Core descriptive grammar
Haig, Geoffrey. 2018. “Northern Kurdish (Kurmanjî).” In Geoffrey Haig & Geoffrey Khan (eds.), *The Languages and Linguistics of Western Asia: An Areal Perspective*, pp. 106–158. DOI: https://doi.org/10.1515/9783110421682-004  
Key locations: §§2.2–2.3 (nominal morphology, case, plural, pronouns, ezafe); §2.6.1–2.6.4 (verb stems, agreement, TAM, negation, future); §2.7.1 (word order and Goals); §3.4 (regional variation).  
PDF: https://www.uni-bamberg.de/fileadmin/aspra/06_Team/Publications_and_CV/haig_2018_ch.2.3_northern_kurdish.pdf

### Dialect structure and status
Haig, Geoffrey & Ergin Öpengin. 2018. “Kurmanji Kurdish in Turkey: Structure, varieties and status.”  
PDF: https://www.uni-bamberg.de/fileadmin/aspra/06_Team/Publications_and_CV/HaigOepengin2018_Kurmanji_Kurdish_.pdf

### Split alignment and agreement
Baker, Mark & Ümit Atlamaz. 2014. “On the Relationship of Case to Agreement in Split-Ergative Kurmanji and Beyond.”  
PDF: https://sites.rutgers.edu/mark-baker/wp-content/uploads/sites/199/2019/07/kurmanji-split-erg-distributed-July-2014.pdf

### Negation and affix ordering
Gündoğdu, Songül. 2015. “Negation in Kurmanji.” In Stela Manova (ed.), *Affix Ordering Across Languages and Frameworks*, pp. 154–172. Oxford University Press. DOI: https://doi.org/10.1093/acprof:oso/9780190210434.003.0007  
Accessible copy: https://www.academia.edu/3342645/Negation_in_Kurmanji_In_Manova_ed_Affix_Ordering_Across_Languages_and_Frameworks_Oxford_University_Press  
Important limitation: the elicited data are from Muş; this source is not a universal Standard Kurmanji paradigm.

### Interrogatives
Gündoğdu, Songül. 2011. *The Phrase Structure of Two Dialects of Kurmanji Kurdish: Standard Dialect and Muş Dialect.* MA thesis, Boğaziçi University, pp. 37–40 for wh-in-situ and yes/no intonation.  
Institutional PDF: https://digitalarchive.library.bogazici.edu.tr/bitstreams/c22fcd85-97d8-4c48-98ab-8cc623449fff/download

### Non-verbal negation and existential forms
Gündoğdu Yücel, Songül. 2018. *Argument–Adjunct Distinction in Kurmanji Kurdish.* PhD dissertation, Boğaziçi University. Relevant locations: §2.2.2, p. 53; §§2.6.2–2.6.4, pp. 79–84.  
PDF: https://abis-files.bogazici.edu.tr/avesis/3420afbd-1f13-4de9-9948-d86ee87f41c3

### Pedagogical reference grammar
Thackston, W. M. *Kurmanji Kurdish: A Reference Grammar with Selected Readings.* Relevant sections include present tense, future, imperative, ergative past and questions with ma.  
PDF: https://zimannas.wordpress.com/wp-content/uploads/2020/04/kurmanji_complete.pdf

## 7. Existing repository records consolidated

This integrated report supersedes neither the underlying evidence nor the detailed reports. It consolidates them:
- docs/KURMANJI-COURSE-2-12-LESSON-SOURCE-REVIEW-2026-11-16.md
- docs/KURMANJI-COURSE-2-LESSONS-01-12-CLAIM-LEVEL-EVIDENCE-REGISTER-2026-11-16.md
- docs/KURMANJI-COURSE-2-12-LESSON-CORRECTION-PROPOSAL-2026-11-16.md
- docs/KURMANJI-COURSE-2-LESSON-10-INTERROGATIVE-EVIDENCE-ADDENDUM-2026-11-16.md
- docs/KURMANJI-C2-LESSONS-08-10-VERB-TAM-NEGATION-CLAIM-REVIEW-2026-11-17.md

## 8. Actions not taken

No lesson content, HTML wrapper, split seed, migration, schema, application code, validator, test, database, PR #3, CI configuration, main or deployment was changed. No SQL was executed. This document is an evidence consolidation and proposal-only closure report.

## Backup record

- Pre-work backup: backup/kurmanji-c2-integrated-12-lesson-closure-before-2026-11-17
- Baseline SHA: d957bd6ccddbb3bad8559712e57900e617edfc7b
- Post-work backup: to be recorded after commit and exact ref/blob verification.
