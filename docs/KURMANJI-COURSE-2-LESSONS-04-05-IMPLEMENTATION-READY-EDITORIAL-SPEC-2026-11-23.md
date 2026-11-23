# Course 2 — Lessons 04–05: Implementation-Ready Editorial Specification
Date: 2026-11-23
Status: Documentation-only specification; awaiting owner approval before learner-facing edits.

## 1. Purpose and boundary

This specification converts the existing Lessons 04–05 revision proposal, terminology cross-check and Lessons 03–06 source audit into an actionable editorial plan. It defines what the lessons should teach, the verified examples that may be used, the order of presentation, exercise requirements and acceptance checks.

It does **not** authorize changes to lesson HTML, SQL seed content, course payloads, application code, database, migrations, Supabase, the main branch, deployment or production. No learner-facing text is changed by this document.

## 2. Source hierarchy and verified evidence

Primary grammar authority for the target constructions:
- Geoffrey Haig (2018), “Northern Kurdish (Kurmanjî),” Table 7 and §2.3.1, printed pp. 115–119.
- Full chapter: https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf
- Focused §2.3 extract: https://www.uni-bamberg.de/fileadmin/aspra/06_Team/Publications_and_CV/haig_2018_ch.2.3_northern_kurdish.pdf

Existing repository evidence consulted:
- `docs/KURMANJI-COURSE-2-LESSONS-04-05-DETAILED-REVISION-PROPOSAL-2026-11-23.md`
- `docs/KURMANJI-COURSE-2-LESSONS-04-05-TERMINOLOGY-REGISTER-CROSSCHECK-2026-11-23.md`
- `docs/KURMANJI-COURSE-2-LESSONS-03-06-EZAFE-CASE-SOURCE-AUDIT-2026-11-23.md`

Evidence is limited to the cited Standard Kurmanjî paradigm and constructions. Do not generalize these forms as exceptionless across all regional varieties.

## 3. Non-negotiable grammatical distinctions

### 3.1 Indefinite marker is not case

In the cited singular forms, `-ek` marks singular indefiniteness. It does not itself mark oblique case.

### 3.2 Case is not ezafe

The oblique endings in the Table 7 paradigm and the ezafe marker in an adjective phrase are different grammatical functions. A surface spelling such as `-î` is not enough to identify its function; learners must inspect the construction.

### 3.3 Ezafe belongs to the head noun

The ezafe marker attaches to the head noun and agrees with that noun's gender/number in the cited Standard Kurmanjî analysis. It links the head noun to a following adjective or possessor.

### 3.4 Possessor case is separate from ezafe agreement

In `mal-a me`, the ezafe marker `-a` is associated with the feminine head noun `mal`; `me` is the oblique first-person plural possessor. Do not describe `-a` as the possessor's case ending.

## 4. Approved example inventory for this specification

Only the following source-attested forms may be used in the proposed teaching panels without further example discovery:

| Form | Source-supported analysis | Teaching use |
|---|---|---|
| `gund` | masculine singular direct definite form in Table 7 | Baseline noun form |
| `gund-î` | masculine singular oblique definite form | Case paradigm |
| `gund-ek` | masculine singular direct indefinite form | Indefiniteness |
| `gund-ek-î` | masculine singular oblique indefinite form | Case + indefiniteness |
| `jin` | feminine singular direct definite form | Gender comparison |
| `jin-ê` | feminine singular oblique definite form | Case paradigm |
| `jin-ek` | feminine singular direct indefinite form | Indefiniteness |
| `jin-ek-ê` | feminine singular oblique indefinite form | Case + indefiniteness |
| `bajar-ek-î mezin` | “a big town”; `-î` is masculine ezafe in example (4), §2.3.1 | Noun–adjective construction |
| `mal-a me` | “our house”; `-a` is feminine ezafe and `me` is the oblique 1PL possessor, example (5), §2.3.1 | Noun–possessor construction |

Do not add newly generated Kurmanji clauses, plural paradigms, alternate spellings or regional variants under this specification. If a complete clause is needed to demonstrate a case-licensing environment, source-check that clause independently before adding it.

## 5. Lesson 04 — definite/indefinite nouns and `-ek`

### Learning outcome

By the end of the lesson, learners should be able to:
1. identify `-ek` as the singular indefinite marker in the cited forms;
2. distinguish direct and oblique forms in the Table 7 paradigm;
3. explain that oblique case is determined by syntactic construction, not by indefiniteness alone;
4. distinguish an oblique ending from an ezafe marker when the surface form looks similar.

### Required content sequence

**Block A — Meaning and context**
- Retain the current explanation that a bare noun is not automatically definite; interpretation depends on context.
- Avoid presenting a bare noun as having one fixed definite meaning in every sentence.

**Block B — Compact paradigm**
Show the masculine and feminine singular direct/oblique contrasts from Table 7. Preserve exact Latin spellings and hyphenation as listed in the approved example inventory.
- Masculine: `gund`, `gund-î`, `gund-ek`, `gund-ek-î`.
- Feminine: `jin`, `jin-ê`, `jin-ek`, `jin-ek-ê`.

**Block C — Guided segmentation**
Use explicit labels:
- `gund-ek-î` = `gund` (noun) + `-ek` (singular indefinite marker) + `-î` (oblique ending in this paradigm).
- `jin-ek-ê` = `jin` (noun) + `-ek` (singular indefinite marker) + `-ê` (feminine oblique ending in this paradigm).

The lesson should label these as analyses of the cited forms, not universal suffix rules detached from their paradigm.

**Block D — Essential contrast with Lesson 05**
Place `bajar-ek-î mezin` beside `gund-ek-î`.
- In `gund-ek-î`, the final `-î` is the oblique ending in Table 7.
- In `bajar-ek-î mezin`, the final `-î` is ezafe linking the head noun to the adjective `mezin`.
- Explain that the grammatical function is construction-dependent.

**Block E — Case environment**
State that oblique case appears in specified syntactic environments. The source audit lists present-tense transitive objects, goals/recipients after motion or transfer predicates, adpositional complements, ezafe possessors and subjects of past-tense transitive clauses.
Do not create a new clause to illustrate these environments unless its exact form and gloss are independently verified. The current isolated Table 7 forms support the paradigm but do not themselves demonstrate the full clause context that licenses oblique case.

### Required exercise and answer criteria

Exercise: classify the final ending in:
1. `gund-ek-î`
2. `jin-ek-ê`
3. `bajar-ek-î mezin`

Marking criteria:
- `-ek` is identified as the singular indefinite marker.
- The final `-î` in item 1 is identified as oblique case in the Table 7 paradigm.
- `-ê` in item 2 is identified as the feminine oblique ending in that paradigm.
- The final `-î` in item 3 is identified as ezafe.
- The learner explains why identical or similar surface spelling does not guarantee identical grammatical function.

A full-credit answer must name the construction/function, not merely underline the ending.

## 6. Lesson 05 — ezafe and noun–modifier relationship

### Learning outcome

By the end of the lesson, learners should be able to:
1. identify the head noun in a noun–adjective or noun–possessor construction;
2. identify the ezafe marker attached to that head noun;
3. distinguish a following adjective from a possessor;
4. explain that ezafe agreement and possessor case are separate facts.

### Required content sequence

**Block A — Head noun and agreement**
Define the head noun as the noun to which the ezafe attaches. State that the cited Standard Kurmanjî ezafe marker agrees with the head noun's gender/number, not with the following adjective or possessor.

**Block B — Adjective construction**
Use the source-attested phrase `bajar-ek-î mezin`:
- `bajar`: head noun;
- `-ek`: indefinite marker;
- `-î`: masculine ezafe in this cited construction;
- `mezin`: adjective;
- phrase meaning: “a big town”.

Explain that the adjective does not inflect for case in the cited construction.

**Block C — Possessor construction**
Use the source-attested phrase `mal-a me`:
- `mal`: head noun;
- `-a`: feminine ezafe;
- `me`: oblique first-person plural possessor;
- phrase meaning: “our house”.

Explain separately:
- ezafe `-a` is linked to the head noun `mal`;
- `me` is the possessor and has oblique form;
- the possessor's oblique case is not the ezafe marker.

**Block D — Compare the two constructions**
A two-row visual analysis should show:
- head noun + ezafe + adjective;
- head noun + ezafe + possessor.

Do not imply that adjectives and possessors have identical grammatical behavior.

### Required exercise and answer criteria

Exercise: label the head noun, ezafe marker and following element in:
1. `bajar-ek-î mezin`
2. `mal-a me`

Marking criteria:
- Item 1: `bajar` = head noun; `-î` = ezafe; `mezin` = adjective. `-ek` is separately identified as indefiniteness.
- Item 2: `mal` = head noun; `-a` = ezafe; `me` = oblique possessor.
- Learner states that ezafe agreement follows the head noun, while possessor case is a separate relation.

## 7. Cross-lesson bridge and progression

Lesson 04 should introduce the distinction between indefinite marking and oblique case, then preview the ambiguous-looking `-î) in the ezafe construction. Lesson 05 should revisit that exact contrast and explain ezafe systematically.

Lesson 05 should not introduce a new unexplained case paradigm. It should reuse the terms established in Lesson 04:
- نیشانەی نادیاریی تاک
- حاڵەتی ڕاستەوخۆ / حاڵەتی ناڕاستەوخۆ
- ناوی سەرەکی
- نیشانەی ئەزافە
- خاوەندار / پێکهێنەری خاوەنداری

These Sorani labels are working editorial terms and remain subject to owner/editor approval. Preserve the course-wide distinction between `ڕەگ` and `بنەڕەت`; this specification does not decide a separate stem term.

## 8. Accuracy caveats that must remain visible

1. Haig reports that gender distinctions after indefinite `-ek` may weaken and show variation. Present the listed paradigm as the cited Standard Kurmanjî pattern, not as an exceptionless rule for all dialects.
2. Haig notes that oblique marking may be suppressed when a noun is followed by ezafe. Do not teach that every noun in every ezafe phrase must show an additional overt oblique ending.
3. Do not treat `-ek` as a case marker.
4. Do not assign one fixed function to every written `-î`.
5. Do not infer an unprovided full clause from the isolated nominal forms.
6. Do not silently normalize or rewrite any Kurmanji Latin source form.

## 9. Editorial and technical acceptance gate

Before any learner-facing implementation:
- [ ] Course owner approves the Sorani terminology and explanatory wording.
- [ ] Editor checks all listed forms, segmentation and glosses against Haig Table 7 and §2.3.1.
- [ ] Lesson 04 distinguishes indefiniteness, oblique case and ezafe.
- [ ] Lesson 04 explains that syntactic context licenses case; no invented clause is used.
- [ ] Lesson 05 includes both adjective and possessor constructions.
- [ ] Lesson 05 identifies the head noun, ezafe and following element separately.
- [ ] Both lessons include worked examples, exercises and answer guidance.
- [ ] Standard Kurmanjî scope and variation caveats are retained.
- [ ] Any newly proposed Kurmanji form has a separate source citation and review.
- [ ] User explicitly authorizes lesson payload edits before implementation.
- [ ] After approval, changes are limited to the approved lesson files and separately backed up and verified.

## 10. Explicit non-goals

This specification does not:
- rewrite lesson copy for publication;
- add new Kurmanji example clauses or paradigms;
- change the course order, titles or lesson count;
- modify SQL, HTML, application code, database or Supabase;
- run or claim runtime, integration or release tests;
- merge to main, deploy or touch production.

## 11. Completion definition

The editorial design for Lessons 04–05 is ready for owner review when the two lessons can teach and assess the contrast between `-ek), oblique case and ezafe using only source-attested forms, with visible segmentation, accurate construction labels, answer criteria and dialect qualifications. Implementation remains a separate, approval-gated task.
