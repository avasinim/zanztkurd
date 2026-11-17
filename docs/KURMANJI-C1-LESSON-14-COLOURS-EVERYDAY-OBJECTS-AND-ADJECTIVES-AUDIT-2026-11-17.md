# Course 1 Lesson 14 — colour vocabulary and everyday objects audit

Date: 2026-11-17  
Repository: avasinim/zanztkurd  
Working branch: fix/kurmanji-ci-current-migration  
Baseline HEAD: 99571c49cb61e4c1e6b51f692edec34f3219a0ae  
Pre-work backup: backup/c1-l14-colours-everyday-objects-before-2026-11-17  
Scope: exact Course 1 Lesson 14 seed payload; six/seven colour inventory, colour semantics and adjective syntax, everyday-object vocabulary, noun gender, locative prepositions, and present-transitive object case. Documentation-only; no lesson or seed content changed.

## 1. Executive finding

The lesson's core vocabulary is mostly well-founded. A primary Kurmanji teaching grammar (Baran Rizgar, *Learn Kurdish*, 1996) directly attests the core colour terms and several exact object nouns used in the lesson. It also provides source-attested colour sentences and the locative construction with `li ser`. The 1988 Institut kurde de Paris terminology list independently distinguishes `kesk/sews` “green” from `şîn` “blue” in its standard terminology table, while a 2026 specialist article reports `şîn` as “green/blue” in phraseological material drawn in part from Yezidi communities in Armenia. That recent finding is important, but it should not be generalized into a universal Kurmanji colour mapping.

The main release risks are not the basic six colours. They are:
1. the lesson includes seven colours but the exercise asks for six;
2. the Sorani gloss `شین` is not sufficiently precise by itself to teach the Kurmanji semantic range;
3. `qehweyî` is a documented brown term, but the lesson's own “spelling may vary” note does not identify a sourced alternative;
4. `defter` is attested as “notebook,” but the same teaching grammar lists `lênûsk` as an alternative; the project should choose a consistent learner-facing headword;
5. `Telefon li ser maseyê ye` is structurally plausible and the source supports `li ser` plus `mase`, but the exact sentence is instructor-created;
6. `Ez pirtûkê dixwînim` introduces present-transitive object oblique morphology before the learner has formally studied it. It should be treated as a memorized phrase or moved after the relevant case lesson.

## 2. Exact repository artifact inspected

| Artifact | Blob SHA | Relevant content |
|---|---|---|
| `docs/kurmanji-content-seed-part-02.sql` | `aa5af4960256ee56955f0904c073c49bcc54a629` | Draft Lesson 14 payload: seven colours, ten everyday nouns, five sentences, five exercises and three references |
| `docs/KURMANJI-COURSE-1-LESSONS-13-18-CLAIM-LEVEL-EVIDENCE-REGISTER-2026-11-16.md` | `4519b677e3c09f09a175763a37dffbb41486a329` | Earlier claims 14.1–14.6 and unresolved vocabulary/sentence items |

The seed is a checked-in draft SQL file, not proof of the current live database content. It was inspected as text only; no SQL was executed.

## 3. Evidence examined

### 3.1 Baran Rizgar, *Learn Kurdish: A Multi-level Course in Kurmanci* (1996)

This is a substantial teaching grammar/course with explicit Kurmanji examples and a glossary. It is not a peer-reviewed descriptive grammar, but it is a direct pedagogical source for the learner vocabulary and sentence patterns in this lesson.

**Colour list and examples, printed pp. 41–42:**
- `kesk` = green;
- `qehweyî` = brown;
- `sor` = red;
- `spî` (also `sipî`) = white;
- `şîn` = blue;
- `zer` = yellow;
- `binefşî` = violet; `pembe` = pink; `qer` = jet black; `rengîn` = colourful.
- The book explains that colour words can function as nouns and adjectives and gives `Sêv sor e.` (“The apple is red”) and `Sêv çi reng e?` (“What colour is the apple?”).
- Its exercises include `Kursîya min sipî ye`, `Rengê pênûsa mamoste qehweyî ye`, `Pênûsên te çi reng in?`, and plural colour answer `Reş û şîn in`.

Retrieved lines: 1321–1382 in https://kurdshop.net/content/upload/1/root/learn-kurdish-by-baran-rizgar.pdf

**Everyday-object vocabulary and grammar:**
- `pirtûk` / `kitêb` = book; `pênûs` / `qelem` = pen; `lênûsk` / `defter` = notebook; `mal` = home; `telefon` = telephone; `kursî` = chair; `mase` = table; `nan` = bread; `av` = water; `derî` = door.
- The book marks `lênûsk/defter` as feminine, `pênûs/qelem` as feminine, `pirtûk/kitêb` as feminine, `mal` as feminine in the sense “home,” `mase` as feminine, and `kursî` as feminine.
- It uses `Li ser mase çi heye?` (“What is on the table?”), `Pirtûkên we li ser kursîyan in` (“Your books are on the chairs”), and `Solên min di bin mase de ne`.
- `telefon` appears as a dictionary headword and in the example `Min telefonî wî kir`.
- `derî` is used in multiple examples including `Derî vekirî ye?` and `Derî veke!`.

Retrieved lines: 221–272, 872–920, 1480–1515, 3695–3728, 602–608, 683–685 and 2678–2681.

### 3.2 Institut kurde de Paris, *Kurmancî*, no. 2 (winter 1988)

The terminology list on printed p. 7 distinguishes:
- `kesk, sews` = green;
- `şîn` = blue;
- `qehweyî` = brown;
- `spî` = white; `reş` = black; `sor` = red; `zer` = yellow.

This is valuable historical written-terminology evidence and demonstrates that `kesk` and `şîn` were distinguished in that source. It is not evidence that every contemporary regional community uses the exact same semantic boundary.

Source: https://www.institutkurde.org/publications/kurmanci/telechargement/ku2.pdf  
Retrieved lines: 31–45.

### 3.3 Amryan (2026), “Black Day, White Face”: Colour Terms in Kurmanji Kurdish Phraseology

The *Journal of Iranian Linguistics* article (3(1), pp. 6–17; DOI 10.46991/jil/2026.01.01) examines phraseological colour terms drawing on lexicographic, folkloric and ethnolinguistic material, including Yezidi communities in Armenia. Its abstract labels `şîn` “green/blue” in the studied phraseological data, alongside `reş`, `spî`, `sor`, and `zer`.

This is specialist, recent evidence that the semantic range of `şîn` can vary by source/community and context. It studies phraseology and a specific community corpus, not the full everyday colour lexicon of all Kurmanji speakers. Therefore it supports a regional/semantic caution, not a universal replacement of the standard pedagogical distinction `kesk` green / `şîn` blue.

Source: https://journals.ysu.am/JIL/article/view/14922  
Retrieved lines: 26–41, 45–64.

### 3.4 Goethe-Verlag, Turkish–Kurmanji colour practice

The beginner phrasebook page gives `Rengê ezmên çi ye? Şîn.` (“What colour is the sky? Blue”) and `Rengê çîmenê çi ye? Kesk.` (“What colour is the grass? Green”), as well as `Ax bi çi rengî ye? Qehweyî` (“What colour is the soil? Brown”).

This is a pedagogical cross-check, not a scholarly dictionary. It corroborates the teaching distinction used by Rizgar and the 1988 terminology list.

Source: https://www.goethe-verlag.com/book2/TR/TRKU/TRKU016.HTM  
Retrieved lines: 97–112 and lesson content around the colour prompts.

## 4. Claim-by-claim assessment

| Current Lesson 14 claim/example | Status | Finding |
|---|---|---|
| `sor` = red | SUPPORTED | Directly attested by Rizgar, Institut kurde de Paris and Goethe-Verlag. |
| `şîn` = Sorani gloss `شین` | PARTLY SUPPORTED; GLOSS TOO BROAD | Standard teaching sources label it blue; recent phraseological study reports green/blue in specific Yezidi Armenian material. Add a precise Sorani gloss and note context/variety rather than implying universal one-to-one mapping. |
| `kesk` = green | SUPPORTED WITH VARIANT | Rizgar and Institut kurde de Paris give `kesk`; the latter also records `sews`. Do not use `sews` as an unlabelled universal spelling. |
| `zer` = yellow | SUPPORTED | Directly attested across sources. |
| `reş` = black | SUPPORTED | Directly attested across sources. |
| `spî` = white | SUPPORTED WITH ORTHOGRAPHIC VARIANT | Rizgar records `sipî, spî`; the lesson's `spî` is a documented head form. Keep the Hawar spelling consistent. |
| `qehweyî` = brown | SUPPORTED | Explicitly attested by Rizgar and Institut kurde de Paris. The lesson's generic claim that spelling can vary should be accompanied by actual source-labelled variants or removed. |
| Seven colours are listed, but exercise asks for six | INTERNAL INCONSISTENCY | Align exercise count with the seven-entry list, or reduce the list only by editorial decision. |
| `pirtûk` = book | SUPPORTED | Rizgar glossary lists `pirtûk/kitêb`. |
| `pênûs` = pen | SUPPORTED WITH SYNONYM | Rizgar lists `pênûs/qelem`; retain `pênûs` as the chosen headword and optionally list `qelem` as a documented synonym. |
| `defter` = notebook | SUPPORTED WITH ALTERNATIVE | Rizgar explicitly lists `lênûsk/defter`; choose one headword for the beginner table and record the other as an alternative. |
| `derî` = door | SUPPORTED | Directly attested in Rizgar's lesson examples. |
| `kursî` = chair | SUPPORTED | Directly attested and marked feminine in Rizgar's glossary. |
| `mase` = table | SUPPORTED | Directly attested and marked feminine; Rizgar uses `li ser mase`. |
| `telefon` = telephone | SUPPORTED | Explicit dictionary headword in Rizgar. |
| `av` = water | SUPPORTED | Explicit dictionary headword in Rizgar. |
| `nan` = bread | SUPPORTED | Explicit dictionary headword in Rizgar. |
| `mal` = home | SUPPORTED WITH HOMONYM/GENDER CAUTION | Rizgar lists `mal (f)` “home” and notes `mal (m)` can mean “goods/property.” The lesson's generic gloss is valid only for the intended feminine lexical sense. |
| `Ev pirtûk sor e.` | GRAMMATICAL STRUCTURE SUPPORTED; SENTENCE ADAPTED | Rizgar attests `Sêv sor e` and colour-predicate structures. Here `sor` is a predicate adjective (“this book is red”), not an adjective attributively modifying the noun. If the intended meaning is “this red book,” an ezafe construction is needed; do not conflate the two. |
| `Ev pênûs reş e.` | GRAMMATICAL STRUCTURE SUPPORTED; SENTENCE ADAPTED | Same analysis as above. The example is predicative, not an attributive adjective phrase. |
| `Av sar e.` | PLAUSIBLE; EXACT SENTENCE NOT ATTESTED | The noun and adjective are ordinary lexical items, but the exact clause should be labelled instructor-created and checked by a native editor. |
| `Telefon li ser maseyê ye.` | CONSTRUCTION SUPPORTED; EXACT SENTENCE ADAPTED | Rizgar attests `li ser` + `mase` and the feminine noun `mase`; the exact phone sentence was not found. The oblique form `maseyê` is expected after the preposition `li ser`; the copula `ye` follows the final vowel of `maseyê`. |
| `Ez pirtûkê dixwînim.` | GRAMMATICAL, BUT SEQUENCING RISK | The feminine singular noun's oblique form `pirtûkê` is used as a present-transitive object. This is beyond a pure colour/object vocabulary objective and should be explicitly labelled as review/preview or moved after the lesson on case. |
| “Colours are adjectives; sentence form changes by grammatical structure” | TOO VAGUE | Add the distinction between predicative use (`Sêv sor e`) and attributive use (`sêva sor`, “the red apple”). Rizgar explicitly documents colour words as nouns and adjectives; a recent learner resource illustrates ezafe in attributive phrases. |

## 5. Editorial resolution — proposal only

1. Keep the seven core colour headwords `sor, şîn, kesk, zer, reş, spî, qehweyî`.
2. Correct the exercise instruction from “six colours” to “seven colours,” unless the editor deliberately reduces the table.
3. In the gloss for `şîn`, distinguish the normal teaching gloss “blue” from the documented green/blue semantic range in the specific Amryan (2026) corpus. Do not claim all Kurmanji varieties collapse `şîn` and `kesk`.
4. Keep `kesk` = green and record `sews` as a source-specific variant, not an unlabelled house spelling.
5. Keep `spî` as the head form; optionally record `sipî` as a documented orthographic variant. Do not mix the two spellings inside the same learner-facing table.
6. Keep `qehweyî` = brown. Do not state that it varies unless a specific alternative is cited and region-labelled.
7. For the everyday-object list, keep the selected ten words but add a small alternative note for `pênûs/qelem` and `lênûsk/defter`; choose one headword per concept and preserve the alternate as vocabulary recognition, not as two separate objects.
8. Add a note that `mal` means “home” in its feminine lexical use, while the same form can have a different masculine meaning (“goods/property”) in Rizgar's account. This is an optional teacher note, not necessary in the learner table.
9. Keep `Ev pirtûk sor e` and `Ev pênûs reş e` only if the lesson clearly teaches predicative colour statements (“the book is red,” “the pen is black”). If the intended target is “this red book / this black pen,” rewrite with a source-checked ezafe structure after specialist review.
10. Add a minimal contrast: predicative `Sêv sor e.` (“The apple is red”) versus attributive `sêva sor` (“the red apple”). Explain that the noun's ezafe ending depends on gender/number; do not imply colour adjectives themselves take gender endings in these examples.
11. Keep `Telefon li ser maseyê ye` marked as an instructor-created application of the sourced `li ser mase` pattern; native reviewer should confirm the naturalness and translation.
12. Retain `Ez pirtûkê dixwînim` only as a clearly marked review phrase for present-transitive object case. The lesson should not pretend that this case pattern is taught by the colour/object vocabulary table.
13. The Sorani glosses should be checked independently by a Sorani editor; Kurmanji evidence cannot certify the target Sorani wording.

## 6. Release decision

**Status: NOT RELEASE-CERTIFIED; the vocabulary core is mostly supported, but the exercise count, semantic gloss, and pedagogical grammar scope require clarification.**

Minimum release-strengthening package:
- resolve the seven-versus-six mismatch;
- label the semantic scope of `şîn` without overgeneralizing a regional phraseological result;
- choose consistent headwords and label documented synonyms;
- distinguish predicative colour statements from attributive adjective phrases;
- label adapted sentences and flag the object-case preview;
- complete independent Sorani copy-edit.

## 7. Actions not taken

No lesson body, seed SQL, migration, schema, static page, application code, validator, test, database, PR #3, main branch, merge state or deployment was changed. No SQL was executed. No live database was accessed. This is a documentation-only audit.

## 8. References

1. Rizgar, Baran (1996). *Learn Kurdish: A Multi-level Course in Kurmanci*, especially pp. 5–7, 27, 41–46. https://kurdshop.net/content/upload/1/root/learn-kurdish-by-baran-rizgar.pdf
2. Institut kurde de Paris (1988). *Kurmancî*, no. 2, winter 1988, “Reng,” p. 7. https://www.institutkurde.org/publications/kurmanci/telechargement/ku2.pdf
3. Amryan, Tereza (2026). “‘Black Day, White Face’: Color Terms in Kurmanji Kurdish Phraseology.” *Journal of Iranian Linguistics* 3(1), pp. 6–17. DOI: https://doi.org/10.46991/jil/2026.01.01. https://journals.ysu.am/JIL/article/view/14922
4. Goethe-Verlag. “Renkler – Konuşma Sözlüğü Türkçe » Kürtçe (Kurmançça),” beginner colour-practice resource. https://www.goethe-verlag.com/book2/TR/TRKU/TRKU016.HTM

## Backup record

- Pre-work backup: `backup/c1-l14-colours-everyday-objects-before-2026-11-17`
- Baseline SHA: `99571c49cb61e4c1e6b51f692edec34f3219a0ae`
- Post-work backup: to be recorded after commit and exact ref/blob verification.
