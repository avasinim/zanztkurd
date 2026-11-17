# Kurmanji Curriculum Source-Evidence Review — 2026-11-16

## Scope

Reviewed the current post-release seed payloads for Course 1 lessons 01–06 and 10, and Course 2 lessons 04, 06, 09 and 10, against the University of Arizona Iranian Languages Kurmanji page, Geoffrey Haig's 2018 Northern Kurdish chapter, W. M. Thackston's reference grammar, the KNAB Hawar alphabet table, and a current Kurmanji greetings reference.

This is a source-attribution and claim-verification review. It is not a dialect survey, a complete copy-edit of all 38 lessons, or a live database test.

## Confirmed claims

### 1. Hawar alphabet and vowel system

- The University of Arizona Kurmanji page gives the eight vowel correspondences and examples used in Course 1 lesson 3: `a /ɑ/ qaz`, `e /æ/ belg`, `ê /e/ lêv`, `i /ɪ/ dil`, `î /i/ hîn`, `o /o/ nod`, `u /ʊ/ qul`, and `û /u/ bûz`.
- The same page's orthography table explicitly includes the Course 1 lesson 5 examples: `çak`, `êş`, `îro`, `şaş`, and `bûz`, with their letter/IPA/gloss correspondences. The earlier note questioning `êş` and `îro` provenance was incorrect and has been corrected.
- Haig (2018, pp. 109–110) independently describes eight simple vowel phonemes, distinguishing five tense/long vowels from three lax/short vowels. This supports the course's eight-vowel inventory while adding a useful phonological distinction for later teaching.
- KNAB identifies the Roman alphabet as the Kurmanji Hawar alphabet (1932). It is a useful corroborating orthographic reference, although its table also includes Arabic-script mappings and should not be mistaken for a standalone phonological inventory.

### 2. Consonants and orthography

- The Arizona page explicitly notes that several dialectal phonemic distinctions are not represented in standard Kurmanji orthography, including /h/ vs /ħ/, /ʔ/ vs /ʕ/, /χ/ vs /ʁ/, and aspirated vs unaspirated voiceless consonants.
- It also states that the trill/flap distinction is often ignored in orthography and, when marked, the trill is indicated by `rr` rather than `r`.
- Haig (2018, pp. 113–114, Tables 5–6) provides a phonemic consonant scheme, a three-way contrast for stops/affricates in the relevant descriptions, and a distinction between trill /r/ and flap /ɾ/. This confirms that letter count and phoneme count must not be conflated.
- Course 1 lesson 4 now labels `RR rr` explicitly as a **two-letter digraph/convention, not a separate Hawar alphabet letter**. The exact same clarification is mirrored in the forward migration. It must not be counted as a 32nd alphabet letter.
- Course 1 lesson 4's explanation that X can cover /χ/ and /ʁ/ in standard writing is supported by the Arizona orthography note. The distinction is dialectal/phonological and is not always shown in standard spelling.

### 3. Direct and oblique case

- Haig (2018, p. 115, Table 7) gives the exact paradigms used in Course 1 lesson 25 and Course 2 lesson 4:
  - masculine singular definite: `gund` / `gund-î`
  - masculine singular indefinite: `gund-ek` / `gund-ek-î`
  - feminine singular definite: `jin` / `jin-ê`
  - feminine singular indefinite: `jin-ek` / `jin-ek-ê`
- Haig explicitly notes that the oblique marker may be suppressed with ezafe and may be absent with bare masculine singular nouns in some dialects. The lesson's qualification about dialectal variation is therefore necessary and appropriate.
- Haig and Öpengin (2015) describe the direct/oblique opposition and split alignment: present-tense transitive subjects are direct and objects oblique, while past-tense transitive subjects are oblique and objects direct. This supports the distinction taught in lesson 25.
- Haig (2018, pp. 118–119) gives `mal-a me` ‘our house’ and the same-clause reflexive example `Ez li mal-a xwe me`, rejecting `mal-a min` in that coreferential context. This directly supports Course 2 lesson 6.

### 4. Verb tense and negation

- Haig (2018, p. 126, Table 14) gives the same paradigmatic examples used in Course 2 lesson 9: `ez dibêjim`, `ez hatim`, `ez dihatim`, `min xwar`, and `min dixwar`.
- Haig (2018, pp. 128–129, §2.6.4) gives the future pattern with `dē/wē` plus a present subjunctive verb, including the exact example `ew dē mesel-ē ji te re bēž-e`. The lesson's description is source-aligned.
- Haig (2018, p. 126) states that `na-` replaces the present indicative prefix `di-` in many present forms, with the lexical exceptions `zanîn` and `karîn` taking `ni-`; it also gives `ne-hatin` and `ne-di-hatin` for simple and progressive past negation. This supports Course 2 lesson 10, including its exception warning.

### 5. Everyday greetings

- The current Yari Kurmanji phrase reference distinguishes `Êvarbaş` as an evening greeting and `Şevbaş` as a good-night expression, and lists `Bi xêr hatî` as a singular welcome. This supports Course 1 lesson 10.
- Keep the lesson's note that usage varies by context and region; do not present the listed expressions as the only possible greetings in every Kurmanji community.

## Editorial decision and one minimal content clarification

- Keep the current five split seeds as the post-release editorial working payload.
- Preserve the documented Avasin Sorani house spellings in explanatory text; do not normalize them to general Sorani forms.
- Keep the five vowel/consonant examples in lesson 5; all five are present in the cited Arizona table.
- Clarify `RR rr` in lesson 4 as a digraph/convention, not an independent alphabet letter. This clarification was added to the Course 1 lesson 4 seed row and mirrored in the forward migration.
- No other lesson content was changed during this review.

## Source limitations and remaining work

- Haig's 2018 chapter describes Standard Kurmanjî loosely based on Cizre/Botan and separately discusses regional variation. It is a strong reference, but it does not establish that every feature is uniform across all Kurmanji varieties.
- The Arizona page is a valuable teaching reference for orthography/IPA correspondences; for advanced dialect-specific phonology, Haig and specialist phonetic studies should take priority.
- The current review did not independently verify every lexical gloss and every Kurmanji example in all 38 lessons. A full lesson-by-lesson lexical audit remains a separate task.
- No database, Supabase project, or production environment was accessed.

## References

1. University of Arizona, Iranian Languages, “Kurmanji Kurdish” (phonology, orthography, vowels, consonants and example words): https://iranian-languages.arizona.edu/node/7
2. Geoffrey Haig (2018), “Northern Kurdish (Kurmanjî),” in *The Languages and Linguistics of Western Asia: An Areal Perspective*, DOI: https://doi.org/10.1515/9783110421682-004 ; open chapter PDF: https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf
3. Geoffrey Haig and Ergin Öpengin (2015), “Gender in Kurdish: Structural and socio-cultural dimensions,” DOI and offprint: https://www.uni-bamberg.de/fileadmin/aspra/06_Team/Publications_and_CV/haig_opengin_2015_gender_kurdish_offprint.pdf
4. W. M. Thackston, *Kurmanji Kurdish: A Reference Grammar with Selected Readings*, Harvard University: https://kurdishacademy.org/?page_id=623
5. Institute of the Estonian Language, KNAB, “Kurdish / Kurmanji Roman alphabet (Hawar 1932)”: https://arhiiv.eki.ee/knab/lat/kblku2.pdf
6. Yari, “Kurdish greetings and everyday phrases for beginners (Kurmanji)”: https://yari.krd/learn/kurdish-greetings/

## Change and verification boundary

The only lesson-content clarification from this review is the RR digraph label in Course 1 lesson 4. The same row is updated in the forward migration so the overlay remains byte-identical to the seed. The historical release migration is unchanged. The post-clarification CI run 44031226651 completed successfully: PostgreSQL parsing, exact seed parity, package validation and all three browser regression tests passed. This report does not claim the migration has been applied to a database.
