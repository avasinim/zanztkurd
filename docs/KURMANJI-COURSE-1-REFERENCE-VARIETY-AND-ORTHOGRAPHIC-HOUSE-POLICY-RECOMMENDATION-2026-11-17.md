# Course 1 — reference variety and orthographic house-policy recommendation

**Date:** 2026-11-17  
**Repository:** `avasinim/zanztkurd`  
**Working branch:** `fix/kurmanji-ci-current-migration`  
**Baseline HEAD:** `97d661f080187d0bb1dfdc820f6fbd119cc206ba`  
**Pre-work backup:** `backup/c1-reference-variety-policy-before-2026-11-17`  
**Status:** Evidence-based recommendation for owner decision; not an approved policy and not authorization to edit lessons.  
**Protected inventory:** Course 1 = 26 lessons; Course 2 = 12 lessons.

## 1. Executive recommendation

For the Sorani-mediated Course 1 that teaches Kurmanji, adopt **Standard Kurmanjî in the Hawar-based modified Roman alphabet as the provisional written teaching target**, while explicitly distinguishing that written standard from the full range of spoken Kurmanji varieties.

This is the strongest defensible working recommendation from the reviewed academic descriptions. It is **not** a claim that all Kurmanji speakers speak one uniform dialect, that the standard is a pure transcription of Botan speech, or that the owner has already approved this policy.

Do not silently impose this recommendation on learner-facing lessons or seed data. Keep C1-A01 open until the owner approves the reference variety and house style.

## 2. Direct evidence and source scope

### 2.1 Haig (2018): Standard Kurmanjî

Geoffrey Haig, “Northern Kurdish (Kurmanjî),” in *The Languages and Linguistics of Western Asia: An Areal Perspective*, ed. Geoffrey Haig and Geoffrey Khan, De Gruyter Mouton, 2018, pp. 106–158, DOI: https://doi.org/10.1515/9783110421682-004.

In §2, “A grammatical sketch of ‘Standard Kurmanjî’” (chapter printed p. 109 onward), Haig describes a reasonably widely accepted written standard, based loosely on the dialect of the Cizre/Botan region in southeastern Turkey. It uses a modified Roman alphabet; its conventions derive substantially from Celadet Ali Bedir Khan's *Hawar* articles of the 1930s and were later codified in Bedir-Khan and Lescot (1970). Haig explicitly cautions that the standard is not a pure rendering of Botan speech and incorporates forms from other dialects. The chapter separately discusses regional variation and treats Behdinî/Northern Iraq in a separate chapter of the volume.

Open chapter: https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf

**What this supports:** a practical, established written reference target called Standard Kurmanjî; Hawar-based modified Roman orthography; a loose Cizre/Botan basis; and an explicit need to keep regional variation visible.

**What this does not support:** treating Standard Kurmanjî as identical to every spoken dialect, or automatically applying its grammatical description to every Behdinî/Northern Iraq variety without review.

### 2.2 Haig & Öpengin (2018): standardization and variation

Geoffrey Haig & Ergin Öpengin, “Kurmanjî Kurdish in Turkey: Structure, varieties, and status,” in Christiane Bulut (ed.), *Linguistic Minorities in Turkey and Turkic-speaking Minorities of the Peripheries*, Harrassowitz, 2018, pp. 157–230.

The authors describe the widely used written variety as based on the Hawar conventions and explain that it is a practical standardized norm rather than a full phonetic representation. They note that it suppresses some phonetic distinctions and regionally restricted sounds. Their discussion also documents the plurality of Kurmanji varieties.

Open PDF: https://www.uni-bamberg.de/fileadmin/aspra/06_Team/Publications_and_CV/HaigOepengin2018_Kurmanji_Kurdish_.pdf

**What this supports:** use the written standard consistently for literacy and written examples, but label phonetic and regional alternatives instead of treating spelling as a complete record of pronunciation.

### 2.3 Scope caution: Behdinî and other varieties

Haig's 2018 volume treats Behdinî varieties of Northern Iraq separately from the chapter's eastern Anatolian Kurmanji description. This is a warning against silently conflating all regional varieties under a single undifferentiated grammar. It does not mean Behdinî is “not Kurmanji”; it means the evidence and variety scope of each grammatical claim must be stated accurately.

## 3. Proposed house policy — pending owner approval

If approved, use the following editorial rules:

1. **Written target:** Standard Kurmanjî in the Hawar-based modified Roman alphabet.
2. **Variety label:** Call it “Standard Kurmanjî (Hawar-based written standard)” in internal editorial metadata. Avoid calling it the only correct spoken Kurmanji.
3. **Regional variation:** Record a regional form only when a reliable source or qualified reviewer identifies its geography and scope. Mark it as a variant; do not silently mix variants in a single paradigm.
4. **Behdinî/Northern Iraq:** Do not automatically generalize a claim from Haig's eastern Anatolian Standard Kurmanjî sketch to Behdinî. Seek variety-specific evidence and reviewer confirmation where relevant.
5. **Orthography vs pronunciation:** Keep graphemes, phonemes, and phonetic realizations distinct. Do not add phonetic contrasts to the alphabet unless the chosen orthographic policy explicitly requires them.
6. **Hawar alphabet inventory:** Preserve the established 31-letter inventory used by the current evidence corpus. Do not count digraphs or occasional spelling conventions as extra independent letters without a documented graphemic analysis.
7. **Examples:** Prefer examples directly attested in a cited source. Mark adapted and instructor-created examples internally and require qualified native Kurmanji review for naturalness, morphology, register, and dialect scope.
8. **Sorani explanations:** Copy-edit the Sorani instructional prose independently. Sorani terminology decisions must not alter the spelling or morphology of Kurmanji examples.
9. **Pathway separation:** Keep this Sorani-mediated course distinct from the separate fully Kurmanji-medium Latin/Hawar pathway. Do not translate one course line by line into the other.

## 4. Decision register

| Decision | Current recommendation | Status |
|---|---|---|
| Written reference variety | Standard Kurmanjî, Hawar-based modified Roman orthography | Proposed; owner approval pending |
| Spoken reference variety | Do not designate one spoken dialect as universal; select reviewer expertise matching each claim | Open |
| Cizre/Botan relationship | Describe the written standard as loosely based on this region, not as a pure transcript | Supported by Haig (2018) |
| Regional alternatives | Preserve with explicit variety labels and evidence | Required editorial practice |
| Behdinî transfer | No automatic transfer of claims; verify separately | Required scope control |
| 31-letter inventory | Preserve; do not count occasional `rr` as an additional alphabet letter | Current evidence position |
| Learner-facing edits | None until owner approval and native-editor review | Blocked by approval gate |

## 5. Impact on the Course 1 action register

- **C1-A01 (P0):** Evidence is sufficient to make the recommendation above, but the decision remains open until the owner approves it.
- **C1-A02 (P0):** The `r/rr` source reconciliation should be interpreted under the approved written-standard policy. Do not turn sporadic `rr` marking into a productive universal rule.
- **C1-A03 and C1-A07 (P0/P1):** Source-backed standard forms still require sentence-level provenance and native-editor review.
- **C1-A08 (P1):** Sorani copy-edit remains a separate review stream.
- No other action-register item is closed by this recommendation.

## 6. What remains unknown

The reviewed sources do not decide which regional pronunciation or speaker community the owner wants to privilege in audio, dialogue, or oral assessment. They also do not establish that every current lesson example conforms to a single chosen house style. Those decisions require owner direction and a qualified reviewer of the selected variety.

## 7. Protected scope and next step

No lesson, seed, code, CI, runtime, migration, database, Supabase object, PR, or deployment artifact was changed. No production access was used. Course inventory remains unchanged.

**Next safe step:** owner reviews and either approves, amends, or rejects the proposed written reference target. Only after that decision should the team prepare a separate, reviewable list of proposed lesson-level harmonizations. Do not edit the lessons or seed before explicit approval.
