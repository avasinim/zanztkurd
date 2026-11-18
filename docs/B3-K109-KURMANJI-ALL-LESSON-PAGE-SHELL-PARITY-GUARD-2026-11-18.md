# B3-K109 — Full Kurmanji lesson page-shell parity guard

- Date: 2026-11-18
- Repository: `avasinim/zanztkurd`
- Branch: `fix/kurmanji-ci-current-migration`
- Starting HEAD: `4cbabce39a901d6fbb2a68c22c782e5f1cc04add`
- Pre-work backup: `backup/b3-k109-all-kurmanji-page-shell-audit-before-2026-11-18`
- CI run: [44248605563](https://github.com/avasinim/zanztkurd/actions/runs/44248605563)
- Validated commit: `97088306cdab24ba605857d2b1ccf3e9e4c3701d`

## Objective

Close the remaining repository-side gap between the effective post-reconciliation database payload and the 38 static Kurmanji lesson pages. The runtime injects `content_html` into `.lesson-content`, but each page's visible `<h1>` remains static HTML. A correct database title therefore does not automatically guarantee a correct visible page heading.

## Change

Extended `scripts/validate_kurmanji_seed_parity.py` so the existing CI seed-parity check now verifies, for every one of the 38 expected Kurmanji lessons:

1. The static HTML page exists.
2. The page contains an `<h1>`.
3. The visible H1 text (with HTML entities decoded and nested tags removed) exactly matches the effective post-reconciliation title derived from the historical migration plus the 12-row forward overlay.
4. The page includes its protected lesson-content container and the exact `data-lesson-key` for that page.

This validation covers both courses: 26 lessons in Course 1 and 12 lessons in Course 2. It does not alter page titles, lesson text, seed files, or migration payloads.

## CI result

<badge>SUCCESS</badge>

Run `44248605563` completed successfully.

- PostgreSQL parser: migration and all five split seed SQL files passed.
- Seed parity validator: passed, including all 38 static H1 and protected-key checks.
- Kurmanji package validator: passed.
- Playwright browser regression suite: passed, 8/8 tests.

Several early CI attempts exposed defects in the newly added validator's own matching expressions. Those expressions were corrected; the final run above is the successful verification for commit `97088306cdab24ba605857d2b1ccf3e9e4c3701d`.

## Scope and safety

- Only `scripts/validate_kurmanji_seed_parity.py` changed as application/repository code.
- No lesson page, lesson title, lesson body, seed SQL, or migration was changed.
- No database query or write was made during K109.
- The forward migration remains unapplied in both test and production.
- No DDL, DML, RLS, grants, Auth, Storage, deployment, PR, merge, or `main` update.

## Backups

- Pre-work backup: `backup/b3-k109-all-kurmanji-page-shell-audit-before-2026-11-18` at `4cbabce39a901d6fbb2a68c22c782e5f1cc04add`.
- Post-work backup: created at the report commit (recorded in the K109 completion summary).

## Conclusion

The repository CI now checks the full static-page heading/key alignment across all 38 Kurmanji lessons against the exact effective post-reconciliation payload. This is stronger static assurance, not a substitute for authenticated browser verification after an explicitly approved test-project migration.
