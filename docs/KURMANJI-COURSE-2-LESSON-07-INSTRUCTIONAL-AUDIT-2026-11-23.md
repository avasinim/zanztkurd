# Course 2 — Lesson 07: Instructional Audit (2026-11-23)

## Scope
Reviewed the exact Lesson 07 payload in `docs/kurmanji-content-seed-part-05.sql`, titled **جێناوە کەسییەکان و حاڵەتی ڕاستەوخۆ و ناڕاستەوخۆ**. This audit checks the stored lesson's structure and clarity; it is not a complete independent verification of Haig's full pronoun and case paradigms.

## Current content (verified)
- Lists direct forms: `ez, tu, ew, em, hûn, ew`.
- Lists oblique forms: `min, te, wî/wê, me, we, wan`.
- Warns that oblique case cannot be reduced to “subject is always oblique” or “object is always direct”; tense, verb type, and clause structure matter.
- Introduces the past-tense pattern in many transitive clauses, where the agent may appear in an oblique form, and identifies this as relevant to ergativity.
- Method note attributes the pronoun table to Haig (2018), Table 9, and clarifies that direct `ew` can represent masculine singular, feminine singular, or plural, while oblique `wî/wê/wan` distinguish those values.
- Review questions ask learners to recall forms and explain why case cannot be mapped mechanically to subject/object roles.

## Findings
1. **Potentially confusing repeated form, partly resolved by the note:** `ew` appears twice in the direct-pronoun list. This is not necessarily a typo: one form covers third-person singular (both genders) and plural. However, the list does not label the two entries, so a learner may read it as accidental duplication. Add labels such as “third-person singular (m/f)” and “third-person plural” if verified against the cited table.
2. **Paradigm is not presented as a usable table:** despite the method note referring to a table in Haig, the lesson stores the forms as inline lists. Person, number, gender, and case are not aligned in rows, making comparison difficult.
3. **Case environments remain abstract:** the lesson correctly warns against a simplistic subject/object rule, but gives no fully glossed sentence pair showing direct vs oblique forms in context.
4. **Ergativity is named but not demonstrated:** the past transitive pattern is described without a concrete agent–verb–object example, agreement marking, or a contrast with an intransitive past clause. Learners may memorize the term without seeing the construction.
5. **Scope needs consistent qualification:** “many transitive past clauses” is appropriately cautious; preserve this qualification and avoid converting it into an absolute rule for all past clauses or every dialect.
6. **Review questions lack applied analysis:** no prompt asks learners to identify the case of a pronoun in a complete sentence or explain the role of tense and transitivity. No answer key is supplied.

## Conservative recommendation
Do not alter the lesson source yet. In a later approved revision, convert the forms into a sourced grid with person/number/gender labels; explicitly explain why `ew` appears for both singular and plural; and add source-checked, fully glossed examples contrasting (a) an intransitive past clause and (b) a transitive past clause. Keep the “many” qualifier and state the variety and construction scope. Do not invent agreement patterns or infer a complete paradigm from the short lists alone.

## Source inspected
`docs/kurmanji-content-seed-part-05.sql` — Course 2 Lesson 07 payload. The lesson cites Haig (2018), Table 9, and Thackston (2006).

## Change boundary
Documentation-only audit. No lesson HTML/SQL, seed data, application code, migrations, database, Supabase, main, or production changes.
