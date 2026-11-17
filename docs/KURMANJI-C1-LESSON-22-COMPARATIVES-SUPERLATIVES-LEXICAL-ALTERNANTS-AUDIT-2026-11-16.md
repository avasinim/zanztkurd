# Course 1, Lesson 22 — Comparative and Superlative Adjectives: Evidence Audit

**Date:** 2026-11-16  
**Repository:** `avasinim/zanztkurd`  
**Branch:** `fix/kurmanji-ci-current-migration`  
**Scope:** Evidence review of the existing Course 1 Lesson 22 seed payload. Proposal-only; no lesson edits.

## 1. Executive findings

The lesson's core rules are sound: the comparative commonly uses `-tir`, the compared standard is introduced by `ji`, and Kurmanji has both a `herî` construction and a synthetic `-tirîn` superlative. The lesson nevertheless needs more precision in four areas:

1. **Do not teach -tir as mechanically regular for every adjective.** Important lexical alternatives include `baş → baştir / çêtir`, `mezin → mezintir / meztir`, and `pir → pirtir / bêtir`. Some sources give these as alternatives; they are not all interchangeable in every register or meaning.
2. **State the orthographic adjustment for adjectives ending in t:** the final `t` of the positive form is not doubled when adding `-tir`; e.g. `xurt → xurtir`, `pêwist → pêwistir`.
3. **Keep the two superlative constructions syntactically distinct.** `-tirîn` attaches to the adjective and the resulting superlative precedes the noun it modifies (`mezintirîn bajar)). `herî` precedes the adjective (`bajarê herî mezin` / `cihê herî kevin`). They can both convey a highest-degree reading, but are not one interchangeable word-order rule.
4. **Separate adjectival comparison from quantity comparison.** `kêmtir` and `zêdetir` are useful for less/more amount or degree, but should not be presented as if they were simply the same lesson pattern as comparing two adjectival properties.

The current seed is substantially better than a bare rule list because it already notes the alternative `meztir`, and it flags that dialect forms should be sourced. Its main omissions are the `baş/çêtir` and `pir/bêtir` alternatives, the final-`t` spelling rule, and the distinction between `herî)'s superlative and intensifying readings.

## 2. Exact payload reviewed

File: `docs/kurmanji-content-seed-part-03.sql`  
Blob SHA: `b6f89841ac49adb256a7874179a258436e095909`  
Lesson key: `kurmanji-course-1-lesson-22.html`  
Title: `بەراوردکردنی تایبەتمەندییەکان`

The payload contains:
- Positive, comparative and superlative degrees.
- `mezin → mezintir / meztir`.
- `baş → baştir`, `biçûk → biçûktir`, `dirêj → dirêjtir`.
- The comparative preposition `ji), with `Meyrem ji birayê xwe mezintir e.`
- Superlative `herî baş), `herî mezin), and `-tirîn), with a note that `-tirîn) precedes the noun.
- `kêmtir) and `zêdetir).
- An explicit instruction to record the source and variety for examples.

## 3. Evidence and grammatical analysis

### 3.1 Comparative formation with -tir

Thackston's *Kurmanji Kurdish: A Reference Grammar with Selected Readings*, pp. 26–27, gives the comparative suffix `-tir` and the preposition `ji` before the standard of comparison. The same pattern appears in the contemporary Kurdi School grammar. Examples include:
- `Meyrem ji birayê xwe mezintir e.` — Meyrem is older than her brother.
- `Tu ji min baştir dixebitî.` — You work better than me.
- `Hevokên min ji yên te dirêjtir in.` — My sentences are longer than yours.

The exact seed sentence `Meyrem ji birayê xwe mezintir e` is directly attested in the Kurmanji lesson resource and is suitable as a core model, subject to the course's chosen orthography and Sorani copy-edit.

**Editorial proposal:** state the productive rule as “add `-tir` to the adjective in the common pattern,” not as “every adjective always takes `-tir` without change.”

### 3.2 Lexical alternatives and irregular comparatives

Thackston lists several noteworthy forms:
- `pir` “much/many” → `pirtir` or `bêtir` “more”.
- `baş` “good” → `baştir` or `çêtir` “better”.
- `mezin` “big/old” → `mezintir` or `meztir` “bigger/older”.

This directly supports the seed's inclusion of both `mezintir` and `meztir`, but shows that its treatment of `baş` is incomplete and that the quantity/degree word `pir` has a useful alternative.

These should be described as attested lexical alternatives, not as a universal claim that all varieties, speakers and registers use every form with identical frequency. In particular, retain `baştir` as the transparent productive pattern while noting `çêtir` as a documented alternative.

### 3.3 Adjectives ending in t

Thackston explicitly notes that when an adjective already ends in `t`, the suffix is added without doubling that final consonant:
- `xurt → xurtir`, not `*xurttir`.
- `pêwist → pêwistir`, not `*pêwisttir`.

This is a useful orthographic/morphological rule for learners. The current seed does not include it. It should be a short exception note, not a long phonology section.

### 3.4 Standard of comparison: ji

The comparison standard is commonly introduced by `ji`. The seed's sentence `Meyrem ji birayê xwe mezintir e` is source-attested. The phrase after `ji` must have the appropriate oblique form; in this example `birayê xwe` is the oblique/ezafe form in the phrase “her brother”.

The lesson should explain the role of `ji` as “than/from” in this comparative construction, but not imply that every use of `ji` is comparative. It has other spatial and grammatical functions taught elsewhere.

### 3.5 Synthetic superlative -tirîn

Thackston describes a “true superlative” formed by adding `-tirîn` to the adjective, and says that this form precedes the noun it modifies:
- `Mezintirîn nav ...` — “the greatest name ...”

The beginner-level source gives the same ordering rule, e.g. `kevintirîn cih`. This differs from ordinary attributive adjective phrases in which the adjective follows the noun through ezafe. It is therefore important to teach `-tirîn) as a distinct construction, not simply “the comparative with an extra ending while keeping normal noun–adjective order”.

**Core pattern:** `mezintirîn bajar` — “the biggest city”, with the superlative before the noun.

### 3.6 Analytic superlative herî

The analytic construction places `herî` before the adjective. In a noun phrase, the noun and ezafe precede this sequence:
- `cihê herî kevin` — the oldest place.
- `bajarê herî mezin` — the biggest city.

Thackston notes that `herî` can also convey an intensifying sense, roughly “really/very”, especially with compound adjectives or participles where `-tir` is awkward. Therefore, do not define every occurrence of `herî` as an unambiguous mathematical “the single most”. Context and the containing phrase determine whether the intended reading is superlative or intensifying.

The seed's `herî baş` and `herî mezin` are valid compact teaching forms. A full NP example such as `bajarê herî mezin` would better show how this construction fits with the ezafe material in Lesson 21.

### 3.7 Quantity and degree: kêmtir / zêdetir

The seed includes `kêmtir` “less” and `zêdetir` “more”. These are useful, but pedagogically they should be placed in a separate small note on quantity/degree:
- `kêmtir`: a lesser amount or degree.
- `zêdetir`: a greater amount or degree.

They are not the same as the core adjective-pair exercise `mezin → mezintir`. A careful lesson should distinguish “more beautiful/bigger” from “more water/more time” and avoid implying that `zêdetir` is a superlative or that it always replaces `bêtir`. Thackston also records `bêtirî` (and `pirrtirî`) before numerals in the sense “more than [number]”; this is a related but separate quantifier construction.

### 3.8 Review of the seed forms

| Seed form | Evidence status | Editorial disposition |
|---|---|---|
| `baş → baştir` | Productive comparative supported; `çêtir` also attested | Retain and add a labelled alternative |
| `mezin → mezintir / meztir` | Both forms supported by Thackston | Retain; explain as alternatives, not universal dialect equivalence |
| `biçûk → biçûktir` | Productive suffix pattern supported by pedagogical grammar | Retain provisionally; native review |
| `dirêj → dirêjtir` | Source-attested in beginner resource | Retain |
| `Meyrem ji birayê xwe mezintir e` | Directly attested | Retain provisionally; Sorani gloss review |
| `herî baş`, `herî mezin` | Supported analytic superlatives | Retain; explain intensifier/context nuance |
| `mezintirîn bajar` | Correct order for synthetic superlative | Retain |
| `kêmtir`, `zêdetir` | Useful quantity/degree forms, but separate from adjective comparison | Retain in a clearly labelled side note |

## 4. Recommended learner-facing structure (not applied)

1. **Positive:** the unmarked adjective, e.g. `mezin`, `baş`, `biçûk`.
2. **Comparative:** adjective + `-tir`; introduce `ji) before the compared standard.
3. **Common lexical alternatives:** `baş → baştir / çêtir`; `mezin → mezintir / meztir`; `pir → pirtir / bêtir).
4. **Spelling note:** adjectives ending in `t` do not double the final `t): `xurtir`, `pêwistir`.
5. **Superlative A:** `herî + adjective`; inside a noun phrase, show the ezafe sequence, e.g. `bajarê herî mezin).
6. **Superlative B:** `adjective + -tirîn + noun), e.g. `mezintirîn bajar).
7. **Quantity note:** distinguish `kêmtir / zêdetir / bêtir) from the ordinary adjectival comparative.
8. Add a small source/variety label wherever a form is dialect-sensitive.

## 5. Editorial gates

- Choose and state the reference variety before promoting one alternative as the single preferred form.
- Keep `çêtir), `baştir), `meztir), `mezintir), `bêtir), and `pirtir) as source-attested forms with notes about distribution and meaning; do not flatten them into an unsupported universal equivalence.
- Have a native Kurmanji editor check exact naturalness, prosody and spelling in all full-sentence examples.
- Have Sorani glosses independently copy-edited.
- Do not use `herî) as an automatic synonym for “the one and only most” in every context; preserve its documented intensifying use.
- Do not conflate adjective comparison with quantifier constructions.

## 6. Sources

1. **Thackston, W. M. (2006).** *Kurmanji Kurdish: A Reference Grammar with Selected Readings*, pp. 26–28. Comparative suffix `-tir`, `ji), lexical alternatives, final-`t` adjustment, `-tirîn) and `herî). https://sites.fas.harvard.edu/~iranian/Kurmanji/kurmanji_complete.pdf
2. **Kurdi School.** “Kurmanji grammar, explained simply,” section “Comparing”. Current pedagogical cross-check for `-tir), `ji), `herî), `-tirîn), and the example `Meyrem ji birayê xwe mezintir e`. https://kurdischool.com/grammar.html
3. **Kurmanji Kurdish, Lesson 6.** Comparative and superlative forms, including `-tir), `ji), `-tirîn) before the noun, and `herî) before the adjective. https://www.kurdipedia.org/files/books/2023/474430.PDF?ver=133232623527294231
4. **Karacan, Hasan & Hewa Salam Khalid (2016).** “Adjectives in Kurdish language: Comparison between dialects,” *International Journal of Kurdish Studies* 2(2). Useful comparative dialect perspective; do not assume every cross-dialect form is a Standard Kurmanji rule. https://dergipark.org.tr/tr/download/article-file/225896
5. **Haig, Geoffrey (2018).** “Northern Kurdish (Kurmanjî),” in *The Languages and Linguistics of Western Asia*, pp. 106–158. General reference-variety and grammatical background. https://doi.org/10.1515/9783110421682-004
6. **Haig, Geoffrey (2018), bibliographic record.** Glottolog record for the chapter and its scope. https://glottolog.org/resource/reference/id/572208

## 7. Change boundary

Documentation-only audit. No lesson body, seed SQL, migration, application code, CI, Supabase, production data, PR #3, `main`, or deployment was changed. No database was accessed.
