# Avasin Academy — Consolidated Work Archive Index

Archive date: 2026-11-17  
Repository: `avasinim/zanztkurd`  
Working branch: `fix/kurmanji-ci-current-migration`  
Source snapshot before archive index: `fbfaa7e7df58f6b98bd49ca9ffd6c410f60372d9`  
Final archived working-branch HEAD: `9ef281efed6d3a4a93e5ffe7636c7045fe93e7c7`  
Protected `main` HEAD at archive time: `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`

This index preserves a navigable record of the K-080 through K-092 work series. The working branch contains the source changes, regression tests and audit reports. The immutable before/after backup refs below preserve the key checkpoints. This is an index and archive record; it does not publish or deploy the site.

## 1. Where the archived work lives

- Working branch snapshot: `backup/b3-project-archive-before-2026-11-17` → `fbfaa7e7df58f6b98bd49ca9ffd6c410f60372d9`
- Final archive-index commit: `9ef281efed6d3a4a93e5ffe7636c7045fe93e7c7`; after-archive backup: `backup/b3-project-archive-after-2026-11-17` → the same SHA.
- `main` was not changed and remains `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`.

## 2. Completed work register

| Work item | Result / files | Verification |
|---|---|---|
| K-080 | Fixed Kurmanji lesson-content text/attribute normalization exclusions in `script.js`; added browser regression coverage in `scripts/test_north_circle_ui.py`; strengthened package validator. | CI run [44084485674](https://github.com/avasinim/zanztkurd/actions/runs/44084485674) passed. |
| K-081 | Unknown Kurmanji lesson keys are rejected explicitly before content access; added Playwright regression test. | CI run [44085035504](https://github.com/avasinim/zanztkurd/actions/runs/44085035504) passed. |
| K-082 | Strengthened `scripts/validate_kurmanji_package.py` to inspect the current Kurmanji migration, RPCs, lesson sequences, enrollment, predecessor and client-side guard consistency. | CI run [44085729257](https://github.com/avasinim/zanztkurd/actions/runs/44085729257) passed. |
| K-083 | Static audit of Kurmanji RLS and progression semantics; documented owner bypass differences and that completion is sequential but not quiz-mastery gated. | [Audit report](B3-K083-KURMANJI-RLS-PROGRESSION-SEMANTICS-AUDIT-2026-11-17.md). Static review only; no live DB query. |
| K-084 | Fixed course-scoped learning route to accept either verified email or verified phone, consistent with backend; added Playwright regression test. | CI run [44086745319](https://github.com/avasinim/zanztkurd/actions/runs/44086745319) passed. [Audit report](B3-K084-STUDENT-LEARNING-ROUTE-VERIFICATION-AUDIT-2026-11-17.md). |
| K-085 | Added browser regression test for server-side `complete_lesson` RPC arguments and next-lesson navigation; inspected dashboard progress alignment. | CI run [44088113520](https://github.com/avasinim/zanztkurd/actions/runs/44088113520) passed. [Audit report](B3-K085-LESSON-COMPLETION-RPC-NAVIGATION-DASHBOARD-AUDIT-2026-11-17.md). |
| K-086 | Audited all 38 Kurmanji lesson pages and their previous/next navigation, course-plan ordering and validator coverage. | Same passing CI run [44088113520](https://github.com/avasinim/zanztkurd/actions/runs/44088113520). [Audit report](B3-K086-KURMANJI-LESSON-NAVIGATION-INTEGRITY-AUDIT-2026-11-17.md). |
| K-087 | Audited quiz and completion policy; confirmed ordered completion does not currently require a quiz attempt/pass. Product decision remains open. | [Audit report](B3-K087-KURMANJI-QUIZ-AND-COMPLETION-POLICY-AUDIT-2026-11-17.md). Static review only. |
| K-088 | Reviewed email/phone verification, enrollment and access flow. No defect established in static review; live Supabase not queried. | [Audit report](B3-K088-ENROLLMENT-VERIFICATION-ACCESS-FLOW-AUDIT-2026-11-17.md). |
| K-089 | Reviewed student data access, profile/progress policies and privacy-page completeness; identified documentation questions, not a legal compliance conclusion. | [Audit report](B3-K089-STUDENT-DATA-ACCESS-PRIVACY-AUDIT-2026-11-17.md). Static review only. |
| K-090 | Audited SECURITY DEFINER RPC authorization, execute grants and search-path patterns; documented hardening opportunities and admin override behavior. | [Audit report](B3-K090-RPC-PRIVILEGE-SECURITY-DEFINER-AUDIT-2026-11-17.md). Checked-in SQL only. |
| K-091 | Audited admin surface; identified feedback RPC definitions and library/Storage policy definitions not found in checked-in schema/migrations. | [Audit report](B3-K091-ADMIN-SURFACE-STUDENT-DATA-ACCESS-AUDIT-2026-11-17.md). No live DB/Storage inspection. |
| K-092 | Audited public/admin digital library flows; checked-in repository lacks `library_books` schema/RLS and `avasin-library` Storage bucket/object policy definitions. Live state remains unknown. | [Audit report](B3-K092-LIBRARY-AND-STORAGE-RLS-POLICY-AUDIT-2026-11-17.md). Static review only. |

## 3. Immutable before/after checkpoints

Each listed backup is a separate Git branch ref. Do not force-update or reuse these names.

| Work item | Before backup → SHA | After backup → SHA |
|---|---|---|
| K-080 | `backup/b3-k080-normalizer-fix-before-2026-11-17` → `82a32fe672a419b88fc015ea11c029ee31a98248` | `backup/b3-k080-normalizer-fix-after-2026-11-17` → `b056c42e2451fe03b3c73345b7034bd3621ede42` |
| K-081 | `backup/b3-k081-unknown-lesson-guard-before-2026-11-17` → `b056c42e2451fe03b3c73345b7034bd3621ede42` | `backup/b3-k081-unknown-lesson-guard-after-2026-11-17` → `54332fc2e514069ba8c8654d753ab12033bcf893` |
| K-082 | `backup/b3-k082-rls-policy-audit-before-2026-11-17` → `54332fc2e514069ba8c8654d753ab12033bcf893` | `backup/b3-k082-rls-policy-audit-after-2026-11-17` → `b55552d01d2640d301dd4a023d9b1e70f0fc7714` |
| K-083 | `backup/b3-k083-rls-semantics-before-2026-11-17` → `b55552d01d2640d301dd4a023d9b1e70f0fc7714` | `backup/b3-k083-rls-semantics-after-2026-11-17` → `41e151c6a290c10a2a93e1e584b5cd51d9a5ebda` |
| K-084 | `backup/b3-k084-student-route-audit-before-2026-11-17` → `41e151c6a290c10a2a93e1e584b5cd51d9a5ebda` | `backup/b3-k084-student-route-audit-after-report-2026-11-17` → `027318cbc0f983b12e6fe5ee698518914510e58b` |
| K-085 | `backup/b3-k085-completion-rpc-test-before-2026-11-17` → `027318cbc0f983b12e6fe5ee698518914510e58b` | `backup/b3-k085-completion-rpc-test-after-2026-11-17` → `c56bfd274e05840269eb9ad17ffb15f91adbc874` |
| K-086 | `backup/b3-k086-kurmanji-navigation-audit-before-2026-11-17` → `c56bfd274e05840269eb9ad17ffb15f91adbc874` | `backup/b3-k086-kurmanji-navigation-audit-after-2026-11-17` → `8de147733d969be0b13af6c7f38191c031887968` |
| K-087 | `backup/b3-k087-quiz-completion-gate-audit-before-2026-11-17` → `8de147733d969be0b13af6c7f38191c031887968` | `backup/b3-k087-quiz-completion-gate-audit-after-2026-11-17` → `bde12285393133a09c4d19e5678a92de26edc17c` |
| K-088 | `backup/b3-k088-enrollment-verification-flow-before-2026-11-17` → `bde12285393133a09c4d19e5678a92de26edc17c` | `backup/b3-k088-enrollment-verification-flow-after-2026-11-17` → `614fb8a9dbdabc7639b15c1e9a9634b9ebff450` |
| K-089 | `backup/b3-k089-student-data-access-audit-before-2026-11-17` → `614fb8a9dbdabc7639b15c1e9a9634b9ebff450` | `backup/b3-k089-student-data-access-audit-after-2026-11-17` → `458a3843afda0adfc356c69f2858a22f6b7d498f` |
| K-090 | `backup/b3-k090-rpc-privilege-audit-before-2026-11-17` → `458a3843afda0adfc356c69f2858a22f6b7d498f` | `backup/b3-k090-rpc-privilege-audit-after-2026-11-17` → `60016c41c290ba5df1b66a82ca2ea36b9bc14acf` |
| K-091 | `backup/b3-k091-admin-surface-audit-before-2026-11-17` → `60016c41c290ba5df1b66a82ca2ea36b9bc14acf` | `backup/b3-k091-admin-surface-audit-after-2026-11-17` → `ea68564b1be4e7555330ba5fefe8dea708818052` |
| K-092 | `backup/b3-k092-library-storage-policy-audit-before-2026-11-17` → `ea68564b1be4e7555330ba5fefe8dea708818052` | `backup/b3-k092-library-storage-policy-audit-after-2026-11-17` → `fbfaa7e7df58f6b98bd49ca9ffd6c410f60372d9` |

Note: K-084 also has an intermediate post-code/pre-report checkpoint: `backup/b3-k084-student-route-audit-after-2026-11-17` → `60bc94dec40933316a3138cb5b2a6558176cf5c6`. K-085's final post-report backup is listed above.

## 4. Current outstanding decisions / verification gaps

1. Whether course completion should require quiz attempt/pass, rather than only ordered completion (K-083/K-087).
2. Whether library and feedback SQL definitions/policies exist in the live Supabase project outside the checked-in migration history (K-091/K-092). A read-only live catalog inspection needs explicit authorization.
3. Verify live database policies, grants, function ownership/search paths and Storage bucket/object policies before designing any production change (K-089–K-092).
4. Review privacy notice completeness and agree retention/deletion/contact details before changing legal-facing wording (K-089).
5. Do not interpret static repository findings as proof of live production configuration.

## 5. Safety boundaries and operating procedure

- All work described here was confined to `fix/kurmanji-ci-current-migration` and documentation/test changes described in the individual reports.
- `main` remained unchanged. No production deployment, live database write, migration application, Storage mutation, or lesson-content rewrite was performed.
- For each further work session: verify branch and main SHAs; create a unique pre-work backup; work on the isolated branch; create a unique post-work backup; compare exact changed files; verify main unchanged.
- Never overwrite an existing backup ref.
- The existing daily automation is a daily safety net, not continuous or minute-by-minute backup. Its recorded schedule is 18:00 Europe/Berlin; check its latest run before claiming a new successful run.

## 6. Reproducible source links

- Repository: https://github.com/avasinim/zanztkurd
- Working branch: https://github.com/avasinim/zanztkurd/tree/fix/kurmanji-ci-current-migration
- Documentation directory: https://github.com/avasinim/zanztkurd/tree/fix/kurmanji-ci-current-migration/docs
- Protected main branch: https://github.com/avasinim/zanztkurd/tree/main
