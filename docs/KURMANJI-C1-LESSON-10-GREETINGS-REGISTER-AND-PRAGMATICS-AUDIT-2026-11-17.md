# Course 1 Lesson 10 — greetings, register and pragmatic scope audit

Date: 2026-11-17  
Repository: avasinim/zanztkurd  
Working branch: fix/kurmanji-ci-current-migration  
Baseline HEAD: 06a2b90b9da1988ad94292a615fdd99fe75c63b2  
Pre-work backup: backup/c1-l10-greetings-pragmatics-before-2026-11-17  
Scope: exact Course 1 Lesson 10 greetings, farewell, politeness, singular/plural address, and dialogue. Proposal-only; no lesson or seed content changed.

## 1. Executive finding

Lesson 10 is a useful beginner phrase set, and most core forms are corroborated. The main weakness is not that its phrases are wrong, but that the lesson presents several forms without consistently stating **who says them, to whom, in what number/register, and at what point in an interaction**.

The highest-value correction is to make singular versus plural/polite address explicit. The current lesson teaches `Tu çawa yî?`, `Bi xêr hatî!`, and `Bi xatirê te!` without showing their plural counterparts. Primary course materials and independent phrase references explicitly distinguish these forms:

- `Tu çawa yî?` → one addressee; `Hûn çawa ne?` → plural or polite address.
- `Bi xêr hatî!` → one person; `Bi xêr hatin!` → more than one person.
- `Bi xatirê te!` → one person; `Bi xatirê we!` → more than one person.
- The person leaving says `Bi xatirê te/we`; the person staying may reply with `Oxir be` or a fuller variant.

A second issue is gloss precision: `Rojbaş` is best glossed as “good day/daytime greeting,” not treated as an exact synonym for a morning-only greeting. `Şevbaş` is a “good night” expression; its function should not be narrowed to a fixed farewell-only formula.

## 2. Exact repository artifacts inspected

| Artifact | Blob SHA | Relevant content |
|---|---|---|
| `docs/kurmanji-content-seed-part-02.sql` | `aa5af4960256ee56955f0904c073c49bcc54a629` | Draft Course 1 Lesson 10 exact phrase tables, dialogue and exercise |
| `docs/KURMANJI-COURSE-1-LESSONS-07-12-CLAIM-LEVEL-EVIDENCE-REGISTER-2026-11-16.md` | Existing register | C1-L10-01 through C1-L10-07; scope, spelling, register and Sorani review gates |
| `docs/KURMANJI-C1-LESSON-09-TOPONYM-OBLIQUE-CASE-AND-SENTENCE-VERIFICATION-AUDIT-2026-11-17.md` | `b9b3c0d837e840c0165420144620122fbfad287c` | Provenance distinction for learner-created versus verbatim examples |

The seed is a checked-in draft SQL file, not proof of live database content. It was read as text only; no SQL was executed.

## 3. Source evidence

### 3.1 Harvard / Uppsala beginner course — singular/plural and farewell roles

*Kurmanji Kurdish, Lesson 1*, prepared by the Kurdish language course (Harvard Faculty of Arts and Sciences / Uppsala Universitet), pp. 4–5:

- `Beyanîbaş / spêde bi xêr / Sibeha te bi xêr`: one person; `... we bi xêr`: more than one person.
- `Êvarbaş / Êvara te bi xêr`: one person; `Êvara we bi xêr`: more than one person.
- `Şevbaş / Şeva te bi xêr`: one person; `Şeva we bi xêr`: more than one person.
- `Çawa yî?`: singular; the course also gives a plural form (printed/transcribed as `Çawa nin?` in this edition; do not copy that form without specialist verification).
- `Bi xatirê te`: goodbye to one person; `Bi xatirê we`: goodbye to more than one person.
- The response section explicitly gives `Oxir be`, `Oxira te ya xêrê be`, and `Bi xêr û silametî`.

Source PDF: https://muugumuugu.github.io/bOOkshelF/languagesNcodes/Kurmanji.pdf  
Retrieved lines: 301–324 (greetings and farewells).

This source strongly supports the addressee-number distinction and turn-taking role. It is a pedagogical course text; the specific regional and orthographic choices should be recorded rather than universalized.

### 3.2 Yari — contemporary beginner phrase guidance

Yari, “Kurdish greetings and everyday phrases for beginners (Kurmanji)”:

- `Silav` is presented as an all-purpose greeting.
- `Rojbaş` is “good day / good morning” during the day.
- `Êvarbaş` is for evening.
- `Şevbaş` is “good night,” when going to bed or leaving late.
- `Bi xêr hatî` welcomes one person.
- `Tu çawa yî?` is explicitly one-person/informal.
- `Bi xatirê te` is said by the person leaving; the person staying replies with `Bi xêr herî` or `Oxir be`.
- The page notes regional variation, including `spas/sipas`.

Source: https://yari.krd/learn/kurdish-greetings/  
Search-result content was accessible; direct page open timed out in this review. Treat it as a contemporary pedagogical corroboration, not a primary dialect study.

### 3.3 Şehîd Ciwan Education Committee — regional phrasebook and number marking

*Bingehên Zimanê / Language Basics*, 3rd edition, October 2018, published by Şehîd Ciwan Education Committee:

- The book explicitly says its basis is the Cizîre dialect of eastern Rojava and that it is a practical survival guide, “not” an academic correctness manual (front matter, pp. 1–2).
- It lists `Rojbaş` as literally “good day,” `Êvarbaş` as “good evening,” and `Şevbaş` as “good night.”
- It gives `Bi xêr hatî` for one person and `Bi xêr hatin` for several persons.
- It lists `Biborîne!` with the meanings “Sorry!” and “Forgive me!”
- It also includes alternative gratitude expressions, demonstrating that phrase choice is not limited to a single universal form.

Source PDF: https://agorism.dev/book/kurdish/Bingeh%C3%AAn-Ziman%C3%AA_ENG.pdf  
Retrieved lines: 28–35 (dialect/scope caveat); 376–407 (greetings, welcome and addressee number); 448–471 (thanks and `Biborîne`).

This is particularly valuable for the Cizîre variety and for the lesson's `Bi xêr hatî` and `Biborîne` forms. The source's own caveat should be retained: it is regionally based and not an academic standardization authority.

### 3.4 Wikivoyage Kurmanji phrasebook — apology and farewell variants

The English Wikivoyage Kurmanji phrasebook identifies itself as a phrasebook for Kurmanji and distinguishes:

- `Li min bibore/bibihure!` for apologizing / begging pardon.
- `Bi xatirê te!` singular and `Bi xatirê we!` plural, spoken by the person leaving.
- `Oxir bit!`, `Oxira xêrê bit!`, and `Oxira te/we ya xêrê bit!` as responses directed to the person leaving.
- It also distinguishes `Tu çawa yî?` (singular) and `Hûn çawa ne?` (plural).

Source: https://en.wikivoyage.org/wiki/Kurdish_phrasebook  
Retrieved lines: 138–141 (dialect scope); 164–176 (singular/plural forms); 195–208 (apology and farewell).

Wikivoyage is a community-edited phrasebook, so use it as corroborating usage evidence, not the sole authority for a house spelling or dialect-wide claim.

## 4. Claim-by-claim assessment

| Current Lesson 10 item | Status | Finding / required scope |
|---|---|---|
| `Silav!` — general greeting | SUPPORTED | Contemporary phrase source presents it as an all-purpose greeting; regional greeting variants exist. |
| `Rojbaş!` — “بەیانیت باش / ڕۆژباش” | SUPPORTED WITH GLOSS REFINEMENT | Literally “good day”; common daytime greeting and may be used in the morning. Avoid equating it exclusively with “good morning.” |
| `Êvarbaş!` — evening greeting | SUPPORTED | Consistent across Yari, Harvard/Uppsala course and Cizîre phrasebook. Preserve `Ê` in the chosen Hawar house style; note source variants only if needed. |
| `Şevbaş!` — good night | SUPPORTED | Sources gloss as “good night”; bedtime and late departure are both plausible contexts. Do not teach it as only a farewell. |
| `Bi xatirê te!` — goodbye | SUPPORTED, INCOMPLETE PARADIGM | Singular addressee. Add or at least note `Bi xatirê we!` for plural/polite address. Person leaving says it. |
| `Bi xêr hatî!` — welcome | SUPPORTED, INCOMPLETE PARADIGM | One addressee. `Bi xêr hatin!` is attested for several persons in the Cizîre-based booklet. |
| `Tu çawa yî?` — how are you? | SUPPORTED, INCOMPLETE PARADIGM | Singular/informal. Teach `Hûn çawa ne?` for plural or polite address. |
| `Ez baş im.` — I am well | SUPPORTED | Core response form corroborated by all phrase sources. |
| `Navê min Azad e.` | SUPPORTED | Beginner self-introduction structure corroborated by Harvard/Uppsala lesson; `Azad` is a replaceable example name. |
| `Tu kî yî?` | PLAUSIBLE; EXACT PRAGMATIC SCOPE NEEDS REVIEW | Basic “who are you?” form; avoid implying it is a neutral polite first-meeting question in every context. |
| `Ez ji ... me.` | SUPPORTED WITH PLACE-NAME CHECK | Standard origin formula; each inserted toponym must be independently inflected and verified (see Lesson 09 audit). |
| `Spas!` | SUPPORTED | `Sipas` is also reported; choose a house spelling and preserve sourced quotations. |
| `Ji kerema xwe.` — please | SUPPORTED | Common phrase; other regional alternatives exist (e.g. `zehmet nebe`). |
| `Erê`, `Na` | SUPPORTED | Basic yes/no forms. |
| `Biborîne.` — sorry | SUPPORTED WITH SPELLING/PRAGMATIC VARIATION | Cizîre booklet explicitly lists `Biborîne!`; Wikivoyage lists `bibore/bibihure` in `Li min ...` apology constructions. Do not claim a single universally fixed spelling or that all forms are interchangeable in every context. |
| `A: Silav! Tu çawa yî?` | SUPPORTED | Singular informal exchange. |
| `B: Ez baş im, spas. Tu çawa yî?` | SUPPORTED | Natural beginner pattern; the whole dialogue still needs a native-speaker check for local naturalness. |
| `A: Ez jî baş im.` | SUPPORTED WITH CONTEXT | `jî` conveys “also/too”; the response is structurally clear. |

## 5. Editorial resolution — proposal only

1. Keep the existing six main greeting/farewell expressions, but add an explicit **one person / several or polite person(s)** note.
2. Add the plural/polite forms `Hûn çawa ne?`, `Bi xêr hatin!`, and `Bi xatirê we!` as a compact comparison, not as a large new paradigm.
3. Explain farewell turn-taking: the person leaving says `Bi xatirê te/we`; the person staying may reply `Oxir be` (or another sourced local variant). Do not present both as identical speaker roles.
4. Gloss `Rojbaş` as “ڕۆژباش / ڕۆژێکی باش” and explain that it is used as a daytime greeting; “بەیانیت باش” can be retained as a contextual translation, not the sole exact gloss.
5. Keep `Şevbaş` as “شەوت باش / شەو باش” and describe it as “good night,” including bedtime or late-night parting contexts.
6. Keep `Biborîne` but label its pragmatic function as “sorry / forgive me” and acknowledge documented variants such as `Li min bibore` and `Li min bibihure`. Do not merge the forms without a Kurmanji specialist's approval.
7. Retain `Bi xêr hatî` for one person and add `Bi xêr hatin` for several; do not guess a feminine-specific form without source and specialist verification.
8. Preserve the distinction between phrase form, literal meaning, pragmatic function and Sorani translation.
9. Have a native Sorani editor review the Kurdish glosses, particularly “بەیانیت باش,” “خەڵکی ...م,” and the pragmatic equivalent of `Biborîne`.
10. Have a Kurmanji speaker from the chosen reference variety review the dialogue as a whole; the course still lacks a formally approved reference-variety decision.

## 6. Release decision

**Status: NOT RELEASE-CERTIFIED; moderate editorial gap, not a fundamental phrase-bank failure.**

Core greetings, thanks, yes/no and basic self-introduction are supported. Before release, the lesson needs:
- addressee-number/register labels for singular vs plural/polite forms;
- correct farewell speaker/response roles;
- tighter gloss for `Rojbaş`;
- a source-aware note on `Biborîne` spelling and apology constructions;
- native Kurmanji dialogue review and independent Sorani copy-edit.

## 7. Actions not taken

No lesson body, seed SQL, migration, schema, static page, application code, validator, test, database, PR #3, main branch, merge state or deployment was changed. No SQL was executed. No live database was accessed. This is a documentation-only audit.

## 8. References

1. *Kurmanji Kurdish, Lesson 1*. Harvard Faculty of Arts and Sciences / Uppsala Universitet, pp. 4–5. https://muugumuugu.github.io/bOOkshelF/languagesNcodes/Kurmanji.pdf
2. Şehîd Ciwan Education Committee. *Bingehên Zimanê / Language Basics*, 3rd ed., October 2018, pp. 1–5. https://agorism.dev/book/kurdish/Bingeh%C3%AAn-Ziman%C3%AA_ENG.pdf
3. Yari. “Kurdish greetings and everyday phrases for beginners (Kurmanji).” https://yari.krd/learn/kurdish-greetings/
4. Wikivoyage. “Kurdish phrasebook” (Kurmanji). https://en.wikivoyage.org/wiki/Kurdish_phrasebook

## Backup record

- Pre-work backup: `backup/c1-l10-greetings-pragmatics-before-2026-11-17`
- Baseline SHA: `06a2b90b9da1988ad94292a615fdd99fe75c63b2`
- Post-work backup: to be recorded after commit and exact ref/blob verification.
