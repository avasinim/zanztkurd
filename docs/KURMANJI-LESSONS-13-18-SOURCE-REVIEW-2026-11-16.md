# Kurmanji Course 1 — lessons 13–18 source review (2026-11-16)

## Scope and method

This is a source-focused review of the six lesson payloads in `docs/kurmanji-content-seed-part-02.sql` (lessons 13–16) and `docs/kurmanji-content-seed-part-03.sql` (lessons 17–18), on branch `fix/kurmanji-ci-current-migration`. The review also consulted the earlier lesson-by-lesson notes in `docs/KURMANJI-RELEASE-AUDIT.md` and rechecked the main claims against accessible grammar, dictionary, and teaching references.

The findings below distinguish (a) a claim directly supported by a source, (b) a plausible example that still needs a grammar/native-speaker check, and (c) an editorial issue. External Kurmanji references do not independently validate the Sorani translations. No lesson text, Latin Kurmanji spelling, split seed, migration, database, `main`, PR #3, or deployment was changed.

## Summary

| Lesson | Topic | Result | Main follow-up |
|---|---|---|---|
| 13 | Numbers 1–20 | Core cardinal list corroborated | Expand the variation note; review the counted-object and duration examples |
| 14 | Colours and everyday objects | Basic colour list corroborated; object list only partly cross-checked | Verify every object entry and review object/locative morphology |
| 15 | Family vocabulary | Core kinship words and possessive patterns supported | Clarify `kal`; standardize `dayika/dayîka` and regional variants |
| 16 | Weekdays and time | Weekday list corroborated | Revisit `doh`; distinguish tomorrow/morning and Friday variants; check example sentences |
| 17 | Basic present tense | Main `di-` pattern and core paradigms supported | Keep irregular stems and compound `hîn bûn` scoped carefully |
| 18 | Negation | Present `na-` rule and key examples supported | Add `karîn → nikarim` to the exception note; clarify imperative and copula conventions |

---

## Lesson 13 — numbers 1–20

### Supported
- The selected cardinal forms are substantially consistent with Haig (2018), §2.4 “Numerals,” and Omniglot's Northern/Kurmanji number list: `yek, du, sê, çar, pênc, şeş, heft, heşt, neh, deh, yanzdeh, diwanzdeh, sêzdeh, çardeh, panzdeh, şanzdeh, hevdeh, hejdeh, nozdeh, bîst`.
- The source material records real variants: e.g. `yanzdeh/yazdeh`, `dwanzdeh/duwanzdeh`, and variants around 2, 3, 16 and 19. The lesson's chosen forms are usable as one teaching set; alternatives should not be labelled incorrect.
- Haig notes that some western Kurmanji varieties regularize 11–19 differently. This is dialect variation, not a spelling mistake.

References:
- Haig, Geoffrey (2018), “Northern Kurdish (Kurmanjî),” §2.4, pp. 121–122: https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf
- Omniglot, “Kurdish (Kurmanji) numbers”: https://www.omniglot.com/language/numbers/kurdish.htm
- KurdiPedia, *Kurmanji Kurdish, Lesson 2*: https://www.kurdipedia.org/files/books/2023/474430.PDF

### Review flags
1. The lesson's variation note names 11, 12 and 15, but variants are not confined to those three. Rephrase the note only after the course's editorial standard is chosen; do not change the lesson automatically.
2. `Ez du pirtûkan dixwînim` is the highest-priority sentence to have checked by a Kurmanji grammar editor. The lesson explains `pirtûkan` as oblique plural because it is a direct object in the present. That explanation is too categorical without a precise account of number, definiteness, and case marking in the construction.
3. `Ew pênc rojan li vir e` appears intended as a duration (“is here for five days”). The inflection and intended temporal reading should be checked against a grammar source and a native speaker. Make the intended duration explicit in the gloss if confirmed.
4. The Sorani glosses and sentence translations remain a separate Sorani editorial task.

**Assessment:** cardinal vocabulary is broadly corroborated; the case/duration explanations need specialist review. No numeric entry was silently normalized.

## Lesson 14 — colours and everyday objects

### Supported
The basic colour forms `sor` (red), `şîn` (blue), `kesk` (green), `zer` (yellow), `reş` (black), `spî` (white), and `qehweyî` (brown) are listed in Kurmanji vocabulary references and in the earlier source review. The forms are suitable as a beginner vocabulary set, while colour semantics can vary regionally and do not always map one-to-one to Sorani labels.

References:
- University of Arizona, “Kurmanji Kurdish”: https://iranian-languages.arizona.edu/node/7
- Institut kurde de Paris, Kurdish language teaching material: https://bnk.institutkurde.org/images/pdf/DTP48ZMAL1.pdf
- Omniglot, multilingual colour vocabulary: https://omniglot.com/language/colours/multilingual.htm
- Yari Kurmanji dictionary: https://yari.krd/dictionary/

### Review flags
1. The common-object list (`pirtûk, pênûs, defter, derî, kursî, mase, telefon, av, nan, mal`) is plausible, but the sources checked here do not independently substantiate every entry and every Sorani gloss. Treat the list as a dictionary-check candidate, not as fully verified.
2. `Telefon li ser maseyê ye` is a plausible locative example, but the inflected form `maseyê` should be checked against the course's chosen grammar and its case/ezafe analysis.
3. `Ez pirtûkê dixwînim` contains marked object morphology. It should remain a model sentence only until the relevant object-marking rule is explicitly taught or checked by a specialist.
4. The predicate examples (`Ev pirtûk sor e`, `Ev pênûs reş e`, `Av sar e`) are useful beginner patterns, but do not by themselves teach attributive adjective placement or ezafe.
5. The Sorani glosses—especially the colour range and `spî`—need native Sorani editorial confirmation.

**Assessment:** colour vocabulary is corroborated at the basic lexical level; the full object inventory and sentence morphology are not yet fully verified.

## Lesson 15 — family vocabulary

### Supported
The central entries `malbat` (family), `dayik` (mother), `bav` (father), `kur` (son/boy), `keç` (daughter/girl), `bira` (brother), `xwişk` (sister), and `zarok` (child) are supported by Kurmanji teaching/grammar resources. The possessive expressions `dayika min`, `bavê min`, `birayê min`, and `xwişka min` are also represented in the consulted learning materials, with spelling variation such as `dayîka min`.

References:
- Kurmanji School, family vocabulary: https://kurmanjischool.com/en/family-in-kurmanji/
- KurdiPedia, *Kurmanji Kurdish, Lesson 2*: https://www.kurdipedia.org/files/books/2023/474430.PDF
- *Kurmanji Kurdish for the Beginners*: https://muugumuugu.github.io/bOOkshelF/languagesNcodes/Kurmanji.pdf
- Yari Kurmanji dictionary: https://yari.krd/dictionary/

### Review flags
1. `kal` should not be taught as an unambiguous equivalent of “grandfather.” It can refer to an old/elderly man in some usage; other sources give `bapîr` or `kalik` for grandfather. The seed itself wisely cautions that meaning depends on usage. A clearer kinship term and a source-specific note should be considered in a later editorial proposal.
2. `pîrik` is attested for grandmother in some sources, alongside variants such as `dapîr`; identify the variety/source rather than implying one universal form.
3. The lesson uses `dayika min`; references also show `dayîka min`. Select one orthographic house form and apply it consistently across lessons, without changing Latin forms until that standard is approved.
4. `mêr` and `jin` can mean “man/woman” and may mean “husband/wife” in context. The lesson's contextual caveat is appropriate.
5. The exact segmentation/inflection in `Navê bavê min Azad e` and the broader distribution of `xwe` should be checked before those examples are used to teach a general rule.
6. Sorani translations are not independently verified by the Kurmanji references.

**Assessment:** core family vocabulary and possessive phrases are supported. The principal editorial issues are the gloss of `kal`, regional alternatives, and consistency of `dayika/dayîka`.

## Lesson 16 — weekdays and time

### Supported
The seven day names `duşem, sêşem, çarşem, pêncşem, în, şemî, yekşem` match the Kurmanji teaching list in *Kurmanji Kurdish for the Beginners*, Lesson 4, §2.2, and other learning references. The core time terms `îro`, `niha`, `paşê`, `hefte`, `meh`, and `sal` are also attested.

References:
- *Kurmanji Kurdish for the Beginners*, Lesson 4, §§2.2–2.3: https://muugumuugu.github.io/bOOkshelF/languagesNcodes/Kurmanji.pdf
- Thackston, *Kurmanji Kurdish: A Reference Grammar with Selected Readings*: https://sites.fas.harvard.edu/~iranian/Kurmanji/kurmanji_complete.pdf
- Omniglot weekday/number references: https://www.omniglot.com/language/numbers/kurdish.htm

### Review flags
1. The seed uses `doh` for “yesterday.” The sources checked more commonly give `duh` or `duhî`. This is a spelling/house-style issue to resolve against the chosen dictionary; do not silently replace it.
2. Friday is listed as `în`; forms such as `înî` and inflected `roja înê` also occur. The short form is attested, but a variation note would help.
3. `sibê` can mean tomorrow/next morning and can overlap with “morning” depending on context. The current Sorani gloss is usefully cautious.
4. The four sample sentences are not all validated merely by the weekday list. In particular `Ez sibê têm` (future-time adverb with present-form verb), `Em îro dixwînin`, and `Ez niha amade me` need sentence-level review against the selected grammar and native usage.
5. The Sorani gloss of `dereng` and other context-sensitive time terms needs editorial review.

**Assessment:** weekday names and several time words are corroborated; `doh` and the sample sentence grammar remain open editorial/grammar checks.

## Lesson 17 — basic present tense

### Supported
The core statement that many ordinary present/habitual Kurmanji verbs use a present stem with the prefix `di-` and personal endings is supported by the University of Arizona overview, Thackston, and KurdiPedia's grammar lesson. The six-person paradigm for `xwendin` and examples such as `Ez diçim`, `Ez dikim`, `Ez dinivîsim`, and `Ez dixwim` are broadly consistent with the cited grammar descriptions. A neutral/basic clause commonly places the verb at the end (SOV), though this is not an inflexible rule.

References:
- University of Arizona, “Kurmanji Kurdish” — verbs and case: https://iranian-languages.arizona.edu/node/7
- KurdiPedia, *Kurmanji Kurdish, Lesson 3*: https://www.kurdipedia.org/files/books/2023/474430.PDF
- Thackston, *Kurmanji Kurdish: A Reference Grammar with Selected Readings*: https://sites.fas.harvard.edu/~iranian/Kurmanji/kurmanji_complete.pdf
- Haig & Öpengin (2018), “Northern Kurdish (Kurmanjî)”: https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf

### Review flags
1. The formula is correctly labelled as a general pattern, not a universal rule. Present stems cannot always be mechanically derived from the infinitive; irregular verbs and vowel-initial stems need separate treatment.
2. `Em kurdî hîn dibin` uses the compound construction `hîn bûn`; it should not be presented as if it were an ordinary single verb with a fully regular stem.
3. `Ez pirtûkekê dixwînim` is plausible, but its indefinite/oblique object marking belongs with the course's case lesson and should not be inferred from the present-tense paradigm.
4. The default SOV note is appropriate as a basic tendency; retain the caveat that focus and discourse can change word order.
5. Some teaching references spell forms differently (for example the writing-verb paradigm). Keep the course's chosen Latin orthography internally consistent and validate each inflected form with the same grammar source.
6. Sorani translations require their own editorial pass.

**Assessment:** the present-tense pattern and main sample conjugations are supported. Keep the scope limited to regular present forms and explicitly separate irregular stems and compound predicates.

## Lesson 18 — negation in simple sentences

### Supported
The main present-tense rule is well supported: for many ordinary present forms, `na-` replaces affirmative `di-`, rather than being stacked with it. The examples `Ez naxwînim`, `Ez naçim`, `Ez nanivîsim`, and `Ez nabêjim` follow this pattern. `Ez nizanim` is also a well-attested special form.

The academic literature describes multiple Kurmanji negation markers—`n(a)-`, `n(e)-`, and `ni-`—and their interaction with tense/aspect/mood prefixes. The pedagogical grammar sources confirm the present `na-` pattern and the negative command marker `ne-`.

References:
- Gündoğdu (2015), “Negation in Kurmanji,” *Affix Ordering Across Languages and Frameworks*, pp. 154–172: https://doi.org/10.1093/acprof:oso/9780190210434.003.0007
- Haig & Öpengin (2018), “Northern Kurdish (Kurmanjî)”: https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf
- KurdiPedia, *Kurmanji Kurdish, Lesson 3*: https://www.kurdipedia.org/files/books/2023/474430.PDF
- Thackston, *Kurmanji Kurdish: A Reference Grammar with Selected Readings*: https://sites.fas.harvard.edu/~iranian/Kurmanji/kurmanji_complete.pdf

### Review flags
1. The lesson mentions `zanîn → nizanim` but omits the other well-known present-negation exception `karîn → nikarim`. This is a clear omission in the learner-facing exception note, not a request to edit it automatically.
2. The negative commands `Nexwîne!` and `Neke!` are consistent with sources describing `ne-` in negative imperative/subjunctive forms. Other literature records prohibitive `me-` in some varieties/analyses. The seed's claim that this is “older/regional” needs a precise variety-specific citation; avoid reducing the variation to a universal historical label.
3. `Ez ne mamosteyek im` raises spacing/segmentation questions for nominal/c copular negation. `Ew li vir nîne` should be distinguished from ordinary verbal `na-` negation and from existential constructions. Both require a Kurmanji editor's consistency decision.
4. Sorani translations and punctuation need native editorial review.

**Assessment:** present verbal negation is corroborated. The exception note should account for `nikarîn/nikarim`; imperative and copular patterns need a variety-aware editorial pass.

---

## Overall disposition

- Lessons 13–18 have been reviewed at the source/claim level, but this is **not** a blanket certification of every lexical item, sentence, translation, or dialect.
- The highest-priority editorial/grammar review items are: lesson 13's object and duration morphology; lesson 14's object/locative examples; lesson 15's `kal` gloss and possessive spelling consistency; lesson 16's `doh` and sample sentences; lesson 17's compound `hîn bûn`; lesson 18's missing `nikarim` exception and copula/imperative conventions.
- No automatic correction was applied. All Latin Kurmanji forms and Sorani translations were left untouched.
- No migration or database was run or modified. `main`, PR #3, production Supabase, and deployment remain untouched.
