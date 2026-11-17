# B3 dashboard and lesson-text normalization audit — 2026-11-17

## Scope and safety

- Repository: `avasinim/zanztkurd`
- Audited branch: `fix/kurmanji-ci-current-migration`
- Starting commit: `962da858b2859ae4bede66d6c56e69aa868d6042`
- Pre-work backup: `backup/b3-k079-dashboard-audit-before-2026-11-17` at the exact starting commit above.
- This is a read-only code audit recorded on the isolated work branch. No application code, lesson content, Supabase schema/data, GitHub Pages settings, or production branch was changed.

## Finding 1 — global spelling normalizer also processes database-rendered lesson content

File: `script.js`

- Lines 3–16 define global replacements for Kurdish Arabic-script strings, including `پێویست → پەیویست`, `نییە → نیە`, and other spellings.
- Lines 20–41 walk the entire `document.body` and apply those replacements to text nodes and selected attributes.
- Lines 44–66 install a body-wide `MutationObserver`; newly inserted text and elements are normalized as well.
- The protected lesson loader later assigns database-provided `lesson_content.content_html` to `.lesson-content` using `innerHTML` (in the same file, protected lesson loader section). The observer sees those inserted nodes. There is no exclusion for `.lesson-content`, nor a source/language boundary.

Impact: database-stored lesson HTML is not written back to the database by this code, but its visible text and selected attributes can be changed in the browser after insertion. This is an unintended presentation-layer mutation risk for authored lesson content and for language-specific forms.

Recommended isolated fix for a later code-change approval: exclude the `.lesson-content` subtree from both the initial normalizer and every mutation-observer path, including text nodes, inserted elements, and attributes. Do not rewrite stored lesson HTML as part of this fix. Add a regression test with a lesson-content fixture containing strings that match the replacement table and assert that its text and attributes remain byte-for-byte unchanged after insertion.

## Finding 2 — dashboard exposes four course IDs, with two distinct course families

File: `dashboard.html`

The dashboard defines these course IDs and totals:

| Dashboard key | Course ID | Displayed total |
|---|---|---:|
| c1 | `orthography-kurdik` | 26 |
| c2 | `phonetics-phonology-kurdik` | 32 |
| kurmanji1 | `kurmanji-course-1` | 26 |
| kurmanji2 | `kurmanji-course-2` | 12 |

The Kurmanji course pages independently present a 26-lesson first course and a 12-lesson second course. The protected lesson router maps their lesson filenames to those same two Kurmanji course IDs.

The other two dashboard entries are a separate legacy/general course family (26 and 32 in the dashboard code). Static source inspection does not establish whether those are the Central pathway, a general shared pathway, or legacy content that should be hidden. Therefore this audit does not reclassify or remove them.

Required product decision before any dashboard inventory change: explicitly map each of the four IDs to its language/region pathway and decide which should be visible to a student in each pathway. Preserve the Northern Kurmanji 26 + 12 structure and keep Central content separate. Do not change lesson totals or course IDs based on inference.

## Verification and limits

- Read and compared the relevant source files on the isolated branch: `dashboard.html`, `course-1.html`, `course-2.html`, `kurmanji-course-1.html`, `kurmanji-course-2.html`, representative Kurmanji lesson pages, `supabase-config.js`, and `script.js`.
- `script.js` blob at audit time: `c4f71beb95f865735a3204724b7579e6c0634c61`.
- `dashboard.html` blob at audit time: `9c27784f63cd95245881e98595e654ba7d8b421f`.
- This audit establishes static code paths only. It does not prove a live authenticated session, RLS behavior, RPC success, or lesson content availability in Supabase.
- Latest successful Pages deployment remains on `main` commit `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`; the isolated branch has not been deployed.
- The most recently observed successful Kurmanji package workflow was on older branch commit `0317fd4ff452c38f1700a5cabf3255ec89bb8dce`; it is not evidence of a CI run on the audit starting commit.

## Next safe step

Keep this report on the isolated branch. Implement the narrowly scoped normalizer exclusion and add a regression test only in a separately reviewed branch change; keep `main`, production Supabase, and the public deployment untouched until the user explicitly approves those operations.
