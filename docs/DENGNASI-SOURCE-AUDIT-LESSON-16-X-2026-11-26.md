# Dengnasi source audit — Lesson 16: X and Ẍ — 2026-11-26

## Source location

- Book lesson: *Dengên V, W, Y û Z*.
- Printed pages: 203–232.
- Designed PDF physical pages: 222–251.
- The omitted X discussion is on printed pages 218–221, designed PDF physical pages 237–240.

## Finding

A structural review of the source lesson revealed a substantial subsection on **X and Ẍ** between W and Y, even though X does not appear in the printed lesson title. This subsection had not been represented in the authoring Markdown. It was restored as a separate source-derived section between W and Y, and the following section numbering was adjusted.

## Restored source details

1. Two close sounds share the standard Kurmanji Latin letter X:
   - [x], voiceless;
   - [ɣ], voiced.
   The source uses Ẍ as a phonetic teaching/transcription aid for [ɣ], not as a proposal for standard everyday spelling.
2. The source's transcription conventions for Middle Eastern and North African names (*kh/gh*) and its comparison with Turkish H, Ğ and G.
3. Examples of ordinary [x]: *xav, xirab, xet, xatir, text, rex, çerx*; and examples of [ɣ]: *xezal, xerîb, xurbet, axa, oxir/wexer, xêr/xeyrî, xeynî/xênî*.
4. The source's etymological categories for [ɣ]:
   - Arabic-origin vocabulary;
   - European-origin forms reborrowed through Arabic, including *ẍaz, ẍeram/ẍiram* and the possible *ẍerac*;
   - *Beẍda/Beẍdad* from Iranian *Beg-dad/Beg-dat*, as the author's explanation;
   - Turkic-Mongolian-origin *aẍa, oẍir/weẍer, çaẍ*;
   - Iranian *baẍ* and its cognates;
   - *ẍar/meẍare* and the Middle Persian form *meẍadeg*;
   - Iranian cognates of *morẍ* and the onomatopoeic *giẍgiẍ*.
5. The source's observation that [ɣ] often becomes [x] in Kurmanji pronunciation, including *xelet, xem, xulam, xîret, xezal*, and that speakers vary in *xayin/xaîn*.
6. The rare theoretical minimal pair *xêr* (“goodness”) versus *ẍêr* (“except/apart from”), alongside the author's qualification that most speakers pronounce both with ordinary X and that such minimal pairs are exceptionally rare.
7. The author's conclusion: everyday Kurmanji Latin spelling should use X for both sounds; Ẍ may be used in dictionaries and phonetic teaching material to distinguish pronunciation, but adding a new standard letter would make spelling and standardization harder without a significant reading benefit.

The new section uses Latin-script Kurmancî and IPA only. It contains no Arabic-script or Cyrillic glyphs.

## Status

- The omitted source subsection is now represented in `docs/KURMANJI-DENGNASI-LESSON-AUTHORING.md`.
- The course title remains unchanged because X is a subsection within the book's Lesson 16, not part of its printed lesson title.
- Generated previews and CI validation are pending a rerun after this source update.
- No main, database, student-data, deployment, publication or activation change was made.


## CI confirmation — 2026-11-26

Full workflow run [45780729755](https://github.com/avasinim/zanztkurd/actions/runs/45780729755) passed:
- regenerated preview HTML and payload from the current authoring source;
- checked all 27 lesson source/page maps and title parity;
- confirmed the authoring Markdown and generated lesson previews contain neither Arabic nor Cyrillic script;
- validated the 462-page PDF, its checksum and public HTTP delivery;
- passed all 8 mocked Playwright tests;
- synchronized the regenerated previews to the isolated implementation branch after every validation step passed.

The first run (45780571219) passed the generator, course/PDF, script and browser checks but its final preview-sync push was rejected as non-fast-forward because the implementation branch advanced during the run. No source or production change was lost; a rerun against the latest branch passed and completed the sync. PR #96 was closed unmerged.


## Implementation-branch CI confirmation — 2026-11-26

The implementation branch itself now contains the script enforcement in `scripts/validate_kurmanji_dengnasi_course.py`. Full run [45781002810](https://github.com/avasinim/zanztkurd/actions/runs/45781002810) passed all steps:
- generated-preview `--write` and `--check`;
- 27-lesson source/page/title and reader-route validation;
- explicit no-Arabic/no-Cyrillic checks on the authoring source and every generated preview;
- public PDF HTTP delivery, SHA-256 and 462-page checks;
- all 8 mocked Playwright tests;
- generated-preview synchronization to the implementation branch after all checks passed.

Temporary PR #97 was closed unmerged after this successful run. No main-branch merge, database write, migration, student-data change, deployment, publication or activation occurred.


## Footnote reconciliation — 2026-11-26

A second page-by-page check of physical PDF pages 222–251 (printed pages 203–232) found that footnotes 149–158 were not transcribed into the lesson authoring text. They have now been restored in Kurmanji Latin in the authoring source and both generated HTML representations.

- 149 and 153: the cited letter-frequency study by Husein Muhammed.
- 150–151: glosses and etymological note for the Latin comparisons.
- 152: Eastern Kurmanji *-ve/-eve* and Sorani *-ewe* comparison.
- 154: direction of borrowing for *cade* (Iranian → Arabic).
- 155: the author's comparison of Kurdish-adapted personal names.
- 156: IPA [ʔ] and apostrophe transcription examples.
- 157–158: the author's derivation of *sengîn* and the unresolved R in *bijartin*.

Static reconciliation after the update: the generated lesson preview body (excluding its presentation-only header) and lesson-16 payload body are identical at 22,053 characters; the source section, preview and payload contain no Arabic or Cyrillic glyphs. Validator assertions for the footnote details were added. Full workflow execution has not been run for this footnote-only update, so the previously recorded CI pass applies to the earlier commit, not this new commit.
