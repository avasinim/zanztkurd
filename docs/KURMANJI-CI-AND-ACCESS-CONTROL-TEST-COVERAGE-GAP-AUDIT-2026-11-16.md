# Kurmanji CI and access-control test coverage gap audit — 2026-11-16

## Scope

Read-only review of the current branch's automated validation and release test plan. This document distinguishes static source checks, mocked browser checks, and real database authorization tests.

Files reviewed:
- `scripts/test_north_circle_ui.py`
- `.github/workflows/validate-kurmanji-package.yml`
- `scripts/validate_kurmanji_package.py`
- `scripts/validate_kurmanji_sql.py`
- `scripts/validate_kurmanji_seed_parity.py`
- `docs/kurmanji-release-test-plan.md`
- The protected-content and progression implementation examined in the companion access/RLS source audit.

No tests were run. No Supabase project was contacted. No database, CI workflow, source code, lesson content, or test was changed.

## Executive finding

The current CI provides useful static integrity checks and a small mocked-browser UI regression suite. It does **not** currently demonstrate that the protected Kurmanji lesson access rules work against PostgreSQL RLS, authenticated Supabase sessions, enrollment state, or server-side sequence enforcement.

The browser test replaces Supabase with a stub. Its RPC stub returns `true` for every RPC call (including owner and enrollment/progression checks), and its session stub provides a verified-looking user. The three tests then exercise north-circle catalog routing, learning pathway visibility, and mobile horizontal overflow. They do not navigate protected lesson pages or assert authorization denial/allowance.

This is a test-coverage gap, not evidence that the database controls are broken. The actual database policy/function definitions remain unverified in the live target environment.

## 1. What CI currently proves

### SQL syntax

`scripts/validate_kurmanji_sql.py` parses the 2026-10-24 migration and five split seed SQL files using `pglast`. It proves that the files parse as PostgreSQL syntax. Its own docstring correctly states that it does not establish schema validity or payload equivalence.

### Migration-to-seed parity

`scripts/validate_kurmanji_seed_parity.py` extracts the lesson tuples and checks:
- exactly 38 tuples in each source;
- unique lesson keys;
- exact row text and order parity;
- 26 Course 1 keys followed by 12 Course 2 keys.

This is a useful source artifact integrity check. It does not execute inserts, validate constraints against a real schema, or prove that the deployed database contains those rows.

### Package and navigation integrity

`scripts/validate_kurmanji_package.py` checks expected lesson page files, lesson keys, shared script markers, navigation links, course plan order, dashboard routing markers, and selected static SQL safety strings. These are source-text assertions, not execution of authorization behavior.

The validator currently reads the older 2026-10-19 migration for its cross-course safety-string checks, whereas the SQL parser and parity validator read the 2026-10-24 migration. The workflow path filter watches the 2026-10-24 migration, not the 2026-10-19 migration. The companion migration-lineage audit records this target-selection mismatch and the differing 13/38 lesson tuples. It remains a source/CI maintenance risk.

### Mocked browser regression

`scripts/test_north_circle_ui.py` contains three tests:
1. North-circle catalog hides the general catalog and routes to both Kurmanji course plan pages.
2. North-circle learning pathway visibility toggles correctly and exposes two Kurmanji course choices.
3. Mobile catalog has no horizontal overflow at a 390×844 viewport.

The test setup:
- stubs `window.supabase.createClient`;
- returns a session with `email_confirmed_at` populated;
- returns `true` for every RPC result;
- routes the Supabase config to a fake `example.invalid` endpoint;
- stubs the Supabase JS CDN script.

Consequently, it does not test real authentication, owner determination, enrollment checks, `can_read_lesson_content`, `complete_lesson`, RLS, progress persistence, or sequential denial. It also does not load a protected Kurmanji lesson page.

## 2. CI trigger and workflow scope

The workflow installs Python, `pglast`, Playwright, and Chromium, then runs the three static validators and the north-circle UI tests. It has no disposable Supabase service/project, no migration application step, no authenticated learner fixture, and no database-backed RLS test stage.

The workflow watches the 2026-10-24 migration and selected frontend/seed/validator files. It does not watch the older 2026-10-19 same-purpose migration, even though the package validator reads that older file. This should be reconciled only after the migration canonicalization decision is approved.

## 3. Coverage matrix

| Requirement | Current automated evidence | Status |
|---|---|---|
| 26 + 12 lesson key inventory | Static SQL and package validators | Covered statically |
| Migration and split seed exact parity | Tuple comparison | Covered statically |
| SQL grammar | PostgreSQL parser | Covered statically |
| Course routing and visible UI | Mocked Playwright | Partially covered |
| Mobile catalog overflow | Mocked Playwright | Covered for one viewport/path |
| Unauthenticated direct lesson read denied | No real auth/RLS test | Not covered |
| Authenticated but not enrolled read denied | No real enrollment/RLS test | Not covered |
| Enrolled learner reads lesson 01 | No database-backed test | Not covered |
| Lesson 02 denied before lesson 01 completion | RPC always mocked true; no DB test | Not covered |
| Course 1 completion does not unlock Course 2 | No DB test | Not covered |
| RPC rejects non-next lesson completion | No DB test | Not covered |
| Completion persists and is idempotent | No DB test | Not covered |
| Other learner cannot read another user's progress | No DB test | Not covered |
| Owner bypass is limited to intended owner | RPC always mocked true | Not covered |
| Effective deployed RLS policies/grants | No live catalog inspection | Not verified |
| Real browser auth/session persistence | Supabase stub | Not covered |

## 4. Recommended test architecture (proposal only)

Keep the existing fast static and mocked UI checks. Add a separate opt-in integration job against a disposable Supabase project, never production.

### Layer A — local deterministic unit/integration tests

- Test the frontend gate with a controllable mock that returns explicit cases, rather than an RPC stub that always returns true.
- Include anonymous, enrolled, not-enrolled, owner, RPC-error, and expired-session outcomes.
- Assert that the lesson body remains hidden until the access gate succeeds.
- Assert that an RPC failure is represented as an error/retry state and is not silently treated as an empty progress record.
- Verify direct protected lesson URL access, not just course-plan navigation.

### Layer B — disposable Supabase migration and RLS tests

Provision a dedicated throwaway project/database and apply only the explicitly approved canonical migration set. Create synthetic test users and enrollments; never use real learner data.

Required cases:
1. Anonymous direct SELECT of `lesson_content` is denied.
2. Verified non-enrolled user is denied.
3. Enrolled user can read Course 1 lesson 01 and Course 2 lesson 01.
4. Course 1 lesson 02 is denied before Course 1 lesson 01 completion.
5. Completing Course 1 lesson 01 unlocks only Course 1 lesson 02.
6. Course 2 lesson 01 completion does not unlock Course 1 lesson 02, and vice versa.
7. Direct RPC completion of a non-next lesson is rejected for a learner.
8. Repeating a valid completion does not create duplicate progress.
9. One user cannot read or modify another user's progress.
10. Owner bypass is limited to the configured owner identity and does not become a general authenticated-user bypass.
11. Course totals and completion state are 26 and 12 respectively.
12. Unexpected permissive policies do not create an alternate SELECT path.

### Layer C — real browser against disposable project

Use actual Supabase client/auth and the disposable project:
- sign in as anonymous/no-session, verified non-enrolled, enrolled learner, and owner test accounts;
- attempt direct URL navigation and direct PostgREST reads;
- inspect browser console and network outcomes;
- complete lessons, refresh, sign out/in, and confirm persisted progress;
- test a middle and final lesson boundary in each course.

### Layer D — release evidence

For each run, record:
- disposable project identifier (non-secret);
- migration commit and migration ledger versions;
- test account role, not credentials or personal data;
- test name, PASS/FAIL, timestamp;
- browser/runner version;
- relevant sanitized error or policy output.

Do not call the package release-ready based on mocked browser tests alone. Mark database/RLS and real-auth browser acceptance as pending until these tests actually run.

## 5. Migration lineage gate

Before adding a disposable DB workflow, resolve the companion audit's migration ambiguity:
- determine the actual recorded migration version in the authorized target environment;
- choose the canonical migration file and exact intended lesson payload;
- align package safety assertions, SQL parser, seed parity, and workflow path filters to the same canonical source;
- preserve a no-production-change boundary during validation.

Do not run `supabase db push`, migration repair, or any production SQL based on this source audit.

## 6. Backup and change record

- Work branch: `fix/kurmanji-ci-current-migration`
- Starting commit: `3d5587cca629995080b18a423ef3c666181a3ab0`
- Pre-work backup: `backup/access-test-coverage-before-2026-11-16`
- Post-work backup: to be recorded after the dossier commit.
- This commit adds documentation only. No application, SQL, workflow, test, lesson, or deployment changes.
