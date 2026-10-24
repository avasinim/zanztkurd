# Proposed repair: Kurmanji lesson-content SQL row structure

> [!WARNING]
> **UNVALIDATED — DO NOT APPLY AS-IS.** A later text-level comparison (2026-10-24) found that none of the 38 temporarily reconstructed HTML payloads matched the corresponding seed payload byte-for-byte. The proposed one-boundary transformation has not been validated with a PostgreSQL-aware parser, and this document is not an executable patch. Preserve the migration and lesson text until a quote-aware, row-by-row reconstruction and review establishes the intended payloads.

Status: **proposal only — not applied to the migration or any database**  
Target branch for this proposal: `kurmanji-clean-release`  
Target file for a future reviewed change: `supabase/migrations/20261019090000_add_kurmanji_courses_and_protected_lessons.sql`

## Evidence

A static scan of the current migration found 38 explicit lesson-content rows (course 1 lessons 01–26 and course 2 lessons 01–12). Every row contains an early `',now()),` immediately after its first HTML section, followed by additional HTML sections and then a second row terminator. The seed rows keep the full HTML payload inside one SQL string and close the row once.

## Proposed mechanical correction

For each of the 38 lesson rows only, remove the *first* premature string/tuple closure and timestamp segment, joining the following HTML section to the same SQL string. The local transformation is:

- Before: `</section>',now()),\n<section class="klesson-card">`
- Proposed: `</section>\n<section class="klesson-card">`

Keep the original opening quote before the first HTML section and keep the final closing quote plus `,now()),` at the end of the complete lesson payload. Do not alter the HTML, Kurdish text, Latin Kurmanji, lesson keys, titles, ordering, timestamps, SQL transaction boundaries, or any other migration logic.

This is a proposed transformation rule, not permission to edit the migration. Review each match in context before accepting it; reject the change if any row does not match the expected structure.

## Required validation before any migration change is considered

1. Apply the transformation to a temporary copy only; leave the tracked migration untouched until the proposal is approved.
2. Assert exactly 38 expected early closures are removed and exactly 38 lesson keys remain unique.
3. Parse the full corrected SQL with a PostgreSQL-aware parser or run it only in a disposable, isolated test database with equivalent prerequisite schema. Never use production Supabase.
4. Extract the 38 `content_html` values from the proposed migration and the five seed parts with a quote-aware SQL parser; compare the complete HTML payload for every key, not just string lengths or excerpts.
5. Verify each HTML payload retains its full section sequence, and confirm title, `lesson_key`, `course_id`, and lesson order remain unchanged.
6. Run repository static checks and inspect the final diff manually. Record the exact parser/test result in `docs/KURMANJI-RELEASE-AUDIT.md`.
7. Do not merge PR #3 or apply the migration to any database without explicit authorization.

## Scope and safety

This proposal file does not modify the migration, seed files, lesson HTML, `main`, PR #3, or any database. It makes no claim that the entire migration is otherwise valid. Scientific content and Avasin Code spellings must be preserved byte-for-byte by this structural-only correction.
