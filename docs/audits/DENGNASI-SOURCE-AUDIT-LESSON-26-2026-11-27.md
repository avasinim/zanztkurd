# Dengnasî source audit — lesson 26 — 2026-11-27

## Scope and verified source boundary

Source: Husein Muhammed, *Dengnasî di kurdî de*. Printed page labels were read from the source page footers.

- Printed page 402 begins “Cudahiyên dengnasî di navbera kurdî û tirkî de”.
- Printed page 417 ends with “Dawî”.
- The next article/course section begins after this chapter; the manifest range 402–417 is correct.
- In the 462-page designed PDF, the lesson opener is PDF page 430 (printed-page content begins at PDF page 431 and ends at PDF page 446). The payload manifest records designed PDF pages 431–446; the course opener is an added design page, not part of the printed source range.

## Main source coverage

The payload contains a structured 15-section lesson and broadly follows the chapter's argument. The following material was checked against printed pp.402–417:

1. **Comparison framework (p.402):** correctly distinguishes comparison of Kurdish with Persian/other Iranian varieties from comparison with Turkish, given the different language-family relationship and the importance of loanwords. It includes the two comparison axes: sounds/sound sequences and adaptation of borrowed words.
2. **Alphabets (pp.403–404):** identifies Kurdish-only basic letters Ê, Î, Q, W, X, Û and Turkish-only Ğ, I, Ö, Ü, and correctly warns that shared letter shapes do not guarantee shared sounds. It mentions non-basic Â, Î, Û in Turkish.
3. **Shared vowels and vowel systems (p.405):** includes the five shared vowel letters, language-specific vowels, the distinction between Turkish dotted/dotless I and Kurdish I/Î, U/Û, vowel length, and dialectal Ö/Ü-like realizations.
4. **Vowel harmony (p.406):** accurately summarizes front/back vowel harmony, the contrast with Kurdish, and the source's exception *anne*.
5. **Consonants and grapheme/phoneme distinction (p.406):** retains the 25 shared letters / 13 fully identical sounds comparison, the Kurdish Q/W/X and Turkish Ğ differences, and the consonants whose realization differs.
6. **Aspiration (p.407):** covers Ç/K/P/T, Turkish positional aspiration as non-phonemic, Kurmanji/Zazaki aspiration contrasts, and the *par* minimal contrast. It also retains examples of occasional aspiration inside or at the end of Kurdish words.
7. **Place of articulation of Turkish K (p.407):** preserves the backer Turkish K before back vowels and the loan adaptation examples *qamera, Amerîqa, qomîte*.
8. **Emphasis/quality (pp.407–408):** includes P/T emphatic vs plain distinctions, S/Z differences and the source examples *te/tu, teng, pênc, pez, ser, sed*. The source itself has a wording inconsistency: it first says P and T (but not K and T), then says K and P. The payload flags this and interprets the examples as P/T.
9. **H (p.408):** distinguishes the ordinary H from the second Kurdish H sound, especially in Arabic loans and the native examples *heft, tehl, pehn*.
10. **Voicing and final devoicing (pp.408–409):** includes the voiced/voiceless pairs, Turkish final devoicing in loans, exceptions such as *saz* and *ad*, and the Kurdish examples *kitêb/kitap*, *hudûd/hudut*, *reng/renk*, *aktîv/aktîf*. It also includes regressive/progressive assimilation contrasts and the examples *ne-kuj-e + T → ne-kuşt*, *heft + deh → hevdeh*, *oda + da → odada*, *kitap + da → kitapta*.
11. **Consonant clusters (p.410):** preserves Kurdish onset/coda clusters, Turkish restrictions in native words, older vs newer loanword adaptations, and examples including *istasyon/istatistik*, *studyo/standart*, *blond, Brîtanya, flora, Fransa, klasîk, krîz, psîkolojî, tekst*.
12. **Ç/K/P/T doublets and historical origin (pp.410–417):** the payload includes the central question, the distinction from neighboring languages, aspiration minimal pairs, the Armenian-contact hypothesis, superstratum/substratum definitions, the author's objections to a simple Armenian-origin account, the possible influence of Persian/Arabic/Turkish loans, lexical pairs (*çav/çeşme, kirin/kar, pîvan/peyman*), hypercorrection, and the proposed spread of unaspirated variants from medial/final positions to word-initial position. It correctly presents the historical account as the author's hypothesis, not as established fact.
13. **Source qualification on “başûrî”:** payload gives a parenthetical explanation of the varieties meant by the source's term; the source's footnote 299 defines it as Feylî, Kelhurî, Kirmaşanî and nearby varieties in Southern/Eastern Kurdistan, distinct from the Sorani-speaking areas. This point is broadly retained.

## Fidelity gaps and items not fully represented

This is a lesson adaptation, not a diplomatic transcription. The following details are compressed or absent from the current payload and should be reconciled if the requirement remains that every item in the book must be preserved:

- **Alphabet table (pp.403–404):** the source prints the full letter-by-letter comparison, including the positions of all shared letters and the three notes 290–292 on Turkish Â, Î and Û in some words. The payload presents a short list of letters exclusive to each alphabet rather than reproducing the complete comparison table. It does not preserve all row-level information or the three numbered notes as such.
- **Shared-letter count:** the source says there are 25 shared letters and 13 fully identical sounds. The payload retains this but does not reproduce the source's complete list of the 13 identical sounds (B, C, D, E, F, G, J, L, M, N, Ş, V, Y) in a dedicated list.
- **Notes and external references:** the payload does not reproduce all source footnotes/references 296–302 in full. In particular, it does not preserve the cited external links, the exact bibliographic/URL details, the full definition in note 299, note 300's Wiktionary category link, note 301's historical qualification, and note 302's linked broadcast example. Some of their explanatory content is paraphrased in the lesson.
- **Section detail:** the chapter's paragraphs on the Arabic emphatic T, the full sequence of Turkish loan adaptation examples, the discussion of Armenian/Turkish/Persian/Arabic language contact, and the full qualifications on the chronology of Armenian-speaking communities are condensed. The main reasoning is present, but the prose is not complete.
- **Terminology/orthographic detail:** source spellings, all punctuation, full original quotations, and every example are not preserved verbatim. The payload also normalizes some examples and explanations into tables and lesson prose.
- **Potential source-level editorial inconsistency:** on p.407 the source's first sentence says “P û T (lê ne K û T)” and the next sentence says “K û P”; the payload flags this. The source's own phrasing should remain explicitly attributed rather than silently repaired.

## Assessment

**Broad subject coverage: confirmed. Exact source completeness: not confirmed.** The payload represents the chapter's main phonological comparisons and the author's historical argument, with the important caveat that the full alphabet table, several notes/references and some detailed source prose are compressed or omitted. Given the user's no-additions/no-deletions requirement, lesson 26 should not yet be certified as a complete faithful transfer until these missing table rows, notes and examples are restored or explicitly reconciled against the source.

## Safeguards and next step

- Lesson 27 begins after this chapter and must be checked against its own printed-page boundary.
- The previously documented test database drift (0/27 exact HTML matches and nine title mismatches) remains unresolved. This audit does not authorize a database resync.
- No Supabase write, migration, production change, deployment, PR merge, student-data access/change, or course activation was performed.
