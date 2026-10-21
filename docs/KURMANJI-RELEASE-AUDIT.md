# Kurmanji course release audit — 2026-10-19

## Current state
- PR #3 is the current draft review path for the Kurmanji course changes; it is open and unmerged.
- The course content migration defines 26 lessons for `kurmanji-course-1` and 12 lessons for `kurmanji-course-2`.
- Static GitHub Actions checks have passed, but those checks are not a substitute for a browser end-to-end test or a successful test-database migration.
- Do not apply the migration to the production Supabase project or merge the PR until the release gates below are met.

## Release gates
1. **Source verification:** Review all 38 lesson bodies against their cited academic sources, recording lesson-by-lesson checks for examples, morphology, grammatical claims, and translations. Citations in the lesson alone do not establish that every claim was verified.
2. **Preserve source text:** Do not silently change scientific lesson text, examples, or orthography. Propose any content corrections separately for user review.
3. **Database migration:** Establish the precise cause of the Supabase test branch's `MIGRATIONS_FAILED` state, then run the migration in a safe test environment and inspect its results.
4. **Authorization and progression:** End-to-end test signed-out access, a signed-in but unenrolled student, an enrolled student, the site owner, previous-lesson completion requirements, and persistence of completion.
5. **Release confirmation:** Only after the above checks pass should the PR be considered ready for merge and production rollout.

## Automated seed-to-migration comparison — 2026-10-21

A read-only comparison of the SQL row tuples in the migration and the five split seed files found 38 unique lesson rows in each package, with no missing keys. All 38 lesson bodies differ byte-for-byte; 29 titles match exactly and 9 do not. A heuristic normalization of known Sorani spelling variants (including `چیە`/`چییە`, `نوسین`/`نووسین`, `ڕێنوسی`/`ڕێنووسی`, and selected doubled-y forms) makes 33 of the 38 bodies byte-identical. The remaining five are lessons 11, 17, 20, 25, and course 2 lesson 10; token-level inspection shows their first residual differences are also small spelling/orthography variants (for example `ئاسایی`/`ئاساییی` and `ڕێنمایەکی`/`ڕێنماییەکی`). This is a diagnostic heuristic only: broad text normalization can hide differences, so it is not proof of scientific equivalence and must not be used to auto-replace content. All 38 lessons remain unverified against their cited sources; do not copy either package over the other automatically.

The `PDF` link-label correction in the migration and split seed files changes only the label of the De Gruyter DOI link to `DOI`; it does not resolve the lesson-content mismatch.

## Technical caution
The SQL migration replaces `public.can_read_lesson_content` and `public.complete_lesson`. Since these are shared application functions, regression tests must confirm that existing orthography and phonetics/phonology courses still behave correctly after the migration.

## Scope of this audit
This document records the release gates; it does not certify that all 38 lessons have already been source-verified. No production database writes are authorized by this document.

### Detailed title-difference inventory

The nine title mismatches are concentrated in spelling/orthography forms: lesson 01 (ڕێنوسی / ڕێنووسی), lesson 03 (نیشانەنوسییان / نیشانەنووسییان), lesson 04 (نوسینەوە / نووسینەوە), lesson 06 (نوسینی / نووسینی), lesson 07 (ڕێنوسی / ڕێنووسی), lesson 08 (نوسین / نووسین), course 1 lesson 26 (پێداچونەوە / پێداچوونەوە), course 2 lesson 09 (ڕابردو / ڕابردوو and داهاتو / داهاتوو), and course 2 lesson 12 (پێداچونەوە / پێداچوونەوە). This is a mechanical inventory of text differences, not a decision that either spelling is the authoritative title. Keep the discrepancy visible until the canonical editorial standard is confirmed; do not silently change course content.

## Latest automated checks — 2026-10-21

For head commit `a6bbf3baa177f4c0229d7259894cd81ee5627a39`, all three repository CI checks completed successfully:
- [Academic lesson catalog validation](https://github.com/avasinim/zanztkurd/actions/runs/39608761390)
- [Lesson navigation validation](https://github.com/avasinim/zanztkurd/actions/runs/39608761557)
- [Kurmanji course package validation](https://github.com/avasinim/zanztkurd/actions/runs/39608761400)

The Supabase Preview check was skipped, so this is not evidence that the SQL migration has run successfully. The PR remains open and draft; no production deployment or database write was performed.

## Preliminary reference check — course 1, lesson 01

Public bibliographic/source pages confirm that Thackston's *Kurmanji Kurdish: A Reference Grammar with Selected Readings* is a relevant grammar and includes a section on alphabet and sounds; the available description also notes that Kurmanji has been written in more than one script, with a modified Turkish Latin alphabet prominent in Turkey and Europe. Haig's 2018 chapter is a relevant scholarly overview of Northern Kurdish/Kurmanjî. These sources support the broad need to distinguish the language from its writing system and to avoid presenting one script as the only script historically used. However, the lesson's individual statements have not yet been matched to exact pages/sections in the source texts, and its bibliography lacks verified pinpoint citations. Therefore lesson 01 remains **partially supported at overview level, not source-verified**. Sources checked: [Kurdish Academy / Thackston](https://kurdishacademy.org/?page_id=623), [Google Books bibliographic record](https://books.google.com/books/about/Kurmanji_Kurdish.html?id=fXhwvwEACAAJ), [De Gruyter / Haig and Khan volume](https://www.degruyterbrill.com/document/doi/10.1515/9783110421682/html), [Haig chapter PDF](https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf).
