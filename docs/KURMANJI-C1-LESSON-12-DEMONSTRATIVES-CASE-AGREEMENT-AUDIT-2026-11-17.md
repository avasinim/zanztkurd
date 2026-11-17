# Course 1 Lesson 12 — demonstratives, case and noun agreement audit

Date: 2026-11-17  
Repository: avasinim/zanztkurd  
Working branch: fix/kurmanji-ci-current-migration  
Baseline HEAD: 80f7b8915d86002969ee6cfe2457f4786479baa5  
Pre-work backup: backup/c1-l12-demonstratives-before-2026-11-17  
Scope: exact Course 1 Lesson 12 seed payload; proximal/distal demonstratives, independent pronoun versus noun-modifying determiner, oblique forms, noun case concord and dialectal clitics. Proposal-only; no lesson or seed content changed.

## 1. Executive finding

The lesson correctly introduces the central Standard Kurmanji contrast:

- `ev` = proximal “this/these”;
- `ew` = distal “that/those”.

It also correctly notes that `ew` can function as a third-person personal pronoun and that the intended interpretation depends on context and clause structure. The lesson's distinction between independent demonstratives (`Ev baş e.`) and noun-modifying demonstratives (`ev pirtûk`) is pedagogically useful.

However, the lesson is **not a complete demonstrative lesson yet**. It only teaches the direct forms `ev/ew` and omits the standard oblique paradigm:

| Distance | Direct | Oblique masculine singular | Oblique feminine singular | Oblique plural |
|---|---|---|---|---|
| Proximal | ev | vî | vê | van |
| Distal | ew | wî | wê | wan |

The omission is significant because the oblique demonstrative does not merely replace the direct demonstrative: in the Standard Kurmanji noun phrase, the noun also shows a matching oblique ending in the canonical patterns:
- `ji vî mirovî` — from this man;
- `ji wê odeyê` — from that room;
- `ji van mirován` — from these men;
- `Ez wî mirovî dibînim.` — I see that man;
- `Ez wan mirován dibînim.` — I see those men.

The lesson's current exercises therefore ask learners to contrast only `ev/ew`, while leaving out the case-sensitive forms that distinguish Kurmanji demonstratives from a simple two-word “this/that” vocabulary list.

## 2. Exact repository artifact inspected

| Artifact | Blob SHA | Relevant content |
|---|---|---|
| `docs/kurmanji-content-seed-part-02.sql` | `aa5af4960256ee56955f0904c073c49bcc54a629` | Draft Course 1 Lesson 12 payload: direct ev/ew, independent vs noun-modifying use, four teaching examples and exercises |
| `docs/KURMANJI-COURSE-1-LESSONS-07-12-CLAIM-LEVEL-EVIDENCE-REGISTER-2026-11-16.md` | `4f43c5c0861669250cc28e8c15ab6f7a4e56637a` | Existing C1-L12 status: ev/ew supported; direct-case introduction only; example verification required |
| `docs/KURMANJI-REFERENCE-VARIETY-EDITORIAL-POLICY-PROPOSAL-2026-11-16.md` | `825d10d0c930a7f59fc7095c0d1b366b8bed4807` | Written target and regional-variation safeguards |

The seed is a checked-in draft SQL file, not proof of live database content. It was read as text only; no SQL was executed.

## 3. Primary grammar evidence

### 3.1 Haig (2018) — Standard Kurmanji demonstrative paradigm

Geoffrey Haig, “Northern Kurdish (Kurmanjî),” in *The Languages and Linguistics of Western Asia: An Areal Perspective*, §2.2.3, Table 10, printed p. 117:

- Direct forms (all gender and numbers): proximal `ev`; distal `ew`.
- Oblique forms:
  - proximal: masculine singular `vî`, feminine singular `vê`, plural `van`;
  - distal: masculine singular `wî`, feminine singular `wê`, plural `wan`.
- Haig explicitly notes considerable dialectal variation.
- He also describes demonstrative clitics attached to nouns in many dialects: singular `-e/-a` and plural `-ene/-ana`. These vary regionally, are not a gender contrast, and attach only when the noun is the final element of the noun phrase; they are absent when the noun is followed by an ezafe modifier.

The chapter's “Standard Kurmanjî” sketch is loosely based on Cizre/Botan in southeastern Turkey; the source separately describes regional variation. It must not be cited as a universal description of every Kurmanji variety.

Source PDF: https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf  
Retrieved lines: 714–780 (pronouns and demonstrative table); 786–812 (noun-phrase structure); 966–1035 (case of demonstrative-led ezafe phrases).

### 3.2 Thackston — noun endings echo demonstrative case

W. M. Thackston, *Kurmanji Kurdish: A Reference Grammar with Selected Readings*, §2, printed pp. 9–10:

- Attributive `ev` and `ew` modify both singular and plural nouns and do not distinguish gender in the direct case.
- In the oblique, `ev` becomes `vî` with masculine singular nouns, `vê` with feminine singular nouns, and `van` with plural nouns.
- `ew` becomes `wî`, `wê`, and `wan` in the corresponding oblique categories.
- The noun echoes the demonstrative ending: masculine singular `-î`, feminine singular `-ê`, plural `-an`.
- Source-attested examples include `ev miróv` (“this man / these men”), `ji vî miróvî` (“from this man”), `ji van mirován` (“from these men”), `Ez wî miróvî dibînim` (“I see that man”), `ew odé` (“that room / those rooms”), `ji wê odéyê` (“from that room”), and `ji wan odeyán` (“from those rooms”).

Source PDF: https://kurdshop.net/content/upload/1/root/kurmanji-complete.pdf  
Retrieved lines: 799–847 and 860–867.

### 3.3 Demonstratives as independent pronouns and as noun modifiers

Haig's noun-phrase analysis places a demonstrative before the noun, numeral, ezafe, possessor and adjective sequence. His examples include:
- `ev sê kumên min yên reş` — “these three black hats of mine” (Haig §2.3, Table/sequence example);
- `ev riya ku tu didî pêşiya me` — “this road that you make us take” (Haig example 7);
- `wan çiyayên bilind` — “those high mountains” in an oblique-governed noun phrase (Haig example 12).

Thackston's `Ev mekteb e.` (“This is the school”) demonstrates an independent/equational use in his grammar's own terminology. These sources support teaching the syntactic distinction, but the lesson should avoid implying that the demonstrative's form itself changes merely because it is a pronoun rather than a determiner. The key contrast is whether it stands independently or modifies a noun; case then determines the direct/oblique form.

Sources: Haig §2.3, lines 786–812, 864–894, 984–1035; Thackston §1, lines 745–756 and §2, lines 799–847.

## 4. Claim-by-claim assessment

| Current Lesson 12 claim/example | Status | Finding |
|---|---|---|
| `ev` = proximal “this” | SUPPORTED | Correct direct-case proximal form in Standard Kurmanji. |
| `ew` = distal “that” | SUPPORTED | Correct direct-case distal form in Standard Kurmanji. |
| `ev/ew` direct forms do not distinguish gender/number | SUPPORTED WITH SCOPE | Haig's Standard Kurmanji paradigm labels the direct forms all-gender/all-number; dialectal variation must be noted. |
| `ew` also functions as a third-person personal pronoun | SUPPORTED | Haig says third-person pronouns are basically distal demonstratives; direct `ew` can be he/she/it/they depending on context and agreement. |
| `Ev baş e.` as independent demonstrative | PLAUSIBLE; EXAMPLE PROVENANCE MUST BE LABELLED | The syntactic function is sound as an instructional illustration, but this exact sentence was not located as a verbatim source quotation in the inspected primary grammars. |
| `Ew baş e.` as independent demonstrative | PLAUSIBLE; EXAMPLE PROVENANCE MUST BE LABELLED | Same status as above; the translation “ئەوە باشە / ئەو باشە” is context-sensitive. |
| `ev pirtûk` as noun-modifying demonstrative | SUPPORTED AS A STRUCTURE; EXACT EXAMPLE IS INSTRUCTOR-CREATED | The determiner + noun order is supported by Haig's NP structure; this exact lexical pair was not verified as a quoted example. |
| `Ew mal mezin e.` as noun-modifying demonstrative | PARTIAL; WHOLE SENTENCE NEEDS NATIVE REVIEW | The direct demonstrative + noun construction is structurally plausible, but the full sentence and its segmentation/gloss were not found verbatim in the primary sources. Check whether the intended reading is “that house is big” and whether the predicate is parsed separately from an attributive adjective phrase. |
| The lesson distinguishes demonstrative pronoun from demonstrative determiner | SUPPORTED AS A PEDAGOGICAL DISTINCTION | Retain; explain it as syntactic function, not a separate inflectional paradigm. |
| The lesson's demonstrative table contains all relevant forms | INCOMPLETE | It contains only direct `ev/ew`; standard oblique forms `vî/vê/van` and `wî/wê/wan` are missing. |
| The lesson explains how oblique demonstratives interact with nouns | MISSING | In Standard Kurmanji, canonical oblique demonstrative NPs show matching noun endings: `vî mirovî`, `wê odeyê`, `van mirován`. |
| Demonstrative noun clitics `-e/-a`, `-ene/-ana` | NOT TAUGHT; OPTIONAL ADVANCED NOTE | Haig documents these in most dialects but emphasizes their distribution and regional variation. Do not add them as universal suffixes in a beginner table. |

## 5. Editorial resolution — proposal only

1. Retain the direct contrast `ev` = proximal and `ew` = distal.
2. Add the Standard Kurmanji oblique comparison table:
   - proximal: `vî / vê / van`;
   - distal: `wî / wê / wan`.
3. Label columns explicitly by grammatical case, gender and number. Explain that the masculine/feminine contrast appears in the singular oblique forms; plural oblique has one form in each distance series.
4. Add no more than three fully sourced noun-phrase examples initially:
   - `ji vî mirovî` — from this man;
   - `ji wê odeyê` — from that room;
   - `ji van mirován` — from these men.
   If an example is copied from a source, preserve its exact spelling and citation; do not silently normalize its accents.
5. Add one present-tense object example, `Ez wî mirovî dibînim.` — “I see that man,” to show that oblique demonstratives are used in an actual clause, not only after `ji`.
6. Keep the independent demonstrative vs noun-modifying demonstrative distinction. Use a simple diagram:
   - independent: `Ev baş e.`;
   - before noun: `ev pirtûk`.
   Mark both as instructor-created unless the exact strings are sourced. Have a native Kurmanji reviewer confirm idiomaticity and the Sorani glosses.
7. Recheck `Ew mal mezin e.` with a native editor. Keep it only if the intended parse is clear and it is natural in the selected reference variety. If it is meant to illustrate an attributive adjective (“that big house”), use a source-checked ezafe construction; do not improvise its ending.
8. Add a short warning that the direct form `ew` overlaps with the third-person pronoun. Translation depends on discourse, number agreement and whether the word is demonstrative or anaphoric.
9. Do not introduce `-e/-a` or `-ene/-ana` into the core beginner paradigm. If retained as an optional regional note, say these are dialectal noun clitics, not universal gender endings, and explain the final-element condition.
10. State clearly that the table describes the Standard Kurmanji reference paradigm in Haig/Thackston, not every local dialect. Preserve any regional variant with its source and label.
11. Expand the exercises to test both distance and case: learners identify whether a phrase is direct or oblique, select the right proximal/distal form, and identify the matching noun ending.
12. Keep Sorani translation editing separate from Kurmanji grammatical validation.

## 6. Release decision

**Status: NOT RELEASE-CERTIFIED; core direct contrast is correct, but the lesson is materially incomplete for case-sensitive demonstratives.**

The lesson should remain a beginner introduction, not become an exhaustive chapter on deictic morphology. The minimum release-strengthening package is:
- include the six standard oblique forms;
- show demonstrative–noun case concord in a few source-attested examples;
- retain the independent-pronoun vs noun-modifier distinction;
- label instructor-created sentences honestly;
- scope the paradigm to the chosen Standard Kurmanji reference and avoid presenting dialectal clitics as universal.

## 7. Actions not taken

No lesson body, seed SQL, migration, schema, static page, application code, validator, test, database, PR #3, main branch, merge state or deployment was changed. No SQL was executed. No live database was accessed. This is a documentation-only audit.

## 8. References

1. Haig, Geoffrey (2018). “Northern Kurdish (Kurmanjî).” In *The Languages and Linguistics of Western Asia: An Areal Perspective*, pp. 106–158. §2.2.3, Table 10, printed p. 117; §2.3, printed pp. 118–120. https://doi.org/10.1515/9783110421682-004 and author PDF https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf
2. Thackston, W. M. *Kurmanji Kurdish: A Reference Grammar with Selected Readings*. §2, printed pp. 9–10. https://kurdshop.net/content/upload/1/root/kurmanji-complete.pdf
3. Haig, Geoffrey & Ergin Öpengin (2018). “Kurmanjî Kurdish in Turkey: Structure, varieties and status.” §3.2.5, printed pp. 175–176. https://www.uni-bamberg.de/fileadmin/aspra/06_Team/Publications_and_CV/HaigOepengin2018_Kurmanji_Kurdish_.pdf

## Backup record

- Pre-work backup: `backup/c1-l12-demonstratives-before-2026-11-17`
- Baseline SHA: `80f7b8915d86002969ee6cfe2457f4786479baa5`
- Post-work backup: to be recorded after commit and exact ref/blob verification.
