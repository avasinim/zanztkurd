# Dengnasi source-book audit — Lessons 19 and 20 — 2026-11-26

## Source and method

- Source: Husein Muhammed, *Dengnasî di kurdî de*, corrected designed PDF `Dengnasiya_Zimane_Kurdi_27_Wane_corrected.pdf`.
- The PDF integrity check verified HTTP 200, the manifest SHA-256, and 462 pages.
- Exact designed-PDF pages were extracted with `pypdf` and compared with the authored Kurmancî Latin lessons.
- Printed-page citations and designed-PDF physical page numbers are distinct because the designed PDF includes front matter and lesson dividers.

| Lesson | Subject | Printed pages | Designed PDF physical pages |
|---:|---|---:|---:|
| 19 | Vokalên Ê, I û Î | 270–297 | 292–319 |
| 20 | Vokalên O, U û Û | 298–314 | 321–337 |

## Lesson 19 — source coverage and restored details

The audit covered the source's full sequence: Ê articulation and distribution; historical, dialectal, and inflectional sources of Ê; I articulation and its contrast with Turkish [ɯ] and Arabic kasra; I insertion/deletion and etymological writing; Î articulation, dialect forms, inflection, and loanword spelling.

The authored lesson was strengthened with the following source-backed details:

1. **Ê frequency and grammatical distribution:** explicit examples of the future marker, post-verbal particle, third-person singular suffixes, and the pronouns `wê/vê`, alongside the source's 5.2% frequency.
2. **Ê/H alternation:** the three source comparison sets `bê(h)n/bihn/bî(h)n`, `tê(h)n/tihn/tî(h)n`, and `mê(h)van/mihvan/mî(h)van`, with the source's qualification about H deletion after Ê/I/Î.
3. **Ê plus linking Y:** `rê → riya me` and `dê → diya min`, distinguished from separate-word sequences `Ew dê ye` and `Li ser rê ye`, where Ê remains.
4. **I/Î before Y:** restored the source's rationale for standard `IY` spellings, with the contrast among `çiya/çîya`, `diyar/dîyar`, `jiyan/jîyan`, and the verb forms `kir-i-ye` versus `kir-i-bû`.
5. **Etymological spelling:** expanded the source's comparison for `bira` and the distinction between epenthetic spoken I in `germ/kevn` and the historical vowel structure of those words.
6. **Historical and borrowed forms:** restored `mudîr → midûr`, `mewlid → mewlîd → mewlûd`, the source's name-shortening examples, and further European-loan examples where I should not be changed to Î.

The source's distinction between I and Î, and the source's recommendation to avoid unsupported etymological spellings, remain explicit. No external linguistic examples were introduced.

## Lesson 20 — source coverage and restored details

The audit covered O articulation and frequency; O in initial, medial, and final positions; historical EW/AW, UF/UV, IW/IWA, and Turkish Ö correspondences; dialectal O/Û/Ü variation; U distribution and U/I alternations; and long Û, including Ü/-WÎ- dialectal outcomes and standard spelling.

The following source details were made explicit:

1. **O at word-final position:** restored the source's fuller list of exceptional forms and their variants, including `bona/boyî`, `cok/cuhik`, `duh/duhî`, `kuh/kut`, and `robar/rûbar/roj`.
2. **The word `ol`:** restored the source's note that the recent media use of `ol` for “religion” is linked to Turkish `yol` (“road”), whose meaning was first adapted as *terîqet* and later broadened.
3. **The form `dû`:** restored the dialectal distinction: “after/behind” in some Kurmanji varieties, `dûv` in others, and the Sorani numeral meaning “two”; the occasional Kurmanji spelling is also noted.

The lesson continues to distinguish Southern Kurdish varieties by the source's linguistic scope rather than equating “Southern Kurdish” only with southern Iraq. Its explanation does not reduce Ü to Turkish influence and retains the source's recommendation to preserve Û in standard writing.

## Script and rendering checks

- Authored content remains Kurmancî Latin only; no Arabic-script characters were introduced.
- Generator `--write` and `--check` passed after the corrections.
- The 27-lesson course-map validator, public PDF HTTP/checksum/page-count check, and all 8 mocked Playwright tests passed in GitHub Actions run [45777982614](https://github.com/avasinim/zanztkurd/actions/runs/45777982614).
- The generated HTML previews and JSON payload were synchronized to the isolated implementation branch after all checks passed.

## Limits and release status

- This is a source-content audit, not native-speaker certification or a claim that every historical interpretation is uncontested.
- The Playwright suite uses mocked Supabase state; it does not prove real test-student authentication, RLS, enrollment, or live progression.
- The course remains under preparation. No course activation, database write, migration, student-data change, deployment, publication, `main` update, or PR merge was performed.
