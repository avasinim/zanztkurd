# Course 1 (Kurmanji) — integrated 26-lesson editorial and source action register
**Date:** 2026-11-16  
**Branch:** `fix/kurmanji-ci-current-migration`  
**Status:** Documentation-only synthesis; no lesson content approved or changed.

## 1. Purpose and limits

This register consolidates the existing source reviews for Course 1 lessons 01–26:
- `KURMANJI-LESSONS-01-06-ENRICHMENT-SOURCE-REVIEW-2026-11-16.md`
- `KURMANJI-LESSONS-07-12-SOURCE-REVIEW-2026-11-16.md`
- `KURMANJI-LESSONS-13-18-SOURCE-REVIEW-2026-11-16.md`
- `KURMANJI-LESSONS-19-24-SOURCE-REVIEW-2026-11-16.md`
- `KURMANJI-LESSONS-25-26-SOURCE-REVIEW-2026-11-16.md`

It is an editorial action register, not a new independent linguistic certification. It does not imply every example, gloss, or claim has been checked against a primary source. A source-supported central rule does not automatically validate every sentence in that lesson.

**Preservation:** no lesson body, Latin Kurmanji form, seed SQL, migration, static wrapper, application code, schema, database, `main`, PR #3, or deployment was changed for this register. Recommendations below require review and approval before implementation.

## 2. Lesson-by-lesson status

| Lesson | Topic | Evidence status | Outstanding action |
|---:|---|---|---|
| 01 | Language, alphabet, orthography, dialect | Partial; broad concepts supported, new definitions/examples not yet claim-level verified | Record exact source sections for each definition/example; do not invent page numbers |
| 02 | Hawar alphabet and letter classes | Inventory corroborated; technical collation advice not sourced linguistically | Keep 31 graphemes / 8 vowel letters / 23 consonant letters distinct from phoneme inventory; cite Unicode/collation documentation for digital sorting claims |
| 03 | Vowels and IPA | Core eight-letter/IPA/example table corroborated | Kurdish/Sorani glosses need native editorial review; retain phonetic/dialect caveats |
| 04 | Consonants and IPA | Partial; broad correspondences supported | Resolve RR row: phonetic tap/trill distinction does not prove RR is a Hawar alphabet letter or universal spelling; separate sound from orthography |
| 05 | Five marked Hawar letters | Core teaching point corroborated | Native review of Sorani glosses; preserve diacritics |
| 06 | Reading and writing simple words | Core forms and IPA substantially corroborated | Review Sorani gloss `qul` (“hole/opening”) for ambiguity; retain cautious `r/rr` wording |
| 07 | Common words and phrases | Main forms corroborated | Set a consistent editorial style for `Rojbaş/Roj baş`; review Sorani glosses and regional variants |
| 08 | Writing vs pronunciation | Core concept supported | Keep aspiration distinct from pharyngealization; scope /pˤ/ and related features by dialect |
| 09 | Personal and place names | Principle supported; some inflected examples partial | Specialist-check `Ez li Amedê dijîm` and `Ez ji Qamişloyê me`; do not treat toponyms as universally interchangeable |
| 10 | Beginner expressions | Strong phrase-level support | Preserve `Rojbaş/Êvarbaş/Şevbaş` time distinctions; confirm singular addressee scope and `Biborîne` spelling/pragmatics |
| 11 | Personal pronouns | Core direct/oblique paradigm corroborated | Do not equate direct with subject or oblique with object; clarify copular forms and `xwe` coreference |
| 12 | Demonstratives | `ev/ew` and standard oblique paradigm corroborated | Make clear that direct-only table is introductory; dialectal noun-phrase marking varies |
| 13 | Cardinal numbers | Core vocabulary broadly corroborated | Verify object marking and duration morphology in the example sentences; check variants |
| 14 | Colours | Basic colour vocabulary corroborated | Verify object inventory, locative/object marking and full sentence morphology |
| 15 | Family vocabulary | Core kinship terms and possessive phrases supported | Clarify `kal` meaning/variety; standardize `dayika/dayîka` only after house-style decision |
| 16 | Weekdays and time | Weekday names/time words corroborated | Verify `doh` in intended temporal sense and check example sentence grammar |
| 17 | Present-tense verbs | Regular `di-` pattern and main examples supported | Keep regular verbs distinct from irregular stems and compound `hîn bûn`; check each inflected form |
| 18 | Negation | Present `na-` pattern supported | Add `karîn → nikarim` to exception review; clarify imperative, copular and existential negation by variety |
| 19 | Questions | Core question words and wh-in-situ supported | Include/defer `kî/kê` case contrast; distinguish `çend` from `çiqas`; check `têyî` example |
| 20 | Word order | Neutral SOV tendency supported | Describe SOV as default, mention goal/recipient (SOVG) and information structure; verify focus/fronting example |
| 21 | Adjectives and ezafe | Postnominal adjective + ezafe strongly supported | Verify feminine indefinite `maleke biçûk`; explain ezafe agreement on head noun separately from case |
| 22 | Comparative/superlative | `-tir`, `ji`, `herî`, `-tirîn` supported | Label variants; distinguish “older” from “bigger”; preserve superlative word-order difference |
| 23 | Nouns and determiners | `-ek`, case and demonstrative paradigms supported | Qualify “no definite suffix” as standard-variety statement; mention restricted Şemzînan exception; don't reduce oblique to object |
| 24 | Possession | Oblique possessor + ezafe supported | Separate linking ezafe from free `yê/ya/yên`; clarify `birayê min ê mezin` segmentation and gloss |
| 25 | Direct and oblique case | Core paradigms and present/past transitive contrast strongly corroborated | Preserve zero-marking/ezafe/dialect caveats; qualify past agreement; Sorani explanations need editor |
| 26 | Final review/self-assessment | Review structure and most orthographic contrasts supported | Explain `rr` as convention/digraph, not extra Hawar letter; independently verify any minimal pair; copy-edit Sorani |

## 3. Consolidated action register

### Priority A — resolve before claiming the course is source-verified

1. **RR / R orthography vs phonetics (lessons 04, 06, 08, 26).** Separate the phonetic tap/trill contrast from the alphabet inventory and spelling convention. The University of Arizona page's prose says `rr` can represent a trill, but its table labels `rr` while showing `roj` with one `r`. This internal inconsistency means that row cannot be decisive evidence for the spelling of `roj`. Do not add a minimal pair or change `roj` without a second reliable source and editor approval.
2. **Case and alignment consistency (lessons 11, 19–25).** Use direct/oblique terminology consistently. Do not simplify to subject/object or nominative/accusative. Preserve the split-ergative past-transitive pattern and qualify agreement and dialectal variation.
3. **Ezafe and noun phrase consistency (lessons 21, 23–25).** Distinguish head-noun ezafe agreement (gender/number) from case marking; separate bound linking ezafe from free/demonstrative ezafe; qualify noun suffix and definiteness claims by variety.
4. **Dialect and variety scope (lessons 08–10, 12–18, 21–25).** State the intended reference variety for forms where the reviewed sources record regional alternatives. Do not label legitimate variants as errors.
5. **Unsourced or only partially verified examples (lessons 01, 09, 13–16, 19–21, 25–26).** Obtain specialist confirmation for the exact inflected sentences, not merely the general grammar rule that resembles them.

### Priority B — Kurdish/Sorani language-editor pass

A native editor should review Sorani glosses, spelling, punctuation, and explanatory terminology across all 26 lessons. Specific flagged examples include:
- L03 vowel-table glosses; L06 `qul`.
- L07–10 greetings, addressee number, and place/name spellings.
- L13–16 numbers, colours, kinship, time expressions and sample clauses.
- L19–24 question glosses, fronting example, adjective/comparative translations, noun phrase and possession segmentation.
- L25–26 case explanations and final-review wording.

This is a separate editorial task from validating Kurmanji grammar. Do not automatically normalize spellings such as `نوسین/نووسین`, `ڕون/ڕوون`, `پەیویست/پێویست`, or doubled letters until the project's canonical Sorani house style is explicitly selected.

### Priority C — editorial consistency and pedagogy

- Keep a glossary for technical terms: letter/grapheme, sound/phoneme, direct/oblique, ezafe, ergativity, aspiration, pharyngealization, and focus.
- Mark examples as attested, adapted, or instructor-created. Do not present a plausible pedagogical example as a verbatim citation.
- Label regional variants as variants and identify the intended standard only where the owner/editor has selected one.
- Keep self-assessment clearly informal; it is not a proficiency certificate.
- Keep all Latin Kurmanji spellings intact unless a source-based correction is separately proposed and approved.

## 4. Data integrity and release blockers (separate from lesson science)

The source-review series does **not** resolve the seed/migration mismatch:
- The discrepancy report records 12 non-identical lesson payloads across the migration and split seeds, including Course 1 lessons 01–06, 10 and 25.
- The historical migration is an older snapshot; later split-seed enrichments have separate Git provenance. Neither copy should be silently overwritten by the other.
- The migration header's claim of exact synchronization is contradicted by the discrepancy report. The older release-audit document contains historical parity statements; use the dated discrepancy review and current validator result rather than treating stale prose as current proof.
- Course 1 source review is not a database migration test, a live-site test, or proof of lesson access, RLS/enrollment rules, progression, or progress persistence.

Release remains blocked until all separate gates are passed:
1. Owner/editor approves canonical content and Sorani style decisions.
2. All 38 lesson bodies across both courses receive the required source/editor review (Course 2 is outside this 26-lesson register).
3. Seed/migration parity is reconciled explicitly and the exact validator passes.
4. Migration and RPC behavior are tested in a disposable PostgreSQL/Supabase-compatible environment.
5. Signed-out, unenrolled, enrolled, owner, prerequisite progression, and completion persistence flows pass end-to-end tests.
6. Only after the above may PR readiness be reconsidered. Production DB, merge, and deployment still require the owner's explicit authorization.

## 5. Recommended next work sequence

1. Owner/editor decisions: reference variety, Sorani house style, RR treatment, and canonical content source for each divergent seed/migration row.
2. Kurmanji specialist pass for the Priority A examples and morphology.
3. Native Sorani copy-edit across all 26 lessons.
4. Prepare a proposal-only correction sheet with exact before/after snippets and citations; do not apply edits automatically.
5. Separately continue Course 2's 12-lesson source review and technical release-gate tests.

## 6. Source-review records and references

The five detailed review records listed in section 1 contain the lesson-level findings and bibliographies. Key references repeatedly used include:
- Haig, Geoffrey (2018), “Northern Kurdish (Kurmanjî),” *The Languages and Linguistics of Western Asia: An Areal Perspective*.
- Haig & Öpengin (2018), “Northern Kurdish (Kurmanjî)” and work on Kurdish gender/case.
- University of Arizona, Iranian Languages, “Kurmanji Kurdish” (phonology, orthography, pronouns and grammar).
- Thackston, W. M., *Kurmanji Kurdish: A Reference Grammar with Selected Readings*.
- Gündoğdu, work on Kurmanji negation and ezafe.
- Baker & Atlamaz (2014), “On the Relationship of Case to Agreement in Split-Ergative Kurmanji and Beyond.”
- Yari Kurmanji phrase guide and dictionary for beginner expressions and lexical cross-checks.

## 7. Final disposition

**Course 1 lessons 01–26: reviewed, not certified for release.** The central teaching points in many lessons are supported, but several examples, dialect-sensitive forms, RR orthography, and Sorani glosses remain open. The register is intended to prevent those distinctions from being lost and to ensure future edits are deliberate, traceable, and approved.

No teaching content or production resource was changed in creating this register.
