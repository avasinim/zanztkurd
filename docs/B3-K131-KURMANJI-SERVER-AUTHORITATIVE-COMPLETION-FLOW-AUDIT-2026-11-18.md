# B3-K131 — Kurmanji server-authoritative completion-flow audit

Date: 2026-11-18  
Branch: `fix/kurmanji-ci-current-migration`  
Pre-audit HEAD: `11afa521ead17bdf6755fb04bf51a4516217193e`  
Database inspected: isolated test project `zanztkurd-kurmanji-test` (`juwsjljbdwyncicybwoq`), read-only SQL only.

## Scope

Reviewed the frontend completion flow in `script.js`, the Course 1 and Course 2 synthetic Playwright coverage, and the live definitions of the test project's `complete_lesson`, `can_read_lesson_content`, `student_has_enrollment`, and `is_site_owner` functions. No source, SQL, database, Auth, or workflow changes were made.

## Confirmed alignment

- Frontend Course 1 map: `kurmanji-course-1`, 26 ordered lesson keys.
- Frontend Course 2 map: `kurmanji-course-2`, 12 ordered lesson keys.
- Test database `can_read_lesson_content` and `complete_lesson` contain the same course IDs and generated 26/12 key sequences.
- Frontend completion calls `complete_lesson(p_course_id, p_lesson_key)`; it does not write completion directly to local storage until the server RPC succeeds.
- The server completion function checks authenticated identity, verified email or phone (site-owner exception), valid course/key, active or completed enrollment (site-owner exception), and prerequisite completion before inserting/upserting the progress row.
- Progress synchronization reads the server's `lesson_progress` rows and rebuilds the local cache; on read error it clears the local cache rather than trusting stale local state.
- The K127 synthetic browser suite passed in GitHub Actions run [44257368596](https://github.com/avasinim/zanztkurd/actions/runs/44257368596), including the new Course 2 denial test. The fixtures mock Auth/RPC/PostgREST; this is not live JWT/RLS acceptance evidence.

## Finding: server prerequisite check is immediate-predecessor, not full-prefix

The test project's `can_read_lesson_content` function authorizes lesson N when the immediately preceding lesson key (N−1) exists in `lesson_progress`. The `complete_lesson` function likewise checks only that immediate predecessor for sequential courses (with the documented site-owner bypass for phonetics and Kurmanji courses).

The frontend's local `firstIncomplete()` logic is stricter: it finds the first missing index and redirects a non-owner away from any later lesson. Therefore, if a learner's server progress ever contains a gap (for example, imported or manually repaired progress rows), the server-side content gate can permit a lesson whose immediate predecessor is complete even though one or more earlier lessons are missing. The client-side contiguous-prefix check may then redirect after the page gate has already loaded the protected body.

This is a latent consistency gap rather than evidence of a currently exploitable path for ordinary sequential completion. The normal `complete_lesson` UI and RPC flow makes progress sequential when starting from a clean record; the finding concerns non-contiguous existing records and direct RPC use where an immediate predecessor exists.

### Recommended hardening (not applied)

For Kurmanji courses, make both server functions enforce a complete prefix: before allowing lesson N, verify that every key from lesson 1 through N−1 is present for the same user and course. Preserve the intended site-owner bypass. Add SQL-level regression cases for:
1. clean sequential prefix → allowed;
2. immediate predecessor present but an earlier lesson missing → denied;
3. first lesson → allowed for an enrolled learner;
4. wrong course/key → denied;
5. site-owner behavior → matches the documented exception.

This requires a separate, explicit test-project database migration. No migration was created or applied in K131. Production was not queried or modified.

## Additional boundaries

- No Auth users or OTPs created.
- No live learner JWT or real sign-in tested.
- No course content or lesson keys changed.
- No RLS, grants, function definitions, or migration ledger changed.
- No CI workflow, deployment, PR, merge, or `main` update.

## Conclusion

Frontend and test-database course mappings agree (26 + 12). The server remains authoritative for writes, and the recent synthetic browser suite passes. Before claiming strict sequence integrity for all possible progress states, harden the server prerequisite rule to require the entire earlier prefix, then test that rule against the isolated test project after explicit approval.
