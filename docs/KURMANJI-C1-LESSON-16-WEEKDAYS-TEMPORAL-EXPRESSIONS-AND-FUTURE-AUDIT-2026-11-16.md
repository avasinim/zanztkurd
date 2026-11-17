# Course 1 Lesson 16 — weekdays, temporal vocabulary and time-expression audit

Date: 2026-11-16
Repository: avasinim/zanztkurd
Working branch: fix/kurmanji-ci-current-migration
Baseline HEAD: cd7dfe847a525b2d3e55f8e2c973b9446aa91f54
Pre-work backup: backup/c1-l16-weekdays-time-before-2026-11-16
Scope: exact Lesson 16 payload, claim register items 16.1–16.6, weekday citation/oblique forms, time adverbs, morning/tomorrow distinction, and sentence-level tense. Documentation-only; no lesson or seed content changed.

## 1. Executive finding

The seven weekday citation forms are a well-supported beginner set. The lesson's main weakness is not the weekday list itself but the lack of inflected weekday forms for “on Monday/on Tuesday,” which learners need to construct the very sentences requested by the exercises.

Three material issues require editorial attention:

1. **doh is not the spelling supported by the primary teaching sources reviewed.** Harvard/Uppsala gives duhî; contemporary Kurmanji teaching references commonly give duh. Preserve the variation as source-specific pending house-style selection; do not silently normalize.
2. **The entry sibê = tomorrow / next morning conflates forms and functions.** Harvard/Uppsala distinguishes sibeh “morning” from sibe “tomorrow”; Ekici documents sibehê as “in the morning” and also records a tomorrow reading in a temporal context. Teach the contrast with examples and retain the spelling policy as unresolved.
3. **Ez sibê têm is not a secure beginner model for explicit future tense.** The Harvard/Uppsala course forms future clauses with dê plus a present-subjunctive verb (e.g. Alan dê sibe deh saetan kar bike); Thackston likewise describes the future with -ê/dê and the present subjunctive. The current sentence may reflect a colloquial or context-dependent present-for-future use, but the reviewed sources do not establish it as the standard explicit-future model. Mark it for specialist/native review rather than silently replacing it.

**Release decision: weekday citation list supported; time vocabulary partly supported; sentence set not release-certified until temporal morphology, weekday oblique forms, and the future example receive review.**

## 2. Exact artifacts inspected

| Artifact | Blob SHA | Use |
|---|---|---|
| docs/kurmanji-content-seed-part-02.sql | aa5af4960256ee56955f0904c073c49bcc54a629 | Exact draft Lesson 16 payload |
| docs/KURMANJI-COURSE-1-LESSONS-13-18-CLAIM-LEVEL-EVIDENCE-REGISTER-2026-11-16.md | 4519b677e3c09f09a175763a37dffbb41486a329 | Claims 16.1–16.6 |

The SQL seed is a tracked draft and is not proof of live database content. It was read as text only; no SQL was executed.

## 3. Evidence base

### 3.1 Harvard Faculty of Arts and Sciences / Uppsala University, Kurmanji Kurdish for the Beginners (2008)

Lesson 4, §2.2, lists the seven weekday forms: duşem, sêşem, çarşem, pêncşem, în, şemî, yekşem. It gives the attested weekday phrases Îro çi roj e?, Îro pêncşem e, and Ez roja sêşemê diçime cem malbata xwe. It also gives Duhî “yesterday,” îro “today,” sibe “tomorrow,” niha “now,” and paşê “later.” The same course distinguishes sibeh “morning” from sibe “tomorrow” in its time-of-day vocabulary and gives sibehê in morning-time examples.

The same teaching course explicitly models the future: Alan dê sibe deh saetan kar bike. This is directly relevant to the lesson's Ez sibê têm example.

Source: https://www.kurdipedia.org/files/books/2023/474430.PDF
Evidence: Lesson 4 lines 1165–1225; Lesson 6 lines 1986–1997.

### 3.2 Deniz Ekici, Kurmanji Kurdish Reader (2007)

The grammar treats all weekdays as feminine and gives oblique weekday forms: şemîyê, yekşemê, duşemê, sêşemê, çarşemê, pêncşemê, înê [înîyê]. Examples include Ew, [roja] şemîyê diçin bindarûkê, Tu yekşemê dixebitî?, and Ders rojên çarşemê tên dayîn. Thus the uninflected weekday list is not enough to teach “on [weekday]”; temporal/oblique forms matter.

Ekici also gives the periods of day in oblique form: sibehê “in the morning,” berî nivroyê, nîvroyê, piştî nîvroyê, êvarê, şevê, and nîveşevê. Its example Sibehê hevalê min hat... is explicitly “in the morning,” while another example uses sibehê piştî nîvroyê with a future-oriented reading “tomorrow afternoon.”

Source: https://www.academia.edu/182574/Kurmanji_Kurdish_Reader
Evidence: grammar sections “The Days of the Week in the Oblique Case” and “The Periods of the Day in the Oblique Case,” pp. 35–36.

### 3.3 W. M. Thackston, Kurmanji Kurdish: A Reference Grammar with Selected Readings (2006)

Section 9.2 confirms the same seven weekday roots and explains a specific inflectional pattern: the final b in şemb is normally absent in the nominative (şem) but restored in oblique and construct forms (roja şembê). Section 9.3 uses saet (also seet) for “hour” and gives saet sisê sibehê/şevê for three o’clock in the morning/at night.

For future tense, §16.2 states that the future is formed with -ê or dê attached to the personal pronoun, followed by the present-subjunctive conjugation. This supports treating an explicit future construction as a distinct grammatical pattern, not assuming that any present-tense form with a time adverb is automatically the future model.

Source: https://sites.fas.harvard.edu/~iranian/Kurmanji/kurmanji_complete.pdf
Searchable copy: https://www.academia.edu/5485402/Kurmanji_Kurdish_A_Referance_Grammar_with_Selected_Readings_by_W_M_Thackston
Evidence: §§9.2–9.3, pp. 25–26; §16.2, future tense.

### 3.4 Contemporary instructional cross-check

Kurdi School's current grammar page uses the weekday names and explicitly teaches roja Şemiyê, roja Sêşemê for “on Saturdays/Tuesdays”; its time section uses Duh for “yesterday” and Sibê for “tomorrow.” Kurdish Academy's current beginner course likewise lists Sibe and Duh. These sources corroborate contemporary spellings, but they do not erase the differences between their own forms and the 2008 Harvard/Uppsala material.

Sources:
- https://kurdischool.com/grammar.html
- https://kurdishacademy.ch/kurmancu00ee/dersen/courses/course-10.html

## 4. Claim-by-claim assessment

| Current Lesson 16 item | Status | Finding |
|---|---|---|
| duşem, sêşem, çarşem, pêncşem, în, şemî, yekşem | SUPPORTED | All seven appear as a beginner teaching set in Harvard/Uppsala and Ekici; Thackston independently lists the same roots. |
| Weekday citation forms used as “on Monday/on Tuesday” | INCOMPLETE | Weekday names change in temporal/oblique use. Examples include duşemê, sêşemê, yekşemê, şemîyê / şembê, and Friday variants înê / înîyê. The lesson's exercises require sentence-making but do not teach this paradigm. |
| roj = day; şev = night | SUPPORTED — BASIC LEXICON | The meanings are standard beginner vocabulary. |
| sibê = tomorrow / next morning | PARTLY SUPPORTED; NEEDS DISTINCTION | sibe is listed as tomorrow; sibeh is morning; sibehê is an oblique temporal form “in the morning,” with a context-dependent tomorrow reading also documented. The current slash gloss collapses distinctions useful to beginners. |
| îro = today | SUPPORTED | Explicitly attested. |
| doh = yesterday | NOT VERIFIED IN SOURCES REVIEWED | The seed's doh differs from Harvard/Uppsala duhî and contemporary teaching forms duh. Treat as unresolved spelling/variety issue; do not declare impossible or silently correct. |
| niha = now; paşê = later | SUPPORTED | Both explicitly listed by Harvard/Uppsala. |
| zû = soon/early; dereng = late | PARTLY SUPPORTED | Plausible basic adverbs, but the lesson's paired Sorani glosses should be checked for the intended temporal vs manner/adjectival reading. |
| hefte, meh, sal = week, month, year | SUPPORTED — BASIC LEXICON | Basic noun meanings are not the principal risk. The lesson does not teach date formation, which is acceptable for its stated scope. |
| Îro duşem e. | STRUCTURE SUPPORTED; EXACT CLAUSE ADAPTED | The pattern Îro pêncşem e is directly attested in Harvard/Uppsala. Replacing the weekday with duşem is a transparent instructor-created substitution, not a source quotation. |
| Ez sibê têm. | UNRESOLVED / FUTURE-MARKING RISK | The sentence uses present indicative têm with a future adverb. The reviewed beginner course teaches explicit future with dê plus present subjunctive (Alan dê sibe deh saetan kar bike); Thackston describes the same future architecture. Do not certify this as the course's explicit future model without native and grammatical review. |
| Em îro dixwînin. | STRUCTURE PLAUSIBLE; EXACT SENTENCE NOT VERIFIED | Present-tense morphology is consistent with the basic pattern, but the exact clause and intended sense of dixwînin need a Kurmanji editor. |
| Ez niha amade me. | EXACT SENTENCE NOT VERIFIED | The copular/predicative pattern is plausible, but this sentence was not located verbatim in the primary sources reviewed. Treat as instructor-created pending native review. |
| Sorani glosses and lesson orthography | UNRESOLVED | Kurmanji sources cannot certify Sorani translations or determine the project's house spelling. |

## 5. Grammar and sequencing findings

### 5.1 Weekday inflection must accompany the citation list

A beginner can memorize duşem and still be unable to produce the common temporal phrase “on Monday.” Specialist teaching material gives forms such as duşemê, sêşemê, yekşemê; Ekici's paradigm also records şemîyê and Friday forms înê/înîyê. Thackston records a source-specific şem(b) alternation, with b absent in the nominative but present in oblique/construct şembê.

Editorial implication: add a small “on [weekday]” table only after the project selects a reference variety/orthographic policy. Keep source-specific forms side by side in the editorial notes; do not merge şemîyê and şembê as if they were one invariant spelling.

### 5.2 Distinguish morning from tomorrow

The seed currently gives sibê a combined gloss “tomorrow / next morning.” The sources support a useful teaching distinction:
- sibe (also written sibê in some instructional material): tomorrow;
- sibeh: morning;
- sibehê: in the morning / morning-time oblique form.

Ekici's example also shows why the semantic boundary should not be taught as absolute: sibehê piştî nîvroyê is translated “tomorrow afternoon.” Teach the common contrast and mark contextual usage rather than claiming a one-to-one rule.

### 5.3 Yesterday spelling requires a controlled headword

The current doh should be held. The Harvard/Uppsala course uses duhî; current Kurdi School and Kurdish Academy instructional pages use duh. The reviewed sources do not establish doh as the chosen Standard Kurmanji headword. This is an editorial/variety decision, not permission to silently change the seed.

### 5.4 Future tense is a grammar issue, not just vocabulary

The future example is the highest-priority sentence issue. The lesson already warns that future-time wording needs checking, but the current Ez sibê têm is still presented in the example table as a model. Harvard/Uppsala supplies a clear explicit-future pattern with dê and a subjunctive verb; Thackston's §16.2 independently describes this structure. Either:
- teach the explicit future construction in this lesson with a reviewed, source-aligned example; or
- label the present-tense sentence as a possible context-specific future reading only after a native speaker confirms it.

Do not fabricate a replacement conjugation from an unverified verb form.

### 5.5 Scope and pedagogy

The title promises weekdays and time, not a complete calendar course. It is reasonable to keep months, seasons, clock reading and date formation for later lessons. However, the exercise “write a sentence with a weekday and a time” requires at least one model of temporal weekday inflection. The lesson should either teach that minimal pattern or narrow the exercise.

## 6. Editorial resolution — proposal only

1. Retain the seven weekday citation forms as the core list.
2. Add a controlled, reference-variety-reviewed “on [weekday]” paradigm with examples such as duşemê and sêşemê; document source-specific Saturday and Friday variants.
3. Hold doh pending headword decision; compare duhî and duh with the project's selected dictionary and target variety.
4. Separate sibe/sibê “tomorrow” from sibeh “morning” and sibehê “in the morning”; do not collapse them into a single slash gloss.
5. Review Ez sibê têm with a Kurmanji grammarian. If the learning outcome is explicit future, use a vetted dê + subjunctive construction rather than an invented correction.
6. Keep Îro duşem e as an adapted example, not a quotation; its pattern is supported by Îro pêncşem e.
7. Mark Em îro dixwînin and Ez niha amade me as instructor-created pending native review.
8. Have a Sorani editor independently check all Sorani glosses and the exact intended meanings.
9. Resolve house orthography and reference variety before normalizing any of these forms.

## 7. Release decision

**NOT RELEASE-CERTIFIED YET.** The seven weekday roots are supported, but the learner-facing material needs weekday oblique forms, a controlled yesterday headword, a clean morning/tomorrow distinction, and sentence-level review of the future example. Native Kurmanji and independent Sorani editorial checks remain required.

## 8. Actions not taken

No lesson body, seed SQL, migration, schema, static page, application code, validator, test, database, PR #3, main branch, merge state or deployment was changed. No SQL was executed. No live database was accessed. This is a documentation-only audit.

## 9. References

1. Harvard Faculty of Arts and Sciences / Uppsala University (2008). Kurmanji Kurdish for the Beginners, Lesson 4, weekday/time vocabulary and temporal expressions; Lesson 6, explicit future examples. https://www.kurdipedia.org/files/books/2023/474430.PDF
2. Ekici, Deniz (2007). Kurmanji Kurdish Reader, “The Days of the Week in the Oblique Case” and “The Periods of the Day in the Oblique Case,” pp. 35–36. https://www.academia.edu/182574/Kurmanji_Kurdish_Reader
3. Thackston, W. M. (2006). Kurmanji Kurdish: A Reference Grammar with Selected Readings, §§9.2–9.3, pp. 25–26; §16.2, future tense. https://sites.fas.harvard.edu/~iranian/Kurmanji/kurmanji_complete.pdf
4. Kurdi School. “Kurmanji grammar, explained simply,” days/time section. https://kurdischool.com/grammar.html
5. Kurdish Academy. “Course 10 — Dem û Roj (Time & Days).” https://kurdishacademy.ch/kurmancu00ee/dersen/courses/course-10.html

## Backup record

- Pre-work backup: backup/c1-l16-weekdays-time-before-2026-11-16
- Baseline SHA: cd7dfe847a525b2d3e55f8e2c973b9446aa91f54
- Post-work backup: backup/c1-l16-weekdays-time-after-2026-11-16 (points to the final documentation commit after verification).
