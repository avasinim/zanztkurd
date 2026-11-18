# B3-K139 — Progression RPC Compatibility and Security Review (2026-11-18)

## Scope

Static source review of the K137 full-prefix progression migration, compared with the current canonical migration and existing frontend/runtime contracts. This task did not query or modify Supabase. It is repository-only.

## Compatibility issue found and corrected

The canonical migration's completion RPC raises the exact exception identifier:

`PREVIOUS_LESSON_REQUIRED`

The first K137 draft used lowercase `previous_lesson_required`. Although the frontend currently does not contain a dedicated string match for either token, changing an established RPC exception identifier is unnecessary API drift and could affect downstream callers or future error handling.

K139 corrected the proposed migration to preserve the original uppercase identifier exactly. The source-contract validator lowercases SQL before checking the required token, so it continues to verify the invariant independent of SQL keyword/message casing.

## Security and behavior review

Compared the proposed migration against the existing canonical function definitions.

- Both RPCs remain `SECURITY DEFINER` with `SET search_path TO ''`.
- The internal prefix helper is `IMMUTABLE`, uses an empty fixed search path, and revokes EXECUTE from `PUBLIC`, `anon`, `authenticated`, and `service_role`. It is intended to be called internally by the owner-executed SECURITY DEFINER RPCs.
- `can_read_lesson_content` retains authentication, site-owner bypass, enrollment check, supported-course allowlist, lesson-key validation, and first-lesson behavior. For later lessons it checks the entire earlier prefix.
- `complete_lesson` retains authentication, verified email/phone check, enrollment check (with the existing owner exception), supported-course allowlist, lesson-key validation, course completion accounting, and progress upsert.
- Existing site-owner sequencing behavior is preserved: owners bypass sequencing for phonetics and the two Kurmanji courses, while the orthography course retains its existing sequential completion rule.
- Course lesson ordering arrays and lesson keys were copied from the canonical migration without reordering.
- No frontend lesson content or course payload was changed.

## SQL helper edge cases

The existing SQL regression block covers contiguous prefixes, missing first and middle lessons, first-lesson access, invalid indexes, NULL progress arrays, and NULL entries. The PostgreSQL parser CI check validates syntax, but these SQL assertions have not been executed against a live database.

## Evidence and limitations

- K137 CI run `44260091018` passed on the prior K137 revision: PostgreSQL parser, seed parity, package/source validator, and Playwright 11/11.
- K139 changed the migration exception identifier to preserve the existing contract. A CI run for the K139 HEAD was not yet observed when this report was prepared.
- Playwright tests are synthetic browser-side Supabase mocks, not live JWT/RLS tests.
- No live role/owner execution test was run. Static review cannot independently prove PostgreSQL owner privilege behavior or actual grants in the target database.
- No Test or Production database was queried or modified. The migration remains unapplied.

## Conclusion

The compatibility drift found in K137 was corrected. Static review found no intentional change to the existing authentication, enrollment, owner, verification, course-order, or progress-accounting behavior beyond the requested full-prefix sequencing rule. Final confidence still requires CI on the corrected branch and, only after separate authorization, Test-only migration execution and SQL regression testing.

## Backup and repository state

- Repository: `avasinim/zanztkurd`
- Work branch: `fix/kurmanji-ci-current-migration`
- Pre-work backup: `backup/b3-k139-progression-rpc-compatibility-review-before-2026-11-18` at `abdde49fa67329a50de684faf1eb648dbdf84587`
- K139 corrected source commit: `251173d073f412e904ed75ca39a1a68d134c0d39`
- Main baseline observed: `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`

No deployment, PR, merge, or main update occurred.
