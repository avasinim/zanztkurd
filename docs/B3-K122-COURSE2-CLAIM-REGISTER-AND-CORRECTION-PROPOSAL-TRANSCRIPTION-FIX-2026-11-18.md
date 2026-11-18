# B3-K122 — Correct the Course 2 claim register and correction proposal after primary-source check

**Date:** 2026-11-18  
**Branch:** `fix/kurmanji-ci-current-migration`  
**Pre-work HEAD:** `7d17acc74532694747d7b36cdb6ba1b655304634`  
**Pre-work backup:** `backup/b3-k122-claim-register-source-correction-before-2026-11-18`

## Finding

Direct inspection of Geoffrey Haig (2018), “Northern Kurdish (Kurmanjî),” §2.6.4, p. 129, example (27), confirms the exact printed future example is:

`ew dē mesel-ē ji te re bēž-e`

Gloss: “He will tell you the issue.”

This is identical to the current Course 2 Lesson 09 payload. The former claim-level register's reported alternative `ew dê mesel-ê ji te re bêj-ê` was an internal transcription error. The lesson was not wrong on this point.

Haig's §2.6.4, pp. 128–129, describes the future as a particle `(d)ê` or `wê` plus a present subjunctive verb form; high-frequency `gotin` commonly omits `bi-` in this construction. Preserve the source's macrons and exact spelling in the quotation.

## Documentation corrected

1. `docs/KURMANJI-COURSE-2-LESSONS-01-12-CLAIM-LEVEL-EVIDENCE-REGISTER-2026-11-16.md`
   - Changed C2-L09-03 from unresolved to supported/exact source form verified.
   - Replaced the inaccurate reported source form.
   - Updated the editorial consequence, closure queue and final unresolved-items summary.
2. `docs/KURMANJI-COURSE-2-12-LESSON-CORRECTION-PROPOSAL-2026-11-16.md`
   - Replaced the proposed erroneous transcription correction with a preservation instruction.
   - Updated the reason to state that the current lesson exactly matches Haig.

The K119 audit, K120 source matrix and K121 primary-source addendum were already corrected in the preceding K121 pass.

## Boundaries

This is a documentation correction only. No lesson content, SQL, database, seed, migration, runtime, test, Auth, RLS, grants, CI workflow, PR, deployment or `main` was changed. No new lesson sentence was created.

## Release disposition

Course 2 remains **NOT RELEASE-CERTIFIED** for the independent pedagogical gaps identified in K119–K121. This correction closes only the Lesson 09 quotation-transcription question; it does not close missing worked paradigms, basic interrogative teaching, native review or the Lesson 12 assessment decision.
