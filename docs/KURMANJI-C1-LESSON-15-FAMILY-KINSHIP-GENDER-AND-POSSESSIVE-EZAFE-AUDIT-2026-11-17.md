# Course 1 Lesson 15 — family vocabulary, kinship meanings and possessive ezafe audit

Date: 2026-11-17
Repository: avasinim/zanztkurd
Working branch: fix/kurmanji-ci-current-migration
Baseline HEAD: fa8bc7a7f4695bfa7360bcf66311865f6f01ce81
Pre-work backup: backup/c1-l15-family-vocabulary-before-2026-11-17
Scope: exact Lesson 15 seed payload and claim register; kinship lexemes, semantic range, regional alternatives, grammatical gender, possessive ezafe and reflexive xwe. Documentation-only; no lesson or seed content changed.

## 1. Executive finding

The lesson's core family vocabulary is broadly supported by specialist teaching material and academic description. The principal risks are lexical precision and grammar explanation, not wholesale replacement.

- dayik, bav/bab, bira, xwişk, kur, keç, zarok and malbat are documented core items.
- For grandparents, bapîr (grandfather) and dapîr (grandmother) are the clearest beginner headwords in the specialist Harvard/Uppsala course and Haig & Öpengin's academic overview. kalik and pîrik are also documented in some lexicographic/community sources, but should be labelled as alternatives with regional scope, not treated as universal equivalents. Bare kal is not a safe unqualified headword.
- mêr and jin can refer to man/woman and also husband/wife in kinship contexts. A context-free one-to-one gloss obscures this range.
- The four possessive phrases in the lesson follow Standard Kurmanji ezafe: feminine singular -a for dayik and xwişk; masculine singular -ê for bav; and -yê after vowel-final bira.
- xwe is not an ordinary possessive pronoun. It is an invariant reflexive form and can function possessively when the possessor is coreferential with the clause subject.
- The lesson's regional-variation note is correct but vague; alternatives should be source- and region-labelled.

**Release decision: vocabulary core supported; kal, spouse semantics, orthographic policy and the possessive/reflexive explanation need refinement and native review.**

## 2. Exact artifacts inspected

| Artifact | Blob SHA | Use |
|---|---|---|
| docs/kurmanji-content-seed-part-02.sql | aa5af4960256ee56955f0904c073c49bcc54a629 | Exact draft Lesson 15 payload |
| docs/KURMANJI-COURSE-1-LESSONS-13-18-CLAIM-LEVEL-EVIDENCE-REGISTER-2026-11-16.md | 4519b677e3c09f09a175763a37dffbb41486a329 | Claims 15.1–15.7 |
| docs/KURMANJI-C1-LESSON-11-PERSONAL-PRONOUNS-CASE-AGREEMENT-AUDIT-2026-11-17.md | reviewed on active branch | Prior pronoun/case and xwe analysis |

The SQL seed is a tracked draft, not proof of live database content. It was read as text only; no SQL was executed.

## 3. Evidence base

### 3.1 Harvard Faculty of Arts and Sciences / Uppsala University, Kurmanji Kurdish for the Beginners (2008)

Lesson 2 gives:
- bapîr — grandfather; dapîr — grandmother;
- bav, bab — father; dayik — mother;
- xwişk — sister; bira — brother;
- keç — daughter; kur — son; nevî — grandchild;
- jin û mêr — wife and husband; malbat — family;
- mam/ap — father's brother; met — father's sister; xalet/xaltî — mother's sister; xal — mother's brother.

Its dialogue independently uses dayika min, bavê min, xwişka min and birayê min in full family-description phrases. This is direct pedagogical evidence for the vocabulary and the possessive forms.

Source: https://www.kurdipedia.org/files/books/2023/474430.PDF
Evidence: lines 654–676 and 687–715.

### 3.2 Haig & Öpengin, “Gender in Kurdish: Structural and socio-cultural dimensions” (2015 preprint / later volume)

The study explicitly says Kurmanji kinship terminology varies extensively by region and presents a table of widespread terms:
- dayîk/dê mother; bapîr grandfather; dapîr grandmother;
- kur/law son; keç/qîz daughter; bira brother; xwîşk sister;
- jin/pîrek wife; mêr husband; bab father;
- distinct terms for paternal and maternal aunts, uncles and cousins.

It identifies bav, bra, kur as grammatically masculine and dê, xwîşk, keç, met as grammatically feminine. Gender is expressed through linkers, case suffixes and anaphoric pronouns. Thus grammatical gender should be taught as grammar, not inferred from Sorani glosses alone.

Source: https://www.kurdipedia.org/files/relatedfiles/2017/99839/0001.PDF
Evidence: lines 281–315, especially Table 2 at lines 298–302.

### 3.3 Deniz Ekici, Kurmanji Kurdish Reader (2007)

The grammar gives the possessive ezafe:
- feminine singular -(y)a;
- masculine singular -(y)ê;
- plural -(y)ên;
- after a vowel-final noun, insert y before the ezafe ending.

Exact examples include xuşka min (“my sister”), birayê min (“my brother”), bavê min (“my father”) and dayika min (in the dedication). It states that the second element of a possessive construct is oblique. Its reflexive section explains xwe as invariant and used both reflexively and possessively when linked to the subject. A published reading contains digel malbata xwe (“with his family”).

Source: https://www.kurdipedia.org/files/books/2022/426287.PDF
Evidence: lines 453–519 (ezafe), 1486–1505 (xwe and family phrase).

### 3.4 Additional lexical cross-checks

- Nevgur's Kurmanji lexical table records kalik/bapîr for grandfather and pîrik/dapîr for grandmother, along with variants dayik/dê, xwişk/xwîşk, kur/law and keç/dot/qîz. Useful lexicographic evidence, not a universal dialect standard: https://nevgur.net/meqale/18-Xwed%C3%AE%20%C3%BB%20nas
- Kurmanji School's recorded beginner phrases include bavê min, dayîka min, birayê min, xwişka min, malbata min and zarokên min: https://kurmanjischool.com/en/family-in-kurmanji/

## 4. Claim-by-claim assessment

| Current Lesson 15 item | Status | Finding |
|---|---|---|
| malbat = family | SUPPORTED | Explicit in Harvard/Uppsala terminology. |
| dayik = mother | SUPPORTED; SPELLING POLICY OPEN | Harvard/Uppsala uses dayik; Haig & Öpengin list dayîk/dê. Preserve variants pending house-style approval. |
| bav = father | SUPPORTED | bav and bab are both documented. |
| kur = son / boy | SUPPORTED WITH SENSE DISTINCTION | “Son” is the safer family gloss; “boy” is contextually available. Do not collapse it into gender-neutral “child.” |
| keç = daughter / girl | SUPPORTED WITH SENSE DISTINCTION | “Daughter” is the safer family gloss; “girl” is contextually available. |
| bira = brother | SUPPORTED | Core masculine kinship noun. |
| xwişk = sister | SUPPORTED; ORTHOGRAPHIC VARIANTS | Sources also show xwîşk and xuşk. Choose one project headword only after policy approval. |
| kal = grandfather | NOT SUPPORTED AS UNIVERSAL HEADWORD | Strong teaching source and academic overview use bapîr. Other sources document kalik as an alternative; bare kal needs source/region qualification. |
| pîrik = grandmother | SUPPORTED AS AN ALTERNATIVE, NOT UNIVERSAL | Harvard/Uppsala and Haig & Öpengin use dapîr; other lexical sources list pîrik/dapîr. Prefer dapîr as unmarked headword; label pîrik as an alternative pending regional review. |
| mêr = husband / man | SUPPORTED; CONTEXT REQUIRED | Academic kinship table gives husband; broader use includes man. |
| jin = woman / wife | SUPPORTED; CONTEXT REQUIRED | Academic kinship table gives wife; broader use includes woman. |
| zarok = child | SUPPORTED | General child term; distinguish it from gendered kur and keç. |
| dayika min = my mother | SUPPORTED | Feminine singular ezafe -a plus oblique possessor min; exact phrase appears in teaching dialogue. |
| bavê min = my father | SUPPORTED | Masculine singular ezafe -ê plus oblique possessor min; exact phrase appears in teaching dialogue. |
| birayê min = my brother | SUPPORTED | Vowel-final bira takes linking y before -ê; exact phrase appears in the teaching dialogue and grammar paradigm. |
| xwişka min = my sister | SUPPORTED; SPELLING POLICY OPEN | Feminine singular -a is correct; spelling variants remain unresolved. |
| Ev dayika min e. | STRUCTURE SUPPORTED; CLOSE FORM ATTESTED | Teaching dialogue has Dayika min ... ye; the current copular introduction is adapted and needs native review. |
| Navê bavê min Azad e. | STRUCTURE SUPPORTED; EXACT CLAUSE NOT VERIFIED | Ezafe chain nav-ê + bav-ê min is well-formed; exact sentence is instructor-created pending native review. |
| Ez bi malbata xwe re dijîm. | REFLEXIVE PATTERN SUPPORTED; EXACT CLAUSE ADAPTED | Reader attests digel malbata xwe (“with his family”). The full bi ... re dijîm clause still needs native review. |
| xwe as a simple possessive | TOO NARROW | xwe is invariant reflexive and subject-oriented possessive, not a free replacement for min/te/wî/wê/me/we/wan. |

## 5. Grammar and sequencing findings

### 5.1 Possessive ezafe

The four phrases in the seed are supported:
- dayika min: feminine singular head noun + -a;
- bavê min: masculine singular head noun + -ê;
- birayê min: vowel-final bira + linking y + -ê;
- xwişka min: feminine singular head noun + -a.

The possessor is the oblique pronoun min, not direct ez. The endings are ezafe/linker morphology, not possessive suffixes attached to the possessor. Explain the grammatical gender of the head noun and the oblique form of the possessor separately.

### 5.2 Reflexive xwe

Teach two connected functions:
1. reflexive object/coreferential pronoun when the clause subject acts on itself;
2. possessive use when the owned item belongs to the subject of the same clause.

Do not teach xwe as a free substitute for “my/your/his/her/our/their” in all contexts. Its antecedent is determined by clause structure and subject reference.

### 5.3 Scope of the kinship list

The lesson is an introductory core-family vocabulary list, not a complete kinship inventory. It omits terms for paternal/maternal aunts and uncles, cousins and grandchildren. It need not add all of them, but should avoid implying completeness. Harvard/Uppsala explicitly distinguishes paternal and maternal relations with mam/ap, met, xal and xaltî/xalet.

## 6. Editorial resolution — proposal only

1. Keep the immediate-family core: malbat, dayik, bav, kur, keç, bira, xwişk, zarok.
2. Prefer bapîr and dapîr as unmarked beginner headwords. Add kalik and pîrik only as source-labelled alternatives after native review. Avoid bare kal as the only grandfather gloss.
3. Keep mêr and jin but explain both person and spouse readings in context.
4. Resolve dayik/dayîk and xwişk/xwîşk/xuşk only through the project's orthographic policy; preserve variants in source notes rather than mixing forms.
5. Distinguish kur “son/boy” and keç “daughter/girl” from zarok “child.”
6. Teach the four possessive phrases as a small paradigm and explicitly connect gender to ezafe.
7. Explain linking y in birayê min.
8. Explicitly identify min as an oblique possessor.
9. Introduce xwe as a same-clause subject-oriented reflexive/possessive form, not an ordinary free possessive pronoun.
10. Retain Ez bi malbata xwe re dijîm only as an instructor-created example pending native review; its core family phrase has a strong attested parallel.
11. Label Navê bavê min Azad e as an instructor-created ezafe-chain example pending native review.
12. If the lesson remains “core family vocabulary,” keep extended kinship terms for a later lesson or extension box.
13. Have a Sorani editor verify the Sorani glosses independently.

## 7. Release decision

**NOT RELEASE-CERTIFIED YET.** Core vocabulary and possessive forms are well-supported, but the grandfather terms need control, mêr/jin need contextual glosses, and the explanation must distinguish ezafe from ordinary suffixes and xwe from free possessives.

Minimum release-strengthening package:
- prefer documented bapîr/dapîr headwords;
- source-label kalik/pîrik alternatives;
- state regional variation without implying universal interchangeability;
- teach feminine/masculine ezafe and linking y;
- define xwe as subject-coreferential;
- obtain native Kurmanji review and independent Sorani copy-edit.

## 8. Actions not taken

No lesson body, seed SQL, migration, schema, static page, application code, validator, test, database, PR #3, main branch, merge state or deployment was changed. No SQL was executed. No live database was accessed. Documentation-only audit.

## 9. References

1. Harvard Faculty of Arts and Sciences / Uppsala University (2008). Kurmanji Kurdish for the Beginners, Lesson 2, kinship dialogue and terminology, pp. 4–6. https://www.kurdipedia.org/files/books/2023/474430.PDF
2. Haig, Geoffrey & Ergin Öpengin (2015). “Gender in Kurdish: Structural and socio-cultural dimensions,” §2.2 and Table 2, pp. 4–5. https://www.kurdipedia.org/files/relatedfiles/2017/99839/0001.PDF
3. Ekici, Deniz (2007). Kurmanji Kurdish Reader, possessive ezafe, pp. 5–7; reflexive xwe, pp. 27–28. https://www.kurdipedia.org/files/books/2022/426287.PDF
4. Nevgur. “Xwedî û nas,” Kurmanji kinship lexical table. https://nevgur.net/meqale/18-Xwed%C3%AE%20%C3%BB%20nas
5. Kurmanji School. “Family Words in Kurmanji: How to Talk About Your Family in Kurdish.” https://kurmanjischool.com/en/family-in-kurmanji/

## Backup record

- Pre-work backup: backup/c1-l15-family-vocabulary-before-2026-11-17
- Baseline SHA: fa8bc7a7f4695bfa7360bcf66311865f6f01ce81
- Post-work backup: backup/c1-l15-family-vocabulary-after-2026-11-17 (points to the final documentation commit after verification).
