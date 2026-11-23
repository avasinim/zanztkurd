# Course 2 — Lessons 01–03 and 06: Implementation-Ready Editorial Specification
Date: 2026-11-23
Status: Documentation-only implementation specification. No learner-facing edits are authorized or performed.

## 1. Purpose, scope and evidence boundary

This specification converts the existing Lesson 01 instructional audit, the Lessons 03–06 nominal-morphology source audit, the integrated revision blueprint and the working terminology register into an actionable editorial plan for Lessons 01, 02, 03 and 06.

The four lessons are treated together because they introduce the course's core vocabulary and nominal morphology:
- Lesson 01: word, morpheme and word structure;
- Lesson 02: root, base, prefix and suffix;
- Lesson 03: noun, grammatical gender and number;
- Lesson 06: possession, possessors in ezafe constructions and reflexive `xwe`.

This document is not authorization to edit lesson HTML, SQL seed payloads, application code, database records, migrations, Supabase, the main branch, deployment or production. It does not invent Kurmanjî forms, paradigms, translations or source claims. All new learner-facing examples must be independently checked in the cited source and approved before use.

**Principal source:** Geoffrey Haig (2018), “Northern Kurdish (Kurmanjî),” especially Table 7, §2.2.1 and §2.3.1. The course's stated scope remains Standard Kurmanjî; dialect variation must be labelled rather than blended.

## 2. Shared editorial controls for all four lessons

### 2.1 Terminology that must remain distinct

Use the working terminology register as the controlling document. In particular:
- morphology (discipline): `مۆرفۆلۆجی`;
- morpheme: `مۆرفیم`;
- root: `ڕەگ`;
- base: `بنەڕەت`;
- stem: `ستێم` is provisional and must not be standardized until the owner/editor approves its Sorani equivalent and scope;
- prefix: `پێشگر`;
- suffix: `پاشگر`;
- noun: `ناو`;
- grammatical gender: `ڕەگەزی ڕێزمانی`;
- number: `ژمارە`;
- ezafe: `ئەزافە`;
- head noun: `ناوی سەرەکی`;
- possessor: `خاوەندار`;
- case: `حاڵەت`, with direct/oblique as `حاڵەتی ڕاستەوخۆ / ناڕاستەوخۆ`.

Do not use morphology and morpheme as synonyms. Do not silently substitute root, base and stem for one another. Where the exact Sorani technical label remains provisional, preserve the existing wording in learner-facing content until owner approval.

### 2.2 Source and dialect discipline

1. Preserve every Kurmanjî Latin form exactly as attested in the checked source.
2. Do not infer a morpheme solely from a string of letters; compare form, function and syntactic context.
3. Use Haig (2018) as the principal source for the analyses specified here.
4. Keep Standard Kurmanjî claims qualified where Haig notes variation, especially gender distinctions after indefinite `-ek`.
5. Do not create a prefix paradigm or plural noun paradigm from analogy.
6. Each applied task must include an answer criterion or model analysis; the answer must not require knowledge that the lesson has not taught.

## 3. Lesson 01 — مۆرفۆلۆجی و پێکهاتەی وشە

### 3.1 Learning outcomes

After revision, learners should be able to:
1. Distinguish a word used independently from a bound morpheme.
2. Explain the difference between the discipline of morphology and an individual morpheme.
3. Recognize that a word may contain a lexical element and an attached grammatical or word-forming element.
4. Explain why a sound sequence is not automatically a morpheme: its form and function must be supported by comparison.
5. Identify what evidence is needed before assigning a segmentation.

### 3.2 Recommended teaching sequence

1. Retain the current opening definition of morphology and the distinction between word and morpheme.
2. Add a concise paired explanation of free versus bound units. Use the already source-attested nominal pair `gund` / `gund-ek` from Haig Table 7 only as a carefully labelled preview:
   - `gund`: the noun form in the cited paradigm;
   - `-ek`: the attached singular indefinite marker;
   - `-ek` is not an independent word in this construction.
3. Make clear that the full grammatical distribution of `-ek` is taught in Lesson 04. Lesson 01 must not pre-empt the detailed case/ezafe analysis.
4. Add a small “how to analyze” sequence:
   - observe the complete form;
   - compare a related form;
   - identify a recurring segment;
   - verify that the segment has a consistent grammatical function;
   - cite the source and state the limits of the analysis.
5. Retain the warning that not every phonological segment is a morpheme.

Do not invent a new Kurmanjî word or a fabricated segmentation to make the introductory diagram look complete. The `gund` / `gund-ek` preview is permissible only with its Haig Table 7 attribution and the stated narrow purpose.

### 3.3 Worked example template

Use the source-attested preview with a limited analysis:
- full form: `gund-ek`;
- recurring lexical noun form: `gund`;
- attached marker: `-ek`;
- function: singular indefiniteness in the cited Standard Kurmanjî paradigm;
- contrast: `gund` is the noun form without the indefinite suffix in the table; the attached suffix is bound in this construction;
- source: Haig (2018), Table 7.

Do not call `gund` “the root” unless the source's analysis and the approved course terminology explicitly support that label. At this introductory stage, “noun form” is safer than making a root/base/stem decision prematurely.

### 3.4 Practice and model-answer criteria

Recommended task: explain why `-ek` is treated as a bound morpheme in `gund-ek`, and state what evidence supports that analysis.

A complete answer should:
- identify `gund` as the noun form in the cited paradigm;
- identify `-ek` as the attached singular indefinite marker;
- explain that `-ek` occurs attached to the noun in the cited construction;
- cite Haig Table 7;
- avoid claiming that every occurrence of the same letters in every word is this suffix.

Add a second conceptual question asking why a sound segment alone is insufficient evidence for morpheme status. The answer should mention comparison and grammatical function, not merely position.

### 3.5 Acceptance checklist

- [ ] Morphology and morpheme are explicitly distinguished.
- [ ] Free word and bound morpheme are contrasted.
- [ ] The only Kurmanjî illustration is source-attested and attributed to Haig Table 7.
- [ ] `-ek` is clearly labelled as a preview; its fuller nominal paradigm is deferred to Lesson 04.
- [ ] No unsupported root/base/stem segmentation is introduced.
- [ ] At least one applied question has model-answer criteria.
- [ ] The lesson retains the Standard Kurmanjî and dialect-variation note.

## 4. Lesson 02 — ڕەگ، پێشگر و پاشگر

### 4.1 Learning outcomes

After revision, learners should be able to:
1. Explain the working distinction between root and base.
2. Define a prefix by its position before a base and a suffix by its position after a base.
3. Explain why position alone does not establish a morpheme's grammatical function.
4. Identify which proposed segmentations are actually supported by the evidence.
5. Recognize that the course's term for “stem” remains provisional until approved.

### 4.2 Resolve root, base and stem without collapsing them

Use the working register's distinction:
- root (`ڕەگ`) is the core lexical element;
- base (`بنەڕەت`) is the form to which a morphological operation applies and may contain more than a root;
- stem (`ستێم`) is a provisional label for the form used as the base for inflection; it must not be inserted as a settled learner-facing term without owner/editor approval.

The current lesson correctly warns that root and base can differ, but it does not give a worked, source-verified derivation. The revision must preserve that caution rather than manufacture a three-way example.

### 4.3 Prefix/suffix teaching gap

The current lesson defines prefix and suffix but contains no fully worked, source-verified prefix example. The existing `-ek` reference is supported as a suffix, but its detailed analysis belongs in the nominal paradigm and is expanded in Lesson 04.

Implementation rules:
- Retain the positional definitions of prefix and suffix.
- Use `-ek` only as a cross-reference to the source-attested nominal suffix, with the reminder that its complete function is taught in Lesson 04.
- Do not add a Kurmanjî prefix example until an exact form, segmentation and function have been checked in Haig or another approved Standard Kurmanjî source.
- Do not assume that a verb-initial sequence is a prefix simply because it appears at the beginning of a word.
- If a sourced prefix example cannot be verified, state that the lesson's prefix definition is conceptual at this stage and record the example gap. This is preferable to an invented form.

### 4.4 Worked-analysis protocol

Until a verified prefix example is available, the worked analysis should focus on the source-supported suffix preview:
- show the whole form `gund-ek`;
- identify the noun form and attached suffix;
- label the function of `-ek` only as supported by Haig Table 7;
- explicitly state that this does not settle the general root/base/stem analysis of every word.

If the course owner later supplies or approves a source-verified prefix example, add it as a separate parallel analysis. Do not infer it from the suffix example.

### 4.5 Practice and model-answer criteria

Recommended tasks:
1. Define root and base in the course's working terminology.
2. Explain the positional difference between a prefix and a suffix.
3. Identify `-ek` in `gund-ek` and explain why it is a suffix in the cited form.
4. Explain why the lesson does not yet provide a Kurmanjî prefix segmentation.

Expected answers must:
- preserve root/base distinction;
- mark “stem” as provisional or omit it from learner-facing terminology until approved;
- identify `-ek` as the attached suffix, not as a prefix;
- cite Haig Table 7 for its function;
- state that no prefix example is being added without source verification.

### 4.6 Acceptance checklist

- [ ] Root and base have separate definitions and are not used interchangeably.
- [ ] “Stem” remains provisional pending owner/editor approval.
- [ ] Prefix and suffix are defined positionally but not identified from position alone.
- [ ] `-ek` is presented as a source-attested suffix and linked forward to Lesson 04.
- [ ] No unsourced prefix example or unsupported segmentation is added.
- [ ] Exercises assess the actual taught distinctions and include answer criteria.

## 5. Lesson 03 — ناو، ڕەگەزی ڕێزمانی و ژمارە

### 5.1 Learning outcomes

After revision, learners should be able to:
1. Distinguish grammatical gender from natural/biological sex.
2. Recognize that Standard Kurmanjî nouns may be grammatically masculine or feminine in the singular.
3. Explain the singular/plural distinction without assuming one universal plural formation rule.
4. Identify the head noun in a noun phrase.
5. Explain that the ezafe form is controlled by the gender/number features of the head noun, not simply by the following modifier.
6. Recognize that the Standard Kurmanjî plural ezafe paradigm neutralizes the masculine/feminine distinction, as described by Haig.

### 5.2 Gender: add a source-checked noun contrast

The current lesson explains grammatical gender cautiously but gives no concrete masculine/feminine noun pair. Haig Table 7 provides a source-checked singular comparison:
- `gund`: masculine singular noun in the paradigm;
- `jin`: feminine singular noun in the paradigm.

Use these as a minimal illustration of grammatical gender, not as a claim that natural sex determines every noun's grammatical gender. Keep the exact forms and source attribution.

Do not introduce additional nouns or claim that a noun's grammatical gender can always be guessed from its meaning.

### 5.3 Number and plural forms

The current lesson correctly warns that plural formation is not governed by one universal rule, but it contains no actual plural example.

Implementation rules:
- Retain the qualified explanation that noun plural forms depend on the noun and its paradigm.
- Explain that plural gender distinctions are neutralized in the Standard Kurmanjî ezafe paradigm, following Haig.
- Do not create a plural form by analogy or invent a plural table.
- Add an exact plural example only after its form and context have been checked in an approved source. If no such example is approved, keep the explanation conceptual and clearly record the remaining example gap.

### 5.4 Ezafe agreement: identify the head noun

The current lesson says that ezafe reflects gender and number but does not explicitly identify the controller of agreement.

Add a short explanation:
- the head noun is the noun being modified or possessed;
- the ezafe marker attaches to the head noun;
- the ezafe form reflects the relevant gender/number features of that head noun in the cited Standard Kurmanjî paradigm;
- the following adjective or possessor does not itself determine the head noun's ezafe form.

For concrete phrase analysis, cross-reference the already source-verified examples taught in the adjacent lessons:
- `bajar-ek-î mezin` — Haig §2.3.1, example (4), adjective construction;
- `mal-a me` — Haig §2.3.1, example (5), possessor construction.

These examples may be used as cross-references or brief recap examples only if the lesson explains that their detailed analysis belongs to Lessons 05–06. Do not create new noun phrases for Lesson 03.

### 5.5 Practice and model-answer criteria

Recommended tasks:
1. Identify the grammatical gender labels attached to `gund` and `jin` in Haig Table 7.
2. Explain why grammatical gender is not the same as natural sex.
3. Identify the head noun in a source-verified ezafe phrase already taught elsewhere in the course.
4. Explain which element controls the ezafe form.
5. State why the course does not provide a single plural suffix rule for every noun.

Expected answers should:
- identify `gund` as masculine singular and `jin` as feminine singular in the cited paradigm;
- distinguish grammatical class from natural sex;
- identify the noun as the head;
- say that ezafe agreement is tied to the head noun;
- avoid inventing plural forms or universalizing a single pattern.

### 5.6 Acceptance checklist

- [ ] At least one source-verified masculine/feminine singular noun contrast is shown.
- [ ] Grammatical gender is explicitly distinguished from natural sex.
- [ ] The lesson does not invent or overgeneralize plural formation.
- [ ] Plural ezafe gender neutralization is explained with Haig attribution.
- [ ] The head noun is explicitly identified as the controller of ezafe agreement.
- [ ] Any phrase examples are source-verified and cross-referenced to their detailed lessons.
- [ ] Exercises include answer guidance and preserve dialect qualifications.

## 6. Lesson 06 — خاوەنداری و جێناوە خاوەندارییەکان

### 6.1 Scope decision is required

The current title promises a broad lesson on possession and possessive pronouns, but the current content primarily teaches:
- possession expressed through an ezafe construction;
- an oblique personal pronoun functioning as possessor (`mal-a me`);
- same-clause coreferential possession with reflexive `xwe`.

It does not provide a full possessive-pronoun paradigm.

The course owner must choose one of two paths before learner-facing editing:

**Path A — Narrow the title to match existing coverage.** Retain the current source-supported content and adjust the title/objectives to describe ezafe possession and reflexive `xwe`. This path requires explicit owner approval for the title change.

**Path B — Retain the broad title and expand the content.** Add a full possessive-pronoun paradigm only after it has been checked against an approved Standard Kurmanjî source, with every form, case distinction, gloss and usage context verified. Do not reconstruct a paradigm from `mal-a me` or from personal pronoun tables alone.

Until the owner decides, keep the existing title and content unchanged; mark the scope issue as a blocking editorial decision.

### 6.2 Teach `mal-a me` as an ezafe possessor construction

Haig (2018), §2.3.1, example (5), supports:
`mal-a me` — “our house”.

Required analysis:
- `mal`: head noun, “house”;
- `-a`: feminine ezafe marker agreeing with the head noun;
- `me`: first-person plural oblique personal pronoun functioning as possessor;
- whole phrase: “our house”.

Key teaching point: `me` is an oblique personal-pronoun form used as the possessor in this construction. It is not the direct-case form, and `-a` is not an independent possessive suffix. Ezafe agreement and possessor case are separate grammatical facts.

### 6.3 Teach `xwe` within its supported same-clause scope

Haig §2.2.3 supports the reflexive example:
`Ez li mal-a xwe me.`
The seed glosses this as “I am at my own house.”

The rule must remain narrowly stated:
- when the possessor is coreferential with the subject within the same clause, Standard Kurmanjî uses reflexive `xwe` in place of a personal pronoun;
- in the cited same-clause context, `mal-a min` is not the appropriate form for the subject's own house;
- do not generalize this rule to every possessive relation or every clause configuration;
- when the possessor refers to someone other than the clause subject, analyze the full sentence and source context rather than assuming `xwe` or a personal pronoun automatically.

Do not invent an external-possessor contrast sentence. The existing `mal-a me` example is a possessor construction but is not a controlled minimal pair with the first-person singular reflexive clause. Explain the different grammatical facts rather than presenting them as a one-feature contrast.

### 6.4 Recommended lesson architecture

1. Define possession through an ezafe construction.
2. Present `mal-a me` with segmentation and labels.
3. Explain the oblique form of the possessor separately from ezafe agreement.
4. Introduce reflexive `xwe` and its same-clause coreference condition.
5. Present `Ez li mal-a xwe me` with a constituent-by-constituent explanation.
6. Add a short “scope of the rule” note: `xwe` is not a universal replacement for every possessive pronoun.
7. End with a scope reminder: the lesson does not teach a complete possessive paradigm unless Path B is approved and sourced.

### 6.5 Practice and model-answer criteria

Recommended tasks:
1. Label the head noun, ezafe marker and possessor in `mal-a me`.
2. Explain why `me` is identified as an oblique pronoun form.
3. In `Ez li mal-a xwe me`, identify the subject and explain the coreference relation of `xwe`.
4. State the scope limit of the reflexive rule.
5. Identify what additional evidence would be needed before claiming that the lesson teaches a full possessive-pronoun paradigm.

Expected answers should:
- identify `mal`, `-a` and `me` correctly;
- state that the ezafe agrees with the head noun while the possessor is oblique;
- explain that `xwe` refers back to the subject in the same clause in the cited example;
- avoid generalizing beyond the verified context;
- distinguish a focused possession lesson from a complete pronoun paradigm.

### 6.6 Acceptance checklist

- [ ] Owner has chosen Path A (narrow title) or Path B (source-verified expansion).
- [ ] No broad possessive paradigm is claimed unless all forms are sourced and checked.
- [ ] `mal-a me` is segmented as head noun + feminine ezafe + oblique possessor.
- [ ] `xwe` is explained only within the verified same-clause coreference scope.
- [ ] The existing Latin examples remain unchanged unless a separately approved source correction is made.
- [ ] Exercises include model-answer criteria.
- [ ] Standard Kurmanjî and dialect-scope notes remain visible.

## 7. Cross-lesson sequencing and hand-offs

To avoid repetition and preserve a coherent progression:
1. Lesson 01 introduces word vs morpheme and previews `-ek` only as a bound suffix.
2. Lesson 02 introduces root/base and prefix/suffix definitions, while leaving unsourced prefix segmentation explicitly unresolved.
3. Lesson 03 introduces grammatical gender, number and head-noun agreement, with no invented plural forms.
4. Lesson 04 provides the full `-ek` and oblique-case paradigm and the contrast with ezafe.
5. Lesson 05 provides the full adjective/possessor ezafe constructions.
6. Lesson 06 develops possession and the reflexive `xwe`, without claiming without claiming a full possessive paradigm unless approved.

This sequence prevents Lesson 01–03 from prematurely duplicating Lessons 04–05 and keeps Lesson 06's scope transparent.

## 8. Owner/editor decisions required before implementation

1. Approve the Sorani definition and use of root vs base; approve or replace the provisional label for stem.
2. Decide whether Lesson 06 is narrowed to its actual ezafe/reflexive scope or expanded with a fully sourced possessive paradigm.
3. Approve any proposed explanatory wording and model-answer format.
4. Confirm that Haig (2018) remains the principal reference for the course's Standard Kurmanjî scope.
5. Approve any learner-facing lesson edits separately before they are applied.

These are explicit gates. The specification does not presume the owner's answers.

## 9. Source register

1. Geoffrey Haig (2018), “Northern Kurdish (Kurmanjî),” Table 7, §2.2.1 and §2.3.1, especially examples (4) and (5), printed pp.115–119.
   Full chapter: https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf
   Focused §2.3 extract: https://www.uni-bamberg.de/fileadmin/aspra/06_Team/Publications_and_CV/haig_2018_ch.2.3_northern_kurdish.pdf
2. The repository seed inspected for this specification: `docs/kurmanji-content-seed-part-04.sql`, blob SHA `0e4bf967e3a0f7ce2d55b53199c0b417807b4930`.
3. The source audit: `docs/KURMANJI-COURSE-2-LESSONS-03-06-EZAFE-CASE-SOURCE-AUDIT-2026-11-23.md`, blob SHA `bad8bd316b4757813e3a43b41875ea2855f47114`.
4. The working terminology register and integrated revision blueprint provide course-wide terminology and implementation controls.

## 10. Definition of done and change boundary

The specification is ready for learner-facing implementation only when:
- the blocking owner decisions are recorded;
- all Kurmanjî forms and glosses are source-checked in context;
- provisional Sorani terminology is approved or remains explicitly provisional;
- each lesson meets its acceptance checklist;
- a second source/linguistic review and a separate instructional review are completed.

**Change boundary:** this file is a documentation-only specification. No learner-facing lesson, HTML, SQL seed, application code, migration, database, Supabase resource, main branch, deployment or production data was changed. No runtime, navigation, release or production test is claimed.
