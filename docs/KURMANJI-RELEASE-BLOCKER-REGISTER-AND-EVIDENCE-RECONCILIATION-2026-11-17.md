# Kurmanji release-blocker register and evidence reconciliation — 2026-11-17

## 1. Purpose and release posture

This register consolidates existing repository-only audits into a decision-oriented list of unresolved release gates for the two Kurmanji learning pathways. It does not authorize implementation, production access, migration execution, deployment, lesson edits, CI changes, or changes to PR #3.

**Current recommendation: HOLD release / HOLD database deployment until the critical unknowns below are resolved.** This is a conservative release-readiness recommendation based on missing production evidence and known source-level inconsistencies. It is not a claim that a production vulnerability or outage has been confirmed.

Repository: `avasinim/zanztkurd`  
Work branch: `fix/kurmanji-ci-current-migration`  
Starting HEAD: `cf99305bbaa67afa31bc6b87bc5b52a0c8f72ae8`

## 2. Priority register

### P0 — resolve before any database push or production release

| ID | Gate | Evidence currently available | What remains unknown / why it blocks | Required safe evidence | Release decision |
|---|---|---|---|---|---|
| P0-01 | Migration lineage and remote ledger | Two same-purpose migrations exist: 2026-10-19 and 2026-10-24. Their headers claim different live status; 13/38 lesson SQL tuples differ. Validators do not all target the same migration. | Actual remote migration ledger and canonical deployable migration are unverified. A future push could process an older pending migration unexpectedly. | Authorized read-only migration ledger/status review; compare both versions and record authoritative lineage. | No `supabase db push`, migration repair, migration edit, or deployment until resolved. |
| P0-02 | `lesson_content` table bootstrap, RLS and ACL provenance | Repository policy migrations define a named sequence-aware SELECT policy. Baseline schema does not define the table, enable its RLS, or specify complete table grants. | Live relation existence/owner, RLS flags, full policy set, effective grants, role inheritance and PostgREST exposure are unknown. | Execute the metadata-only plan in `LESSON-CONTENT-LIVE-METADATA-READONLY-VERIFICATION-PLAN-2026-11-17.md` after explicit authorization for a named project. | No production safety claim or policy/grant change until catalog evidence is reviewed. |
| P0-03 | Additional RLS policy composition | Repository contains one named SELECT policy and the later migration drops/recreates only that exact name. PostgreSQL permissive policies OR together. | Differently named dashboard/manual policies may exist in production and broaden access. | Full live `pg_policies` / `pg_policy` inventory, roles and expressions, plus RLS flags. | Treat exclusivity as unknown until complete inventory is obtained. |
| P0-04 | Protected progress write boundary | Repository baseline describes own-row SELECT and RPC-only writes through SECURITY DEFINER `complete_lesson`; later migration hardens function and grants. | Live table write policies/ACL, function owner/body/config/execute grants and migration state are unverified. | Metadata-only catalog review of `lesson_progress`, function metadata and ACL, and migration ledger; no progress-row reads. | Do not certify sequence enforcement or run adversarial production tests until verified. |

### P1 — resolve before learner-facing release

| ID | Gate | Evidence currently available | What remains unknown / why it matters | Required safe evidence | Release decision |
|---|---|---|---|---|---|
| P1-01 | Owner lesson editor write path | `spelling-tool.js` reads and directly updates `lesson_content.content_html`. Repository policy evidence found SELECT but no UPDATE policy or explicit table grant. | If RLS is enabled without a matching UPDATE policy, the editor may fail. If RLS is disabled while authenticated has UPDATE, UI owner checks alone are not a database boundary. | Confirm live RLS/ACL first; then decide whether direct browser writes are intended. Test only in a disposable project. | Do not use the owner editor against production until a reviewed design and tests exist. |
| P1-02 | SECURITY DEFINER function deployment state | Later source definitions harden key functions with empty search_path and schema-qualified references. Two trigger functions in baseline retain non-empty search_path. | Live function owners, definitions, proconfig, execute grants, trigger mapping and schema CREATE privileges are unknown. | Read-only `pg_proc`, ACL, role/schema privileges and trigger catalog review. | No claim of production hardening based on source alone. |
| P1-03 | Frontend unknown lesson-key fail-closed behavior | Source audit found `hasPreviousLessonCompleted` treats an unknown key index (-1) as first lesson, while server RPC/helper reject unknown keys. | Runtime test coverage and deployed version are not established. This is a frontend navigation/gating defect; no protected-content bypass was confirmed. | Add regression tests in an approved isolated code-change task: valid first lesson, valid later lesson, unknown lesson key, RPC error, and no content fetch after denial. | Must be corrected and tested before release; implementation requires explicit approval. |
| P1-04 | CI validator migration target drift | Package validator checks safety invariants in 2026-10-19 migration, while parser/seed parity use 2026-10-24; workflow path filter watches newer file. | Future security invariant regressions in the deployable target could evade the package validator's safety-string checks. | Decide canonical migration after P0-01; then align validator targets and workflow filters, with a test that asserts target agreement. | Do not alter CI until canonical migration is established and implementation is approved. |
| P1-05 | Browser LTR/bidi and Hawar Unicode acceptance | Kurmanji lesson shells were observed with `lang="ckb"` and `dir="rtl"` despite Latin/Hawar content; source path had no explicit NFC/NFD normalization. Acceptance spec contains 20 cases. | Real browser, keyboard, font, copy/paste, cursor, search and persistence behavior has not been executed end-to-end. | Execute approved static-fixture and mocked-browser tests, then disposable-project persistence/search tests and manual browser/assistive-tech checks. | Do not claim Unicode acceptance complete until results are recorded. |

### P2 — editorial and curriculum release quality

| ID | Gate | Evidence currently available | What remains unresolved | Required decision/evidence |
|---|---|---|---|---|
| P2-01 | Reference variety and editorial standard | A draft editorial policy and dual-pathway design exist. | The authoritative Kurmanji reference variety and forms needing consistency decisions remain open. | User/editorial owner approves a reference variety, spelling conventions and exception policy. |
| P2-02 | Independent Kurmanji-only medium pathway | B0 pilot lessons 01–03 have been drafted in Kurmanji/Hawar; they are not line-by-line translations. | Idiomaticity and morphology have not been certified by a proficient Kurmanji editor; example attestations are not corpus-verified. | Specialist review and corrections before learner release. |
| P2-03 | Existing 38-lesson pathway evidence closure | Source reviews and claim-level evidence registers cover the 26 + 12 lesson inventory. | Some claims require editorial decision, further citations, or specialist review; existing lesson text has not been changed. | Close each open evidence item with citation/editorial disposition; do not silently edit lesson payloads. |

## 3. Cross-audit evidence map

The register reconciles these existing repository documents (all on the work branch):

### Lesson-content data plane
- `docs/LESSON-CONTENT-READ-WRITE-BOUNDARY-OWNER-TOOL-AUDIT-2026-11-16.md`
- `docs/LESSON-CONTENT-API-PRIVILEGES-DEFAULT-GRANTS-POSTGREST-EXPOSURE-AUDIT-2026-11-16.md`
- `docs/LESSON-CONTENT-RPC-VIEW-FRONTEND-STORAGE-PATH-AUDIT-2026-11-16.md`
- `docs/LESSON-CONTENT-TABLE-PROVENANCE-SCHEMA-BOOTSTRAP-GAP-AUDIT-2026-11-16.md`
- `docs/LESSON-CONTENT-RLS-POLICY-COMPOSITION-MIGRATION-AUDIT-2026-11-17.md`
- `docs/LESSON-CONTENT-LIVE-METADATA-READONLY-VERIFICATION-PLAN-2026-11-17.md`

### Progress, functions and migration history
- `docs/KURMANJI-LESSON-PROGRESS-RPC-WRITE-BOUNDARY-PRIVILEGE-AUDIT-2026-11-16.md`
- `docs/KURMANJI-SECURITY-DEFINER-FUNCTION-INVENTORY-SEARCH-PATH-AUDIT-2026-11-16.md`
- `docs/KURMANJI-MIGRATION-LINEAGE-AND-CI-TARGET-AUDIT-2026-11-16.md`
- `docs/KURMANJI-PROTECTED-LESSON-ACCESS-RLS-AND-PROGRESSION-SOURCE-AUDIT-2026-11-16.md`
- `docs/KURMANJI-CI-AND-ACCESS-CONTROL-TEST-COVERAGE-GAP-AUDIT-2026-11-16.md`

### Curriculum and Unicode quality
- `docs/KURMANJI-MEDIUM-PATHWAY-INDEPENDENT-AUTHORING-SPEC-AND-B0-PILOT-2026-11-16.md`
- `docs/KURMANJI-MEDIUM-B0-PILOT-LESSONS-01-03-DRAFT-2026-11-16.md`
- `docs/KURMANJI-HAWAR-UNICODE-KEYBOARD-SEARCH-RENDERING-ACCEPTANCE-TEST-SPEC-2026-11-16.md`
- `docs/DUAL-KURMANJI-CURRICULUM-ACADEMIC-DESIGN-2026-11-16.md`
- `docs/KURMANJI-COURSES-1-2-INTEGRATED-38-LESSON-CLAIM-EVIDENCE-MATRIX-2026-11-16.md`

## 4. Recommended execution sequence (proposal only)

1. **P0-01:** Obtain a read-only migration ledger snapshot and resolve canonical migration lineage.
2. **P0-02/P0-03:** With explicit authorization for a named Supabase project, execute the metadata-only RLS/ACL/PostgREST evidence plan. No content rows.
3. **P0-04/P1-02:** Inspect progress table and SECURITY DEFINER function metadata in the same read-only session.
4. **P1-01:** Decide whether the browser owner editor remains a direct-write feature; design tests in a disposable project.
5. **P1-03/P1-04:** After explicit approval, make isolated code/CI proposals and run their tests without touching `main` or production.
6. **P1-05:** Execute Unicode and bidi acceptance tests using static fixtures, mocked browser and disposable data.
7. **P2:** Close editorial and specialist review decisions; do not change lesson content without approval.
8. Re-run release checks, review the diff, obtain explicit approval, and only then consider PR/release actions.

## 5. Explicit non-actions and constraints

- No live Supabase connection or query was made.
- No SQL, migration, RLS policy, table grant, function, API setting, or database object was changed.
- No source code, lesson content, validator, workflow, or CI configuration was changed.
- No test suite, browser automation, or production API request was run.
- No merge, rebase, force-push, deployment, or PR #3 modification was performed.
- `main` remains outside this task.
- No learner records, lesson HTML, credentials, or personal data were accessed.

This document is a prioritization register, not a security certification. Findings are explicitly separated into source-confirmed facts, conditional risks, and unknown production state.

## 6. Change and backup record

- Work branch: `fix/kurmanji-ci-current-migration`
- Starting commit: `cf99305bbaa67afa31bc6b87bc5b52a0c8f72ae8`
- Pre-work backup: `backup/kurmanji-release-blocker-register-before-2026-11-17`
- Change type: documentation only.
