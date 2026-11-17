# B3 Kurmanji: Raketin and Derketin Attested Past Forms and Evidence Limits
Date: 2026-11-17
Branch: fix/kurmanji-ci-current-migration
Scope: documentation-only lexical and inflection audit.

## Executive result
The currently located pedagogical source explicitly lists raketin → raket and derketin → derket as past stems. It supplies independent finite examples for both verbs: the negative plural raneketin in “Em doh xweş raneketin”, and first/second/third-person forms of derketin in “Ez îro ji malê zû derketim”, “Tu kengî ji ofîsê derketî?”, and “Hevalên min ji dibistanê derketin.” These examples support the cited forms, but they do not amount to a complete independently corroborated paradigm from a primary literary corpus.

## 1. Raketin
Infinitive: raketin (“to sleep”).
Past stem reported by Kurdish Lessons: raket.
Finite example: “Em doh xweş raneketin” (“We did not sleep well yesterday”). This supports a negative plural form with the surface sequence ra-ne-ket-in in the cited teaching variety.
Independent structural evidence: Haig’s description of Standard Kurmanji preverb placement gives ra-di-keve (“goes to sleep”), explicitly deriving it from raketin. In that Standard pattern, the imperfective/indicative prefix di- occurs between preverb ra- and the verbal stem. Haig also contrasts this with Şemzînan/SEK varieties, where inflectional prefixes can precede the preverb because preverb+stem is more tightly lexicalized.
Important limitation: the cited negative past example and the Standard present example are not a full past paradigm. Do not infer every person form, dialectal variant, or stress/segmentation rule from them.

## 2. Derketin
Infinitive: derketin (“to leave, go out”).
Past stem reported by Kurdish Lessons: derket.
Finite examples supplied by the same source:
- “Ez îro ji malê zû derketim” — first-person singular.
- “Tu kengî ji ofîsê derketî?” — second-person singular.
- “Hevalên min ji dibistanê derketin.” — third-person plural subject.
- “Ez nizanim ew çima ji odeya min derket.” — third-person singular.
These examples support the finite forms derketim, derketî, derketin, and derket in the cited teaching variety. The source also explicitly notes the preposition ji with derketin in its examples. Treat that as a useful lexical government pattern for the examples given, not an unqualified claim that every complement of derketin must use ji.

## 3. Cross-checks and caution
Zimanzan’s past-tense overview independently explains the general intransitive pattern: the nominative subject remains direct and the past verb carries subject agreement (e.g. ez çûm, ez hatim). This is a general grammatical cross-check, not a verb-specific attestation for raketin or derketin.
Haig’s published chapter provides the more valuable independent evidence for the Standard Kurmanji preverb structure of raketin and for dialect variation in preverb placement.
No independently searchable literary/corpus concordance for the exact strings raneketin, derketim, derketî, and derketin was confirmed in this audit. The KurdiLex corpus is discoverable as a searchable Kurmanji corpus, but its interactive query output was not available as a verifiable attestation here. Therefore, this document does not label those exact examples as literary-corpus verified.

## 4. Recommended B3 usage
1. For a Standard Kurmanji teaching note, record raketin → raket as a documented past stem, with “Em doh xweş raneketin” clearly attributed to the pedagogical source.
2. Record derketin → derket and the four finite forms above as attested pedagogical examples; retain the ji complement in the cited sentences.
3. Present `ra-di-keve` as a Standard Kurmanji present/imperfective preverb example only. Add a dialect note that Şemzînan/SEK prefix placement differs.
4. Do not manufacture missing paradigm cells for either verb. Mark unverified forms as pending evidence rather than filling them by analogy.
5. Keep these intransitive examples separate from the transitive past alignment lesson; they use direct-subject agreement in the cited pattern.
6. No existing lessons are edited by this audit.

## Evidence table
| Verb / point | Direct evidence located | Evidence grade |
|---|---|---|
| raketin → raket | Explicit stem entry | Pedagogical source |
| raneketin | “Em doh xweş raneketin” | Finite negative plural example, pedagogical source |
| ra-di-keve | Haig explicitly links it to raketin | Published linguistic description; Standard pattern |
| derketin → derket | Explicit stem entry | Pedagogical source |
| derketim / derketî / derketin / derket | Four finite sentences | Finite examples, pedagogical source |
| Full paradigms | Not found | Unverified; do not infer |

## Sources
1. Kurdish Lessons, “Simple Past Tense in Kurdish,” 18 January 2023: https://kurdishlessons.com/simple-present-tense-in-kurdish/
2. Geoffrey Haig, “Kurmanji in Turkey: structure, varieties, and status,” section on preverb incorporation and Standard ra-di-keve / Şemzînan variation: https://www.academia.edu/17650650/Kurmanji_in_Turkey_structure_varieties_and_status
3. Zimanzan, “Past tense in Kurmanji,” general intransitive past agreement and past-stem overview: https://zimanzan.com/kurmanji/grammar/past-tense
4. KurdiLex, Kurmanji searchable corpus portal (no exact concordance claimed in this audit): https://kurdilex.com/

## Project boundary
Documentation only. Course inventory remains 26 + 12. No lesson text, application code, CI, production Supabase, migration, deployment, or PR #3 was touched.