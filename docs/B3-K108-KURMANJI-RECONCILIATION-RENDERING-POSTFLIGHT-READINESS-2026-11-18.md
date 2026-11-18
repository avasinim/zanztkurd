# B3-K108 — Kurmanji reconciliation rendering and post-apply verification readiness

- Date: 2026-11-18
- Repository: `avasinim/zanztkurd`
- Work branch: `fix/kurmanji-ci-current-migration`
- Starting HEAD: `296a1c2deba981f86b1043cb0aa093980883d1b3`
- Pre-work backup: `backup/b3-k108-rendering-and-postflight-review-before-2026-11-18`
- Forward migration: `supabase/migrations/20261116120000_reconcile_kurmanji_seed_content.sql`

## Executive finding

The 12 static Kurmanji lesson pages targeted by the reconciliation migration have page-level `<h1>` headings that exactly match the corresponding target title values in the forward migration. Each page has a `.lesson-content` container with the expected `data-lesson-key`, and the shared runtime fetches `content_html` from `public.lesson_content` by that exact key.

This confirms the current repository's page-shell/title alignment for the 12 target lessons. It does not prove a post-migration live rendering result, because the migration has not been applied.

## 1. Static page shell and dynamic content flow

Inspected representative lesson shells and the shared `script.js` runtime.

- Kurmanji lesson HTML contains a stable `.lesson-content` container and its exact lesson key.
- `loadProtectedLessonContent` selects only `content_html` from `public.lesson_content`, filtered by the page's `data-lesson-key`.
- The runtime places returned HTML into the content container and exposes loading/error states.
- The shared spelling normalizer explicitly skips lesson-content nodes, protecting the lesson's original wording.
- The lesson page `<h1>` and document `<title>` are static HTML shell elements; the runtime does not fetch the database `title` column.

The distinction matters: reconciliation updates the database title and body, but the visible heading remains the static page heading. Therefore page-heading parity must be validated separately from the dynamic body.

## 2. Heading parity for all targeted pages

Compared the forward migration's 12 target title values with the static `<h1>` of each matching HTML page.

| Course | Target pages | Exact heading matches |
|---|---:|---:|
| Course 1 | 8 | 8 |
| Course 2 | 4 | 4 |
| **Total** | **12** | **12** |

No static heading edit was required or made.

## 3. Access and progression boundaries

The shared runtime currently:
- obtains an authenticated session before revealing protected lesson pages;
- checks site-owner status and student enrollment;
- uses `can_read_lesson_content` for the sequential lesson gate;
- defines ordered Kurmanji sequences of 26 and 12 lesson keys;
- fetches lesson content by the exact page key.

The forward migration preserves `lesson_key` and `course_id` and is statically guarded to update only `title`, `content_html`, and `updated_at` in `public.lesson_content`. The K107 CI guard protects this write boundary.

## 4. Post-apply verification checklist (for an explicitly approved test run)

After a test-only application, verify in this order:

1. **Migration ledger:** the test project's ledger records `20261116120000_reconcile_kurmanji_seed_content` exactly once.
2. **Row scope:** exactly the 12 intended keys have the target title/body values; all 26 + 12 Kurmanji keys remain present.
3. **Effective payload parity:** run `scripts/validate_kurmanji_seed_parity.py` and `scripts/validate_kurmanji_package.py`.
4. **Progress preservation:** compare pre/post aggregate counts and the existing progress keys; ensure no enrollment or progress rows were inserted, deleted, or modified by the migration.
5. **Page shell:** verify the 12 static `<h1>` values still match the reconciled database titles.
6. **Rendered content:** use an authenticated, enrolled test account to open the 12 target lessons; confirm each expected body loads, the error placeholder disappears, and the page remains readable at desktop and mobile widths.
7. **Progression:** verify the next lesson remains locked until its predecessor is completed; then verify the completion RPC and next-lesson navigation still work.
8. **Negative access tests:** verify an unauthenticated visitor, a non-enrolled account, and a student who has not completed the predecessor cannot read a later lesson body.

A successful static CI run alone cannot replace these post-apply checks against the test project.

## 5. Safety status

- No migration applied to test or production.
- No database writes or migration-ledger changes.
- No lesson body, title, static page, runtime, enrollment, or progress row changed.
- No DDL, RLS, grants, Auth, Storage, or RPC changes.
- No deployment, merge, PR, or `main` update.
- No student identifiers or lesson bodies retrieved from live databases.

## Backup and change record

- Pre-work backup: `backup/b3-k108-rendering-and-postflight-review-before-2026-11-18` at `296a1c2deba981f86b1043cb0aa093980883d1b3`.
- Post-work backup: to be created at the report commit.
- Change: this audit report only. No application or lesson source code changed.

## Recommendation

The repository-side prerequisites are now documented: preflight baseline, content-only write scope, learner-progress boundary, dynamic rendering path, and all 12 target heading matches. The remaining meaningful verification requires applying the forward migration to the designated test project and exercising authenticated learner flows afterward. Do not apply it to production as part of this step.
