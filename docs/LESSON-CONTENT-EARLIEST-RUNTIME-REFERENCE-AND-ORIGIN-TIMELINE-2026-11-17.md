# `lesson_content` earliest runtime reference and origin timeline — 2026-11-17

## Scope and correction

This report extends the previous Git/PR provenance work by tracing the earliest checked-in runtime references to the `lesson_content` relation, not merely migrations that later alter it.

It is a static repository and GitHub history review. No Supabase project was connected, no SQL was executed, and no live database metadata or content rows were read.

A useful distinction throughout this report:

- **Static lesson content** in repository Markdown/JSON/HTML files is not the same thing as the PostgreSQL relation `public.lesson_content`.
- A JavaScript query against `lesson_content` proves that the application code expected the relation to exist; it does not prove when or how it was created.
- A populated test database or a PR author's production assertion does not reveal the original DDL.

## Earliest runtime use found

### 2026-10-08 15:05 UTC — commit `12a1146ef4fd9b9919c6dd565ff2cb0b8655c1f3`

Commit title: `feat: load lesson content from protected Supabase data`.

The only changed file is `script.js`. It adds a `loadProtectedLessonContent(sb, target)` helper that queries:

- relation: `lesson_content`
- selected column: `content_html`
- filter: `lesson_key = target`

The helper injects the returned `content_html` into the lesson page. The commit does not include SQL, a table definition, or a migration that creates `public.lesson_content`.

### 2026-10-08 17:12–17:29 UTC — follow-up runtime hardening

The next commits initialize the Supabase client on protected lesson pages and harden the same query/error path:

- `1f44424246de0c1f5b581ec8eb128d31ca97c8f9`
- `d2b5ae6824d493e34a74bdc4ac9e081632b1f74f`
- `e83774e721d4fcedeb734472ec4e81848ef54f68`

These commits still change application JavaScript, not table-creation DDL. They establish that the runtime integration expected `lesson_content` by 2026-10-08.

## Earlier search-result distinction

A chronological GitHub commit search for the text `lesson_content` returns some August 2026 commits because the phrase occurs in generic lesson-content work and static lesson artifacts. The earliest returned examples include:

- `59a2ecc91a710697813f2e4ad7bd401cfd3bc08b` — adds a static Markdown lesson file.
- `3564f49eb876c3bd9e3dd3bc3fb890f585808c83` — updates the static lesson renderer to accept `content_file` metadata.

Inspection of these diffs shows static Markdown/JSON lesson loading, not a query to the PostgreSQL relation `public.lesson_content` and not a `CREATE TABLE` statement. They must not be misreported as evidence that the database relation existed in August.

Within the inspected commit search and the specific runtime diffs reviewed, 2026-10-08 is the earliest confirmed application query against the relation. This is a bounded search finding, not a claim that no earlier external or untracked DDL exists.

## Schema-history cross-check

### 2026-10-07 — initial tracked Supabase foundation

Commit `d61db7616fdadf10016ec79e77e8642c2849b520` introduces `supabase/schema.sql`. The file creates:

- `public.profiles`
- `public.courses`
- `public.enrollments`
- `public.lesson_progress`

It does not create `public.lesson_content`.

The subsequent schema hardening commit `74f4fc00f2d770dca51a60e5a4a0abc6c7ef5537` updates the same `supabase/schema.sql` with course, enrollment, and progress security logic, but still does not add `lesson_content`.

### 2026-10-10 — policy and index migrations

Later migrations create or replace policies/functions and an index against `public.lesson_content`. They assume the relation and relevant columns exist; they do not establish its original table definition.

## PR and release evidence, reconciled

- **PR #2 (2026-10-19):** describes `lesson_key` as the existing primary key and adds Kurmanji lesson rows; it does not create the relation.
- **PR #3 (draft, 2026-10-21):** its body explicitly says the migration had not been validated in a disposable Supabase project. A continuity/audit note in the PR's changed material separately records 38 rows in a test-project snapshot. These facts are not necessarily contradictory: a test project can contain rows without proving that the specific migration under review was validated end-to-end. The test snapshot is not production evidence.
- **PR #4 (merged 2026-10-24):** its body asserts that the Kurmanji production migration was applied and verified after CI passed. The changed-file list contains the migration and seed files, not a table-creation DDL.
- **PR #5 (merged 2026-10-24):** its body reports a read-only production check finding 26 + 12 = 38 distinct lesson-content rows. It changes only `dashboard.html` and `script.js`, with no schema change. This is a PR-author assertion; the query and raw metadata result are not included in the PR.

## Updated evidence timeline

| Date | Artifact | Confirmed observation |
|---|---|---|
| 2026-08-22 | Static lesson commits | Static Markdown/JSON lesson content exists; not proof of the DB relation |
| 2026-10-07 | Initial `supabase/schema.sql` | Creates four foundational tables; omits `lesson_content` |
| 2026-10-08 | Runtime commit `12a1146...` | Application queries `lesson_content(content_html)` by `lesson_key`; relation is an assumed prerequisite |
| 2026-10-10 | Index/RLS/function migrations | Migrations continue to assume the relation exists |
| 2026-10-19 | PR #2 | PR author describes existing `lesson_key` primary key |
| 2026-10-21 | PR #3 | Test-project row-count note exists, but PR body says migration validation is still blocked |
| 2026-10-24 | PR #4 | Production migration application asserted |
| 2026-10-24 | PR #5 | 38 production rows asserted by a read-only check |

## What is now established — and what remains unknown

**Established from checked-in artifacts and PR descriptions:**

1. Static lesson-content files predate the Supabase runtime integration, but they are a separate storage mechanism.
2. The first confirmed runtime query in the inspected history is in the 2026-10-08 commit `12a1146...`.
3. The tracked schema foundation from 2026-10-07 does not create `lesson_content`.
4. Subsequent policies, RPCs, and indexes rely on the relation already existing.
5. By 2026-10-19, PR #2 described `lesson_key` as an existing primary key.
6. The 2026-10-24 PR descriptions report a production release and 38 content rows, but do not include the original relation DDL.

**Still unknown:**

- Original DDL, source file, creator, and creation timestamp.
- Whether the relation was created manually in a Dashboard, from a local/untracked SQL file, by another repository, or through a different setup process.
- Exact live columns/types/defaults, constraints/indexes, owner, ACLs, RLS state/policies, triggers, dependencies, and migration ledger.
- Whether the present live database still matches the PR descriptions.

## Next required evidence

The owner should supply the original schema-only SQL or a schema-only export of `public.lesson_content`, preserving:

- columns, PostgreSQL types, nullability, defaults, generated attributes, and owner;
- primary/unique/foreign/check constraints and indexes;
- RLS enabled/forced state and every policy;
- table/column grants and relevant default privileges;
- triggers and dependent functions/views/sequences;
- migration history for the relation's creation.

Exclude lesson bodies, student rows, auth identifiers, enrollments, and progress data. Do not share secrets or connection strings. No reconstructed DDL should be treated as canonical until compared with the authoritative artifact.

## Safety and verification record

- Active work branch: `fix/kurmanji-ci-current-migration`
- Starting commit: `1645a1739ccd21afc54803d3d348cd5e30bebcd3`
- Pre-work backup: `backup/lesson-content-earliest-runtime-reference-before-2026-11-17`
- `main` before this work: `4ebd824ff9502ad71936ee9bdfa787ed898b11a8`
- No Supabase connection, SQL, migration, lesson-content edit, application-code change, CI change, PR edit, merge, or deployment was performed.
