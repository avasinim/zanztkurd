# B3 — Past Counterfactuals: Clause Architecture and Conditional-Modal Selection Audit

**Date:** 2026-11-17  
**Repository:** `avasinim/zanztkurd`  
**Working branch:** `fix/kurmanji-ci-current-migration`  
**Starting HEAD:** `f599cc58daf7054814572a45599632b4609a6e84`  
**Pre-work backup:** `backup/b3-ditin-conditional-clause-architecture-before-2026-11-17`  
**Status:** evidence and curriculum-design audit; proposal-only; not approved lesson text.

## 1. Question and scope

This audit answers a narrower question than a general conjugation chart: **which verb form belongs in each clause of a past counterfactual, and how does the choice change when the clause contains `bûn` or `karîn`?**

It distinguishes:

- the simple past conditional (§25.1);
- the two dialect-conditioned past perfect conditional patterns (§25.2);
- the future conditional modal formed from the past conditional;
- the special selection rules for `bûn` and `karîn`.

It does not claim that one pattern is universal across all Kurmanji varieties.

## 2. Main source

W. M. Thackston, *Kurmanji Kurdish: A Reference Grammar with Selected Readings*, §§25–25.2, printed pp.60–64 (pagination in the printed grammar; PDF viewer numbering may differ).

The preface explicitly says Kurmanji is not fully unified or standardized and that the grammar describes, as far as possible, a norm adopted by a majority of writers. Treat the paradigms as evidence for that described written norm, not as an exhaustive dialect atlas.

## 3. The forms must not be collapsed

| Form | Source section | Structural description | Primary function / boundary |
|---|---|---|---|
| Past conditional | §25.1 | `bi-` + past stem + conditional endings | Irrealis form; complement after certain past modal/necessity predicates; also used for `bûn` in both clauses of a past counterfactual |
| Past perfect conditional — pattern A | §25.2(1) | `bi-` (negative `ne-`) + past perfect + `-(y)a` | Main pattern for past counterfactual protasis; may also occur in apodosis |
| Past perfect conditional — pattern B | §25.2(2) | `bi-/ne-` + past-perfect-like form with `ba-` replacing `bû` | Alternative dialect-conditioned pattern; not freely mixed with A |
| Future conditional modal | §25.2(3) | `ê/wê/dê` + past conditional | Modal “would/should” reading; not the same as a future-perfect tense |

The English translations “would have,” “had,” “would,” and “should” are not sufficient to identify the Kurdish construction. Clause role and the verb involved must be checked.

## 4. Past counterfactual clause architecture

Thackston §25.2(3) gives the central selection rule:

1. In a past counterfactual, the **protasis** (the “if” clause) uses the past perfect conditional.
2. The **apodosis** (the result clause) may use either the past perfect conditional or the future perfect conditional.
3. If either clause contains the verb **`bûn`**, it uses the **past conditional**, not the past perfect conditional.
4. If the apodosis contains **`karîn`**, it usually uses the **future perfect conditional**.

This is a constructional rule, not a general instruction to replace every past-tense verb with one conditional suffix.

### 4.1 Decision table

| Clause / predicate | Form selected in the source's account | Do not substitute automatically |
|---|---|---|
| Past counterfactual protasis, ordinary lexical verb | Past perfect conditional | Simple past conditional |
| Past counterfactual apodosis, ordinary lexical verb | Past perfect conditional **or** future perfect conditional | One single obligatory form |
| Either clause with `bûn` ‘be’ | Past conditional | Past perfect conditional |
| Apodosis with `karîn` ‘be able’ | Usually future perfect conditional | Ordinary past conditional without checking construction |

## 5. Directly attested forms of dîtin

Thackston §25.2 prints two ergative past perfect conditional patterns for `dîtin`.

### 5.1 Pattern A: past perfect + -(y)a

Affirmative forms in the source:

| Oblique agent | Form |
|---|---|
| min | bídîtibûya |
| me | bídîtibûya |
| te | bídîtibûya |
| we | bídîtibûya |
| wî | bídîtibûya |
| wan | bídîtibûya |

Negative forms are printed with `nédîtibûya` for the corresponding agents.

The table is an ergative pattern with a constant third-person singular direct patient. Do not read it as six distinct agent-agreement endings.

### 5.2 Pattern B: ba- replaces bû

Affirmative forms in the source:

| Oblique agent | Form |
|---|---|
| min | bídîtiba |
| me | bídîtiba |
| te | bídîtiba |
| we | bídîtiba |
| wî | bídîtiba |
| wan | bídîtiba |

Negative forms are printed with `nédîtiba` for the corresponding agents.

Thackston says these two past perfect conditional patterns appear mutually exclusive: depending on dialect, a speaker uses one or the other. The source does not license mixing pattern A and pattern B inside one learner paradigm. A project-specific reference variety must be chosen before either is made into learner-facing standard.

## 6. Special verb bûn

The source explicitly says that when `bûn` means ‘to be’ in either part of a past counterfactual, it takes the **past conditional**, not the past perfect conditional.

Thackston §25.1 prints the past conditional of `bûn` without the `bi-` prefix in the ordinary ‘be’ meaning:

| Subject | Form |
|---|---|
| ez | bûma |
| tu | bûya |
| ew | bûya |
| em | bûna |
| hûn | bûna |
| ew | bûna |

In compounds and when `bûn` means ‘become,’ the `bi-` prefix is used. Preserve this distinction; do not mechanically apply the `bûn`-as-copula rule to every compound or lexicalized construction.

## 7. Future conditional modal is a separate construction

Thackston §25.2(3) states that adding `ê/wê/dê` to the **past conditional** produces a future conditional modal with meanings such as “would” or “should.”

This is not the same as §23 “Future Perfect Tense.” In §23, the grammar says effectively only `zanîn` and `karîn` occur in that construction, with modal meanings “would know” and “would be able.” The names are similar, but the formation and distribution differ:

- **Future perfect (§23):** future marker + past subjunctive; effectively restricted to modal `zanîn` and `karîn`.
- **Future conditional modal (§25.2(3)):** future marker + past conditional; broader irrealis/modal function.

A lesson that labels both simply “future perfect” would conflate distinct constructions.

## 8. Evidence and limits

| Claim | Evidence grade | Limitation |
|---|---|---|
| Past counterfactual protasis uses past perfect conditional | Direct | Describes Thackston's reference norm |
| Apodosis may use past perfect or future perfect conditional | Direct | Context and predicate affect choice |
| `bûn` in either counterfactual clause uses past conditional | Direct | Special rule; distinguish ‘be’ from compound/become uses |
| Apodosis with `karîn` usually uses future perfect conditional | Direct | “Usually,” not an exceptionless rule |
| Two past perfect conditional patterns exist | Direct | Source says apparently dialect-exclusive |
| The two patterns are freely interchangeable for every speaker | Unsupported | Contradicted by the source's dialect qualification |
| One pattern is universally correct across all Kurmanji varieties | Unsupported | Grammar explicitly limits its description to a written norm |
| Frequency distribution by contemporary region | Unresolved | Requires corpus and speaker evidence beyond paradigmatic grammar |

## 9. Curriculum recommendations (not approved lesson text)

1. Teach clause roles first: protasis versus apodosis.
2. Use a decision tree before asking learners to memorize forms.
3. Keep the simple past conditional, both past perfect conditional patterns, and future conditional modal in separate rows and separate practice sets.
4. Give `bûn` its explicit exception panel.
5. Mark the `karîn` apodosis rule as “usually,” not “always.”
6. Choose one reference variety before selecting pattern A or B for the course. Do not combine both in one default answer key.
7. Use paired minimal examples only after a Kurmanji editor verifies naturalness and the chosen variety.
8. Keep English translation as a secondary aid; do not infer Kurdish form from the English phrase “would have.”

## 10. Protected-scope statement

This is a source-led research record only. No existing learner-facing lesson, course inventory, seed, application code, runtime, CI workflow, migration, production database, Supabase project, PR #3, or deployment was changed. No merge, rebase, force-push, or write to `main` was performed.

## 11. References

- Thackston, W. M. *Kurmanji Kurdish: A Reference Grammar with Selected Readings*. §§23–25.2, printed pp.56–64. Online text consulted: https://www.academia.edu/5485402/Kurmanji_Kurdish_A_Referance_Grammar_with_Selected_Readings_by_W_M_Thackston
- Manova, Stela (ed.). *Affix Ordering Across Languages and Frameworks*. Chapter “Negation in Kurmanji,” Oxford University Press. The chapter independently describes past conditional morphology and the distinction between past and past-perfect conditional. https://www.academia.edu/3342645/Negation_in_Kurmanji_In_Manova_ed_Affix_Ordering_Across_Languages_and_Frameworks_Oxford_University_Press

**Bibliographic caution:** verify the exact edition and page numbering against the title page of the copy used for formal publication. This audit uses printed section numbers and printed page numbers, not the PDF viewer's page counter.
