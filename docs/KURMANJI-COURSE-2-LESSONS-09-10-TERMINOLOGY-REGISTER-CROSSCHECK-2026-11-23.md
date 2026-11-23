# Lessons 09–10 — Terminology Register Cross-check
Date: 2026-11-23
Scope: direct inspection of the Course 2 lesson payloads in the repository seed, compared with the working terminology register and prior source reviews. Documentation only.

## 1. Source inspected
- `docs/kurmanji-content-seed-part-05.sql`
- `kurmanji-course-2-lesson-09.html`
- `kurmanji-course-2-lesson-10.html`
- Fetched seed blob SHA: `2581b9362ee7a0972076d475db56b034e0e662cb`

This verifies the repository seed content only. It does not establish which content is currently deployed or loaded by a live database.

## 2. Executive finding
The lessons are cautious about dialect scope and avoid claiming that a single prefix or suffix explains every form. Their main remaining issue is the separation of tense from aspect and the need to keep the source glosses tied to context.

Lesson 10 has a clear overall title, `ڕستەی نەفی و پرسیاری`, but its second section still carries the ambiguous subheading `نەفیی ڕستەی ناوەکی`. The paragraph under that heading does not define what “nominal clause” means or provide a source-checked example of a negative nominal clause. This remains an author/editor clarification item, not a proven grammatical error.

## 3. Lesson 09 — present, past and future

### Existing content confirmed in the seed
- The lesson title is `کاتی ئێستا، ڕابردوو و داهاتوو`.
- It describes `di-` as appearing in many present forms, while warning that some verbs behave differently.
- It distinguishes past transitive and intransitive constructions.
- It gives Haig Table 14 forms `ez dibêjim`, `ez hatim`, and `min xwar`.
- It contrasts `ez hatim` with `ez dihatim`, and `min xwar` with `min dixwar`, as simple past versus imperfective past.
- It includes the future example `ew dē mesel-ē ji te re bēž-e` and identifies `dē` as a future marker with a subjunctive verb form.
- It explicitly warns that a complete paradigm needs a specified source and dialect.

### Terminology alignment
- “tense” should be consistently labelled کات.
- “aspect” should be separately defined; the proposed Sorani equivalent ڕوانگەی کردار remains provisional.
- “simple past” and “imperfective past” must not be treated as synonyms.
- Keep `di-` as a source form and describe its distribution as qualified (“many forms”), not universal.
- Keep the future form exactly as cited; do not infer that `dē` is a universal future suffix or that all future clauses use the same pattern.

### Remaining instructional gaps
1. The lesson title and sections organize the material by time, but the central simple-past/imperfective-past contrast is aspectual as well as temporal. The distinction needs an explicit definition.
2. The two pairs are listed but not fully segmented or parsed.
3. The translation of `ew dē mesel-ē ji te re bēž-e` should remain tied to the source context; a free-standing translation such as “he will tell you the problem” should not be silently treated as the only possible contextual reading.
4. The review questions ask about `di-`, transitivity and future, but no model answers or marking criteria are supplied.
5. The phrase “ڕابردووی بەردەوام/ناکامڵ” should be aligned with the chosen technical label for imperfective aspect, rather than allowing slash-separated near-synonyms to drift across the course.

### Recommended acceptance criteria
- Add one short, approved definition distinguishing tense from aspect.
- Present `ez hatim` / `ez dihatim` and `min xwar` / `min dixwar` as source-based contrasts with construction and aspect labels.
- State that `di-` is common in the described present/imperfective patterns but not exceptionless.
- Keep the future example and translation attached to its source context and grammatical analysis.
- Add answer guidance to the existing questions without inventing new Kurmanjî forms.

## 4. Lesson 10 — negation and questions

### Existing content confirmed in the seed
- Overall lesson title: `ڕستەی نەفی و پرسیاری`.
- It states that `na-` is used in many present forms and replaces `di-`, with an explicit warning against overgeneralization.
- It retains the subsection title `نەفیی ڕستەی ناوەکی`, but gives only a general statement that nominal-clause negation differs from verbal negation; no actual nominal negative example is shown.
- It describes yes/no questions as potentially signalled by intonation and context.
- It mentions information-question words in Sorani glosses (“کێ، چی، لە کوێ، کەی”) but gives no Kurmanjî forms in this lesson section.
- It includes Haig-supported forms `nizanim`, `nikarim`, `ne-hatin`, and `ne-di-hatin`, with cautious glosses and a warning against generalization.

### Terminology alignment
- “negation” → نەفی.
- “yes/no question” → پرسیاری بەڵێ/نەخێر.
- “question word” → وشەی پرسیار.
- Keep the grammatical categories separate: verbal negation, nominal-predicate negation and interrogative construction are not interchangeable.
- Do not silently translate Sorani question words into unverified Kurmanjî forms.

### Remaining instructional gaps and decisions
1. The subsection `نەفیی ڕستەی ناوەکی` remains ambiguous. The text needs an author decision: does it mean a negative nominal clause (a clause with a nominal predicate), or something else? The current paragraph does not settle the meaning.
2. No Kurmanjî example is provided for the nominal negative construction; none should be invented to fill this gap.
3. The question section has no Kurmanjî interrogative forms or worked examples, so it functions as a broad orientation rather than a teachable paradigm.
4. The question-particle `ma` is supported in an older regional grammar, but its suitability for this course's Standard Kurmanjî target must be confirmed before adding it.
5. The existing negation examples are source-conscious, but a model analysis would help learners see the contrast between `na-`, lexical `ni-`, and past `ne-` patterns.

### Recommended acceptance criteria
- Obtain author clarification for the subsection heading before editing it.
- If nominal-clause negation is intended, define the category and add only a current Standard Kurmanjî source-attested example approved for this course.
- Verify the yes/no question construction and interrogative inventory against an appropriate Standard Kurmanjî source; do not rely solely on Sorani glosses or older regional descriptions.
- Retain the qualified distribution of `na-`, `ne-` and lexical `ni-`; do not teach them as exceptionless interchangeable particles.
- Add worked analyses and answer guidance after source verification.

## 5. Cross-lesson consistency table

| Concept | Lesson 09 | Lesson 10 | Register decision |
|---|---|---|---|
| tense | Present, past, future | Not central | Use کات; do not use it as a synonym for aspect. |
| aspect | Simple vs imperfective past contrast | Not central | Define separately; choose one approved Sorani label. |
| negation | Only incidental | Main topic | Keep نەفی as the stable umbrella term; distinguish verbal and nominal constructions. |
| prefix forms | `di-`, `dē` | `na-`, `ne-`, lexical `ni-` | Preserve source spelling and construction-specific distribution. |
| question | Not central | Yes/no and information questions | Source-check Standard Kurmanjî forms before adding examples. |
| dialect/source scope | Explicitly cautioned | Explicitly cautioned | Retain these qualifications in both lessons. |

## 6. Source basis and limits
- Haig (2018), §2.6.1 supports the reviewed negation patterns; §2.6.4 supports the future example; Table 14 supports the cited verb-form comparisons.
- Haig (2018), §2.7.2 is relevant to the past-transitive alignment discussion but should not be conflated with tense/aspect definitions.
- Badıllı (1965) provides historical/regional evidence for question-particle and intonation patterns, but is not sufficient by itself to establish the current Standard Kurmanjî course norm.
- The cross-check does not independently prove every possible interrogative or negative pattern. New forms require source verification in their full context.

## 7. Change boundary
No lesson HTML, SQL seed, course payload, application code, database, migration, Supabase resource, main branch, deployment or production data was changed. This file is a documentation-only cross-check. No runtime or release test is claimed.
