# B3-K107 — Kurmanji reconciliation impact and learner-progress boundary audit

- Date: 2026-11-18
- Repository: `avasinim/zanztkurd`
- Work branch: `fix/kurmanji-ci-current-migration`
- Starting HEAD: `a71b89beb4a527968b32ca74ebb469bd4787d1cf`
- Pre-work backup: `backup/b3-k107-post-reconciliation-impact-review-before-2026-11-18`
- Production project: `zanztkurd` (`hjpmorabqdhuchpnowiw`)
- Test project: `zanztkurd-kurmanji-test` (`juwsjljbdwyncicybwoq`)

## Executive finding

A read-only simulation of the forward reconciliation migration shows that all 38 current Kurmanji lesson rows in both projects still exactly match the historical release migration. The 12 rows targeted by the forward migration exist in both projects, have the expected course IDs, and all 12 have payloads that would change to the checked-in forward-migration values.

The migration's apply phase is content-only: it changes title, content_html, and updated_at in public.lesson_content. It does not write lesson_progress, enrollments, or courses. There are existing learner-progress rows on targeted lesson keys (4 in production, 5 in test); these remain outside the migration's write scope. No migration was executed.

## 1. Current database baseline, rechecked

The historical release migration was parsed into 38 expected Kurmanji lesson tuples. A read-only SQL comparison against each project's live `public.lesson_content` returned:

| Result | Production | Test |
|---|---:|---:|
| Historical Kurmanji tuples | 38 | 38 |
| Live rows found | 38 | 38 |
| Missing rows | 0 | 0 |
| Historical title/body/course mismatches | 0 | 0 |

This re-verifies the exact pre-reconciliation baseline at the time of this audit.

## 2. Target rows and projected payload changes

The 12 forward-migration tuples were parsed directly from `20261116120000_reconcile_kurmanji_seed_content.sql`. A read-only SQL comparison checked target existence, course ID, and the MD5 of each target title/body pair.

| Result | Production | Test |
|---|---:|---:|
| Overlay rows | 12 | 12 |
| Missing target rows | 0 | 0 |
| Course ID mismatches | 0 | 0 |
| Already equal to target payload | 0 | 0 |
| Rows whose title/body would change | 12 | 12 |
| Unique target keys | 12 | 12 |

The projection was read-only; no update was issued.

## 3. Learner progress and related row counts

A separate read-only aggregate query checked progress rows on the 12 target keys and course-level counts.

| Result | Production | Test |
|---|---:|---:|
| Course 1 lesson_content rows | 26 | 26 |
| Course 2 lesson_content rows | 12 | 12 |
| Progress rows on target lesson keys | 4 | 5 |
| Cross-course progress-key mismatches | 0 | 0 |
| Kurmanji Course 1 enrollments | 1 | 1 |
| Kurmanji Course 2 enrollments | 0 | 0 |
| Total lesson_content rows | 112 | 38 |
| Total lesson_progress rows | 47 | 5 |

All progress rows on the targeted keys belong to Course 1. The forward migration preserves `lesson_key` and `course_id` and updates only title, content_html, and updated_at. Therefore, it does not change the key used by progression checks and does not issue writes to progress or enrollment tables. This is a statement about the migration's checked-in SQL write scope, not a live execution test.

## 4. Application-level progression semantics

The current checked-in `can_read_lesson_content` and `complete_lesson` functions build ordered Kurmanji lesson keys from fixed sequences (26 and 12). The reconciliation migration does not alter these functions or their ordered keys.

Since the migration preserves the target `lesson_key` and `course_id`, its content updates do not alter:
- the previous-lesson key used for sequential access;
- the RPC arguments used by lesson completion;
- the lesson-progress uniqueness key;
- course enrollment rows or course completion counters.

No RPC or learner account was invoked during this audit.

## 5. CI side-effect guard

Updated `scripts/validate_kurmanji_seed_parity.py` so future CI runs fail if the forward migration:
- does not contain exactly one write to `public.lesson_content`;
- writes to another public table;
- references learner progress, enrollments, or the course catalog in its apply phase;
- changes the approved upsert update scope (title, content_html, updated_at) or removes the course_id match.

Existing checks for the immutable historical migration, 38 ordered keys, exact 12-row preflight, row lock, transaction boundaries, 12-row apply guard, and exact seed parity remain in place.

## 6. CI verification

GitHub Actions:
- Run ID: `44247380898`
- Commit: `1f70bbca94bb13c27724cf5de4344adff62bdf51`
- Result: **success**
- PostgreSQL parser: historical migration, forward migration, and all five seed files passed.
- Seed parity validator: passed, including the new learner-progress side-effect boundary.
- Kurmanji package validator: passed.
- Playwright: all 8 north-circle browser regression tests passed.

Run URL: https://github.com/avasinim/zanztkurd/actions/runs/44247380898

## 7. Safety boundary

- Both Supabase projects were queried read-only.
- No migration was applied or recorded in either migration ledger.
- No DDL, DML, RLS, grants, Auth, Storage, or RPC changes were made.
- No lesson content, static lesson page, course catalog, enrollment, or learner progress was modified.
- No deployment, merge, PR, or `main` update.
- No individual student identifiers or lesson bodies were returned by live queries.

## Backup and change record

- Pre-work backup: `backup/b3-k107-post-reconciliation-impact-review-before-2026-11-18` at `a71b89beb4a527968b32ca74ebb469bd4787d1cf`.
- Post-work backup: to be created at the report commit.
- Code change: `scripts/validate_kurmanji_seed_parity.py` only.
- Report change: this file.

## Recommendation

The test and production data baselines are both still clean and the 12-row forward migration is structurally constrained to content-only updates. The next step is not automatic production rollout: first obtain content-owner approval for the exact 12-row payload and explicit approval to apply it to the designated test project. After that, run post-apply hash/parity, progression, and rendered-page checks before separately considering production.
