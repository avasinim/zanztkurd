# Course 2 Lesson 9 — Source Correction Gate (2026-11-22)

## Finding

The future-tense example attributed to Haig (2018, §2.6.4) is currently stored with a non-source spelling in both repository payload copies:

- Current spelling: `ew dē mesel-ē ji te re bēž-e`
- Haig's printed spelling: `ew dê mesel-ê ji te re bêž-ê`
- Source gloss: “He will tell you the issue.”

The exact current spelling occurs once in each of:
- `docs/kurmanji-content-seed-part-05.sql` (blob `e40298225e03921edb3ad31704191bdf0c20e880`)
- `supabase/migrations/20261024122051_add_kurmanji_courses_and_protected_lessons.sql` (blob `06320c50a858e41d8ce21e7b4fdee3f6ae418cd9`)

The migration header explicitly states that version `20261024122051` was applied to the production project on 2026-10-24. Its lesson 9 payload contains the same current spelling. The split seed and historical migration are therefore coordinated copies, not independent drafts that can safely be edited in isolation.

## Delivery and safety implications

1. Do **not** rewrite the already-applied historical migration. Editing it would not update the existing production database and would make the migration history misleading.
2. Do **not** execute SQL, create/apply a new migration, or modify Supabase/Production as part of this documentation-only task.
3. The lesson 9 wrapper `kurmanji-course-2-lesson-09.html` loads content through `data-lesson-key="kurmanji-course-2-lesson-09.html"`; it does not contain the lesson payload itself.
4. A safe content correction therefore needs a separately reviewed, forward-only migration that updates the stored `lesson_content` row, with the split seed updated to the same exact source form. This is a production migration/database change and requires the project owner's explicit authorization before preparation or application.
5. Do not normalize any other Kurmanji Latin forms by analogy. The correction is limited to this single source-attributed example and its grammatical explanation (`dê` as future particle).

## Verification performed

- The Course 2 audit branch was identical to its post-audit backup before this follow-up.
- The current Lesson 9 seed payload contains the old spelling exactly once.
- The applied migration file contains the old spelling exactly once and the corrected spelling zero times.
- No learner-facing content, SQL, migration, application code, database, production setting, main branch, pull request, or deployment was changed by this follow-up.

## Required next authorization

Ask the project owner to authorize preparation of a new forward-only migration and matching seed correction. Preparation and especially execution/application must remain separate, explicitly approved steps. Until then, retain the current files and treat this as a documented source-fidelity defect, not a corrected live lesson.
