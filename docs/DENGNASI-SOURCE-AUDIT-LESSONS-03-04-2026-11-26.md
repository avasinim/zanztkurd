# Dengnasi source audit — Lessons 3–4 — 2026-11-26

## Source and method

- Source: Husein Muhammed, *Dengnasî di kurdî de*, corrected 462-page designed PDF.
- Lesson 3: printed pages 16–28; designed PDF physical pages 22–34.
- Lesson 4: printed pages 29–39; designed PDF physical pages 36–46.
- The authored Kurmancî Latin lesson sections were compared with the source's page sequence, headings, examples and qualifications.

## Lesson 3 — Hevdengî û pirdengî di nivîsîna kurdî de

The existing lesson already represented the distinction between homophony and polyphony in writing, the Kurdish monophonic/polyphonic consonant lists, and the main examples for R, H, S, X, Z, L, W, Ç, K, P and T.

The comparison restored or made explicit these source details:

1. Persian spelling examples *zer, zikir, remezan, zalim* illustrate that several distinct source-language letters can represent the same [z] sound; Kurdish Latin spelling follows the sound rather than preserving those source-letter distinctions.
2. The source's Sorani examples of W representing [u] after consonants — *cwên, dwênê, gwê, nwê* — and the Southern Kurdish example *zwan*.
3. The source's R syllabification examples *ki-rîn/ki-rrîn*, *ba-ja-rek/ba-ja-rrek* and *şe-ran/şe-rran*, which show that writing the strong R with one or two R letters does not create a second sound or change syllabification.
4. The rare notation **Ḧ** for the second H sound, while noting that ordinary writing usually uses H.

These additions remain Kurmancî Latin and do not reproduce non-Latin script examples from the source.

## Lesson 4 — Qelewîtî: dengên qelew û zirav

The existing lesson already included emphatic consonants, phoneme/allophone status, the source's prediction rules for S/T/P/Z, borrowed-word classes, L/Ł and R/Ř, and the author's general position on standard spelling.

The comparison found that the final source pages (printed 36–39; designed physical 43–46) contained a substantial discussion not yet sufficiently represented:

1. The author's example of **Ezîzê Cewo** and the inconsistent use of apostrophes to mark aspirated versus unaspirated Ç/K/P/T.
2. The contextual ambiguity example *Tu ker î* and the author's argument that ordinary context usually resolves such cases without adding many new letters.
3. The specific dictionary discussion:
   - **Michael L. Chyet**: inconsistent marking of aspirated P/T, examples such as *peyam, peyale, peyman, peywendî, peywir*, and the contrast of *çel* (“forty”) versus *çel* (“stone”).
   - **Ruslan Çabolov**: use of Ĉ/Č for the two Ç sounds and apostrophe-marked K/P/T, alongside examples where the source says his dictionary applies the notation inconsistently, including Kurmanji/Sorani contrasts and forms such as *kelek, kenîşte, kereste, kerewiz*, *melek/meleḱemot*, *hukim/ḥuḱim*, *hikûmet/ḥiḱumet*, *mehkûm/meḥkum* and *kû/kwê*.
   - **Mûsa Anter**: distinguishing aspirated/unaspirated K as K/KH, without equivalent distinctions for Ç, P and T.
4. The author's explicit qualification that these examples are not intended as personal attacks: he acknowledges the value and scholarly ability of Chyet and Çabolov, and uses the inconsistencies to illustrate how difficult reliable aspiration marking can be even for specialists.

The new text summarizes these examples in Kurmancî Latin, while preserving the source's argument and qualifications.

## Limits and status

- This audit covers Lessons 3–4 only. It does not certify that Lessons 5–17 are complete.
- The added material is source-derived; no quizzes, tests, exercises or new examples were introduced.
- No native-speaker certification is claimed.
- No main-branch update, database write, migration, student-data change, deployment, publication or course activation was performed.


## CI confirmation — 2026-11-26

The complete workflow run [45780142032](https://github.com/avasinim/zanztkurd/actions/runs/45780142032) passed after the latest source-authoring updates through Lesson 7:

- Generator `--write` and `--check` passed.
- 27-lesson course map, source-page mapping, PDF integrity and protected reader-route validation passed.
- Public PDF HTTP delivery, checksum and 462-page count passed.
- All 8 mocked Playwright browser tests passed.
- Only after all checks passed, regenerated lesson HTML previews and the JSON payload were synchronized to the isolated implementation branch.

The Playwright tests use mocked Supabase state; they do not establish real student authentication, RLS, enrollment, or live progress synchronization. The workflow did not deploy or activate the course.


## Additional source reconciliation — 2026-11-26

A second page-by-page pass across printed pp. 29–39 (designed PDF pp. 36–46) found several details that were either absent or imprecisely transcribed in the existing Lesson 4 draft. The following source-backed items were restored or corrected in the authoring text and regenerated HTML/JSON previews:

1. Corrected the source's underlined/cedilla-style S notation in the examples `șed`, `mișaș` and `ẓivișṭan`; the earlier draft had used the dot-below S in these forms.
2. Added the dialectal example `berdan` for emphatic B, and clarified the source's technical note about the intended underdot notation for Ṗ and the absence of Ḍ in Kurdish.
3. Restored the Persian/Kurdish comparison `zan/zer/hezar` vs `zayîden/zerd/hezar`, and `ẓana/ẓava` vs `dana/damad`, together with the source's historical D-loss and M-to-V correspondences (`ba/bad`, `bû/bûd`, `nav/nam`, `gav/gam`).
4. Restored the source qualification that European-origin Kurdish words with Ç are rare.
5. Added the Persian `sed`/`șed` spelling-pronunciation note.
6. Added Chyet's omitted examples `p’ê`, `p’êç’an/pêç’an`, `p’êk`, and the source's English `bear` dictionary analogy.
7. Made explicit the source's conclusion that most Kurmanji readers recognize the emphatic P in `pez` without extra dots or apostrophes.

The existing Lesson 4 structure already represented the source's main emphatic consonants, phoneme/allophone distinction, prediction rules, loanword patterns, L/Ł and R/Ř sections, and the longer critique of aspiration marking in dictionaries. No exercises, quizzes, external audio, or non-Latin script were added. This is a source reconciliation, not native-speaker certification.
