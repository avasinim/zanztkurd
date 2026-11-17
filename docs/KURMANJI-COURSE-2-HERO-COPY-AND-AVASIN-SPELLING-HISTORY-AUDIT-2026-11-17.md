# Course 2 Hero Copy and Avasin Spelling-History Audit
Date: 2026-11-17
Branch: fix/kurmanji-ci-current-migration
Starting HEAD: 26bd50fc4712f1b66eaafc2b0e3cee7dead86a4c
Pre-work backup: backup/kurmanji-c2-hero-spelling-audit-before-2026-11-17
Scope: static source/history review; no lesson edits or database access.

## 1. Purpose and separation of content surfaces

The twelve root-level Kurmanji Course 2 pages contain distinct content surfaces:
- a lesson title (`<h1>`);
- a hero/intro paragraph in the page shell;
- a lesson-body placeholder with `data-lesson-key`, populated from the protected lesson-content source at runtime.

The prior payload comparison established that page headings match seed titles 12/12, while lesson-body content lives in the seed/database payload rather than being embedded in the static page shell. This audit therefore reviews the hero paragraphs separately. It does not treat them as replacements for the lesson body.

## 2. Hero paragraph inventory

| Lesson | Git blob | Hero paragraph — content summary | Editorial review |
|---:|---|---|---|
| 01 | `7bbff150b81323b730b55044d33202c269b1aff4` | Defines morphology as study of internal word structure and word formation; names root, affix and form change | Good concise orientation. Consider whether “واتای ڕێزمانی” is sufficiently precise for the intended beginner audience; no correction made. |
| 02 | `9441b795ca765cff53b586e4ee7cbb1d8cf16b32` | Defines root, prefix and suffix, and says identification requires comparison across related forms | Good methodological caution. Contains the spelling form `پەیویستی`; align only after the house spelling is formally approved. |
| 03 | `4eff4efd3f94c869209dd8c1e6f2030ad524bd37` | Introduces noun, grammatical gender and singular/plural, with relevance to ezafe and some case markers | Sound scope preview. The term “ڕەگەزی ڕێزمانی” is understandable; glossary consistency should be checked across the full course. |
| 04 | `e42d0b000ca59ceccd8ce1914691d9c55143ea87` | Explains -ek as a common indefinite singular marker, while bare nouns depend on context | Good qualification; avoids claiming -ek is the only definiteness cue. |
| 05 | `3e230a4b23438e1672c0ee0ca8de25b2e0625713` | Introduces ezafe as a link between head noun and modifier/possessor; agreement follows head noun gender/number | Good preview. Maintain the distinction between head-noun agreement and possessor case in the lesson body. |
| 06 | `6ce17fbea4a4a7fd3d423c8a40854d9bc3b5fd58` | Introduces possessive nominal constructions and possessive pronouns | Scope is clear. Could mention reflexive possession only if lesson body actually covers it; no expansion proposed. |
| 07 | `cdfe36d254b8f52268c8f2fa7c96f5e9185d0671` | Introduces direct/oblique pronouns and their importance in clause structure, especially past transitive clauses | Good; avoids equating case with subject/object. |
| 08 | `4ccc1f31a68e63d39abf1701a243ced6e69f7af3` | Introduces verb roots and person, number, tense/mood; notes transitive/intransitive and present/past contrasts | Good broad preview. Ensure terminology does not collapse tense and mood in the teaching sequence. |
| 09 | `2d90b9e28c1d3fea328f48384f05c50fcfccc4da` | Introduces tense/aspect forms and future as a construction, not a uniform suffix | Particularly useful guardrail. Keep the exact distinction reflected in examples and assessment. |
| 10 | `a2d8459c89709f92c776dee5c88947b9aa6e94ac` | Introduces negation and interrogatives via verb type, tense, intonation, question words and clause structure | Good high-level framing. Avoid implying one universal question particle or a single negation pattern. |
| 11 | `1e59da2dec5c3f8a80ef0e0125e3060872899fd9` | Introduces word order as sensitive to clause/verb type, object and information structure; SOV is basic but not exceptionless | Good discourse-aware framing. |
| 12 | `250553bf0b41419d428af215ed4fd5411c007357` | Frames lesson as review of lessons 1–11 and warns against unsupported generalization | Good metacognitive objective. Do not call it a validated scored exam without a separate assessment specification. |

## 3. Editorial consistency observations

This is an inventory of review candidates, not an instruction to rewrite:
- The hero copy is Sorani-language instructional framing for Kurmanji target-language content. It should follow the Sorani/Avasin house orthography, while Kurmanji examples retain their Hawar Latin forms.
- The visible hero paragraphs contain inconsistent spellings across the set, including `پەیویستی` / `پێویستە`, `نیە` / `نییە`, and `نوسین` / `نووسین` in the broader lesson payloads. These are separate orthographic decisions and should not be silently normalized without the owner-approved house style.
- Some paragraphs use broad terms such as “کات/ڕەوش” or “کردارێکی ڕێزمانیی”; confirm that the controlled glossary gives learners stable distinctions for tense, aspect, mood, negation and interrogative construction.
- Keep the hero paragraph concise: it should orient the learner, not duplicate the lesson body or introduce rules not taught and assessed below.
- Hero-copy review must be independent of the HTML body payload audit. A body payload matching its seed does not establish that the page-shell intro is accurate or approved.

## 4. Spelling history — what Git history actually establishes

The four Course 2 seed/release body deltas previously identified are:
- Lesson 04: `پەیویستە` → `پێویستە`
- Lesson 06: `پەیویستە` → `پێویستە`
- Lesson 09: `نوسینەی` → `نووسینەی`
- Lesson 10: `نوسینی` → `نووسینی`

Git history for seed part 04 records:
- 2026-10-21: `normalize Avasin spelling in Kurmanji seed part 04`;
- 2026-10-22: several source and grammar clarifications for Course 2 lessons, including case, ezafe, pronoun paradigms and source attribution;
- 2026-10-24: `text: apply Avasin Code spellings to Kurmanji lesson Sorani` and `Apply Avasin orthography to Kurmanji seed content`;
- later 2026-10-24/25 spelling/title corrections in the same seed partition.

Git history for seed part 05 records:
- 2026-10-21: `normalize Avasin spelling in Kurmanji seed part 05`;
- 2026-10-22: lesson-specific source-backed refinements for lessons 7–11, including pronouns, tense/aspect, negation and word order;
- 2026-10-22: explicit spelling updates in lessons 8 and 9;
- 2026-10-24: `text: apply Avasin Code spellings to Kurmanji lesson Sorani` and `Apply Avasin orthography to Kurmanji seed content`.

The root page-shell history also includes a 2026-10-21 commit titled `fix: align Kurmanji wrapper with Avasin spelling` for lessons 04, 06, 09 and 10. That history concerns the wrapper/page shell and does not, by itself, establish the approval authority for the later seed-body spellings.

**Interpretation:** Git history establishes that a set of changes was labelled as Avasin spelling normalization and that later seed payloads incorporated those forms. It does not establish who formally approved each individual spelling, what exact style guide governed it, or that the current proposal document was ratified. Commit messages are provenance clues, not a signed editorial decision.

## 5. Editorial policy status

The repository's `KURMANJI-REFERENCE-VARIETY-EDITORIAL-POLICY-PROPOSAL-2026-11-16.md` explicitly labels itself “Proposal only — requires owner and specialist-editor approval.” It recommends a consistent written target, distinguishes standard written forms from regional variants, and requires an approved orthography guide before lesson rewriting. It is not a ratified spelling authority.

Consequently:
- Do not declare `پێویستە`, `نووسین`, or `نییە` formally canonical solely because a commit message says “Avasin spelling.”
- Do not revert to the older forms either.
- Preserve the current branch content while recording these as pending house-style decisions.
- Do not conflate Sorani instructional prose spelling with Kurmanji Hawar Latin orthography.

## 6. Recommended review sequence

1. Approve a short Sorani house-style sheet covering the disputed forms, negation/copula spellings, hamza/diacritics, spacing and punctuation.
2. Have a Sorani editor review the 12 hero paragraphs as one consistent set, without altering the Kurmanji target-language examples.
3. Have the Kurmanji specialist review only the grammatical scope and terminology claims in each hero paragraph against its lesson body.
4. Record separate owner/editor sign-off for each change set.
5. Only after explicit approval, prepare a patch on the isolated branch and compare rendered lesson pages. Do not edit protected lesson content or seed SQL as part of this documentation-only stage.

## 7. Safety and change statement

- Documentation-only audit.
- No hero copy, lesson page, seed SQL, migration, application code, schema, test or workflow changed.
- No Supabase connection, live query, migration execution, deployment, PR edit or merge occurred.
- `main` remains unchanged.
- This report is a review inventory, not editorial approval or release certification.
