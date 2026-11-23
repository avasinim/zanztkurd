# Course 2 — Cross-Specification Consistency Audit
Date: 2026-11-23
Status: Documentation-only reconciliation of the 12 lesson implementation specifications and controlling terminology/sign-off documents.

## 1. Scope and method

This pass compares the six implementation-specification files covering Lessons 01–12 against the working terminology register and the 12-lesson sign-off register. It checks for stale workflow instructions, conflicting terminology, duplicated or inconsistent wording, scope mismatches and unresolved dependencies.

This is a document-consistency review only. It is not a fresh linguistic verification of every Kurmanjî example, a source-PDF re-audit, a runtime test, or approval to change learner-facing lessons.

## 2. Documents compared

The following files were fetched from the same repository reference and compared by content:

| Document | Retrieved blob SHA |
|---|---|
| Lessons 01–03 and 06 specification | `1bb8b557d48e7d59b29a9f900c616d4188c686b3` |
| Lessons 04–05 specification | `3fbca34c1c4c0c2f2bdc9b542ed3e2928f91ab04` |
| Lessons 07–08 specification | `ec63617c0ab16429c9e5b13f2ae971f438bdb2f9` |
| Lesson 09 specification | `d0a4d9c7fffbd3fb6b83c84aa759eef0ec16ef77` |
| Lessons 10–11 specification | `299a5869c8f15a98595cfc8ba4f23dc85fd71d8d` |
| Lesson 12 specification | `8bdcd8ba109746ee786a0581231980e4abc7af01` |
| Working terminology register | `9dc825d6d3cea2fd6c87d43436447ecf1fa10083` |
| 12-lesson sign-off register (before this reconciliation) | `31b84f8cf78e5c5b65271def48ed15a33ac4ecd3` |

The Lesson 01–03/06 wording correction and sign-off-register workflow correction are made in the same review branch as this audit. Their final versions are to be verified against the post-work backup.

## 3. Confirmed consistency

The following high-impact distinctions are consistently protected across the specifications and terminology register:

1. **Morphology vs morpheme:** `مۆرفۆلۆجی` names the field; `مۆرفیم` names the unit.
2. **Root vs base vs stem:** root `ڕەگ` and base `بنەڕەت` remain distinct; stem `ستێم` remains provisional pending owner/editor approval.
3. **Indefinite marking vs case vs ezafe:** `-ek`, oblique endings and ezafe are not treated as interchangeable.
4. **Ezafe agreement:** the head noun controls the relevant ezafe agreement; the following adjective/possessor is not presented as the controller.
5. **Case vs grammatical role:** direct/oblique case is not simplified to a universal subject/object rule.
6. **Tense vs aspect:** separate concepts; the Sorani label `ڕوانگەی کردار` remains provisional.
7. **Negation:** `na-`, `ne-` and lexical `ni-` remain construction-specific rather than universal interchangeable prefixes.
8. **Questions:** `ma` and a complete interrogative inventory remain gated on current Standard Kurmanjî evidence.
9. **Word order vs alignment:** neutral SOVG in Haig §2.7.1 remains separate from the past-transitive ergative example in §2.7.2.
10. **Dialect and source discipline:** no specification authorizes invented Kurmanjî forms or silent mixing of dialects.
11. **Lesson 12:** its current instructional function is treated as cumulative review unless the owner explicitly chooses a formal examination through D08.

## 4. Findings and corrections

### C01 — Stale remaining-work instructions in the sign-off register
**Severity:** Medium; coordination defect.

The register's status matrix correctly showed implementation specifications drafted for Lessons 01–12, and its index listed Lesson 09 and Lesson 12 specifications. However, its ordered remaining-work list still instructed the team to prepare the Lesson 09 and Lesson 12 specifications.

**Correction:** Replace those obsolete creation tasks with the actual outstanding gates: Lesson 09's future-source/context and owner terminology checks, and Lesson 12's D08 review-versus-exam decision. The register must not describe already drafted specifications as work that is still to be created.

### C02 — Duplicated wording in the Lessons 01–03/06 specification
**Severity:** Low; copy-edit defect.

The Lesson 06 sequence contained the phrase “without claiming without claiming a full possessive paradigm”.

**Correction:** Remove the duplicated phrase. The sentence now reads “without claiming a full possessive paradigm unless approved.”

### C03 — Lesson 09 future example remains a source-context gate
**Severity:** High; linguistic/source gate, not a document inconsistency.

The Lesson 09 specification consistently records the future construction `ew dē mesel-ē ji te re bēž-e`, but also explicitly states that the Haig PDF could not be reopened during that pass and that the complete clause gloss and analysis of `dē` and `bēž-e` must be rechecked before learner-facing use.

**Disposition:** No gloss is approved by this cross-specification audit. Keep the exact form and existing provisional analysis out of expanded learner-facing explanation until the source-context gate is closed.

### C04 — Lesson 10 question inventory remains unresolved
**Severity:** High; owner/source gate.

The Lessons 10–11 specification does not treat the 1965 regional/historical reference as sufficient evidence to prescribe `ma` in the Standard Kurmanjî course. It also requires current-source verification for the question-word inventory and clarification of the ambiguous Lesson 10 heading.

**Disposition:** Preserve the existing gate. Do not add `ma`, new interrogative paradigms or a guessed reinterpretation of the heading.

### C05 — Lesson 11 needs a separate verified SOVG worked example
**Severity:** Medium; instructional/source gap.

The specification correctly distinguishes Haig §2.7.1 neutral SOVG (where G is a goal argument) from §2.7.2 example (32), `Wî mirov-î çay anî`, which illustrates past-transitive ergative alignment. It also explicitly refuses to invent an SOVG sentence.

**Disposition:** Retain the distinction and record the worked-example gap until a complete source-attested SOVG clause is verified. Do not repurpose example (32) as an SOVG example.

### C06 — Lesson 06 scope decision remains open
**Severity:** High; owner decision D04.

The specification accurately describes the current coverage as ezafe possession and same-clause reflexive `xwe`, not a full possessive-pronoun paradigm. It offers two conditional editorial paths.

**Disposition:** No title or paradigm change until D04 is explicitly decided. The register correctly keeps the owner decision open.

### C07 — Lesson 12 review/exam decision remains open
**Severity:** High; owner decision D08.

The Lesson 12 specification recommends cumulative review as the conservative default. A formal examination requires explicit approval of purpose, duration, points/weights, pass threshold, references, accepted variants, answer key and rubric.

**Disposition:** Do not invent exam rules. Keep D08 open until the owner decides.

### C08 — Terminology approval remains a course-wide prerequisite
**Severity:** High; owner decisions D02–D03.

The specifications consistently mark stem, aspect, syncretism, ergative alignment and focus/fronting labels as provisional where applicable. A document-wide consistency check cannot replace owner approval of the terminology.

**Disposition:** Keep provisional labels visible as provisional; do not silently freeze them in learner-facing lessons.

## 5. Cross-lesson dependency map

| Dependency | Affected lessons | Closure condition |
|---|---|---|
| Root/base/stem terminology | 01–02 and all later references | D02 and approved glossary entry |
| Gender, number and head-noun agreement | 03–05 | Source-checked paradigms and explicit controller explanation |
| Indefinite suffix, oblique case and ezafe | 04–05, recap in 12 | Contextualized forms and correct segmentation |
| Possession and reflexive scope | 06, recap in 12 | D04 and source-bounded `xwe` rule |
| Direct/oblique pronouns and grammatical role | 07–08, 11–12 | Full clauses, glosses and non-mechanical case explanation |
| Verb patterns and tense/aspect | 08–09, recap in 12 | D03 and Lesson 09 future source-context check |
| Negation and questions | 10, recap in 12 | D05–D07 and current Standard Kurmanjî evidence |
| SOVG and ergative alignment | 11–12 | Separate verified examples and corrected source locations |
| Review vs formal examination | 12 | D08 |

## 6. Current readiness judgment

**Documentation planning:** implementation-ready editorial specifications exist for Lessons 01–12.

**Instructional sign-off:** not ready. D01–D09 and the lesson-specific source/owner gates remain open as recorded in the sign-off register.

**Learner-facing implementation:** not authorized by this audit. The specifications are plans, not permission to edit course content.

**Release/runtime status:** not tested by this review. No claim is made about the live site, database, navigation, deployment or production behavior.

## 7. Required next sequence

1. Obtain and record owner decisions D01–D09; prioritize D02–D07 and D08.
2. Reopen and verify the full Haig §2.6.4 context for Lesson 09's future construction and gloss.
3. Verify a complete SOVG example from Haig §2.7.1 or another approved current source, if the lesson requires a worked clause.
4. Verify current Standard Kurmanjî question forms and the status of `ma`; clarify Lesson 10's heading with the author.
5. Reconcile all 12 specifications against the owner-approved terminology register.
6. Conduct a source-by-source and independent instructional review.
7. Present the final learner-facing change plan for explicit approval before implementation.

## 8. Change boundary

This audit and the accompanying corrections are documentation-only. No lesson HTML, SQL seed, course payload, application code, database, migration, Supabase resource, `main` branch, deployment or production data was changed. No runtime, navigation, release or production test is claimed.
