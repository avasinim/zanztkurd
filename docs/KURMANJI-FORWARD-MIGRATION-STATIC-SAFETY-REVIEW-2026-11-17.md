# Kurmanji Forward Migration — Static Safety Review and Non-Production Execution Gate

Date: 2026-11-17  
Branch reviewed: `fix/kurmanji-ci-current-migration`  
Reviewed HEAD: `98d48f8c6e337482601b3a9fc6a97181f254abfe`  
Forward migration: `supabase/migrations/20261116120000_reconcile_kurmanji_seed_content.sql`  
Migration blob: `f7235b1f7919d4cf5af90e200e138d1cb45f9c47`  
Parity validator blob: `800e8fb94200470ebc4b51b0c71d77ca9e9c39c8`

## Executive result

The forward migration is internally coherent at source level: it is transactional, locks and verifies the 12 expected historical rows before writing, limits the upsert to the explicit 12-row overlay, and aborts unless exactly 12 rows are changed. The historical release migration is separately protected by a fixed Git blob SHA in the parity validator.

This is a **static source review**, not a database execution test. The repository does not provide a complete checked-in definition of `public.lesson_content`; in particular, the unique constraint/index required by `ON CONFLICT (lesson_key)` cannot be independently established from the checked-in schema/migration set reviewed here. The migration must therefore remain unexecuted until a disposable/staging database with the actual target schema has been used to verify the assumptions below.

## 1. Transaction and preflight review

The migration:

1. Starts an explicit transaction.
2. Joins `public.lesson_content` against exactly 12 hard-coded expected tuples.
3. Compares `lesson_key`, `course_id`, `title`, and `content_html`; title/content comparisons use `IS NOT DISTINCT FROM`, so NULL differences do not silently pass.
4. Locks the matched target rows with `FOR UPDATE OF actual`.
5. Checks `ROW_COUNT = 12`; otherwise raises SQLSTATE `55000` before the write block.
6. Applies the 12-row upsert in a second DO block.
7. Updates only title, content_html and updated_at on conflict, and only where the existing course_id equals the proposed course_id.
8. Checks that exactly 12 rows were returned by the upsert; otherwise raises and the transaction rolls back.
9. Commits only after both guards pass.

The preflight lock protects the matched rows from concurrent updates between comparison and write, subject to the database's normal transaction/locking semantics. Missing, changed, or course-mismatched rows fail the 12-row preflight rather than being silently overwritten.

## 2. Scope and write-set

- The forward overlay contains the 12 explicitly enumerated lesson keys previously identified as post-release drift.
- The upsert does not update course metadata, enrolments, progress, policies, functions, grants, or unrelated lesson rows.
- No historical migration is edited or replayed by this file.
- The migration changes `updated_at` for the 12 target rows.
- The preflight requires all 12 rows to exist with the exact historical release payload; it is not an insert/backfill migration for missing rows.

## 3. Critical schema assumptions not proven by this repository snapshot

The migration uses `ON CONFLICT (lesson_key)`. PostgreSQL requires a matching unique constraint or unique index on `lesson_key` for that conflict target.

The reviewed checked-in `supabase/schema.sql` does not define `public.lesson_content`, and the checked-in migrations reviewed do not create that table or establish its complete constraint/owner/ACL state. The historical Kurmanji migration also uses `ON CONFLICT (lesson_key)`, which demonstrates a repository-level assumption, but does not prove the live table's current unique index still exists.

Before any non-production execution, obtain and inspect a schema-only dump or equivalent metadata from the disposable target, confirming at minimum:

- `public.lesson_content` exists with the expected column types and nullability;
- a valid, non-partial unique constraint/index covers `lesson_key`;
- the expected 12 lesson keys exist exactly once;
- the migration execution role has the required SELECT/INSERT/UPDATE privileges and bypasses or satisfies applicable RLS;
- relevant triggers and constraints do not rewrite/reject the proposed values unexpectedly;
- the migration ledger does not already contain this migration version.

No live or staging metadata was queried for this review.

## 4. Operational considerations

- The explicit transaction provides all-or-nothing behavior, but row locks can wait behind concurrent activity. The migration does not set a local `lock_timeout` or `statement_timeout`; use an approved maintenance window and an operator-controlled timeout policy in the non-production test.
- A failed preflight or affected-row check aborts the transaction. Preserve the complete database error output in the test record.
- Verify before/after row counts and exact payload hashes for all 12 keys in the disposable database, then deliberately test a changed-row precondition to confirm the migration aborts without partial writes.
- Test a rollback/discard of the disposable database after the exercise. Do not use production as the test target.

## 5. CI evidence and its limits

The workflow `.github/workflows/validate-kurmanji-package.yml` watches the new migration, validator, seed files and relevant lesson sources. The successful GitHub Actions run is:

- Run: [44031226651](https://github.com/avasinim/zanztkurd/actions/runs/44031226651)
- Tested commit: `0317fd4ff452c38f1700a5cabf3255ec89bb8dce`
- Job: `kurmanji-package-integrity`
- Steps passed: PostgreSQL SQL parser, effective seed parity, package validation, Playwright installation, and north-circle browser regression tests (3/3).

The tested commit is an ancestor of the reviewed HEAD through the recorded commit chain. Later changes through reviewed HEAD are documentation-only; the migration and validator blobs above are the versions inspected here.

CI establishes SQL parseability and repository-level source parity, not successful execution against a real PostgreSQL schema. The browser tests use a mocked Supabase boundary and are not evidence of live RLS, ACL, PostgREST, or data persistence behavior.

## 6. Decision and next safe gate

**Static review: conditionally acceptable for isolated execution testing. Production readiness: not established.**

Next steps, in order:

1. Obtain a disposable database built from the same schema/bootstrap lineage as the intended target, without copying learner personal data.
2. Verify the schema assumptions in section 3, especially the unique index on `lesson_key`.
3. Apply the migration only in that disposable database, recording migration-ledger state and exact before/after payload hashes.
4. Test both the successful path and a deliberately modified preflight row; verify failure is atomic.
5. Inspect the resulting 12 rows and confirm the other 26 rows remain unchanged.
6. Only after a separate evidence review should production deployment be considered. This document does not authorize it.

## 7. Actions not taken

- No Supabase connection or database query was made.
- No migration was executed in staging or production.
- No production schema, table, policy, grant, function, migration ledger, or learner data was changed or read.
- No lesson seed, migration, validator, workflow, application source, PR, deployment, or `main` branch was changed in this review.
- This document is a documentation-only addition on the isolated work branch.

## Backup record

- Pre-work backup: `backup/kurmanji-forward-migration-safety-review-before-2026-11-17`
- Starting HEAD: `98d48f8c6e337482601b3a9fc6a97181f254abfe`
- Post-work backup: to be recorded after the documentation commit and exact ref/blob verification.
