# Course 1 — 26-lesson action-register and inventory-documentation reconciliation addendum

**Date:** 2026-11-19  
**Repository:** `avasinim/zanztkurd`  
**Working branch:** `fix/kurmanji-ci-current-migration`  
**Baseline HEAD:** `398e413b431367913e3a99b0974aa9d09b84a8b8`  
**Pre-work backup:** `backup/course1-inventory-documentation-conflict-before-2026-11-19`  
**Scope:** read-only verification of the Course 1 action-register corpus, plus a documentation-integrity finding. Proposal-only. No course inventory or learner-facing content changed.

## 1. Why this addendum is needed

The existing Course 1 action register, its reconciliation addendum, the 26-lesson evidence-closure report, the five lesson-range registers, and the native-review/provenance ledger already provide extensive linguistic evidence and editorial action tracking. A duplicate course-wide evidence report is not warranted.

A separate, actionable documentation inconsistency was confirmed, however: `COURSE-REGISTRY.md` describes Course 2 as **32 lessons** and the two-course total as **58 (26 + 32)**, while the current project instruction and the Course 2 academic closure report scope Course 2 at **12 lessons**. This discrepancy should be tracked without changing course inventory, lesson files, mapping, or registry text in this run.

## 2. Verified document state and traceability

### Course 1 governing records

- `docs/KURMANJI-COURSE-1-INTEGRATED-AUDIT-ACTION-REGISTER-2026-11-17.md` — action IDs C1-A01–C1-A11; priorities and current status.
- `docs/KURMANJI-COURSE-1-ACTION-REGISTER-CURRENT-STATE-RECONCILIATION-ADDENDUM-2026-11-17.md` — refined evidence/status interpretation for C1-A01–A03.
- `docs/KURMANJI-COURSE-1-26-LESSON-INTEGRATED-EVIDENCE-CLOSURE-REPORT-2026-11-17.md` — five-range evidence consolidation and closure boundaries.
- `docs/KURMANJI-COURSE-1-NATIVE-REVIEW-AND-EXAMPLE-PROVENANCE-LEDGER-2026-11-17.md` — per-lesson review queue and example-provenance fields.
- Five claim-level registers: Lessons 01–06, 07–12, 13–18, 19–24, and 25–26.

### Inventory conflict sources

- `COURSE-REGISTRY.md`, §§1–3: Course 1 = 26; Course 2 = 32; total = 58.
- `COURSE-REGISTRY.md`, §2: lists Course 2 Lessons 01–32.
- `docs/KURMANJI-COURSE-2-12-LESSON-INTEGRATED-EVIDENCE-CLOSURE-REPORT-2026-11-17.md`, title and §1: Course 2 is scoped as a 12-lesson course and is explicitly not release-certified.
- `PROJECT-CONTINUITY.md` points to `COURSE-REGISTRY.md` as a project continuity source; it does not independently resolve the discrepancy.

**Disposition:** treat the registry's 32/58 statements as an unresolved documentation conflict, not as authorization to expand Course 2. For this review scope, preserve the instructed inventory of Course 1 = 26 and Course 2 = 12. The canonical registry correction requires an owner decision and a separately authorized, checkpointed documentation change.

## 3. Course 1 action priorities — current verified disposition

| ID | Priority | Evidence strength | Status / closure gate |
|---|---|---|---|
| C1-A01 | P0 | Direct descriptive support for a written Standard Kurmanjî target; scope is not universal spoken language | Open: owner/editor must select the written target, spoken reference, variety labels, and Behdinî scope |
| C1-A02 | P0 | Direct evidence for initial `r` trill and limited/sporadic `rr` notation; no universal `rr` spelling contrast established | Evidence reconciled; house-style and qualified native-editor approval remain open |
| C1-A03 | P0 | Mixed provenance; only one specifically identified example is verbatim-attested in the existing register | Open: item-level provenance, sentence/context review, Kurmanji validation, and separate Sorani gloss review |
| C1-A04–A06 | P1 | Descriptive grammar evidence supports core morphology/syntax, but exact paradigms, examples, scope and cross-lesson consistency remain | Open: harmonize case/alignment, ezafe/possession/reflexives, TAM/negation/questions/word order; label variants |
| C1-A07 | P1 | Citations do not establish naturalness or pragmatics | No qualified Kurmanji native-speaker/editor approval recorded; complete review and log identity, variety, date, decisions, variants |
| C1-A08 | P1 | Kurmanji sources cannot certify Sorani copy | No Sorani copy-editor approval recorded; separate orthography, terminology, punctuation, fluency review |
| C1-A09 | P1 | Lesson 26 supports informal review/self-assessment only; coverage alignment remains incomplete | Open: outcome-to-task map; retain non-certification disclaimer |
| C1-A10 | P2 | Pedagogical proposal, not tested learner evidence | Proposed: integrated tasks after mapping/review; do not create an audio/runtime dependency |
| C1-A11 | P2 | Five range registers and ledger are present; item-level fields remain incomplete | Partly implemented: complete source, provenance, variety and reviewer metadata without duplicate records or implied approval |

This table summarizes existing statuses; it does not supersede the action register or closure report.

## 4. New traceable issue: DOC-INV-01

**Priority:** P0 documentation-governance blocker before publishing a consolidated inventory or making inventory-based release claims.  
**Type:** conflicting project documentation; not a linguistic claim.

- **Directly observed:** `COURSE-REGISTRY.md` states 26 + 32 = 58.
- **Directly observed:** the Course 2 integrated closure report is scoped to 12 lessons and states that the course is not release-certified.
- **Instructional constraint for this review:** retain Course 1 = 26 and Course 2 = 12.
- **Inference:** the registry's Course 2 count is stale or belongs to a different course structure. The repository evidence alone does not establish which historical reason caused the mismatch.
- **Unresolved:** owner confirmation of the canonical Course 2 count and the authorized registry/continuity wording.
- **Closure test:** owner confirms Course 2 = 12; an approved, separate documentation-only change reconciles `COURSE-REGISTRY.md` and any dependent continuity summary, with pre/post checkpoints. Do not add/remove lessons, change lesson keys, mapping, or payloads as part of this documentation correction.

## 5. Varieties, evidence and human-review boundary

- **Course 1 (Sorani-mediated):** keep Kurmanji grammar/example review separate from Sorani explanation/gloss copy-edit. A source on Kurmanji cannot validate Sorani wording.
- **Written target:** the existing recommendation describes a Standard Kurmanjî Hawar-based written baseline loosely associated with Cizre/Botan; this is not a universal spoken-dialect label. Regional alternatives and Behdinî transfer remain explicitly scoped questions.
- **Course 2:** keep its 12-lesson scope in this review; its academic closure report is evidence review, not release approval.
- **Separate Kurmanji-medium Latin/Hawar pathway:** remains independent; no line-by-line translation of the Sorani-mediated pathway and no new lesson text drafted here.
- **Native review:** no qualified Kurmanji native-speaker/editor or Sorani copy-editor approval is newly established in this read-only review. Existing ledger fields are process controls, not evidence that a review occurred.

No new linguistic claim was made in this addendum. Existing scholarly references, exact page locators, dialect qualifications, and source limitations remain in the cited registers and closure report; this addendum does not re-attest them.

## 6. Checks and change-control boundary

This run verified the current work-branch HEAD, the four governing Course 1 records, all five range-register files, the Course 2 12-lesson closure report, the inventory files, and the current action table. The branch remains divergent from `main`; no reconciliation is attempted.

No existing lesson body, HTML lesson page, inventory, course mapping, seed, migration, schema, application code, test, CI, runtime, database, Supabase, PR #3, `main`, or deployment was modified. No external messages were sent and no account settings were changed.

## 7. Next safe step

Obtain the owner's decision on **DOC-INV-01** and C1-A01 before correcting any canonical inventory or language-policy documentation. Then continue the exact-item provenance and qualified Kurmanji/Sorani reviews already queued under C1-A03, C1-A07 and C1-A08. A citation, an AI-generated audit, or the presence of a review ledger does not equal native/editor approval.

**Status:** proposal-only documentation addendum; not release certification or permission to edit learner-facing content.
