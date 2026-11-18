# B3-K138 — Test Progress Prefix Impact Audit (2026-11-18)

## Scope and safety

Read-only impact assessment for the proposed K137 full lesson-prefix progression migration. The audit queried only the Supabase Test project:

- Project: `zanztkurd-kurmanji-test`
- Project ref: `juwsjljbdwyncicybwoq`
- Status at inspection: `ACTIVE_HEALTHY`

No learner identifiers or per-learner lesson histories were exported into this report. Only aggregate counts are recorded.

## Schema and migration state

The Test project's `public.lesson_progress` columns are:
- `user_id` (uuid, NOT NULL)
- `course_id` (text, NOT NULL)
- `lesson_key` (text, NOT NULL)
- `completed_at` (timestamp with time zone, NOT NULL)

There is no separate `completed` boolean column; existence of a progress row represents recorded completion for this table's current schema.

The Test migration ledger still ends with `20261118062448 reconcile_kurmanji_seed_content`. The proposed K137 migration `20261118100000_enforce_full_lesson_prefix_progression` is absent. This confirms it has not been applied to Test.

## Aggregate progress footprint

A read-only grouping by course found only one course with progress rows:

| Course | Learners with progress | Progress rows | Distinct lesson keys |
|---|---:|---:|---:|
| `kurmanji-course-1` | 1 | 5 | 5 |

No progress rows were returned for the other course IDs.

## Prefix-impact result

Compared the Test project's Course 1 progress keys against the canonical 26-key order encoded in the current protected progression migration.

| Check | Result |
|---|---:|
| Learners with recorded progress | 1 |
| Recorded progress rows | 5 |
| Highest recorded lesson index | 5 |
| Learners with a missing key before their highest completed lesson | 0 |
| Total missing keys before highest completed lesson | 0 |
| Unknown lesson keys | 0 |

The existing Test progress footprint is contiguous through lesson 5. Therefore the K137 full-prefix rule would not reject this recorded progress state.

This is an aggregate snapshot, not proof that no learner can ever acquire a gap later. The rule remains useful as server-side defense against imported, manually repaired, or otherwise non-contiguous progress.

## Limits

- Production was not queried.
- No user IDs, email addresses, phone numbers, or per-learner lesson sequences were selected for the report.
- The K137 migration and its SQL regression block were not executed.
- CI parser and source-contract checks do not substitute for executing the migration and SQL tests in Test.
- The audit does not test real learner JWT/RLS behavior or live Auth.

## Conclusion

The currently recorded Test-project Kurmanji Course 1 progress is contiguous (five recorded lessons, highest index five, zero missing predecessors, zero unknown keys). No existing Test progress state appears to be blocked by the proposed K137 rule.

The migration remains repository-only and unapplied. Applying it to Test still requires separate explicit authorization. Production remains untouched.

## Backup and repository verification

- Repository: `avasinim/zanztkurd`
- Work branch: `fix/kurmanji-ci-current-migration`
- Pre-work backup: `backup/b3-k138-test-progress-prefix-impact-before-2026-11-18` at `3f14add3b239084d328fd7982df318d768b85618`
- Main baseline observed: `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`

This K138 task adds only this audit report to the repository; it does not modify application code or SQL.
