# B3 Kurmanji: hilgirtin Attestation, Past Alignment, and Dialect Boundaries
Date: 2026-11-17
Branch: fix/kurmanji-ci-current-migration
Scope: documentation-only evidence update. Existing lessons and application behavior are out of scope.

## Executive summary
This audit adds a directly published Kurmanji example for hilgirtin in the simple past and tightens the teaching note on past alignment: Standard Kurmanji commonly shows an ergative pattern in transitive past clauses, but recent comparative research documents dialect-specific deviations. Materials must name their target variety rather than present one pattern as exceptionless across Kurmanji.

## 1. Direct published attestation: hilgirtin
The Kurdish-language journal Kanîzar, issue 16 (2018), page 18, prints the transitive past example set:
- Min al hilgirt.
- Te al hilgirt.
- Wê al hilgirt.
- Wî al hilgirt.
- Me al hilgirt.
- We al hilgirt.
- Wan al hilgirt.
This is direct paradigm-like evidence that the oblique agent pronouns occur with the invariant third-person singular verb form when the direct object is the singular noun al. It is not evidence for the full object-agreement paradigm: the object in these examples remains third-person singular.
The same journal page contrasts the present construction, where the direct/nominative subject pronouns appear with the present verb form. This is a useful compact teaching contrast.

## 2. Independent literary attestation
The 2006 Kurmanji narrative “Rostem II” (Pênûs, issue 20) includes the clause “min destê xwe ... hilgirt” in narrative context. This corroborates that hilgirt is used as a finite past form in prose, although the journal's Kanîzar paradigm is clearer for the pronoun/case contrast.

## 3. Dialect boundary: do not overgeneralize ergativity
The University of Arizona Iranian Languages Kurmanji overview describes the well-known Standard Kurmanji split: nominative/oblique pronouns and ergative alignment in the past domain.
However, Atlamaz, Demirok and Bağrıaçık's comparative work distinguishes KurmanjiA and KurmanjiB. Its discussion reports that KurmanjiB can show a double-oblique pattern in transitive past clauses, rather than the familiar oblique-agent/direct-object pattern. A separate thesis on two Kurmanji dialects reports that in the Muş dialect, past transitive verbs may appear in default third-person singular agreement rather than agreeing with the object.
Therefore, the safe teaching statement is: “In the selected Standard Kurmanji target variety, transitive simple-past clauses normally use an oblique agent and object-oriented agreement; dialects differ, and the target variety must be stated.” Avoid an unqualified claim that every Kurmanji dialect uses exactly the same past agreement pattern.

## 4. raketin and derketin: evidence ceiling
Kurdish Lessons lists raketin → raket and derketin → derket as past stems and gives examples including “Em doh xweş raneketin” and finite forms for derketin. This is useful pedagogical evidence, but it does not replace a published full paradigm or a dialect-tagged corpus sample.
Do not publish a complete raketin conjugation table on the basis of the single plural negative example. Likewise, do not infer all derketin person forms from the stem alone.

## 5. Morphological and instructional recommendations
1. Keep hilgirtin separate from hildan lexically; do not treat them as orthographic variants.
2. Use Kanîzar's Min/Te/Wê/Wî/Me/We/Wan + al hilgirt examples as attested third-person-singular-object clauses only.
3. Explain the transitive past alignment for the chosen target variety, with a clear dialect note.
4. Distinguish direct evidence, pedagogical generalization, and unverified paradigm cells.
5. Do not silently transfer a Standard Kurmanji table to Muş, KurmanjiB, Şemzînan, or other varieties.
6. No existing lesson wording is changed by this research note; owner approval is required before any lesson edit.

## Evidence matrix
| Claim | Source evidence | Status |
|---|---|---|
| hilgirtin finite past | Kanîzar 16/2018, p.18: Min/Te/Wê/Wî/Me/We/Wan al hilgirt | Direct published example set |
| hilgirtin in prose | Pênûs 20 (2006), “Rostem II”: min ... hilgirt | Independent literary attestation |
| Standard Kurmanji past alignment | University of Arizona Iranian Languages overview | General reference description |
| Dialect variation | Atlamaz et al.; thesis on two Kurmanji dialects | Comparative/academic qualification |
| raketin / derketin | Kurdish Lessons simple-past page | Pedagogical stem/example evidence; not full paradigm |

## Sources
1. Kanîzar, Kovara Zimanê Kurdî, Hejmar 16 (2018), p.18: https://portal.arsivakurd.org/wp-content/uploads/2021/08/kanizar_16.pdf
2. Pênûs, Hejmar 20 (2006), “Rostem II”: https://portal.arsivakurd.org/wp-content/uploads/2021/08/Penus-20.pdf
3. University of Arizona, Iranian Languages, “Northern Kurdish (Kurmanji)”: https://iranian-languages.arizona.edu/node/7
4. Atlamaz, Demirok & Bağrıaçık, “Split-Ergativity in Heritage Kurmanji and Georgian” / comparative paper: https://www.glossa-journal.org/article/9236/galley/23054/download/
5. “The Phrase Structure of Two Dialects of Kurmanji Kurdish”, Boğaziçi University repository: https://digitalarchive.library.bogazici.edu.tr/bitstreams/c22fcd85-97d8-4c48-98ab-8cc623449fff/download
6. Kurdish Lessons, “Simple Past Tense in Kurdish”: https://kurdishlessons.com/simple-present-tense-in-kurdish/

## Safety boundary
Documentation only on fix/kurmanji-ci-current-migration. No lesson text, lesson counts (26 + 12), app code, CI, seed, production Supabase, migrations, deployment, or PR #3 were changed.