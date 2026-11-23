# Course 2 (12 morphology lessons) — content/mapping audit
**Date:** 2026-11-23  
**Scope:** static lesson index, 12 lesson wrappers, draft seed mapping. Documentation-only audit; no lesson content, SQL, database, production, or deployment changes.

## Verified structural checks
- `kurmanji-course-2.html` lists all 12 lesson links in sequential order (01–12).
- All 12 wrapper files `kurmanji-course-2-lesson-01.html` through `-12.html` exist.
- Each wrapper's H1 title matches the corresponding lesson title in the course index and seed insert.
- Each wrapper has the expected `data-lesson-key` matching its own filename.
- Seed split maps Course 2 lessons 01–06 in `docs/kurmanji-content-seed-part-04.sql`, and 07–12 in `docs/kurmanji-content-seed-part-05.sql`. The file keys cover each lesson exactly once across the split.

## Confirmed issue / correction gate
- Lesson 09 (“کاتی ئێستا، ڕابردوو و داهاتوو”) has the previously identified example in seed part 05: `ew dē mesel-ē ji te re bēž-e`.
- The previously checked source-correction candidate is `ew dê mesel-ê ji te re bêž-ê` (“He will tell you the issue.”).
- In this pass, the old form occurs once in the draft seed and the corrected candidate occurs zero times. The lesson content is therefore **not corrected**. This remains a gated, source-backed correction task; do not edit the seed or apply any SQL until the correction is revalidated against the cited source and an explicit forward-only correction plan is reviewed.
- The wrapper itself is a content-loading shell with the expected key; its lesson body is delivered from `lesson_content` via the seed/runtime path.

## Limitations
- This is a structural/mapping pass, not a full grammatical review of all 12 lesson bodies. It confirms file existence, title/key/link/seed mapping only.
- Source citations and grammar claims for lessons 1–8 and 10–12 were not independently rechecked in this pass.
- No SQL was executed and no database or production state was accessed or changed.

## Result
**Mapping checks pass; lesson 09 correction remains unresolved.** Continue next with a source-based content review of lessons 1–8 and 10–12, and separately resolve the Lesson 09 correction gate without rewriting historical migration files.
