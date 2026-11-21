# Main-branch regression and release-evidence audit — 2026-11-21

**Repository:** `avasinim/zanztkurd`  
**Working branch:** `fix/kurmanji-ci-current-migration`  
**Working-branch starting HEAD:** `36f0b4f7280cec11f0a134bf6329b31ebc7f3318`  
**Pre-work checkpoint:** `backup/main-regression-audit-before-2026-11-21`  
**Compared main HEAD:** `7acd17e43e191772af9f210e869caac6e00ba7ed`  
**Status:** read-only evidence audit of upstream changes; this addendum records risks only. It does not authorize code, lesson, database, migration, merge, or deployment changes.

## 1. Scope and safety

The working branch was verified identical to its recorded HEAD `36f0b4f7280cec11f0a134bf6329b31ebc7f3318` before this documentation change. It remains 1,344 commits ahead and 40 behind `main` in the comparison recorded for this audit. No reconciliation was attempted.

This addendum examines selected high-impact files on `main` and the open draft PR #3. It is not a complete review of all 40 upstream commits or all 91 changed paths. No claim of full upstream safety is made.

## 2. P0 — shared text normalizer rewrites protected lesson terminology

On `main`, `script.js` blob `da11a173d7e294cfc771377af387dd11f084e8d1` contains the replacement at line 16:

```js
[/بڕگە/g,"هجا"],
```

This globally maps the project-approved term **بڕگە** to **هجا** in the normalizer's replacement table. That conflicts with the established editorial requirement to use **بڕگە**, not **هجا**.

The same `main` script applies normalization to text nodes and attributes, and its MutationObserver repeats the normalization for inserted content. Its lesson-content loader inserts server-loaded lesson HTML into `.lesson-content`. Therefore this mapping presents a credible risk of altering learner-facing text at runtime, depending on the normalization path and the affected node. This audit does not claim every lesson is affected; runtime reproduction was not performed.

On the isolated working branch, `script.js` blob `894b74ac50837fd8ea2ba8b1fa9aa7864e0fad4b` does not contain that replacement mapping and includes an explicit `.lesson-content` exclusion in its early normalization guard. This is a branch comparison, not an authorization to copy either version over the other.

**Required closure:** remove or narrow the global mapping only after owner approval; preserve `.lesson-content` and source-loaded lesson bodies from global normalization; add regression tests proving the literal term **بڕگە** survives static rendering, dynamically inserted nodes, and loaded lesson content. Do not change any lesson body as a workaround.

## 3. P1 — package validator currently codifies the risky normalization

The `main` validator, `scripts/validate_kurmanji_package.py`, blob `386c1073cc0037ec521da7132c4a9d707634fc58`, comments at lines 56–58 that normalization intentionally applies to source-loaded lesson text as well as static UI text. Its required-mapping checks include the shared normalizer requirements.

This means a passing package-integrity check may enforce the behavior described in §2 rather than detect its risk. The validator should be revised alongside the normalizer after approval, with a negative assertion that lesson-body text is excluded from global replacements and that **بڕگە** remains unchanged.

No validator was run in this audit; this is a source inspection finding, not a test result.

## 4. P1 — migration deployment status is internally inconsistent in the evidence

The `main` migration file `supabase/migrations/20261024122051_add_kurmanji_courses_and_protected_lessons.sql`, blob `06320c50a858e41d8ce21e7b4fdee3f6ae418cd9`, begins with a comment claiming it was applied to the production project on 2026-10-24. The same migration defines security-definer RPC functions and explicit privilege revocations/grants; this makes deployment status and authorization review material release evidence.

However, PR #3's current description says the migration has not been validated in a disposable test project and explicitly says not to apply it to production. The split seed file `docs/kurmanji-content-seed-part-01.sql`, blob `323423bb03babd664f945522b5f5c7c3dfc0c973`, labels itself **DRAFT DATA SEED** and says the static lesson pages should remain unchanged until the complete seed and RPC changes are reviewed.

These are conflicting documentary statements. Repository text alone cannot establish whether the migration was actually applied to production. No production project was accessed and no database query or write was performed.

**Required closure:** a project owner or authorized database operator should verify the migration ledger and deployment record in the correct environment, then correct the documentary claim(s) with dated evidence. Do not infer production state from a SQL comment, PR description, local migration file, or test project.

## 5. P1 — PR #3 remains explicitly blocked

PR #3, “Isolate Kurmanji courses and North Circle routing,” was fetched during this audit and reports:
- state: open;
- draft: true;
- merged: false;
- head: `kurmanji-clean-release`;
- base: `main`;
- last updated: 2026-10-25.

Its description records three passing GitHub checks on its then-current PR head, but also explicitly lists unresolved release blockers:
1. Playwright mocks Supabase and does not verify real authentication, enrollment, lesson unlocking, or completion persistence.
2. The migration has not been validated in a disposable test project.
3. All 38 lesson bodies still need source-by-source scientific review.
4. Migration effects on existing courses and authorization RPCs need review.

The three historic check links in the PR description are not evidence that checks passed on the present `main` SHA or on the current isolated working branch. This audit did not obtain a current workflow-run result for either SHA.

**Release disposition:** keep PR #3 draft and unmerged until every stated blocker has verifiable closure evidence and the owner explicitly authorizes release actions.

## 6. Protected curriculum and inventory

The `main` registry records:
- Central curriculum: Course 1 = 26 lessons; Course 2 = 32 lessons; total 58.
- North Circle Kurmanji pathway: Course 1 = 26 lessons; Course 2 = 12 lessons; total 38.
- Total catalog inventory: 96 lessons.

These are distinct course pathways and must not be conflated. This audit does not alter inventory, course mapping, lesson pages, seed data, or the separate Kurmanji Latin/Hawar pathway. The 26 + 12 northern pathway remains distinct from the 26 + 32 central curriculum.

## 7. Action register updates proposed

| ID | Priority | Finding | Closure evidence required |
|---|---|---|---|
| MAIN-A01 | P0 | Global `بڕگە` → `هجا` mapping in shared normalizer; risk to approved terminology and dynamically loaded lesson text. | Approved code fix, protected lesson-content path, regression tests for static and dynamic content. |
| MAIN-A02 | P1 | Package validator requires normalization of source-loaded lesson text. | Validator changed to reject lesson-body normalization and assert preservation of **بڕگە**. |
| MAIN-A03 | P1 | Production migration comment conflicts with PR's unvalidated-test-project warning and draft seed state. | Verified environment migration ledger/deployment evidence; corrected dated records. |
| MAIN-A04 | P1 | PR #3 release blockers remain open; historic CI checks are not current-head evidence. | Current checks, disposable Supabase integration evidence, auth/enrollment/progression tests, and completed scholarly/native-speaker review. |

These are audit findings and proposed actions, not approved implementation instructions.

## 8. Explicit non-actions

- No changes to `main`.
- No merge, rebase, cherry-pick, force-push, or branch synchronization.
- No edits to learner-facing lesson bodies, course inventory, seed files, CI, runtime, or migration.
- No production database access, writes, migration, or deployment.
- No change to PR #3.
- No claim that the full 40-commit upstream range or all 91 changed files has been exhaustively reviewed.

## 9. Next safe step

Obtain owner approval for a narrowly scoped fix to the shared normalizer and validator on an isolated review branch, after a verified pre-work checkpoint. Separately request authoritative deployment evidence for the migration. Keep the 38 Kurmanji lesson bodies untouched until source-by-source academic review and qualified native-editor review are complete.


## 10. Additional finding — release checklist contradicts current main source and validator

A follow-up read-only inspection compared the main release checklist, main shared script, and main package validator:

- `docs/KURMANJI-RELEASE-CHECKLIST.md`, blob `b04e4a6924f8103d7c1b11c7df7362d46bc26932`, line 11 marks as passed: “Shared text-normalization script excludes `.lesson-content` text and attributes; validator checks this safeguard.”
- The same checklist, lines 13 and 19–30, leaves the current isolated-test-project migration revalidation and student browser acceptance sequence unchecked. It expressly says static checks do not prove end-to-end authentication, enrollment, or sequential access.
- Main `script.js`, blob `da11a173d7e294cfc771377af387dd11f084e8d1`, lines 1–55, has no `.lesson-content` exclusion in its normalizer or MutationObserver, and its replacement list maps `بڕگە` to `هجا`.
- Main `scripts/validate_kurmanji_package.py`, blob `386c1073cc0037ec521da7132c4a9d707634fc58`, lines 56–72, asserts presence of selected spelling mappings but does not assert an exclusion for `.lesson-content`. It does not test that the literal `بڕگە` survives. Its comment explicitly says normalization is intentionally applied to source-loaded lesson text.
- The isolated working branch's `script.js`, blob `894b74ac50837fd8ea2ba8b1fa9aa7864e0fad4b`, contains an `isLessonContentNode` guard in the normalizer and mutation paths and does not contain the `بڕگە` → `هجا` mapping. This is evidence of a branch-level implementation difference only; it does not establish that the checklist's claim is true for main.

**Conclusion:** the checklist's checked statement at line 11 is stale or describes a different revision than current main. It must not be treated as proof that main protects lesson content. The unchecked migration/browser items remain release gates. No CI workflow was executed as part of this follow-up, and no browser runtime reproduction was performed.

## 11. Expanded action register

| ID | Priority | Finding | Closure evidence required |
|---|---|---|---|
| MAIN-A05 | P1 | Release checklist claims lesson-content normalization exclusion and validator coverage that are absent from current main source and validator. | Align checklist with the exact audited commit; update only after code and validator tests prove lesson-content protection and preservation of **بڕگە**. |
| MAIN-A06 | P1 | Release checklist itself leaves isolated test migration revalidation and student browser acceptance incomplete. | Dated test-project migration evidence plus completed student-account browser checks for both Kurmanji courses. |

## 12. Scope clarification

The audit has now inspected the full main normalizer block, the corresponding working-branch normalizer block, the relevant validator section, and the complete release checklist. This remains a targeted audit, not a complete review of all upstream commits or all changed files. No live-site behavior or production database state has been inferred from these static files.


## 13. Full inventory of the 14 global replacement rules

The audited `main/script.js` normalizer contains 14 literal replacement rules. The following table classifies their risk for source-authored lesson bodies. “UI-only candidate” means the rule may be considered for Avasin-owned interface copy after editorial confirmation; it does **not** mean the target spelling has been independently approved or should be imposed on course content.

| # | Source text matched | Replacement | Risk / disposition for lesson bodies |
|---:|---|---|---|
| 1 | `نووسراوە` | `نوسراوە` | Orthographic/editorial substitution. UI-only candidate; preserve authored lesson form. |
| 2 | `نووسینی` | `نوسینی` | Orthographic substitution. UI-only candidate; preserve authored lesson form. |
| 3 | `نووسین` | `نوسین` | Orthographic substitution. UI-only candidate; preserve authored lesson form. |
| 4 | `فێربوون` | `فێربون` | Orthographic substitution. UI-only candidate; preserve authored lesson form. |
| 5 | `هەموو` | `هەمو` | Orthographic/lexical-form substitution. UI-only candidate; preserve authored lesson form. |
| 6 | `نموونە` | `نمونە` | Orthographic substitution. UI-only candidate; preserve authored lesson form. |
| 7 | `پێویست` | `پەیویست` | More than a harmless formatting change; changes the written form. UI-only candidate only after editorial confirmation; preserve lesson text. |
| 8 | `بەرامبەر` | `بەرابەر` | Orthographic substitution. UI-only candidate; preserve authored lesson form. |
| 9 | `ڕوون` | `ڕون` | Orthographic substitution. UI-only candidate; preserve authored lesson form. |
| 10 | `ناوەڕۆک` | `نێوەڕۆک` | Lexical/orthographic form change. UI-only candidate only after editorial confirmation; preserve lesson text. |
| 11 | `چییە` | `چیە` | Orthographic substitution. UI-only candidate; preserve authored lesson form. |
| 12 | `نییە` | `نیە` | Orthographic substitution. UI-only candidate; preserve authored lesson form. |
| 13 | `بڕگە` | `هجا` | Explicitly conflicts with the project requirement to use **بڕگە**, not **هجا**. Remove from the global mapping; do not reintroduce as an automatic lesson or UI substitution. |
| 14 | `دەستپێکردن` | `دەست‌پێ‌کردن` | Adds joiner characters/word segmentation. This is a formatting transformation, but it still changes source text and may affect search/copy behavior. If retained, scope it to UI-owned strings only; preserve authored lesson text. |

### Classification summary

- **0 of 14** rules are safe to run indiscriminately over source-loaded lesson content.
- **12 of 14** are possible UI-house-style candidates, subject to confirmation that each target form is actually the approved Avasin UI form.
- **1 of 14** (`بڕگە` → `هجا`) conflicts with the explicit project terminology requirement and should be removed rather than merely scoped.
- **1 of 14** (`دەستپێکردن` → `دەست‌پێ‌کردن`) is a spacing/joiner normalization candidate for UI-only text, not a source-content rewrite.

This is a risk classification based on the literal replacement pairs and the known editorial constraints. It is not a scholarly linguistic ruling on every spelling variant. No corpus-wide occurrence scan was possible with the available GitHub connector actions in this pass, so this table does not claim that every matched form occurs in every course or page.

### Recommended implementation boundary (not implemented)

1. Keep source-loaded lesson content byte-for-byte/text-for-text as authored; do not normalize it at runtime.
2. Apply any approved Avasin UI house-style rules only at the point where Avasin owns the UI string, not with a document-wide TreeWalker or MutationObserver over arbitrary page content.
3. Remove the `بڕگە` → `هجا` rule entirely.
4. Make the validator assert that all source lesson bodies are outside the global normalizer and include regression fixtures for each of the 14 source forms, including dynamically inserted `.lesson-content` nodes.
5. Update the release checklist only after those safeguards exist in the exact commit being released. Do not mark the checklist's current stale line 11 as passed.

No code, validator, lesson text, registry, checklist, seed, migration, or production resource was changed by this classification; only this audit report is being extended.


## 14. Repository occurrence scan and review of the isolated lesson-content guard

### Occurrence evidence on the default branch

A GitHub code-search pass against the repository's default branch (`main`, commit `7acd17e43e191772af9f210e869caac6e00ba7ed`) returned lesson-file matches for multiple source strings used by the global normalizer. Examples include:

- `بڕگە`: `lessons/section-07/lesson-031.md`, `lesson-021.md`, `lesson-023.md`, `lesson-029.md`, `lesson-030.md`, `lesson-032.md`, `lesson-033.md`, and `lessons/section-10/lesson-035.md`.
- `هەموو`: `lessons/section-10/lesson-034.md`.
- `نموونە`: multiple Section 07 and Section 10 lesson files, including `lesson-021.md`, `lesson-032.md`, `lesson-030.md`, `lesson-027.md`, and `lesson-020.md`.
- `پێویست`: lesson matches include `lessons/section-07/lesson-024.md`, `lesson-033.md`, and `lesson-018.md`.
- `ڕوون`: lesson matches include `lessons/section-07/lesson-021.md`, `lesson-026.md`, `lesson-033.md`, `lesson-032.md`, and `lesson-031.md`.
- `ناوەڕۆک`: lesson matches include `lessons/section-07/lesson-033.md`, `lesson-032.md`, and `lessons/section-10/lesson-034.md`.
- `چییە`: lesson matches include `lessons/section-07/lesson-023.md`, `lessons/section-10/lesson-034.md`, and other Section 07 lesson files.
- `نییە`: lesson matches include `lessons/section-07/lesson-029.md`, `lesson-028.md`, `lesson-021.md`, `lesson-017.md`, `lesson-024.md`, `lessons/section-10/lesson-034.md`, and `lesson-023.md`.
- `دەستپێکردن`: a lesson match appears in `lessons/section-07/lesson-017.md`.

The code-search endpoint searches the default branch and returns a ranked, bounded set of matches (20 requested per term in this pass). Therefore these are confirmed examples, **not an exhaustive repository-wide count**. A search result proves the source form exists in the repository; the impact on a deployed page depends on which renderer loads that source and whether the normalizer traverses its rendered DOM.

### What the isolated branch guard currently does

The inspected isolated-branch `script.js` (`894b74ac50837fd8ea2ba8b1fa9aa7864e0fad4b`) contains an `isLessonContentNode` predicate that checks whether an element is, or is inside, `.lesson-content`. The predicate is used in these inspected paths:

1. Initial text-node traversal: text nodes inside `.lesson-content` are skipped.
2. Initial attribute pass: `title`, `aria-label`, `placeholder`, and `alt` on elements inside `.lesson-content` are skipped.
3. MutationObserver character-data path: changed text nodes inside `.lesson-content` are skipped.
4. MutationObserver added-node path: added text nodes inside `.lesson-content` are skipped; added elements that are themselves inside `.lesson-content` are not passed to the normalizer.

This is a meaningful improvement over the audited `main` implementation, but it is **not yet proof of complete content isolation**. It depends on all protected lesson text being rendered beneath the exact `.lesson-content` class. Other source-backed content containers or alternate renderers are not shown to be covered by this predicate. The observer also does not observe later attribute-only mutations (`attributes: true` is not enabled); that is primarily a UI-normalization coverage gap, but it confirms that the implementation is not a comprehensive DOM normalization contract.

### Required follow-up tests before treating the guard as release-safe

- Add fixtures with every affected source form inside a normal `.lesson-content` node at initial page load.
- Repeat with lesson content inserted after load, nested several elements deep, and text changed after insertion.
- Verify protected lesson text and its four supported attributes remain byte-for-byte unchanged.
- Test all actual lesson rendering paths, including the protected Supabase `content_html` insertion path and any static lesson-page path; confirm the class boundary is present before content is inserted.
- Add a negative control proving an approved UI-owned string outside lesson content is normalized as intended.
- Add a test for source-backed content outside `.lesson-content`; either prove no such renderer exists or explicitly exclude its container too.

No runtime/browser test was executed in this audit. No source lesson, script, validator, checklist, migration, seed, production resource, or PR was changed. Only this audit document is extended.


## 15. Authoritative clarification: Avasin Code orthography

The project owner clarified the Avasin Code house style on 2026-11-21. This clarification supersedes any implication in Section 13 that the following forms should be preserved as the preferred Avasin Code spelling:

| Preferred Avasin Code form | Do not expand it to |
|---|---|
| `نیە` | `نییە` |
| `چیە` | `چییە` |
| `هەمو` | `هەموو` |
| `نمونە` | `نموونە` |

The owner further specifies that unnecessary extra `وو`, `ییی`, or `ی` must not be appended, and that **all examples** in Avasin Code materials must follow this same house style. These are intentional Avasin Code conventions, not errors to be automatically “corrected” toward the expanded forms.

The separate terminology requirement remains unchanged: use `بڕگە`, never replace it with `هجا`.

### Implementation and editorial boundary

- When writing or editing Avasin Code UI copy, lesson examples, or other Avasin Code-authored material, use the explicitly approved forms above consistently.
- Do not infer approval for every other replacement rule in the 14-rule normalizer from this clarification; the remaining pairs require their own confirmation.
- This editorial clarification does **not** justify a document-wide runtime TreeWalker/MutationObserver rewrite. Avasin Code forms should be authored correctly at the source or applied only in a deliberately scoped, tested Avasin-owned content pipeline.
- Source-authored content must not be changed silently. Any existing lesson/example correction must be an explicit editorial change with review of its surrounding meaning.
- Keep Kurmanji Latin/Hawar content and other separately governed pathways distinct; this Sorani Avasin Code spelling clarification does not authorize changes to them.

This section corrects the earlier audit's overly broad “preserve authored lesson form” recommendation for the four explicitly specified pairs. The safe technical boundary remains: no unscoped global rewriting, and no automatic change to lesson source files without an approved, reviewed content-editing task. No application code, validator, lesson content, checklist, seed, migration, production resource, or PR was changed in this documentation-only update.


## 16. Source-level consistency check against the clarified Avasin Code style

A targeted read-only check of nine lesson Markdown files on `fix/kurmanji-ci-current-migration` confirms that the newly clarified Avasin Code forms are not yet consistent across all sampled source lesson text.

### Exact counts in the nine inspected lesson files

| File | `نییە` | `چییە` | `هەموو` | `نموونە` | `بڕگە` |
|---|---:|---:|---:|---:|---:|
| `section-07/lesson-031.md` | 0 | 0 | 0 | 2 | 35 |
| `section-07/lesson-021.md` | 1 | 0 | 0 | 4 | 7 |
| `section-07/lesson-023.md` | 1 | 2 | 0 | 0 | 2 |
| `section-07/lesson-029.md` | 1 | 0 | 0 | 0 | 20 |
| `section-07/lesson-030.md` | 0 | 0 | 0 | 5 | 22 |
| `section-07/lesson-032.md` | 0 | 0 | 0 | 8 | 27 |
| `section-07/lesson-033.md` | 0 | 0 | 0 | 2 | 7 |
| `section-10/lesson-034.md` | 1 | 2 | 1 | 0 | 0 |
| `section-10/lesson-035.md` | 0 | 1 | 0 | 1 | 3 |
| **Total** | **4** | **5** | **1** | **22** | **123** |

The required Avasin Code forms for these explicit cases are `نیە`, `چیە`, `هەمو`, and `نمونە`. Thus, in this nine-file sample, there are at least 32 direct occurrences requiring editorial review (4 + 5 + 1 + 22). This is an exact count for the nine named files only, not a whole-repository count.

The same sample contained zero occurrences of the exact sequence `ییی`. The raw substring `وو` occurred 64 times, but this raw count is **not** a count of erroneous extra letters: it includes valid spellings and cannot be safely reduced by a blanket replacement. The single-letter sequence `ی` is too common to count as an “extra” without word-level rules and examples. No automatic deletion of `وو` or `ی` is justified by this scan.

### Technical consequence

The current isolated-branch `script.js` intentionally skips all text under `.lesson-content` in its initial traversal and MutationObserver paths. That protects lesson source text from unscoped runtime rewriting, but it also means the preferred Avasin Code forms must be corrected in the authoritative source files (or in a specifically approved, source-aware publishing step) if those lessons are within the Avasin Code editorial scope.

The isolated-branch validator (`scripts/validate_kurmanji_package.py`, blob `f550e3532b0084e1ba2198c76def360eb350b96d`) currently requires the static UI map entries for `هەموو` → `هەمو`, `نموونە` → `نمونە`, `چییە` → `چیە`, and `نییە` → `نیە`, and checks the `.lesson-content` guard. It does **not** currently validate that authored Avasin Code lesson source uses the preferred forms. Therefore a source lesson can contain the expanded spellings while the static validator still passes those spelling-map checks. This is a specific validator coverage gap, not evidence that CI has passed.

### Scope and safe next step

This is a targeted sample, not a complete corpus audit. Before changing lesson source, confirm which course/file families are governed by Avasin Code versus the separately protected Kurmanji Latin/Hawar pathway. Then perform a complete source-aware occurrence audit, review each affected sentence/example in context, and only then apply approved edits with the required pre/post backup refs. Do not run blanket replacements for `وو`, `ییی`, or `ی`; retain legitimate sequences. The explicit `بڕگە` terminology remains protected and must not be changed to `هجا`.

No lesson text, runtime script, validator, registry, checklist, seed, migration, production resource, or PR was changed in this audit. Only this evidence report was extended.
