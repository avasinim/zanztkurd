# Course 2 (12-lesson Morphology) — Structure, Seed and Source Audit

**Date:** 2026-11-22  
**Repository:** `avasinim/zanztkurd`  
**Branch:** `audit/c2-12morphology-structure-2026-11-22`  
**Scope:** read-only review of the current 12-lesson Kurmanji morphology course page, its twelve lesson wrappers, and the two SQL seed files. The review also records conflicting legacy course-registry documentation. No learner-facing content or database objects were changed.

## 1. Current 12-lesson content package verified

The current `kurmanji-course-2.html` page identifies Course 2 as **Morphology and Kurmanji Grammar** and lists twelve lessons. The page wrappers `kurmanji-course-2-lesson-01.html` through `kurmanji-course-2-lesson-12.html` all exist on this branch. Each wrapper has the corresponding `data-lesson-key` matching its own filename.

The current SQL seed payloads divide the same course into two consecutive groups:

| Seed file | Rows | Lesson keys | Current blob SHA |
|---|---:|---|---|
| `docs/kurmanji-content-seed-part-04.sql` | 6 | 01–06 | `2367c5057b2b92b7fa482c64a30b05d26838d964` |
| `docs/kurmanji-content-seed-part-05.sql` | 6 | 07–12 | `e40298225e03921edb3ad31704191bdf0c20e880` |

The twelve titles in the seed rows agree with the twelve lesson titles in the Course 2 page:

1. Morphology and word structure
2. Root, prefix and suffix
3. Noun, grammatical gender and number
4. Definite and indefinite nouns; suffix `-ek`
5. Ezafe and the relation between noun and adjective
6. Possession and possessive pronouns
7. Personal pronouns and Direct/Oblique case
8. Verb, stem, person and number
9. Present, past and future
10. Negative and interrogative sentences
11. Word order and sentence structure
12. Review and final assessment

This verifies the repository-level presence and key/title mapping. It does **not** prove that the seed has been applied to a live Supabase database or that the deployed site is serving these exact rows.

## 2. Legacy documentation conflict — must be reconciled

Two repository continuity documents still describe a different Course 2:

- `COURSE-REGISTRY.md` states Course 2 is a 32-lesson Phonetics and Phonology course, and gives a total of 58 lessons across Course 1 and Course 2.
- `PROJECT-CONTINUITY.md` repeats the 32-lesson Course 2 / 58-lesson total and says structural changes require the user's direct decision.
- By contrast, the current `kurmanji-course-2.html`, its twelve lesson wrappers, and seed parts 04–05 implement a 12-lesson Morphology and Kurmanji Grammar course.

These are incompatible course identities and counts. This report deliberately does not overwrite either continuity file, change the registry, reassign the 32-lesson phonetics catalogue, or infer whether the old 32 lessons should be archived, retained as a separate course, or mapped elsewhere. The repository owner should explicitly reconcile the legacy 32-lesson record with the current 12-lesson implementation before any release or course-catalogue change.

## 3. Source checks — confirmed alignment

The current content cites Geoffrey Haig (2018), “Northern Kurdish (Kurmanjî),” as a principal reference. Direct comparison with the chapter's Standard Kurmanjî discussion confirms several important forms and generalizations:

- The Direct/Oblique personal-pronoun table in Lesson 7 matches Haig's Standard Kurmanjî table: `ez/min`, `tu/te`, `ew/wî-wê`, `em/me`, `hûn/we`, `ew/wan`.
- The reflexive `xwe` in Lesson 6 is supported. Haig explicitly gives `Ez li mal-a xwe me` and contrasts it with the unacceptable same-clause possessor `*mal-a min`.
- Lesson 4's `gund-ek-î` and `jin-ek-ê` forms are attested in Haig's Standard Kurmanjî case/indefiniteness paradigm.
- Lesson 5's examples `bajar-ek-î mezin` and `mal-a me` are direct examples in Haig's ezafe discussion.
- Lesson 8's comparison `ez dibêjim`, `ez hatim`, and `min xwar` matches Haig's sample conjugation table.
- Lesson 10's `ne-hatin` and `ne-di-hatin` examples match Haig's Standard Kurmanjî description of past negation. The source also notes regional variation in western Kurmanjî, so the lesson's Standard Kurmanjî scope note should remain.
- Lesson 11's SOV statement is correctly framed as a neutral/basic order, not an absolute rule. Haig notes pragmatic fronting and dialect variation in Goal/recipient placement.

## 4. Exact-source correction required — Lesson 9

One source-attributed future-tense example is not copied exactly in the current seed:

| Current seed text | Haig (2018), §2.6.4 |
|---|---|
| `ew dē mesel-ē ji te re bēž-e` | `ew dê mesel-ê ji te re bêž-ê` |

The source gloss is “He will tell you the issue.” Haig identifies `(d)ê/wê` as the future particle combined with a subjunctive verb form; the example is printed with `dê`, `mesel-ê`, and `bêž-ê`. The current seed's vowel spellings differ from the source. Because the lesson attributes this as a source example and the repository requires exact preservation of source forms, this should be corrected only in a controlled content edit with the exact cited form retained. Do not normalize or respell other Kurmanji forms by analogy.

## 5. Teaching-completeness and editorial follow-ups

These are editorial recommendations, not claims that the current lesson text is linguistically false:

1. **Lesson 2:** it introduces prefixes and suffixes but only gives `-ek` as a concrete Kurmanji affix example. Consider adding a source-attested prefix example (e.g. the indicative `di-` or subjunctive `bi-`) and explicitly distinguish inflection from derivation.
2. **Lesson 3:** the gender/number explanation is directionally correct, but a compact Standard Kurmanjî ezafe table would make the relationship observable instead of leaving it abstract.
3. **Lesson 6:** retain the `xwe` rule but keep it scoped to same-clause coreference in Standard Kurmanjî; do not generalize the possessive use across dialects without qualification.
4. **Lesson 9:** after correcting the exact source example, distinguish the future particle plus subjunctive construction from the present `di-` pattern. Haig also notes that high-frequency verbs such as `gotin` may omit `bi-` in the future.
5. **Lesson 10:** retain the qualification that `na-` replaces the indicative prefix in many present forms, `ne-` replaces the subjunctive prefix, and `ni-` occurs with the exceptional verbs `zanîn` and `karîn`. Do not teach one negative prefix as universal.
6. **Lesson 12:** the review questions cover the main course themes, but a balanced final assessment should sample all twelve lesson outcomes and distinguish formative self-assessment from a validated proficiency test.

## 6. Primary references consulted

- Haig, Geoffrey (2018), “Northern Kurdish (Kurmanjî),” in *The Languages and Linguistics of Western Asia: An Areal Perspective*, pp. 106–158. DOI: https://doi.org/10.1515/9783110421682-004. Public author-hosted chapter PDF: https://www.uni-bamberg.de/fileadmin/aspra/06_Team/Publications_and_CV/haig_2018_ch.2.3_northern_kurdish.pdf.
  - §2.2.3, Table 9: personal pronouns and reflexive `xwe`.
  - §2.3.1, examples (4), (5), and (9): ezafe, `bajar-ek-î mezin`, `mal-a me`, and same-clause reflexive `xwe`.
  - Table 7: Direct/Oblique case and singular indefiniteness.
  - Table 14: sample verb conjugations.
  - §2.6.1: TAM and negation prefixes, including `na-`, `ne-`, `ni-`, and past negation.
  - §2.6.4: future particle `(d)ê/wê) and the exact example `ew dê mesel-ê ji te re bêž-ê`.
  - §2.7.1: neutral SOV order and pragmatic/dialectal variation.
- Gündoğdu, Songül (2015), “Negation in Kurmanji,” in *Affix Ordering Across Languages and Frameworks*, pp. 154–172. DOI: https://doi.org/10.1093/acprof:oso/9780190210434.003.0007. This provides a more detailed analysis of the negative morphology and affix ordering.

## 7. Change-control boundary

- Documentation audit only; no lesson seed, wrapper, course page, SQL migration, application code, test, database or production setting was changed.
- No SQL was executed and no Supabase environment was accessed.
- No pull request was created or merged.
- `main`, Production and deployment were not changed.
- The exact-source Lesson 9 correction is recorded as a pending controlled edit, not applied in this audit.
- The legacy 32-lesson Course 2 record remains untouched pending explicit reconciliation.
