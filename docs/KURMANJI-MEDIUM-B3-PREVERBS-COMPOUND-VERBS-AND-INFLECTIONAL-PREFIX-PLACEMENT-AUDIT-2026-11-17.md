# Kurmanji Preverbs, Compound Verbs and Inflectional Prefix Placement — Evidence Audit — 2026-11-17

## Purpose and limits

This document audits how verbal negation and TAM prefixes interact with preverbal particles and compound predicates in Kurmanji. It compares Standard Kurmanjî (Standard K.), Southeastern Kurmanjî (SEK, including the Şemzînan data discussed by Haig), and Western Kurmanjî (WK) only where the cited sources provide evidence.

It is a documentation/research artifact, not learner-facing material. It does not authorize changing any lesson, seed record, code, schema, migration, CI, production data or deployment.

## 1. Core distinction: infinitival spelling versus inflected structure

Haig (2018, §3.4.1.2, pp. 144–145) describes a set of preverbal particles in Standard K. such as **hil, řā, da**. They combine with verb stems to form lexical verbs and are commonly written together with the stem in the infinitive.

However, the inflected form does not necessarily preserve that uninterrupted written sequence. In Standard K., inflectional prefixes such as negation and indicative/imperfective **intervene between the preverb and the verbal stem**. Haig's example is:

- Infinitive: **raketin** “go to sleep”.
- Inflected: **ra-di-keve** “(s/he) goes to sleep”.

The prefix **di-** is between **ra-** (preverb) and **keve** (verb form). The infinitival one-word spelling therefore does not prove that the preverb and inflected verb stem form an indivisible string in every paradigm.

## 2. Standard K. placement: preverb — inflectional prefix — stem

The Standard K. pattern supported by Haig is:

**PREVERB + NEG/TAM PREFIX + VERB STEM**

The independent Kurmanji compound-verb study by Gündoğdu gives additional examples:
- **der-na-kev-e** — “s/he is not going out”.
- **der-di-kev-e** — “s/he is going out”.

Here **der-** is the preverbal element, **na-** is negation, and **di-** marks the indicative/imperfective construction. These forms illustrate the same intercalation pattern: the inflectional prefix is placed between the preverb and the verbal element.

Do not convert this into a rule that every compound in every variety has exactly the same structure. The source discusses a class of preverbal particles and compound predicates; lexicalization and construction type matter.

## 3. SEK: prefix may precede the whole preverb–stem unit

Haig explicitly contrasts Standard K. with SEK. In SEK, negation and imperfective prefixes often occur **before** the preverbal particle. Haig interprets this as evidence that the preverb and stem have become more fully lexicalized as a new stem.

Two source examples are especially informative:

1. **di-helē-t** — “the sun rises early in the morning”. Haig analyses this as a contraction of **di-hel-hē-t** (IND–PREVERB–come.PRS–3SG). The indicative prefix precedes **hel-**.
2. **ne-di-řa-westīya-m** — “I would not stop (working) until evening”. In this example both the negative and imperfective prefixes precede the preverb **řa-**.

These forms must remain labelled SEK/Şemzînan in the evidence record. They are not alternative spellings of the Standard K. **ra-di-keve** pattern.

## 4. Left-edge negation in lexicalized light-verb constructions

Haig further notes that in some highly lexicalized and frequent light-verb constructions, the negative prefix may occur at the left edge of the entire verbal complex, even before the non-verbal element.

His example:
- **min ne=ber-ē xū da-yē** — “I did not look at (him/her/it).”

This is not simply another instance of inserting a prefix between a preverb and a stem. The negative marker precedes the non-verbal constituent **ber-ē ...**, while the verbal complex contains **da-yē**. Its analysis belongs with the construction's lexicalization and syntax, not with a universal prefix template applied mechanically to all compounds.

## 5. What the Gündoğdu study adds

Gündoğdu's chapter “Negation in Kurmanji” (2015, pp. 154–172) argues for templatic affix ordering. The chapter's abstract identifies three main negative markers, **n(a)-, n(e)- and ni-**, and states that negation can block other prefixes occupying the relevant slot, including progressive **di-** and subjunctive **bi-**.

The chapter's accessible text also describes compound verbs made from a non-verbal/preverbal element such as **ve, hil, ra** plus a light verb such as **kirin**, **dan/dayin** or **ketin**. Examples of infinitives include:
- **vekirin** — “to open”;
- **hildan** — “to lift”;
- **raketin** — “to go to sleep”.

It distinguishes these from two-word predicates whose first component is nominal, e.g. **alîkarî kirin** “to help”. In such constructions, inflectional morphology appears on the verbal element (e.g. the study contrasts **alîkarî dikin** with **alîkarî nakin**).

This is important for the Academy's data model: not every semantically compound predicate has the same orthographic or morphological boundary.

## 6. Evidence table: do not flatten the varieties

| Variety / construction | Source-supported pattern | Example | Safe interpretation |
|---|---|---|---|
| Standard K., lexical preverb | PREVERB + inflection + stem | ra-di-keve | Prefix intervenes between preverb and verb |
| Standard K., der-compound | PREVERB + negative/TAM + stem | der-na-kev-e; der-di-kev-e | Same intercalation pattern in the cited analysis |
| SEK / Şemzînan | inflection before preverb+stem | di-helē-t | Prefix at left edge of lexicalized complex |
| SEK / Şemzînan | NEG + IPFV + preverb + stem | ne-di-řa-westīya-m | Both prefixes precede preverb |
| SEK light-verb complex | NEG may precede non-verbal material | ne=ber-ē xū da-yē | Construction-level left-edge placement |
| Two-word nominal + light verb | inflection on verbal element | alîkarî nakin | Do not treat nominal component as a verbal preverb |

## 7. Lexical and editorial consequences

For each compound or preverb verb, maintain separate fields for:
1. infinitive lemma and source spelling;
2. whether the preverb is separable, opaque, lexicalized or uncertain;
3. the non-verbal/preverbal element;
4. the verbal stem and its present/past forms;
5. the inflected surface form, preserved exactly;
6. prefix segmentation and grammatical function (NEG, IND, IPFV, SUBJ);
7. variety and locality;
8. construction class: lexical preverb verb, light-verb predicate, or unresolved;
9. source/page/example and whether the page image was checked;
10. normalized Academy form, kept distinct from the source form;
11. native-editor review status.

Do not assume that a string such as **ra-**, **ve-**, **hil-** or **der-** always behaves alike across all verbs and dialects. The source evidence supports particular construction-specific patterns, not a free-standing universal list of interchangeable prefixes.

## 8. Unresolved questions and quality gates

- The precise productivity and semantic contribution of individual preverbs require lexical, verb-by-verb evidence; this audit does not assign meanings to **ra-, ve-, hil-** or **der-** beyond the cited examples.
- Haig's SEK examples include a contraction analysis; retain the attested surface form and the author's proposed segmentation separately.
- The left-edge pattern in light-verb constructions needs construction-specific analysis and should not be generalized from one example.
- The source PDF text extraction is useful for locating examples, but final orthographic transcription of special characters and segmentation should be checked against page images before publication.
- No new example sentence should be created for learners from these research forms without editorial approval.

## 9. Sources

1. Geoffrey Haig (2018), “Northern Kurdish (Kurmanjî)”, in *The Languages and Linguistics of Western Asia*, §3.4.1.2, pp. 144–145. University of Bamberg author PDF:
   https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf
2. Songül Gündoğdu (2015), “Negation in Kurmanji”, in Stela Manova (ed.), *Affix Ordering Across Languages and Frameworks*, pp. 154–172, Oxford University Press. DOI:
   https://doi.org/10.1093/acprof:oso/9780190210434.003.0007
   The chapter's accessible text is also available at:
   https://www.academia.edu/3342645/Negation_in_Kurmanji_In_Manova_ed_Affix_Ordering_Across_Languages_and_Frameworks_Oxford_University_Press
3. Songül Gündoğdu, “Noun-Verb Complex Predicates in Kurmanji: A Syntactic Account”, *Proceedings of ConSOLE XXIII*. Used only for its stated examples of compound predicates and prefix placement:
   https://www.academia.edu/7519257/Noun_Verb_Complex_Predicates_in_Kurmanji_A_Syntactic_Account_Proceedings_of_ConSOLEXXIII_

## Change boundary

Documentation only. No existing lesson or course content, seed, application code, schema, migration, CI workflow, production database, PR, default branch or deployment was changed. This audit is not a learner-facing grammar chapter and does not constitute approval of a particular spoken variety or orthographic policy.
