# Course 2 Lessons 7–8 — Case and Agreement Source Audit
Date: 2026-11-23

## Scope
Documentation-only audit of the existing Lesson 7 and Lesson 8 seed payloads in `docs/kurmanji-content-seed-part-05.sql`. No lesson content, SQL, application code, database, migration, Supabase, main branch, deployment or production data was changed.

## Primary source checked
Geoffrey Haig (2018), “Northern Kurdish (Kurmanjî),” in *The Languages and Linguistics of Western Asia*, pp. 106–158.
PDF: https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf

Relevant material:
- §2.2.1, printed pp. 114–115: direct and oblique case on nouns and the syntactic environments in which each occurs.
- Table 7, printed p. 115: case and indefiniteness forms.
- §2.2.3, Table 9, printed p. 117: Standard Kurmanjî personal pronouns.
- Table 14, printed p. 127: sample verb conjugations across present, simple past and past progressive.
- §2.7.2, printed pp. 131–132: ergative construction in past transitive clauses, including example (32) `Wî mirov-î çay anî`.

## Lesson 7 — Personal pronouns and direct/oblique case

### What the seed currently says
The lesson lists direct pronouns `ez, tu, ew, em, hûn, ew` and oblique pronouns `min, te, wî/wê, me, we, wan`. It correctly warns against equating direct/oblique case with a universal subject/object rule, and notes the oblique subject in many past transitive clauses. Its method note correctly distinguishes `wî` (masculine singular), `wê` (feminine singular), and `wan` (plural).

### Source verification
Haig Table 9 confirms the paradigm:
- 1SG: `ez / min`
- 2SG: `tu / te`
- 3SG: `ew / wî (masculine) / wê (feminine)`
- 1PL: `em / me`
- 2PL: `hûn / we`
- 3PL: `ew / wan`

The direct third-person form `ew` is syncretic: the same form serves masculine singular, feminine singular and plural. The oblique forms distinguish masculine and feminine singular, and plural. Haig also explains that `xwe` is invariant and is used for coreference with the subject of the same clause; this is relevant background, but the current lesson does not teach reflexives.

Haig §2.2.1 describes the oblique case as occurring, among other environments, with the object of a present-tense transitive verb, goals/recipients in specified constructions, complements of adpositions, possessors in ezafe constructions, and subjects of past-tense transitive verbs. Direct case is used elsewhere. Thus the lesson's caution is correct and important.

### Instructional gaps
1. The pronoun paradigm is presented inline, not as a readable aligned table or a set of paired examples.
2. There is no worked example contrasting a present transitive clause with a past transitive clause.
3. The distinction between grammatical role (subject/object) and morphological case (direct/oblique) is stated abstractly but not demonstrated.
4. The direct form `ew` is called context-dependent; the teaching explanation should also mention that agreement and surrounding syntax can identify number/gender, rather than implying context alone.
5. No exercise asks learners to identify the case of a pronoun in a complete sentence.

## Lesson 8 — Verb, root, person and number

### What the seed currently says
The lesson explains that verb forms vary by person, number, tense and transitivity. It cites Haig Table 14 and gives:
- `ez dibêjim` — present transitive, “I say”;
- `ez hatim` — simple past intransitive, “I came”;
- `min xwar` — simple past transitive, “I ate (something)”.

### Source verification
Haig Table 14 confirms these examples and contrasts the pronoun forms across the paradigms. In the present transitive paradigm, the subject pronouns are direct (`ez, tu, ew, em, hûn, ew`); in the simple past transitive paradigm, the subjects are oblique (`min, te, wî/wê, me, we, wan`). Intransitive simple past subjects remain direct (`ez hatim`, etc.).

Haig §2.7.2 states that the past transitive ergative construction has an oblique transitive subject, a direct object, and verb agreement with the direct object. The subject/object order remains unchanged. This is not the pattern for all tenses or all clause types: Haig describes the rest of the syntax as accusative.

The lesson's three examples are correctly transcribed and their basic glosses align with Table 14. However, `min xwar` alone does not display an overt direct object, so it cannot by itself demonstrate the direct case of the object or the verb's agreement with it. It illustrates the oblique subject form in the past transitive paradigm.

### Instructional gaps
1. The lesson does not explicitly connect the present transitive direct subject pattern to the past transitive oblique subject pattern.
2. It does not distinguish this tense-conditioned ergative pattern from intransitive past clauses, where the subject remains direct.
3. The Table 14 examples are not segmented or compared in a compact paradigm.
4. The transitive object is not overt in `min xwar`; a separate fully expressed object example is needed if the course intends to teach object case and agreement.
5. The lesson's review questions ask about transitivity and verb form generally, but do not test learners' ability to identify direct/oblique pronoun forms in context.

## Cross-lesson teaching recommendation (not implemented)
The two lessons should remain distinct but explicitly connected:
- Lesson 7: teach the direct/oblique pronoun paradigm and the fact that case depends on syntactic environment.
- Lesson 8: use a small three-way contrast: present transitive (`ez ...`), past intransitive (`ez hatim`), and past transitive (`min ...`). Then label subject, object, case and agreement separately.
- Use a complete, source-verified transitive example with an overt object when demonstrating the past transitive pattern; do not treat `min xwar` alone as proof of object case.
- Keep the scope limited to Standard Kurmanjî and qualify dialectal variation.

## Source-based conclusion
The existing lesson statements are broadly consistent with Haig (2018). No factual correction to the listed pronoun forms or the three Table 14 examples is required on the evidence checked. The principal weakness is instructional: the seed names the case distinction but does not show learners how the case system changes between present transitive, past intransitive and past transitive clauses.

## Change boundary
This file records audit findings and recommendations only. The lesson HTML and seed SQL remain unchanged. No source form has been normalized or rewritten.
