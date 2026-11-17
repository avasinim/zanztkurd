# Course 1 lessons 25–26 — primary-source verification update

Date: 2026-11-17  
Branch: fix/kurmanji-ci-current-migration  
Baseline HEAD: 23f853fe06a57070389908b537dd213d15e482f2  
Pre-work backup: backup/kurmanji-c1-l25-26-ergativity-review-before-2026-11-17  
Scope: additional primary-source verification of existing lessons 25–26 and reconciliation of one earlier unresolved example claim. Documentation only.

## 1. Executive disposition

The earlier claim-level register for lessons 25–26 remains broadly sound, but one status must be updated:

- **Min ew dît is now directly attested**, verbatim, in W. M. Thackston, *Kurmanji Kurdish: A Reference Grammar with Selected Readings*, §18.2, p. 48. Thackston gives it as “I saw him” and explicitly contrasts agent changes with patient changes. The previous register's “verbatim attestation not established” conclusion is superseded.
- The lesson's analysis of min as oblique agent, ew as direct patient, and dît as third-person singular past verb is supported by Thackston's table and Haig (2018).
- **roj should remain spelled with one r.** Thackston says all word-initial r's are trilled, while the trill is only sporadically represented by rr elsewhere (e.g. pir, sometimes pirr). Thus roj begins with a trill in pronunciation but is not written rroj. The current lesson's note about r/rr is too compressed and risks implying an extra letter or obligatory doubling.
- Haig's 2018 account directly supports the Standard Kurmanji Direct/Oblique paradigm and its dialect caveats. The 31-letter Hawar-based inventory is independently listed in a CLDR-based alphabet overview; phonetic realization must remain distinct from orthographic convention.

**No lesson text, seed, migration, code, database, PR or deployment was changed.**

## 2. Sources inspected and exact locators

### A. Thackston — Kurmanji reference grammar

W. M. Thackston, *Kurmanji Kurdish: A Reference Grammar with Selected Readings*. PDF:  
https://zimannas.wordpress.com/wp-content/uploads/2020/04/kurmanji_complete.pdf

Relevant exact locations:
- “The Phonology of Kurmanji Kurdish,” pp. 1–3, especially the flap/trill discussion on printed p. 3.
- §18.2, “The Simple Past (Transitive): The Ergative,” pp. 47–49.
- Printed p. 48: the table explicitly lists Min ew dît = “I saw him”; the preceding paradigm explains agent in oblique case, patient in direct/unmarked case, and verb agreement with patient.
- Printed p. 49: the table further contrasts singular wî ew dît with plural patient wî ew dîtin.

The book's preface says its description aims to represent the norm adopted by the majority of writers, while acknowledging abundant regional dialects and the lack of complete standardization. Its examples should therefore be attributed to that pedagogical written norm, not asserted as invariant for every spoken variety.

### B. Haig — Northern Kurdish (Kurmanjî)

Geoffrey Haig (2018), “Northern Kurdish (Kurmanjî),” in Geoffrey Haig & Geoffrey Khan (eds.), *The Languages and Linguistics of Western Asia: An Areal Perspective*, pp. 106–158.  
DOI: https://doi.org/10.1515/9783110421682-004  
Author-hosted PDF: https://www.uni-bamberg.de/fileadmin/aspra/06_Team/Publications_and_CV/haig_2018_ch.2.3_northern_kurdish.pdf

Exact locators:
- pp. 107–109: dialect continuum and description of Standard Kurmanjî.
- p. 109: Standard Kurmanjî is loosely based on Cizre/Botan and Hawar-derived written conventions.
- p. 114: all word-initial r sounds are trilled; other environments show a non-predictable distribution of flap and trill.
- pp. 115–116, Table 7 and accompanying prose: Standard Kurmanjî Direct/Oblique nominal paradigms; gund/gund-î/gund-ek/gund-ek-î and jin/jin-ê/jin-ek/jin-ek-ê; oblique functions; masculine singular zero/suppressed marking and dialect variation.
- pp. 116–117: plural and dialectal variation.
- p. 117, Table 9: personal pronouns ez/min, tu/te, ew/wî,wê, em/me, hûn/we, ew/wan.
- pp. 130–132: neutral SOVG, past transitive ergativity, canonical case and agreement, and regional deviations including double-oblique patterns.

### C. Haig & Öpengin — gender and case

Geoffrey Haig & Ergin Öpengin (2015), “Gender in Kurdish: Structural and socio-cultural dimensions,” *Gender Across Languages*, vol. 4, pp. 248–275.  
DOI: https://doi.org/10.1075/impact.36.10hai  
Author-hosted offprint: https://www.uni-bamberg.de/fileadmin/aspra/06_Team/Publications_and_CV/haig_opengin_2015_gender_kurdish_offprint.pdf

Exact locators:
- §2.1.1, pp. 250–251: Direct/Oblique distinction and split alignment in present vs past transitive clauses; caution not to equate Direct/Oblique with nominative/accusative.
- p. 250: feminine -ê, masculine -î in the described standard paradigm, with jin-ek-ê and kur-ek-î.
- §2.1.2, pp. 250–251: gender/number-sensitive linking elements (ezafe).

### D. Independent alphabet overview

The Iranian diaspora, “Kurdish Latin alphabet (Hawar)”:  
https://iranians.global/language/scripts/kurmanji-latin/

This CLDR-based reference lists 31 letters and gives r as flap/trill phonetic values. It is an alphabet/encoding overview, not the principal authority for morphology or dialect-specific spelling. The more precise rr orthographic statement below comes from Thackston.

## 3. Lesson 25 — direct/oblique case and split alignment

### 3.1 Min ew dît is directly attested

**Earlier status:** partly supported; verbatim attestation not established.  
**Updated status:** directly attested in Thackston §18.2, printed p. 48.

Thackston's table gives:
- min — oblique agent “I”;
- ew — unmarked/direct patient “him”;
- dît — past form agreeing with third-person singular patient;
- Min ew dît — “I saw him”.

The same paradigm contrasts:
- min ew dît — I saw him;
- me ew dît — we saw him;
- te ew dît — you saw him;
- wî ew dît — he saw him;
- wan ew dît — they saw him.

It then contrasts patient number:
- wî ew dît — he saw him;
- wî ew dîtin — he saw them.

This is direct evidence for the exact string in the current seed, not merely an inference from a general rule. The current lesson's Sorani gloss “من ئەوم بینی” is consistent with Thackston's English gloss, but Sorani spelling and style still require the separate native Sorani editorial pass.

### 3.2 The rule and its scope

Haig (2018), §2.7.2, pp. 130–132, describes the canonical past transitive construction:
- transitive agent/subject in Oblique;
- direct object/patient in Direct;
- verb agrees with the Direct object;
- subjecthood remains distinct from surface case, including control of xwe.

Haig & Öpengin (2015), §2.1.1, pp. 250–251, independently state the present/past split:
- present transitive: subject Direct, object Oblique;
- past transitive: subject Oblique, object Direct.

The current lesson's description of Min ew dît is therefore correct for the canonical standard pattern. Its adjacent caveat that dialects can differ is necessary.

### 3.3 Dialect caveat — do not overgeneralize

Haig (2018), pp. 131–132, documents a tendency in some Central Anatolian western dialects to mark the direct object of a past transitive verb Oblique as well, creating a double-oblique construction. The Muş example shows this pattern. Haig identifies other departures from canonical ergativity, including variation in verbal agreement.

This does not invalidate the lesson's standard paradigm. It means the course must:
- label the paradigm as the selected standard/pedagogical pattern;
- keep the double-oblique pattern in a dialect note or advanced material;
- avoid describing one construction as universally obligatory for every Kurmanji speaker.

### 3.4 Masculine singular nominal case requires a more precise caveat

Haig (2018), Table 7, p. 115, lists the standard paradigm gund / gund-î and gund-ek / gund-ek-î, alongside feminine jin / jin-ê and jin-ek / jin-ek-ê. The same passage says the oblique marker may be absent with singular masculine nouns. On p. 116, Haig clarifies that bare masculine singular suffix marking is consistently retained especially in Badinan and eastern Hekari, while the marker is regularly applied across dialects when a determiner or -ek is present.

The lesson's current caveat (“in some dialects, especially bare masculine singular nouns, the marker may not appear”) is directionally correct but could be more informative. A teacher note should distinguish:
- the pedagogical Standard K. paradigm shown in Table 7;
- frequent zero/suppressed marking on bare masculine singulars in many varieties;
- more consistent suffixal marking in Badinan and eastern Hekari;
- the more robust suffix in determined or indefinite masculine singular NPs.

Do not replace the lesson table with one dialect's paradigm before the reference variety is selected.

## 4. Lesson 26 — Hawar orthography and r/rr

### 4.1 Alphabet count and phonetic realization are different questions

The lesson is right to avoid treating rr as an additional alphabet letter. A 31-letter Hawar alphabet inventory is distinct from:
- phonemic or phonetic contrasts;
- allophonic or dialect-conditioned realizations;
- optional orthographic conventions.

Haig (2018), pp. 109 and 114, describes the Hawar-derived written standard and the initial-r trill rule. The CLDR-based alphabet overview independently lists 31 letters.

### 4.2 The exact r/rr rule

Thackston, “The Phonology of Kurmanji Kurdish,” printed p. 3, says:
- r is a flap [ɾ] and does not occur word-initially;
- the trill [r] occurs word-initially;
- all initial r's are trilled;
- the trill is only sporadically indicated in orthography by rr, for example pir ‘very’, sometimes written pirr;
- otherwise the trill is not indicated in writing.

Haig (2018), p. 114, independently says all word-initial <r> sounds are trilled, but in other environments the distribution of flap and trill is not predictable. Haig gives phonetic contrasts including [pʰir] ‘much, many’ versus [pʰiɾ] ‘bridge’.

### 4.3 Consequence for roj

roj begins with a word-initial r, so its initial sound is trilled according to both Haig and Thackston. It remains spelled roj; the initial trill is not written as rr by default. The current seed says “standard orthography distinguishes r and rr in some words” immediately beside roj, which is too compressed and may invite the false inference rroj.

**Recommended wording for a future approved correction:**

> لە دەنگداندا، r لە سەرەتای وشەدا بە شێوەی ترێڵ دەردەبڕدرێت؛ بەڵام لە ڕێنووسدا هەمیشە بە rr نانووسرێت. rr لە هەندێک وشە و لە هەندێک شێوازی نووسین‌دا بە شێوەیەکی کەم بەکاردێت؛ بۆیە roj بە هەمان r دەنووسرێت.

This is a proposal only; no lesson text was changed.

### 4.4 Do not infer a minimal pair from the Arizona table

The previously recorded Arizona page has a prose statement that trill may be marked with rr, but its table row labelled rr gives roj with a single r. This internal inconsistency cannot establish that roj should be doubled. Thackston's more precise description and Haig's phonetic description support retaining roj, not changing it to rroj.

The lesson should not invent a minimal pair or present rr as a mandatory distinction in all words.

## 5. Consolidated update to the earlier evidence register

| Earlier register claim | Updated result | Evidence |
|---|---|---|
| C25-10: Min ew dît verbatim attestation unresolved | **SUPPORTED: exact form directly attested** | Thackston §18.2, p. 48 |
| C25-07/08: canonical past-transitive split and object agreement | **SUPPORTED with dialect scope retained** | Haig 2018 §2.7.2, pp. 130–132; Haig & Öpengin 2015 §2.1.1 |
| C25-03: masculine singular Oblique suffix | **SUPPORTED, but zero/suppressed marking needs a sharper variety note** | Haig 2018 Table 7 pp. 115–116 |
| C26-01: Hawar inventory 31 letters | **SUPPORTED at alphabet-reference level** | CLDR-based Hawar alphabet inventory; Haig 2018 pp. 109 and 114 |
| C26-02/03: rr is not a 32nd letter; roj should not become rroj | **SUPPORTED; add explicit initial-r pronunciation vs spelling distinction** | Thackston phonology p. 3; Haig 2018 p. 114 |

## 6. Remaining closure items

1. Native Kurmanji specialist confirms all lesson 25 inflections and exact variety intended by the course.
2. Native Sorani editor checks all definitions and glosses in lessons 25–26.
3. Owner/editor selects the reference spoken variety before dialect-specific paradigms are promoted to core teaching rules.
4. If lesson 26 is revised later, state explicitly that initial r is trilled in pronunciation but written as r in roj; mention optional/rare rr only with a sourced example such as pir/pirr.
5. Keep rr outside the 31-letter alphabet inventory.
6. Recheck all other recap examples separately; this update validates the targeted claims, not every sentence in lesson 26.

## 7. Actions not taken

No changes were made to:
- Course 1 lesson 25 or 26 content;
- any seed SQL or migration;
- static lesson shells or site code;
- CI, validators or tests;
- database, production or staging;
- PR #3, main, merge state or deployment.

No SQL was executed. This is a source-evidence update and proposal-only editorial note.

## 8. References

1. Thackston, W. M. *Kurmanji Kurdish: A Reference Grammar with Selected Readings*. “The Phonology of Kurmanji Kurdish,” p. 3; §18.2, pp. 47–49. PDF: https://zimannas.wordpress.com/wp-content/uploads/2020/04/kurmanji_complete.pdf
2. Haig, Geoffrey. 2018. “Northern Kurdish (Kurmanjî).” In Geoffrey Haig & Geoffrey Khan (eds.), *The Languages and Linguistics of Western Asia: An Areal Perspective*, pp. 106–158. DOI: https://doi.org/10.1515/9783110421682-004. PDF: https://www.uni-bamberg.de/fileadmin/aspra/06_Team/Publications_and_CV/haig_2018_ch.2.3_northern_kurdish.pdf
3. Haig, Geoffrey & Ergin Öpengin. 2015. “Gender in Kurdish: Structural and socio-cultural dimensions.” *Gender Across Languages*, vol. 4, pp. 248–275. DOI: https://doi.org/10.1075/impact.36.10hai. PDF: https://www.uni-bamberg.de/fileadmin/aspra/06_Team/Publications_and_CV/haig_opengin_2015_gender_kurdish_offprint.pdf
4. The Iranian diaspora. “Kurdish Latin alphabet (Hawar).” CLDR-based alphabet inventory. https://iranians.global/language/scripts/kurmanji-latin/

## Backup record

- Pre-work backup: backup/kurmanji-c1-l25-26-ergativity-review-before-2026-11-17
- Baseline SHA: 23f853fe06a57070389908b537dd213d15e482f2
- Post-work backup: to be recorded after commit and exact ref/blob verification.
