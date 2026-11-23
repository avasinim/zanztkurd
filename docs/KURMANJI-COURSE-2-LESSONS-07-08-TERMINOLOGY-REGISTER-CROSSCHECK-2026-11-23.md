# Lessons 07–08 — Terminology Register Cross-check
Date: 2026-11-23
Scope: direct inspection of the Course 2 lesson payloads in the source seed and comparison with the working terminology register and existing source audits. Documentation only.

## 1. Source files inspected
- `docs/kurmanji-content-seed-part-05.sql`
- Lesson key `kurmanji-course-2-lesson-07.html`
- Lesson key `kurmanji-course-2-lesson-08.html`

Fetched source seed blob SHA: `2581b9362ee7a0972076d475db56b034e0e662cb`. This verifies the content in the fetched repository file only; it does not establish which version is live in the deployed application or database.

## 2. Executive finding
The two lessons use the main terminology responsibly: they avoid reducing direct/oblique case to a fixed subject/object distinction, and they warn that case and verbal forms depend on tense and construction. The main issue is instructional completeness, not a confirmed error in the cited pronoun forms.

Lesson 07 needs a readable paradigm with worked examples and explicit explanation of `ew` syncretism. Lesson 08 needs to separate the three cited clause types more explicitly and must not imply that `min xwar` by itself demonstrates an overt object or object agreement.

## 3. Lesson 07 — pronouns and case

### Existing content confirmed in the seed
The lesson lists direct pronouns:
- `ez, tu, ew, em, hûn, ew`

And oblique pronouns:
- `min, te, wî/wê, me, we, wan`

It correctly notes that direct/oblique case cannot be summarized as “the subject is always oblique” or “the object is always direct.” It also flags past transitive clauses as an important environment for oblique subjects.

### Register alignment
- “personal pronoun” → جێناوی کەسی.
- “direct case” → حاڵەتی ڕاستەوخۆ.
- “oblique case” → حاڵەتی ناڕاستەوخۆ.
- “case” must not be glossed as a semantic role such as agent, subject or object.
- The direct form `ew` is syncretic across third-person singular masculine, third-person singular feminine and third-person plural in the paradigm reviewed. The oblique forms `wî`, `wê` and `wan` distinguish those values.

### Instructional gaps
1. The two lists are not a fully labelled paradigm: person and number are not aligned row by row.
2. The note about `ew` is useful but could be more prominent beside the table.
3. There is no fully glossed pair of clauses showing how the same referent appears in direct and oblique forms.
4. The lesson does not show the main environments from Haig §2.2.1 in a compact learner-facing reference.
5. Review questions have no model answers or answer criteria.

### Recommended acceptance criteria
- Display person, number, direct form and oblique form in a single aligned table.
- Mark the three-way value of direct `ew` explicitly; do not duplicate it as though the spellings differ.
- Include source-checked, complete clause examples for at least one direct and one oblique environment.
- Explain that oblique case also appears with ezafe possessors and adposition complements, not only in past transitive subjects.
- Keep the warning against a fixed subject/object mapping.

## 4. Lesson 08 — verb roots, person/number and transitivity

### Existing content confirmed in the seed
The lesson asks learners to distinguish a verb's basic form/root from grammatical information such as person, number, tense and mood. It warns that not all verbs inflect identically. It introduces transitive and intransitive verbs, then compares three Haig (2018), Table 14 forms:
- `ez dibêjim` — present transitive;
- `ez hatim` — past intransitive;
- `min xwar` — past transitive.

This is a useful and source-conscious contrast.

### Register alignment
- “verb” → کردار.
- “root” → ڕەگ; “base” → بنەڕەت. Do not merge these labels.
- “transitive” → کرداری تێپەڕ.
- “intransitive” → کرداری ناتێپەڕ.
- “person/number” → کەس/ژمارە.
- “agreement” → ڕێککەوتنی ڕێزمانی, but name the agreeing elements and the relevant construction rather than using the word generically.

### Important interpretive limit
The three forms show a contrast in pronoun case across construction types:
- present transitive: `ez` is direct;
- past intransitive: `ez` is direct;
- past transitive: `min` is oblique.

However, `min xwar` contains no overt object. It therefore cannot, by itself, demonstrate the form or case of an overt object, nor prove object agreement. The lesson's broader statement that pronoun form and verbal agreement depend on tense and transitivity is directionally appropriate, but this particular three-item comparison should be described precisely as a contrast in subject-pronoun case across the cited constructions.

### Instructional gaps
1. The lesson says to identify root and base but does not segment a cited verb form.
2. It does not provide a complete worked parse of the three clauses.
3. It does not explain the difference between subject case and agreement on the verb.
4. No overt-object example is included to illustrate object case or agreement.
5. Review questions have no answer guidance.

### Recommended acceptance criteria
- Present the three Table 14 examples in a side-by-side comparison with construction type and subject-pronoun case labelled.
- State explicitly that `min xwar` has no overt object in the cited example.
- Do not use this example alone to teach overt object case or object agreement.
- Add an overt-object clause only if it is independently source-checked and approved.
- Add a worked analysis distinguishing lexical verb root/base from the inflected verb form; do not invent a segmentation where the source does not support it.

## 5. Cross-lesson consistency table

| Concept | Lesson 07 | Lesson 08 | Register decision |
|---|---|---|---|
| direct/oblique | Pronoun paradigms | Subject pronoun changes across clause types | Use the same labels; explain construction-specific distribution. |
| person/number | Pronoun paradigm | Verb form and clause context | Keep person and number distinct and aligned. |
| transitivity | Background for case | Explicit topic | Do not equate transitivity with a single case form in all tenses. |
| ergative alignment | Past transitive subject mentioned | `min xwar` cited | Explain the alignment pattern separately from word order and from object agreement. |
| root/base/stem | Not central | Root and base mentioned | Preserve root/base distinction; stem remains provisional in the register. |
| agreement | Not the main focus | Broadly mentioned | Identify the agreeing target and evidence; avoid claims unsupported by the example. |

## 6. Source basis and limits
- Haig (2018), Table 9 and §2.2.1, supports the direct/oblique pronoun paradigm and the distribution reviewed for Lesson 07.
- Haig (2018), Table 14 and §2.7.2, supports the three construction examples and the past-transitive alignment contrast discussed for Lesson 08.
- The existing earlier source-audit notes also record the limitation that `min xwar` has no overt object.
- This cross-check does not independently validate every possible Kurmanjî verb paradigm. New forms or claims require source verification in their own context.

## 7. Change boundary
No lesson HTML, SQL seed, course payload, application code, database, migration, Supabase resource, main branch, deployment or production data was changed. This file is a documentation-only cross-check. No runtime or release test is claimed.
