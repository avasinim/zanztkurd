# Kurmanji post-release seed approval-trail audit

Date: 2026-11-17  
Reviewed branch: `fix/kurmanji-ci-current-migration`  
Starting HEAD: `d8584860e4d5beab5331d21b2a6fdc1b06d15ed6`  
Scope: GitHub PR/commit metadata and review records for the 11 post-release seed-edit commits previously attributed to the 12 changed lesson rows.

## Executive finding

**No independent editorial approval was located in the GitHub artifacts queried for this audit.** This is a bounded finding, not proof that no approval exists in private discussions, external records, or other systems.

All 11 queried seed-edit commits are associated by GitHub's commit-to-PR endpoint with PR #3, which is still open and marked Draft. PR #3 itself explicitly says all 38 lesson bodies still need source-by-source scientific review and lists disposable-database validation and other release checks as blockers. Its review list, inline review comments and issue-comment list are empty in the current API response.

PR #4 is the merged release PR, but its review list, inline comments and issue-comment list are also empty in the current API response. Its release description says the original migration and split seed references were synchronized at release time and that production migration version `20261024122051` was applied after CI passed. This establishes the PR description's release assertion, not an independent live-database verification by this audit.

## 1. Scope of commit-to-PR lookup

GitHub's `/commits/{sha}/pulls` endpoint was queried for these 11 seed-edit commits:

- `ef730f59d2585ff741b8d708b58078bb67a47bd5`
- `daa9898df7d5f82ea7cee05fa890b40b1bbcc2e9`
- `7ba3bf8fe87e32e00102352068313722ccc787e7`
- `ff4b53750f50a8029a4e53dc197af827ce6f27e8`
- `cac9fee8ce450dcea17d5e0e1acfdd09be3b122f`
- `51cab71e00cd2cc842635b5a920ebc62fd7e8695`
- `179f834a8a462ebba1cfdc83c69a1744b2296478`
- `a8b8ee58222ff9a1cb51f28c99602e9d98bfeb28`
- `7eac8dff8be1ef021a4895e576818b64bf6d57ef`
- `8911abdd71b0d325ec1563a349deb197ddc9360f`
- `a4e5bcf49b95c55ac91b122d6deed26cb4d34b44`

Every lookup returned PR #3, `[DRAFT] Isolate Kurmanji courses and North Circle routing`. No other associated PR was returned for those commit SHAs.

This association is provenance evidence only. It does not by itself establish that the commits were merged, approved, or accepted as canonical lesson content.

## 2. PR #3 — current draft status and stated blockers

PR: https://github.com/avasinim/zanztkurd/pull/3

Current API state at review:
- State: open
- Draft: true
- Merged: no
- Submitted PR reviews: 0
- Inline review comments: 0
- Issue conversation comments: 0

The PR description explicitly lists these blockers:
- Playwright mocks Supabase and does not validate real authentication, enrollment, lesson unlocking or completion persistence.
- The Supabase migration has not been validated in a disposable test project; it says not to apply to production.
- All 38 lesson bodies still need source-by-source scientific review.
- Migration effects on existing courses and authorization RPCs still need review.

The PR's own release gate therefore does not support treating the later seed-only edits as finally approved academic content.

## 3. PR #4 — merged release record

PR: https://github.com/avasinim/zanztkurd/pull/4

Current API state:
- State: closed
- Merged: 2026-10-24
- PR reviews returned: 0
- Inline review comments returned: 0
- Issue comments returned: 0

The PR description states that:
- Course 1 (26 lessons) and Course 2 (12 lessons) were released;
- the migration and five split seed references were synchronized at that release;
- production migration version `20261024122051_add_kurmanji_courses_and_protected_lessons` had been applied and recorded after the first CI run passed;
- the PR's listed CI validation passed.

The PR description also calls for post-merge live smoke testing. This audit did not independently verify that smoke test or query the production migration ledger.

## 4. Editorial authority conclusion

The evidence supports this distinction:

1. **Release baseline:** PR #4's original migration/seed snapshot is the recorded release baseline.
2. **Later working content:** the 11 later commits modified seed content while associated with PR #3, which remains a Draft PR.
3. **Approval:** no independent editorial review or approval record was found in the queried PR reviews/comments.
4. **Scientific quality:** commit messages and CI parity prove neither academic correctness nor editorial sign-off. CI verifies structural parity and package integrity, not the truth of linguistic claims.

Accordingly, the later seed snapshot may be used as a working candidate for review, but should not be labelled owner-approved, editor-approved, or canonical solely on the evidence examined here.

## 5. Decision for the forward reconciliation migration

**Hold the forward migration from production.** Keep it as an isolated proposal until all of the following are met:

- a source-by-source academic review of the 38 lessons is recorded, with precise citations/page references where applicable;
- the owner/editor explicitly confirms the accepted seed snapshot or a documented editorial authority policy is established;
- the 12-row overlay is regenerated from that approved snapshot and parity is re-run;
- the actual `lesson_content` schema prerequisite (especially unique `lesson_key`) is verified in a disposable database;
- the forward migration passes a disposable-database success-path and failure-atomicity test;
- access-control, migration-ledger and deployment gates are independently reviewed.

No content or database mutation is authorized by this audit.

## 6. Limitations

- The audit queried GitHub REST commit-to-PR associations, PR metadata, PR reviews, inline review comments and issue comments for PRs #3 and #4.
- It did not search private email, private chat, local notes, external editorial systems or unindexed records.
- Empty GitHub review/comment lists mean no such records were returned by these endpoints at the time queried; they do not prove that no human discussion or approval occurred elsewhere.
- The PR #4 production-migration statement remains a repository-hosted assertion here, not an independently queried production catalog fact.
- No Supabase connection, SQL execution, deployment, PR mutation or branch merge occurred.

## 7. Actions not taken

- No seed, lesson, migration, validator, workflow, application source or database was changed.
- No PR was edited, approved, closed, merged or retargeted.
- No production or staging database was accessed.
- This report is documentation-only on the isolated work branch.

## Backup record

- Pre-work backup: `backup/kurmanji-seed-approval-trail-review-before-2026-11-17`
- Starting SHA: `d8584860e4d5beab5331d21b2a6fdc1b06d15ed6`
- Post-work backup: to be recorded after documentation commit and exact ref/blob verification.
