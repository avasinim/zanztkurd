# Dengnasî migration ledger reconciliation — 2026-11-26

## Scope

Read-only comparison of the disposable `zanztkurd-kurmanji-test` Supabase project's migration ledger against the repository's `supabase/migrations/` directory on `implementation/dengnasi-content-html-bridge-2026-11-26`.

## Test-project migration ledger

The database reports these two Dengnasî activation entries:

- `20261124093604 activate_kurmanji_dengnasi_course`
- `20261124112742 activate_kurmanji_dengnasi_course_production`

The repository directory on the inspected branch contains only one matching Dengnasî activation migration:

- `20261124130000_activate_kurmanji_dengnasi_course.sql` (blob `fdea0c85d3f75d8fd84df962d8d112900378ab2a`)

That repository migration contains one bulk INSERT and 27 PDF iframe payloads. Its timestamp is later than both Dengnasî activation entries recorded by the test database. The two database ledger entries with versions `20261124093604` and `20261124112742` do not have same-version SQL files in the inspected repository migration directory.

## Interpretation

The test database and repository migration ledger are not in a one-to-one reconciled state. The names alone do not prove that the two missing SQL files are equivalent to, superseded by, or safely represented by the later repository migration. The existing database's 27 authored lesson rows also differ from the old PDF iframe payload represented by the repository's 20261124130000 migration.

This is migration-history drift, not permission to rewrite migration history. Do not:
- apply `20261124130000` to the test project;
- delete, rename, repair, or mark any migration as reverted/applied;
- create a new timestamped migration until the source SQL and migration provenance for both recorded versions are recovered;
- touch production or alter enrollment/progress data.

## Current safe conclusion

The 27 lesson rows in the test project already match the authored payload (as documented in `docs/DENGNASI-TEST-PROJECT-RECONCILIATION-2026-11-26.md`). No new database migration is needed to reproduce that current row content in this test project. The immediate remaining work is runtime/browser validation, not another data replacement.

## Next steps

1. Recover the exact SQL source and commit provenance for `20261124093604` and `20261124112742` from the repository history, CI artifacts, or trusted backup; compare their effects without executing them.
2. Verify the course/catalog row, its publication/enrollment status, and the reader's URL and metadata behavior.
3. Run browser checks for anonymous, non-enrolled, enrolled, owner, and sequence-locked cases against the test project.
4. Only after those checks, decide whether a small code-only loader integration change is needed. Do not create or apply a migration unless an actual schema/data requirement is established.

## Safety record

This was a read-only audit. No migration was applied, no migration ledger row was changed, and no course, lesson, enrollment, progress, policy, or production data was modified.
