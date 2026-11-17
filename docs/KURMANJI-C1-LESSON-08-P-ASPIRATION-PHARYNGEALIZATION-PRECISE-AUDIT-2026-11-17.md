# Course 1 Lesson 08 — P / Pʰ / Pˤ: aspiration and pharyngealization precise audit

Date: 2026-11-17  
Repository: avasinim/zanztkurd  
Working branch: fix/kurmanji-ci-current-migration  
Baseline HEAD: cfcfce2dc348d43633aef2948d674ad42aa7364c  
Pre-work backup: backup/c1-l08-p-aspiration-pharyngealization-before-2026-11-17  
Scope: exact Lesson 08 claim about /p/ and /pˤ/, compared with primary phonological descriptions and dialect evidence. Proposal-only; no lesson or seed content changed.

## 1. Executive finding

The current Lesson 08 correctly warns that pronunciation varies by dialect and that the standard Latin orthography does not mark every phonetic detail. However, its row for `p / pˤ` compresses several distinct analyses into one sentence:

> «لە هەندێک شێوەزاردا /p/ و /pˤ/ دوو دەنگی جیاوازن؛ /pˤ/ وەستانێکی بێ‌هەناسەیە کە زۆرجار لەگەڵ فەرینجالیزەبوون دێت.»

This is too underspecified for a learner-facing phonetics explanation. In particular, it risks teaching that “unaspirated” and “pharyngealized” are interchangeable descriptions. They are not the same phonetic dimension. Some Kurmanji descriptions explicitly associate the unaspirated stop series with slight pharyngealization; other analyses distinguish aspirated and unaspirated stops while treating pharyngealization as a separate, dialect-sensitive feature that may affect a vowel or a whole syllable.

**Disposition:** retain the lesson's central point that pronunciation is not exhaustively represented in Hawar spelling, but separate aspiration, lack of aspiration, and pharyngealization. Identify each transcription as source-specific and variety-bounded. Do not present `pˤ` as a universal Kurmanji phoneme or as a Hawar letter.

## 2. Exact repository material inspected

| Artifact | Blob SHA | Relevant content |
|---|---|---|
| `docs/kurmanji-content-seed-part-01.sql` | `71f84f993e97b91605b68abccabbbabc9ab07a25` | Draft Course 1 Lessons 01–08 payload; exact Lesson 08 P / Pˤ row |
| `docs/KURMANJI-COURSE-1-LESSONS-07-12-CLAIM-LEVEL-EVIDENCE-REGISTER-2026-11-16.md` | `4f43c5c0861669250cc28e8c15ab6f7a4e56637a` | C1-L08-04 and C1-L08-05 already flag dialect scope and technical terminology |
| `docs/KURMANJI-C1-LESSON-04-RR-CROSS-LESSON-CONSISTENCY-AUDIT-2026-11-17.md` | `2eb581b404357eb7ffb5f89ba238d6aba0065c02` | Cross-lesson rule: keep grapheme, phoneme, phonetic realization and orthographic convention distinct |

The seed is a checked-in draft SQL file, not proof of live database content. It was read as text only; no SQL was executed.

## 3. Primary-source reconciliation

### 3.1 Haig & Öpengin — three-way stop contrast and the written norm

Geoffrey Haig and Ergin Öpengin, “Kurmanji in Turkey: Structure, varieties, and status” (pre-publication draft, 2015), §3.1.2, printed pp. 14–15:

- Their generalized consonant description distinguishes voiceless aspirated, voiceless unaspirated and voiced stop series.
- Examples include aspirated [pʰ] versus unaspirated [p], alongside voiced [b].
- They explicitly state that Standard Kurmanji orthography does not reflect the aspirated/unaspirated distinction: both voiceless members are written with the same grapheme `p` (and analogously `t, k, ç`).
- They report that the most striking “ejective” characteristics occur in Central Anatolian varieties (including Karakoçan, Dersim and Malatya) and fade gradually southeastward.
- They separately caution that the status and realization of pharyngeal sounds vary across dialects; pharyngealization may affect an entire syllable rather than being localizable on one consonant.

Source: https://www.academia.edu/17650650/Kurmanji_in_Turkey_structure_varieties_and_status  
Relevant source lines in the online draft: §3.1.2 and Tables 2–3 (lines 81–88 in the retrieved text).

**Implication:** the robust learner-level statement is that some Kurmanji varieties contrast aspirated and unaspirated stops, while the standard Hawar spelling uses the same letter `p`. This source does not justify treating `pˤ` as the one universal IPA notation for every unaspirated /p/.

### 3.2 Thackston — unaspirated stops with slight pharyngealization in one description

W. M. Thackston, *Kurmanji Kurdish: A Reference Grammar with Selected Readings*, “The aspirated and unaspirated stops,” printed pp. 2–3:

- The book contrasts aspirated `p, t, k, ç` with unaspirated counterparts.
- It describes the unaspirated series as accompanied by slight pharyngealization.
- It says the distinction is not indicated in the writing system and is not universally observed by all speakers.
- It gives source-specific notation and lexical examples to illustrate the contrast.

Source: https://zimannas.wordpress.com/wp-content/uploads/2020/04/kurmanji_complete.pdf

**Implication:** the lesson's association between unaspiration and slight pharyngealization has a source precedent. But it must be attributed to that phonological description and not elevated to a universal identity between the two features. The lesson should not silently turn the source's transcription convention into a general IPA rule.

### 3.3 Öpengin & Haig — dialect geography of deaspiration and pharyngealization

Ergin Öpengin and Geoffrey Haig, “Regional variation in Kurmanji: A preliminary classification of dialects,” *Kurdish Studies* 2(2), 2014, pp. 143–176; see the phonological comparison and Table 5, printed pp. 158–160:

- The paper documents substantial regional variation in pharyngealization.
- In its sampled varieties, pharyngealization of vowels/syllables is reported in Northern Kurmanji and to differing degrees in Southern and Southwestern varieties, but is absent in the sampled Southeastern and Northwestern varieties.
- The authors note that initial-stop deaspiration occurs in the Northwestern variety as well, and that deaspiration in Southeastern Kurmanji affects fewer lexical items and is less salient.
- The authors explicitly caution that their classification is preliminary and locality-based.

Source: https://doi.org/10.67145/ks.v2i2.62  
Accessible text: https://www.academia.edu/9265566/Regional_variation_in_Kurmanji_a_preliminary_classification_of_dialects

**Implication:** aspiration/deaspiration and pharyngealization do not have identical geographic distributions in the reported data. They should not be collapsed into a single “pˤ sound” rule for all Kurmanji.

### 3.4 Barry — a later alternative analysis

Daniel Barry, “Pharyngeals in Kurmanji Kurdish: A reanalysis of their source and status,” 2022, especially pp. 48–49:

- Barry presents a three-way contrast between voiceless aspirated, voiceless unaspirated and voiced stops in many Kurmanji dialects.
- His analysis does not include a separate consonantal pharyngealized stop series in the same way as some earlier accounts; he proposes an alternative analysis involving pharyngealized vowel phonemes and syllable structure.
- He states that the aspiration contrast is restricted to simple onsets in his analysis.

Source: https://doi.org/10.20378/irb-56758  
Open repository PDF: https://fis.uni-bamberg.de/server/api/core/bitstreams/a68c2d85-1c88-4b9b-a128-765c125a0f11/content

**Implication:** the phonological analysis is not settled by writing `pˤ` in a table. The course should teach the observable distinction and clearly label the analysis used, rather than imply universal consensus about the segmental representation.

## 4. Terminology that must remain distinct

| Term | What it describes | Safe learner-level explanation |
|---|---|---|
| Aspiration | A period of audible breath after release of a stop | “هەناسەداری” — پاش ئازادبوونی وەستانەکە هەناسەیەکی زیاتر دەبیسترێت |
| Unaspirated stop | A stop without that strong post-release breath | “بێ‌هەناسە” — بەرامبەر بە شێوەی هەناسەدار؛ بە تەنیا مانای فەرینجەییبوون نییە |
| Pharyngealization | A secondary articulation/phonetic quality involving the pharyngeal region; in some analyses its effects extend over the vowel or syllable | “فەرینجەییبوون” — تایبەتمەندییەکی جیاوازە و نابێت بە هەناسەداری یەکسان بگیرێت |
| Orthographic representation | How the writing system represents a contrast | Standard Hawar spelling uses `p`; it does not add a separate letter for the aspiration distinction |

The symbol `pˤ` is an analytical/transcription choice in some descriptions. It is not a letter of the 31-letter Hawar alphabet. A superscript `ˤ` conventionally signals pharyngealization; it should not be glossed simply as “unaspirated.”

## 5. Minimal editorial resolution — proposal only

Recommended correction direction, not replacement lesson prose:

1. Keep the point that the standard Latin orthography does not encode every pronunciation contrast.
2. Separate the stop contrast into `pʰ` (aspirated) and `p` (unaspirated) when describing sources that use that analysis.
3. Explain that both are written with the same standard Hawar grapheme `p`.
4. Add a separate sentence that some descriptions associate unaspirated stops with slight pharyngealization, while other analyses describe pharyngealization as a vowel- or syllable-level feature.
5. State that the presence and strength of these features vary by dialect and lexical item.
6. If `pˤ` is retained, label it explicitly as notation used by a particular source/analysis, not as a universal Kurmanji symbol or an orthographic character.
7. Do not invent minimal pairs, localities or speaker claims. Use only source-attested examples and label their provenance.
8. Preserve the separate Lesson 08 distinction between the grapheme, phoneme, phonetic realization and spelling convention.

## 6. Claim-by-claim status

| Claim | Status | Reason |
|---|---|---|
| Some Kurmanji varieties distinguish aspirated and unaspirated voiceless stops | SUPPORTED WITH SCOPE | Haig & Öpengin; Barry; Thackston |
| Standard Hawar spelling does not mark this contrast with separate p letters | SUPPORTED | Haig & Öpengin; Thackston |
| Unaspirated stops may be accompanied by slight pharyngealization in some descriptions | SUPPORTED WITH SOURCE SCOPE | Thackston; University of Arizona overview |
| `pˤ` universally means simply “unaspirated p” in Kurmanji | NOT SUPPORTED | Different analyses and notation conventions; pharyngealization may be syllabic |
| Aspiration and pharyngealization are the same phonetic feature | FALSE / MUST NOT TEACH | Distinct phonetic dimensions; dialect data do not align perfectly |
| Every Kurmanji dialect has the same aspiration/pharyngealization contrast | NOT SUPPORTED | Documented regional and lexical variation |
| `pˤ` is a Hawar alphabet letter | FALSE | It is a phonetic/analytical notation, not a standard Latin grapheme |

## 7. Remaining checks and approval gates

- A Kurmanji phonetics specialist should approve the Sorani terminology and the exact notation used in the lesson.
- The owner/editor should select the course's reference variety before any locality-specific example is added.
- A native Sorani editor should copy-edit the final explanation independently of the Kurmanji phonetic review.
- Any change to the lesson body or seed row requires explicit owner approval; this report alone does not authorize it.

## 8. Actions not taken

No lesson body, seed SQL, migration, schema, static page, application code, validator, test, database, PR #3, main branch, merge state or deployment was changed. No SQL was executed. No live database was accessed. This is a documentation-only audit.

## Backup record

- Pre-work backup: `backup/c1-l08-p-aspiration-pharyngealization-before-2026-11-17`
- Baseline SHA: `cfcfce2dc348d43633aef2948d674ad42aa7364c`
- Post-work backup: `backup/c1-l08-p-aspiration-pharyngealization-after-2026-11-17` (points to the final documentation commit after verification).
