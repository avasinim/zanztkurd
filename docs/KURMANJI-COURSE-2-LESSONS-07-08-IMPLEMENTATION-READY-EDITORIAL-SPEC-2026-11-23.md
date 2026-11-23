# Course 2 — Lessons 07–08: Implementation-Ready Editorial Specification
Date: 2026-11-23
Status: Documentation-only specification; awaiting owner approval before learner-facing edits.

## 1. Purpose and boundary

This specification turns the existing revision proposal, terminology cross-check and source audit for Lessons 07–08 into an actionable teaching plan. It defines the target outcomes, source-attested examples, lesson sequence, exercises, answer criteria and acceptance checks.

No lesson HTML, SQL seed, course payload, application code, database, migration, Supabase resource, main branch, deployment or production data is changed. This document does not authorize learner-facing edits.

## 2. Source hierarchy

Primary source:
- Geoffrey Haig (2018), “Northern Kurdish (Kurmanjî),” in *The Languages and Linguistics of Western Asia*, pp. 106–158.
- PDF: https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf
- Relevant locations: §2.2.1, printed pp. 114–115; Table 9, printed p. 117; Table 14, printed p. 127; §2.7.2, printed pp. 131–132.

Repository evidence reviewed:
- `docs/KURMANJI-COURSE-2-LESSONS-07-08-DETAILED-REVISION-PROPOSAL-2026-11-23.md`
- `docs/KURMANJI-COURSE-2-LESSONS-07-08-TERMINOLOGY-REGISTER-CROSSCHECK-2026-11-23.md`
- `docs/KURMANJI-COURSE-2-LESSONS-07-08-CASE-AGREEMENT-SOURCE-AUDIT-2026-11-23.md`

Use Haig's cited Standard Kurmanjî paradigm as the controlling source for the forms below. Do not silently normalize spelling, diacritics or morphology.

## 3. Non-negotiable teaching distinctions

1. **Case is not grammatical role.** Direct/oblique are morphological case labels. Subject/object are grammatical roles. They are related by construction, but they are not synonyms.
2. **Transitivity is not a universal case rule.** The subject's case differs across the cited present-transitive, past-intransitive and past-transitive paradigms.
3. **Not every past subject is oblique.** The cited intransitive past example `ez hatim` has direct `ez`.
4. **Do not overread `min xwar`.** The cited example has no overt object. It illustrates the oblique subject in the past-transitive paradigm; by itself it does not show the case of an overt object or demonstrate object agreement.
5. **Do not equate subject case with verb agreement.** Any claim about agreement must identify the agreeing element and be supported by a complete source-checked construction.
6. **Preserve Standard Kurmanjî scope.** Do not generalize the cited paradigms as exceptionless across all dialects.

## 4. Approved source-attested example inventory

| Form | Source location | Safe teaching claim |
|---|---|---|
| `ez` / `min` | Haig Table 9 | 1SG direct / oblique pronoun pair |
| `tu` / `te` | Haig Table 9 | 2SG direct / oblique pronoun pair |
| `ew` / `wî` | Haig Table 9 | 3SG masculine direct / oblique |
| `ew` / `wê` | Haig Table 9 | 3SG feminine direct / oblique |
| `em` / `me` | Haig Table 9 | 1PL direct / oblique |
| `hûn` / `we` | Haig Table 9 | 2PL direct / oblique |
| `ew` / `wan` | Haig Table 9 | 3PL direct / oblique |
| `ez dibêjim` | Haig Table 14 | Present-transitive paradigm example; direct subject pronoun |
| `ez hatim` | Haig Table 14 | Simple-past intransitive example; direct subject pronoun |
| `min xwar` | Haig Table 14 | Simple-past transitive example; oblique subject pronoun; no overt object in this example |
| `Wî mirov-î çay anî` | Haig §2.7.2, example (32), printed p. 131 | Complete past-transitive example with oblique subject phrase and overt direct object; use only as a cross-reference or clearly labelled advanced example |

Do not invent a new present-transitive clause with an overt object. If one is needed, retrieve and verify it in the grammar with exact source location, morphology and Sorani gloss before it is proposed for a lesson.

## 5. Lesson 07 — personal pronouns and direct/oblique case

### Learning outcomes

Learners should be able to:
1. match each person/number value with its direct and oblique pronoun form;
2. explain that direct `ew` is syncretic across third-person masculine singular, feminine singular and plural;
3. distinguish morphological case from grammatical role;
4. recognize that case depends on syntactic construction, not a universal subject/object shortcut.

### Required content sequence

**Block A — One aligned paradigm**

Show a single table with columns for person/number, direct form and oblique form:

| Person/number | Direct | Oblique |
|---|---|---|
| 1SG | `ez` | `min` |
| 2SG | `tu` | `te` |
| 3SG masculine | `ew` | `wî` |
| 3SG feminine | `ew` | `wê` |
| 1PL | `em` | `me` |
| 2PL | `hûn` | `we` |
| 3PL | `ew` | `wan` |

Keep the exact forms and diacritics. Do not collapse the three `ew` rows into a false claim that they represent different direct forms.

**Block B — Explain syncretism visibly**

Place a note directly beside the paradigm:
- direct `ew` is one shared form for 3SG masculine, 3SG feminine and 3PL in the cited table;
- the oblique forms `wî`, `wê` and `wan` distinguish those values;
- interpretation of direct `ew` depends on the sentence's syntax, agreement and discourse context.

**Block C — Case versus role**

Use a concise conceptual distinction:
- `بکەر` / `بەرکار`: grammatical roles;
- `حاڵەتی ڕاستەوخۆ` / `حاڵەتی ناڕاستەوخۆ`: morphological case.

Do not write a simplistic mapping such as “subject = direct” or “object = oblique” as an exceptionless rule.

**Block D — Case environments**

Summarize the source's main oblique environments as a guided reference:
- object of a present-tense transitive verb;
- certain goals and recipients;
- complements of adpositions;
- possessors in ezafe constructions;
- subjects of past-tense transitive clauses.

Explain that this is a guided overview of the cited grammar, not an exhaustive list of every construction or dialectal pattern.

### Exercises and answer criteria

**Exercise 7A — Paradigm matching**
Learner matches person/number rows with direct and oblique forms.

Full-credit criteria:
- all seven rows match the table;
- forms and diacritics are copied accurately;
- the two 3SG gender rows and 3PL row are not conflated.

**Exercise 7B — Explain `ew`**
Learner explains why `ew` appears in three rows.

Full-credit criteria:
- identifies syncretism;
- names the three values;
- notes that syntax, agreement and discourse context help interpret the form.

**Exercise 7C — Case or role?**
Learner sorts the labels “subject”, “object”, “direct” and “oblique” into grammatical role versus morphological case.

Full-credit criteria:
- subject/object are roles;
- direct/oblique are cases;
- learner does not assert a universal one-to-one mapping.

A sentence-based case-identification exercise may be added only after the editor selects and verifies complete source-attested clauses. If no suitable sentence has been verified, retain the paradigm and concept exercises rather than fabricate a clause.

## 6. Lesson 08 — verb, root, person and number

### Learning outcomes

Learners should be able to:
1. distinguish transitive from intransitive clauses in the cited examples;
2. identify the subject pronoun in each example;
3. identify the direct/oblique case of that subject pronoun;
4. explain why the three examples form a contrast;
5. state the evidence limit of `min xwar`.

### Required content sequence

**Block A — Three-way comparison**

Present the three existing Table 14 examples side by side:

| Example | Construction | Subject pronoun | Subject case |
|---|---|---|---|
| `ez dibêjim` | Present transitive | `ez` | Direct |
| `ez hatim` | Simple-past intransitive | `ez` | Direct |
| `min xwar` | Simple-past transitive | `min` | Oblique |

Preserve the current course's Sorani glosses only after checking them against the cited source. The safe core claim is the construction type and the subject-pronoun case shown in Haig Table 14.

**Block B — Interpret the contrast**

Teach the contrast in this order:
1. present transitive: direct subject pronoun;
2. simple-past intransitive: direct subject pronoun;
3. simple-past transitive: oblique subject pronoun.

Explicitly state that the third row does not mean all past subjects are oblique. The intransitive past row is the necessary counterexample.

**Block C — Evidence limit of `min xwar`**

Add a visible note:
- no overt object is expressed in the cited example;
- it can illustrate the oblique subject in the past-transitive paradigm;
- it cannot, by itself, establish the form/case of an overt object or demonstrate object agreement.

Do not add an imagined object to the example.

**Block D — Cross-reference to Lesson 11**

The complete clause `Wî mirov-î çay anî` belongs to Haig §2.7.2, example (32), printed p. 131. It is a past-transitive example with:
- `Wî mirov-î`: oblique subject phrase;
- `çay`: direct object;
- `anî`: past verb form.

If referenced, label it as a cross-reference or advanced example. Do not attribute it to §2.7.1 or describe it as the general neutral word-order example. Lesson 11's word-order analysis is a separate topic.

**Block E — Root/base and inflection**

The lesson may retain its existing explanation of verb root/base and inflected forms, but a new segmentation should not be added unless the source explicitly supports the segmentation. Keep:
- `ڕەگ` for root;
- `بنەڕەت` for base.

The course's separate term for “stem” remains provisional; do not use this specification to silently settle it.

### Exercises and answer criteria

**Exercise 8A — Classify the examples**
Learner labels each example as present transitive, simple-past intransitive or simple-past transitive.

Full-credit criteria:
- all three construction labels are correct;
- the two past examples are not grouped together as though they had the same subject case.

**Exercise 8B — Identify subject and case**
Learner identifies:
- `ez` as direct in `ez dibêjim`;
- `ez` as direct in `ez hatim`;
- `min` as oblique in `min xwar`.

**Exercise 8C — What does `min xwar` prove?**
Full-credit answer must state that it shows an oblique subject in the cited past-transitive paradigm, but no overt object is present; therefore it cannot alone demonstrate overt-object case or object agreement.

**Exercise 8D — Optional Lesson 11 cross-reference**
If the editor includes `Wî mirov-î çay anî`, learner identifies the oblique subject phrase and direct object, with the correct §2.7.2 example (32) attribution.

## 7. Cross-lesson terminology

Use the following labels consistently in both lessons:
- جێناوی کەسی
- حاڵەتی ڕاستەوخۆ
- حاڵەتی ناڕاستەوخۆ
- بکەر
- بەرکار
- کرداری تێپەڕ
- کرداری ناتێپەڕ
- کەس و ژمارە
- ڕێککەوتنی ڕێزمانی (only when the agreeing elements and construction are explicitly identified)

Do not use grammatical-role terms as synonyms for case. Preserve the existing distinction between `ڕەگ` and `بنەڕەت`. Any new Kurmanji form must be independently source-checked.

## 8. Accuracy and scope caveats

1. The pronoun table is Haig's Standard Kurmanjî paradigm; do not imply that it covers every regional variety.
2. Direct `ew` is syncretic across three values in the cited paradigm.
3. The direct/oblique distribution depends on construction and tense; do not turn the examples into an absolute rule.
4. `min xwar` has no overt object in the cited example.
5. Haig's past-transitive ergative description includes object-related agreement, but that claim requires an appropriate complete clause; do not infer it from `min xwar` alone.
6. Keep example (32) in §2.7.2, not §2.7.1.
7. Preserve all Kurmanji Latin forms and diacritics exactly.

## 9. Editorial and technical acceptance gate

Before learner-facing implementation:
- [ ] Course owner approves the Sorani terminology and explanatory wording.
- [ ] Lesson 07 displays the complete aligned Table 9 paradigm.
- [ ] Syncretic direct `ew` is explicitly explained.
- [ ] Case is visibly distinguished from grammatical role.
- [ ] Lesson 08 displays the three-way Table 14 comparison.
- [ ] Lesson 08 explicitly notes that not every past subject is oblique.
- [ ] `min xwar` is not used as evidence for an overt object's case or agreement.
- [ ] Example (32) is correctly attributed to §2.7.2 and kept as a cross-reference/advanced example.
- [ ] No unverified present-transitive object clause or invented segmentation is added.
- [ ] Exercises include answer criteria.
- [ ] Standard Kurmanjî scope is stated.
- [ ] User explicitly approves any lesson-payload changes.
- [ ] Any approved implementation is backed up and verified separately.

## 10. Explicit non-goals

This specification does not:
- rewrite lesson copy for publication;
- introduce new Kurmanji forms or clauses;
- add a full theory of ergativity;
- alter Lesson 11's word-order content or attribution;
- change lesson order, title or count;
- modify SQL, HTML, code, database, Supabase, main, deployment or production;
- claim runtime, integration or release testing.

## 11. Completion definition

The editorial design for Lessons 07–08 is ready for owner review when Lesson 07 teaches the aligned pronoun paradigm and case/role distinction, and Lesson 08 teaches the three-way construction contrast without overstating what the examples demonstrate. All example forms remain source-attested, answer criteria are explicit, and implementation remains approval-gated.
