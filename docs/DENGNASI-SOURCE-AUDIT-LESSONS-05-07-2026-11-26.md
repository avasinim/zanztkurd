# Dengnasi source audit — Lessons 5–7 — 2026-11-26

## Source and method

- Source: Husein Muhammed, *Dengnasî di kurdî de*, corrected 462-page designed PDF.
- Lesson 5: printed pages 40–43; designed PDF physical pages 48–51.
- Lesson 6: printed pages 44–55; designed PDF physical pages 53–64.
- Lesson 7: printed pages 56–67; designed PDF physical pages 66–77.

## Lesson 5 — Rêjeya herfan di nivîsên kurmancî de

The lesson preserves the source's 52,705-letter sample, removal of punctuation before counting, the full letter-frequency table, and the source's reasons for elevated frequencies (grammatical suffixes, prepositions, pronouns, conjunctions, and common particles). It also preserves the author's caveats that this is written-letter frequency, not speech-sound frequency, and that dialect, sample selection, repeated words/names, and spelling conventions can change the ranking.

The authored lesson explicitly flags the source's internal arithmetic inconsistency: the sum of the 31 letter counts is 53,001, while the source's total is 52,705; the printed percentages sum to 100.43%, not 100%. Individual source values were not silently adjusted.

## Lesson 6 — Dengrêziya kurmancî û avaniya kîteyan

The authored lesson was compared with the source sequence across printed pages 44–55. Its sections cover:
- phonotactics and possible/impossible sound sequences;
- the different positional restrictions at word beginnings, middles and endings, including aspirated Ç/K/P/T and strong R;
- word and syllable divisions, nuclei, onsets and codas;
- native, dialectal and borrowed onset clusters, including two- and three-consonant sequences and their historical/dialectal variation;
- coda clusters, their relative frequency, and simplification across Kurmanji, Sorani, Zazaki and Persian;
- syllable templates using C and V, including rare patterns and the source's distinction between written and spoken syllabification;
- voicing and devoicing assimilation, including *lîz+t → lîst*, *kuj+t → kuşt*, *heft+deh → hevde* and *heşt+deh → hejde*;
- assimilation in borrowed Arabic words and the exceptional *qesd/qezd/qest* forms.

No further source-content correction was identified in this pass; the lesson's existing detailed sections and examples were retained.

## Lesson 7 — Tesîra guherîna dengî li ser nivîsînê

The existing lesson already covered the main decision between phonetic spelling and preserving lexical roots, the distinction between simple words, word boundaries, compounds and derived words, place/manner assimilation, and analogy in numbers, prepositions, pronouns and adverbs.

The comparison restored additional source examples and qualifications:
1. English *leave/left* and *thieve/theft* to show voicing/assimilation when a voiceless suffix follows a voiced consonant.
2. Turkish *kitab/kitap* and its inflected forms *kitabı, kitabın, kitaba*; Sorani forms *na-kuj-im, de-kuj-in, bi-ku-je* versus the infinitive *kuştin*; and Persian *koşten* with *ne-mî-koşem, mî-koşend, bikoş*.
3. The English phrase *Let it be* as a connected-speech example, distinct from a lexicalized simple word such as *lîstin*.
4. A comparative source table of prepositions in Kurmanji, Sorani, Hewrami, Persian, Pahlavi, Achaemenid and Avestan, including the source's note that blank table cells may mean that a cognate was not recorded or was unknown to the author.
5. Regional restrictions on *bo*: it is generally not independent in Central/Western Kurmanji (*ji bo, ji bona, ji boy, ji boyî*), but can stand alone in Eastern Kurmanji and Sorani; Sorani Hewleri *lo* is discussed as a shortening of *le bo*, and some Kurmanji dialects have *jo*.
6. The author's qualified opinion that Zazaki's use of postpositions instead of Kurmanji-style prepositions may reflect Armenian influence; this remains attributed to the source author, not stated as a settled fact.
7. Historical forms of the postpositions *de/re/ve* across Sorani, Persian, Pahlavi, Achaemenid and Avestan, along with the dialectal prevalence of *da/ra/va* and regional limits on *tê ve* and *di … ve*.

The lesson remains source-derived and contains no tests, questions, exercises or quizzes.

## Limits and status

- This audit covers Lessons 5–7 only.
- The source's own uncertainty and historical hypotheses are retained as attributed claims.
- No native-speaker certification is claimed.
- No main-branch update, production/test database write, migration, student-data change, deployment, publication or course activation was performed.


## CI confirmation — 2026-11-26

The complete workflow run [45780142032](https://github.com/avasinim/zanztkurd/actions/runs/45780142032) passed after the latest source-authoring updates through Lesson 7:

- Generator `--write` and `--check` passed.
- 27-lesson course map, source-page mapping, PDF integrity and protected reader-route validation passed.
- Public PDF HTTP delivery, checksum and 462-page count passed.
- All 8 mocked Playwright browser tests passed.
- Only after all checks passed, regenerated lesson HTML previews and the JSON payload were synchronized to the isolated implementation branch.

The Playwright tests use mocked Supabase state; they do not establish real student authentication, RLS, enrollment, or live progress synchronization. The workflow did not deploy or activate the course.
