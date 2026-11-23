# Course 2 — Lessons 10–11: Source Review of Questions, Negation and Word Order
Date: 2026-11-23

## Scope
This review checks the claims in the existing Course 2 Lessons 10 and 11 seed payloads against two identifiable Kurmanji grammar references. It does not rewrite lesson text or authorize changes to the lesson payloads.

Reviewed lesson source:
- `docs/kurmanji-content-seed-part-05.sql`, blob SHA `2581b9362ee7a0972076d475db56b034e0e662cb`.
- Existing Lesson 10 source-review note: `docs/KURMANJI-COURSE-2-LESSON-10-NEGATION-QUESTION-SOURCE-REVIEW-2026-11-23.md`, blob SHA `544fb86c5b51b6a142ad0fa9ef53821ad0eb27df`.

Grammar references:
1. Geoffrey Haig (2018), “Northern Kurdish (Kurmanjî),” in *The Languages and Linguistics of Western Asia: An Areal Perspective*, especially §2.7.1 “Word order” (printed pp. 130–131) and §2.7.2 “Alignment and related issues” (pp. 131–132). PDF: https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf
2. Kemal Badıllı (1965), *Türkçe İzahli Kürtçe Grameri (Kürmançça Lehçesi)*. The author explicitly notes regional variation and treats two varieties in the introduction (printed p. I); relevant sections include interrogative pronouns (printed p. 69), question formation (printed p. 134), nominal clauses (pp. 154–155), and order of elements in verbal clauses (pp. 159–160). PDF: https://www.kurdolojiakademi.net/wp-content/uploads/2021/11/Turkce-izahli-Kurtce-grameri-Kurmancca-lehcesi.pdf

## Lesson 10 — Negation and questions

### A. Negation
The existing Haig-based review remains supported:
- Present indicative negation commonly uses `na-` in place of `di-`; subjunctive negation uses `ne-` in place of `bi-`.
- `zanîn` and `karîn` have the cited lexicalized forms `nizanim` and `nikarim`.
- Past negation examples include `ne-hatin` and `ne-di-hatin`.
- These are not exceptionless rules across every verb and dialect.

Badıllı separately treats negation in nominal clauses (printed pp. 154–155), including examples of a negative predicate. This establishes that nominal-clause negation is a real grammatical topic in the reference, but it does **not** establish what the lesson author intended by the exact Sorani heading «نەفیی ڕستەی ناوەکی». The heading remains editorially ambiguous and must not be silently renamed or interpreted.

### B. Yes/no questions
The current seed says yes/no questions may be recognized through intonation and context. Badıllı §195 (printed p. 134) gives a more specific account:
- The interrogative particle `ma` precedes the clause; the example contrasts `Te şand` with `Ma te şand?`.
- In conversation, the particle is often omitted; the final syllable may be lengthened and the pitch/intonation changed.
- The reference says question punctuation is used in writing whether or not the particle is present.

**Assessment:** the seed's general point about intonation is supported, but its wording is incomplete. It should not imply that context alone is the only signal or omit the attested particle `ma`. Before adding the particle to the learner-facing lesson, confirm the preferred spelling and usage for the course's chosen Standard Kurmanji variety against a current reference, since Badıllı is a 1965 regional grammar and explicitly discusses more than one variety.

### C. Information questions
Badıllı §115–118 (printed pp. 69–70) documents interrogative forms and examples, including:
- `kî` / `kê` for “who” in the described gender/case distinctions;
- `çi` for “what”;
- `kîjan` for “which”;
- `ç’awa` and `çend` for “how” and “how many”;
- a time interrogative formed with `kî-` + `çax`;
- examples such as `Kî hat?` and `Te çi di?`.

A modern beginner Kurmanji lesson also gives `kî`, `çi`, and `li ku` in simple questions and says the question word occupies the slot of the missing information: https://kurdizan.net/ders/pirs. This is useful corroboration for beginner-level placement, but it is a teaching resource rather than a specialist grammar.

**Assessment:** the existence and broad function of interrogative words is source-supported. The seed's list “who, what, where, when” is a reasonable outline, but the exact Kurdish forms and sentence examples are not present in the lesson and should not be invented from Sorani equivalents. Add only forms and examples checked in the selected Kurmanji source. Preserve distinctions such as `kî` vs `kê` where the source and variety require them.

## Lesson 11 — Word order and clause structure

### A. Basic order
Haig (2018) §2.7.1 states that pragmatically neutral clauses have **SOVG** order:
- S = subject
- O = direct object
- V = verb
- G = goal argument, including spatial goals, recipients and addressees

Haig explicitly says word order is not rigidly fixed and direct objects may be fronted for pragmatic purposes. The placement and marking of goal arguments varies by construction and dialect. For recipients of `dan` (“give”), the recipient is usually placed after the verb in the oblique case in the described pattern.

**Assessment:** the seed's “SOV is the basic order” is a useful first approximation for a simple clause without an overt goal argument, but it is incomplete as a course-wide rule. For accuracy, explain the neutral pattern as SOVG where a goal/recipient/addressee argument is present, and label SOV as the simpler subject–object–verb pattern when no such G argument is included.

### B. Fronting and focus
Haig directly supports the claim that direct objects may be fronted for pragmatic purposes. The seed's reference to information structure and emphasis is therefore directionally supported. Avoid teaching that any arbitrary reordering is freely interchangeable: the source describes pragmatic fronting, not unrestricted word order.

### C. Case-sensitive order and older reference
Badıllı §230 (printed pp. 159–160) describes the position of objects in relation to the verb as dependent on the case form selected by the verb: an object in the described `-i` case precedes the verb, while an `-e` object follows it; when both occur, their positions differ. The same section gives a broader order for time, place, subject, direct object, indirect object, other adverbials and verb.

**Assessment:** this older description reinforces that “the verb is always last” or “all objects always precede the verb” would be overgeneralizations. It should be treated cautiously because the book is from 1965 and documents regional varieties; Haig (2018) is the principal reference for the current Standard Kurmanji framing in this course.

### D. Existing example
The seed's `Wî mirov-î çay anî` is intended to illustrate a subject–object–verb sequence. Keep the example unchanged until its exact form, gloss and dialect/source attribution are checked against the cited Haig passage. Do not silently respell or reconstruct it from the Sorani translation.

## Editorial decisions proposed — not applied
1. In Lesson 10, retain the negation rules with their existing qualifications; the Haig-based negation evidence is adequate for the claims already made.
2. Clarify the yes/no question paragraph to mention the attested preverbal `ma` particle as well as conversational intonation, but only after confirming the course's preferred Standard Kurmanji form and spelling.
3. Keep the Lesson 10 heading «نەفیی ڕستەی ناوەکی» on hold until the author confirms whether it means negation in a nominal clause, an embedded clause, or something else. Badıllı's section on nominal-clause negation is not enough to infer authorial intent.
4. Expand the Lesson 10 question-word list only with source-checked Kurmanji forms and full examples; do not translate Sorani question words mechanically.
5. In Lesson 11, teach SOV as the simple clause pattern and SOVG as Haig's neutral order when a goal argument is present. Retain the qualification about pragmatic fronting.
6. Check `Wî mirov-î çay anî` against Haig before using it as a model sentence; preserve the original Latin text unless a correction is verified.

## Change boundary
Documentation-only source review. No lesson HTML, seed SQL, migration, application code, database, Supabase, main branch, deployment or production data was changed. No lesson example or learner-facing text was edited.
