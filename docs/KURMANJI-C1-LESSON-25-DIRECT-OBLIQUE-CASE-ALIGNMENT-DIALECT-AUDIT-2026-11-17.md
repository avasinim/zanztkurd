# Course 1 Lesson 25 — Direct and Oblique Case: Distribution, Alignment and Dialect Variation Audit

**Date:** 2026-11-17  
**Repository:** `avasinim/zanztkurd`  
**Working branch:** `fix/kurmanji-ci-current-migration`  
**Baseline HEAD:** `9b7217856cda6e78cc419fa9e0eacfe034eec720`  
**Pre-work backup:** `backup/c1-l25-case-before-2026-11-17`  
**Seed file:** `docs/kurmanji-content-seed-part-04.sql`  
**Seed blob SHA:** `2367c5057b2b92b7fa482c64a30b05d26838d964`  
**Seed row:** `kurmanji-course-1-lesson-25.html`  
**Scope:** Evidence audit of the existing Lesson 25 payload and its relationship to Lessons 11, 17, 20, 23 and 24. Documentation-only; no lesson, seed, code, migration, database, PR, or deployment changes.

## 1. Executive finding

Lesson 25 has the right central model: Kurmanji distinguishes Direct and Oblique case, and the distribution changes in past transitive clauses. Its two core examples are pedagogically sound:

- `Ez wî mirovî dibînim.` — the present-transitive object is oblique.
- `Min ew dît.` — the past-transitive agent is oblique and the object is direct.

The lesson should not, however, be treated as a complete case reference yet. The highest-priority gaps are (a) making the intransitive/present-transitive/past-transitive alignment contrast explicit, (b) stating that oblique is not simply a synonym for “object” or “non-subject”, (c) adding the omitted oblique goal/recipient function and plural noun pattern, and (d) tightening the dialect qualification for masculine singular noun marking. It should also explicitly connect case marking to the ezafe suppression rule already audited in Lessons 23–24.

No changes to the existing lesson are made in this report.

## 2. Evidence reviewed

The current seed row contains:
- a definition of Direct and Oblique case;
- singular noun paradigms for masculine/feminine and definite/indefinite nouns;
- a personal-pronoun Direct/Oblique table;
- the present-transitive and past-transitive contrast;
- the examples `Ez wî mirovî dibînim` and `Min ew dît`;
- a short practice section and three references.

The row's overall progression is appropriate for an introductory grammar lesson. The main issue is completeness and precision, not a need to replace its teaching model.

## 3. Findings by claim

### 3.1 Direct and Oblique are grammatical cases, not semantic labels

**Supported, with a teaching clarification needed.**

Haig (2018, §2.2.1) describes a two-way distinction between Direct (unmarked) and Oblique. The Oblique case occurs in several syntactic environments; it cannot be reduced to “the object case”. The Direct case is used elsewhere in the standard variety described by Haig.

The lesson should explicitly distinguish:
- **grammatical function** (subject, object, possessor, adpositional complement, goal/recipient);
- **semantic role** (agent, patient, recipient, experiencer);
- **morphological case** (Direct or Oblique).

An Oblique noun or pronoun can still be the grammatical subject. This is especially important in past transitive clauses: the agent remains the subject even though it is Oblique. Haig (2018, §2.7.2) explicitly notes that subjecthood remains robust and is not determined simply by surface case.

### 3.2 Core alignment contrast is correctly represented

**Supported.**

The central standard pattern is:

| Clause type | Subject/agent | Object/patient |
|---|---|---|
| Intransitive, present or past | Direct | — |
| Transitive, present | Direct | Oblique |
| Transitive, past | Oblique agent/subject | Direct object |

Haig (2018, §2.7.2) states that the ergative construction is used with past tenses of transitive verbs; otherwise, the syntax is accusative. In the past transitive construction, the subject takes Oblique, the direct object takes Direct, and the verb agrees with the direct object.

The lesson already gives the key present and past examples. It should add one short intransitive past example (for example, `Ez çûm.`) to prevent learners from concluding that every past-tense subject becomes Oblique. The conditioning is not “past tense alone”; it is the past-tense transitive construction.

### 3.3 Pronoun paradigm is sound

**Supported.**

The lesson's pairs match Haig's Standard Kurmanjî paradigm:

| Direct | Oblique |
|---|---|
| ez | min |
| tu | te |
| ew | wî / wê |
| em | me |
| hûn | we |
| ew | wan |

The third-person Direct form `ew` is syncretic across gender and number; the Oblique singular distinguishes masculine `wî` and feminine `wê`, while plural uses `wan`. The lesson correctly cautions that the Direct third-person form does not itself encode those distinctions.

The present-transitive example `Ez wî mirovî dibînim` is also supported by the University of Arizona Iranian Languages Kurmanji description, which gives the same sentence and glosses it as “I see that man”. Haig's noun/pronoun tables support the Oblique forms used in it.

### 3.4 Oblique functions: one important omission

**Accurate but incomplete.**

Haig (2018, §2.2.1) lists these Oblique functions:
1. object of a present-tense transitive verb;
2. Goal or Recipient argument immediately following a motion or transfer predicate;
3. complement of an adposition (with some combinations where the marking is dropped);
4. possessor in an ezafe construction;
5. subject of a past-tense transitive verb.

The current lesson covers the present-transitive object, adpositional complement, possessor, and past-transitive subject. It does not explicitly teach the Goal/Recipient function. A compact example such as a recipient immediately following `dan` ‘give’ would close this gap; Haig §2.7.1 notes that recipients with `dan` are usually placed immediately after the verb, in Oblique case and without an adposition, although dialectal patterns vary.

### 3.5 Masculine singular noun marking needs a stronger dialect label

**The paradigm is attested; the current caveat should be more exact.**

The lesson's singular forms match Haig's Standard Kurmanjî Table 7:

| Noun type | Direct | Oblique |
|---|---|---|
| Masculine singular definite | `gund` | `gund-î` |
| Masculine singular indefinite | `gund-ek` | `gund-ek-î` |
| Feminine singular definite | `jin` | `jin-ê` |
| Feminine singular indefinite | `jin-ek` | `jin-ek-ê` |

However, Haig immediately qualifies the bare masculine singular pattern:
- bare masculine singular nouns receive consistent suffixal Oblique marking only in Badinan (northern Iraq) and the eastern Hekari region of Turkey;
- in many dialects, stem-vowel raising can participate in marking Oblique;
- suffixation is much more consistent when the noun phrase has a demonstrative, the interrogative `kîjan`, or the indefinite marker `-ek`.

The lesson currently says the marker may be absent in some dialects, which is directionally correct but understates the geographic and morphological detail. The recommended revision is to label the table as a Standard Kurmanjî reference paradigm and add a concise warning that bare masculine singular Oblique marking is particularly variable. Do not teach `gund-î` as an invariant pan-dialectal surface form.

### 3.6 Plural noun case is missing from the lesson

**A meaningful coverage gap.**

Haig (2018, §2.2.2, Table 8) describes Standard Kurmanjî plural nouns as overtly marked in the Oblique by `-a(n)` (with deletion of final `-n` common in some dialects), while Direct plural nouns are generally unmarked. Haig also warns that the often-cited indefinite Direct plural `-in` is frequently attested mainly in the Mardin region and across the border in Syria, and is rare or absent elsewhere.

The current lesson's noun table is singular-only. Add a small plural contrast or explicitly state that plural case is deferred. If included, avoid presenting indefinite Direct plural `-in` as universal.

### 3.7 Ezafe and external case must be explicitly separated

**Important cross-lesson connection.**

Haig (2018, pp. 120–121) states that the presence of ezafe on a noun suppresses overt expression of Oblique case on that noun. The ezafe construction itself remains unchanged regardless of the external case of the whole noun phrase. Where a demonstrative introduces the ezafe construction, the demonstrative can express the case of the whole NP (with dialect-specific qualifications).

This is directly relevant to Lessons 23 and 24:
- do not infer Oblique case solely from a surface sequence such as `-ek-î`; it may be an Oblique ending or an ezafe linker, depending on syntax;
- do not add an external Oblique ending to an ezafe-bearing head noun as if the two markers simply stack;
- identify the case of the whole NP separately from the internal ezafe relation.

Lesson 24 already correctly teaches oblique possessors and ezafe agreement. Lesson 25 should cross-reference that distinction rather than repeat a full ezafe lesson.

### 3.8 Past-transitive agreement and dialect variation require a bounded note

**The introductory rule is correct; it must not be presented as exceptionless.**

The seed correctly says that in the canonical past transitive construction the verb agrees with the Direct object, not the Oblique agent. Haig (2018, §2.7.2) documents two relevant deviations:
- when a plural transitive subject is not overtly expressed, plural agreement on the verb can occur even with a singular object;
- in some Central Anatolian dialects, the direct object of a past transitive verb can also appear Oblique, producing a double-Oblique pattern.

These should be a short advanced note, not a beginner paradigm. They do not invalidate the standard introductory contrast.

Haig (2018, §2.7.3) also documents non-canonical Oblique subjects in certain southern/eastern dialects, including some predicates of physical sensation and necessity. These are not the same as the past-transitive ergative construction because they are not conditioned by tense and may occur with intransitive predicates. A brief dialect note can prevent the false rule “only past transitive agents can ever be Oblique subjects”.

### 3.9 Cross-lesson consistency

The Lesson 25 core does not contradict the audited course sequence:
- **Lesson 11:** the Direct/Oblique pronoun pairs are consistent with the current table.
- **Lesson 17:** present-tense person agreement remains with the Direct subject/agent; the Oblique object pattern is consistent.
- **Lesson 20:** SOV is a neutral default, not an absolute rule; case marking and discourse-driven word order must not be conflated.
- **Lesson 23:** the noun's case must be distinguished from indefiniteness and ezafe; the surface form `-ek-î` is structurally ambiguous without syntax.
- **Lesson 24:** possessors in ezafe take Oblique pronouns; same-clause coreference uses `xwe`. In past transitive clauses, the Oblique agent can remain the grammatical subject and control `xwe`.

No cross-lesson contradiction was found in the core case paradigm. The missing plural and Goal/Recipient material are coverage gaps, not evidence that the existing lesson is wrong.

## 4. Recommended editorial actions (proposal only)

**Priority 1 — required for a reliable lesson**
1. Add the three-way alignment table (intransitive / present transitive / past transitive).
2. Explicitly say that Oblique is not synonymous with object or non-subject; an Oblique past-transitive agent remains the grammatical subject.
3. Add the missing Goal/Recipient function and clarify that adpositional complements are generally Oblique.
4. Strengthen the dialect caveat for bare masculine singular nouns.

**Priority 2 — complete the noun case coverage**
5. Add a compact plural Direct/Oblique example using `-a(n)`, with a warning that indefinite Direct `-in` is geographically restricted.
6. Add the ezafe suppression rule and distinguish internal ezafe from external NP case; cross-reference Lessons 23–24.

**Priority 3 — advanced note**
7. Add a short note on plural-subject agreement variation, occasional double-Oblique objects in some western Central Anatolian varieties, and non-canonical Oblique subjects in selected southern/eastern dialects. Keep these out of the core beginner rule.

**Native-speaker review remains required** for any newly authored recipient examples and for the final Sorani explanatory wording. The existing seed examples are retained as evidence, not rewritten here.

## 5. Sources

1. Haig, Geoffrey. 2018. “Northern Kurdish (Kurmanjî).” In Geoffrey Haig & Geoffrey Khan (eds.), *The Languages and Linguistics of Western Asia: An Areal Perspective*, pp. 106–158. De Gruyter Mouton. DOI: [10.1515/9783110421682-004](https://doi.org/10.1515/9783110421682-004). Open chapter PDF: [University of Bamberg](https://www.uni-bamberg.de/fileadmin/aspra/06_Team/Publications_and_CV/haig_2018_ch.2.3_northern_kurdish.pdf). Relevant sections: §2.2.1–2.2.3 (pp. 115–117), §2.3 (pp. 118–121), §2.7.1–2.7.3 (pp. 131–133), and regional variation.
2. Haig, Geoffrey & Ergin Öpengin. 2018. “Kurdish: A critical research overview.” *Linguistic Typology* 22(2), 229–252. [DOI: 10.1515/lingty-2018-0009](https://doi.org/10.1515/lingty-2018-0009). Relevant for the dialect continuum and regional morphosyntactic variation; Haig (2018) cites §3.2.4 for singular masculine Oblique marking.
3. Thackston, W. M. 2006. *Kurmanji Kurdish: A Reference Grammar with Selected Readings*. Renas Media. [Grammar PDF](https://sites.fas.harvard.edu/~iranian/Kurmanji/kurmanji_complete.pdf). Relevant: noun case, pronouns and past transitive/ergative construction, especially pp. 48–49.
4. University of Arizona, Iranian Languages. [Kurmanji Kurdish](https://iranian-languages.arizona.edu/node/7). Provides the pronoun paradigm, the present-transitive example `Ez wî mirovî dibînim`, and a learner-oriented explanation of the past ergative pattern.

## 6. Change and release boundary

This audit is a documentation-only evidence report. It does not authorize or perform a lesson rewrite.

- No lesson payload or seed SQL changed.
- No application code, schema, migration, CI configuration, or tests changed.
- No Supabase connection or database query was made.
- No PR was edited, approved, or merged.
- No production deployment was made.
- `main` remains at `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`.
- The seed blob `docs/kurmanji-content-seed-part-04.sql` remains `2367c5057b2b92b7fa482c64a30b05d26838d964`.

## 7. Verification checklist

After committing this report, verify:
1. The pre-work backup still points to baseline `9b7217856cda6e78cc419fa9e0eacfe034eec720`.
2. The active branch differs from the baseline by exactly this one report file.
3. The Course 1 Lesson 25 seed blob SHA is unchanged.
4. The post-work backup points to the resulting active-branch commit.
5. The post-backup report blob SHA equals the active-branch report blob SHA.
6. `main` remains unchanged.
