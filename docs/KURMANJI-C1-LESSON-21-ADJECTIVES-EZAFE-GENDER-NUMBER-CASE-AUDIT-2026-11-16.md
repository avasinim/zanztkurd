# Course 1, Lesson 21 — Adjectives, Ezafe, Gender/Number and Case: Evidence Audit

**Date:** 2026-11-16  
**Repository:** `avasinim/zanztkurd`  
**Branch:** `fix/kurmanji-ci-current-migration`  
**Scope:** Evidence review of the existing Course 1 Lesson 21 seed payload. Proposal-only; no lesson edits.

## 1. Executive findings

The lesson has a sound introductory core: descriptive adjectives normally follow the noun in a Kurmanji noun phrase, and the linking relation is commonly marked by ezafe. The examples are broadly compatible with Standard Kurmanji, but the explanation needs a precise correction:

**In Standard Kurmanji, the ezafe marker agrees with the head noun in grammatical gender and number. It does not agree with the external case of the whole noun phrase.** In important constructions, the presence of ezafe suppresses overt case marking on the head noun; when a demonstrative introduces the whole phrase, the demonstrative can express the case of that phrase. These are separate grammatical layers and should not be collapsed into “ezafe changes according to gender, number and case.”

Other findings:
- Adjectives in attributive ezafe phrases follow the noun and do not take the noun's gender/number suffix.
- Standard Kurmanji ezafe forms also vary according to definiteness/indefiniteness, not only gender and number.
- The four seed examples illustrate different forms and should be labelled accordingly: `bajarê mezin` (masculine singular definite), `maleke biçûk` (feminine singular indefinite), `pirtûka nû` (feminine singular definite), and `kumên reş` (plural definite).
- `bajarê mezin` is not the same form as the source-attested indefinite `bajar-ek-î mezin` (“a big town”). In Kurmanji, a bare noun can receive a generic or contextually definite interpretation; there is no dedicated definite article.
- The lesson correctly distinguishes attributive adjectives inside a noun phrase from predicative adjectives in a clause, but should keep the two constructions separate and avoid presenting an NP as a complete sentence.
- The free/demonstrative ezafe forms (e.g. `yê spî`, `ya te`, `yên mezin`) are a separate construction and are better cross-referenced to the later lesson on free ezafe rather than mixed into this beginner lesson.

## 2. Exact payload reviewed

File: `docs/kurmanji-content-seed-part-03.sql`  
Blob SHA: `b6f89841ac49adb256a7874179a258436e095909`  
Lesson key: `kurmanji-course-1-lesson-21.html`  
Title: `هاوەڵناو و وەسفکردن`

The payload contains:
1. A definition of adjectives and post-nominal position.
2. Examples `bajarê mezin`, `maleke biçûk`, `pirtûka nû`.
3. A note that ezafe connects nouns and adjectives and varies with gender, number and case.
4. An adjective list: `mezin`, `biçûk`, `nû`, `kevn`, `baş`, `reş`, `spî`.
5. Examples `bajar-ek-î mezin` and `kum-ên reş`.
6. A distinction between an attributive adjective inside an NP and an adjectival predicate in a clause, with no full predicative sentence supplied.
7. Exercises and references to Haig (2018), Arizona's Iranian Languages resource, and Thackston.

## 3. Evidence and grammatical analysis

### 3.1 Basic NP order: noun before adjective

Haig (2018), §2.3, gives the Standard Kurmanji NP structure as:

`Dem | Num | N-Ez | Poss | Ez | Adj`

His example is `ev sê kum-ên min yên reş` (“these three black hats of mine”). Possessors and descriptive adjectives follow the head noun, and are linked by ezafe. This directly supports the lesson's beginner rule that descriptive adjectives normally follow the noun.

This is a rule about the structure of an attributive noun phrase, not a claim that every adjective in every syntactic environment must follow a noun. Predicative adjectives are a different construction.

### 3.2 Ezafe agreement: gender and number, not external case

Haig (2018), §2.3.1, explains that in Standard Kurmanji the ezafe agrees with its head noun in gender and number. It can be a bound suffix/clitic or an independent particle, and dialects vary in form and distribution.

The lesson's statement that the ezafe form depends on “gender, number and case” is therefore misleading. It conflates:
- the agreement features expressed by the ezafe itself (gender and number in Standard Kurmanji);
- the case of a possessor or other dependent inside the NP; and
- the case of the entire NP in the clause.

Haig explicitly notes that the presence of ezafe suppresses overt oblique case marking on the head noun. The ezafe construction remains unchanged according to the external syntactic role of the whole NP. With a demonstrative introducing the NP, the demonstrative can express the case of the whole phrase. This is a more advanced point, but it is important not to teach that “case” is an agreement feature of the ezafe.

**Editorial proposal:** replace the phrase “ezafe depends on gender, number and case” with “in Standard Kurmanji, the ezafe form is selected according to the head noun's gender and number; case marking is a separate layer and must not be confused with ezafe.”

### 3.3 Definiteness/indefiniteness is also visible in the forms

The Standard Kurmanji paradigm in Haig (2018), Table 11, distinguishes definite and indefinite forms as well as gender/number:

| Head noun | Definite ezafe | Indefinite ezafe | Example |
|---|---|---|---|
| Masculine singular | `-ê` | `-ek-î` | `gund-ê` / `gundek-î` |
| Feminine singular | `-a` | `-ek-e` | `jin-a` / `jinek-e` |
| Plural | `-ên` (also `-êt` in some varieties) | `-in-e` | `gund-ên` / `gund-in-e` |

The plural `-êt` form is especially associated with Behdini in Haig's account. In the spoken language, the ezafe following indefinite `-ek` may sometimes be omitted; Haig notes this variation but it should not be generalized as the main beginner pattern.

The lesson should not imply that gender and number alone predict every form. Definiteness/indefiniteness and regional variety matter too.

### 3.4 Exact examples: forms and intended readings

| Seed example | Morphological analysis | Assessment |
|---|---|---|
| `bajarê mezin` | `bajar-ê` masculine singular definite ezafe + `mezin` | Structurally valid as a definite/contextually identified “big city”; not the indefinite “a big city” |
| `bajar-ek-î mezin` | `bajar-ek-î` masculine singular indefinite ezafe + `mezin` | Directly attested by Haig (2018), §2.3.1, as “a big town” |
| `maleke biçûk` | `mal-ek-e` feminine singular indefinite ezafe + `biçûk` | Morphologically consistent with the Standard feminine indefinite pattern; `mal` is feminine |
| `pirtûka nû` | `pirtûk-a` feminine singular definite ezafe + `nû` | Morphologically consistent: `pirtûk` is feminine; this is not the oblique form `pirtûkê` |
| `kum-ên reş` | `kum-ên` plural definite ezafe + `reş` | Directly supported by Haig's larger example `ev sê kum-ên min yên reş`; the adjective follows the noun |

The distinction between `pirtûka` and `pirtûkê` is especially important for this course:
- `pirtûka nû`: feminine singular definite ezafe in an attributive NP (“the new book” in an appropriate context).
- `pirtûkê`: feminine singular oblique form in relevant syntactic contexts, such as a present-tense transitive object.

Likewise, the `-ê` in `bajarê mezin` is an ezafe linker, not simply an oblique case suffix. Teach these forms by construction, not by matching the final vowel in isolation.

### 3.5 The adjective itself

In the source examples, the adjective remains in its lexical form after nouns of different genders and numbers: `mezin`, `reş`, `spî`. The gender/number marking is on the ezafe linker, not an adjective agreement suffix. This should be stated explicitly so learners do not try to change `mezin` into separate masculine, feminine and plural forms.

The vocabulary list is suitable as a starter set. However, the lesson should distinguish learning an adjective in isolation from using it in a phrase: the noun's grammatical gender and the relevant ezafe form must be learned together. Gender of inanimate nouns is lexical and cannot reliably be guessed from meaning alone.

### 3.6 Adjectival predicates are not attributive NPs

The lesson's section 4 is right to separate:
- **Attributive use:** adjective modifies a noun inside an NP, normally linked by ezafe.
- **Predicative use:** adjective functions as the predicate of a clause and appears with the relevant copular structure in Standard Kurmanji.

Haig (2018) documents that Standard Kurmanji predicates with nominal/adjectival complements require a clause-final copula; some southeastern varieties have additional ezafe-like predicative constructions. Those regional constructions must not be presented as the Standard Kurmanji pattern.

The lesson currently avoids inventing a predicative sentence. That restraint is appropriate. A future revision should add a source-verified full clause only after its copula, agreement and Sorani gloss have been checked.

### 3.7 Free/demonstrative ezafe: keep it separate

Haig (2018), §2.3.1, distinguishes simple linking ezafe from free/demonstrative ezafe. The latter may add another modifier or function anaphorically (“the one ...”), with examples:
- `bra-yê min ê mezin` — “my older brother”
- `yê spî` — “the white one” (masculine singular)
- `ya te` — “your one” (feminine singular)
- `yên mezin` — “the big ones” (plural)

These forms are not interchangeable with the simple noun + adjective linker. The current lesson need not teach the whole free-ezafe paradigm; it should cross-reference the dedicated later lesson and avoid blurring the two.

## 4. Recommended learner-facing structure (not applied)

1. Define an adjective and teach its common post-nominal position in a noun phrase.
2. Explain that an attributive adjective is connected to its noun by ezafe.
3. Teach a small, explicitly scoped Standard Kurmanji pattern table:
   - masculine singular definite `-ê`;
   - masculine singular indefinite `-ek-î`;
   - feminine singular definite `-a`;
   - feminine singular indefinite `-ek-e`;
   - plural definite `-ên` (note `-êt` as a regional form only if useful);
   - plural indefinite `-in-e`.
4. Explain that the ezafe agrees with the head noun in gender and number; the adjective itself does not take those suffixes.
5. Label the lesson's examples by gender, number and definiteness; contrast `bajarê mezin` with `bajarekî mezin`.
6. Explicitly contrast ezafe with oblique case using `pirtûka nû` versus `pirtûkê`.
7. Keep attributive adjective phrases separate from full predicative clauses.
8. Cross-reference free/demonstrative ezafe to the later lesson rather than adding it all here.

## 5. Editorial gates

- The course's chosen reference variety and spelling policy must govern whether the main paradigm is presented as Standard Kurmanji and how Behdini/other regional forms are labelled.
- Preserve noun gender in vocabulary records; `pirtûk` and `mal` are feminine in the sources consulted.
- Keep ezafe, oblique case, indefinite marking and definite/contextual readings distinct.
- Native Kurmanji review is still needed for the exact naturalness and intended discourse reading of each full example.
- Sorani glosses need independent Sorani copy-editing.
- Do not add regional predicative-ezafe constructions to the Standard Kurmanji beginner rule.

## 6. Sources

1. **Haig, Geoffrey (2018).** “Northern Kurdish (Kurmanjî),” in *The Languages and Linguistics of Western Asia: An Areal Perspective*, especially §2.3, §2.3.1 and Table 11, pp. 118–121. Primary source for NP order, ezafe agreement, paradigms, case interaction, free ezafe and regional variation. https://www.uni-bamberg.de/fileadmin/aspra/06_Team/Publications_and_CV/haig_2018_ch.2.3_northern_kurdish.pdf
2. **Haig, Geoffrey & Ergin Öpengin (2015).** “Kurdish: A critical research overview,” especially discussion of grammatical gender and nominal inflection. https://www.uni-bamberg.de/fileadmin/aspra/06_Team/Publications_and_CV/haig_opengin_2015_gender_kurdish_offprint.pdf
3. **Thackston, W. M. (2006).** *Kurmanji Kurdish: A Reference Grammar with Selected Readings*, especially §§1 and 4, for gender, noun forms and construct/ezafe structures. https://sites.fas.harvard.edu/~iranian/Kurmanji/kurmanji_complete.pdf
4. **Morad (2023).** *Towards a Standard Fine-Grained Part-of-Speech Tagging for Northern Kurdish*, discussion of noun gender and the feminine noun `pirtûk`. https://essay.utwente.nl/fileshare/file/97597/Morad_MA_EEMCS.pdf
5. **University of Arizona, Iranian Languages.** “Kurmanji Kurdish,” overview of gender, case and ezafe. https://iranian-languages.arizona.edu/node/7
6. **Kurdîzan.** “Describe people and things,” a current pedagogical comparison for noun + ezafe + adjective and predicative copula; supplementary, not a substitute for the academic grammar. https://kurdizan.net/ders/rengder

## 7. Change boundary

Documentation-only audit. No lesson body, seed SQL, migration, application code, CI, Supabase, production data, PR #3, `main`, or deployment was changed. No database was accessed.
