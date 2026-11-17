# Course 1 Lesson 13 — cardinal numbers and counted noun phrases audit

Date: 2026-11-17  
Repository: avasinim/zanztkurd  
Working branch: fix/kurmanji-ci-current-migration  
Baseline HEAD: c983d19189f061e090f35c895db8ab714c90a712  
Pre-work backup: backup/c1-l13-cardinal-numbers-before-2026-11-17  
Scope: exact Course 1 Lesson 13 seed payload; cardinal forms 1–20, source variants, numeral–noun syntax, plural oblique marking, possession with existential verbs, and duration expressions. Documentation-only; no lesson or seed content changed.

## 1. Executive finding

The core list is largely sound and recognizable as Kurmanji. The primary descriptive source, Haig (2018) §2.4, directly supports the sequence 1–20 and records variants for 11, 12, 2 and 3. Thackston §9 independently supports the core list, while recording some different forms (notably 17 and 18) and spelling variation in 11–12.

The lesson's strongest grammatical point is also broadly correct:
- `Ez du pirtûkan dixwînim.` uses `du` as a numeral modifying a noun; `pirtûkan` is plural oblique in the present-transitive object position.
- `pênc rojan` in a duration expression is oblique, as required for temporal duration expressions in Thackston §9.
- `Min sê pênûs hene.` follows the Kurmanji possessive-existential pattern: oblique possessor + possessed noun phrase + plural existential `hene`. Thackston explicitly gives `Pênc zarokên wî hene` “He has five children.”

The current lesson nevertheless needs a more precise evidence note. It lists one form for each number, then says “some sources vary” for 11, 12 and 15 without identifying the documented forms or separating orthographic variants from regional morphological variants. The key missing beginner distinction is that standalone 2 and 3 can be `didu/sisê`, while the short forms `du/sê` are used when they modify nouns and in compound numerals.

## 2. Exact repository artifact inspected

| Artifact | Blob SHA | Relevant content |
|---|---|---|
| `docs/kurmanji-content-seed-part-02.sql` | `aa5af4960256ee56955f0904c073c49bcc54a629` | Draft Lesson 13: list 1–20, spelling note, three example sentences, exercises and sources |
| `docs/KURMANJI-COURSE-1-LESSONS-13-18-CLAIM-LEVEL-EVIDENCE-REGISTER-2026-11-16.md` | `4519b677e3c09f09a175763a37dffbb41486a329` | Existing claims 13.1–13.6 and earlier unresolved example status |
| `docs/KURMANJI-COURSE-1-INTEGRATED-26-LESSON-CLAIM-EVIDENCE-MATRIX-AND-CLOSURE-PLAN-2026-11-16.md` | `7e33e83962499d1bfd9a2147fb9bcaf4537f708f` | Course-wide release closure and source-provenance safeguards |

The seed is draft SQL checked into the repository; it is not proof of the current live database payload. It was inspected as text only and not executed.

## 3. Primary descriptive evidence

### 3.1 Haig (2018), §2.4 “Numerals,” printed pp. 121–122

Haig gives the main numbers in Standard Orthography:
- 1–10: `yek, didu/du, sisê/sê, çar, pênc, şeş, heft, heşt, neh, deh`;
- 11–20: `yanzdeh/yazdeh, dwanzdeh, sêzdeh, çardeh, panzdeh, šanzdeh, hevdeh, hejdeh, nozdeh, bîst`.

He explicitly states:
- the short forms `du` and `sê` are used when they quantify a noun phrase, e.g. `sê zarok` “three children”;
- in western parts of the Kurmanji-speaking zone, the inherited opaque forms for 11 and 12 have been replaced by transparent “10-and-1 / 10-and-2” forms such as `dehûyek`, `dehûdu`, `dehûsê`. He relates this to contact influence from Armenian and Turkish.

This is a crucial scope note: the table is not a universal description of every regional counting system. Haig's Standard Kurmanji sketch is loosely based on Cizre/Botan; the chapter itself discusses regional variation separately.

Source: https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf  
Retrieved lines: 1076–1146.

### 3.2 Thackston, §9 “Cardinal Numbers,” printed pp. 21–24

Thackston independently lists:
- `yek`; `du/didu`; `sê/sisê`; `çar`; `pênc`; `şeş`; `heft`; `heşt`; `neh`; `deh`;
- `ya(n)zdeh`; `dwanzdeh`; `sêzdeh`; `çardeh`; `panzdeh`; `şanzdeh`; `hivdeh`; `hijdeh`; `nozdeh`; `bîst`.

He then gives the important noun-phrase rules:
- Numerals modifying nouns are indeclinable and immediately precede the counted noun.
- The counted noun is plural; overt plural marking appears only in oblique and construct cases.
- The standalone forms for 2 and 3 are `didu` and `sisê`; when modifying nouns or occurring inside compound numerals, they are `du` and `sê`.
- Nouns after these and other numerals are construed as plural.
- Temporal duration and frequency expressions (“for X amount of time” / “X times”) take the oblique case.

Examples from the grammar include `Apê min û du kes çûn nava şikeftê`, `piştê du rojên din`, `Sê hefte û çar roj mabûn`, `piştî şeş meh û 14 (çardeh) rojan`, `Sê roj û sê şevan di wî cihî da ma` (“He stayed in that place for three days and three nights”), and `Ez heşt caran hatim girtin` (“I was arrested eight times”).

Source: https://kurdshop.net/content/upload/1/root/kurmanji-complete.pdf  
Retrieved lines: 1555–1698.

### 3.3 Possession and existential `hebûn`

Thackston §12 states that Kurmanji has no direct equivalent of English “to have”; possession is expressed through a possessive construction plus the appropriate form of existential `hebûn`:
- singular existential: `heye`;
- plural existential: `hene`.

His attested example `Pênc zarokên wî hene` means “He has five children.” This supports the broad pattern in the lesson's `Min sê pênûs hene`, but does not independently authenticate the exact noun `pênûs` or the whole course-created sentence.

Source: https://kurdshop.net/content/upload/1/root/kurmanji-complete.pdf  
Retrieved lines: 2030–2086.

### 3.4 Independent cross-check: Omniglot

Omniglot's Northern (Kurmanji) table lists `yanzdeh`, `diwanzdeh`, `sêzdeh`, `çardeh`, `panzdeh`, `şanzdeh`, `hevdeh`, `hejdeh`, `nozdeh`, `bîst`. It corroborates the lesson's `diwanzdeh` spelling, although Haig and Thackston use `dwanzdeh`. Omniglot identifies Kamîz Şeddadî's Russian–Kurmanji phrasebook as its source, so it is a useful secondary cross-check, not a replacement for the descriptive grammars.

Source: https://www.omniglot.com/language/numbers/kurdish.htm  
Retrieved lines: 24–51, 100–108.

## 4. Claim-by-claim assessment

| Current lesson claim/example | Status | Finding |
|---|---|---|
| 1–10: `yek, du, sê, çar, pênc, şeş, heft, heşt, neh, deh` | SUPPORTED | All are directly corroborated. For 2 and 3, add the standalone variants `didu` and `sisê`; the shorter `du/sê` are the forms used before counted nouns. |
| 11 `yanzdeh` | SUPPORTED WITH VARIANT | Haig records `yanzdeh` and `yazdeh`; Thackston writes `ya(n)zdeh`. Keep the selected head form but record variants explicitly. |
| 12 `diwanzdeh` | SUPPORTED AS A DOCUMENTED VARIANT; NOT THE ONLY SOURCE FORM | Omniglot lists `diwanzdeh`; Haig and Thackston list `dwanzdeh`. A more recent instructional page also lists `duwanzdeh`. Do not label any one of these universally wrong; select a house form only after the reference-variety decision. |
| 13 `sêzdeh` | SUPPORTED | Haig and Thackston agree. |
| 14 `çardeh` | SUPPORTED | Haig and Thackston agree. |
| 15 `panzdeh` | SUPPORTED | Haig and Thackston agree on this form. The current lesson's generic note mentions variation in 15, but the primary sources inspected here do not establish a competing standard form. Do not assert a variant without a specific source. |
| 16 `şanzdeh` | SUPPORTED WITH ORTHOGRAPHIC PRESENTATION NOTE | Thackston writes `şanzdeh`; Haig's PDF extraction shows `šanzdeh`, a scholarly transliteration character rather than the normal Hawar letter. Preserve the course's Hawar `ş`. |
| 17 `hevdeh` | SUPPORTED WITH VARIANT | Haig has `hevdeh`; Thackston has `hivdeh`. Treat as source/variety difference, not a typographical error to silently “fix.” |
| 18 `hejdeh` | SUPPORTED WITH VARIANT | Haig has `hejdeh`; Thackston has `hijdeh`. Retain a source-labelled variant note. |
| 19 `nozdeh` | SUPPORTED | Haig and Thackston agree. |
| 20 `bîst` | SUPPORTED | Haig and Thackston agree. |
| Note that diacritics matter in `sê`, `şeş`, `heşt`, `bîst` | SUPPORTED | These are distinct Hawar graphemes; the note correctly protects spelling. |
| `Ez du pirtûkan dixwînim.` | GRAMMATICAL ANALYSIS SUPPORTED; EXACT SENTENCE IS INSTRUCTOR-CREATED | `du` is the short numeral used before a noun. `pirtûkan` is the plural oblique form, expected for a present-transitive object. Thackston supports numeral + plural noun and the oblique plural pattern, but the exact sentence was not located verbatim. |
| `Min sê pênûs hene.` | CONSTRUCTION SUPPORTED; LEXICAL EXAMPLE NEEDS REVIEW | `Min` is the oblique possessor; `hene` is the plural existential used in possession. Thackston attests `Pênc zarokên wî hene` “He has five children.” The exact noun `pênûs`, its count use, and this whole sentence remain instructor-created and need dictionary/native review. |
| `Ew pênc rojan li vir e.` | DURATION MORPHOLOGY SUPPORTED; EXACT CLAUSE NEEDS NATIVE REVIEW | `pênc rojan` is consistent with the rule that duration expressions take oblique case. Singular `e` matches singular `ew`; plural `ew` would require plural copula `in`. The full clause was not found verbatim, so confirm that its intended reading is natural in the chosen variety. |
| Exercise asking for 11–16 in two sources | PEDAGOGICALLY SOUND, BUT TOO NARROW | The most useful comparison should include 11, 12, 17 and 18, where the inspected grammars explicitly differ, as well as the western 11–19 regularization described by Haig. |
| Sorani glosses for all numbers | EDITORIAL REVIEW | Kurmanji sources establish the target numerals, not the exact Sorani orthography/translation. A Sorani copy-editor should check the table independently. |

## 5. Editorial resolution — proposal only

1. Keep the 1–20 list as the lesson's main learning objective.
2. Add a compact note:
   - standalone: `didu`, `sisê`;
   - before a counted noun: `du`, `sê`;
   - in compound numerals: `du`, `sê`.
   This distinction is directly stated by Haig and Thackston.
3. Replace the vague spelling note with a small variant panel, explicitly identifying source forms:
   - 11: `yanzdeh / yazdeh`;
   - 12: `dwanzdeh` (Haig/Thackston), `diwanzdeh` (Omniglot), and `duwanzdeh` (contemporary instructional source);
   - 17: `hevdeh / hivdeh`;
   - 18: `hejdeh / hijdeh`.
   Label each with its source; do not present the variants as interchangeable in every region.
4. Keep `panzdeh` as the main form; remove the unsupported implication that this audit established a competing form for 15.
5. Keep the current diacritic note, and use the standard Hawar characters `ş`, `ê`, `î` consistently. Do not copy scholarly `š` into learner-facing Hawar text.
6. Retain `Ez du pirtûkan dixwînim.` only as an instructor-created example after native review. Explain the two distinct facts: the numeral takes its short NP form, while the counted noun shows plural oblique marking because it is a present-transitive object.
7. Retain `Min sê pênûs hene.` only after a Kurmanji editor confirms `pênûs` and its natural count construction. If a source-attested noun is preferred, use an attested countable noun from Thackston's grammar and cite it faithfully.
8. Retain `Ew pênc rojan li vir e.` only after native review of the complete clause. Keep the grammar note that temporal duration phrases take oblique case; do not suggest that the numeral itself is inflected.
9. Clarify that `ew` plus singular `e` means “he/she/it is”; if the intended subject is plural “they,” the copula changes to `in`.
10. Do not expand this lesson into ordinal numbers, time-telling, large numbers or full numeral declension. Those are separate learning outcomes.
11. Keep Sorani translation proofreading separate from Kurmanji grammar validation.
12. State that the table follows the project's chosen written reference only after the owner/editor approves the reference variety and house spelling. Until then, label it a provisional beginner teaching set.

## 6. Release decision

**Status: NOT RELEASE-CERTIFIED; the core list is sound, but the lesson's variant note and sentence provenance need tightening.**

Minimum release-strengthening package:
- make the `didu/sisê` versus `du/sê` distinction explicit;
- identify actual source variants rather than saying vaguely that 11–16 vary;
- distinguish spelling/orthographic variants from regionally different numeral systems;
- preserve the valid case morphology in the examples, while marking them as instructor-created pending native review;
- check the Sorani glosses independently.

## 7. Actions not taken

No lesson body, seed SQL, migration, schema, static page, application code, validator, test, database, PR #3, main branch, merge state or deployment was changed. No SQL was executed. No live database was accessed. This is a documentation-only audit.

## 8. References

1. Haig, Geoffrey (2018). “Northern Kurdish (Kurmanjî).” In *The Languages and Linguistics of Western Asia: An Areal Perspective*, pp. 106–158. §2.4 “Numerals,” printed pp. 121–122. https://doi.org/10.1515/9783110421682-004 ; author-hosted PDF https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf
2. Thackston, W. M. *Kurmanji Kurdish: A Reference Grammar with Selected Readings*. §9 “Cardinal Numbers,” printed pp. 21–24; §12 “To Have” and the Existential Verb Hebûn, printed pp. 30–31. https://kurdshop.net/content/upload/1/root/kurmanji-complete.pdf
3. Omniglot, “Northern (Kurmanji) Kurdish numbers.” Secondary compilation; source attribution to Kamîz Şeddadî. https://www.omniglot.com/language/numbers/kurdish.htm
4. Kurdish Academy, “Kurdish Numbers 1–100 in Kurmancî (Plus Time, Days and Dates),” 24 October 2026. Contemporary instructional cross-check only, not a descriptive grammar. https://www.thekurdishacademy.com/de/blogs/learn-kurdish/kurdish-numbers

## Backup record

- Pre-work backup: `backup/c1-l13-cardinal-numbers-before-2026-11-17`
- Baseline SHA: `c983d19189f061e090f35c895db8ab714c90a712`
- Post-work backup: to be recorded after commit and exact ref/blob verification.
