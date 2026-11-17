# Course 1, Lesson 23 — Definiteness, Indefiniteness, Demonstratives and Noun Case: Evidence Audit

**Date:** 2026-11-17  
**Repository:** `avasinim/zanztkurd`  
**Working branch:** `fix/kurmanji-ci-current-migration`  
**Baseline commit:** `6872a10802606dc41a7ad55c4cdb6fd2c784598f`  
**Seed file:** `docs/kurmanji-content-seed-part-03.sql`  
**Seed blob SHA:** `b6f89841ac49adb256a7874179a258436e095909`  
**Seed row:** `kurmanji-course-1-lesson-23.html`  
**Scope:** Evidence audit of the existing lesson payload only. This report is proposal-only; it does not edit lesson content.

## 1. Executive findings

The lesson's central explanation is substantially correct: Standard Kurmanjî has no dedicated definite article/suffix comparable to Sorani `-eke/-ekan`; singular indefiniteness is marked with `-ek`; and bare nouns can receive definite or generic/sortal readings from context. The direct/oblique paradigms in the seed are also consistent with Haig's Standard Kurmanjî table:

| Gender and interpretation | Direct | Oblique |
|---|---|---|
| Masculine singular, definite/bare | `gund` | `gund-î` |
| Masculine singular, indefinite | `gund-ek` | `gund-ek-î` |
| Feminine singular, definite/bare | `jin` | `jin-ê` |
| Feminine singular, indefinite | `jin-ek` | `jin-ek-ê` |

The lesson is not yet complete enough to be treated as a fully reliable reference lesson. The most important improvements are:

1. **Keep case and ezafe separate.** The sequence `-ek-î` can occur as the masculine indefinite oblique form, but `-ek-î` is also the masculine indefinite ezafe/linker form in a noun phrase. The same surface form must not automatically be labelled “oblique case”; its syntactic construction determines its analysis.
2. **Explain ezafe suppression of external oblique marking.** When a noun bears ezafe, the external oblique case of the whole noun phrase is not overtly marked on that head noun in the ordinary Standard Kurmanjî pattern. The ezafe construction itself remains stable across the external syntactic roles of the phrase.
3. **Distinguish demonstratives from articles.** `ev` and `ew` are proximal and distal demonstratives, not dedicated definite articles. Their oblique forms are `vî/vê/van` and `wî/wê/wan`, respectively.
4. **Add gender as a lexical property.** The learner must learn each noun's grammatical gender; it is not reliably predictable from its spelling. The oblique singular endings differ by gender.
5. **Qualify plural indefiniteness.** Do not teach direct plural `-in` as a universal Standard Kurmanjî suffix. Haig reports it as frequent in some Mardin/Syria varieties but rare or absent elsewhere.
6. **Make the morphology and the written form explicit.** Hyphens in forms such as `gund-ek-î` are analytical segmentation, not a mandatory spelling change to the unhyphenated word `gundekî`.

## 2. What the current seed gets right

### 2.1 No dedicated definite article

The opening section correctly says that Kurmanjî does not have a general dedicated definite marker on nouns and that a bare noun may be interpreted as definite or generic depending on context. Haig explicitly describes the two-way Direct/Oblique case opposition, singular indefiniteness with `-ek`, and the absence of a dedicated definiteness marker. Thackston likewise describes the bare/absolute noun as capable of generic and definite readings and states that Kurmanji has no articles.

The seed's contrast between `gund` (“village / the village”) and `gundek` (“a village”), and between `jin` and `jinek`, is therefore a sound introductory contrast.

### 2.2 Singular `-ek` and direct/oblique forms

The four-way table is correct for the standard paradigm described by Haig:

- masculine definite/bare: `gund` / `gundî`;
- masculine indefinite: `gundek` / `gundekî`;
- feminine definite/bare: `jin` / `jinê`;
- feminine indefinite: `jinek` / `jinekê`.

The seed's segmented versions `gund-ek`, `gund-ek-î`, `jin-ek`, `jin-ek-ê` are useful for teaching morphology. It should state that these hyphens display morpheme boundaries for analysis; normal running orthography commonly writes the word without those analytical hyphens.

### 2.3 Demonstrative contrast

The seed correctly introduces `ev` as proximal (“this”) and `ew` as distal (“that”), and its direct noun phrases `ev pirtûk`, `ew pirtûk`, and `ev jin` are appropriate introductory forms.

## 3. Required precision: case is not the same as ezafe

This is the most important technical issue for the next editorial pass.

Haig's Table 7 gives the noun's Direct/Oblique paradigm, while his Table 11 separately gives the Ezafe paradigm. They must not be collapsed into one table:

| Construction | Masculine singular | Feminine singular |
|---|---|---|
| Definite/bare noun, oblique | `gund-î` | `jin-ê` |
| Indefinite noun, oblique | `gund-ek-î` | `jin-ek-ê` |
| Definite ezafe/linker | `gund-ê` | `jin-a` |
| Indefinite ezafe/linker | `gundek-î` | `jinek-e` |

The masculine indefinite form `gundekî` is a particularly useful teaching warning: the same surface sequence may be analysed as the oblique form of an indefinite noun in one construction, or as the masculine indefinite ezafe/linker in another. Its grammatical function is determined by the larger noun phrase, not by the letters alone.

The feminine contrast makes the distinction visible: `jin-ek-ê` is the feminine indefinite oblique form, whereas `jin-ek-e` is the feminine indefinite ezafe/linker form. Similarly, `jin-ê` is the feminine oblique noun form, while `jin-a` is the feminine definite ezafe/linker.

Haig states that an ezafe on a noun suppresses overt expression of the external oblique case on that noun. The ezafe phrase remains unchanged when the complete phrase functions as an adpositional complement or subject. This should be stated explicitly, because the current lesson says that oblique forms occur after adpositions and in possessive constructions but does not yet explain the interaction with ezafe.

**Editorial recommendation:** retain the current Direct/Oblique table, but add a clearly separate small “Ezafe is a different construction” note/table. Do not call every `-î`, `-ê`, `-a`, or `-e` a case ending.

## 4. Demonstratives: forms and limits

Haig's Standard Kurmanjî demonstrative paradigm is:

| Meaning | Direct | Oblique masculine singular | Oblique feminine singular | Oblique plural |
|---|---|---|---|---|
| Proximal | `ev` | `vî` | `vê` | `van` |
| Distal | `ew` | `wî` | `wê` | `wan` |

The seed currently gives only direct forms. It should add the oblique set, ideally with source-attested examples rather than newly invented sentences. Haig gives `li vî welatî` (“in this homeland”) and documents the Standard forms in Table 10.

Haig also notes that many dialects attach a further noun clitic after a demonstrative (`-e/-a` singular and `-ene/-ana` plural, with regional variation). These are not universal Standard Kurmanjî definite articles. The current seed wisely does not introduce them; preserve that restraint unless a later dialect-specific lesson is planned.

**Editorial recommendation:** state plainly that `ev/ew` are demonstratives, not definite articles. Keep regional demonstrative clitics out of the core Standard paradigm, or label them explicitly as dialectal.

## 5. Gender, plural and dialect scope

### 5.1 Gender belongs to the noun lexicon

Haig notes that the gender of many inanimate nouns is opaque and that assignment differs by dialect; in much of Turkey the default for inanimates is feminine, whereas Behdinî has a different default. A learner therefore should not infer gender from spelling alone. The seed should say that each noun is learned with its gender and that the displayed `gund` (masculine) and `jin` (feminine) are examples, not a rule for predicting gender.

### 5.2 Plural forms are not a simple extension of singular `-ek`

Haig's Standard Kurmanjî description says that direct-case nouns generally do not inflect for plural, and that the oblique plural is marked with `-a(n)` (with dialectal variation). A direct plural indefinite ending `-in` is cited in pedagogical works but is frequently attested mainly in the Mardin region and across the border in Syria; elsewhere it is rare or absent.

The seed currently focuses on singular indefiniteness and does not teach a plural `-in` form. That omission is safer than presenting `-in` as a universal rule. If plural indefiniteness is later added, it must carry a regional qualification and must be distinguished from plural ezafe forms such as `gundine` in Haig's Ezafe paradigm.

### 5.3 Dialect scope must remain visible

Haig's “Standard Kurmanjî” sketch is loosely based on Cizre/Botan in southeastern Turkey and explicitly notes regional variation. The lesson should identify its tables as the Standard Kurmanjî baseline, not as an invariant description of every Kurmanji-speaking region. This matters especially for masculine singular oblique marking, plural morphology, gender assignment and demonstrative clitics.

## 6. Cross-lesson dependencies

- **Lesson 11 (pronouns):** Direct/Oblique is a grammatical case distinction, not a simple subject/object label. Keep noun and pronoun paradigms aligned without equating oblique with “object” in every tense.
- **Lesson 12 (demonstratives):** reuse the direct/oblique demonstrative paradigm consistently; avoid presenting `ev/ew` as articles.
- **Lesson 21 (adjectives and ezafe):** the ezafe linker agrees with the head noun's gender/number/definiteness pattern; do not reuse the case suffix table as an ezafe table.
- **Lesson 25 (case):** this lesson is an introduction to noun forms; Lesson 25 should carry the full functional distribution of oblique case (present transitive objects, adpositional complements, possessors, past-transitive agents, and related caveats). Avoid duplicating a simplified or contradictory rule.

## 7. Specific editorial changes recommended (not applied)

1. Preserve the opening explanation of bare nouns and singular `-ek`.
2. Label the four direct/oblique paradigms as Standard Kurmanjî and show grammatical gender explicitly.
3. Add one sentence explaining that each noun's gender is lexical and must be learned.
4. Add a separate Ezafe mini-table: `gund-ê / gundekî` and `jin-a / jinek-e`; explain that `gundekî` can be ambiguous in isolation between oblique and ezafe analyses.
5. State that ezafe suppresses overt external oblique marking on the head noun; do not describe the ezafe ending as the external case marker.
6. Add the oblique demonstrative forms `vî, vê, van, wî, wê, wan` using Haig's table and an attested example.
7. Explicitly say that demonstratives are not definite articles.
8. Add a dialect-scope note and do not generalize direct plural indefinite `-in`.
9. Clarify that hyphens in morphological examples are analytical segmentation; preserve the established Latin/Hawar orthography in ordinary examples.
10. Do not introduce Sorani article suffixes as if they were Kurmanji morphology; use them only as a brief contrast.

## 8. Native-speaker review still required

This audit verifies the grammatical analyses against published descriptions; it is not a substitute for native editorial review of every pedagogical sentence. In particular:

- confirm the naturalness and intended reading of the seed's three demonstrative noun phrases in the target editorial variety;
- confirm whether the lesson should use the labels “direct/oblique” or a locally preferred Kurdish terminology, while retaining the technical distinction;
- review whether the Sorani explanatory translations convey generic versus contextually definite bare nouns without implying a Kurmanji article;
- confirm the consistent orthographic treatment of morpheme-boundary hyphens across the course.

No new example sentence has been silently promoted to approved lesson content.

## 9. Sources

1. Geoffrey Haig (2018), “Northern Kurdish (Kurmanjî),” in Geoffrey Haig & Geoffrey Khan (eds.), *The Languages and Linguistics of Western Asia: An Areal Perspective*, pp. 106–158, especially §2.2.1 and Tables 7–10 (pp. 115–118), and §2.3 (pp. 119–120). [University of Bamberg PDF](https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf). DOI: [10.1515/9783110421682-004](https://doi.org/10.1515/9783110421682-004).
2. Geoffrey Haig & Ergin Öpengin (2015), “Gender in Kurdish: Structural and socio-cultural dimensions,” *Word* 61(3), 231–259, especially §2.1.1 on case and gender and §2.1.2 on ezafe. [Published offprint](https://www.uni-bamberg.de/fileadmin/aspra/06_Team/Publications_and_CV/haig_opengin_2015_gender_kurdish_offprint.pdf).
3. W. M. Thackston (2006), *Kurmanji Kurdish: A Reference Grammar with Selected Readings*, “The Grammar of Kurmanji Kurdish Substantives,” §§1–6 (pp. 7–16), especially the noun, demonstratives, indefinite state and construct case. [Available text/scan](https://www.academia.edu/5485402/Kurmanji_Kurdish_A_Referance_Grammar_with_Selected_Readings_by_W_M_Thackston).
4. University of Arizona, Iranian Languages, [Kurmanji Kurdish](https://iranian-languages.arizona.edu/node/7), supplementary explanation of noun gender, direct/oblique case and `-ek` forms.

## 10. Change and release boundary

- This is an evidence audit of the existing seed row only.
- No lesson HTML, seed SQL, source content, application code, tests, migration, database, PR, or deployment was changed.
- No Supabase connection or live data inspection was performed.
- No changes were made to `main` or PR #3.
- The report is not approval to edit or publish Lesson 23.
