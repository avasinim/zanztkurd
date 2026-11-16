# Kurmanji Course 1 — lessons 19–24 source review (2026-11-16)

## Scope and method

This review covers the current lesson payloads `kurmanji-course-1-lesson-19.html` through `kurmanji-course-1-lesson-24.html` in `docs/kurmanji-content-seed-part-03.sql`. It rechecks the claims against the existing lesson-by-lesson notes in `docs/KURMANJI-RELEASE-AUDIT.md` and accessible academic/teaching references, especially Haig (2018), Haig & Öpengin (2018), Thackston, and recent Kurmanji grammar resources.

The findings distinguish supported grammar patterns from examples that still need a Kurmanji editor or Sorani-language review. This is a source review, not a linguistic certification of every sentence. No lesson text, Latin spelling, seed SQL, migration, database, `main`, PR #3, or deployment was changed.

## Summary

| Lesson | Topic | Result | Highest-priority review item |
|---|---|---|---|
| 19 | Questions and interrogative words | Core question words and wh-in-situ pattern supported | Add/defer `kî/kê` case contrast; distinguish `çend` from `çiqas`; check `têyî` |
| 20 | Word order | Neutral SOV tendency supported | Qualify as default; note SOVG and information structure; verify fronting example |
| 21 | Adjectives and description | Postnominal adjective + ezafe strongly supported | Explain gender/number agreement on ezafe; verify `maleke biçûk` and noun gender |
| 22 | Comparative adjectives | `-tir`, `ji`, `herî`, `-tirîn` supported | Clarify variants and word order; gloss `mezintir` as older/bigger by context |
| 23 | Nouns and determiners | `-ek`, direct/oblique paradigms, `ev/ew` supported | Qualify absence of definite article by variety; don't reduce oblique to object case |
| 24 | Possession | Oblique possessor + ezafe supported | Separate linking ezafe from free ezafe; refine `yê/ya/yên` translations |

---

## Lesson 19 — questions and interrogative words

### Supported
- The core forms `kî` (who), `çi` (what), `li ku` (where), `kengî/kengê` (when), `çima` (why), `çawa` (how), `çiqas` (how much/to what extent), and `kîjan` (which) are attested in Kurmanji descriptions and teaching materials.
- Kurmanji commonly places a wh-expression in the position where the corresponding answer phrase would occur (wh-in-situ), rather than requiring English-style movement to the beginning. This supports examples such as `Tu çi dixwazî?` and `Tu li ku dijî?`.
- Yes/no questions can be marked by intonation and question punctuation; a question particle such as `ma` is also used in some constructions/registers. The lesson's examples are suitable as introductory illustrations, but should not imply punctuation alone represents spoken intonation.

References:
- Haig & Öpengin (2018), “Northern Kurdish (Kurmanjî)”: https://multicast.aspra.uni-bamberg.de/data/pubs/HaigOepengin2018_Kurmanji_Kurdish_.pdf
- Phrase-structure study of two Kurmanji dialects, section on wh-in-situ: https://digitalarchive.library.bogazici.edu.tr/bitstreams/c22fcd85-97d8-4c48-98ab-8cc623449fff/download
- University of Arizona, Kurmanji overview: https://iranian-languages.arizona.edu/node/7
- Kurdîzan, asking questions: https://kurdizan.net/ders/pirs

### Review flags
1. The table lists `kî` as “who” but omits `kê`, the oblique form relevant in object/oblique positions. Do not teach `kî` as invariant across all syntactic roles.
2. Keep `çiqas` (“how much/how far/to what extent”) distinct from `çend` (“how many/how much countable quantity”). They overlap in translation but are not universally interchangeable.
3. Forms such as `li ku/kû/kuderê`, `kengî/kengê`, and regional variants of “how” should be treated as variation, not as mistakes. State the course's chosen standard only after editorial approval.
4. `Tu kengî têyî?` needs sentence-level review for the exact form and intended future/coming sense. The other sample sentences are plausible, but the Sorani glosses are not validated by Kurmanji grammar references.
5. The Sorani translations and orthography (`چیە` and similar editorial choices) need a native Sorani copy-edit.

**Assessment:** interrogative vocabulary and wh-in-situ are supported; the lesson is an appropriate introduction, with a useful missing case contrast and some example/gloss checks.

## Lesson 20 — word order in the clause

### Supported
- Neutral/basic Kurmanji clauses commonly follow subject–object–verb order. Haig's description gives a more detailed default pattern that can include a goal/recipient argument (often described as SOVG); the lesson correctly avoids presenting SOV as an inflexible rule.
- Objects and other constituents may be fronted for information-structure/focus reasons. This is not free permutation: prosody, discourse context, and grammatical role matter.
- Kurmanji past transitive clauses have split alignment/ergative properties. The lesson's warning that past transitive clauses have more complex case/agreement behaviour is important.

References:
- Haig (2018), “Northern Kurdish (Kurmanjî),” syntax and alignment: https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf
- University of Manchester, general structural characteristics: https://kurdish.humanities.manchester.ac.uk/about-kurdish/general-structural-characteristics/
- Phrase-structure study, SOV and wh-in-situ: https://digitalarchive.library.bogazici.edu.tr/bitstreams/c22fcd85-97d8-4c48-98ab-8cc623449fff/download

### Review flags
1. Label SOV as the neutral/default tendency, not the whole syntax. Mention recipient/goal arguments where relevant and retain the clause-type caveat.
2. `Tu pirtûkê dixwînî` illustrates present-tense transitive object marking; the definite reading in the Sorani gloss should be checked against the intended context.
3. `Em kurdî hîn dibin` uses the compound predicate `hîn bûn`; “object/content” is a simplified teaching label, not a complete syntactic analysis.
4. `Vê pirtûkê, ez dixwînim` is a fronting/focus illustration, not a context-free equivalent of the neutral order. Keep the lesson's own caveat and verify punctuation/prosody with a native speaker.
5. The Sorani glosses for `radizê` and other examples require editorial review.

**Assessment:** the main teaching point is sound and appropriately qualified. Preserve the note on past-transitive alignment; do not generalize the focus example into unrestricted word order.

## Lesson 21 — adjectives and description

### Supported
- In Standard Kurmanji noun phrases, descriptive adjectives normally follow the head noun and are linked by ezafe. The ezafe agrees with the head noun's gender and number; the adjective itself generally does not inflect for those features.
- Haig's examples include `bajar-ek-î mezin` “a big town” and plural `kum-ên reş` “black hats,” directly supporting the lesson's core pattern.
- Possessors precede adjectives when both occur in the noun phrase, and each postnominal modifier can be linked with ezafe.

References:
- Haig (2018), §2.3 and §2.3.1, “The structure of the NP” and ezafe: https://www.uni-bamberg.de/fileadmin/aspra/06_Team/Publications_and_CV/haig_2018_ch.2.3_northern_kurdish.pdf
- Gündoğdu (2023), “Ezafe in Northern Kurdish”: https://doi.org/10.33137/twpl.v45i1.41677
- Kurmanji teaching grammar: https://internationalistcommune.com/wp-content/uploads/2024/01/kurmanji-basic.pdf

### Review flags
1. `bajarê mezin` can be a definite/contextually identified “big town/city”; `bajar-ek-î mezin` is the clearer indefinite “a big town.” Keep the lesson's distinction and explain the segmentation `bajar-ek-î`.
2. `maleke biçûk` is a plausible feminine indefinite noun phrase, but feminine indefinite ezafe has dialectal variation. Verify it against the course's chosen standard before using it as the paradigmatic example.
3. `pirtûka nû` is plausible, but learners need to know that the ezafe form depends on the grammatical gender/number of the head noun.
4. The phrase “ezafe depends on gender, number and case” should be phrased precisely: the ezafe form agrees with head-noun gender/number, while case marking is a related but distinct part of the noun phrase. Do not imply adjectives themselves regularly inflect for gender.
5. The lesson intentionally does not provide a fully sourced predicative adjective sentence. Keep attributive and predicative constructions distinct rather than suggesting they share the same ezafe pattern.
6. Sorani glosses for `kum`, `biçûk`, and the adjective list need editor review.

**Assessment:** the core postnominal adjective + ezafe pattern is strongly corroborated. Verify the feminine indefinite example and refine the explanation so ezafe agreement is not confused with case.

## Lesson 22 — comparative and superlative adjectives

### Supported
- The productive comparative pattern uses adjective + `-tir`; `ji` introduces the comparison standard, whose pronoun appears in the oblique form.
- Sources attest `mezin → mezintir` as the regular comparative and `meztir` as an alternative; `baş → baştir` and `çêtir` are both recorded, while `pir → bêtir` is a common irregular comparative.
- Two superlative strategies are attested: `herî + adjective` and suffix `-tirîn`. The latter has distinct syntax and can precede the noun it modifies.

References:
- Thackston, *Kurmanji Kurdish: A Reference Grammar with Selected Readings*, §10: https://sites.fas.harvard.edu/~iranian/Kurmanji/kurmanji_complete.pdf
- Kurmanji Kurdish, Lesson 6, “Comparatives” and “Superlatives”: https://www.kurdipedia.org/files/books/2023/474430.PDF
- Êzdîxan grammar tables: https://ezdixan.de/en/wiki/grammatik
- Kurdîzan, comparing qualities: https://kurdizan.net/ders/berawirdkirina-rengderan

### Review flags
1. The lesson correctly records `mezintir/meztir`; identify them as alternatives rather than suggesting they are equally preferred in every variety.
2. The examples should distinguish regular comparative `-tir` from lexical/irregular alternatives such as `baş → çêtir` and `pir → bêtir`.
3. The lesson's `herî mezin / mezintirîn` explanation should preserve their different word orders: `herî` precedes the adjective within the relevant phrase, while `-tirîn` forms commonly precede the noun.
4. `Meyrem ji birayê xwe mezintir e` is attested as “Meyrem is older than her brother.” The current Sorani gloss “لە براکەی گەورەترە” can be read as physical size; specify age if that is the intended sense.
5. The source Karacan & Khalid (2016) compares Kurdish dialects generally; do not use it alone to establish a Standard Kurmanji rule. Prefer Kurmanji-specific reference grammars for the core forms.
6. The forms `biçûk/ piçûk` and the Sorani glosses need house-style/native editorial review.

**Assessment:** comparative and superlative morphology is supported. The main work is explanatory precision, variant labeling, and context-accurate translations.

## Lesson 23 — nouns and determiners

### Supported
- Standard Kurmanji commonly marks singular indefiniteness with `-ek`; bare nouns may be definite or generic according to context. Standard Kurmanji does not have a single general definite suffix equivalent to Sorani `-ەکە/-ەکان`.
- The standard singular direct/oblique paradigm shown in the lesson is supported by Haig & Öpengin (2018), Table 7: masculine `gund / gund-î / gund-ek / gund-ek-î`; feminine `jin / jin-ê / jin-ek / jin-ek-ê`.
- The oblique case has several functions: present-tense transitive objects, complements of adpositions, goals/recipients in relevant constructions, possessors in ezafe phrases, and subjects of past-tense transitive clauses.
- Proximal `ev` and distal `ew` are basic direct forms. In the standard paradigm, oblique forms include `vî/vê/van` and `wî/wê/wan`.

References:
- Haig (2018), Table 7 and §2.2: https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf
- Haig & Öpengin (2018), “Northern Kurdish (Kurmanjî)”: https://www.uni-bamberg.de/fileadmin/aspra/06_Team/Publications_and_CV/HaigOepengin2018_Kurmanji_Kurdish_.pdf
- Kurdi School, grammar overview: https://kurdischool.com/grammar.html

### Review flags
1. Qualify the “no definite marker” claim: it describes the standard pattern, not every Kurmanji variety. Haig & Öpengin note a restricted definiteness suffix in Şemzînan. Avoid claiming no variety or construction has any definiteness-related marking.
2. Do not teach direct/oblique as simply nominative/accusative or as subject/object. The oblique case has multiple syntactic functions, including past-transitive subjects.
3. The lesson's direct-case examples `ev pirtûk`, `ew pirtûk`, and `ev jin` are suitable beginner forms, but learners should know demonstratives inflect in oblique contexts; show or defer the corresponding forms explicitly.
4. The table should avoid implying `-ek` is the only morphology relevant to a noun phrase. Gender, number, case, ezafe, and dialect all interact.
5. Sorani comparison claims and translations need Kurdish editorial review; keep the comparison limited to the standard varieties named in the cited source.

**Assessment:** the core indefinite suffix and singular case paradigms are source-supported. The essential caveat is variety scope and the multi-function nature of oblique case.

## Lesson 24 — possession and possessive expressions

### Supported
- Possession is commonly expressed with a postnominal possessor linked to the possessed noun by ezafe. The ezafe agrees with the possessed/head noun, not with the possessor.
- Possessors in this construction use oblique pronoun forms: `min, te, wî, wê, me, we, wan`. These are not the independent direct pronouns `ez, tu, ew, em, hûn`.
- Kurmanji also has free/demonstrative ezafe forms such as `yê/ya/yên`, which can stand for an omitted noun or form an identifying phrase. They are not simply interchangeable with the bound linking ezafe.

References:
- Haig (2018), §2.3 and §2.3.1: https://www.uni-bamberg.de/fileadmin/aspra/06_Team/Publications_and_CV/haig_2018_ch.2.3_northern_kurdish.pdf
- University of Arizona, Kurmanji overview (pronouns and noun phrase): https://iranian-languages.arizona.edu/node/7
- Gündoğdu (2023), “Ezafe in Northern Kurdish”: https://doi.org/10.33137/twpl.v45i1.41677

### Review flags
1. `pirtûka min/te/wî/wê` is a useful beginner pattern, but the ezafe ending belongs to the head noun. State the gender of the example noun and explain that full clauses may show additional case marking.
2. The pronoun table is a mapping from direct pronouns to oblique forms, not a possessive-suffix paradigm. Label `min, te, wî, wê, me, we, wan` as oblique independent pronouns functioning as possessors in these phrases.
3. `birayê min ê mezin` needs clear segmentation: the possessor and the adjective each participate in the noun phrase's ezafe structure. Its Sorani gloss should specify whether `mezin` means “big” or “older” in context.
4. Translate free ezafe examples with their omitted antecedent in mind: `yê spî` = “the white one” (masculine), `ya te` = “the one of yours” (feminine, depending on context), `yên mezin` = “the big ones.” Do not automatically translate them as demonstratives such as “this/that.”
5. Ezafe morphology varies regionally; keep the course's claims tied to its stated reference variety. Sorani translations require their own native editorial pass.

**Assessment:** the central possession strategy and oblique possessor pronouns are supported. The most important editorial improvement is to separate linking ezafe from free ezafe and clarify agreement/translation.

---

## Overall disposition

- Lessons 19–24 have a strong grammatical basis at the level of their central teaching points, but this does **not** certify every sample sentence or Sorani translation.
- Priority review points: lesson 19 `kî/kê` and `çend/çiqas`; lesson 20 SOVG/focus and the fronting example; lesson 21 feminine indefinite ezafe; lesson 22 age-vs-size gloss; lesson 23 dialect scope for definiteness and demonstrative oblique forms; lesson 24 free ezafe and `birayê min ê mezin` segmentation.
- No automatic corrections were made. No Kurmanji Latin form or Sorani gloss was silently normalized.
- This report is documentation-only. No seed, migration, lesson content, production database, `main`, PR #3, or deployment was modified.
