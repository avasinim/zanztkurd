# Lessons 04–05 — Terminology Register Cross-check
Date: 2026-11-23
Scope: compare the current Course 2 lesson payloads with the working terminology register and prior source audits. Documentation only.

## 1. Source files inspected
- `docs/kurmanji-content-seed-part-04.sql`
- Lesson key `kurmanji-course-2-lesson-04.html`
- Lesson key `kurmanji-course-2-lesson-05.html`

The fetched seed file blob SHA was `0e4bf967e3a0f7ce2d55b53199c0b417807b4930`. The review is limited to the content present in that file; it is not a claim that the live application or database currently serves this exact version.

## 2. Main finding
The existing lessons already make the crucial grammatical distinction correctly:
- in `gund-ek-î` and `jin-ek-ê`, the ending is described as the oblique-case form of the indefinite noun;
- in `bajar-ek-î mezin`, `-î` is described as the masculine ezafe marker linking the head noun to `mezin`.

This is the central contrast that the terminology register must preserve. It should not be “simplified” into a rule that `-î` always marks either oblique case or ezafe.

## 3. Lesson 04 cross-check

### What is already present and consistent
1. The lesson introduces `gund` / `gundek` as a contrast in indefiniteness.
2. It explains that an unmarked noun is not automatically definite; context matters.
3. It explicitly analyzes `gund-ek-î` and `jin-ek-ê` as indefinite nouns in the oblique case.
4. It explicitly contrasts these with `bajar-ek-î mezin`, where `-î` is ezafe.
5. The review questions ask learners to identify the function of `-ek` and the effect of case.

### Remaining instructional gaps
- No bracketed segmentation such as `gund-ek-î` → `gund + -ek + -î` with each function labelled. The form is written with hyphens, but the learner is not walked through the parts.
- No complete clause or phrase context demonstrates why the noun is oblique in the `gund-ek-î` / `jin-ek-ê` examples.
- The table in the seed describes direct/oblique forms in isolation; the lesson should explain that the case choice is determined by syntactic construction, not by indefiniteness itself.
- A model answer is not supplied for the review questions.

### Terminology alignment
Keep:
- `-ek` = نیشانەی نادیاریی تاک;
- `-î/-ê` in the two listed oblique paradigms = فۆڕمی حاڵەتی ناڕاستەوخۆ;
- “case” = حاڵەت, not a fixed semantic role such as “object”.

Do not imply that `-ek` itself is an oblique-case marker.

## 4. Lesson 05 cross-check

### What is already present and consistent
1. It introduces the adjective phrase `bajar-ek-î mezin`.
2. It identifies `-ek` as indefiniteness, `-î` as masculine ezafe and `mezin` as the adjective.
3. It states that adjectives do not inflect in the same way as the ezafe-bearing head noun in this example.
4. It notes that possessors in the relevant construction take oblique forms.
5. It cites Haig (2018), §2.3.1, example (4).

### Remaining instructional gaps
- The lesson says that ezafe also links a noun to a possessor, but does not show a complete, source-checked possessor phrase. Haig's `mal-a me` (example (5), §2.3.1) is available in the reviewed source record and can be considered for a future revision, subject to the normal approval process.
- It does not provide a full segmentation/labelled phrase diagram for `bajar-ek-î mezin`.
- It does not explicitly state that the grammatical function of a surface ending must be read from the whole construction.
- The review questions have no answer guidance.

### Terminology alignment
For `bajar-ek-î mezin`, label:
- `bajar` = head noun;
- `-ek` = indefinite marker;
- `-î` = masculine ezafe marker;
- `mezin` = adjective.

Do not label the `-î` in this phrase as oblique case. Conversely, do not re-label the `-î/-ê` endings in Lesson 04's `gund-ek-î` / `jin-ek-ê` paradigm as ezafe.

## 5. Cross-lesson consistency table

| Item | Lesson 04 | Lesson 05 | Register decision |
|---|---|---|---|
| `-ek` | Indefinite singular marker | Indefinite marker in adjective phrase | Keep one consistent label and function. |
| `-î` | Oblique ending in `gund-ek-î` | Ezafe in `bajar-ek-î mezin` | Function is construction-dependent; explicitly contrast. |
| `-ê` | Oblique ending in `jin-ek-ê` | Not used in the cited core example | Preserve the gender-sensitive paradigm; do not infer a universal rule from one form. |
| head noun | Implied in nominal paradigm | Explicitly discussed | Name it consistently as ناوی سەرەکی. |
| possessor | Not central | Mentioned, but no full example | Add a verified phrase only after editorial approval. |
| case | Paradigm contrast | Mentioned in possessor construction | Define as grammatical case, not semantic role. |
| ezafe | Contrasted with case | Core topic | Describe the linking function and agreement with the head noun. |

## 6. Proposed revision acceptance criteria
Before Lessons 04–05 are approved:
1. Add a concise, source-checked segmentation for each existing target form, without changing the Latin spellings.
2. Add one clear contrast panel: `gund-ek-î` (oblique case) versus `bajar-ek-î mezin` (ezafe).
3. Show the syntactic context that licenses oblique case; do not leave the paradigm as a memorized suffix table only.
4. If a possessor example is added, use a source-attested complete phrase and identify the head, ezafe marker and oblique possessor separately.
5. Add answer guidance for the existing review questions.
6. Preserve dialect qualifications and avoid universal claims about all Kurmanjî varieties.

## 7. Source basis and limits
- Haig (2018), Table 7 and §2.3.1, including examples (4) and (5), is the principal source basis for the reviewed nominal forms and ezafe analysis.
- Badıllı (1965) is not needed to decide the core Lesson 04–05 distinction and should not be used to override the Standard Kurmanjî analysis.
- This document records a consistency check, not a new independent grammar proof. All learner-facing changes and any added example require source verification and owner approval.

## 8. Change boundary
No lesson HTML, SQL seed, course payload, application code, database, migration, Supabase resource, main branch, deployment or production data was changed. This is a documentation-only cross-check. No runtime or release test is claimed.
