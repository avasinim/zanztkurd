# Course 1, Lesson 24 — Possession, Oblique Possessors, Ezafe and Reflexives: Evidence Audit

**Date:** 2026-11-17  
**Repository:** `avasinim/zanztkurd`  
**Working branch:** `fix/kurmanji-ci-current-migration`  
**Baseline commit:** `acc03327c6840d7cf8fa4790de0531788805cb7e`  
**Seed file:** `docs/kurmanji-content-seed-part-03.sql`  
**Seed blob SHA:** `b6f89841ac49adb256a7874179a258436e095909`  
**Seed row:** `kurmanji-course-1-lesson-24.html`  
**Scope:** Evidence audit of the existing lesson payload. Proposal only; no lesson or seed content is edited.

## 1. Executive findings

The lesson has a strong and largely accurate foundation. Its examples `pirtûka min`, `pirtûka te`, `pirtûka wî/wê`, `birayê min ê mezin`, `yê spî`, `ya te`, and `yên mezin` align with the Standard Kurmanjî noun-phrase patterns described by Haig (2018). The key editorial task is to make the grammatical roles explicit rather than presenting the forms as one undifferentiated “possessive pronoun” system.

The highest-priority findings are:

1. **Possessors in an ezafe construction are oblique.** `min, te, wî, wê, me, we, wan` are the oblique forms of the personal pronouns in these constructions, not a separate set of possessive suffixes or possessive adjectives.
2. **The ezafe agrees with the possessed/head noun, not with the possessor.** In `pirtûka wê`, the `-a` linker is feminine because `pirtûk` is feminine; `wê` identifies the feminine third-person possessor. These are two different agreement/reference relations.
3. **The reflexive `xwe` is missing and should be added.** When the possessor is coreferential with the subject of the same clause, Standard Kurmanjî requires the reflexive form rather than the ordinary personal oblique pronoun: `Ez li mala xwe me`, not `*Ez li mala min me` for “I am at my own house.”
4. **The layered ezafe in `birayê min ê mezin` needs explanation.** The first ezafe links the head noun to the possessor; the second, free/demonstrative ezafe links the same head to the following adjective. This is not redundant decoration.
5. **Free ezafe has two related but distinct uses.** It can introduce an additional modifier after an already complete ezafe phrase (`bra-yê min ê mezin`) or stand anaphorically for “the one(s)” (`yê spî`, `yên mezin`). The lesson should distinguish these functions.
6. **Keep the Standard Kurmanjî baseline visible.** The forms are grounded in Haig's Standard Kurmanjî description, loosely based on Cizre/Botan; dialectal differences should not be erased or silently folded into the core paradigm.

## 2. What the current seed gets right

### 2.1 Head noun + ezafe + oblique possessor

The seed's examples are structurally sound:

- `pirtûka min` — my book
- `pirtûka te` — your (singular) book
- `pirtûka wî` — his book
- `pirtûka wê` — her book
- `pirtûka me / we / wan` — our / your (plural) / their book

Haig gives the corresponding Standard Kurmanjî structure `mal-a me` (“our house”) and explicitly states that possessors in ezafe constructions take the oblique case. The head noun is followed by an ezafe linker, then by the possessor. The University of Arizona Kurmanji grammar likewise lists oblique pronouns as possessors in present-tense possessive constructions.

### 2.2 Personal pronoun correspondences

The seed's mapping is appropriate as a learner-facing comparison:

| Direct personal pronoun | Oblique form used as possessor |
|---|---|
| `ez` | `min` |
| `tu` | `te` |
| `ew` | `wî` (masculine referent) / `wê` (feminine referent) |
| `em` | `me` |
| `hûn` | `we` |
| `ew` | `wan` (plural) |

One clarification is needed: `wî/wê` are not chosen according to the gender of the possessed object. They refer to the gender of the third-person possessor. The ezafe ending on the possessed noun independently agrees with that noun's grammatical gender/number.

### 2.3 Free ezafe examples

The seed correctly identifies the free/demonstrative ezafe forms `yê spî`, `ya te`, and `yên mezin`. Haig (2018: 120–121) explicitly gives these examples and translates them as “the white one (masculine singular),” “your one (feminine singular),” and “the big ones (plural).”

The example `birayê min ê mezin` is also directly attested in Haig's discussion of a free ezafe adding a further dependent to an existing possessive noun phrase, translated “my older brother.” It is a particularly valuable example because it shows two ezafe elements with different positions/functions.

## 3. Required precision: two layers of agreement

The current lesson says that the pronoun and construction vary with gender, number and case. This is too compressed and can mislead learners into thinking the possessor pronoun controls the ezafe ending.

The following distinctions should be made explicit:

- **Ezafe on the head noun:** agrees with the gender and number of the possessed/head noun.
- **Oblique possessor:** the pronoun is selected according to the person/number and, in third-person singular, gender of the possessor.
- **Free ezafe after the possessor:** agrees again with the head noun it resumes/modifies, not with the possessor.

For example:

| Form | Analysis | Function |
|---|---|---|
| `pirtûk-a min` | book-EZ.F + 1SG.OBL | “my book”; `-a` agrees with feminine `pirtûk` |
| `pirtûk-a wî` | book-EZ.F + 3SG.OBL.M | “his book”; `wî` identifies masculine possessor |
| `bira-yê min` | brother-EZ.M + 1SG.OBL | “my brother”; linking glide `y` follows vowel-final `bira` |
| `bira-yê min ê mezin` | brother-EZ.M + possessor + free EZ.M + adjective | “my older brother”; second `ê` resumes masculine singular head |

The report uses hyphens in the analysis to display morpheme boundaries. They are analytical segmentation, not a claim that ordinary Hawar orthography requires inserting hyphens into running text.

## 4. The missing reflexive possessor: `xwe`

This is the most important omission from the current lesson.

Haig (2018: 119) states that when the possessor is coreferential with the subject of the same clause, the reflexive pronoun `xwe` is obligatorily used in place of a personal pronoun. His attested contrast is:

- `Ez li mal-a xwe me` — “I am at my house.”
- `*Ez li mal-a min me` — rejected for the intended same-clause coreferential reading.

This is not merely an optional stylistic preference. It is a core Kurmanjî distinction that prevents learners from overgeneralizing `min` as the equivalent of English “my” in every context.

**Editorial recommendation:** add a compact subsection headed “خاوەنداریی گەڕاوە: xwe” and use Haig's attested example. Explain the same-clause subject/coreference condition carefully. Do not generalize it to every discourse context in which the owner happens to be the speaker or subject of another clause.

The distinction should also be coordinated with Lesson 11's pronoun treatment so that `xwe` is not mislabelled as an ordinary personal oblique form.

## 5. Free ezafe: distinguish the two constructions

Haig describes two uses that the current seed places together:

### 5.1 A second dependent in an extended noun phrase

`bra-yê min ê mezin` — “my older brother”

The first ezafe links `bira` to the possessor `min`. The second, free ezafe `ê`, introduces the adjective `mezin` and agrees with the masculine singular head noun. The same pattern appears in Haig's examples `mehîn-a boz a qenc` and `gund-ên Qersê ên kevn`.

### 5.2 Anaphoric “one(s)” construction

- `yê spî` — the white one (masculine singular)
- `ya te` — your one (feminine singular)
- `yên mezin` — the big ones (plural)

Here the free ezafe is not simply another possessive marker. It can stand for an understood noun, with the sense “the one(s) ...”. The exact Sorani translations should be reviewed by a native editor to avoid ambiguity between “the one belonging to you” and “the one that is yours” in contexts where the intended reading matters.

**Editorial recommendation:** split these into two clearly named functions, while retaining a shared explanation that the free ezafe agrees with the relevant antecedent/head noun.

## 6. Phrase order and the noun-phrase frame

Haig gives the general Standard Kurmanjî noun-phrase frame:

`Demonstrative – Numeral – Noun-Ezafe – Possessor – Ezafe – Adjective`

His example is `ev sê kumên min yên reş` (“these three black hats of mine”). The lesson's `birayê min ê mezin` illustrates the relevant final sequence: head noun + ezafe + possessor + free ezafe + adjective.

The seed should avoid implying that all modifiers are freely ordered or that the possessive pronoun precedes the noun as in English. In the core pattern, the possessed noun comes first, and the possessor follows it through ezafe.

## 7. Specific editorial changes recommended (not applied)

1. Preserve the current examples `pirtûka min`, `pirtûka te`, `pirtûka wî`, `pirtûka wê`, `pirtûka me`, `pirtûka we`, and `pirtûka wan`.
2. State explicitly that these possessors are oblique pronoun forms, not possessive enclitics/suffixes.
3. Explain that the ezafe ending agrees with the possessed/head noun, whereas `wî/wê` distinguish the gender of the third-person possessor.
4. Add `xwe` and the same-clause subject/coreference rule, with Haig's attested contrast `Ez li mala xwe me` vs. `*Ez li mala min me`.
5. Explain the linking glide in `bira-yê` after the vowel-final noun `bira`.
6. Explain the two layers in `birayê min ê mezin`: possessive ezafe first, free ezafe before the additional adjective.
7. Separate the “extended noun phrase” use of free ezafe from its anaphoric “the one(s)” use.
8. Keep `yê spî`, `ya te`, and `yên mezin`, but request native Sorani translation review for `ya te`.
9. State that the paradigms represent a Standard Kurmanjî baseline, and label dialectal variants only when there is a source and a clear editorial reason.
10. Coordinate with Lessons 11, 21 and 23 so that oblique pronouns, reflexives, ezafe agreement, and the head noun's gender are taught consistently.

## 8. Native-speaker and editorial review still required

The grammatical structures above are supported by published descriptions, but the lesson still needs human editorial review for:

- natural Sorani explanations of “possessor”, “possessed/head noun”, “oblique pronoun”, “reflexive”, and “free ezafe”;
- whether the translations of `ya te` and `yên mezin` express the intended reading without implying a different construction;
- consistent use of the chosen Kurmanjî reference variety and Hawar spelling across all examples;
- consistency with the course's earlier pronoun and ezafe lessons.

No new sentence has been silently promoted to approved lesson content. Haig's `Ez li mal-a xwe me` is a published attested example; any adapted spelling or punctuation in the lesson should be checked before publication.

## 9. Sources

1. Geoffrey Haig (2018), “Northern Kurdish (Kurmanjî),” in Geoffrey Haig & Geoffrey Khan (eds.), *The Languages and Linguistics of Western Asia: An Areal Perspective*, pp. 106–158, especially §2.3.1 and the noun-phrase structure discussion, pp. 118–121. [University of Bamberg PDF](https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf). DOI: [10.1515/9783110421682-004](https://doi.org/10.1515/9783110421682-004).
2. Geoffrey Haig & Ergin Öpengin (2018), “Kurmanji Kurdish in Turkey: Structure, varieties and status,” especially §§3.2.5 and 3.3 on pronouns, noun-phrase order, possessors and ezafe. [University of Bamberg PDF](https://www.uni-bamberg.de/fileadmin/aspra/06_Team/Publications_and_CV/HaigOepengin2018_Kurmanji_Kurdish_.pdf).
3. W. M. Thackston (2006), *Kurmanji Kurdish: A Reference Grammar with Selected Readings*, sections on pronouns, construct/ezafe and noun phrases. [Harvard PDF](https://sites.fas.harvard.edu/~iranian/Kurmanji/kurmanji_complete.pdf).
4. University of Arizona, Iranian Languages, [Kurmanji Kurdish](https://iranian-languages.arizona.edu/node/7), overview of direct/oblique pronouns and possessive constructions.

## 10. Change and release boundary

- This report audits the existing Lesson 24 seed row only.
- No lesson HTML, seed SQL, source content, application code, tests, migration, database, PR, or deployment was changed.
- No Supabase connection or live data inspection was performed.
- No changes were made to `main` or PR #3.
- This is not approval to edit or publish Lesson 24.
