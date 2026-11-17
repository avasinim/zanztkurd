# Kurmanji-medium B0 pilot (Lessons 01–04) — independent-authoring closure review

**Date:** 2026-11-17  
**Repository:** `avasinim/zanztkurd`  
**Working branch:** `fix/kurmanji-ci-current-migration`  
**Baseline HEAD:** `2b9fa880b8e6233ed8f904d7dc6b5c5845e7f5a6`  
**Pre-work backup:** `backup/b0-kurmanji-medium-pilot-closure-before-2026-11-17`  
**Scope:** B0 Pathway B pilot drafts for Lessons 01–04; learner-facing language compliance, linguistic precision, pedagogy, provenance and release gates.  
**Status:** documentation-only review; no draft or learner-facing lesson content edited; no release approval.

## 1. Executive decision

The four B0 drafts provide a useful independent-authorship prototype for a Kurmanji-medium pathway. The learner-facing bodies are predominantly written in Kurmanji and use Hawar-based Latin spelling. They are not yet ready for publication or insertion into the application.

**Disposition: 0/4 pilot lessons release-certified.** This is a gate status, not a finding that every sentence is wrong.

Three distinct kinds of review must not be conflated:

1. **Language-medium compliance:** learner-facing instruction, examples, prompts, answer choices, feedback and glossary definitions must be Kurmanji.
2. **Linguistic and editorial validity:** a proficient Kurmanji editor must check morphology, idiomaticity, terminology, lexical sense, spelling and variety scope.
3. **Instructional validity:** a B0 learner must be able to complete tasks from the Kurmanji input, models, images and demonstrations without an unseen Sorani/English translation.

English in internal metadata, citations and reviewer notes is acceptable. It must not leak into learner-facing payloads. The current drafts' internal English metadata is not itself a language-medium violation.

## 2. Review corpus and authority

Reviewed documents:
- `docs/KURMANJI-MEDIUM-B0-PILOT-LESSONS-01-03-DRAFT-2026-11-16.md`
- `docs/KURMANJI-MEDIUM-B0-PILOT-LESSON-04-VOWELS-DRAFT-2026-11-16.md`
- `docs/KURMANJI-MEDIUM-B0-PILOT-LESSONS-01-03-PHRASE-LEVEL-EDITORIAL-QA-2026-11-16.md`
- `docs/KURMANJI-MEDIUM-B0-LESSONS-01-04-INTEGRATED-CORRECTION-DOSSIER-2026-11-16.md`
- `docs/KURMANJI-MEDIUM-B0-LESSONS-01-04-SPECIALIST-SOURCE-AND-CLAIM-EVIDENCE-REVIEW-2026-11-16.md`
- `docs/KURMANJI-MEDIUM-PATHWAY-INDEPENDENT-AUTHORING-SPEC-AND-B0-PILOT-2026-11-16.md`

This report is a closure/navigation layer over those documents. It does not replace their detailed phrase registers, source locators or proposed corrections.

## 3. Cross-pilot findings

### 3.1 Learner-language compliance

The four drafts' lesson-body headings, instructions, examples, tasks and glossaries are largely in Kurmanji. This is directionally consistent with Pathway B's defining requirement: learner-facing content must be Kurmanji-only.

However, “written in Kurmanji” does not automatically mean “comprehensible to a B0 learner.” The drafts need an explicit language-control pass:
- identify every new instruction verb and model it before independent use;
- keep one new linguistic load per activity;
- ensure glossary definitions use simpler, already taught Kurmanji rather than circular or more difficult metalanguage;
- test whether each prompt can be understood from its model, image or classroom demonstration;
- remove any English/Sorani helper text from the eventual learner payload, while retaining internal reviewer notes outside it.

### 3.2 Reference variety remains a release dependency

The project has proposed Standard Kurmanjî in Hawar-based Latin orthography as the written target, but owner approval remains pending. The spoken reference variety for audio is also undecided.

Therefore:
- the drafts may be reviewed for written-standard consistency, but cannot claim universal spoken naturalness;
- no audio, pronunciation scoring or region-neutral pronunciation claim should be introduced;
- each regional or lexical alternative must be labelled with a source and variety;
- final phrase approval requires a reviewer competent in the selected written target and aware of regional usage.

### 3.3 Provenance boundary

The drafts correctly identify most teaching examples as instructor-created rather than corpus quotations. Preserve this distinction. A source that supports a general alphabet or vowel-system claim does not automatically attest every example word, dialogue, imperative, gloss or task.

Maintain claim-level provenance for linguistic facts and phrase-level review status for authored language. Never label an instructor-created sentence “attested” merely because its grammar resembles a cited paradigm.

## 4. Lesson-by-lesson disposition

| Lesson | Core value | Material blockers | Closure test |
|---|---|---|---|
| 01 — `Bi xêr hatin û zimanê polê` | Practical greetings and classroom language; useful communicative entry point | Greeting/farewell pragmatics; same farewell on both sides; imperative morphology and collocations; ambiguous `Raweste` gloss; artificial first-meeting-and-immediate-farewell scenario; assessment criterion “word order” underspecified | Proficient editor approves every dialogue turn and imperative in context; role-play scenario and scoring criterion are unambiguous; B0 learner can follow instructions with modelling |
| 02 — `Tîpên kurmancî` | Strong visual entry into the 31-letter Hawar inventory and five diacritic letters | The completion exercise's five answers are not all explicitly included in the answer key; keyboard access is assumed rather than demonstrated; NFC/NFD is a teacher technical note, not a learner outcome | Complete answer key includes Ç, Ê, Î, Ş, Û; actual supported-device typing/search/rendering tests pass; diacritics are preserved; alphabet policy is owner-approved |
| 03 — `Tîp, deng û peyv` | Correctly introduces the difference between visible written letters and heard speech | The definition “Peyv ji tîpên nivîskî pêk tê” risks defining a spoken word as composed of written letters; the spoken/written distinction needs a more precise, age-appropriate explanation; every example and definition needs native review | Define a word as a meaningful language unit that can be spoken and written; describe letters as the written representation and sounds as the spoken form; specialist/editor approves the Kurmanji wording and examples |
| 04 — `Dengdêr di peyvan de` | Useful B0 recognition task for eight written vowel graphemes | The lesson sometimes slides from eight vowel letters to eight vowel sounds; definition of `dengdêr` as a “letter” blurs grapheme and sound; `dil` is not among the cited Haig vowel-table examples and needs its own source or replacement; task pairings and terminology need editor review | Keep learner objective explicitly about eight written vowel letters; distinguish grapheme from phoneme in teacher notes; attribute each word example separately; editor confirms all glosses and prompts |

## 5. Priority action register

### P0 — must close before pilot approval

**B0-P0-01 — Approve the written reference target and scope.**  
Owner decision required: confirm or amend the proposed Standard Kurmanjî / Hawar-based written target. Do not treat the recommendation document as approval.

**B0-P0-02 — Repair Lesson 03's concept of “word”.**  
A word is not made out of written letters in the same way in speech. Explain that words can be spoken and written; letters are visible written units, sounds are heard speech units. The final Kurmanji wording must be authored/approved by a proficient editor, not mechanically translated.

**B0-P0-03 — Separate written vowel letters from vowel sounds in Lesson 04.**  
Teach the eight Hawar vowel graphemes as written forms at B0. Keep phonemic inventory and tense/lax analysis in teacher notes, clearly labelled as a particular descriptive analysis of Standard Kurmanjî, not an instruction that every regional pronunciation is identical.

**B0-P0-04 — Certify Lesson 01 phrases and imperatives.**  
The full dialogue and each classroom command need context-sensitive morphology, idiomaticity and register review. Particular attention: `Bi xatirê te`, `Ser çavan`, `Raweste`, `Dubare bike`, `Nîşan bide`, and `Hilbijêre`.

### P1 — must close before wider use

**B0-P1-05 — Complete Lesson 02 answer key and input acceptance tests.**  
List all five sequence answers. Test the actual keyboard/input route, uppercase/lowercase, rendering, copy/paste, search and Unicode normalization on supported devices. Do not strip diacritics.

**B0-P1-06 — Verify phrase-level provenance and lexical glosses.**  
Record whether each example is source-attested, dictionary-checked, editor-created or adapted. In Lesson 04, `dil` needs its own source attribution; do not cite the whole list to Haig if individual items come from different sources.

**B0-P1-07 — Run B0 comprehensibility checks.**  
A small supervised pilot should record where learners cannot understand a Kurmanji instruction without translation. Revise the teaching sequence, not the language-medium rule: use modelling, repetition, gesture, matching and visual context.

### P2 — quality improvements

**B0-P2-08 — Harmonize terminology and teacher metadata.**  
Maintain one approved Kurmanji term for each taught concept; separate internal linguistic labels from beginner-facing wording. Check consistency across the four lessons and the pathway specification.

**B0-P2-09 — Strengthen integrated assessment.**  
Keep the pilot checks formative and task-specific. Add observable reading, writing, recognition and classroom-interaction evidence; do not claim CEFR alignment, certification or pronunciation proficiency from these four lessons.

## 6. Source-backed facts versus editorial decisions

| Claim | Evidence status | Boundary |
|---|---|---|
| Conventional Hawar-based Kurmanji alphabet has 31 letters, including Ç, Ê, Î, Ş, Û | Supported by the specialist source review and technical orthography references | The course must still explicitly adopt its house inventory; keyboard/collation behavior requires technical testing |
| The described Standard Kurmanjî analysis has eight vowel phonemes corresponding to eight vowel letters | Supported by Haig (2018) and Haig & Öpengin (2018) | Do not collapse grapheme, phoneme and phonetic realization into one beginner definition |
| Regional pronunciation and lexical variation exist | Supported by specialist descriptions and regional classification work | No single audio form may be presented as the pronunciation of all Kurmanji |
| Lesson 01 dialogue is idiomatic and natural | Not established by general grammar sources | Requires proficient editor review in the selected target variety |
| Each instructor-selected example is attested | Not established | Verify each example individually; keep source provenance precise |
| B0 learner can understand all Kurmanji-only instructions | Not established by written QA | Requires actual learner observation; language-only compliance is not proof of comprehensibility |

## 7. Acceptance workflow

Do not mark any lesson “approved” until the following record exists for each learner-facing string or grouped task:

1. Exact lesson and string/task ID.
2. Source status: primary-source attested / dictionary-checked / editor-created / adapted.
3. Written variety and any regional scope.
4. Reviewer decision: approve / revise / reject / defer.
5. Reviewer role and review date (identity need not be published publicly).
6. Sorani translation is not used inside Pathway B; any cross-pathway explanation stays in internal editorial records.
7. B0 comprehension evidence: understood independently / understood with modelling / not understood.
8. Final owner approval before payload integration.

A single reviewer should not be treated as proof of universal dialect acceptability. Where forms are region-sensitive, record the scope and, where appropriate, seek a second reviewer.

## 8. Protected scope and next step

- No existing pilot draft was edited.
- No learner-facing lesson, seed SQL, application code, CI, runtime, migration, database or Supabase object was changed.
- No PR, deployment, merge, rebase, force-push or production access occurred.
- The 26 + 12 source inventory is unchanged.
- Pathway A remains Sorani-mediated; Pathway B remains independently authored and Kurmanji-medium.

**Next safe step:** prepare an exact-string reviewer pack for B0 Lessons 01–04 from the existing drafts, preserving every original string and assigning stable review IDs. It should be given to a proficient Kurmanji editor before any wording is changed or inserted into the application.
