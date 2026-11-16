# Kurmanji seed–migration discrepancy review — 2026-11-16

## Scope and preservation

- Reviewed the 38-row Kurmanji lesson package on branch `fix/kurmanji-ci-current-migration`.
- Compared the 12 rows previously reported as non-identical between the five split draft seed files and migration `supabase/migrations/20261024122051_add_kurmanji_courses_and_protected_lessons.sql`.
- Current migration blob at review time: `06320c50a858e41d8ce21e7b4fdee3f6ae418cd9`.
- This review is documentation only. No lesson text, seed payload, migration, database, `main`, pull request, or deployment was changed. No SQL was executed.
- A preservation branch was created immediately before this review: `backup/kurmanji-ci-before-diff-audit-2026-11-16`, pointing to `d87dc6230d42acc292be1293c69bf92743487e25`.

## Summary

There are 12 non-identical lesson payloads in the reviewed comparison:

| Course | Lesson | Preliminary classification | Observation |
|---|---:|---|---|
| 1 | 01 | Substantive content divergence | Split seed has additional sections distinguishing language, alphabet, orthography, dialect, examples, and method notes; migration payload ends after the shorter core lesson and sources. |
| 1 | 02 | Substantive content divergence | Split seed adds vowel/consonant classification, marked-letter handling, alphabet sorting, and further exercises. |
| 1 | 03 | Substantive content divergence | Split seed expands the vowel lesson with IPA, source-based example/gloss material, and additional explanation; migration has a shorter table/lesson body. |
| 1 | 04 | Substantive content divergence | Split seed has expanded explanation of consonants, letters versus phonemes, and source/method detail; migration is shorter. |
| 1 | 05 | Substantive content divergence | Split seed expands the five marked-letter lesson with distinctions, examples, and additional explanation; migration contains a shorter version. |
| 1 | 06 | Substantive content divergence | Split seed restructures and expands the reading/writing lesson, including more explanation and examples; migration is shorter. |
| 1 | 10 | Source-backed content divergence | Split seed adds `Êvarbaş!` as an evening greeting and narrows `Şevbaş!` to night/bedtime farewell. The audit history records a Yari source check for this distinction; migration lacks the added row and narrower note. |
| 1 | 25 | Orthography/editorial divergence | Payloads are nearly the same length; differences include Sorani spelling forms such as `نەردرکێت/نەردەکەوێت` and `ڕونتر/ڕوونتر`. Requires the Avasin spelling convention to decide the preferred form. |
| 2 | 04 | Orthography/editorial divergence | A spelling variant appears in the explanatory text (`پەیویستە` versus `پێویستە`); no broad lesson-structure divergence was seen in the inspected context. |
| 2 | 06 | Orthography/editorial divergence | Same type of spelling variant (`پەیویستە` versus `پێویستە`) in the explanatory text; lesson payload lengths are identical. |
| 2 | 09 | Orthography/editorial divergence | A Sorani spelling variant appears (`نوسین` versus `نووسین`); the Latin Kurmanji form `dē` is preserved in both. |
| 2 | 10 | Orthography/editorial divergence | A Sorani spelling variant appears (`نوسینی` versus `نووسینی`); the inspected context otherwise matches closely. |

## Important integrity finding

The migration header currently states that all 38 lesson title/content payloads are synchronized exactly with the five split seed files. The 12 row differences above contradict that statement. The header should not be treated as proof of parity until the exact-row validator passes.

## What this review does and does not establish

- It establishes that the listed seed and migration payloads are not byte-identical and identifies the broad nature of each difference.
- It does not establish that either side is the authoritative final lesson text.
- It does not approve overwriting the migration from the seed, or the seed from the migration.
- It does not certify the deployed database payload. The migration file itself records that it was applied to production on 2026-10-24; this review did not query or change that database.
- Source-backed support recorded in the existing audit for Course 1 lesson 10 makes the seed's `Êvarbaş!` distinction a strong candidate for preserving, but it still needs to be handled through an explicitly reviewed reconciliation rather than an automatic bulk sync.
- The six larger Course 1 differences (lessons 01–06) need source/editorial review against the intended lesson source and static lesson pages before any canonical version is selected.

## Safe next steps

1. Identify the authoritative source for Course 1 lessons 01–06 and compare each expanded seed section with that source and the corresponding static lesson page.
2. Confirm the source-backed `Êvarbaş!` change in lesson 10 and preserve its provenance.
3. Apply the project's established Avasin orthography consistently to the small Course 1 lesson 25 and Course 2 lessons 04, 06, 09, and 10 spelling differences, without changing Kurmanji Latin forms.
4. Reconcile only after the owner has reviewed the proposed canonical text for each affected lesson.
5. Re-run the exact seed/migration parity validator; require all 38 rows to match before treating this gate as passed.
6. Keep production, `main`, merge, and deployment decisions separate from this documentation-only review and require explicit authorization for those actions.

**Disposition: release gate remains blocked. No lesson or database content was changed by this review.**
