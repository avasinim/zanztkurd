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


## Provenance and canonical-source investigation — 2026-11-16

A follow-up check of Git history clarifies why the large Course 1 differences exist:

- The release migration was committed as `bbc4e96f07f96c034a7d62232cd2d169ceeb3eef` at **2026-10-24 12:24 UTC**. Its parent was `73964544b4b759a6cfab72b4ce2ee5e7a9a3c980`.
- The split seed part 01 was then deliberately enriched later on **2026-10-24**, after the migration:
  - Lesson 01: `ef730f59d2585ff741b8d708b58078bb67a47bd5` — “Enrich Northern Kurmanji lesson 1 academic content” (13:56 UTC).
  - Lesson 02: `daa9898df7d5f82ea7cee05fa890b40b1bbcc2e9` — “Enrich Northern Kurmanji lesson 2” (13:57 UTC).
  - Lesson 03: `7ba3bf8fe87e32e00102352068313722ccc787e7` — “Enrich Northern Circle Kurmanji lesson 3 vowel table” (14:00 UTC), followed by `ff4b53750f50a8029a4e53dc197af827ce6f27e8` — “Correct Sorani gloss in Kurmanji lesson 3”.
  - Lesson 04: `cac9fee8ce450dcea17d5e0e1acfdd09be3b122f` — “Enrich Northern Circle Kurmanji lesson 4 consonants” (14:02 UTC).
  - Lesson 05: `51cab71e00cd2cc842635b5a920ebc62fd7e8695` — “Enrich Kurmanji lesson 5 marked-letter distinctions” (14:03 UTC).
  - Lesson 06: `179f834a8a462ebba1cfdc83c69a1744b2296478` — “Enrich Kurmanji lesson 6 reading and spelling practice” (14:05 UTC).
  - Lesson 07 was also changed later that afternoon, but is outside the 12-row mismatch list.
- Course 1 lesson 10 has a later explicit source-based change: `a8b8ee58222ff9a1cb51f28c99602e9d98bfeb28`, “content: distinguish evening and night greetings in Kurmanji lesson 10” (2026-10-25 07:43 UTC).
- The current static wrappers for Course 1 lessons 01–06 are shells: each contains a `.lesson-content` mount with a `data-lesson-key` and loads `script.js`; they do not contain the full teaching body inline. Therefore the wrappers cannot independently adjudicate the seed-versus-migration text.
- The existing source-audit sections for lessons 01–06 in `docs/KURMANJI-RELEASE-AUDIT.md` explicitly use the split seed as the reviewed lesson source and record the scientific/editorial caveats. Those audits are useful supporting evidence, but they do not prove every later-added paragraph was separately source-checked.

### Revised assessment

The 12 differences are not random unexplained drift. At least the major Course 1 lesson 01–06 expansions were deliberately committed to the split seed **after** the migration release commit. The migration is therefore an older snapshot and its “exactly synchronized” header is stale. The later seed is the more recent authored draft for those rows, but the remaining source/editorial caveats still apply; this finding alone does not authorize copying all seed payloads into a migration or claiming the deployed database matches either file.

### Next safe action

Use the later split seed as the working review candidate for lessons 01–06, preserve the migration snapshot, and inspect the exact commit patches/source notes for each enrichment. After that, prepare a proposed reconciliation patch on a new isolated branch, with no database execution, merge, or deployment.


### Commit-patch verification

The actual GitHub commit patches were opened, not inferred from commit titles alone. They confirm the later seed changes replaced or expanded the corresponding lesson rows:

| Lesson | Commit patch | Confirmed change |
|---|---|---|
| 01 | `ef730f5` | +28 / -1 lines in part 01; adds the academic distinction and related material after the earlier core sections. |
| 02 | `daa9898` | +23 lines in part 01; adds vowel/consonant classification and related teaching material. |
| 03 | `7ba3bf8` and `ff4b537` | Reworks the vowel table and corrects a Sorani gloss. |
| 04 | `cac9fee` | +55 / -8 lines in part 01; substantial consonant lesson expansion. |
| 05 | `51cab71` | Replaces the lesson row (+1 / -1 SQL lines); the row is a single long SQL line, so the line count does not indicate a trivial content change. |
| 06 | `179f834` | Reworks the reading/spelling practice (+16 / -16 lines); the row is likewise stored as a long SQL line. |
| 10 | `a8b8ee5` | Adds `Êvarbaş!` and changes the `Şevbaş!` usage note (+2 / -1 lines). |

This confirms the main pattern: the migration captured the earlier lesson bodies, while the split seed received deliberate later content revisions. It does not remove the need to validate each added claim and example against the sources recorded in the release audit.
