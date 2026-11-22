# Course 1 — Lessons 19–26 Audit Currency and Remaining Editorial Gates

**Date:** 2026-11-22  
**Repository:** `avasinim/zanztkurd`  
**Verification branch:** `audit/c1-lessons-19-26-verification-2026-11-22`  
**Baseline:** current project branch at the start of this verification  
**Scope:** read-only verification of existing lesson seed payloads against the previously completed lesson-specific evidence audits. This document records whether the earlier audits still apply and prioritizes the remaining owner/editor decisions. It does not authorize lesson edits.

## 1. Result

The existing lesson-specific evidence audits for Lessons 19–26 remain applicable to the current seed payloads:

| Seed file | Current blob SHA | Previously audited blob SHA | Result |
|---|---|---|---|
| `docs/kurmanji-content-seed-part-03.sql` (Lessons 17–24; relevant here 19–24) | `b6f89841ac49adb256a7874179a258436e095909` | `b6f89841ac49adb256a7874179a258436e095909` | Exact match |
| `docs/kurmanji-content-seed-part-04.sql` (Lessons 25–26 and later Course 2 rows) | `2367c5057b2b92b7fa482c64a30b05d26838d964` | `2367c5057b2b92b7fa482c64a30b05d26838d964` | Exact match |

This means the detailed audits dated 2026-11-16 and 2026-11-17 are still reviewing the exact same seed blobs currently on this branch. No intervening edit to those two seed files has invalidated their findings.

## 2. Confirmed outstanding issues in the live seed

### Lesson 19 — Interrogatives
- The current payload still gives `kî` without the `kê` oblique/case and variety qualification.
- It lists `çiqas` but does not distinguish it from `çend` (count, quantity, degree and extent have overlapping but non-identical distributions).
- The wh-in-situ pattern must remain a common/neutral pattern, not an absolute prohibition on fronting.
- The yes/no question section correctly mentions intonation; punctuation alone must not be treated as a full account of spoken question prosody.
- The example `Tu kengî têyî?` remains an exact-form/native-review item.

**Controlling report:** `docs/KURMANJI-C1-LESSON-19-INTERROGATIVES-WH-CASE-QUANTIFIERS-POLAR-QUESTIONS-AUDIT-2026-11-16.md`.

### Lesson 20 — Word order
- The SOV explanation is properly qualified as common/basic, but the lesson does not yet explain the post-verbal Goal/recipient pattern described in the source audit.
- The fronted-object example `Vê pirtûkê, ez dixwînim` remains dependent on discourse context and native prosody review; it is not a neutral interchangeable order.
- Keep the distinction between argument order, information-structure fronting and past-transitive case alignment.

**Controlling report:** `docs/KURMANJI-C1-LESSON-20-WORD-ORDER-SOV-GOALS-FOCUS-AND-ALIGNMENT-AUDIT-2026-11-16.md`.

### Lesson 21 — Adjectives and ezafe
- The current lesson still says ezafe depends on gender, number and case as one combined rule. The audit identifies this as misleading: in the Standard Kurmanjî pattern, ezafe agreement is with the head noun's gender/number; external case is a separate layer.
- Keep attributive ezafe separate from predicative adjective constructions.
- Preserve the distinction between contextually definite `bajarê mezin` and indefinite `bajar-ek-î mezin`.

**Controlling report:** `docs/KURMANJI-C1-LESSON-21-ADJECTIVES-EZAFE-GENDER-NUMBER-CASE-AUDIT-2026-11-16.md`.

### Lesson 22 — Comparatives and superlatives
- The current payload includes the regular `-tir` pattern and the `mezintir/meztir` alternation.
- It does not fully cover the documented alternatives `baş → baştir/çêtir` and `pir → pirtir/bêtir`.
- It should state the spelling behavior for adjectives ending in `t` (e.g. `xurt → xurtir`, `pêwist → pêwistir`).
- Keep `herî + adjective` distinct from adjective + `-tirîn`; clarify that comparative forms may have lexical or dialectal alternatives rather than one mechanically universal paradigm.
- The age reading of `mezintir` in the attested Meyrem example should be reflected in the gloss/context.

**Controlling report:** `docs/KURMANJI-C1-LESSON-22-COMPARATIVES-SUPERLATIVES-LEXICAL-ALTERNANTS-AUDIT-2026-11-16.md`.

### Lesson 23 — Definiteness and demonstratives
- Preserve the Standard Kurmanjî scope: no dedicated definite suffix in the described standard; bare nouns are interpreted in context; singular indefiniteness commonly uses `-ek`.
- Do not conflate the surface sequence `-ek-î` in oblique forms with an ezafe linker; syntax determines the analysis.
- The current lesson needs to make demonstrative oblique forms visible or explicitly defer them: `vî/vê/van` and `wî/wê/wan`.
- Keep the regional scope of plural indefinite `-in` explicit; do not teach it as universal.
- Analytical hyphens are morpheme segmentation, not a mandatory running-spelling convention.

**Controlling report:** `docs/KURMANJI-C1-LESSON-23-DEFINITENESS-INDEFINITENESS-DEMONSTRATIVES-CASE-AUDIT-2026-11-17.md`.

### Lesson 24 — Possession and reflexives
- The current lesson correctly uses oblique possessor forms and distinguishes the head noun's ezafe from the possessor's reference.
- The reflexive `xwe` is still a missing teaching point for relevant same-clause subject-coreference contexts.
- Explain the two ezafe layers in `birayê min ê mezin`.
- Distinguish the modifier and anaphoric uses of free ezafe forms `yê/ya/yên`.
- Keep the Standard Kurmanjî baseline and dialect variation visible.

**Controlling report:** `docs/KURMANJI-C1-LESSON-24-POSSESSION-OBLIQUE-PRONOUNS-EZAFE-REFLEXIVES-AUDIT-2026-11-17.md`.

### Lesson 25 — Direct and Oblique case
- The current lesson's core singular paradigms and the example `Ez wî mirovî dibînim` align with the cited Standard Kurmanjî description.
- The Oblique case functions are broader than present-transitive objects: they include adpositional complements, possessors, past-transitive agents and relevant Goal/recipient arguments. The lesson currently omits an explicit Goal/recipient illustration.
- The noun paradigm is singular-only. Add a plural paradigm or clearly state that plural case is deferred; if introduced, qualify regional forms and do not universalize plural indefinite `-in`.
- Strengthen the geographical/dialect qualification for bare masculine singular Oblique marking.
- Keep the distinction between case and ezafe explicit; an ezafe-bearing head does not simply display external Oblique marking in the same way as a bare noun.

**Controlling report:** `docs/KURMANJI-C1-LESSON-25-DIRECT-OBLIQUE-CASE-ALIGNMENT-DIALECT-AUDIT-2026-11-17.md`.

### Lesson 26 — Review and self-assessment
- The current seed still says that Standard spelling distinguishes `r` and `rr` in some words in the `roj` row. The Lesson 26 audit recommends removing this broad spelling claim. Do not change `roj` to `rroj`, and do not add `rr` to the 31-letter inventory.
- The self-assessment disclaimer remains present: the checklist is not an official score or proof of proficiency. Preserve it.
- The review questions and checklist still do not sample all the major course domains; add a topic-to-lesson map or a balanced review design only after editorial approval.
- This activity remains formative self-assessment, not a validated final examination or CEFR certification.

**Controlling report:** `docs/KURMANJI-C1-LESSON-26-FINAL-REVIEW-SELF-ASSESSMENT-COURSE-CLOSURE-AUDIT-2026-11-17.md`.

## 3. Priority order for the next approved content pass

1. **P0 — Owner/editor decisions:** select and document the Standard Kurmanjî reference variety and orthographic policy. This controls the interpretation of variants across all eight lessons.
2. **P0 — Accuracy corrections:** resolve Lesson 21 ezafe-versus-case wording and Lesson 26's unsupported `r/rr` spelling statement.
3. **P1 — Morphosyntax coherence:** harmonize Lessons 19, 23, 24 and 25 around one Direct/Oblique pronoun paradigm, demonstratives, possessors, reflexive `xwe`, and the distinction between case and ezafe.
4. **P1 — Clause structure:** complete the Goal/recipient note in Lesson 20 and the Oblique Goal/recipient coverage in Lesson 25, with source-attested examples and dialect scope.
5. **P1 — Comparison and question systems:** clarify `kî/kê`, `çend/çiqas`, lexical comparative alternatives, and the two superlative constructions.
6. **P1 — Human review:** obtain native Kurmanji review of every exact learner-facing inflected example and separate native Sorani copy-edit of the Sorani explanations/glosses.
7. **P2 — Course closure:** align Lesson 26's review prompts with the actual 26-lesson outcomes while preserving its formative, non-certifying status.

## 4. Change-control and verification boundary

- This report is documentation-only.
- No learner-facing lesson text, SQL seed, static wrapper, application code, test, migration, schema or database was changed.
- No SQL was executed and no database was accessed.
- No pull request was created, reviewed, merged or retargeted.
- `main`, Production and deployment were not changed.
- The prior Sorani glossary correction `سەبز` in seed part 02 is outside this report's scope.

## 5. References to the existing evidence record

This report supplements, and does not replace, the following canonical materials:
- `docs/KURMANJI-COURSE-1-LESSONS-19-24-CLAIM-LEVEL-EVIDENCE-REGISTER-2026-11-16.md`
- `docs/KURMANJI-C1-LESSON-19-INTERROGATIVES-WH-CASE-QUANTIFIERS-POLAR-QUESTIONS-AUDIT-2026-11-16.md`
- `docs/KURMANJI-C1-LESSON-20-WORD-ORDER-SOV-GOALS-FOCUS-AND-ALIGNMENT-AUDIT-2026-11-16.md`
- `docs/KURMANJI-C1-LESSON-21-ADJECTIVES-EZAFE-GENDER-NUMBER-CASE-AUDIT-2026-11-16.md`
- `docs/KURMANJI-C1-LESSON-22-COMPARATIVES-SUPERLATIVES-LEXICAL-ALTERNANTS-AUDIT-2026-11-16.md`
- `docs/KURMANJI-C1-LESSON-23-DEFINITENESS-INDEFINITENESS-DEMONSTRATIVES-CASE-AUDIT-2026-11-17.md`
- `docs/KURMANJI-C1-LESSON-24-POSSESSION-OBLIQUE-PRONOUNS-EZAFE-REFLEXIVES-AUDIT-2026-11-17.md`
- `docs/KURMANJI-C1-LESSON-25-DIRECT-OBLIQUE-CASE-ALIGNMENT-DIALECT-AUDIT-2026-11-17.md`
- `docs/KURMANJI-C1-LESSON-26-FINAL-REVIEW-SELF-ASSESSMENT-COURSE-CLOSURE-AUDIT-2026-11-17.md`

The two seed blob hashes recorded in Section 1 are the verification evidence that these reports still correspond to the current source payloads on this branch.
