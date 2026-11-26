# Dengnasi source-book audit — Lessons 18 and 21 — 2026-11-26

## Source and method

- Source: Husein Muhammed, *Dengnasî di kurdî de*, corrected designed PDF `Dengnasiya_Zimane_Kurdi_27_Wane_corrected.pdf`.
- The PDF integrity check verified HTTP 200, the manifest SHA-256, and 462 pages.
- Exact designed-PDF pages were extracted with `pypdf` and compared section-by-section with the corresponding authored Kurmancî Latin lesson text.
- Printed-page ranges are the citations shown to learners; designed-PDF physical page ranges account for front matter and lesson divider pages.

| Lesson | Subject | Printed pages | Designed PDF physical pages |
|---:|---|---:|---:|
| 18 | Vokalên A û E | 251–269 | 272–290 |
| 21 | Dîftong û giranî | 315–347 | 339–371 |

## Lesson 18 — source coverage verified

The authored lesson accurately represents the main source content and distinctions:

- A as a low, back, unrounded vowel, IPA [ɑ], including articulation, position in words, and loanword examples.
- Historical, dialectal, and inflection-related A alternations, including A→Ê, A→E, and the relevant forms with H or consonant sequences.
- E as a low, front, unrounded vowel, IPA [æ], including its distribution and the source's 11.6% frequency figure.
- Historical comparison of E with Iranian and Indo-European forms; dialectal E/Ê/I differences; inflectional changes; loss or insertion at word beginnings; and European loanword spelling conventions.
- The source's distinctions between Kurmanji central, eastern, and western forms and the specifically delimited Southern Kurdish varieties are retained.

No lesson-18 content correction was required in this pass. Its existing authored text remains a concise, source-derived lesson rather than a verbatim reproduction of the book.

## Lesson 21 — source coverage and corrections

The first detailed comparison identified source details that were not explicit enough in the authored lesson. The following were restored from the cited pages:

1. **EY and OY examples:** Sorani `key` (“when”) and the linked form `rojnamey Rûdaw`; the source's explanation of Sorani `xoy` as `xo` plus `y/î`, with the reflexive meaning.
2. **Y as a grammatical linker:** the source examples `Ew mamoste ye` (contrasted with `ew profesor e`) and `name-yek` (contrasted with `kitêb-ek`). The lesson now distinguishes this linking Y from a diphthong and notes that Y may be inaudible in ordinary speech.
3. **Pronoun stress:** `hemû/hemî` carries stress on the final syllable; emphatic repetition may produce `hemmû/hemmî`.
4. **Adverb and adposition stress:** restored source examples omitted from the earlier list, including `bila`, `nexêr/nexê`, `jixwe`, `nexwe`, `xwene`, `kingê/kengî`, `gelo`, `gelî`, and `hin(d)ek`.
5. **Cross-language prefix comparison:** Sorani `de-/e-` are unstressed, while Persian `mî-` bears stress.
6. **Compound-word stress:** clarified that primary stress falls on the final syllable of the final constituent.
7. **Stress changing lexical/grammatical meaning:** clarified the two meanings of `piştî` (noun “load/burden” versus adposition “after”) and the valley meaning of `gelî` versus its vocative use.
8. **Iranian-language comparison:** restored the source's qualification that Pashto had been treated as the only Iranian language with phonemic stress, while Kurdish also demonstrates stress contrasts that change meaning or grammatical function.

The existing coverage of XW+vowel diphthongs, regional Behdînî/Sorani forms, W+vowel and vowel+W, Y+vowel combinations, U/I alternations, and the main stress patterns was retained. No unsupported examples or external linguistic claims were added.

## Script and rendering checks

- The source-authored lesson remains Kurmancî in Latin script only.
- A mixed-script Sorani term introduced during editing was detected by the CI Arabic-script validator and replaced with Kurmancî Latin wording before the successful run.
- The generator regenerated the 27 HTML previews and JSON payload; `--check` passed.
- The 27-lesson validator, public PDF checksum/page-count check, and all 8 mocked Playwright browser tests passed in GitHub Actions run [45776754621](https://github.com/avasinim/zanztkurd/actions/runs/45776754621).
- The CI artifact contains 27 HTML previews and one JSON payload; the validated previews were synchronized to the isolated implementation branch.

## Limits and release status

- This is a source-content audit, not native-speaker certification or a claim that every phonological interpretation is uncontested; the lesson preserves the book's stated dialect and scholarly qualifications.
- The Playwright suite uses mocked Supabase state. It does not prove real test-student authentication, RLS, enrollment, or live progression behavior.
- The course remains under preparation. No course activation, production database write, migration, student-data change, deployment, publication, `main` update, or PR merge was performed.
