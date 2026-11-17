# B3-K095 — Public Feedback, Ratings and Moderation Audit

- Date: 2026-11-17
- Repository: `avasinim/zanztkurd`
- Working branch: `fix/kurmanji-ci-current-migration`
- Starting HEAD: `ef53dafda527b934e3698b642248cd897f9932dd`
- Protected `main`: `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`
- Scope: static review of `index.html`, `admin.html`, `supabase/schema.sql`, checked-in migration references and repository code-search results for `site_feedback_submissions`, `admin_list_site_feedback`, and `admin_moderate_site_feedback`.
- Method: source review only; no live Supabase query, row access, policy inspection or moderation action.

## Executive summary

The public homepage contains a feedback form for a 1–5 rating and optional display name/comment. The public page reads only rows marked `approved`, while the admin page provides pending/approved/rejected filters and moderation actions through two RPCs. The client-side flow is understandable and uses safe text rendering for public feedback. However, the checked-in repository source reviewed does not define the feedback table, its RLS policies, or the two admin RPCs. Therefore the security and operational guarantees for submissions and moderation cannot be verified from this repository alone.

## Confirmed implementation

1. The homepage form accepts a required rating from 1 to 5, optional display name (up to 80 characters), and optional comment (up to 1,000 characters).
2. A submission is inserted into `site_feedback_submissions` using the public Supabase client. If a session exists, the current user ID is attached; otherwise `user_id` is null. The interface therefore permits anonymous submissions at the client level.
3. The homepage reads ratings and comments filtered by `moderation_status = 'approved'`. It shows the average based on approved rating rows and at most 20 latest approved non-empty comments.
4. Public comments and display names are rendered with DOM `textContent`, not interpolated as HTML. This is a positive XSS-resistance practice for the public display path.
5. The admin page is gated by an authenticated session and `is_site_owner()`; it loads feedback through `admin_list_site_feedback(p_status)`.
6. Admin moderation calls `admin_moderate_site_feedback(p_feedback_id,p_status)` after a confirmation prompt. The UI exposes `approved`, `rejected` and `pending` states.
7. Admin feedback values are passed through the page's `esc()` helper before insertion into its HTML template.

## Findings

### K095-F1 — Feedback table and policy definitions are absent from reviewed repository SQL

No `CREATE TABLE`, RLS policy, grant, or migration definition for `site_feedback_submissions` was found in the checked-in `supabase/schema.sql` or migration chain reviewed. Repository code search found the table references in the homepage, but did not locate a checked-in table/policy definition.

**Impact:** The actual insert/read authorization, anonymous submission permissions, row ownership, allowed columns, and protection of moderation fields cannot be verified from repository history. This does not prove that production lacks these policies; they may have been configured outside the checked-in migration chain.

### K095-F2 — Admin feedback RPC definitions and grants are not reproducible from checked-in migrations

The admin page invokes `admin_list_site_feedback` and `admin_moderate_site_feedback`, but their function bodies and explicit execute grants were not found in the reviewed checked-in SQL/migration sources.

**Impact:** The source repository does not currently provide a complete reproducible record for the moderation backend. We cannot confirm from static source that both RPCs enforce owner authorization, validate status transitions, restrict returned fields, or reject unauthorized callers.

### K095-F3 — Anonymous public submission is enabled by the client flow

The homepage calls `getSession()` but does not require a signed-in user before inserting; it sends a null `user_id` when no session exists.

**Impact:** Anonymous feedback is an intentional or implicit product behavior. Without verified server-side RLS, validation and abuse controls, the repository does not establish protection against spam, repeated ratings, impersonation, or attempts to set protected columns.

### K095-F4 — Client validation is not a substitute for server validation

The browser checks rating range and the name/comment length before insert. Client checks can be bypassed. The database constraints, trigger logic, rate limits, and server-side validation were not available for review.

**Impact:** Ensure the backend independently validates rating, lengths, moderation status defaults, and permitted insert columns.

### K095-F5 — Aggregate rating counts every approved submission

The average and total are calculated from all approved rows, not distinct users. Since the client permits anonymous feedback and the schema/policies are unavailable, the repository does not establish one-rating-per-person or a duplicate-submission control.

**Impact:** If the displayed average is intended to represent unique visitors or verified learners, a product rule and server-side enforcement are needed. Otherwise describe it as the average of approved submissions.

### K095-F6 — Public rendering follows a safe text-only pattern

The homepage creates elements and assigns user-supplied display name and comment through `textContent`. This reduces the risk of user-submitted HTML/script execution in this rendering path. The admin page escapes displayed fields before composing markup.

**Impact:** Preserve this behavior if the UI is revised; do not change user content to unsanitized `innerHTML`.

### K095-F7 — No visible user-facing feedback edit/delete or withdrawal workflow

The reviewed public form submits feedback but does not expose a way for a submitter to view, edit, withdraw or delete their own submission. The admin UI exposes moderation status changes but no feedback-specific delete action in the reviewed block.

**Impact:** Decide whether users need a withdrawal/removal route and document how to request it. Do not infer that records cannot be deleted by operators outside this page.

## Recommended next steps (not applied)

1. Inspect the live Supabase catalog and policies in an explicitly authorized read-only session before changing any SQL. Confirm table columns, RLS enabled state, policies, grants, triggers and both RPC definitions.
2. Bring the authoritative table, policies, functions and grants into version-controlled migrations after reconciling them with live state; do not blindly recreate objects based only on the UI calls.
3. Verify server-side owner checks inside both admin RPCs, not only in the page gate. Restrict returned fields and allowed moderation status values.
4. Define whether anonymous feedback is intended. If yes, add appropriate server-side rate limiting/abuse controls and prevent clients from choosing moderation status or other protected fields. If no, require authenticated submissions at the backend.
5. Decide whether one rating per account/session is desired and how anonymous submissions should be counted; implement the chosen rule server-side.
6. Add a documented feedback withdrawal/removal request process if users should be able to retract submissions.
7. Keep the current text-only public rendering pattern and add tests for HTML/script-like user input, anonymous submission, invalid ratings, unauthorized moderation, and status transitions.

## Limitations

- Static repository review only. No live Supabase database, Auth, policies, function catalog, logs or production rows were inspected.
- Search-index results are not proof of production absence; SQL may exist outside the repository or be configured manually.
- No feedback was submitted, approved, rejected, edited or deleted during this audit.
- No conclusion is made about actual production exploitability or legal compliance.

## Change and safety record

- Documentation-only audit.
- No app code, lesson content, SQL schema/migrations, database, Storage, Auth settings, CI workflow, deployment, or `main` changes.
- CI was not run for this documentation-only audit.
