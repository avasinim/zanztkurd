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

A concrete payload defect was found and corrected on 2026-11-27: the first of two repeated appendix blocks was removed, retaining the more detailed itemized block. Post-edit validation confirms one notes heading and exactly 40 unique numbered entries (229–268), with no missing or duplicated note numbers. This resolves the duplicated-block defect, but does **not** certify exact source completeness: the retained notes still require item-by-item verification against the book, and the lesson body remains a structured adaptation rather than a diplomatic transcription.

## Next work and limits

- Lesson 22 begins with “Berhevdana herdu alfabeyên kurdî” on printed page 348. Its endpoint must be established from the next section divider.
- Perform a rendered-page check for IPA symbols, Arabic script, diacritics, tables, and line wrapping.
- Correction commit: `a478a5c764efc965cc4ae2e3a713b3c5fd1bd05f` (`Remove duplicated Lesson 21 source notes block`).
- The previously recorded test database drift remains unresolved (0/27 exact HTML matches and nine title mismatches). This audit does not authorize any database resynchronization.
- No Supabase write, migration, production change, deployment, PR merge, student-data access/change, or course activation was performed.


## 2026-11-27 item-level source comparison supplement

A direct reread of the corrected source PDF (designed PDF pages 341–372, printed pages 317–347) and the current Lesson 21 payload confirms that the prior topic-level assessment was too generous. The payload is structurally aligned but is not yet complete against the source. The following are confirmed examples of compression/omission:

1. **Printed p.317 — syllabification evidence in the XW discussion:** the source uses the additional contrastive examples `dest → des-tê`, `çand → çan-din` and `stran → bis-trin` to explain consonant-cluster syllabification. These examples and the explanatory contrast are not present in the payload's XW subsection, which retains only `bi-xwin` and `di-xwî-nim`.
2. **Printed p.318 — pronunciation of XWI sequences:** the source explicitly compares `xwişk → xuşk` and `bixwin → bixun`, and explains the written I as “extra” in this analysis. The payload mentions the XW + vowel generalization but does not retain these two examples or this explicit explanation.
3. **Printed pp.319–320 — Behdînî UÎ/WÎ inventory:** the source provides a long comparative table, including (among others) `cûn/cûtin`, `biçûk`, `fûrîn`, `hûr`, `jûjî`, `lûrîn`, `mû`, `pûng`, `rû`, `şûşe`, `tûrik`, `xwîn` and `zû`, plus the footnotes 230–238. The payload retains only a small illustrative subset (for example `bûn`, `dûr`, `nû`, `gûz`) and omits the rest of the inventory and several of the source's qualifications.
4. **Printed p.320 — UÎ at word onset and O→UÎ:** the source includes `uîte/uîtî` and the comparative forms `kon/kuîn/kwîn`, `kovî/kuîvî/kwîvî`, `rovî/ruîvî/rwîvî`. The payload preserves the latter group only in abbreviated form and omits the initial `uîte/uîtî` example.
5. **Printed pp.321–322 — Vowel + W discussion:** the source develops the competing analyses for `daw`, `dew`, `dêw`, `dîw`, gives the detailed syllabification examples `kew → ke-wek`, `daw → da-wa wê`, `xew → xe-wê`, `ba-we-rî`, `de-war`, `cê-wî`, `dî-war`, and notes the source-specific Sorani meaning/etymology for `dêw`. The payload keeps only part of this evidence and drops the dêw footnote detail and some of the listed examples.
6. **Printed pp.323–325 — Vowel + Y inventory:** the source's full inventory and discussion distinguish AY/AÎ, EY/EÎ, ÊY/ÊÎ, IY/IÎ, ÎY/ÎÎ, OY/OÎ, UY/UÎ and ÛY/ÛÎ, with dialectal and loanword qualifications. The payload compresses several of these categories and does not preserve all listed examples and qualifications.
7. **Printed pp.326–328 — Y + vowel and -IYA-:** the source gives detailed Y + vowel combinations and examples, and then explains the -iya- sequence in words such as `çiya`, `giya`, `jiyan`, `şiyan`, `siyaset`, `qiyamet`, including the distinction between spelling and syllabification. The payload retains the main claim but not the full inventory and all examples.
8. **Printed pp.329–334 — U/I alternations:** the payload retains the main generalization and restriction after G/K/Q/X/Ẍ, but compresses the source's larger example inventories, comparative forms, and several explanatory steps. These need a complete itemized comparison before this section can be signed off.
9. **Printed pp.336–346 — stress examples and footnotes:** the payload includes the major stress classes, but its abbreviated examples do not preserve every source item and every cited qualification across noun inflection, vocatives, proper names, adjectives, pronouns, adverbs, verbs, compounds and stress-based contrasts. Footnotes 252–268 are represented as summaries, not as full source detail.

### Updated assessment

- Source boundary and broad section order: verified.
- Lesson 21 note-number inventory: 40 unique note numbers, 229–268, present once.
- Item-level source fidelity: **not passed**. The confirmed omissions/compressions above mean Lesson 21 is not yet source-complete.
- Required next step: restore omitted source examples, full comparative inventories and qualifications into the lesson payload, then recheck each footnote 229–268 against the page footer and the relevant source statement. Preserve source errors and disagreements as explicit source notes; do not silently normalize them.
- No database synchronization or course activation is authorized by this audit.


## Pêveka pêşveçûna 27-11-2026 — çavkaniya rûpelên çapkirî 317–320

Di payloadê de hûrguliyên jêrîn li gorî PDF-ê (rûpelên PDF 341–344; rûpelên çapkirî 317–320) vegerandin û li bin beşa XW/UÎ/WÎ hatin zêdekirin:

- Nimûneyên dabeşkirina kîteyan: `dest → des-tê`, `çand → çan-din`, `stran → bis-trin`.
- Cudahiya W ya di XW de ji konsonantê, û nimûneyên nivîsîn/bilêvkirin `xwişk/xuşk` û `bixwin/bixun`.
- Tabloya berawirdî ya Behdînî UÎ/WÎ bi rêza nimûneyên rûpelên 319–320: `nû`, `gûz`, `kû`, `bûn`, `cûn/cûtin`, `biçûk`, `dûr`, `fûrîn`, `gû`, `hûr`, `jûjî`, `kûr`, `lûrîn`, `mû`, `pûng`, `rû`, `şûşe`, `tûrik`, `vû-`, `wû-`, `xwîn`, `yû-`, `zû`.
- Nimûneyên destpêka peyvê `uîte/uîtî` û guherîna O bo UÎ: `kon/kuîn/kwîn`, `kovî/kuîvî/kwîvî`, `rovî/ruîvî/rwîvî`.
- Sînordariya dîftongên U+vokal di devokên Behdînî, cihê U+Ê di soranî de, û ketina U ya UÎ li Dihokê: `dûr/duîr/dîr`, `nû/nuî/nî`, `bixwîne/bixuîne/bixîne`.

Pişکنینی ساختاری: JSON derbasdar e؛ 27 ders hîn hene؛ HTML-ya dersê 21 piştî zêdekirinê 36,374 karakter e؛ tagên HTML hemû bi rêkûpêk girtî ne. Ev pêveka rûpelên 317–320 e tenê. Pêveka berawirdkirina hûrgulî ya rûpelên 321–347 (bi taybetî tabloyên Y+vokal, nimûneyên U/I, û hemû notên 252–268) hîn pêwîst e؛ ji ber vê yekê ders 21 hîn sertîfîkaya temam a yek-bi-yek a hemû çavkaniyê wergirtî nîne.
