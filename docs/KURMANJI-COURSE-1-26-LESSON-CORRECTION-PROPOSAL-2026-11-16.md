# Course 1 — Proposal-only correction sheet (26 lessons)

**Date:** 2026-11-16  
**Branch:** fix/kurmanji-ci-current-migration  
**Status:** PROPOSAL ONLY — no lesson content approved or changed.

## Preservation and scope

This sheet turns the completed Course 1 source-review register into concrete proposals for the 26 Northern Kurmanji lessons. It is based on the current split-seed payloads in docs/kurmanji-content-seed-part-01.sql through part-04.sql and the five dated source-review records.

This is not an instruction to synchronize the historical migration and does not certify every lesson. No lesson body, seed row, migration, static wrapper, application code, schema, database, main, PR #3, or website was changed. No SQL was executed.

“Current excerpt” is quoted from the existing split-seed lesson body. “Proposed wording” is a candidate for owner/editor review, not an applied edit. Kurmanji Latin forms are preserved unless a proposal explicitly requests verification; no spelling is silently normalized.

## Evidence labels

- **A — source-supported:** the central linguistic point is directly supported by the reviewed reference.
- **B — scope-sensitive:** supported only with a stated variety, dialect, construction, or orthographic convention.
- **C — hold for specialist verification:** do not add or alter the example until independently checked.
- **E — Sorani editorial:** native Sorani copy-edit and house-style approval required.

## Priority correction proposals

### L02 — Alphabet inventory vs sound inventory

**Current excerpt:**
> «لە ڕێنووسی لاتینیی باوی کورمانجی، ئەلفبێکە ٣١ پیت لەخۆ دەگرێت...»

**Proposed addition (A):**
> «ژمارەی ٣١ لە پیتە نووسراوەکانی ئەلفبێی هاوارەوەیە؛ ئەمە ژمارەی فونیم یان هەموو دەنگەکانی زمان نیە. پیت و دەنگ دوو ئاستی جیاوازن؛ ژمارە و جۆری دەنگەکان بە پێی شێوەزار و شیکردنەوەی دەنگناسی دەتوانن جیاواز بن.»

**Reason:** Preserve the current 31-letter inventory but explicitly separate graphemes from phonemes. Digital collation/sorting claims require a Unicode/collation source, not a grammar citation.

**Status:** Clarification only; retain the 31-letter inventory.

### L03 — Vowel table and IPA

**Current excerpt:**
> «هەشت پیتی ڤاوڵ بۆ نوێنەرایەتیی هەشت مۆنۆفتۆنگی سەرەکی بەکاردێن... IPA وەسفی دەنگە، نەک پیتی ئەلفبێ.»

**Proposed editorial instruction (A/E):**
> «خشتەی IPA و فۆڕمی پیتەکان جیاواز بهێڵەوە؛ IPA وەسفی دەنگە، پیت نیشانەی نووسینە. وەرگێڕانی سۆرانیی واتاکان لە خشتەکەدا بە شێوەی یەکگرتوو پشکنین بکە و هیچ واتایەک لە تەنیا هاوشێوەیی دەنگییەوە مەگۆڕە.»

**Reason:** The eight written vowel letters and core IPA table are corroborated by the University of Arizona overview. Sorani glosses are not automatically certified by the English source glosses.

**Status:** Keep the core table; native editor must review Sorani glosses.

### L04 — RR must not appear as a 32nd Hawar letter

**Current excerpt:** The current lesson's consonant table includes a separate row labelled RR rr.

**Proposed replacement (B):**
> «لە ئەلفبێی هاواردا ٣١ پیت هەن و RR پیتێکی سەربەخۆی ئەم ئەلفبێیە نیە. لە هەندێک ڕێنووس یان شێوەزاردا دووبارەنووسینی r بە شێوەی rr دەتوانێت بۆ نیشاندانی دەنگی trill بەکاربهێنرێت؛ بەڵام ئەمە نابێت لەگەڵ ژمارەی پیتەکانی ئەلفبێ تێکەڵ بکرێت. جیاوازیی دەنگی tap/trill لە جیاوازیی پیتی ئەلفبێ جیا بکەرەوە.»

**Required table action:** Remove RR rr from the 23-consonant-letter inventory table. If the course wants to teach the trill convention, show it in a separate pronunciation/orthography note with a named source and variety. Do not add a minimal pair until independently verified.

**Reason:** A phonetic tap/trill distinction does not prove RR is a standard Hawar letter or a universal spelling. The University of Arizona page's prose and its RR table example are internally inconsistent: the row labelled rr gives roj with one r. That row cannot establish the spelling of roj.

**Status:** High priority; source-quality issue remains open. Do not change any word spelling by inference.

### L05 — Five marked letters

**Current excerpt:**
> «پێنج پیتی نیشانەدار بریتین لە ç، ş، ê، î، û...»

**Proposed wording (A/E):**
> «ئەم پێنج نیشانە بەشێکن لە فۆڕمی پیتەکان و لە نووسینی کورمانجی دەبێت بپارێزرێن. چوارچێوەی وانەکە جیاوازیی نیشانەی نووسین لە جیاوازیی دەنگی ڕوون بکاتەوە؛ وەرگێڕانی سۆرانیی وشە نموونەکانیش بە جیا پشکنین بکرێت.»

**Reason:** Core teaching point corroborated. Keep the five letters and diacritics intact; do not use this lesson to imply a complete phoneme inventory.

**Status:** Preserve; Sorani glosses require editor review.

### L06 — Reading examples and r/rr

**Current excerpt:**
> «roj ڕۆژ وشەکە وەک نمونە بخوێنەوە؛ وردیی دەنگی r لە شێوەزارەکاندا دەتوانێت جیاواز بێت.»

**Proposed wording (B):**
> «وشەی roj وەک فۆڕمی نووسراوی سەرچاوە بپارێزە. ئەگەر باس لە tap/trill دەکرێت، جیاوازیی دەنگی بە تێبینیی دەنگناسی ڕوون بکەرەوە؛ بەڵام لەبەر نموونەی ناتەبای سەرچاوە، roj بەڵگەی نووسینی rr نیە و نابێت بە rroj بگۆڕدرێت.»

**Reason:** The reviewed source supports the general phonetic distinction but its table's rr example spells roj with one r. No minimal pair is established.

**Status:** No spelling change. Add only a carefully scoped phonetic note.

### L08 — Aspiration vs pharyngealization

**Current excerpt:**
> «p / pˤ جیاوازیی دەنگیی شێوەزاری...»

**Proposed clarification (B):**
> «هەناسەداربوون (aspiration) و قوڕگیداربوون/قووڵکردنی دەنگ (pharyngealization) دوو تایبەتمەندیی دەنگناسیی جیاوازن. ئەگەر /pˤ/ لە شێوەزارێکدا بەکار دەهێنرێت، ناوی ئەو شێوەزارە و سەرچاوەی تایبەت دیاری بکە؛ ئەم تایبەتمەندییە وەک یاسای گشتیی هەموو کورمانجی فێر مەکە.»

**Reason:** The current review warns that aspiration and pharyngealization must not be conflated and that /pˤ/ requires dialect scope.

**Status:** Clarify terminology and dialect scope; specialist review required for the exact Sorani phonetic term.

### L09 — Place-name inflection

**Current excerpt:** The lesson proposes forms including Ez li Amedê dijîm and Ez ji Qamişloyê me.

**Proposed disposition (C):**
> «ئەم ڕستە نموونانە تا پشکنینی فۆڕمی ناوی شوێن لەگەڵ ئامرازی li و ji و کۆتاییی حاڵەت، وەک نموونەی پەسەندکراوی فێرکاری نیشان نەدرێن. بۆ هەر ناوی شوێن، فۆڕمی ناوچەیی و فۆڕمی باوی کورمانجی بە سەرچاوە پشتڕاست بکەوە.»

**Reason:** The general principle of preserving personal/place names is sound, but the exact inflected forms were not fully verified in the previous source review.

**Status:** Hold exact inflected examples for specialist confirmation; do not substitute another toponym by guess.

### L10 — Greetings and addressee scope

**Current excerpt:**
> «Êvarbaş! ئێوارە باش! ... Şevbaş! شەوت باش! ... Bi xêr hatî! بەخێر بێیت! بەخێرهاتن بۆ تاک...»

**Proposed wording (A/B/E):**
> «Rojbaş بۆ کاتی ڕۆژ، Êvarbaş بۆ ئێوارە، و Şevbaş بۆ شەو/کاتی خەوتن بەکاربهێنە. ئەم جیاوازییە لە سەرچاوەی دەربڕینەکاندا پشتگیری کراوە. لە Bi xêr hatî ـدا، فۆڕمی تاک بە ڕوونی نیشان بدە و فۆڕمی کۆ یان ڕەگەزی جیاواز تەنیا دوای پشکنینی سەرچاوە زیاد بکە.»

**Reason:** The greeting distinctions are well supported, but exact addressee number/gender and the spelling/pragmatics of Biborîne still need review.

**Status:** Preserve the time distinctions; verify singular/plural scope and Sorani equivalents.

### L11 — Personal pronouns

**Current excerpt:**
> «جێناوە ڕاستەوخۆکان ... ez, tu, ew, em, hûn, ew ... جێناوە ناڕاستەوخۆکانیش ...»

**Proposed addition (A):**
> «فۆڕمە ڕاستەوخۆ و ناڕاستەوخۆکان بە خشتەیەکی یەکگرتوو پیشان بدە: ez/min، tu/te، ew/wî,wê، em/me، hûn/we، ew/wan. تێبینی: ئەم دوو ناونیشانە ناوی حاڵەتی ڕێزمانیین؛ نابێت ڕاستەوخۆ بە بکەر و ناڕاستەوخۆ بە بەرکار یەکسان بکرێن. لە ڕستەی ڕابردووی تێپەڕدا بکەر دەتوانێت فۆڕمی ناڕاستەوخۆ وەربگرێت.»

**Reason:** The paradigm is corroborated. The main risk is oversimplifying direct/oblique as subject/object.

**Status:** Keep the paradigm; add the explicit caveat and ensure later case lessons use identical terminology.

### L12 — Demonstratives

**Current excerpt:** The lesson introduces direct forms ev/ew and states that direct-only treatment is introductory.

**Proposed addition (A/B):**
> «ئەم وانەیە تەنیا فۆڕمە ڕاستەوخۆکانی ev/ew دەناسێنێت. لە کۆنتێکستی ناڕاستەوخۆدا فۆڕمەکانی وەک vî/vê/van و wî/wê/wan لە ستانداردی کورمانجی بەکاردێن؛ فێربوونیان لەگەڵ وانەی حاڵەتدا بەردەوام دەبێت. فۆڕمەکان بە پێی شێوەزار دەتوانن جیاوازییان هەبێت.»

**Reason:** Keep the introductory scope honest; avoid implying ev/ew never inflect.

**Status:** Optional cross-reference to L25; source-check regional variants.

### L13–16 — Numbers, colours, family, days and time

**Current excerpt:** The lessons contain lexical tables and full example sentences.

**Proposed editorial action (E/C):**
> «وشە و ژمارە سەرەکییەکان بپارێزە تا پشکنینی فەرهەنگی تەواو دەکرێت. هەر ڕستەی نموونەیی بە جیا لە ڕووی حاڵەتی بەرکار، ڕێککەوتنی کردار، ئامرازی شوێن و کۆتاییی کات پشکنین بکە. واتای doh، فۆڕمی خێزانی kal و نووسینی dayika/dayîka بە شێوەزار و ستایلی نووسینی پەسەندکراوەوە دیاری بکە.»

**Reason:** The vocabulary is broadly corroborated; some sentence morphology and Sorani glosses were not fully verified. Do not treat a supported word list as proof that every example sentence is correct.

**Status:** Native Kurmanji/Sorani editorial pass required; no bulk spelling replacement.

### L17 — Present-tense verbs

**Current excerpt:**
> «لە زۆرێک لە کردارە ئاساییەکانی کورمانجیدا، کاتی ئێستای ئاسایی بە پێشگرێکی di- لە پێش بنەی کردار و کۆتاییی کەسی دروست دەبێت...»

**Proposed addition (A):**
> «ئەم فۆڕمە بۆ کردارە ڕێکەکان بنەمای فێرکارییە: di- + بنەی ئێستا + کۆتاییی کەسی. بەڵام کردارە نائاساییەکان و پێکهاتەی کردارە یاریدەدەرەکان دەبێت بە جیا فێر بکرێن؛ بۆیە فۆرمۆڵەکە بە یاسای بێ‌هەڵە بۆ هەمو کردارەکان مەناسێنە.»

**Reason:** The current text already includes a useful caveat. Keep regular patterns separate from irregular stems and compound hîn bûn; check every conjugated form individually.

**Status:** Preserve with a clear “regular verbs” label.

### L18 — Negation

**Current excerpt:**
> «هەندێک کردار فۆڕمی تایبەت هەیە؛ بۆ نمونە «زانین» زۆرجار بە شێوەی Ez nizanim «نازانم» دێت...»

**Proposed addition (A):**
> «لە کورمانجیی ستاندارددا، na- لە زۆر فۆڕمەکانی indicativeی ئێستا جێگای di- دەگرێتەوە. دوو استثنای گرنگ: zanîn → nizanim و karîn → nikarim. لە subjunctiveدا ne- جێگای bi- دەگرێتەوە. ئەم پێشگرانە بە کات و ڕەوشی کردارەوە پەیوەستن؛ نموونەی نەفیی کۆپولا و ڕستەی ناوەکی بە جیا و بە دیاریکردنی شێوەزار بخوێنەوە.»

**Reason:** karîn → nikarim is a documented exception in Haig (2018), §2.6.1. The current lesson already includes nizanim; add the paired exception. Copular/existential negation requires variety-specific examples.

**Status:** Add the attested exception; hold regional copular examples pending verification.

### L19 — Questions

**Current excerpt:**
> «kî کێ ... çiqas چەند / تا چەند ...»

**Proposed addition (A/C):**
> «لە فێرکردنی وشەپرسیارەکاندا، جیاوازیی kî و فۆڕمی ناڕاستەوخۆی kê لە پێکهاتەی ڕێزمانیی گونجاودا ڕوون بکەوە. هەروەها çend و çiqas بە یەک واتا مەخە؛ یەکێک زۆرجار بۆ ژمارەی دانە و ئەوی دیکە بۆ بڕ/ڕادەیە، بەڵام نموونە و وەرگێڕان پێویستی بە پشکنینی سەرچاوەیی هەیە.»

**Reason:** The core question words and wh-in-situ are supported; the case contrast kî/kê and çend/çiqas distinction need precise examples and gloss review.

**Status:** Add only after exact examples are checked in a Kurmanji grammar/dictionary.

### L20 — Word order

**Current excerpt:**
> «ڕیزبەندیی بێ‌نیشان و باو زۆرجار بکەر + بەرکار + کردار (SOV) ە...»

**Proposed replacement (A/B):**
> «لە ڕستەی بێ‌نیشاندا، ڕیزبەندیی کورمانجی زۆرجار SOVG ـە؛ G ئاماژە بە ئامانج، وەرگر یان گوێگری کردار دەکات. بەرکار دەتوانێت بۆ جەختکردنەوە یان ڕێکخستنی زانیاری بخرێتە پێشەوە. شوێنی ئامانج/وەرگر بە جۆری کردار و شێوەزارەوە دەگۆڕێت. بۆیە SOV بنەمایەکی فێرکارییە، نەک یاسایەکی ڕەق.»

**Reason:** Haig (2018), §2.7.1 describes neutral SOVG and goal/recipient variation. The current lesson already warns that order is not rigid; this makes the Goal argument explicit.

**Status:** High-priority explanatory refinement; preserve the existing sentence examples pending full gloss review.

### L21 — Adjectives and ezafe

**Current excerpt:**
> «maleke biçûk ماڵێکی بچووک نمونەی فێرکاری بۆ ناو و هاوەڵناو.»

**Proposed disposition (B/C):**
> «نموونەی maleke biçûk تا پشکنینی ڕێنووس، ڕەگەزی ناو و فۆڕمی ئەزافە لە سەرچاوەی ستاندارددا بکرێت، وەک نموونەی پشتڕاستکراو نیشان مەدە. بۆ نموونەی پشتڕاستکراوی ئەزافە، bajar-ek-î mezin لە Haig (2018) هاتووە. ڕوون بکەرەوە کە ئەزافە بە ڕەگەز و ژمارەی ناوی سەرەکی ڕێکدەکەوێت؛ هاوەڵناو خۆی بە شێوەی ئاسایی بە ڕەگەزی ناو ناگۆڕێت.»

**Reason:** Postnominal adjective + ezafe is strongly supported, but the feminine indefinite example needs specialist confirmation. Distinguish case from ezafe agreement.

**Status:** Keep the core rule; verify the example before use.

### L23 — Nouns and determiners

**Current excerpt:**
> «کورمانجی پاشگری دیاریکراوی وەک -eke/-ekan کە لە سۆرانی بەکاردێت، بە هەمان شێوە نیە.»

**Proposed replacement (B):**
> «لە کورمانجیی ستاندارددا، پاشگری گشتیی دیاریکراوی وەک -eke/-ekan بە شێوەی سۆرانی نیە؛ بەڵام ناسراوی و نەناسراوی ناو بە مانا و کۆنتێکست پەیوەستن. ئەم باسە وەک یاسای ستاندارد پێشکەش دەکرێت، نەک وەک حوکمێک بۆ هەموو شێوەزارەکان؛ Haig & Öpengin جیاوازییەکی سنووردار لە شێوەزاری Şemzînan تۆمار دەکەن.»

**Reason:** The general standard pattern is supported, but the previous review identified a restricted Şemzînan exception. Do not universalize the “no definite suffix” statement.

**Status:** Add variety qualification and keep direct/oblique as a multi-function case system, not subject/object labels.

### L24 — Possession and free ezafe

**Current excerpt:**
> «جێناوەکانی وەک min, te, wî, wê, me, we, wan دەتوانن خاوەندار دیاری بکەن...»

**Proposed addition (A):**
> «جیاوازی بکە لە نێوان ئەزافەی بەستراو کە ناو بە خاوەندار یان هاوەڵناو دەبەستێتەوە، و ئەزافەی ئازاد/ئاماژەیی وەک yê/ya/yên کە دەتوانێت بە جێی ناوێکی لابراو بوەستێت. لە birayê min ê mezin ـدا پێکهاتەی ناو، خاوەندار و ئەزافەی دووەم بە جیا شیکەرەوە.»

**Reason:** Haig (2018), §2.3.1 distinguishes linking ezafe from free/demonstrative ezafe. The current lesson should not make yê/ya/yên look like ordinary possessive suffixes.

**Status:** Add a segmented phrase and source-backed gloss after editorial review.

### L25 — Direct and oblique case

**Current excerpt:**
> «لە ڕستەی ئێستای تێپەڕدا، بکەر زۆرجار لە حاڵەتی ڕاستەوخۆ و بەرکار لە ناڕاستەوخۆدا دێت... لە ڕستەی ڕابردووی تێپەڕدا...»

**Proposed wording (A/B):**
> «لە ڕستەی ئێستای تێپەڕی ستاندارددا، بکەر Direct و بەرکار Oblique ـە. لە ڕابردووی تێپەڕدا، لە پێکهاتەی ئەرجەتیڤی بنەڕەتیدا بکەر Oblique و بەرکار Direct ـە و کردار زۆرجار لەگەڵ بەرکاری Direct ڕێکدەکەوێت. ئەمانە بنەمای ستانداردن؛ فۆڕمی نیشانەی حاڵەت و ڕێککەوتن بە پێی شێوەزار و پێکهاتە دەتوانێت جیاواز بێت.»

**Reason:** The current lesson already contains the essential pattern and a caveat. Keep the caveat adjacent to the rule. Do not equate direct with subject or oblique with object. Keep Min ew dît labelled as a pedagogical example unless a verbatim source is found.

**Status:** Preserve with exact scope and a native Sorani editorial pass.

### L26 — Final review and self-assessment

**Current excerpt:**
> «ڕێنووسی ستاندارد «r» و «rr» لە هەندێک وشەدا جیاوازی دەردەخات.»

**Proposed wording (B/E):**
> «لە هەندێک وەسفی دەنگناسی و ڕێنووسدا، rr وەک دووبارەنووسینێک بۆ trill لە r ـی tap جیا دەکرێتەوە؛ بەڵام rr پیتێکی زیادە لە ئەلفبێی ٣١ پیتی هاوار نیە. ئەم جیاوازییە بە پێی ڕێنووس و شێوەزار پێشکەش بکە. هیچ جووتەوشەیەکی کەمترین-جیاوازی زیاد مەکە تا لە دوو سەرچاوەی باوەڕپێکراودا پشتڕاست نەکرێتەوە.»

**Reason:** The lesson's self-assessment is correctly informal. The technical improvement is to distinguish the 31-letter alphabet from a digraph/convention and not invent a minimal pair.

**Status:** Clarify RR and retain informal self-assessment.

## Sorani house-style queue

The following are editorial flags, not automatic replacements:
- نوسین/نووسین
- ڕون/ڕوون
- پەیویست/پێویست
- نمونە/نموونە
- dayika/dayîka in Kurmanji transliteration and the associated Sorani glosses.

**Decision required:** the owner/editor must approve the Avasin Sorani spelling and terminology guide before applying any global replacements. A native Sorani editor should proofread all 26 lessons, especially glosses and example sentences in L03, L06–10, L13–16, L19–24, and L25–26.

## Evidence sources

1. Geoffrey Haig (2018), “Northern Kurdish (Kurmanjî),” in *The Languages and Linguistics of Western Asia: An Areal Perspective*, pp. 106–158. DOI: https://doi.org/10.1515/9783110421682-004. Full PDF: https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf
   - §2.2: case, gender, number and pronouns.
   - §2.3.1: linking and free/demonstrative ezafe.
   - §2.6: verb stems, person marking, negation and future.
   - §2.7.1: SOVG, Goal/recipient placement and information structure.
2. Haig & Öpengin (2018), “Kurmanji Kurdish in Turkey: Structure, varieties and status.” https://www.uni-bamberg.de/fileadmin/aspra/06_Team/Publications_and_CV/HaigOepengin2018_Kurmanji_Kurdish_.pdf — regional variation and standard/dialect qualifications.
3. University of Arizona, Iranian Languages, “Kurmanji Kurdish”: https://iranian-languages.arizona.edu/node/7 — alphabet, vowel/consonant overview and orthography/phonetic distinctions. Its RR table inconsistency is explicitly recorded above.
4. Thackston, W. M., *Kurmanji Kurdish: A Reference Grammar with Selected Readings*: https://sites.fas.harvard.edu/~iranian/Kurmanji/kurmanji_complete.pdf
5. Haig & Öpengin (2015), “Gender and case in Kurdish”: https://www.uni-bamberg.de/fileadmin/aspra/06_Team/Publications_and_CV/haig_opengin_2015_gender_kurdish_offprint.pdf
6. Baker & Atlamaz (2014), “On the Relationship of Case to Agreement in Split-Ergative Kurmanji and Beyond”: https://sites.rutgers.edu/mark-baker/wp-content/uploads/sites/199/2019/07/kurmanji-split-erg-distributed-July-2014.pdf
7. Yari, Kurmanji greetings and dictionary resources: https://yari.krd/learn/kurdish-greetings/ and https://yari.krd/dictionary/

These sources support the core grammatical/orthographic frameworks; they do not certify every Kurmanji example, Sorani gloss, or dialectal form in the lessons.

## Owner/editor approval checklist

- [ ] Select the reference variety for the course and decide how regional variants are labelled.
- [ ] Approve the 31-letter inventory and move RR out of the consonant-letter table.
- [ ] Verify all place-name inflections in Lesson 09.
- [ ] Approve direct/oblique terminology and its consistent use across L11, L12, L19–25.
- [ ] Approve the karîn → nikarim addition and the variety scope of copular negation.
- [ ] Verify kî/kê, çend/çiqas, and all question examples.
- [ ] Verify feminine indefinite ezafe example maleke biçûk.
- [ ] Approve SOVG wording and Goal/recipient explanation.
- [ ] Approve the Sorani house-style guide and native editorial pass.
- [ ] Decide canonical source payload for Course 1's eight known migration/seed differences before any parity repair.

## Final status

**Course 1 correction proposal prepared for lessons 01–26. No lesson changes applied.**  
Highest-priority issues are RR vs the 31-letter alphabet, direct/oblique and split alignment consistency, ezafe/case precision, dialect scope, and specialist verification of exact inflected examples. Sorani copy-edit and seed/migration reconciliation remain separate gates.
