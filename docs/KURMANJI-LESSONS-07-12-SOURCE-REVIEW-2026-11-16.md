# Kurmanji lessons 07–12 source review — 2026-11-16

## Scope and preservation

This review consolidates and rechecks the existing lesson-level audit notes for Course 1, lessons 07–12 against the current split-seed rows and currently accessible reference pages. It records source support, scope limits, and outstanding editorial checks.

No lesson body, seed row, migration, static page, application code, production database, `main` branch, PR, or deployment was changed. The review does not authorize synchronizing the historical migration with the split seed.

## Executive result

| Lesson | Topic | Assessment |
|---|---|---|
| 07 | Common Kurmanji words / everyday phrases | Main forms corroborated; minor editorial/style checks |
| 08 | Spelling vs pronunciation | Main concept supported; keep aspiration, pharyngealization, and dialect scope distinct |
| 09 | Personal and place names | Advice supported; exact inflected place-name examples need specialist confirmation |
| 10 | Beginner expressions | Strong phrase-level corroboration; greetings are correctly distinguished by time and addressee |
| 11 | Personal pronouns | Core direct/oblique paradigm corroborated; do not reduce case to subject/object or tense |
| 12 | Demonstratives | ev/ew contrast and full direct/oblique paradigm corroborated; current lesson is intentionally introductory |

The current audit already contained detailed notes for these six lessons dated 2026-10-21. This pass checked the corresponding current seed rows and re-opened the most important online references. It does not claim to have independently checked every Sorani translation or every named example.

## Lesson-by-lesson findings

### Lesson 07 — common Kurmanji words and everyday phrases

**Seed title:** `ڕێنووسی وشە باوەکان`.

The row is a practical spelling exercise built around `Silav`, `Rojbaş`, `Şevbaş`, `Spas`, `Erê`, `Na`, `Bi xêr hatî`, `Tu çawa yî?`, `Ez baş im`, and `Ji kerema xwe`. The examples and their general meanings are supported by Yari's Kurmanji beginner phrase guide. Yari also explicitly records both `spas` and `sipas`, and warns about regional variation.

**Assessment: SUPPORTED, WITH EDITORIAL LIMITS.** The lesson correctly avoids treating regional variants as errors. Keep a consistent house style for `Rojbaş` versus `Roj baş`; the sources vary in spacing. The Sorani renderings should still receive a native Kurdish editorial pass. This lesson's main goal is spelling practice, not a complete account of greeting pragmatics.

### Lesson 08 — spelling versus pronunciation

**Seed title:** `جیاوازی نێوان نوسین و دەربڕین`.

The lesson distinguishes written letters, phonemes, and actual pronunciation, and correctly cautions that standard Latin orthography does not encode every dialectal phonetic distinction. The University of Arizona Kurmanji overview directly supports the relevant phonetic facts:
- Kurmanji has a trill /r/ and a tap/flap /ɾ/; spelling does not consistently mark this contrast.
- Some dialects distinguish aspirated and unaspirated voiceless stops.
- Unaspirated stops are often accompanied by slight pharyngealization, but this feature is not present in all dialects and is not represented in standard Latin spelling.

**Assessment: CORE CONCEPT SUPPORTED; TERMINOLOGY NEEDS CARE.** The seed describes /pˤ/ as an unaspirated stop often accompanied by pharyngealization. This should be phrased so learners do not mistake aspiration and pharyngealization for the same phonetic property. Keep the dialect qualification explicit and avoid presenting /pˤ/ as a universal Kurmanji contrast. The lesson's own caveat that these features are not uniformly represented in standard spelling is important and should remain.

### Lesson 09 — personal and place names

**Seed title:** `ناوە کەسییەکان و شوێنەکان`.

The advice to preserve the chosen spelling of personal names and to present place-name alternatives according to context is sound. The examples include `Amed/Diyarbakır`, `Hewlêr/Erbil`, `Wan/Van`, and `Qamişlo`. Kurdi School's grammar resource supports the use of `li` and `ji` in place expressions, and Haig & Öpengin documents case marking and variation in proper-name forms.

The exact examples `Ez li Amedê dijîm` and `Ez ji Qamişloyê me` were not directly confirmed in the reviewed references. The available grammar examples support the general pattern, but not a mechanical rule for every place name. Personal-name examples such as `Azad`, `Rojîn`, `Şilan`, `Berfîn`, and `Mem û Zîn` are illustrative; their official or preferred spellings depend on the person or the cited literary edition.

**Assessment: PRINCIPLE SUPPORTED; SOME EXAMPLES PARTIAL.** Retain the context-sensitive approach. Do not describe alternate toponyms as universally interchangeable, and do not impose a spelling on an actual person's name. The exact inflected place-name clauses and Sorani translations remain for specialist editorial review.

### Lesson 10 — beginner expressions

**Seed title:** `دەربڕینە سەرەتاییەکان`.

The current seed includes `Silav`, `Rojbaş`, `Êvarbaş`, `Şevbaş`, `Bi xatirê te`, `Bi xêr hatî`, `Tu çawa yî?`, `Ez baş im`, `Navê min Azad e`, `Tu kî yî?`, `Ez ji ... me`, `Spas`, `Ji kerema xwe`, `Erê`, `Na`, and `Biborîne`.

Yari's current beginner phrase guide explicitly distinguishes:
- `Rojbaş`: good day / daytime greeting;
- `Êvarbaş`: good evening;
- `Şevbaş`: good night, used when going to bed or leaving late;
- `Bi xêr hatî`: welcome to one arriving person;
- `Bi xatirê te`: goodbye to one person;
- `Spas` / `sipas`: thank you;
- `Ji kerema xwe`: please;
- `Tu çawa yî?` and `Ez baş im, spas`.

**Assessment: STRONGLY CORROBORATED AT BEGINNER PHRASE LEVEL.** The added `Êvarbaş` row is supported by the current source and correctly avoids treating `Şevbaş` as a generic evening greeting. Keep singular/plural scope explicit for `Bi xêr hatî` and `Bi xatirê te`. The source does not settle every social-register nuance. `Biborîne` is plausible, but its preferred spelling and pragmatic range should be checked against a specialist reference before being treated as the only standard form. Sorani translations such as the equivalents for “good morning,” “good night,” and “goodbye” need a Kurdish editor's review.

### Lesson 11 — personal pronouns

**Seed title:** `جێناوە کەسییەکان`.

The direct and oblique forms in the seed match the Standard Kurmanji paradigm in Haig & Öpengin (2018): `ez/min`, `tu/te`, `ew/wî,wê`, `em/me`, `hûn/we`, `ew/wan`. The invariant reflexive `xwe` is also supported. Haig & Öpengin explain that `xwe` is coreferential with the subject in the relevant clause, including in ergative past-transitive constructions.

**Assessment: CORE PARADIGM CORROBORATED; PEDAGOGICAL SIMPLIFICATIONS NEED SCOPE.**
- Do not define direct case simply as “subject” or oblique case simply as “object.” Kurmanji has an ergative construction in past-tense transitive clauses: the transitive subject is oblique, the direct object is direct, and the verb agrees with the direct object.
- `ew` can be singular or plural; context and agreement resolve number.
- `wî/wê` must be taught as oblique forms within their grammatical constructions, not as a universal possessive “his/her” pair.
- The copular forms `im`, `î`, `ye`, and `in` are useful examples, but should be described as person/number agreement/copular forms rather than as endings selected simply by the final letter of a noun or adjective.
- The `xwe` example is plausible; retain the note that its antecedent is syntactically constrained.

### Lesson 12 — demonstratives

**Seed title:** `جێناوە ئاماژەییەکان`.

The direct demonstrative contrast `ev` “this” and `ew` “that” is corroborated by Haig & Öpengin (2018) and the University of Arizona overview. The seed correctly notes that `ew` can also function as a third-person personal pronoun, so the intended reading depends on context.

Haig & Öpengin's Standard Kurmanji table also records the oblique forms:
- Proximate: `vî` (masculine singular), `vê` (feminine singular), `van` (plural).
- Distal: `wî` (masculine singular), `wê` (feminine singular), `wan` (plural).

The source also describes dialectal noun-phrase clitics/markers in some varieties.

**Assessment: CORE CONTRAST CORROBORATED; INTRODUCTORY SCOPE MUST BE CLEAR.** The lesson's direct-form-only table is acceptable as a first lesson if it is explicitly presented as the direct-case beginner contrast and the oblique paradigm is taught later. `ev pirtûk` and `Ev pirtûk baş e` are useful examples; they do not, by themselves, teach the full ezafe construction for attributive adjectives. Do not imply that all Kurmanji dialects use identical demonstrative noun-phrase marking.

## Seed/migration parity and provenance notes

- The repository's existing title-difference inventory records spelling-form differences for lessons 07 and 08 (`ڕێنوسی/ڕێنووسی` and `نوسین/نووسین`). Treat these as editorial/title discrepancies, not a basis for changing lesson bodies automatically.
- The earlier exact row comparison identifies Course 1 lesson 10 as one of the rows whose content differs between the historical migration and the later split seed. The split-seed lesson includes `Êvarbaş`; the current Yari source directly corroborates that phrase and its evening use. This supports the later phrase addition, but does not prove which version is stored in production.
- Lessons 09, 11, and 12 are not listed among the 12 known body mismatches from the earlier comparison. Their source review does not authorize any migration update.
- The migration remains a historical snapshot. No production database query or write was performed as part of this review.

## Outstanding release/editorial actions

1. Have a Kurdish editor review Sorani glosses and naturalness for lessons 07, 09, and 10.
2. Keep lesson 08's aspiration/pharyngealization distinction technically precise and dialect-qualified.
3. Verify the exact inflected place-name clauses in lesson 09 against a specialist grammar before calling them source-verified.
4. Keep lesson 11's direct/oblique explanation from collapsing into a simple subject/object rule; retain the ergative exception.
5. Label lesson 12's current paradigm as direct forms and plan a later treatment of oblique demonstratives and dialectal noun-phrase marking.
6. Keep title and body parity discrepancies visible; do not auto-normalize or synchronize the seed and migration.

## References rechecked or inherited from the repository audit

- Yari, “Kurdish greetings and everyday phrases for beginners (Kurmanji)”: https://yari.krd/learn/kurdish-greetings/
- University of Arizona, Iranian Languages, “Kurmanji Kurdish”: https://iranian-languages.arizona.edu/node/7
- Haig & Öpengin (2018), “Northern Kurdish (Kurmanjî),” especially pronouns, demonstratives, and ergative alignment: https://www.uni-bamberg.de/fileadmin/aspra/06_Team/Publications_and_CV/HaigOepengin2018_Kurmanji_Kurdish_.pdf
- Haig (2018), “Northern Kurdish (Kurmanjî)”: https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf
- Kurdi School, Kurmanji grammar: https://kurdischool.com/grammar.html
- Existing repository audit: `docs/KURMANJI-RELEASE-AUDIT.md`

The external pages above were consulted for the specific claims stated in this report. The existing audit remains the record for earlier source checks and unresolved items; this report does not certify the full 38-lesson course.
