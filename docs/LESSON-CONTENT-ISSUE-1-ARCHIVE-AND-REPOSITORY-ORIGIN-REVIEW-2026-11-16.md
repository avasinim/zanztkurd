# Lesson-content origin: Issue #1 and early archive review — 2026-11-16

## Scope

This review follows the unresolved origin of `public.lesson_content`. It checks the earliest repository issue and the early imported archive artifact for evidence of a schema or provisioning instruction. It is repository-history research only.

## Issue #1

GitHub Issue #1 is titled **“Architecture audit checkpoint: preserve lesson content 1–183”** and was opened 2026-09-04. Its entire body says:

> Audit note only; no lesson content changes requested. Preserve all lesson content through site lesson 183 while architecture/mapping is reviewed. Lesson 184 remains paused.

The issue has zero comments. It contains no Supabase reference, table name, SQL, database setup instruction, schema attachment, or mention of `lesson_content`.

This is evidence that a lesson-content preservation/architecture checkpoint predates the October Supabase runtime integration. It does **not** establish that the later `public.lesson_content` relation existed in September, nor does it explain its DDL. “Lesson content” in the issue is a general content-preservation phrase and must not be conflated with the later Postgres relation of the same conceptual purpose.

## Early archive artifact

The early commit `a884b8a8a12a4d370a9490c22dee636b9dfbf098` contains one archive file:

- `avashin-website (1).zip`
- Recorded Git blob: `a158c49967bb4a6b8e7cdda84ea6c67798862990`
- Recorded size: 8,154 bytes.

A recursive tree inspection of the early archive commit shows this ZIP as a single blob, with no separately tracked SQL, schema, Supabase, migration, or database-setup files in that commit's tree.

The ZIP itself was not successfully downloaded and unpacked in this review environment. Therefore its internal entries and contents remain **uninspected**. The absence of standalone SQL paths in the Git tree is not proof that the ZIP contains no SQL; do not claim that it does.

## Combined provenance interpretation

The evidence now supports this bounded timeline:

1. **2026-09-04:** Issue #1 records a broad requirement to preserve site lesson content 1–183. It does not refer to a database table or Supabase.
2. **2026-10-07:** The first tracked `supabase/schema.sql` defines foundational tables but omits `public.lesson_content`.
3. **2026-10-08:** The application runtime is committed with a query against `lesson_content`.
4. **2026-10-10:** Index/policy migrations depend on the relation rather than creating it.
5. **2026-10-19:** The Kurmanji integration audit describes a live `lesson_content` SELECT policy while the Kurmanji course IDs are absent from production; PR #2 calls `lesson_key` the existing primary key and says the Kurmanji migration has not been applied.

The original table creation remains unlocated. Plausible explanations include a Dashboard-created relation, an untracked/local SQL artifact, an external setup process, or another repository. None is established.

## Next best evidence source

The most useful next artifact is the actual 8,154-byte ZIP unpacked and inventoried, followed by an owner-provided schema-only export or original DDL. If the archive cannot be recovered, ask the project owner for:

- original `CREATE TABLE public.lesson_content` SQL;
- the source of the `lesson_key` primary/unique constraint;
- any initial RLS/policy and grant setup;
- migration/deployment history for the relation.

Do not infer table structure from later indexes, policies, seed upserts, or application SELECT statements. Do not reconstruct and apply speculative DDL.

## Safety record

- Work branch: `fix/kurmanji-ci-current-migration`
- Starting commit: `fefdb85a12eee8d6010e76a94aeed76121006c13`
- Pre-work backup: `backup/lesson-content-issue1-archive-review-before-2026-11-16`
- No database access, SQL execution, migration, code, lesson content, CI, PR, merge, or deployment was performed.
- No attempt was made to alter `main`.
