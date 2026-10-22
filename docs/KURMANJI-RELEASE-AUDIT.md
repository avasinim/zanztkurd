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

## Source review — course 1, lesson 13: numbers 1–20 (2026-10-21)

### Number forms corroborated
Haig (2018, §2.4 “Numerals”) and Thackston's Kurmanji grammar list the core cardinal forms: **yek, du/didu, sê/sisê, çar, pênc, şeş, heft, heşt, neh, deh, yanzdeh/yazdeh, dwanzdeh/dwanzdeh, sêzdeh, çardeh, panzdeh, şanzdeh, hevdeh, hejdeh, nozdeh, bîst**. The lesson's choices are substantially consistent with these references. Sources: https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf (§2.4); https://www.kurdipedia.org/files/books/2013/92279.PDF (§9); https://www.omniglot.com/language/numbers/kurdish.htm .

### Variation and editorial notes
- The lesson gives **yanzdeh, diwanzdeh, panzdeh, şanzdeh**. References document variants such as **yazdeh/yanzdeh**, **dwanzdeh/dwanzdeh**, and regional/orthographic variants. This is a reasonable chosen teaching set, but state that spelling/pronunciation variants exist; do not label alternatives as errors.
- The note says “11, 12 and 15” vary; sources show variation also in other numerals (including 2 and 3, and 16), so the wording should be “some numerals, especially…” rather than implying variation is limited to those three.
- **Ez du pirtûkan dixwînim** is the example most in need of source-level grammatical review. The text asserts *pirtûkan* is the oblique plural because it is an object of a present-tense verb. That categorical explanation is not established by the numeral lists, and it risks teaching that every counted direct object must take that form. Verify the exact construction against a grammar/native editor before release; do not automatically replace it.
- **Min sê pênûs hene** and **Ew pênc rojan li vir e** are plausible instructional examples, but the Sorani translations and intended temporal reading of the latter should receive Kurdish editorial review. The second is better glossed explicitly as a duration (“he/she is here for five days”) if that is intended.
- The cardinal list is solid; ordinal numerals, counting syntax, and dialect differences are beyond this lesson's narrow scope.

### Result and action
**Result: the 1–20 cardinal vocabulary is broadly verified.** No numeric item is clearly wrong in the selected Standard Kurmanji teaching variety. Flag the asserted morphology in *Ez du pirtûkan dixwînim* and the scope of the variation note for expert review before release. Audit-only update; lesson HTML, seed, migration, production database, and main were not changed.

## Source review — course 1, lesson 14: colours and everyday objects (2026-10-21)

### Vocabulary corroboration
The core colour words **sor** (red), **şîn** (blue), **kesk** (green), **zer** (yellow), **reş** (black), **spî** (white), and **qehweyî** (brown) are independently listed for Kurmanji by Omniglot, Institut kurde de Paris, and additional Kurmanji vocabulary references. The lesson's common-object words **pirtûk**, **pênûs**, **defter**, **derî**, **kursî**, **mase**, **telefon**, **av**, **nan**, and **mal** are plausible standard/common vocabulary; however, the sources retrieved in this review chiefly corroborate the colour list, not every object entry. Sources: https://omniglot.com/language/colours/multilingual.htm ; https://bnk.institutkurde.org/images/pdf/DTP48ZMAL1.pdf ; https://www.learnentry.com/english-kurmanji/vocabulary/color-in-kurmanji/ .

### Grammar and editorial cautions
- The lesson appropriately notes that colour adjectives and sentence patterns vary by grammatical construction. The examples **Ev pirtûk sor e**, **Ev pênûs reş e**, and **Av sar e** are plausible predicate-adjective clauses; they should not be presented as a complete guide to attributive adjective placement/ezafe.
- **Telefon li ser maseyê ye** is a useful locative sentence; the form **maseyê** is inflected in the locative/oblique environment. This should be verified against the selected course grammar/native editorial review, rather than used to infer a blanket rule.
- **Ez pirtûkê dixwînim** uses a marked object form. The lesson says “some suffixes” occur but does not explain the construction. Keep it as a model sentence only until the object marking is explicitly explained in a later grammar lesson or checked by an expert.
- **kesk** can be glossed “green”; **şîn** is conventionally “blue” in many Kurmanji lists, though its historical/cultural colour range and regional semantics may not map one-to-one to Sorani colour labels. The Sorani glosses, especially **spî → سپێ** and the shades/colour distinctions, need native Sorani editorial confirmation.
- The table gives **qehweyî** for brown. Sources support this spelling, while variant spellings and forms occur; maintain one house spelling and note variation where relevant.

### Result and action
**Result: the basic colour vocabulary is corroborated; object vocabulary and example sentence morphology are plausible but not fully independently verified from the consulted references.** No clear lexical error was established. Flag Sorani gloss review and the unexplained object/locative morphology for expert review. Audit-only update: no lesson HTML, seed, migration, production DB, or main branch changed.

## Source review — course 1, lesson 15: family vocabulary (2026-10-21)

### Lexical support
The family vocabulary source from Kurmanji School and the KurdiPedia *Kurmanji Kurdish, Lesson 2* support the core entries **malbat** (family), **dayik** (mother), **bav** (father), **kur** (son/boy), **keç** (daughter/girl), **bira** (brother), **xwişk** (sister), and **zarok** (child). They also document common possessive phrases such as **dayîka min / bavê min / birayê min / xwişka min**. References: https://kurmanjischool.com/en/family-in-kurmanji/ ; https://www.kurdipedia.org/files/books/2023/474430.PDF ; https://muugumuugu.github.io/bOOkshelF/languagesNcodes/Kurmanji.pdf .

### Cautions and verification gaps
- **kal** is not safely glossed only as “grandfather”: references also give **bapîr** (and **kalik** in some sources) for grandfather, while **kal** may mean an old/elderly man and can vary regionally. The lesson's own caution is appropriate; recommend presenting *bapîr* as the clearer basic kinship term and treating *kal* as a variant/lexical item requiring a specific dictionary citation.
- **pîrik** is attested for grandmother in some resources, alongside **dapîr**; variation is real. Keep the note and identify which variety/source is being taught.
- **mêr** means “man” and may mean “husband” in context; **jin** means “woman” and may mean “wife.” The lesson correctly warns that context matters.
- The possessive examples are broadly corroborated, but spellings/inflections vary: sources show **dayîka min** as well as **dayika min**, **bavê min**, **birayê min**, **xwişka min**. Choose one orthographic convention and keep it consistent. The lesson's own note appropriately says inflection depends on grammatical context.
- **Ev dayika min e** is an attested pattern (some sources write *dayîka*); **Navê bavê min Azad e** is plausible, but the exact possessive/ezafe spelling should be checked against the course's chosen grammar. **Ez bi malbata xwe re dijîm** is a plausible reflexive/with-phrase example; do not use it to claim *xwe* has only one syntactic distribution.
- Sorani translations are not externally verified by Kurmanji references; native Sorani editorial review remains necessary.

### Result and action
**Result: core kinship vocabulary and possessive phrase patterns are supported.** Main editorial issue is the potentially over-specific gloss of **kal** and the need to standardize spellings such as **dayika/dayîka**. No lesson text was changed; this is an audit-only finding. Seed, migration, production DB, and main remain untouched.

## Source review — course 1, lesson 16: days and time (2026-10-21)

### Corroborated vocabulary
The seven day names in the lesson—**duşem, sêşem, çarşem, pêncşem, în, şemî, yekşem**—match the Kurmanji list in *Kurmanji Kurdish, Lesson 4* (Muugumuugu), the Parsian Joman self-study grammar, 50languages, and other Kurmanji learning references. The basic time words **îro** (today), **niha** (now), **paşê** (later), **hefte** (week), **meh** (month), and **sal** (year) are also attested. Sources: https://muugumuugu.github.io/bOOkshelF/languagesNcodes/Kurmanji.pdf ; https://www.parsianjoman.org/wp-content/uploads/Kurmanji.pdf ; https://50languages.com/fa/learn/phrasebook-lessons/170/ku ; https://kurdishacademy.ch/kurmancu00ee/dersen/courses/course-10.html .

### Variants / items needing care
- Friday occurs as **în**, **înî**, and in inflected expressions such as **roja înê**; the lesson's short form **în** is attested, but it should note common variant/inflected forms.
- Tomorrow is commonly **sibe/sibê**; yesterday is commonly **duh/duhî**. The lesson's **doh** is not the dominant spelling in the references consulted and should be checked against the chosen dictionary/orthography before release. (Do not silently normalize without selecting a house style.)
- **sibê** can also refer to morning/next morning in context, so the Sorani gloss “سبەی / بەیانیی داهاتوو” is sensibly context-sensitive.
- **dereng** is usually “late”; the Sorani “دواکەوتوو / درەنگ” is reasonable but needs native Sorani editorial review. **zû** (“early/soon”) is context-dependent.
- The four sample sentences are plausible beginner examples, but the reviewed day-word lists do not establish their full grammar: **Ez sibê têm** (future-time adverb with present-form verb), **Em îro dixwînin**, and **Ez niha amade me** should be validated with the course's selected grammar/native speaker. Keep the lesson's caution; avoid presenting them as definitive paradigms.

### Result and action
**Result: the weekday set and several basic time terms are independently corroborated.** The main spelling question is **doh** versus **duh/duhî**; Friday and tomorrow/yesterday forms need a brief variation note. Sample sentence grammar and Sorani glosses remain editorial-review items. Audit-only: no lesson body, seed, migration, production DB, or main branch changed.

## Source review — course 1, lesson 17: basic present-tense verbs (2026-10-21)

### Grammar corroboration
The lesson's central description—ordinary present/habitual verbs commonly use **di- + present stem + personal ending**—is supported by the University of Arizona Kurmanji overview, Thackston's reference grammar, and KurdiPedia's *Kurmanji Kurdish, Lesson 3*. These sources also confirm the six-person pattern for **xwendin** (Ez dixwînim; Tu dixwînî; Ew dixwîne; Em/Hûn/Ew dixwînin), the present forms **diçim** (çûn), **dikim** (kirin), **dinivîsim** (nivîsîn), and **dixwim** (xwarin), plus the basic SOV/verb-final order. References: https://iranian-languages.arizona.edu/node/7 ; https://sites.fas.harvard.edu/~iranian/Kurmanji/kurmanji_complete.pdf ; https://www.kurdipedia.org/files/books/2023/474430.PDF .

### Important nuance / editorial notes
- The lesson correctly labels its formula as a general rule, not universal. The present stem is not always predictable from the infinitive; irregular/common stems (e.g. dîtin → bîn-, xwestin → xwaz-, hatin → hê-/tê forms) should be taught separately. The lesson's note on irregular forms is valuable.
- **Ez diçim** and **Ez dikim** are supported. For **xwendin**, the present stem is **xwîn-**, not mechanically *xwend-*; the displayed conjugation uses the correct **dixwîn-** forms.
- **Ez pirtûkekê dixwînim** illustrates an indefinite oblique object appropriately in broad terms. Its case morphology should be taught with the noun/oblique lesson rather than inferred from the verb-conjugation table alone.
- **Em kurdî hîn dibin** is a plausible “we learn Kurdish” example, but *hîn bûn* is a compound construction; the present tense pattern should not be generalized from it as if it were a simple verb stem. A grammar/native-editor check is recommended.
- **Tu çi dinivîsî?** is an understandable example; sources vary in transcription/orthography (e.g. *dinivîsî* vs. forms with reduced spelling). Select the course's standard and keep it consistent.
- The lesson's SOV statement is a useful default, but word order can shift for focus/discourse. Its caveat already acknowledges this; retain it.

### Result and action
**Result: the main present-tense rule, sample conjugations, and default verb-final order are supported.** No clear grammar error found in the core paradigm. Flag compound **hîn bûn**, irregular present stems, and consistent spelling for expert/editorial review. Audit-only: no lesson body, seed, migration, production DB, or main branch changed.

## Source review — course 1, lesson 18: negation in simple clauses (2026-10-21)

### Core findings
The lesson's central rule—present indicative negation normally replaces **di-** with **na-**, rather than stacking the two—is supported by Gündoğdu (2015), Haig & Öpengin (2018), Thackston, and KurdiPedia's grammar lessons. The examples **Ez naxwînim**, **Ez naçim**, **Ez nanivîsim**, and **Ez nabêjim** follow the ordinary pattern. **Ez nizanim** is a well-attested special form; **nikarim** is another important exception omitted from the lesson's current note. Sources: https://doi.org/10.1093/acprof:oso/9780190210434.003.0007 ; https://doi.org/10.1515/9783110421682-004 ; https://sites.fas.harvard.edu/~iranian/Kurmanji/kurmanji_complete.pdf ; https://www.kurdipedia.org/files/books/2023/474430.PDF .

### Specific corrections/review flags (do not auto-edit)
- **Exception list incomplete:** lesson mentions *zanîn → nizanim* but should also alert learners to *karîn → nikarim*. Haig & Öpengin explicitly identify both as taking **ni-** in present negation.
- **Negative imperative:** **Nexwîne!** and **Neke!** are plausible standard negative commands with **ne-** replacing the positive/subjunctive **bi-**; KurdiPedia's lesson confirms the negative subjunctive/imperative prefix **ne-**. The note about older/regional **me-** is reasonable, but should cite a source specifically documenting the variety/usage before presenting it as broadly applicable.
- **Copula/nominal negation:** **Ez ne mamosteyek im** is a recognizable pattern, but spacing and segmentation of **ne** with copular forms varies across orthographies/analyses. Keep the lesson's caution and have a Kurmanji grammar editor standardize it. **Ew li vir nîne** is plausible; distinguish negative copula/absence forms from ordinary verbal **na-** negation and from existential **tune/tunîne** where appropriate.
- The academic article abstract establishes that negation has several prefix shapes (**n(a)-, n(e)-, ni-**) and that negation blocks certain TAM prefixes, but it does not by itself verify every example in the lesson. Haig & Öpengin and the pedagogical grammar provide the paradigm-level support.
- Sorani translations are not independently validated by the Kurmanji grammar sources and need native Sorani editorial review.

### Result and action
**Result: the present-negation rule and key examples are corroborated.** The lesson should explicitly include **nikarim** among the important **ni-** exceptions, and the negative imperative/coplanar spelling conventions need variety-aware editorial confirmation. Audit-only update: no lesson body, seed, migration, production DB, or main branch changed.

## Source review — course 1, lesson 19: questions and interrogative words (2026-10-21)

### Vocabulary corroboration
The lesson's principal question words are attested in Kurmanji grammar and teaching references: **kî** (who; direct-case form), **kê** (who/whom in oblique contexts), **çi** (what), **li ku/kû** (where), **kengî/kengê** (when), **çima** (why), **çawa** (how), **çiqas** (how much), **çend** (how many), and **kîjan** (which). References include University of Arizona's Kurmanji overview, Institut kurde de Paris's question-word list, KurdiPedia grammar materials, and the Kurmanji grammar PDF. Sources: https://iranian-languages.arizona.edu/node/7 ; https://bnk.institutkurde.org/images/pdf/DTP48ZMAL1.pdf ; https://www.kurdipedia.org/files/books/2013/88758.PDF ; https://internationalistcommune.com/wp-content/uploads/2024/01/kurmanji-basic.pdf .

### Grammar / editorial notes
- **Case distinction:** The lesson lists **kî** as “who” but does not introduce **kê**, the oblique counterpart used in object positions (e.g., **Tu kê dixwazî?** “Whom do you want?”). This is a useful follow-up point; do not teach *kî* as invariant.
- **Question-word placement:** A scholarly study of Kurmanji phrase structure describes wh-words as commonly remaining in their base position (“wh-in-situ”), so examples such as **Tu çi dixwazî?** are well-formed in that respect. Avoid imposing English-style obligatory fronting.
- **Forms vary:** Sources show **li ku/kû/kuderê**, **kengî/kengê**, and alternative “how” forms. The lesson's variation caveat is appropriate; state the chosen standard and add common variants where useful.
- **çiqas vs çend:** They are not exact interchangeable equivalents in all contexts: **çend** typically asks a count (“how many”), while **çiqas** often asks amount/degree (“how much/how far”). The lesson's gloss “چەند / تا چەند” for **çiqas** is broadly useful, but a contrastive example would sharpen it.
- **Yes/no questions:** The examples **Tu baş î?**, **Tu kurdî dizanî?**, and **Ew li malê ye?** are plausible. Intonation and punctuation are relevant, but the lesson should avoid suggesting that a question mark alone captures all spoken question patterns.
- **Potential example check:** **Tu kengî têyî?** appears intended as “When are you coming?”; the exact verb form/spelling should be checked against the course's chosen grammar and native Kurmanji review. Other examples are plausible, but Sorani glosses require native editorial verification.

### Result and action
**Result: core interrogative vocabulary is supported.** Recommend adding the **kî/kê** case contrast and a brief **çend/çiqas** distinction; validate **têyî** and the Sorani translations. Audit-only: no lesson body, seed, migration, production DB, or main branch changed.

## Source review — course 1, lesson 20: word order in the clause (2026-10-21)

### Core claim supported, with precision needed
The lesson's main point—that pragmatically neutral Kurmanji clauses commonly follow subject–object–verb order, while the order is not rigid—is directly supported by Haig & Öpengin's grammar sketch. Their more precise description is **SOVG**, where G is a goal/recipient/addressee argument; they also note that objects can be fronted for pragmatic reasons. https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf (section 3.7.1; also https://www.kurdipedia.org/files/relatedfiles/2022/421402/0001.PDF).

### Specific editorial / grammar checks
- **Avoid overgeneralizing “SOV”:** Label it the neutral/default pattern, and mention the fuller SOVG pattern for motion, transfer, and speech verbs. Some recipients/goals can occur after the predicate or be expressed with adpositions, depending on construction and dialect.
- **Past transitive clauses are not a simple SOV teaching extension:** Kurmanji has split alignment/ergative patterns in past transitive clauses. In those clauses the transitive subject can be oblique, the object direct, and verb agreement may track the object; the lesson's note that past transitive grammar is more complex is important and should remain. https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf ; https://www.uni-bamberg.de/fileadmin/aspra/06_Team/Publications_and_CV/haig_opengin_2015_gender_kurdish_offprint.pdf.
- **Example “Tu pirtûkê dixwînî”:** The definite/oblique marking in present transitive clauses is relevant; “pirtûkê” can be analyzed as an oblique object in this environment. The Sorani gloss (“کتێبەکە دەخوێنیتەوە”) is plausible, but validate the exact definite reading and whether “دەخوێنیت” or “دەخوێنیتەوە” better matches the intended verb.
- **Example “Em kurdî hîn dibin”:** Treat **hîn bûn** as a learning construction, but verify that the intended sense is “we learn Kurdish / we are learning Kurdish”; the syntactic label “object/content” is a pedagogical simplification.
- **Fronting example:** **Vê pirtûkê, ez dixwînim** is offered as an information-structure illustration, not as a freely interchangeable word order. The lesson appropriately says context is needed; confirm punctuation, prosody, and native acceptability before presenting it as a model.
- **Intransitive examples:** **Ew diçe** is a straightforward subject + verb example. **Zarok radizê** and **Em li malê dimînin** should be checked for the chosen spelling/standard and Sorani gloss (particularly the intended sense of *radizê*).

### Result and action
**Result: the default SOV teaching is sound, provided it is explicitly qualified as neutral/default and not an inflexible rule.** Preserve the warning about past transitive split alignment; improve precision around goal arguments and verify the sample translations/inflections with a Kurmanji editor. Audit-only: no lesson content, seed, migrations, production DB, or main branch changed.

## Source review — course 1, lesson 21: adjectives and description (2026-10-21)

### Main point corroborated
Attributive adjectives in Kurmanji normally follow the noun and are linked by ezafe. Haig & Öpengin's description of the noun phrase gives the sequence head noun + ezafe + adjective; ezafe inflects for the head noun's gender/number, while the adjective itself is generally invariant. Their examples include **bajar-ek-î mezin** ‘a big town’ and plural **kum-ên reş** ‘black hats’. Source: https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf, §2.3; corroborating teaching reference: https://internationalistcommune.com/wp-content/uploads/2024/01/kurmanji-basic.pdf.

### Specific notes
- **bajarê mezin** is a plausible definite/neutral phrase “the big town/city”; the lesson correctly warns that context determines definiteness. **bajar-ek-î mezin** is the clearer indefinite “a big town.” Its segmentation should be consistently represented as **bajar-ek-î** (indefinite suffix + masculine ezafe), not left unexplained as a hyphenated string.
- **maleke biçûk** is likely intended as “a small house.” Verify the feminine indefinite ezafe form and spelling against the adopted standard; published teaching paradigms commonly give **maleke sor** for “a red apple” and distinguish masculine **-ekî** from feminine **-eke**.
- **pirtûka nû** is a plausible feminine noun + ezafe + adjective form; make sure the noun's lexical gender is taught or documented, since ezafe form is not arbitrary.
- **kum-ên reş** is supported as plural noun + plural ezafe + adjective. The lesson's gloss “کڵاوەکان” is plausible, but validate lexical choice and Sorani translation.
- The text says ezafe depends on gender, number **and case**. This is broadly right, but beginner exposition should distinguish ezafe agreement on the noun phrase head from case marking and from the adjective's own form; do not imply the adjective regularly inflects like an Indo-European agreeing adjective.
- The seven adjective lexemes **mezin, biçûk, nû, kevn, baş, reş, spî** are standard-looking basic vocabulary; Sorani glosses and exact spelling (including **biçûk/biçuk**) should be reviewed consistently.
- Section 4 correctly separates attributive adjective phrases from predicative descriptions, but it intentionally gives no full predicate sentence. Keep that boundary, and add sourced examples in a later lesson rather than implying both constructions use the same ezafe pattern.

### Result and action
**Result: noun-after-adjective ordering and ezafe linkage are substantiated.** Recommended refinement: explicitly contrast definite **bajarê mezin** with indefinite **bajarekî mezin**, verify **maleke biçûk** and noun genders, and review vocabulary glosses. Audit-only: no lesson body, seed, migration, production DB, or main branch changed.

## Source review — course 1, lesson 22: comparative and superlative adjectives (2026-10-21)

### Claims corroborated
- The regular comparative pattern adjective + -tir and use of ji before the comparison standard are supported by Thackston's *Kurmanji Kurdish: A Reference Grammar with Selected Readings* (comparative section; public PDF: https://sites.fas.harvard.edu/~iranian/Kurmanji/kurmanji_complete.pdf) and the Kurmanji teaching lesson reproduced by Kurdipedia (Lesson 6, “Comparatives”: https://www.kurdipedia.org/files/books/2023/474430.PDF).
- The sources explicitly record mezin → mezintir as regular and meztir as an alternative; they also record baş → baştir alongside çêtir as an alternative. Thus the lesson's inclusion of both mezin forms is warranted, but the table should not imply that every variety/source uses them with identical frequency.
- Two superlative strategies are attested: herî + adjective and -tirîn. The Kurdipedia teaching source notes that -tirîn forms precede the noun they modify, unlike the ordinary postposed adjective in an izafe phrase. Thackston also discusses -tirîn and herî, while cautioning that herî can carry an intensifying (“really/most”) nuance depending on context. Sources: https://www.kurdipedia.org/files/books/2023/474430.PDF ; https://www.kurdipedia.org/files/books/2013/92279.PDF ; supplementary grammar tables: https://ezdixan.de/en/wiki/grammatik

### Items needing editorial or source-specific checking
1. herî mezin / mezintirîn: both are valid superlative patterns, but they are not interchangeable mechanically in every noun phrase. Keep the distinct word order explanation, and verify the precise sample phrase against the chosen reference grammar.
2. biçûk → biçûktir: sources and teaching materials show spelling/lexical variants such as piçûk/biçûk. Confirm which spelling standard this course adopts; do not silently normalize it.
3. kêmtir / zêdetir: these express “less/more” and can mark degree or quantity; the lesson should distinguish them from the productive adjective suffix rule rather than present them as a simple mirror-image pair of adjective inflections.
4. Meyrem ji birayê xwe mezintir e: the comparative form is attested, but mezin can mean “big” or “older” according to context. The Sorani translation should make the intended reading explicit (e.g. age, if that is intended), and the morphology of birayê xwe should be checked in context.
5. The lesson cites Karacan & Khalid (2016), a cross-dialect comparison study; its general Kurdish claims should not alone be treated as proof of a specifically Standard Kurmanji rule. Prefer the Kurmanji reference grammars for the core paradigm and identify dialectal scope where the article is used.

### Result
**Core comparative and superlative patterns are supported; lesson 22 is partially source-verified.** The main unresolved points are spelling/dialect consistency, contextual interpretation of the comparison example, and keeping degree adverbs distinct from suffixal comparison. No lesson text, seed SQL, migration, main, or production database was changed; this entry only records the audit findings.

## Source review — course 1, lesson 23: nouns and determiners (2026-10-21)

### Claims corroborated
- Standard Kurmanji has no dedicated general definite article corresponding to Sorani -aka/-akan; bare nouns can be definite or generic according to context. Indefiniteness on singular nouns is commonly marked by -ek. Haig & Öpengin (2018), §2.2 and Table 7: https://doi.org/10.1515/9783110421682-004 ; open chapter: https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf
- The lesson's core case/indefiniteness paradigm is confirmed: masculine gund / gund-î / gund-ek / gund-ek-î; feminine jin / jin-ê / jin-ek / jin-ek-ê. However, the oblique case is grammatical and has several functions (including present-tense transitive objects, adposition complements, possessors in ezafe, and subjects of past-tense transitive clauses); it should not be glossed merely as “object case.” The marking also shows dialectal variation and may be absent on bare masculine singular nouns in some varieties. Sources: Haig & Öpengin 2018, Table 7 and §2.2; Haig & Öpengin 2015: https://www.uni-bamberg.de/fileadmin/aspra/06_Team/Publications_and_CV/haig_opengin_2015_gender_kurdish_offprint.pdf
- The proximal/distal distinction ev ‘this’ and ew ‘that’ is valid. The standard oblique demonstrative forms are proximal vî (masculine singular), vê (feminine singular), van (plural), and distal wî, wê, wan respectively. Haig & Öpengin 2018, Table 10, also notes regional variation and demonstrative-related clitics/suffixes on the noun phrase.

### Items needing editorial or source-specific checking
1. **“No definite marker” needs a careful qualification.** Say that Kurmanji lacks a single general definite article comparable to Sorani -aka/-akan; bare nouns receive definite or generic readings from context. Avoid claiming that no variety or construction has any additional definiteness-related marking.
2. **Direct/oblique labels:** the lesson correctly gives the core singular paradigm, but explain that direct vs oblique is not simply nominative vs accusative and is not synonymous with subject vs object. The past-tense transitive alignment differs from present-tense patterns.
3. **Demonstratives:** ev pirtûk / ew pirtûk are useful direct-case beginner forms. Add or clearly defer oblique examples (li vî welatî; vê jinê; wî mêrîkî) and plural van/wan, so learners do not infer that ev/ew remain unchanged in all syntactic contexts.
4. **“ev jin” and “ew pirtûk”:** these are bare demonstrative-NP examples; translations such as “this woman/that book” are context-appropriate, but full case-marked forms depend on their grammatical role.
5. Sorani glosses and any claim contrasting Kurmanji with Sorani should receive Kurdish editorial review; keep the contrast specific to the standard varieties described by the cited source.

### Result
**The lesson's core indefinite suffix and singular case forms are source-supported.** Its key teaching caveat is to introduce the oblique case as a grammatical pattern with several functions and to show that demonstratives inflect in oblique contexts; dialect variation should be acknowledged. Only this audit document was appended; lesson text, seed SQL, migrations, main, and production database were not changed.

## Source review — course 1, lesson 24: possession and possessive expressions (2026-10-21)

### Claims corroborated
- Kurmanji expresses possession with an ezafe-linked noun phrase; the possessed noun is the head and the possessor follows it. The noun's ezafe form agrees in gender and number with the head noun, not with the possessor. Haig & Öpengin, “Northern Kurdish (Kurmanjî),” §2.3.1: https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf
- The independent/oblique pronoun forms used as possessors are min, te, wî, wê, me, we, wan; the University of Arizona Kurmanji overview explicitly distinguishes nominative forms (ez, tu, ew, em, hûn) from oblique forms and notes oblique pronouns in possessive constructions: https://iranian-languages.arizona.edu/node/7
- Haig & Öpengin also attest free/demonstrative ezafe forms (yê/ya/yên) that can stand for an omitted noun or introduce a possessive/identifying phrase. They are not simply interchangeable with the bound linking ezafe; their interpretation depends on construction and agreement.

### Items needing editorial or source-specific checking
1. **“pirtûka min/te/wî/wê”** is a useful beginner pattern, but the lesson must specify the noun's gender and case context. The ezafe ending belongs to the head noun; in a full clause, noun and ezafe may show oblique-case forms.
2. **Pronoun mapping table:** nominative-to-oblique correspondences are useful (ez→min, tu→te, ew→wî/wê, em→me, hûn→we, ew plural→wan), but the mapping is not a standalone possessive suffix paradigm. State that these are oblique independent pronouns functioning as possessors in the shown NP.
3. **“birayê min ê mezin”** should be checked for intended reading and segmentation: the possessive ezafe after *bira* and the adjective's additional ezafe must be parsed clearly; give a natural translation that preserves whether *mezin* means “big” or “older.”
4. **Free ezafe:** yê spî, ya te, yên mezin are structurally plausible examples, but their translations should reflect the omitted antecedent (“the white one,” “the one belonging to you,” “the big ones”) rather than automatically rendering them as “this/that.” Check agreement and whether each example is an NP fragment or a complete clause.
5. **Variety scope:** ezafe morphology and some possessive constructions vary across Kurmanji varieties. Keep claims tied to the stated standard/reference variety, and obtain a Kurdish-language editorial review of Sorani glosses.

### Result
**The central possession strategy and oblique possessor pronouns are supported.** The lesson should make explicit that ezafe agrees with the possessed/head noun, distinguish bound linking ezafe from free ezafe, and refine the glosses of the examples. Only this audit entry was appended; lesson text, seed SQL, migrations, main, and production database were not changed.

## Source review — course 1, lesson 25: direct and oblique case (2026-10-21)

### Claims corroborated
- Standard Kurmanji distinguishes Direct (typically unmarked) and Oblique case. The oblique is used, among other functions, for present-tense transitive objects, adpositional complements, possessors in ezafe phrases, and agents/subjects of past-tense transitive clauses. Haig & Öpengin (2018), Table 7 and §3.2.3: https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf
- The lesson's core noun paradigm matches the reference table for standard Kurmanji: masculine *gund / gund-î*, *gund-ek / gund-ek-î*; feminine *jin / jin-ê*, *jin-ek / jin-ek-ê*. However, overt marking on masculine singular nouns is variable, and oblique marking can be suppressed before ezafe.
- Pronoun pairs *ez/min*, *tu/te*, *ew/wî-wê*, *em/me*, *hûn/we*, *ew/wan* are standard direct/oblique contrasts. Direct/oblique should not be equated mechanically with nominative/accusative.
- The alignment contrast is accurately introduced: in a canonical present transitive clause, the subject is Direct and object Oblique; in a canonical past transitive clause, the agent is Oblique and the patient Direct, with verb agreement typically tracking the patient. This is commonly described as split alignment/ergativity in past transitive clauses.

### Items needing editorial or source-specific checking
1. **“mirov / mirov”** is too categorical as a teaching example. Some masculine singular nouns show no overt oblique form, but whether marking appears depends on noun type, construction and regional variety. Label it as an example of possible zero marking, not a general paradigm rule.
2. **Generalization about noun endings:** explain that -î/-ê are the reference standard singular oblique endings, but masculine singular marking has notable variation; the source specifically notes suppression before ezafe.
3. **Example “Ez wî mirovî dibînim”** should be parsed explicitly: *ez* is Direct subject, *wî mirovî* is Oblique object (demonstrative plus noun); check the intended lexical gloss of *mirov* (“person/man”) in the Kurdish translation.
4. **“Min ew dît”** is a good compact ergative example, but annotate *min* as Oblique agent and *ew* as Direct patient; note that the direct pronoun form itself does not display a special patient ending here.
5. **Terminology:** retain Direct/Oblique as grammatical labels and avoid presenting them as ordinary semantic “direct/indirect” roles. State that the pattern describes a canonical standard variety and that dialectal deviations exist.

### Result
**The central direct/oblique contrast and the split-alignment teaching point are supported.** The noun table is a sound standard paradigm, but the *mirov* row and the broad wording about overt case marking need qualification; examples should be explicitly segmented and dialect scope stated. Only this audit entry was appended; lesson content, seed SQL, migrations, main, and production database were not changed.

## Source review — course 1, lesson 26: final review and self-assessment (2026-10-21)

### Claims corroborated
- The contrasts highlighted in the review are meaningful in the Hawar Latin orthography: **c / ç** represent /d͡ʒ/ and /t͡ʃ/; **s / ş** represent /s/ and /ʃ/; **i / î** and **u / û** represent distinct vowel qualities. The Arizona Kurmanji reference provides the inventory and the lesson's example words *çak*, *şaş*, *dil*, *îro* and *roj*: https://iranian-languages.arizona.edu/node/7
- The basic sentence examples are consistent with earlier course topics: *Ez nan dixwim* (present transitive clause), *Tu çawa yî?* (question), *Ez naxwînim* (negative), *Ez wî mirovî dibînim* (present transitive with oblique object), and *Min ew dît* (past transitive with oblique agent).
- The note about *r* versus *rr* has a real phonetic basis: the reference describes *r* as a flap and *rr* as a trill where that distinction is represented. However, the distinction is not consistently represented in all standard written usage and some dialectal distinctions are not encoded.

### Items needing editorial or source-specific checking
1. **Review coverage is incomplete for a “final assessment.”** It rehearses selected spelling and grammar topics but does not systematically test all course outcomes or give a lesson-to-skill blueprint. Include a coverage matrix linking each earlier lesson to at least one assessment item.
2. **Alphabet review is selective.** It mentions four pairs but omits other relevant distinctions, especially *e/ê* and *o* versus the short/long vowel pairs, and gives no IPA or listening discrimination task. Avoid implying the four pairs are the entire vowel/consonant inventory.
3. **“r/rr” wording should remain qualified.** Prefer “in reference descriptions, *r* commonly represents a flap and *rr* may mark a trill; usage and representation vary” rather than implying a fully uniform standard spelling contrast.
4. **Answer key and scoring:** the eight questions have no model answers, marking criteria, or pass threshold. Since the lesson correctly says self-assessment is not formal certification, either add an answer key and transparent rubric or label it clearly as formative practice only.
5. **Question alignment:** item 4 asks for *herî* (superlative) without revisiting that pattern in the review examples; item 5 asks for *-ek* (indefinite singular) without an example in this lesson. These can be valid cumulative questions, but should link learners back to the relevant lessons and include expected answer criteria.
6. **Translation and variety check:** the Sorani glosses, especially *Ez wî mirovî dibînim* and *Min ew dît*, need a Kurdish-language editorial review for naturalness and consistent rendering of *mirov*. Keep the course's stated standard-Kurmanji scope and acknowledge variation.

### Result
**The selected orthographic contrasts and review sentences are broadly supported.** The main issue is assessment design rather than a central factual error: the final review needs clearer coverage, answer criteria, and qualified wording on *r/rr*. Only this audit entry was appended; lesson content, seed SQL, migrations, main, and production database were not changed.

## Source review — course 2, lesson 1: morphology and word structure (2026-10-21)

### Claims corroborated
- Morphology studies the internal structure of words; morphemes are units associated with lexical meaning or grammatical function. A morpheme need not be an independent word: bound morphemes such as affixes attach to a base. University of Sheffield's linguistics overview states this distinction clearly: https://www.sheffield.ac.uk/linguistics/home/all-about-linguistics/about-website/branches-linguistics/morphology/what-morphology
- The lesson's methodological warning is sound: not every phonological segment or syllable is a morpheme. Analysis should be supported by recurring form–function contrasts across words, not by arbitrary division.
- Kurmanji singular indefinite -ek is a valid introductory example of a grammatical suffix. Haig & Öpengin (2018) describe -ek as the singular indefinite marker in Standard Kurmanji, with case marking potentially following it: https://www.uni-bamberg.de/fileadmin/aspra/06_Team/Publications_and_CV/HaigOepengin2018_Kurmanji_Kurdish_.pdf

### Items needing editorial or source-specific checking
1. **Word versus morpheme definition:** “word is an independent unit” is a useful first approximation, but should be framed as a practical distinction rather than an absolute definition; linguistic analyses recognize bound roots and multiword grammatical constructions.
2. **Course example is underdeveloped:** -ek is named but no actual Kurmanji word is segmented. Add a minimal pair such as *gund* ‘village’ vs. *gund-ek* ‘a village’, with the warning that case and ezafe can add further morphology. This should be linked to lesson 4 on indefinite nouns.
3. **Root versus stem:** the lesson names root, word-formation morphemes, and inflectional markers but provides no worked analysis separating root, stem/base, derivation and inflection. A short segmented example from a verified Kurmanji source would make the distinction teachable.
4. **Source list quality:** the Haig & Öpengin DOI is duplicated twice in the bibliography. Remove the duplicate in a future editorial pass and make sure the cited edition/page range is consistent.
5. **Assessment alignment:** the three review questions are appropriate for an introduction but test definitions only; add a short analysis task requiring learners to identify a base and an affix, and explain why a proposed segmentation is or is not supported.
6. **Variety scope:** the note about dialect variation is appropriate. Keep -ek described as a common standard Kurmanji singular indefinite marker, not an automatic suffix that can be assigned to every noun or word.

### Result
**The core definition of morphology and the free/bound morpheme distinction are sound.** The lesson is methodologically cautious, but needs a worked Kurmanji segmentation, clearer root/stem/inflection distinctions, and a small bibliography cleanup. Only this audit entry was appended; lesson content, seed SQL, migrations, main, and production database were not changed.

## Source review — course 2, lesson 2: root, prefix and suffix (2026-10-21)

### Claims corroborated
- The lesson's distinction between root and stem/base is a useful morphological starting point: a root is the lexical core, while a stem/base is the form to which inflectional material can attach; depending on the analysis, a stem may already contain derivational morphology.
- Prefixes precede a base and suffixes follow it. The lesson correctly warns that position alone does not prove a morpheme boundary: segmentation requires evidence from form, meaning and repeated patterns.
- The Kurmanji singular indefinite marker -ek is a well-attested suffix in Standard Kurmanji, but its realization and distribution vary across varieties. Haig & Öpengin (2018), discussion of nominal morphology and dialect variation: https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf

### Items needing editorial or source-specific checking
1. **No actual segmented example is supplied.** Add a verified pair such as *gund* ‘village’ and *gund-ek* ‘a village’, and explicitly mark the segmentation as *gund-ek* = base + singular indefinite suffix. Cross-reference lesson 4.
2. **Root and base definitions need tighter wording.** The lesson says the root is the basic unit and the base may take affixes, but should define derivation versus inflection: derivation can form a new lexeme or change category/meaning; inflection expresses grammatical features without necessarily creating a new lexeme.
3. **Prefix/suffix scope:** do not imply that all Kurmanji morphology is suffixal or that any initial/final string is automatically an affix. A candidate affix must have a repeatable form-function relationship across examples. Verbal preverbs and inflectional prefixes provide additional patterns beyond the nominal -ek example.
4. **Bibliography duplicate:** the Haig & Öpengin DOI is listed twice in the seed content for this lesson. Remove the duplicate in a future editorial pass; this audit does not alter the lesson body.
5. **Assessment is too abstract:** all three review questions are definitional. Add a short worked segmentation and ask learners to explain which evidence supports the boundary, with a model answer.
6. **Dialect scope:** retain the standard-Kurmanji framing and qualify -ek as a common singular indefinite marker, since surface forms and realization vary regionally.

### Result
**The introductory definitions and methodological caution are sound.** The main weakness is lack of a worked Kurmanji word analysis and explicit derivation/inflection contrast. Only this audit entry was appended; lesson content, seed SQL, migrations, main, and production database were not changed.

## Source review — course 2, lesson 3: nouns, grammatical gender and number (2026-10-21)

### Claims corroborated
- The lesson correctly distinguishes grammatical gender from natural/biological sex. In Kurmanji, gender is a grammatical property of nouns and is visible in parts of the agreement system; it should not be inferred from real-world sex alone.
- The lesson appropriately cautions against assuming one plural formation rule applies to every noun. Kurmanji nominal forms and agreement patterns require attention to the noun class, case and dialect.
- The observation that gender and number interact with ezafe forms is directionally correct for Standard Kurmanji. Haig & Öpengin (2018), “Northern Kurdish (Kurmanjî),” discusses nominal morphology, gender, case and ezafe: https://doi.org/10.1515/9783110421682-004. Thackston’s reference grammar is also relevant: https://sites.fas.harvard.edu/~iranian/Kurmanji/kurmanji_complete.pdf

### Items needing editorial or source-specific checking
1. **The lesson is almost entirely abstract.** It names gender, singular/plural and ezafe agreement but gives no Kurmanji noun paradigms or fully glossed examples. Add a small, source-checked table showing masculine/feminine nouns and singular/plural forms in context.
2. **Gender and agreement need an explicit worked example.** Show the head noun, the ezafe form and the agreeing adjective together; identify which element controls agreement. Do not imply that the following word alone determines the ezafe form.
3. **Plural morphology is asserted but not taught.** Add two or more attested plural patterns, label them as examples rather than a universal rule, and cite the exact grammar section or page for each.
4. **Terminology:** define “grammatical gender” separately from “natural gender,” and clarify that the lesson concerns grammatical classification and agreement rather than a claim about people’s identity or sex.
5. **Assessment alignment:** the review questions test definitions but not recognition or production. Add a short exercise asking learners to identify gender/number and select the appropriate ezafe form from attested examples, with an answer key.
6. **Duplicate bibliography entry:** the Haig & Öpengin DOI is listed twice in this lesson’s source list. Remove the duplicate in a later editorial pass.
7. **Dialect scope:** the Standard Kurmanji caveat is helpful. Keep it and cite a specific source/page when a form is presented as standard; distinguish regional variants where the evidence warrants it.

### Result
**The lesson’s broad cautions are sound, but it is not yet sufficiently operational as a teaching unit.** The key missing elements are verified examples, explicit agreement analysis and a concrete treatment of plural patterns. This audit entry only; no lesson body, seed SQL, migrations, main branch, or production database was changed.

## Source review — course 2, lesson 4: definite and indefinite nouns; suffix -ek (2026-10-21)

### Claims corroborated
- The lesson correctly presents **-ek** as a common singular indefinite marker in Standard Kurmanji. Haig & Öpengin (2018), Table 7, explicitly gives masculine *gund / gund-î / gund-ek / gund-ek-î* and feminine *jin / jin-ê / jin-ek / jin-ek-ê* across direct and oblique cases: https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf
- The statement that a bare noun is not automatically definite is correct. A noun without -ek can have a definite or generic/sortal reading depending on context; the source illustrates this distinction with *hirc* ‘bear’ and *hirc-ek* ‘a bear’.
- It is appropriate to warn that case and ezafe affect the visible form. The oblique marking and its interaction with ezafe are not reducible to a single universal surface pattern, and regional variation is documented by Haig & Öpengin.

### Items needing editorial or source-specific checking
1. **Transliteration consistency:** the lesson writes *gundek* in the first example but later uses morpheme-separated *gund-ek*. Choose one convention and explain the hyphen as a linguistic segmentation mark, not ordinary spelling.
2. **Add a full paradigm:** use the four source-attested forms *gund, gund-î, gund-ek, gund-ek-î* and the parallel feminine forms *jin, jin-ê, jin-ek, jin-ek-ê*. Label direct/oblique case and masculine/feminine clearly; explain that these are Standard Kurmanji reference forms, not a guarantee that every dialect preserves every contrast.
3. **Avoid overgeneralization about definiteness:** the absence of -ek does not itself encode a dedicated definite article. Teach that bare nouns are interpreted through context and may be definite or generic.
4. **Explain the grammar of the oblique case:** the lesson names direct/oblique case but does not explain the main functions of oblique forms. A short note should mention typical functions (e.g. object of a present-tense transitive verb, complement of an adposition, possessor in an ezafe construction, and subject of a past-tense transitive verb), with a caution that distribution and overt marking vary.
5. **Assessment:** the questions are relevant but need an application task. Ask learners to identify the case and interpretation of *gund-ek* versus *gund-ek-î* and to explain why a bare noun cannot be classified as definite without context.
6. **Duplicate bibliography entry:** the Haig & Öpengin DOI is repeated in this lesson’s source list. Remove the duplicate in a later editorial pass.
7. **Source metadata:** the Thackston reference link points to a Kurdish Academy landing page rather than directly to the cited grammar PDF. In a future bibliography cleanup, use a stable, direct source link if permitted and verify the edition details.

### Result
**The central explanation of -ek and the contextual interpretation of bare nouns is sound.** The main improvements are a complete source-attested paradigm, consistent segmentation, a clearer account of case, and a practical exercise. Only this audit entry was appended; lesson content, seed SQL, migrations, main, and production database were not changed.

## Source review — course 2, lesson 5: ezafe and noun–adjective relations (2026-10-21)

### Claims corroborated
- The lesson correctly states that descriptive adjectives normally follow the noun in Kurmanji and are linked to the head noun by an ezafe form. Haig & Öpengin (2018), §2.3–2.3.1, describes the basic noun-phrase structure and gives *bajar-ek-î mezin* ‘a big town’ as an example: https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf
- The lesson’s claim that ezafe also links a noun to a possessor is supported by examples such as *mal-a me* ‘our house’. The ezafe form agrees with the head noun’s gender and number in Standard Kurmanji.
- The note about dialect variation is important and should remain. The form and analysis of ezafe show variation across Kurmanji varieties; avoid presenting the Standard Kurmanji pattern as universal to all dialects.

### Items needing editorial or source-specific checking
1. **Give the morphology of the example explicitly.** In *bajar-ek-î mezin*, explain *bajar* ‘town/city’ + *-ek* indefinite singular + *-î* masculine singular ezafe + *mezin* ‘big’. Clarify that the ezafe is a linker agreeing with the head noun, not a suffix marking the adjective itself.
2. **Add the contrasting possessor example.** Use *mal-a me* ‘our house’, with *mal* ‘house’ + feminine singular ezafe *-a* + *me* ‘we/us’ in the relevant oblique/possessive form. Make clear that the possessor follows the head noun and is not itself the agreement controller.
3. **Qualify “agreement”:** the ezafe agrees with the head noun’s grammatical gender/number in the Standard Kurmanji pattern; it does not agree with the following adjective or possessor. For plural nouns, show a checked plural example such as *kum-ên min yên reş* ‘these black hats of mine’ from the source.
4. **Phrase structure is underspecified.** The lesson mentions determiners, numerals, possessors and adjectives but offers no ordering example. Add one source-attested noun phrase with multiple dependents and label its parts; Haig & Öpengin’s schema places possessors before descriptive adjectives when both occur.
5. **Assessment needs a worked task.** Ask learners to identify the head noun, ezafe form, possessor/adjective and agreement features in two examples; include an answer key.
6. **Duplicate bibliography entry:** the Haig & Öpengin DOI is repeated in this lesson’s source list. Remove the duplicate in a future editorial cleanup.
7. **Terminology and dialect scope:** define *ezafe* consistently as a grammatical linking construction/marker, while noting that analyses vary between suffix, clitic and particle across descriptions and dialects.

### Result
**The lesson’s core description of ezafe with adjectives and possessors is supported by the reference grammar.** It needs segmented examples, explicit identification of the head noun as agreement controller, and a practical exercise. Only this audit entry was appended; lesson body, seed SQL, migrations, main branch and production database were not changed.

## Source review — course 2, lesson 6: possession and possessive pronouns (2026-10-21)

### Claims corroborated
- The lesson is right that Kurmanji expresses possession through noun-phrase structure including ezafe, and that the ezafe form is associated with the head noun rather than simply copied from the possessor. Haig & Öpengin (2018), “Northern Kurdish (Kurmanjî),” discusses nominal phrases, ezafe and possessive constructions: https://doi.org/10.1515/9783110421682-004
- The lesson correctly distinguishes independent personal pronouns from possessive constructions and warns that the function must be read in context.
- *xwe* is a reflexive pronoun whose form does not inflect for person and number in the way ordinary independent personal pronouns do; its antecedent and interpretation depend on clause structure and discourse context. This should be taught with full sentences, not just the isolated form.

### Items needing editorial or source-specific checking
1. **The only possession example is under-explained.** For *mal-a me* ‘our house’, identify *mal* ‘house’ as the head noun, *-a* as the ezafe form associated with this noun, and *me* as the first-person plural possessor expression. Clarify that this is a noun phrase rather than a possessive suffix attached directly to *mal*.
2. **“Possessive pronouns change by person and number” is too vague.** Add a table of verified Standard Kurmanji forms with a clear distinction between independent pronouns, possessive/oblique forms, and ezafe-linked possessors. Do not mix these categories or imply that one form functions identically in every construction.
3. **Reflexive *xwe* needs contrasts.** Add two attested, fully glossed examples in which *xwe* refers back to the clause’s subject, and a contrast showing why its antecedent cannot be decided from the word alone. Verify each example against the reference grammar before publication.
4. **Agreement/controller explanation:** explicitly state that the ezafe form is selected with reference to the head noun’s grammatical properties in the Standard Kurmanji pattern; the possessor’s person/number does not by itself determine the ezafe form.
5. **Assessment is not practical enough.** Ask learners to mark the head noun, ezafe, possessor and reflexive pronoun in complete sentences, then identify the antecedent of *xwe*. Include answer guidance.
6. **Duplicate bibliography entry:** the Haig & Öpengin DOI appears twice in the source list. Remove the duplicate during a later editorial pass.
7. **Source precision:** cite the relevant page/section for *mal-a me* and the reflexive analysis, rather than citing the chapter generally. Retain the Standard Kurmanji and dialect-variation caveat.

### Result
**The lesson’s broad account of possession, ezafe and reflexive *xwe* is plausible and consistent with the reference-grammar framework, but examples and categories need sharper documentation.** Only this audit entry was appended; lesson body, seed SQL, migrations, main branch and production database were not changed.

## Source review — course 2, lesson 7: personal pronouns and direct/oblique case (2026-10-21)

**Seed reviewed:** `docs/kurmanji-content-seed-part-05.sql`, key `kurmanji-course-2-lesson-07.html`. This review is based on the exact lesson HTML stored in the seed; no lesson content was edited.

### Findings

The lesson’s core caution is sound: Kurmanji case cannot be reduced to a universal rule that subjects are always direct or always oblique. The cited reference chapter describes a direct/oblique case distinction and split alignment: in present-tense transitive clauses the subject is typically direct, while in past-tense transitive clauses the subject may be oblique. The lesson also correctly identifies the standard personal-pronoun sets as an important topic, but it gives no complete sentence examples to show their syntactic distribution. See Haig, “Northern Kurdish (Kurmanjî),” §2.2.1 and the discussion of clause syntax. https://doi.org/10.1515/9783110421682-004

### Recommended revisions for a later content-editing pass

1. **Add a verified pronoun table.** Present `ez, tu, ew, em, hûn, ew` and `min, te, wî/wê, me, we, wan` in separate columns, with person, number, and gender distinctions where applicable. Label them as direct and oblique forms; do not call the oblique set simply “possessive pronouns.”
2. **Show the contrast in full sentences.** Include at least one present-tense transitive example and one past-tense transitive example, each with a word-by-word gloss and translation, checked against the reference grammar. Identify the subject, object, verb tense, and case of each noun phrase/pronoun.
3. **Qualify the rule.** Explain that case marking depends on grammatical construction and tense/aspect patterns, and that a learner should analyze the whole clause rather than infer case from the semantic role “subject” or “object” alone.
4. **Improve the review questions.** The first question currently asks for the oblique forms of `ez, tu, ew` but does not require learners to use them in context. Add a sentence-analysis task and answer key.
5. **Remove the duplicated DOI** in the Haig & Öpengin bibliography entry during the next editorial cleanup.
6. **Specify source sections/pages** for the pronoun paradigms and split-ergative examples. Keep the caveat that the lesson describes Standard Kurmanji and should not imply every dialect has identical forms or distributions.

### Result

**The lesson’s central warning about case is correct, but the current explanation remains schematic.** A pronoun paradigm alone is not enough: verified, glossed sentence pairs are needed to teach how direct/oblique forms work in context. Only this audit entry was appended; lesson body, seed SQL, migrations, `main`, and the production database were not changed.

## Source review — course 2, lesson 8: verb, stem, person and number (2026-10-21)

**Seed reviewed:** `docs/kurmanji-content-seed-part-05.sql`, key `kurmanji-course-2-lesson-08.html`. This review is based on the exact lesson HTML in the seed; no lesson content was edited.

### Findings

The lesson is appropriately cautious in saying that verb forms depend on tense and clause type, that transitivity matters, and that an overt subject pronoun does not mean the verb lacks person marking. These points align with Haig & Öpengin’s description of Kurmanji verbal morphology: finite verbs take person/number agreement suffixes, and the indexed core argument differs by construction—typically the intransitive subject across tenses, the transitive subject in present forms, and the transitive object in past forms. Their chapter also documents dialect variation in stems and endings. https://doi.org/10.1515/9783110421682-004

### Recommended revisions for a later content-editing pass

1. **Define “root” versus “stem” carefully.** The current lesson asks learners to distinguish the basic form and verb root but does not define either. Explain the infinitive, present stem, and past stem as separate analytical forms where the verb requires them; do not imply every verb can be derived by one uniform operation.
2. **Add a compact, sourced paradigm.** Use one common verb with verified present- and past-stem forms and person/number endings. Mark any stem alternation explicitly and cite the exact table/section in Haig & Öpengin or Thackston.
3. **Demonstrate agreement with complete clauses.** Contrast an intransitive verb, a present-tense transitive verb, and a past-tense transitive verb. Identify person/number marking and explain which argument controls agreement in each example.
4. **Explain transitivity operationally.** Give a clear example of a transitive verb with an object and an intransitive verb without a direct object; note that syntactic behavior, not translation alone, determines the analysis.
5. **Strengthen the exercises.** Ask learners to identify the stem, tense/aspect marking, person/number ending, transitivity, and agreement controller in actual sentences, with an answer key.
6. **Keep dialect boundaries explicit.** The reference chapter documents dialect-specific stem differences, including in common verbs. Label the lesson’s forms as Standard Kurmanji and do not generalize one dialect’s form to all Kurmanji.
7. **Remove the duplicated Haig & Öpengin DOI** from the bibliography during the next editorial cleanup.

### Result

**The lesson’s high-level claims are sound, but it currently offers a framework rather than a teachable paradigm.** The main missing evidence is a sourced set of verb forms and complete clauses showing how stem, person/number, tense/aspect, transitivity, and agreement interact. Only this audit entry was appended; lesson body, seed SQL, migrations, `main`, and the production database were not changed.

## Source review — course 2, lesson 9: present, past and future tense (2026-10-21)

**Seed reviewed:** `docs/kurmanji-content-seed-part-05.sql`, key `kurmanji-course-2-lesson-09.html`. This review is based on the exact lesson HTML in the seed; no lesson content was edited.

### Findings

The lesson correctly cautions that Kurmanji tense forms are not one uniform pattern and that transitivity affects past-tense clause structure. The source chapter describes the Standard Kurmanji future as a future particle `(d)ê` or `wê` combined with a present subjunctive verb form; it also notes dialectal differences. Present-indicative forms commonly use `di-`, while subjunctive forms commonly use `bi-`; these should be taught as patterns with documented exceptions, not as exceptionless rules. See Haig, “Northern Kurdish (Kurmanjî),” §§2.6.3–2.6.4 and Table 14. https://doi.org/10.1515/9783110421682-004

### Recommended revisions for a later content-editing pass

1. **Add a tense/aspect overview table.** Distinguish present indicative, subjunctive, simple past, past progressive/imperfective, and future; avoid implying that tense and aspect are interchangeable labels.
2. **Show a consistent verb paradigm.** Give verified Standard Kurmanji forms for one suitable verb across the relevant tenses, with person/number marking, a gloss, and translation. Check the chosen verb against Haig’s Table 14 or Thackston.
3. **Explain the future accurately.** Show `(d)ê/wê` with a subjunctive form and a complete sentence. Mention that the particle’s position can vary and that common verbs may omit `bi-` in the future construction.
4. **Separate prefixes by function.** Explain the usual roles of `di-`, `bi-`, `na-`, and `ne-`, including that negation and tense/mood interact and that lexical exceptions exist.
5. **Retain the transitivity warning with evidence.** Add a present transitive and a past transitive clause, marking subject, object, and agreement controller. Do not suggest that past tense alone automatically produces the same pattern in every dialect or construction.
6. **Make review questions applied.** Ask learners to classify tense/aspect, identify the verb stem and prefixes, and explain the future marker in actual sentences; provide answer guidance.
7. **Remove the duplicated Haig & Öpengin DOI** from the bibliography during a later editorial cleanup, and cite the specific sections/tables used.

### Result

**The lesson’s general caution is sound, but it lacks the paradigms and worked examples needed to verify the tense rules.** The most important additions are a sourced tense/aspect table, a consistent verb paradigm, and complete Standard Kurmanji examples that keep dialect variation visible. Only this audit entry was appended; lesson body, seed SQL, migrations, `main`, and the production database were not changed.

## Source review — course 2, lesson 10: negative and interrogative sentences (2026-10-21)

**Seed reviewed:** `docs/kurmanji-content-seed-part-05.sql`, key `kurmanji-course-2-lesson-10.html`. Exact lesson title: **ڕستەی نەفی و پرسیاری**.

### Findings

The lesson gives a cautious overview of three topics: verbal negation, negation in nominal sentences, and yes/no versus information questions. Its warning not to generalize from one verb is appropriate. However, the explanation of `na-` as replacing `di-` in many present forms is too narrow to stand alone without examples and a clear statement of scope. Haig’s grammatical sketch documents `na-` as a common negative indicative marker, `ne-` for subjunctive negation, and exceptions such as `ni-zanim` “I don’t know” and `ni-karim` “I cannot”; it also notes dialect-specific differences in negative forms. The Oxford chapter “Negation in Kurmanji” likewise analyzes several negative markers and their interaction with other prefixes. Sources: Haig, “Northern Kurdish (Kurmanjî),” https://doi.org/10.1515/9783110421682-004; Gündoğdu, “Negation in Kurmanji,” https://doi.org/10.1093/acprof:oso/9780190210434.003.0007.

### Recommended revisions for a later content-editing pass

1. **Teach negation by construction, not by a single substitution rule.** Provide a compact table for present indicative, subjunctive, imperative, past forms, and the copula/nominal predicate, with the scope clearly limited to Standard Kurmanji.
2. **Include sourced exceptions.** Add examples such as `nizanim` (“I don’t know”) and `nikarim` (“I cannot”) where appropriate, and verify the orthographic spacing/prefix convention used throughout the course.
3. **Distinguish `na-` and `ne-` by mood/construction.** Avoid implying that `na-` is the universal negative marker or that every verb simply replaces `di-` with `na-`.
4. **Explain nominal-sentence negation separately.** The current section names this category but gives no actual nominal sentence, form, or contrast with verbal negation. Add a positive/negative pair and identify the predicate.
5. **Add complete question examples.** Give at least one yes/no question and one information question, with a translation and the question word identified. Explain intonation only as one possible cue, not as a substitute for a documented grammatical pattern.
6. **Document word order carefully.** Show a neutral question and a contextually focused variant; explain that focus and discourse context can affect placement, rather than giving an unsupported fixed order rule.
7. **Improve the review questions.** Ask learners to negate and question full sentences, then identify which construction and negative marker are used. Include answer guidance.
8. **Remove the duplicated DOI link** in the bibliography in a later cleanup.

### Result

**The lesson is directionally sound but under-exemplified.** Its biggest accuracy risk is leaving learners with an overgeneralized `na-`/ `di-` replacement rule. A sourced construction-by-construction table, paired examples for nominal negation, and complete interrogative examples are the priority. Only this audit entry was appended; lesson HTML, seed SQL, migrations, `main`, and the production database were not changed.

## Source review — course 2, lesson 11: word order and sentence structure (2026-10-21)

**Seed reviewed:** `docs/kurmanji-content-seed-part-05.sql`, key `kurmanji-course-2-lesson-11.html`. Exact lesson title: **ڕێکخستنی وشەکان و پێکهاتەی ڕستە**.

### Findings

The lesson’s central guidance is sound: identify subject, verb and (where present) object; treat subject–object–verb (SOV) as the basic neutral pattern rather than an exceptionless rule; and account for discourse context when evaluating word order. Haig’s grammatical sketch explicitly describes pragmatically neutral Kurmanji clauses as SOV (with a qualified goal/recipient component) while noting that order is not rigidly fixed and direct objects can be fronted for pragmatic purposes. The lesson’s noun-phrase description is also broadly consistent with the source: possessors and descriptive adjectives typically follow the head noun and are linked through ezafe. Sources: Haig, “Northern Kurdish (Kurmanjî),” §§2.3 and 2.7.1, https://doi.org/10.1515/9783110421682-004; accessible University of Bamberg chapter PDF: https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf.

### Recommended revisions for a later content-editing pass

1. **Add full, glossed sentence examples.** The current lesson gives no actual Kurmanji sentence. Add a neutral intransitive clause and a transitive SOV clause, with translation and labels for subject, object and verb.
2. **Show a contrastive fronting example.** Compare a neutral SOV clause with a contextually focused object-fronted version, and explain that fronting changes information structure/focus rather than automatically making the sentence ungrammatical.
3. **Qualify the word-order rule precisely.** Describe SOV as the pragmatic-neutral baseline, not an absolute rule; note that recipient/goal placement and some patterns vary by construction and regional variety.
4. **Add an explicit noun-phrase pattern.** Give a sourced example showing noun + ezafe + possessor/adjective. Explain that ezafe forms vary with the head noun’s gender/number in Standard Kurmanji and that dialect variation exists.
5. **Separate grammatical roles from case marking.** Have learners identify subject/object first, then inspect direct/oblique case and the verb’s transitivity; do not imply that semantic roles alone always determine the surface form.
6. **Expand exercises with answer guidance.** Ask learners to label constituents, identify the neutral order, explain a fronted constituent in context, and mark the ezafe relation.
7. **Remove the duplicated Haig & Öpengin DOI** from the bibliography in a later cleanup.

### Result

**The lesson’s general principles are accurate but too abstract for a standalone lesson because it contains no worked Kurmanji sentences.** The priority is to add source-verified examples that demonstrate neutral SOV, discourse-driven fronting, and the ezafe structure of noun phrases. Only this audit entry was appended; lesson HTML, seed SQL, migrations, `main`, and the production database were not changed.

## Source review — course 2, lesson 12: review and final assessment (2026-10-21)

**Seed reviewed:** `docs/kurmanji-content-seed-part-05.sql`, key `kurmanji-course-2-lesson-12.html`. Exact lesson title: **پێداچوونەوە و تاقیکردنەوەی کۆتایی**.

### Findings

The lesson appropriately treats the final review as a synthesis of morphology, noun phrases, pronouns/case, verb tense and transitivity, negation, questions, and word order. It also correctly says that a learner should support analysis with a source and context rather than treating an isolated example as a universal rule. However, the current “final assessment” is still a set of broad prompts: there are no actual Kurmanji sentences, no scoring criteria, no answer key, and no explicit coverage map showing which course objectives are assessed. This makes it a useful checklist but not yet a reliable summative assessment.

The source grammar supports the need for construction-sensitive assessment: Standard Kurmanji has case contrasts that depend on syntactic function and construction; in particular, oblique case appears in several roles, including objects of present-tense transitive verbs, possessors in ezafe constructions, and subjects of past-tense transitive clauses. Ezafe forms also vary with gender/number and dialect. See Haig & Öpengin, “Northern Kurdish (Kurmanjî),” https://doi.org/10.1515/9783110421682-004; Thackston, *Kurmanji Kurdish: A Reference Grammar with Selected Readings* (2006), accessible via https://kurdishacademy.org/?page_id=623. Bibliographic metadata for Thackston is independently listed by Google Books: https://books.google.com/books/about/Kurmanji_Kurdish.html?id=fXhwvwEACAAJ.

### Recommended revisions for a later content-editing pass

1. **Turn the checklist into a balanced assessment.** Map each question to an explicit objective: morphology, noun phrase/ezafe, case and pronouns, tense/aspect and transitivity, negation/interrogatives, and constituent order/discourse.
2. **Use real Standard Kurmanji sentences.** Include a mix of simple and moderately complex examples, with reliable source provenance and translations. Do not create unverified forms solely to fill an exercise.
3. **Require a structured analysis.** For each sentence, ask learners to identify morphemes, noun phrase structure, grammatical roles and case, verb form, polarity/question type, and neutral versus contextually marked word order where applicable.
4. **Add an answer key and scoring rubric.** Award separate points for identification, explanation, and evidence/source use; accept justified alternatives when the construction or dialect allows variation.
5. **Avoid conflating categories.** Distinguish morpheme/root/stem, grammatical case versus semantic role, tense versus aspect/mood, and negation versus interrogative structure.
6. **Add an explicit Standard Kurmanji scope note.** Where a dialect-specific form is used, label the variety and cite the source; do not grade a variant as incorrect merely because it differs from the chosen standard.
7. **Remove the duplicated DOI link** in the bibliography during a later editorial cleanup.

### Result

**The review lesson covers the right domains, but its current questions are insufficient for a dependable final test.** The priority is a source-verified sentence set, an objective-to-question map, and an answer key/rubric. Only this audit entry was appended; lesson HTML, seed SQL, migrations, `main`, and the production database were not changed.

## Cross-lesson synthesis — course 2 lessons 1–12 (2026-10-21)

### Scope and completion

The audit document now contains individual source-review entries for **all 12 lessons in course 2**, matching the lesson keys and titles in `docs/kurmanji-content-seed-part-05.sql`. This completes the lesson-by-lesson review pass for course 2 only; it does **not** complete the release gate requiring review of all 38 lessons across both courses. Course 1's 26 lessons remain outside this pass unless separately reviewed.

### Cross-cutting findings

1. **The material is mostly a conceptual outline rather than a worked course.** Across the reviewed lessons, the recurring weakness is the lack of source-verified, complete Kurmanji sentences with translations, morpheme/gloss information, and explicit explanation. This especially affects verb paradigms, case, ezafe, negation, interrogatives, and word order.
2. **State the variety and scope consistently.** The lessons generally say “Standard Kurmanji,” which is useful, but examples and rules should identify the variety/source and mark known regional variation. Do not present construction-sensitive patterns as universal rules.
3. **Separate related grammatical categories.** Future editing should keep root/stem/infinitive distinct; distinguish tense, aspect and mood; distinguish syntactic function from semantic role and case; and treat negation by construction rather than as a single prefix-substitution rule.
4. **Make the assessment evidence-based.** Lesson 12 needs real source-verified sentences, a clear map from course objectives to questions, an answer key, and a rubric that accepts justified variation.
5. **Bibliography cleanup is a repeated editorial issue.** The reviewed seed lesson entries repeat the same Haig & Öpengin DOI link. This should be corrected in a separate, explicitly approved content-cleanup pass—not during this audit-only task.
6. **Do not treat recommendations as implemented fixes.** All recommendations in these entries are findings for a later content-editing pass. No lesson body, seed file, migration, production database, or `main` branch has been modified as part of this review sequence.

### Recommended next stage

Before making any lesson edits, prepare a proposed correction plan grouped by severity and cross-references: (A) scientific accuracy/scope, (B) missing examples and paradigms, (C) assessment design, and (D) bibliography/formatting. Present proposed text and cited evidence for review; only after approval should lesson content changes be made. Separately continue the remaining source-verification gate for course 1's 26 lessons, and verify test-database migration and authorization/progression behavior before PR #3 can be considered release-ready.

### Final status for this pass

**Course 2 source-review pass: 12/12 lessons documented. Full release audit: still incomplete.** This synthesis was appended to this audit document only. No lesson content, seed SQL, migration, production database, or `main` was changed.

## Course 1 — Lesson 01 source audit

- **Seed source:** `docs/kurmanji-content-seed-part-01.sql`
- **Seed key:** `kurmanji-course-1-lesson-01.html`
- **Title:** ناسینی کورمانجی و چوارچێوەی ڕێنووسی لاتینی
- **Scope checked:** introductory definition of Kurmanji, distinction among language/alphabet/orthography, course boundary, review questions, and bibliography. This is a source review only; no lesson content was changed.
- **Evidence reviewed:** Haig’s scholarly sketch describes a widely accepted written Standard Kurmanjî using a modified Roman alphabet, with conventions associated with the Hawar publications of the 1930s, while explicitly recognizing regional variation. See [Haig, “Northern Kurdish (Kurmanjî)” (2018), University of Bamberg PDF](https://www.uni-bamberg.de/fileadmin/aspra/06_Team/Publications_and_CV/haig_2018_ch.2.3_northern_kurdish.pdf) and the bibliographic record at [University of Bamberg](https://fis.uni-bamberg.de/entities/publication/06ab181d-1e09-43da-87f4-92453eaf5057).
- **What is sound:** The lesson appropriately separates the writing system from the language itself, identifies the Latin-based Hawar orthography as its scope, flags regional variation, and avoids claiming that one spelling convention represents every spoken variety. The course boundary is clearly stated.
- **Issues / recommendations for a later approved content pass:**
  1. Define the target consistently as **Northern Kurdish (Kurmanjî)** or **Standard Kurmanjî** where appropriate. The current phrase describing it as one of the “forms/paths” of Kurdish is understandable but linguistically underspecified; explain that naming and classification can vary by scholarly framework.
  2. Tighten the definitions of *language*, *alphabet*, and *orthography*. The current definitions are pedagogically serviceable but broad; clarify that an alphabet is a set of graphemes used by a writing system, while orthography concerns conventional rules for representing language in writing.
  3. The introductory lesson has no concrete Kurmanji example showing the difference between a written form, a grapheme, and pronunciation. Add a short, source-verified example in a future content pass, with the standard spelling and a carefully scoped pronunciation note.
  4. Bibliography entry for Thackston (2006) lacks publisher/publication details, and neither listed source is tied to a specific section or page in the lesson. Verify the edition and relevant pages before publication; do not invent page references.
- **Disposition:** No urgent factual contradiction was identified in this introductory outline. The principal gaps are terminology precision, one worked example, and bibliographic completeness. These are recommendations, not implemented fixes.
- **Scope guard:** Only `docs/KURMANJI-RELEASE-AUDIT.md` was updated. No lesson body, seed SQL, migration, production database, or `main` branch was modified. This entry does not establish that CI passed or that PR #3 is release-ready.

## Course 1 — Lesson 02 source audit

- **Seed source:** `docs/kurmanji-content-seed-part-01.sql`
- **Seed key:** `kurmanji-course-1-lesson-02.html`
- **Title:** ئەلفبێی هاوار و ٣١ پیتەکەی
- **Scope checked:** listed alphabet order, five letters with diacritics, Q/W/X, grapheme-versus-sound distinction, practice prompts, and listed sources.
- **Authoritative source checked:** Haig’s academic overview of Standard Kurmanjî identifies the Hawar-derived modified Roman alphabet as the written standard and explicitly notes variation. The standard alphabet is commonly presented as 31 letters; see [Haig, “Northern Kurdish (Kurmanjî)” (University of Bamberg PDF)](https://www.uni-bamberg.de/fileadmin/aspra/06_Team/Publications_and_CV/haig_2018_ch.2.3_northern_kurdish.pdf) and the University of Bamberg publication copy [here](https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf).
- **What is sound:** The 31 uppercase letters appear in the expected order: A B C Ç D E Ê F G H I Î J K L M N O P Q R S Ş T U Û V W X Y Z. The five marked letters are correctly listed as Ç, Ê, Î, Ş and Û. The lesson correctly warns that a written letter and a speech sound are not identical concepts, and it avoids the overclaim that each letter always has exactly one pronunciation in every word and variety.
- **Issues / recommendations for a later approved content pass:**
  1. The displayed alphabet currently contains uppercase letters only. Add the corresponding lowercase forms beside each uppercase form (A/a, B/b …) so learners can recognize the forms they will actually meet in ordinary text.
  2. Explain that Ç, Ê, Î, Ş and Û are distinct letters in this orthography, not optional decorative accents. Include a small contrastive reading/writing exercise with source-checked words; do not imply that removing the marks is harmless.
  3. The exercise asks why C/Ç and S/Ş must not be treated as the same, but it does not provide example words or answer guidance. Add verified examples and a short answer key in a future content pass.
  4. The bibliography gives general references but does not connect the alphabet list to a specific page/section in the academic source. Verify the relevant section and retain a page/section locator before publication. The cited Arizona resource should also be checked for current accessibility and exact bibliographic details.
- **Disposition:** No material error was found in the 31-letter inventory or its order. The main pedagogical gap is the absence of lowercase forms and worked examples; bibliographic locators need verification. Recommendations only—not implemented fixes.
- **Scope guard:** Only `docs/KURMANJI-RELEASE-AUDIT.md` was updated. No lesson body, seed SQL, migration, production database, or `main` branch was modified. This entry does not establish that CI passed or that PR #3 is release-ready.

## Course 1 — Lesson 03 source audit

- **Seed source:** `docs/kurmanji-content-seed-part-01.sql`
- **Seed key:** `kurmanji-course-1-lesson-03.html`
- **Title:** ڤاوڵەکان و نیشانەنووسییان
- **Scope checked:** eight written vowel letters, example-word table, marked-letter distinctions, claims about pronunciation, exercises, and bibliography.
- **Sources checked:** Haig, “Northern Kurdish (Kurmanjî)” (2018), especially the phonology discussion and vowel tables, pp. 110–111; see [University of Bamberg PDF](https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf). The chapter distinguishes five full/tense vowel categories written `a, ê, î, o, û` from three lax vowel categories written `e, i, u`, and documents dialectal variation.
- **What is sound:** The lesson correctly lists the eight written vowel letters `a, e, ê, i, î, o, u, û` and warns learners not to collapse `e/ê`, `i/î`, or `u/û`. It also appropriately warns that comparisons to sounds in other languages are not fully reliable.
- **Issues / recommendations for a later approved content pass:**
  1. The lesson title and first section should explicitly distinguish **eight vowel letters** from the phonological analysis of vowel sounds. The academic description is more nuanced than “eight vowel letters = eight sounds”: it distinguishes full/tense and lax vowels, and the written `i` and `u` can represent centralized vowels in the described standard analysis.
  2. “نیشانەی ^” is a loose way to describe the circumflex. Prefer a clear learner-facing description such as “نیشانەی سەر پیت (ê, î, û)” and show uppercase/lowercase forms consistently.
  3. Recheck every word/gloss pair against the cited dictionary/source before publication. In particular, the lesson’s Sorani glosses for `belg`, `nod`, `qul`, and `bûz` need explicit source verification; the current seed does not provide IPA or a source locator for each item. Do not silently replace these examples without an approved content pass.
  4. Add IPA or a careful pronunciation guide for each vowel category and at least one worked example contrasting the written letters `e/ê`, `i/î`, and `u/û`. Explain that phonetic realization and some lexical spellings can vary by dialect.
  5. The Arizona resource is cited for the table, but the lesson does not record a specific subsection or retrieval/edition detail. Confirm that the link still supports each word and gloss; use Haig (2018), pp. 110–111, for the phonological distinction.
- **Disposition:** The inventory of eight vowel letters is appropriate for the orthographic introduction, but the lesson currently risks conflating letters and phonological categories and needs word/gloss verification. These are audit findings, not implemented fixes.
- **Scope guard:** Only `docs/KURMANJI-RELEASE-AUDIT.md` was updated. No lesson body, seed SQL, migration, production database, or `main` branch was modified. This entry does not establish that CI passed or that PR #3 is release-ready.

## Course 1 — Lesson 04 source audit

- **Seed source:** `docs/kurmanji-content-seed-part-01.sql`
- **Seed key:** `kurmanji-course-1-lesson-04.html`
- **Title:** کۆنسۆنەنتەکان و پەیوەندییان بە نووسینەوە
- **Scope checked:** definition of consonants, consonant-letter table and IPA values, C/Ç and S/Ş contrasts, R/RR discussion, X, practice prompts, and bibliography.
- **Sources checked:** University of Arizona, Iranian Languages, “Kurmanji Kurdish” (phonology and orthography), including its consonant chart and letter-to-IPA table; Haig & Öpengin, “Northern Kurdish (Kurmanjî),” especially the consonant phoneme inventory and notes on aspiration, dialect variation, and trill/flap. See [University of Arizona resource](https://iranian-languages.arizona.edu/node/7), [Haig & Öpengin PDF](https://www.uni-bamberg.de/fileadmin/aspra/06_Team/Publications_and_CV/HaigOepengin2018_Kurmanji_Kurdish_.pdf), and [Haig 2018 chapter PDF](https://www.uni-bamberg.de/fileadmin/aspra/06_Team/Publications_and_CV/haig_2018_ch.2.3_northern_kurdish.pdf).
- **What is sound:** The main grapheme-to-IPA mappings C /d͡ʒ/, Ç /t͡ʃ/, J /ʒ/, Ş /ʃ/, X /χ/ and Y /j/ are consistent with the cited orthographic descriptions. The lesson correctly warns that letter and sound are not identical and notes that the trill/flap distinction and other phonetic distinctions vary across dialects and are not always represented in standard spelling. The source explicitly confirms that the written letter X may correspond to /χ/ and /ʁ/ in different varieties.
- **Issues / recommendations for a later approved content pass:**
  1. The table presents K, P and T as plain /k/, /p/ and /t/ without explaining that the literature documents aspiration contrasts for voiceless stops in many Kurmanji varieties, while the standard Latin orthography generally does not mark the contrast. Add a concise dialect-sensitive note rather than implying the displayed IPA is exhaustive.
  2. The lesson says R/RR can mark a trill-versus-tap distinction “in some writing systems.” Clarify the scope: the Arizona description says standard orthography often ignores this distinction, and where it is represented, `rr` is used for the trill while `r` commonly represents the flap in the described analysis. Avoid presenting this as universal across all varieties.
  3. The consonant table is a teaching inventory of selected written letters and their common correspondences, not a complete phoneme inventory. State this directly near the table; the academic inventory includes phonetic/phonological contrasts not shown as separate standard letters, and pharyngeal sounds vary by dialect.
  4. The exercise asks learners to find an example word with Ç or Ş but supplies no worked example or answer guidance. Add source-checked examples and a short answer key in a later approved content pass.
  5. The cited sources are appropriate in topic, but the lesson should add precise subsection/table or page locators, and confirm the Arizona page’s current contents when the final bibliography is prepared.
- **Disposition:** The central orthographic correspondences are broadly sound. The main scientific risk is that the compact table may be read as a complete and dialect-neutral phoneme inventory, especially for aspiration and R/RR. Recommendations only; no lesson content has been changed.
- **Scope guard:** Only `docs/KURMANJI-RELEASE-AUDIT.md` was updated. No lesson body, seed SQL, migration, production database, or `main` branch was modified. This entry does not establish that CI passed or that PR #3 is release-ready.

## Course 1 — Lesson 05 source audit

- **Seed source:** `docs/kurmanji-content-seed-part-01.sql`
- **Seed key:** `kurmanji-course-1-lesson-05.html`
- **Title:** پیتە تایبەتەکان: ç، ş، ê، î، û
- **Scope checked:** the five marked letters, example words and Sorani glosses, uppercase/lowercase forms, spelling exercises, and listed references.
- **Authoritative source checked:** University of Arizona, Iranian Languages, “Kurmanji Kurdish,” which lists the standard letter-to-IPA correspondences and example words for all five letters; Haig (2018), “Northern Kurdish (Kurmanjî),” for vowel categories and dialect variation. See [University of Arizona phonology and orthography](https://iranian-languages.arizona.edu/node/7) and [Haig 2018 chapter PDF](https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf).
- **What is sound:** The lesson correctly treats `ç, ş, ê, î, û` as distinct letters in standard Latin-based Kurmanji orthography, not decorative marks. The correspondences `ç` /t͡ʃ/, `ş` /ʃ/, `ê` /e/, `î` /i/, and `û` /u/ are consistent with the Arizona chart. The examples `çak` (“good”), `şaş` (“wrong”), `êş` (“pain”), `îro` (“today”), and `bûz` (“ice”) are listed there with the same glosses.
- **Issues / recommendations for a later approved content pass:**
  1. Make clear that the five marked letters are part of the 31-letter Latin-based orthography, but they are not all the same phonological type: `ç` and `ş` are consonant letters, while `ê`, `î`, and `û` are vowel letters.
  2. Add the IPA or an accessible pronunciation cue beside each example, with a note that actual phonetic realization may vary by dialect; do not imply that a single pronunciation guide captures every variety.
  3. The exercise to copy the uppercase/lowercase forms is appropriate, but the later exercise asking learners to find further examples should include a source-checked worked example and an answer key.
  4. Add a precise locator to the Arizona source’s orthography table and the relevant vowel discussion in Haig (2018); the general links are relevant, but currently the lesson does not specify table/section/page locators.
- **Disposition:** The core letter inventory, example spellings, and glosses are supported by the cited phonology/orthography resource. The main remaining needs are clearer consonant-versus-vowel grouping, pronunciation support, and more traceable citations. Recommendations only; no lesson content has been changed.
- **Scope guard:** Only `docs/KURMANJI-RELEASE-AUDIT.md` was updated. No lesson body, seed SQL, migration, production database, or `main` branch was modified. This entry does not establish that CI passed or that PR #3 is release-ready.

## Course 1 — Lesson 06 source audit

- **Seed source:** `docs/kurmanji-content-seed-part-01.sql`
- **Seed key:** `kurmanji-course-1-lesson-06.html`
- **Title:** خوێندنەوە و نووسینی وشەی سادە
- **Scope checked:** reading method, ten example words and Sorani glosses, orthographic notes, writing exercises, self-assessment, and bibliography.
- **Authoritative source checked:** University of Arizona, Iranian Languages, “Kurmanji Kurdish,” including its orthography chart and vowel examples; the resource gives `av` “water,” `dil` “heart,” `lêv` “lip,” `hîn` “still,” `qaz` “goose,” `qul` “hole,” `çak` “good,” `şaş` “wrong,” and `yek` “one.” See [University of Arizona phonology and orthography](https://iranian-languages.arizona.edu/node/7). The page also cautions that vowel letters correspond to distinct vowel qualities and that some phonetic distinctions vary by dialect.
- **What is sound:** The listed spellings are consistent with the source examples. The lesson’s focus on preserving diacritics and checking word meanings against a reference is pedagogically appropriate. The table correctly uses `çak` and `şaş` to reinforce the contrast between `c/ç` and `s/ş`.
- **Issues / recommendations for a later approved content pass:**
  1. Correct the exercise prompt “وشەکانی qul و hîn بەراورد بکە و جیاوازیی u و î…”: `qul` contains `u`, while `hîn` contains `î`, so the contrast is indeed present, but the teaching note should explain that these letters represent different vowel qualities, not merely different-looking characters. Add IPA or a careful pronunciation cue.
  2. The Sorani glosses are broadly supported by the cited chart, but the lesson should avoid implying each word has only one meaning. The current note already acknowledges polysemy; preserve that caveat and add dictionary locators for entries if available.
  3. The prompt asks learners to write uppercase and lowercase forms but does not supply the expected forms or an answer key. Add a compact model, e.g. `AV / av`, `DIL / dil`, `LÊV / lêv`, `HÎN / hîn`, `QAZ / qaz`, while ensuring diacritics are preserved.
  4. Add a short, fully worked example showing how to check spelling, pronunciation, and meaning separately. Avoid the claim that spelling is perfectly one-to-one with pronunciation, because the academic source documents dialect variation and orthographically unmarked phonetic contrasts.
  5. The listed Yari dictionary link should be checked for exact entry-level support during final bibliography cleanup; the University of Arizona source currently supports most of the listed example words directly.
- **Disposition:** The core word spellings and the selected glosses are largely supported by the cited academic resource. The lesson is suitable as an introductory practice unit, with improvements needed in pronunciation guidance, model answers, and source traceability. Recommendations only; no lesson content has been changed.
- **Scope guard:** Only `docs/KURMANJI-RELEASE-AUDIT.md` was updated. No lesson body, seed SQL, migration, production database, or `main` branch was modified. This entry does not establish that CI passed or that PR #3 is release-ready.

## Course 1 — Lesson 07 source audit

- **Seed source:** `docs/kurmanji-content-seed-part-01.sql`
- **Seed key:** `kurmanji-course-1-lesson-07.html`
- **Title:** ڕێنووسی وشە باوەکان
- **Scope checked:** ten greetings/everyday expressions, orthographic notes, five common spelling pitfalls, practice tasks, and listed references.
- **Sources checked:** University of Arizona Iranian Languages, “Kurmanji Kurdish” (orthography and phonology); Yari, “Kurdish greetings and everyday phrases for beginners” and its Kurmanji–English dictionary. The Yari phrase guide directly supports `Silav`, `Rojbaş`, `Şevbaş`, `Bi xêr hatî`, `Tu çawa yî?`, `Ez baş im, spas`, `Spas/sipas`, `Erê`, `Na`, and `Ji kerema xwe`. The University of Arizona source supports the lesson’s emphasis on distinguishing letters such as `ç/c`, `ş/s`, and vowel contrasts. (Sources: https://yari.krd/learn/kurdish-greetings/ ; https://yari.krd/dictionary/ ; https://iranian-languages.arizona.edu/node/7.)
- **What is sound:** The selected expressions are appropriate for a beginner spelling lesson, and the note that `spas` and `sipas` vary is supported by the Yari guide. The exercises ask learners to preserve the distinctive letters and consult a dictionary rather than infer Kurmanji spelling from Sorani pronunciation.
- **Issues / recommendations for a later approved content pass:**
  1. Correct the semantic description of `Şevbaş`: the source glosses it as “good night,” typically used when going to bed or leaving late; it should not be taught as an unrestricted daytime greeting. `Rojbaş` is the daytime greeting.
  2. Teach each expression as a complete unit with a context and at least one short dialogue. The present lesson is mostly a vocabulary list and spelling drill, so it does not yet demonstrate real communicative use.
  3. Explain that `Tu çawa yî?` addresses one person informally, and show the response `Ez baş im, spas.` The source explains the forms `im` and `yî`; learners should not be led to treat them as detachable spelling decorations.
  4. Distinguish orthographic rules from pedagogical simplifications. Saying `x` is not written as `ks` is a useful warning against English-based spelling guesses, but the lesson should include the actual Kurmanji sound /χ/ and a pronunciation cue rather than only a negative rule.
  5. The statement that `Rojbaş` may be written as two words or one should be handled cautiously: the cited greeting source gives `Rojbaş` as one conventional form. If a spaced variant is retained, document its usage and source instead of presenting both as equally standard without evidence.
  6. Add a model answer and an assessment rubric: correct letters/diacritics, word boundaries and punctuation, meaning in context, and ability to explain the spelling choice. At an advanced quality bar, the course should progressively move from recognition to controlled production, dialogue, independent lookup, and explanation of dialect/register variation.
  7. The lesson’s reference list is relevant, but the exact source should be attached to each disputed or variant form. Use the academic University of Arizona resource for phonological/orthographic explanations and the phrase guide/dictionary for current beginner expressions; identify community resources as learner references rather than treating them as substitutes for academic analysis.
- **Disposition:** The lesson has a useful beginner-friendly set of expressions and sound-letter reminders, but it needs contextual dialogue, clearer greeting pragmatics, explicit pronunciation support, and measurable answer criteria to meet a rigorous, progressive curriculum standard. Recommendations only; no lesson content has been changed.
- **Curriculum quality criterion:** Future lesson audits must evaluate not only whether individual facts are correct, but whether the course forms a coherent progression from foundational knowledge to intermediate and advanced competence, with explicit learning outcomes, accurate explanations, practice, answer feedback, and traceable sources.
- **Scope guard:** Only `docs/KURMANJI-RELEASE-AUDIT.md` was updated. No lesson body, seed SQL, migration, production database, or `main` branch was modified. This entry does not establish that CI passed or that PR #3 is release-ready.

## Course 1 — Lesson 08 source audit

- **Seed source:** `docs/kurmanji-content-seed-part-01.sql`
- **Seed key:** `kurmanji-course-1-lesson-08.html`
- **Title:** جیاوازی نێوان نووسین و دەربڕین
- **Scope checked:** definitions of letter, phoneme, and pronunciation; examples of vowel contrasts; `r/rr`; dialectal stop contrasts; explanatory notes; exercises and references.
- **Sources checked:** University of Arizona, Iranian Languages, “Kurmanji Kurdish” (phonology and orthography); Geoffrey Haig, “Northern Kurdish (Kurmanjî)” (2018), especially the vowel/consonant inventories and discussion of dialect variation. Both sources explain that the standard orthography does not encode every phonetic distinction and that the realizations of some consonants vary by dialect. See https://iranian-languages.arizona.edu/node/7 and https://doi.org/10.1515/9783110421682-004.
- **What is sound:** This lesson addresses an important foundational linguistic distinction: written letters, phonemes, and actual pronunciation are not identical concepts. Its warning against assuming that every phonetic detail must have a separate letter is sound. The vowel examples `dil/hîn` and `qul/bûz` are useful illustrations of orthographic contrasts.
- **Issues / recommendations for a later approved content pass:**
  1. The definitions should be more rigorous. A **letter/grapheme** is a unit of a writing system; a **phoneme** is an abstract contrastive sound category established by its function in a language; **phone/phonetic realization** refers to a concrete speech sound. “دەربڕین” can also mean expression/utterance in Kurdish, so define the intended technical sense explicitly and introduce the terms with clear examples.
  2. The vowel description “eight vowels” risks conflating eight vowel letters/orthographic categories with phonetic analysis. Haig’s analysis distinguishes five tense/full vowels and three lax/centralized vowels; the IPA mappings should be shown accurately and explained without implying that vowel length alone is contrastive.
  3. The `r / rr` row needs correction or qualification. Standard Kurmanji Latin orthography does not reliably mark a phonemic trill–tap contrast by writing `r/rr`; the academic descriptions distinguish trill /r/ and flap /ɾ/ and discuss their distribution. Do not teach `rr` as a universal standard spelling rule without dialect-specific evidence.
  4. The `p / pˤ` example is useful but oversimplified. The literature describes aspiration and unaspirated/possibly pharyngealized stop contrasts, and their phonemic status/realization varies across dialects. Present the exact notation and example from the chosen source, and avoid implying that every dialect has the contrast or that `pˤ` is simply an ordinary written letter.
  5. The exercise asks learners to find a case where phonetic detail is not represented in standard spelling, but offers no model answer or source locator. Add a worked example with orthographic form, IPA, phonological interpretation, dialect/variety label, and citation.
  6. The lesson should be developed as a real bridge from beginner orthography into phonetics/phonology: include minimal-pair logic for identifying phonemes, a grapheme–phoneme–phone comparison table, a small IPA key, listening/recording tasks if audio is available, answer keys, and a cumulative review. This is necessary to meet the requested progression from foundations toward advanced study.
  7. Bibliographic precision should be improved: cite the relevant section/pages in Haig (2018) and the exact University of Arizona tables. Use the academic grammar for analytical claims; the alphabet explainer can serve as a supplementary learner aid, not as the primary authority for phonological theory.
- **Disposition:** The conceptual aim is valuable and the core distinction is appropriate, but the treatment needs terminology refinement and corrections/qualifications concerning vowels, rhotics, and dialect-dependent stop contrasts. Recommendations only; no lesson content has been changed.
- **Curriculum quality criterion:** Assess whether each lesson builds on prior knowledge, introduces technical terms precisely, includes evidence-backed examples and guided practice, and provides answer feedback that enables progression from introductory recognition to independent analysis.
- **Scope guard:** Only `docs/KURMANJI-RELEASE-AUDIT.md` was updated. No lesson body, seed SQL, migration, production database, or `main` branch was modified. This entry does not establish that CI passed or that PR #3 is release-ready.

## Course 1 — Lesson 09 source audit

- **Seed source:** `docs/kurmanji-content-seed-part-02.sql`
- **Seed key:** `kurmanji-course-1-lesson-09.html`
- **Title:** ناوە کەسییەکان و شوێنەکان
- **Scope checked:** capitalization and spelling of personal/place names, diacritics, alternative toponyms, three sentence examples, exercises, and listed references.
- **Sources checked:** W. M. Thackston, *Kurmanji Kurdish: A Reference Grammar with Selected Readings*; University of Arizona, Iranian Languages, “Kurmanji Kurdish”; and Kurdi School’s Kurmanji grammar overview. Kurdi School explicitly gives `ji Amedê`, `li Swêdê`, and `ji Qamişloyê` to illustrate the place-name endings after `ji/li`, and identifies Amed/Diyarbakır, Hewlêr/Erbil, and Wan/Van as paired names. The University of Arizona grammar overview supports the importance of case marking and the oblique forms used in prepositional phrases. See https://sites.fas.harvard.edu/~iranian/Kurmanji/kurmanji_complete.pdf, https://iranian-languages.arizona.edu/node/7, and https://kurdischool.com/grammar.html.
- **What is sound:** The lesson appropriately highlights preserving diacritics in personal names and acknowledges that places may have names in more than one language. The examples `li Amedê` and `ji Qamişloyê` illustrate a real grammatical pattern and provide an opportunity to connect orthography to morphology.
- **Issues / recommendations for a later approved content pass:**
  1. Separate **capitalization**, **orthographic spelling**, **toponym choice**, and **grammatical inflection** as four distinct learning goals. The lesson currently moves from names to case endings without clearly signalling that `Amedê/Qamişloyê` are inflected forms, not simply alternative spellings of `Amed/Qamişlo`.
  2. Add a small paradigm and explain the construction: `Amed → li Amedê / ji Amedê`; `Qamişlo → li Qamişloyê / ji Qamişloyê`. Explain that the suffix depends on the grammatical construction and the final shape of the name, and cite the relevant grammar section. Do not imply that every name follows one mechanically identical pattern.
  3. Review the Sorani translations of the sentences for naturalness and grammatical precision, especially `Ez ji Qamişloyê me.` Provide literal glosses as well as fluent translations so learners can see how `ji` and the inflected place name function.
  4. The opening claim that personal and place names are capitalized should be explicitly scoped to the Latin-script Kurmanji orthographic convention taught here. It must not be generalized to all Kurdish writing systems, since Sorani’s Perso-Arabic script has no uppercase/lowercase distinction.
  5. For personal names, preserve the bearer’s established/preferred spelling and do not “correct” a person’s name by applying a generalized orthographic rule. For place names, specify the language, variety, intended audience, and source/authority for the selected form; distinguish local Kurdish forms from official state forms rather than presenting one as universally correct.
  6. The exercise asks learners to produce names and verify them, but no model answer, answer key, or rubric is provided. Add worked examples, a source-evaluation task, and a short editing exercise that checks capitalization, diacritics, place-name selection, and case endings separately.
  7. Increase the academic progression: start with identifying proper names, then preserve graphemes, then compare exonyms/endonyms, then inflect place names in prepositional phrases, and finally analyse names in a short authentic paragraph. This creates a bridge from introductory orthography to morphology and sociolinguistic awareness.
  8. Use Thackston and the University of Arizona resource for grammatical analysis; Kurdi School is useful for learner-facing examples. The name-source site can assist with checking names but should not be treated as an authoritative, uniform standard for every region or family.
- **Disposition:** The lesson has a sound practical purpose and useful examples, but it needs clearer separation of spelling from grammatical inflection, explicit scope for capitalization, careful handling of name variants, and answer feedback to meet the requested high academic standard. Recommendations only; no lesson content has been changed.
- **Curriculum quality criterion:** A lesson is not considered complete merely because examples are plausible; it must define the concept, show the rule in context, identify variation and exceptions, cite traceable sources, and include practice with feedback.
- **Scope guard:** Only `docs/KURMANJI-RELEASE-AUDIT.md` was updated. No lesson body, seed SQL, migration, production database, or `main` branch was modified. This entry does not establish that CI passed or that PR #3 is release-ready.

## Course 1 — Lesson 10 source audit

- **Seed source:** `docs/kurmanji-content-seed-part-02.sql`
- **Seed key:** `kurmanji-course-1-lesson-10.html`
- **Title:** دەربڕینە سەرەتاییەکان
- **Scope checked:** greetings and farewells, introductions and asking how someone is, politeness phrases, short dialogue, exercises, and references.
- **Sources checked:** Yari, “Kurdish greetings and everyday phrases for beginners (Kurmanji)” and the *Kurmanji Kurdish: A Reference Grammar with Selected Readings* course material. Yari directly supports `Silav`, `Rojbaş`, `Şevbaş`, `Bi xêr hatî`, `Bi xatirê te`, `Tu çawa yî?`, `Ez baş im, spas`, `Navê min … e`, `Spas`, `Ji kerema xwe`, `Erê`, and `Na`, and describes variation by context and region. Sources: https://yari.krd/learn/kurdish-greetings/ and https://sites.fas.harvard.edu/~iranian/Kurmanji/kurmanji_complete.pdf.
- **What is sound:** The lesson has a useful first-conversation structure and includes both vocabulary tables and a short dialogue. It correctly treats `Tu çawa yî?` as singular and recognizes that regional/social context can affect phrase choice.
- **Issues / recommendations for a later approved content pass:**
  1. Add `Êvarbaş!` (“good evening”) explicitly. The current table maps `Şevbaş!` to a late-evening/farewell use; Yari distinguishes `Êvarbaş` (“good evening”) from `Şevbaş` (“good night,” when going to bed or leaving late). Avoid teaching these as interchangeable.
  2. Verify and standardize `Bi xatirê te!` against the reference spelling `Bi xatirê te` / `Xatirê te`; keep punctuation consistent and note that `te` is singular, with `we` used for plural/formal address where appropriate.
  3. The note under `Bi xêr hatî` says the form varies by number and gender but only gives the singular form. Add the relevant plural/formal counterpart with a source, and do not imply a gender contrast unless the cited grammar supports the specific forms taught.
  4. In the dialogue, add `Û tu?` (“and you?”) and then a closing/farewell so the exchange models a complete natural interaction rather than only repeating the same question. Add a parallel version for a more formal or plural audience in a later step.
  5. Explain that `Ez baş im`, `Tu çawa yî?`, and `Navê min … e` contain grammatical person/verb forms; learners should practise them as patterns but also see the forms `im`, `yî`, and `e) compared in a small table. This provides a bridge from phrase memorization to grammar.
  6. Correct the scope of the gloss for `Ez ji ... me`: it can mean “I am from …,” with the place name taking an oblique/inflected form in examples such as `Ez ji Amedê me`. Cross-link to the prior lesson on place names and explain the inflection rather than leaving the blank to be filled mechanically.
  7. Provide model answers and a rubric for the tasks: accurate spelling/diacritics, grammatical form, social appropriateness, intelligibility, and ability to verify a phrase in a reference. Include a short listening/speaking task if audio is available; text alone cannot fully assess pronunciation or conversational fluency.
  8. At the requested academic standard, distinguish a learner-facing phrase guide from a descriptive grammar. Use the guide for everyday meanings and pragmatic context; use Thackston for grammatical explanations and provide section/page locators. Mark dialect/register variation instead of implying every phrase is universal.
- **Disposition:** A useful beginner speaking unit with a logical selection of phrases, but it needs a clearer distinction between evening/night greetings, fuller number/register coverage, grammar-aware dialogue practice, and answer criteria to support progression beyond memorization. Recommendations only; no lesson content has been changed.
- **Curriculum quality criterion:** Language lessons should progress from accurate recognition and controlled repetition to contextual dialogue, grammar-aware production, independent reference use, and feedback on both form and communicative appropriateness.
- **Scope guard:** Only `docs/KURMANJI-RELEASE-AUDIT.md` was updated. No lesson body, seed SQL, migration, production database, or `main` branch was modified. This entry does not establish that CI passed or that PR #3 is release-ready.

## Course 1 — Lesson 11 source and Avasin spelling audit

- **Seed source:** `docs/kurmanji-content-seed-part-02.sql`
- **Static lesson:** `kurmanji-course-1-lesson-11.html`
- **Seed key / title:** `kurmanji-course-1-lesson-11.html` — جێناوە کەسییەکان
- **Academic source checked:** Haig & Öpengin (2018), “Northern Kurdish (Kurmanjî),” §3.2.5 and the personal-pronoun table; University of Arizona, Iranian Languages, “Kurmanji Kurdish — Syntax and Pronouns.” Both give the Standard Kurmanji direct/oblique sets: `ez/min`, `tu/te`, `ew/wî,wê`, `em/me`, `hûn/we`, `ew/wan`; they also describe the invariant reflexive `xwe`. Sources: https://www.uni-bamberg.de/fileadmin/aspra/06_Team/Publications_and_CV/HaigOepengin2018_Kurmanji_Kurdish_.pdf and https://iranian-languages.arizona.edu/node/7.
- **What is sound:** The core pronoun inventory and the examples `navê min`, `bi te re`, and reflexive `xwe` are broadly consistent with the academic descriptions. The lesson correctly warns that oblique forms are not restricted to past-tense clauses.
- **Issues / recommendations for a later approved content pass:**
  1. Keep the direct/oblique distinction central, and add a short table of syntactic environments: direct subjects in common present-tense clauses, oblique forms after adpositions and in possession, and oblique agents in past transitive constructions. Avoid turning this introductory summary into an absolute rule without noting constructional and dialectal detail.
  2. The line that `ew` can mean either “he/she/it” or “they” is correct but needs a paired singular/plural example and agreement cues, since the form itself does not distinguish number.
  3. Clarify that `wî` and `wê` are gendered oblique forms in Standard Kurmanji; identify them as masculine/feminine and show them in a complete phrase, not only in parentheses.
  4. The sentence `Ez ji dayika xwe hez dikim.` is useful, but explain the construction `ji ... hez kirin` and the subject-oriented reference of `xwe`. Avoid suggesting that `xwe` simply means “my” in every context.
  5. The exercise needs an answer key and a small paradigm task that makes learners produce both direct and oblique forms. Add a short past-transitive example later in the course so learners can connect pronouns with Kurmanji split alignment/ergativity rather than memorize the table in isolation.
  6. Improve bibliography precision with section/page locators for Haig & Öpengin and Thackston; the University of Arizona page is a useful overview, while the academic chapter should be the primary citation for the case system.
- **Avasin spelling pass applied:** Corrected the preferred Sorani spellings in the visible website pages `index.html`, `learning.html`, `linguistics.html`, the shared text-normalization logic in `script.js`, the lesson-11 static page, and Sorani prose in `docs/kurmanji-content-seed-part-02.sql` (lessons 09–16). The pass applies Avasin’s preferred forms such as `نوسین`, `نوسراوە`, `فێربون`, `هەمو`, `نمونە`, `پەیویست`, `ڕون`, `نێوەڕۆک`, `چیە`, and `نیە`. Latin-script Kurmanji examples and source links were not rewritten by these Sorani-specific substitutions.
- **Scope / verification:** Each edited file was fetched again and compared with the intended committed content. Changes were limited to the listed site text/normalization and the course-1 draft seed/static lesson; no migration was applied and no production database or `main` branch was changed. This does not claim that CI or browser end-to-end tests passed.
- **Curriculum quality criterion:** Lessons must progress from form recognition to grammatical distribution, contextual examples, independent production, and feedback, with academic claims tied to traceable sources.

## Course 1 — Lesson 12 source and Avasin spelling audit

- **Seed/static source:** `docs/kurmanji-content-seed-part-02.sql`; `kurmanji-course-1-lesson-12.html`.
- **Lesson key/title:** `kurmanji-course-1-lesson-12.html` — جێناوە ئاماژەییەکان.
- **Academic source checked:** Haig & Öpengin (2018), “Northern Kurdish (Kurmanjî),” §2.2.3 and Table 10; University of Arizona, Iranian Languages, “Kurmanji Kurdish — Syntax and Pronouns.” These distinguish proximal `ev` (“this/these”) and distal `ew` (“that/those”), with oblique forms `vî/vê/van` and `wî/wê/wan`; they note dialectal variation. References: https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf and https://iranian-languages.arizona.edu/node/7.
- **Strengths:** The lesson introduces the core near/far distinction and appropriately alerts learners that `ew` can also function as a third-person pronoun. It also introduces the useful distinction between a demonstrative used independently (`Ev baş e.`) and one accompanying a noun.
- **Scientific/content issues to address in a later approved lesson-content pass:**
  1. The current table is only an introductory direct-form contrast. Add the standard oblique paradigm (`vî, vê, van; wî, wê, wan`) with gender/number labels and examples such as `vî kurî`, `vê keçê`, and `van kitêban`. Do not present the direct forms as the entire demonstrative system.
  2. Distinguish grammatical function precisely: a demonstrative may be pronominal when it stands independently and determiner/adjectival when it modifies a noun. Define the terminology consistently in Kurdish, rather than calling every demonstrative a “pronoun.”
  3. Add the noun-associated suffix/clitic patterns only with a clear note that forms vary across dialects and constructions; use Haig & Öpengin as the primary reference instead of asserting a single universal pattern.
  4. The sentence `Ew mal mezin e.` should be checked against the chosen Standard Kurmanji reference and its noun phrase conventions before being treated as a model. Mark constructed examples as such and include a source-backed example alongside them.
  5. Add an answer key, contrastive near/far practice in complete noun phrases, and a scoring rubric. Progression should move from recognizing `ev/ew` to choosing direct/oblique forms in grammatical context and explaining why.
  6. Supply precise page/section references in the bibliography and explicitly label the standard variety used; do not treat regional forms as errors merely because they differ from the chosen standard.
- **Avasin spelling consistency:** Re-applied the agreed Sorani spellings to the static lesson pages 09–16 and checked the shared seed file; Latin-script Kurmanji forms were preserved. Examples of the enforced house style include `نوسین`, `نوسراوە`, `فێربون`, `هەمو`, `نمونە`, `پەیویست`, `ڕون`, `نێوەڕۆک`, `چیە`, and `نیە`.
- **Verification/scope:** Changed files were fetched again after each write and compared with the intended content. This pass changed the lesson 09–16 static pages only where Avasin spelling substitutions were needed, plus this audit document; the lesson seed content was checked and needed no further spelling substitutions in this pass. No production database, migration, or `main` branch was changed. No new CI or browser-test success is claimed.
- **Curriculum standard:** Teach from foundational recognition to grammatical distribution, dialect-aware analysis, independent use, and feedback; all significant claims must have traceable academic support.

## Course 1 — Lesson 13 source and Avasin spelling audit

- **Seed/static source:** `docs/kurmanji-content-seed-part-02.sql`; `kurmanji-course-1-lesson-13.html`.
- **Lesson key/title:** `kurmanji-course-1-lesson-13.html` — ژمارەکان ١–٢٠.
- **Sources checked:** Haig & Öpengin (2018), “Northern Kurdish (Kurmanjî),” §2.4 “Numerals”; Omniglot, “Northern (Kurmanji) Kurdish numbers”; CrowdsourceKurdish, “Kurdish Numbering Rules.” Sources: https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf ; https://www.omniglot.com/language/numbers/kurdish.htm ; https://github.com/CrowdsourceKurdish/Kurdish-Numbers-to-Words.
- **What is supported:** The lesson’s core list 1–20 is broadly consistent with the referenced Standard Kurmanji lists: `yek, du, sê, çar, pênc, şeş, heft, heşt, neh, deh, yanzdeh, diwanzdeh, sêzdeh, çardeh, panzdeh, şanzdeh, hevdeh, hejdeh, nozdeh, bîst`. Sources document alternate spellings for some forms, particularly 11–16 and sometimes 2–3; variants should be recorded as source/dialect variants, not automatically labeled incorrect.
- **Recommendations for a later approved content pass:**
  1. State the selected standard spelling source at the start and make the table consistent with that source. Add a compact note for variants (e.g. `yanzdeh/yazdeh`, `diwanzdeh/dwanzdeh`, `panzdeh/panzdeh` in different transcriptions) rather than implying there is one universal spelling across all Kurmanji references.
  2. Teach number–noun behavior explicitly. In Kurmanji, the forms `du/didu` and `sê/sisê` can have shortened/alternate forms in noun phrases, and noun case/number depends on syntax; learners should not infer that numbers always take a bare noun or always trigger the same plural ending.
  3. The three sentence examples are useful but their case explanations need source-backed parsing. In particular, explain why `pirtûkan` and `pênûs` take their displayed forms in the specific constructions, and distinguish the oblique form of a noun from a general rule that every object of a present-tense verb is marked alike.
  4. Add an answer key and rubric for writing number words, and a progression from recognition (1–20) to dictation, quantities with nouns, and later compound numbers (21–99). Include audio or pronunciation guidance if a reliable recording is available.
  5. Add exact section/page locators to the bibliography; use Haig & Öpengin §2.4 as the academic reference and the teaching websites as corroborating resources.
- **Avasin spelling pass:** The static page for lesson 13 was checked against the current Avasin house-style spellings; no further text substitutions were required. The lesson’s Sorani prose in the seed was already aligned with the same preferred forms. Latin-script Kurmanji numerals and diacritics were preserved.
- **Scope / verification:** The static page was fetched and inspected; this pass did not change its content. The audit entry is the only file changed in this lesson-review step. No migration, production database, or `main` branch was touched. No new CI or browser-test success is claimed.
- **Curriculum quality criterion:** Teach number forms accurately, connect them to noun morphology and syntax, show standard/dialect variants transparently, and provide answerable exercises with feedback and traceable sources.

## Course 1 — Lesson 14 source and Avasin spelling audit

- **Seed/static source:** `docs/kurmanji-content-seed-part-02.sql`; `kurmanji-course-1-lesson-14.html`.
- **Lesson key/title:** `kurmanji-course-1-lesson-14.html` — ڕەنگ و ناوی شتە ڕۆژانەکان.
- **Sources checked:** Omniglot, “Colours in Kurdish (Kurmanji)”; Thackston, *Kurmanji Kurdish: A Reference Grammar with Selected Readings*; Goethe-Verlag, Kurmanji lesson “Renkler.” References: https://omniglot.com/language/colours/multilingual.htm ; https://sites.fas.harvard.edu/~iranian/Kurmanji/kurmanji_complete.pdf ; https://www.goethe-verlag.com/book2/TR/TRKU/TRKU016.HTM.
- **Supported vocabulary:** The principal forms `sor` (red), `şîn` (blue), `kesk` (green), `zer` (yellow), `reş` (black), `spî` (white), and `qehweyî` (brown) are attested in the checked resources. Keep Latin diacritics such as `ş`, `î`, and `ê` intact.
- **Issues / recommendations for a future content pass:**
  1. The current lesson teaches only seven colors. Add common useful items such as `mor` (purple), `pembe` (pink), `pirteqalî` (orange), and `gewr` (grey), but note that lexical choices and loanwords can vary by region/source.
  2. The line “colours behave as adjectives” is too general without illustrating Kurmanji word order and the ezafe construction. Show a simple predicative pattern (`Ev pirtûk sor e.`) separately from a noun phrase with an attributive adjective, and explain the distinction with a source-backed model.
  3. Recheck `Telefon li ser maseyê ye.` against the selected grammar/reference. The locative preposition `li ser` governs an oblique form; teach the noun form in context rather than treating `maseyê` as a general dictionary form. A more complete explanation should identify the base noun and the case/construct form.
  4. The sentence `Ez pirtûkê dixwînim.` uses a marked noun form in a present transitive clause. Add a concise note on the relevant oblique marking and avoid overgeneralizing it to every noun phrase.
  5. Add a small answer key, pronunciation/audio if available, and an exercise that requires learners to distinguish predicative adjective sentences from noun phrases with attributive adjectives. Record exact section/page locators for Thackston.
- **Avasin spelling pass:** The static page was checked against Avasin preferred Sorani spellings; any substitutions made were restricted to Sorani prose. Kurmanji Latin vocabulary and diacritics were preserved.
- **Verification and scope:** The audit entry is recorded in this document; static-page changes, if any, were fetched again for verification. No production database, migrations, or `main` branch was changed. No CI/browser test result is claimed.
- **Curriculum quality criterion:** Keep vocabulary source-traceable, demonstrate grammar through contrasting examples, explain case/ezafe only as far as the learner can apply it, and include exercises with answer keys.


## Course 1 — Lesson 15 source and Avasin spelling audit

- **Seed/static source:** `docs/kurmanji-content-seed-part-02.sql`; `kurmanji-course-1-lesson-15.html`.
- **Lesson key/title:** `kurmanji-course-1-lesson-15.html` — وشەکانی خێزان.
- **Sources listed in the lesson and used for follow-up verification:** Yari, Kurmanji–English dictionary (https://yari.krd/dictionary/); W. M. Thackston, *Kurmanji Kurdish: A Reference Grammar with Selected Readings* (https://sites.fas.harvard.edu/~iranian/Kurmanji/kurmanji_complete.pdf); University of Arizona Iranian Languages, Kurmanji resources (https://iranian-languages.arizona.edu/node/7).
- **Supported strengths:** The lesson introduces useful family vocabulary (`dayik`, `bav`, `kur`, `keç`, `bira`, `xwişk`, `jin`, `zarok`) and attempts to contextualize possessive phrases rather than presenting only isolated words. It appropriately warns learners that regional forms can vary and permits a fictional family for personal exercises.
- **Issues / recommendations for a future content pass:**
  1. Review `kal` as a translation for “grandfather”: it can mean an old/elderly man in relevant usage and should not be taught as a universally exact kinship term without a dictionary citation and contextual example. Compare with a clearly sourced term such as `bapîr` where appropriate.
  2. Explain that `malbat` is “family,” while individual kinship terms name specific relations; add a sourced, natural example for each core term.
  3. The forms `dayika min`, `bavê min`, `birayê min`, and `xwişka min` illustrate different noun/ezafe shapes. Explain the pattern with a concise, source-backed table rather than implying that one possessive template applies to every noun.
  4. Verify `Ev dayika min e.` against the selected standard and explain the intended reading (“This is my mother”) and the construction. Add contrasting examples and an answer key for exercises 1–3.
  5. The exercise “introduce your family” is privacy-aware; retain the fictional-family alternative. Add a short scoring rubric covering vocabulary, word order, and possessive/ezafe forms.
  6. Add exact page/section locators for the grammar reference and identify the chosen Kurmanji variety/standard; mark dialect variants instead of silently treating them as errors.
- **Avasin spelling pass:** The static lesson page was fetched and inspected. Sorani prose uses forms including `نوسین`, `ڕون`, and `فێربونی` consistent with the Avasin preferences checked here. Kurmanji Latin forms and diacritics (`ç`, `ş`, `î`, `ê`) were preserved; no static-page edit was required in this pass.
- **Verification and scope:** The lesson page and seed block were fetched and inspected; this review step changes only this audit document. No production database, migrations, or `main` branch was changed. No CI or full browser-test success is claimed.
- **Curriculum quality criterion:** Teach kinship vocabulary with traceable lexical sources, distinguish dictionary forms from inflected/ezafe forms, give natural contextual examples and answer keys, and protect learner privacy in personal prompts.


## Course 1 — Lesson 16 source and Avasin spelling audit

- **Seed/static source:** `docs/kurmanji-content-seed-part-02.sql`; `kurmanji-course-1-lesson-16.html`.
- **Lesson key/title:** `kurmanji-course-1-lesson-16.html` — ڕۆژەکانی هەفتە و کات.
- **Sources checked:** Thackston, *Kurmanji Kurdish: A Reference Grammar with Selected Readings*, section on substantives/days and telling time (https://sites.fas.harvard.edu/~iranian/Kurmanji/kurmanji_complete.pdf); Kurdi School, “Kurmanji grammar, explained simply” (https://kurdischool.com/grammar.html); Kurdish Academy, “Course 10: Dem û Roj” (https://kurdishacademy.ch/kurmancu00ee/dersen/courses/course-10.html); Kurmanji Kurdish, Lesson 4 (https://www.kurdipedia.org/files/books/2023/474430.PDF?ver=133232623527294231).
- **Supported strengths:** The day-name set `duşem`, `sêşem`, `çarşem`, `pêncşem`, `în`, `şemî`, and `yekşem` is attested in the checked resources. The lesson usefully groups days with common time words (`îro`, `sibê`, `doh`, `niha`, `paşê`, `hefte`, `meh`, `sal`) and provides simple sentence-level practice.
- **Issues / recommendations for a future content pass:**
  1. Make the spelling/lexical choices consistent with the selected Kurmanji reference. Sources differ between forms such as `doh` and `duh/duhî`, and `sibê` and `sibe`; present the chosen form as the course standard and note alternatives as source/dialect variants rather than treating them automatically as mistakes.
  2. Teach the oblique/construct forms in context: day names may take forms such as `roja sêşemê` and `roja şemiyê`; the bare dictionary form is not interchangeable with every phrase used for “on Tuesday/Saturday.” Add sourced examples and explain only the relevant pattern at this beginner level.
  3. Review `Îro duşem e.` for capitalization consistency and teach the reusable question/answer pair `Îro çi roj e?` — `Îro pêncşem e.` from a sourced model.
  4. Check the translations and tense/context of `Ez sibê têm.` (“I come/am coming tomorrow”), `Em îro dixwînin.`, and `Ez niha amade me.`; explain that a time adverb plus a present-form verb can express a scheduled or contextually future event, without presenting it as a general future-tense rule.
  5. Add an answer key and exercises that distinguish yesterday/today/tomorrow, days of the week, and week/month/year; include date phrases and a short speaking task. Add exact page/section locators for the grammar reference.
  6. The lesson lists `hefte`, `meh`, and `sal`; add natural phrases such as “every week/month/year” only after verifying their case/inflection in a reliable reference.
- **Avasin spelling pass:** The static page and seed block were fetched and inspected. The Sorani explanations were reviewed against Avasin preferences; the Kurmanji Latin spellings and diacritics (`ş`, `ê`, `î`, `ç`) were preserved. No static lesson or seed edit was made in this pass because the identified issues require source-backed pedagogical clarification rather than blind text substitutions.
- **Verification and scope:** The audit file was updated and fetched again; the new entry was confirmed present. The lesson page and seed source were inspected. No production database, migrations, or `main` branch was changed. No CI or full browser-test success is claimed.
- **Curriculum quality criterion:** Maintain one declared course spelling standard while documenting real variants, teach day/time expressions in complete natural phrases, distinguish lexical time words from tense marking, and include answer keys plus speaking practice.


### Lesson 16 — follow-up source check (day-name inflection and sentence models)

- **Reason for follow-up:** A second, more focused review of the same lesson checked the actual examples against reference material on day names and time expressions; this supplements, rather than replaces, the initial Lesson 16 audit above.
- **Primary evidence:** Kurdi School's Kurmanji grammar page explicitly models `Îro çi roj e?`, `Îro Pêncşem e`, `roja Şemiyê` (“on Saturday”), and `roja Sêşemê` (“on Tuesday”) (https://kurdischool.com/grammar.html). Thackston's reference grammar describes the feminine gender of day names and the change between nominative and oblique/construct forms, e.g. `şem` versus `roja şembê` (reference grammar copy indexed at https://agorism.dev/book/kurdish/kurmanji_1_grammar.pdf). Kurmanji lesson materials also list `şemî`, `yekşem`, `duşem`, `sêşem`, `çarşem`, `pêncşem`, and `în` (https://www.scribd.com/document/605784789/Kurmanji-Kurdish-Reader).
- **Specific disposition:** The current lesson's bare day-name list is a useful starting point, but it does not yet teach the inflected forms needed in phrases meaning “on [day].” The model `Îro duşem e.` is understandable as a beginner sentence; standardize capitalization consistently and add the question-and-answer pattern `Îro çi roj e?` / `Îro Pêncşem e.` after confirming the preferred course orthography. Teach `roja Sêşemê` and `roja Şemiyê` as phrase-level forms, not as replacements for dictionary headwords.
- **Verb/time note:** `Ez sibê têm.` can be interpreted in context as a future-arranged/expected arrival despite the present-form verb. Add a usage note and further examples only with a reliable source; do not teach this single example as a complete future-tense rule.
- **Avasin spelling and scope:** This follow-up remains documentation-only. It preserves all Kurmanji Latin forms and diacritics and does not alter the seed, static lesson, migrations, production database, or `main`. The audit file was fetched again after the update to verify this addendum.
- **Next action:** In a future content-edit pass, add the question-answer pair, one oblique day-name phrase, and a short answer key only after matching them to the chosen standard and keeping regional variants explicit.


## Course 1 — Lesson 17 scientific, orthographic, and static-page audit

- **Sources actually inspected:** The seed block for `kurmanji-course-1-lesson-17.html` in `docs/kurmanji-content-seed-part-03.sql`, the matching static wrapper `kurmanji-course-1-lesson-17.html`, and the lesson's listed grammar references. The seed identifies itself as draft lesson content and ends in `ROLLBACK`; it was not run against any database.
- **Grammar check:** The core rule that many Kurmanji present-simple forms use `di-` + present stem + person ending is supported by the University of Arizona's *Kurmanji Kurdish* grammar and Kurdi School's grammar guide (https://iranian-languages.arizona.edu/node/7 ; https://kurdischool.com/grammar.html). The lesson appropriately warns that this is not an exceptionless rule. Keep the irregular `hatin` forms and the special negative `nizanim` out of a blanket regular-conjugation table.
- **Examples reviewed:** `Ez dixwînim`, `Tu dixwînî`, `Ew dixwîne`, `Em dixwînin`, `Hûn dixwînin`, and plural `Ew dixwînin` match the standard pattern shown in the cited grammar references. `Ez diçim`, `Ez dikim`, `Ez dinivîsim`, and `Ez dixwim` are also recognizable present forms. `Ez pirtûkekê dixwînim` supports the basic subject–object–verb order; `Tu çi dinivîsî?` is a suitable beginner question. The wording should continue to distinguish a useful basic pattern from the full complexity of Kurmanji syntax.
- **Pedagogical gap:** The lesson asks learners to conjugate `xwendin` and check `çûn` and `kirin`, but provides no answer key. Add a compact key in a later content pass and label person forms clearly, especially the two readings of `ew` (singular “he/she” versus plural “they”). Do not invent a complete tense paradigm from the introductory examples alone.
- **Avasin orthography:** The Kurmanji Latin forms and diacritics were preserved. Sorani explanatory prose should continue to follow Avasin house spelling (including `نوسین`, `نموونە` → `نمونە`, `هەموو` → `هەمو`, where these occur in prose); never apply these substitutions inside Kurmanji Latin examples such as `nivîsîn` or `dinivîsim`.
- **Static wrapper fix:** Inspection found that `kurmanji-course-1-lesson-17.html` loaded `script.js?v=20261019-kurmanji-protected` twice. One duplicate script tag was removed to prevent running the page script twice. The content seed was not changed.
- **Verification and scope:** The seed and static page were fetched from `kurmanji-clean-release` before review. After the wrapper edit, both the changed page and this audit file were fetched again and the expected content was checked. No `main` branch, migration, or production database was changed. No CI or full browser-test success is claimed.


## Course 1 — Lesson 18 scientific, spelling, and static-page audit

- **Files inspected:** The actual lesson 18 seed entry in `docs/kurmanji-content-seed-part-03.sql`, the static wrapper `kurmanji-course-1-lesson-18.html`, and the linked research references. The seed file is labelled draft data and ends with `ROLLBACK`; it was read only and not executed.
- **Core present-tense negation:** The statement that `na-` generally replaces indicative `di-` is supported by Gündoğdu, “Negation in Kurmanji” (Oxford Academic, 2015, https://doi.org/10.1093/acprof:oso/9780190210434.003.0007) and Haig & Öpengin, “Overview of Northern Kurdish (Kurmanjî)” (2018, https://doi.org/10.1515/9783110421682-004). Both describe prefix blocking: negation prefixes do not normally co-occur with `di-` in the same present-indicative verbal form. The lesson correctly highlights `Ez nizanim.` as an irregular/special form; references also attest `nikarim` for “I cannot,” so the teaching note should avoid implying that `zanîn` is the only verb with a special `ni-` form.
- **Examples checked:** `Ez naxwînim`, `Ez naçim`, `Ez nanivîsim`, and `Ez nabêjim` illustrate the expected present-negation pattern. The imperative pair `Xwîne! / Nexwîne!` and `Bike! / Neke!` is consistent with the distinction between present indicative `na-` and negative imperative `ne-`. The source material documents dialect differences, including `me-` prohibitives in some western varieties; keep that as a clearly labelled dialect note, not as a free interchangeable spelling.
- **Non-verbal predicates:** The lesson is right to separate negative nominal/adjectival predicates from verbal negation. However, `Ez ne mamosteyek im.` and `Ew li vir nîne.` should be presented as reference-checked models for the chosen standard/dialect, because negative copula and spacing conventions vary across grammars and varieties. Do not infer the full copula paradigm from these two examples alone.
- **Exercises and learner support:** The tasks ask learners to transform affirmative sentences and explain the special `zanîn` form, but no answer key is supplied. Add a short key in a later content pass: e.g. `Ez naxwînim.`, `Ez naçim.`, `Ez nabêjim.`, and `Ez nizanim.`; explicitly mark that negative imperatives use a different pattern from ordinary present-tense negation.
- **Avasin spelling and Kurmanji preservation:** Keep Sorani prose aligned with house style, including `نوسین`, `نمونە`, `هەمو`, `پەیویست`, `ڕون`, `چیە`, and `نیە` where applicable. Do not normalize Latin-script Kurmanji tokens such as `nivîsim`, `naxwînim`, `nizanim`, `Nexwîne`, or `Neke`; their diacritics and morphology are lesson content.
- **Static-page fix:** The static wrapper contained two identical `script.js?v=20261019-kurmanji-protected` tags. One duplicate was removed so the script is loaded once.
- **Verification and scope:** The seed, page, and audit file were fetched from `kurmanji-clean-release`. After editing the wrapper and audit file, the changed page and audit file were fetched again; the duplicate script count and presence of the new audit section were verified. No change was made to `main`, migrations, or the production database. No CI or full browser-test success is claimed.


## Course 1 — Lesson 19 scientific, question-word, orthographic, and page audit

- **Files inspected:** The actual seed entry for `kurmanji-course-1-lesson-19.html` in `docs/kurmanji-content-seed-part-03.sql`, the matching static page wrapper, and the lesson's cited grammar references. The seed is marked draft data and was not executed.
- **Question-word inventory:** The lesson's `kî` (who), `çi` (what), `li ku` (where), `kengî` (when), `çima` (why), `çawa` (how), `çiqas` (how much/how far, depending on context), and `kîjan` (which) are attested Kurmanji question forms. The distinctions should remain explicit: `kî` asks about a person, while `kîjan` selects among alternatives; `çiqas` is context-sensitive and should not be taught as a universal replacement for every “how many/how much” construction. Sources: Thackston, *Kurmanji Kurdish: A Reference Grammar with Selected Readings* (https://sites.fas.harvard.edu/~iranian/Kurmanji/kurmanji_complete.pdf); Haig & Öpengin, *Overview of Northern Kurdish (Kurmanjî)* (https://doi.org/10.1515/9783110421682-004); and the University of Arizona Kurmanji description (https://iranian-languages.arizona.edu/node/7).
- **Sentence review:** `Kî ye?`, `Tu çi dixwazî?`, `Tu li ku yî?`, `Tu çima dereng hatî?`, `Tu çawa yî?`, `Ev çiqas e?`, `Kîjan pirtûk?`, `Tu li ku dijî?`, `Navê te çi ye?`, and `Tu çima kurdî hîn dibî?` are suitable introductory models. `Tu kengî têyî?` is not necessarily an error: reference materials document both `tu tê` and the expanded `tu têyî/têy(î)` forms for the irregular verb `hatin`. Preserve this as a documented variant rather than silently replacing it; if the course adopts one house standard, state that convention consistently. Reference: the present paradigm for `hatin` (https://www.scribd.com/document/605784789/Kurmanji-Kurdish-Reader; compare https://fr.wiktionary.org/wiki/Conjugaison:kurde/hatin).
- **Yes/no questions:** `Tu baş î?`, `Tu kurdî dizanî?`, and `Ew li malê ye?` work as basic question examples. The lesson correctly notes that punctuation alone is not the grammatical mechanism; spoken intonation and sentence structure matter. A future revision should add short answer models and an answer key to the current open-ended exercises.
- **Avasin spelling:** In Sorani explanation text, follow the house form `چیە`, not `چییە`; likewise keep `نیە` rather than `نییە`, and preserve `نوسین`, `نمونە`, `هەمو`, and `پەیویست` where relevant. These are Sorani editorial conventions only; do not alter Kurmanji forms such as `kî`, `çi`, `kengî`, `têyî`, or `dixwazî`.
- **Static-page fix:** The static wrapper contained two identical `script.js?v=20261019-kurmanji-protected` tags. One duplicate was removed to avoid loading the page script twice. The lesson seed content was left unchanged in this pass; its Sorani spelling should be normalized in a dedicated content pass so the source seed and any future rendering remain aligned.
- **Verification and scope:** The seed, static page, and audit file were fetched from `kurmanji-clean-release`. After the wrapper change and audit append, the page and audit file were fetched again; the duplicate script count and audit entry were verified. No change was made to `main`, migrations, or the production database. No CI or full browser-test success is claimed.


## Course 1 — Lesson 20 scientific, syntax, and static-page audit

- **Files inspected:** The real draft seed entry for `kurmanji-course-1-lesson-20.html` in `docs/kurmanji-content-seed-part-03.sql`, the corresponding static page, and the cited syntactic references. The draft seed was read only and not executed.
- **Core rule verified:** The lesson correctly introduces neutral Kurmanji clause order as Subject–Object–Verb (SOV), with the important qualification that order is not rigid. Haig & Öpengin describe pragmatically neutral clauses as SOVG and discuss fronting of direct objects for pragmatic purposes. Their overview also documents the ergative construction in past transitive clauses: the transitive subject is oblique, the direct object is direct, and the verb agrees with the direct object. Therefore the lesson's caution that past transitive clauses need separate treatment is essential and should be preserved. Source: Haig & Öpengin, “Kurmanji Kurdish in Turkey: Structure, varieties, and status,” syntax section (https://www.uni-bamberg.de/fileadmin/aspra/06_Team/Publications_and_CV/HaigOepengin2018_Kurmanji_Kurdish_.pdf); see also the overview at https://doi.org/10.1515/9783110421682-004.
- **Examples checked:** `Ez nan dixwim`, `Tu pirtûkê dixwînî`, and `Em kurdî hîn dibin` illustrate the basic SOV pattern; `Ew diçe` is a clear intransitive subject–verb example. The fronted-object example `Vê pirtûkê, ez dixwînim` is appropriately marked as pragmatic/topicalized rather than presented as neutral word order. Keep the explanatory warning that naturalness and interpretation depend on context and dialect.
- **Precision improvement for a future content pass:** Phrase the rule as “neutral clauses are commonly SOV (with additional goal/recipient positions depending on construction and dialect),” not as an exceptionless formula. Continue distinguishing basic order from case marking and verb agreement; do not use the present-tense examples to imply that past transitive alignment is identical.
- **Avasin orthography:** Preserve the Latin Kurmanji spelling and diacritics in `dixwim`, `pirtûkê`, `dixwînî`, `hîn dibin`, `radizê`, `diçe`, and `dimînin`. In Sorani explanation text, use the site's house forms where applicable (e.g. `نوسین`, `نمونە`, `هەمو`, `پەیویست`, `چیە`, `نیە`); do not apply those substitutions to Kurmanji tokens.
- **Static-page check:** The lesson 20 wrapper has one `script.js?v=20261019-kurmanji-protected` tag, so no duplicate-script edit was needed. No clear source-backed content error justified a direct wrapper edit in this pass; the seed text was left unchanged.
- **Verification and scope:** The seed, static page, and audit file were fetched from `kurmanji-clean-release`; the audit entry was appended and the updated audit and lesson page were fetched again. No changes were made to `main`, migrations, or the production database. No CI or full browser-test success is claimed.


## Course 1 — Lesson 21 scientific, ezafe, spelling, and seed audit

- **Files inspected:** The draft seed record for `kurmanji-course-1-lesson-21.html` in `docs/kurmanji-content-seed-part-03.sql`, its static HTML wrapper, and current reference material on the Kurmanji noun phrase and ezafe. The draft seed was not executed.
- **Core rule verified:** Kurmanji descriptive adjectives normally follow the noun and are linked by ezafe. The ezafe marker reflects features of the head noun, including gender, number, and definiteness, and can vary by dialect. Haig & Öpengin’s NP schema and examples support this; Songül Gündoğdu (2023) further details the Northern Kurmanji system. Sources: Haig & Öpengin, *Northern Kurdish (Kurmanjî): An Areal Perspective*, section 2.3 (https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf); Gündoğdu, “Ezafe in Northern Kurdish,” *Toronto Working Papers in Linguistics* 45(1) (2023), https://doi.org/10.33137/twpl.v45i1.41677.
- **Substantive correction made in the seed:** The original note attached to `bajarê mezin` incorrectly described it as containing the indefinite suffix `-ek`. The form `bajarê mezin` has masculine ezafe `-ê` and is interpreted according to context; the distinct indefinite example is `bajar-ek-î mezin` (“a big town”). The explanatory note was corrected so the forms are no longer conflated. This matches the published example `bajar-ek-î mezin` (town-indefinite-ezafe masculine big) in Haig & Öpengin.
- **Avasin spelling normalization:** In this lesson's seed record, Sorani prose was adjusted to the project forms where present: `چیە` instead of `چییە`, `نمونە` instead of `نموونە`, and `پەیویست` instead of `پێویست`. Kurmanji tokens and their diacritics were preserved.
- **Exercise and scope:** The lesson appropriately distinguishes adjective use inside a noun phrase from predicative description in a clause. It deliberately avoids inventing unsupported copular examples. A later learning-design pass can add a compact answer key and clarify that `bajarê mezin` can be translated differently depending on discourse context.
- **Static-page check:** The wrapper has one `script.js?v=20261019-kurmanji-protected` tag; no duplicate-script change was needed.
- **Verification and scope:** The seed change was committed; the updated seed record, lesson wrapper, and audit file were fetched again to verify the correction and audit entry. No changes were made to `main`, migrations, or the production database. No CI or full browser-test success is claimed.


## Course 1 — Lesson 22 scientific, adjective comparison, and static-page audit

- **Files inspected:** The draft seed record for `kurmanji-course-1-lesson-22.html` in `docs/kurmanji-content-seed-part-03.sql`, its static HTML wrapper, and grammar references on Kurmanji adjective comparison. The draft seed was read only and not executed.
- **Core rule verified:** The lesson correctly teaches comparative formation with `-tir`, the comparative standard introduced by `ji`, and two superlative strategies: `herî + adjective` and adjective + `-tirîn`. The latter is placed before the noun it modifies, unlike the ordinary postposed adjective in an ezafe phrase. Sources: Karacan & Khalid (2016), “Adjectives in Kurdish language: Comparison between dialects” (https://dergipark.org.tr/en/pub/ijoks/article/259420); Êzdîxan, “Grammar Tables — Adjective Comparison” (https://ezdixan.de/en/wiki/grammatik); and the Kurmanji lesson reference (https://www.kurdipedia.org/files/books/2023/474430.PDF?ver=133232623527294231).
- **Forms checked:** `baş → baştir`, `biçûk → biçûktir`, `dirêj → dirêjtir`, and `mezin → mezintir` are supported. `meztir` is also documented as a variant for “bigger,” so the lesson's cautious note is appropriate. Both `herî mezin` and `mezintirîn bajar` are supported superlative patterns. `Meyrem ji birayê xwe mezintir e` is an attested comparative model. Sources: https://www.kurdipedia.org/files/books/2023/474430.PDF?ver=133232623527294231 and https://ezdixan.de/en/wiki/grammatik.
- **Editorial precision:** Keep the distinction between the morphological superlative `-tirîn` and analytic `herî` clear, and do not state that every variety uses them identically. The seed already includes this dialect caution. The `kêmtir` and `zêdetir` rows are best taught as “less” and “more” comparative forms in context, not as universal direct antonym pairs for every adjective.
- **Avasin spelling and static wrapper:** No duplicate `script.js?v=20261019-kurmanji-protected` tag was found. Kurmanji Latin forms and diacritics were preserved; no seed correction was justified by the inspected sources in this pass.
- **Verification and scope:** The seed record, static page, and audit file were fetched from `kurmanji-clean-release`; the audit entry was appended and the changed audit and lesson page were fetched again. No changes were made to `main`, migrations, or the production database. No CI or full browser-test success is claimed.


## Course 1 — Lesson 23 scientific, noun definiteness, case, and demonstrative audit

- **Files inspected:** The actual draft seed record for `kurmanji-course-1-lesson-23.html` in `docs/kurmanji-content-seed-part-03.sql`, the static wrapper, and reference grammars describing Kurmanji nouns, case, and demonstratives. The draft seed was not executed.
- **Indefiniteness and case:** The distinction between `gund` / `gundek` and `jin` / `jinek` is suitable for an introduction to bare nouns versus the indefinite marker `-ek`. In oblique contexts, the indefinite marker combines with case endings: masculine `gundekî` and feminine `jinekê` are standard examples. Source: Thackston, *Kurmanji Kurdish: A Reference Grammar with Selected Readings*, “The Indefinite State” and “Oblique Case” (https://agorism.dev/book/kurdish/kurmanji_1_grammar.pdf); see also Haig & Öpengin, “Northern Kurdish (Kurmanjî): An Areal Perspective” (https://www.researchgate.net/publication/329393116_23_Northern_Kurdish_Kurmanji_An_Areal_Perspective).
- **Definiteness wording corrected:** The original Sorani explanation named the Sorani definite suffixes as `-aka/-akan` and used an inaccurate Sorani term for suffix. It was corrected to “پاشگری دیاریکراوی ... `-eke/-ekan`” and now says that Kurmanji does not use the same definite suffix pattern as Sorani. The broader point is correct: Kurmanji definiteness is largely contextual/discourse-based, while `-ek` marks indefiniteness.
- **Demonstratives:** The lesson's direct forms `ev` (“this/these”) and `ew` (“that/those”) are appropriate for the introductory contrast. The oblique paradigm must be taught separately: proximate `vî` (masculine), `vê` (feminine), `van` (plural); distal `wî`, `wê`, `wan`. The seed already warns that forms change in oblique contexts; future extension should add full example sentences to prevent learners from treating `ev/ew` as invariant in every syntactic position. Source: University of Arizona, “Kurmanji Kurdish” (https://iranian-languages.arizona.edu/node/7); Haig & Öpengin (https://www.researchgate.net/publication/329393116_23_Northern_Kurdish_Kurmanji_An_Areal_Perspective).
- **Avasin spelling:** Sorani explanatory prose in this seed entry was normalized to the project conventions where relevant: `چیە`, `نمونە`, `پەیویست`, `هەمو`, `ڕون`, and `نێوەڕۆک`. Kurmanji forms and diacritics were preserved.
- **Static-page check:** The wrapper has a single `script.js?v=20261019-kurmanji-protected` tag; no duplicate script was found.
- **Verification and scope:** The seed entry was corrected, then the seed file, lesson wrapper, and audit file were fetched again to verify the updated text and audit entry. No changes were made to `main`, migrations, or the production database. No CI or full browser-test success is claimed.


## Course 1 — Lesson 24 scientific audit: possession, oblique pronouns, and ezafe

- **Files inspected:** The draft seed record for `kurmanji-course-1-lesson-24.html` in `docs/kurmanji-content-seed-part-03.sql`, its static HTML wrapper, and grammar references for Kurmanji pronouns and noun phrases. The draft seed was read only and was not executed.
- **Possessive forms:** The lesson's core contrast is sound: `min, te, wî, wê, me, we, wan` are oblique pronoun forms and are used as possessors in ezafe noun phrases; they must not be presented as a separate set of English-style possessive adjectives detached from Kurmanji case. The correspondence table with `ez/tu/ew/em/hûn` is a useful beginner scaffold, provided it is understood as a correspondence of forms rather than a claim that every pronoun has the same syntactic role in every construction. Sources: University of Arizona, “Kurmanji Kurdish” (https://iranian-languages.arizona.edu/node/7); Haig & Öpengin, “Northern Kurdish (Kurmanjî)” (https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf).
- **Ezafe and agreement:** The lesson correctly warns that ezafe morphology depends on the head noun's gender/number and that the phrase's external case and internal ezafe structure should not be collapsed into one rule. The examples `birayê min ê mezin`, `yê spî`, `ya te`, and `yên mezin` illustrate a possessive noun phrase and free ezafe forms; their exact translation depends on context. In particular, free `yê/ya/yên` can nominalize or stand for a noun phrase (“the one(s) …”), so they should not be taught as automatically meaning possession in every context. Sources: Haig & Öpengin (https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf); Thackston, *Kurmanji Kurdish: A Reference Grammar with Selected Readings* (https://sites.fas.harvard.edu/~iranian/Kurmanji/kurmanji_complete.pdf).
- **Reflexive caveat:** A useful next-step note for a later lesson is the reflexive possessor `xwe`: where the possessor is coreferential with the same-clause subject, standard Kurmanji normally requires `xwe` rather than a regular oblique pronoun (e.g. `Ez li mala xwe me`). This omission does not invalidate the current lesson's stated introductory scope, but should be covered in the course sequence. Source: Haig & Öpengin (https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf).
- **Static wrapper and editorial scope:** The static page contains one `script.js?v=20261019-kurmanji-protected` tag. The reviewed seed's key forms and cautionary notes are broadly consistent with the references; no unambiguous factual error requiring a seed edit was established in this pass. Kurmanji Latin forms and diacritics were preserved.
- **Verification and safety:** The seed, static page, and audit file were fetched from `kurmanji-clean-release`. This audit entry was appended and the audit file was fetched again to verify it. No changes were made to `main`, migrations, or the production database. No CI or full browser-test success is claimed.


## Course 1 — Lesson 25 scientific audit: direct/oblique case and split alignment

- **Files inspected:** The actual draft seed record for `kurmanji-course-1-lesson-25.html` in `docs/kurmanji-content-seed-part-04.sql`, its static wrapper, and reference grammars for Standard Kurmanjî case and alignment. The draft seed was read only and not executed.
- **Case paradigm checked:** The table's standard contrasts are supported: masculine singular `gund / gundî`, indefinite `gundek / gundekî`; feminine singular `jin / jinê`, indefinite `jinek / jinekê`. The note that some masculine singular nouns (including `mirov` in some uses) may lack overt oblique marking is appropriately cautious. Source: Haig & Öpengin, “Northern Kurdish (Kurmanjî): An Areal Perspective,” Table 7 and accompanying discussion (https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf).
- **Direct vs. oblique is not simply nominative vs. accusative:** The lesson correctly cautions against equating these labels with familiar case labels in other languages. In present transitive clauses, the subject is generally direct and the object oblique; in past transitive clauses, the agent is generally oblique and the object direct. The lesson's examples `Ez wî mirovî dibînim` and `Min ew dît` are consistent with this basic contrast, while dialect variation should remain acknowledged. Sources: Haig & Öpengin (2018), “Overview of Northern Kurdish (Kurmanjî)” (https://doi.org/10.1515/9783110421682-004); Haig & Öpengin, “250 Geoffrey Haig and Ergin Öpengin” (https://www.uni-bamberg.de/fileadmin/aspra/06_Team/Publications_and_CV/haig_opengin_2015_gender_kurdish_offprint.pdf).
- **Verb agreement caveat:** The seed accurately says that in canonical past transitive ergative constructions the verb agrees with the direct-case object rather than the oblique agent. This is a key contrast with present transitive clauses and should not be generalized to every dialect without qualification. Source: Haig & Öpengin (2018), section 2.7.2 (https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf).
- **Avasin Sorani spelling:** In this lesson's seed entry, `چییە` was normalized to `چیە`, `نموونە` to `نمونە`, and `ڕوون` to `ڕون` (two occurrences). Kurmanji Latin forms and diacritics were preserved.
- **Static wrapper:** The lesson page contains one `script.js?v=20261019-kurmanji-protected` tag; no duplicate script was found.
- **Verification and scope:** The seed record was edited only for project spelling, then the seed, wrapper, and audit were fetched again to verify the change and audit entry. No changes were made to `main`, migrations, or the production database. No CI or full browser-test success is claimed.


## Course 1 — Lesson 26 final review audit: orthography, core grammar, and self-assessment

- **Files inspected:** The actual draft seed record for `kurmanji-course-1-lesson-26.html` in `docs/kurmanji-content-seed-part-04.sql`, the static wrapper, and reference material for Kurmanji orthography and grammar. The draft seed was read only and not executed.
- **Alphabet contrasts:** The lesson's focus on `c/ç`, `s/ş`, `i/î`, and `u/û` is correct and pedagogically useful. The University of Arizona's Kurmanji reference gives `çak` (“good”), `şaş` (“wrong”), `îro` (“today”), and `roj` (“day”) and notes that `rr` may be used to distinguish a trill from the flap written `r` when that phonetic distinction is represented. Therefore the `roj` note is a qualified phonetic/orthographic note, not a claim that `rr` is one of the 31 standard Hawar letters. Source: University of Arizona, “Kurmanji Kurdish,” Orthography and letter table (https://iranian-languages.arizona.edu/node/7).
- **Review sentences:** `Ez nan dixwim` (I eat bread), `Tu çawa yî?` (How are you?), `Ez naxwînim` (I do not read/study), `Ez wî mirovî dibînim` (I see that man), and `Min ew dît` (I saw him/it) are consistent with the course's introductory grammar. The present-transitive versus past-transitive contrast is appropriately linked back to lessons on direct/oblique case and ergative alignment; translations of `ew` may depend on context.
- **Self-assessment scope:** The self-assessment table correctly describes itself as reflective rather than an official grade or proof of proficiency. The quiz revisits material from earlier lessons and is appropriate as a course review, though it should not be presented as a standardized proficiency test.
- **Avasin Sorani spelling:** In this lesson's seed entry, `نموونە` was normalized to `نمونە` (three occurrences), `پێویست` to `پەیویست` (six occurrences), `هەموو` to `هەمو` (one occurrence), and `ڕوون` to `ڕون` (two occurrences). Kurmanji Latin forms and diacritics were preserved.
- **Static wrapper:** The lesson page contains one `script.js?v=20261019-kurmanji-protected` tag; no duplicate script was found.
- **Verification and scope:** The seed record was changed only for project spelling, then the seed, wrapper, and audit were fetched again to verify the spelling changes and audit entry. No changes were made to `main`, migrations, or the production database. No CI or full browser-test success is claimed.


## Course 2 — Lesson 12 static citation and wrapper audit

- **Files inspected:** The lesson 12 record in `docs/kurmanji-content-seed-part-05.sql`, its static HTML wrapper, and the existing course 2 synthesis. The seed SQL was read only and not executed.
- **Citation cleanup:** The Haig & Öpengin (2018) reference repeated the exact same DOI link twice in a row. Removed the duplicate anchor from the lesson 12 seed record, leaving one working DOI link to the chapter “Northern Kurdish (Kurmanjî)” (https://doi.org/10.1515/9783110421682-004). This was a presentation cleanup; no claim was made that the source itself changed.
- **Content scope:** The review appropriately revisits morphemes, roots and affixes, noun structure, ezafe, possession, pronoun case, verb tense/aspect categories, negation, questions, and word order. Its own methodological note correctly says new example sentences should be checked against a reliable grammar and context, rather than treating every rule as exceptionless.
- **Static wrapper:** The lesson page has one `script.js?v=20261019-kurmanji-protected` tag at the end of the document; no duplicate script tag was found. Two navigation links point to the course overview with different labels; left unchanged because this is redundant navigation rather than a correctness defect.
- **Verification and scope:** The edited seed and audit were fetched again to verify the single DOI link and this entry. No changes were made to `main`, migrations, or the production database. No CI or full browser-test success is claimed.


## Cross-page navigation audit — Kurmanji course indexes and lesson catalog

- **Scope:** Inspected `kurmanji-course-1.html`, `kurmanji-course-2.html`, and `lessons/catalog.html` on `kurmanji-clean-release`; compared their local HTML references with the repository's current file tree (144 HTML files). This was a static repository check, not a live HTTP crawl.
- **Catalog links:** Every local HTML `href` and `src` reference extracted from `lessons/catalog.html` resolved to a path present in the branch tree; zero missing local targets were found. The catalog's legacy course 2 links (`lessons/course-2-01.html` through `course-2-32.html`) all exist in the repository, as do the current course index and lesson links.
- **Course indexes:** Course 1 lists lessons 01–26 and course 2 lists lessons 01–12; their linked lesson pages and navigation targets exist. Each course index has one `script.js?v=20261017-kurmanji-path` include. The reviewed lesson wrappers use one `script.js?v=20261019-kurmanji-protected` include; these version labels differ but are not by themselves proof of a broken link, so they were left unchanged.
- **Decision:** No code change was warranted by this pass. Do not treat this as proof that every remote URL, browser interaction, or runtime data-loading path works; those require separate live/runtime checks.
- **Safety scope:** Only the audit document was updated. No changes were made to `main`, migrations, or the production database. No CI or full browser-test success is claimed.


## Detailed static-wrapper and seed consistency audit — Kurmanji courses 1–2

- **Scope inspected:** All 38 lesson wrapper files (`kurmanji-course-1-lesson-01.html`–`lesson-26.html` and `kurmanji-course-2-lesson-01.html`–`lesson-12.html`), plus seed parts 04 and 05. This was a branch-file inspection, not a live browser crawl.
- **Lesson identity:** Each wrapper's `data-lesson-key` matches its own filename and corresponding seed key. Course 1 has 26 records/pages and course 2 has 12 records/pages in the inspected range.
- **Navigation and boundaries:** Sequential lesson links were checked for the reviewed wrappers. Course 1 lesson 01 correctly has no previous-lesson link and links forward to 02; lesson 26 links back to 25 and returns to the course index. Course 2 lesson 01 links forward to 02 and back to its course index; lesson 12 links back to 11 and returns to the course index. Intermediate lesson pages link to adjacent lesson numbers; linked target files exist in the branch tree.
- **Script loading:** Each of the 38 lesson wrappers has exactly one `script.js?v=20261019-kurmanji-protected` include. The two course-index pages each have one script include, with their own cache-busting query version.
- **Safe spelling normalization:** Applied the project's established Avasin Sorani spellings to the two seed files without changing Kurmanji Latin examples or lesson structure. In seed part 04: `نووسینی → نوسینی` (2), `نووسین → نوسین` (1), `هەموو → هەمو` (5), `نموونە → نمونە` (17), `پێویست → پەیویست` (9), `ڕوون → ڕون` (1), `چییە → چیە` (5), `نییە → نیە` (10). In seed part 05: `هەموو → هەمو` (3), `نموونە → نمونە` (9), `پێویست → پەیویست` (3), `چییە → چیە` (3), `نییە → نیە` (5). A follow-up scan found none of these old forms in either seed file.
- **Remaining style observation:** Course 1 wrapper titles use Kurdish numerals while course 2 HTML `<title>` strings use Western digits (1–12). The visible hero text already identifies the right course and lesson; this is a consistency issue, not a broken lesson identity or navigation defect, so no broad title rewrite was made in this pass.
- **Verification and scope:** Re-fetched both seed files after editing and confirmed the old forms listed above are absent. The seed SQL was not executed. No changes were made to `main`, migrations, or the production database. No CI or full browser-test success is claimed.


## Follow-up wrapper-source orthography pass — 38 Kurmanji lessons

- Re-scanned all 38 lesson wrappers after the seed cleanup. In wrapper HTML source, applied only the established Avasin spelling substitutions where they occurred: `ناوەڕۆک → نێوەڕۆک` across all 38 wrappers; `نووسین → نوسین` in course 1 lessons 01, 04, 05, 06, and 08; `فێربوون → فێربون` in lessons 18 and 19; `هەموو → هەمو` in course 1 lesson 08 and course 2 lessons 01–12 (only where present); `پێویست → پەیویست` in course 2 lessons 02 and 08; and `نییە → نیە` in course 2 lessons 08 and 11.
- Re-fetched all 38 wrapper files after edits. The scan found none of the tracked legacy forms `نموونە`, `پێویست`, `هەموو`, `ڕوون`, `ناوەڕۆک`, `چییە`, `نییە`, `نووسین`, `فێربوون`, or `دەستپێکردن` in the wrapper HTML source.
- For all 38 wrappers, `data-lesson-key` still matches the filename and each has exactly one `script.js?v=20261019-kurmanji-protected` include. Their lesson navigation links still point to the adjacent lesson(s) expected from the sequence; first and last lessons link to the relevant course index rather than an out-of-range lesson.
- These were limited source-text replacements; Kurmanji Latin examples, lesson keys, titles, and navigation structure were not rewritten. Seed SQL remains unexecuted. No changes to `main`, migrations, or production database; no full browser or CI test is claimed.


## Seed-to-wrapper identity and Avasin spelling parity — 38 Kurmanji lessons

- Compared the SQL seed row keys and lesson titles against the matching static wrapper `data-lesson-key` and hero `<h1>` across course 1 lessons 01–26 and course 2 lessons 01–12. All 38 keys map to the expected wrapper, and all 38 seed titles match their wrapper hero titles after the Avasin spelling pass.
- The comparison exposed legacy Sorani spellings in seed parts 01 and 03 (part 02 already had none of the tracked forms). Applied only the established Avasin text substitutions to those seed HTML strings; no Kurmanji Latin forms, lesson topics, examples, row keys, or SQL execution behavior were changed. Seed part 01 commit: `c7fbc0d`; seed part 03 commit: `d330020`.
- Re-fetched seed parts 01–03 after the edits. The tracked legacy forms `نووسراوە`, `نووسینی`, `نووسین`, `فێربوون`, `هەموو`, `نموونە`, `پێویست`, `ڕوون`, `ناوەڕۆک`, `چییە`, `نییە`, and `دەستپێکردن` are absent from all three files.
- **Limit of this pass:** the wrappers intentionally load lesson-card HTML by key; this check establishes wrapper/seed identity and title parity, not a live Supabase render or a complete byte-for-byte/semantic audit of all lesson bodies. Seed SQL was not executed. No changes to `main`, migrations, or production DB; no browser/CI pass is claimed.


## Duplicate DOI-link cleanup — Course 2 seed lessons 01–11

- A targeted reference-link scan found the same DOI anchor repeated twice in the Haig & Öpengin (2018) reference in course 2 seed lessons 01–11 (11 rows across seed parts 04 and 05). Lesson 12 had already been cleaned in an earlier audit.
- Removed only the second identical DOI anchor and its separator in those 11 seed records; the bibliographic citation and single working DOI link remain. Commits: seed part 04 `80fe36a`; seed part 05 `8e8a9b9`.
- Re-fetched both seed files. Each of the 12 course 2 seed records now contains exactly one occurrence of that DOI URL, and the repeated-anchor pattern is absent. No lesson text, linguistic examples, row keys, or reference metadata was changed.
- Seed SQL remains unexecuted. No changes to `main`, migrations, or production DB; no browser/CI pass is claimed.


## Seed lesson HTML hygiene scan — 38 Kurmanji lesson records

- Re-scanned all five Kurmanji seed SQL parts (course 1 lessons 01–26; course 2 lessons 01–12) for obvious HTML/link hygiene defects within lesson records: duplicate identical `href` values, empty anchor elements, `img` elements without an `alt` attribute, empty/hash-only links, JavaScript pseudo-URLs, and common placeholder markers (TODO/FIXME/PLACEHOLDER/example.com).
- The scan reported no such findings in the 38 lesson records. No source files were changed in this pass; therefore there is no lesson-content or spelling edit to report.
- **Scope:** this is a static pattern scan, not a browser-rendering, accessibility conformance, external-link availability, or full HTML parser validation. Seed SQL was not executed. No changes to `main`, migrations, or production DB; no browser/CI pass is claimed.


## Final Avasin spelling sweep — seed prose

- A final targeted sweep of the five seed SQL parts found two instances of the Sorani prose spelling `بەرامبەر` (course 1 lesson 17 and course 2 lesson 10). Replaced those instances with the project's preferred Avasin spelling `بەرابەر`; the occurrences were in Sorani explanatory prose, not Kurmanji Latin examples or technical source notation.
- Re-fetched seed parts 03 and 05 and confirmed the old spelling is absent and the preferred form is present. Commits: part 03 `a4ea49f`; part 05 `a852986`.
- This is an orthographic-only adjustment; no linguistic rule, example, lesson key, or SQL behavior was changed. Seed SQL remains unexecuted; no changes to `main`, migrations, or production DB; no browser/CI pass is claimed.


## Lesson-card structure sweep — 38 Kurmanji seed records

- Parsed the 38 seed-row HTML fragments (course 1 lessons 01–26; course 2 lessons 01–12) with a row-boundary-aware static scan. Every record contains 4–7 `klesson-card` sections and 4–7 `h2` headings; each has a source/reference section. No record showed an empty paragraph, empty list item, or a heading/card count below the scan's minimum threshold.
- No source files changed in this pass; the scan found no clear structural defect warranting an edit.
- **Scope:** counts and simple empty-element patterns only; this is not full HTML validation, pedagogical review, or proof that every claim is supported by a source. Seed SQL remains unexecuted; no changes to `main`, migrations, or production DB; no browser/CI pass is claimed.


## Seed lesson-link destination sweep — 38 Kurmanji records
- Re-scanned all five draft seed SQL files (38 lesson HTML fragments) and extracted unique `href` values.
- Found 19 distinct href destinations; all are absolute external HTTP(S) URLs. No relative/local lesson-content hrefs were present, so there were no repository-local destination paths to resolve and no broken local hrefs to repair in this scope.
- No source files changed. This is a static href inventory only: it does not establish that external sites are currently reachable, safe, or that linked resources support every nearby claim. Seed files were not executed; no migrations, production DB, or `main` changes.


## External link attribute check — 38 Kurmanji seed records
- Inspected 100 anchor opening tags in the five draft seed SQL files.
- All links configured to open a separate browsing context included `noopener` in their `rel` attribute. No clear attribute-level issue was found; lesson sources remain unchanged.
- Static check only; external destination trust and availability were not tested. Seed SQL remains unexecuted; no production or main-branch changes.


## Seed HTML element nesting check — 2026-10-22
- Parsed the 38 HTML fragment string literals across all five draft seed parts and checked opening/closing element nesting with a stack-based tag scan; HTML void elements were excluded from the closing-tag requirement.
- Result: all 38 fragments passed; no mismatched closing tags or unclosed non-void elements were detected.
- Scope limitation: this is a static tag-balance check, not a full browser HTML5 conformance, rendering, accessibility, or runtime test. Seed SQL remains draft documentation and was not executed.


## Lesson-fragment IDs and embedded-control inventory — 2026-10-22
- Inspected the 38 HTML content fragments in all five draft seed parts for explicit `id` attributes and embedded form/control/media elements (`form`, `label`, `button`, `input`, `select`, `textarea`, `table`, `img`, `iframe`, `audio`, `video`, `details`, `summary`).
- Result: no explicit IDs and none of the listed embedded controls or media elements were present; therefore no duplicate/empty IDs or control-label pairing defects were identified in these fragments.
- Scope limitation: this inventory does not evaluate accessibility of the outer lesson page, CSS visibility, keyboard behavior, or the site navigation. Seed SQL was not executed.


## Seed-fragment URL attribute syntax sweep — 2026-10-22
- Scanned `href` and `src` attribute values in all 38 HTML lesson fragments across the five draft seed parts.
- Result: no empty URL attributes, relative/local references, non-HTTP(S)/mailto schemes, or whitespace-containing HTTP(S) URL values were found.
- Scope limitation: this checks URL attribute syntax/patterns only; it does not test whether external destinations resolve, are trustworthy, or remain available. Seed SQL was not executed.


## Runtime Avasin-normalizer collision scan against Kurmanji lesson seeds — 2026-10-22
- Compared the active Avasin text-normalization spellings in `script.js` against all 38 HTML fragments in the five draft Kurmanji seed parts, including occurrences inside `<code>`/`<pre>` blocks.
- Result: none of the scanned fragments contain the listed legacy Sorani spellings targeted by the normalizer; no potential lesson-example collision was identified in this seed corpus.
- Scope limitation: this is a static check of these 38 seed fragments only, not all site pages or dynamic text from external services. No lesson or runtime code was changed; seed SQL was not executed.


## Protected lesson-wrapper navigation and runtime include recheck — 2026-10-22
- Re-fetched and checked all 38 Kurmanji lesson wrapper HTML files (Course 1: 26; Course 2: 12) on `kurmanji-clean-release`.
- Each wrapper's `data-lesson-key` equals its filename; each includes exactly one `script.js?v=20261019-kurmanji-protected` reference; expected within-course previous/next lesson destinations are present, with no previous link on lesson 1 and no next link on each course's final lesson.
- Result: 38/38 passed these static wrapper checks; no correction was needed.
- Scope limitation: verifies source markup and link targets only; it does not exercise browser navigation, auth/enrollment gates, or lesson completion. No production, migration, or seed changes were made.


## Runtime lesson HTML insertion review — 2026-10-22
- Read the protected lesson loader in `script.js`: it retrieves `lesson_content.content_html` for the wrapper's `data-lesson-key` and assigns the returned string to `.lesson-content.innerHTML`; this excerpt contains no client-side HTML sanitizer.
- This is a security-hardening observation, not a confirmed vulnerability: the reviewed code alone does not establish whether database writes are restricted to trusted/authorized authors or whether server-side validation exists. The current Kurmanji seed corpus is curated, but the runtime also reads database content.
- Recommendation for a separately authorized security review: verify the effective `lesson_content` INSERT/UPDATE policies and trusted content-authoring path; if untrusted authors can supply HTML, sanitize with a maintained allowlist before rendering. No code or database policy was changed in this audit.
- Scope: static inspection of the checked-in runtime source only; no browser exploit test, live RLS inspection, migration execution, seed execution, production DB change, or `main` change.


## Kurmanji course-index and catalog entry-point check — 2026-10-22
- Parsed lesson destinations in the two Kurmanji course overview pages: Course 1 lists exactly 26 unique lesson links (01–26), and Course 2 lists exactly 12 unique lesson links (01–12); no expected destination was missing and no unexpected lesson link appeared.
- The lessons catalog contains links to both Kurmanji course overview pages (`../kurmanji-course-1.html`, `../kurmanji-course-2.html`).
- Result: the static index-to-wrapper and catalog-to-course entry links are internally consistent. No source correction was needed.
- Scope: static href extraction on `kurmanji-clean-release`; does not test browser navigation, auth/enrollment, or runtime rendering. No `main`, migration, seed execution, or production DB changes.


## Catalog lesson-count and logical-page grouping audit — 2026-10-22
- Compared the catalog's displayed totals (96 lessons overall; 58 Kurdish and 38 Kurmanji) with the current lessons/index.json and the previously verified Kurmanji lesson inventories.
- The index contains 74 physical HTML lesson pages: 42 pages assigned to course-current collapse into 26 logical lessons (multi-page units include logical lessons 22, 23, and 25); course-2 contains 32 physical pages and 32 logical lessons. Adding the two Kurmanji pathways (26 + 12) yields 96 logical lessons, with Kurdish totaling 26 + 32 = 58 and Kurmanji totaling 26 + 12 = 38. The advertised catalog totals therefore reconcile when multi-page units are counted as single lessons.
- No source change was warranted. This is a static JSON/count comparison; it does not test rendered catalog behavior or progress reconciliation in a browser. No main, migration, seed execution, or production database changes.


## Lesson-index pagePath integrity audit — 2026-10-22
- Compared every lesson pagePath in lessons/index.json against the files present in the lessons directory on kurmanji-clean-release.
- All 74 index entries point to an existing file; no duplicate lesson IDs or duplicate pagePath values were found. The directory listing contains 80 HTML files, including non-indexed support/legacy pages, so this check validates the 74 catalog data references rather than asserting that every HTML file is a catalog lesson.
- No source edit was needed. Static repository check only; no browser navigation/runtime test, and no main, migration, seed execution, or production database change.


## Catalog logical-lesson progression and completion-key reconciliation — 2026-10-22
- Compared `lessons/index.json` logical grouping against the inline catalog renderer in `lessons/catalog.html`. The index contains 58 logical lesson IDs across the two Kurdish phonetics/writing courses (26 course-current + 32 course-2); repeated `courseLessonNumber` values in course-current correctly represent multi-page lessons, not duplicate logical units.
- Verified the catalog's `c1Ends` server-progress mapping has all 26 logical course-current numbers and each mapped final HTML page agrees with the last page listed for that logical lesson in the index. The course-2 progress resolver matches the `course-2-NN.html` naming pattern, and both lesson course IDs have corresponding course metadata (course-2 is also defensively supplied by the renderer).
- Result: no mismatch or safe source correction identified. The check is static; it does not query Supabase progress, test auth/owner behavior, or run the catalog in a browser. No seed SQL or migrations were executed; no production DB or `main` changes.


## Catalog controls and heading semantics — 2026-10-22
- Static markup review of `lessons/catalog.html`: the course selector, section selector, and lesson search input each expose an explicit `aria-label`; the language/region choices are native buttons with `type=button` and selected-state `aria-pressed`; the back control is also a native button.
- No duplicate HTML `id` values were found in the source, and the document has one authored `h1`. The lesson cards and course groups use headings generated by the catalog script; this review did not evaluate their runtime accessibility tree or screen-reader output.
- Result: no definite accessibility markup defect identified for a safe source-only correction. Static review only; no browser/keyboard/screen-reader test. No production DB, migration, seed, or `main` change.


## Catalog filter/search data contract and dynamic text safety — 2026-10-22
- Compared the inline catalog logic in `lessons/catalog.html` with `lessons/index.json`: the index has 74 page records which the renderer intentionally groups into 58 logical lessons (26 course-current + 32 course-2); the dynamically populated course selector uses the two course IDs actually present in the index.
- The section selector is built from the logical lessons' section IDs (section-07, section-10, course-2-section), and the filter predicates use the same `courseId` / `sectionId` fields. Search covers lesson title, page number, logical course-lesson number, and section title. Dynamic lesson/course title and section text inserted into HTML is passed through `escapeHtml`.
- The data-load catch provides a visible Kurdish fallback message; this static check does not prove the fallback works in all browser/network conditions. No definite filter-contract or dynamic-text injection defect was found, so no source correction was made.
- Static source/data comparison only; no browser interaction, accessibility runtime test, Supabase query, or network-failure simulation. No `main`, migration, seed execution, or production database change.


## Catalog account-scoped progress vs local quiz badges — 2026-10-22
- Reviewed `syncCatalogProgressFromServer()` in `lessons/catalog.html`: server completion is reconciled from `lesson_progress` and the account's completion cache is cleared on signed-out/error paths. However, card quiz-pass indicators and the overall quiz-pass count are read directly from unscoped `localStorage` keys `lesson-quiz:<lesson-id>`; these keys are not cleared or scoped by user during the reconciliation shown here.
- This creates a potential cross-account/stale-device quiz badge: a passed flag saved by one learner can appear for another learner using the same browser profile. Static code evidence only; actual account switching and quiz storage semantics were not runtime-tested.
- No source change was made because removing those local flags could also erase intentionally device-local/offline quiz history; safe behavior needs a product decision (e.g., server-authoritative quiz status or per-user namespaced keys). No main, migration, seed execution, or production DB change.


## Avasin normalizer boundaries for literal/code content — 2026-10-22
- Reviewed the live text-node normalizer and its mutation observer in `script.js`. It skips text whose immediate parent is `SCRIPT`, `STYLE`, `NOSCRIPT`, or `TEXTAREA`, but it does not explicitly exempt `CODE` or `PRE`; therefore the configured Sorani spelling substitutions can also apply inside literal/code examples if a matching legacy form appears there.
- The earlier static scan of the 38 Kurmanji seed lesson fragments found no tracked legacy Sorani forms in their content, so this review did not establish a current example being altered and does not justify a blanket code change.
- Recommendation: before changing normalizer behavior, inventory code/preformatted examples across the full site and distinguish literal quoted text from ordinary prose. If evidence of altered examples is found, add a narrowly scoped exclusion or explicit opt-out and test it against intended site-wide normalization.
- Scope: static inspection of the protected branch's `script.js` and prior seed-fragment scan only; no browser mutation test or exhaustive whole-site rendered-text scan. No source code changed; no `main`, migration, seed execution, or production database changes.


## Lesson-progress localStorage failure-path review — 2026-10-22
- Reviewed the shared progress-sync helper and the Kurmanji completion-gate storage helpers in `script.js`. Read operations in several lesson-gate helpers catch malformed/unavailable storage and fall back to an empty set, but their paired `save()` functions call `localStorage.setItem()` without a local guard. The shared progress-sync error path also attempts `setItem(storage, "[]")` from inside its `catch`, which can itself throw if storage access is blocked.
- This is a resilience risk in privacy-restricted or storage-disabled browser contexts: progress UI initialization/completion may fail noisily even though the database RPC path is separate. It is not evidence of a data-integrity defect for ordinary browser storage.
- No source change was made in this audit because safely supporting unavailable storage requires defining whether the lesson gate should become read-only, continue with in-memory state, or show an explicit warning; silently swallowing writes could make local gating disagree with server progress.
- Scope: static inspection of checked-in `script.js` only. No browser test with storage disabled, no Supabase/runtime test. No changes to `main`, migrations, seed execution, or production database.


## Legacy lesson progress page vs current user-scoped lesson storage — 2026-10-22
- Compared `lessons/progress.html` with the current `lesson.html` storage contract on `kurmanji-clean-release`. The current lesson page stores completion and quiz flags under `zansti:student:<user-id>:lesson-completed:<lesson-id>` / `zansti:student:<user-id>:lesson-quiz:<lesson-id>`, while the older progress page reads and deletes unscoped keys `lesson-completed:<lesson-id>`, `lesson-quiz:<lesson-id>`, and `lesson-progress:<lesson-id>`.
- Result: the progress page's counts and row badges do not read the current lesson page's namespaced values, and its reset action does not clear those namespaced values. It therefore cannot reliably represent/reset progress produced by the current lesson page. This is a source-level key mismatch, not a live account-data observation.
- No source change was made in this pass: a correct fix should decide whether this page is retired, updated to use the same user-scoped contract and authoritative server progress, or redirected to the current catalog. Guessing a storage migration or deleting other keys risks confusing learner state.
- Scope: static comparison of `lesson.html`, `lessons/progress.html`, and `lessons/index.json`; no browser test, auth-switch test, or Supabase query. No `main`, migration, seed execution, or production database change.


## Performance report course-2 coverage correction — 2026-10-22
- Compared `lessons/performance.html`'s report-generation list with `lessons/index.json`: the index contains 32 unique Course 2 pages (`course-2-01.html` through `course-2-32.html`), and all seven tail pages 26–32 exist on this protected branch.
- The report had `Array.from({length:25}, ...)`, so its server-backed summary omitted Course 2 lessons 26–32 and reported only 25 Course 2 logical rows. Changed that bound to 32; no lesson content, scoring rules, IDs, SQL, or data records were changed.
- Re-fetched the changed report and audit note after commit to verify the new bound and recorded finding. This is a source-level correction; the report was not run in a browser and no live Supabase results were queried.
- No changes to `main`, migrations, seed execution, or production database.


## Performance report mapping cross-check after Course 2 coverage fix — 2026-10-22
- Rechecked `lessons/performance.html` against `lessons/index.json` after increasing the Course 2 report generator to 32.
- Static mapping results: the report defines 26 Course 1 logical groups covering all 42 indexed Course 1 page records exactly once, with no missing or unindexed page paths; the Course 2 generator now creates 32 rows, matching all 32 indexed Course 2 page records. Together the report is configured for 58 logical lesson rows (26 + 32).
- Every page path referenced by the Course 1 groups exists in the index, and pages grouped into one logical lesson share the same course lesson number. No additional source correction was indicated by this cross-check.
- Scope: source/index consistency only; no browser interaction, authentication session, or live Supabase data was tested. No lesson content, migrations, seed execution, `main`, or production database changes.


## Performance report output escaping and per-user query scope — 2026-10-22
- Reviewed the dynamic rendering in `lessons/performance.html`. Lesson titles and section labels pass through the local `esc()` helper before being concatenated into report HTML; error text is also escaped before insertion. The status classes and labels are selected from fixed local branches, not interpolated from database values.
- The report's `lesson_progress` and `lesson_quiz_results` queries both filter by the authenticated `session.user.id`; quiz rows additionally filter to `passed = true`. No cross-user query-scope defect or unescaped catalog-title insertion was found in this static pass.
- No source code change was needed. Scope is source inspection only; no browser, malicious-input, authentication-switch, or live database test was performed. No changes to `main`, migrations, seed execution, or production database.


## Dynamic lesson renderer: completion mapping and content escaping — 2026-10-22
- Reviewed `lesson.html` against `lessons/index.json` and the protected-branch course mapping. The default lesson ID exists in the catalog; previous/next links are derived from the selected section and their labels are HTML-escaped. Markdown text, lesson objectives, terms, exercise prompts, quiz questions/options, and navigation labels are escaped before HTML insertion.
- Completion submits the selected catalog page path to `complete_lesson`; `course-2-NN.html` paths map to `phonetics-phonology-kurdik`, while the Course 1 writing paths map to `orthography-kurdik`. The local completion state and server lookup both use the selected page path/lesson ID consistently in the inspected code. No definite course-ID or content-escaping defect was found, so no source correction was made.
- Residual resilience concern: `saveScroll()` and several `studentStorage` reads/writes are not uniformly guarded against unavailable localStorage; this overlaps the previously documented storage-disabled-browser concern and does not by itself justify silently changing persistence behavior.
- Scope: static source/catalog inspection only. No browser navigation, authenticated account switch, localStorage-disabled test, RPC execution, or live Supabase query was performed. No `main`, migration, seed execution, or production database change.


## Performance report alignment with catalog logical-lesson semantics — 2026-10-22
- Compared the report's 26 Course 1 logical groups with `lessons/catalog.html`. The catalog's server reconciliation treats the final physical page in each multi-page logical lesson as the completion marker (`c1Ends`), and its logical-lesson map keeps the first page as the representative lesson for the card/quiz badge.
- Found a definite mismatch in `lessons/performance.html`: completion used `pages.every(...)`, requiring progress rows for every physical page, and quiz success required all page-level quiz IDs. This was stricter than the catalog's existing logical-lesson semantics and could under-report completions and passed quizzes.
- Corrected the report so Course 1 completion is determined by the group's final page, and quiz success uses the representative first page's lesson ID. Course 2 remains unchanged because each logical lesson has one page. Re-fetched the report and verified both updated expressions and the absence of the old all-pages completion predicate.
- Scope: static comparison and source re-read only; no browser run, authenticated account test, or live Supabase query. No lesson content, IDs, SQL, migrations, seed execution, `main`, or production database changes.


## Lesson progress report cross-check and storage-scope boundary — 2026-10-22
- Re-read `lessons/catalog.html`, `lessons/performance.html`, `lessons/index.json`, and `lesson.html` after the report fix. The catalog's first record for each logical lesson is the representative card/quiz ID, while the course-1 completion map uses the final physical page. The report now follows those two conventions; Course 2 remains one page per logical lesson. The report fix is present in the current protected branch.
- Additional resilience note: `lesson.html` calls `setStudentStorageScope()` before loading lesson data, but that helper returns without changing the default `anonymous` scope when Supabase is not ready or the session lookup fails. Quiz saving later re-checks the live session and can persist to Supabase, while its local cache is written through the scope captured earlier. If client/session readiness changes during the page lifetime, the server result may be saved while the user-scoped local badge cache is not. This is a conditional initialization race, not confirmed by a browser test; no source change made because correct recovery should be tested against auth readiness and account switching first.
- Scope: static source cross-check only. No browser/session-switch test or live database access. No course content, IDs, migrations, seed execution, `main`, or production database changes.


## Lesson navigation across section boundaries — 2026-10-22
- Static comparison of `lessons/index.json` with `lesson.html` found a definite navigation gap: the navigation builder previously searched only `section.lessons`. Course 1 logical lessons 17 and 18 sit in different sections (`section-07` and `section-10`), so the last page in the first section had no “next lesson” link and the first page in the next section had no “previous lesson” link, despite being consecutive lessons in the same course.
- Safe fix in `lesson.html`: navigation now builds its previous/next sequence from all catalog records sharing the current course ID, preserving each course boundary while allowing navigation across section boundaries. It uses the already-loaded `window.__zanstiLessons` list and retains escaped titles and encoded IDs.
- Verification: re-fetched `lesson.html` after commit and confirmed the new same-course filter is present. Static source check only; no browser navigation test performed.
- Scope: no lesson text, catalog data, IDs, SQL, migrations, seed execution, `main`, or production database changes.


## Course navigation boundaries and cross-course isolation — 2026-10-22
- Re-checked the updated `renderNavigation()` against the current `lessons/index.json`. The builder filters the full catalog to the active course before choosing adjacent records, so section boundaries within a course can be crossed while the first/last records of each course do not receive a previous/next record from another course.
- Static boundary checks: Course 1 starts at `writing-system-section-07-lesson-017` and ends at `phonetics-section-10-lesson-058`; Course 2 starts at `course-2-lesson-01` and ends at `course-2-lesson-32`. The sequence has two course IDs and no navigation adjacency should cross those IDs. The catalog contains 42 physical records for Course 1 and 32 for Course 2; these are page records, not the 26 and 32 logical lesson totals.
- No further source change needed. Verification is static only; the browser navigation path and clicked links were not runtime-tested.
- Scope: no lesson content, catalog records, IDs, SQL, migrations, seed execution, `main`, or production database changes.


## Avasin orthography: syllable terminology — 2026-10-22
- Static scan found four live source surfaces still using `بڕگە`, contrary to the project's explicit Avasin Code preference to use `هجا`: `lessons/053.html` (six occurrences, including title/metadata and its short lesson heading), `lessons/course-2-06.html` (three title/metadata occurrences), `lessons/index.json` (two catalog titles), and `lessons/catalog.html` (one legacy course link).
- Applied the exact terminology substitution `بڕگە` → `هجا` only in those four files, including metadata, visible titles, and the short phrase about /schwa/. No Latin Kurmanji forms, lesson structure, examples, or phonological claims were changed. This is a terminology/orthography correction explicitly required by Avasin Code, not a scientific-content rewrite.
- Re-fetched each modified file after its commit; all four checks confirmed the old term is absent and the replacement is present. Static verification only; no browser/runtime test.
- Scope: no seed execution, SQL, migrations, `main`, production Supabase, or production DB changes.
