# P0 claim review: nominal case, plural and ezafe in Kurmanji

Date: 2026-11-17  
Branch: fix/kurmanji-ci-current-migration  
Starting HEAD: 3293e1ba9c92e23f78f6dacdc62d9c04e8cdde42  
Pre-work backup: backup/kurmanji-p0-case-ezafe-review-before-2026-11-17  
Scope: source-check the highest-priority nominal morphology claims in Course 2 lessons 03–06, with direct comparison to the checked-in seed payloads and published grammatical descriptions. Documentation only.

## 1. Executive result

The four lessons have a sound introductory direction, but their evidence and teaching coverage are uneven.

- **Lesson 03 (gender and number):** the current body correctly warns against one universal plural rule, but it does not teach the core Standard Kurmanji paradigm. Haig (2018), §2.2.2, pp. 116–117, explicitly states that in Standard Kurmanji only oblique nouns are overtly marked for plural by -a(n); the direct indefinite plural -in is frequent mainly in Mardin and across the border in Syria, and rare or absent elsewhere. This is a material omission relative to the lesson title.
- **Lesson 04 (indefinite nouns):** the contrast gund-ek-î / jin-ek-ê is directly supported by Haig's Table 7, p. 115. The lesson's central distinction between -ek, oblique endings and the surface-similar masculine ezafe -î is pedagogically valuable. It needs a compact segmentation table and a warning that the paradigm is a Standard Kurmanji description, not a universal statement about all varieties.
- **Lesson 05 (ezafe):** bajar-ek-î mezin is directly attested in Haig (2018), §2.3.1, p. 118. The lesson correctly identifies -ek as indefiniteness, -î as masculine ezafe, and mezin as an uninflected adjective. Gündoğdu (2023) independently supports the broader analysis that Northern Kurdish ezafe links postnominal modifiers and reflects head-noun phi-features, including gender and number. The lesson should still separate linking ezafe from free/demonstrative ezafe and avoid suggesting that case is simply another agreement feature of the ezafe.
- **Lesson 06 (possession):** mal-a me is directly attested by Haig, p. 118, with -a glossed as feminine ezafe and me as first-person plural oblique. The seed's analysis is accurate for this example. The title promises possessive pronouns, however, while the body does not present a complete possessive paradigm; it should either provide a properly sourced table or narrow its title/learning outcome. Haig also directly supports xwe in same-clause coreference and contrasts it with *min.

**Release status:** do not certify these four lessons as fully source-complete yet. The most important required content proposal is to add the Standard Kurmanji plural paradigm to Lesson 03, with dialect caveats. No lesson edit is made by this review.

## 2. Source basis and scope

### Primary grammatical source

Geoffrey Haig (2018), “Northern Kurdish (Kurmanjî),” in Geoffrey Haig & Geoffrey Khan (eds.), *The Languages and Linguistics of Western Asia: An Areal Perspective*, pp. 106–158, De Gruyter Mouton. DOI: https://doi.org/10.1515/9783110421682-004

The accessible chapter PDF is hosted by the University of Bamberg:
https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf

Relevant pinpoint locations:
- §2 describes “Standard Kurmanjî” and explicitly identifies it as a written standard loosely based on Cizre/Botan in southeastern Turkey (pp. 109–110).
- §2.2.1, Table 7: singular gender, case and indefiniteness paradigm (p. 115).
- §2.2.2: plural and case marking, including the restricted distribution of direct indefinite -in (pp. 116–117).
- §2.3 and §2.3.1: noun phrase structure and ezafe, including bajar-ek-î mezin and mal-a me (pp. 118–119).
- §2.7: ergative construction and regional deviations (pp. 130–132).

### Independent ezafe study

Songül Gündoğdu (2023), “Ezafe in Northern Kurdish,” *Toronto Working Papers in Linguistics* 45(1), DOI: https://doi.org/10.33137/twpl.v45i1.41677

Landing page and abstract:
https://twpl.library.utoronto.ca/index.php/twpl/article/view/41677

The journal landing page is accessible, but its full article endpoint returned HTTP 403 in this review. The abstract supports the broad statement that Northern Kurdish ezafe links postnominal modifiers (including possessors) to their head nouns, reflects features such as number and gender and has several functions. Detailed examples below are attributed to Haig, not to the inaccessible full Gündoğdu article.

### Repository material compared

- docs/kurmanji-content-seed-part-04.sql — Course 2 lessons 03–06.
- docs/KURMANJI-COURSE-2-12-LESSON-SOURCE-REVIEW-2026-11-16.md
- docs/KURMANJI-COURSE-2-LESSONS-01-12-CLAIM-LEVEL-EVIDENCE-REGISTER-2026-11-16.md

The checked-in seed file is the reviewed lesson payload, not evidence that a lesson has been editorially approved.

## 3. Lesson-by-lesson claim review

### Course 2 — Lesson 03: noun, grammatical gender and number

**What the current lesson says:** Standard Kurmanji has masculine/feminine grammatical gender in singular nouns; grammatical gender is not identical to natural sex; plural forms depend on noun type and grammatical form; ezafe reflects the head noun's gender and number.

**Direct source evidence:**
- Haig, §2.2.1, Table 7 (p. 115), provides masculine and feminine singular direct/oblique forms, including gund / gund-î and jin / jin-ê, and indefinite gund-ek / gund-ek-î and jin-ek / jin-ek-ê.
- Haig, §2.2.2 (pp. 116–117), says that in Standard Kurmanji only nouns in the oblique case are overtly marked for plural through -a(n), with final -n deleted in some dialects.
- The same section explicitly cautions that direct indefinite plural -in, though regularly cited in pedagogical works, is frequently attested mainly in Mardin-region dialects and across the border in Syria, and is rare or absent elsewhere.
- Haig gives zarok hat-in ‘the children came’ versus zarok hat ‘the child came’ to show that direct-case plural nouns do not themselves inflect for plural in the described Standard pattern; verb agreement marks number.
- Haig notes a western dialect tendency for the oblique plural marker to become a general plural marker. This is a dialect variation, not a reason to erase the Standard paradigm.

**Assessment:** The lesson's cautious wording is not false, but it is too general for a lesson explicitly teaching number. The key Standard Kurmanji plural paradigm is omitted. A learner could finish the lesson without learning the main contrast the grammar source documents.

**Proposed editorial action (not applied):**
1. Add a clearly labelled “Standard Kurmanji baseline” table: direct plural normally unmarked; oblique plural -a(n), with dialectal -a where final -n is deleted.
2. Put direct indefinite -in in a separate variation note, identifying its concentration in Mardin and neighbouring Syrian varieties; do not teach it as a universal ending.
3. Add Haig's zarok hat-in / zarok hat contrast with an explicit explanation that plural agreement is visible on the verb while the direct noun remains unmarked.
4. State that western dialects may generalize -a(n) beyond the oblique case.
5. Preserve the lesson's distinction between grammatical gender and natural sex.
6. Before writing any new examples, choose the course's declared reference variety and have a Kurmanji editor validate the forms and Sorani glosses.

**Do not** simply add -a(n) to every plural noun in the course. Case, definiteness, dialect and ezafe environment must be considered.

### Course 2 — Lesson 04: definite/indefinite nouns and -ek

**What the current lesson says:** -ek marks singular indefiniteness; a bare noun can be definite or generic according to context; oblique indefinite forms include gund-ek-î and jin-ek-ê; the lesson distinguishes these endings from the -î in bajar-ek-î mezin.

**Direct source evidence:**
- Haig, Table 7 (p. 115), explicitly gives gund-ek (masculine indefinite direct), gund-ek-î (masculine indefinite oblique), jin-ek (feminine indefinite direct) and jin-ek-ê (feminine indefinite oblique).
- Haig's text identifies the oblique case functions, including present-transitive object, goal/recipient after motion/transfer predicates, complements of adpositions, possessors in ezafe constructions, and subjects of past-transitive clauses (p. 115).
- Haig also notes that masculine singular oblique marking can be absent in some dialects/contexts; with an indefiniteness suffix -ek, the oblique suffix is consistently present across the described dialects (pp. 115–116).

**Assessment:** The core paradigm is directly supported and the lesson's caution about surface homophony is important. The lesson should not leave learners with the impression that the same written -î has the same grammatical function in every noun phrase.

**Proposed editorial action (not applied):**
- Keep the contrast gund-ek-î (indefinite + oblique) versus bajar-ek-î mezin (indefinite + masculine ezafe).
- Add morpheme segmentation and label each suffix by function.
- Add one complete sentence for each case environment only after checking the exact form against the chosen reference variety.
- Make explicit that direct/oblique is not synonymous with subject/object.

### Course 2 — Lesson 05: ezafe and noun–adjective relation

**What the current lesson says:** adjectives normally follow nouns and connect through ezafe; bajar-ek-î mezin is cited from Haig; the lesson explains -ek, masculine -î ezafe and the uninflected adjective mezin.

**Direct source evidence:**
- Haig, §2.3.1 (p. 118), explicitly gives bajar-ek-î mezin, segmented town-INDF-EZ.M big, glossed ‘a big town’.
- In the same section Haig gives mal-a me, house-EZ.F 1PL.OBL, ‘our house’.
- Haig states that the ezafe attaches to the head noun and varies according to its gender and number.
- Haig explains that possessors in ezafe constructions take oblique case, while adjectives in ezafe constructions remain uninflected (p. 119).
- Gündoğdu (2023) independently describes Northern Kurdish ezafe as a postnominal linker for modifiers including possessors and says it reflects features including gender and number of the head noun.

**Assessment:** The central example and its analysis are sound for the described Standard Kurmanji pattern. The lesson's current introductory explanation is appropriately cautious but should distinguish two separate phenomena:
1. ezafe agreement with the head noun;
2. oblique case on a possessor or other constituent where required.

**Proposed editorial action (not applied):**
- Retain bajar-ek-î mezin and explicitly mark -ek as indefiniteness, -î as masculine singular ezafe, and mezin as the adjective.
- Explain that the ezafe form is selected in relation to the head noun; do not say that the adjective itself receives gender inflection.
- Distinguish linking ezafe from free/demonstrative ezafe in a later lesson or a short “beyond this lesson” note.
- Do not imply all dialects have identical ezafe morphology. Gündoğdu's study and Haig's dialect sections both make dialectal scope relevant.

### Course 2 — Lesson 06: possession and possessive pronouns

**What the current lesson says:** mal-a me is explained as noun + feminine ezafe + oblique pronoun; xwe is introduced as a reflexive used when the possessor is coreferential with the subject of the same clause.

**Direct source evidence:**
- Haig, §2.3.1 (p. 118), gives mal-a me, glossed house-EZ.F 1PL.OBL, ‘our house’.
- Haig, p. 119, states that possessors in ezafe constructions take oblique case.
- Haig, example (9), gives Ez li mal-a xwe me / mal-a *min, ‘I am at my house’, showing that xwe is required where the possessor is coreferential with the same-clause subject.
- Haig, p. 117, lists the Standard Kurmanji personal pronoun direct/oblique pairs: ez/min, tu/te, ew/wî (masculine)/wê (feminine), em/me, hûn/we, ew/wan.

**Assessment:** The two worked examples are source-supported. However, the lesson title promises possessive pronouns while its body does not provide a complete possessive paradigm. The personal pronouns used as oblique possessors should not be confused with a separate set of independent possessive forms.

**Proposed editorial action (not applied):**
- Either provide a sourced table of the relevant personal-pronoun oblique forms in possessive constructions, with examples, or narrow the title and outcome to “possession through ezafe and reflexive xwe.”
- Keep the xwe rule tied to same-clause subject coreference; do not teach it as a generic replacement for all possessive pronouns.
- Use mal-a me as a direct source-attested example, not as evidence for a full paradigm by itself.

## 4. Cross-lesson conceptual distinctions that must remain explicit

| Distinction | Correct teaching boundary |
|---|---|
| Direct vs oblique | Grammatical case categories; not a simple subject/object split |
| Oblique plural vs direct plural | Standard baseline marks plural overtly on oblique nouns with -a(n); direct nouns normally lack noun plural marking |
| -in | Not a universal direct indefinite plural; limited/variable dialect distribution |
| -ek | Singular indefiniteness marker; it can be followed by case or ezafe morphology |
| Oblique -î / -ê vs ezafe -î / -a | Similar surface endings may have different functions; parse the noun phrase and its construction |
| Ezafe agreement vs case | Ezafe agrees with head noun gender/number; possessor may independently be oblique |
| xwe vs personal oblique pronoun | xwe is used for same-clause subject coreference in the relevant Standard Kurmanji construction |

## 5. Priority and acceptance criteria

### P0 — must be resolved before scientific certification
1. Course 2 Lesson 03 must explicitly teach the Standard Kurmanji plural/case baseline and qualify -in.
2. Course 2 Lesson 04 must preserve the -ek + case distinction and distinguish it from ezafe.
3. Course 2 Lesson 05 must keep head-noun ezafe agreement separate from possessor case.
4. Course 2 Lesson 06 must align its title and learning outcome with the actual pronoun/possession material.
5. Every example must be tagged internally as directly source-attested, adapted from a source, or newly authored. Never attribute a constructed example verbatim to Haig.

### P1 — review before proposed lesson edits
6. Select the explicit reference variety for the course (the current grammatical source uses a Standard Kurmanji sketch loosely based on Cizre/Botan, and separately documents variation).
7. Have a Kurmanji editor check all inflected examples and a Sorani editor check all Sorani explanations/glosses.
8. Compare the final proposed wording with the complete grammar source and record precise page/section locators.

### Acceptance test for a later approved patch
- Correctly distinguishes the direct/oblique paradigms for singular and plural.
- Does not teach -in as universal.
- Correctly segments -ek, case endings and ezafe markers.
- Does not mark adjectives with case or gender endings without source evidence.
- Uses oblique possessors in ezafe constructions where required.
- Restricts xwe explanation to its coreference conditions.
- Labels variety scope and source provenance for examples.
- Preserves all current lesson content unless a separately approved minimal diff is accepted.

## 6. Actions not taken

No lesson text, SQL seed, migration, schema, application code, test, PR, production database, deployment, or main branch was changed. No SQL was executed. This is an evidence review and proposed action list only.

## 7. References

1. Haig, Geoffrey. 2018. “Northern Kurdish (Kurmanjî).” In Geoffrey Haig & Geoffrey Khan (eds.), *The Languages and Linguistics of Western Asia: An Areal Perspective*, pp. 106–158. De Gruyter Mouton. DOI: https://doi.org/10.1515/9783110421682-004. Relevant: §2.2.1, Table 7, p. 115; §2.2.2, pp. 116–117; §2.3.1, pp. 118–119; §2.7, pp. 130–132. PDF: https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf
2. Gündoğdu, Songül. 2023. “Ezafe in Northern Kurdish.” *Toronto Working Papers in Linguistics* 45(1). DOI: https://doi.org/10.33137/twpl.v45i1.41677. Landing page: https://twpl.library.utoronto.ca/index.php/twpl/article/view/41677. Note: only the abstract/metadata was accessible during this review; detailed article claims beyond its abstract are not attributed to it.
3. Haig, Geoffrey & Ergin Öpengin. 2018. “Kurmanjî Kurdish in Turkey: Structure, varieties, and status.” In Christiane Bulut (ed.), *Linguistic Minorities in Turkey and Turkic-speaking Minorities of the Peripheries*, pp. 157–230. Harrassowitz. Bibliographic record: https://fis.uni-bamberg.de/handle/uniba/45103. Used as a broader dialect/variety cross-reference, not as a substitute for Haig's exact paradigms above.

## Backup record

- Pre-work backup: backup/kurmanji-p0-case-ezafe-review-before-2026-11-17
- Starting SHA: 3293e1ba9c92e23f78f6dacdc62d9c04e8cdde42
- Post-work backup: to be recorded after commit and exact ref/blob verification.
