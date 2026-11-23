# Course 2 — Terminology Consistency Audit (Lessons 01–12)
Date: 2026-11-23

## Scope and method
A documentation-only terminology audit of the 12 Course 2 lesson payloads stored in:
- `docs/kurmanji-content-seed-part-04.sql` — blob SHA `0e4bf967e3a0f7ce2d55b53199c0b417807b4930` (Lessons 01–06)
- `docs/kurmanji-content-seed-part-05.sql` — blob SHA `2581b9362ee7a0972076d475db56b034e0e662cb` (Lessons 07–12)

The check compared the Sorani instructional terms used in the actual seed text, titles and explanations. It is not a linguistic re-validation of the Kurmanji examples and does not authorize changes to lesson content.

## Terminology register

| Concept | Current course wording | Assessment | Editorial guidance |
|---|---|---|---|
| Root | ڕەگ | Used throughout, especially Lessons 01–03 and 08 | Keep, but define once and distinguish from base/stem. |
| Base | بنەڕەت | Lesson 02 explicitly distinguishes it from ڕەگ; Lesson 08 also uses it | Preserve the distinction. Do not use ڕەگ and بنەڕەت as interchangeable synonyms unless the specific analysis says so. |
| Stem | No stable Sorani equivalent established in the reviewed lesson text | Gap | Agree on one Kurdish term and define it separately from root/base before adding verb segmentation. |
| Morpheme | مۆرفیم | Used in Lessons 01, 02 and 12; مۆرفۆلۆجی is used for morphology | Keep مۆرفیم for morpheme and مۆرفۆلۆجی for morphology; do not conflate the two. |
| Prefix / suffix | پێشگر / پاشگر | Consistent in Lessons 02, 04, 05 and 12 | Keep these forms; identify function, not position alone, when analyzing an example. |
| Ezafe | ئەزافە | Used consistently in Lessons 03–06, 11 and 12 | Keep one spelling, ئەزافە; distinguish the ezafe linker from suffixes that merely look similar. |
| Direct / oblique case | حاڵەتی ڕاستەوخۆ / حاڵەتی ناڕاستەوخۆ | Consistent in Lessons 04, 07, 11 and 12 | Keep as the paired technical labels. Explain that these are grammatical case names, not everyday meanings of “direct/indirect.” |
| Grammatical gender | ڕەگەزی ڕێزمانی | Used in Lesson 03 and related content | Keep and explicitly distinguish from natural/biological gender. |
| Number | ژمارە | Used consistently with singular/plural concepts | Keep; add examples rather than varying the term. |
| Transitive / intransitive | کردارە تێپەڕەکان / کردارە ناتێپەڕەکان; also تێپەڕی/ناتێپەڕی کردار | Meaning is stable, but phrase forms vary | Choose one parallel form for headings and explanations; retain grammatical agreement as needed. |
| Tense | کات; examples include کاتی ئێستا، ڕابردوو، داهاتوو | Understandable, but not explicitly defined against aspect | Define کات as temporal location and consistently label present/past/future. |
| Aspect | ڕەوش | Appears only briefly in Lessons 08–09 | Needs a clear definition and consistent use. Do not equate aspect automatically with “ڕابردووی بەردەوام”; explain the contrast shown by each sourced example. |
| Subject / object | بکەر / بەرکار | Used in Lessons 06–08 and 11 | Keep the pair and label grammatical roles separately from direct/oblique case. |
| Pronoun | جێناو; personal pronoun جێناوی کەسی | Consistent | Keep; distinguish independent pronouns, oblique forms and possessive/reflexive uses. |

## Findings requiring editorial attention

### 1. Root, base and stem — high priority
Lesson 02 explicitly says ڕەگ and بنەڕەت can denote different units, which is a useful distinction. Lesson 01 and Lesson 08 also use root/stem-related explanations, but the course does not yet provide a single shared definition of **stem** or a stable Sorani equivalent. Before adding segmented verb examples, define all three separately:
- root: the lexical core identified by the chosen analysis;
- base: the form to which an affix is attached in the relevant operation;
- stem: the inflectional base used in the verbal or nominal paradigm, where that distinction is supported by the source.

These are working editorial definitions only; map them to the exact terminology of the chosen grammar source before publishing.

### 2. Tense and aspect — high priority
Lessons 08–09 introduce کات and ڕەوش but do not establish a clear paired definition. A learner may confuse a past-time form with an aspectual distinction. Add a shared definition and keep the source category visible; do not translate every imperfective form as a simple “continuous past” without contextual explanation.

### 3. Transitivity wording — medium priority
The course uses both “کردارە تێپەڕەکان” and “تێپەڕی کردار” styles. This is not necessarily a grammar error, but headings and definitions should use one parallel editorial pattern. Keep transitivity distinct from case: a transitive verb does not by itself tell the learner which case form appears in every tense or clause type.

### 4. Lesson 10 — unresolved technical label, critical
The heading **«نەفیی ڕستەی ناوەکی»** appears without a definition that makes its intended technical meaning clear. The source-focused review already flags this as unsupported in the checked source. Do not normalize it silently or guess its intended meaning. Replace it only after the author/editor confirms the intended concept; otherwise remove the heading and retain a plain, accurately named section on negation.

### 5. Stable terms that should not be changed casually
- Keep **ئەزافە** as the course spelling.
- Keep **حاڵەتی ڕاستەوخۆ / ناڕاستەوخۆ** as the paired case labels.
- Keep **بکەر / بەرکار** for subject/object roles, while explaining that grammatical role and case are not identical.
- Keep **مۆرفیم** distinct from **مۆرفۆلۆجی**.
- Preserve all Kurmanji Latin forms exactly as they appear in the source payload unless a source-verified correction is separately approved.

## Recommended editorial order
1. Approve a one-page terminology sheet for ڕەگ، بنەڕەت، ستێم، مۆرفیم، ئەزافە، حاڵەت، کات and ڕەوش.
2. Resolve the Lesson 10 heading with the content author; do not infer the intended technical category.
3. Standardize transitive/intransitive phrase forms and the presentation of subject/object roles.
4. Apply the glossary to Lessons 01–12 only after approval, without altering Kurmanji examples or source claims.
5. Re-read all 12 lessons after the terminology pass to ensure no term changes its meaning between lessons.

## Change boundary
Audit document only. No lesson HTML, seed SQL, migrations, application code, database, Supabase, main branch, deployment or production content was changed. Existing lesson payloads remain unchanged.
