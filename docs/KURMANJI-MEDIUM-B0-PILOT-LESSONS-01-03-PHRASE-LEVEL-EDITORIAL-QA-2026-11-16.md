# B0 Pilot Lessons 01–03 — Phrase-Level Kurmanji Editorial QA
**Date:** 2026-11-16  
**Repository:** `avasinim/zanztkurd`  
**Working branch:** `fix/kurmanji-ci-current-migration`  
**Reviewed baseline:** `9c25e4b8f6eebcdd928b3c4a435d734778f8539a`  
**Status:** proposal-only editorial review; no lesson text edited; no release approval.

## 1. Executive decision

Lessons 01–03 are structurally usable as beginner drafts, but they are **not linguistically certified**. The main release blockers are:
- phrase-level idiomaticity and morphology in Lesson 01;
- precision and scope of the alphabet/keyboard claims in Lesson 02;
- the definition of “word” and the written/spoken distinction in Lesson 03;
- inconsistent instructional terminology and editorial metadata across the package.

This review flags risk and proposes checks. It does not replace a proficient Kurmanji editor or a specialist linguist. It does not authorize edits to the lesson files.

## 2. Lesson 01 — Bi xêr hatin û zimanê polê

### 2.1 Phrase-level review register

| Current string | Preliminary assessment | Required editorial check |
|---|---|---|
| `Silav!` | Plausible basic greeting | Confirm target-variety register and whether it is the preferred beginner form |
| `Tu çawa yî?` | Morphologically plausible second-person singular question | Confirm punctuation, prosody and whether this is the intended informal singular address |
| `Ez baş im, spas.` | Plausible short response | Check naturalness and whether `spas` is pragmatically positioned naturally |
| `Roj baş!` | Understandable greeting | Confirm time-of-day and regional usage; avoid presenting as universally interchangeable with every greeting |
| `Bi xatirê te!` | Recognizable leave-taking expression | Confirm exact idiomatic form, context and whether the same phrase is natural as both speaker and reply in the dialogue |
| `Ser çavan!` | Recognizable response formula in some Kurmanji usage | Check regional acceptability and whether it is a natural response to `Spas!` in the chosen target variety |
| `Binêre.` | Imperative form requiring context | Verify the intended singular imperative and whether the gloss `Li tiştekî binêre` is idiomatic |
| `Bixwîne.` | Imperative form | Verify the verb form and whether `Nivîsê bixwîne` is the natural classroom collocation |
| `Binivîse.` | Imperative form | Verify the verb and object construction in `Tiştekî binivîse` |
| `Dubare bike.` | Common-looking classroom instruction | Check whether the intended object should be `gotinê`, `vê gotinê`, or another form in the target variety |
| `Nîşan bide.` | Common-looking instruction | Check whether `Tiştê ku tê xwestin nîşan bide` is idiomatic and beginner-friendly |
| `Hilbijêre.` | Imperative form | Verify spelling, morphology and whether the objectless form is clear in isolation |
| `Raweste.` | Potentially ambiguous classroom command | Confirm whether it means “stop”, “wait”, or “stand still” in the intended context; the gloss `Dawî bike û bisekine` may combine more than one action |

### 2.2 Pedagogical and task-design issues

1. **Greeting symmetry:** the dialogue uses `Bi xatirê te!` on both sides. This may be possible as a repeated farewell, but the editor should check whether a more natural reciprocal exchange is needed for the selected variety.
2. **Image matching:** the three image descriptions are not actual supplied assets. If this lesson later uses images, ensure the “two people leave and wave” visual is culturally and semantically unambiguous; do not use it as proof of phrase naturalness.
3. **“First meeting” scenario:** the role-play asks two people who meet for the first time to greet and say farewell immediately. This is a somewhat artificial communicative scenario. Consider changing the context to a short meeting that naturally ends, or split greeting and leave-taking into separate mini-dialogues.
4. **Assessment criterion:** “rêza gotinan bişopîne” (“follow the order of the words”) is underspecified. Define whether it means completing a dialogue in sequence or producing a syntactically well-formed sentence.
5. **Glossary:** `xatir` is explained only as an element in a leave-taking expression. Do not infer a general standalone meaning from that teaching gloss without lexical verification.

### 2.3 Lesson 01 decision

**Needs proficient-editor review before use.** None of the phrases is certified by this report. Prioritize `Bi xatirê te`, `Ser çavan`, `Raweste`, and the full imperative set.

## 3. Lesson 02 — Tîpên kurmancî

### 3.1 Alphabet inventory and order

The displayed sequence is:

`A B C Ç D E Ê F G H I Î J K L M N O P Q R S Ş T U Û V W X Y Z`

This is the conventional 31-letter Hawar inventory commonly presented for Kurmanji Latin orthography. The five marked letters are `Ç, Ê, Î, Ş, Û`, with lowercase `ç, ê, î, ş, û`.

**Editorial check:** keep the project’s adopted alphabet order explicit and consistent across course text, keyboard help, sorting, search, and assessment. A pedagogical inventory is not by itself a complete policy for all loanword spellings, foreign names, transcription symbols, or dialect-specific conventions.

### 3.2 Exercise answer-key check

The visible completion tasks resolve as follows:
- `A, B, C, Ç, D`
- `E, Ê, F`
- `I, Î, J`
- `R, S, Ş, T`
- `U, Û, V`

The uppercase/lowercase matching pairs are internally consistent:
- `Ç → ç`
- `Ê → ê`
- `Î → î`
- `Ş → ş`
- `Û → û`

The answer key should include the five sequence-completion answers explicitly; currently the key gives only the case pairs and selected distinctions, leaving the completion exercise without a complete key.

### 3.3 Claims requiring tighter wording

1. **“31 letters”** — appropriate for the standard Hawar alphabet inventory. State that this is the course’s adopted Hawar inventory, rather than implying that every Kurdish writing practice uses one universal inventory.
2. **“Five letters with special marks”** — understandable for beginners, but in technical documentation call them letters with diacritics. Explain that the marks are part of the letter’s written identity and are not optional decoration.
3. **Keyboard claim** — the lesson asks learners to type the letters, but does not establish which operating-system keyboard layout or input method is available. Provide a platform-neutral instruction or a separate verified keyboard guide; do not assume a learner can type them without configuration.
4. **Unicode note** — the teacher note correctly raises NFC/NFD. Add a technical acceptance test for normalization, copy/paste, search, equality, and sorting. Do not strip combining marks during normalization or search.
5. **“Basic Latin letter shapes” prerequisite** — check whether this is realistic for all target learners. If not, provide a short visual orientation rather than treating Latin literacy as an assumed entry requirement.

### 3.4 Lesson 02 decision

**Alphabet content is provisionally sound; technical and pedagogical details remain open.** The sequence and case pairs are consistent. Complete the missing sequence answer key and verify keyboard access and Unicode behavior before release.

## 4. Lesson 03 — Tîp, deng û peyv

### 4.1 Critical conceptual issue: definition of “peyv”

Current definition:
> `Peyv ji tîpên nivîskî pêk tê û di axaftinê de tê gotin.`

This says a word is made of written letters and then spoken. That definition is unsuitable because spoken language exists independently of writing. It risks teaching that a spoken word is literally composed of written symbols.

**Recommendation (proposal only):** define the two modalities separately:
- a written word is represented by letters/graphemes in writing;
- a spoken word is realized as a sequence of speech sounds;
- the written and spoken forms correspond, but they are not the same physical object and need not have a one-to-one letter-to-phone relation.

Have a Kurmanji linguist/editor formulate the final learner-level Kurmanji wording. Do not insert a translation or a technical IPA explanation into the B0 lesson.

### 4.2 Other phrase and concept checks

| Current string or claim | Preliminary assessment | Required action |
|---|---|---|
| `Peyvek dikare were nivîsîn û were gotin.` | Understandable but the passive construction and wording need idiomatic review | Ask editor whether a more natural beginner formulation exists |
| `Dema tu peyvek dinivîsî, tîpan dibînî.` | Conceptually appropriate for writing | Check whether `tîpan` is the best form in context |
| `Dema tu peyvek dibêjî, dengê wê dibihîzî.` | Helpful contrast, but singular “sound” may oversimplify a spoken word | Consider “dengên wê” or a simpler editor-approved formulation |
| `Tîp tiştek e ku em dinivîsin û dibînin.` | Pedagogically accessible | Clarify that a letter is a written symbol/grapheme, not any arbitrary visible mark |
| `Deng tiştek e ku em dibêjin û dibihîzin.` | Too broad if “sound” is understood as any sound | Scope it to speech sound in the teacher note or learner definition |
| `Peyvên kurt bi tîpên wan veqetîne.` | Potentially useful orthographic segmentation task | Clarify that this is segmentation of written forms, not syllabification or phoneme segmentation |
| `Tîpên peyvan` | Appropriate if the task is explicitly orthographic | Maintain this wording consistently and do not call the units sounds |
| `Peyv ji tîpên nivîskî pêk tê` | Conceptually incorrect for spoken words | Replace only after editor approval |

### 4.3 Example selection and counting

The examples `mal`, `nan`, `av`, `roj`, `şev`, and `çav` are suitable-looking short orthographic forms for a first segmentation exercise. The table counts graphemes, not phonemes. In particular:
- `ş` and `ç` each count as one Hawar letter/grapheme in the lesson’s written segmentation;
- the exercise must not suggest that each grapheme always corresponds to exactly one invariant speech sound;
- `av` has two written letters; the task is about its written form, not a full phonological analysis.

**Recommendation:** label the table “tîpên nivîskî” and the activity “veqetandina tîpan di nivîsê de” (subject to editor’s preferred wording). Do not use “deng” as the unit being counted.

### 4.4 Answer-key completeness

The key covers the listed examples, but should also explicitly answer:
- `mal` has three written graphemes;
- `şev` begins with `ş`;
- `çav` begins with `ç`;
- `roj` ends with `j`;
- the three modality questions: visible written symbol = letter; heard speech unit = sound; written `şev` = letters/graphemes.

A full key is important for self-study and should be added in the next approved editorial revision.

### 4.5 Lesson 03 decision

**P0 conceptual correction required before learner use.** The definition of “word” must not equate spoken words with written letters. Preserve the simple B0 scope but separate written and spoken representations.

## 5. Cross-lesson editorial consistency

1. Use one consistent distinction:
   - `tîp` / `tîpa nivîskî`: written letter/grapheme;
   - `deng`: speech sound;
   - `peyv`: lexical word, which can be spoken or written.
2. Avoid introducing technical labels such as phoneme, phone, IPA, tense/lax, or phonological length in learner-facing B0 material unless a later lesson explicitly teaches them.
3. Avoid treating “Hawar alphabet” as a claim that all Kurdish varieties and scripts share one orthographic system.
4. Keep all learner-facing explanations, prompts, answer keys, and glossary items in Kurmanji Hawar Latin. Editorial metadata may be in English, but should not leak into the student interface.
5. Review all singular/plural and second-person imperative forms for consistent learner address.
6. Check that every exercise has a complete answer key and tests exactly what the lesson taught.
7. Preserve the no-audio rule until the owner approves a spoken reference variety.

## 6. Source and evidence limits

The current pilot source list includes:
- KNAB, “Kurdish / Kurdi” (Hawar 1932): https://arhiiv.eki.ee/knab/lat/kblku2.pdf
- Haig (2018), “Northern Kurdish (Kurmanjî)”: https://www.zora.uzh.ch/id/eprint/160196/
- Haig & Öpengin (2018), “Kurmanji Kurdish in Turkey: Structure, varieties, and status.”
- Yari, “The Kurmanji Kurdish alphabet: all 31 letters and how to say them”: https://yari.krd/learn/kurmanji-alphabet/
- R12a, “Kurmanji Hawar orthography notes”: https://r12a.github.io/scripts/latn/kmr.html

These references support the broad alphabet and linguistic review framework. They do **not** certify the naturalness of the instructor-authored greetings, classroom imperatives, or complete lesson sentences. Those require a proficient Kurmanji language editor. The exact target reference variety has not been approved, so regional acceptability remains unresolved.

## 7. Priority closure queue

| Priority | Item | Closure evidence |
|---|---|---|
| P0 | Lesson 03 definition of “peyv” separates written and spoken forms | Revised editor-approved definition and reviewed examples |
| P0 | Lesson 01 greetings and imperatives checked by proficient editor | Phrase-level sign-off, including `Bi xatirê te`, `Ser çavan`, `Raweste` |
| P1 | Lesson 02 completion exercise answer key completed | All five missing sequence answers documented |
| P1 | Lesson 02 keyboard and Unicode behavior | Verified input, display, search and normalization tests |
| P1 | All learner-facing strings checked for idiom and morphology | Named Kurmanji editor sign-off |
| P1 | Reference variety and editorial policy selected | Owner decision recorded in project policy |
| P2 | Beginner accessibility and exercise sequencing | Pedagogical review and learner pilot results |

## 8. Release decision

**DRAFT — NOT APPROVED.**

This report is proposal-only. It does not change the three pilot lessons, Lesson 04, the existing 38 lessons, seed SQL, migrations, database, application code, `main`, PR #3, or deployment. No wording in this report should be copied into the learner-facing product without owner approval and Kurmanji editorial review.
