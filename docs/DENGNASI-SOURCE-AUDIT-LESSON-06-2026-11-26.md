# Dengnasi source audit — Lesson 6
Date: 2026-11-26

## Scope and evidence
- Lesson: **Dengrêziya kurmancî û avaniya kîteyan**
- Book: Husein Muhammed, *Dengnasî di kurdî de*
- Printed pages checked: **44–55**
- PDF physical pages checked: **54–65** (the printed page labels visible in the PDF establish the offset)
- Compared against: `docs/KURMANJI-DENGNASI-LESSON-AUTHORING.md`, lesson 6 in `docs/previews/dengnasi-content-html-payload-preview.json`, and `docs/previews/kurmanji-dengnasi-lesson-06-content-preview.html`.

## Overall result
The lesson outline follows the book's own section structure and already preserves most major explanations. It is not a PDF embed. However, the current draft is a selective summary: several source details, examples, footnotes and the complete voicing table are missing or compressed. Therefore this is **not yet a full source-completeness pass**.

## Source-backed omissions or details needing restoration

1. **Word-final vowels and spelling examples (printed p.45).**
   The draft summarizes final I/U/O as rare but omits the source's actual lists:
   - final I: `bi, çi, di, ji, li, ti`, colloquial `mi`;
   - final U: `du, ku, tu`, dialectal `çu`;
   - final O: masculine singular vocative `hevalo, kurro`, plural vocative suffixes `-ino, -no, -îno`, and restricted/dialectal forms `bo, co, ço, do, go, no, ro, xo`, with written alternatives such as `duh/duhî, got, roj, xwe`.
   It also omits the concrete U/Û variants `Urdin/Ûrdin`, `Ukrayna/Ûkrayna`, `urdûyî/ûrdûyî`, and the source's examples `îzin, îmtîhan, îhtîmal` for the I/Î orthographic issue.

2. **Syllable nucleus examples and distribution (printed p.46).**
   The draft includes the nucleus concept but does not preserve that `a, e, ê, î, û` can also be independent words, nor the source's contrast that a vowel can form a syllable alone at word onset but generally not medially/finally, with `i-di-a` as the exceptional pattern.

3. **Onset clusters and dialect/neighbor-language comparisons (printed pp.47–49).**
   The summary retains many clusters but omits:
   - Sorani `gwêz = gûz`, `nwê = nû`, and initial `dwênê`;
   - the source's qualification that the loanword cluster list includes `bl-, br-, fl-, fr-, gl-, gr-, kl-, kr-, pl-, pr-, sk-, sl-, st-, sw-, tr-`;
   - the specific language comparison for `stêr`: Sorani `estêre`, Kelhuri `hesare`, Leki `asare`, Zazaki `astare`, Hewrami `esarî`, Persian `sêtarê`; and historical Avestan `stêr`, Pahlavi `starek`, Sanskrit `star`, English `star`, Latin `stella`;
   - the source's example of short vowels not written in Persian/Arabic scripts (`krdn` pronounced `kirdin`);
   - the full comparative forms for `bira`: Pahlavi `brader`, Avestan `brater`, Sanskrit `bhratar`, Russian `brat`, Ancient Greek `phrater`, Latin `frater`, English `brother`;
   - the Old Persian `xş-` example `xşep-/xşayethe-` and the dialectal forms `sitran/sitêrk`, `istiran/histran`, `istêrk/histêrk`;
   - the historical/modern loan adaptation examples `plan > pîlan`, `glas > gelas`, `statîstîk > îstatîstîk`, `Swêd > Îsweç`, `traktor > terektir`.
   The internal source inconsistency about `xw-` is already transparently documented and should remain qualified rather than silently harmonized.

4. **Coda inventory and simplification (printed pp.50–51).**
   The draft includes the long coda-cluster list, but compresses the distribution notes. It omits the source's exact comparison:
   - Persian `bord, mord`, Zazaki `berd, merd`, Sorani `bird, mird` versus Kurmanji `bir, mir`;
   - Sorani/Kelhuri final `-st > -s` and `-nd > -n`, with `dest > des`, `nalbend > nalben`;
   - Kurmanji historical examples `çend > çen`, `bend > ben/benik`.
   The draft should retain the author's qualifiers about which clusters are common, rare, simplified, or loanword-only.

5. **Syllable-type table (printed pp.51–52).**
   The table has been compressed to one example per type, losing the source's positional examples (1st/2nd/3rd syllable columns), including `ma.lê`, `xwa.ri.na`, `di.gir.tin`, `da.girt`, `da.ne.xist`, `sa.et/ber.av`, and the dash cells indicating unattested positions. These distinctions matter and should be restored as a complete table rather than inferred.

6. **Footnote 37 on syllabification (printed p.52).**
   The draft mentions `saet`, `berav` and `binavkirin`, but omits the note that `saet` is written VC but pronounced CVC; `berav` permits written `be-rav` versus spoken/morphological/etymological `ber-av`; and `binavkirin` has two meanings with different syllabifications (`bi-nav-ki-rin` versus `bin-av-ki-rin`).

7. **Voicing inventory/table and examples (printed pp.53–55).**
   The draft defines voicing and lists voiced/voiceless consonants, but omits the source's explicit paired table:
   `p/t/k/s/ş/f/ç/x` versus `b/d/g/z/j/v/c/ẍ`.
   It also omits:
   - the source's paired clusters `dest, heft, text` and rejected mixed-voicing forms;
   - the detailed derivation and examples for `lîz+t > lîst` and `kuj+t > kuşt`;
   - the source's caution that after deletion of T the remaining S/Ş stay voiceless (`alîstin, ristin`, Sorani `firoştin`), footnote 41;
   - footnote 38's anatomical equivalences for vocal folds;
   - footnote 39's note that only one representative variant is shown in the table;
   - footnote 40's identification of `ğ / غ` as `ẍ` in `axa`;
   - footnote 42 that Q is voiceless and has no voiced counterpart in Kurdish.

8. **Loanword voicing alternations (printed pp.53–55).**
   The draft gives the main patterns but omits the full form sets `ḧefs/ḧeps/hevs/hebs` and `zeft/zept/zevt/zebt`, and the explicit distinction between the common `qesd`, colloquial `qezd`, and exceptional `qest` (where the following rather than preceding consonant changes). It also compresses the Turkish/German/Russian final-devoicing comparison and the Kurdish contrasts `kitêb/xîtab/hebîb/reng`.

## Artifact consistency
The authoring Markdown, JSON payload and generated HTML preview currently carry the same lesson body in substance. The preview is draft-only and not routed to the live site. No Supabase payload, production data, main branch, deployment or course activation was changed.


## Restoration status (2026-11-26)
The source-backed restoration pass has now been applied to Lesson 6 in the authoring Markdown, JSON payload preview and HTML preview. Restored material includes final-vowel inventories and spelling variants, dialect and historical comparisons, the full three-position syllable-type table, footnote 37's syllabification distinctions, the paired voicing table and footnotes 38–42, loanword alternants, short-vowel spelling example, mixed-voicing counterexamples and final-devoicing comparisons. Lesson-specific validator assertions were added. Static parity and required-term checks passed after synchronization. The full Python validator and CI Actions have **not** been run; no deployment, activation, main-branch or production change was made.

## Remaining validation
Run the full repository validator and CI on the isolated branch, then inspect any failures. Static checks alone do not establish complete scholarly fidelity; retain the source audit as a review record. Keep the lesson draft-only until explicit activation approval.
