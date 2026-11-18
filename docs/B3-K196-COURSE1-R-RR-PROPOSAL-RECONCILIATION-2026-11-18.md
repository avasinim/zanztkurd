# Course 1 — K196 reconciliation of the R/RR correction proposals

**Date:** 2026-11-18  
**Repository:** `avasinim/zanztkurd`  
**Working branch:** `fix/kurmanji-ci-current-migration`  
**Starting HEAD:** `2decc29e39ad764c0f2f9ce8404cd0b6792c2414`  
**Pre-work backup:** `backup/b3-k196-rr-proposal-reconciliation-before-2026-11-18`  
**Status:** Documentation-only proposal reconciliation. Owner approval and qualified native-editor review remain pending.

## 1. Purpose

The earlier 26-lesson correction sheet proposed removing the Lesson 04 RR row and described the source evidence as insufficient to mention RR orthographically. The later source reconciliation, `KURMANJI-COURSE-1-R-RR-ORTHOGRAPHY-SOURCE-RECONCILIATION-2026-11-17.md`, provides more precise primary-source evidence and qualifies that earlier proposal.

This note updates the proposal logic only. It does not modify lesson HTML, split seed SQL, historical migrations, application code, or learner-facing content.

## 2. Evidence position to use in future editorial review

The sources support all of the following, with scope kept explicit:

1. The Hawar-based alphabet inventory remains 31 independent letters; `rr` is not a 32nd independent letter.
2. A phonetic tap/flap versus trill distinction is described in Kurmanji phonology.
3. Word-initial written `r` is described as trilled in the cited grammars, while ordinary spelling remains single `r` (for example, `roj`, not `rroj`).
4. Thackston (2006, printed p. 2) explicitly says that the trill is only sporadically indicated in orthography by `rr`, with `pir/pirr` as an example.
5. The University of Arizona Kurmanji orthography overview similarly describes optional/occasional marking; Haig (2018) and Haig & Öpengin (2018) support the phonetic distribution but should not be treated as independent proof of a regular spelling contrast.

**Editorial limit:** this evidence does not establish a universal, obligatory, productive, or predictable `r`/`rr` spelling rule across all regions, writers, or words. It also does not establish a minimal pair for the course.

## 3. Revised proposal by lesson

### L04 — consonants, alphabet inventory, and pronunciation

**Earlier proposal:** remove RR from the 23-consonant inventory and, if useful, mention it only as a carefully scoped pronunciation/orthography note.

**Reconciled proposal:**
- Keep the 31-letter Hawar inventory and 23-consonant-letter count unchanged.
- Move the `RR rr` row out of the main independent-letter inventory / grapheme-to-IPA table. The current row already labels it a digraph, not an independent letter; preserve that important qualification if the content is later redesigned.
- Add a separate note explaining that some descriptions report sporadic `rr` spelling to indicate a trill in particular non-initial forms (Thackston's `pir/pirr` example). Label this as occasional and source-specific, not a general spelling rule.
- Keep the tap/flap and trill discussion in the phonetics section, distinct from alphabet membership.
- Do not add a new minimal pair or infer spelling from pronunciation.

**Candidate wording (not approved for publication):**

> «لە ئەلفبێی هاواردا ٣١ پیتی سەربەخۆ هەن؛ rr پیتێکی سەربەخۆی ئەم ئەلفبێیە نیە. لە هەندێک سەرچاوەدا ئاماژە بەوە کراوە کە trill هەندێک جار بە rr لە نووسین نیشان دەدرێت، بەڵام ئەم بەکارهێنانە کەمجارە و یاسایەکی گشتی و پێویست نیە. جیاوازیی tap/flap و trill جیاوازیی دەنگناسییە و نابێت لەگەڵ ژمارەی پیتەکانی ئەلفبێ تێکەڵ بکرێت.»

The Sorani phonetic terminology in this candidate requires native Sorani editorial review.

### L06 — reading examples and the word `roj`

**Reconciled proposal:**
- Preserve the attested spelling `roj`; do not change it to `rroj`.
- If the lesson mentions the initial trill, state that the initial sound is trilled in the cited descriptions but written with a single `r`.
- Do not use `roj` as evidence for the sporadic non-initial `rr` convention.
- Keep pronunciation and orthographic representation in separate fields/notes.

**Candidate wording (not approved for publication):**

> «لە وشەی roj ـدا، پیتی r لە سەرەتای وشەدا بە دەنگی trill دەخوێندرێتەوە، بەڵام نووسینی وشەکە بە یەک r دەمێنێتەوە. هەندێک سەرچاوە بەکارهێنانی کەمجاری rr بۆ نیشاندانی trill لە هەندێک وشەی دیکە باس دەکەن؛ ئەمە یاسایەکی گشتی نیە.»

### L26 — final review and self-assessment

**Earlier proposal:** remove or avoid the broad RR spelling claim because it was treated as unsupported.

**Reconciled proposal:**
- Replace that overly categorical rationale with the qualified evidence position in section 2.
- Keep the 31-letter count.
- Do not teach RR as an extra letter or a universal spelling contrast.
- If the review includes RR, assess only the distinction between (a) independent alphabet letters, (b) phonetic trill/flap, and (c) occasional orthographic `rr` marking.
- Preserve the existing non-certification / formative self-assessment disclaimer in Lesson 26.

**Candidate assessment objective (not a new learner-facing question):**

> Learner can distinguish an independent Hawar letter from a digraph/convention, explain that initial `r` may be trilled while remaining single in spelling, and recognize that occasional `rr` marking is source-specific rather than obligatory.

Any new Kurmanji assessment sentence or dialogue still requires qualified native-speaker validation.

## 4. Cross-lesson consistency requirements

When and only when the owner approves a reference-variety and house-style decision, review L04, L06, L08 and L26 together so that:
- the alphabet count remains 31;
- `rr` is not counted as an independent letter;
- tap/flap and trill are not collapsed into spelling rules;
- initial `r` examples such as `roj` retain their attested single-`r` spelling;
- sporadic `rr` usage is described as occasional and source-scoped;
- no unverified minimal pair or productive rule is introduced;
- Sorani explanation wording is copy-edited separately from Kurmanji forms.

## 5. Decision gates and protected scope

- **Owner approval:** pending for the reference variety and orthographic house policy.
- **Native Kurmanji review:** pending for exact learner-facing forms and regional scope.
- **Native Sorani review:** pending for the proposed Sorani explanatory wording.
- **Lesson edits:** not authorized by this document.
- **Seed/migration changes:** not authorized by this document and remain a separate data-lineage/release gate.

No lesson page, seed SQL, migration, CI workflow, application code, database, Supabase object, PR, or deployment artifact was changed. No tests were run because this commit is documentation-only. Course inventory remains Course 1 = 26 lessons and Course 2 = 12 lessons.

## 6. Source trail

- W. M. Thackston (2006), *Kurmanji Kurdish: A Reference Grammar with Selected Readings*, printed p. 2, “Alphabet and sounds” — sporadic `rr` orthographic marking and `pir/pirr`.
- Geoffrey Haig (2018), “Northern Kurdish (Kurmanjî),” §2, especially phonology — word-initial trill and phonetic distribution.
- Geoffrey Haig & Ergin Öpengin (2018), “Kurmanjî Kurdish in Turkey: Structure, varieties, and status,” section “Trilled and flapped /r/” — phonetic distinction and scope.
- University of Arizona, Iranian Languages, “Kurmanji Kurdish,” “Orthography” — occasional `rr` marking.
- Repository source reconciliation: `docs/KURMANJI-COURSE-1-R-RR-ORTHOGRAPHY-SOURCE-RECONCILIATION-2026-11-17.md`.
- Earlier proposal being qualified: `docs/KURMANJI-COURSE-1-26-LESSON-CORRECTION-PROPOSAL-2026-11-16.md`.

**Disposition:** K196 is a traceable correction to the editorial proposal, not a change to course content and not a release approval.
