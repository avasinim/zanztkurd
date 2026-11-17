# B3 Kurmanji: Literary Attestations for Raketin and Derketin
Date: 2026-11-17
Branch: fix/kurmanji-ci-current-migration
Scope: documentary research only; no lesson or application changes.

## Executive finding
An additional search of digitized Kurmanji periodicals and literary texts located direct narrative attestations for the past forms `raneketin` (raketin) and `derket` / `derketin` (derketin). This strengthens the evidence beyond the earlier pedagogical examples. It does not complete either verb's person/number paradigm, and the examples should retain their source and variety/date labels.

## 1. Raketin: direct literary evidence
### Negative plural `raneketin`
A digitized page from Nûdem, issue 31 (Payîz 1999), p. 95, contains the narrative sentence: `Wê şevê em her du jî raneketin.` The surrounding passage is a first-person narrative. The form `raneketin` is a direct past negative plural example with `em her du` (“we both”).
Source scan: https://portal.arsivakurd.org/wp-content/uploads/2021/08/nudem_31.pdf
### Singular `raket`
A digitized passage in Hevî / Kovara Çandîya Giştî, issue 2, includes `lawik raket` in a narrative sequence after the child is laid down. This is consistent with third-person singular past `raket`; however, because the scan's surrounding syntax is not fully available in the search extract, retain it as a corroborating literary token, not as the sole basis for a paradigm.
Source scan: https://portal.arsivakurd.org/wp-content/uploads/2021/08/hevi_estitu_ya_paris_2.pdf
### Assessment
Together, the narrative tokens support the earlier pedagogical record `raketin → raket` and independently corroborate the negative plural `raneketin`. They do not establish all person/number forms or dialect-wide uniformity.

## 2. Derketin: direct newspaper evidence
A digitized copy of Welat, issue 41 (29 November–5 December 1992), contains the clause `di nav wan û hêzên dewletê de şer derket` (“fighting broke out between them and the state forces”). Here `derket` is an intransitive third-person singular past form.
The same newspaper page includes `... xayin derketin ...`, in a context meaning that some people turned out to be traitors. This provides a plural-looking `derketin` token, but its clause segmentation and context should be rechecked against the full page before it is used as a clean paradigm citation.
Source scan: https://usercontent.one/wp/portal.arsivakurd.org/wp-content/uploads/2021/08/Welat_41_opt.pdf?media=1709107483
### Assessment
The `şer derket` clause is a clear independent literary/journalistic corroboration of the past form `derket`. It is intransitive and therefore should be kept distinct from transitive past examples with oblique agents. The scan does not establish `derketim` or `derketî`; those remain supported by the earlier pedagogical source pending further direct evidence.

## 3. Relation to CCKNT and corpus evidence
The University of Bamberg's CCKNT record confirms an open, downloadable plain-text corpus of 483 Northern Kurdish newspaper texts (about 214,000 words), collected from 1999 newspaper material. The record offers `ccknt.txt` as a 1.2 MB file. The direct file endpoint could not be retrieved through the current inspection channel during this audit, so no claim is made that the complete CCKNT file has been scanned.
CCKNT record: https://fd-repo.uni-bamberg.de/records/v6rmw-cx940
An accessible 2018 dissertation by Abdullah Incekan quotes CCKNT examples and labels the source `CCKNT.txt`, demonstrating that the corpus has been used for token-level grammatical analysis. It is a useful secondary route for further concordance research, but it is not a substitute for a verified direct scan of the corpus file.
Dissertation PDF: https://multicast.aspra.uni-bamberg.de/resources/kurdish/data/_docs/Incekan2018_productivity-acceptability-neologisms-kurdish.pdf

## 4. Updated evidence register
| Form | Direct attestation | Source class | Status |
|---|---|---|---|
| `raneketin` | `Wê şevê em her du jî raneketin` | Nûdem 31, p.95, 1999 narrative | Direct past negative plural |
| `raket` | `lawik raket` | Hevî issue 2 literary narrative | Corroborating singular past token; context needs full-page review |
| `derket` | `... şer derket` | Welat 41, 1992 newspaper narrative | Direct intransitive singular past |
| `derketin` | `... xayin derketin ...` | Welat 41, 1992 newspaper | Candidate plural token; context needs recheck |
| `derketim`, `derketî` | Earlier Kurdish Lessons examples | Pedagogical examples only in current register | No independent literary attestation located in this pass |

## 5. Teaching and editorial safeguards
1. Keep the verb entries explicitly labelled intransitive: raketin (“sleep”) and derketin (“go out, emerge; break out” in the cited clause).
2. Preserve the exact quoted source form `raneketin`; do not normalize away its negation or change its spacing without a separate orthographic decision.
3. Do not present a complete conjugation table based on these isolated tokens.
4. Do not merge `derket` in the intransitive clause `şer derket` with transitive past alignment examples.
5. Existing course lessons remain untouched; this file is an evidence note only.

## References
1. Nûdem, no. 31, Payîz 1999, p. 95: https://portal.arsivakurd.org/wp-content/uploads/2021/08/nudem_31.pdf
2. Hevî / Kovara Çandîya Giştî, issue 2: https://portal.arsivakurd.org/wp-content/uploads/2021/08/hevi_estitu_ya_paris_2.pdf
3. Welat, no. 41, 29 November–5 December 1992: https://usercontent.one/wp/portal.arsivakurd.org/wp-content/uploads/2021/08/Welat_41_opt.pdf?media=1709107483
4. Haig, Geoffrey. 2001. The Corpus of Contemporary Kurdish Newspaper Texts (CCKNT), University of Bamberg repository: https://fd-repo.uni-bamberg.de/records/v6rmw-cx940
5. Incekan, Abdullah. 2018. Die Produktivität und Akzeptabilität von Neologismen im Verblexikon des Kurdischen, dissertation PDF: https://multicast.aspra.uni-bamberg.de/resources/kurdish/data/_docs/Incekan2018_productivity-acceptability-neologisms-kurdish.pdf

## Project boundary
Documentation only on fix/kurmanji-ci-current-migration. Course inventory remains 26 + 12. No lesson text, application code, CI, production Supabase, migrations, deployment, or PR #3 was touched.