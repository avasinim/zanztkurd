# Course 2 — Lessons 10–11: Implementation-Ready Editorial Specification
Date: 2026-11-23
Status: Documentation-only implementation specification. No learner-facing edits are authorized or performed.

## 1. Purpose and change boundary

This specification converts the existing source audits, terminology checks and correction note into a controlled implementation plan for Lessons 10 and 11 of the 12-lesson Standard Kurmanjî morphology course.

It is intended to be actionable once the course owner resolves the listed decisions. It does not supply new learner-facing Kurmanjî examples, silently correct the author's wording, or authorize edits to lesson HTML, SQL seed data, application code, database records, migrations, Supabase, the main branch, deployment or production.

**Source hierarchy:** Haig (2018) is the principal grammatical reference for the Standard Kurmanjî framing in this course. Badıllı (1965) is historical/regional corroboration only and must not be treated as a universal standard. Kurdîzan is beginner-level corroboration, not a substitute for specialist verification.

## 2. Lesson 10 — نەفی و پرسیار

### 2.1 Learning outcomes

After revision, learners should be able to:
1. Recognize the negative forms already attested in the lesson and associate each with its specific construction.
2. Explain that the negative markers are construction-sensitive, not interchangeable universal prefixes.
3. Distinguish a yes/no question from an information question in examples actually approved for this course.
4. Distinguish spoken intonation from written question punctuation.
5. Identify which question-word forms have been verified for the course's selected Standard Kurmanjî variety.

Do not claim that learners can produce a full interrogative paradigm until the relevant forms and examples have been source-checked and included.

### 2.2 Negation: retain the source-supported core

Retain the existing Haig-based examples and qualified explanations:
- Present indicative: `na-` commonly replaces `di-`.
- Subjunctive: `ne-` replaces `bi-` in the cited pattern.
- Lexical forms include `nizanim` and `nikarim`.
- Past examples include `ne-hatin` and `ne-di-hatin`.

Editorial requirements:
- Keep each form attached to the construction in which it is attested.
- Do not present `na-`, `ne-` and lexical `ni-` as freely interchangeable.
- Do not generalize the patterns to every verb, tense, dialect or variety.
- Preserve the exact Latin forms from the checked source and current seed unless a separate source-backed correction is approved.
- Where the lesson uses a general rule, qualify it with “commonly” or equivalent wording consistent with the source.

**Required presentation:** a compact comparison using only the existing attested forms, with columns for construction, positive pattern (where already present in the source material), negative form, and source note. Do not fill missing positive forms by invention. If the current lesson does not provide a matched positive example, show only the negative form and its construction label.

### 2.3 Blocking author clarification: «نەفیی ڕستەی ناوەکی»

This heading is unresolved. It may refer to negation in a nominal clause, an embedded clause, or another intended category. Badıllı's discussion of nominal-clause negation confirms that this is a real grammatical topic, but it does not prove the author's intended meaning.

**Do not rename, delete, translate into a narrower technical label, or write examples for this heading until the course owner/author clarifies the intended concept.**

After clarification:
1. Record the owner's intended definition in the editorial decision log.
2. Select a current Standard Kurmanjî source that directly supports that concept.
3. Confirm the exact forms and complete example context.
4. Write the explanation and exercise only from the verified evidence.
5. If no adequate source is available, keep the section on hold rather than filling it with a guessed interpretation.

Acceptance gate: the heading's meaning, source, examples and Sorani terminology must all be explicitly approved before learner-facing implementation.

### 2.4 Yes/no questions

The current point that intonation can signal conversational yes/no questions is broadly corroborated. Badıllı §195 (printed p.134) also documents a preverbal `ma` particle and describes conversational omission with intonational cues. Because this is a 1965 regional reference, it is not sufficient by itself to prescribe `ma` in the course's Standard Kurmanjî.

Implementation rules:
- Retain a cautious statement that intonation can help mark conversational yes/no questions, provided the wording matches the current lesson's source basis.
- Do not add `ma` to the learner-facing paradigm until its spelling, distribution and status are confirmed in a current Standard Kurmanjî source appropriate to the course.
- If verified and approved, distinguish particle-marked questions from intonation-marked conversational questions.
- Explain that written question punctuation is a writing convention; do not conflate punctuation with spoken intonation or treat context alone as a grammatical marker.
- Use complete, source-checked examples only. No reconstructed examples.

### 2.5 Information questions

The current outline mentions meanings such as “who”, “what”, “where” and “when”, but the exact Standard Kurmanjî forms and full example sentences need verification.

Badıllı documents forms including `kî`, `kê`, `çi`, `kîjan`, `ç’awa`, `çend` and a time interrogative based on `kî-` + `çax`. Kurdîzan corroborates beginner functions for `kî`, `çi` and `li ku`. These references do not authorize mechanically importing every form into this course.

Before inclusion, each item must have:
- an exact form in the chosen Standard Kurmanjî variety;
- a verified meaning and grammatical function;
- a complete sentence example copied accurately from an identifiable source;
- a checked Sorani gloss;
- a note where case, gender, dialect or construction changes the form.

Do not collapse `kî` and `kê` if the chosen variety/source distinguishes them. Do not create Kurmanjî translations by translating Sorani question words one-to-one.

### 2.6 Lesson 10 practice and answer guidance

Once the owner decisions and source checks are complete, use short tasks that assess only taught material:
1. Identify the negative marker in an existing example and name the construction.
2. Match an attested negative form to the relevant construction.
3. Classify approved examples as yes/no or information questions.
4. Match only approved question words to their source-verified meanings.
5. Explain whether a question feature is spoken intonation, a particle, or written punctuation.

For every item, provide a concise model answer and source pointer. Where a form is withheld pending verification, do not test it. Do not score dialect-sensitive alternatives as wrong unless the course has explicitly defined its target variety and reference form.

### 2.7 Lesson 10 acceptance checklist

- [ ] `na-`, `ne-`, lexical `ni-` and past negative forms remain construction-specific and qualified.
- [ ] No universal or exceptionless rule has been introduced.
- [ ] The owner has clarified «نەفیی ڕستەی ناوەکی»; otherwise the heading remains unchanged and on hold.
- [ ] `ma` is included only if confirmed by a current Standard Kurmanjî source and approved.
- [ ] Every information-question form and full example has an identifiable source.
- [ ] Spoken intonation, question particles and written punctuation are distinguished.
- [ ] Sorani glosses are checked, not mechanically translated.
- [ ] Exercises assess only taught, verified material and include answer guidance.

## 3. Lesson 11 — ڕێکخستنی وشەکان و پێکهاتەی ڕستە

### 3.1 Learning outcomes

After revision, learners should be able to:
1. Identify subject (S), direct object (O), verb (V) and, where present, goal (G).
2. Describe Haig's pragmatically neutral SOVG pattern without treating it as an absolute rule.
3. Recognize that pragmatic fronting/focus can affect constituent order.
4. Distinguish linear word order from grammatical case and ergative alignment.
5. Analyze `Wî mirov-î çay anî` as the source-attested past transitive ergative example it is, rather than as the evidence for the general neutral word-order rule.

### 3.2 Teach neutral SOVG separately

Haig (2018), §2.7.1 (printed pp.130–131), describes pragmatically neutral clauses as SOVG where a goal argument is present:
- S = subject
- O = direct object
- V = verb
- G = goal argument, including a spatial goal, recipient or addressee

Editorial treatment:
- Explain that SOV is a useful simplified pattern for a clause without an overt G argument.
- Explain G explicitly; do not omit it from the source's full neutral-order description.
- State that the order is pragmatically neutral, not a rigid template for every clause.
- Retain Haig's qualification that direct objects may be fronted for pragmatic purposes.
- Do not teach that constituents can be rearranged arbitrarily with no change in discourse meaning.
- Do not invent a new SOVG sentence. Add a full model only after an exact source-attested example and its context have been checked.

If the course cannot source a suitable complete SOVG example, teach the structural notation and explanation without fabricating a sentence. Record the example gap as unresolved.

### 3.3 Separate word order from case and grammatical role

The lesson must not imply that:
- direct case always means grammatical subject;
- oblique case always means object;
- the verb is invariably last;
- every object has the same position in every construction.

Keep three analytical layers distinct:
1. **Constituent order:** the linear sequence of clause elements.
2. **Grammatical role:** subject, direct object, goal/recipient, and so on.
3. **Case/alignment:** the morphological marking and agreement patterns associated with the construction.

Use the approved terminology register consistently. In particular, do not conflate case with grammatical role, or neutral SOVG order with ergative alignment.

### 3.4.1 Current seed/migration defect — correction must be coordinated

Direct inspection found that the learner-facing Lesson 11 payload in `docs/kurmanji-content-seed-part-05.sql` (blob SHA `2581b9362ee7a0972076d475db56b034e0e662cb`) still attributes `Wî mirov-î çay anî` to Haig §2.7.1 and frames it as the neutral SOV pattern. The same text occurs in historical migration `supabase/migrations/20261024122051_add_kurmanji_courses_and_protected_lessons.sql` (blob SHA `06320c50a858e41d8ce21e7b4fdee3f6ae418cd9`). The migration header states that it was applied to production on 2026-10-24; the live database was not queried.

This is a concrete defect in the stored lesson payload, not merely a future editorial suggestion. After explicit approval to change learner-facing content:
- correct the seed row to cite §2.7.2, example (32), p.131, and explain past-transitive ergative alignment;
- do not rewrite the historical migration; if production correction is separately authorized, prepare a new forward migration;
- retain a separate neutral SOVG explanation from §2.7.1 and add a worked clause only if a different complete source example is verified;
- run SQL validation and seed/migration parity checks, then inspect the exact diff.

No seed, migration or database change is authorized by this specification.

### 3.4 Correctly frame the existing example (32)

Preserve the exact source-attested Kurmanjî sentence:

`Wî mirov-î çay anî`

Haig (2018), example (32), printed p.131, §2.7.2 “Alignment and related issues” gives the analysis:
- `Wî` — masculine oblique demonstrative;
- `mirov-î` — masculine oblique form of “man”;
- `çay` — “tea”, direct case;
- `anî` — “bring”, past, third-person singular;
- translation: “That man brought tea.”

Teaching purpose:
- The transitive subject `Wî mirov-î` is oblique in the past transitive construction.
- The direct object `çay` is direct case.
- The example illustrates past transitive ergative alignment.
- It also happens to exhibit a subject–object–verb surface sequence, but that fact does not make it the source for the general neutral-order rule.
- Cite §2.7.2, example (32), not §2.7.1, for this sentence and its ergative analysis.
- Teach §2.7.1 neutral SOVG separately.

Do not respell, segment differently, or replace the example without a new source-backed review. Do not infer that all SOV clauses are ergative or that ergative alignment is itself a word-order rule.

### 3.5 Focus, fronting and information structure

Retain the existing idea that constituents can be fronted for pragmatic purposes, but make its scope precise:
- tie the claim to Haig's documented direct-object fronting;
- describe it as a discourse/pragmatic option, not free permutation;
- avoid adding paired “neutral vs focused” Kurmanjî sentences unless both are source-attested and their context is checked;
- if no sourced pair is available, explain the concept in prose and record the need for a verified contrastive example.

### 3.6 Worked analysis format

Use the existing example (32) for a model analysis with these fields:
1. Exact sentence (unchanged).
2. Source location.
3. Constituent-by-constituent gloss.
4. Grammatical role.
5. Case marking.
6. Verb tense/person information as given by the source.
7. What the example demonstrates.
8. What it does **not** demonstrate (a universal SOV rule or the full SOVG pattern).

Add a separate SOVG worked example only when verified from Haig or another approved current source. Do not make up a sentence merely to complete the template.

### 3.7 Lesson 11 exercises and answer guidance

Recommended exercise set:
1. Label S, O, V and G in a source-verified clause that actually contains a goal argument.
2. State the neutral order described in Haig §2.7.1 and define G.
3. Explain why the order is qualified as pragmatically neutral rather than absolute.
4. Analyze `Wî mirov-î çay anî` using the source gloss; identify the oblique transitive subject and direct object.
5. Explain the difference between the example's surface S–O–V sequence and its instructional function as an ergative-alignment example.
6. Identify a claim that cannot be inferred from the example, such as “all Kurmanjî clauses are rigidly SOV”.

Provide model answers and cite the source section for each substantive claim. If a verified G-containing example is not yet available, defer exercise 1 rather than inventing its data.

### 3.8 Lesson 11 acceptance checklist

- [ ] Haig §2.7.1 is presented as neutral SOVG where a G argument is present.
- [ ] G is defined as goal, with the source's relevant semantic scope.
- [ ] SOV is labelled as a simplified pattern for clauses without an overt G, not a universal rule.
- [ ] Pragmatic fronting is qualified and not described as unrestricted reordering.
- [ ] `Wî mirov-î çay anî` remains verbatim and is cited to Haig §2.7.2, example (32), p.131.
- [ ] Its oblique subject/direct object analysis and past-transitive ergative function are explicit.
- [ ] Word order, grammatical role, case and alignment are taught as separate dimensions.
- [ ] No new Kurmanjî examples are introduced without source verification.
- [ ] Exercises have model answers and assess only verified content.

## 4. Cross-lesson terminology controls

Use the working terminology register and the master audit as the controlling editorial references. Maintain these distinctions:
- subject / object / verb / goal: بکەر / بەرکار / کردار / ئامانج (confirm the exact approved Sorani equivalent for G before implementation);
- case vs grammatical role: حاڵەت vs ڕۆڵی ڕێزمانی;
- direct vs oblique: ڕاستەوخۆ vs لار (use the register's approved forms consistently);
- neutral word order vs focus/fronting: do not collapse them into a single “word order” label;
- tense (کات) vs aspect (provisional equivalent remains subject to owner approval);
- verbal negation vs nominal-predicate negation: keep distinct and do not resolve the ambiguous Lesson 10 heading by inference.

Where a Sorani technical equivalent remains provisional in the terminology register, mark it as provisional in editorial notes. Do not silently standardize it in learner-facing content.

## 5. Owner/editor decisions required before learner-facing implementation

1. Clarify the intended meaning of Lesson 10's «نەفیی ڕستەی ناوەکی».
2. Approve whether `ma` belongs in this course, based on a current Standard Kurmanjî reference.
3. Approve the selected interrogative forms and their source-backed examples.
4. Approve the Sorani terminology for Lesson 11's G/goal argument and for focus/fronting.
5. Confirm the target Standard Kurmanjî variety and how source/dialect variation will be labelled.
6. Approve the proposed lesson revisions and implementation on a non-main branch.

These decisions are gates, not assumptions. Until they are resolved, the relevant sections remain unchanged or explicitly marked for editorial hold.

## 6. Source and evidence register

1. Geoffrey Haig (2018), “Northern Kurdish (Kurmanjî),” especially §2.6.1 (negation), §2.7.1 (neutral word order) and §2.7.2, example (32) (ergative alignment).
   PDF: https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf
2. Kemal Badıllı (1965), *Türkçe İzahli Kürtçe Grameri (Kürmançça Lehçesi)*, especially §195 (printed p.134), interrogative pronouns (printed pp.69–70), and nominal-clause negation (printed pp.154–155). Historical/regional evidence only.
   PDF: https://www.kurdolojiakademi.net/wp-content/uploads/2021/11/Turkce-izahli-Kurtce-grameri-Kurmancca-lehcesi.pdf
3. Kurdîzan, beginner question lesson, used only as corroboration for basic question-word functions:
   https://kurdizan.net/ders/pirs

Repository evidence used to prepare this specification:
- `docs/KURMANJI-COURSE-2-LESSONS-09-10-DETAILED-REVISION-PROPOSAL-2026-11-23.md`
- `docs/KURMANJI-COURSE-2-LESSONS-10-11-QUESTIONS-WORD-ORDER-SOURCE-AUDIT-2026-11-23.md`
- `docs/KURMANJI-COURSE-2-LESSONS-11-12-TERMINOLOGY-REGISTER-CROSSCHECK-2026-11-23.md`
- `docs/KURMANJI-COURSE-2-LESSON-11-HAIG-EXAMPLE-32-ERGATIVE-CORRECTION-2026-11-23.md`
- `docs/KURMANJI-COURSE-2-MASTER-AUDIT-SYNTHESIS-AND-SIGNOFF-GATE-2026-11-23.md`

## 7. Definition of done and validation boundary

This specification is ready for editorial implementation only when:
- all blocking owner decisions in Section 5 are recorded;
- all added Kurmanjî forms/examples have source locations and checked context;
- all Sorani technical terms are approved or explicitly marked provisional;
- each lesson's acceptance checklist is met;
- a second linguistic/source review and a separate instructional review are completed.

**Change boundary:** this file is a documentation-only specification. No learner-facing lesson, HTML, SQL seed, application code, migration, database, Supabase resource, main branch, deployment or production data was changed. No runtime, navigation, release or production test is claimed.
