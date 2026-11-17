# P0 claim review: Kurmanji verbal stems, tense/aspect/mood and negation

Date: 2026-11-17  
Branch: fix/kurmanji-ci-current-migration  
Starting HEAD: bdb716f5d03e1ebefbcaf98bfd61993f8f20ab52  
Pre-work backup: backup/kurmanji-p0-verbal-tam-negation-review-before-2026-11-17  
Scope: source-check Course 2 lessons 08–10 against the checked-in seed bodies and academic/reference grammars. Documentation only.

## 1. Executive result

The three lessons have a cautious conceptual structure, but they do not yet teach enough of the actual Kurmanji verb system to meet their titles and stated learning goals.

1. **Lesson 08 — verb, stem, person and number:** the three examples ez dibêjim, ez hatim, and min xwar are directly represented in Haig's Table 14 (2018, p. 127). They are useful as a contrast set, but the lesson does not show the morphology of each form or explain the agreement target. Its caution against a single agreement rule is correct.
2. **Lesson 09 — present, past and future:** the present and past contrast is source-supported. Haig describes future as a particle (d)ê or wê combined with a present subjunctive form. However, high-frequency verbs such as gotin ‘say’ and bûn ‘be’ generally omit bi- in the future. The lesson's chosen bêž-ê example is one of these exceptional forms; it must not imply that every future subjunctive lacks bi-. Haig also distinguishes Standard Kurmanji negative future ne- from Behdinî negative indicative na-.
3. **Lesson 10 — negation and questions:** the current lesson correctly avoids claiming that na- works identically with every verb and includes nizanim and nikarim. But it leaves the three negative prefix forms n(a)-, n(e)-, and ni- unexplained, omits the interaction/blocking between negation and di-/bi-, and gives no sourced worked interrogative paradigms. Thackston's §34 documents the question particle ma, but the lesson does not mention it. That section does not, by itself, substantiate all ordinary yes/no and wh-question patterns.

**Disposition:** source-reviewed, not certified for release. Lessons 08–10 need more explicit paradigms, morphology segmentation, and variety-scoped examples. No lesson edits are made here.

## 2. Source basis and scope

### Geoffrey Haig (2018)

Geoffrey Haig, “Northern Kurdish (Kurmanjî),” in Geoffrey Haig & Geoffrey Khan (eds.), *The Languages and Linguistics of Western Asia: An Areal Perspective*, pp. 106–158. De Gruyter Mouton. DOI: https://doi.org/10.1515/9783110421682-004  
Author-hosted PDF: https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf  
Accessible chapter extract: https://www.uni-bamberg.de/fileadmin/aspra/06_Team/Publications_and_CV/haig_2018_ch.2.3_northern_kurdish.pdf

Pinpoint locations:
- §2.6.1 and Table 14, pp. 126–127: present, simple past and past progressive paradigms; negative past.
- §2.6.2, p. 127: suppletive present/past stems of çûn and hatin, including dialectal variation.
- §2.6.3, pp. 127–128: indicative di- and subjunctive bi- or zero in some dialects; functions of subjunctive.
- §2.6.4, p. 129: future (d)ê/wê + subjunctive, bi- omission for high-frequency gotin and bûn, and negative future contrast between Standard Kurmanji and Behdinî.
- §2.6.1 footnote 8, p. 127: Western Kurmanji (Adıyaman–Urfa) uses na- for the negative past progressive, unlike the ne- pattern described for the main Standard K. sketch.
- §2.6.3 note 9, p. 128: zanîn usually takes the ni- form for the negated simple past.

Haig explicitly identifies his “Standard Kurmanjî” sketch as loosely based on Cizre/Botan and treats regional variation separately (pp. 107–109). It is not a universal grammar of every Kurmanji variety.

### Songül Gündoğdu (2015)

Songül Gündoğdu, “Negation in Kurmanji,” in Stela Manova (ed.), *Affix Ordering Across Languages and Frameworks*, Oxford University Press, pp. 154–172. DOI: https://doi.org/10.1093/acprof:oso/9780190210434.003.0007  
Publisher abstract: https://academic.oup.com/book/36257/chapter-abstract/316293132

The published abstract states that Kurmanji verb stems encode tense and have distinct present and past shapes; person agreement and TAM information are distributed across stems and affixes; negation has three principal prefix forms n(a)-, n(e)-, and ni-; and negation blocks certain TAM prefixes, including progressive di- and subjunctive bi-. The full chapter text was not accessible in this review, so detailed claims below are limited to the abstract unless separately supported by Haig or Thackston.

### W. M. Thackston

W. M. Thackston, *Kurmanji Kurdish: A Reference Grammar with Selected Readings*, especially:
- §14, pp. 32–34: present stem, di-, person endings, irregular present forms, and negative na-/ni-.
- §16.2, pp. 40–42: future particle and subjunctive.
- §18, pp. 43–49: simple past, past progressive and ergative.
- §34, p. 79: questions with ma.

Accessible PDF: https://kurdshop.net/content/upload/1/root/kurmanji-complete.pdf

This is a detailed pedagogical reference, but it uses its own transcription conventions and should not automatically determine the project's Hawar orthographic house style.

### Repository payloads inspected

- docs/kurmanji-content-seed-part-05.sql, Course 2 lessons 08–12.
- docs/KURMANJI-COURSE-2-12-LESSON-SOURCE-REVIEW-2026-11-16.md
- docs/KURMANJI-COURSE-2-LESSONS-01-12-CLAIM-LEVEL-EVIDENCE-REGISTER-2026-11-16.md

The seed is a reviewed candidate payload, not proof of owner/editor approval or proof of the production payload.

## 3. Lesson-by-lesson claim review

### Course 2 — Lesson 08: verb, stem, person and number

**Current content:** distinguishes verb root/stem, person and number, transitivity, and the relation between verb agreement and tense. It uses ez dibêjim, ez hatim, and min xwar, attributed to Haig (2018), Table 14.

**Direct evidence:**
- Haig Table 14 (2018, p. 127) lists the same three forms in separate columns: simple present transitive ez dibêjim; simple past intransitive ez hatim; simple past transitive min xwar.
- The same table contrasts past progressive ez dihâtim and min dixwar.
- Haig §2.6.1 states that agreement patterns in the past depend on verb transitivity.
- Thackston §14 (pp. 32–34) explains that present stems are not always predictable from infinitives; common irregular stems such as dîtin > bîn- and xwestin > xwaz- must be learned as principal parts.
- Thackston's present paradigm shows di- + present stem + person ending, with separate consonant- and vowel-stem endings.

**Assessment:** The lesson's contrast is accurate and useful, but it is not a complete paradigm. It does not segment the forms, show person endings, or explain why min is oblique in min xwar. The learner receives an abstract account of agreement without a worked paradigm.

**Proposed action (not applied):**
1. Add a three-row analysis table marking person, stem, tense/aspect, transitivity and agreement target.
2. Use present transitive, past intransitive and past transitive examples as a minimal contrast set.
3. Add one complete present conjugation table for a regular consonant stem and one irregular stem only after editorial choice of the reference paradigm.
4. Explain that present and past stems can differ; do not mechanically derive all present stems by deleting the infinitive ending.
5. Keep direct/oblique case and agreement separate: an oblique agent in a past transitive clause is not the agreement target in the canonical pattern.

Do not generalize that the verb always agrees with the grammatical subject.

### Course 2 — Lesson 09: present, past and future

**Current content:** describes present and past as different patterns, uses ez dibêjim, ez hatim, min xwar, contrasts ez hatim with ez dihatim and min xwar with min dixwar, and quotes ew dē mesel-ē ji te re bēž-ê as a future example.

**Direct evidence:**
- Haig Table 14 (2018, p. 127) supports the main present/past forms and past progressive contrasts.
- Haig §2.6.4 (2018, p. 129) says future is expressed by (d)ê or wê plus a present subjunctive form.
- Haig explicitly notes that high-frequency verbs such as gotin ‘say’ and bûn ‘be’ generally drop the bi- prefix in the future (p. 129).
- Haig example (27) gives ew dê mesel-ê ji te re bêž-ê, glossed ‘He will tell you the issue’. The form of gotin in this example is the high-frequency exception discussed immediately above it.
- Haig distinguishes negative future in Standard Kurmanji (Ez ē sibe bi wan re ne-či-m) from Behdinî, which uses a negative indicative (Ez sibe digel wan na-či-m) (p. 129).
- Thackston §16.2 (pp. 40–42) gives ezê biçim, tu dê biçî, ewê biçe and negative counterparts, and notes contraction of pronoun + future particle.

**Assessment:**
- The core future construction is supported.
- The lesson does not state the important bi- exception for gotin and bûn. Since its selected example uses gotin, it should explain why the prefix is absent there.
- The lesson's example transcription dē ... bēž-ê appears to follow Haig's transcriptional rendering rather than ordinary Hawar orthography. The exact source transcription may be preserved in a source quotation, but the course should distinguish source/phonetic transcription from learner-facing Hawar spelling. Do not silently normalize or teach the transcription as standard spelling.
- The future negative distinction is not taught, despite its value in preventing transfer of a Behdinî pattern to Standard Kurmanji.

**Proposed action (not applied):**
1. Present the baseline future pattern: future particle (d)ê/wê + present subjunctive.
2. Explain that bi- is usual in the Standard pattern but is commonly absent with high-frequency gotin and bûn; also state that some regional varieties differ.
3. Use a regular verb such as Haig's bi-gir-im as the fully segmented model, then show gotin as an explicitly labelled exception.
4. Add a separate note on negative future: Standard Kurmanji ne- with the future construction; do not conflate with Behdinî negative indicative na-.
5. Preserve exact source transcription in a citation note if needed, but give learner-facing spelling according to the course's approved Hawar orthographic policy.
6. Do not turn the present/past/future contrast into a claim that tense is always marked by one prefix.

### Course 2 — Lesson 10: negation and questions

**Current content:** says na- negates many present forms and often replaces di-; notes exceptions; includes nizanim and nikarim; gives ne-hatin and ne-di-hatin for past negation; introduces yes/no questions and wh-words generically.

**Direct evidence:**
- Haig §2.6.1 (2018, pp. 126–127) describes ne- for simple and progressive past (ne-hatin, ne-di-hatin), with a footnote that Western Kurmanji (Adıyaman–Urfa) uses na- for negative past progressive.
- Haig §2.6.2 (p. 127) gives Standard K. têm ‘I come’ and nayêm ‘I do not come’, and Western forms such as terim/narim, demonstrating that present stem and negation patterns vary.
- Haig §2.6.3 (p. 128) describes indicative di- versus subjunctive bi- (or zero in some dialects).
- Haig §2.6.3 note 9 (p. 128) notes zanîn commonly takes ni- in negated simple past.
- Gündoğdu (2015) abstract identifies three principal negative prefixes n(a)-, n(e)-, ni- and explains that negation blocks TAM prefixes such as progressive di- and subjunctive bi-.
- Thackston §14 (pp. 33–34) gives the present negative pattern where na- replaces di-, irregular zanîn and karîn with ni- (nizanim, nikarim), and irregular present forms of hatin and anîn.
- Thackston §18.1, p. 47, describes ne- for past habitual/progressive in the variety covered by his grammar.
- Thackston §34, p. 79, describes ma as a particle for tag/expectation questions and certain negative/contradictory questions.

**Assessment:**
- The seed correctly warns that na- is not universal and includes two high-value irregular examples.
- It is incomplete to teach negation as just na- in the present and ne- in the past. Learners should see the three forms and understand that distribution depends on tense/aspect/mood and lexical exceptions.
- Nizanim and nikarim are valuable irregular present negatives in Thackston; Haig also notes zanîn with ni- in a negated simple past. The lesson must not collapse all occurrences into one unqualified exception list.
- Ne-hatin and ne-di-hatin are cited by Haig as ‘they did not come’ and ‘they were not coming’; if shown as forms, label them as finite examples and state their person/number, rather than leaving them looking like bare infinitives.
- The question section has no cited examples, no explanation of word order or intonation, and no source-backed wh-word paradigm. Thackston's ma is a useful question type, but it is not a substitute for ordinary information questions. The current generic statements are pedagogically under-supported.

**Proposed action (not applied):**
1. Build a source-scoped table for affirmative/negative present, simple past and past progressive.
2. Show di- → na- in the regular present pattern, but distinguish irregular ni- verbs such as zanîn and karîn.
3. Show Standard Kurmanji past ne- and note the Western Kurmanji progressive-past variation documented by Haig.
4. Include the subjunctive/future interaction: negative future uses ne- in Standard Kurmanji, not a simple transfer of the ordinary present na- rule.
5. Explain that the negation prefix can block competing TAM prefixes; do not write forms as if na-, ne-, ni-, di- and bi- freely stack.
6. Add separately sourced examples for ordinary yes/no and wh-questions; include ma only as a distinct question particle with its own pragmatic meaning.
7. Identify whether each example is source-attested, adapted or newly authored.

## 4. Cross-lesson P0 distinctions

| Distinction | Required teaching boundary |
|---|---|
| Present stem vs infinitive | Some common present stems are irregular; learn principal parts rather than assume mechanical deletion |
| Present indicative vs present subjunctive | Standard baseline di- vs bi-, with zero-prefix and other dialectal patterns |
| Person/number agreement vs subject | Agreement target depends on tense/aspect and transitivity |
| Simple past vs past progressive | They differ in form and aspect; negation also differs |
| na-, ne-, ni- | Distinct negative prefix shapes with different distributions; not interchangeable allomorphs in a universal rule |
| Negation vs TAM prefix | Negation may block di- or bi-; do not freely stack them |
| Future particle vs subjunctive prefix | Future (d)ê/wê plus subjunctive; bi- often absent with gotin and bûn |
| Standard Kurmanji vs Behdinî/Western varieties | Negative future and past-progressive negation differ by variety |
| Source transcription vs Hawar orthography | A phonetic/source transcription must not silently become learner-facing standard spelling |
| Yes/no, wh- and ma questions | Distinct constructions; evidence for one does not establish all question types |

## 5. Priority and acceptance criteria

### P0 — before scientific certification
1. Lesson 08: add one fully segmented verb paradigm and clarify agreement target in the three source-attested contrasts.
2. Lesson 09: add the gotin/bûn bi- omission note and a source-scoped negative future contrast.
3. Lesson 10: present na-/ne-/ni-, TAM blocking, irregular verbs and dialect variation accurately.
4. Lesson 10: add source-checked yes/no and wh-question examples; distinguish ma tag/expectation questions.
5. Separate Standard Kurmanji from Behdinî and Western Kurmanji claims.
6. Separate Hawar orthography from phonetic/source transcription in every quoted example.

### P1 — after P0
7. Have a Kurmanji editor check every inflected form and a Sorani editor check all Sorani explanations and glosses.
8. Verify all new examples against a cited grammar or corpus; do not invent an example merely to complete a paradigm.
9. Decide whether Course 2 Lesson 10's title is “negation and questions” or whether the question section should be expanded to match that title.
10. Record exact edition/page/section, variety, register and provenance for each example.

### Acceptance tests for any later approved patch
- Present stems, past stems and infinitives are distinguished correctly.
- di-, bi- and negative prefixes are not presented as freely co-occurring.
- Regular and irregular present negatives are distinguished.
- Simple past and past progressive negation are distinguished.
- Standard Kurmanji and Behdinî/Western variation are explicitly scoped.
- Future examples distinguish regular subjunctive bi- from the gotin/bûn exception.
- Agreement explanations identify the actual agreement target.
- Questions are illustrated by sourced constructions, with ma labelled by its pragmatic function.
- All source transcriptions are clearly distinguished from Hawar spelling.
- Existing course inventory and unrelated lesson text remain unchanged.

## 6. Actions not taken

No lesson text, seed SQL, migration, schema, validator, application code, workflow, test, database, PR, deployment or main branch was changed. No SQL was executed. This is a source review and proposed action list only.

## 7. References

1. Haig, Geoffrey. 2018. “Northern Kurdish (Kurmanjî).” In Geoffrey Haig & Geoffrey Khan (eds.), *The Languages and Linguistics of Western Asia: An Areal Perspective*, pp. 106–158. De Gruyter Mouton. DOI: https://doi.org/10.1515/9783110421682-004. Relevant: §2.6.1 and Table 14, pp. 126–127; §2.6.2, p. 127; §2.6.3, pp. 127–128; §2.6.4, p. 129. PDF: https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf
2. Gündoğdu, Songül. 2015. “Negation in Kurmanji.” In Stela Manova (ed.), *Affix Ordering Across Languages and Frameworks*, pp. 154–172. Oxford University Press. DOI: https://doi.org/10.1093/acprof:oso/9780190210434.003.0007. Note: only the publisher abstract/metadata was accessible; detailed claims are restricted to the abstract.
3. Thackston, W. M. *Kurmanji Kurdish: A Reference Grammar with Selected Readings*. Relevant: §14, pp. 32–34; §16.2, pp. 40–42; §18.1, p. 47; §34, p. 79. PDF: https://kurdshop.net/content/upload/1/root/kurmanji-complete.pdf

## Backup record

- Pre-work backup: backup/kurmanji-p0-verbal-tam-negation-review-before-2026-11-17
- Starting SHA: bdb716f5d03e1ebefbcaf98bfd61993f8f20ab52
- Post-work backup: to be recorded after commit and exact ref/blob verification.
