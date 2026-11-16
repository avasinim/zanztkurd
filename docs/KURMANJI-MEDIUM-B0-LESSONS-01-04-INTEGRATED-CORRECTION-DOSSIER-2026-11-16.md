# B0 Lessons 01–04 — Integrated Correction Dossier
**Date:** 2026-11-16  
**Repository:** `avasinim/zanztkurd`  
**Working branch:** `fix/kurmanji-ci-current-migration`  
**Baseline:** `a51af1ca445f37d6efc559cc610f8a6d75d21ace`  
**Status:** proposal-only decision dossier; no lesson text changed; no release approval.

## 1. Purpose and authority

This dossier consolidates the existing linguistic/pedagogical QA of B0 pilot lessons 01–04 into one decision register. It is designed to let the project owner and qualified Kurmanji reviewers decide which corrections to authorize.

It is **not** a replacement lesson set, a native-speaker certification, or a permission to alter learner-facing content. Proposed wording is deliberately expressed as editorial intent where exact Kurmanji phrasing requires a proficient editor. No final Kurmanji sentence is invented here.

**Protected scope:** the four pilot lesson drafts remain unchanged. The existing 38 lessons, seed SQL, migrations, application code, production database, `main`, PR #3, and deployment remain untouched.

## 2. Decision summary

| Lesson | Main issue | Priority | Current decision |
|---|---|---:|---|
| 01 — `Bi xêr hatin û zimanê polê` | Greeting pragmatics, imperative idiom, scenario and assessment clarity | P0 | Hold for Kurmanji editor |
| 02 — `Tîpên kurmancî` | Incomplete answer key; keyboard and Unicode acceptance not demonstrated | P1 | Inventory provisionally retained; close technical/pedagogical gaps |
| 03 — `Tîp, deng û peyv` | Definition wrongly implies spoken word is made of written letters | P0 | Hold; conceptual correction required |
| 04 — vowel graphemes | Written grapheme vs speech sound, incomplete pair contrast, evidence attribution | P0 | Hold; revise task design and terminology after approval |

**Overall:** 0/4 pilot lessons release-certified. This does not mean all content is incorrect; it means the identified release gates remain open.

## 3. Lesson 01 — greetings and classroom language

### 01.1 Greeting and response pragmatics
- **Current text:** `Silav!`, `Roj baş!`, `Tu çawa yî?`, `Ez baş im, spas.`, `Spas! — Ser çavan!`, `Bi xatirê te!`
- **Issue:** the forms are plausible teaching candidates, but this review does not establish that all are idiomatic, pragmatically appropriate, or equally common in the still-unselected reference variety. The dialogue uses `Bi xatirê te!` on both sides.
- **Editorial proposal:** retain these only as provisional examples; ask the language editor to verify each expression, its response pairing, register, and context. If the reciprocal farewell is unnatural in the selected variety, replace one turn with an editor-approved natural response.
- **Evidence:** no grammar reference can certify the pragmatic naturalness of this instructor-authored dialogue. Haig & Öpengin (2018) is useful for variety awareness, not for attesting this exact dialogue.
- **Approval required:** named Kurmanji editor and project owner.

### 01.2 Classroom imperatives
- **Current text:** `Binêre.`, `Bixwîne.`, `Binivîse.`, `Dubare bike.`, `Nîşan bide.`, `Hilbijêre.`, `Raweste.`
- **Issue:** exact morphology, argument structure, object choice, and classroom idiom need review. `Raweste.` may be interpreted differently depending on context; its current gloss combines “finish” and “stop/stand”.
- **Editorial proposal:** check every imperative in the intended second-person singular register; check each gloss as a natural classroom instruction; define one clear action per command. Do not treat the present forms as certified.
- **Evidence:** requires a proficient Kurmanji language editor and, where necessary, a descriptive grammar check. Existing sources establish broad grammatical context but do not validate these exact prompts.
- **Approval required:** Kurmanji editor.

### 01.3 Role-play and scoring
- **Current text:** “Two people meet for the first time. Greet each other and say farewell.”
- **Issue:** the context forces a first meeting and immediate farewell; the assessment criterion about following “word order” does not specify what is being assessed.
- **Editorial proposal:** either create two separate micro-dialogues (meeting and leave-taking) or describe a short encounter that naturally ends. Define the criterion as dialogue-sequence completion or sentence word order—whichever is actually taught.
- **Evidence:** pedagogical design issue; no external linguistic citation needed.
- **Approval required:** instructional designer/project owner.

## 4. Lesson 02 — Hawar alphabet

### 02.1 Inventory
- **Current text:** `A B C Ç D E Ê F G H I Î J K L M N O P Q R S Ş T U Û V W X Y Z`
- **Issue:** 31-letter inventory is consistent with the conventional Hawar Latin alphabet for Kurmanji, with five marked letters `Ç, Ê, Î, Ş, Û`. Avoid presenting this as a universal inventory for every Kurdish script, dialect, transliteration or foreign-word convention.
- **Editorial proposal:** describe it as the **course's adopted 31-letter Hawar inventory**. Keep the five diacritic letters as distinct alphabetic letters in all student-facing materials and technical handling.
- **Evidence:** KNAB, Kurdish/Kurdi (Hawar Roman alphabet); Yari’s alphabet overview as supplementary learner resource; R12a Hawar notes as technical supplementary reference.
- **Approval required:** owner approval of course orthographic policy.

### 02.2 Completion exercise answer key
- **Current text:** five sequence-completion items:
  - `A, B, C, ___, D`
  - `E, ___, F`
  - `I, ___, J`
  - `R, S, ___, T`
  - `U, ___, V`
- **Issue:** the existing answer section does not list the complete answer key for this exercise.
- **Editorial proposal:** add the key: `Ç`, `Ê`, `Î`, `Ş`, `Û`, respectively. Retain the separate upper/lowercase matching key.
- **Evidence:** directly derivable from the displayed alphabet sequence; no external source needed.
- **Approval required:** content owner/editor.

### 02.3 Keyboard and Unicode
- **Current text:** learners are asked to type the five diacritic letters; teacher note mentions NFC/NFD.
- **Issue:** no verified keyboard-layout instructions or acceptance test currently accompanies the activity. Visual display alone does not prove reliable typing, searching, comparison, or sorting.
- **Editorial proposal:** add a platform-neutral input help page only after testing supported devices. Test uppercase/lowercase, copy/paste, NFC/NFD equivalence where appropriate, search, sorting, equality, and preservation of combining marks. Never strip diacritics.
- **Evidence:** technical acceptance testing; R12a and KNAB are supplementary references for orthographic handling.
- **Approval required:** technical owner before implementation; owner approval before changing learner content.

### 02.4 Entry prerequisite
- **Current text:** learner is assumed to identify basic Latin letter shapes.
- **Issue:** may exclude learners without prior Latin literacy.
- **Editorial proposal:** either explicitly state the prerequisite or add a short visual orientation; do not assume it silently.
- **Evidence:** curriculum accessibility decision.
- **Approval required:** instructional designer/project owner.

## 5. Lesson 03 — letter, sound and word

### 03.1 Critical definition of “peyv”
- **Current text:** `Peyv ji tîpên nivîskî pêk tê û di axaftinê de tê gotin.`
- **Issue:** this defines a word as made from written letters and then spoken. Spoken language does not depend on writing; written and spoken forms are related representations, not the same object.
- **Editorial proposal:** replace the conceptual definition with two separate beginner-level statements: (a) a written word is represented by written letters/graphemes; (b) a spoken word is realized through speech sounds. A Kurmanji editor must author the final learner-facing wording. Do not use an unreviewed literal translation.
- **Evidence:** basic distinction between orthography and phonology; specialist Kurmanji descriptive sources (Haig 2018; Haig & Öpengin 2018) provide linguistic context, but the exact beginner wording needs editorial authoring.
- **Approval required:** Kurmanji linguist/editor and project owner.
- **Priority:** P0; block release until resolved.

### 03.2 Consistent terms
- **Current text:** `tîp`, `deng`, `peyv` are introduced with simplified definitions.
- **Issue:** “deng” can mean sound generally, while the lesson intends speech sound; “tîp” is a written unit. The lesson risks conflating visible graphemes with audible segments.
- **Editorial proposal:** maintain a consistent conceptual mapping in teacher documentation:
  - `tîp` / `tîpa nivîskî`: written letter/grapheme;
  - `deng`: speech sound in this lesson's intended sense;
  - `peyv`: lexical word, which may be spoken or written.
  The editor must choose natural Kurmanji learner-level definitions.
- **Evidence:** orthographic/phonological distinction; specialist descriptive sources.
- **Approval required:** language editor.

### 03.3 Grapheme segmentation tasks
- **Current text:** `mal, nan, av, roj, şev, çav` are split into visible letters.
- **Issue:** the activity counts written graphemes, not phonemes or syllables. `ş` and `ç` are each one Hawar letter for this orthographic task.
- **Editorial proposal:** label the task explicitly as segmentation of written letters; keep the task separate from pronunciation or phoneme counting.
- **Evidence:** adopted Hawar inventory and orthographic references (KNAB; R12a).
- **Approval required:** editor.

### 03.4 Answer-key completeness
- **Current text:** key lists some segmented words but not all explicit answers to the prompts.
- **Issue:** self-study learners cannot reliably verify each question.
- **Editorial proposal:** provide a full key for all four prompt types, including first/last grapheme identification and letter-versus-sound choices.
- **Evidence:** internal consistency check against the exercise text.
- **Approval required:** content editor.

## 6. Lesson 04 — vowel letters

### 04.1 Written graphemes vs vowel sounds
- **Current text:** the lesson uses “tîpên dengdêr” and “dengdêr” interchangeably; one definition treats a vowel as a letter and then as a sound.
- **Issue:** this contradicts the distinction taught in Lesson 03.
- **Editorial proposal:** present the eight Hawar written forms as vowel graphemes/letters; define a vowel sound as a speech sound. Keep IPA and technical tense/lax terminology in teacher notes, not B0 learner text.
- **Evidence:** Haig (2018), §2.1.1, pp. 109–112; Haig & Öpengin (2018), §3.1.1. These describe the eight-vowel analysis and map phonological categories to Hawar spellings.
- **Approval required:** linguist/editor.

### 04.2 Contrast exercise does not contrast both members
- **Current text:** `e/ê` shown only with `sêv`; `i/î` only with `spî`; `u/û` only with `bûk`.
- **Issue:** examples contain only one member of each pair; learner cannot discriminate both sides.
- **Editorial proposal:** use paired, editor-verified examples that represent both members, e.g. the reviewed report suggests `em/sêv`, `dil/spî`, and `guh/bûk`. Verify each word's spelling, meaning, target variety, and source attribution before adoption.
- **Evidence:** Haig (2018), pp. 109–112, supports several examples; the prior QA notes `dil` is not found in the cited Haig tables and should be separately attributed to the University of Arizona reference or replaced.
- **Approval required:** Kurmanji editor and linguist.

### 04.3 Full/tense vs weak/lax and vowel length
- **Current text:** teacher notes group five full/tense vowels and three weak/lax vowels.
- **Issue:** learners may misinterpret this as a simple phonemic long/short contrast.
- **Editorial proposal:** keep technical grouping in teacher notes only; preserve the qualification that phonetic length alone is not phonemically distinctive in the cited analysis. Avoid IPA in B0.
- **Evidence:** Haig (2018), §2.1.1, pp. 109–112.
- **Approval required:** linguist/editor.

### 04.4 Source attribution
- **Current text:** example list is collectively attributed to Haig.
- **Issue:** not every word is present in the cited Haig example tables.
- **Editorial proposal:** cite each example individually or label it instructor-created. Specifically review `dil` attribution.
- **Evidence:** Haig (2018), pp. 109–112; University of Arizona, “Kurmanji Kurdish”.
- **Approval required:** research editor.

### 04.5 Glossary and instructions
- **Current text:** glossary wording for “underline” differs from the exercise instruction.
- **Issue:** inconsistent classroom vocabulary and potentially unnatural expression.
- **Editorial proposal:** select one editor-approved Kurmanji instruction and reuse it consistently in prompt, glossary and answer key. Review all imperative forms for idiomaticity.
- **Evidence:** phrase-level language review; no external source can certify local classroom idiom.
- **Approval required:** Kurmanji editor.

## 7. Cross-lesson editorial policy decisions

These are owner-level decisions, not facts to infer from the draft:

1. Select the target Kurmanji reference variety (or explicitly define a pluricentric policy).
2. Approve the orthographic house style and treatment of variants, loanwords and additional transcription symbols.
3. Decide which citations belong in learner-facing material and which remain in teacher/research notes.
4. Decide whether instructor-created examples may be used without corpus citations, provided they are labelled as authored examples and reviewed.
5. Approve the use of written-only B0 assessment until a spoken reference variety and pronunciation rubric are established.
6. Name the language editor and linguist who can sign off the learner-facing material.

## 8. Source register and evidence boundaries

1. **Haig, Geoffrey (2018), “Northern Kurdish (Kurmanjî),”** in *The Languages and Linguistics of Western Asia*, §2.1.1, pp. 109–112.  
   https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf  
   Used for vowel inventory, grapheme mapping, full/weak vowel discussion and phonetic length qualification.

2. **Haig, Geoffrey & Öpengin, Ergin (2018), “Kurmanji Kurdish in Turkey: Structure, varieties, and status,”** especially §3.1.1.  
   https://www.uni-bamberg.de/fileadmin/aspra/06_Team/Publications_and_CV/HaigOepengin2018_Kurmanji_Kurdish_.pdf  
   Used for variety awareness and specialist structural context.

3. **Institute of the Estonian Language, KNAB, “Kurdish / Kurdi” (Hawar Roman alphabet).**  
   https://arhiiv.eki.ee/knab/lat/kblku2.pdf  
   Technical cross-check for the Hawar inventory.

4. **Yari, “The Kurmanji Kurdish alphabet: all 31 letters and how to say them.”**  
   https://yari.krd/learn/kurmanji-alphabet/  
   Supplementary learner-oriented alphabet reference, not sole phonological authority.

5. **R12a, “Kurmanji Hawar orthography notes.”**  
   https://r12a.github.io/scripts/latn/kmr.html  
   Supplementary technical orthography notes.

6. **University of Arizona, Iranian Languages, “Kurmanji Kurdish.”**  
   https://iranian-languages.arizona.edu/node/7  
   Supplementary reference used in the prior QA for vowel mapping and `dil`.

**Evidence boundary:** the sources do not attest the instructor-authored greetings, dialogue, imperatives or complete lesson sentences. Phrase-level naturalness requires a proficient Kurmanji editor. No source list removes the need to select the reference variety.

## 9. Master action register

| ID | Lesson | Action | Priority | Closure proof | State |
|---|---|---|---:|---|---|
| C01 | 01 | Review greetings and response pragmatics | P0 | Named editor sign-off | Open |
| C02 | 01 | Review all classroom imperatives and glosses | P0 | Phrase-level review | Open |
| C03 | 01 | Repair role-play context and clarify scoring criterion | P1 | Pedagogical approval | Open |
| C04 | 02 | Clarify adopted Hawar inventory scope | P1 | Owner policy decision | Open |
| C05 | 02 | Add five missing sequence answers | P1 | Complete answer key | Open |
| C06 | 02 | Test keyboard, Unicode, search and sorting | P1 | Technical test evidence | Open |
| C07 | 02 | Confirm Latin-literacy prerequisite | P2 | Curriculum decision | Open |
| C08 | 03 | Correct written/spoken definition of `peyv` | P0 | Editor-approved wording | Open |
| C09 | 03 | Standardize `tîp/deng/peyv` terminology | P0 | Editorial glossary | Open |
| C10 | 03 | Clarify grapheme segmentation and complete key | P1 | Reviewed task and key | Open |
| C11 | 04 | Separate vowel graphemes from vowel sounds | P0 | Linguist/editor approval | Open |
| C12 | 04 | Rebuild contrast tasks with both members | P0 | Reviewed pair examples | Open |
| C13 | 04 | Tighten length/full/weak terminology | P1 | Linguist review | Open |
| C14 | 04 | Attribute every example individually | P1 | Claim-level source register | Open |
| C15 | 04 | Unify classroom glossary/instruction | P2 | Editor sign-off | Open |
| X01 | All | Select reference variety and house style | P0 | Owner decision record | Open |
| X02 | All | Name language editor and linguist | P0 | Named review assignment | Open |
| X03 | All | Confirm no-audio policy until spoken variety approved | P1 | Owner decision | Open |
| X04 | All | Verify fonts, input, Unicode and accessibility | P1 | Test report | Open |

## 10. Approval and release gates

Before any correction is applied to the lesson files:
1. The project owner approves the proposed correction scope.
2. A proficient Kurmanji editor reviews all learner-facing strings.
3. A Kurmanji linguist reviews the disputed phonological and grammatical claims.
4. The reference variety and editorial house style are recorded.
5. Answer keys are checked against the final exercises.
6. Unicode, keyboard, font and accessibility tests pass.
7. A separate owner decision explicitly authorizes any changes to lesson content.

**Release status: DRAFT — NOT APPROVED.** No corrections in this dossier have been applied. No application lesson records have been changed.
