# Kurmancî Medium B3 — xwestin and the unverified form xwestandin: stems, complement syntax, and past tense audit

**Date:** 2026-11-17  
**Scope:** Documentation-only lexical and grammatical audit. No lesson text, course inventory, runtime, CI, seed, database, migration, PR, or deployment changes.

## Executive conclusion

**xwestin** is an established transitive Kurmancî verb meaning “want, wish, request”. Its principal stems are:
- present stem: **xwaz-**
- past stem: **xwest-**
- 1sg present: **ez dixwazim**
- 2sg present: **tu dixwazî**
- 3sg present: **ew dixwaze**
- plural present: **em/hûn/ew dixwazin**

**xwestandin** is not verified as an established independent Standard Kurmancî lemma in the authoritative references consulted. Do not teach it as a causative counterpart, assign it stems, or invent a paradigm without a primary lexical attestation and native-editor confirmation.

## 1. xwestin: lexical identity and present stems

Thackston, *Kurmanji Kurdish: A Reference Grammar with Selected Readings*, §16.2 explicitly identifies xwestin as “to want” and gives present stem **xwaz-**. The six present forms are:
- ez dixwazim
- tu dixwazî
- ew dixwaze
- em dixwazin
- hûn dixwazin
- ew dixwazin

The same section demonstrates the two-verb complement construction:
- **Ez naxwazim vê behsê dirêj bikim.** — I do not want to prolong this discussion.
- **Bavê wî dixwaze ku ew bixwîne.** — His father wants him to study.
- **Bavê min dixwaze ku ez bixwînim.** — My father wants me to study.

When the wanter and the subject of the following subjunctive are identical, the subjunctive follows with matching person and the subject need not be repeated. When they differ, **ku** normally introduces the complement and the second subject is expressed. The complement remains subjunctive; it is not an infinitive copied from English.

The Morîstan verb table and Haig & Öpengin's lexical inventory independently list xwestin with present stem xwaz- and past stem xwest-. This corroborates the stem pair.

## 2. xwestin: special simple past construction

A critical teaching point appears in Thackston §18.4, “The Past Tense of Xwestin”.

Although xwestin is transitive and its own past is formed with the ergative pattern, its following subjunctive complement is not ergative. Even if both clauses have the same semantic subject, the two pronouns must be expressed separately:
- **min xwest (ku) ez bibêjim**
- **me xwest (ku) em bibêjin**
- **te xwest (ku) tu bibêjî**
- **we xwest (ku) hûn bibêjin**
- **wî xwest (ku) ew bibêje**
- **wan xwest (ku) ew bibêjin**

Thackston gives the literary-style example:
**Min xwest ku ez ji gund derkevim û ji xwe re berî berî çem bimeşim.**
“I wanted to get out of the village and walk by myself along the river.”

And:
**Ew tiştê ku di ser û dilê min de bû û min dixwest ez bidim, pêk nehat.**

Do not simplify the first example to an unexpressed-subject construction such as *min xwest biçim* when teaching the formal pattern in this reference grammar. Also do not force ordinary patient agreement on the subjunctive complement: **min xwest** is the matrix transitive past; **ez bibêjim** is the separate subjunctive clause.

## 3. xwestin: transitivity and lexical distinctions

The lexical references classify xwestin as transitive (“want/request”). Its present-tense clause behaves with the ordinary present agreement pattern. In the simple past, the matrix verb uses the oblique agent form and the past form **xwest**. The following subjunctive clause has its own nominative subject and agreement.

Keep these distinct:
- **xwestin**: want, wish, request; present xwaz-, past xwest-.
- **xwestandin**: not verified here as a Standard Kurmancî lemma.
- Sorani future marker and historical forms related to wîstin: not a substitute for the Kurmancî verb xwestin, and not to be mixed into the Kurmancî paradigm.

## 4. xwestandin: evidence audit and morphology caution

Exact-lemma searches for **xwestandin** did not produce a reliable Kurmancî dictionary entry, grammar paradigm, or independently checkable literary example. The authoritative Thackston reference grammar treats **xwestin** as its own irregular present-stem verb and gives a dedicated section for its past tense. It does not provide xwestandin as a derived counterpart in the relevant lexical or grammatical material.

Kurmancî does have a productive causative/factitive pattern involving **-and-** in certain verb formations. Haig & Öpengin describe causative derivation such as **gerîn → gerandin** and **nivîstin → nivandîn**. Thackston also has a separate chapter on factitive verbs. However, this general derivational pattern is not proof that every verb can take -andin, and it does not establish **xwestandin** as an attested lexical item.

Therefore:
- Do not infer “make someone want” as a meaning for xwestandin.
- Do not fabricate present stem *xwazîn-* or past stem *xwestand-*.
- Do not automatically treat xwestandin as a spelling error for xwestin; record the source context and ask a native editor.
- If a manuscript, regional glossary, or speaker supplies xwestandin, preserve it as a candidate regional/author-specific form and investigate its actual meaning, argument structure, and conjugation before standardizing.

## 5. Teaching recommendation and confidence

| Claim | Confidence | Treatment |
|---|---|---|
| xwestin means want/wish/request | High | Teach |
| present stem xwaz- | High | Teach and memorize |
| past stem xwest- | High | Teach |
| present paradigm dixwazim/dixwazî/dixwaze/dixwazin | High | Teach |
| past matrix construction min xwest + separate subjunctive subject | High | Teach as a special construction |
| xwestandin is a standard independent lemma | Unverified | Do not teach as established |
| xwestandin is a productive causative of xwestin | Unverified | Do not infer |
| full dialect-wide usage of xwestandin | Unverified | Requires dialect-specific field evidence |

## Sources

1. W. M. Thackston, *Kurmanji Kurdish: A Reference Grammar with Selected Readings*, §16.2 “Xwestin ‘To Want’” and §18.4 “The Past Tense of Xwestin”, PDF: https://kurdshop.net/content/upload/1/root/kurmanji-complete.pdf
2. Geoffrey Haig & Ergin Öpengin (2018), “Kurmanji Kurdish in Turkey: Structure, varieties and status”, including verb-stem inventory and split alignment: https://www.uni-bamberg.de/fileadmin/aspra/06_Team/Publications_and_CV/HaigOepengin2018_Kurmanji_Kurdish_.pdf
3. Morîstan, “Kurdish verbs — conjugation in Kurmancî and Soranî”, xwestin xwaz-/xwest-: https://moristan.com/en/kurdish-verbs
4. Kurdîzan, “I want to… I can…”, present/subjunctive complement structure: https://kurdizan.net/ders/xwestin-u-karin
5. Thackston reference grammar, factitive verbs §28 and §28.1, same PDF as source 1.

## Change control and verification

- Intended base commit: 1a40fed58b822090ff2f02aeba656804179550e8
- Pre-work backup: backup/b3-xwestin-xwestandin-before-2026-11-17
- Active work branch: fix/kurmanji-ci-current-migration
- Main branch must remain unchanged.
- Documentation only; no production, lesson, CI, runtime, seed, or database changes.
