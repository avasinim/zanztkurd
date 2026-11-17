# Course 1, Lesson 18 — Negation in Simple Clauses: Evidence and Payload Audit

**Date:** 2026-11-16  
**Repository:** `avasinim/zanztkurd`  
**Reviewed branch:** `fix/kurmanji-ci-current-migration`  
**Scope:** Evidence review of the existing Course 1, Lesson 18 payload only. This is a proposal-only audit; it does not authorize or perform lesson edits.

## 1. Executive assessment

The lesson identifies the right core topic, but its current three-part explanation needs a more precise grammatical separation. Kurmanji negation is not one interchangeable `ne-`/`na-` operation. The form and position depend on tense/aspect/mood, verb class, construction type, and regional variety.

The strongest supported introductory distinctions are:

- Standard Kurmanji present indicative: `na-` replaces affirmative `di-` on ordinary present stems: `diçim` → `naçim`, `dixwînim` → `naxwînim`.
- Two frequent lexical exceptions, `zanîn` ‘know’ and `karîn` ‘be able’, use `ni-` in the present: `nizanim`, `nikarim`.
- Present subjunctive: `ne-` replaces `bi-`: `biçim` → `neçim`.
- Standard Kurmanji simple past negation uses `ne-`; past progressive retains the imperfective `di- after negation: `ne-di-`, e.g. `nediçûm`. Therefore, the claim that negation always removes `di-` is false.
- Negative imperatives need a separately labelled rule. Thackston records `né-` forms such as `néçe` and `néke`; other sources document both `ne-` and `me-` in spoken usage and argue for `me-` in a particular written/classical standard. This is not safely summarized as “`me-` is merely old or dialectal.”
- Non-verbal predicate negation is distinct from verbal prefix negation. The negative particle `ne` precedes the predicate/complement, e.g. `Ez ne mamoste me` ‘I am not a teacher’. The negative existential/location form `nîne` is another construction and should not be taught as a regular negative copula ending.

## 2. Source payload and integrity

The lesson is in `docs/kurmanji-content-seed-part-03.sql`, which is explicitly labelled a draft data seed for Course 1 lessons 17–24, not a production migration.

- Seed blob SHA: `b6f89841ac49adb256a7874179a258436e095909`
- Lesson key: `kurmanji-course-1-lesson-18.html`
- Title: `نەفی لە ڕستەی سادەدا`

The reviewed payload contains:
1. Present-tense verbal negation with `na-`, four affirmative/negative pairs.
2. A mixed section on “knowledge and being”, with `Ez nizanim`, `Ez ne mamosteyek im`, and `Ew li vir nîne`.
3. Negative imperatives `Nexwîne!` and `Neke!`, plus a note claiming `me-` is older/regionally used.
4. Exercises and references to Gündoğdu (2015), Haig (2018), and Thackston.

No lesson text, seed, migration, or application code was changed in this audit.

## 3. Evidence by grammatical construction

### 3.1 Present indicative verbal negation

Haig (2018), §2.6.1, states that present-stem forms take one of the relevant prefixes: indicative `di-`, subjunctive `bi-`, or negative `na-` (which replaces the indicative prefix). The ordinary alternation is therefore:
- `di-ç-im` → `na-ç-im`
- `di-xwîn-im` → `na-xwîn-im`

Gündoğdu (2015), “Negation in Kurmanji”, pp. 154–172, independently analyses negation as a templatic prefix system with blocking: negative morphology occupies the relevant prefix slot and prevents co-occurrence with prefixes such as progressive `di-` and subjunctive `bi-`. Her abstract explicitly identifies `n(a)-`, `n(e)-`, and `ni-`.

The seed's examples `Ez naxwînim`, `Ez naçim`, `Ez nanivîsim`, and `Ez nabêjim` are structurally consistent with this general Standard Kurmanji pattern. However, the explanation should say “ordinary present indicative forms” rather than imply a universal rule for all verbs and all present-like constructions.

### 3.2 Lexical exceptions: `zanîn` and `karîn`

Haig (2018), §2.6.1, explicitly lists `zanîn` and `karîn` as the two verbs that negate their present stems with `ni-`: `nizanim` and `nikarim`. Harvard/Uppsala, *Kurmanji Kurdish for the Beginners*, Lesson 3, provides the full person paradigms for both verbs. Thackston also records the irregular present negative paradigms.

The seed's `Ez nizanim` is supported. The exercise should include `karîn` as a parallel exception, not leave it implicit. Do not teach `ni-` as a free all-purpose alternative to `na-`; it is lexically restricted in this standard description. Haig also notes `šiyan` in Behdinī and Şemzînan varieties with a different negative form, which is a reason not to erase dialect labels.

### 3.3 Subjunctive negation

Haig (2018), §2.6.1, explicitly says `ne-` replaces the subjunctive prefix `bi-`. Gündoğdu's analysis similarly treats negative morphology as blocking the affirmative mood prefix. Thus:
- affirmative subjunctive `biçim`
- negative subjunctive `neçim`

This rule should be taught separately from present indicative `na-`. It is not enough to say that `ne-` is only “for other tenses”; mood is a key conditioning factor even where the verb is built on a present stem. Haig's future discussion (§2.6.4) also shows that negative future constructions can retain the future particle and use subjunctive negation, with dialectal differences.

### 3.4 Past negation and the retained `di-`

Haig (2018), §2.6.1, states that simple and progressive past are negated by adding `ne-`; his examples contrast `ne-hatin` ‘they did not come’ and `ne-di-hatin` ‘they were not coming’. The `di-` in past progressive is not replaced: it remains after the negative prefix.

Gündoğdu (2015) makes the same distinction explicitly: present indicative `di-` is blocked by negation, but past progressive `di-` follows the negative marker, e.g. `nediçûm` ‘I was not going’. Thackston §18.2 likewise gives `nedidîtim` for past habitual/progressive negation.

**Regional qualification:** Haig's footnote to the Standard Kurmanji rule records `na-` for past progressive negation in Western Kurmanji (Adıyaman–Urfa), with an example of the type `na-de-kir-in`. Haig's later Western Kurmanji description (§3.4.2.3) also documents a distinct negative imperfective prefix `nɔ-` and imperative `mæ-`. These patterns must be attributed to the described western varieties, not blended into a single pan-Kurmanji paradigm.

The current lesson omits past negation entirely. Given the lesson title and its attempt to contrast the negative forms, at minimum it should warn learners that the negative prefix does not always displace `di-`; a later dedicated tense lesson could carry the full paradigm.

### 3.5 Non-verbal predicates and negative existence

The current section “نەفیی زانیاری و بوون” groups a lexical verb, a non-verbal copular predicate, and a negative locative/existential clause. These are not one construction.

- `Ez nizanim` is ordinary verbal negation of the lexical verb `zanîn`, with its exceptional `ni-`. It does not belong under non-verbal/copular negation.
- `Ez ne mamoste me` is supported as a non-verbal negative predicate by Kurdi School and Indiana University's CeLCAR Kurmanji listening guidelines. Thackston gives parallel examples such as `ez ne kurd im` ‘I am not Kurdish’ and `né báş e` ‘it is not good’. The particle `ne` precedes the constituent being negated; it is not attached to the copula.
- The seed's exact form `Ez ne mamosteyek im` is not the same as the attested beginner model `Ez ne mamoste me`. The indefinite noun form and the copular ending require a native/editorial check before retaining that exact sentence. Do not silently normalize it.
- `nîne` is a negative existential form (‘is not there/does not exist’), not simply a regular inflected negative copula. Haig (2018) documents `nîne` in a possession/existence example, `min trimbêl nîne` ‘I do not have a car’, in the relevant southeastern construction. The exact seed sentence `Ew li vir nîne` is plausible but was not verified verbatim in the reviewed primary sources; it needs native-speaker review and a clearly scoped explanation of existential/location negation.

Recommendation: split this section into (a) negative non-verbal predicate with `ne`, and (b) negative existence/location with `nîne`, clearly marked as a distinct form. Move `nizanim` back to the verbal exceptions subsection.

### 3.6 Negative imperative: `ne-` and `me-`

The current lesson presents `Nexwîne!` and `Neke!` with `ne-`, then calls `me-` older/regionally used. The evidence is more nuanced:

- Thackston §17 explicitly calls `né-` the negative imperative prefix and gives `néçe`, `néke`, `négire`, and other examples.
- A 2025 study in *Anemon Muş Alparslan Üniversitesi Sosyal Bilimler Dergisi* documents both `ne-` and `me-` in spoken Kurmanji and argues, from its own historical and written-language position, that `me-` should be preferred in writing. This is an editorial proposal, not a universally settled standard.
- Haig (2018) distinguishes imperative forms from the ordinary indicative/subjunctive prefix slot and documents a western variety with `mæ-`. That supports regional variation, not a simple age-only label.

The two seed examples with `ne-` have support in Thackston's paradigms. But the note “older/regionally used” overstates what the evidence establishes. A better treatment would identify the chosen teaching norm, cite the alternative, and label the variety/register. The course's reference-variety decision remains a prerequisite for choosing one as the default. Do not replace the examples before that decision and native review.

### 3.7 Compound verbs and preverbal particles

The current lesson does not yet give a compound-verb example, but this is an important limit on any simplified “prefix replaces prefix” rule.

Gündoğdu (2015) describes the Standard Kurmanji pattern in which a preverbal particle remains outside the inflectional prefix: her example contrasts `ve-di-kim` with negative `ve-na-kim`. The negative `na-` occurs between `ve-` and the verb stem; it replaces `di-` rather than being inserted before the particle.

Haig (2018), §3.4.1.2, explains that in Standard Kurmanji inflectional prefixes such as negation and indicative/imperfective are inserted between the preverb and the stem. In Southeastern Kurmanji, however, negation and imperfective prefixes often precede the preverb because the preverb+stem has become lexicalized as a new stem. Haig gives `ra-di-keve` in Standard Kurmanji and `di-helē-t` / `ne-di-řa-westīya-m` in Şemzînan examples illustrating the alternative positioning.

Do not add a universal template for all compounds. If a compound example is added, use one explicitly labelled Standard Kurmanji model and a separate regional note. The seed's lesson currently does not teach this complexity; a concise “compound verbs may differ in prefix placement” caution is sufficient at this level.

## 4. Audit of current lesson claims and examples

| Current item | Evidence status | Editorial disposition |
|---|---|---|
| `di-` → `na-` in ordinary present indicative | Supported | Retain, but scope to ordinary present indicative forms |
| `Ez naxwînim`, `Ez naçim`, `Ez nanivîsim`, `Ez nabêjim` | Morphologically consistent | Retain provisionally; native-speaker sentence-level review still recommended |
| `Ez nizanim` | Directly supported | Retain; label lexical exception |
| Missing `nikarim` | Important omission | Add to proposal for the exception paradigm |
| `Ez ne mamosteyek im` | Exact form not verified; differs from attested beginner model | Hold for native review; compare with `Ez ne mamoste me` |
| `Ew li vir nîne` | Construction plausible; exact sentence unverified | Keep provisional; explain `nîne` as negative existential/location |
| `Nexwîne!`, `Neke!` | Supported by Thackston's negative imperative pattern | Retain provisionally; define teaching norm |
| `me-` described only as older/regionally used | Over-simplified | Revise explanation only after reference-variety decision |
| No subjunctive negative example | Significant omission | Add a clearly labelled `bi-` → `ne-` model in the proposal |
| No past progressive contrast | Significant omission | Add a brief contrast such as `diçûm` / `nediçûm` |
| No compound-verb qualification | Scope limitation | Add a concise caution; do not universalize particle placement |

All Sorani explanations and translations still require a separate Sorani copy-editor review. The Kurmanji examples also need native-speaker validation for idiomaticity and consistency with the course's eventual reference variety.

## 5. Proposed pedagogical sequence (not applied)

1. **Present indicative:** `di-` versus `na-`, with two or three ordinary verbs.
2. **Lexical exceptions:** `nizanim` and `nikarim`.
3. **Subjunctive:** `bi-` versus `ne-`.
4. **Past contrast:** simple past `ne-` versus past progressive `ne-di-`; note Western regional alternatives.
5. **Non-verbal predicate:** `ne` before the negated predicate, not attached to the copula.
6. **Negative existence/location:** explain `nîne` separately.
7. **Negative imperative:** show the chosen teaching norm and acknowledge the `ne-/me-` variation.
8. **Compound-verb caution:** prefix placement may vary with the preverb and regional variety.

## 6. Primary and supporting sources

1. **Haig, Geoffrey (2018).** “Northern Kurdish (Kurmanjî),” in *The Languages and Linguistics of Western Asia: An Areal Perspective*, pp. 106–158. Especially §2.6.1 (TAM and negation prefixes), §2.6.3 (mood), §3.4.1.2 (preverb incorporation), and §3.4.2.3 (Western Kurmanji verbal negation). Open PDF: https://multicast.aspra.uni-bamberg.de/data/pubs/Haig2018_Northern-Kurdish_Kurmanji.pdf
2. **Gündoğdu, Songül (2015).** “Negation in Kurmanji,” in *Affix Ordering Across Languages and Frameworks*, pp. 154–172. DOI: https://doi.org/10.1093/acprof:oso/9780190210434.003.0007. Especially useful for the templatic analysis, `na-/ne-/ni-`, compound-verb placement, and the past-progressive exception.
3. **Thackston, W. M. (2006).** *Kurmanji Kurdish: A Reference Grammar with Selected Readings*. Especially §17 (imperative and negative imperative), §18.2 (negative simple past), and the present negative paradigms for `zanîn` and `karîn`. PDF: https://sites.fas.harvard.edu/~iranian/Kurmanji/kurmanji_complete.pdf
4. **Harvard/Uppsala (2008).** *Kurmanji Kurdish for the Beginners*, Lesson 3. Supports the present negative paradigms for `zanîn` and `karîn`, irregular `hatin` and `anîn`, and the positioning of present prefixes in compound verbs. PDF copy: https://www.kurdipedia.org/files/books/2023/474430.PDF?ver=133232623527294231
5. **Indiana University CeLCAR (2023).** *Kurmanji PTP Guidelines for Listening Skills*. Contains the model `Ez ne mamoste me` ‘I am not a teacher’. https://celcar.indiana.edu/assessment/proficiency_guidelines/Kurmanji%20Listening%20Guideline.pdf
6. **Kurdi School.** “Kurmanji grammar, explained simply.” Provides `Ez ne kurd im` and the non-verbal predicate pattern. https://kurdischool.com/grammar.html
7. **2025 Muş Alparslan University study.** *Anemon Muş Alparslan Üniversitesi Sosyal Bilimler Dergisi*, 13(1), pp. 332–362. Discusses `ne-/me-` negative imperative variation and makes an explicit written-language recommendation. This is one scholarly position, not a universal standard. https://dergipark.org.tr/en/download/article-file/4511943

## 7. Open decisions and release gates

- The project still needs an explicit reference-variety and written-standard decision before choosing `ne-` or `me-` as the only default negative imperative.
- Native-speaker review is required for the exact non-verbal and existential examples, particularly `Ez ne mamosteyek im` and `Ew li vir nîne`.
- Sorani glosses need a separate copy-edit.
- The lesson should not imply that `di-` is always deleted by negation: past progressive is a clear counterexample.
- The lesson should distinguish the verbal exception `nizanim` from non-verbal negation.

## 8. Change boundary

This report is documentation only. It does **not** edit lesson content, seed SQL, migrations, application code, CI, Supabase, production data, PR #3, `main`, or deployment state. No database was accessed.
