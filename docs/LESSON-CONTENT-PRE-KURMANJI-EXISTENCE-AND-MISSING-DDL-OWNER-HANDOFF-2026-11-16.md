# `lesson_content` pre-Kurmanji existence and missing-DDL owner handoff — 2026-11-16

## Executive finding

The strongest new conclusion is that `public.lesson_content` was already part of the live Supabase environment before the Kurmanji course migration was released.

The 2026-10-19 Kurmanji integration audit and release test plan describe a live `lesson_content` SELECT policy and production read-only inspection, while also stating that the Kurmanji course migration had not been applied to production. The PR #2 description independently says the Kurmanji seed uses the existing `lesson_content` primary key `lesson_key`.

Therefore, the Kurmanji migration was a consumer/populator of an existing relation, not the origin of that relation. The original DDL is still absent from the inspected tracked repository history and was not found in public GitHub code search across the `avasinim` account.

This narrows the missing artifact to a pre-Kurmanji setup event, but it does **not** identify whether the relation was created manually, from an untracked SQL file, from another private repository, or through an external provisioning process.

## Evidence establishing pre-Kurmanji existence

### 1. 2026-10-19 branch integration audit

File: `KURMANJI-INTEGRATION-AUDIT.md` on branch `kurmanji-courses`.

The audit says:
- the production project was inspected read-only on 2026-10-19;
- neither `kurmanji-course-1` nor `kurmanji-course-2` existed in `public.courses`;
- the Kurmanji migration had not been applied to production;
- the live `lesson_content` SELECT policy requires owner access or active/completed enrollment plus `can_read_lesson_content(course_id, lesson_key)`.

This is a key distinction: the audit describes an existing live content relation and access policy while the new Kurmanji course IDs are still absent. The Kurmanji data migration was not yet the source of that relation.

### 2. 2026-10-19 release test plan

File: `docs/kurmanji-release-test-plan.md` on the same branch.

The plan explicitly labels itself preparation only and says it does not indicate that the migration or browser tests have run in a disposable project. It also records the 2026-10-19 read-only production check showing no Kurmanji course IDs in `public.courses`.

Its proposed test queries join `public.courses` to `public.lesson_content`, inspect `pg_class.relrowsecurity`, and inspect `pg_policies` for `lesson_content`. These are planned test queries, not evidence that those queries were executed. The separate integration audit's statement about the live SELECT policy is the actual historical assertion relied on here.

### 3. PR #2 (2026-10-19)

PR #2, “Add Kurmanji courses and protected 38-lesson pathway”, states:

- the draft seed contains 38 unique lesson keys;
- the seed uses the existing `lesson_content` primary key (`lesson_key`);
- the migration had not been applied to the live Supabase project;
- test-project migration validation and browser end-to-end tests remained outstanding.

The PR remained Draft and unmerged. This is explicit evidence that the author regarded the relation and key as pre-existing, while the Kurmanji insert/upsert migration was still pending.

### 4. Earlier runtime and migration dependencies

- 2026-10-08 commit `12a1146ef4fd9b9919c6dd565ff2cb0b8655c1f3` added a runtime query selecting `content_html` from `lesson_content` by `lesson_key`.
- The initial tracked schema commit `d61db7616fdadf10016ec79e77e8642c2849b520` does not create the relation.
- The 2026-10-10 index and policy migrations assume `public.lesson_content` already exists.
- No checked-in SQL file in the inspected migration chain defines the table.

Together, these artifacts establish a pre-existing dependency, but they do not identify the provisioning source.

## Public repository search and branch scope

A GitHub code search was run for the `avasinim` account using:
- `CREATE TABLE public.lesson_content`
- `CREATE TABLE lesson_content`
- `lesson_content`
- `lesson_key`

The results point only to `avasinim/zanztkurd`. The apparent `CREATE TABLE public.lesson_content` hits are references in audit text or unrelated SQL/query context; none is an original table definition. This is public indexed code-search evidence only: it cannot see private repositories, local files, deleted/unindexed content, or external Supabase SQL-editor history.

The archived branch `archive/course-lessons-01-19` was also inspected through its recursive Git tree; it contains no SQL/schema paths. The early `kurmanji-clean-release` tree contains `supabase/schema.sql`, `supabase/admin-dashboard.sql`, and migrations, but none is a `lesson_content` table-creation artifact.

## Revised provenance timeline

| Date | Evidence | What it establishes |
|---|---|---|
| 2026-10-07 | Initial tracked `supabase/schema.sql` | Foundational schema omits `lesson_content` |
| 2026-10-08 | Runtime commit `12a1146...` | Application expects `lesson_content(content_html, lesson_key)` |
| 2026-10-10 | Index and policy migrations | Relation is assumed to pre-exist |
| 2026-10-19 | Integration audit + release test plan | Live policy/relation described; Kurmanji course IDs absent from production |
| 2026-10-19 | PR #2 | `lesson_key` described as existing primary key; Kurmanji migration not yet applied |
| 2026-10-24 | PR #4/#5 | Later release and 38-row production state asserted by PR descriptions |

## What is established versus unknown

**Established with repository/PR evidence:**
1. The application expected the relation by 2026-10-08.
2. The initial tracked schema does not define it.
3. By 2026-10-19, project audit material described a live `lesson_content` SELECT policy and a production check before Kurmanji course data existed.
4. PR #2 explicitly calls `lesson_key` an existing primary key and says its Kurmanji migration was not yet applied.
5. The Kurmanji migration therefore did not create the original table.

**Still unknown:**
- Original CREATE TABLE statement, DDL source, and exact creation time.
- Whether the relation was created in Supabase Dashboard, by a local SQL file, from another/private repository, or by an external setup process.
- Actual live relation columns/types/defaults, constraints, indexes, owner, grants, RLS enabled/forced flags, policies, triggers, dependencies, and migration ledger.
- Whether the production state still matches the historical PR statements.

## Exact owner handoff request

Ask the project/Supabase owner for one of these authoritative, schema-only artifacts:

1. The original SQL file or migration that created `public.lesson_content`; or
2. A schema-only export of the current `public.lesson_content` relation, including columns/types/defaults, constraints/indexes, owner, RLS flags/policies, table and column grants, triggers, and dependent functions/views; and
3. If available, the migration history or deployment record that explains when and how the relation was provisioned.

Do not include lesson bodies, student rows, auth identifiers, enrollment/progress data, API keys, passwords, or connection strings. A schema-only export is enough for the next review.

## Safety record

- Work branch: `fix/kurmanji-ci-current-migration`
- Starting commit: `fefdb85a12eee8d6010e76a94aeed76121006c13`
- Pre-work backup: `backup/lesson-content-pre-kurmanji-existence-before-2026-11-16`
- `main` observed before this work: `4ebd824ff9502ad71936ee9bdfa787ed898b11a8`
- No Supabase connection, SQL, migration, application code, lesson content, CI, PR, merge, or deployment was changed.
