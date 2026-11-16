# Kurmanji Course 1 — lessons 25–26 source review (2026-11-16)

## Scope and method

This review covers the final two Course 1 lesson payloads in `docs/kurmanji-content-seed-part-04.sql` and the lesson-26 static wrapper. It rechecks the existing review notes in `docs/KURMANJI-RELEASE-AUDIT.md` against the University of Arizona Kurmanji overview, Haig (2018), Haig & Öpengin (2015/2018), and relevant work on split-ergative Kurmanji.

This is a source-focused review, not a full copy-edit or a live-site test. It distinguishes the standard/neutral patterns from dialect and constructional variation. No lesson text, Latin Kurmanji spelling, seed SQL, migration, database, `main`, PR #3, or deployment was changed.

## Summary

| Lesson | Topic | Result | Main follow-up |
|---|---|---|---|
| 25 | Direct and oblique case | Core paradigms, pronouns, and present/past transitive contrast corroborated | Keep dialect/zero-marking caveats; qualify past verb agreement; independently proofread Sorani glosses |
| 26 | Final review and self-assessment | Review structure and most orthographic contrasts supported | Clarify that `rr` is a written representation of a trill in some conventions/dialects, not a separate letter in the 31-letter Hawar alphabet; add sourced minimal pair only if approved |

---

## Lesson 25 — direct and oblique case

### Supported
- Kurmanji has a two-way case opposition conventionally called Direct and Oblique. The labels should not be equated mechanically with nominative and accusative.
- Haig & Öpengin's standard paradigm supports the lesson's forms:
  - masculine singular: `gund / gund-î`, indefinite `gund-ek / gund-ek-î`
  - feminine singular: `jin / jin-ê`, indefinite `jin-ek / jin-ek-ê`
- The personal pronoun pairs are corroborated: `ez/min`, `tu/te`, `ew/wî,wê`, `em/me`, `hûn/we`, `ew/wan`.
- In a canonical present-tense transitive clause, the subject is Direct and the object Oblique. The lesson's `Ez wî mirovî dibînim` is independently attested by the University of Arizona resource with the same meaning (“I see that man”).
- In canonical past-tense transitive clauses, the agent/subject is Oblique and the patient/object Direct; the verb typically agrees with the Direct object. Haig (2018) and Baker & Atlamaz (2014) support this split-ergative pattern.
- The lesson correctly warns that this is a basic pattern, not an exceptionless rule across all dialects and constructions.

References:
- Haig & Öpengin (2018), “Northern Kurdish (Kurmanjî),” Table 6 and discussion of pronouns: https://www.uni-bamberg.de/fileadmin/aspra/06_Team/Publications_and_CV/HaigOepengin2018_Kurmanji_Kurdish_.pdf
- Haig (2018), “Northern Kurdish (Kurmanjî),” Table 7 and §2.7.2: https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf
- Haig & Öpengin (2015), “Gender and case in Kurdish”: https://www.uni-bamberg.de/fileadmin/aspra/06_Team/Publications_and_CV/haig_opengin_2015_gender_kurdish_offprint.pdf
- University of Arizona, “Kurmanji Kurdish”: https://iranian-languages.arizona.edu/node/7
- Baker & Atlamaz (2014), “On the Relationship of Case to Agreement in Split-Ergative Kurmanji and Beyond”: https://sites.rutgers.edu/mark-baker/wp-content/uploads/sites/199/2019/07/kurmanji-split-erg-distributed-July-2014.pdf

### Review flags
1. **Masculine singular zero marking:** the lesson appropriately says overt oblique marking may be absent in some dialects/constructions. Keep this qualification next to the table; do not imply every masculine noun follows one invariant visible suffix pattern.
2. **Ezafe interaction:** Haig notes that oblique marking can be suppressed when the noun is followed by ezafe. This is important because learners might otherwise mechanically add `-î/-ê` in every oblique context.
3. **Past-tense agreement:** the lesson says the verb agrees with the object in the canonical ergative pattern and then notes variation. Preserve both parts. Haig documents non-canonical patterns, including dialects with double-oblique objects and variation in agreement.
4. **`Min ew dît`:** structurally consistent with the standard past-transitive pattern, but the exact sentence was not found verbatim in the sources checked. Treat it as a plausible pedagogical example, not as a quoted source example. Other source examples independently demonstrate the same alignment.
5. **Sorani explanations:** the Sorani translations and explanatory terminology were not fully line-edited in this pass. They need a separate native Sorani editorial review.

**Assessment:** the lesson's central case system and paradigms are strongly corroborated. Its dialect and construction caveats are essential and should remain. The past example is plausible but not independently attested verbatim.

## Lesson 26 — final review and self-assessment

### Supported
- The contrasts `c/ç`, `s/ş`, `i/î`, and `u/û` are meaningful orthographic distinctions in the commonly used Kurmanji Latin/Hawar writing system. The University of Arizona resource gives the corresponding sound contrasts and examples including `çak`, `şaş`, `dil`, and `îro`.
- The University of Arizona source also notes that the trill/flap distinction is ignored in many standard orthographic contexts; where represented, the trill may be written `rr` rather than `r`. This supports teaching the contrast as a pronunciation/orthographic convention with appropriate scope.
- The review lesson's broad recap of vocabulary, questions, negation, word order, and direct/oblique case is consistent with the preceding course topics.
- The self-assessment table explicitly says it is informal and does not certify proficiency. This is pedagogically appropriate and avoids overstating the result of a self-check.

References:
- University of Arizona, “Kurmanji Kurdish” — orthography, phonemic distinctions, and `r/rr`: https://iranian-languages.arizona.edu/node/7
- Haig (2018), “Northern Kurdish (Kurmanjî)”: https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf
- Thackston, *Kurmanji Kurdish: A Reference Grammar with Selected Readings*: https://sites.fas.harvard.edu/~iranian/Kurmanji/kurmanji_complete.pdf

### Review flags
1. **`rr` scope:** the Hawar alphabet is conventionally listed as 31 letters; `rr` should not be described as an additional alphabet letter. Explain it as a digraph/orthographic representation used to mark the trill in descriptions or varieties that distinguish it from the flap. The lesson currently says that `r` and `rr` differ in some words; that is broadly defensible, but its wording could make the alphabet inventory unclear.
2. **Minimal pair:** the table gives `roj` but does not supply a clear minimal pair contrasting `r` and `rr`. Do not invent a pair. Add one only after it is verified in a reliable Kurmanji source and accepted by the course editor.
3. **`Ez naxwînim`:** the gloss “I do not read/study” is context-sensitive. It is a reasonable broad gloss, but learners should not assume one English/Sorani equivalent in every context.
4. **Vocabulary glosses:** `çak`, `şaş`, `dil`, and `îro` are supported by the Arizona overview; the full vocabulary and sentence table was not exhaustively dictionary-checked.
5. **Sorani copy-edit:** spelling, punctuation, and explanatory phrasing in the recap and self-assessment need a dedicated Sorani editorial pass.
6. **Title alignment:** the wrapper and seed title use `پێداچوونەوە`; the old course-plan title variant `پێداچونەوە` is already recorded in the repository audit. This pass did not change the course plan or any title.

**Assessment:** the lesson is suitable as a broad course recap and the informal self-assessment is correctly scoped. The main technical refinement is to distinguish the 31-letter alphabet from the optional `rr` digraph/convention and to source any minimal-pair example before adding it.

---

## Course 1 completion status

- Lessons 25–26 complete the source-review sequence for Course 1 lessons 01–26 in this review series.
- This means all 26 lessons have a corresponding source-review record in the current branch history; it does **not** mean all 26 lessons are fully certified or free of editorial issues. Earlier reviews record partial corroboration, dialect-sensitive examples, and Sorani translation work still outstanding.
- The highest-priority course-wide follow-up is a consolidated editorial/action register: separate confirmed factual errors (if any), dialect-sensitive alternatives, unsourced sample sentences, Sorani copy-edit items, and unresolved seed/test-database parity. Do not make bulk lesson edits from the review notes.
- The course's runtime and release gates remain separate: source review does not prove live lesson retrieval, RLS/enrollment behavior, progress persistence, or production readiness.
- No lesson content, Latin Kurmanji spelling, seed SQL, migration, database, `main`, PR #3, or deployment was changed in this pass.


## Addendum — final cross-check of the lesson-26 orthography table (2026-11-16)

A final close reading of the University of Arizona orthography page identified an internal example inconsistency that should be preserved as an explicit editorial flag:

- The prose says that the trill/flap contrast is often not represented in writing, and that where the contrast is written the trill is represented by `rr`.
- In the same page's letter table, the row labelled `rr` gives `roj` (“day”) as its example, but the example is spelled with a single `r`, not `rr`.
- Therefore, the page supports the general `r/rr` distinction, but its table example cannot by itself establish the spelling or pronunciation of `roj`. Do not cite that table row as decisive proof that the word should be written `rr`, and do not silently change the lesson's `roj`.
- The current lesson's wording that `r` and `rr` can distinguish forms in some words is compatible with the source's prose. The existing recommendation remains: describe `rr` as a digraph/convention rather than an extra letter in the 31-letter Hawar alphabet, and add a minimal pair only after independent verification from a second reliable source and course-editor approval.

The lexical checks for the lesson-26 examples were also refined:
- `çak` = “good”, `şaş` = “wrong”, `dil` = “heart”, `îro` = “today”, and `roj` = “day” have supporting dictionary or teaching-source evidence. The `şaş` / `şeş` distinction should be retained carefully: `şaş` means “wrong”, while `şeş` means “six”.
- This does not replace a full dictionary audit of every phrase or sentence in lesson 26.

### Addendum decision
No lesson text, seed, migration, database, wrapper, or release file was changed. This note narrows the evidentiary claim about `roj` and `rr`; it does not establish a confirmed error in the lesson itself.
