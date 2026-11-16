# Course 2 — Proposal-only correction sheet (12 lessons)

**Date:** 2026-11-16  
**Branch:** `fix/kurmanji-ci-current-migration`  
**Status:** PROPOSAL ONLY — owner/editor approval required before implementation.

## Preservation notice

This document proposes editorial and pedagogical corrections for the 12 Northern Kurmanji Course 2 lesson payloads in `docs/kurmanji-content-seed-part-04.sql` and `docs/kurmanji-content-seed-part-05.sql`.

It does **not** change either SQL file, any lesson body, the historical migration, application code, schema, database, `main`, PR #3, or the website. No SQL is executed. Latin Kurmanji source forms are preserved as transcribed; no dialectal form is silently normalized.

The exact “current text” snippets below are quoted from the split seed payload. “Proposed text” is a suggested insert/replacement for review, not an applied edit.

## Evidence labels

- **A — directly supported:** the form/rule is explicitly shown in the cited academic source.
- **B — supported with scope:** supported, but only for Standard Kurmanji or a named regional variety; scope must remain visible.
- **C — needs verification:** no new example should be added until a specialist source or native editor confirms it.
- **E — editorial:** Sorani wording/terminology requires native editorial approval.

## Lesson-by-lesson proposal

### Lesson 01 — Morphology and word structure

**Current text (exact excerpt):**
> «بۆ نمونە، لە کورمانجی‌دا پاشگری -ek دەتوانێت لە ناوی تاکدا نادیاری پیشان بدات؛ ئەمە نمونەیەکە لەوەی چۆن مۆرفیمێک کارکردێکی ڕێزمانی هەیە.»

**Proposed addition (A):**
> «لە نموونەی gund-ek ـدا، gund بنەمای ناوەکەیە و -ek پاشگری نادیاریی تاکە: gund ‘گوند’، gund-ek ‘گوندێک’. ئەم نموونەیە نیشان دەدات کە مۆرفیم دەتوانێت بەشێکی بەستراوی وشە بێت و کارکردێکی ڕێزمانی هەبێت.»

**Reason:** The existing example is correct but does not actually segment the form for a first morphology lesson. Haig documents `gund-ek` as the singular indefinite form. Keep the example scoped to the Standard Kurmanji paradigm.

**Disposition:** Suggested insert; no source correction to current claim.

### Lesson 02 — Root, prefix and suffix

**Current text (exact excerpt):**
> «پێشگر لە پێش بنەڕەتەوە دێت و پاشگر لە دواوەیەوە. بۆ نمونە، -ek لە ناوی کورمانجی‌دا پاشگرێکی ناسراوە کە لە زۆر سیاقێکدا نادیاریی تاک نیشان دەدات...»

**Proposed addition (A/B):**
> «لە فۆڕمی dibêjim ‘دەڵێم’ دەتوانرێت پێشگری di-، ڕەگی کردار bêj- و کۆتاییی کەسیی -im جیا بکرێنەوە: di-bêj-im. ئەم شیکردنەوەیە بۆ نموونەی فێرکاریی ستانداردە؛ پێش ئەوەی بۆ کردارەکانی دیکە بگشتێندرێت، فۆڕمی هەر کردارێک بە سەرچاوە بپشکنە.»

**Reason:** This gives one attested verbal example to balance the existing suffix-only example. Haig's verb tables document present-stem person endings and the `di-` indicative prefix. Exact morpheme boundaries should be checked against the table's transcription before publication.

**Disposition:** Proposed example; source transcription review required.

### Lesson 03 — Noun, grammatical gender and number

**Current text (exact excerpt):**
> «ژمارە جیاوازی نێوان تاک و کۆ نیشان دەدات. لە کورمانجی‌دا شێوەکانی کۆ بە جۆری ناو و فۆڕمی ڕێزمانی پەیوەستن؛ بۆیە نابێت یاسایەکی تاک بۆ هەمو ناوەکان بگشتێندرێت.»

**Proposed replacement (A/B):**
> «لە کورمانجیی ستاندارددا، ناوی حاڵەتی ڕاستەوخۆ بە شێوەی ئاسایی نیشانەیەکی جیاوازی کۆ وەرناگرێت؛ واتە هەمان فۆڕم دەتوانێت بە پێی سیاق تاک یان کۆ بێت. لە حاڵەتی ناڕاستەوخۆدا، نیشانەی کۆ زۆرجار -a(n) ـە. فۆڕمی ڕاستەوخۆی نادیاری بە -in لە هەندێک ناوچەدا هەیە، بەڵام لە هەموو شێوەزارەکاندا باو و یەکسان نیە.»

**Proposed table (A/B):**

| ناو | ڕاستەوخۆی کۆ | ناڕاستەوخۆی کۆ |
|---|---|---|
| gund ‘گوند’ | gund | gund-a(n) |
| jin ‘ژن’ | jin | jin-a(n) |

> «تێبینی: فۆڕمی ڕاستەوخۆی نادیاری بە -in لە هەندێک ناوچەدا دەبینرێت؛ ئەم کۆتاییە نابێت وەک یاسایەکی گشتی بۆ هەموو کورمانجی فێر بکرێت.»

**Reason:** The current lesson names the variation but omits the actual paradigm. Haig (2018), §2.2.2, distinguishes unmarked direct plural from oblique plural `-a(n)`; the direct indefinite plural `-in` is regionally restricted/variable. Gender distinctions are also neutralized in plural.

**Disposition:** High-priority content addition; label Standard Kurmanji and regional exception clearly.

### Lesson 04 — Definite/indefinite nouns and -ek

**Current text (exact excerpt):**
> «... gund-ek-î و jin-ek-ê ... لەم فۆڕمانەدا -ek نیشانەی نادیاریی تاکە، و کۆتاییی -î/-ê فۆڕمی حاڵەتی ناڕاستەوخۆی ناوەکە نیشان دەدات. ئەمە لە نمونەی bajar-ek-î mezin جیاوازە: لەو پێکهاتەیەدا -î پەیوەندیی ئەزافە دروست دەکات...»

**Proposed addition (A):**
> «بۆ بەراورد: gund-ek-î = gund + -ek (نادیاری) + -î (حاڵەتی ناڕاستەوخۆ)؛ بەڵام bajar-ek-î mezin = bajar + -ek (نادیاری) + -î (ئەزافەی نێر) + mezin (هاوەڵناو). هەرچەندە دوو -î ـەکە لە نووسین و دەنگدا هاوشێوەن، ئەرکیان بە پێکهاتەی ڕێزمانیی ڕستەوە دیاری دەکرێت.»

**Reason:** The existing explanation is good; a side-by-side segmentation makes the homophony teachable. Haig explicitly gives both the case paradigm and `bajar-ek-î mezin` as an ezafe construction.

**Disposition:** Clarifying table/segmentation; preserve the existing rule.

### Lesson 05 — Ezafe and noun–adjective relation

**Current text (exact excerpt):**
> «لە bajar-ek-î mezin، -ek نادیاری نیشان دەدات، -î ئەزافەی ناوی نێرە، و mezin هاوەڵناوەکەیە و لە ئەزافەدا ناگۆڕێت.»

**Proposed addition (A):**
> «لە پێکهاتەی bajarekî mezin، ئەزافە بە ناوی سەرەکییەوە پەیوەستە و ڕەگەز و ژمارەی ئەو ناوە ڕەنگ دەداتەوە؛ هاوەڵناوی mezin بە خۆی بە پێی ڕەگەزی ناو ناگۆڕێت. خاوەندار، ئەگەر هەبێت، دوای ناوی سەرەکی دێت و فۆڕمی ناڕاستەوخۆ وەردەگرێت.»

**Reason:** The current claim is supported. Add a short warning that the possessor's oblique marking and the head noun's ezafe agreement are different operations. Haig §2.3.1 explicitly distinguishes linking ezafe from free/demonstrative ezafe.

**Disposition:** Small clarification; source-backed.

### Lesson 06 — Possession and possessive pronouns

**Current text (exact excerpt):**
> «لە نمونەی Haig (2018)، mal-a me ‘ماڵی ئێمە’، -a پەیوەندیی ئەزافەی نێوان ناو و جێناوی خاوەندار دروست دەکات؛ me فۆڕمی ناڕاستەوخۆی جێناوی کەسیی em ـە...»

**Proposed addition (A):**
> «خشتەی جێناوی ناڕاستەوخۆ کە لە پێکهاتەی خاوەنداریدا دەتوانێت بەکاربهێنرێت: min (من)، te (تۆ)، wî/wê (ئەو، نێر/مێ)، me (ئێمە)، we (ئێوە)، wan (ئەوان). نموونە: mal-a me ‘ماڵی ئێمە’. ئەم فۆڕمانە فۆڕمی ناڕاستەوخۆی جێناوی کەسیین؛ نابێت بەبێ ڕوونکردنەوە وەک پاشگری خاوەنداری پێشکەش بکرێن.»

**Proposed clarification (A/B):**
> «ئەگەر خاوەندار لە هەمان ڕستەدا بگەڕێتەوە بۆ بکەر، لە نموونەی ستانداردی Haigدا xwe بەکاردێت: Ez li mal-a xwe me. جیاوازیی شێوەزار و پێکهاتەی ڕستە دەبێت لەبەرچاو بگیرێت.»

**Reason:** The current lesson introduces `mal-a me` and `xwe`, but its title promises possessive pronouns without a full paradigm. Haig gives the oblique pronoun forms and the reflexive example.

**Disposition:** Add the table and preserve explicit variety scope.

### Lesson 07 — Personal pronouns and direct/oblique case

**Current text (exact excerpt):**
> «فۆڕمە ڕاستەوخۆکان بریتین لە ez, tu, ew, em, hûn, ew؛ فۆڕمە ناڕاستەوخۆکانیش min, te, wî/wê, me, we, wan.»

**Proposed addition (A):**
> «بۆ ئەوەی حاڵەت بە بکەر/بەرکار یەکسان نەکەین، دوو نموونە بەراورد بکە: ez dibêjim (من دەڵێم) و min xwar (من خوارد). لە نموونەی دووەمدا min فۆڕمی ناڕاستەوخۆی بکەری ڕابردووی کردارێکی تێپەڕە؛ بۆیە ناڕاستەوخۆ هەمیشە بە مانای بەرکار نیە.»

**Reason:** The existing caution is correct but abstract. Haig's conjugation table documents `min xwar` and the split between present and past transitive agreement.

**Disposition:** Add one contrastive example; preserve the caveat that dialects may diverge.

### Lesson 08 — Verb, stem, person and number

**Current text (exact excerpt):**
> «لە خشتەی کردارەکانی Haig (2018)، نمونەی کاتی ئێستا بۆ کرداری تێپەڕ ez dibêjim ‘من دەڵێم’، نمونەی ڕابردووی کرداری ناتێپەڕ ez hatim ‘من هاتم’، و نمونەی ڕابردووی کرداری تێپەڕ min xwar ‘من خوارد’ هاتوون.»

**Proposed addition (A):**
> «ئەم سێ نموونەیە تەنیا لە ڕووی واتاوە مەبینە؛ فۆڕمی جێناو و کۆتاییی کردار و جۆری کردار بەراورد بکە: ez dibêjim (ئێستا، تێپەڕ)، ez hatim (ڕابردوو، ناتێپەڕ)، min xwar (ڕابردوو، تێپەڕ). لە کردارە دیاریکراوەکاندا کۆتاییی کەسی و ژمارە بە پێی بنەمای ئێستا یان ڕابردوو دەگۆڕێت.»

**Reason:** Haig §2.6.1 and Table 13 explain that finite verbs index one core argument; the indexed argument differs between present transitive and past transitive clauses. This should be explained directly instead of asking learners to infer it.

**Disposition:** Expand with a compact comparison table after source transcription is checked.

### Lesson 09 — Present, past and future

**Current text (exact excerpt):**
> «بۆ داهاتوو، Haig (§2.6.4) نمونەی ew dē mesel-ē ji te re bēž-e دەهێنێتەوە...»

**Proposed correction (A — exact transcription check):**
> «فۆڕمی داهاتوو لە سەرچاوەی Haigدا بە شێوەی `ew dê mesel-ê ji te re bêj-ê` هاتووە. پێش بڵاوکردنەوە، نووسینی لاتینی و نیشانەکانی درێژی دەبێت ڕاستەوخۆ لە PDFی سەرچاوە و لەگەڵ شێوازی ڕێنووسی کۆرس بەراورد بکرێن. پاشان `dê` و فۆڕمی کردار بە جیاوازی ڕوون بکرێنەوە؛ داهاتوو بە پاشگری تاک دروست نابێت.»

**Reason:** The current lesson's Latin transcription should not be treated as a verbatim quote until it is checked against the actual PDF. Haig describes future as a particle plus subjunctive construction, with dialect and verb-specific details.

**Disposition:** Mandatory source transcription check; no silent correction to Latin text.

### Lesson 10 — Negation and questions

**Current text (exact excerpt):**
> «نەفیی ڕستەی ناوەکی و نەفیی کردار هەمیشە بە هەمان فۆڕم دروست نابن. فۆڕمی نەفی دەبێت بە پێی جۆری پێکهاتە و کردار بپشکنرێت.»

**Proposed addition (A):**
> «لە کورمانجیی ستاندارددا، `na-` لە زۆر فۆڕمەکانی ئێستا جێگای `di-` دەگرێتەوە؛ بەڵام `zanîn` و `karîn` بە `ni-` نەفی دەکرێن: `nizanim` ‘نازانم’ و `nikarim` ‘ناتوانم’. لە فۆڕمەکانی subjunctiveدا `ne-` جێگای `bi-` دەگرێتەوە. بۆیە پێشگری نەفی بە کات و ڕەوشی کردارەوە پەیوەستە.»

**Proposed regional note (B):**
> «Haig نموونەی نەفیی ڕستەی ناوەکی لە بەشی شێوەزاری ڕۆژئاوایی دەهێنێتەوە: `az nî birçî ma` (نێر) و `az nê birçî ma` (مێ). ئەم دوو فۆڕمە تەنیا بە ناونیشانی شێوەزاری خۆیان پێشکەش بکرێن؛ نابێت وەک یاسای گشتیی کورمانجیی ستاندارد وانە بدرێن.»

**Questions subsection — C (hold):**
> «بەشی پرسیارەکان تا کاتی دۆزینەوەی سەرچاوەی ڕاستەوخۆ بۆ فۆڕمی پرسیاری بەڵێ/نەخێر و وشەپرسیارییەکان، تەنیا وەک ناساندنی بابەت بمێنێتەوە؛ هیچ نموونەی نوێی لاتینی زیاد نەکرێت. پاش دۆزینەوەی سەرچاوە، نموونەی ستاندارد، واتای سۆرانی و جیاوازیی شێوەزار بە جیا بنووسرێن.»

**Reason:** Haig §2.6.1 explicitly documents `di-`, `bi-`, `na-`, `ne-`, and the exceptions `nizanim/nikarim`. The non-verbal negation examples in the chapter belong to a described regional variety, not a universal Standard Kurmanji paradigm. The lesson currently has no sourced interrogative examples.

**Disposition:** Add the sourced verbal negation rule; keep non-verbal negation regional; hold question examples pending verification.

### Lesson 11 — Word order and clause structure

**Current text (exact excerpt):**
> «Haig (2018)، لە §2.7.1، ڕیزبەندیی بێ‌نیشانەی ڕستەی ئاسایی بە شێوەی بکەر–بەرکار–کردار (SOV) دەناسێنێت...»

**Proposed replacement (A/B):**
> «لە کورمانجیی ستاندارددا، ڕیزبەندیی بێ‌نیشانە زۆرجار SOVG ـە؛ G ئاماژە بە ئامانج، وەرگر یان گوێگر دەکات. بەرکار دەتوانێت بۆ جەختکردنەوە بخرێتە پێشەوە. لە زۆر شێوەزاردا، وەرگری کرداری `dan` ‘دان’ زۆرجار دوای کردار و بە حاڵەتی ناڕاستەوخۆ دێت. بۆیە SOV بنەمایەکی فێرکارییە، نەک یاسایەکی بێ‌استثنا.»

**Reason:** Haig §2.7.1 describes neutral SOVG, not simply SOV; it explains pragmatic fronting and variation in Goal/recipient placement. The current lesson does already warn that order is not rigid; this proposal makes the omitted Goal component explicit.

**Disposition:** Replace the simplified label SOV with SOVG and retain the existing caveat.

### Lesson 12 — Review and final test

**Current text (exact excerpt):**
> «ڕستەیەکی کورمانجی هەڵبژێرە و (١) ناو و کردارەکان دیاری بکە، (٢) فۆڕمی جێناو و حاڵەت بنووسە، (٣) ئەزافە و پاشگرەکان شیکەرەوە...»

**Proposed disposition (E):**
- If this page is the final **review**, change the title to «پێداچوونەوە و خۆهەڵسەنگاندن».
- If it is intended as a scored **final test**, add a separate assessment specification: fixed question count, item types, answer key, scoring rules, pass threshold (if any), and persistence behavior.
- Do not describe an open-ended self-review prompt as a formal test unless the interactive quiz exists and has been verified.

**Reason:** The current content is a useful review task but does not itself specify scoring or a formal assessment mechanism.

**Disposition:** Product/editorial decision required; no new score or threshold invented.

## Cross-lesson Sorani copy-edit queue

The following are exact variants already identified in the seed/migration comparison or lesson text. This document does not choose a house spelling:
- `پەیویستە` / `پێویستە` — Lessons 04 and 06 in the historical parity report.
- `نوسین` / `نووسین` — Lesson 09.
- `نوسینی` / `نووسینی` — Lesson 10.
- `ڕون` / `ڕوون` — recorded elsewhere in Course 1.
- `نمونە` / `نموونە` and `پەیوەستە` / `پەیویستە` require a consistent editorial pass where present.

**Required decision:** approve one Avasin Sorani house style before applying global replacements. The Kurmanji Latin forms must remain untouched unless each change is supported by a source and separately approved.

## Sources and evidence

1. Geoffrey Haig (2018), “Northern Kurdish (Kurmanjî),” in *The Languages and Linguistics of Western Asia: An Areal Perspective*, pp. 106–158. DOI: https://doi.org/10.1515/9783110421682-004
   - §2.2.2, pp. 115–116: singular case/indefiniteness and plural marking; direct plural generally unmarked, oblique plural `-a(n)`, regional limits on direct indefinite `-in`.
   - §2.3.1: `bajar-ek-î mezin`, `mal-a me`, head agreement, possessor case, and free/demonstrative ezafe.
   - §2.6.1: present/past person marking, `di-`, `bi-`, `na-`, `ne-`, `nizanim`, `nikarim`.
   - §2.6.4: future particle construction and example transcription.
   - §2.7.1: neutral SOVG and Goal/recipient placement.
   - Full PDF: https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf
2. Haig & Öpengin (2018), “Kurmanji Kurdish in Turkey: Structure, varieties and status.” https://www.uni-bamberg.de/fileadmin/aspra/06_Team/Publications_and_CV/HaigOepengin2018_Kurmanji_Kurdish_.pdf — dialect variation; use only where the lesson labels the relevant variety.
3. Gündoğdu (2015), “Negation in Kurmanji,” *Affix Ordering Across Languages and Frameworks*, pp. 154–172. DOI: https://doi.org/10.1093/acprof:oso/9780190210434.003.0007 — additional analysis of negation prefix ordering.

## Approval checklist — no implementation until approved

- [ ] Approve Standard Kurmanji reference variety and regional labels.
- [ ] Approve the plural paradigm and its `-in` qualification (Lesson 03).
- [ ] Approve the ezafe/case segmentation examples (Lessons 04–06).
- [ ] Approve the direct/oblique and verb-agreement examples (Lessons 07–09).
- [ ] Approve verbal negation examples and regional non-verbal examples (Lesson 10).
- [ ] Verify interrogative examples from a suitable source before insertion (Lesson 10).
- [ ] Approve SOVG/Goal wording (Lesson 11).
- [ ] Decide review vs scored final assessment (Lesson 12).
- [ ] Approve Sorani house spelling and terminology.
- [ ] Decide canonical source for the 12 known seed/migration differences before any parity repair.

## Final status

**Proposal prepared for Course 2 lessons 01–12. No lesson changes applied.**  
The highest-confidence additions are the Standard Kurmanji plural paradigm, ezafe/case clarification, verbal negation patterns, and SOVG qualification. Interrogative examples and all Sorani house-style changes remain on hold pending source/editor approval.
