# Hawar Unicode architecture map and test-execution plan

**Date:** 2026-11-16  
**Repository:** `avasinim/zanztkurd`  
**Branch:** `fix/kurmanji-ci-current-migration`  
**Inspection commit:** `a0c530902015991e92927e905112607520214a5a`  
**Scope:** read-only architecture inspection and proposal. No tests executed; no application, lesson, SQL, database, CI, or deployment changes made.

## 1. Executive result

The repository is a static HTML/CSS/JavaScript site with a browser-side Supabase client and PostgreSQL/Supabase-backed protected lesson content and progress. It is not a server-rendered application with a conventional package-managed frontend build. The existing automated browser coverage is Python + Playwright and currently tests North Circle navigation and mobile layout with Supabase mocked.

The previous 20-case Hawar Unicode acceptance specification should therefore be executed in layers:

1. static source/fixture checks;
2. real-browser tests against locally served HTML and a mocked Supabase client;
3. a disposable Supabase project for actual database round-trip, RLS, RPC and persistence;
4. manual keyboard, OS input-method, font and assistive-technology checks.

A browser mock cannot prove database persistence, production RLS, authentication or enrollment. A live production database must not be used as a test target.

## 2. Architecture observed

### 2.1 Application and page delivery

- Root pages are static HTML (for example `index.html`, `learning.html`, `auth.html`, `kurmanji-course-1-lesson-01.html`).
- Shared presentation is in `style.css`; shared browser logic is in `script.js`.
- Supabase browser configuration is in `supabase-config.js`; it exposes a publishable key and project URL. The file itself warns against placing a service-role/secret key in browser code.
- The inspected Kurmanji lesson page declares `<html lang="ckb" dir="rtl">`, loads the shared stylesheet and `script.js`, and contains a `.lesson-content` placeholder with a `data-lesson-key`.
- The 38 Kurmanji lesson pages are separate HTML shells; the actual protected lesson body is fetched from the `lesson_content` table rather than being embedded as the page's canonical lesson body.

### 2.2 Browser-to-database lesson path

Observed path for protected Kurmanji lessons:

1. A learner opens a lesson HTML page.
2. `script.js` detects the protected Kurmanji lesson filename and hides the document while access checks run.
3. The shared script loads Supabase JS v2 and `supabase-config.js`, then creates/reuses the shared client via `ZANSTI_GET_SUPABASE_CLIENT`.
4. It calls `auth.getSession()`.
5. It checks enrollment with `student_has_enrollment(p_course_id)`, and owner status with `is_site_owner()`.
6. It checks sequential access with `can_read_lesson_content(p_course_id, p_lesson_key)`.
7. It reads `lesson_content.content_html` by `lesson_key` using `from("lesson_content").select("content_html").eq(...).limit(1).maybeSingle()`.
8. It places the returned HTML into `.lesson-content` using `innerHTML`.
9. Completion is submitted through the server-side `complete_lesson(p_course_id, p_lesson_key)` RPC. The client then synchronizes progress for the learner.

The exact lesson keys follow:
- Course 1: `kurmanji-course-1-lesson-01.html` … `kurmanji-course-1-lesson-26.html`
- Course 2: `kurmanji-course-2-lesson-01.html` … `kurmanji-course-2-lesson-12.html`

### 2.3 Data and access boundary

- `supabase/schema.sql` defines the account, course, enrollment and progress foundations and the server-authoritative completion function.
- Kurmanji course and lesson-content records are represented in SQL migration/seed files, including the dated migration `supabase/migrations/20261024122051_add_kurmanji_courses_and_protected_lessons.sql` and split seed files under `docs/`.
- The migration header says it was applied to the production project on 2026-10-24. This inspection did not connect to Supabase and did not independently verify live database state.
- Access and completion checks depend on Supabase RPC/RLS behavior. Mocked browser tests cannot establish those database guarantees.

## 3. Existing tests and validation

Observed automation:

| Existing file | What it checks | What it does not prove |
|---|---|---|
| `scripts/test_north_circle_ui.py` | Python Playwright Chromium tests for regional catalog routing, learning-page routing and mobile overflow | Hawar input, Unicode normalization, font coverage, database round-trip or real authentication |
| `scripts/validate_kurmanji_package.py` | Static checks for lesson-page inventory, keys, navigation, shared-script markers and migration/seed invariants | Browser rendering, exact Unicode behavior, database execution or linguistic correctness |
| `scripts/validate_kurmanji_sql.py` | PostgreSQL SQL parsing using `pglast` in CI | Applying migration semantics to a real disposable database |
| `scripts/validate_kurmanji_seed_parity.py` | Static parity between migration rows and split seed rows | Database persistence and RLS |
| `scripts/validate_lesson_catalog.py` | Static lesson catalog integrity | Hawar Unicode end-to-end behavior |

The workflow `.github/workflows/validate-kurmanji-package.yml` installs Python, `pglast` and Playwright/Chromium, then runs the SQL parser, seed parity, package validator and North Circle browser tests. The workflow does not provision a disposable Supabase database.

**Validator review item:** `scripts/validate_kurmanji_package.py` currently names `20261019090000_add_kurmanji_courses_and_protected_lessons.sql` as its migration path, whereas the inspected branch also contains `20261024122051_add_kurmanji_courses_and_protected_lessons.sql`. The current checks may intentionally target a canonical earlier migration, but that relationship needs an explicit maintainer decision before the test plan is wired to a migration. This is a review finding, not an assertion that the current validator fails.

## 4. Unicode-specific findings

### 4.1 No explicit Unicode normalization found in inspected application path

The inspected `script.js` and `spelling-tool.js` contain no explicit `String.prototype.normalize("NFC")` / `normalize("NFD")` policy for Hawar text. The current lesson path reads and renders stored HTML; it does not visibly canonicalize text before storage or search.

Therefore NFC storage/output is still a proposed policy, not a current verified behavior. Before implementation, decide whether normalization belongs at authoring/import boundaries, client submission boundaries, database constraints/triggers, or more than one boundary. Never silently strip the diacritics in Ç/ç, Ê/ê, Î/î, Ş/ş or Û/û.

### 4.2 Language and direction metadata

The inspected Kurmanji lesson shell declares `lang="ckb"` and `dir="rtl"`, while the lesson pathway uses Latin/Hawar script. This may be intentional for the surrounding Sorani-mediated interface, but Latin Kurmanji text needs explicit test coverage for bidi isolation, reading order, punctuation, selection and mixed-script examples. A future markup proposal may use narrowly scoped `lang="kmr"` and `dir="ltr"` containers for Hawar passages, but this should be reviewed before any lesson-shell change.

### 4.3 Shared spelling normalizer

The shared `script.js` applies Avasin-specific replacements to visible text nodes and selected attributes, including dynamically inserted nodes. The mappings inspected are Sorani/Arabic-script strings; they do not target the Latin Hawar letters. The code deliberately skips `TEXTAREA`, `SCRIPT`, `STYLE` and code-like elements. The static package validator explicitly expects the normalizer to apply to source-loaded lesson text.

Test requirement: prove that the shared normalizer leaves every Hawar test fixture byte-for-byte/code-point-for-code-point unchanged, including mixed Sorani/Hawar strings and dynamic lesson content. Do not expand or rewrite this normalizer as part of the present work.

### 4.4 Owner spelling tool

`spelling-tool.js` is an owner-only text replacement utility. It previews replacements across `lesson_content` and can update `content_html` rows after an explicit confirmation. Its rules are persisted in browser local storage. It is not a Unicode normalization engine and should not be used to normalize Hawar orthography. Any future Unicode test must use a disposable dataset and must not click its Apply action against production.

### 4.5 Search

The inspected `script.js` includes a lowercase text filter over rendered lesson/catalog cards. This is not evidence of a server-side full-text search over `lesson_content`. The Unicode test plan must distinguish:
- filtering existing page/catalog cards;
- any future search over stored lesson text;
- database collation/order behavior.

Do not claim that NFC/NFD-equivalent search or locale-aware Kurmanji collation currently exists.

## 5. Architecture-mapped execution plan

The test IDs below map the prior 20-case acceptance specification to actual repository boundaries. This is a proposed test plan only; no test files have been created or run.

| Test group / IDs | Concrete target | Test method | Required oracle |
|---|---|---|---|
| Code-point fixtures (U01–U03) | New test fixture file; `scripts/` | Python assertions over NFC/NFD sequences for Ç, Ê, Î, Ş, Û | Exact expected code points and canonical equivalence |
| NFC/NFD round-trip (U04–U05) | Authoring/input boundary and `lesson_content.content_html` | Playwright mock first; disposable Supabase integration second | Chosen normalization policy; preserve semantic distinctions |
| Diacritic preservation (U06) | Lesson HTML rendering and stored row | Browser DOM text inspection plus DB read-back | No conversion of marked letters to unmarked letters |
| Case behavior (U07) | Browser utility/test fixture | JavaScript tests for I/i versus Î/î and other case pairs | Unicode-aware case mapping without locale-dependent corruption |
| Keyboard/input (U08–U09) | Real desktop/browser environment | Manual test matrix by OS, keyboard layout and input method | User can enter all 31 letters and combining sequences reliably |
| Copy/paste (U10) | Browser lesson content and editable fields | Playwright clipboard test plus manual cross-app test | Exact string/code-point preservation |
| Font/rendering (U11–U12) | `style.css`, lesson shells, browser | Chromium screenshot/DOM checks plus manual Firefox/Safari/OS font checks | No tofu, clipping, misplaced marks or fallback-induced layout defects |
| Direction/bidi (U13) | Kurmanji lesson shell and content wrapper | Browser tests with Latin-only and mixed-script fixtures | Correct left-to-right order inside Hawar passages and stable RTL surrounding UI |
| Cursor/editing (U14) | Any actual editable authoring field; spelling tool only as a read-only inspection target | Browser keyboard navigation, caret and selection checks | Combining sequences behave acceptably; no destructive normalization on edit |
| Persistence (U15–U16) | Supabase `lesson_content` in a disposable project | Authenticated integration test with a disposable row | Insert/read/update round-trip under intended RLS; no production connection |
| Search (U17) | Existing catalog filter; separately proposed content search | Browser test for current card filter; DB test only if a content-search feature is confirmed | Current behavior documented separately from future NFC/NFD search requirements |
| Ordering/collation (U18) | Database query/search layer | Disposable PostgreSQL/Supabase test | Explicitly selected collation; no assumed locale behavior |
| Import/export (U19) | Seed SQL and content authoring/export path | Static fixture round-trip and disposable DB import/export | UTF-8 integrity and seed parity |
| API/access boundaries (U20) | Supabase auth, RLS, `can_read_lesson_content`, `complete_lesson` | Disposable project with authenticated, unauthenticated, enrolled and non-enrolled test users | Existing authorization behavior preserved; no bypass |
| Regression (cross-cutting) | Existing CI validators and Playwright suite | Run existing checks after approved test implementation | No regressions in lesson package, navigation or protected progression |

The prior acceptance specification has 20 cases; this mapping groups several related cases while retaining coverage across all acceptance areas. Test IDs must be reconciled one-to-one with that document before implementation so no original case is lost.

## 6. Proposed safe test layers

### Layer A — source-only, no network
- Add a dedicated Hawar Unicode fixture with both NFC and NFD forms and expected code points.
- Verify the 31-letter inventory and marked-letter set as data, not by visually inspecting a font.
- Verify the Avasin text normalizer does not alter Hawar-only or mixed-script fixtures.
- Run static checks only after a separate approval to add tests.

### Layer B — local browser, mocked Supabase
- Serve the repository using the same local static HTTP server pattern already used in `scripts/test_north_circle_ui.py`.
- Stub only the Supabase calls required for deterministic page rendering.
- Test the actual protected Kurmanji lesson shell, dynamically inserted `content_html`, DOM text, bidi behavior, selection and clipboard.
- Make the mock return NFC and NFD fixture strings independently; do not mistake mock success for persistence proof.

### Layer C — disposable Supabase project
- Use a dedicated test project and disposable users/rows only.
- Apply the migration sequence to that disposable project after migration ownership is confirmed.
- Test authenticated read/write boundaries, enrollment, sequential lesson access and completion RPC.
- Verify exact code points after database write/read, including NFD input if the policy says it should canonicalize.
- Destroy or reset only disposable test data under an approved cleanup plan.

### Layer D — manual environment matrix
- Windows and Linux desktop input methods used by the team.
- At least Chromium and Firefox; Safari if supported by the target audience.
- Browser zoom, fallback fonts, screen readers and keyboard-only navigation.
- Record OS, keyboard layout, browser/version, font and observed output with each result.

## 7. Blockers and decisions before execution

1. Confirm the canonical migration sequence and why the static package validator points to the 2026-10-19 migration while a 2026-10-24 migration is also present.
2. Confirm whether `lesson_content` is the canonical source for both Kurmanji pathways and whether a separate content-authoring interface exists beyond the owner spelling utility.
3. Select the Unicode normalization policy (proposed NFC storage/output, accepting canonical NFD equivalents) and define where it is enforced.
4. Confirm the desired `lang`/direction strategy for Latin Hawar passages inside the existing Sorani RTL shell.
5. Confirm whether there is a real learner-facing search over lesson bodies; the inspected card filter is not that feature.
6. Provision and authorize a disposable Supabase project before any integration test.
7. Obtain explicit approval before adding test code, modifying CI, applying any migration, or changing application/runtime behavior.

## 8. Safety and verification status

- Read-only GitHub inspection only.
- No test command was run.
- No local browser was launched.
- No Supabase request or database query was made.
- No SQL migration was applied.
- No lesson text, HTML, JavaScript, CSS, workflow, seed or schema file was changed.
- `main`, PR #3 and production deployment/database were not modified.
- PR #3 was observed as open, Draft and unmerged at the time of inspection; its head is the separate `kurmanji-clean-release` branch, not this research branch.

## 9. Source files inspected

- `index.html`
- `script.js`
- `auth.html`
- `learning.html`
- `lesson.html`
- `kurmanji-course-1-lesson-01.html`
- `supabase-config.js`
- `supabase/schema.sql`
- `supabase/migrations/20261024122051_add_kurmanji_courses_and_protected_lessons.sql`
- `scripts/test_north_circle_ui.py`
- `scripts/validate_kurmanji_package.py`
- `scripts/validate_kurmanji_seed_parity.py`
- `scripts/validate_lesson_catalog.py`
- `.github/workflows/validate-kurmanji-package.yml`
- `.github/workflows/validate-lesson-catalog.yml`
