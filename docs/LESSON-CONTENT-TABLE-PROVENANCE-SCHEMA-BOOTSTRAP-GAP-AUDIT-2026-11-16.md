# lesson_content table provenance and schema-bootstrap gap audit — 2026-11-16

## Scope and starting point

Read-only source audit on `fix/kurmanji-ci-current-migration`.
- Starting commit: `6d67e27683314c7bf01ab92262d27c300f3ab215`
- Pre-work backup: `backup/lesson-content-table-provenance-before-2026-11-16`

Compared the complete checked-in Supabase SQL inventory, baseline `supabase/schema.sql`, the lesson-content policy migrations, Kurmanji data migration, release-test documentation and repository code-search results.

No live Supabase catalog, migration ledger, SQL execution, or production data was accessed. No code, schema, migration, tests, CI, lessons or production settings were changed.

## 1. Table creation is absent from the inspected source tree

The baseline `supabase/schema.sql` explicitly creates:
- `public.profiles`;
- `public.courses`;
- `public.enrollments`;
- `public.lesson_progress`.

It does not create `public.lesson_content`, enable RLS on that table, or declare its owner, constraints, indexes, grants or policies.

The repository's checked-in migration inventory includes:
- an index migration adding `idx_lesson_content_course_id`;
- two policy migrations that drop/recreate a SELECT policy on `public.lesson_content`;
- data-cleanup migrations that UPDATE existing lesson_content rows;
- a Kurmanji migration that INSERTs/UPSERTs lesson_content rows;
- no matching `CREATE TABLE public.lesson_content` or `ALTER TABLE public.lesson_content` definition was found.

The Kurmanji seed migration therefore assumes that the table already exists with compatible columns and uniqueness (including the `ON CONFLICT (lesson_key)` target). The policy migrations also assume the relation exists. The repository does not document the original table bootstrap DDL in the inspected schema/migration set.

## 2. What can and cannot be inferred

Supported source-level conclusion:
- The checked-in repository is incomplete as a self-contained bootstrap specification for `lesson_content`.
- The table must have been created outside the inspected checked-in SQL path, or its creation definition is missing from this repository snapshot.
- Current migrations and browser code depend on the table's existence and shape.

Not established:
- who created the live table, when, or through which migration/dashboard/manual process;
- whether its live columns, primary/unique keys, owner and indexes match the assumptions;
- whether RLS is enabled or forced;
- which policies and grants exist today;
- whether the live migration ledger records the relevant policy and seed migrations;
- whether production schema drift exists.

Do not treat absence from the repository as proof that the live table does not exist. Do not treat the release-test document's expected-state SQL as a live catalog result.

## 3. Dependencies implied by the application

The browser lesson loader selects `content_html` by lesson key. The owner spelling tool selects lesson metadata/body and attempts direct UPDATE of `content_html` and `updated_at`. The seed migration inserts `lesson_key`, `course_id`, `title`, `content_html`, `updated_at` and uses `ON CONFLICT (lesson_key)`.

Consequently the live table's column types, nullability, unique constraint/index on `lesson_key`, RLS and role privileges are operational dependencies. They should be captured as schema metadata, not inferred from seed SQL.

## 4. Risk classification

This is a **schema provenance / reproducibility gap**. It creates uncertainty for:
- rebuilding a fresh environment from the repository;
- verifying that migrations are replayable in the intended order;
- determining whether the live table's policies and grants match the source;
- diagnosing the owner spelling tool's UPDATE behavior.

It is not by itself evidence of a production outage, unauthorized read, unauthorized write, or data loss.

## 5. Safe resolution path (proposal only)

Before any schema change:
1. Obtain explicit authorization for a metadata-only, read-only inspection of the intended Supabase project.
2. Record relation existence, columns/types/nullability/defaults, constraints, indexes, owner, RLS/force-RLS, all policies, effective grants and migration ledger version.
3. Compare that metadata with every application query, policy, index and seed assumption.
4. Recover the authoritative original DDL from the source of truth (migration history, approved schema export or documented bootstrap record).
5. Prepare a reproducible schema-bootstrap migration or schema snapshot as a separate reviewed proposal.
6. Test it in a disposable Supabase project and compare catalog output before any production action.

Do not invent a table definition from INSERT statements alone. Do not add a new CREATE TABLE migration, alter production, repair migration history, or change policy/grants without explicit approval.

## 6. Related audit documents

- `docs/LESSON-CONTENT-API-PRIVILEGES-DEFAULT-GRANTS-POSTGREST-EXPOSURE-AUDIT-2026-11-16.md`
- `docs/LESSON-CONTENT-RPC-VIEW-FRONTEND-STORAGE-PATH-AUDIT-2026-11-16.md`
- `docs/LESSON-CONTENT-READ-WRITE-BOUNDARY-OWNER-TOOL-AUDIT-2026-11-16.md`

## Backup and change record

- Work branch: `fix/kurmanji-ci-current-migration`
- Starting commit: `6d67e27683314c7bf01ab92262d27c300f3ab215`
- Pre-work backup: `backup/lesson-content-table-provenance-before-2026-11-16`
- Post-work backup: `backup/lesson-content-table-provenance-after-2026-11-16`
- Change type: documentation only.
