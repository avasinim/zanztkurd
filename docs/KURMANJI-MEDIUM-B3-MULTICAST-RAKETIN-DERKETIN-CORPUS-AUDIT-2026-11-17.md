# B3 Kurmanji: Direct Multi-CAST Corpus Check for Raketin and Derketin
Date: 2026-11-17
Branch: fix/kurmanji-ci-current-migration
Scope: read-only inspection of the public Multi-CAST Northern Kurdish CLDF utterance table; this document records evidence and limits only.

## Executive result
A direct scan of all 556 data rows in `cldf/utterances.csv` (557 lines including header) found present/imperfective, subjunctive, and imperative forms related to the two verbs, but no directly attested simple-past token for either `raketin` or `derketin` in this small spoken corpus release. This is a bounded negative result for this dataset, not evidence that the verbs lack past forms and not a claim about all Kurmanji varieties.

## Corpus identity and sampling limits
The Multi-CAST Northern Kurdish dataset contains three traditional narrative texts. Two texts (`muserz01` and `muserz03`) are by one male speaker who grew up near Muş; the other (`muserz02`) is by a female speaker from the Tekman region south of Erzurum. The Muş speaker's metadata explicitly notes strong Turkish influence on his Kurdish after many years in Germany. Therefore, this corpus cannot be treated as a balanced survey of Standard Kurmanji or as a substitute for the larger contemporary written corpus.
The release is openly licensed CC BY 4.0. The corpus creators ask users to cite both the original Multi-CAST source and the derived dataset version.

## 1. Raketin: what is actually attested
Direct token: `rakev-in` in utterance `muserz03_0041`.
Context: `hûn ê di nava cîkî da rakevin`.
Corpus gloss: `2PL FUT ... SUBJ.sleep.PRS-PL`.
Interpretation: a future/subjunctive plural form in a narrative, not a simple-past form. It provides independent spoken-corpus evidence for the lexical verb and its surface shape in this speaker's variety, but it does not independently verify the past stem `raket` or the negative past `raneketin`.

## 2. Derketin: what is actually attested
Direct token: `derkev-î` in utterances `muserz01_0079` and `muserz01_0088`.
Contexts include `ji gund derkevî` and `tu yê ji mala min derkevî`.
Corpus gloss: `go_out.PRS.SUBJ-2SG`.
Direct token: `derkeve` in utterances `muserz03_0101` and `muserz03_0125`, glossed as an imperative second-person singular.
Direct token: `derkevin` in utterance `muserz01_0014`, glossed as indicative present third-person plural (“the stars come out”).
Interpretation: these are present/subjunctive or imperative forms. None is a simple-past form. The token `derken` in `muserz01_0132` is explicitly glossed as Turkish `derken` (“saying/as they say”), so it must not be counted as a Kurmanji inflection of derketin.

## 3. Search method and limits
The scan examined every row of the released CLDF `utterances.csv`, checking the surface text, segmented `Analyzed_Word`, and English morpheme gloss columns for forms containing the target stems and their inflectional shapes. Seven rows matched broad character-string checks; after excluding the Turkish discourse marker `derken` and the unrelated verb `derîn`, the remaining tokens were the present/subjunctive/imperative forms listed above.
The dataset has only 556 utterance rows across three narratives. It is spoken narrative material from two speakers, not a large representative written corpus. Absence of a simple-past token here cannot settle the past paradigm.

## 4. Consequences for the B3 evidence register
1. Keep `raketin → raket` and `Em doh xweş raneketin` attributed to the previously cited pedagogical source only; this corpus scan did not add past-tense corroboration.
2. Keep `derketin → derket`, `derketim`, `derketî`, and `derketin` at the previously recorded pedagogical-source evidence level; this scan adds direct corpus attestations for present/subjunctive and imperative forms only.
3. Do not label any of the corpus tokens above as past tense.
4. Next best source is the 214,000-word Corpus of Contemporary Kurdish Newspaper Texts (CCKNT), whose downloadable raw text is public, followed by the 900,000+ word Corpus of Contemporary Written Kurdish (CCWK), which is available by request.
5. No existing lesson has been changed; this is research documentation only.

## Source references
1. Haig, Geoffrey; Vollmer, Maria; Thiele, Hanna. 2023. Multi-CAST Northern Kurdish, version 2311. Corpus release repository and CLDF data: https://github.com/Multi-CAST/mcnkurd (dataset licence CC BY 4.0).
2. DoReCo Northern Kurdish (Kurmanji) dataset record, including dataset creators and citation requirements: https://doreco.huma-num.fr/languages/nort2641 (DOI: 10.34847/nkl.ca10ez5t).
3. Haig, Geoffrey. 2001. The Corpus of Contemporary Kurdish Newspaper Texts (CCKNT), 483 texts, approx. 214,000 words; downloadable `ccknt.txt`: https://fd-repo.uni-bamberg.de/records/v6rmw-cx940 (DOI: 10.48564/unibafd-v6rmw-cx940).
4. Incekan, Abdullah & Haig, Geoffrey. 2021. The Corpus of Contemporary Written Kurdish (CCWK), 900,000+ words, access by request: https://fd-repo.uni-bamberg.de/records/hp82b-k0k26 (DOI: 10.48564/unibafd-hp82b-k0k26).

## Project boundary
Documentation only on fix/kurmanji-ci-current-migration. Course inventory remains 26 + 12. No lesson content, application code, CI, production Supabase, migrations, deployment, or PR #3 was touched.