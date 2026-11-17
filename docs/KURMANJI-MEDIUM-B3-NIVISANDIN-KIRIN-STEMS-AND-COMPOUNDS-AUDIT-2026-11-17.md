# Kurmancî B3 — nivîsandin û kirin: past stems, ergativity and compound verbs (2026-11-17)

## Scope and safety
Documentation-only linguistic audit. No lesson text, course inventory, runtime, CI, migration, production database, PR #3, or deployment was changed. The course inventory remains 26 + 12 lessons. The core variety remains Standard Kurmancî in Hawar-based Latin orthography; regional variants are not silently merged into the learner standard.

## Executive findings
- **kirin** (“to do, make”) has past stem **kir-** and present stem **k-** in Haig & Öpengin's stem inventory as reproduced in the cited overview and in Kurdîzan. Its ordinary transitive simple past follows the canonical ergative pattern: oblique agent + direct patient + verb agreeing with the patient.
- **nivîsandin** is listed by Kurdîzan with past stem **nivîsand-** and present stem **nivîs-**. Its learner examples should therefore distinguish **min namek nivîsand** (I wrote a letter) from present **ez dinivîsim** (I write / am writing).
- There is a genuine nomenclature issue: Thackston's reference grammar §28 notes that **nivîsîn** and **nivîsandîn** are both used with the meaning “to write,” without an apparent difference in meaning. The course should record this as a documented lexical/infinitive variation, not “correct” one source by silently rewriting it.
- The present paradigm **ez dinivîsim** is independently shown by the University of Arizona's Northern Kurdish overview. The past stem **nivîsand-** is explicitly listed by Kurdîzan. Because the sources differ in how they label the infinitive, keep infinitive naming and stem identification as separate fields in the lexical record.
- Light-verb compounds ending in **kirin** are grammatically transitive in the past, even when the whole compound's meaning is not a typical action with a concrete object. A published analysis gives **me limêj kir** (“we prayed”) and explains that the nominal component behaves as the direct object of the auxiliary. This is an important teaching exception to semantic guessing.
- A literary token with exact page and context for **nivîsandin** was not independently verified in this pass. Do not present constructed learner examples as literary quotations.

## 1. Nivîsandin / nivîsîn — lexical form and stem caution
### Forms recorded in sources
| Source | Infinitive label | Past stem | Present stem |
|---|---|---|---|
| Kurdîzan past-stem lesson | **nivîsandin** | **nivîsand** | **nivîs** |
| Thackston §28 | **nivîsîn** and **nivîsandîn** | Notes both as write-verbs | The paragraph identifies both infinitives as equivalent in meaning |
| University of Arizona overview | Present paradigm is shown as **dinivîsim** | Past stem not listed in the displayed table | **nivîs-** (visible in dinivîsim) |

The safest lexicon design is to store the source form exactly as given, with a cross-reference between **nivîsîn** and **nivîsandin/nivîsandîn**. Do not infer from the spelling alone that the forms have identical morphology in every dialect or register. The reference statement is specifically that both are used for “to write” without an apparent difference in meaning; it does not license silently normalizing all texts to one form.

### Learner-facing illustration
- Present: **Ez dinivîsim.** — I write / I am writing.
- Past transitive illustration using the past stem documented by Kurdîzan: **Min namek nivîsand.** — I wrote a letter.

The second sentence is a transparent teaching illustration built from the documented past stem and the standard transitive alignment; it is not claimed as a verbatim literary quotation or as a corpus-attested sentence. A final lesson should source-check the noun phrase and spelling against the chosen course reference before publication.

### Alignment
For a transitive past clause, the agent takes an oblique pronoun (e.g. **min**) and the direct patient remains nominative/direct (e.g. **namek**). With a third-person singular patient, the verb is unmarked: **nivîsand**. When the direct patient is a first- or second-person pronoun, agreement must be shown on the verb; do not extrapolate a complete paradigm until the precise forms have been checked in a primary grammar.

## 2. Kirin — simple past and present stems
**Infinitive:** kirin  
**Past stem:** kir-  
**Present stem:** k-

Examples of the stem contrast:
- Past stem: **kir**.
- Present: **ez dikim** (“I do / make”), built with the present aspect marker and the present stem.

For a transitive simple-past clause with a third-person singular direct patient:
- **Min kar kir.** — I did the work. (pedagogical illustration, not a sourced quotation)
- **Me limêj kir.** — We prayed. (published linguistic example from Bedir Khan and Lescot, cited in a study of verbal compounds).

The verb does not take an agent-person ending merely because English says “I” or “we.” The agent is oblique (**min, me**), and the nominal patient controls agreement. In **me limêj kir**, **limêj** is the direct nominal component and the auxiliary **kir** is third-person singular.

## 3. Kirin as a light verb in compounds
Kurmancî makes extensive use of compounds with a meaningful nominal/adjectival element plus an auxiliary, especially **kirin** and **bûn**. Examples documented in the beginner reference include:
- **bawer kirin** — to believe
- **ava kirin** — to set up / establish
- **amade kirin** — to prepare
- **tijî kirin** — to fill
- **nimêj kirin** — to pray

The syntactic behaviour of the auxiliary matters. The study *Ergativity in New West Iranian* explicitly states that Northern Kurdish compounds with **kirin** or **dan** are treated as transitive in the past and follow the ergative pattern, even where the meaning of the whole compound may seem semantically intransitive. The nominal part behaves like the direct object. Its example **me limêj kir** is particularly useful because English “we prayed” may tempt a learner to choose a nominative agent and intransitive agreement; the Kurmanji construction instead uses the oblique agent **me** and the direct nominal **limêj**.

**Teaching recommendation:** explain the compound as a grammatical construction, not by translating its overall meaning and guessing whether the Kurdish auxiliary is transitive.

## 4. Negation and aspect distinctions
- The general simple-past negative prefix is **ne-**: **min namek nenivîsand** / **min kar nekir** are regular-rule teaching illustrations, not independently sourced literary tokens.
- Progressive/habitual past adds **di-** to the past stem in the standard description: compare present **dinivîsim** with past progressive **min dinivîsand** only when the chosen reference's aspect paradigm is followed. Do not conflate **di- + past stem** with simple past **nivîsand**.
- A past participle is not a finite simple-past verb. Thackston §19 gives **kirî** as the past participle of **kirin** (“done”), contrasting it with finite past **kir**. Do not treat **kirî** as the third-person simple-past form.

## 5. Evidence grading and instructional limits
| Claim | Evidence | Safe use |
|---|---|---|
| kirin past stem **kir-**, present stem **k-** | Multiple grammar/teaching sources | Core lexical stem entry |
| Standard transitive past ergativity | University of Arizona; Zimanzan; linguistic study | Core grammar rule |
| Compounds with kirin behave as transitive in past | Peer-reviewed/academic linguistic analysis | Teach explicit light-verb exception |
| **me limêj kir** | Cited linguistic example from Bedir Khan & Lescot | Use as sourced grammar example |
| nivîsandin past stem **nivîsand-**, present **nivîs-** | Kurdîzan stem table | Record with source-specific label |
| **nivîsîn / nivîsandîn** both mean “to write” | Thackston §28 | Preserve lexical naming variation |
| **ez dinivîsim** | University of Arizona paradigm | Core present example |
| Literary quotation for nivîsandin | Not independently page-checked | Do not claim literary attestation |

## Sources
1. Kurdîzan, “Reha demên borî · Past stems,” lists **kirin → kir / k** and **nivîsandin → nivîsand / nivîs**: https://kurdizan.net/ders/reha-demen-bori
2. University of Arizona, Iranian Languages, “Northern Kurdish (Kurmanji),” present paradigm **ez dinivîsim** and past ergative agreement overview: https://iranian-languages.arizona.edu/node/7
3. W. M. Thackston, *Kurmanji Kurdish: A Reference Grammar with Selected Readings*, §28 (“Factivite Verbs”), notes **nivîsîn** and **nivîsandîn** both mean “to write”; §19 gives **kirî** as the participle of **kirin**: https://www.kurdipedia.org/files/books/2013/92279.PDF
4. “Ergativity in New West Iranian,” §6 “Verbal compounds,” explicitly analyzes Northern Kurdish **kirin** compounds as transitive in the past and gives **me limêj kir**: https://www.asau.ru/files/pdf/2292932.pdf
5. *Kurmanji Kurdish for the Beginners*, chapter on past stems and compounds, examples including **bawer kirin**, **ava kirin**, **nimêj kirin**, and **kirin → kir**: https://internationalistcommune.com/wp-content/uploads/2024/01/kurmanji-basic.pdf
6. Zimanzan, “The past tense in Kurmanji,” past stem formation, oblique agent, object agreement and **ne-** negation: https://zimanzan.com/kurmanji/grammar/past-tense
7. *Kurmanji Kurdish*, §18.5–19, stylistic loss of ergativity with content clauses and past participle formation: https://kurdshop.net/content/upload/1/root/kurmanji-complete.pdf
8. “Kurmanji in Turkey: structure, varieties, and status,” discussion of transitive ergative alignment and dialect variation: https://www.kurdipedia.org/files/relatedfiles/2022/421405/0001.PDF?ver=133015095582735503

## Verification metadata
- Research date: 2026-11-17.
- Documentation-only commit on `fix/kurmanji-ci-current-migration`.
- Pre-work backup: `backup/b3-nivisandin-kirin-evidence-before-2026-11-17`, exact starting commit `f43fd895c7f345810f0a6e59eec68872220c7403`.
- `main` expected unchanged at `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`.
