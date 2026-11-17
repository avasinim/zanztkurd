# B3 Kurmanji: Intransitive Past Corpus Attestation and Lexical Boundary Audit
Date: 2026-11-17
Branch: fix/kurmanji-ci-current-migration
Scope: documentation-only source audit. No lesson, runtime, CI, seed, database, migration, deployment, or PR #3 changes.

## Executive findings
This audit separates directly attested finite forms, pedagogical stem rules, and paradigms that remain unverified. It does not promote a single web lesson's rule into a universal dialect rule.

## 1. derketin
- Kurdish Lessons' simple-past page explicitly lists derketin → derket as the past stem and gives finite clauses such as Zozan ... derket derve, Ez ... derketim, Tu ... derketî, and plural derketin.
- The Universal Dependencies Northern Kurdish treebank provides a corpus annotation of derketi as a finite past verb (Mood=Ind, Number=Sing, Person=2, Tense=Past, VerbForm=Fin) in a naturally occurring sentence. This is valuable corpus evidence, though one token cannot establish the full paradigm.
- Kurmanji Basic gives a past-perfect example em ... derketibûn. This confirms a past-perfect construction, not the simple-past paradigm.
- Teaching note: present derkeve / derdikeve and simple past derket- are different stems/constructions. Do not derive a full conjugation merely by stripping the infinitive ending.

## 2. raketin
- Kurdish Lessons lists raketin → raket and gives the negative plural clause Em doh xweş raneketin (“we did not sleep well yesterday”). This is direct pedagogical evidence for the finite past negative form.
- This source supports the stem and one plural negative construction, not all six person/number cells.
- Until an independent grammar or corpus source is located, teach only the attested example and label the rest of the paradigm provisional.
- Do not conflate raketin (“to sleep”) with ketin (“to fall”) merely because their stems share material.

## 3. hilgirtin versus hildan
Chyet's Kurmanji lexicon distinguishes:
- hil-dan (transitive): “to lift, raise”.
- hil-girtin (transitive): “to bear, endure; to shoulder (a responsibility, burden)”.
The semantic distinction is material. A lesson or glossary must not substitute one verb for the other as if they were spelling variants or interchangeable stems.
Because both entries are transitive, their simple-past clauses must be analysed using the Kurmanji past transitive/ergative construction: the agent is oblique and the verb agrees with the direct object. Do not present an intransitive-style nominative-agent conjugation for either verb.
This audit does not claim that a complete finite past paradigm for hilgirtin has been independently verified. The lexical entry and the general ergative rule are not, by themselves, evidence for every person/object combination.

## 4. General intransitive/transitive past rule
Zimanzan's Kurmanji past-tense overview states the core contrast:
- Intransitives retain direct/nominative subject agreement (e.g. ez çûm).
- Transitives place the agent in the oblique case and agree with the direct object (e.g. min nan xwar).
Use this as a teaching overview, cross-checking individual forms against attested examples and dialect scope. Avoid implying that every regional variety behaves identically in every construction.

## Evidence matrix
| Verb | Evidence found | Confidence | Remaining gap |
|---|---|---|---|
| derketin | Past stem derket; finite forms derket, derketim, derketî, derketin in pedagogical examples; UD corpus token derketi | Strong for listed forms | Full paradigm and dialect metadata |
| raketin | Past stem raket; negative plural raneketin | Moderate for cited form | Independent corpus/grammar and other person cells |
| hilgirtin | Lexical meaning and transitivity | Strong lexical distinction | Direct literary finite-past examples and object-agreement paradigm |
| hildan | Lexical meaning and transitivity | Strong lexical distinction | Keep its paradigm separate from hilgirtin |

## Editorial rules for future B3 materials
1. Mark each item as attested, rule-derived, or unverified.
2. Preserve source spelling; do not silently normalize variants.
3. Identify the source's variety and register where available.
4. For intransitive simple past, use direct-subject agreement; for transitive simple past, explain oblique agent and object agreement.
5. Do not infer a complete paradigm from one finite token.
6. Keep hildan and hilgirtin as separate lexical entries with separate meanings.
7. No lesson wording should be changed on the basis of this audit without the owner's explicit approval.

## Sources
1. Michael L. Chyet, Kurdish-English Dictionary: Ferhenga Kurmancî-Inglîzî, Yale University Press, 2003, lexicon entries hil-dan and hil-girtin. Searchable mirror: https://paperzz.com/doc/8503097/kurmanji-lexicon
2. Kurdish Lessons, “Simple Past Tense in Kurdish” (2023): https://kurdishlessons.com/simple-present-tense-in-kurdish/
3. Universal Dependencies, UD_Northern_Kurdish-Kurmanji treebank: https://universaldependencies.org/treebanks/kmr_kurmanji/index.html
4. Zimanzan, “The past tense in Kurmanji”: https://zimanzan.com/kurmanji/grammar/past-tense
5. Kurmanji Kurdish, Lesson 8, past-perfect examples: https://muugumuugu.github.io/bOOkshelF/languagesNcodes/Kurmanji.pdf

## Change and safety boundary
This commit adds only this research document on fix/kurmanji-ci-current-migration. It does not modify course inventory (26 + 12 lessons), existing lesson content, the Sorani-mediated pathway, the Kurmanji-medium pathway, application code, CI, production Supabase, migrations, deployment, or PR #3.