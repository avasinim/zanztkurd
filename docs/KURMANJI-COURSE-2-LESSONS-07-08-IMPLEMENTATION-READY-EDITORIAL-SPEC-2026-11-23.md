# Course 2 — Lessons 07–08: Implementation-Ready Editorial Specification
Date: 2026-11-23
Status: Documentation-only editorial specification; learner-facing changes require explicit owner approval.

## 1. Purpose and change boundary

This specification converts the existing source audits, terminology cross-check and revision proposal into a practical revision blueprint for Lessons 07 and 08. It defines learning outcomes, source-attested forms, the exact distinctions to teach, exercise criteria and editorial checks.

It does not authorize changes to lesson HTML, SQL seed data, course payloads, application code, databases, migrations, Supabase, main, deployment or production. No learner-facing lesson content is modified here.

## 2. Evidence base

Primary source: Geoffrey Haig (2018), “Northern Kurdish (Kurmanjî),” in *The Languages and Linguistics of Western Asia*.
PDF: https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf

Relevant source locations:
- §2.2.1, printed pp. 114–115: direct/oblique case and its syntactic environments.
- §2.2.3, Table 9, printed p. 117: Standard Kurmanjî personal pronoun paradigm.
- Table 14, printed p. 127: verb paradigms, including the cited present and simple-past examples.
- §2.7.2, printed pp. 131–132: past-transitive ergative alignment and example (32), `Wî mirov-î çay anî`.

Repository evidence reviewed:
- `docs/KURMANJI-COURSE-2-LESSONS-07-08-DETAILED-REVISION-PROPOSAL-2026-11-23.md`
- `docs/KURMANJI-COURSE-2-LESSONS-07-08-TERMINOLOGY-REGISTER-CROSSCHECK-2026-11-23.md`
- `docs/KURMANJI-COURSE-2-LESSONS-07-08-CASE-AGREEMENT-SOURCE-AUDIT-2026-11-23.md`
- `docs/KURMANJI-COURSE-2-MASTER-AUDIT-SYNTHESIS-AND-SIGNOFF-GATE-2026-11-23.md`

The checked seed snapshot previously recorded for this review is `docs/kurmanji-content-seed-part-05.sql`, blob SHA `2581b9362ee7a0972076d475db56b034e0e662cb`. This is repository evidence, not proof of live deployed content.

## 3. Core principles that both lessons must preserve

1. **Case is not grammatical role.** Direct/oblique are morphological case labels; subject/object are grammatical relations. They must not be taught as interchangeable terms.
2. **Case is construction-sensitive.** Tense, transitivity and other syntactic environments affect the form selected. Avoid absolute shortcuts.
3. **Direct `ew` is syncretic.** It serves third-person masculine singular, feminine singular and plural in the cited paradigm; surrounding syntax, agreement and discourse context contribute to interpretation.
4. **The past-transitive pattern is not the whole language.** The course should teach the specific Standard Kurmanjî pattern described by Haig, not an overgeneralized theory that every past subject is oblique.
5. **Preserve source forms.** Do not normalize, respell, generate or extend Kurmanji Latin forms without a separate source check and approval.
6. **Separate subject case from object case and verb agreement.** An example with no overt object cannot be used to demonstrate the morphology of an overt object or object agreement.

## 4. Lesson 07 specification — جێناوە کەسییەکان و حاڵەتی ڕاستەوخۆ و ناڕاستەوخۆ

### 4.1 Learning outcomes

After revision, the learner should be able to:
- identify person and number in the personal-pronoun paradigm;
- pair each direct form with its oblique counterpart;
- explain the syncretic use of direct `ew`;
- distinguish morphological case from grammatical role;
- identify common syntactic environments in which oblique forms occur, with appropriate qualification;
- avoid the false rules “subject is always direct” and “object is always oblique”.

### 4.2 Required paradigm

Use one aligned table, not two disconnected lists:

| کەس | ژمارە | فۆڕمی ڕاستەوخۆ | فۆڕمی ناڕاستەوخۆ |
|---|---|---|---|
| یەکەم | تاک | `ez` | `min` |
| دووەم | تاک | `tu` | `te` |
| سێیەم | تاک، نێر | `ew` | `wî` |
| سێیەم | تاک، مێ | `ew` | `wê` |
| یەکەم | کۆ | `em` | `me` |
| دووەم | کۆ | `hûn` | `we` |
| سێیەم | کۆ | `ew` | `wan` |

**Mandatory note beside the table:** direct `ew` is one surface form shared by third-person masculine singular, feminine singular and plural. The oblique forms `wî`, `wê` and `wan` distinguish these values in the paradigm. Do not duplicate `ew` as if it had different spellings or imply that the form by itself identifies gender and number.

### 4.3 Required explanation: case versus role

The lesson must explain, in clear Sorani, that:
- `بکەر` and `بەرکار` name grammatical relations/roles;
- `ڕاستەوخۆ` and `ناڕاستەوخۆ` name morphological case;
- a pronoun's case cannot be predicted from a universal subject/object shortcut;
- the relevant construction, including tense and transitivity, must be examined.

Suggested explanatory wording (editorial draft only; not inserted into the lesson):
> «بکەر» و «بەرکار» ئەرکی ڕێزمانیین؛ «ڕاستەوخۆ» و «ناڕاستەوخۆ» حاڵەتی ڕێزمانیین. ئەم دوو جۆرە زانیارییە یەک شت نین. بۆ دیاریکردنی حاڵەت، دەبێت کات، تێپەڕی/ناتێپەڕی کردار و پێکهاتەی ڕستە بپشکنین.

### 4.4 Oblique-case environment map

A compact reference may list the environments described by Haig §2.2.1:
- object of a present-tense transitive verb;
- certain goals and recipients;
- complements of adpositions;
- possessors in ezafe constructions;
- subject of a past-tense transitive clause.

This is a guided map of source-described environments, not an exhaustive rule for every construction or dialect. Direct case is used in other environments described by the source. Avoid presenting the list as a mechanical substitution chart detached from syntax.

### 4.5 Example policy

The existing audit evidence confirms the paradigm, but does not provide a fully glossed direct/oblique clause pair approved for insertion into this specification. Therefore:
- use the paradigm itself for matching and classification exercises;
- do not fabricate a Kurmanji sentence to illustrate a case environment;
- if a full-clause exercise is desired, first locate the exact sentence in Haig, record its section/table/page, verify its gloss and translation, then seek owner approval;
- do not silently borrow Lesson 11's example (32) as if it were a simple minimal pair for every case environment.

### 4.6 Required exercises and marking criteria

**Exercise A — paradigm matching**
Learner pairs the direct and oblique pronouns for each person/number value.

Marking criteria:
- all six person/number groupings are correctly aligned;
- the third-person singular masculine and feminine rows are distinguished only in the oblique column;
- the shared direct `ew` is recognized as syncretic.

**Exercise B — explain `ew`**
Learner explains why the same direct form appears in three paradigm rows.

Marking criteria:
- identifies the shared form as syncretism;
- explains that syntax, agreement and discourse context can help identify the intended reference;
- does not invent distinct direct forms for gender or number.

**Exercise C — case versus role**
Learner classifies the terms “subject/object” and “direct/oblique”.

Marking criteria:
- subject/object are identified as grammatical relations;
- direct/oblique are identified as morphological case;
- learner rejects a universal one-to-one mapping.

Do not add a sentence-classification exercise until a complete source-verified sentence is approved.

## 5. Lesson 08 specification — کردار، ڕەگ، کەس و ژمارە

### 5.1 Learning outcomes

After revision, the learner should be able to:
- distinguish transitive and intransitive clauses in the cited examples;
- compare present transitive, simple-past intransitive and simple-past transitive patterns;
- identify the subject pronoun and its direct/oblique form in each example;
- explain why not every past-tense subject is oblique;
- state what `min xwar` does and does not demonstrate;
- distinguish the subject's case from the case of an overt object and from verbal agreement.

### 5.2 Required three-way comparison

Use only the three Table 14 forms already checked:

| Source example | Construction | Subject form | Case shown |
|---|---|---|---|
| `ez dibêjim` | present transitive | `ez` | direct |
| `ez hatim` | simple-past intransitive | `ez` | direct |
| `min xwar` | simple-past transitive | `min` | oblique |

Keep the source-aligned glosses already present in the lesson, subject to final editorial recheck. Do not add object words to any of these examples.

### 5.3 Mandatory interpretation note for `min xwar`

The cited example `min xwar` has no overt direct object. It demonstrates the oblique subject form in the simple-past transitive paradigm. By itself, it does **not** demonstrate:
- the case form of an overt direct object;
- the agreement morphology of a verb with an overt object;
- every component of a complete ergative clause.

This limitation must be visible in the learner explanation and answer feedback, not hidden in a teacher-only note.

### 5.4 Explain the three-way contrast precisely

The learner-facing explanation should state:
- in the cited present transitive paradigm, the subject pronoun is direct (`ez dibêjim`);
- in the cited simple-past intransitive example, the subject pronoun remains direct (`ez hatim`);
- in the cited simple-past transitive example, the subject pronoun is oblique (`min xwar`).

The key contrast is therefore **past transitive versus past intransitive**, not “present versus all past”. Do not claim that all past subjects are oblique.

### 5.5 Cross-reference to Lesson 11 — controlled use only

Haig (2018), §2.7.2, example (32), printed p.131:
`Wî mirov-î çay anî`
‘That man brought tea.’

The audit identifies:
- `Wî`: masculine singular oblique demonstrative/pronominal form in the subject phrase;
- `mirov-î`: masculine oblique noun in the subject phrase;
- `çay`: direct object;
- `anî`: past verb form.

This is a complete past-transitive example with an overt object. It belongs to the source's discussion of ergative alignment in §2.7.2, not the neutral word-order discussion in §2.7.1. If used in Lesson 08, it must be clearly labelled as a cross-reference to Lesson 11 and preserve the exact source attribution. Do not reassign it to Table 14 or describe it as a generic word-order example.

### 5.6 No invented present-transitive object example

Haig §2.2.1 supports the generalization that objects of present-tense transitive verbs occur in the oblique in the described system. The current reviewed evidence does not include a fully verified overt-object sentence approved for insertion into Lesson 08. Until one is located and checked:
- retain `ez dibêjim` as the Table 14 example;
- explain the general distribution in carefully qualified prose;
- do not invent an object or alter the cited form;
- do not use the general rule as a substitute for a worked source example.

### 5.7 Required exercises and marking criteria

**Exercise A — classify the three examples**
Learner labels each example as present transitive, simple-past intransitive or simple-past transitive.

Marking criteria:
- all three construction labels are correct;
- learner does not label `ez hatim` as transitive;
- learner does not infer that all past clauses have oblique subjects.

**Exercise B — identify subject pronoun and case**
Learner identifies the subject pronoun and its case in each cited form.

Marking criteria:
- `ez` is direct in the first two examples;
- `min` is oblique in the third;
- case labels are not replaced by subject/object labels.

**Exercise C — interpret the evidence limit**
Learner explains why `min xwar` cannot by itself demonstrate an overt object's case or agreement.

Marking criteria:
- notices there is no overt object in the cited example;
- limits the conclusion to the oblique subject in the past-transitive paradigm;
- does not claim object agreement from absent evidence.

**Exercise D — optional Lesson 11 cross-reference**
If the course owner approves inclusion of example (32), learner labels the subject phrase and overt object.

Marking criteria:
- identifies `Wî mirov-î` as the oblique subject phrase;
- identifies `çay` as the direct object;
- cites Haig §2.7.2, example (32), not §2.7.1;
- does not conflate ergative alignment with neutral word order.

## 6. Shared terminology and editorial style

Use consistently:
- personal pronoun: جێناوی کەسی
- direct case: حاڵەتی ڕاستەوخۆ
- oblique case: حاڵەتی ناڕاستەوخۆ
- grammatical role/relation: ئەرکی ڕێزمانی
- transitive: تێپەڕ
- intransitive: ناتێپەڕ
- verb: کردار
- root: ڕەگ
- base: بنەڕەت
- person/number: کەس/ژمارە

Keep root `ڕەگ` distinct from base `بنەڕەت`. Do not introduce a new stem label or morphology claim without resolving the working terminology register. Use the user's preferred Sorani wording and retain `بڕگە` if syllable terminology appears elsewhere. Preserve all Kurmanji Latin forms and diacritics.

## 7. Editorial QA checklist

Before any learner-facing edit:
- [ ] Owner approves Sorani terminology and explanatory wording.
- [ ] Haig Table 9 and §2.2.1 are checked directly for Lesson 07.
- [ ] Haig Table 14 is checked directly for the three Lesson 08 forms.
- [ ] Lesson 07 uses one aligned person/number/direct/oblique paradigm.
- [ ] Syncretic direct `ew` is explicitly explained.
- [ ] Case is clearly separated from grammatical role.
- [ ] Oblique environments are described with appropriate scope and qualification.
- [ ] Lesson 08 includes the three-way transitivity/tense contrast.
- [ ] `min xwar` is not claimed to show an overt object or object agreement.
- [ ] Example (32), if included, is attributed to §2.7.2, example (32), p.131.
- [ ] No new Kurmanji form or sentence is added without an exact source record.
- [ ] Exercises include transparent answer criteria.
- [ ] Standard Kurmanjî scope and dialect variation are handled carefully.
- [ ] The exact proposed lesson diff is approved before implementation.

## 8. Implementation sequence after approval

1. Confirm terminology and the intended scope of both lessons with the course owner.
2. Re-fetch the exact current lesson payloads and seed file; record their blob SHAs immediately before editing.
3. Prepare a narrow proposed diff for Lessons 07–08 only.
4. Independently check every Kurmanji example, gloss and translation against Haig and the current seed.
5. Obtain approval of the exact diff.
6. Apply changes only on a dedicated non-main branch, with fresh pre/post backups and inspectable comparisons.
7. Run relevant content/schema checks and report exactly what was and was not tested.
8. Do not merge to main, change production data or deploy without separate explicit authorization.

## 9. Completion status

This document is an implementation-ready editorial specification, not a claim that Lessons 07–08 have been revised or passed final instructional review. The learner-facing lessons remain unchanged. Course 2 remains subject to the master audit's P0 owner decisions and overall sign-off gate.
