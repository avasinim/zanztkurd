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
