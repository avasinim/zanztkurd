# Course 1 — Priority Semantics and Action-ID Reconciliation Addendum

**Date:** 2026-11-23  
**Repository:** `avasinim/zanztkurd`  
**Working branch:** `fix/kurmanji-ci-current-migration`  
**Verified starting HEAD:** `b1c15a9d76fed172223b6d208400fe00a619baa2`  
**Pre-work checkpoint:** `backup/c1-priority-register-reconciliation-before-2026-11-23`  
**Scope:** documentation-only reconciliation of priority labels and action-ID coverage. No linguistic re-audit, lesson edit, inventory edit, or priority change is authorized or performed.

## 1. Purpose

The existing Course 1 evidence corpus is sufficient; a duplicate lesson audit is not warranted. This addendum records a traceability ambiguity between the lesson-level proposed correction queue in the integrated closure report and the course-wide action IDs in the integrated action register. It also identifies one lesson-level queue item not mapped to C1-A04–C1-A06.

## 2. Directly observed documents

- `docs/KURMANJI-COURSE-1-26-LESSON-INTEGRATED-EVIDENCE-CLOSURE-REPORT-2026-11-17.md`, §6, **Proposed correction queue (not applied)**: labels Lessons 19–26 P0; Lessons 01–26 native Kurmanji review, native Sorani copy-edit, and example variety/provenance metadata P1; outcome mapping P2.
- `docs/KURMANJI-COURSE-1-INTEGRATED-AUDIT-ACTION-REGISTER-2026-11-17.md`, §3: C1-A04–A06 are P1 cross-lesson actions; C1-A01–A03 are P0; C1-A07–A09 are P1; C1-A10–A11 are P2.
- `docs/KURMANJI-COURSE-1-ACTION-REGISTER-CURRENT-STATE-RECONCILIATION-ADDENDUM-2026-11-17.md`, §3: repeats C1-A04–A06 as P1 after reconciliation.
- `docs/KURMANJI-COURSE-1-ACTION-REGISTER-INVENTORY-DOCUMENTATION-CONFLICT-ADDENDUM-2026-11-19.md`, §3: confirms the same priority/status table and current gates.

These are direct document observations. No external linguistic source was newly consulted; this addendum makes no new linguistic claim.

## 3. Priority and mapping discrepancy

| Lesson | Closure report §6 | Existing action-register mapping | Mapping status |
|---|---|---|---|
| 19 — interrogatives/quantifiers/polar questions | P0 | C1-A06, P1 | Overlap: priority labels differ |
| 20 — word order/focus/recipient-goal | P0 | C1-A04 and C1-A06, P1 | Overlap: priority labels differ |
| 21 — adjectives/ezafe | P0 | C1-A05, P1 | Overlap: priority labels differ |
| 22 — comparatives/superlatives/lexical variants | P0 | No explicit C1-A04–A06 lesson-22 mapping | Action-ID coverage gap |
| 23 — definiteness/demonstratives/oblique case | P0 | C1-A05, P1 | Overlap: priority labels differ |
| 24 — possession/oblique pronouns/ezafe/reflexives | P0 | C1-A05, P1 | Overlap: priority labels differ |
| 25 — Direct/Oblique alignment | P0 | C1-A04, P1 | Overlap: priority labels differ |
| 26 — final review/r/rr | P0 | C1-A02, P0 | Priority agrees |

**Finding C1-PRI-01 — P0/P1 semantics are not explicitly reconciled.** The closure report gives P0 to lesson-specific proposed corrections for Lessons 19–25; the course-wide register places overlapping cross-lesson actions C1-A04–A06 at P1. The existing documents do not explicitly state whether these labels represent different work layers or whether the P1 action IDs intentionally subsume, without downgrading, the lesson-level P0 corrections.

**Finding C1-PRI-02 — Lesson 22 lacks explicit action-ID linkage.** The Lesson 22 P0 comparative/superlative correction queue item is not named in the stated scopes of C1-A04, C1-A05, or C1-A06. The lesson-level queue remains visible, but the course-wide register has no direct ID cross-reference for this item.

## 4. Evidence strength, interpretation, and proposed resolution

- **Direct evidence:** the exact priority labels and lesson scopes appear in the documents cited above.
- **Inference only:** the P0 lesson corrections may be intended as item-level blockers while P1 C1-A04–A06 are course-wide harmonization tracking actions. That hierarchy is plausible but is not explicitly documented; do not treat it as an approved interpretation.
- **Unresolved:** whether overlapping P0 lesson corrections remain controlling, whether P1 actions are merely their cross-lesson tracking layer, and which action ID should own Lesson 22.

### Proposal (not approval; no priority altered)

1. Retain the closure report's P0 status for its Lesson 19–26 correction queue until the owner/editor explicitly resolves the priority semantics.
2. Retain C1-A04–A06 as P1 course-wide harmonization actions for tracking, but cross-link overlapping lesson P0 items and explicitly state that P1 does **not** downgrade the lesson-level P0 gate.
3. Add an explicit action-ID link for Lesson 22 in the next authorized action-register revision (either a new item or a documented scope/linkage decision). Do not silently expand C1-A04–A06.
4. Preserve P1 native-review gates (Kurmanji native-speaker/editor and Sorani copy-editor) and P2 outcome-mapping/communicative-task proposals as separate review layers.

## 5. Variety and human-review boundaries

- Course 1 is the Sorani-mediated pathway; Kurmanji linguistic review and Sorani copy-edit are independent gates.
- The current written-target recommendation is Standard Kurmanjî in Hawar-based orthography, loosely associated with Cizre/Botan; it is not a universal spoken-variety claim. Owner selection and regional alternative labels remain unresolved.
- Native Kurmanji-speaker/editor approval is not recorded as complete in the existing ledger; native Sorani copy-edit approval is also not recorded as complete.
- Sources support grammatical propositions at varying scope, but not all exact learner-facing examples, glosses, pragmatic naturalness, or dialect suitability. The existing registers and closure report remain the evidence records; this addendum does not re-attest their claims.
- The separate Kurmanji-only Latin/Hawar pathway remains separate; no line-by-line translation or new lesson content is proposed.

## 6. Inventory and change-control

- Course 1 remains **26 lessons**.
- Course 2 remains **12 lessons** for this maintenance scope.
- The existing Course 2 registry/closure documentation conflict remains unresolved and is not addressed here.
- No lesson body, learner-facing HTML, inventory, mapping, seed, schema, migration, application code, CI, runtime, test, database, Supabase, PR #3, `main`, or deployment was changed.
- This addendum is documentation-only, proposal-only, and is not release certification or authorization to edit lesson content.

## 7. Next safe step

In the next authorized action-register revision, explicitly define the priority layers and add the missing Lesson 22 action-ID cross-reference. Until then, preserve both existing labels as written and treat the lesson-level P0 corrections as not closed. Native review, owner decisions, and item-level provenance remain open.
