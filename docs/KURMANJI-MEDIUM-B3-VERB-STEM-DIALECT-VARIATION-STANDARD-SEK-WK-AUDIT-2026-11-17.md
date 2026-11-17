# Kurmanji Verb-Stem Variation — Standard, Southeastern and Western Evidence Audit — 2026-11-17

## Purpose and boundary

This document isolates a recurring lexicon risk: recording a present stem without recording the variety in which it is attested. It uses Geoffrey Haig (2018), “Northern Kurdish (Kurmanjî)”, especially §§2.6, 2.6.2, 3.4.1.1 and 3.4.2, as the principal comparative source.

This is a research and editorial audit only. It does not add or revise learner lessons, import lexical data, implement a database, or authorize changes to the existing course seed.

## 1. The source's own variety labels matter

Haig distinguishes:
- **Standard Kurmanjî (Standard K.)**: a written standard loosely based on Cizre and Botan in southeastern Turkey, using a modified Roman alphabet (§2, pp. 109–110).
- **Southeastern Kurmanjî (SEK)**: a regional variety discussed separately in §3.4.1, with Şemzinan-specific evidence in Table 23.
- **Western Kurmanjî (WK)**: a separate regional group discussed in §3.4.2; the source gives examples from locations including Elbistan, Dersim, Erzurum and Elazığ for particular features.

These are not interchangeable tags. The chapter explicitly presents Standard K. as a grammatical sketch and then treats selected regional variation separately. A learner-facing record must therefore name its target variety rather than use the unqualified label “Kurmanji” for every form.

## 2. Standard K. and regional alternatives for çûn and hatin

Haig §2.6.2, Table 16, identifies suppletive stems and regional variation:

| Lexeme | Past stem | Standard K. present stem | Alternative / regional evidence |
|---|---|---|---|
| çûn “go” | çû- | -ç- | -her- is listed as imperative; in WK it also occurs in the indicative in the named western localities |
| hatin “come” | hat- | -(h)ê- | -wer- is listed as imperative; the imperative stem is also often used instead of the regular subjunctive |

Important qualification: the table's slash-separated forms are not a claim that all forms are freely interchangeable in all dialects, tenses or moods.

Haig specifies that the Standard K. first-person singular indicative of “come” is **têm**, historically contracted from *di-hê-m; the negative is **nayêm**. In western dialects, the imperative stem **-her-** is also used in the indicative. The cited first-person forms are **terim** (< *di-her-im) and negative **narim** (< *na-her-im) for the named western localities (Haig 2018, §2.6.2).

Editorial consequence: do not substitute **terim** for Standard K. **têm**, or treat **-her-** as the unmarked present stem of all Kurmanji. Store the form with its variety, locality, grammatical function and source.

## 3. Southeastern “heavy” present stems

Haig §3.4.1.1 explains that some Standard K. present stems are a bare consonant (or consonant plus a short central vowel), while in SEK a number of corresponding present stems are “heavy”: the initial consonant is followed by [æ], written <e>, or, with xwarin, [o]. Haig notes that this feature is shared across much of the SEK speech zone and Central Kurdish.

Examples directly given in (50):

| Function | SEK form | Segmentation / gloss | Meaning |
|---|---|---|---|
| subjunctive, 1sg | bi-ke-m | SUBJ-do.PRS-1SG | “I’ll do” |
| subjunctive, 1sg | bi-be-m | SUBJ-take.PRS-1SG | “I’ll take” |
| indicative, 1sg | di-de-m | IND-give.PRS-1SG | “I give” |
| indicative, 1sg | di-xo-m | IND-eat.PRS-1SG | “I eat” |

These examples are evidence for a regional stem-shape contrast, not permission to rewrite Standard K. stems **-k-**, **-b-**, **-d-**, **-xw-** as **-ke-**, **-be-**, **-de-**, **-xo-** in every record.

The statement that the feature is shared with Central Kurdish must not be misread as making Central Kurdish and Kurmanji one target variety. It only reports a shared structural feature in the varieties under discussion.

## 4. Şemzinan stem contrasts in Table 23

Haig's Table 23 explicitly compares Standard K. and Şemzinan forms. It demonstrates that some verbs differ in both past and present stems, and that certain intransitive verbs (mostly unaccusative in the author's description) show extensions -(i)yē in the present and -(i)ya in the past.

The table includes these lexeme families and contrasts (the original PDF should be consulted for exact column placement and diacritics before transcribing any additional rows):

- hēlan “leave”;
- īnan “bring”;
- axiftin “speak”;
- ēšan “hurt”;
- kēšan “pull”;
- řētin “spill / pour”;
- howētin “throw”;
- ha(w)jotin “drive”;
- ēxistin “drop”;
- giriyan “weep”.

Because the extracted text flattens the multi-column table, this audit deliberately does not reconstruct every Standard K./Şemzinan past/present pairing from OCR. The table is a verified pointer to primary evidence, not a licence to guess the row alignment. Any full lexical import requires direct page-image transcription and independent review.

## 5. Lexicon schema implications

Every stem attestation should include:
1. lexeme ID and sense ID;
2. exact source form, retaining diacritics and hyphens;
3. stem type: infinitive, past stem, present stem, imperative stem or other explicitly named form;
4. variety label exactly as supported by the source (Standard K., SEK, Şemzinan, WK);
5. locality, where the source supplies one;
6. grammatical function and example context (indicative, subjunctive, imperative, etc.);
7. source citation at page, section, table or example level;
8. transcription status: directly checked against page image, text-extracted, editorially normalized, or unresolved;
9. relationship to the Academy's chosen target variety: accepted, variant-only, reference-only, or excluded from this target;
10. reviewer and review date.

A single lexeme may have multiple present-stem attestations. Do not overwrite one with another. Do not store the string “-ç- / -her-” as one unqualified stem; store the alternatives as separately scoped attestations.

## 6. Rules for the Academy's Kurmanji-medium pathway

- If the pathway later adopts Standard K. Hawar-based modified Roman as its written target, use Standard K. as the default record scope only after the target is formally approved.
- Keep WK and SEK forms in a comparative/variant layer unless a particular lesson explicitly teaches that variety.
- Do not mix Central Kurdish forms into a Kurmanji paradigm merely because Haig notes a shared feature.
- Do not infer a whole conjugation from a single stem or one person-form.
- Keep indicative, subjunctive and imperative stems/functions distinct.
- Where Haig gives locality names, preserve them; do not generalize a western-locality example to all WK.
- Obtain native-editor review of forms and orthographic normalization before learner-facing use.

## 7. Sources and verification pointers

- Geoffrey Haig (2018), “Northern Kurdish (Kurmanjî)”, in *The Languages and Linguistics of Western Asia*, pp. 106–158.
  - §2, pp. 109–110: Standard Kurmanjî scope and written standard.
  - §2.6, pp. 124–125: two stems and Table 12 frequent verbs.
  - §2.6.2, p. 127: Table 16, çûn/hatin suppletive stems and regional use.
  - §3.4.1.1, pp. 143–144: SEK heavy stems and Table 23.
  - §3.4.2, pp. 145–148: WK morphology and examples.
- University of Bamberg open PDF: https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf
- Bibliographic record, University of Bamberg: https://fis.uni-bamberg.de/entities/publication/06ab181d-1e09-43da-87f4-92453eaf5057

## Change boundary

Documentation only. No lesson, seed, schema, migration, runtime, CI, production database, PR, default branch or deployment was changed. No lexicon entries have been imported. The evidence here is a research aid requiring editorial review, not approved learner content.
