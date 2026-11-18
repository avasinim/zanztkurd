# B3-K147 — Full-Prefix Validator and RPC Source-Contract Hardening (2026-11-18)

## Scope
Strengthened the repository's static Kurmanji package validator so the K145 helper-test additions and the proposed full-prefix RPC authorization source contracts are checked on every run. Work was confined to the isolated branch. No lesson content, course keys, database, or deployment configuration was changed.

## Changes
Updated `scripts/validate_kurmanji_package.py` to:
1. Require all 16 current helper-level SQL regression case messages, including NULL/zero indexes, NULL/empty lesson order, empty progress, and final boundaries for the 26- and 12-lesson sequences.
2. Extract the proposed `can_read_lesson_content` and `complete_lesson` function definitions from the full-prefix migration and check that each remains SECURITY DEFINER with an empty search_path.
3. Check source tokens for identity, owner, enrollment, progress, verification, helper invocation, and the exact `PREVIOUS_LESSON_REQUIRED` error contract.
4. Check explicit revoke/grant contracts for both learner RPCs and the internal helper.

These are source-contract checks. They detect accidental deletion or weakening of expected SQL text but cannot prove PostgreSQL runtime semantics, effective ACLs, JWT identity, or RLS behavior.

## CI evidence
GitHub Actions run `44262966061` was triggered by this validator-file change on the isolated work branch.
At the time this report was written:
- PostgreSQL SQL parser: passed.
- Migration/seed parity: passed.
- Kurmanji package validator (including the new 16-case and RPC source contracts): passed.
- Playwright browser installation: still in progress; browser regression execution had not yet started.
- Supabase Preview: skipped because the branch is not associated with a Supabase Branch.

The workflow path filters still omit the proposed full-prefix migration and SQL test paths. That CI trigger configuration was deliberately not changed in K147; it remains a separately reviewed CI configuration task. A change to the validator itself does trigger the workflow.

## Safety and limitations
- No Supabase project was queried or modified.
- No migration was applied to Test or Production.
- No Auth, user, OTP, RLS, GRANT/REVOKE, workflow, deployment, PR, merge, or main-branch operation occurred.
- The proposed full-prefix migration remains unapplied; the database's deployed progression behavior is not changed by this repository-only work.
- No lesson content, lesson keys, course mapping, or application code was changed.

## Repository state
- Repository: `avasinim/zanztkurd`
- Work branch: `fix/kurmanji-ci-current-migration`
- Starting HEAD: `5f76b33cadf71ff255447a8bf4cc99a5d2c6202d`
- Pre-work backup: `backup/b3-k147-validator-regression-coverage-before-2026-11-18` at `5f76b33cadf71ff255447a8bf4cc99a5d2c6202d`
- Validator update commit: `00779dc496a0876b21d10c73b4334ec75f5b8513`
- Main baseline observed: `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`

Report records the observed CI state at authoring time; browser test completion must be verified separately.
