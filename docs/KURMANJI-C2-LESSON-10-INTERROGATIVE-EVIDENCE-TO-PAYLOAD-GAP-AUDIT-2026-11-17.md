# Course 2 Lesson 10 — exact interrogative evidence-to-payload gap audit

Date: 2026-11-17  
Repository: avasinim/zanztkurd  
Working branch: fix/kurmanji-ci-current-migration  
Baseline HEAD: 91f0bf0789dfb71840819548b7af825c4d52b104  
Pre-work backup: backup/c2-l10-question-payload-audit-before-2026-11-17  
Scope: static comparison of the current Course 2 Lesson 10 protected-content seed and lesson shell against the existing interrogative evidence addendum. Proposal-only; no lesson edits.

## 1. Finding

**The interrogative evidence exists in the repository's academic review, but the current Lesson 10 payload does not yet teach it.**

The existing lesson contains a general statement that yes/no questions may be recognized by intonation and context, and that information questions use words such as who, what, where and when. It does not include a worked Kurmanji wh-question or yes/no question sentence from the evidence addendum.

This is a pedagogical implementation gap, not an absence of research evidence. The distinction matters: a source register cannot be treated as proof that the learner-facing lesson already contains the reviewed material.

## 2. Exact artifacts inspected

All reads were from commit `91f0bf0789dfb71840819548b7af825c4d52b104` on `fix/kurmanji-ci-current-migration`.

| Artifact | Blob SHA | What it establishes |
|---|---|---|
| `docs/kurmanji-content-seed-part-05.sql` | `e40298225e03921edb3ad31704191bdf0c20e880` | Current draft seed payload for Course 2 lessons 07–12, including Lesson 10 |
| `kurmanji-course-2-lesson-10.html` | `a2d8459c89709f92c776dee5c88947b9aa6e94ac` | Static shell, lesson title and protected-content key; body is loaded dynamically |
| `docs/KURMANJI-COURSE-2-LESSON-10-INTERROGATIVE-EVIDENCE-ADDENDUM-2026-11-16.md` | `a3719dac71b0f10d3643a175f60dd70dc16e112e` | Academic evidence, exact examples, variety limits and proposed teaching sequence |
| `docs/KURMANJI-C2-LESSONS-08-10-VERB-TAM-NEGATION-CLAIM-REVIEW-2026-11-17.md` | retrieved from the same baseline | Detailed review of negation, interrogatives and remaining lesson gaps |
| `docs/KURMANJI-COURSE-2-12-LESSON-INTEGRATED-EVIDENCE-CLOSURE-REPORT-2026-11-17.md` | retrieved from the same baseline | Course-wide closure status and independent P0 actions |

The SQL file is labelled a draft data seed and ends with `ROLLBACK`. This audit reads the file as repository text only; it does not execute SQL or establish what is currently stored in any live database.

## 3. What the current Lesson 10 payload actually teaches

The seed row is keyed as `kurmanji-course-2-lesson-10.html`, course `kurmanji-course-2`, title `ڕستەی نەفی و پرسیاری`.

Its interrogative section says, in substance:
- yes/no questions can be recognized through intonation and context;
- information questions use interrogative words such as who, what, where or when;
- word order should be checked against the standard variety and context.

It then gives three review questions, including “What are the two main types of questions?”

**Missing from the learner-facing payload:**
- a complete Kurmanji wh-question example;
- a complete Kurmanji yes/no question example;
- an explicit explanation that wh-words commonly remain in situ in the varieties studied;
- a clear example showing yes/no force conveyed by intonation without an obligatory question particle;
- an explanation of why `ma` is not a neutral, obligatory universal marker.

The static HTML page is only a shell. It contains the protected lesson key and a loading placeholder, so inspecting that shell alone cannot establish the full lesson body. The seed payload is the relevant checked-in body representation for this comparison.

## 4. What the evidence addendum already documents

The existing addendum cites Songül Gündoğdu (2011), *The Phrase Structure of Two Dialects of Kurmanji Kurdish: Standard Dialect and Muş Dialect*, especially thesis pp. 37–40.

### Wh-questions

The addendum records these source examples:
- `Tu diçî ku?` — “Where are you going?”
- `Kî pirtûkê dixwîne?` — “Who is reading the book?”
- `Zana çi dixwîne?` — “What is Zana reading?”
- `Zana kîngê pirtûkê dixwîne?` — “When is Zana reading the book?”

The evidence is for wh-in-situ in the Standard and Muş varieties examined. It must not be rewritten as a universal ban on fronting in every dialect or discourse context.

### Yes/no questions

The addendum records:
- `Te vê pirtûkê xilas kir?` — “Did you finish this book?”

It reports that the thesis describes intonation, including prominence/stress on the verb, and says an obligatory yes/no question particle is not required in the studied data.

### Particles

The addendum explicitly rejects teaching `ma` as an obligatory neutral universal yes/no particle. Thackston §34 describes pragmatic and expectation-sensitive uses. The status and distribution of `gelo` remain unresolved/register-sensitive in the evidence reviewed.

## 5. Exact evidence-to-payload gap

| Teaching outcome | Evidence status in repository | Current seed payload |
|---|---|---|
| Identify a wh-question | Supported by Gündoğdu (2011) | General description only |
| Recognize wh-in-situ as a common pattern | Supported for studied Standard/Muş data | Not explained |
| Form/recognize a yes/no question through intonation | Supported for studied Standard/Muş data | Mentioned generally, without a worked example or intonation cue |
| Avoid treating `ma` as obligatory and neutral | Supported by thesis plus Thackston §34 | Not explained |
| Teach `gelo` as a universal marker | Not supported; scope unresolved | Not included, correctly |

**Disposition:** the lesson is partially aligned with the evidence at the level of broad description, but does not yet deliver the worked interrogative teaching sequence already specified in the addendum.

## 6. Safe correction proposal — not applied

Subject to owner/editor approval and native Kurmanji review, the lesson can be strengthened without expanding its scope excessively:

1. Retain the current distinction between yes/no and information questions.
2. Add two or three source-attested wh examples, with their original Latin forms preserved and a brief note that wh-words commonly remain in situ in the studied varieties.
3. Add the cited yes/no example and a short note that intonation can mark the question without an obligatory particle in the studied data.
4. Do not teach `ma` as a universal neutral marker; if retained, explain its pragmatic force with a source-attested example.
5. Keep `gelo` outside the core beginner rule until its variety and register scope are established.
6. Have a native Sorani editor verify every translation and the Sorani terms for question type, intonation, stress and word order.
7. Label source-attested examples separately from adapted or instructor-created material. Do not silently change diacritics, case forms or transcription.

No exact Sorani translations are proposed in this audit because the source addendum's English glosses do not independently certify Sorani wording.

## 7. Release and change-control boundary

This audit does not certify:
- the live database payload;
- whether the draft seed was ever applied to production;
- live lesson loading, authentication, enrollment or progression;
- the correctness of every other Lesson 10 negation example;
- the full course's assessment or release readiness.

No lesson body, seed SQL, migration, schema, HTML shell, application code, validator, test, CI workflow, database, PR #3, main branch or deployment was changed. No SQL was executed and no production or staging database was accessed.

## 8. References

1. Gündoğdu, Songül. 2011. *The Phrase Structure of Two Dialects of Kurmanji Kurdish: Standard Dialect and Muş Dialect*. MA thesis, Boğaziçi University, Department of Linguistics, pp. 37–40. Institutional PDF: https://digitalarchive.library.bogazici.edu.tr/bitstreams/c22fcd85-97d8-4c48-98ab-8cc623449fff/download
2. Thackston, W. M. *Kurmanji Kurdish: A Reference Grammar with Selected Readings*, §34, “Questions with Ma.” PDF: https://zimannas.wordpress.com/wp-content/uploads/2020/04/kurmanji_complete.pdf
3. Haig, Geoffrey. 2018. “Northern Kurdish (Kurmanjî),” especially the discussion of Standard Kurmanjî and regional variation. DOI: https://doi.org/10.1515/9783110421682-004

## Backup record

- Pre-work backup: `backup/c2-l10-question-payload-audit-before-2026-11-17`
- Baseline SHA: `91f0bf0789dfb71840819548b7af825c4d52b104`
- Post-work backup: to be recorded after commit and exact ref/blob verification.
