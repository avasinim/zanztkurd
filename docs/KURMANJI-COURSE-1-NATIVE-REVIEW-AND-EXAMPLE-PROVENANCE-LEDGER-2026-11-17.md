# Course 1 — Native Review and Example Provenance Ledger

**Date:** 2026-11-17  
**Repository:** `avasinim/zanztkurd`  
**Working branch:** `fix/kurmanji-ci-current-migration`  
**Baseline HEAD:** `072f938cb3b1580cf6ad77ba3cb85614351206f4`  
**Pre-work backup:** `backup/c1-native-review-ledger-before-2026-11-17`  
**Course inventory:** 26 lessons; unchanged  
**Purpose:** Operationalize the five existing claim-level evidence registers and the later Lesson 23–26 audits into a traceable review workflow. This ledger is a review-control document, not a claim that an external native editor has completed any review.

## 1. Current disposition

The repository already contains five claim-level evidence registers covering Lessons 01–26. They distinguish supported grammatical propositions from partial examples, unresolved scope, and editorial work. The integrated report and its reconciliation addendum provide cross-course priorities.

This ledger does not duplicate those detailed claim records or invent new source locators. It supplies a single operational route for moving each claim/example through source verification, dialect classification, native Kurmanji review, and Sorani copy-edit.

**Important status boundary:** repository evidence reviews are not equivalent to native-speaker approval. No external reviewer identity, review date, audio validation, or signed approval is recorded by this document. All such fields remain pending until a real reviewer supplies them.

## 2. Canonical evidence records

Treat these five registers as the source of truth for existing claim IDs, current evidence labels, citations and proposed actions:

| Lessons | Canonical register | Current evidence posture |
|---|---|---|
| 01–06 | `docs/KURMANJI-COURSE-1-LESSONS-01-06-CLAIM-LEVEL-EVIDENCE-REGISTER-2026-11-16.md` | Core alphabet and vowel model has support; definitions, IPA, lexical glosses, R/RR, and digital sorting still have pinpoint/source or editorial gates |
| 07–12 | `docs/KURMANJI-COURSE-1-LESSONS-07-12-CLAIM-LEVEL-EVIDENCE-REGISTER-2026-11-16.md` | Core phrases, pronouns and demonstratives have support; pragmatic context, exact place-name inflections, dialect labels and Sorani glosses remain |
| 13–18 | `docs/KURMANJI-COURSE-1-LESSONS-13-18-CLAIM-LEVEL-EVIDENCE-REGISTER-2026-11-16.md` | Main vocabulary and grammatical patterns have source anchors; exact inflections, variants, sentence naturalness and Sorani explanations require checks |
| 19–24 | `docs/KURMANJI-COURSE-1-LESSONS-19-24-CLAIM-LEVEL-EVIDENCE-REGISTER-2026-11-16.md` | Main interrogative, word-order, adjective, comparison, nominal and possession patterns are documented; construction-specific examples and dialect limits remain |
| 25–26 | `docs/KURMANJI-COURSE-1-LESSONS-25-26-CLAIM-LEVEL-EVIDENCE-REGISTER-2026-11-16.md` plus the later Lesson 25 and Lesson 26 audits | Core case alignment and 31-letter inventory are supported with qualifications; exact examples, r/rr scope, and recap coverage remain gated |

Related integrated documents:
- `docs/KURMANJI-COURSE-1-INTEGRATED-26-LESSON-CLAIM-EVIDENCE-MATRIX-AND-CLOSURE-PLAN-2026-11-16.md`
- `docs/KURMANJI-COURSE-1-26-LESSON-INTEGRATED-EVIDENCE-CLOSURE-REPORT-2026-11-17.md`
- `docs/KURMANJI-COURSE-1-INTEGRATED-AUDIT-RECONCILIATION-ADDENDUM-2026-11-17.md`

Later detailed audits for Lessons 17–26 supersede earlier broad summaries where they add a more precise construction, scope or source check. Keep both records; do not erase historical findings.

## 3. Lesson-by-lesson review queue

The “priority evidence focus” column identifies the work still required; it does not imply that the underlying linguistic proposition is false. “Exact examples” means every learner-facing sentence, phrase, paradigm cell, word/gloss pair, dialogue turn, IPA item and assessment prompt in that lesson.

| Lesson | Topic | Priority evidence focus | Required human review |
|---:|---|---|---|
| 01 | Kurmanji, language, script and orthography | Pinpoint definitions; scope of Hawar-based written target; preserve dialect distinction | Kurmanji terminology and Sorani conceptual wording |
| 02 | Hawar alphabet and letter classes | Exact 31-letter sequence; 8 vowel/23 consonant classification; digital sorting requires technical Unicode source | Alphabet sequence and Sorani labels |
| 03 | Vowels and IPA | Each grapheme–sound–IPA–word correspondence; regional vowel realization; all word glosses | IPA/phonetics specialist and Sorani editor |
| 04 | Consonants and pronunciation | Grapheme vs phoneme vs phonetic realization; R/RR; aspiration vs pharyngealization | Phonetics specialist; no universal R/RR spelling claim without pinpoint evidence |
| 05 | Marked Hawar letters | Each marked letter and each lexical example/gloss | Native lexical and Sorani review |
| 06 | Reading and writing words | Exact spelling, IPA, lexical sense and any dictionary/audio resource description | Native reading/pronunciation check; audio is not a runtime dependency |
| 07 | Common words and phrases | Rojbaş/Roj baş house style; spas/sipas variants; register and glosses | Native phrase/register check and Sorani copy-edit |
| 08 | Writing vs pronunciation | Distinguish aspiration and pharyngealization; scope dialectal phonetics and orthography | Phonetics specialist and variety label |
| 09 | Personal/place names | Exact forms after `li`/`ji`; Amedê and Qamişloyê; local naming preference | Native sentence and locality review |
| 10 | Beginner expressions | Addressee number, time-of-day use, apology/farewell pragmatics and dialogue naturalness | Native dialogue review and Sorani pragmatics |
| 11 | Personal pronouns | Direct/Oblique forms; copular endings; do not equate case with subject/object; cross-reference `xwe` | Morphosyntax review and Sorani terminology |
| 12 | Demonstratives | `ev/ew` as demonstrative/pronoun; oblique paradigm; noun-phrase examples | Case and dialect review |
| 13 | Cardinal numbers | Variant spellings; inflected object/duration forms; every example's morphology | Native numeral and sentence review |
| 14 | Colours and everyday objects | Reconcile count/list mismatch; lexical choice; object/locative morphology | Native vocabulary review and Sorani consistency |
| 15 | Family vocabulary | Gender with each noun; kinship sense and regional forms; possessive ezafe | Native lexical/gender review and Sorani gloss |
| 16 | Weekdays and time | Weekday forms, temporal inflection, tomorrow vs morning, future construction | Native temporal usage review |
| 17 | Present tense | Present stems, irregular `çûn/hatin`, `hîn bûn`, person endings | Native paradigm and clause review |
| 18 | Negation | `na-`, `ni-`, `ne-`, negative imperative, copular/existential distinctions | Native paradigm review; scope exceptions |
| 19 | Questions | `kî/kê`, `çend/çiqas`, wh-in-situ limits, `ma/gelo` pragmatics | Native question/answer and discourse review |
| 20 | Word order | Neutral SOV vs focus/fronting; goal/recipient placement; past-transitive alignment | Native prosody/context review; source-backed examples |
| 21 | Adjectives and ezafe | Head noun gender/number agreement; attributive vs predicative adjective; indefinite forms | Native paradigm review; cross-check case/ezafe distinction |
| 22 | Comparatives/superlatives | `-tir`, `ji`, `-tirîn`, `herî`; lexical alternants and gloss accuracy | Native lexical and syntactic review |
| 23 | Definiteness and demonstratives | No dedicated definite suffix in described standard; `-ek`, case/ezafe ambiguity, demonstrative obliques, regional plural `-in` | Native nominal paradigm review |
| 24 | Possession and reflexives | Oblique possessors; ezafe agreement on head; same-clause `xwe`; free ezafe `yê/ya/yên` | Native syntax review with contextual examples |
| 25 | Direct/Oblique case | Canonical present/past transitive alignment; other oblique functions; masculine singular and plural variation | Native morphosyntax review; preserve variety qualification |
| 26 | Recap and self-assessment | R/RR claim; all recap examples; lesson coverage; checklist/task alignment | Native review of examples; Sorani review; assessment-design review |

## 4. Required claim-level record

For every claim in the canonical registers, and for every exact learner-facing example, maintain one record with the following fields. Do not combine several unrelated examples into one approval row.

| Field | What must be recorded |
|---|---|
| Record ID | Existing claim ID (for example `C1-L01-01`) or a stable example ID assigned in the review copy |
| Lesson / location | Lesson number, section, table row, exercise number or exact line |
| Claim type | Orthography, phonology, morphology, syntax, lexicon, pragmatics, Sorani gloss, pedagogy or technical |
| Exact learner-facing text | Verbatim Kurmanji form/sentence and the current Sorani gloss |
| Intended meaning | Context-specific translation, not a decontextualized one-word gloss |
| Source | Full bibliographic source and exact page/section/table/URL |
| Evidence relation | Direct quotation/attestation, close paraphrase, adapted model, independent descriptive support, or no source found |
| Reference variety | Explicit named variety/standard; never leave regional scope implicit |
| Register/context | Spoken/written, formal/informal, addressee, discourse setting, prosody where relevant |
| Evidence status | Supported, supported with scope, partial, unresolved, editorial, or contradicted |
| Kurmanji reviewer | Reviewer name/role and review date; blank until actually reviewed |
| Kurmanji decision | Accept, revise, reject, or defer, with reason |
| Sorani reviewer | Reviewer name/role and review date; blank until actually reviewed |
| Sorani decision | Accept, revise, reject, or defer, with reason |
| Owner decision | Pending until owner/editor approves any proposed content change |
| Change reference | Later approved PR/commit only; do not pre-fill or imply approval |

### Provenance vocabulary

Use one of these labels for each example:

- **VERBATIM-ATTESTED:** the exact Kurmanji form and relevant context are located in a source; record the exact page/section.
- **ADAPTED-FROM-SOURCE:** a source provides the model, but the course wording or inflection has been altered; disclose the adaptation.
- **INSTRUCTOR-CREATED:** authored for teaching; not a source quotation. Requires native review.
- **LEXICAL-LOOKUP:** a headword/gloss cross-checked in a dictionary; does not by itself validate a sentence.
- **UNVERIFIED:** no sufficient source or reviewer decision yet.

Do not use “source-backed” as a blanket label for an entire lesson when only its general rule is supported.

## 5. Evidence and review status vocabulary

Keep these dimensions separate; a claim can be grammatically supported while its example remains unverified and its Sorani explanation remains unreviewed.

**Linguistic evidence**
- SUPPORTED
- SUPPORTED-WITH-SCOPE
- PARTIAL
- UNRESOLVED
- CONTRADICTED
- NOT-APPLICABLE

**Example provenance**
- VERBATIM-ATTESTED
- ADAPTED-FROM-SOURCE
- INSTRUCTOR-CREATED
- LEXICAL-LOOKUP
- UNVERIFIED

**Human review**
- NOT-STARTED
- IN-REVIEW
- ACCEPTED
- REVISION-REQUESTED
- REJECTED
- DEFERRED

A blank reviewer field means no reviewer approval is recorded. Never infer approval from the presence of a source citation or from an assistant-generated audit.

## 6. Source hierarchy and limits

Use the following hierarchy, while respecting the scope of each source:

1. Peer-reviewed descriptive work and specialist grammars for grammatical systems and documented variation (notably Haig 2018; Haig & Öpengin; Baker & Atlamaz; Gündoğdu where relevant).
2. Reference grammars such as Thackston for paradigms and corroboration, with date and variety limitations recorded.
3. Specialist dictionaries for lexical headwords and senses; not as sole proof of full sentence naturalness.
4. University teaching resources for accessible corroboration; not as sole authority when an internal inconsistency or dialect scope is known.
5. Instructor-created examples, which remain instructor-created until independently reviewed.

For every disputed claim, capture a page/section locator. If a source cannot be inspected at the necessary granularity, mark the locator as pending rather than inventing one.

## 7. Release gates

No course lesson should be called fully validated until all of the following are satisfied:

- The owner/editor has selected the Standard Kurmanjî teaching baseline and written the orthography policy.
- Every learner-facing grammatical rule has a source and an explicit scope.
- Every exact example has provenance and has been checked for grammar, idiomaticity, register and context by a competent native Kurmanji reviewer.
- Every Sorani explanation and gloss has been reviewed by a native Sorani editor.
- Regional variants are labelled, not silently universalized or marked incorrect.
- Cross-lesson paradigms agree (case, ezafe, gender, number, tense, negation and pronouns).
- Lesson 26 remains formative unless a separately designed and validated assessment is approved.
- The owner explicitly approves any actual content changes before they are applied.

Technical release gates (seed parity, disposable database tests, authentication, RLS, progress persistence, PR review and deployment) remain separate and are not satisfied by this linguistic ledger.

## 8. Current high-priority examples and claims to resolve first

1. **Lessons 4 and 26 — `r/rr`:** preserve the 31-letter inventory and `roj`; do not teach a universal spelling contrast. Any narrower claim requires an exact source passage and native review.
2. **Lessons 9 and 16 — inflected place/time forms:** check the exact inflected examples in their intended contexts; general grammar references do not automatically authenticate every toponym or temporal clause.
3. **Lessons 17–20 — authored clauses:** verify each inflected verb, negative form, interrogative, word order and discourse context. A grammatical pattern does not validate every sentence.
4. **Lessons 21–25 — nominal paradigms:** validate the interaction of head noun gender/number, ezafe, indefiniteness, case, possessors and `xwe` in full noun phrases and clauses.
5. **Lesson 26 — recap:** review every sentence and align each self-assessment statement with an observable task; retain the non-certification disclaimer.
6. **All lessons — Sorani:** conduct a separate Sorani terminology, spelling, punctuation and translation review. Kurmanji sources cannot certify Sorani copy.

## 9. Change-control statement

This ledger is documentation-only.

- No lesson text or seed payload was changed.
- No application code, tests, CI, schema or migration was changed.
- No database was accessed.
- No PR was edited, approved or merged.
- No deployment was made.
- Course 1 remains 26 lessons.
- No native-speaker or Sorani-editor approval is claimed.
- Any later content edits require explicit owner approval.

## 10. Post-commit verification

After this file is committed, verify that the working branch differs from the baseline by exactly this new file, the post-work backup points to the resulting commit, the file blob SHA matches on both refs, all seed blobs remain unchanged, and `main` remains at `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`.
