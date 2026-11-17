# Kurmanji lesson payload provenance and authority audit — 2026-11-17

## Purpose

This follow-up investigates whether repository history identifies either the 2026-10-24 production migration or the five split SQL seed files as the authoritative copy for the 12 currently divergent `content_html` payloads.

This is a repository-history and source-metadata review only. It does not approve or perform any lesson-content synchronization.

## Repository snapshot

- Repository: `avasinim/zanztkurd`
- Work branch: `fix/kurmanji-ci-current-migration`
- Starting HEAD: `7ddbc6af7ba0f1230e1a7bfa18a63d41279c903a`
- Pre-work backup: `backup/kurmanji-content-delta-review-before-2026-11-17`

## Historical provenance confirmed

GitHub path history reports the same introducing commit for:
- `supabase/migrations/20261024122051_add_kurmanji_courses_and_protected_lessons.sql`
- all five `docs/kurmanji-content-seed-part-*.sql` files
- the six inspected static lesson shell pages `kurmanji-course-1-lesson-01.html` through `lesson-06.html`.

The introducing commit is:

- Commit: `bbc4e96f07f96c034a7d62232cd2d169ceeb3eef`
- Date: 2026-10-24 12:24:15 UTC
- Message: `Release Kurmanji courses 1–2 (26 + 12 lessons)`
- Parent: `73964544b4b759a6cfab72b4ce2ee5e7a9a3c980`
- GitHub reports the commit signature as valid.
- Commit statistics: 6,381 changed lines (6,313 additions, 68 deletions).

The parent snapshot does not contain the inspected migration, seed files, or lesson-01 static shell at the queried paths (GitHub contents API returned 404 for each). Therefore these artifacts entered this repository snapshot together in the same release commit; the checked path history does not show a later commit that separately reconciled the two payload sources.

This supports the conclusion that the current source divergence was present at introduction or was introduced as part of that same release commit. It does **not** establish who authored each differing payload or which content was intended to prevail.

## Conflicting source declarations

### Migration header

The migration begins with comments stating:
- it was applied to the production project on 2026-10-24, with recorded version `20261024122051`;
- the 38 lesson title/content payloads are synchronized exactly with the five split seed files after Avasin Code Sorani spelling fixes.

The second statement is contradicted by the exact source comparison documented in `KURMANJI-MIGRATION-SEED-TUPLE-MISMATCH-SOURCE-AUDIT-2026-11-17.md`: 12 of 38 ordered tuples differ in `content_html`.

The first statement is a repository comment, not independently verified production evidence. No remote migration ledger or production database was queried.

### Split seed headers

The seed files describe themselves as draft data seeds, not production migrations. Parts 01–04 state that their HTML sections were extracted from current static lesson pages; part 05 is also labelled a draft seed. Part 01 additionally says to keep static pages unchanged until the complete 38-row seed and RPC changes are reviewed.

These comments create an unresolved provenance question: the same release commit added the static lesson pages as protected shells with a server-loaded `.lesson-content` placeholder, not embedded lesson-body HTML. The current shell for lesson 01 contains only the loading placeholder; its protected body is loaded at runtime. The current shell therefore cannot independently verify the seed comment's claim about extraction from static-page lesson bodies.

### Validator and workflow

The same introducing commit added `scripts/validate_kurmanji_seed_parity.py` and a GitHub Actions workflow that runs exact migration/seed tuple comparison. The validator's success message requires all 38 raw tuple strings to match. This makes the parity expectation explicit, but it does not establish which source copy is canonical.

## What can and cannot be concluded

### Established from repository evidence

1. The migration, all five seed files, and inspected static lesson shells were introduced in the same 2026-10-24 release commit.
2. The introducing commit's parent does not contain these artifacts at the queried paths.
3. The migration header claims exact seed synchronization, but current source data contradicts that claim for 12 tuples.
4. The split seed headers call the files draft seeds, not production migrations.
5. The protected static lesson shell inspected for lesson 01 does not embed its body; it contains a loading placeholder.
6. The validator requires byte-for-byte tuple parity and therefore correctly reports divergence under its own stated comparison rule.

### Not established

- Which of the migration or seed payloads is the approved editorial master.
- Whether the migration's recorded production application actually occurred, or whether the remote database still contains those exact payloads.
- Whether the split seed files were ever applied to any database.
- Whether one payload is older, newer, more complete, or linguistically preferred.
- Whether the static lesson bodies existed in another pre-release workspace or branch before being converted to protected shells.
- Whether the differences were deliberate, generated from different source snapshots, or accidental.
- Whether the one-character differences in rows 25, 30, 32, 35 and 36 are typographical, linguistic, markup, or Unicode differences without owner/editor review.

## Safe recommendation

Do not synchronize migration and seed files by copying either side wholesale. The migration header's exact-sync assertion should be treated as unsubstantiated until the 12 rows are resolved. The seed files' draft label means they should not automatically be promoted to canonical status either.

Recommended evidence sequence, without content changes:

1. Retrieve and review the exact 12 row-level HTML diffs in a side-by-side editorial comparison.
2. Locate the owner's approved source drafts or release review records, if available, and map each affected lesson key to its approved version.
3. Ask the content owner/editor to identify the canonical payload for each affected lesson.
4. Separately verify migration ledger state only after explicit authorization for a named non-production/read-only project; do not query production under a general continue instruction.
5. Only after explicit approval, prepare a minimal repair proposal with before/after diffs, impact analysis, SQL syntax checks and parity tests. Do not rewrite historical production migrations without a reviewed migration-lineage plan.

## Safety and non-actions

- No lesson content, static page, seed file, migration, validator, workflow, CI configuration, database, Supabase project, PR, or production resource was changed.
- No database or Supabase connection was made.
- No tests or validators were executed.
- No deployment, merge, rebase, force-push, or change to `main` was performed.
- This document does not certify production state or grant authority to edit content.

## Backup record

- Work branch: `fix/kurmanji-ci-current-migration`
- Starting HEAD: `7ddbc6af7ba0f1230e1a7bfa18a63d41279c903a`
- Pre-work backup: `backup/kurmanji-content-delta-review-before-2026-11-17`
- Change type: documentation only.
