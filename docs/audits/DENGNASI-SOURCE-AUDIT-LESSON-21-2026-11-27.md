# Dengnasî source audit — lesson 21 — 2026-11-27

## Scope and verified source boundary

Source: Husein Muhammed, *Dengnasî di kurdî de*. Printed page numbers were checked against the page headers and section dividers.

- The book's “Dîftong” section begins on printed page 316.
- The diphthong discussion, including the discussion of U/I alternations, continues through printed page 334.
- A new “Hin mijarên taybet” heading and the separate article “Giranî di dengnasiya kurdî de” begin on printed page 335.
- The stress discussion continues through printed page 347.
- The next major article, “Berhevdana herdu alfabeyên kurdî”, begins on printed page 348.

The payload manifest range 315–347 therefore includes the introductory divider page 315 and both complete topics, ending immediately before the next article. The payload title is “Dîftong û giranî di dengnasiya kurdî de”.

## Source coverage reviewed

### Part I — Dîftong (printed pages 316–334)

The payload contains sections on:
1. Definition of diphthongs and the distinction between two vowels in one syllable and adjacent vowels in separate syllables (including saet, dua, biavêje and îdeal).
2. Rising and falling diphthongs, and the unsettled status of W/Y as semivowels versus consonants in some analyses.
3. XW + vowel sequences, the U-like realization of W, syllabification evidence, and the ua/ue/uê/uî examples xwar, xweş, xwê and xwîn.
4. W + vowel at the beginning of a syllable/word, including wa, we, wê, wi and wî, with dialectal variation.
5. The proposed -iwa- = -ua- analysis in words such as ciwan.
6. Vowel + W sequences (daw, dew, dêw, dîw), alternative analyses as diphthongs, and their behavior when another vowel follows.
7. Vowel + Y sequences, with AY/EY/ÊY/IY/ÎY/OY/UY/ÛY distinctions, dialectal and loanword examples.
8. Y + vowel sequences, including YA/YE/YÊ/YÎ/YO and the limits on which vowels can follow Y.
9. The spelling and pronunciation distinctions for Y in inflection, pronouns and linking constructions.
10. The -IYA- sequences in words such as çiya, giya, jiyan and siyaset, and the author's analysis of them as the diphthong ÎA rather than a two-syllable sequence.
11. The discussion “Kengî u dibe i, kengî nabe?”, including U/I alternations, the restriction after G/K/Q/X/Ẍ, the distinction between inter-dialect correspondences and within-dialect alternations, and the author's explanations involving vowel shortening and consonant-cluster simplification. The source's distinction between historical E becoming I and later I/U variation is also represented.

### Part II — Giranî (printed pages 335–347)

The payload contains sections on:
1. Definition of stress and its role in intelligibility and meaning.
2. Stress in nouns, including inflectional suffixes, ezafe/linking suffixes, vowel contraction and derivational suffixes.
3. Vocative forms, including forms with and without vocative suffixes.
4. Personal and place names, country names and city names.
5. Adjective stress, comparative/superlative suffixes and prefixes.
6. Pronouns, including Kurmanji dialect forms and Sorani forms.
7. Adverbs and adpositions.
8. Verbs, including infinitives, negative prefixes, bi-, di-, personal endings and forms of bûn.
9. Compounds, derivatives, reduplicated forms and coordinated compounds.
10. Stress as a differentiator of lexical meaning and grammatical function, including piştî, paşî/paşÎ, pêşî/pêşÎ, gelî, hatin, Azadî, mirovî and baş î.

## Fidelity observations and issues

1. **Boundary is confirmed.** Page 335 is the start of the separate stress article, but it belongs in this combined lesson according to the payload title and manifest. Page 348 starts the next distinct article and is correctly excluded.
2. **Major topic structure is represented.** Both the diphthong analysis and the complete stress article are present in the payload's heading structure. The 21 numbered subheadings in the payload broadly correspond to the book's coverage.
3. **Dialect distinctions are retained.** The payload distinguishes standard Kurmanji, Behdînî, Sorani and other dialectal distributions in the UÎ/WÎ, Y and U/I discussions rather than presenting all forms as universal Kurmanji.
4. **The U/I section preserves an important distinction.** The payload distinguishes U→I alternation within a dialect from forms such as kurm/kirm and kurmanc/kirmanc that are described as correspondences between dialects. It also preserves the special restriction after G, K, Q, X and Ẍ.
5. **Stress examples and grammatical contrasts are represented.** The payload includes the source's main classes of words and the central minimal contrasts in which stress changes lexical meaning or grammatical role.
6. **Duplicate appendix material in the payload:** the HTML heading list contains “Têbîniyên pêrawejan 229–268” twice. The cleaned text also contains two consecutive appendix-note blocks numbered 229–268. The book pages 316–347 contain the relevant notes once in their page footers. This is a payload duplication, not a second source section; it should be corrected in a later content revision after confirming the exact duplicated block and its layout impact.
7. **The payload is a reorganized explanatory lesson, not a diplomatic transcription.** It paraphrases and groups source paragraphs, tables and examples. This audit confirms coverage at the section/topic level; it does not certify that every individual example, dialect form, footnote detail, phonetic transcription or qualification from the book has been retained verbatim.
8. **Source-specific uncertainty is preserved in broad terms.** The payload generally retains the author's caveats where linguists disagree about whether W/Y sequences form diphthongs, and where dialectal pronunciation differs from standard spelling. A full item-by-item check of every table entry and all footnotes remains necessary before claiming exact completeness.
9. **Numerical/technical review:** this audit did not independently recompute any frequency statistics or re-derive the author's historical etymologies. IPA, Arabic-script glyphs, diacritics and rendered tables still require a browser/rendered-page review.

## Assessment

The lesson payload broadly follows the source's structure and includes both complete subject areas covered by printed pages 316–347: diphthongs (including U/I alternations) and stress. The page boundary is verified: the next article begins at printed page 348.

A concrete payload defect was found: the appendix notes numbered 229–268 appear twice in the HTML payload, although the source notes occur once. The lesson is therefore **not yet ready for a claim of exact source completeness**. The duplicate should be removed in a controlled content revision, then the full list of examples and footnotes should be checked against the book.

## Next work and limits

- Lesson 22 begins with “Berhevdana herdu alfabeyên kurdî” on printed page 348. Its endpoint must be established from the next section divider.
- Perform a rendered-page check for IPA symbols, Arabic script, diacritics, tables, and line wrapping.
- The previously recorded test database drift remains unresolved (0/27 exact HTML matches and nine title mismatches). This audit does not authorize any database resynchronization.
- No Supabase write, migration, production change, deployment, PR merge, student-data access/change, or course activation was performed.
