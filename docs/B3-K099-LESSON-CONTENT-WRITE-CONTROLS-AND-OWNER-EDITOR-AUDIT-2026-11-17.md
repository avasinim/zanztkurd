# B3-K099 — Lesson Content Write Controls and Owner Tool Audit

- Date: 2026-11-17
- Repository: `avasinim/zanztkurd`
- Working branch: `fix/kurmanji-ci-current-migration`
- Starting HEAD: `262633dd75ead78f2acd578bd98c1475557d241f`
- Protected `main`: `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`
- Scope: `spelling-tool.html`, `spelling-tool.js`, all 16 checked-in Supabase migration files, `supabase/schema.sql`, `supabase/admin-dashboard.sql`, and prior lesson-content read/write boundary audits.
- Method: static repository review only. No live Supabase catalog, lesson rows, learner records or production write request was accessed.

## Executive summary

The repository has one identifiable browser-side lesson-content editor: `spelling-tool.js`. It previews a batch of text substitutions and then directly updates `public.lesson_content.content_html` and `updated_at` for each selected lesson.

The tool performs a client-side session check and calls `is_site_owner()`. The `apply()` function also checks the local `owner` flag before issuing updates. However, the checked-in SQL migration set defines a SELECT policy for `lesson_content` and does not define a corresponding UPDATE policy or an explicit table-level UPDATE grant for the authenticated browser role. The baseline schema does not define the table or its RLS state.

This leaves two mutually exclusive production risks that cannot be resolved from repository code:

- If RLS is enabled and no additional applicable UPDATE policy exists, the owner editor's direct update should be rejected by PostgreSQL/PostgREST; the editor is then non-functional for saving.
- If RLS is disabled while the browser role has UPDATE privilege, the JavaScript owner check is bypassable and cannot protect lesson text from direct API writes.

No remediation is made in this task. The safe next step is read-only metadata verification, followed by a separately approved design decision for owner editing.

## 1. Browser owner tool behavior

### Authentication and owner check

- `spelling-tool.html` loads the Supabase JS client, `supabase-config.js`, and `spelling-tool.js`.
- The script checks for an Auth session and redirects unauthenticated visitors to `auth.html?next=spelling-tool.html`.
- It calls `is_site_owner()`; if the RPC errors or does not return true, the page's main content is replaced with an owner-only message.
- On success it sets the in-memory `owner=true` flag.

The owner check runs asynchronously after the tool's event handlers are registered. The page therefore depends on the later database-side authorization rather than treating the initial hidden/disabled state as a security boundary.

### Preview path

`preview()` does not itself check `owner`. It performs a direct SELECT of `lesson_key, course_id, title, content_html` from `lesson_content`, then filters rows in the browser by the selected scope and calculates replacement previews.

The page's current scope choices are:
- `phonetics-phonology-kurdik`;
- `orthography-kurdik`;
- all rows visible to the current database role.

It does not offer either Kurmanji course as an explicit scope. RLS remains the decisive protection for any rows returned by this SELECT. The preview control being present on the page is not evidence that a user is entitled to all lesson rows.

### Apply path

`apply()`:
1. checks the local `owner` flag;
2. requires a confirmation dialog;
3. loops through the in-memory preview rows;
4. calls `UPDATE lesson_content SET content_html=..., updated_at=...` filtered only by `lesson_key`;
5. asks PostgREST to return `lesson_key` to confirm that a row was updated.

This is a direct browser-to-PostgREST write. The browser-side owner flag is useful UI gating but can be modified or bypassed by a caller. The database must independently enforce the owner-only write boundary.

## 2. Checked-in SQL and migration findings

- The two lesson-content policy migrations create/recreate a SELECT policy for role `authenticated`.
- The later policy checks the owner predicate or an enrolled learner with the server-side lesson-sequence check.
- The latest Kurmanji migration replaces access/completion RPCs and seeds rows; it does not add an UPDATE policy for `lesson_content`.
- The checked-in migration inventory contains 16 migration files. Repository search/review found no `CREATE POLICY ... FOR UPDATE` or `FOR ALL` policy for `lesson_content`.
- No explicit table-level `GRANT UPDATE` for `public.lesson_content` to `authenticated` was found in the checked-in migration set.
- `supabase/schema.sql` does not create `public.lesson_content`, enable/force RLS on it, or declare its table privileges/policies.
- `supabase/admin-dashboard.sql` defines student, enrollment and progress admin RPCs; it does not define a lesson-content editor RPC or lesson-content write path.

The seed migrations' `INSERT ... ON CONFLICT ... DO UPDATE` statements are migration-time seed/reconciliation operations. They are not evidence of a browser role's table UPDATE privilege or policy.

## 3. Write-surface inventory

The checked-in browser code search identified the spelling tool as the direct lesson-content UPDATE path. The regular admin dashboard manages users, enrollment status, feedback and library books; it does not expose a lesson-content edit form or call a lesson-content write RPC.

The owner spelling tool updates only `content_html` and `updated_at` by lesson key. No browser-side lesson-content INSERT or DELETE workflow was identified in the reviewed sources.

## 4. Additional integrity and usability risks in the editor

### K099-F1 — Database write authorization is unproven (high priority)

No checked-in UPDATE policy or explicit table UPDATE grant is present, and live RLS/ACL state is unknown.

**Conditional impact:** either the legitimate owner editor cannot save (RLS enabled without UPDATE policy), or a broader direct-write path may exist if RLS is disabled and UPDATE is granted.

### K099-F2 — Preview is not owner-gated in its own handler

The asynchronous page initialization checks owner status, but `preview()` itself does not require `owner===true`. It issues the SELECT whenever a Supabase client and replacement rules are available. The database SELECT policy must therefore constrain the returned rows even if a non-owner reaches the preview handler before the page is replaced.

### K099-F3 — No optimistic concurrency check

Each UPDATE filters only by `lesson_key`. It does not compare the current `content_html` or `updated_at` with the values captured at preview time.

**Impact:** if a lesson is edited after preview but before Apply, the stale preview can overwrite the newer content. A safe editor should compare a version/timestamp or expected prior value and stop on conflict.

### K099-F4 — Batch writes can partially succeed

The tool updates rows one by one. It records successes and errors but does not wrap the batch in a transaction. A failure partway through can leave a partially updated set. A retry may process already-updated rows again.

**Impact:** the operator needs a clear per-row result and a deliberate recovery process; ideally use a server-side transactional RPC with strict owner authorization and version checks.

### K099-F5 — Tool scope is legacy-course oriented

The page's scope controls explicitly name phonetics and orthography courses, not Kurmanji Course 1 or Course 2. Do not assume the current spelling tool is a supported editor for the 38 Kurmanji lesson payloads.

## 5. Recommended safe design (not implemented)

Choose one of these approaches only after product/owner approval:

**Option A — Retain owner editing:** move writes behind a narrowly scoped SECURITY DEFINER RPC or an explicitly reviewed owner-only UPDATE policy. Use the canonical `is_site_owner()` predicate server-side; restrict the changed columns; validate lesson keys; add a version/expected-content check; make batch behavior transactional or return precise per-row outcomes. Ensure non-owner direct PostgREST UPDATE is denied.

**Option B — Disable direct browser writes:** remove/disable the Apply action and retain read-only preview/export until a server-authorized workflow is ready. Ensure no authenticated UPDATE privilege/policy remains.

Do not simply add a broad authenticated UPDATE policy. Do not rely on the JavaScript owner check as authorization.

## 6. Required read-only live verification (not performed)

With explicit authorization, inspect metadata only:

1. `pg_class.relrowsecurity`, `relforcerowsecurity`, owner and relation existence for `public.lesson_content`;
2. every policy in `pg_policies`, including command, roles, USING and WITH CHECK;
3. effective SELECT/UPDATE/INSERT/DELETE privileges for anon, authenticated, service_role and table owner;
4. explicit grants and default privileges for the actual table-creating role;
5. deployed `is_site_owner()` definition, owner, SECURITY DEFINER/search_path and EXECUTE ACL;
6. migration ledger and schema drift.

Do not select lesson bodies, learner records, progress rows or enrollment records. Do not click Apply or send a test UPDATE to production.

## 7. Change and verification record

- Report-only audit; no application code, lesson text, SQL migration, schema, RLS policy, grant, database, Auth setting, Storage, CI workflow, deployment or `main` change.
- No CI run was required because this task adds documentation only.
- Starting HEAD: `262633dd75ead78f2acd578bd98c1475557d241f`.
- Main remained protected at `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`.
