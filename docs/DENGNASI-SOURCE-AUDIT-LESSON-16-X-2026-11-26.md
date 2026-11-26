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
