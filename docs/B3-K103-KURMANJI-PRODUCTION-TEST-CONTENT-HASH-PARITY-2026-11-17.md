# B3-K103 — Kurmanji lesson-body hash parity: production vs test

- Date: 2026-11-17
- Repository: `avasinim/zanztkurd`
- Work branch: `fix/kurmanji-ci-current-migration`
- Starting HEAD: `3709a5afcae25f2b1a394516908079feeb915e3a`
- Pre-work backup: `backup/b3-k103-kurmanji-content-hash-before-2026-11-17`
- Production project: `zanztkurd` (`hjpmorabqdhuchpnowiw`)
- Test project: `zanztkurd-kurmanji-test` (`juwsjljbdwyncicybwoq`)

## Objective and method

Verify whether the 38 Kurmanji lesson bodies in production and test are byte-for-byte equal without exposing lesson text.

Ran the same read-only SQL in both projects:

```sql
select lesson_key, md5(coalesce(content_html,'')) as body_hash
from public.lesson_content
where course_id in ('kurmanji-course-1','kurmanji-course-2')
order by course_id, lesson_key;
```

Only lesson key and MD5 digest were returned. No title, lesson body, student data, enrollment, or progress rows were selected. Results were compared in-memory by lesson key.

## Results

| Measure | Result |
|---|---:|
| Production Kurmanji rows | 38 |
| Test Kurmanji rows | 38 |
| Matching lesson keys | 38 / 38 |
| Identical body hashes | 38 / 38 |
| Hash mismatches | 0 |
| Missing keys on either side | 0 |

Both projects contain the same exact 26 Course 1 keys and 12 Course 2 keys. Every corresponding `content_html` value has the same MD5 digest in both projects.

## Interpretation and limits

- This is strong operational evidence that the stored Kurmanji lesson bodies are identical between the two connected databases at the time of inspection.
- MD5 is used here as a parity checksum, not as a security or authenticity mechanism. It is sufficient to detect ordinary accidental content drift in this controlled comparison; use SHA-256 for any future integrity attestation.
- This compares production against test only. It does not independently prove that either database matches the repository seed files or the original author-approved source documents.
- It does not validate the pedagogical accuracy, orthographic correctness, rendering, or navigation of lesson content.
- The reconciliation migration's absent version in the production migration ledger remains a separate migration-history finding. Equal body hashes mean there is no observed production/test body drift requiring a data correction at this time; do not apply that migration solely to make the ledger look current.

## Safety record

- Both database queries were SELECT-only aggregate-free per-row digests, restricted to the 38 Kurmanji lesson rows.
- No lesson body was returned from either database.
- No student data or private identifiers were accessed.
- No SQL writes, DDL, migrations, privilege/RLS changes, Auth/Storage changes, CI changes, deployment, merge, or `main` updates.
- Repository change is documentation only.

## Recommended next steps

1. Keep production and test lesson bodies unchanged: this comparison found zero differences.
2. Review the production migration-ledger discrepancy independently, using a disposable clone or staging project and a migration preflight; do not replay it against production without separate change review.
3. If repository-to-database parity is required, compute SHA-256 in-database and compare only digests against hashes derived from the checked-in seed sources, without exporting lesson bodies.

## Backup and change record

- Pre-work backup: `backup/b3-k103-kurmanji-content-hash-before-2026-11-17` at `3709a5afcae25f2b1a394516908079feeb915e3a`.
- Post-work backup: to be created at the report commit.
- CI: not run; documentation-only change.
