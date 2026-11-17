# B3 Kurmanji: Comparative Past Alignment and Preverb Dialect Audit
Date: 2026-11-17
Branch: fix/kurmanji-ci-current-migration
Scope: source-led documentation only; no lesson or application changes.

## Executive conclusion
Do not define one past-tense transitive agreement pattern as universal Kurmanji. The evidence supports at least two well-described patterns: (1) canonical ergative alignment in Standard/ KurmanjiA descriptions, where the oblique agent co-occurs with a direct object and the verb agrees with that direct object; and (2) double-oblique patterns documented in KurmanjiB, KurmanjiH and Muş-related data, where both arguments may be oblique and the verb may surface in default third-person singular. The exact distribution is dialect- and speaker-dependent; labels in individual studies must not be casually equated with broad regional identities.

## 1. Comparative evidence
### Canonical / KurmanjiA pattern
Haig's Northern Kurdish overview describes ergative construction with past transitive verbs, alongside variation across dialects. The comparative study by Atlamaz, Demirok and Bağrıaçık provides acceptability judgments: KurmanjiA consultants accept oblique-agent/direct-object alignment (obl-dir), while rejecting the double-oblique examples in the tested contrast.
Published canonical examples include Min tu dît-î (“I saw you”) and Te ez dît-im (“You saw me”): the agent is oblique and the direct object controls person agreement.

### Double-oblique pattern
The same comparative study reports that KurmanjiB and KurmanjiH show double-oblique alignment in past transitive clauses, unlike the tested KurmanjiA consultants.
A separate Muş dialect study gives examples such as Min te dît-Ø and Te min dît-Ø, with both arguments oblique and the verb in default third-person singular. It also records Ku te şimik-ê hilda-Ø (“when you held the slipper”), directly showing that even hildan can appear in this dialectal construction with a default singular verb.
This Muş example is a particularly important warning: do not apply the Standard/KurmanjiA object-agreement table mechanically to all Muş speech.

## 2. Intransitive past remains a useful contrast
The comparative paper gives Ez ket-ım (“I fell”) and Ez rvi-m (“I ran”) as direct-subject intransitive past examples. These retain direct/nominative subject marking and subject agreement. Thus, the contrast between intransitive past and transitive past is useful pedagogically, but the transitive side must be labelled by target variety.

## 3. Preverb placement: raketin
Haig's areal overview explicitly gives Standard Kurmanji ra-di-keve for “goes to sleep”, from raketin. This supports the Standard pattern in which the imperfective/indicative prefix di- is placed between the preverb ra- and the verbal stem.
The same overview notes that Şemzînan/SEK patterns may lexicalize preverb-plus-stem more tightly, with indicative or negative prefixes occurring before the preverb in some forms. Therefore ra-di-keve should not be treated as a universal surface template for every Kurmanji variety.
This evidence is about present/imperfective preverb placement. It does not independently establish a complete past paradigm for raketin; the earlier past stem raket and the example raneketin remain at the evidence level described in the prior audit.

## 4. Recommended B3 teaching policy
1. Name the target variety on each grammar reference page. If the intended norm is Standard Kurmanji Hawar-based modified Roman, state that explicitly as the working target, not as an owner-approved final dialect policy.
2. Present the canonical transitive past pattern as the Standard/KurmanjiA teaching model only where the source supports that label.
3. Add a short dialect note: some varieties, including published KurmanjiB/KurmanjiH and Muş-related data, show double-oblique constructions and default third-person singular agreement.
4. Keep intransitive past examples such as Ez ketim separate from transitive examples such as Min tu dîtî.
5. Treat preverb placement as variety-sensitive. Standard ra-di-keve is attested; Şemzînan patterns can differ.
6. Do not turn this audit into lesson edits. Existing lesson content remains unchanged pending explicit approval.

## Evidence matrix
| Topic | Evidence | Safe conclusion |
|---|---|---|
| Standard/KurmanjiA transitive past | Haig overview; Atlamaz et al. acceptability judgments; Min tu dîtî / Te ez dîtim | Oblique agent + direct object; object agreement in this variety |
| KurmanjiB/KurmanjiH | Atlamaz et al. comparative table | Double-oblique pattern reported; do not assume canonical alignment |
| Muş transitive past | Muş study: Min te dît-Ø; Te min dît-Ø; Ku te şimikê hilda-Ø | Double-oblique and default 3sg documented in data |
| Intransitive past | Ez ketim / Ez rvîm examples | Direct subject and subject agreement |
| raketin preverb | Standard ra-di-keve; Şemzînan preverb incorporation discussion | Prefix order varies; no universal template |

## Sources
1. Geoffrey Haig, “Northern Kurdish (Kurmanjî): An Areal Perspective,” section 2.7.2 and discussion of dialect variation: https://www.uni-bamberg.de/fileadmin/aspra/06_Team/Publications_and_CV/haig_2018_ch.2.3_northern_kurdish.pdf
2. Ümit Atlamaz, Ömer Demirok & Metin Bağrıaçık, comparative study of split ergativity in heritage Kurmanji and Georgian, examples and Table 6/7: https://www.glossa-journal.org/article/9236/galley/23054/download/
3. “Variation in the Ergative Pattern of Kurmanji,” Wiener Jahrbuch für Kurdische Studien 5, Muş data and examples: https://depot.phaidra.at/api/object/o%3A199/download
4. Mehmet Yavaş & Hayreddin Kızıl, “Ergatîvî di Kurdiya Kurmancî de û Rewşên Awarte yên Ergativiya Kurmancî,” Kurdiname 2 (2020): https://dergipark.org.tr/en/pub/kurdiname/article/687447
5. Geoffrey Haig, “Kurmanji in Turkey: structure, varieties, and status,” preverb incorporation and Şemzînan comparisons: https://www.academia.edu/17650650/Kurmanji_in_Turkey_structure_varieties_and_status

## Safety boundary
This file is research documentation only on fix/kurmanji-ci-current-migration. It does not alter course inventory (26 + 12), lessons, code, CI, production Supabase, migrations, deployment, or PR #3.