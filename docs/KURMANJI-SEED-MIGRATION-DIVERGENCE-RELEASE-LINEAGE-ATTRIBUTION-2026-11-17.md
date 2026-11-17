# Kurmanji Seed–Migration Divergence: Release-Lineage Attribution — 2026-11-17

## Executive finding

The current 12-row mismatch set is now traceable to later **seed-only content edits** after the original Kurmanji release snapshot. The migration's 38 lesson tuples and the five seed files were exactly equal in the final PR #4 release snapshot (commit `96f5b8eaef364332e3aee39df7e599a8c994693b`). The current migration still has the same 38 lesson tuples as that release snapshot, while four seed files (parts 01, 02, 04 and 05) now contain later edits. Those later seed edits were not mirrored into the migration.

This resolves the immediate technical origin of the parity failure: it is not an unexplained mismatch in the original release package. It is release-following drift between the reference seed files and the migration payload. It does **not** establish that the later seed edits are all editorially approved, nor does it authorize rebuilding or applying the migration.

## Scope and method

- Re-read active branch `fix/kurmanji-ci-current-migration` before work. Starting HEAD: `73492c8a98d88f4156ce0194936c10c701b0df4c`.
- Created pre-work backup at that exact SHA: `backup/kurmanji-row-lineage-review-before-2026-11-17`.
- Compared the 38 ordered SQL row tuples from the migration and five split seed files at the final PR #4 release commit `96f5b8eaef364332e3aee39df7e599a8c994693b`.
- Compared the current migration and current seed tuples, and inspected file history and commit patches for the relevant seed-only edits.
- SQL tuple extraction respected quoted string boundaries and doubled single quotes. The comparison was of decoded row fields; the parity result covers all tuple columns and order, not only HTML length.
- No validator, test, browser run, database query, or migration execution was performed.

## Release snapshot versus current snapshot

### PR #4 final release snapshot

At `96f5b8eaef364332e3aee39df7e599a8c994693b`:
- Migration: 38 lesson tuples.
- Five seeds combined: 38 lesson tuples.
- Mismatch rows: **0**.
- All complete ordered tuples were equal.

The relevant release PR is [PR #4 — Release Kurmanji courses 1–2](https://github.com/avasinim/zanztkurd/pull/4), merged on 2026-10-24. The PR commit history contains 70 commits. The final release commit also contains the release-audit correction recording the applied migration version.

### Current isolated work-branch snapshot

At the start of this review:
- Migration: 38 lesson tuples.
- Five seeds combined: 38 lesson tuples.
- Mismatch rows: **12** (rows 1–6, 10, 25, 30, 32, 35 and 36).
- The migration's decoded lesson tuples are unchanged from the original release migration snapshot. Its current blob differs because the migration header/comment was corrected; the row tuples remain equal.

Current seed file blob SHAs:
- Part 01: `58723848f1e63d5a18fbafb6d28e6876e474948f`
- Part 02: `aa5af4960256ee56955f0904c073c49bcc54a629`
- Part 03: `b6f89841ac49adb256a7874179a258436e095909`
- Part 04: `2367c5057b2b92b7fa482c64a30b05d26838d964`
- Part 05: `e40298225e03921edb3ad31704191bdf0c20e880`

At the PR #4 final release snapshot, parts 01, 02, 04 and 05 had different blob SHAs from their current versions; part 03 had the same blob SHA. This is consistent with the file histories: the mismatching later edits are in parts 01, 02, 04 and 05.

## Row-level origin evidence

| Current mismatch | First directly relevant seed-only commit identified | Recorded change |
|---|---|---|
| Course 1 lesson 01 | `ef730f59d2585ff741b8d708b58078bb67a47bd5` — 2026-10-24 13:56:08 UTC | “Enrich Northern Kurmanji lesson 1 academic content”; added substantial instructional sections to part 01. |
| Course 1 lesson 02 | `daa9898df7d5f82ea7cee05fa890b40b1bbcc2e9` — 2026-10-24 13:57:28 UTC | “Enrich Northern Kurmanji lesson 2”; added vowel/consonant classification and further teaching material to part 01. |
| Course 1 lesson 03 | `7ba3bf8fe87e32e00102352068313722ccc787e7` — 2026-10-24 14:00:06 UTC; followed by `ff4b53750f50a8029a4e53dc197af827ce6f27e8` | “Enrich Northern Circle Kurmanji lesson 3 vowel table”; later commit corrects the Sorani gloss for qaz. |
| Course 1 lesson 04 | `cac9fee8ce450dcea17d5e0e1acfdd09be3b122f` — 2026-10-24 14:02:25 UTC | “Enrich Northern Circle Kurmanji lesson 4 consonants”; substantive revision/expansion in part 01. |
| Course 1 lesson 05 | `51cab71e00cd2cc842635b5a920ebc62fd7e8695` — 2026-10-24 14:03:44 UTC | “Enrich Kurmanji lesson 5 marked-letter distinctions”; revises the marked-letter explanation in part 01. |
| Course 1 lesson 06 | `179f834a8a462ebba1cfdc83c69a1744b2296478` — 2026-10-24 14:05:05 UTC | “Enrich Kurmanji lesson 6 reading and spelling practice”; reorganizes/revises the reading lesson in part 01. |
| Course 1 lesson 10 | `a8b8ee58222ff9a1cb51f28c99602e9d98bfeb28` — 2026-10-25 07:43:06 UTC | “content: distinguish evening and night greetings in Kurmanji lesson 10”; adds Êvarbaş! and changes the Şevbaş! usage note in part 02. |
| Course 1 lesson 25 | `7eac8dff8be1ef021a4895e576818b64bf6d57ef` — 2026-10-24 13:37:02 UTC; then `8911abdd71b0d325ec1563a349deb197ddc9360f` — 14:45:50 UTC | The Avasin-orthography pass changes the seed text; the later “correct typo in lesson 25 seed text” commit revises the wording again. Current seed remains different from the migration by one code point. |
| Course 2 lesson 04 | `7eac8dff8be1ef021a4895e576818b64bf6d57ef` — 2026-10-24 13:37:02 UTC | Seed-only Avasin orthography update in part 04; current text differs from the migration by one code point. |
| Course 2 lesson 06 | `7eac8dff8be1ef021a4895e576818b64bf6d57ef` — 2026-10-24 13:37:02 UTC | Same seed-only Avasin orthography update in part 04; current text differs from the migration by one code point. |
| Course 2 lesson 09 | `a4e5bcf49b95c55ac91b122d6deed26cb4d34b44` — 2026-10-24 13:37:06 UTC | “Apply Avasin orthography to Kurmanji seed content”; current seed uses `نوسینەی` where migration has `نووسینەی`. |
| Course 2 lesson 10 | `a4e5bcf49b95c55ac91b122d6deed26cb4d34b44` — 2026-10-24 13:37:06 UTC | Same seed-only orthography pass; current seed uses `نوسینی` where migration has `نووسینی`. |

For lessons 25, 30 and 32, commit-parent comparisons show the relevant seed rows matched the migration before the Avasin-orthography pass and diverged after it. For lessons 35 and 36, the part-05 snapshot at the parent of `a4e5bcf` matched the migration; the post-commit snapshot introduced the current one-code-point differences. For lessons 1–6 and 10, the commit subjects and patches identify the substantive seed-only enrichments/revision.

The attribution identifies the commits that changed the seed payloads. It does not determine whether each spelling or content revision is linguistically preferable or owner-approved.

## Important release-record reconciliation

The PR #4 release record and the later current branch must be read chronologically:

1. PR #4 was merged on 2026-10-24. Its final release snapshot had exact 38-row migration/seed parity.
2. After that release snapshot, commits enriched lessons 1–6, changed lesson 10 examples, applied Avasin Sorani orthography to several seed rows, and corrected lesson 25.
3. The migration payload did not receive matching row-content updates. Current parity failure is therefore the expected consequence of seed-only post-release changes.
4. The release-audit document contains an earlier stale statement saying no migration was run, followed by a later “Release execution correction” stating that production project `hjpmorabqdhuchpnowiw` was migrated and read-only metadata verification found 26 + 12 protected lesson keys. The final header and migration comment were then corrected to say applied on 2026-10-24, version `20261024122051`.
5. PR #4's description independently makes the same production-applied claim. This repository evidence records what the release process asserted; this review did not connect to Supabase and does not independently verify the live database or its current migration ledger.

This means the original PR #4 release package was internally consistent at merge time, but subsequent source-of-truth seed updates were not propagated to the checked-in migration. The migration's old “exactly synchronized” comment is stale relative to the current seed files.

## Recommended decision path

1. Treat the five current split seed files as the latest *repository-maintained reference copy*, not automatically as approved canonical content.
2. Obtain explicit editorial/owner confirmation that the later seed-only changes are intended to supersede the PR #4 migration payload.
3. If confirmed, prepare a minimal migration parity repair proposal and run it only in a disposable/non-production environment after authorization. Do not replay or alter the already-recorded production migration version.
4. If not confirmed, restore/identify the approved release snapshot for the affected rows and document the intended versioning policy so future seed edits cannot silently drift from the migration.
5. Update the stale “exactly synchronized” comment and release audit wording only after the owner decision and factual verification; do not edit these source files in this audit.

## Safety and verification

- No migration, seed, lesson body, validator, workflow, application source, database, Supabase project, PR, or production setting was changed.
- No test, validator, browser test, migration, or database query was executed.
- This work is source-history and SQL-payload comparison only.
- The next required decision is editorial authority for the post-release seed changes, not an automatic code repair.

## Backup record

- Pre-work backup: `backup/kurmanji-row-lineage-review-before-2026-11-17`
- Starting HEAD: `73492c8a98d88f4156ce0194936c10c701b0df4c`
- Post-work backup: to be recorded after documentation commit and verified against the final work HEAD.
