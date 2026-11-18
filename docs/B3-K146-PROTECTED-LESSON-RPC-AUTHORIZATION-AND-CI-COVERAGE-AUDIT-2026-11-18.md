# B3-K146 — Protected-Lesson RPC Authorization and CI Coverage Audit (2026-11-18)

## Scope
Repository-only review of the protected lesson browser gate, the canonical deployed-source RPC migration, the proposed full-prefix migration, helper SQL regression tests, static source validator, and the existing GitHub Actions trigger configuration. No Supabase project was queried or modified.

## Findings

### 1. Browser gate delegates sequence authority to the server
The shared `script.js` hides protected lesson pages before access checks, obtains the current Supabase session, checks owner status and enrollment, then calls `can_read_lesson_content(p_course_id,p_lesson_key)` before loading lesson HTML. The content query itself is RLS-protected. This is the correct architectural direction: browser-side checks are not the authorization boundary.

The browser gate's sequence check is a server RPC; it does not independently infer prerequisite completion from local storage. The legacy `allowOrRedirect` function is defined but the current global click interception is intentionally disabled, so direct navigation must continue to be protected by the destination page gate and RLS.

### 2. The canonical tracked migration still has the predecessor-only rule
The validator's `latest_migration_path` points to `20261024122051_add_kurmanji_courses_and_protected_lessons.sql`. That canonical migration is still the source definition used by the ordinary package source-contract checks. It contains the immediate-predecessor progression contract described in K143/K144.

The full-prefix implementation is a later, separate proposed migration:
`20261118100000_enforce_full_lesson_prefix_progression.sql`.
It remains unapplied to Test and Production. Therefore the proposed stronger progression rule must not be described as currently enforced in either database.

### 3. Current SQL tests do not exercise RPC authorization boundaries
The updated `supabase/tests/kurmanji_full_prefix_progression.sql` now contains 16 assertions against the pure helper function. It tests contiguous/missing prefixes, first lesson, invalid indexes, NULL/empty arrays, and final lesson boundaries for 26- and 12-lesson sequences.

It does not call `can_read_lesson_content` or `complete_lesson` and does not establish:
- anonymous/unauthenticated denial;
- authenticated but unenrolled denial;
- verified-contact requirements for completion;
- site-owner bypass and the existing orthography owner sequencing exception;
- exact RPC error behavior (`NOT_ENROLLED`, `INVALID_LESSON`, `PREVIOUS_LESSON_REQUIRED`);
- effective EXECUTE grants for API roles;
- actual RLS behavior when reading `lesson_content`;
- progress upsert and completion-count invariants.

The K136 browser suite uses synthetic Supabase mocks. Those tests can verify frontend flow but cannot replace live JWT/RLS/RPC integration tests.

### 4. CI path filters currently omit the new migration and SQL test
The existing `.github/workflows/validate-kurmanji-package.yml` push and pull-request `paths` lists include the validator and earlier canonical/reconciliation migrations, but omit:
- `supabase/migrations/20261118100000_enforce_full_lesson_prefix_progression.sql`;
- `supabase/tests/kurmanji_full_prefix_progression.sql`.

The SQL parser script does include both files in its input list. However, a change limited to either omitted path will not trigger this workflow through the current path filters. This matches the observed K145 commit check: the only reported check was a completed/skipped Supabase Preview; no PostgreSQL parser or package validation run was observed.

The workflow has `workflow_dispatch`, so manual dispatch is possible, but no manual run was performed in K146. CI configuration was not edited because the current scope is an audit and the workflow boundary requires a separate deliberate change.

### 5. Static source validator does not require the newly added edge cases
The full-prefix section in `scripts/validate_kurmanji_package.py` checks for the original seven test labels only. It does not require the new K145 assertions for NULL/zero index, NULL/empty lesson order, empty progress for lesson 2, or 12/26 lesson final-boundary cases. A future accidental deletion of those new cases could therefore pass this particular source-contract check if the old seven labels remain.

The validator also checks source tokens, not SQL semantics or database behavior.

## Recommended next steps
1. Keep the proposed migration unapplied until separate Test-only authorization is given.
2. In a separately reviewed CI change, add the proposed migration and SQL test paths to both push and pull-request path filters.
3. Extend the static validator to require all 16 current helper assertions.
4. Before considering the authorization boundary fully tested, add disposable-database SQL integration tests for the read and completion RPCs, including enrolled/un-enrolled, owner/non-owner, verified/unverified, sequence-gap, and exact error cases. These should run only after explicit authorization to use a disposable Test database and should restore/avoid persistent learner data.
5. After the migration is explicitly authorized and applied to Test, run the SQL tests and read-only postflight checks for function definitions, ownership, search_path, ACLs, migration ledger, and existing progress.

## Safety and limitations
- No Test or Production SQL query or write was performed in K146.
- No migration, Auth operation, user/OTP, GRANT/REVOKE, RLS change, deployment, PR, merge, workflow edit, or main update occurred.
- No lesson text, keys, course mappings, or course content changed.
- This is a source/configuration audit, not a live JWT, RPC, or RLS execution test.

## Repository state
- Repository: `avasinim/zanztkurd`
- Work branch: `fix/kurmanji-ci-current-migration`
- Starting HEAD: `7a2e65575586be862889968b5579894565ead8a3`
- Pre-work backup: `backup/b3-k146-rpc-authz-test-coverage-before-2026-11-18` at `7a2e65575586be862889968b5579894565ead8a3`
- Main baseline observed: `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`

Report-only audit; no code or CI configuration was changed.
