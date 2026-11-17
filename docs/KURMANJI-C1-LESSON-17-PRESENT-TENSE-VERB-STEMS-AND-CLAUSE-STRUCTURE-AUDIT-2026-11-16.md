# Course 1 Lesson 17 — present-tense verbs, stem classes and clause structure audit

Date: 2026-11-16
Repository: avasinim/zanztkurd
Working branch: fix/kurmanji-ci-current-migration
Baseline HEAD: 929bafa4b042b0cf85451a6b28d02cf3a98b281d
Pre-work backup: backup/c1-l17-present-tense-before-2026-11-16
Scope: exact Lesson 17 seed payload, claims 17.1–17.7, present-stem formation, six-person paradigm, irregular/suppletive verbs, hîn bûn, SOV qualification and oblique object marking. Documentation-only; no lesson or seed content changed.

## 1. Executive finding

The central pattern is well supported for ordinary Kurmanji present indicative verbs: a present stem is preceded by the indicative/aspect marker di- and followed by person/number agreement. The six forms of xwendin in the seed match the beginner paradigm in Harvard/Uppsala (2008). The main teaching risk is that learners may mistake this formula for a fully mechanical rule.

Four points require attention:

1. **The infinitive does not reliably predict the present stem.** Kurmanji has distinct past and present stems, and their relationship is not fully predictable. The lesson correctly warns about irregular verbs, but its five-verb table should explicitly show the present stem as a separate lexical form.
2. **çûn and hatin need explicit irregular/suppletive treatment.** The current Ez diçim and Ez têm forms are supported, but Haig documents regional variation in the stem used for çûn and in the present of hatin. Hatin is not a regular di- plus infinitive-derived stem example.
3. **Em kurdî hîn dibin needs sentence-level review.** hîn bûn is a complex/light-verb expression for “learn”; specialist teaching examples use either bi before the language name (e.g. bi Almanî hîn dibe) or an -î construction (hînî Kurdî dibin). The seed sentence has neither. Do not silently alter it; mark it for native review.
4. **SOV is the neutral default, not an unbreakable rule.** The lesson's caveat about focus/fronting is correct. It should say “pragmatically neutral/basic clause order” and not imply all complements must always precede the verb.

**Release decision: the xwendin paradigm and core present-tense formula are supported; the lesson is not fully release-certified until hîn bûn, the five sample verb stems, the object-marking example and Sorani glosses receive review.**

## 2. Exact artifacts inspected

| Artifact | Blob SHA | Use |
|---|---|---|
| docs/kurmanji-content-seed-part-03.sql | b6f89841ac49adb256a7874179a258436e095909 | Exact draft Lesson 17 payload |
| docs/KURMANJI-COURSE-1-LESSONS-13-18-CLAIM-LEVEL-EVIDENCE-REGISTER-2026-11-16.md | 4519b677e3c09f09a175763a37dffbb41486a329 | Claims 17.1–17.7 |

The SQL seed is a tracked draft and is not proof of live database content. It was read as text only; no SQL was executed.

## 3. Evidence base

### 3.1 Geoffrey Haig (2018), “Northern Kurdish (Kurmanjî)”

Haig describes Kurmanji verbs as having distinct past and present stems, with no fully predictable formation rule. His frequent-verb table directly supports:
- bûn → b-
- hatin → -(h)ê- / -wer-
- kirin → k-
- çûn → -ç- / -her-
- xwarin → -xw-
- xwestin → -xwaz-
- dîtin → -bîn-
- xwandin/xwendin → -xwîn-

Haig further explains that çûn and hatin have suppletive stems and that their exact present forms vary regionally. In Standard Kurmanji, têm is explained as a contraction of di-hê-m; western dialects can use another stem for “go.” The neutral present indicative uses di-; subjunctive forms use bi- or zero in some varieties.

For syntax, Haig says pragmatically neutral clauses are SOV, but word order is not rigidly fixed. Direct objects can be fronted for pragmatic purposes; goal/recipient placement varies by construction and dialect. Haig also describes Kurmanji light-verb constructions using kirin, bûn, and dan.

Sources:
- https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf
- https://www.uni-bamberg.de/fileadmin/aspra/06_Team/Publications_and_CV/haig_2018_ch.2.3_northern_kurdish.pdf
- Evidence: §§2.6–2.7, pp. 124–131; present-stem table; §2.6.2 suppletive çûn/hatin; §2.6.6 light verbs; §2.7.1 word order.

### 3.2 W. M. Thackston (2006), Kurmanji Kurdish: A Reference Grammar with Selected Readings

Section 14 says the present tense is formed from the present stem, with a prefixed progressive/habitual marker di- and personal endings. It emphasizes that some common verbs have irregular present stems which must be learned as principal parts, including dîtin → bîn- and xwestin → xwaz-. It gives consonant-stem and vowel-stem agreement paradigms, and shows the special present forms of hatin and anîn. It also states that the present covers habitual and progressive readings, with context deciding the natural English translation.

Thackston's §14 gives ordinary word order as subject–object–verb. Section 15 discusses compound verbs and pre-verbal elements; §16 distinguishes the present subjunctive from indicative forms. The book is an older pedagogical grammar, so its spellings and dialect scope should be compared with Haig and the selected house variety.

Source:
- https://sites.fas.harvard.edu/~iranian/Kurmanji/kurmanji_complete.pdf
- Searchable text: https://www.academia.edu/5485402/Kurmanji_Kurdish_A_Referance_Grammar_with_Selected_Readings_by_W_M_Thackston
- Evidence: §14, pp. 32–34; §15, compound verbs; §16, present subjunctive.

### 3.3 Harvard Faculty of Arts and Sciences / Uppsala University (2008), Kurmanji Kurdish for the Beginners

Lesson 3 teaches the present-stem distinction directly and provides the full six-person paradigms for kirin and xwendin. It identifies the present stem of xwendin as xwîn-, not the past stem xwend-; kirin has k-; xwarin has xw-; dîtin has bîn-. It gives the xwendin forms Ez dixwînim, Tu dixwînî, Ew dixwîne, Em dixwînin, Hûn dixwînin, Ew dixwînin.

The same lesson lists hatin and anîn as common irregular present verbs and supplies their paradigms. It distinguishes ordinary di- present formation from special irregular forms.

Source: https://www.kurdipedia.org/files/books/2023/474430.PDF
Evidence: Lesson 3, “The simple present tense,” present-stem table and paradigms.

### 3.4 University of Arizona, Iranian Languages, “Kurmanji Kurdish”

The teaching page explains present simple formation from the present stem with di- and a personal ending, and gives Ez dinivîsim and the full person pattern. It also explains the contrast between present-tense agreement and past-tense ergative alignment. This is a concise teaching overview, not a complete reference grammar.

Source: https://iranian-languages.arizona.edu/node/7

### 3.5 hîn bûn construction cross-check

Kurmanji teaching materials document hîn bûn as “to learn” and use patterns such as Azad bi Almanî hîn dibe and hînî Kurdî dibin; another reference says hîn bûn normally occurs with bi, while an -î suffix construction can make bi unnecessary. This makes the seed's exact Em kurdî hîn dibin structurally uncertain because it shows neither pattern.

Sources:
- Baran Rizgar, Learn Kurdish: https://kurdshop.net/content/upload/1/root/learn-kurdish-by-baran-rizgar.pdf
- GET (2019), Grammatical and lexical variation in Kurmanji, discussion of hîn bûn / fêr bûn: https://www.hewalname.com/ku/wp-content/uploads/2019/03/get-komprimerad.pdf

### 3.6 Indefinite oblique object

The exact example Ez pirtûkekê dixwînim is independently attested in a Kurmanji grammar table for feminine singular indefinite oblique objects (-ekê). This supports the form as a present transitive object; it is not a neutral direct/nominative noun form. The course should not use it to teach present tense alone without noting that the noun is in the oblique case.

Source: https://www.kurdipedia.org/files/books/2022/426287.PDF?ver=133039986335973847

## 4. Claim-by-claim assessment

| Current Lesson 17 item | Status | Finding |
|---|---|---|
| di- + present stem + personal ending is a general present indicative pattern | SUPPORTED — scope-limited | Haig, Thackston, Harvard/Uppsala and Arizona support it. Call di- a present indicative/habitual-progressive marker, not a universal piece that appears identically on every verb. |
| Present stem can be inferred mechanically from the infinitive | NOT SUPPORTED | The two stems are not fully predictable; common verbs have suppletive or irregular stems. |
| xwendin six-person paradigm | SUPPORTED | All six seed forms match Harvard/Uppsala Lesson 3. -in is shared by 1PL, 2PL and 3PL; the subject pronoun/context distinguishes them. |
| çûn → Ez diçim | SUPPORTED, WITH VARIETY NOTE | The Standard Kurmanji form is supported; Haig documents regional stem variation including western terim-type forms. |
| kirin → Ez dikim | SUPPORTED | Present stem k- and 1SG form are supported by the beginner course and Haig. |
| nivîsîn → Ez dinivîsim | SUPPORTED — TEACHING FORM | Arizona and contemporary instructional material corroborate it; check orthographic consistency in the chosen house style. |
| xwarin → Ez dixwim | SUPPORTED | Present stem xw- and 1SG form are documented in the beginner materials and Haig's stem table. |
| hatin → Ez têm | SUPPORTED, IRREGULAR | Standard Kurmanji form is supported; Haig analyzes it as a contracted special form and documents regional variation. It should be taught as an irregular/suppletive verb, not as a regular derivation. |
| Em kurdî hîn dibin = “we learn Kurdish” | UNRESOLVED / LIKELY CONSTRUCTION GAP | Documented patterns use bi + language + hîn bûn or hînî + language + bûn. The seed's exact construction has neither marker; needs native grammatical review. |
| Tu çi dinivîsî? | STRUCTURE SUPPORTED; EXACT CLAUSE NOT SOURCE-ATTESTED | The present paradigm and wh-question pattern are plausible; exact clause should be native-reviewed. |
| Ez pirtûkekê dixwînim | SUPPORTED WITH CASE NOTE | Exact sentence is independently attested; pirtûkekê is feminine singular indefinite oblique, the expected form for this present transitive object in the cited paradigm. |
| Neutral word order is SOV | SUPPORTED — NOT INVARIANT | Haig explicitly says pragmatically neutral SOV, but not rigidly fixed; objects may be fronted and goal/recipient placement varies. |
| Sorani glosses are accurate | UNRESOLVED | Kurmanji sources cannot certify Sorani translations. |

## 5. Grammar and sequencing findings

### 5.1 Separate the infinitive, past stem and present stem

The lesson says present forms depend on the stem, but the learner-facing table lists infinitives and one present example without consistently displaying the present stem as its own principal part. For reliable acquisition, each verb entry should show infinitive, present stem, one present indicative model, and an irregular/variety note where necessary. This prevents learners from deriving xwîn- from the wrong stem xwend-, or assuming hatin is regular.

### 5.2 Do not make di- a universal formula

The formula is useful for the regular beginner pattern. But Haig and Thackston show special stem allomorphy and contraction in hatin; regional variation in çûn; a stem-initial vowel can affect the surface realization of di-; and distinct subjunctive bi- forms and zero-prefix variants in some dialects. The lesson already says the rule is not exceptionless. Strengthen that warning with a small “learn these principal parts” panel rather than adding an exhaustive irregular verb list.

### 5.3 The xwendin table is the strongest part

The six forms in the seed match the Harvard/Uppsala paradigm:
- Ez dixwînim.
- Tu dixwînî.
- Ew dixwîne.
- Em dixwînin.
- Hûn dixwînin.
- Ew dixwînin.

The note about ew being singular or plural is useful. Add only that the plural agreement ending -in is shared by em, hûn and plural ew; the pronoun/context identifies person and number.

### 5.4 hîn bûn needs a construction-specific review

The sentence Em kurdî hîn dibin is the clearest learner-facing issue. A source-supported construction with a language name uses bi (bi Almanî hîn dibe) or the -î form (hînî Kurdî dibin). The seed's form may be a typo, an unmarked regional construction, or a non-native blend. The evidence reviewed does not justify selecting a correction. Keep it out of the certified model set until a native Kurmanji editor checks intended meaning, case/ending and dialect.

### 5.5 SOV must be framed as neutral word order

The lesson's caveat about focus/fronting is correct. Haig's description is more precise: SOV is the order in pragmatically neutral clauses, but it is not rigidly fixed. The exercise asking learners to convert a Sorani sentence into SOV Kurmanji should avoid implying that the same linear order must always be used, and should be coordinated with the earlier oblique-object lesson.

### 5.6 Object case is not a side issue

Ez pirtûkekê dixwînim is a sound example but includes an indefinite feminine singular oblique object. It therefore tests both the present verb and noun-case morphology. The exercise can use it after a short reminder of the oblique form, or select a separately reviewed noun phrase that does not obscure the intended verb outcome. Do not remove or change the example without approval.

## 6. Editorial resolution — proposal only

1. Retain the general di- + present stem + person ending formula, explicitly scoped to ordinary present indicative forms.
2. Add a principal-parts column to the verb table: infinitive, present stem, present example.
3. Retain the six xwendin forms; the paradigm is supported.
4. Keep çûn and hatin in a visually distinct “common irregular/suppletive verbs” panel with variety notes.
5. Keep dîtin → bîn- and xwestin → xwaz- as examples of why the infinitive cannot predict every present stem.
6. Hold Em kurdî hîn dibin for native review; compare the attested bi + language + hîn bûn and hînî + language + bûn patterns.
7. Keep Ez pirtûkekê dixwînim only with an explicit reminder that pirtûkekê is an oblique indefinite object.
8. Phrase SOV as the pragmatically neutral/default pattern and preserve the focus/fronting qualification.
9. Have a Sorani editor independently verify every Sorani gloss and the intended meanings.
10. Select the reference variety and house orthography before normalizing any forms.

## 7. Release decision

**NOT RELEASE-CERTIFIED YET.** The core present indicative formula and six-person xwendin paradigm are supported. The main unresolved item is Em kurdî hîn dibin; additionally, verb principal parts, variety-sensitive forms, case sequencing and Sorani glosses need editorial review.

## 8. Actions not taken

No lesson body, seed SQL, migration, schema, static page, application code, validator, test, database, PR #3, main branch, merge state or deployment was changed. No SQL was executed. No live database was accessed. This is a documentation-only audit.

## 9. References

1. Haig, Geoffrey (2018). “Northern Kurdish (Kurmanjî).” The Languages and Linguistics of Western Asia, §§2.6–2.7, pp. 124–131. https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf
2. Thackston, W. M. (2006). Kurmanji Kurdish: A Reference Grammar with Selected Readings, §14, pp. 32–34; §15, compound verbs. https://sites.fas.harvard.edu/~iranian/Kurmanji/kurmanji_complete.pdf
3. Harvard Faculty of Arts and Sciences / Uppsala University (2008). Kurmanji Kurdish for the Beginners, Lesson 3, present tense and irregular verbs. https://www.kurdipedia.org/files/books/2023/474430.PDF
4. University of Arizona, Iranian Languages. “Kurmanji Kurdish,” present simple and case. https://iranian-languages.arizona.edu/node/7
5. Baran Rizgar. Learn Kurdish, hîn bûn / hîn kirin constructions. https://kurdshop.net/content/upload/1/root/learn-kurdish-by-baran-rizgar.pdf
6. GET (2019). Grammatical and lexical variation in Kurmanji, discussion of hîn bûn / fêr bûn. https://www.hewalname.com/ku/wp-content/uploads/2019/03/get-komprimerad.pdf
7. Kurmanji grammar resource, indefinite oblique forms: Ez pirtûkekê dixwînim. https://www.kurdipedia.org/files/books/2022/426287.PDF?ver=133039986335973847

## Backup record

- Pre-work backup: backup/c1-l17-present-tense-before-2026-11-16
- Baseline SHA: 929bafa4b042b0cf85451a6b28d02cf3a98b281d
- Post-work backup: backup/c1-l17-present-tense-after-2026-11-16 (points to the final documentation commit after verification).
