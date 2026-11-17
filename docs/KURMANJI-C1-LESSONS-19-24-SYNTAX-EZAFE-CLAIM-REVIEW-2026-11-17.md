# Course 1 lessons 19–24 — syntax, adjectives, nominal marking and ezafe claim review

Date: 2026-11-17  
Branch: fix/kurmanji-ci-current-migration  
Starting HEAD: 2e07d20229ab7aa25675a9708afa5420d3a1cf76  
Pre-work backup: backup/kurmanji-c1-l19-24-syntax-ezafe-review-before-2026-11-17  
Scope: claim-level review of the current candidate seed payloads for Course 1 lessons 19–24. Documentation only.

## 1. Executive disposition

**Lessons 19–24 are evidence-reviewed but not release-certified.** The sequence is pedagogically coherent: interrogatives → clause order → adjectives/ezafe → comparison → nominal marking → possession. The core descriptions of neutral SOV order, postnominal attributive adjectives, the indefinite marker -ek, direct/oblique marking, and the two ezafe functions have strong support in Haig (2018). The current material nevertheless contains important omissions and some misleading explanations/glosses.

Highest-priority findings:

1. **Lesson 19:** the interrogative inventory is a reasonable starter list, but it omits the oblique form kê for “whom” and does not distinguish count quantity çend from amount/degree çiqas. Yes/no questions by intonation are a defensible introductory approach. Do not add ma as if it were a neutral, universal yes/no marker: Thackston §34 describes a marked expectation/discourse function, often anticipating a negative answer or introducing a contradictory/rhetorical question.
2. **Lesson 20:** SOV is correctly described as pragmatically neutral, not invariant. The lesson needs the recipient/goal boundary: Haig documents recipients with dan ‘give’ commonly immediately after the verb, in the oblique case, across dialects; other post-predicate goal patterns are regionally conditioned. The fronted-object example needs a clear discourse context and native-editor validation.
3. **Lesson 21:** the sentence saying ezafe form depends on “gender, number and case” is technically misleading. In Standard Kurmanji, ezafe agrees with the head noun in gender and number; it is not inflected for the external case of the whole NP. Haig explicitly says ezafe on a noun suppresses overt oblique marking on that noun. Separate ezafe agreement from case marking.
4. **Lesson 22:** the comparative/superlative core is supported, but the lesson omits lexical comparative forms çêtir and bêtir. The example with mezintir is translated as “bigger” although Thackston's cited example means “older”. The semantics of herî are also more nuanced than an invariant superlative marker: Thackston notes intensifying uses (“really”) as well as superlative constructions.
5. **Lesson 23:** the Standard Kurmanji description “no dedicated definiteness marker” is directly supported by Haig. But the lesson should not imply that demonstrative NPs lack any additional noun-attached marking: Haig notes that most dialects have a suffix/clitic after nouns preceded by demonstratives, with regional forms and distribution. Also, oblique case marks more than objects and possessors; importantly, it marks the subject of a past transitive clause.
6. **Lesson 24:** the possessor paradigm and linking ezafe are well supported. But the Sorani glosses of the free ezafe examples are inaccurate: yê spî means “the white one” (masculine singular), ya te “your one” (feminine singular), and yên mezin “the big ones” (plural). They are not full clauses meaning “that one is white / those are big”. The lesson should also state that when a possessor is coreferential with the same-clause subject, Standard Kurmanji requires xwe rather than a personal oblique pronoun.

No lesson, seed, migration, application code, test, database or PR was changed.

## 2. Evidence base and limits

### Primary descriptive grammar

Geoffrey Haig (2018), “Northern Kurdish (Kurmanjî),” in Geoffrey Haig & Geoffrey Khan (eds.), *The Languages and Linguistics of Western Asia: An Areal Perspective*, pp. 106–158. De Gruyter Mouton. DOI: https://doi.org/10.1515/9783110421682-004  
Author-hosted chapter PDF: https://www.uni-bamberg.de/fileadmin/aspra/06_Team/Publications_and_CV/haig_2018_ch.2.3_northern_kurdish.pdf

Pinpoint sections:
- §2.2.1, pp. 114–116: grammatical gender, Direct/Oblique case, -ek, case functions and dialectal variation.
- §2.2.3, pp. 117–118: personal pronouns and demonstrative paradigms.
- §2.3 and §2.3.1, pp. 118–121: NP structure, linking ezafe, free/demonstrative ezafe, possessors and adjective order.
- §2.7.1, p. 130: neutral word order and goal/recipient placement.
- §2.7.2, pp. 130–132: past-transitive ergative construction and variation.

Haig's Standard Kurmanjî description is loosely based on Cizre/Botan, and the chapter separately discusses regional variation. It must not be generalized to every Kurmanji variety. The chapter itself stresses a dialect continuum and substantial structural variation (pp. 107–109).

### Comparative adjective reference

W. M. Thackston, *Kurmanji Kurdish: A Reference Grammar with Selected Readings*, §10, “Comparative and Superlative Adjectives,” pp. 27–28 in the circulated PDF.  
PDF: https://kurdshop.net/content/upload/1/root/kurmanji-complete.pdf

Thackston documents productive -tir, lexical comparative forms pir > bêtir, baş > çêtir, and mezin > meztir (alongside regular mezintir), as well as the two superlative strategies -tirîn and herî. He notes that herî can also intensify an adjective (“really”) in some contexts.

### Interrogatives and question structure

- Gündoğdu's research on Kurmanji wh-questions, represented in the Boğaziçi University dissertation material, documents wh-in-situ and gives examples including Kî vê kitêbê dixwîne?, Tu çi dixwînî?, and a postverbal goal question. Repository copy: https://abis-files.bogazici.edu.tr/avesis/3420afbd-1f13-4de9-9948-d86ee87f41c3
- Thackston §34, p. 79, describes ma as a particle that introduces affirmative questions to which a negative answer is expected, and negative questions to which an affirmative answer is expected; it can also have contradictory/discourse force. It is not simply interchangeable with neutral rising intonation.
- Indiana University Center for Languages of the Central Asian Region, *Kurmanji Grammar — Structural List*, independently lists ma/gelo as interrogative particles and kî/çend/kîjan as beginner interrogatives: https://celcar.indiana.edu/assessment/proficiency_guidelines/Kurmanji%20Grammar.pdf. This is a teaching/proficiency reference, not the sole authority for syntax.

### Repository material inspected

- docs/kurmanji-content-seed-part-03.sql, Course 1 rows 19–24.
- Static lesson shells kurmanji-course-1-lesson-19.html through kurmanji-course-1-lesson-24.html.
- docs/KURMANJI-COURSE-1-LESSONS-19-24-CLAIM-LEVEL-EVIDENCE-REGISTER-2026-11-16.md.
- docs/KURMANJI-COURSE-1-INTEGRATED-26-LESSON-CLAIM-EVIDENCE-MATRIX-AND-CLOSURE-PLAN-2026-11-16.md.

The static pages are protected shells with dynamically loaded lesson content; the reviewed SQL seed contains the lesson bodies. The seed labels itself draft data and is not evidence of final owner approval or the exact production payload.

## 3. Lesson-by-lesson findings

### Lesson 19 — Questions and interrogative words

**Current seed content:** lists kî, çi, li ku, kengî, çima, çawa, çiqas and kîjan; introduces yes/no questions by intonation and punctuation; includes Tu baş î?, Tu kurdî dizanî?, Ew li malê ye?; then wh-question examples such as Tu li ku dijî?, Navê te çi ye?, Tu kengî dixebitî?, Tu çima kurdî hîn dibî?, Tu bi çi awayî hatî?

**Supported**
- The starter inventory is appropriate: kî, çi, kengî, çima, çawa, li ku and kîjan are established Kurmanji interrogatives.
- Wh-phrases commonly occur in the position of the constituent they question (wh-in-situ), rather than requiring English-style fronting. Gündoğdu's dissertation material gives explicit examples.
- Tu li ku dijî? and Navê te çi ye? are structurally consistent with the cited beginner grammar material; exact inflection and spelling still require checking against the selected house variety.

**Gaps / risks**
1. kî is not sufficient for all “who” functions. The oblique counterpart kê is required in object/oblique positions. A basic illustration is Tu kê dixwazî? (“Whom do you want?”). The lesson introduces kî but no case contrast.
2. çend and çiqas should not be taught as synonyms. The common distinction is çend for countable number (“how many?”) and çiqas for amount/degree (“how much/how far?”), with phrase-level variation. The lesson only has çiqas, and its gloss “چەند / تا چەند” blurs the boundary.
3. Tu kengî têyî? appears in the earlier claim register as unresolved. The current seed uses related examples; it should be checked as a whole sentence, not validated merely because kengî is attested.
4. Punctuation alone cannot teach spoken question intonation. Add a listening/speaking exercise or explicitly label punctuation as the written convention.
5. Do not introduce ma as a generic optional yes/no marker. Thackston describes a marked expectation/discourse function. If included, contrast it with neutral intonation questions.

**Proposed action (not applied)**
- Add a mini paradigm kî (Direct) / kê (Oblique), with sourced subject and object examples.
- Add çend = count and çiqas = amount/degree, each with a fully reviewed example.
- Retain wh-in-situ as a common/neutral pattern, not an absolute rule.
- Keep neutral yes/no intonation questions separate from the marked ma construction.
- Tag every exact question example as source-attested, adapted or instructor-authored.

### Lesson 20 — Word order

**Current seed content:** describes pragmatically unmarked SOV as the common order, explicitly rejects a rigid rule, gives simple transitive and intransitive examples, and shows a fronted object for emphasis.

**Supported**
- Haig §2.7.1, p. 130, directly states that pragmatically neutral clauses are SOV.
- Haig also says word order is not rigidly fixed and direct objects may be fronted for pragmatic purposes.
- The seed's information-structure caveat is correct and should be preserved.

**Gaps / risks**
1. The lesson does not explain the goal/recipient part of SOVG descriptions. Haig notes that recipients with dan ‘give’ are usually placed immediately after the verb in the oblique case across dialects; other post-predicate goal patterns are regionally conditioned and may co-occur with directional -e. This is an additional construction, not a new universal default.
2. Vê pirtûkê, ez dixwînim is presented as a focus example. It is plausible as a fronted object, but the discourse context (e.g. contrast “this book, not that one”) should be supplied and the sentence confirmed by a native editor. Punctuation and intonation are part of the information-structure claim.
3. Zarok radizê and Em kurdî hîn dibin are not pinpointed to the cited grammar. The general SOV rule does not validate each lexical form, agreement ending or exact compound-predicate sense.
4. Avoid saying the verb always remains final. Recipient/goal placement is construction-specific; Haig documents post-predicate recipients.

**Proposed action (not applied)**
- Retain “neutral/basic SOV” and the caveat.
- Add one sourced example of a recipient after dan and explain its oblique case; label it as an additional pattern.
- Give a discourse context for the fronted-object example.
- Audit every verb and case form independently.

### Lesson 21 — Adjectives and description

**Current seed content:** says descriptive adjectives usually follow nouns; gives bajarê mezin, maleke biçûk, pirtûka nû, and bajar-ek-î mezin; says ezafe links nouns and adjectives and depends on the gender, number and case of the noun; distinguishes attributive from predicative description but provides no fully worked predicative example.

**Supported**
- Haig §2.3, p. 118, gives NP order Dem | Num | N-Ez | Poss | Ez | Adj, with possessors and descriptive adjectives after the head noun.
- Haig §2.3.1, pp. 118–119, directly attests bajar-ek-î mezin ‘a big town’ and explains that ezafe agrees with the head noun in gender and number.
- In a simple ezafe construction, the adjective itself does not inflect for the head noun's gender/number in the same way; the ezafe carries the agreement information.

**Material correction**
- The sentence “ezafe form is related to gender, number and case of the noun” is not a safe description of Standard Kurmanji. Haig says ezafe agrees with the head noun in gender and number. He then states that ezafe suppresses overt oblique case on that noun (pp. 119–120). External case may be visible on a demonstrative introducing the whole NP, but it is not an ezafe inflection.
- Separate: (a) gender/number agreement of ezafe with its head; (b) case of the whole NP; and (c) the special role of a demonstrative in expressing external case when it precedes an ezafe phrase.
- bajarê mezin and bajar-ek-î mezin differ in definiteness: the first has the definite masculine ezafe form; the latter contains -ek and the indefinite masculine ezafe. The lesson's note signals this distinction, but its table should segment the forms explicitly.
- maleke biçûk and pirtûka nû need noun-gender, segmentation and dialect verification before being used as paradigmatic forms. Haig's bajar-ek-î mezin is the secure anchor.
- Predicative adjectives differ from attributive adjectives. A postnominal adjective in an NP uses ezafe; a predicate adjective clause has a different construction. Haig documents exceptional predicative ezafe behavior in southeastern/Behdini varieties (pp. 139–141), reinforcing the need to scope the rule.

**Proposed action (not applied)**
- Correct the conceptual explanation: ezafe agreement is gender/number, not external case.
- Add segmentation of bajar-ek-î mezin.
- Add one source-checked predicative adjective clause, or narrow the objective to attributive adjective phrases.
- Add a Standard Kurmanji scope note; put dialect-specific predicative ezafe in an advanced note.

### Lesson 22 — Comparative and superlative adjectives

**Current seed content:** gives mezin → mezintir, baş → baştir, biçûk → biçûktir, dirêj → dirêjtir; shows herî mezin, herî baş, mezintirîn bajar; gives Meyrem ji birayê xwe mezintir e with a Sorani gloss meaning “Meryem is bigger than her brother”.

**Supported**
- Thackston §10 supports productive -tir and preposition ji before the standard of comparison.
- Thackston lists pir → bêtir, baş → çêtir, and mezin → meztir, alongside regular mezintir.
- Thackston supports -tirîn, which precedes the noun it modifies, and herî before the adjective.
- Thackston's example Meyrem ji birayê xwe mezintir e is glossed “Meyrem is older than her brother”. The course must not translate this example only as physical size.

**Gaps / risks**
1. The lesson omits çêtir and bêtir. baştir may be a possible regular comparative, but is not the only “better” form.
2. meztir is a documented variant beside mezintir in Thackston; label it as a variant/lexical form and keep the reference variety clear.
3. The table herî mezin / mezintirîn is too compressed. -tirîn precedes the noun (mezintirîn bajar). herî may occur in larger noun phrases and, in Thackston, can also intensify (“really”).
4. kêmtir and zêdetir are useful quantity comparatives but should not be presented as if they were necessarily members of the same adjective paradigm as mezin without explaining their semantic class.
5. The dialect-comparison article should only be used with its variety examples identified; it is not a license to mix forms in one standard paradigm.

**Proposed action (not applied)**
- Add regular vs lexical comparative table: mezin → mezintir / meztir; baş → baştir / çêtir; pir → bêtir.
- Use the cited Meyrem sentence with “older” or provide a different, separately attested context for physical size.
- Separate the two superlative constructions and show -tirîn before the noun.
- Explain the intensifying use of herî as a note.

### Lesson 23 — Nouns and determiners

**Current seed content:** says Standard Kurmanji has no dedicated definite suffix, while -ek marks indefinite singular; shows gund/gundek, jin/jinek, oblique forms gundekî/jinekê, and demonstratives ev/ew; it says demonstratives may change in oblique contexts.

**Supported**
- Haig §2.2.1, p. 115, explicitly states that Standard Kurmanji marks singular indefiniteness with -ek, while no dedicated definiteness marker exists. A bare noun may be definite or generic/sortal depending on context.
- Haig Table 7 supports gund / gund-î / gund-ek / gund-ek-î and jin / jin-ê / jin-ek / jin-ek-ê.
- Haig Table 10 supports direct demonstratives ev/ew and oblique forms vî/vê/van and wî/wê/wan.
- Haig lists oblique functions as present-transitive object, goal/recipient after motion/transfer predicates, adposition complement, possessor in ezafe, and subject of a past-transitive verb.

**Gaps / risks**
1. “Kurmanji does not have the Sorani -eke/-ekan suffix in the same way” is defensible for the Standard K. paradigm, but should be worded narrowly: “Standard Kurmanji has no dedicated definite suffix in the paradigm described here.” Do not generalize across all dialects or imply there are no demonstrative-associated noun markers.
2. Haig notes that most dialects attach an additional suffixal/clitic marker to nouns preceded by demonstratives (singular -e/-a; plural -ene/-ana), only when the noun is the final element of the NP (p. 117). This does not contradict the lack of a dedicated definite suffix, but is a relevant qualifier.
3. The lesson's list of oblique contexts mentions objects, prepositions and possession, but should explicitly mention the subject of a past-transitive clause. This avoids the false shortcut “oblique = object”.
4. The lesson says demonstratives may change but does not provide the paradigm. Show the directly sourced forms or explicitly defer them.
5. ev pirtûk / ew pirtûk should be labelled basic direct-case NPs. In oblique contexts the demonstrative and, depending on construction, the noun form may change.
6. Gender and case assignment vary across Kurmanji varieties; state the reference standard used.

**Proposed action (not applied)**
- Retain the no-dedicated-definite-marker statement but scope it to Standard Kurmanji.
- Add a note on demonstrative-associated noun clitics as regional/variety-specific, not a universal definiteness suffix.
- Add the direct/oblique demonstrative table.
- Add the full functional list of oblique case, including past-transitive subjects.

### Lesson 24 — Possession and possessive expressions

**Current seed content:** gives pirtûka min/te/wî/wê/me/we/wan, contrasts independent direct pronouns with oblique possessors, distinguishes linking ezafe from free ezafe yê/ya/yên, and includes birayê min ê mezin.

**Supported**
- Haig §2.3.1, p. 118, attests mal-a me ‘our house’ and identifies the possessor as oblique.
- Haig Table 9, p. 117, supports Direct/Oblique pairings ez/min, tu/te, ew/wî/wê, em/me, hûn/we, ew/wan.
- Haig p. 120 attests bra-yê min ê mezin ‘my older brother’, confirming head + linking ezafe + oblique possessor + free ezafe + adjective.
- Haig p. 120 explains that free/demonstrative ezafe can function anaphorically with the sense “the one …”: yê spî ‘the white one’ (masculine singular), ya te ‘your one’ (feminine singular), yên mezin ‘the big ones’ (plural).
- Haig p. 119 says that if the possessor is coreferential with the same-clause subject, Standard Kurmanji requires reflexive xwe instead of a personal pronoun: Ez li mal-a xwe me, contrasted with ungrammatical *mal-a min for that reading.

**Material correction**
- The current gloss yê spî = “ئەوە سپییە” (‘that one is white’) is not Haig's gloss. The source gives “the white one”. Free ezafe here is a nominal expression, not a copular clause.
- ya te is “your one” (feminine singular), not a general full-clause “ئەوەی تۆ” without context.
- yên mezin is “the big ones” (plural), not “those are big”.
- The course note that free ezafe can mean “ئەوەی...” is closer to the source, but the example table translates it as a clause. These explanations contradict each other.
- Explicitly teach xwe in same-clause coreference, or cross-reference the earlier reflexive-pronoun lesson. Otherwise learners may overgeneralize min as possessor in every clause.
- The possessive table is a teaching alignment table, not a claim that oblique pronouns are possessive suffixes. Preserve the distinction between free pronouns, oblique pronouns and NP possession.

**Proposed action (not applied)**
- Correct the three free-ezafe glosses to nominal “one(s)” expressions.
- Preserve birayê min ê mezin as a strong sourced model, with segmentation.
- Add xwe and the same-clause subject-coreference rule.
- Clarify that the oblique possessor is selected by the ezafe construction, not because it is a direct object.

## 4. Cross-lesson consistency requirements

| Topic | Required teaching rule |
|---|---|
| Interrogatives | Distinguish kî and oblique kê; distinguish count çend from amount/degree çiqas |
| Wh-word placement | Teach wh-in-situ as a common pattern, not an absolute ban on fronting |
| Yes/no questions | Separate ordinary intonation questions from marked ma questions |
| Clause order | SOV is the pragmatically neutral baseline, not an invariant order |
| Goals/recipients | Explain postverbal recipient with dan and regional goal constructions without overgeneralizing |
| Attributive adjectives | Postnominal adjective linked by ezafe |
| Ezafe agreement | Ezafe agrees with head noun in gender/number; external NP case is separate |
| Predicative adjectives | Distinguish predicate adjective clauses from attributive NP ezafe |
| Comparative | Regular -tir plus lexical forms such as çêtir, bêtir, meztir |
| Superlative | Separate -tirîn (pre-nominal) from herî + adjective; note intensifying uses |
| Definiteness | Standard bare noun interpretation is contextual; no dedicated definite suffix in the standard paradigm |
| Demonstratives | Direct ev/ew; oblique vî/vê/van and wî/wê/wan; dialectal noun clitics are separate |
| Oblique case | Not synonymous with object: includes possessors, adposition complements, recipients and past-transitive subjects |
| Possession | Oblique possessor in ezafe; use xwe for same-clause subject coreference |
| Free ezafe | yê/ya/yên can stand nominally for “the one(s)”; not a copular clause by itself |

## 5. Priority closure queue

### P0 — before scientific certification
1. Correct Lesson 21's ezafe/case explanation.
2. Correct Lesson 24's free-ezafe Sorani glosses and add or cross-reference xwe.
3. Add kî/kê and çend/çiqas distinctions to Lesson 19.
4. Add the full oblique-case function note to Lesson 23.
5. Add recipient/goal boundary to Lesson 20 and remove any implication that all verbs must be final.
6. Clarify the age reading and lexical comparative forms in Lesson 22.

### P1 — after P0
7. Native Kurmanji editor validates every exact sentence and inflection.
8. Sorani editor reviews all Sorani glosses, punctuation, terminology and spelling.
9. Decide the target reference variety and identify regional variants.
10. Record every example as source-attested, adapted or instructor-authored, with page/section and variety.

### Acceptance checks for any later approved patch
- No claim equates ezafe agreement with external case.
- No claim treats oblique as synonymous with object.
- The kî/kê contrast is accurate and contextually exemplified.
- The çend/çiqas contrast is not flattened into one gloss.
- ma is not taught as a neutral universal yes/no marker.
- SOV is described as neutral/default, with sourced goal/recipient exceptions.
- Attributive and predicative adjectives are distinct.
- Comparative variants and superlative word order are correctly labelled.
- The Standard Kurmanji no-definite-marker claim is scoped; demonstrative noun clitics are not confused with a general definite suffix.
- Free ezafe examples are glossed as nominal “one(s)” forms.
- xwe is used in same-clause coreference examples.
- Sorani and Kurmanji editorial checks are separately recorded.

## 6. Actions not taken

No lesson body, static shell, seed SQL, migration, schema, site code, validator, CI workflow, test, database, PR, deployment or main branch was changed. No SQL was executed. This report is a source review and proposal-only action queue.

## 7. References

1. Haig, Geoffrey. 2018. “Northern Kurdish (Kurmanjî).” In Geoffrey Haig & Geoffrey Khan (eds.), *The Languages and Linguistics of Western Asia: An Areal Perspective*, pp. 106–158. DOI: https://doi.org/10.1515/9783110421682-004. Key locations: §2.2.1, pp. 114–116; §2.2.3, pp. 117–118; §2.3–2.3.1, pp. 118–121; §2.7.1–2.7.2, pp. 130–132. PDF: https://www.uni-bamberg.de/fileadmin/aspra/06_Team/Publications_and_CV/haig_2018_ch.2.3_northern_kurdish.pdf
2. Thackston, W. M. *Kurmanji Kurdish: A Reference Grammar with Selected Readings*. §10, pp. 27–28; §34, p. 79. PDF: https://kurdshop.net/content/upload/1/root/kurmanji-complete.pdf
3. Gündoğdu, Songül. Research on wh-questions in Kurmanji, dissertation material held in the Boğaziçi University AVESIS repository. https://abis-files.bogazici.edu.tr/avesis/3420afbd-1f13-4de9-9948-d86ee87f41c3
4. Indiana University Center for Languages of the Central Asian Region, *Kurmanji Grammar — Structural List*. https://celcar.indiana.edu/assessment/proficiency_guidelines/Kurmanji%20Grammar.pdf

## Backup record

- Pre-work backup: backup/kurmanji-c1-l19-24-syntax-ezafe-review-before-2026-11-17
- Starting SHA: 2e07d20229ab7aa25675a9708afa5420d3a1cf76
- Post-work backup: to be recorded after commit and exact ref/blob verification.
