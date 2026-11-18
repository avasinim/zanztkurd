# B3-K163 — SQL Lexer Marker Token-Boundary Audit
Date: 2026-11-18

## Scope
Read-only source review of the standalone PostgreSQL lexical scanner introduced in K162:
- `scripts/kurmanji_sql_lexer.py`
- `scripts/test_kurmanji_sql_lexer.py`

No lesson content, seed SQL, canonical validator, CI workflow, database, Auth/RLS/grants, website, deployment, PR, merge, or `main` changes were made.

## Verified starting state
- Work branch: `fix/kurmanji-ci-current-migration`
- Starting work-branch HEAD: `4f0ccc716afd0899c3dd78bbe47b3ee396428c92`
- `main`: `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`
- K163 pre-work backup: `backup/b3-k163-lexer-boundary-audit-before-2026-11-18` at `4f0ccc716afd0899c3dd78bbe47b3ee396428c92`

## Finding: marker matching is still substring-based
`find_sql_marker` first tokenizes the complete source and excludes candidates overlapping comments or quoted constructs. However, its candidate search uses `source.find(marker, start)` and does not require SQL word/token boundaries around the marker.

Consequently, a marker such as `VALUES` can match inside an ordinary identifier such as `NOTVALUES` or `VALUES_suffix`. Likewise, `ON   CONFLICT` can be found as a substring at the start of a longer token sequence such as `ON   CONFLICTING`. These are false positives even though the candidate is outside every opaque span.

This does not invalidate the scanner's handling of comments, strings, dollar quotes, nested block comments, quoted identifiers, or source spans. It is a separate lexical-boundary defect in marker discovery.

## Existing tests reviewed
The K162 test module contains 17 unittest methods covering line comments, nested block comments, standard and escape strings, dollar quotes, quoted identifiers, opaque marker suppression, multi-token marker search, and source-span reconstruction.

Two missing regression cases are recommended:
1. Ignore `VALUES` when it occurs inside a larger identifier (for example `NOTVALUES`), while still finding a later standalone `VALUES`.
2. Ignore `ON CONFLICT` when followed by additional identifier characters (for example `ON CONFLICTING`), while still finding a later standalone clause.

## Recommended next step
Add explicit token-boundary checks to marker discovery, add the two regression cases, and run the standalone test module in a complete checkout before considering any integration with the canonical seed-parity validator. Keep the scanner standalone until those tests pass and its intended marker grammar is documented.

## Verification limits
The source files were fetched from the exact K162 work-branch ref and reviewed. The unittest module was **not executed** in this session; no claim is made that its 17 existing tests pass. No full repository suite, CI workflow, PostgreSQL parser, live Supabase query, or database test was run.

## Safety status
No database or production action was taken. The previously authorized Test-only K113 reconciliation migration was not repeated. No CI edit was made; prior workflow path-filter gaps remain outside this task and require separate explicit approval before changing workflow files. `main` remains untouched.
