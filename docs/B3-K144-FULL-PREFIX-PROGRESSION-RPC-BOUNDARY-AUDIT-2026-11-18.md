# B3-K144 — Full-Prefix Progression RPC Boundary and Regression Coverage Audit (2026-11-18)

## Scope
Read-only audit of the proposed K137/K139 full-prefix progression migration, its SQL helper tests, source-contract validator, and the deployed Test project's current RPC behavior as established in K143. No migration was applied and no SQL test was executed against a live database.

## Helper logic review
Reviewed `public.has_completed_lesson_prefix(text[],text[],integer)` in the proposed migration.

- Accepts lesson 1 without requiring earlier progress.
- For later lessons, requires every key in the ordered prefix before the requested index to exist in the completed-key array.
- Treats NULL completed arrays and NULL array entries as non-matches.
- Rejects NULL, less-than-one, and beyond-end lesson indexes through the initial bounds guard (NULL index also falls through to false because the CASE condition is true).
- Uses a fixed empty `search_path`, is declared IMMUTABLE, and revokes EXECUTE from PUBLIC, anon, authenticated, and service_role.
- Existing course order arrays, supported course IDs, owner sequencing exception, enrollment and verified-contact checks, completion accounting, progress upsert, and the exact `PREVIOUS_LESSON_REQUIRED` error identifier are retained by static comparison.

No obvious helper-level logic defect was found in the reviewed source. This is a static review, not PostgreSQL execution.

## RPC boundary review
The proposed migration routes both `can_read_lesson_content` and `complete_lesson` through the shared prefix helper for non-owner progression checks:
- The read RPC returns false for unauthenticated callers, non-enrolled users, unknown course IDs, invalid lesson keys, or incomplete earlier prefixes; the site-owner bypass remains.
- The completion RPC raises its existing authentication, verification, enrollment, course, and lesson-key errors; for a non-owner later lesson it raises the preserved `PREVIOUS_LESSON_REQUIRED` token unless the full prefix is complete.
- Existing owner behavior is intentionally asymmetric: site owners bypass sequence checks for phonetics and both Kurmanji courses; the orthography course keeps its prior sequential completion behavior.

The helper SQL test exercises the pure predicate, not the full RPC boundary. It does not itself prove JWT identity, enrollment, RLS, owner bypass, helper invocation privileges, or progress upsert behavior.

## Regression coverage gap
The current `supabase/tests/kurmanji_full_prefix_progression.sql` contains seven helper-level cases:
1. contiguous prefix accepted;
2. missing first lesson rejected;
3. missing middle lesson rejected;
4. lesson 1 accepted with empty progress;
5. out-of-range index rejected;
6. NULL progress array rejected;
7. NULL progress entry rejected.

Recommended additions before treating the migration as fully validated:
- NULL index, zero index, NULL/empty lesson order, and empty completed-key array for lesson 2;
- exact boundary at final lesson for both 26-lesson and 12-lesson orders;
- RPC-level tests proving a contiguous learner can read/complete the next lesson, a gap denies read and completion, and the error identifier remains exactly `PREVIOUS_LESSON_REQUIRED`;
- unauthenticated and unenrolled denial tests;
- owner bypass tests for Kurmanji/phonetics and preserved sequential owner behavior for orthography;
- ACL checks that authenticated can execute the two intended RPCs but API roles cannot execute the internal helper;
- post-migration check that existing contiguous Test progress remains readable and completion accounting is unchanged.

The current source-contract validator checks migration tokens and helper-level test case presence. It does not execute SQL semantics or assert all the above RPC-level scenarios.

## Current Test status and change boundary
K143's read-only Test inspection showed the deployed functions still use immediate-predecessor checks; the proposed full-prefix migration is absent from the Test migration ledger. The current aggregate progress snapshot was 5 Kurmanji progress rows for 1 learner, with prior K138 audit finding no gaps through the recorded prefix. This does not establish future/manual imported state safety.

- The proposed migration remains unapplied.
- No database queries were made in K144; Test observations above are referenced from K143.
- No Test or Production database writes, Auth changes, users, OTP, RLS/grant changes, deployment, PR, merge, or main update occurred.
- No lesson text, lesson keys, or course mappings changed.

## Recommendation
Keep the migration unapplied until separately authorized for Test. Before applying, extend the SQL regression suite to include the missing helper edge cases and RPC-level behavior. After explicit Test-only authorization, apply the exact reviewed migration, execute the SQL assertions in Test, and perform read-only postflight checks for RPC definitions, grants, migration ledger, and existing progress. Production remains out of scope.

## Repository state
- Repository: `avasinim/zanztkurd`
- Work branch: `fix/kurmanji-ci-current-migration`
- Starting HEAD: `7e05a864032140ab4cd860f6e3a8edd08a2b7315`
- Pre-work backup: `backup/b3-k144-full-prefix-rpc-boundary-audit-before-2026-11-18` at `7e05a864032140ab4cd860f6e3a8edd08a2b7315`
- Main baseline observed: `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`

Report-only audit; no code changes.
