# Course 2 — Lessons 07–12 Seed/Migration Payload Audit
Date: 2026-11-23
Status: Documentation-only repository audit. No learner-facing content, seed, migration, database or application code changed.

## 1. Scope and method
Inspected the Course 2 lesson payloads 07–12 in:
- `docs/kurmanji-content-seed-part-05.sql` — blob SHA `2581b9362ee7a0972076d475db56b034e0e662cb`.
- `supabase/migrations/20261024122051_add_kurmanji_courses_and_protected_lessons.sql` — blob SHA `06320c50a858e41d8ce21e7b4fdee3f6ae418cd9`.

For each lesson key 07–12, the extracted seed row payload and corresponding migration row payload were compared. All six extracted row payloads were byte-for-byte identical. This verifies repository-file parity for these rows only; it does not establish the current live database contents. The migration header says it was applied to production on 2026-10-24, but the live database was not queried.

## 2. Findings by lesson

### Lesson 07 — pronouns and case
The payload lists direct forms `ez, tu, ew, em, hûn, ew` and oblique forms `min, te, wî/wê, me, we, wan`. Its method note explicitly records the syncretic direct `ew` and distinguishes masculine `wî`, feminine `wê`, and plural `wan` in the oblique set. This is consistent with the prior pronoun/case audit at the level reviewed. Remaining instructional gap: no complete worked sentence with gloss, grammatical role and case analysis is included. No new source contradiction was established in this payload pass.

### Lesson 08 — verb, root, person and number
The payload uses Haig Table 14 forms `ez dibêjim`, `ez hatim`, and `min xwar` to contrast present transitive, past intransitive and past transitive patterns. It explicitly warns against a single rule for all constructions. The earlier audit's caution remains: `min xwar` alone does not display an overt direct-object noun, so it should not be used as a worked demonstration of an overt object. No new source contradiction was established in this payload pass.

### Lesson 09 — present, past and future
The payload includes the source-context-verified future example `ew dē mesel-ē ji te re bēž-e` and identifies `dē` as future marking. Haig §2.6.4, p.129, example (27), translates it as “He will tell you the issue.” The current Sorani rendering in the seed is «ئەو کێشەکە بۆ تۆ دەڵێت»; its future reading is not overtly marked in the Sorani sentence. This remains an owner/editor approval issue: confirm the preferred Sorani future rendering and the course's tense/aspect terminology before changing the learner payload. The Latin Kurmanjî form itself is preserved.

### Lesson 10 — negation and questions
The payload retains qualified negation examples and general prose about yes/no and information questions, but it supplies no complete source-checked Kurmanjî question sentence in the reviewed question section. The heading «نەفیی ڕستەی ناوەکی» remains semantically ambiguous and is not resolved by the body text. The current Standard Kurmanjî status of `ma` and the exact interrogative forms remain unverified for this course. Keep the heading and withhold new forms/examples until the author clarifies the intended concept and suitable current-source evidence is obtained. This confirms, rather than resolves, the prior Lesson 10 blockers.

### Lesson 11 — word order and sentence structure
**Critical learner-payload defect confirmed.** The seed and migration both attribute `Wî mirov-î çay anî` to Haig §2.7.1 and describe it as the general SOV pattern. This is incorrect. Haig §2.7.1 describes pragmatically neutral SOVG where G is a goal; the cited sentence is example (32), p.131, in §2.7.2 and illustrates past-transitive ergative alignment. The same incorrect text exists in both repository files. Correct only through an authorized coordinated seed correction and, if separately approved, a new forward migration; do not rewrite the historical migration. Teach neutral SOVG separately and do not invent a replacement clause. Source evidence: Haig §2.7.1 and §2.7.2, example (32).

### Lesson 12 — final review / assessment
The lesson title is «پێداچوونەوە و تاقیکردنەوەی کۆتایی» (“review and final test”), while its body is a cumulative review and open-ended analysis task. It contains no defined test items with answer key, duration, scoring, weighting, pass threshold or marking rubric. This is a title/function mismatch, not evidence that a formal exam is implemented. Existing owner decision D08 remains open: default to a review, or obtain explicit approval and design a formal assessment. Do not silently rename the lesson or imply an exam exists.

## 3. Cross-file parity result
| Lesson | Seed row found | Migration row found | Extracted payload identical |
|---|---:|---:|---:|
| 07 | Yes | Yes | Yes |
| 08 | Yes | Yes | Yes |
| 09 | Yes | Yes | Yes |
| 10 | Yes | Yes | Yes |
| 11 | Yes | Yes | Yes |
| 12 | Yes | Yes | Yes |

Parity is not proof of correctness: the Lesson 11 defect is duplicated identically in both files. The same caution applies to future edits—seed and migration should be reviewed together, with a new forward migration for any already-applied production change.

## 4. Priority register
- **P0 — Lesson 11:** incorrect source section and instructional framing in both seed and historical migration.
- **P1 — Lesson 10:** ambiguous heading and unsupported/incomplete interrogative inventory.
- **P1 — Lesson 12:** title implies a final test, but the body is a review without assessment mechanics; owner decision required.
- **P2 — Lesson 09:** Sorani future rendering and tense/aspect terminology require owner approval.
- **P2 — Lessons 07–08:** add fully worked source-grounded analyses; do not invent examples or overstate what `min xwar` demonstrates.

## 5. Change and verification boundary
This audit is documentation only. No seed SQL, historical migration, new migration, lesson HTML, course payload, application code, database, Supabase resource, main branch, deployment or production data was changed. No live database inspection, SQL execution, runtime test or release test is claimed.
