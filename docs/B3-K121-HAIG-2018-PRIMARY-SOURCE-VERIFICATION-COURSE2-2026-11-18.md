# B3-K121 — Direct verification of Haig (2018) source forms and Course 2 citations

**Date:** 2026-11-18  
**Repository:** `avasinim/zanztkurd`  
**Branch:** `fix/kurmanji-ci-current-migration`  
**Pre-work HEAD:** `cfe2ac08e0ad3f802d82fcec7f2404525c41ea55`  
**Scope:** direct page-level verification of relevant Haig (2018) PDF passages and correction of prior repository transcription notes. Documentation-only.

## 1. Backup and boundary

- Pre-work backup: `backup/b3-k121-haig-primary-source-verification-before-2026-11-18`
- Pre-work SHA: `cfe2ac08e0ad3f802d82fcec7f2404525c41ea55`
- Main baseline: `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`

No lesson body, seed, migration, database, Auth, RLS, grant, runtime, page, test, CI workflow, deployment, PR or `main` was changed. Only three evidence documents are updated/added.

## 2. Primary source accessed

Haig, Geoffrey. 2018. “Northern Kurdish (Kurmanjî),” in *The Languages and Linguistics of Western Asia: An Areal Perspective*, pp. 106–158. DOI: https://doi.org/10.1515/9783110421682-004.

Direct PDF: https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf

The PDF itself states that §2 is a grammatical sketch of **Standard Kurmanjî**, loosely based on Cizre and Botan in southeastern Turkey, and that regional variation is discussed separately (pp. 107–108). This is the appropriate explicit scope for the standard paradigms below; it is not a universal statement about every Kurmanji variety.

## 3. Verified source facts and exact locators

### 3.1 Lesson 01 — indefinite singular `-ek`
- Haig Table 7, p. 115, prints:
  - masculine: `gund`, `gund-î`, `gund-ek`, `gund-ek-î`;
  - feminine: `jin`, `jin-ê`, `jin-ek`, `jin-ek-ê`.
- The table supports `gund-ek` as the singular indefinite form. It also shows the masculine/feminine direct/oblique distinction.
- Teaching consequence: the current `gund-ek` is source-attested. A beginner segmentation `gund + -ek` is a transparent pedagogical analysis, but label it as analysis, not a separate source quotation.

### 3.2 Lesson 03 — plural
- Haig §2.2.2, p. 116, Table 8: in Standard K., direct-case nouns do not inflect for plural; oblique plural uses `-a(n)`.
- The same page says direct indefinite plural `-in` is frequently cited in pedagogical works but is frequent mainly in Mardin and across the border in Syria; elsewhere it is rare or absent.
- Teaching consequence: the proposed table is justified only with this explicit scope. Do not teach `-in` as a universal direct plural suffix.

### 3.3 Lesson 04–06 — case, ezafe and possession
- Haig §2.3.1, p. 118, examples (4)–(5):
  - `bajar-ek-î mezin` — ‘a big town’; gloss identifies `bajar-ek-î` as town-indefinite-ezafe masculine.
  - `mal-a me` — ‘our house’; gloss identifies `mal-a` as house-ezafe feminine and `me` as 1PL oblique.
- Haig p. 119, example (9), explicitly contrasts `Ez li mal-a xwe me` with the disallowed coreferential `*mal-a min` in that same-clause construction. It states that `xwe` is obligatory where the possessor is coreferential with the same-clause subject.
- Teaching consequence: the lesson's `bajar-ek-î mezin`, `mal-a me` and `xwe` examples are source-attested. The case form `gund-ek-î` in Table 7 and ezafe form `bajar-ek-î` must be taught as different functions, not conflated.

### 3.4 Lesson 06–07 — pronouns and direct/oblique
- Haig §2.2.3, p. 117, Table 9, directly lists Standard Kurmanjî pronouns:
  - Direct: `ez, tu, ew; em, hûn, ew`.
  - Oblique: `min, te, wî/wê; me, we, wan`.
- Teaching consequence: the lesson's direct/oblique list is supported by the table. Keep third-person gender distinction `wî/wê` visible where relevant.

### 3.5 Lessons 08–09 — verb agreement, examples and negation
- Haig §2.6.1, pp. 125–126:
  - Table 13 gives present- and past-stem agreement suffixes.
  - The prose says finite verbs index one core argument: intransitive subject in all tenses, transitive subject in present tenses, and transitive object with past tenses.
  - Table 14, p. 126, directly prints the relevant contrast:
    - `ez dibêjim` (simple present, transitive);
    - `ez hatim` (simple past, intransitive);
    - `min xwar` (simple past, transitive);
    - `ez dihatim` and `min dixwar` (past progressive examples).
- Teaching consequence: the three examples already in the lesson are exactly source-attested. They should be explained as different argument structures and agreement patterns, not as interchangeable endings.
- Haig p. 126 also states that present indicative `na-` replaces `di-`, present subjunctive `ne-` replaces `bi-`, and the verbs `zanîn` and `karîn` use `ni-` in forms `nizanim/nikarim`. Past simple and past progressive use `ne-`; Western Kurmanjî (Adıyaman–Urfa) has a regional `na-` past-progressive pattern. This confirms that Lesson 10 must keep stem/TAM and variety distinctions explicit.

### 3.6 Lesson 09 — future quotation (important correction)
- Haig §2.6.4, pp. 128–129, says future is expressed by particle `(d)ê` or `wê` plus a present subjunctive form. High-frequency verbs such as `gotin` ‘say’ generally drop the `bi-` prefix in the future.
- Haig p. 129, example (27), prints the sentence in segmented lines:
  - `ew`
  - `dē`
  - `mesel-ē`
  - `ji`
  - `te`
  - `re`
  - `bēž-e`
  - gloss: ‘He will tell you the issue.’
- Reassembled exact source orthography: **`ew dē mesel-ē ji te re bēž-e`**.
- This exactly matches the current Course 2 Lesson 09 payload's Latin form. It is appropriate to label the sentence Q (exact quotation) with Haig 2018 §2.6.4, p. 129, example (27), provided the gloss and attribution remain accurate.
- **Correction:** the earlier repository claim-level register's variant `ew dê mesel-ê ji te re bêj-ê` was an erroneous transcription. K119 and K120 documentation has now been corrected to reflect the primary source. Do not “correct” the lesson's existing `dē / mesel-ē / bēž-e` to the inaccurate variant.

### 3.7 Lesson 10 — questions
- Haig's §2.6.3–2.6.4 includes subordinate and future examples, not a dedicated basic question-formation paradigm for yes/no and information questions.
- In the short glossed narrative in §5, p. 153, example (76), the source includes `ez=ê çawa b-êm=e cem te?`, glossed ‘How should I come to you?’ The text is adapted from an oral narrative recorded southeast of Midyat; Haig says its transcription has been adapted to Standard Kurmanjî orthography while the syntax remains as in the original and dialect features are noted (p. 152).
- Teaching consequence: a source-attested wh-question does exist in the chapter, but it is a complex narrative/future-subjunctive example, not a clean basic interrogative paradigm. It could be used as an advanced reading example with its narrative provenance, but it does not by itself close the lesson's need for simple yes/no and information-question teaching examples. Keep those basic examples on hold until a dedicated source or specialist review is available.

### 3.8 Lesson 11 — word order and Goal/recipient
- Haig §2.7.1, pp. 130–131, states neutral word order is **SOVG**, where G is a cover term for spatial goals, recipients of transfer verbs and addressees of speech verbs.
- It says word order is not rigid; direct objects may be fronted for pragmatic purposes.
- It says recipient/Goal position and marking vary. With `dan` ‘give’, all dialects usually place the recipient immediately after the verb in oblique case and without an adposition; southeastern dialects use the post-predicate position more extensively.
- Teaching consequence: the current lesson's SOV introduction is a simplification. It should retain SOV as an accessible core but add G and the actual source-supported qualification. Do not invent a new `dan` sentence and call it a quotation.

## 4. What this resolves and what remains open

**Resolved by direct source inspection:**
- The Lesson 09 future sentence exactly matches Haig p. 129, example (27); previous mismatch report was wrong.
- The source page/table locations for the Lesson 01, 03–09 nominal/verb examples are now directly checked.
- Lesson 11's SOVG and Goal/recipient generalization is explicit in Haig pp. 130–131.
- Lesson 10 has a source-attested wh-question in narrative text, but not a basic interrogative paradigm.

**Still requires separate verification or expert approval:**
- Lesson 02's exact morpheme-by-morpheme segmentation of `di-bêj-im`: Haig Table 14 confirms the whole form `dibêjim`, but does not itself present this particular hyphenated segmentation as a table entry. Treat segmentation as an analysis, not a verbatim quotation.
- Lesson 10's simple yes/no and basic information-question patterns.
- Any new instructor-created examples, regional variants, and Sorani translations.
- Lesson 12's review-versus-scored-test product decision.
- Native Kurmanji specialist and native Sorani editorial review.

## 5. Documents corrected in this pass

- `docs/B3-K119-KURMANJI-COURSE2-LESSON-PAYLOAD-AND-PEDAGOGICAL-COVERAGE-AUDIT-2026-11-18.md`: Lesson 09 now records that the current future form matches Haig.
- `docs/B3-K120-KURMANJI-COURSE2-SOURCE-VERIFICATION-AND-EXAMPLE-PROVENANCE-MATRIX-2026-11-18.md`: source availability, exact transcription and page-level evidence corrected.
- This K121 addendum records the direct primary-source verification.

## 6. Release disposition

**Course 2 remains NOT RELEASE-CERTIFIED.** The primary-source check strengthens the evidence for multiple examples, but does not close the pedagogical gaps in worked paradigms, interrogatives, native review or assessment specification. No lesson text was changed.
