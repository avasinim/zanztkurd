# B3-K123 — Course 2 interrogative-source audit and Lesson 10 evidence update

**Date:** 2026-11-18  
**Repository:** `avasinim/zanztkurd`  
**Branch:** `fix/kurmanji-ci-current-migration`  
**Pre-work HEAD:** `cab40adf6cb2f37e09c4f94152206389d7d4eb7e`  
**Pre-work backup:** `backup/b3-k123-interrogative-source-audit-before-2026-11-18`  
**Main baseline:** `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`

## 1. Scope and boundary

Read-only source discovery and evidence classification for the unresolved interrogative section in Course 2 Lesson 10. No lesson body, seed, SQL, migration, database row, page shell, runtime, test, Auth setting, RLS policy, grant, workflow, deployment, PR, merge, or `main` was changed. No new Kurmanji example was inserted into the course.

## 2. Newly verified academic source

Songül Gündoğdu. 2011. *The Phrase Structure of Two Dialects of Kurmanji Kurdish: Standard Dialect and Muş Dialect*. MA thesis, Department of Linguistics, Boğaziçi University.

Repository-hosted full text:
https://digitalarchive.library.bogazici.edu.tr/bitstreams/c22fcd85-97d8-4c48-98ab-8cc623449fff/download

The thesis explicitly distinguishes its discussion of the canonical/standard dialect from Muş Kurmanji (abstract and §1.1). Chapter 1 surveys general Kurmanji morphosyntax; Chapter 4 is explicitly devoted to word-order variation in Muş Kurmanji and states that its data were elicited from native speakers living in Muş (p. 121, footnote 22). These scopes must not be collapsed.

## 3. Interrogative evidence located

### 3.1 General Kurmanji overview — wh-questions

In §1.3.2, “Wh in-situ” (pp. 37–38), the thesis states that wh-words remain in their base positions and provides:

- (42) `Tu di-c-î ku?` — “Where are you going?”
- (43) `Kî pirtûkê di-xwîn-e?` — “Who is reading the book?”
- (44) `Zana či di-xwîn-e?` — “What is Zana reading?”
- (45) `Zana kîngê pirtûkê di-xwîn-e?` — “When is Zana reading the book?”

The same section lists `kî`, `çi`, `ku(der)`, `kîngê`, `kîjan`, `çima`, `çan(kî)`, `çend`, and `çi qas` with English glosses.

**Evidence status:** a substantial candidate source for the Lesson 10 wh-question subsection. The section belongs to the thesis's general Kurmanji morphosyntax overview, but the exact variety attribution of every example is not separately stated in that passage. Before presenting any one of these as a Standard Kurmanji model, confirm the informant/variety provenance with the thesis author or a qualified specialist. Preserve the printed spelling, hyphenation, diacritics and gloss; do not silently normalize.

### 3.2 General overview — yes/no question

In §1.3.4, “Pro-drop” (p. 40), example (50) gives:

`Te vê pirtûkê xilas kir?` — “Did you finish this book?”

Footnote 6 states that Kurmanji yes/no questions do not require a question particle; intonation, including stress on the verb, marks the question.

**Evidence status:** candidate support for a basic yes/no example and intonation explanation in the general overview. The passage does not separately label the example's regional variety. Keep this provenance caveat visible pending specialist confirmation.

### 3.3 Explicitly Muş-labeled yes/no examples — do not generalize

Chapter 4, §4.2.1 (p. 123), discusses yes/no questions in the Muş dialect and gives:

- `Tu vê pirtuk-ê DÎ-XWÎN-Î?` — “Are you reading this book?”
- `Te vê pirtuk-ê XWAND-Ø?` — “Did you read this book?”

The source says the high-pitch-then-fall contour on the verb gives the yes/no reading. Chapter 4's data are explicitly elicited from native Muş speakers (p. 121, footnote 22).

**Evidence status:** source-attested Muş examples only. Do not transfer these exact forms or their case/agreement patterns into the Standard/Cizre-Botan-oriented course as universal forms. They may be useful for a clearly labeled dialect-comparison note, subject to curriculum approval.

## 4. Implications for Course 2 Lesson 10

The previous K119–K121 conclusion that the lesson lacked basic interrogative examples is now refined:

1. A credible academic source with basic wh-question examples and one yes/no question has been found.
2. The source provides an explanation of wh-in-situ and the absence of a dedicated yes/no question particle in its general overview.
3. The source also includes additional yes/no forms in a specifically Muş chapter; these are not interchangeable with the general-overview examples.
4. This is a source-discovery result, not yet an authorization to edit the lesson. The exact variety provenance of the general-overview examples and the Sorani translations still require specialist/native review.
5. No claim is made that the thesis resolves every question type, register, or regional pattern.

## 5. Recommended next action

Ask a Kurmanji linguist/native editor familiar with the course's declared reference variety to confirm:
- whether the p. 37–40 general-overview examples are appropriate for the Standard/Cizre-Botan scope;
- exact transcription, segmentation, gloss and Sorani translation;
- whether a separate, clearly labeled Muş comparison belongs in this beginner course.

Only after that validation should the owner/editor approve a lesson edit. Until then, retain the current lesson text and mark the question-example addition as **source located; variety validation pending**.

## 6. Verification boundary

This pass accessed the full thesis text and inspected the cited sections/pages. It did not perform a live learner test, alter any course payload, or certify Course 2 for release. Course 2 remains **NOT RELEASE-CERTIFIED** because independent pedagogical gaps remain in worked paradigms, morphology, agreement, and assessment design.
