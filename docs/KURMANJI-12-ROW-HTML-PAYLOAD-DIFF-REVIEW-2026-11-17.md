# Kurmanji 12-Row HTML Payload Diff Review — 2026-11-17

## Scope and safety

This review compares the `content_html` SQL string literal for each of the 12 mismatching lesson keys in the current migration `supabase/migrations/20261024122051_add_kurmanji_courses_and_protected_lessons.sql` against the corresponding ordered row in the five split seed files under `docs/kurmanji-content-seed-part-01.sql` through `part-05.sql`.

The current branch was re-read before work:
- Branch: `fix/kurmanji-ci-current-migration`
- Starting HEAD: `4632635a4548996a9d7a3f847c42f5694c621fba`
- Pre-work backup branch: `backup/kurmanji-html-row-diff-before-2026-11-17` (created at that exact SHA)

The extraction follows the same tuple-boundary logic as `scripts/validate_kurmanji_seed_parity.py`. The four SQL tuple fields were split while respecting SQL single-quoted strings and doubled single quotes; the fourth field was decoded from a standard SQL single-quoted literal. Lengths below are Unicode code-point counts of decoded HTML, not bytes or UTF-16 code units. HTML tag counts are a simple lexical count, not DOM validation.

No lesson content, seed, migration, validator, workflow, application code, database, Supabase project, PR, CI configuration, or production resource was changed. No test, validator, browser run, or database query was executed. This is a source-text comparison only.

## Row-by-row results

| Row | Lesson key | Migration chars | Seed chars | Seed − migration | Main observed difference |
|---:|---|---:|---:|---:|---|
| 1 | `kurmanji-course-1-lesson-01.html` | 2,522 | 6,351 | +3,829 | Seed contains several additional instructional sections after the shared opening and before/around the sources. |
| 2 | `kurmanji-course-1-lesson-02.html` | 2,734 | 6,263 | +3,529 | Seed adds substantial sections on vowel/consonant classification, diacritic preservation, alphabetic ordering/indexing, and further exercises. |
| 3 | `kurmanji-course-1-lesson-03.html` | 2,674 | 4,234 | +1,560 | Divergence begins in the first heading; seed expands the vowel lesson with IPA-related material and additional explanation. |
| 4 | `kurmanji-course-1-lesson-04.html` | 3,604 | 5,305 | +1,701 | Seed revises wording in the opening definition and expands the consonant/phonetic discussion and teaching material. |
| 5 | `kurmanji-course-1-lesson-05.html` | 2,727 | 2,990 | +263 | Seed revises the opening explanation of the five marked letters and adds/extends explanatory material. |
| 6 | `kurmanji-course-1-lesson-06.html` | 2,698 | 3,404 | +706 | Different lesson organization and opening: migration begins with “ڕێکاری خوێندنەوە”; seed begins “لە پیتەوە بۆ وشە” and adds pronunciation/IPA guidance and expanded exercises. |
| 10 | `kurmanji-course-1-lesson-10.html` | 3,467 | 3,553 | +86 | Seed adds the greeting `Êvarbaş!` (“ئێوارە باش!”) and adjusts the contextual description of `Şevbaş!`. |
| 25 | `kurmanji-course-1-lesson-25.html` | 5,258 | 5,259 | +1 | Very small text-level differences: `نەردرکێت` vs `نەردەکەوێت`, and `ڕوونتر` vs `ڕونتر`. |
| 30 | `kurmanji-course-2-lesson-04.html` | 2,382 | 2,383 | +1 | One word differs: migration `پێویستە`; seed `پەیویستە`. |
| 32 | `kurmanji-course-2-lesson-06.html` | 2,756 | 2,757 | +1 | One word differs: migration `پێویستە`; seed `پەیویستە`. |
| 35 | `kurmanji-course-2-lesson-09.html` | 3,036 | 3,035 | −1 | One spelling differs: migration `نووسینەی`; seed `نوسینەی`. |
| 36 | `kurmanji-course-2-lesson-10.html` | 2,764 | 2,763 | −1 | One spelling differs: migration `نووسینی`; seed `نوسینی`. |

## Detailed interpretation

### Course 1, lessons 1–6

These are not merely whitespace or punctuation mismatches. Their decoded HTML differs substantially in length and structure.

- **Lesson 1:** the first 1,751 code points are shared. The migration then proceeds to its source list, while the seed adds multiple teaching sections, including a four-way distinction among language, alphabet, orthography and dialect; a method for reading examples; a table with `Kurmancî`, `Kurdî`, `çav` and `şev`; analytical exercises; and an expanded source/method note. The simple tag count is 64 in the migration and 216 in the seed.
- **Lesson 2:** the first 1,921 code points are shared. The seed then adds material on classifying the 31 letters into eight vowels and 23 consonants, preserving marked letters in digital text, alphabetic ordering/indexing, and additional scientific review exercises. The simple tag count is 140 versus 276.
- **Lesson 3:** divergence begins at the opening heading. The seed changes the heading to explicitly mention IPA equivalents and expands the vowel table/explanation. This is a substantive revision, not an appended tail alone.
- **Lesson 4:** the opening definition is reworded (including a changed description of airflow/articulation), and the seed adds/extends the phonetic explanation and instructional structure.
- **Lesson 5:** the seed rewrites the introductory explanation of the five marked letters and expands the discussion. The size difference is smaller than lessons 1–4 but still includes more than a one-character spelling variation.
- **Lesson 6:** the two versions use different lesson openings and organization. The seed version includes explicit IPA values for examples such as `av`, `dil`, `lêv`, `hîn`, `qaz`, `qul`, `çak` and `şaş`, and adds guidance distinguishing IPA from alphabet letters.

These observations establish that the seed payloads for lessons 1–6 are materially longer or reorganized relative to the migration payloads. They do **not** establish that the seed is approved, newer, more accurate, or canonical.

### Remaining six rows

- **Lesson 10:** the seed inserts `Êvarbaş!` as an additional greeting and changes the usage note for `Şevbaş!`. This is a content/example difference, not a whitespace-only change.
- **Lessons 25, 30, 32, 35 and 36:** each is a very small textual spelling/word-form difference in the HTML text. The exact competing forms are listed in the table. The comparison does not determine which form is preferred by the project's editorial policy.

## What the diff establishes

1. The validator's exact tuple comparison is correctly sensitive to real source differences: the 12 mismatches are present in the decoded `content_html` values, not just SQL formatting or whitespace.
2. The mismatch set is heterogeneous. Lessons 1–6 contain substantial added/reorganized instructional material; lesson 10 has an added greeting/example and note revision; lessons 25, 30, 32, 35 and 36 contain small lexical/spelling differences.
3. The remaining 26 lesson tuples are equal under the current validator's raw tuple comparison, as established by the prior source audit; this report focuses only on the 12 known mismatches.

## What the diff does not establish

- Which copy is the approved editorial master or the release-authorized source.
- Which version is newer, more complete, linguistically preferable, or intended for production.
- Whether any difference is accidental, an approved correction, or an unfinished draft change.
- Whether the production migration comment accurately reflects the live database.
- Whether either set of payloads has been applied to any live database.

No automatic synchronization is recommended. In particular, do not replace the migration with the seed, or the seed with the migration, solely to make the validator pass. First obtain the approved source drafts/release record and an explicit owner/editor decision for the substantive rows; then prepare a minimal, reviewable repair proposal.

## Backup and verification record

- Starting work HEAD: `4632635a4548996a9d7a3f847c42f5694c621fba`
- Pre-work backup: `backup/kurmanji-html-row-diff-before-2026-11-17`
- Post-work backup: to be recorded after the documentation commit is created and its exact SHA is verified.
- This document is documentation-only; no lesson payload or executable source file was edited.
