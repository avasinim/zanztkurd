# B3 Kurmanji: Derketin Literary Person Forms and Lexical-Sense Audit
Date: 2026-11-17
Branch: fix/kurmanji-ci-current-migration
Scope: source-led documentation only; no lesson or application changes.

## Executive finding
This pass located direct literary attestations for `derketim` (first-person singular past) and `derketî` (second-person singular past), supplementing the earlier `derket` (third-person singular) newspaper example. A published conjugation table independently lists the six-pronoun past paradigm. The evidence is now stronger for these forms, but the table's own gloss labels `derketin` as “to happen”, while literary examples show the broader meanings “leave/go out” and “emerge/break out”. Treat the conjugation and lexical-sense questions separately.

## 1. Direct literary attestations
### First-person singular: `derketim`
In the Kurmanji reading text “Rojên Derbasbûyî”, the narrator writes: `Gava ji Eyndîwerê derketim...` (“When I left Eyndîwer…”). The line is in a first-person narrative and directly attests the form `derketim` with a place/source complement.
Source: Kurmanji readings, Qedrîcan, pp. 89–90 in the transcription: https://doczz.net/doc/5342767/kurmanji-readings
### Second-person singular: `derketî`
In the poetry collection *Gurzek Gotar* by Dr. Ebdilmecît Şêxo (first edition 2011), the poem excerpt includes `Lê dem hat û tu ji malê derketî` and later `Di şeva xûnav de, tu derketî ji malê.` Both are second-person singular past forms in direct address.
Source: *Gurzek Gotar*, pp. 111–112, poem reprinted from Roja Nû, 1986: https://www.kurdipedia.org/files/books/2022/410323.PDF
### Third-person singular: `derket`
The earlier Welat no. 41 audit recorded the intransitive clause `... şer derket` (“fighting broke out”). Retain this as a third-person singular past example, distinct from transitive past constructions.
Source scan: https://usercontent.one/wp/portal.arsivakurd.org/wp-content/uploads/2021/08/Welat_41_opt.pdf?media=1709107483

## 2. Published conjugation-table cross-check
Kurdish Academy's “All Verb Forms” table lists the following six-pronoun past simple forms for `derketin`: Ez `derketim`; Tu `derketî`; Ew `derket`; Em `derketin`; Hûn `derketin`; Ew (plural) `derketin`. This agrees with the directly attested first-, second-, and third-person singular literary forms above.
Source: https://kurdishacademy.ch/kurmancu00ee/leker/allverbs.html
Evidence limit: this is a published teaching reference, not a corpus concordance. The literary attestations in this audit directly support the singular forms; plural forms remain supported here by the conjugation table and earlier pedagogical examples, not by a newly verified literary token.

## 3. Lexical-sense caution
The English–Kurmanji word list defines `derketin` as “to go out” and “to leave”, and gives `Ez evro se’et êk ji mal derketim` (“I left the house at one today”) as an example. The Kurdish Academy table labels the same infinitive “to happen”. The Welat example `şer derket` demonstrates the “break out / happen” use; Qedrîcan and Şêxo demonstrate physical departure from a place.
These are compatible lexical uses of the same verb, not grounds for creating separate conjugation paradigms. In B3, teach the core “go out / leave” sense with `ji` in the cited examples, and introduce “break out / happen” as a context-dependent extended sense.
Sources: English–Kurmanji Word List, https://www.bokan.de/laperekan/zman%20u%20ferheng/Englisch-Kermanji.pdf ; Kurdish Academy, https://kurdishacademy.ch/kurmancu00ee/leker/allverbs.html

## 4. Evidence matrix
| Form | Example/source | Evidence status |
|---|---|---|
| `derketim` | `Gava ji Eyndîwerê derketim...` — Qedrîcan, “Rojên Derbasbûyî” | Direct literary first-person singular |
| `derketî` | `... tu ji malê derketî` — Şêxo / Roja Nû 1986 | Direct literary second-person singular |
| `derket` | `... şer derket` — Welat 41, 1992 | Direct journalistic third-person singular, intransitive |
| `derketin` (plural) | Kurdish Academy six-pronoun table; earlier pedagogical examples | Table/pedagogical support; no new literary plural token verified in this pass |

## 5. B3 editorial recommendations
1. The singular past forms `derketim`, `derketî`, and `derket` now have independent literary/journalistic examples; preserve their exact source citations.
2. Present the plural `derketin` as supported by the published conjugation table and pedagogical examples until a clean literary plural concordance is verified.
3. Keep `derketin` intransitive in these examples. Do not confuse `şer derket` with transitive ergative examples.
4. Teach `ji + place` as the pattern in the cited “leave/go out” examples, while avoiding an absolute rule for every complement.
5. Distinguish the “leave/go out” sense from “break out/happen” through context, not through an invented separate verb paradigm.
6. This is research documentation only. Existing lessons remain unchanged pending explicit approval.

## References
1. Qedrîcan, “Rojên Derbasbûyî,” in *Kurmanji Readings*, pp. 89–90 (online transcription): https://doczz.net/doc/5342767/kurmanji-readings
2. Dr. Ebdilmecît Şêxo, *Gurzek Gotar* (first edition 2011), pp. 111–112; poem originally published in Roja Nû, 1986: https://www.kurdipedia.org/files/books/2022/410323.PDF
3. Welat, no. 41, 29 November–5 December 1992: https://usercontent.one/wp/portal.arsivakurd.org/wp-content/uploads/2021/08/Welat_41_opt.pdf?media=1709107483
4. Kurdish Academy, “All Verb Forms”: https://kurdishacademy.ch/kurmancu00ee/leker/allverbs.html
5. English–Kurmanji Word List: https://www.bokan.de/laperekan/zman%20u%20ferheng/Englisch-Kermanji.pdf

## Project boundary
Documentation only on fix/kurmanji-ci-current-migration. Course inventory remains 26 + 12. No lesson text, application code, CI, production Supabase, migrations, deployment, or PR #3 was touched.