# Course 1 Lesson 11 — personal pronouns, case roles and agreement audit

Date: 2026-11-17  
Repository: avasinim/zanztkurd  
Working branch: fix/kurmanji-ci-current-migration  
Baseline HEAD: 27e7def5219c06bb700ca6eba1277a1717d5577c  
Pre-work backup: backup/c1-l11-pronoun-case-before-2026-11-17  
Scope: exact Lesson 11 direct/oblique pronoun tables, copular examples, pronoun functions, and reflexive xwe. Proposal-only; no lesson or seed content changed.

## 1. Executive finding

The core Standard Kurmanji personal-pronoun paradigm in Lesson 11 is correct:

| Person | Direct | Oblique |
|---|---|---|
| 1 singular | ez | min |
| 2 singular | tu | te |
| 3 singular | ew | wî (masculine) / wê (feminine) |
| 1 plural | em | me |
| 2 plural | hûn | we |
| 3 plural | ew | wan |

This exact paradigm is independently given by Haig (2018, §2.2.3, Table 9) and Thackston (§7, printed pp. 17–19). The lesson already includes an important caution that direct/oblique is not reducible to a simple subject/object distinction. That caution must be retained and made more concrete.

The most important gap is **functional coverage**. The current examples show oblique pronouns only as a possessor (`navê min`) and prepositional complement (`bi te re`). They do not show the other core functions:
- object of a present-tense transitive verb;
- agent of a past-tense transitive verb;
- contrast with the direct patient of that past-tense transitive verb;
- direct subject of a past-tense intransitive verb.

A second material issue is the current copula explanation. It says forms such as `im`, `î`, `ye`, and `in` may vary according to the final letter of the noun/adjective and sentence arrangement. This is not a safe explanation. In the displayed Standard Kurmanji paradigm, the copula primarily indexes person/number and the clause's predicate structure; it should not be taught as a general final-letter rule.

The reflexive `xwe` explanation is broadly correct but too loose. It should state same-clause subject coreference and distinguish its invariant form from the person/number interpretation supplied by its antecedent. The current example is suitable as a starting point.

## 2. Exact repository artifact inspected

| Artifact | Blob SHA | Relevant content |
|---|---|---|
| `docs/kurmanji-content-seed-part-02.sql` | `aa5af4960256ee56955f0904c073c49bcc54a629` | Draft Course 1 Lesson 11 full payload, including tables, six copular examples, oblique table and xwe example |
| `docs/KURMANJI-COURSE-1-LESSONS-07-12-CLAIM-LEVEL-EVIDENCE-REGISTER-2026-11-16.md` | `4f43c5c0861669250cc28e8c15ab6f7a4e56637a` | C1-L11-01 through C1-L11-06, existing claim statuses and unresolved actions |
| `docs/KURMANJI-38-LESSON-EVIDENCE-GAP-AND-RELEASE-PRIORITY-MATRIX-2026-11-17.md` | `86c1333f89aa79b219c1d19635af594268787978` | Course-wide release priority and case/ergativity safeguard |

The seed is a checked-in draft SQL file, not proof of live database content. It was read as text only; no SQL was executed.

## 3. Primary grammar evidence

### 3.1 Haig (2018) — Standard Kurmanji paradigm and scope

Geoffrey Haig, “Northern Kurdish (Kurmanjî),” in *The Languages and Linguistics of Western Asia*, pp. 106–158, §2.2.3, Table 9 (printed p. 117):

- Direct singular: `ez, tu, ew`.
- Oblique singular: `min, te, wî (masculine) / wê (feminine)`.
- Direct plural: `em, hûn, ew`.
- Oblique plural: `me, we, wan`.
- Haig notes that third-person pronouns are basically the distal demonstratives.
- `xwe` is invariant for person and number; it is used as a pronoun or possessor when coreference with the subject of the same clause is intended.

The chapter explicitly states that its Standard Kurmanji sketch is loosely based on Cizre/Botan in southeastern Turkey; the chapter separately discusses dialect variation. Do not present this paradigm as an exhaustive description of every regional variety.

Source: https://www.researchgate.net/publication/329393116_23_Northern_Kurdish_Kurmanji_An_Areal_Perspective  
Retrieved text: lines 169–176 (variety scope), 296–318 (Standard Kurmanji basis), 1156–1209 (pronoun table and xwe).

### 3.2 Thackston — syntactic functions of the oblique

W. M. Thackston, *Kurmanji Kurdish: A Reference Grammar with Selected Readings*, §7, printed pp. 17–19:

- Nominative/direct pronouns occur as subjects of equational clauses, present-tense verbs and past-tense intransitive verbs.
- They also occur as patients of past-tense transitive verbs.
- Oblique pronouns occur as possessors in construct/ezafe phrases, direct objects of present-tense verbs, complements of prepositions/circumpositions, and agents of past-tense transitive verbs.
- The examples include `Tu min dibînî?` (“Do you see me?”), `Ez te dibînim` (“I see you”), `Em nikarin wan bibînin` (“We cannot see them”), `Te ez dîtim` (“You saw me”), and `Min ew dîtin` (“I saw them”).
- §7.1 says `xwe` has no person/number of its own; its interpretation is determined by the subject of the clause. It is required for coreferential reflexive/possessive reference to that subject.

Source: https://www.academia.edu/7363808/Kurmanji_Kurdish_A_Reference_Grammar_with_Selected_Readings  
Retrieved text: §7, printed pp. 17–18, lines 93–100.

### 3.3 Cross-check — University of Arizona Iranian Languages

The University of Arizona Kurmanji overview independently gives the same nominative/oblique paradigm and states that oblique pronouns occur in prepositional phrases, possessive constructions and as objects in the present tense; nominative forms serve as present-tense subjects. Its summary is useful corroboration, while the detailed past-transitive examples above are more fully documented in Thackston and Haig.

Source: https://iranian-languages.arizona.edu/node/7  
Search-result text was available; page open returned a server error during this review. Do not rely on it as the only evidence.

## 4. Claim-by-claim assessment

| Current Lesson 11 claim/example | Status | Finding |
|---|---|---|
| Direct paradigm `ez, tu, ew, em, hûn, ew` | SUPPORTED | Matches Haig Table 9 and Thackston §7. |
| `ew` can mean singular “he/she/it” or plural “they” | SUPPORTED WITH SCOPE | Number is resolved by context and agreement; third-person forms are historically/structurally related to distal demonstratives. |
| Oblique paradigm `min, te, wî/wê, me, we, wan` | SUPPORTED | Exact Standard Kurmanji paradigm corroborated. |
| Gloss `wî / wê` simply as “ـی ئەو” | PARTIAL / TOO NARROW | These are third-person singular oblique forms, not merely possessive suffix equivalents. They also occur as present-tense objects, prepositional complements and past-transitive agents. |
| `navê min` = “my name” | SUPPORTED | Oblique `min` is a possessor in a construct/ezafe phrase. |
| `bi te re` = “with you” | SUPPORTED | Oblique `te` is the complement of a preposition/circumposition. |
| Oblique pronouns occur in some verbal constructions and are not limited to past tense | SUPPORTED, NEEDS WORKED EXAMPLES | Correct but abstract. Add a present-tense object and past-transitive agent example, clearly labelled. |
| Direct = subject / Oblique = object | REJECTED AS A GENERAL RULE | Direct pronouns also serve as patients of past-transitive verbs; oblique pronouns serve as agents in canonical past-transitive clauses. |
| `im, î, ye, in` vary according to final letter of noun/adjective | MISLEADING / REWRITE REQUIRED | Do not teach a broad final-letter conditioning rule. Present the forms as copular agreement forms associated with person/number and predicate construction; scope any dialect-specific morphology separately. |
| `Ew hevalên min in.` translates “They are my friends” | SUPPORTED, WITH AGREEMENT EXPLANATION | `ew` is plural here; the plural copula `in` makes the intended number clear. |
| `xwe` refers to the clause subject | SUPPORTED WITH SYNTACTIC SCOPE | Say same-clause subject coreference; do not imply that every possessive referring to a subject can freely use `min/te/wî`. |
| `Ez ji dayika xwe hez dikim.` | STRUCTURALLY CONSISTENT; NATURALNESS REVIEW ADVISED | The intended same-clause subject reference is clear; Sorani gloss and local idiomatic preference need separate review. |
| Exercise asks only for `ez/tu/em` direct/oblique pairs | INCOMPLETE | It omits the third-person gender distinction `wî/wê`, plural `wan`, and core verbal functions. |

## 5. The central case distinction — worked evidence

The following source-attested examples make the case roles visible without inventing new sentences:

| Example | Form/function | Why it matters |
|---|---|---|
| `Ez kurd im.` | Direct `ez`: equational subject | Direct is not merely “the object-free form”; it is the normal subject form in this clause. |
| `Ew wî mirovî dibîne.` | Direct `ew`: present subject; oblique `wî`: present object | Demonstrates the two cases in one present-tense clause. |
| `Tu min dibînî?` | Direct `tu`: present subject; oblique `min`: present object | Confirms that oblique object marking is not restricted to past tense. |
| `Min tu dîtî.` | Oblique `min`: past-transitive agent; direct `tu`: patient | Direct is not synonymous with “agent” or “subject.” |
| `Wî em dîtin.` | Oblique `wî`: past-transitive agent; direct `em`: patient | Shows the third-person masculine oblique form in a verbal role. |
| `Em rûniştin.` | Direct `em`: subject of past intransitive verb | Past tense alone does not cause an oblique subject; transitivity matters in the canonical pattern. |
| `kitêba min` | Oblique `min`: possessor | Retains the current lesson's possession example type. |
| `ji wê` / `bi wan re` | Oblique `wê` / `wan`: adpositional complements | Demonstrates feminine singular and plural third-person oblique forms. |

Sources: Haig §2.2.3 and Thackston §7. The exact examples above are source-attested in those grammars; if used in a revised lesson, retain source attribution and check the Sorani translations independently.

## 6. Recommended editorial disposition — proposal only

1. Retain the current direct/oblique table, but explicitly label it as the Standard Kurmanji paradigm used by the course, with a note that regional case marking varies.
2. Keep `wî` and `wê` as masculine/feminine singular oblique forms; keep `wan` as plural oblique. Do not translate the entire oblique column as possessive equivalents.
3. Expand the oblique-functions section into four clearly separated uses: possessor; present-tense object; complement of a preposition/circumposition; agent of a past-tense transitive verb.
4. Add a short contrast: past-transitive agent = oblique, patient = direct; past-intransitive subject = direct in the Standard Kurmanji pattern. Use only the source-attested examples above.
5. Explain that Direct/Oblique are grammatical case forms, not synonyms for subject/object. Subject and object labels depend on clause construction and tense/aspect, and dialectal departures must be noted rather than erased.
6. Replace the sentence that suggests copulas vary by the final letter of nouns/adjectives. Teach `im`, `î`, `ye`, `in` as the person/number forms shown in the paradigm, with the exact scope of predicate agreement verified against the selected standard.
7. Keep `xwe` invariant in form and explain that its referent is interpreted through the subject of the same clause. Add a contrasting example only if sourced and suitable for the learner level.
8. Improve the exercise so learners identify both the form and its syntactic function; include one present-tense object and one past-transitive pair, not only table memorization.
9. Keep the Sorani translation review separate. A Kurmanji grammar source cannot certify the naturalness or orthographic form of the Sorani glosses.
10. Have a native speaker of the selected reference variety review all clauses and copula examples before any lesson patch is proposed.

## 7. Release decision

**Status: NOT RELEASE-CERTIFIED; core paradigm correct, functional explanation incomplete.**

The existing paradigm should not be discarded or rebuilt. The priority is a narrow pedagogical strengthening:
- accurately describe the functional range of oblique pronouns;
- show why Direct/Oblique cannot be collapsed into subject/object;
- clarify transitivity in past-tense clauses;
- correct the copula explanation;
- sharpen the same-clause scope of `xwe`.

The current content is a useful introduction, but its examples do not yet substantiate the breadth of the claims it makes.

## 8. Actions not taken

No lesson body, seed SQL, migration, schema, static page, application code, validator, test, database, PR #3, main branch, merge state or deployment was changed. No SQL was executed. No live database was accessed. This is a documentation-only audit.

## 9. References

1. Haig, Geoffrey (2018). “Northern Kurdish (Kurmanjî).” In Geoffrey Haig & Geoffrey Khan (eds.), *The Languages and Linguistics of Western Asia: An Areal Perspective*, pp. 106–158. De Gruyter Mouton. §2.2.3, Table 9, printed p. 117. https://doi.org/10.1515/9783110421682-004
2. Thackston, W. M. *Kurmanji Kurdish: A Reference Grammar with Selected Readings*. §7–7.1, printed pp. 17–19. https://sites.fas.harvard.edu/~iranian/Kurmanji/kurmanji_complete.pdf
3. University of Arizona, Iranian Languages. “Kurmanji Kurdish — Syntax and Pronouns.” https://iranian-languages.arizona.edu/node/7

## Backup record

- Pre-work backup: `backup/c1-l11-pronoun-case-before-2026-11-17`
- Baseline SHA: `27e7def5219c06bb700ca6eba1277a1717d5577c`
- Post-work backup: to be recorded after commit and exact ref/blob verification.
