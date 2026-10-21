# Kurmanji course release audit — 2026-10-19

## Current state
- PR #3 is the current draft review path for the Kurmanji course changes; it is open and unmerged.
- The course content migration defines 26 lessons for `kurmanji-course-1` and 12 lessons for `kurmanji-course-2`.
- Static GitHub Actions checks have passed, but those checks are not a substitute for a browser end-to-end test or a successful test-database migration.
- Do not apply the migration to the production Supabase project or merge the PR until the release gates below are met.

## Release gates
1. **Source verification:** Review all 38 lesson bodies against their cited academic sources, recording lesson-by-lesson checks for examples, morphology, grammatical claims, and translations. Citations in the lesson alone do not establish that every claim was verified.
2. **Preserve source text:** Do not silently change scientific lesson text, examples, or orthography. Propose any content corrections separately for user review.
3. **Database migration:** Establish the precise cause of the Supabase test branch's `MIGRATIONS_FAILED` state, then run the migration in a safe test environment and inspect its results.
4. **Authorization and progression:** End-to-end test signed-out access, a signed-in but unenrolled student, an enrolled student, the site owner, previous-lesson completion requirements, and persistence of completion.
5. **Release confirmation:** Only after the above checks pass should the PR be considered ready for merge and production rollout.

## Automated seed-to-migration comparison — 2026-10-21

A read-only comparison of the SQL row tuples in the migration and the five split seed files found 38 unique lesson rows in each package, with no missing keys. All 38 lesson bodies differ byte-for-byte; 29 titles match exactly and 9 do not. A heuristic normalization of known Sorani spelling variants (including `چیە`/`چییە`, `نوسین`/`نووسین`, `ڕێنوسی`/`ڕێنووسی`, and selected doubled-y forms) makes 33 of the 38 bodies byte-identical. The remaining five are lessons 11, 17, 20, 25, and course 2 lesson 10; token-level inspection shows their first residual differences are also small spelling/orthography variants (for example `ئاسایی`/`ئاساییی` and `ڕێنمایەکی`/`ڕێنماییەکی`). This is a diagnostic heuristic only: broad text normalization can hide differences, so it is not proof of scientific equivalence and must not be used to auto-replace content. All 38 lessons remain unverified against their cited sources; do not copy either package over the other automatically.

The `PDF` link-label correction in the migration and split seed files changes only the label of the De Gruyter DOI link to `DOI`; it does not resolve the lesson-content mismatch.

## Technical caution
The SQL migration replaces `public.can_read_lesson_content` and `public.complete_lesson`. Since these are shared application functions, regression tests must confirm that existing orthography and phonetics/phonology courses still behave correctly after the migration.

## Scope of this audit
This document records the release gates; it does not certify that all 38 lessons have already been source-verified. No production database writes are authorized by this document.

### Detailed title-difference inventory

The nine title mismatches are concentrated in spelling/orthography forms: lesson 01 (ڕێنوسی / ڕێنووسی), lesson 03 (نیشانەنوسییان / نیشانەنووسییان), lesson 04 (نوسینەوە / نووسینەوە), lesson 06 (نوسینی / نووسینی), lesson 07 (ڕێنوسی / ڕێنووسی), lesson 08 (نوسین / نووسین), course 1 lesson 26 (پێداچونەوە / پێداچوونەوە), course 2 lesson 09 (ڕابردو / ڕابردوو and داهاتو / داهاتوو), and course 2 lesson 12 (پێداچونەوە / پێداچوونەوە). This is a mechanical inventory of text differences, not a decision that either spelling is the authoritative title. Keep the discrepancy visible until the canonical editorial standard is confirmed; do not silently change course content.

## Latest automated checks — 2026-10-21

For head commit `a6bbf3baa177f4c0229d7259894cd81ee5627a39`, all three repository CI checks completed successfully:
- [Academic lesson catalog validation](https://github.com/avasinim/zanztkurd/actions/runs/39608761390)
- [Lesson navigation validation](https://github.com/avasinim/zanztkurd/actions/runs/39608761557)
- [Kurmanji course package validation](https://github.com/avasinim/zanztkurd/actions/runs/39608761400)

The Supabase Preview check was skipped, so this is not evidence that the SQL migration has run successfully. The PR remains open and draft; no production deployment or database write was performed.

## Preliminary reference check — course 1, lesson 01

Public bibliographic/source pages confirm that Thackston's *Kurmanji Kurdish: A Reference Grammar with Selected Readings* is a relevant grammar and includes a section on alphabet and sounds; the available description also notes that Kurmanji has been written in more than one script, with a modified Turkish Latin alphabet prominent in Turkey and Europe. Haig's 2018 chapter is a relevant scholarly overview of Northern Kurdish/Kurmanjî. These sources support the broad need to distinguish the language from its writing system and to avoid presenting one script as the only script historically used. However, the lesson's individual statements have not yet been matched to exact pages/sections in the source texts, and its bibliography lacks verified pinpoint citations. Therefore lesson 01 remains **partially supported at overview level, not source-verified**. Sources checked: [Kurdish Academy / Thackston](https://kurdishacademy.org/?page_id=623), [Google Books bibliographic record](https://books.google.com/books/about/Kurmanji_Kurdish.html?id=fXhwvwEACAAJ), [De Gruyter / Haig and Khan volume](https://www.degruyterbrill.com/document/doi/10.1515/9783110421682/html), [Haig chapter PDF](https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf).

## Source review — course 1, lessons 01–02 (2026-10-21)

### Lesson 01 — language vs. writing system
- The current lesson distinguishes Kurmanji as a language variety from the alphabet and orthographic rules used to write it. This is conceptually appropriate.
- Thackston's reference grammar explicitly describes Kurmanji being written in multiple scripts, including a modified Turkish Latin alphabet prominent in Turkey and Europe, and Cyrillic in Armenia/Azerbaijan; this supports avoiding any claim that Latin is the only script ever used for Kurmanji. Public source: https://kurdishacademy.org/?page_id=623
- Haig (2018), “Northern Kurdish (Kurmanjî),” pp. 106–158, is a relevant scholarly overview, but the lesson's general bibliography does not yet tie individual claims to exact pages.
- Status: **partially supported at overview level; not fully source-verified**. No lesson text changed.

### Lesson 02 — Hawar alphabet and 31 letters
- The lesson lists the 31-letter Hawar alphabet in this order: A B C Ç D E Ê F G H I Î J K L M N O P Q R S Ş T U Û V W X Y Z. The list agrees with the alphabet table reproduced in the academic article “Modified LSB For Hiding Encrypted Kurdish Text Into Digital Image,” *Academic Journal of Nawroz University* 7(4) (2018/2019), DOI: https://doi.org/10.25007/ajnu.v7n4a298, section 3.1, printed pp. 256–257; the paper states 26 basic Latin letters plus five diacritic letters, totalling 31.
- This is an independent cross-check of the count and order, but that paper's primary topic is steganography, not Kurdish linguistics. It should be treated as corroborative only; a dedicated Kurmanji grammar/orthography source should be used for final scholarly approval.
- The lesson also says the five marked letters are Ç, Ê, Î, Ş, Û and notes Q, W, X occur in the alphabet; both are consistent with the listed Hawar sequence.
- Status: **alphabet inventory corroborated; source quality/pinpointing still needs improvement before release**. No lesson text changed.

These are limited source checks, not certification of all examples or all 38 lessons. Continue lesson-by-lesson, record exact source sections where possible, and do not auto-rewrite seed or migration text.

## Source review — course 1, lesson 03: Kurmanji vowels (2026-10-21)

### Primary cross-check
The University of Arizona's Iranian Languages resource, “Kurmanji Kurdish,” explicitly lists eight monophthongs and gives the orthography, IPA value, example, and English gloss. The lesson's eight table rows match that resource:

| Letter | IPA | Lesson example | Gloss in the source | Assessment |
|---|---|---|---|---|
| î | /i/ | hîn | still | Matches |
| i | /ɪ/ | dil | heart | Matches |
| ê | /e/ | lêv | lip | Matches |
| e | /æ/ | belg | leaf | Matches |
| o | /o/ | nod | ninety | Matches |
| a | /ɑ/ | qaz | goose | Matches |
| û | /u/ | bûz | ice | Matches |
| u | /ʊ/ | qul | hole | Matches |

Source: University of Arizona, Iranian Languages, “Kurmanji Kurdish,” Phonology → Vowels: https://iranian-languages.arizona.edu/node/7

### Independent scholarly context and caveats
- Thackston, *Kurmanji Kurdish: A Reference Grammar with Selected Readings* (2006), gives matching example words and describes the sound values, including the distinction between î/i, ê/e, and û/u. A publicly accessible reproduction of the relevant section is available at https://www.kurdipedia.org/files/books/2013/92279.PDF; use the published book itself for formal citation where possible.
- The research article “Pharyngeals in Kurmanji Kurdish: a reanalysis of their source and status” reproduces a vowel-phoneme table based on Thackston (2006) and discusses phonetic variation: https://fis.uni-bamberg.de/server/api/core/bitstreams/a68c2d85-1c88-4b9b-a128-765c125a0f11/content
- The broad claim that Kurmanji has eight vowel phonemes is supported by these references. However, the phonetic realization of some vowels—especially /æ/ (written e), /ɪ/ (written i), and /ʊ/ (written u)—can vary by speaker and environment. The lesson's note that e may be realized [ə] or [ɛ] is consistent with the Arizona description; avoid implying one exact phonetic realization for every speaker.
- The table's example spellings and English glosses match the Arizona resource. The Sorani glosses in the lesson (e.g. “قاز”, “گەڵا”, “لێو”, “دڵ”, “هێشتا”, “نەوەد”, “کون”, “سەهۆڵ”) are translations added for Kurdish-speaking learners; the English-source page does not independently verify each Sorani translation. These translations should receive a separate Kurdish editorial check before release.
- The page shell loads lesson body from the lesson_content record via script.js; this audit checked the lesson body in the split seed and migration, not the live production page. No browser or production DB change was made.

### Result and release status
**Result: vowel inventory and all eight Latin-letter/IPA/example/English-gloss pairs are corroborated.** Kurdish glosses and broader editorial wording still need review. This is a positive source check for lesson 03, not certification of all 38 lessons. No teaching content, seed row, or migration SQL was changed; only this audit document was updated. Do not deploy the migration or merge PR #3 on the basis of this single-lesson review.

## Source review — course 1, lesson 04: consonants and orthography (2026-10-21)

### What is supported
- The 31-letter Hawar Latin alphabet contains 23 consonant letters and 8 vowel letters. The lesson's list contains 23 consonant-letter entries when R/RR is counted as one row; the distinction between a letter inventory and the full phoneme inventory must remain explicit.
- The broad definition of a consonant as a speech sound produced with some constriction or obstruction in the vocal tract is suitable for an introductory lesson.
- The standard grapheme-to-sound examples C /d͡ʒ/, Ç /t͡ʃ/, Ş /ʃ/, J /ʒ/, Y /j/, W /w/, H /h/, and Q /q/ are broadly consistent with the standard Kurmanji orthography and the University of Arizona overview.
- Sources: University of Arizona, “Kurmanji Kurdish” (phonology and consonants): https://iranian-languages.arizona.edu/node/7 ; Haig & Öpengin (2018), “Northern Kurdish (Kurmanjî),” section 2.1.2 and Table 5: https://www.uni-bamberg.de/fileadmin/aspra/06_Team/Publications_and_CV/haig_2018_ch.2.3_northern_kurdish.pdf ; EURPhon (citing Thackston 2006): https://eurphon.info/languages/html?lang_id=250

### Issues that should be resolved before release
1. **R / RR:** the row suggests that “RR” is part of a standard spelling distinction for trill versus tap. Haig & Öpengin describe /r/ and /ɾ/ as separate sounds, but this does not by itself establish “rr” as a standard Hawar alphabet letter or a universally required spelling rule. The lesson should distinguish a phonetic distinction from an orthographic convention and cite a dedicated orthography source before retaining this wording.
2. **X:** the lesson says standard x represents /χ/. The University of Arizona table describes standard x as covering uvular fricative values including /χ/ and /ʁ/, with dialectal variation. The current wording is too categorical; qualify it rather than implying a single realization in every variety.
3. **P, T, K and affricates:** the table gives simple IPA values /p t k/ and /t͡ʃ/ for the general spelling, then notes elsewhere that aspiration and lack of aspiration can distinguish spoken sounds but are not consistently represented in standard orthography. This is broadly defensible as an introductory simplification, but the lesson should clearly label the table as a practical grapheme guide, not a complete phoneme inventory.
4. **Q description:** “وەستانی بێ‌دەنگی لووتکەیی” is potentially ambiguous in Sorani. IPA /q/ is a voiceless uvular stop/plosive. A Kurdish-language editorial review should choose a clear and consistent technical term.
5. **Scope of consonant count:** scholarly inventories differ depending on whether dialectal, aspirated/unaspirated, and pharyngeal sounds are counted as separate phonemes. Haig & Öpengin explicitly discuss variation and the controversial status of pharyngeals. The lesson correctly warns that it is not a complete phoneme inventory; preserve this caution.

### Result and action
**Result: partly supported, with wording risks around RR, X and Q.** This is an audit finding, not permission to rewrite the lesson automatically. The teaching content, split seed, migration, and production site remain unchanged. A later content edit should be proposed only after the editorial standard and source-specific orthographic claims are verified.

## Source review — course 1, lesson 05: five additional Hawar letters (2026-10-21)

### Cross-check against the University of Arizona table
The lesson's five letters and sample words match the university's Kurmanji orthography table:
- **ç — çak — “good”**; the letter is represented as /t͡ʃ/.
- **ş — şaş — “wrong”**; /ʃ/.
- **ê — êş — “pain”**; /e/ in the Arizona table.
- **î — îro — “today”**; /i/.
- **û — bûz — “ice”**; /u/.
Source: University of Arizona, Iranian Languages, “Kurmanji Kurdish,” sections “Phonology” and “Orthography”: https://iranian-languages.arizona.edu/node/7 . The source explicitly lists all five word/meaning pairs, so this is stronger than a general alphabet-only cross-check.

### Interpretation and limits
- The Hawar alphabet has 31 letters, including 26 basic Latin letters and the five additional letters ç, ê, î, ş and û. The teaching point that diacritics are meaningful parts of the letter forms—not decoration—is accurate for learning standard spelling.
- The lesson correctly distinguishes ç from c, ş from s, ê from e, î from i, and û from u in orthography. Avoid implying that the marks alone explain every phonetic detail or that each sound has identical realization across all Kurmanji varieties.
- The five Sorani glosses (“باش”، “هەڵە”، “ئازار”، “ئەمڕۆ”، “سەهۆڵ”) correspond to the English glosses given in the Arizona table. As these are Sorani editorial translations rather than direct quotations from the source, they are linguistically plausible and source-aligned, but still benefit from a Kurdish-language editorial review.
- Corroborating discussion: Songül Gündoğdu, “Remarks on Vowels and Consonants in Kurmanji,” which discusses the 31-letter alphabet and how standard spelling does not represent every phonetic distinction: https://www.researchgate.net/publication/303040378_Remarks_on_Vowels_and_Consonants_in_Kurmanji

### Result and action
**Result: all five letter/example/English-gloss pairs are corroborated by the University of Arizona source; no material discrepancy found in the lesson's central teaching point.** The teaching body, seed row, migration, and production site were not changed. The lesson remains part of the wider 38-lesson review and is not, by itself, a release approval.

## Source review — course 1, lesson 06: reading and writing simple words (2026-10-21)

### Verified word forms and meanings
The lesson's examples **av** (“water”), **dil** (“heart”), **lêv** (“lip”), **hîn** (“still”), **qaz** (“goose”), **qul** (“hole”), **çak** (“good”), **şaş** (“wrong”), **îro** (“today”), and **yek** (“one”) are attested in the University of Arizona Kurmanji phonology/orthography table. This directly corroborates the Latin spellings and English meanings used as the lesson's source basis. Source: University of Arizona, “Kurmanji Kurdish”: https://iranian-languages.arizona.edu/node/7 . Yari's Kurmanji–English dictionary is an additional lexical resource and notes that entries have audio for many words: https://yari.krd/dictionary/ .

### Editorial caveats
- The lesson's Sorani translations are not the source's English glosses. They appear broadly aligned, but should receive Kurdish editorial review. In particular, translate **qul** with an unambiguous Sorani equivalent for “hole/opening” in the intended sense, so the short gloss does not accidentally suggest a different bodily meaning.
- **roj** (“day”) is a valid familiar Kurmanji word, but the Arizona table's displayed orthography/example rows place roj alongside its rr entry for the trill. The lesson uses roj as a simple spelling example and only says that j is a distinct letter. This is not enough evidence to teach any rule about r/rr; retain the limited point or verify it against a dedicated orthography reference.
- The page's general advice to check words in a dictionary rather than infer their meaning from Sorani/English resemblance is sound.
- Sources are lexical/orthographic corroboration, not a full peer-reviewed evaluation of every Sorani gloss or exercise.

### Result and action
**Result: the ten core Kurmanji word forms and their English source meanings are corroborated; the lesson's Sorani glosses and the roj orthography note remain editorially reviewable.** No lesson body, seed row, migration, production database, or main branch was changed. Only this audit document was updated.

## Source review — course 1, lesson 07: common greetings and phrases (2026-10-21)

### Confirmed against the Yari beginner phrase guide
Yari's Kurmanji greetings page independently attests these lesson forms and meanings: **Silav** (hello), **Rojbaş** (good day), **Şevbaş** (good night), **Bi xêr hatî** (welcome, singular), **Tu çawa yî?** (how are you?), **Ez baş im, spas** (I'm fine, thanks), **Ji kerema xwe** (please), **Erê** (yes), and **Na** (no). Yari also explicitly reports both **spas** and **sipas** as thank-you variants and notes regional variation. Source: https://yari.krd/learn/kurdish-greetings/ .

### Important refinements
- **Şevbaş** is glossed as “good night” by Yari, not literally “good evening”; retain the lesson's intended nighttime usage, but avoid presenting it as an exact equivalent of an evening greeting.
- **Bi xêr hatî** is addressed to one arriving person. A plural/formal form is not covered by this lesson; do not generalize the singular expression.
- The lesson's gloss **“Bi xêr hatî — welcome”** is corroborated. However, its Sorani “بەخێربێیت” should be checked for person/number and naturalness by a Kurdish editor.
- **Rojbaş / Roj baş** spacing varies in teaching materials. Keep one editorial house style consistently; the phrase source uses Rojbaş, while other resources write Roj baş. This is a formatting/orthographic convention, not evidence of different meaning.
- **Spas/sipas** variation is directly supported. The lesson cautiously describes sipas as a regional/variant form; this is appropriate, though the source does not map each variant to a precise region.
- The phrase list is corroborated by a learner-oriented source, not by a peer-reviewed grammar. The audit confirms common usage forms, not a full scholarly account of dialectal pragmatics.

### Result and action
**Result: the principal phrase spellings and English meanings are corroborated by Yari; the notes above identify small glossing and scope cautions.** No lesson body, seed row, migration, production DB, or main branch was changed. Only the audit document was updated.

## Source review — course 1, lesson 08: spelling vs pronunciation (2026-10-21)

### Findings from scholarly/academic references
- **Core distinction is sound:** orthographic letters and actual speech sounds are not interchangeable; standard writing does not encode every dialectal or phonetic detail. Arizona's Kurmanji phonology/orthography overview explicitly notes dialect-dependent contrasts not represented in the Latin standard, including aspirated/unaspirated stops and the trill/flap distinction. Haig (2018) likewise treats standard orthography and phonetic detail separately. Sources: https://iranian-languages.arizona.edu/node/7 ; https://doi.org/10.1515/9783110421682-004 .
- **Vowel letters:** the lesson's e/ê, i/î, u/û contrast is a useful introductory graphemic comparison, and the eight-vowel inventory is described in Haig (2018). But avoid describing each pair simply as a universal “sound difference” without IPA/context: the values vary in phonetic realization, and Haig's analysis includes /æ/ <e>, /ʊ/ <u>, and a central vowel /ɨ/ that is written <i> in standard orthography. Arizona's table gives common broad correspondences, not an exhaustive account of all variation.
- **r/rr:** Arizona reports /ɾ/ (tap/flap) and /r/ (trill), while noting that spelling may not consistently mark the distinction; rr is used for trill when the distinction is shown. Thus the lesson's caveat is well founded, but it should not imply rr is a universally obligatory standardized spelling.
- **p / pˤ:** Arizona explicitly says unaspirated stops are often accompanied by pharyngealization, are absent in some dialects, and are not distinguished in Latin standard orthography. Important correction: lesson text calls /pˤ/ “وەستانێکی بێ‌هەناسە” (an unaspirated stop) and then says pharyngealization; this conflates aspiration with pharyngealization. It should say the contrast is described as unaspirated vs aspirated in some analyses, with unaspirated stops often pharyngealized; dialectal distribution varies. Do not assert a standalone universal /pˤ/ phoneme without dialect/source qualification.
- **Terminology:** “پیت” (letter/grapheme), “فونیم” (phoneme), and “دەربڕین” (pronunciation/realization) are pedagogically distinct. Consider calling the first “پیت/گرافیم” where useful, and make clear that phoneme is an abstract contrastive unit, not merely a physical sound.

### Result and action
**Result: lesson's general learning objective and its caution about dialect variation are supported, but the p/pˤ explanation contains a terminology/phonetic conflation that should be corrected before release.** This audit flags it; no lesson body, seed row, migration, production DB, or main branch was edited. Sources include Arizona (Thackston 2006, as cited there), Haig (2018), and EURPhon/Thackston's inventory: https://eurphon.info/languages/html?lang_id=250 .

## Source review — course 1, lesson 09: personal and place names (2026-10-21)

### Verified / supported points
- **Name spellings should be preserved and checked, not casually respelled.** A scholarly publication on Kurdish transcription explicitly describes choosing Kurdish-alphabet forms for many personal/geographical names while retaining widely recognized alternative transliterations where useful; this supports the lesson's contextual, non-absolutist guidance. Source: *Enacting Citizenship*, transcription/geographical-locations note: https://ruj.uj.edu.pl/bitstreams/4e877737-2363-4979-bf93-5ae4176ea49a/download .
- **Place-name pairs are real usage variants:** Hewlêr/Erbil and Amed/Diyarbakır are documented as alternate names in scholarly and teaching references. Kurdi School's Kurmanji grammar explicitly gives Amed = Diyarbakır, Hewlêr = Erbil, Wan = Van, and explains the oblique/locative forms ji Amedê, li Swêdê, ji Qamişloyê. Haig & Öpengin (2018) documents the Kurmanji oblique case, with proper names often showing zero marking or variable behavior. Sources: https://kurdischool.com/grammar.html ; https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf .
- **Latin-script capitalization scope:** Initial capitals in examples such as Azad, Rojîn, Amed are a conventional presentation for Hawar/Latin text, but the rule must be scoped to Latin-script Kurmanji; Kurdish written in Perso-Arabic script does not have upper/lowercase. Do not present capitalization as a universal property of all Kurdish writing systems. Background: Littell et al. (LREC 2016), https://aclanthology.org/L16-1529/ .

### Caveats / editorial checks
- The lesson lists Azad, Rojîn, Şilan, Berfîn and Mem û Zîn as examples. They are illustrative, but the audit has not independently established the etymology, preferred spelling, or individual bearers' official spellings for each personal name. For real people, use their own chosen/official spelling; for literary names, cite a reliable edition.
- **Amed/Diyarbakır, Hewlêr/Erbil, Wan/Van, Qamişlo** should be described as language-/context-dependent names, not universally interchangeable labels. Academic publishing may use a familiar international form alongside the Kurdish form, depending on audience and editorial policy.
- **Ez li Amedê dijîm** and **Ez ji Qamişloyê me** are plausible teaching examples for place-name inflection, and Kurdi School confirms the relevant -ê / -yê pattern. However, proper names can have variable or zero oblique marking (Haig & Öpengin); retain these forms as sourced examples, not a mechanical rule for every place name. Sorani translations should receive Kurdish editorial review.
- The lesson's wording “the Kurmanji form of the place name” is useful but can be politically/contextually sensitive; neutral phrasing such as “the form used in the Kurmanji text, with a familiar/official alternative in parentheses when needed” is safer and more precise.

### Result and action
**Result: the lesson's practical advice to preserve name spellings and acknowledge alternate toponyms is supported.** The grammar examples are corroborated as useful forms, with a caveat that proper-name case marking is not wholly mechanical. No lesson body, seed, migration, production database, or main branch was edited; only this audit note was added.

## Source review — course 1, lesson 10: beginner expressions (2026-10-21)

### Cross-checks
- Yari's beginner greetings/phrases resource corroborates the lesson's basic forms **Silav**, **Rojbaş**, **Şevbaş**, **Bi xêr hatî**, **Tu çawa yî?**, **Ez baş im**, **spas**, **Ji kerema xwe**, **Erê**, and **Na**. See https://yari.krd/learn/kurdish-greetings/ . This is learner-oriented corroboration, not a full pragmatic/dialectal grammar.
- **Bi xatirê te** is an established farewell expression (“goodbye / farewell”), but its exact use and spelling may vary by source and context. The lesson appropriately avoids a rigid pragmatic claim; compare Yari's everyday phrase materials and Thackston's reference grammar (https://sites.fas.harvard.edu/~iranian/Kurmanji/kurmanji_complete.pdf).
- **Bi xêr hatî** is a singular welcome form. The lesson correctly notes that forms can vary by number/gender; avoid treating the cited form as the universal plural/formal greeting.
- **Tu çawa yî? / Ez baş im** are sound beginner singular examples. **Ez jî baş im** (“I too am well”) is a plausible conversational continuation; ensure the teaching note explains jî as “also/too,” not a redundant “also me.”
- **Biborîne** is a valid apology/“excuse me” form in Kurmanji learner/reference materials, but exact morphology and alternatives are not sufficiently pinned down here to endorse it as the sole standard spelling. Lesson already flags variation; retain that caution.

### Editorial caveats
- Sorani renderings such as “بەیانیت باش,” “شەوت باش,” and “خواحافیز” need native Kurdish editorial review for naturalness and pragmatic equivalence. “Rojbaş” may function as a general daytime greeting, not strictly “good morning.”
- The phrase “Ji kerema xwe” is polite “please,” but its sentence placement/intonation depends on the request; lesson's one-word gloss is only an introductory shortcut.
- Do not infer a fixed universal distinction between formal/informal greetings from this short list; social conventions and dialects vary.

### Result and action
**Result: the central beginner phrases are corroborated; no critical linguistic error was established in this lesson, but Sorani pragmatics and the precise usage of farewell/apology expressions deserve editorial review.** Audit only was updated; no lesson HTML, seed, migration, production DB, or main branch changed.

## Source review — course 1, lesson 11: personal pronouns (2026-10-21)

### Verified core paradigm
Thackston's Kurmanji reference grammar and Haig & Öpengin (2018) support the broad distinction between direct/unoblique pronoun forms and the forms used in oblique contexts. The lesson's core forms **ez/min, tu/te, em/me, hûn/we, ew/wan** are consistent with the standard introductory paradigm; **wî/wê** represent gendered oblique third-person singular forms. Arizona's language overview also distinguishes the direct and oblique forms and illustrates their grammatical distribution. Sources: https://sites.fas.harvard.edu/~iranian/Kurmanji/kurmanji_complete.pdf ; https://doi.org/10.1515/9783110421682-004 ; https://iranian-languages.arizona.edu/node/7 .

### Key caveats
- **“Direct = subject” is too narrow as a definition.** The lesson says direct pronouns “often appear as subjects in ordinary present sentences,” which is a helpful first approximation, but the case system is syntactic/grammatical, not simply a subject-versus-object split. In ergative/past constructions and other environments, argument alignment changes. The lesson's later warning that oblique forms are not limited to past tense is important and should remain prominent.
- **ew = he/she/they:** the same written form can serve third-person singular or plural; number must be resolved by agreement/context. This is correctly noted. Sorani “ئەو/ئەوان” glosses are reasonable.
- **wî/wê:** gendered forms are useful but their distribution should be taught within a particular grammatical construction; avoid presenting them as a universal one-to-one “his/her” possessive equivalent.
- **Predicate/copula forms im, î, ye, in:** examples are broadly standard. But “vary according to noun/adjective ending and sentence structure” could mislead: forms are person/number agreement/copular clitics, and their phonological/orthographic realization depends on construction. Recommend precise wording in a later edit.
- **xwe:** reflexive is not always simply “refers back to the subject” in every construction; its antecedent is constrained by syntax and clause structure. Example “Ez ji dayika xwe hez dikim” is a standard reflexive/possessive use (my own mother), but the lesson's simplified description should be treated as introductory.

### Result and action
**Result: the central pronoun forms and direct/oblique distinction are supported; no clear wrong form found in the sampled paradigm.** Main risk is pedagogical oversimplification of grammatical case, copular forms, and reflexive antecedence. Flag for future editorial refinement, but do not modify lesson content automatically. Audit only updated; no seed/migration/production DB/main changed.

## Source review — course 1, lesson 12: demonstratives (2026-10-21)

### Supported core
Haig & Öpengin's scholarly description of Standard Kurmanji gives **ev** as the direct/proximate demonstrative (“this/these”) and **ew** as the direct/distal demonstrative (“that/those”), with substantial dialectal variation. The University of Arizona's Kurmanji overview independently lists the same basic contrast. The lesson's beginner contrast **ev = near** and **ew = far**, and its observation that **ew** can also function as a third-person personal pronoun, are therefore supported. Sources: Haig & Öpengin (2018), https://doi.org/10.1515/9783110421682-004 ; Haig's Northern Kurdish chapter, https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf ; University of Arizona, https://iranian-languages.arizona.edu/node/7 .

### Scope and example cautions
- **The table is only the direct-case beginner contrast.** Standard Kurmanji also has oblique demonstrative forms: proximate **vî / vê / van** and distal **wî / wê / wan** (masculine singular / feminine singular / plural). The lesson itself mentions that form changes with sentence structure, but omitting this paradigm is acceptable only if the table is clearly labelled as the *direct forms* and later lessons cover oblique forms. Dialectal variation is documented; do not imply this is every dialect's full paradigm.
- **ev pirtûk** is a supported demonstrative + noun sequence (“this book”). **Ev baş e** can be taught as an independent demonstrative (“this is good”). **Ew baş e** is inherently context-sensitive: it may mean “that is good” or, as a personal pronoun, “he/she is good”; the lesson's warning is useful.
- **Ev pirtûk baş e** and **Ew mal mezin e** are plausible beginner predicative clauses (“this book is good”; “that house is big”). The adjective in these examples is predicative, so these examples do not by themselves teach the attributive noun–adjective/ezafe construction. Avoid generalizing their word order to a noun phrase with an attributive adjective.
- The distinction “independent demonstrative pronoun” versus “demonstrative determiner” is a useful pedagogical description. A full grammatical treatment should distinguish direct/oblique case and dialectal noun-phrase demonstrative markers (some varieties have additional suffixes/clitics on the noun); Haig & Öpengin document these, so they should not be collapsed into a universal beginner rule.

### Result and action
**Result: the lesson's core ev/ew distance contrast and its caution about ew ambiguity are corroborated.** The main limitation is scope: label the table as direct forms and note that oblique forms and dialectal NP marking are outside this lesson. No demonstrative form in the displayed examples was established as clearly erroneous. This is an audit finding only; no lesson HTML, seed, migration, production DB, or main branch was edited.
