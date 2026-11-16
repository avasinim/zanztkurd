# Kurmanji-Medium Pathway — Independent Authoring Specification and B0 Pilot Blueprint
**Date:** 2026-11-16  
**Repository:** `avasinim/zanztkurd`  
**Working branch:** `fix/kurmanji-ci-current-migration`  
**Baseline:** `684af7d2e93f4e4aa9303155159c0892626ca40f`  
**Status:** proposal-only curriculum/authoring specification; no existing lesson content is changed.

## 1. Purpose

This document advances Pathway B from a conceptual syllabus to an actionable independent-authoring specification. Pathway B is a Kurmanji-medium course in Hawar-based Latin script. It is not a Sorani course translated into Kurmanji and it is not an English course with Kurmanji examples.

The intended learner-facing language is Kurmanji throughout:
- course and unit titles;
- lesson titles and objectives;
- explanations and definitions;
- classroom instructions;
- example sentences and dialogues;
- exercise prompts and answer choices;
- answer keys and feedback;
- glossary entries;
- reading texts and assessment rubrics.

Editorial notes, research citations, provenance records and developer documentation may use English internally. They must remain outside the learner-facing lesson payload. No hidden Sorani or English explanatory text is permitted in Pathway B.

## 2. Governing design principles

### 2.1 Independent authorship
Use the shared, reviewed Kurmanji linguistic fact base, source records and example IDs where suitable. Author the Pathway B teaching sequence and all learner-facing prose independently. Do not translate Pathway A explanations sentence by sentence.

### 2.2 Comprehensible Kurmanji, not artificial “easy Kurmanji”
Use familiar words, short clauses, repetition, concrete context and visual support. Do not create unidiomatic or malformed Kurmanji merely to avoid a difficult word. If a concept cannot yet be explained simply, demonstrate it through examples and defer the technical label.

### 2.3 Language growth by stage
Increase the complexity of the instruction language gradually:
- B0: familiar words, formulaic classroom phrases, short commands and modelled expressions.
- B1: short connected sentences, simple paraphrases and familiar question/answer patterns.
- B2: short explanations of familiar grammatical patterns, with examples preceding labels.
- B3: connected explanations, comparison, narrative and paragraph-level feedback.
- B4: precise explanation, editing language, register discussion and text analysis.
- B5: optional specialist metalanguage, argumentation and source-based linguistic discussion.

These are internal design bands, not CEFR claims or certificates.

### 2.4 One new load at a time
Do not introduce a new grammatical construction, a large new vocabulary set and a new instruction format all in the same task. Recycle previously taught language. Every new instruction pattern must be modelled before independent use is expected.

### 2.5 No unlabelled dialect mixing
Use one approved written target for core spelling, and label regional spoken or lexical variants with source and location. The spoken reference variety for audio remains pending owner/editor decision. No single audio track may be described as “the pronunciation of all Kurmanji.”

## 3. Pathway B architecture

Retain the proposed progression B0–B5 as a flexible structure. The unit counts below are planning units, not a fixed promise about the final number of lessons.

### B0 — Zimanê polê û destpêka xwendinê
**Purpose:** enable a learner to participate in the course, recognize and type Hawar letters, read first words and understand short, highly supported Kurmanji instructions.

| Unit | Provisional learner-facing title | Main learning evidence |
|---:|---|---|
| 01 | Bi xêr hatin û zimanê polê | Learner follows a small set of modelled classroom instructions and uses basic response phrases |
| 02 | Tîpên kurmancî | Learner recognizes and names the approved Hawar letters |
| 03 | Tîp, deng û peyv | Learner distinguishes written forms from spoken sounds using concrete examples |
| 04 | Dengdêr di peyvan de | Learner recognizes the approved vowel graphemes in familiar words |
| 05 | Dengdêrên din û xwendina peyvan | Learner identifies consonant graphemes and reads carefully selected short words |
| 06 | Nîşanên tîpan û rastnivîsîn | Learner types and preserves Kurdish diacritics in controlled words |
| 07 | Peyvên yekem û hevokên kurt | Learner reads, copies and produces a small set of useful expressions |
| 08 | Bibîne, bixwîne û binivîse | Learner completes a short integrated reading/spelling task |

**Language-control rule:** the first lessons should rely on demonstration, pointing, matching, repetition and short modelled exchanges. Avoid abstract grammar definitions. All candidate titles and terminology in this table remain provisional pending a proficient Kurmanji editor.

### B1 — Kurmanciya rojane
**Purpose:** build first everyday interaction and reading competence using familiar topics.

| Unit | Provisional learner-facing title | Main learning evidence |
|---:|---|---|
| 01 | Silav û xatirxwestin | Appropriate greetings and leave-taking in short exchanges |
| 02 | Xwe nasandin | A short self-introduction |
| 03 | Kes, nav û cih | Asking for and giving basic information about people and places |
| 04 | Hejmar, temen û hejandin | Understanding and using numbers and simple quantities |
| 05 | Malbat û têkiliyên mirovî | Describing family relationships with reviewed vocabulary |
| 06 | Reng û taybetmendî | Describing familiar objects and people |
| 07 | Roj, dem û tarîx | Asking and answering simple questions about days and time |
| 08 | Karên rojane | Describing a small set of everyday routines |
| 09 | Pirs û bersivên hêsan | Asking and answering familiar questions |
| 10 | Axaftin û peyamên kurt | Reading and writing a short dialogue or message |
| 11 | Xwendina nivîsên kurt | Understanding a short graded text |
| 12 | Karê pratîkî û dubarekirin | Completing an integrated practical task |

### B2 — Avakirina hevokê û bingehên rêzimanê
**Purpose:** make core sentence and noun-phrase structures usable, not merely recognizable.

| Unit | Provisional learner-facing title | Main learning evidence |
|---:|---|---|
| 01 | Cînav di hevokê de | Use reviewed personal pronouns in context |
| 02 | Nîşandan û nîşankirin | Refer to people and things clearly |
| 03 | Nav, zayend û hejmar | Use reviewed noun gender and number patterns |
| 04 | Diyarkirin û nediyarkirin | Express reference and indefiniteness in taught contexts |
| 05 | Îzafe di koma navdêrê de | Build reviewed noun phrases with ezafe |
| 06 | Rengdêr û lihevhatin | Describe nouns with checked adjective patterns |
| 07 | Xwedîtiyê û têkiliyên xwedîtiyê | Express possession in source-checked patterns |
| 08 | Lêker di dema niha de | Use reviewed present-tense patterns |
| 09 | Erênî û neyînîkirina hevokê | Form affirmative and negative clauses in the taught constructions |
| 10 | Pirs û peyvên pirsiyarî | Ask questions with reviewed interrogatives |
| 11 | Rêza peyvan û rola wan | Interpret neutral clause order and participant roles |
| 12 | Forma rasterast û nerasterast | Recognize and use reviewed Direct/Oblique forms in context |
| 13 | Nivîsîna paragrafên kurt | Produce a connected paragraph using taught forms |

### B3 — Axaftina serbixwe û rêzimanê pêşketî
**Purpose:** extend beyond short sentence frames into independent everyday communication.

| Unit | Provisional learner-facing title | Main learning evidence |
|---:|---|---|
| 01 | Kok û şêweyên lêkerê | Identify taught verb stems and inflectional patterns |
| 02 | Bûyerên borî: lêkerên negerguhêz | Narrate reviewed past intransitive events |
| 03 | Bûyerên borî: lêkerên gerguhêz | Use reviewed past transitive patterns with case/agreement |
| 04 | Dema pêşerojê û plan | Express plans and future reference |
| 05 | Şiyan, pêwîstî û îhtîmal | Express ability, necessity and possibility in verified patterns |
| 06 | Fermankirin û daxwazkirin | Give instructions and make requests appropriately |
| 07 | Cih, alî û têkiliyên cihî | Express spatial relations with checked adpositions/postpositions |
| 08 | Berawirdkirin û ast | Compare people, things and situations |
| 09 | Girêder û peyvên gotarê | Link clauses and organize connected speech |
| 10 | Vegêran û gotina ji kesekî din | Narrate events and report speech |
| 11 | Awa, tomar û şertên civakî yên axaftinê | Choose forms suitable for register and context |
| 12 | Xwendin, kurtkirin û nivîsîna dirêj | Summarize a longer text and write a coherent response |
| 13 | Nivîsîn, sererastkirin û nûvekirin | Revise a text for spelling, grammar and cohesion |

### B4 — Xwendin, nivîsîn û şiyana nivîskî ya pêşketî
**Purpose:** develop advanced literacy, stylistic control and critical reading.

| Unit | Provisional learner-facing title | Main learning evidence |
|---:|---|---|
| 01 | Nivîsên dirêj bixwîne û fam bike | Read and interpret extended prose |
| 02 | Vegêran û danasîn | Write coherent narratives and descriptions |
| 03 | Ravekirin û nêrîn | Explain a topic and express a supported opinion |
| 04 | Paragraf û yekbûna nivîsê | Organize paragraphs and textual cohesion |
| 05 | Rastnivîsîn û sererastkirina nivîsê | Edit orthography and consistency |
| 06 | Ferheng û çavkaniyên zimanî | Consult dictionaries and language references critically |
| 07 | Şêwaz, tomar û bikaranîna peyvan | Control register and lexical choice |
| 08 | Guherîna herêmî û şêwaza nivîskî | Discuss documented variation without ranking dialects as defective |
| 09 | Nivîsên fermî û edebî | Read and produce selected formal/literary forms |
| 10 | Pêşkêşkirin û nivîsa birêkûpêk | Present and defend an organized written argument |

### B5 — Beşa vebijarkî ya pisporî
This optional strand is for learners who want explicit linguistic analysis, editorial work or academic literacy. It is not a prerequisite for general fluency.

| Unit | Provisional learner-facing title | Main learning evidence |
|---:|---|---|
| 01 | Deng, tîp û pergala nivîsînê | Explain sound/letter distinctions accurately |
| 02 | Avahiya peyvê û morfem | Segment and explain word structure |
| 03 | Rêziman, rewş û lihevhatin | Analyse case and agreement |
| 04 | Avahiya hevokê | Analyse clause structure |
| 05 | Cudahiyên şêwazaran | Compare sourced regional data |
| 06 | Peyvsazî û ferhengnasî | Develop and evaluate terminology and lexicographic entries |
| 07 | Sererastkirin û şêwaz | Edit texts with a documented style rationale |
| 08 | Lêkolîn û nivîsandina zanistî | Produce a source-based linguistic explanation |

**Terminology warning:** titles are draft editorial candidates, not approved technical terms. A proficient Kurmanji editor and linguist must check idiomaticity, morphology, register and conceptual precision before these become learner-facing titles. Where a stable technical term is not established, use a clear Kurmanji explanation rather than inventing a calque.

## 4. Mandatory lesson architecture

Each Pathway B lesson must be authored using the following learner-facing sequence, adapted to the stage:

1. **Destpêk:** a short context, question, image or dialogue that makes the topic meaningful.
2. **Armanc:** one clear statement of what the learner will be able to do.
3. **Mînak:** reviewed Kurmanji examples before abstract terminology.
4. **Bifikire:** a short noticing prompt that guides the learner to observe a pattern.
5. **Ravekirin:** a concise explanation written in stage-appropriate Kurmanji.
6. **Biceribîne:** recognition and matching tasks.
7. **Bi kar bîne:** controlled production using a model.
8. **Di rewşê de bi kar bîne:** a meaningful task with a communicative purpose.
9. **Xwe bipirse:** retrieval questions that revisit earlier material.
10. **Bersiv û şîrove:** answer key and error-specific feedback in Kurmanji.
11. **Peyvên nû:** a small contextual vocabulary set with Kurmanji paraphrases.
12. **Çavkaniyên mamosteyan:** internal references and provenance, not learner-facing source clutter unless pedagogically useful.

The labels above are draft and require language review. The architecture matters more than preserving these exact headings.

## 5. Instruction-language control protocol

Every learner-facing text block must pass the following checks:

### B0
- Prefer one instruction per sentence.
- Use familiar verbs and concrete objects.
- Demonstrate the action before asking the learner to perform it.
- Repeat a stable set of classroom expressions.
- Use icons, pictures, matching and pointing to support meaning.
- Avoid technical definitions and multi-clause instructions.

### B1
- Use short, connected Kurmanji sentences.
- Explain new vocabulary through a familiar Kurmanji phrase, context or image.
- Keep question patterns consistent while changing only one variable at a time.
- Give one worked example before independent practice.

### B2
- Introduce a grammatical label after the learner has seen examples.
- Define the label in simple Kurmanji and reuse the same definition.
- Use tables and paradigms only after a short contextual example.
- Keep exceptions visible but do not overload the first explanation.

### B3
- Use longer instructions and connected explanations.
- Ask learners to compare, narrate, justify and revise.
- Introduce discourse and register differences with real contexts.
- Feedback should identify the form, explain the issue in Kurmanji and provide a corrected model.

### B4–B5
- Require longer reading, independent writing and source-aware analysis.
- Use precise terminology only after it has been defined and consistently applied.
- Distinguish observation, generalization, evidence and editorial choice.
- Teach learners to qualify claims when regional data differ.

### Prohibited shortcuts
- No Sorani explanatory sentences in the Pathway B lesson body.
- No English explanatory sentences in the Pathway B lesson body.
- No word-for-word translation of Pathway A teaching paragraphs.
- No invented Kurmanji technical term without review.
- No dialect form presented as universal without evidence.
- No unverified sentence described as a corpus quotation.
- No use of machine-generated audio as a substitute for an approved spoken-variety decision.

## 6. Example and terminology governance

Every example must have an internal record with:
- stable example ID;
- exact Kurmanji form;
- morpheme segmentation where relevant;
- literal gloss where useful;
- natural meaning;
- grammar feature(s);
- source/variety/register;
- provenance: attested, adapted or instructor-created;
- orthography status;
- reviewer and approval state.

The learner-facing page need not expose all editorial metadata. The teacher/research record must preserve it.

Every technical term must have:
- candidate Kurmanji form;
- simple Kurmanji definition;
- scholarly concept it represents;
- example and counterexample;
- source or terminology rationale;
- reviewer and status.

If the term is unsettled, teach the idea with a plain Kurmanji explanation and mark the label provisional in the internal record.

## 7. Diagnostic entry and learner routes

Do not require a fluent heritage speaker to repeat B0/B1 if they can demonstrate the outcomes.

Use a diagnostic profile across:
- Hawar reading and spelling;
- comprehension of Kurmanji instructions;
- reading comprehension;
- grammar in context;
- paragraph writing and editing;
- register and pragmatic choice;
- specialist analysis, only for B5.

Placement bands are internal routes:
- literacy support: B0;
- foundational communication: B1;
- structured grammar and paragraph competence: B2;
- independent communication: B3;
- advanced literacy: B4;
- specialist study: B5.

No CEFR label, certificate or proficiency claim is authorized by these bands. Cut scores and progression rules require piloting and validation.

## 8. Assessment system

Use a cumulative evidence portfolio, not only multiple-choice quizzes.

| Stage | Core evidence |
|---|---|
| B0 | letter recognition, typing, short-word reading, spelling correction, following short instructions |
| B1 | self-introduction, short dialogue, simple message, familiar-text comprehension |
| B2 | noun-phrase construction, sentence production, question/answer task, guided paragraph |
| B3 | narrative, request/role-play, reading summary, paragraph revision |
| B4 | extended reading response, structured essay, edited text with rationale, oral presentation |
| B5 | annotated language sample, morphology/syntax analysis, dialect comparison, source-based exposition |

Every scored task needs:
- a stated construct and learning outcome;
- unambiguous instructions;
- answer key or analytic rubric;
- accepted variants and their scope;
- error-specific feedback;
- reviewer record;
- pilot evidence before claims about reliability or proficiency.

Listening and pronunciation assessment remain on hold until the owner/editor approves the spoken reference variety and audio policy.

## 9. Pilot plan: first three B0 lessons

Before authoring the entire course, prepare a small pilot batch to validate the method.

### Pilot 1 — Bi xêr hatin û zimanê polê
- Learner outcome: follow and respond to a short set of classroom expressions.
- Input: a short illustrated dialogue and modelled instructions.
- Practice: listen/read, match instruction to action, select an appropriate response, complete a two-turn exchange.
- Feedback: short Kurmanji confirmation and a model answer.
- Language constraint: no abstract grammar terminology.

### Pilot 2 — Tîpên kurmancî
- Learner outcome: identify and type the approved Hawar letter inventory.
- Input: letter display and carefully checked word examples.
- Practice: recognition, sorting, typing and error correction.
- Technical check: preserve all diacritics and Unicode normalization; test copy/paste and rendering.
- Linguistic gate: alphabet inventory must be signed off against the project's orthography policy.

### Pilot 3 — Tîp, deng û peyv
- Learner outcome: distinguish a written letter from a speech sound in carefully chosen examples.
- Input: simple paired examples and visual articulatory support only where validated.
- Practice: identify the written form, locate it in a word and compare the sound in a reviewed audio sample if approved.
- Gate: do not imply a one-to-one letter/sound relation where the evidence does not support it; audio remains variety-specific.

Pilot acceptance requires:
1. proficient Kurmanji editorial review of every learner-facing string;
2. independent linguistic check of every example and paradigm;
3. a full language audit proving no Sorani/English explanatory leakage;
4. usability review with representative learners;
5. keyboard, Unicode, font and mobile layout tests;
6. answer-key and feedback verification.

## 10. Open decisions and protected boundaries

Still requiring owner/editor approval:
1. spoken reference variety for listening and pronunciation;
2. final Kurmanji technical terminology and classroom register;
3. whether B5 is included in the first public release or remains optional;
4. whether the proficient-entry diagnostic is offered at launch;
5. the exact course-volume and lesson-count structure after the pilot.

This proposal does not:
- rewrite or replace any of the existing 38 lessons;
- alter Pathway A content;
- alter seed SQL, migrations, schema or application code;
- modify production data, `main`, PR #3 or deployment;
- certify any CEFR level or release readiness.

**Disposition:** Pathway B now has a detailed independent authoring specification, staged unit map, language-control protocol, lesson architecture, assessment design and three-lesson pilot plan. All Kurmanji titles and learner-facing labels remain draft candidates until specialist editorial approval.
