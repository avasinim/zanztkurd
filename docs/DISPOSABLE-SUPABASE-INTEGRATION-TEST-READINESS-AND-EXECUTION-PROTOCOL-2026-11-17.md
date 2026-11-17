# Disposable Supabase integration-test readiness and execution protocol — 2026-11-17

## Purpose

Turn the existing Kurmanji release-test proposals into a safe, executable acceptance protocol while identifying prerequisites that currently prevent a clean-room database run.

This is a planning/documentation artifact only. It does not authorize creating a Supabase project, connecting to any existing project, applying migrations, creating users, running SQL, changing CI, or deploying.

## 1. Current readiness decision

**Status: NOT READY TO APPLY THE checked-in migration chain to a fresh disposable database.**

The existing `docs/kurmanji-release-test-plan.md` and `docs/KURMANJI-CI-AND-ACCESS-CONTROL-TEST-COVERAGE-GAP-AUDIT-2026-11-16.md` correctly specify many useful learner scenarios. However, the repository does not contain a complete bootstrap definition for `public.lesson_content`:
- no checked-in `CREATE TABLE public.lesson_content` was found;
- the baseline `supabase/schema.sql` omits the table;
- the 2026-10-19 and 2026-10-24 Kurmanji migrations assume the table exists;
- both content migrations use `ON CONFLICT (lesson_key)`, so a unique constraint/index on `lesson_key` must already exist;
- the 2026-10-10 index and policy migrations also assume the table already exists.

A fresh disposable project cannot be considered reproducible until the authoritative table DDL, required constraints, grants, and RLS baseline are recovered from an approved source. Do not invent a table definition from the columns referenced by later migrations; that could omit important defaults, constraints, triggers, grants, or policy dependencies.

## 2. Preconditions before any disposable project is provisioned

Obtain and record:
1. The authoritative DDL for `public.lesson_content`, including column types, nullability, defaults, primary/unique constraints, foreign keys, indexes, triggers, owner, grants and RLS state.
2. The intended baseline for dependent tables/functions: `courses`, `enrollments`, `lesson_progress`, `site_owners`, `is_site_owner()`, `student_has_enrollment()`, and any verification helpers referenced by the migrations.
3. The intended migration chain and canonical Kurmanji content payload. The repository contains both 2026-10-19 and 2026-10-24 same-purpose migrations with different payloads and function bodies. Do not apply both blindly or assume the older migration is an innocuous prerequisite.
4. A clear decision on whether the disposable environment should model a clean bootstrap or a clone of the known production schema. These are different tests and must be recorded separately.
5. Explicit approval to create/use a disposable project and to apply the approved migration set there. This approval does not imply permission to access or modify production.

If the authoritative bootstrap cannot be recovered, stop at source-level static validation and report the missing prerequisite.

## 3. Separate test environments

### A. Clean bootstrap test

Purpose: prove the documented bootstrap and migrations can construct the expected schema from zero.

Required inputs: full authoritative schema/bootstrap plus a canonical ordered migration set. The current repository does not yet supply these inputs for `lesson_content`, so this test is blocked.

### B. Upgrade-path test

Purpose: prove the approved migration set upgrades a disposable database that matches a documented pre-Kurmanji baseline.

Required inputs: reproducible baseline schema and migration ledger state. The current repository does not identify the origin of `lesson_content` or the exact production migration ledger, so this test is also blocked pending evidence.

Do not substitute a production database for either environment.

## 4. Metadata acceptance checks before learner scenarios

Once the disposable project is properly bootstrapped, record these checks before inserting synthetic learner fixtures:

| Area | Required evidence | Acceptance |
|---|---|---|
| Relation exists | `public.lesson_content` relation metadata | Exactly one expected table |
| RLS | `relrowsecurity`, `relforcerowsecurity` | RLS enabled; force-RLS expectation explicitly documented |
| Policies | Full policy inventory, command, roles, permissive/restrictive flag, USING and WITH CHECK | No unexplained policy; no broad permissive alternate path |
| Table ACL | Relation owner and effective grants for PUBLIC, anon, authenticated and service roles | Least-privilege grants match approved design |
| Unique key | Unique constraint/index on `lesson_key` | Present and valid; required by `ON CONFLICT (lesson_key)` |
| Course index | Index on `course_id` | Present and valid |
| RPC definitions | Function identity, language, volatility, SECURITY DEFINER, fixed search_path | Match approved source |
| RPC EXECUTE ACL | Effective role grants, including inherited PUBLIC grants | Anonymous/public execution denied where intended |
| Migration ledger | Exact applied versions and order | Matches the approved chain; no ambiguous duplicate version |
| Course rows | Course identifiers and totals | Course 1 = 26; Course 2 = 12 |
| Content keys | Exact expected keys, unique and course-bound | 26 + 12, no missing/duplicate/cross-course keys |

Do not treat an expected value in source code as proof that the live test database has that value; capture the query output for each run.

## 5. Synthetic identity and fixture rules

Use only synthetic accounts created for the disposable project:
- anonymous/no-session browser context;
- verified but unenrolled learner A;
- verified enrolled learner B for Course 1;
- verified enrolled learner C for Course 2;
- second enrolled learner D to test cross-user progress isolation;
- designated owner fixture only if the test project's owner-check mechanism can be safely configured without using a real personal identity.

Do not copy production users, emails, phone numbers, access tokens, enrollment records, or progress. Do not put passwords, JWTs, service-role keys, or project secrets in Git, CI logs, screenshots, or this report.

If the owner bypass cannot be safely represented with a synthetic fixture, mark that case BLOCKED; do not use the real production owner identity.

## 6. Required database/API test cases

Record exact request role, course, key, expected result, actual result, sanitized error, and timestamp.

| ID | Actor and action | Expected |
|---|---|---|
| DB-01 | Anonymous role SELECTs lesson 01 | Denied; zero lesson body returned |
| DB-02 | Authenticated verified but unenrolled learner SELECTs lesson 01 | Denied |
| DB-03 | Enrolled Course 1 learner reads Course 1 lesson 01 | Allowed |
| DB-04 | Enrolled Course 1 learner reads Course 1 lesson 02 before completing lesson 01 | Denied |
| DB-05 | Same learner completes Course 1 lesson 01 through RPC, then reads lesson 02 | Completion succeeds once; lesson 02 allowed |
| DB-06 | Course 1 learner attempts to read Course 2 lesson 01 without Course 2 enrollment | Denied |
| DB-07 | Course 2 learner attempts to read Course 1 lesson 01 without Course 1 enrollment | Denied |
| DB-08 | Learner calls completion RPC for lesson 03 before lesson 02 | Rejected; no progress row created |
| DB-09 | Learner repeats valid completion for the same key | Idempotent; exactly one progress row |
| DB-10 | Learner A attempts to read or modify learner B's progress | Denied |
| DB-11 | Enrolled learner supplies an unknown lesson key | Denied by read RPC/RLS and rejected by completion RPC |
| DB-12 | Enrolled learner supplies a valid key paired with the wrong course ID | Denied |
| DB-13 | Synthetic owner accesses a later lesson without learner progression | Allowed only if the approved owner policy explicitly intends this |
| DB-14 | Ordinary authenticated learner attempts owner-only RPC behavior | Denied |
| DB-15 | Authenticated role calls protected RPC; anon/PUBLIC attempts same RPC | Authenticated behavior follows policy; anon/PUBLIC execution denied |
| DB-16 | Read all expected lesson-key metadata for both courses | Exactly 26 and 12 expected rows, no duplicate keys |
| DB-17 | Complete every lesson in a synthetic course fixture | Counts reach 26/26 or 12/12; course completion state changes exactly as specified |
| DB-18 | Refresh/re-authenticate after progress changes | Persisted state remains consistent |

Important: DB-01/02/04 must test direct table/PostgREST access, not merely browser redirects or RPC return values. A client-side gate passing or failing is not a substitute for the database assertion.

## 7. Browser acceptance cases

Use a real Supabase client and real disposable-project auth; do not stub every RPC to return true.

For each scenario capture:
- initial route and role (no credentials);
- visible page state before and after access check;
- network outcome for the content SELECT (status only and sanitized metadata; never capture lesson body);
- console errors;
- expected navigation or error state;
- whether the body remained hidden when access was denied;
- persisted progress after refresh and a fresh login.

Required scenarios:
1. no session → sign-in route; no body request succeeds;
2. verified, not enrolled → correct course enrollment route; direct SELECT denied;
3. enrolled learner, lesson 01 → content allowed;
4. enrolled learner, lesson 02 before predecessor completion → denied;
5. complete lesson 01 → lesson 02 becomes readable;
6. complete course 1 lesson → course 2 remains independently locked;
7. refresh and sign in again → progress remains persisted;
8. owner → only documented owner bypass;
9. RPC/network error → explicit failure/retry state, not silent success;
10. unknown lesson number → route is rejected and no content query is made.

Run desktop and mobile viewport checks, but keep the auth/RLS assertions independent of visual layout tests.

## 8. Current known frontend regression to include

The source audit identified an invalid-index edge case in `hasPreviousLessonCompleted()`: `indexOf(target)` returns -1 for an unknown key, and the current `index <= 0` branch treats it like the first lesson. Add a focused test proving an unknown key is rejected before any content SELECT.

No fix is included in this protocol. A code change requires a separate approved patch, tests and backups.

## 9. CI integration: opt-in and isolated

Do not add a CI workflow until the bootstrap and migration source are resolved and a disposable environment can be provisioned deterministically.

When approved, the integration job should:
- run only on explicit manual dispatch or a dedicated integration branch initially;
- use isolated project credentials stored only in CI secrets;
- never reference production project identifiers or credentials;
- create synthetic test users and remove/discard the entire disposable project after the run;
- run the migration ledger and metadata assertions before learner scenarios;
- fail closed if any unexpected policy, grant, missing constraint, or migration mismatch appears;
- avoid logging response bodies, tokens, user PII or secrets;
- publish a sanitized PASS/FAIL artifact with commit SHA and migration versions;
- retain current static CI separately so routine checks do not depend on a paid hosted Supabase project.

## 10. Go/no-go gates

**GO to provision disposable test** only when:
- authoritative `lesson_content` DDL is recovered;
- the baseline schema and dependent function definitions are reproducible;
- the canonical migration set and payload source are approved;
- explicit approval to create/use the disposable project is given.

**GO to mark integration tests passed** only when:
- metadata acceptance checks pass;
- all applicable DB/API cases pass;
- browser acceptance cases pass;
- test output is saved without secrets or personal data;
- the exact source commit and migration ledger are recorded.

**NO-GO** if:
- RLS is disabled or unexpected permissive policies/grants exist;
- the unique lesson key constraint is absent;
- deployed RPC definitions/ACLs differ from approved source;
- migrations depend on missing objects;
- any locked or cross-course lesson body is returned;
- test evidence is based only on mocked RPCs or frontend redirects.

## 11. Change and backup record

- Repository: `avasinim/zanztkurd`
- Work branch: `fix/kurmanji-ci-current-migration`
- Starting commit: `deefaf71b93bdd24de6581b7130ba6fb79911f5a`
- Pre-work backup: `backup/disposable-supabase-test-readiness-before-2026-11-17`
- Change type: documentation only.
- No Supabase project created or connected; no SQL run; no migrations applied; no test users created; no CI, code, lesson, PR or production changes.
