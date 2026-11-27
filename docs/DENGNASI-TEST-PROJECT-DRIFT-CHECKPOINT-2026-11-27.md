# Dengnasî test-project drift checkpoint — 2026-11-27

## Scope and method

Read-only comparison of the test project's `public.lesson_content` rows for course `kurmanji-dengnasi-27` against the current branch artifact `docs/previews/dengnasi-content-html-payload-preview.json`.

- Supabase test project: `zanztkurd-kurmanji-test` (`juwsjljbdwyncicybwoq`)
- Repository branch: `implementation/dengnasi-content-html-bridge-2026-11-26`
- Course: `kurmanji-dengnasi-27`
- Compared rows: 27 database rows and 27 payload lessons, keyed by `lesson_key`.
- No student, enrollment, progress, auth-user, production, or migration data was read or changed.

## Findings

- Database rows: **27**; unique lesson keys: **27**.
- Payload lessons: **27**.
- Exact `content_html` equality: **0/27**.
- Exact title equality: **19/27**; **9/27** titles differ.
- Every row's `content_html` differs byte-for-byte from the current payload. This is a parity finding only; byte differences alone do not establish that every textual lesson passage is substantively wrong.
- The authoring Markdown and course manifest each contain 27 lesson headings/items, and their titles match **27/27**.

### Database title versus current payload title

| Lesson | Test database title | Current payload title |
|---:|---|---|
| 1 | Dergeh û ev vekolîn û yên berî wê | Dergeh: ev vekolîn û yên berî wê |
| 2 | Vokal û konsonant; cih û awayên dengan; pifdarî | Vokal, konsonant; cih û awayên dengan; pifdarî |
| 4 | Qelewîtî | Qelewîtî: dengên qelew û zirav |
| 6 | Dengrêziya kurdî; peyv ji kîteyan pêk tên | Dengrêziya kurmancî û avaniya kîteyan |
| 16 | Dengên V, W, Y û Z | Dengên V, W, X, Y û Z |
| 17 | Eyn û hemû cotkonsonantên di kurdî de | Eyn û komên konsonantî di kurdî de |
| 21 | Hin mijarên taybet: dîftong û giranî | Dîftong û giranî di dengnasiya kurdî de |
| 22 | Nasandina KL û KE; cudahiyên herdu alfabeyan | Nasandina KL û KE û cudahiyên herdu alfabeyan |
| 27 | Cotdengiya Ç, K, P, T û rêgirtin di ser peyvan re | Cotdengiya Ç, K, P, T û rêgirtina li ber hiyatusê |

## Verified backup

A fresh read-only snapshot of all 27 current test-project rows was committed to this branch:

`docs/backups/kurmanji-dengnasi-test-lesson-content-before-resync-20261127T130608Z.json`

The committed file was fetched back and verified to contain:
- 27 rows;
- 27 unique lesson keys;
- non-empty `content_html` for every row;
- each row's title, key, HTML, and `updated_at` value.

Backup commit: `8dcd2cae1a24b70a674590e975517f394496054a`.

## Reconciliation decision

**Do not resync yet.** The backup exists and is verified, but before any database write:
1. Review the nine title differences against the canonical authoring/manifest titles.
2. Inspect the generated payload and existing database HTML for semantic omissions or unintended additions, not merely byte-level differences.
3. Validate the exact 27-key update set and retain a fail-closed precondition.
4. Only then consider a transaction limited to `lesson_content` rows for this course in the test project.

No database write, migration, deployment, PR merge, or public activation was performed for this checkpoint.
