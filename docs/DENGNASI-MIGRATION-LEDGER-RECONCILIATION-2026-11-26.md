# Dengnasî migration ledger reconciliation — 2026-11-26

## Read-only sources inspected

- Test project: `zanztkurd-kurmanji-test` (`juwsjljbdwyncicybwoq`).
- Migration ledger: `supabase_migrations.schema_migrations`, including its `statements` array.
- Repository migration: `supabase/migrations/20261124130000_activate_kurmanji_dengnasi_course.sql` on `implementation/dengnasi-content-html-bridge-2026-11-26`.

## Recovered migration history

The test project's ledger contains:

| Ledger version | Name | SQL statement length | SQL MD5 |
|---|---|---:|---|
| `20261124093604` | `activate_kurmanji_dengnasi_course` | 36,301 chars | `6b7bd2ecef207d3d6bd80cdd8c7a8674` |
| `20261124112742` | `activate_kurmanji_dengnasi_course_production` | 37,182 chars | `eb5b2d001cf4e7d282cd364a2eea9093` |

The SQL body for ledger version `20261124112742` is **byte-for-byte identical** to the repository file `20261124130000_activate_kurmanji_dengnasi_course.sql` (37,182 characters). Therefore the earlier statement that this version had no corresponding source was too strong: its SQL source is present in the repository under a different timestamp and filename/name.

Ledger version `20261124093604` is a distinct earlier activation statement and is not represented by a same-version file in the repository migration directory. Its SQL remains recoverable from the test database's `statements` array. It:
- inserts the same 27 lesson keys;
- includes 27 PDF iframe wrappers and 54 references to the corrected source PDF;
- defines `can_read_lesson_content` and `complete_lesson`;
- has an initial course upsert using `ON CONFLICT (id) DO UPDATE`, unlike the later file's `ON CONFLICT (id) DO NOTHING`;
- contains no DELETE statement and no CREATE POLICY statement;
- is not wrapped in the later file's explicit `BEGIN/COMMIT` transaction.

The later SQL source also has the same 27 iframe wrappers and the same two function definitions. It is the production-named version and matches the repository file exactly, despite the timestamp difference.

## Current data versus migration history

The current test-project `lesson_content` rows contain authored HTML and match the prepared 27-row payload exactly. They do not match the old iframe payloads embedded in either activation statement. No later migration-ledger entry describing that authored-HTML replacement was identified in the inspected ledger.

This establishes a difference between current row state and the historical activation SQL. It does **not** establish how the content rows were changed. Do not infer whether they were changed through SQL Editor, an external script, or another process without separate evidence.

## Safe interpretation

- The timestamp/name mismatch for the second activation migration is understood: its recorded SQL exactly matches the repository file under timestamp `20261124130000`.
- The first activation migration is an earlier distinct version whose source is still available in the test DB ledger, but has no same-version repository migration file.
- The authored HTML now present in the test DB has no corresponding later migration record identified in the ledger.

Do not:
- apply either activation SQL again;
- add the recovered first statement to `supabase/migrations/` under its old timestamp (that could make other environments attempt to replay it);
- rewrite migration history, delete ledger entries, or mark migrations as reverted/applied;
- create a new migration until a genuine schema/data change is required and the provenance of the current authored rows is understood.

## Next steps

1. Keep both recovered SQL versions as historical evidence; do not replay them.
2. If a durable copy of the first statement is ever needed, store it only as a clearly labelled non-executable archival artifact outside `supabase/migrations/`.
3. Run the new local Playwright suite through GitHub Actions when an approved PR/CI route is available; it has not yet run.
4. Separately perform authenticated browser checks against the test project. The local mocked suite does not prove real Supabase auth/RLS.
5. Reconcile the catalog status and under-preparation landing page before release; the implementation branch now aligns their visible status.

## Safety record

All migration inspection was read-only. No migration was applied, no migration ledger row changed, and no course, lesson, enrollment, progress, policy, or production data was modified.
