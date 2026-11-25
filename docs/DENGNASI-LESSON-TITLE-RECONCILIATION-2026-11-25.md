# Dengnasî lesson-title reconciliation — 2026-11-25

## Scope

Compare the 27 lesson H1 headings in `docs/KURMANJI-DENGNASI-LESSON-AUTHORING.md` against the 27 canonical `title` fields in `docs/kurmanji-dengnasi-course.json`. This is a metadata reconciliation record only. No lesson wording or manifest title is changed here.

## Result

- Authoring draft: 27 numbered lesson sections.
- Manifest: 27 sequential lesson records.
- Exact heading/title matches: 18.
- Differences requiring editorial decision: 9.
- No lesson number or ID is missing or duplicated.

| Lesson | Authoring draft H1 | Manifest title | Difference to resolve |
|---:|---|---|---|
| 1 | Dergeh: ev vekolîn û yên berî wê | Dergeh û ev vekolîn û yên berî wê | Colon and conjunction wording |
| 2 | Vokal, konsonant; cih û awayên dengan; pifdarî | Vokal û konsonant; cih û awayên dengan; pifdarî | Comma versus conjunction |
| 4 | Qelewîtî: dengên qelew û zirav | Qelewîtî | Expanded explanatory subtitle |
| 6 | Dengrêziya kurmancî û avaniya kîteyan | Dengrêziya kurdî; peyv ji kîteyan pêk tên | Different phrasing and scope emphasis |
| 17 | Eyn û komên konsonantî di kurdî de | Eyn (ع) û hemû cotkonsonantên di kurdî de | Arabic character and expanded wording |
| 21 | Dîftong û giranî di dengnasiya kurdî de | Hin mijarên taybet: dîftong û giranî | Expanded explanatory wording |
| 22 | Nasandina KL û KE û cudahiyên herdu alfabeyan | Nasandina KL û KE; cudahiyên herdu alfabeyan | Punctuation |
| 26 | Cudahiyên dengnasî di navbera kurmancî û tirkî de | Cudahiyên dengnasî di navbera kurdî û tirkî de | Kurmancî versus kurdî |
| 27 | Cotdengiya Ç, K, P, T û rêgirtina li ber hiyatusê | Cotdengiya Ç, K, P, T û rêgirtin di ser peyvan re | Different explanatory wording |

## Safe integration rule

Do not rename the 27 database lesson keys or IDs. They are stable identifiers, not display titles.

Before generating the replacement HTML payloads:
1. Confirm whether the learner-facing title should follow the authoring H1 or the manifest title.
2. If an H1 is chosen as canonical, update the manifest and standalone page title metadata in the same reviewed change.
3. Preserve the existing lesson number, source reference and content section; do not alter lesson substance merely to force a title match.
4. Re-run exact title parity validation across authoring H1, manifest title, standalone page H1/title and the final `lesson_content.title` values.

## Related source-page verification

The source PDF `Dengnasiya_Zimane_Kurdi_27_Wane_corrected.pdf` was inspected directly at the relevant page boundaries. The authoring draft's page references have been corrected in the integration branch to match the source:
- Lesson 4: printed pages 29–39.
- Lesson 14: printed pages 168–186, including the final consonant table on page 186.
- Lesson 15: printed pages 187–202; the designed PDF inserts its Lesson 15 divider before the source content page 187.

The manifest already held these three page ranges correctly. The authoring draft's table and its individual source citations now agree with the PDF and manifest.

## Safety

- This record does not modify production, Supabase, course rows, lesson rows, access controls or student progress.
- No migration was created or applied.
- No deployment or publication was triggered.
- PR #89 remains Draft/Open/Unmerged; its head is not changed by this integration branch.
