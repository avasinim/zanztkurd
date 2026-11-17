# Kurmanji protected-lesson frontend fail-closed edge-case review — 2026-11-16

## Scope and safety

Read-only source review of the active work branch `fix/kurmanji-ci-current-migration`, focused on the client-side lesson-order guard for the two Kurmanji pathways.

Reviewed:
- `script.js`, especially `lessonOrderFor`, `hasPreviousLessonCompleted`, `pageGate`, and `loadProtectedLessonContent`;
- representative Course 1 lesson shells 01 and 26;
- representative Course 2 lesson shells 01 and 12;
- the current Kurmanji migration's `can_read_lesson_content` and `complete_lesson` definitions;
- the prior protected-content/RLS and CI coverage audits.

No application code, SQL, tests, CI, lesson content, database, or deployment was changed. No live Supabase project was contacted. No test was run.

## Finding 1 — client-side unknown lesson index is treated as allowed

In `script.js`:

- `lessonOrderFor(target)` creates a 26-item order for Course 1 and a 12-item order for Course 2.
- `hasPreviousLessonCompleted(..., target)` computes `index = order.indexOf(target)`.
- It then returns `true` for `index <= 0`.

This conflates two distinct cases:
1. `index === 0`: the first known lesson, which legitimately has no prerequisite;
2. `index === -1`: a target not present in the generated course order, which should fail closed.

The page-path matcher accepts any two-digit lesson number for either Kurmanji course, so a URL such as a Course 1 lesson 99 shell would satisfy the broad page matcher even though lesson 99 is outside the 26-item order. In that case, the browser-side sequence helper returns `true` instead of rejecting the unknown target.

### Impact assessment

This is a frontend validation defect and can produce a confusing navigation/content-load attempt for an invalid lesson URL. It is **not evidence of a protected-content authorization bypass**:

- the Kurmanji migration's `can_read_lesson_content` builds a finite 26- or 12-key order and returns `false` when `array_position` cannot find the supplied lesson key;
- the `lesson_content` query is still subject to the database RLS policy;
- `complete_lesson` independently rejects a lesson key absent from its course order with `INVALID_LESSON`.

Accordingly, the current server-side checks appear to deny an unknown lesson key even though the client helper does not. This conclusion is based on repository source only; the effective deployed policy/function definitions have not been inspected in the remote database.

## Finding 2 — the protected shells use server-loaded lesson bodies

Representative first and final lesson shells from both Kurmanji courses contain a `.lesson-content` element with a `data-lesson-key` and a loading placeholder. They load the shared `script.js`. The lesson body is fetched from `lesson_content.content_html` only after the page gate completes.

This reduces the risk that an invalid lesson URL will expose the protected body from static HTML. It does not remove the need to validate the URL against the exact course inventory at the client boundary.

## Recommended correction (proposal only)

Change the sequence helper's index handling to distinguish invalid from first lesson:

```js
const index = order.indexOf(target);
if (index < 0) return false;
if (index === 0) return true;
```

The caller should then retain its existing fail-closed handling for a `false` result. A separate explicit lesson-key validation before the content request would make the intent clearer, but should not replace RLS.

Do not implement this change without the user's explicit approval.

## Required regression cases

Add deterministic tests for both Kurmanji pathways:

1. Course 1 lesson 01 — known first lesson is allowed without a predecessor.
2. Course 1 lesson 02 — asks the authoritative server check.
3. Course 1 lesson 99 — rejected before the content query.
4. Course 2 lesson 01 — known first lesson is allowed without a predecessor.
5. Course 2 lesson 02 — asks the authoritative server check.
6. Course 2 lesson 99 — rejected before the content query.
7. RPC error — rejected; no content query is issued.
8. RLS denial for a known lesson — body remains unavailable and an error state is shown.

These should be added to the existing mocked-browser layer with explicit RPC responses. A separate disposable-Supabase integration layer remains necessary to prove actual RLS and RPC behavior.

## Other observations and boundaries

- The `complete_lesson` function in the reviewed migration rejects unknown lesson keys, checks enrollment for non-owners, and enforces immediate-predecessor completion for ordinary learners. Its upsert key makes repeated completion idempotent at the row level, subject to the actual database unique constraint.
- The two Kurmanji pathways are explicitly enumerated as 26 and 12 lessons in the reviewed client and SQL source.
- The earlier audit's CI limitation remains: the current browser suite uses permissive mocked RPC results and does not exercise these protected lesson cases.
- The source review cannot establish which migration version or function body is active in production. Do not run `supabase db push`, migration repair, or production SQL on the basis of this document.

## Backup and change record

- Work branch: `fix/kurmanji-ci-current-migration`
- Starting commit: `feb7a4cf6370c302d9ae64593cfdefa9e4e0bdb5`
- Pre-work backup: `backup/kurmanji-fail-closed-gate-before-2026-11-16`
- Post-work backup: `backup/kurmanji-fail-closed-gate-after-2026-11-16` (to be created at the resulting documentation-only commit)
- This dossier is documentation only. No implementation or test changes are included.
