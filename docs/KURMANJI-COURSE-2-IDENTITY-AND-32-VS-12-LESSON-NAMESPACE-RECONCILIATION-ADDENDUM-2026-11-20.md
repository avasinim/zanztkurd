# Course 2 identity and 32-vs-12 lesson namespace reconciliation addendum

**Date:** 2026-11-20  
**Branch:** `fix/kurmanji-ci-current-migration`  
**Verified starting HEAD:** `07b3066e49edca0bc7cc905317ba9df833e7d201`  
**Pre-work checkpoint:** `backup/course2-course-identity-reconciliation-before-2026-11-20`  
**Scope:** read-only structural audit of course identity, lesson paths, and course metadata; this document is proposal-only. No inventory, course content, mapping, runtime, database, or canonical registry was changed.

## 1. Finding: the earlier 32-vs-12 discrepancy was an identity/namespace collision, not a proven stale count

The earlier documentation-conflict addendum `KURMANJI-COURSE-1-ACTION-REGISTER-INVENTORY-DOCUMENTATION-CONFLICT-ADDENDUM-2026-11-19.md` treated the registry's 32-lesson Course 2 and the Northern Kurmanji academic report's 12-lesson Course 2 as a conflict. A fresh branch-tree and course-page inspection finds that these are **two distinct curricula with similarly numbered course labels**.

This finding corrects the interpretation of the earlier addendum. It does not authorize changing either course inventory.

## 2. Directly observed project evidence

### A. Northern Kurmanji pathway: 38 lessons, two courses

The learner-facing `learning.html` labels REGION 01 “بازنەی باکور کورمانجی” as two courses, 38 lessons total:
- Course 1: Kurmanji orthography — 26 lessons.
- Course 2: Kurmanji morphology and grammar — 12 lessons.

The distinct 12-lesson Course 2 HTML files are at repository root:
`kurmanji-course-2-lesson-01.html` through `kurmanji-course-2-lesson-12.html`.

Endpoint file checks:
- Lesson 01 title: “مۆرفۆلۆجی و پێکهاتەی وشە”; blob `7bbff150b81323b730b55044d33202c269b1aff4`.
- Lesson 12 title: “پێداچوونەوە و تاقیکردنەوەی کۆتایی”; blob `250553bf0b41419d428af215ed4fd5411c007357`.

The Course 2 12-lesson integrated academic evidence closure report is:
`docs/KURMANJI-COURSE-2-12-LESSON-INTEGRATED-EVIDENCE-CLOSURE-REPORT-2026-11-17.md`.
Its status is evidence review consolidated, **not release-certified**. It is the report for this Northern Kurmanji morphology/grammar course, not the 32-lesson phonetics course below.

### B. Kurdish phonetics/phonology curriculum: 32 lessons

The registry identifies a separate course titled **“کۆرسی ئەکادێمیک و زانستی فۆنێتیک و فۆنۆلۆجی زوانی کوردیک”** (Kurdish phonetics and phonology), 32 lessons. The corresponding metadata is also present in `lessons/index.json`:
- Course ID: `phonetics-phonology-kurdik`
- Title: `فۆنێتیک و فۆنۆلۆجی کوردیک`
- Author field: `سابیر ژاکاو`
- Section ID: `course-2-section`
- Section title: `دەورەی ٢ — فۆنێتیک و فۆنۆلۆجی زوانی کوردیک`
- Lesson count in the section: 32.

The separate 32 files are located at `lessons/course-2-01.html` through `lessons/course-2-32.html` (not the root `kurmanji-course-2-lesson-*.html` series).

Endpoint file checks:
- `lessons/course-2-01.html`: phonetics/speech-production lesson title; blob `8e096ec0b7fe19418258d4d6e6e92aab612998dd`.
- `lessons/course-2-32.html`: consonant duration, tone, intonation, vibration and pauses; blob `a3485c9663389095c44b8e33a00cc866559a238c`.

The existence and titles of these files establish repository-path presence and curriculum identity as represented by the current branch. They do **not** prove content quality, publication, learner access, live deployment, database mapping, or release readiness.

### C. Other numbered lesson files are a separate path

The registry also claims that `lessons/017.html` through `lessons/058.html` exist (42 numbered files). These numbered files are not a one-to-one Course 2 mapping. `PROJECT-CONTINUITY.md` itself cautions against equating the numeric file range with Course 2 mapping. Do not assign these pages to either of the two courses above without an explicit mapping audit.

## 3. Verified file counts at this branch snapshot

At commit `07b3066e49edca0bc7cc905317ba9df833e7d201`, the complete recursive Git tree was retrieved (not truncated) and filtered by exact path patterns:

| Path namespace | Direct tree count | Identity indicated by titles/metadata | Status |
|---|---:|---|---|
| `kurmanji-course-2-lesson-01..12.html` (repo root) | 12 | Northern Kurmanji morphology/grammar Course 2 | Present |
| `lessons/course-2-01..32.html` | 32 | Kurdish phonetics/phonology Course 2 | Present |
| `lessons/017.html..058.html` | 42 | Numbered legacy/section pages; mapping not established by count | Present |

The root Kurmanji Course 2 path pattern has no files numbered 13–32. Conversely, the phonetics path has all 32 files. This is a path-level inventory check only, not a live-site or database check.

## 4. Revised disposition of DOC-INV-01

**Status:** RECLASSIFIED — course-identity/namespace clarification required; the counts are not necessarily contradictory.

- **Direct evidence:** `learning.html` explicitly presents the Northern Kurmanji pathway as 26 + 12 = 38. The root `kurmanji-course-2-lesson-01..12.html` series is present.
- **Direct evidence:** `COURSE-REGISTRY.md`, `PROJECT-CONTINUITY.md`, and `lessons/index.json` identify a distinct 32-lesson Kurdish phonetics/phonology Course 2. The 32 `lessons/course-2-*.html` files are present at this branch.
- **Inference:** the earlier 32-vs-12 concern arose from reusing “Course 2” for two different curricular namespaces, rather than establishing that one count was stale.
- **Unresolved:** canonical cross-path IDs/labels, learner-facing navigation and progress namespace relationships, and the authoritative owner-approved inventory language.
- **Not established:** whether every path is currently deployed or reachable; whether numbered pages 017–058 map to any course; whether the 32-lesson phonetics curriculum has release approval.

The 2026-11-19 addendum remains a historical audit. Use this clarification when interpreting its DOC-INV-01 finding; do not silently overwrite the historical record.

## 5. Priority and safe closure plan

| Priority | Action | Exact reference / evidence | Closure gate |
|---|---|---|---|
| P0 | Confirm and document that the “Northern Kurmanji Course 2 (12 lessons)” and “Kurdish phonetics/phonology Course 2 (32 lessons)” are separate curricular identities; approve canonical naming/IDs to prevent namespace collisions. | `learning.html`; `lessons/index.json`; `COURSE-REGISTRY.md`; the 12-lesson Kurmanji Course 2 closure report. Direct structural evidence; no owner decision yet. | Owner/editor approval; no inventory or mapping edits before approval. |
| P1 | Create an owner-approved crosswalk of course identity → canonical ID → path prefix → lesson count → learner route → progress namespace; distinguish the 42 numbered legacy pages. | Branch tree at verified commit; `PROJECT-CONTINUITY.md` mapping caution; exact path ranges in §2–3. Mapping currently unresolved. | Read-only crosswalk review first; any code/mapping change separately authorized and checkpointed. |
| P1 | Verify learner-facing navigation and progress behavior separately for each course identity without touching production. | `learning.html`, root Kurmanji Course 2 pages, phonetics section index and its 32 pages. Structural presence only. | Authorized isolated test environment and explicit approval for tests that may interact with services; no production DB. |
| P2 | Improve internal course labels and metadata consistency after identity approval. | Registry/index/course-page labels currently reuse “Course 2”. | Documentation proposal, owner approval, then separate checkpointed change. |

## 6. Evidence, variety and review limitations

- **Kurmanji pathway:** the 12-lesson Course 2 is explicitly described as morphology/grammar in the Northern Kurmanji learning route. Its academic closure is evidence review, not release certification. Grammar, exact examples and regional alternatives still require qualified Kurmanji native-speaker/editor review.
- **Phonetics/phonology curriculum:** the registry and `lessons/index.json` establish its separate name, ID, author metadata and 32-page path. This structural audit does not independently validate its linguistic content or author/source claims.
- **Variety labels:** do not infer that the 32-lesson Kurdish phonetics course is a Kurmanji-only or Sorani-mediated course. Its metadata says Kurdish language (`ckb`); scope and language variety need explicit editorial labels if they are used for comparisons.
- **Source limitations:** no new scholarly linguistic claim is made in this addendum. No academic source was re-evaluated for grammar here; evidence is repository metadata, page titles, file paths, course-page copy and the existing 12-lesson academic report.
- **Human review:** no native-speaker approval is newly established by this structural audit. Course-specific language/editor review status remains governed by the existing ledgers.

## 7. References checked at the verified branch commit

- `learning.html` — blob `6f9a6105267a31d3b2496df619df1270be44bf8d`; describes REGION 01 Northern Kurmanji as 2 courses/38 lessons (26 orthography + 12 morphology/grammar), and separately lists the Kurdish phonetics/phonology course.
- `COURSE-REGISTRY.md` — blob `78c48dad3cf272c616857f22d38f2543958c9f67`; registry course titles, 32 lesson list and path claims.
- `PROJECT-CONTINUITY.md` — blob `4080df076750461a4b42dc2eeb628f413adb6c9d`; warns that numbered file IDs are not equivalent to Course 2 mapping.
- `lessons/index.json` — blob `c4ae0418d266fd7fe79060e9b75e26f8701011e6`; phonetics course ID/section metadata and 32-lesson list.
- `kurmanji-course-2-lesson-01.html` — blob `7bbff150b81323b730b55044d33202c269b1aff4`.
- `kurmanji-course-2-lesson-12.html` — blob `250553bf0b41419d428af215ed4fd5411c007357`.
- `lessons/course-2-01.html` — blob `8e096ec0b7fe19418258d4d6e6e92aab612998dd`.
- `lessons/course-2-32.html` — blob `a3485c9663389095c44b8e33a00cc866559a238c`.
- `docs/KURMANJI-COURSE-2-12-LESSON-INTEGRATED-EVIDENCE-CLOSURE-REPORT-2026-11-17.md` — blob `32aaf680fce979d18038a05b9d2a9932b6e86eee`.

## 8. Protected scope

No changes to `main`, PR #3, existing learner lesson bodies, course inventory, course mapping, seed, migrations, schema, application code, tests, CI, runtime, database, Supabase or deployment. No external messages or account settings changed. This addendum is proposal-only.

**Next safe step:** obtain owner confirmation of the separate course identities and labels; then prepare a read-only path/progress crosswalk. Do not change either course count or course mapping without approval.
