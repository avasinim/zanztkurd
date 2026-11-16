# Northern Kurmanji Course 2 — 12-lesson source review (2026-11-16)

## Scope and preservation

- Reviewed the 12 Course 2 lesson bodies in `docs/kurmanji-content-seed-part-04.sql` (lessons 01–06) and `docs/kurmanji-content-seed-part-05.sql` (lessons 07–12), on branch `fix/kurmanji-ci-current-migration`.
- Course 2 is the 12-lesson Northern Circle morphology/grammar course. It is separate from Course 1's 26 orthography lessons and from the distinct 32-lesson phonetics/phonology path.
- A pre-review backup branch was created: `backup/kurmanji-before-course2-source-review-2026-11-16`, pointing to starting commit `056714d7ae019caf2c4912755aaa291e6a0c2d9a`.
- This review is documentation only. No lesson text, split seed payload, migration, schema, database, `main`, PR #3, or deployment was changed. No SQL was executed.
- Latin Kurmanji forms are quoted as found in the seed/source; this review does not silently normalize or rewrite them.

## Executive summary

The course has a coherent progression: morphology and affixes (01–02), noun morphology and ezafe (03–06), pronouns/case and verbs (07–10), clause structure and review (11–12). The core framework is broadly supported by Geoffrey Haig (2018), especially the sections on nominal morphology, pronouns, noun phrases/ezafe, verbal morphology, negation, future, word order, and ergative alignment.

However, the course is not ready to be certified as a complete, source-verified teaching package. The largest gaps are pedagogical rather than wholesale scientific errors: several lessons are abstract and offer few worked forms; Lesson 03 omits the actual standard plural paradigm; Lesson 08 does not show how stems and person markers are segmented; Lesson 10 names nominal-clause negation and question formation without giving worked Kurmanji examples; Lesson 12 is a self-review outline rather than a demonstrated final test. A native Sorani editor is also needed.

## Lesson-by-lesson findings

| Lesson | Topic | Source assessment | Required follow-up |
|---:|---|---|---|
| 01 | Morphology and word structure | The definitions of word and morpheme, and the warning not to equate every sound segment with a morpheme, are sound introductory principles. The `-ek` example is supported as a grammatical indefinite suffix. | Too abstract for a first morphology lesson: add source-checked, segmented Kurmanji examples showing root, derivational/inflectional morpheme, and word boundary. Distinguish morpheme from phoneme and syllable explicitly. |
| 02 | Root, stem, prefix and suffix | The distinction between root and stem and the positional definitions of prefix/suffix are linguistically sound. The caution against inventing morpheme boundaries is appropriate. | No actual Kurmanji prefix example is worked through, and `-ek` is the only concrete suffix example. Add a small, verified contrast set and label the segmentation; avoid presenting the lesson as if Kurmanji morphology were only suffixal. |
| 03 | Noun, grammatical gender and number | Masculine/feminine gender in Standard Kurmanji and its relevance to oblique case and ezafe are supported. Gender is not identical to natural sex; dialectal variation is substantial. | Important omission: the lesson says plural forms depend on noun type/case but does not teach the standard paradigm. In Standard Kurmanji, direct nouns generally do not show overt plural marking; oblique plural commonly takes `-a(n)`. The direct indefinite plural `-in` is restricted/variable and should not be taught as universal. Add examples and identify the reference variety. |
| 04 | Definite/indefinite nouns; `-ek` | The central contrast is supported: singular indefiniteness is marked by `-ek`; bare nouns can be definite or generic depending on context. The contrast `gund-ek-î` / `jin-ek-ê` is consistent with the Standard Kurmanji gender/case paradigm. | Preserve the distinction between the oblique endings `-î/-ê` and the masculine ezafe `-î` in `bajar-ek-î mezin`. The lesson correctly flags this homophony, but would benefit from a morpheme-by-morpheme table and a full sentence showing the case environment. |
| 05 | Ezafe and noun–adjective relation | Strongly supported. Haig's example `bajar-ek-î mezin` is explicitly attested; the ezafe agrees with the head noun in gender/number. Possessors and adjectives follow the head noun and are linked through ezafe. | Clarify that the possessor is oblique, while the adjective does not itself take the possessor's oblique case. Distinguish bound/linking ezafe from free or demonstrative ezafe; the lesson currently treats the construction only at an introductory level. |
| 06 | Possession and possessive pronouns | `mal-a me` is an attested Haig example. The analysis of `-a` as feminine ezafe and `me` as the oblique form of `em` is supported. The same-clause reflexive example `Ez li mal-a xwe me` is also directly attested; `xwe` is obligatory instead of `min` in this coreferential Standard Kurmanji example. | The title promises possessive pronouns, but the body does not provide a complete possessive paradigm or contrast across persons. Add a clear table and distinguish personal pronouns used as oblique possessors from any independent possessive forms, if those are in scope. Keep dialect qualification for reflexive use. |
| 07 | Personal pronouns and direct/oblique case | The six direct/oblique pairs are supported by Haig's Table 9: `ez/min`, `tu/te`, `ew/wî,wê`, `em/me`, `hûn/we`, `ew/wan`. The warning not to reduce direct/oblique to a simple subject/object rule is correct. | Add worked sentence contrasts for present transitive, past transitive, adpositions, and possession. Explain that in past transitive clauses the logical subject is oblique and the direct object is direct, with agreement on the direct object; this is not a universal rule for every tense or clause. |
| 08 | Verb, stem, person and number | The lesson's caution that person/number marking varies with tense and clause type is supported. Haig documents distinct present and past stems and person agreement patterns. | The lesson contains almost no actual conjugation or segmentation. Add the source-attested contrast `ez dibêjim`, `ez hatim`, `min xwar` and show which element marks the stem, tense/aspect, person, and alignment. Explain transitive/intransitive distinctions before asking learners to infer them. |
| 09 | Present, past and future | The contrast between `ez dibêjim`, `ez hatim`, and `min xwar` is supported by Haig's Table 14. The present-stem indicative/subjunctive distinction and future particle `(d)ê/wê` plus a subjunctive verb are also supported. | Verify the exact copied form of the future example against Haig §2.6.4: the source prints `ew dê mesel-ê ji te re bêj-ê`. Preserve the source's diacritics and segmentation exactly if quoting it. Explain that future is not a simple future suffix and that high-frequency verbs may omit `bi-` in this construction. |
| 10 | Negation and questions | The core statement that `na-` replaces indicative `di-` in many present forms is supported, with important exceptions: `zanîn` and `karîn` use `ni-` (`nizanim`, `nikarim`); subjunctive negation uses `ne-`; Standard Kurmanji past simple/progressive negation uses `ne-`. | The section titled “negation of nominal sentences” gives no example or rule. The question section gives no Kurmanji question forms or source-backed examples. Add separate worked examples for verbal vs non-verbal negation, yes/no questions, and information questions. Qualify western-dialect past progressive negation, where Haig records `na-`, rather than universalizing the Standard pattern. |
| 11 | Word order and clause structure | SOV is supported as the pragmatically neutral order. The lesson correctly says order is not rigid and that focus/fronting matters. | Add the source's important Goal/recipient qualification: some dialects use SGOV with `ji ... ra`; recipients with `dan` are commonly placed immediately after the verb in oblique case, and southeastern varieties may use post-predicate goals. Keep SOV as a default, not a fixed rule. |
| 12 | Review and final test | The review correctly brings together morphology, noun phrase structure, pronouns/case, verbs, negation, and word order. Its methodological warning against treating an exercise as a substitute for source reading is sound. | The visible lesson body is a review outline and open-ended analysis task, not a demonstrable scored final test. If a separate interactive quiz exists, link/identify it; otherwise rename this as review/self-assessment or add a properly specified assessment with answer key and scoring criteria. |

## Priority action register

### Priority A — scientific precision before release

1. **Nominal plural (Lesson 03):** add the Standard Kurmanji direct/oblique plural contrast and mark regional variation. Do not teach `-in` as a universal direct indefinite plural.
2. **Case and alignment (Lessons 04, 06–09):** keep direct/oblique terminology consistent. Do not equate oblique with object or direct with subject. Explain past transitive alignment and object agreement.
3. **Ezafe (Lessons 03–06):** make head-noun gender/number agreement explicit; distinguish linking ezafe from free/demonstrative ezafe; distinguish oblique possessor marking from ezafe marking.
4. **Verb morphology and TAM (Lessons 08–10):** introduce present and past stems, agreement suffixes, indicative/subjunctive prefixes, negation prefixes, and future particles as separate pieces of the system.
5. **Negation variety scope (Lesson 10):** distinguish Standard Kurmanji from western and other regional patterns; verify all non-verbal and interrogative examples before adding them.
6. **Word order and Goals (Lesson 11):** include the SOV default, pragmatic fronting, Goal/recipient variation, and the post-verbal recipient pattern with `dan`.
7. **Exact source transcription (Lesson 09):** verify the future example's `bêj-ê` form and diacritics against Haig §2.6.4 before treating it as a verbatim quotation.

### Priority B — pedagogy and examples

- Lessons 01–02 need worked morpheme segmentation, not only definitions and methodological cautions.
- Lesson 03 needs actual gender/number paradigms with several nouns.
- Lesson 06 needs a complete, scoped possessive-pronoun table.
- Lessons 07–09 need contrastive mini-paradigms and learner-facing glosses.
- Lesson 10 needs worked negative and interrogative sentences.
- Lesson 12 needs an explicit decision about whether the page is a review or a final assessment.

### Priority C — Sorani editorial pass

A native Sorani editor should check terminology, spelling, punctuation, and sentence clarity across all 12 lessons. The previously recorded seed/migration differences include:
- Lesson 04: `پەیویستە` vs `پێویستە`.
- Lesson 06: `پەیویستە` vs `پێویستە`.
- Lesson 09: `نوسین` vs `نووسین`.
- Lesson 10: `نوسینی` vs `نووسینی`.

Do not silently normalize these spellings. Select and document the Avasin house style first. Keep Kurmanji Latin forms intact unless a source-based correction is separately verified.

## Source basis consulted

1. Haig, Geoffrey (2018), “Northern Kurdish (Kurmanjî),” in *The Languages and Linguistics of Western Asia: An Areal Perspective*, pp. 106–158. DOI: https://doi.org/10.1515/9783110421682-004. Particularly §§2.2–2.3 (gender, case, plural, pronouns, ezafe), §2.6 (verb stems, person marking, TAM, negation, future), and §2.7 (word order and ergative alignment). Full chapter PDF: https://www.uni-bamberg.de/fileadmin/aspra/06_Team/Publications_and_CV/haig_2018_ch.2.3_northern_kurdish.pdf
2. Haig, Geoffrey & Ergin Öpengin (2018), “Kurmanji Kurdish in Turkey: Structure, varieties and status.” Used for the direct/oblique system, split alignment, gender instability, and dialect variation. PDF: https://www.uni-bamberg.de/fileadmin/aspra/06_Team/Publications_and_CV/HaigOepengin2018_Kurmanji_Kurdish_.pdf
3. Haig, Geoffrey & Ergin Öpengin (2015), “On the relationship of case to agreement in split-ergative Kurmanji and beyond.” Used as supporting context for the direct/oblique and split-alignment analysis. DOI/source record should be checked against the final bibliography before publication.
4. Gündoğdu, Songül (2015), “Negation in Kurmanji,” *Affix Ordering Across Languages and Frameworks*, pp. 154–172. DOI: https://doi.org/10.1093/acprof:oso/9780190210434.003.0007. The abstract supports a templatic account with `na-`, `ne-`, and `ni-` and blocking interactions with `di-` and `bi-`; full-text access was not available in this review.

## Data integrity and release gates

- The earlier seed–migration discrepancy report identified 12 non-identical lesson payloads overall, including Course 2 lessons 04, 06, 09, and 10. These are small Sorani spelling differences, not permission to overwrite either side automatically.
- This source review does not reconcile those rows and does not establish what payload is currently served by production.
- The migration/seed parity validator must be rerun after an owner-approved canonical spelling/content decision. No production SQL or migration execution is authorized by this review.
- Existing Course 2 static-wrapper sweep is a historical repository check only; it does not prove live lesson retrieval, browser behavior, enrollment/access, quiz scoring, or progress persistence.

## Final disposition

**Course 2 lessons 01–12: source-reviewed, not certified for release.** The core grammatical framework is broadly supported, but plural morphology, case/alignment pedagogy, the possessive paradigm, verb morphology examples, nominal negation, question formation, future transcription, and final assessment design need follow-up. The Sorani copy-edit and seed/migration reconciliation remain separate gates.

No lesson body, seed, migration, database, `main`, PR #3, or deployment was changed while preparing this review.
