# Kurmanji Change of State — Inchoative, Causative, Resultative and Passive Constructions Audit — 2026-11-17

## 1. Scope and decision

This note distinguishes four related but non-identical event structures in Kurmanji:

- **Inchoative:** a participant enters a state or undergoes a change of state, with no external causer syntactically expressed.
- **Causative:** an external causer brings about an event or state change.
- **Resultative:** a construction profiles a resulting state or property; it is not automatically a passive.
- **Passive:** the construction backgrounds or suppresses the agent and promotes an object-like participant; in the well-described Kurmanji pattern this uses **hatin + infinitive**.

The forms **bûn**, **ketin**, **kirin** and **hatin** participate in several construction types. Their presence alone is not a sufficient diagnostic. This audit combines the Cizre/Botan-oriented descriptive account in Haig (2018), the Muş-specific syntactic discussion in Gündoğdu (2016), and Haig's earlier complex-predicate analysis. Dialect labels and source-specific claims are retained.

This is documentation only. No lessons, lesson content, course inventory, code, seed, schema, migrations, CI, database, production, PR, deployment or main branch are changed.

## 2. The four-way distinction

| Construction | Core meaning | Main diagnostic question |
|---|---|---|
| Inchoative | X becomes / gets into state S | Does the subject undergo the change without an expressed external causer? |
| Causative | Y causes X to become / do S | Is an external causer added by a lexical, morphological or analytic construction? |
| Resultative | X is in the state resulting from an event | Is the state/result foregrounded rather than the event's agent? |
| Passive | X is presented as affected by an event; agent is backgrounded/suppressed | Does an object-like participant advance to subject position in a passive construction? |

A translation such as ‘become’, ‘get’, ‘make’, ‘be’ or ‘be done’ is not enough to classify a form. The predicate's argument frame, morphology, aspect, agreement, and discourse context must be checked.

## 3. Inchoative patterns: bûn and other lexical verbs

### 3.1 bûn: copula versus change-of-state verb

The verb **bûn** has at least two relevant functions:
- copular/stative ‘be’;
- inchoative ‘become’.

With an adjective or nominal predicate, the distinction is semantic and constructional. A stative copular clause describes a property or identity; an inchoative clause describes entry into a state or transition. The surface occurrence of **bûn** does not automatically settle which reading is intended: tense/aspect and context matter.

Gündoğdu's Muş Kurmanji examples include:
- **acis bûn** ‘get bored’ — an adjective + verb inchoative predicate;
- **acis kirin** ‘bore [someone]’ — its causative/transitive counterpart;
- **nexweş ketin** ‘get sick’ — an adjective + **ketin** predicate, not an **bûn/kirin** pair.

These examples demonstrate lexicalized or constructionally established contrasts, not a free rule that every adjective can combine with **bûn** and **kirin** to create an inchoative/causative pair. They are reported for Muş Kurmanji in the cited paper and must not be silently presented as universal target-standard forms.

### 3.2 Inchoative is not necessarily bûn

Kurmanji change-of-state predicates can use lexical verbs other than **bûn**. The Muş examples **nexweş ketin** ‘get sick’ and **derketin** ‘go out’ show that **ketin** and preverb/particle combinations participate in lexicalized event meanings.

Haig (2018) also lists **lê hatin** ‘become’ among lexicalized verb + prepositional-complement formations. This is a lexicalized expression, not evidence that every PP + **hatin** sequence is an inchoative.

Editorial decision: store the entire lexical predicate, not just the verbal element, and preserve its attested meaning and variety.

## 4. Causative patterns: kirin, -and and dan

### 4.1 Adjective + kirin

The Muş pair **acis bûn** ‘get bored’ / **acis kirin** ‘bore someone’ is a useful example of an inchoative/causative contrast:
- the subject of the inchoative undergoes a change of state;
- the causative introduces an external causer and an affected participant.

This does not mean **kirin** always marks a grammatical causative. It also occurs in many lexical N+kirin predicates such as **bawer kirin**, **fêm kirin** and **qebûl kirin**, which must be classified individually.

### 4.2 Morphological causative -and

Haig (2018) describes **-and** as the only moderately productive derivational process for creating new verbs in Kurmanji, deriving transitive verbs from intransitive stems. Examples include:
- **gerîn** ‘walk, stroll’ → **gerandin** ‘lead’;
- **nivîstin** ‘sleep’ → **nivandin** ‘put to sleep’.

The suffix changes valency: an intransitive event is expressed with an external causer/causer-like subject in the derived transitive predicate. However:
- do not attach **-and** to arbitrary stems;
- record irregular stem changes and lexical restrictions;
- do not infer a universal morphological paradigm from two examples;
- do not claim that **-and** is historically derived from **dan**.

### 4.3 Analytic causative dan

Akin & Bouveret (2021) distinguish analytic Kurmanji causative patterns involving:
- **dan + infinitive**;
- **dan + causative-marked V-and**;
- **dan + kirin + infinitive**.

These constructions add a causer/causee relation at a level different from the lexical adjective + **kirin** contrast or the morphological **-and** alternation. They must not be collapsed into one generic “make” rule. The authors also discuss a range of causal force from permissive to stronger directive/manipulative readings, depending on construction and context.

## 5. Resultative: state after an event is not automatically passive

A resultative description profiles the state that holds after an event (for example, a door in an opened state). A passive describes an event with an affected participant as subject and the agent backgrounded or suppressed. The two can overlap semantically, but they are not identical grammatical categories.

For each candidate resultative, ask:
1. Is there an overt event or only a resulting state?
2. Is the subject the patient/theme of a prior event?
3. Is an external agent syntactically absent, optional or independently licensed?
4. Is there a resultative marker or a lexical adjective?
5. Does the predicate show the expected agreement and tense/aspect?
6. Is the form independently attested in the target variety?

The available sources do not justify a single productive Kurmanji resultative template that can be applied to all verbs. Therefore this note does not invent resultative suffixes, participles or sample paradigms.

## 6. Passive: hatin + infinitive

Haig (2018) describes the ordinary Kurmanji passive as based on **hatin** ‘come’ plus the infinitive of the main verb. Haig (2002) likewise uses this construction in his diagnostics for N+V complex predicates.

The passive has a syntactic diagnostic: a direct object can advance to subject position, while the original agent is suppressed in the ordinary spoken pattern described by Haig. The nominal element of many N+V complex predicates does not itself become the passive subject, which is evidence that it is not a canonical direct object.

Examples from Haig's complex-predicate discussion include passives of:
- **av dan** ‘irrigate’;
- **derman kirin** ‘treat’;
- **hezkirin** ‘like/love’ (noted by Haig as problematic because the predicate normally selects a PP complement and the example is coordinated with a predicate that does take a direct object).

This qualification matters: passive-looking forms in lexicalized predicates do not always establish that the noun element is an ordinary object. The whole construction and its complement structure must be examined.

### 6.1 Regional innovation: do not generalize

Mizban (2026) reports an additional passive structure in Northeastern and Northern Iranian Kurmanji, alongside the historical **hatin + infinitive** construction. The study is geographically bounded and uses radio, interview and elicitation data. It is relevant to regional variation but does not justify replacing the historical passive in the Academy's target written standard.

Until full examples and methods are independently examined and a target variety is explicitly selected, this reported pattern must remain labelled regional research evidence—not a general Kurmanji rule.

## 7. Comparative diagnostic matrix

| Form/construction | Likely class in cited evidence | Why it matters |
|---|---|---|
| **acis bûn** | inchoative ADJ + V (Muş) | subject enters a state |
| **acis kirin** | causative ADJ + V (Muş) | external causer affects another participant |
| **nexweş ketin** | lexicalized inchoative ADJ + V (Muş) | change-of-state does not require bûn |
| **gerîn → gerandin** | morphological causative | valency increases through -and |
| **nivîstin → nivandin** | morphological causative | ‘sleep’ → ‘put to sleep’ |
| **hatin + infinitive** | canonical passive | affected direct object advances to subject |
| **lê hatin** | lexicalized PP + V predicate | listed as ‘become’; not a general passive or productive template |
| **dan + V-Inf** | analytic causative | adds causation through auxiliary construction |
| adjective + result-state predicate | resultative only if diagnostics support it | state/result must not be conflated with passive |

## 8. Lexical-record protocol

For each change-of-state or voice predicate, record:

1. exact source form, spelling and gloss;
2. source, page/example and publication date;
3. dialect, locality, register and target-standard status;
4. lexical class: adjective + verb, noun + verb, PP + verb, preverb + verb, simplex verb;
5. construction type: copular, inchoative, causative, resultative, passive, or ambiguous;
6. causer, causee, patient/theme and other participant roles;
7. transitivity and valency before/after derivation;
8. morphological marking (including -and), stem alternation and irregularity;
9. tense/aspect, agreement and case in the attested example;
10. whether the predicate is lexicalized or productive, with evidence;
11. passive behavior and which participant can become subject;
12. whether the form is a source-attested example or an editorially proposed form.

Never generate an unverified inchoative/causative pair by mechanically replacing **bûn** with **kirin**. Never infer passive status from a translation with English “be”. Never infer resultative morphology from a state-like adjective.

## 9. Teaching decisions

- Teach copular **bûn** ‘be’ and inchoative **bûn** ‘become’ as distinct functions.
- Teach selected adjective + **bûn/kirin** pairs as lexical constructions with explicit argument frames.
- Include **nexweş ketin** only with a Muş/source label until target-standard verification is complete.
- Teach **-and** as a restricted derivational pattern with attested examples, not as an unrestricted suffix.
- Keep analytic **dan** causatives separate from morphological **-and** and lexical N+kirin predicates.
- Teach **hatin + infinitive** as the established passive pattern in the general written description, with regional alternatives clearly labelled.
- Do not introduce a general productive resultative template without a dedicated source and native-speaker review.
- Keep Kurmanji dialect evidence separate; do not transfer Sorani forms or rules.
- No existing lessons or course files are modified by this audit.

## 10. Sources and limitations

1. Haig, Geoffrey. 2018. “Northern Kurdish (Kurmanjî).” In *The Languages and Linguistics of Western Asia*. Sections on verbal morphology, causative **-and**, light verbs and lexicalized verb + prepositional complement predicates. PDF: https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf. Also available in the Bamberg-hosted version: https://www.uni-bamberg.de/fileadmin/aspra/06_Team/Publications_and_CV/HaigOepengin2018_Kurmanji_Kurdish_.pdf.
2. Gündoğdu, Songül. 2016. “Noun-Verb Complex Predicates in Kurmanji: A Syntactic Account.” *Proceedings of ConSOLE XXIII*, pp. 383–405. The paper identifies its data as Muş Kurmanji and lists **acis bûn**, **acis kirin**, **nexweş ketin**, **derketin**, and PP + V predicates. Public record: https://www.academia.edu/7519257/Noun_Verb_Complex_Predicates_in_Kurmanji_A_Syntactic_Account_Proceedings_of_ConSOLEXXIII_.
3. Haig, Geoffrey. 2002. “Noun-plus-verb complex predicates in Kurmanjî Kurdish: Argument sharing, argument incorporation, or what?” *Sprachtypologie und Universalienforschung (STUF)* 55(1), 15–48. DOI: https://doi.org/10.1524/stuf.2002.55.1.15. Institutional full text: https://fis.uni-bamberg.de/server/api/core/bitstreams/5f8631d6-c40d-4dd6-ad7c-c4914cc079ab/content.
4. Akin, Salih & Myriam Bouveret. 2021. “Grammar in usage and grammaticalization of dan ‘give’ constructions in Kurmanji Kurdish.” In *Give Constructions across Languages*, pp. 223–243. DOI: https://doi.org/10.1075/cal.29.09aki. Publisher outline: https://www.benjamins.com/catalog/cal.29.09aki.
5. Mizban, Elham. 2026. “Passive Structure in Kurmānji and Its Morphological and Sociological Changes.” DOI: https://doi.org/10.1007/978-981-95-1390-1_9. Only abstract-level claims about regional Northeastern/Northern Iranian data are used here; full construction examples and methodology have not been independently inspected.

Limitations: Gündoğdu's examples are explicitly Muş-specific. Haig's descriptive account is a broader Kurmanji reference but does not erase dialect variation. Mizban's new regional passive claim is not generalized. No native-speaker elicitation was conducted for this note.

## 11. Conclusion

Kurmanji change-of-state and voice constructions must be classified by their syntax and event structure, not by a shared English gloss. **bûn** can be copular or inchoative; **ketin** can occur in lexicalized inchoative predicates; **kirin**, **-and** and **dan** provide distinct causative resources; **hatin + infinitive** is the well-described passive; and resultative state descriptions must be kept separate unless their syntax demonstrates passive structure.

**Decision:** maintain a construction-by-construction, dialect-labelled evidence record. No mechanical **bûn/kirin** alternation, unrestricted **-and** rule, generalized resultative template or replacement passive is approved for the Academy's lessons.
