# Northern Kurmanji Courses 1–2 — Integrated 38-Lesson Release Action Register

**Date:** 2026-11-16  
**Branch:** `fix/kurmanji-ci-current-migration`  
**Scope:** Course 1 (26 lessons) + Course 2 (12 lessons), 38 lessons total  
**Status:** Documentation-only integration of the two completed source-review rounds. Not a release certification.

## 1. Purpose

This register joins the completed reviews:
- `KURMANJI-COURSE-1-INTEGRATED-26-LESSON-ACTION-REGISTER-2026-11-16.md`
- `KURMANJI-COURSE-2-12-LESSON-SOURCE-REVIEW-2026-11-16.md)
- `KURMANJI-SEED-MIGRATION-DIFF-REVIEW-2026-11-16.md`

It is a single decision and work register for all 38 Northern Kurmanji lessons. It does not replace the individual reviews, independently certify every example, or authorize lesson edits.

## 2. Overall disposition

**All 38 lesson bodies have received a first source/editorial review. Neither course is certified for release.**

The central grammar and orthography framework is broadly supported by published descriptions of Northern Kurmanji. The remaining work is concentrated in:
1. Exact source verification of individual inflected examples and glosses.
2. Consistent treatment of direct/oblique case, split alignment, ezafe, gender and number.
3. Explicit variety scope wherever Kurmanji dialects differ.
4. Native Sorani copy-edit and an approved Avasin house style.
5. Reconciliation of the historical migration and split seed package.
6. Runtime, access-control, progression and persistence tests in a disposable environment.

## 3. Cross-course dependency map

| Shared concept | Course 1 coverage | Course 2 coverage | Integrated requirement |
|---|---|---|---|
| Hawar alphabet, letters, sounds | C1 L01–08 | — | Keep grapheme/letter claims separate from phoneme and phonetic claims. RR/R must not be confused with a distinct Hawar letter. |
| Names and regional forms | C1 L09–10 | Across examples | Preserve source spelling and label regional variants; do not normalize Latin Kurmanji without evidence. |
| Personal pronouns | C1 L11–12 | C2 L07 | Use one direct/oblique paradigm and one explanation of its limits. Avoid a simple subject/object equivalence. |
| Gender, number and noun morphology | C1 L21–24 | C2 L03–05 | Teach gender in singular, plural neutralization, case, indefiniteness and head-controlled ezafe together, while distinguishing the lesson level. |
| Ezafe and possession | C1 L21, L23–24 | C2 L05–06 | Distinguish linking ezafe, free/demonstrative ezafe, case suffixes, and oblique possessors. |
| Verbs, tense/aspect and negation | C1 L17–18 | C2 L08–10 | Align examples and terminology for present `di-`, negation `na-/ni-/ne-`, past transitive/intransitive forms, subjunctive and future particles. |
| Questions and clause structure | C1 L19–20 | C2 L10–11 | Keep wh-in-situ, pragmatic word order, SOV default and Goal/recipient variation consistent. |
| Self-assessment | C1 L26 | C2 L12 | Label review tasks and informal self-assessment honestly; do not imply a formal proficiency certificate without scoring design. |

## 4. Integrated priority register

### P0 — decide the reference variety and editorial policy

Before editing any lesson, the owner/editor should explicitly decide:
- Which Standard Kurmanji reference variety is the default for the 38 lessons.
- How regional variants are displayed (main form + variant note, or separate dialect labels).
- The canonical Sorani spelling/terminology style for explanations and glosses.
- Whether source citations appear inside student lessons, in teacher notes, or only in the editorial record.
- Which repository artifact is the canonical lesson-content source when migration and split seed rows differ.

No spelling should be silently changed merely to make two files match.

### P1 — grammatical consistency and source precision

1. **R/RR and orthography vs phonetics (C1 L04, L06, L08, L26).** Keep the alphabet inventory distinct from the pronunciation of rhotic sounds. Do not teach `rr` as an extra Hawar letter without independent orthographic evidence.
2. **Direct/oblique case and split alignment (C1 L11, L19–25; C2 L04, L06–09).** Keep direct/oblique terms consistent. Do not equate direct with subject or oblique with object. Explain past transitive alignment with full clause examples.
3. **Gender, plural and noun case (C2 L03–04; C1 L21, L23).** In Standard Kurmanji, nouns generally have no overt direct plural suffix; oblique plural commonly has `-a(n)`. The direct indefinite plural `-in` is restricted/variable and must not be presented as universal. Gender distinctions are neutralized in plural.
4. **Ezafe (C1 L21, L23–24; C2 L03–06).** Make clear that ezafe agrees with the head noun's gender/number. Separate ezafe from case marking, and linking ezafe from free/demonstrative ezafe. Preserve the different functions of superficially similar endings, e.g. oblique `-î/-ê` versus ezafe `-î/-a`.
5. **Verb paradigms and tense/aspect/mood (C1 L17–18; C2 L08–10).** Use a shared, source-checked set of examples that shows present, past intransitive, past transitive, subjunctive and future construction without collapsing them into one suffix rule.
6. **Negation (C1 L18; C2 L10).** Keep the Standard Kurmanji distinctions: `na-` in many present indicative forms, `ni-` in forms such as `nizanim` and `nikarim`, and `ne-` in relevant subjunctive and past forms. Mark dialect-specific alternatives rather than universalizing them. Add verified examples for non-verbal negation and questions before retaining those lesson headings.
7. **Word order and Goals (C1 L20; C2 L11).** Teach SOV as a neutral baseline, not an exceptionless order. Include information structure/fronting and source-backed Goal/recipient patterns, with variety labels.
8. **Exact source transcription (C2 L09).** Check future examples and diacritics directly against the cited section before describing them as quotations. Keep source transcription separate from pedagogically adapted forms.

### P2 — pedagogy and lesson completeness

- C1 L01–02 and C2 L01–02: add segmented, source-checked examples for grapheme/phoneme and root/stem/morpheme distinctions.
- C2 L03–06: provide compact paradigms for noun gender/number, `-ek`, ezafe and possession.
- C1 L11–12 and C2 L07: share a consistent pronoun table and worked direct/oblique examples.
- C1 L17–18 and C2 L08–10: use a common verb-example set with explicit morpheme boundaries and glosses.
- C1 L19–20 and C2 L10–11: include full question, negation and word-order examples.
- C1 L26 and C2 L12: decide whether each page is a review, informal self-assessment, or scored final test. If scored, define items, answer key, scoring and completion rules.

### P3 — Sorani editorial pass

A native Sorani editor should review all 38 lesson bodies for spelling, punctuation, clarity, terminology and consistency. Existing flags include:
- Course 1: glosses and explanatory language across L03, L06–10, L13–16, L19–26.
- Course 2: all lessons require a consistent terminology pass; specific seed/migration differences were previously recorded in L04, L06, L09 and L10.

Potential house-style conflicts previously observed include `پەیویست/پێویست`, `نوسین/نووسین`, `ڕون/ڕوون`, and other repeated-letter choices. Do not select one by guess. Approve the style first, then apply it consistently with a documented diff.

## 5. Seed and migration integrity — separate release blocker

The previous comparison found 12 non-identical lesson payloads between the historical migration and the five split seed files:
- Course 1: lessons 01–06, 10 and 25.
- Course 2: lessons 04, 06, 09 and 10.

The differences have Git provenance; the split seeds include later edits/enrichments. The migration is a historical snapshot and must not be rewritten simply to make the parity test green. The split seed must not be assumed canonical without owner/editor approval either.

Required safe sequence:
1. Review each of the 12 row-level differences.
2. Decide the canonical payload and spelling for each row.
3. Record the decision in a change proposal.
4. Update only the approved source artifact(s) on an isolated branch.
5. Rerun PostgreSQL syntax validation and exact seed/migration parity.
6. Test the migration/RPC behavior in a disposable database.
7. Never run production SQL or alter production data as part of this review.

## 6. Technical release gates

Content review is not proof of runtime correctness. Before release is reconsidered, independently verify:

- Exactly 26 Course 1 and 12 Course 2 lesson keys, in order, with no duplicates.
- Course plans link to the right lesson pages and do not cross course boundaries.
- Every protected lesson uses the shared access-control logic.
- Signed-out and unenrolled users receive the correct enrollment flow.
- Enrolled students can read only permitted content.
- Owner/admin access behaves as intended.
- Prerequisites, lesson completion, progress and persistence work end-to-end.
- Quiz scoring and final assessment behavior match the intended product design.
- Browser tests pass against a disposable test environment.
- SQL parser and exact parity validator both pass after approved content decisions.

The previous CI parity failure remains a real blocker until reconciled. No production DB state has been inferred from static repository files.

## 7. Research notes and sources

The following primary academic material supports the integrated grammatical framework:

1. Geoffrey Haig (2018), “Northern Kurdish (Kurmanjî),” *The Languages and Linguistics of Western Asia: An Areal Perspective*, pp. 106–158. DOI: https://doi.org/10.1515/9783110421682-004. Full chapter: https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf
   - §2.2: nominal morphology, gender, case and plural.
   - §2.3: noun phrase structure, linking and free ezafe.
   - §2.6: verb morphology, tense/aspect/mood, negation and future.
   - §2.7: clause structure and word order.
2. Geoffrey Haig & Ergin Öpengin (2018), “Kurmanji Kurdish in Turkey: Structure, varieties and status.” https://www.uni-bamberg.de/fileadmin/aspra/06_Team/Publications_and_CV/HaigOepengin2018_Kurmanji_Kurdish_.pdf
   - Useful for regional variation in plural marking, ezafe, case and verbal morphology. Its regional findings must not be silently generalized to all Kurmanji.
3. Mark Baker & Ümit Atlamaz (2014), “On the Relationship of Case to Agreement in Split-Ergative Kurmanji and Beyond.” https://sites.rutgers.edu/mark-baker/wp-content/uploads/sites/199/2019/07/kurmanji-split-erg-distributed-July-2014.pdf
   - Supporting analysis of case/agreement and split alignment.
4. Songül Gündoğdu (2015), “Negation in Kurmanji,” *Affix Ordering Across Languages and Frameworks*, pp. 154–172. DOI: https://doi.org/10.1093/acprof:oso/9780190210434.003.0007
   - Supporting account of the interaction among `na-`, `ne-`, `ni-`, `di-` and `bi-`.

The references support the grammar framework; they do not automatically certify every Sorani translation or every learner-facing example in the seed files. Each example still needs claim-level review.

## 8. Protection and audit trail

This integration is documentation-only:
- No lesson body or Latin Kurmanji form was edited.
- No split seed or historical migration was edited.
- No application code, schema, or database was changed.
- No production SQL was executed.
- `main`, PR #3, and deployment were not changed.
- The pre-work backup is `backup/kurmanji-before-integrated-38-lesson-register-2026-11-16`.
- A matching post-work backup must point to the final commit of this register.

## 9. Final decision

**38/38 lessons reviewed at first-pass source/editorial level; 0/2 courses certified for release.**

The correct next implementation artifact is a proposal-only correction sheet containing exact before/after snippets, source citations, dialect scope, and a status per issue. Do not apply lesson edits, seed changes, migration changes, production SQL, merge, or deployment until the relevant owner/editor decisions and explicit permissions are in place.
