# Kurmancî B3 — dîtin û zanîn: simple-past alignment and tense evidence audit (2026-11-17)

## Scope and safety
Documentation-only research. No lesson content, course inventory, runtime, CI, migrations, production data, PR #3, or deployment changed. Course structure remains 26 + 12 lessons. Target variety: Standard Kurmancî in Hawar-based Latin orthography; dialect forms are kept separate.

## Executive findings
- **dîtin** (“to see”) is transitive. Its past stem is **dît-**; in the canonical Standard Kurmancî simple past the agent is oblique, the patient is direct, and the verb agrees with the patient.
- The paradigm is best taught through patient changes, not by mechanically attaching endings to the agent:
  - **Min ew dît** — I saw him/her/it.
  - **Min tu dîtî** — I saw you.
  - **Te ez dîtim** — You saw me.
  - **Min ew dîtin** — I saw them.
- **zanîn** (“to know”) has past stem **zanî-** and present stem **zan-** in Haig & Öpengin (2018). However, Thackston §21.2 explicitly notes that the **past perfect form of zanîn is used as the normal past tense**: **min dizanibû** (“I knew”), negative **min nizanibû**. Therefore a beginner-facing lesson must not present a fully regular simple-past paradigm for zanîn without explaining this lexical/aspectual peculiarity.
- Haig & Öpengin's stem inventory establishes **zanî-** as the past stem, but that fact alone does not establish how a finite simple-past paradigm is normally used in contemporary Standard Kurmancî. Keep morphological stem description separate from frequency and tense semantics.
- A literary token-level citation for dîtin was not independently verified in this pass. The grammar's examples are strong grammatical evidence, but must not be mislabeled as literary corpus evidence.

## 1. Dîtin: canonical transitive simple past
The canonical ergative pattern is:
1. Agent: oblique (**min, te, wî, wê, me, we, wan**).
2. Patient: direct/nominative (**ez, tu, ew, em, hûn, ew**, or a direct noun phrase).
3. Verb: agrees with the patient, not the agent.

| Direct patient | Example | Meaning |
|---|---|---|
| third-person singular | Min ew dît. | I saw him/her/it. |
| second-person singular | Min tu dîtî. | I saw you. |
| first-person singular | Te ez dîtim. | You saw me. |
| first-person plural | Wî em dîtin. | He saw us. |
| third-person plural | Min ew dîtin. | I saw them. |

Thackston §18.2 explicitly lays out this agreement pattern and its negative forms. Zimanzan and Kurdîzan provide accessible teaching explanations and matching examples. These are grammatical attestations, not independent literary quotations.

### Negation
Negative prefix **ne-** attaches to the past form:
- Min ew **nedît**.
- Min tu **nedîtî**.
- Te ez **nedîtim**.
- Wî em **nedîtin**.

Do not confuse simple-past **dît** with the present stem **bîn-** (e.g. **dibînim**).

## 2. Zanîn: exceptional tense usage
Haig & Öpengin (2018) list:
- infinitive: **zanîn**
- past stem: **zanî-**
- present stem: **-zan-**

The present forms are built on **zan-** (e.g. **ez dizanim**, **tu dizanî**, **ew dizane**, **em dizanin**). Its present negative is irregularly formed with **ni-**: **ez nizanim**, **tu nizanî**, **ew nizan(e)**, plural **nizanin**. This is a present-tense peculiarity, not a past-tense rule.

Crucially, Thackston §21.2 states that the **past perfect of zanîn is used as the normal past tense**:
- **min dizanibû** — I knew.
- **min nizanibû** — I did not know.

Thus the teaching priority should be:
- present: **ez dizanim** / negative **ez nizanim**;
- ordinary past meaning “I knew”: **min dizanibû** / negative **min nizanibû**;
- treat a bare finite form based on **zanî-** as requiring context and source verification, rather than assuming it is the normal everyday equivalent of “I knew”.

A lexicon or conjugator may list **zanî-** as the past stem; that is morphological information, not sufficient evidence that **min zanî** is the unmarked ordinary past in Standard Kurmancî. Do not collapse stem inventory, simple-past morphology, and the lexicalized tense choice.

## 3. Simple past, progressive, participle and perfect
- **dît**: simple past with third-person singular patient; **dîtim/dîtî/dîtin** vary according to patient agreement.
- **didît**: past habitual/progressive (“used to see / was seeing”), not simple past.
- **dîtî** can also occur as a past participle in other constructions; identify syntax before classifying it as a finite 2sg agreement form.
- **dîtîye / min dîtiye**: perfect construction, not interchangeable with simple past **min dît**.
- **dizanibû / nizanibû**: Thackston's ordinary past meaning for “knew”; the morphology is past perfect, but its function is not simply equivalent to English pluperfect in all contexts.

## 4. Dialect and alignment cautions
The canonical Standard Kurmancî pattern is not universal across all regional varieties. Haig's discussion of Muş Kurdish reports non-canonical patterns, including double-oblique examples such as **Min te dît-Ø** and **Te min dît-Ø**, with default third-person singular agreement. These examples are dialect-specific and must not replace the Standard Kurmancî learner model.
The Arizona Iranian Languages overview also summarizes the standard contrast: **Min çivîkek dît** (“I saw a bird”) versus **Ehmed ez dîtim** (“Ehmed saw me”). This reinforces that the object, not the agent, controls agreement in the canonical pattern.

## 5. Evidence grading and lesson-review recommendations
- **dîtin past stem and ergative agreement:** strong grammatical-reference evidence (Thackston; Haig & Öpengin; Zimanzan; Kurdîzan).
- **dîtin literary tokens:** not independently established in this audit. Do not claim literary corpus verification.
- **zanîn present and irregular negative:** strong grammatical-reference evidence.
- **zanîn past meaning “knew”:** explicit reference-grammar statement supporting **min dizanibû / min nizanibû** as ordinary past usage.
- **zanî- past stem:** independently listed in Haig & Öpengin's stem inventory; do not infer a complete ordinary-past paradigm from the stem alone.
- No lesson text was edited or approved by this research note.

## Sources
1. W. M. Thackston, *Kurmanji Kurdish: A Reference Grammar with Selected Readings*, §18.2 (ergative dîtin paradigm, object agreement, negatives) and §21.2 (past perfect of zanîn used as normal past; **min dizanibû**, **min nizanibû**): https://www.kurdipedia.org/files/books/2013/92279.PDF
2. Geoffrey Haig & Ergin Öpengin (2018), “Kurmanji Kurdish,” in *The Languages and Linguistics of Western Asia*, stem inventory (**dît-**, **bîn-**, **zanî-**, **-zan-**) and discussion of person marking: https://www.uni-bamberg.de/fileadmin/aspra/06_Team/Publications_and_CV/HaigOepengin2018_Kurmanji_Kurdish_.pdf
3. Zimanzan, “The past tense in Kurmanji,” simple-past transitive alignment and dîtin examples: https://zimanzan.com/kurmanji/grammar/past-tense
4. Kurdîzan, “Doer and object,” lesson 18, dîtin patient-agreement examples and learner errors: https://kurdizan.net/ders/kirde-u-berkar
5. University of Arizona, Iranian Languages, “Northern Kurdish (Kurmanji),” nominative/oblique pronouns and ergative examples: https://iranian-languages.arizona.edu/node/7
6. Haig, “Variation in the Ergative Pattern of Kurmanji,” Muş dialect non-canonical alignment examples: https://www.hewalname.com/ku/wp-content/uploads/2019/03/get-komprimerad.pdf
7. Thackston-hosted accessible grammar mirror, §18.5 (stylistic loss of ergativity with subordinate content clauses) and §19 (past participles): https://kurdshop.net/content/upload/1/root/kurmanji-complete.pdf

## Verification metadata
- Research date: 2026-11-17.
- Documentation-only commit on `fix/kurmanji-ci-current-migration`.
- Pre-work backup: `backup/b3-ditin-zanin-evidence-before-2026-11-17`, at exact starting commit `06848cf9b941faa073cc6cfcf1c97b42c8e6e4a8`.
- `main` expected unchanged at `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`.
