# Course 2 — Lessons 04–05: Implementation-Ready Editorial Specification
Date: 2026-11-23
Status: Documentation-only specification; requires owner/editor approval before learner-facing edits.

## 1. Purpose and boundary

This specification turns the existing Lessons 04–05 audit findings into an actionable editorial checklist. It defines what a future revision must teach, which examples may be used, how each example must be analyzed, and what must be verified before implementation.

It does **not** authorize edits to lesson HTML, SQL seed data, course payloads, application code, database content, migrations, Supabase, the main branch, deployment or production. No learner-facing text is changed by this document.

## 2. Evidence base and source control

Primary grammatical source:
- Geoffrey Haig (2018), “Northern Kurdish (Kurmanjî),” Table 7 and §2.3.1, especially examples (4) and (5), printed pp. 115–119.
- PDF: https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf

Repository evidence reviewed:
- `docs/KURMANJI-COURSE-2-LESSONS-04-05-DETAILED-REVISION-PROPOSAL-2026-11-23.md`
- `docs/KURMANJI-COURSE-2-LESSONS-04-05-TERMINOLOGY-REGISTER-CROSSCHECK-2026-11-23.md`
- `docs/KURMANJI-COURSE-2-LESSONS-03-06-EZAFE-CASE-SOURCE-AUDIT-2026-11-23.md`
- Master sign-off gate: `docs/KURMANJI-COURSE-2-MASTER-AUDIT-SYNTHESIS-AND-SIGNOFF-GATE-2026-11-23.md`

The source examples below are deliberately limited to forms already located in Haig. No new Kurmanji sentence, paradigm cell, gloss or translation is proposed here.

## 3. Non-negotiable linguistic distinction

The lessons must teach the learner to identify grammatical function from the **construction**, not from the visible spelling of an ending.

| Source-attested form | Segmentation | Required analysis |
|---|---|---|
| `gund-ek-î` | `gund + -ek + -î` | noun + singular indefinite marker + oblique ending |
| `jin-ek-ê` | `jin + -ek + -ê` | noun + singular indefinite marker + feminine oblique ending in Haig Table 7 |
| `bajar-ek-î mezin` | `bajar + -ek + -î + mezin` | head noun + indefinite marker + masculine ezafe + adjective |
| `mal-a me` | `mal + -a + me` | head noun + feminine ezafe + first-person plural oblique possessor |

**Editorial red line:** the final `-î` in `gund-ek-î` is analyzed as oblique case in the cited paradigm; the `-î` in `bajar-ek-î mezin` is analyzed as ezafe. Do not merge these functions or imply that the same written ending always has one grammatical role.

## 4. Lesson 04 specification — ناوی دیار و نادیار؛ پاشگری -ek

### 4.1 Learning outcomes
After the revision, a learner should be able to:
1. Explain that `-ek` marks singular indefiniteness in the cited forms.
2. Separate the indefinite marker from the following oblique ending.
3. Recognize the masculine and feminine singular direct/oblique contrasts shown in Haig Table 7.
4. Distinguish an oblique ending from an ezafe marker when comparing the lesson's forms with `bajar-ek-î mezin`.
5. Explain that case is determined by syntactic construction; indefiniteness by itself does not make a noun oblique.

### 4.2 Required content sequence
1. **Context-sensitive definiteness:** retain the existing caution that a bare noun is not automatically definite; interpretation depends on context.
2. **Paradigm:** show only the source-attested singular forms below, with direct/oblique and definite/indefinite labels.
3. **Segmentation:** display morpheme boundaries and label each component directly under the form.
4. **Function contrast:** place `gund-ek-î` beside `bajar-ek-î mezin`; explain why their final `-î` has a different function.
5. **Case licensing:** explain in prose that oblique case occurs in defined syntactic environments. Do not add a newly composed Kurmanji clause merely to demonstrate one. If a full clause is desired, first locate and verify an exact source example and its context in Haig.
6. **Practice and answer guidance:** include the classification task in §6 and a short marking guide.

### 4.3 Approved example inventory for this specification
Haig Table 7:
- Masculine: `gund` (direct definite), `gund-î` (oblique definite), `gund-ek` (direct indefinite), `gund-ek-î` (oblique indefinite).
- Feminine: `jin` (direct definite), `jin-ê` (oblique definite), `jin-ek` (direct indefinite), `jin-ek-ê` (oblique indefinite).

Haig §2.3.1, example (4), for contrast only:
- `bajar-ek-î mezin` — “a big town”; the final `-î` is masculine ezafe in this adjective construction.

Do not infer additional forms by analogy or generate a full paradigm beyond these cited entries.

### 4.4 Sorani terminology to retain provisionally
- `-ek`: نیشانەی نادیاریی تاک
- oblique case: حاڵەتی ناڕاستەوخۆ
- direct case: حاڵەتی ڕاستەوخۆ
- ezafe: ئەزافە
- head noun: ناوی سەرەکی

The terminology register remains a working register; course-owner approval is still required before treating provisional labels as final.

## 5. Lesson 05 specification — ئەزافە و پەیوەندیی ناو و هاوەڵناو

### 5.1 Learning outcomes
After the revision, a learner should be able to:
1. Identify the head noun in an ezafe construction.
2. Identify the ezafe marker attached to the head noun.
3. Explain that the ezafe form agrees with the head noun's gender/number in the described Standard Kurmanjî system.
4. Distinguish an adjective following ezafe from a possessor following ezafe.
5. Keep the possessor's oblique case separate from ezafe agreement.
6. Explain why the visible `-î` in `bajar-ek-î mezin` is ezafe, not the oblique ending seen in `gund-ek-î`.

### 5.2 Required content sequence
1. Define the head noun as the noun to which the ezafe marker attaches.
2. Analyze `bajar-ek-î mezin` as the adjective construction.
3. Analyze `mal-a me` as the possessor construction.
4. Label head noun, ezafe marker and following element in both examples.
5. State the source-supported contrast: the adjective does not take oblique case in the cited construction; the possessor is oblique.
6. Explain that the ezafe marker's agreement is controlled by the head noun, not by the following adjective or possessor.
7. Include a contrast exercise and answer criteria.
8. Retain a scope note: this is Standard Kurmanjî as described by Haig; gender distinctions after indefinite `-ek` may weaken and vary in usage.

### 5.3 Approved example inventory
Haig §2.3.1:
- Example (4): `bajar-ek-î mezin` — “a big town”.
- Example (5): `mal-a me` — “our house”.

Required labels:
- `bajar`: head noun.
- `-ek`: indefinite marker.
- `-î`: masculine ezafe in this phrase.
- `mezin`: adjective.
- `mal`: head noun.
- `-a`: feminine ezafe.
- `me`: first-person plural oblique pronoun functioning as possessor.

Do not add other possessive forms or a possessive-pronoun paradigm from memory or analogy. Any expansion requires a separately checked source and approval.

## 6. Required practice and marking criteria

### 6.1 Lesson 04 — classify the final ending
Learner task: classify the final ending in:
1. `gund-ek-î`
2. `jin-ek-ê`
3. `bajar-ek-î mezin`

Marking criteria:
- identifies `-ek` as the indefinite marker in the cited forms;
- identifies the final `-î` in item 1 as oblique case;
- identifies `-ê` in item 2 as feminine oblique case in Haig's cited paradigm;
- identifies `-î` in item 3 as ezafe;
- explains that the construction determines function, not spelling alone.

### 6.2 Lesson 05 — label the ezafe construction
Learner task: label the head noun, ezafe marker and following element in:
1. `bajar-ek-î mezin`
2. `mal-a me`

Marking criteria:
- item 1: `bajar` = head noun; `-î` = ezafe; `mezin` = adjective;
- item 2: `mal` = head noun; `-a` = ezafe; `me` = oblique possessor;
- explains that ezafe agreement and possessor case are separate grammatical facts.

### 6.3 Feedback rule
Feedback must explain the grammatical function, not merely reveal a correct label. A response that calls every `-î` “ezafe” or every `-î` “oblique” should be marked incorrect even if the learner recognizes the letters.

## 7. Source precision and caveats

1. Haig Table 7 is the source for the direct/oblique nominal paradigm listed above.
2. Haig §2.3.1 examples (4) and (5) are the source for the adjective and possessor phrases.
3. Haig notes that oblique marking may be suppressed on a noun followed by ezafe. Do not teach that every noun inside an ezafe phrase must visibly carry a separate oblique ending.
4. Haig notes weakening/variation in gender distinctions after indefinite `-ek`. Present the cited forms as the described Standard Kurmanjî pattern, not as an exceptionless rule for all dialects and speakers.
5. Do not conflate grammatical case with semantic roles such as “subject” and “object”.
6. The source examples and their Latin spellings must be preserved exactly. Any proposed spelling correction requires a separate evidence-based review.
7. If a full clause is added to show why oblique case is licensed, record its exact source location, full context, gloss and translation before proposing it for the lesson. Until then, keep the explanation at the construction/paradigm level.

## 8. Editorial QA checklist

Before any lesson payload edit:
- [ ] Owner approves Sorani terminology and explanatory wording.
- [ ] Haig Table 7 and §2.3.1 have been checked directly against the PDF.
- [ ] Every Kurmanji example is in the approved inventory or has a separate source record.
- [ ] The two functions of final `-î` are contrasted explicitly and accurately.
- [ ] Lesson 04 separates `-ek`, oblique case and ezafe.
- [ ] Lesson 05 shows both adjective and possessor constructions.
- [ ] Head noun, ezafe marker, adjective and possessor are labelled consistently.
- [ ] Case is not reduced to a fixed subject/object rule.
- [ ] Standard Kurmanjî scope and dialect caveat are retained.
- [ ] Exercises include explanatory answer guidance.
- [ ] The final lesson copy is reviewed independently for linguistic accuracy and Kurdish script quality.
- [ ] The user explicitly authorizes the exact learner-facing changes before implementation.

## 9. Implementation sequence after approval
1. Confirm the final Sorani terms and scope with the course owner.
2. Re-open the exact current lesson payloads and verify their blob SHAs immediately before editing.
3. Prepare a proposed diff for Lesson 04 and Lesson 05 together, without touching unrelated lessons.
4. Have the Kurmanji examples and translations checked against Haig and the current seed.
5. Obtain approval of the exact diff.
6. Only then apply changes on a dedicated non-main branch, with fresh pre/post backups and a verified diff.
7. Run only the relevant content/schema checks available in the repository; report precisely what passed and what was not run.
8. Do not merge to main or deploy without separate explicit authorization.

## 10. Completion status
This specification is complete as an editorial planning artifact. It does not mean Lessons 04–05 have been revised or passed final review. The learner-facing lessons remain unchanged, and the course remains subject to the master audit's P0 decisions and sign-off gate.
