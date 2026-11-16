# B0 Lessons 01–04 — Exact-String Reviewer Annotation Pack
**Date:** 2026-11-16  
**Repository:** `avasinim/zanztkurd`  
**Working branch:** `fix/kurmanji-ci-current-migration`  
**Baseline:** `4ac8ceb187e659ce8a7819ca941611925482dd7a`  
**Status:** reviewer worksheet only; no learner-facing lesson text changed; no release approval.

## 1. How to use this pack

This document converts the existing QA findings into an exact-string review assignment for a proficient Kurmanji editor and a Kurmanji linguist. It quotes the current draft strings so reviewers can annotate them without searching through multiple files.

For every item, the reviewer should record:
- **Decision:** accept / revise / reject / needs context;
- **Replacement:** exact approved Kurmanji wording, if revision is needed;
- **Reason:** morphology, syntax, idiom, register, semantics, orthography, pedagogy, or evidence;
- **Variety:** the variety/register in which the wording is accepted;
- **Reviewer and date:** named sign-off.

Do not treat a blank field as approval. If a phrase depends on a variety that the project has not selected, mark it **blocked — variety decision required**. This pack is not permission to modify the lesson drafts.

## 2. Lesson 01 — `Bi xêr hatin û zimanê polê`

### 2.1 Greetings and dialogue

| ID | Exact current string | Review question | Required annotation |
|---|---|---|---|
| L01-G01 | `Silav!` | Is this the natural neutral greeting for the selected learner variety and register? | Accept/revise + context |
| L01-G02 | `Tu çawa yî?` | Is the spelling, person marking and informal singular form correct? Is it suitable as the first beginner question? | Accept/revise + morphology |
| L01-G03 | `Ez baş im, spas.` | Is the response idiomatic and natural in this exchange? Is punctuation/word order appropriate? | Accept/revise + pragmatic note |
| L01-G04 | `Roj baş!` | Is it natural as a greeting in the selected variety and at the intended time/context? | Accept/revise + usage note |
| L01-G05 | `Bi xatirê te!` | Is this the appropriate leave-taking formula? Is it natural for both speakers to repeat it in adjacent turns? | Accept/revise + dialogue repair |
| L01-G06 | `Spas! — Ser çavan!` | Does this response pair work naturally in the selected variety? Does `Ser çavan` carry the intended response meaning here? | Accept/revise/reject + pragmatic evidence |

**Dialogue-level review:** the current dialogue has the same farewell formula on both sides. Please propose a natural two-turn leave-taking exchange if repetition is not idiomatic. Do not merely approve each line separately; assess the sequence as a whole.

### 2.2 Classroom instructions and glosses

| ID | Exact instruction | Current gloss / action | Review requirement |
|---|---|---|---|
| L01-I01 | `Binêre.` | `Li tiştekî binêre.` | Check imperative form, stem, person/number, complement and natural classroom use. |
| L01-I02 | `Bixwîne.` | `Nivîsê bixwîne.` | Check imperative morphology and whether the object/gloss naturally means “read the text”. |
| L01-I03 | `Binivîse.` | `Tiştekî binivîse.` | Check imperative and whether this object is a natural instruction. |
| L01-I04 | `Dubare bike.` | `Gotinê careke din bêje.` | Check whether the short command is complete and idiomatic; verify the expanded gloss. |
| L01-I05 | `Nîşan bide.` | `Tiştê ku tê xwestin nîşan bide.` | Check the construction and whether the object/complement is natural. |
| L01-I06 | `Hilbijêre.` | `Yek ji wan hilbijêre.` | Check imperative and complement construction. |
| L01-I07 | `Raweste.` | `Dawî bike û bisekine.` | Determine the intended action: stop, wait, stand still, or finish. These meanings must not be conflated. Recommend one unambiguous classroom action and gloss. |

For every imperative, identify the infinitive/verb entry used to derive it, the intended person and number, and any stem alternation. Confirm whether the form is suitable for informal singular address. A grammar paradigm alone does not establish that a classroom phrase is idiomatic.

### 2.3 Assessment and role-play strings

| ID | Current wording | Review requirement |
|---|---|---|
| L01-A01 | `Du kes cara yekem hev dibînin. Silav bikin û xatirê hev bixwazin.` | Check whether the scenario naturally supports both greeting and leave-taking; if not, revise the scenario or split it into two activities. |
| L01-A02 | `Her kes herî kêm du gotinan bi kar bîne.` | Check instruction clarity and whether “at least two expressions each” is expressed naturally. |
| L01-A03 | `di axaftina kurt de rêza gotinan bişopîne` | Clarify whether the rubric assesses dialogue sequence or syntactic word order. The current criterion is ambiguous. |

### 2.4 Glossary consistency

Review these exact entries together with their use in the lesson:
- `silav` — `gotina destpêka civînê`
- `spas` — `gotina spasiyê`
- `baş` — `rewşeke erênî`
- `xatir` — `di gotina xatirxwestinê de tê bikaranîn`
- `bixwîne` — `nivîsê bixwîne`
- `binivîse` — `nivîsê binivîse`

Check that each definition is a natural learner-level explanation, not a literal translation or a circular definition.

## 3. Lesson 02 — `Tîpên kurmancî`

### 3.1 Alphabet and scope

Current inventory:
`A B C Ç D E Ê F G H I Î J K L M N O P Q R S Ş T U Û V W X Y Z`

Review:
1. Confirm exact sequence, count of 31, and upper/lowercase correspondence.
2. Confirm the five diacritic letters remain distinct in teaching, data storage, search and sorting.
3. Confirm the lesson explicitly scopes this as the adopted Hawar-based Kurmanji alphabet, not a universal alphabet for every Kurdish variety/script or an exhaustive transcription inventory.
4. Confirm any additional symbols used for loanwords, names or phonetic transcription are covered by a separate policy rather than silently added to the 31-letter learner inventory.

### 3.2 Sequence-completion answer key

The five exercise items are:

| Prompt | Proposed key from the displayed sequence | Review |
|---|---|---|
| `A, B, C, ___, D` | `Ç` | Verify |
| `E, ___, F` | `Ê` | Verify |
| `I, ___, J` | `Î` | Verify |
| `R, S, ___, T` | `Ş` | Verify |
| `U, ___, V` | `Û` | Verify |

These answers follow the sequence already printed in the draft. They are a proposed editorial completion, not a lesson-file change.

### 3.3 Technical test assignment

Do not mark the keyboard task complete until a technical reviewer records:
- operating system, keyboard layout and input method tested;
- uppercase and lowercase entry for `ç, ê, î, ş, û`;
- copy/paste and display in the supported font(s);
- NFC and NFD normalization behavior;
- equality/search behavior for canonically equivalent forms;
- sorting/collation behavior and whether the diacritic letters are preserved;
- confirmation that no sanitizer, transliteration or normalization step strips marks.

## 4. Lesson 03 — `Tîp, deng û peyv`

### 4.1 Critical conceptual string

**Current sentence:**
`Peyv ji tîpên nivîskî pêk tê û di axaftinê de tê gotin.`

**Finding:** this wording makes the lexical word appear to be constituted by written letters and then spoken. It conflates the written representation with the spoken realization.

**Required correction intent (not final Kurmanji wording):**
1. Define a written word as a sequence/representation of written graphemes.
2. Define a spoken word as a lexical item realized in speech sounds.
3. Explain that written and spoken forms are related representations of a word; speech does not depend on writing.
4. Keep the B0 explanation short and concrete.
5. Have a proficient Kurmanji editor author the final sentences and a linguist verify the conceptual distinction.

**Do not** accept a mechanical translation of an English definition as the final answer.

### 4.2 Terminology to align

| Term in draft | Intended concept | Reviewer decision needed |
|---|---|---|
| `tîp` | written letter/grapheme | Is this the best consistent B0 term? |
| `deng` | speech sound in this lesson | Is the meaning sufficiently clear, or is a modifier needed? |
| `peyv` | lexical word, spoken or written | Ensure definition does not make writing a prerequisite. |
| `nivîs` | written form/text | Check distinction from the physical act of writing. |
| `veqetandin` | segmentation/separation | Confirm it is natural for “separate the letters”. |

### 4.3 Exercise and answer-key audit

Current example words:
`mal, nan, av, roj, şev, çav`

Current written segmentation:
- `mal` → `m — a — l`
- `nan` → `n — a — n`
- `av` → `a — v`
- `roj` → `r — o — j`
- `şev` → `ş — e — v`
- `çav` → `ç — a — v`

Review requirements:
- Confirm all spellings and meanings are appropriate for the selected variety.
- Label this activity as **written-letter/grapheme segmentation**, not phoneme counting or syllable counting.
- Confirm `ş` and `ç` are each treated as one Hawar letter in this task.
- Add a complete key for all questions, including first/last-letter identification and the tîp-versus-deng choices.
- Check that no instruction implies a one-to-one mapping between every written letter and every speech sound.

## 5. Lesson 04 — `Dengdêr di peyvan de`

### 5.1 Definition needing conceptual precision

**Current sentence:**
`Dengdêr tîpek e ku di avakirina peyvê de dengê bingehîn ê wê beşê peyvê nîşan dide.`

**Finding:** the sentence defines a vowel as a letter while also describing it through sound. It may be acceptable as a simplified orthographic explanation only if the lesson consistently distinguishes the written vowel letter from the vowel sound.

**Required correction intent:**
- In the learner-facing B0 section, name the eight written vowel letters/graphemes.
- Explain that speech sounds are heard, not seen.
- Avoid claiming that a grapheme and a phoneme are the same kind of object.
- Keep phonemic/phonetic detail and IPA out of the beginner learner body unless separately approved.

### 5.2 Eight-letter list and example mapping

Current mapping:
| Grapheme | Current example | Review focus |
|---|---|---|
| `a` | `mal` | Verify spelling, meaning and target-variety suitability |
| `e` | `em` | Verify source and weak-vowel classification |
| `ê` | `sêv` | Verify spelling, meaning and source |
| `i` | `dil` | Verify source attribution; prior QA did not find this item in Haig's cited table |
| `î` | `spî` | Verify spelling, meaning and source |
| `o` | `toz` | Verify spelling, meaning and source |
| `u` | `guh` | Verify spelling, meaning and source |
| `û` | `bûk` | Verify spelling, meaning and source |

The prior source review found Haig examples for `mal, sêv, spî, bûk, toz, em, guh` and others, but did not locate `dil` in the cited Haig tables. Keep item-level provenance. Either cite `dil` to the separate University of Arizona reference or replace it with an editor-approved example whose source is clear.

### 5.3 Contrast exercise: incomplete contrast

Current exercise:
- `e / ê` — `sêv`
- `i / î` — `spî`
- `u / û` — `bûk`

**Issue:** each item shows only one member of the contrast. A learner cannot compare both sides from the current examples.

**Required correction intent:** construct three minimal beginner-friendly contrast sets that include an example containing each member of each pair. Verify the words and their meanings with the selected variety and a reliable source. Do not manufacture lexical examples simply to fill a table. The prior QA listed `em/sêv`, `dil/spî`, and `guh/bûk` as candidate pairs, but `dil` needs separate source attribution and every pair still requires editorial approval.

### 5.4 Instruction and glossary consistency

Current exercise wording includes:
- `Tîpa dengdêr bibîne`
- `Tîpê bi peyvê re girê bide`
- `Tîpên dengdêr di bin de xêz bike`

Glossary includes:
- `binê xêzê de bîne` — `xêzekê li binê tiştekî çêke`

Review that the command, glossary definition and answer key all use one natural, consistent expression for “underline”. Check the morphology and agreement of every imperative.

## 6. Owner decisions — must not be inferred by the reviewer

| Decision | Options to consider | Current status |
|---|---|---|
| Reference variety | named reference variety, or explicitly bounded pluricentric policy | Unresolved |
| Orthographic house style | Hawar baseline plus documented handling of variants/loanwords/transcription | Unresolved |
| Learner-facing citations | source notes visible to learners vs teacher-only references | Unresolved |
| Authored examples | allow reviewed instructor-created examples with clear provenance vs require corpus attestation | Unresolved |
| Audio/pronunciation | written-only B0 until spoken variety and rubric are approved | Unresolved |
| Editorial ownership | named proficient Kurmanji editor and linguist | Unresolved |

## 7. Reviewer sign-off record

Complete one record per reviewer; attach annotated copies or exact replacement strings.

| Field | Entry |
|---|---|
| Reviewer name and role | Pending |
| Language variety / expertise | Pending |
| Lessons reviewed | Pending |
| Exact strings accepted | Pending |
| Exact strings revised | Pending |
| Unresolved strings | Pending |
| Evidence / references checked | Pending |
| Date | Pending |
| Sign-off status | Not reviewed |

## 8. Release gate and repository safety

A lesson may not be marked release-approved until:
1. the owner selects the reference variety and editorial policy;
2. all learner-facing strings have a named proficient Kurmanji editor's decision;
3. the linguist signs off the Lesson 03 and 04 conceptual distinctions;
4. exercise keys are complete and checked against the final prompts;
5. Unicode, keyboard, font and accessibility checks are recorded;
6. the owner explicitly approves the exact correction list.

**Status: REVIEW ASSIGNMENT — NOT APPROVED FOR RELEASE.** No learner-facing content, existing 38-lesson inventory, seed SQL, migrations, database, application code, CI, `main`, PR #3 or deployment was changed.
