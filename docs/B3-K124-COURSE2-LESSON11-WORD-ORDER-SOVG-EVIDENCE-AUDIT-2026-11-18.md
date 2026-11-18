# B3-K124 — Course 2 Lesson 11 word-order and SOVG evidence audit

**Date:** 2026-11-18  
**Repository:** `avasinim/zanztkurd`  
**Branch:** `fix/kurmanji-ci-current-migration`  
**Pre-work HEAD:** `22d20d143b94af8222f9930d54264641035a52cf`  
**Pre-work backup:** `backup/b3-k124-course2-word-order-audit-before-2026-11-18`  
**Main baseline:** `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`

## 1. Scope and preservation boundary

Read-only audit of Course 2 Lesson 11's current payload against the already directly inspected primary-source notes for Haig (2018), §2.7.1, pp. 130–131. No lesson body, seed, SQL, migration, database row, page shell, runtime, test, Auth setting, RLS policy, grant, workflow, deployment, PR, merge or `main` was changed. No new Kurmanji sentence was composed or inserted.

## 2. Current lesson payload inspected

Source file: `docs/kurmanji-content-seed-part-05.sql`, lesson key `kurmanji-course-2-lesson-11.html`.

Current title: «ڕێکخستنی وشەکان و پێکهاتەی ڕستە».

The lesson currently:
- asks learners to identify subject, verb and (if present) object;
- introduces noun phrases and ezafe;
- explains that information structure/focus can move constituents;
- cites Haig (2018), §2.7.1, for the example `Wî mirov-î çay anî`, glossed «ئەو پیاوە چای هێنا»;
- labels the default pattern SOV and says word order is not exceptionless;
- notes that Goal/recipient position depends on verb and dialect, but does not explain the G component or give a worked, source-located recipient construction.

## 3. Primary-source facts already verified against Haig (2018)

Haig, Geoffrey. 2018. “Northern Kurdish (Kurmanjî),” in *The Languages and Linguistics of Western Asia: An Areal Perspective*, pp. 106–158. DOI: https://doi.org/10.1515/9783110421682-004. Direct PDF: https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf.

The source scope is **Standard Kurmanjî**, loosely based on Cizre/Botan, with regional variation treated separately (Haig 2018, pp. 107–108).

K121's page-level source verification recorded these §2.7.1 facts (pp. 130–131):

1. Haig characterizes neutral word order as **SOVG**, not merely SOV.
2. **G** is a cover term for spatial goals, recipients of transfer verbs, and addressees of speech verbs.
3. Word order is not rigid. Direct objects may be fronted for pragmatic/information-structural purposes.
4. Goal/recipient placement and marking vary by construction and dialect.
5. With `dan` ‘give’, recipients are usually immediately after the verb, in the oblique case, without an adposition; southeastern dialects use post-predicate placement more extensively.

These are source-backed generalizations within the source's stated scope and qualifications. They do not authorize inventing a recipient sentence or presenting one dialect's placement as universal.

## 4. Claim-by-claim disposition

| Current lesson claim or feature | Evidence status | Safe editorial disposition |
|---|---|---|
| SOV as the beginner's basic clause pattern | Supported as a simplification, but incomplete | Retain SOV as a teaching entry point while explicitly identifying the fuller neutral pattern as SOVG |
| The G component | Underexplained | Define G as spatial goal, recipient, or addressee; do not describe it as an obligatory object in every sentence |
| `Wî mirov-î çay anî` | Present in current payload and attributed to Haig §2.7.1; exact line/table locator and gloss have not yet been independently rechecked in this audit | Keep as U pending direct transcription check; do not label it an exact quotation until page-level verification |
| Object fronting for focus/information structure | Supported by Haig §2.7.1 | Retain with a concise note that fronting is discourse/pragmatically conditioned, not arbitrary free order |
| Recipient with `dan` | Generalization supported; current lesson lacks a worked recipient example | Explain the source's generalization in prose only; add no new Latin sentence until the exact source example and variety are verified |
| Regional variation | Supported and important | Keep the dialect qualification adjacent to the rule, not hidden in a distant methodology note |

## 5. Important distinction for teaching

SOV and SOVG are not competing labels where the learner must choose one and reject the other. SOV describes the familiar subject–object–verb core. SOVG makes explicit that a Goal/recipient/addressee constituent may also occur and that its placement is sensitive to construction and dialect.

For a beginner explanation, a safe conceptual sequence is:
- identify S, O (when the verb has an object), and V;
- introduce G only where a verb/construction licenses a goal, recipient, or addressee;
- explain that Haig's neutral template is SOVG, while actual order can vary for information structure and dialect;
- avoid implying every clause contains all four constituents.

This is a pedagogical outline, not proposed lesson copy and not an authorization to edit.

## 6. Remaining verification before any lesson revision

1. Reopen Haig's original pp. 130–131 and verify the exact printed form, segmentation, gloss and source context of `Wî mirov-î çay anî`; record the precise example number if present.
2. Verify a source-attested `dan` recipient example, including its exact morphology and dialect label. If the chapter gives only a prose generalization at the relevant point, do not manufacture an example.
3. Have a Kurmanji specialist confirm that any selected example matches the course's declared Standard/Cizre-Botan scope.
4. Have a native Sorani editor review the Sorani gloss and grammatical terminology.
5. Obtain owner/editor approval before modifying the lesson payload or database seed.

## 7. Release disposition

**Course 2 remains NOT RELEASE-CERTIFIED.** Lesson 11 has a solid source-backed foundation for SOVG, information-structure fronting and dialect-sensitive Goal/recipient placement, but its current lesson explanation is incomplete and the exact provenance of its displayed example still needs a page-level check. This pass is documentation-only; it does not alter the lesson or certify it for release.
