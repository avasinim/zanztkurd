# Kurmanji browser and CI execution evidence audit — 2026-11-17

## 1. Scope and correction

This addendum checks the actual CI workflow definitions, browser-test source, and the latest GitHub Actions runs visible for the isolated work branch. It corrects an earlier preliminary inventory statement: the repository **does include Playwright**. The relevant test is `scripts/test_north_circle_ui.py`, and `.github/workflows/validate-kurmanji-package.yml` installs Playwright and Chromium.

This remains a repository/CI evidence review. No workflow was dispatched, no test was run locally, no Supabase project was contacted, and no code, workflow, lesson, SQL, CI setting or production resource was changed.

## 2. What browser testing exists

File: `scripts/test_north_circle_ui.py`

The script launches a local Python HTTP server and Chromium with a 390×844 viewport. It contains three Playwright tests:

1. North-circle catalog: hides the general catalog and routes to Course 1 and Course 2 plan pages.
2. North-circle learning page: hides/restores the general curriculum and displays two Kurmanji course choices.
3. Mobile catalog: checks horizontal overflow at one viewport.

### Important mock boundary

The script replaces the Supabase client locally:
- `auth.getSession()` returns a synthetic verified-looking user.
- `rpc()` returns `true` for every RPC name, including `is_site_owner` and all other authorization/progression RPC calls.
- The Supabase config is replaced with an `example.invalid` URL.
- The Supabase JS CDN request is stubbed.

Therefore these are real Chromium UI tests over local static files, but **not real Supabase authentication or authorization tests**. They do not load a protected Kurmanji lesson page, assert lesson-body hiding, test direct PostgREST requests, exercise a real enrollment, or verify server-side sequence denial/persistence. The unconditional RPC success stub bypasses precisely those decisions.

## 3. CI workflow structure

File: `.github/workflows/validate-kurmanji-package.yml`

The job runs these stages in order:

1. Set up Python.
2. Install `pglast`.
3. Parse the 2026-10-24 Kurmanji migration and five split seed SQL files.
4. Compare exact migration/seed lesson tuples.
5. Run static package validation.
6. Install Playwright and Chromium.
7. Run `scripts/test_north_circle_ui.py`.

Because the job stops on a failed step, failures in stages 3–5 prevent the browser-test installation and execution.

The workflow path filters include the work branch `fix/kurmanji-ci-current-migration`, but the current documentation-only commit did not match its listed paths. The workflow was therefore not triggered for the current HEAD by that commit.

## 4. Latest five branch workflow runs inspected

The latest five runs returned for `fix/kurmanji-ci-current-migration` are all completed with `failure`. Their job steps and decoded logs show:

| Run | Commit | First failing step | Observed failure |
|---|---|---|---|
| [881](https://github.com/avasinim/zanztkurd/actions/runs/43863754820) | `d87dc6230d42acc292be1293c69bf92743487e25` | Exact migration/seed parity | First tuple differs; Course 1 lesson 01 key matches but tuple text differs |
| [880](https://github.com/avasinim/zanztkurd/actions/runs/43863627898) | `8e0b5bc8cf2052ed66f276dc3d7f66b0951a5847` | Exact migration/seed parity | Tuple differs at row 7, Course 1 lesson 07 |
| [879](https://github.com/avasinim/zanztkurd/actions/runs/43863619594) | `658e0c3958fadd826b6b1c6d4a1adbebec082913` | PostgreSQL SQL parser | Syntax error in `docs/kurmanji-content-seed-part-01.sql`, near `(`, index 32801 |
| [878](https://github.com/avasinim/zanztkurd/actions/runs/43863516651) | `f90e42d79c788d6366c4d35a718f8f4d8a7be7a1` | PostgreSQL SQL parser | Same seed-file syntax error, near `(`, index 32801 |
| [877](https://github.com/avasinim/zanztkurd/actions/runs/43863503758) | `b0dba3f7183b762b4c0550a8843985abf96bf0de` | PostgreSQL SQL parser | Syntax errors in both the 2026-10-19 migration (index 33879) and seed part 01 (index 32801) |

For all five inspected runs, the later package validator, Playwright installation, and Playwright browser tests were **skipped**. Thus these five runs provide no browser-test pass/fail result.

These are historical runs on earlier commits, not a claim about the current source state. The current branch HEAD at audit time is `a8d4760722e987ab04ff8af78f965a7702d9f732`.

## 5. Current HEAD check status

For current HEAD `a8d4760722e987ab04ff8af78f965a7702d9f732`:
- GitHub check-runs returned one `Supabase Preview` check with conclusion `skipped`; its message says the branch is not associated with a Supabase Branch.
- Commit status returned `pending` with zero status entries.
- No Kurmanji package workflow run was returned for this documentation-only HEAD. The package workflow's path filters do not include this new audit document.

Do not describe current HEAD as having passed CI. Also do not describe the skipped Supabase Preview check as a failed migration or a database test.

## 6. Additional source-level CI target mismatch

The current source still has a migration target mismatch:
- `scripts/validate_kurmanji_sql.py` parses the 2026-10-24 migration.
- `scripts/validate_kurmanji_seed_parity.py` compares seeds against the 2026-10-24 migration.
- `scripts/validate_kurmanji_package.py` reads the 2026-10-19 migration for its cross-course safety-string assertions.
- The workflow path filter watches the 2026-10-24 migration but not the 2026-10-19 file.

This must be resolved only after the authoritative migration and remote ledger are established. Do not make the validator silently point to a different file before the P0 migration-lineage decision is approved.

## 7. Coverage status — evidence-based

| Test area | Repository implementation | Execution evidence in five latest runs |
|---|---|---|
| PostgreSQL SQL syntax | Static `pglast` parser | Ran in runs 877–879; failed there. Passed in 880–881. |
| Exact 38-row migration/seed parity | Static tuple comparison | Ran and failed in 880–881. |
| Lesson page/package integrity | Static Python validator | Skipped in all five runs due earlier failure. |
| North-circle UI and mobile overflow | Three local Chromium/Playwright tests with Supabase stub | Skipped in all five runs; no result from these runs. |
| Real authentication/session persistence | No real Supabase browser fixture in this test | Not covered by this suite. |
| Protected lesson direct URL and PostgREST access | Not exercised by this suite | Not covered. |
| RLS policy enforcement and learner/owner boundaries | No disposable database test job in this workflow | Not covered. |
| Sequential completion and persisted progress | RPC stub returns true; no real database | Not covered. |
| Hawar NFC/NFD, keyboard, search and persistence acceptance | A 20-case specification exists; no execution harness/run evidence in this audit | Not demonstrated as run. |

## 8. Recommended next steps (proposal only)

1. Resolve the P0 migration lineage and choose the authoritative migration before changing CI targets.
2. Re-run the existing static SQL and parity checks on the approved source snapshot; retain complete logs.
3. Run the package validator and Playwright suite to completion. The browser job should report three explicit test results.
4. Improve the mocked browser test separately: use named per-case RPC responses instead of returning true for every RPC; add protected lesson route assertions for anonymous, enrolled, not-enrolled, owner, RPC-error and unknown lesson-key cases. These remain UI tests, not RLS proof.
5. Add an opt-in integration workflow against a disposable Supabase project, with synthetic users and no production credentials. Test direct SELECT denial/allowance, cross-course isolation, out-of-order completion denial, idempotent completion and own-progress boundaries.
6. Execute the Hawar Unicode acceptance specification separately and record each case as PASS, FAIL, BLOCKED or NOT RUN with reproducible evidence.
7. Do not dispatch workflows, change source/CI, connect to Supabase, run migrations, or alter production until separately approved.

## 9. Explicit non-actions

- No CI workflow was dispatched or rerun.
- No test was executed locally during this audit.
- No Supabase project or production database was accessed.
- No code, workflow, migration, SQL, lesson, seed, policy, grant, CI configuration, deployment or PR was changed.
- No merge, rebase or force-push was performed.

## 10. Change and backup record

- Repository: `avasinim/zanztkurd`
- Work branch: `fix/kurmanji-ci-current-migration`
- Starting HEAD: `a8d4760722e987ab04ff8af78f965a7702d9f732`
- Pre-work backup: `backup/kurmanji-browser-ci-coverage-audit-before-2026-11-17`
- Change type: documentation only.
