# B3 Four-Verb Paradigm Audit — Independent QA and Errata

**Date:** 2026-11-17  
**Reviewed document:** `docs/KURMANJI-MEDIUM-B3-CORE-FOUR-VERB-PARADIGMS-EVIDENCE-AUDIT-2026-11-17.md`  
**Reviewed commit:** `ae8f4e10f5cd37880da5bfe01cc974c1cc864978`  
**Working branch:** `fix/kurmanji-ci-current-migration`  
**Status:** documentation-only independent source check; no learner-facing material changed.

## 1. Purpose

This addendum independently checks several high-impact claims and transcription choices in the four-verb audit against the accessible author-hosted scholarly texts and the Thackston reference grammar text. It is an errata and qualification note, not a replacement paradigm and not approval to publish learner content.

## 2. Confirmed source matches

### 2.1 Haig (2018), Table 14

Haig's Table 14 directly attests all six persons for the simple present of transitive `gotin`:

- `ez dibêjim`
- `tu dibêjî`
- `ew dibêje`
- `em dibêjin`
- `hûn dibêjin`
- `ew dibêjin`

The same table directly attests the six-person simple past of intransitive `hatin`:

- `ez hatim`
- `tu hatî`
- `ew hat`
- `em hatin`
- `hûn hatin`
- `ew hatin`

The forms and person labels in the main audit match the table. Haig separately identifies `hatin` as having suppletive present stems with regional variation: `-(h)ê-` and `-wer-`; the Standard Kurmanjî indicative 1sg `têm` is explained as a contraction of `di-hê-m`. These statements support retaining a variety label rather than flattening all variants into one paradigm.

### 2.2 Haig & Öpengin (2018), Table 9 and §3.7.2

Table 9 confirms the principal-part entries:

| Infinitive | Past stem | Present stem in source |
|---|---|---|
| `hatin` | `hat-` | `-(h)ê- / -wer-` |
| `gotin` | `got-` | `-bej-` |
| `dîtin` | `dît-` | `-bîn-` |

The table prints the `gotin` present stem as `-bej-`, while Haig's finite forms elsewhere include `dibêjim/dibêjî/dibêje`. The main audit's `-bêj-` is therefore a normalized/orthographic presentation, not a literal reproduction of the Table 9 string. **Editorial correction:** label it as normalized `-bêj-` (source Table 9: `-bej-`) or preserve the source form in the evidence column. Do not silently imply exact character-for-character identity.

The same source gives two finite past examples of `anîn`:

- `Jinik-ek-ê çay-a me anî` — ‘A woman brought our tea.’
- `Wî mirov-î çay anî` — ‘That man brought tea.’

Both are analyzed as `bring.PST.3SG`. This supplements, but does not contradict, the main audit: a past form is directly attested; a complete six-person `anîn` past paradigm is not established by these examples.

The source also gives `Gundi-yan tişt-ek ne-got` — ‘The villagers didn’t say anything’ — with `say.PST.3SG`, and discusses the special discourse conditions under which a plural transitive subject can control plural agreement despite a singular direct object. The main audit correctly warns against extrapolating a single uncomplicated past-transitive paradigm.

### 2.3 Thackston (2006), §14

The accessible text confirms the complete affirmative and negative present tables for `hatin` and `anîn` as transcribed in the main audit. It also explicitly identifies `bîn-` as the present stem of `dîtin`.

The Thackston text prints the second-person plural pronoun as `hun` in the relevant table, while Haig prints `hûn`. The main audit's use of `hun` in the Thackston-transcribed tables is appropriate as source transcription; do not silently normalize it without marking the editorial normalization.

## 3. Required qualifications to the main audit

| ID | Finding | Disposition |
|---|---|---|
| QA-01 | The main audit's B3 sequence groups `gotin`, `hatin`, and `anîn` present paradigms, although the forms are drawn from different descriptive sources. | Before teaching them together, specify the target variety and obtain an editor's confirmation that the source paradigms are compatible. |
| QA-02 | `-bêj-` in the main audit differs from Table 9's literal `-bej-`. | Mark as normalized spelling or retain both forms with provenance. |
| QA-03 | Thackston's `hun` and Haig's `hûn` differ typographically. | Preserve source transcription in quotations/tables; state any house-style normalization explicitly. |
| QA-04 | Haig & Öpengin provide finite past examples of `anîn` (`anî`, 3sg), though not a full paradigm. | Add this evidence to the record; do not call the past tense wholly unattested. |
| QA-05 | The proposed sequence contains a punctuation typo: `anîn),`. | Correct to `anîn,` if the main report is ever revised. |
| QA-06 | The main audit's `dîtin` present stem `-bîn-` is independently confirmed by Haig & Öpengin and Thackston, but no six-person finite table was verified in the consulted excerpts. | Keep the six finite forms unverified; do not generate them by analogy. |

## 4. Variety and agreement controls

Haig's “Standard Kurmanjî” sketch is explicitly described as loosely based on Cizre/Botan. Haig & Öpengin's chapter describes Kurmanji in Turkey and documents dialect-sensitive agreement. Thackston's reference grammar provides its own descriptive system and transcription. These works are valuable complementary sources, but their examples must not be merged into a single learner-facing paradigm without a declared target variety and native-editor review.

For past transitive clauses, the canonical pattern described by Haig & Öpengin is an Oblique transitive subject, a Direct object, and verbal agreement with the Direct object. Their examples include `anî` and `ne-got`. They also document discourse-conditioned plural subject agreement and regional double-oblique patterns. Therefore, the main audit's restriction against constructing full past-transitive tables from the intransitive `hatin` paradigm is confirmed.

## 5. Disposition

- The main audit's directly transcribed present paradigms for `hatin`, `anîn`, and `gotin`, and the intransitive past of `hatin`, are supported by the consulted source texts.
- The main audit should distinguish literal source notation from normalized orthography for `-bej-/-bêj-` and `hun/hûn`.
- Add the attested 3sg past examples of `anîn` to the evidence register, while retaining the gap for a complete six-person past paradigm.
- Keep the cross-source teaching sequence provisional until the project owner approves a reference variety and a qualified Kurmanji editor checks compatibility.
- Do not add any generated `dîtin` paradigm, and do not change learner-facing lessons or seed payloads.

## 6. Source register

1. **Haig, Geoffrey. 2018.** “Northern Kurdish (Kurmanjî).” In *The Languages and Linguistics of Western Asia: An Areal Perspective*, pp. 106–158. De Gruyter Mouton. DOI: https://doi.org/10.1515/9783110421682-004. Author-hosted PDF: https://www.uni-bamberg.de/fileadmin/aspra/06_Team/Publications_and_CV/haig_2018_ch.2.3_northern_kurdish.pdf. Relevant: §2.6, Table 14, p. 126; §2.6.2, p. 127.
2. **Haig, Geoffrey & Ergin Öpengin. 2018.** “Kurmanji Kurdish in Turkey: Structure, varieties and status.” Author-hosted PDF: https://www.uni-bamberg.de/fileadmin/aspra/06_Team/Publications_and_CV/HaigOepengin2018_Kurmanji_Kurdish_.pdf. Relevant: §3.6, Table 9, p. 183; §3.7.2, pp. 190–191.
3. **Thackston, W. M. 2006.** *Kurmanji Kurdish: A Reference Grammar with Selected Readings.* Relevant: §14, pp. 33–34. Accessible text copy: https://www.academia.edu/5485402/Kurmanji_Kurdish_A_Referance_Grammar_with_Selected_Readings_by_W_M_Thackston.

## 7. Safety

This addendum is documentation-only. It does not modify any lesson, seed file, application code, tests, CI, migration, database, Supabase project, PR #3, or deployment. It does not approve the proposed reference variety or any learner-facing paradigm.
