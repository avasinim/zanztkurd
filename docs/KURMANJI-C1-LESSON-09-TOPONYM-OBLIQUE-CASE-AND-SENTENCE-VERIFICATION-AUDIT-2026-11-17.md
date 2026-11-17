# Course 1 Lesson 09 — Toponym inflection and sentence verification audit

Date: 2026-11-17  
Repository: avasinim/zanztkurd  
Working branch: fix/kurmanji-ci-current-migration  
Baseline HEAD: 08b366a2788adfd29ff06f0e414cb2eab29654b1  
Pre-work backup: backup/c1-l09-toponym-oblique-case-before-2026-11-17  
Scope: exact Lesson 09 place-name forms Amedê and Qamişloyê and the two example clauses. Proposal-only; no lesson or seed content changed.

## 1. Executive finding

The two place-name inflections in Lesson 09 are grammatically well supported:

- `Amed` → `Amedê` after `li`.
- `Qamişlo` → `Qamişloyê` after `ji`, because the place name ends in a vowel and the feminine singular oblique form uses `-yê` after a vowel.

The exact forms are explicitly listed in a current Kurmanji grammar guide updated 24 October 2026: `ji Amedê`, `li Swêdê`, and `ji Qamişloyê`. Thackston's reference grammar independently supports the underlying morphology: town/city/country names are generally feminine; feminine singular oblique forms take `-ê`, or `-yê` after a vowel; and prepositions normally take oblique complements.

**Important evidence distinction:** these sources verify the place-name forms and the relevant grammatical pattern. They do not independently attest the exact full sentences `Ez li Amedê dijîm` and `Ez ji Qamişloyê me` as verbatim quotations. The sentences are structurally plausible teaching examples, but should be tagged as adapted/instructor-created unless a source for each full clause is located.

## 2. Exact repository artifacts inspected

| Artifact | Blob SHA | Relevant content |
|---|---|---|
| `docs/kurmanji-content-seed-part-02.sql` | `aa5af4960256ee56955f0904c073c49bcc54a629` | Draft Course 1 Lesson 09 payload and exact two clauses |
| `docs/KURMANJI-COURSE-1-LESSONS-07-12-CLAIM-LEVEL-EVIDENCE-REGISTER-2026-11-16.md` | Existing register | C1-L09-03 through C1-L09-07 distinguish toponym, inflection, clause and Sorani gloss evidence |

The seed is a checked-in draft SQL file, not proof of live database content. It was read as text only; no SQL was executed.

## 3. Primary grammar evidence

### 3.1 Kurdi School — explicit forms

The Kurdi School Kurmanji grammar page (page states updated 24 October 2026) explicitly says:

- after `ji` (“from”) and `li` (“in”), a place name takes `-ê`;
- if the name ends in a vowel, add `-yê`;
- examples: `ji Amedê`, `li Swêdê`, and `ji Qamişloyê`.

It also gives the copular endings after consonants and vowels, including `kurd im` and `mamoste me`.

Source: https://kurdischool.com/grammar.html  
Relevant page lines in the retrieved version: 109–125 (copula and place names).

This is direct support for the two exact inflected toponyms and their preposition pairings. It is a pedagogical grammar resource, not a peer-reviewed dialect survey; use it as explicit corroboration, not as proof that all dialects and all place names behave identically.

### 3.2 Thackston — independent morphological rule

W. M. Thackston, *Kurmanji Kurdish: A Reference Grammar with Selected Readings*:

- §1.1, printed p. 7: as a rule, names of towns, cities and countries are feminine.
- §1.2, printed pp. 7–8: feminine singular nouns take oblique `-ê`; when the noun ends in a vowel, the form is `-yê` (with some stated spelling/morphological variants).
- §8, printed pp. 19–21: prepositions normally take nouns and pronouns in the oblique case.

Source PDF: https://kurdshop.net/content/upload/1/root/kurmanji-complete.pdf  
Retrieved text locations: lines 688–713 (gender and oblique inflection), 1500–1503 (preposition + oblique complement).

This independently supports the grammatical derivation of `Amedê` and `Qamişloyê`. Thackston does not list those two exact place-name forms in the passages inspected.

### 3.3 Scope and variation

The rule is a standard grammatical generalization, not permission to mechanically inflect every proper name without checking its established form, gender, local usage or language-specific spelling. The lesson itself correctly says that names may have different forms across languages and contexts. Preserve that caution.

## 4. Claim-by-claim assessment

| Claim | Status | Reason |
|---|---|---|
| `Amed` has the oblique form `Amedê` after `li` | DIRECTLY ATTESTED | Explicitly listed as `li Amedê` in Kurdi School |
| `Qamişlo` has the oblique form `Qamişloyê` after `ji` | DIRECTLY ATTESTED | Explicitly listed as `ji Qamişloyê` in Kurdi School |
| The `-ê / -yê` alternation follows feminine singular oblique morphology | INDEPENDENTLY CORROBORATED | Thackston §1.1–1.2 |
| Prepositional complements normally take oblique case | INDEPENDENTLY CORROBORATED | Thackston §8 |
| `Ez li Amedê dijîm.` is a verbatim source quotation | NOT VERIFIED | The exact full clause was not located in the sources inspected |
| `Ez ji Qamişloyê me.` is a verbatim source quotation | NOT VERIFIED | The exact full clause was not located in the sources inspected |
| Both clauses are structurally plausible beginner examples | SUPPORTED, WITH PROVENANCE QUALIFICATION | Inflected place names and relevant prepositions are supported; exact full clauses remain unquoted examples |
| Sorani glosses «من لە ئەمید دەژیم» and «من خەڵکی قامشلۆم» are editorially certified | NOT YET | Requires native Sorani copy-edit; source grammar does not certify Sorani phrasing |

## 5. Recommended editorial disposition — proposal only

1. Retain `Amedê` and `Qamişloyê`; their morphology is supported.
2. Keep the explanation that `li` and `ji` take an oblique complement in these place expressions.
3. Do not describe the forms as arbitrary spelling changes. Explain the feminine singular oblique ending and the `-yê` form after a vowel, at a beginner-appropriate level.
4. Keep the two full clauses as teaching examples only if their internal provenance is labelled “adapted” or “instructor-created,” not as verbatim citations.
5. Have a Kurmanji speaker check naturalness and dialect fit of `dijîm` in the first clause and the copular construction `... me` in the second.
6. Have a native Sorani editor review both translations.
7. Retain the lesson's warning that place names may have different conventional forms across languages and administrative contexts. Do not assert that Amed/Diyarbakır or Qamişlo have universally interchangeable labels in every context.

## 6. Actions not taken

No lesson body, seed SQL, migration, schema, static page, application code, validator, test, database, PR #3, main branch, merge state or deployment was changed. No SQL was executed. No live database was accessed. This is a documentation-only audit.

## 7. References

1. Kurdi School. “Kurmanji grammar.” Updated 24 October 2026. https://kurdischool.com/grammar.html
2. Thackston, W. M. *Kurmanji Kurdish: A Reference Grammar with Selected Readings*. §1.1–1.2, pp. 7–8; §8, pp. 19–21. https://kurdshop.net/content/upload/1/root/kurmanji-complete.pdf

## Backup record

- Pre-work backup: `backup/c1-l09-toponym-oblique-case-before-2026-11-17`
- Baseline SHA: `08b366a2788adfd29ff06f0e414cb2eab29654b1`
- Post-work backup: `backup/c1-l09-toponym-oblique-case-after-2026-11-17` (points to the final documentation commit after verification).
