# Course 1, Lesson 20 — Basic Word Order, Goals, Focus and Argument Structure: Evidence Audit

**Date:** 2026-11-16  
**Repository:** `avasinim/zanztkurd`  
**Branch:** `fix/kurmanji-ci-current-migration`  
**Scope:** Evidence review of the existing Course 1 Lesson 20 seed payload. Proposal-only; no lesson edits.

## 1. Executive findings

The lesson correctly introduces SOV as a common neutral pattern and appropriately warns that word order is not rigid. Its central weakness is that it risks presenting “SOV” as a complete account of all clause arguments. A more accurate introductory description is:

- The basic order is **SOV** for core subject–object–verb clauses.
- In neutral clauses that also contain a Goal (destination, recipient, or addressee), Haig describes the pattern as **SOVG**: the Goal may follow the verb.
- Some recipients/benefactives marked by the circumposition `ji ... ra` occur before the verb, giving an order such as SGOV.
- Recipients with `dan` ‘give’ are usually immediately post-verbal, in the oblique case and without an adposition; regional patterns differ.
- Direct objects can be fronted for pragmatic reasons, including contrastive focus. This is not the same phenomenon as post-verbal Goals, and the two should not be conflated.
- In past transitive clauses, the agent is oblique and the direct object is direct; the subject/object case pattern changes, but the order of subject and object remains broadly the same.

The seed's SOV teaching examples are mostly plausible, but `Em kurdî hîn dibin` needs the native review already flagged in the Lesson 17 audit. The fronted example `Vê pirtûkê, ez dixwînim` is pedagogically plausible as a contrastive topic/focus illustration, but the exact punctuation, prosody and discourse context require native review. It should not be presented as a freely interchangeable neutral order.

## 2. Exact payload reviewed

File: `docs/kurmanji-content-seed-part-03.sql`  
Blob SHA: `b6f89841ac49adb256a7874179a258436e095909`  
Lesson key: `kurmanji-course-1-lesson-20.html`  
Title: `ڕیزبەندی وشەکان لە ڕستەدا`

The payload contains:
1. Basic SOV with `Ez nan dixwim`, `Tu pirtûkê dixwînî`, and `Em kurdî hîn dibin`.
2. Intransitive and locative clauses: `Zarok radizê`, `Ew diçe`, `Em li malê dimînin`.
3. Fronting for emphasis: `Ez vê pirtûkê dixwînim` contrasted with `Vê pirtûkê, ez dixwînim`.
4. Exercises and references to Haig (2018), Manchester University, MELL, and Thackston.

## 3. Evidence and grammatical analysis

### 3.1 Core SOV: accurate, but define what the three letters cover

Haig (2018), §2.7.1, states that pragmatically neutral clauses have SOVG order, where G is a cover term for spatial Goals of motion verbs, recipients of transfer verbs, and addressees of speech verbs. This is a more precise formulation than saying simply that every Kurmanji clause is SOV. For simple clauses containing only a subject, object and verb, SOV is an appropriate beginner generalization.

The seed examples `Ez nan dixwim` and `Tu pirtûkê dixwînî` illustrate subject–object–verb order. The second example uses the oblique-marked form `pirtûkê`, consistent with the present-tense transitive object pattern in Standard Kurmanji. The lesson should avoid implying that all objects have one fixed case independent of tense/aspect and noun phrase properties.

### 3.2 Goals, recipients and addressees: the missing G

The current lesson says complements of place, time and manner can occur before the verb. This is true for many adjuncts, but it omits an important argument-structure pattern: Kurmanji Goals may follow the predicate.

Haig (2018), §2.7.1, explicitly distinguishes:
- Neutral SOVG, with Goals after the verb in relevant patterns.
- SGOV for dialects that use `ji ... ra` extensively for recipients and benefactives.
- Recipients with `dan` ‘give’, usually immediately after the verb in oblique case and without an adposition.
- Badini and Şemzînan patterns, where `bo` may occur with post-predicate recipients/goals.

Haig et al. (2024), “Post-predicate elements in the Western Asian Transition Zone”, develops the point further: Kurmanji is not adequately characterized as a pure OV language at the level of all arguments; Goal arguments can appear post-predicate, and their placement is related to case/adposition flagging and regional patterns. The study cautions against treating all post-verbal Goals as free pragmatic scrambling.

**Editorial proposal:** add a concise, clearly scoped note that SOV describes the core S–O–V sequence, but some Goals/recipients/addressees occur after the verb. Do not introduce every regional variant in the beginner lesson; a single supported example plus a “varies by construction and region” note is sufficient.

### 3.3 Intransitive clauses and adjuncts

The lesson correctly states that not every clause has an object. `Ew diçe` is a straightforward intransitive subject–verb pattern. `Zarok radizê` is also structurally an intransitive clause, though its lexical form and idiomaticity should be checked with a native editor.

`Em li malê dimînin` includes a locative prepositional phrase. The phrase `li malê` precedes the verb, which is compatible with the lesson's statement that locative complements often occur preverbally. But “complements of place, time and manner” should not be reduced to one rigid position: argument type, adposition, discourse status and dialect all matter.

### 3.4 Fronting and contrastive focus

The lesson's general point that a direct object can be fronted for pragmatic reasons is supported by Haig (2018), §2.7.1. Gündoğdu's thesis on Standard and Muş Kurmanji, §4.2.1, provides a useful distinction between:
- Neutral SOV with sentence-final stress on the verb.
- Contrastive focus on the immediately preverbal object under SOV, where the object receives stress.
- Other discourse-related ordering possibilities.

The thesis gives an example such as `Ez pirtûkê DIXWÎNIM` with focus on the verb, and `Ez PIRTÛKÊ dixwînim` with contrastive focus on the object (“the book, not the newspaper or magazine”). This demonstrates that focus is not only a matter of moving constituents; prosodic prominence matters.

The seed's `Vê pirtûkê, ez dixwînim` is not supported verbatim by the consulted sources. It may be a fronted topical/contrastive object, but the exact sentence, case marking, intonation and comma are not enough on their own to establish the intended reading. It should remain labelled as an instructor-created example pending native review, not presented as a universally free word-order alternative.

**Editorial proposal:** teach focus first through stress in the canonical SOV order; introduce fronting as a context-dependent option with a fully described discourse context. Keep “fronting” distinct from post-verbal Goal placement.

### 3.5 Past transitive clauses: case alignment is not simple subject–object order

Haig (2018), §2.7.2, notes that Kurmanji uses an ergative construction in past transitive clauses: the transitive agent takes oblique case, the direct object takes direct case, and the verb agrees with the direct object. Nevertheless, the order of subject and object remains unchanged. The oblique agent still functions as the subject for relevant syntactic properties, including control of `xwe`.

This matters for a lesson on word order because learners must not infer grammatical roles solely from “first noun = subject” or from direct/oblique morphology alone. The current lesson only gives a brief note that past transitive clauses are more complex. That warning is correct but underspecified.

**Editorial proposal:** retain the warning, and add a short cross-reference to the lesson on personal pronouns/case and the past transitive alignment lesson. Avoid introducing a full ergative paradigm here if the course has a separate lesson for it.

### 3.6 Review of the seed examples

| Current example | Evidence status | Editorial disposition |
|---|---|---|
| `Ez nan dixwim` | Fits neutral SOV | Retain provisionally |
| `Tu pirtûkê dixwînî` | Fits SOV; oblique-marked present object | Retain; explain object case elsewhere |
| `Em kurdî hîn dibin` | Word order plausible, but the exact `hîn bûn` construction was not verified in the prior Lesson 17 source audit | Native review before treating as model sentence |
| `Zarok radizê` | Intransitive S–V pattern plausible | Native lexical/idiomaticity review |
| `Ew diçe` | Straightforward intransitive S–V | Retain |
| `Em li malê dimînin` | Locative phrase before verb; structurally plausible | Retain provisionally; native review |
| `Ez vê pirtûkê dixwînim` | Canonical SOV, object in preverbal slot | Retain provisionally |
| `Vê pirtûkê, ez dixwînim` | Exact fronted clause not verified in source; prosody/context essential | Label as constructed and require native review |

## 4. Recommended learner-facing structure (not applied)

1. **Core clause:** S + O + V as the common neutral pattern in simple transitive clauses.
2. **Intransitive clause:** S + V; no direct object is required.
3. **Adjuncts:** locative/time/manner phrases commonly occur before the verb, but their placement depends on construction and discourse.
4. **Goals and recipients:** introduce the existence of SOVG and post-predicate Goal patterns; give one vetted example and defer regional detail.
5. **Focus:** first demonstrate contrastive stress in the normal SOV order; then show fronting only with a clear context.
6. **Past transitive reminder:** case marking and agreement differ, but do not infer subjecthood from direct/oblique case alone.

## 5. Editorial gates

- The course's reference variety remains a prerequisite for selecting a single default Goal/recipient pattern.
- Native Kurmanji review is required for `Em kurdî hîn dibin`, `Zarok radizê`, `Em li malê dimînin`, and the fronted object example.
- Sorani glosses need separate copy-editing.
- Distinguish syntactic arguments (especially Goals/recipients) from adjuncts (time/manner) rather than grouping all complements together.
- Distinguish direct-object fronting for focus from the construction-sensitive post-predicate placement of Goals.

## 6. Sources

1. **Haig, Geoffrey (2018).** “Northern Kurdish (Kurmanjî),” in *The Languages and Linguistics of Western Asia: An Areal Perspective*, especially §§2.7.1–2.7.2, pp. 130–132. https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf
2. **Haig, Geoffrey et al. (2024).** “Post-predicate elements in the Western Asian Transition Zone.” Detailed empirical discussion of post-predicate Goals/Recipients in Kurmanji and the role of flagging and regional variation. https://refubium.fu-berlin.de/bitstream/handle/fub188/46339/395-HaigEtAl-2024.pdf?isAllowed=y&sequence=1
3. **Gündoğdu, Songül (2011).** *The Phrase Structure of Two Dialects of Kurmanji Kurdish: Standard Dialect and Muş Dialect*, Boğaziçi University M.A. thesis, §4.2.1 “Word Order Patterns in Kurmanji”, pp. 122–124. https://digitalarchive.library.bogazici.edu.tr/bitstreams/c22fcd85-97d8-4c48-98ab-8cc623449fff/download
4. **Haig, Geoffrey (2015).** “Verb-Goal (VG) Word Order in Kurdish and Neo-Aramaic: Typological and Areal Considerations.” Supports the wider typological and areal treatment of post-verbal Goal arguments. https://doi.org/10.31826/9781463236489-025
5. **Thackston, W. M. (2006).** *Kurmanji Kurdish: A Reference Grammar with Selected Readings*. Past transitive examples and alignment discussion. https://sites.fas.harvard.edu/~iranian/Kurmanji/kurmanji_complete.pdf

## 7. Change boundary

Documentation-only audit. No lesson body, seed SQL, migration, application code, CI, Supabase, production data, PR #3, `main`, or deployment was changed. No database was accessed.
