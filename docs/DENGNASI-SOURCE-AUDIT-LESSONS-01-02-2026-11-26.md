# Dengnasi source audit — Lessons 1–2 — 2026-11-26

## Source and method

- Source: Husein Muhammed, *Dengnasî di kurdî de*, corrected designed PDF `Dengnasiya_Zimane_Kurdi_27_Wane_corrected.pdf`.
- The exact library copy was inspected as a 462-page PDF; the corrected file is 4,252,272 bytes.
- Lesson 1 source pages: printed 4–7; designed PDF physical pages 8–11.
- Lesson 2 source pages: printed 8–15; designed PDF physical pages 13–20. Designed physical page 12 is the Lesson 2 divider.
- The authored Kurmancî Latin text was compared with the corresponding source pages. This pass restores omitted source details without adding quizzes, tests, questions, exercises, or unsupported examples.

## Lesson 1 — Dergeh: ev vekolîn û yên berî wê

The existing lesson already covered the place of phonology within linguistics, Justi and Bedirxan, the neighboring-language relations, and the purpose/method of the book. The page-by-page comparison found that the following source information was not yet represented in sufficient detail:

1. The five additional researchers and the exact scope/limits the book assigns to each:
   - Ismaîl Fettah, *Les Dialectes Kurdes Méridionaux* (2000): approximately 170 pages on Fayli, Kalhuri and Kirmashani; no broad comparison with other Kurdish varieties or historical sound change.
   - Ebdulmecîd Reşîd Ehmed, *The Phonemic System of the Modern Standard Kurdish* (1986): a 169-page dissertation focused on Sorani, specifically the Suleimani dialect.
   - Ruslan L. Çabolov, *Очерк исторической фонетики курдского языка* (1976): approximately 100 pages on historical phonetics and native vocabulary, without the same breadth on neighboring-language relations and word origins.
   - Margaret Kahn, *Borrowing and variation in a phonological description of Kurdish* (1976): loanwords in the Kurmanji of the Urmia area, not the entirety of Kurdish phonology.
   - Fêrgîn Melik Aykoç, *Kurdîzan – Rûberîna Zaravên Kurdî* (1996): phonological differences between Kurdish varieties, especially Kurmanji and Zazaki.
2. The author's overall qualification: these works do not collectively provide a comprehensive treatment; many are not connected to one another, and most scholarly work then available was written in non-Kurdish languages.
3. The five neighboring-language/general phonology references listed by the source:
   - Iggy Roca and Wyn Johnson, *A Course in Phonology* (1999).
   - Bert Vaux, *The Phonology of Armenian* (1998).
   - Zahra Hamidi, *Zur Phonologie des Persischen: System und Geschichte* (2003).
   - Hartmut Kästner, *Phonetik und Phonologie des modernen Hocharabisch* (1981).
   - Robert B. Lees, *The Phonology of Modern Standard Turkish* (1961).
4. The source's qualification that the introductory section does not explain every neighboring-language influence in detail; those influences are treated later in the relevant sections.

These source-derived details were added to Lessons 1 as sections on the limits of prior research and the neighboring-language references. The original scope and introductory method remain intact.

## Lesson 2 — Vokal, konsonant; cih û awayên dengan; pifdarî

The existing lesson already described vowels/consonants, the choice of terminology, major articulation places and manners, voicing, and aspiration contrasts. The source comparison identified several explanatory details that were either compressed or absent:

1. The source's examples of vowels used as independent words/particles: *ew a min bû*, *ew kurd e*, *tu hevalê min î*, *O hevalo!* and *ez û tu*.
2. The chart's four-way distinction among ordinary phoneme symbols, diacritic-marked phonemes not separately represented in ordinary spelling, allophonic variants, and uncertain/rare non-phonemic realizations.
3. The source's explicit explanation of vocal folds and why B is voiced while P is voiceless, despite sharing place and manner of articulation.
4. The source's step-by-step articulatory examples for M, N, F/V and P, including why the term “tongue” is not repeated in every place-of-articulation label.
5. A source-internal notation inconsistency: the chart key lists *ẓ* once among phonemic symbols and again among allophonic symbols. The lesson now flags this repeated symbol rather than silently deciding which entry the author intended.

These details were added to the lesson. The chart note is explicitly described as the source author's notation, not a new orthographic prescription. The existing source-derived aspiration examples and dialect/loanword qualifications remain in place.

## Checks and limits

- Lessons remain Kurmancî in Latin script only.
- No student data, Supabase data, migrations, production records, deployment, publication, activation, or `main` changes were made.
- This audit covers Lessons 1–2 only. Lessons 3–17 still require their own detailed source comparison; the fact that they have headings and citations is not proof that every source detail has been preserved.
- No native-speaker certification is claimed.


## CI confirmation — 2026-11-26

The complete workflow run [45780142032](https://github.com/avasinim/zanztkurd/actions/runs/45780142032) passed after the latest source-authoring updates through Lesson 7:

- Generator `--write` and `--check` passed.
- 27-lesson course map, source-page mapping, PDF integrity and protected reader-route validation passed.
- Public PDF HTTP delivery, checksum and 462-page count passed.
- All 8 mocked Playwright browser tests passed.
- Only after all checks passed, regenerated lesson HTML previews and the JSON payload were synchronized to the isolated implementation branch.

The Playwright tests use mocked Supabase state; they do not establish real student authentication, RLS, enrollment, or live progress synchronization. The workflow did not deploy or activate the course.


## Lesson 2 — second-pass footnote reconciliation — 2026-11-26

A second inspection of the book's printed pp. 8–15 (designed PDF pp. 13–20) found that the lesson's main phonological explanations and consonant chart interpretation were already represented, but the explanatory footnotes were compressed. The authoring lesson and both preview representations now restore the source's notes on: (1) IPA [ʔ] and its Latin apostrophe notation, with source examples; (2) the anatomical term *plica vocalis* for vocal folds; (3) the source's meaning of *awêne*; (4) the anatomical definition and variants of *pidû*; and (5) the definition and lexical variants of *didan*. These additions retain Latin script and remain within the source's own explanatory scope. No audio, quiz, test, question or exercise was added.
