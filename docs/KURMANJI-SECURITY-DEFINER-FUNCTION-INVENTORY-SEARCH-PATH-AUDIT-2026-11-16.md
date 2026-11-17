# Kurmanji SECURITY DEFINER function inventory and search_path audit — 2026-11-16

## Scope and method

Repository-only review of `supabase/schema.sql` and all 15 SQL migrations on `fix/kurmanji-ci-current-migration`. The scan found 25 SECURITY DEFINER function-definition occurrences across the files, representing 13 distinct function signatures after accounting for repeated replacements and whitespace variants.

This is source review, not a live database audit. No Supabase project was queried; no SQL was executed; no code, migration, test, CI, lesson, or deployment file was changed.

## 1. Relevant functions and migration hardening

The progression and protected-content path includes:
- `public.is_site_owner()`;
- `public.can_read_lesson_content(text,text)`;
- `public.complete_lesson(text,text)`;
- `public.enroll_in_course(text)`;
- `public.student_has_enrollment(text)`.

The later migration definitions of `can_read_lesson_content` and `complete_lesson` use `SECURITY DEFINER`, an empty fixed `search_path`, and schema-qualified references. The latest Kurmanji migration also revokes `complete_lesson` execution from PUBLIC and anon and grants it to authenticated.

The migration lineage also replaces earlier function bodies:
- `is_site_owner` receives an empty search_path in `20261010060000_repair_site_owner_email_fallback.sql`;
- `complete_lesson` receives an empty search_path in `20261010070000_allow_site_owner_to_bypass_lesson_prerequisite.sql`, and is later replaced by the Kurmanji migration;
- `can_read_lesson_content` is introduced with an empty search_path in `20261010091000_enforce_sequential_lesson_content_access.sql` and is later replaced;
- `enroll_in_course` is replaced with an empty search_path in `20261013085913_admin_progress_reporting_consistency.sql`;
- admin listing/status functions are replaced with empty search_path definitions in `20261010074200_count_phone_verified_accounts_in_admin.sql` and `20261013085913_admin_progress_reporting_consistency.sql`.

The later admin functions check `public.is_site_owner()` before returning account/enrollment/progress data or changing enrollment status. Their execute grants are revoked from PUBLIC and then granted to authenticated, so the in-function owner check is an essential authorization boundary.

## 2. Remaining trigger functions with non-empty search_path

The baseline `supabase/schema.sql` defines two trigger functions with non-empty search_path:
- `public.handle_new_user()`: SECURITY DEFINER, `search_path=public`; called by the `on_auth_user_created` trigger. Its inspected body inserts into the schema-qualified `public.profiles` table and derives profile data from the new Auth row.
- `public.protect_student_number()`: SECURITY DEFINER, `search_path=public,pg_temp`; called by a BEFORE UPDATE trigger on `public.profiles`. Its inspected body copies the existing student number back to NEW.

These are not the lesson-progression RPCs. Their bodies use limited operations and the profile relation is schema-qualified. Nevertheless, a non-empty search_path on a SECURITY DEFINER function is a hardening point worth reviewing, particularly if untrusted roles can create objects in any searched schema. The repository does not establish effective CREATE privileges on those schemas or live function ownership. No exploit is confirmed.

## 3. Early definitions versus later replacements

The earliest admin-dashboard migration defines several SECURITY DEFINER functions with `search_path=public,auth`. Later migrations replace the corresponding functions with empty search_path definitions and schema-qualified references. Likewise, the baseline schema contains earlier versions of enrollment/completion/owner functions with non-empty paths, while later migrations harden those functions.

This hardening conclusion depends on migration order and on the live migration ledger. If a target environment skipped a later replacement, the effective definition could differ from the final repository source. The repository's two competing Kurmanji migration files and their different payloads, already documented in the migration-lineage audit, reinforce the need to inspect the live ledger rather than infer it.

## 4. Authorization observations

- The learner-facing `complete_lesson` function binds writes to `auth.uid()`; it does not accept a user ID argument.
- It validates course and lesson keys against finite arrays, enrollment and prerequisite completion before writing.
- `can_read_lesson_content` is a SECURITY DEFINER predicate used by the lesson-content RLS policy and checks owner/enrollment/sequence rules.
- Admin reporting functions return data across users, so their `is_site_owner()` check and execute grants are high-value controls.
- `enroll_in_course` writes only for `auth.uid()` and checks account verification and course existence.
- `student_has_enrollment` reads enrollment state for `auth.uid()`.
- Trigger functions are invoked by their triggers; this review does not establish whether direct EXECUTE privileges have been revoked or their live ownership.

## 5. What cannot be concluded from repository source

Source files cannot prove:
1. the actual owner of each live SECURITY DEFINER function;
2. the deployed function body and `proconfig` search_path;
3. the effective EXECUTE ACL for PUBLIC, anon, authenticated, service_role and other roles;
4. whether public-schema CREATE is restricted in the live project;
5. whether trigger definitions and function owners match the baseline schema;
6. which Kurmanji migration version is recorded in the live migration ledger;
7. whether manual SQL or dashboard changes have altered any function or privilege.

Do not report production hardening as verified until these catalog facts are inspected.

## 6. Read-only catalog verification plan

With explicit authorization and a read-only connection to the intended Supabase project, inspect:
- `pg_proc.prosecdef`, `proconfig`, `proowner`, `proacl`, function identity arguments and definitions for the named functions;
- effective EXECUTE privileges for PUBLIC, anon, authenticated and service_role;
- schema CREATE privileges for public and any schema in a SECURITY DEFINER search_path;
- trigger-to-function mappings and trigger enabled state;
- `pg_class.relrowsecurity`, `relforcerowsecurity`, and `pg_policies` for lesson_progress and lesson_content;
- migration ledger entries for the owner, RPC, and Kurmanji migrations.

Do not read student records or execute any write function as part of catalog inspection.

## 7. No remediation performed

No SQL or source edits are proposed in this document. Do not alter search_path, ownership, function grants, RLS policies, migrations or production settings without a separately reviewed change plan and explicit approval.

## Backup and change record

- Work branch: `fix/kurmanji-ci-current-migration`
- Starting commit: `e433023ba437e21f15ce64463565f98b2ee53bd8`
- Pre-work backup: `backup/kurmanji-security-definer-audit-before-2026-11-16`
- Post-work backup: `backup/kurmanji-security-definer-audit-after-2026-11-16`
- Change type: documentation only.
