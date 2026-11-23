# Course 2 Lessons 3–6 — Ezafe, Case and Nominal Morphology Audit
Date: 2026-11-23

## Scope and sources
Documentation-only review of Lessons 3–6 in `docs/kurmanji-content-seed-part-04.sql`. Primary source: Geoffrey Haig (2018), “Northern Kurdish (Kurmanjî),” especially §2.2.1 and §2.3.1, printed pp. 115–119.
- Chapter PDF: https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf
- Focused §2.3 extract: https://www.uni-bamberg.de/fileadmin/aspra/06_Team/Publications_and_CV/haig_2018_ch.2.3_northern_kurdish.pdf

No lesson HTML, seed SQL, application code, migration, database, Supabase, main branch, deployment or production data was changed.

## Core source facts

### Direct/oblique case and indefinite marking
Haig Table 7 gives the Standard Kurmanjî singular forms:
- Masculine: `gund` (direct definite), `gund-î` (oblique definite), `gund-ek` (direct indefinite), `gund-ek-î` (oblique indefinite).
- Feminine: `jin` (direct definite), `jin-ê` (oblique definite), `jin-ek` (direct indefinite), `jin-ek-ê` (oblique indefinite).

The oblique is used in specified syntactic environments, including present-tense transitive objects, goals/recipients after motion or transfer predicates, adpositional complements, possessors in ezafe constructions, and subjects of past-tense transitive clauses. Direct case is used elsewhere. Haig notes that oblique marking may be suppressed when the noun is followed by ezafe.

### Ezafe
Haig §2.3.1 says the ezafe attaches to the head noun and varies with the gender and number of that head noun in Standard Kurmanjî. It links a head noun to a following adjective or possessor:
- `bajar-ek-î mezin` — town-INDF-EZ.M big, “a big town” (example 4).
- `mal-a me` — house-EZ.F 1PL.OBL, “our house” (example 5).

Possessors in ezafe constructions take oblique case; adjectives do not inflect for case. Haig also warns that gender distinctions in ezafe after indefinite `-ek` tend to weaken and show uncertainty/inconsistency in actual usage. The same surface `-î` therefore cannot be assigned a single function without analyzing its construction.

## Lesson 3 — Noun, grammatical gender and number

### What is supported
The seed correctly states that grammatical gender is masculine/feminine in singular nouns, does not always correspond to natural sex, and that gender/number are reflected in ezafe forms. It appropriately cautions against one plural rule for every noun and flags dialect variation.

### Gaps
1. The lesson has no concrete masculine/feminine noun pair or paradigm illustrating the ezafe alternation.
2. It says ezafe “suffix” reflects gender and number but does not explain that the marker agrees with the **head noun**, not the following adjective or possessor.
3. It does not explain that plural gender distinctions are neutralized in the Standard Kurmanjî ezafe paradigm.
4. It does not give an applied task asking learners to identify the head noun and select the corresponding ezafe.
5. The method note appropriately warns about dialect differences but could name the scope as Standard Kurmanjî and distinguish source-supported standard forms from dialectal alternatives.

## Lesson 4 — Definite/indefinite nouns and -ek

### What is supported
The contrast `gund` / `gundek` is supported. The explanation that a bare noun is not automatically definite is also consistent with Haig: without an indefinite suffix, a noun may be interpreted as definite or generic/sortal according to context.

The lesson's analysis of `gund-ek-î` and `jin-ek-ê` as indefinite oblique forms agrees with Haig Table 7. In this construction, `-ek` marks singular indefiniteness, while the following ending marks oblique case.

### Important distinction already partly captured by the seed
The lesson contrasts `gund-ek-î` / `jin-ek-ê` with `bajar-ek-î mezin`. This is essential:
- In `gund-ek-î` and `jin-ek-ê`, the final ending is the oblique case marker.
- In `bajar-ek-î mezin`, the final `-î` is the masculine ezafe linking the noun to the adjective; the ezafe construction suppresses overt oblique marking on the head noun.

The surface sequence `-ek-î` is therefore ambiguous if removed from its syntactic context. This is not a spelling correction; it is a morphological-function distinction.

### Gaps
1. The lesson needs explicit bracketed segmentation and role labels for both patterns.
2. It should state that case is assigned to the whole noun phrase by its syntactic environment, while the ezafe links a modifier to its head.
3. The feminine indefinite ezafe after `-ek` is subject to variation and weakening; the lesson should not imply that the gender contrast is exceptionless in every dialect.
4. The phrase `bajar-ek-î mezin` is a useful contrast, but learners need to see why its `-î` is not the same oblique marker as in `gund-ek-î`.

## Lesson 5 — Ezafe and noun-adjective relationship

### What is supported
The seed's example `bajar-ek-î mezin` and its broad translation are supported by Haig §2.3.1, example (4). The explanation that the ezafe belongs to the head noun and the adjective follows it is correct. The seed also correctly says that the adjective does not inflect for case and that a possessor takes oblique case.

### Gaps and precision
1. The lesson does not provide a fully analyzed possessor example alongside the adjective example.
2. It does not clearly distinguish the ezafe marker on the head noun from the oblique marking of the possessor.
3. Its statement that `-î` is the masculine ezafe in `bajar-ek-î mezin` is source-consistent for the example, but should be qualified: Haig reports weakening and inconsistency in gender distinctions after indefinite `-ek`.
4. The course should avoid presenting the `-î` in `bajar-ek-î` and `gund-ek-î` as the same morpheme merely because the written sequence is identical.

## Lesson 6 — Possession and possessive pronouns

### What is supported
Haig §2.3.1, example (5), confirms `mal-a me` ‘our house’. The seed's analysis is sound:
- `mal` is the head noun;
- `-a` is feminine ezafe agreeing with the head noun;
- `me` is the oblique first-person plural pronoun functioning as possessor.

Haig also confirms the reflexive example `Ez li mal-a xwe me` and states that when the possessor is coreferential with the subject of the same clause, `xwe` is obligatorily used in place of a personal pronoun. The seed's warning against `mal-a min` in that same-clause coreference context is supported.

### Gaps
1. The heading “possessive pronouns” is broader than the actual content: most of the lesson concerns possessors in ezafe constructions and the reflexive `xwe`. It does not provide a full possessive-pronoun paradigm.
2. Learners need the distinction between personal pronoun forms and their function as possessors: `me` is not a direct-case form.
3. The `xwe` rule should remain scoped to same-clause coreference, not generalized to every possessive relation.
4. A complete pair contrasting an external possessor with a same-clause coreferential possessor would make the rule teachable.

## Cross-lesson recommendations (not implemented)
1. Use the same three labels throughout: head noun, ezafe marker, and possessor/adjective.
2. Keep direct/oblique case separate from ezafe agreement.
3. Teach the two superficially similar `-ek-î` strings with a side-by-side morphological segmentation and sentence context.
4. State the Standard Kurmanjî scope and preserve Haig's warning about dialectal variation, especially ezafe after indefinite `-ek`.
5. In Lesson 6, either add the missing possessive paradigm from a verified source or narrow the lesson title to match its actual scope; do not invent forms.

## Overall conclusion
The four lessons are broadly aligned with Haig (2018), and the key forms in the seed are not to be silently rewritten. The main risk is pedagogical ambiguity: the same surface `-î` may mark oblique case or ezafe depending on structure, while the ezafe itself agrees with the head noun and a possessor bears oblique case. This needs explicit worked segmentation before learners are assessed on it.

## Change boundary
This report is an audit artifact only. The original lesson payloads remain unchanged. No lesson text or Kurmanji source spelling was edited.
