# B3-K086 — Kurmanji lesson navigation integrity audit

Date: 2026-11-17  
Branch: `fix/kurmanji-ci-current-migration`  
Audited source commit: `c56bfd274e05840269eb9ad17ffb15f91adbc874`

## Scope

Read-only audit of the 38 Kurmanji lesson pages and their previous/next navigation, course boundaries, and course-plan ordering checks already encoded in `scripts/validate_kurmanji_package.py`.

## Results

- Repository tree contains exactly 38 Kurmanji lesson pages: 26 for `kurmanji-course-1` and 12 for `kurmanji-course-2`.
- The package validator enumerates every expected lesson page and rejects missing or unexpected lesson files.
- For every lesson page, the validator extracts links inside `klesson-actions` and compares the ordered lesson links against the exact expected predecessor and successor:
  - first lesson: next lesson only;
  - middle lessons: previous then next;
  - final lesson: previous lesson only.
- The validator rejects cross-course lesson links.
- The validator also checks the course plan contains every expected lesson link exactly once and in numeric order.
- It verifies each page's `data-lesson-key`, server-loaded content placeholder, shared runtime script, and the seed/migration key parity.
- The same package-integrity workflow completed successfully in GitHub Actions run https://github.com/avasinim/zanztkurd/actions/runs/44088113520.

## Conclusion

No additional navigation defect was indicated by the existing full-package validation. The checked-in validator already covers previous/next link order across all 38 pages and prevents course-boundary navigation mistakes. No application or lesson content changes were necessary for this audit.

## Limits and safety boundary

This is a static repository audit backed by the passing CI run. It does not exercise every one of the 38 lesson pages interactively in a live browser, and it does not inspect production hosting or live database state. No lesson content, SQL migration, database, deployment, workflow definition, or `main` branch was changed.
