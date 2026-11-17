# Course 1 Lesson 26 — Final Review, Self-Assessment and Course-Closure Audit

**Date:** 2026-11-17  
**Repository:** `avasinim/zanztkurd`  
**Working branch:** `fix/kurmanji-ci-current-migration`  
**Baseline HEAD:** `12a472eeb4a02e05cd266a3840a0854dae3ea7db`  
**Pre-work backup:** `backup/c1-l26-final-review-before-2026-11-17`  
**Seed file:** `docs/kurmanji-content-seed-part-04.sql`  
**Seed blob SHA:** `2367c5057b2b92b7fa482c64a30b05d26838d964`  
**Seed row:** `kurmanji-course-1-lesson-26.html`  
**Scope:** Evidence and assessment-design audit of the existing final lesson. Documentation-only; no lesson, seed, code, migration, database, PR, or deployment changes.

## 1. Executive finding

Lesson 26 is appropriately framed as a **course review and learner self-assessment**, not as a validated final examination. The seed itself explicitly says that the self-assessment table is not an official score or proof of proficiency. That boundary is educationally responsible and should be preserved.

The current lesson is not yet a complete or balanced course-closure instrument. It contains:
- a short orthography/reading recap with five examples;
- a vocabulary-and-sentence recap table;
- eight open-ended review questions;
- a six-row self-assessment checklist;
- four general reference sources.

The main issues are:
1. an unsupported or misleading spelling claim about `r` and `rr`;
2. the review items do not sample all major Course 1 learning areas;
3. the self-assessment categories and the eight review questions do not align closely enough;
4. the lesson offers no answer key, performance descriptors, or next-step decision rule (which is acceptable for informal reflection, but not for scored certification);
5. the final lesson should explicitly direct learners to revisit the earlier lesson for each weak area and, ideally, provide a topic-to-lesson map.

The correct recommendation is to retain Lesson 26's low-stakes self-assessment identity, correct the orthography note, and strengthen the review architecture. Do not relabel it as a formal exam or claim that completion establishes a CEFR level.

## 2. Exact seed content reviewed

The lesson title is **پێداچوونەوە و هەڵسەنگاندنی کۆتایی** (“Review and final self-assessment”).

### Section 1 — Orthography and reading
The lesson contrasts:
- `c/ç`
- `s/ş`
- `i/î`
- `u/û`

Its sample forms are `çak`, `şaş`, `dil`, `îro`, and `roj`. The `roj` row adds a note that standard spelling distinguishes `r` and `rr` in some words.

### Section 2 — Vocabulary and sentence review
The lesson uses:
- `Ez nan dixwim.`
- `Tu çawa yî?`
- `Ez naxwînim.`
- `Ez wî mirovî dibînim.`
- `Min ew dît.`

It correctly cautions that some course examples are pedagogical and that forms should be checked against reliable grammar/dictionary sources for formal use.

### Section 3 — Eight review questions
1. Explain the sound/writing difference between `c` and `ç`.
2. Give the meanings and grammatical distinction between `min` and `ez`.
3. Identify subject, object and verb in `Ez nan dixwim`.
4. Write a superlative example with `herî`.
5. Form an indefinite noun with `-ek`.
6. Convert an affirmative sentence into a negative sentence.
7. Explain Direct vs Oblique case.
8. Identify agent and object in a past transitive sentence.

### Section 4 — Six self-assessment categories
- alphabet and special letters;
- reading and writing simple words;
- pronouns, numbers and everyday vocabulary;
- verbs, negation and questions;
- adjectives, ezafe and possession;
- Direct and Oblique case.

The lesson explicitly says this checklist is for self-assessment and is **not** an official score or proof of ability. This is an important safeguard.

## 3. Findings

### 3.1 The `r/rr` spelling note should be corrected or removed

**High-priority accuracy issue.**

The row for `roj` currently says that Standard Kurmanji spelling distinguishes `r` and `rr` in some words. This is not supported by the principal Standard Kurmanjî orthographic description used in this audit, and it conflicts with the earlier Course 1 Lesson 4 audit, which concluded that `rr` should not be presented as a separate alphabet letter and that the relevant issue belongs in a pronunciation note, not the alphabet inventory.

Haig (2018) describes the Standard Kurmanjî modified Roman alphabet and its orthographic conventions in §2.1; the chapter does not establish a general Standard Kurmanjî graphemic contrast `r` versus `rr`. The current sentence risks teaching a false spelling distinction.

**Recommendation:** remove the `r/rr` clause from the `roj` example. If the course later needs a pronunciation note about trill realization or dialectal phonetic length, state it as phonetics, identify the variety and source, and do not represent it as a general spelling contrast.

The other contrasts `c/ç`, `s/ş`, `i/î`, and `u/û` are useful orthographic review pairs. The lesson should consistently distinguish letter-name/letter-shape recognition from actual pronunciation, and should use audio only if a reliable, approved recording is available; no audio dependency should be invented.

### 3.2 The review sample is too narrow for a 26-lesson course

**Coverage gap, not proof that earlier lessons are wrong.**

The eight questions test a useful subset of Course 1:
- orthographic contrast;
- pronoun case;
- basic clause roles;
- superlative;
- indefiniteness;
- negation;
- case alignment.

They do not directly sample several important areas already covered elsewhere in the course, including:
- greetings and everyday interaction;
- family and kinship vocabulary;
- colours;
- numbers beyond a brief mention in the checklist;
- weekdays and time expressions;
- place names and adpositional phrases;
- interrogatives beyond one simple question;
- demonstratives;
- comparative forms;
- present-tense stem variation and irregular verbs;
- word order and focus;
- ezafe agreement and reflexive `xwe`;
- plural noun morphology and the case/ezafe distinction.

A final review need not repeat every fact from every lesson. However, the current lesson should not imply that eight short written questions adequately sample all 26 lessons. A balanced review should include representative tasks from the course's main learning domains and a transparent map back to the source lessons.

**Recommendation:** organise the review into a small number of balanced domains (orthography/reading; vocabulary and communicative functions; noun phrase/pronouns; verbs and clause structure; questions/negation; case and complex noun phrases). For each domain, point to the earlier lesson(s) where learners can review it. This can be a compact index rather than 26 duplicated questions.

### 3.3 Self-assessment checklist and quiz are not aligned

The six self-assessment rows include numbers and everyday vocabulary, but none of the eight questions directly checks number use or a communicative vocabulary task. Conversely, the quiz asks about `herî` and `-ek`, but these do not appear as distinct self-assessment categories.

This weakens the diagnostic value of the checklist: a learner may mark “good” for a category without having attempted an observable task for it.

**Recommendation:** either:
- add one representative task for each self-assessment category; or
- revise the self-assessment rows so that each row corresponds to at least one review task and a clearly stated learning outcome.

The checklist should remain reflective rather than numerical unless a validated rubric is deliberately designed.

### 3.4 The current quiz is not a formal final examination

**The lesson already says this correctly. Preserve the disclaimer.**

The eight prompts are open-ended and have no:
- model answers or scoring key;
- analytic criteria for correctness;
- point allocation or pass threshold;
- coverage/weighting blueprint;
- defined assessment conditions;
- retake or remediation rules;
- listening, spoken interaction or writing-performance tasks.

This does not make the activity pedagogically useless. It makes it a formative review prompt rather than a validated achievement test.

The Council of Europe explains that assessment is broader than tests and examinations; it should support learning and inform teaching, with emphasis on what learners can actually do. CEFR descriptors can guide learner and teacher reflection, but alignment requires observable performances and clear descriptors. See the Council of Europe assessment guidance and the CEFR Companion Volume.

**Recommendation:** keep the heading as review/self-assessment. If the project later wants a scored final exam or a proficiency claim, create a separate assessment specification first: learning outcomes, task blueprint, balanced domain weights, answer key/rubrics, standard-setting threshold, reliability checks, accommodations, and retake policy. Do not convert this lesson into a certificate claim by simply adding a score.

### 3.5 The sample sentence set is useful but too grammar-heavy for communicative closure

The five sentences are mostly short grammar illustrations. They provide little evidence that learners can use the course language to perform practical communicative tasks.

A course-closing review should include at least a small integrated task, for example:
- understand a short everyday exchange and answer a question;
- describe a person or object using an adjective and ezafe;
- ask and answer a question about time, place or routine;
- write a short, connected message using a present and past form.

These are proposals, not newly validated Kurmanji examples. Any new sentence or dialogue must receive native-speaker review before entering the lesson seed.

### 3.6 Course-closure should distinguish knowledge recall from communicative performance

The current prompts mainly ask learners to explain a rule, identify a form, or produce one isolated example. Those tasks can reveal grammatical knowledge, but they do not establish reading comprehension, spoken interaction, listening comprehension, or connected writing ability.

The CEFR Companion Volume offers separate illustrative descriptors for reception, production, interaction, mediation and linguistic competences. The final review should not claim to measure those skills unless it actually samples them. A short low-stakes self-assessment can instead ask learners to reflect separately on what they can read, write, say, understand and explain.

### 3.7 Source list is relevant but should be more precise about what each source supports

The current four sources (University of Arizona, Haig 2018, Thackston, Yari dictionary) are suitable starting points for grammar and lexical checks. However:
- the source list does not identify the particular sections/pages used for the review's claims;
- the dictionary supports lexical lookup, not the validation of a full course assessment;
- the CEFR should be cited only for assessment design and self-assessment principles, not as evidence for Kurmanji-specific grammar.

**Recommendation:** annotate sources by purpose (grammar/orthography; vocabulary; assessment design) and provide precise chapter/section/page references where possible.

## 4. Proposed course-closure structure (proposal only)

A stronger version of Lesson 26 can remain concise:

1. **Orthography and reading:** contrast the principal Hawar letters; remove unsupported `r/rr` spelling claim.
2. **Vocabulary in context:** one short task using familiar course vocabulary (family, colour, number, time, place or greeting).
3. **Noun phrases and pronouns:** one task combining demonstrative/possessor/ezafe or Direct/Oblique contrast.
4. **Verbs and clauses:** one present, one negative, one question and one past-transitive recognition task.
5. **Integrated use:** one short reading and one short learner-produced message or dialogue.
6. **Self-assessment:** separate “I can…” statements for reading, writing, speaking/interaction and grammar awareness, each linked to a prior lesson.
7. **Next-step guidance:** “If this is difficult, revisit lesson X” rather than a pass/fail claim.

The exact task count and format should be chosen only after mapping the final 26 lesson outcomes. Do not inflate the review by adding questions that duplicate content without improving coverage.

## 5. Native-speaker and editorial review still required

Before any change is made to the seed:
- verify every Kurmanji example, especially newly authored dialogues and connected writing;
- verify that Sorani explanations use consistent educational terminology;
- verify the orthographic treatment of `r` and `rr` with the chosen Standard Kurmanjî policy;
- map each self-assessment descriptor to a real course outcome and an earlier lesson;
- keep the Sorani-mediated course distinct from the separate fully-Kurmanji Latin pathway.

This report is an evidence audit and proposal, not approval to rewrite the lesson.

## 6. Sources

1. Haig, Geoffrey. 2018. “Northern Kurdish (Kurmanjî).” In Geoffrey Haig & Geoffrey Khan (eds.), *The Languages and Linguistics of Western Asia: An Areal Perspective*, pp. 106–158. De Gruyter Mouton. [DOI: 10.1515/9783110421682-004](https://doi.org/10.1515/9783110421682-004). [Open chapter PDF](https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf). Relevant for Standard Kurmanjî orthography and grammatical description, especially §2.1 and the relevant grammar sections.
2. Council of Europe. 2020. *Common European Framework of Reference for Languages: Learning, Teaching, Assessment — Companion Volume*. [Official publication](https://book.coe.int/en/education-and-modern-languages/8150-common-european-framework-of-reference-for-languages-learning-teaching-assessment-companion-volume.html). Relevant for illustrative descriptors, self-assessment and the distinction between reception, production, interaction and mediation.
3. Council of Europe. [CEFR Assessment guidance](https://www.coe.int/en/web/common-european-framework-reference-languages/assessment). Explains learning-oriented assessment and why assessment is broader than tests/examinations.
4. Council of Europe. [CEFR Descriptors](https://www.coe.int/en/web/common-european-framework-reference-languages/cefr-descriptors). Provides “can-do” descriptors and self-assessment resources.
5. University of Arizona, Iranian Languages. [Kurmanji Kurdish](https://iranian-languages.arizona.edu/node/7). Learner-facing grammar resource already referenced by the course.
6. Thackston, W. M. 2006. *Kurmanji Kurdish: A Reference Grammar with Selected Readings*. Renas Media. [Reference grammar PDF](https://sites.fas.harvard.edu/~iranian/Kurmanji/kurmanji_complete.pdf).
7. Yari. [Kurmanji–English Dictionary](https://yari.krd/dictionary/). Lexical lookup resource; not an assessment validation source.

## 7. Change and release boundary

This is a documentation-only audit.

- No Course 1 Lesson 26 content was edited.
- No seed SQL or application code changed.
- No migration, test, schema or CI configuration changed.
- No Supabase connection or database query was made.
- No PR was edited, approved or merged.
- No deployment was made.
- The active branch is the isolated work branch; `main` was not touched.
- The Lesson 26 seed file remains at blob SHA `2367c5057b2b92b7fa482c64a30b05d26838d964`.

## 8. Verification checklist

After committing this report, verify:
1. The pre-work backup still points to baseline `12a472eeb4a02e05cd266a3840a0854dae3ea7db`.
2. The active branch differs from baseline by exactly this one report file.
3. The Course 1 Lesson 26 seed blob SHA is unchanged.
4. The post-work backup points to the resulting active-branch commit.
5. The post-backup report blob SHA equals the active-branch report blob SHA.
6. `main` remains unchanged.
