# B3-K093 — Privacy Notice, Terms and Student Data Rights Audit

- Date: 2026-11-17
- Repository: `avasinim/zanztkurd`
- Working branch: `fix/kurmanji-ci-current-migration`
- Starting HEAD: `9fc024ae51a313d1ea91a5d1ba573368c1e4d740`
- Protected `main`: `cf045a888b8df6d4f3e8e7b51078d64f12f9aca3`
- Scope: static review of `privacy.html`, `terms.html`, `auth.html`, `dashboard.html`, `library.html`, `admin.html`, `script.js`, `index.html`, `supabase-config.js`, checked-in Supabase schema and migration inventory.
- Method: repository-source inspection only. No live Supabase query, provider-console inspection, legal opinion, deployment, or production change.

## Executive summary

The repository contains dedicated privacy and terms pages, but their current text is high-level and does not yet provide a sufficiently operational explanation of student data practices or user-request procedures. This is a documentation and transparency gap identified from the checked-in source; it is not evidence that live provider controls or legal obligations are absent or breached.

## Data visible in the reviewed application source

1. Account registration supports email/password or phone OTP. The registration UI requests a full name; authentication uses Supabase Auth.
2. The checked-in schema creates a student profile with `full_name` and system-generated `student_number`, linked to the Auth user.
3. Student-facing functionality uses enrollment and lesson-progress records to display course participation and progress.
4. The dashboard permits a student to update their profile name; the student number is displayed read-only.
5. The administrator interface can display student name, email, student number, verification state, enrollment and progress information, subject to its application and server-side owner checks documented in the preceding audit.
6. `script.js` uses browser `localStorage` for some course-progress/navigation state and `sessionStorage` for translation cache. The reviewed privacy notice does not explain these browser-side storage uses.
7. The browser configuration points to a Supabase project and uses a publishable key. Pages load the Supabase JavaScript client from jsDelivr; the authentication page also contains an unpkg fallback. This establishes technical dependencies visible in source, not the providers' full data-processing terms or actual retention configuration.

## Findings

### K093-F1 — Privacy notice lacks a detailed data inventory
`privacy.html` broadly says account, registration and learning-progress information may be stored and used for account/course/progress functions. It does not enumerate the specific categories visible in the application (email, phone, full name, student number, enrollment, lesson progress and browser storage/cache).

**Impact:** Students cannot easily understand what information the service actually processes from the notice alone.

### K093-F2 — No retention or deletion schedule is stated
The notice does not state how long account, profile, enrollment, progress or operational records are retained, what happens after account closure, or whether some records may remain for integrity, security, legal or backup reasons.

**Impact:** Retention expectations and the practical consequences of account closure are unclear. Repository review cannot establish actual Supabase backup or provider retention settings.

### K093-F3 — No actionable student request process
The notice does not describe how a student can request access, correction, export, account deletion or deletion/correction of associated learning data. It does not identify a privacy-specific contact or expected response process. The site does display `zanstkurd@tutamail.com` as a general contact address in site/library footer content; it is not presented as a defined privacy-request channel in the notice.

**Impact:** A user has no clear documented path for exercising these requests. No deletion feature or workflow should be assumed from the static source.

### K093-F4 — Third-party services are not described in the notice
The reviewed source connects to Supabase for authentication/backend functions and loads the Supabase JavaScript client through jsDelivr, with an unpkg fallback on the auth page. The notice does not identify these service categories or explain their roles. The repository alone cannot determine the complete processor/subprocessor chain, data residency, or contractual terms.

### K093-F5 — Browser storage is not explained
The app uses `localStorage` for progress/navigation state and `sessionStorage` for translation caching. The notice only refers generally to local web-interface information and does not specify purpose, scope, duration, or user controls for these storage items. No cookie banner or detailed cookie/storage preference interface was identified in the reviewed pages.

### K093-F6 — Terms are general and omit practical service rules
`terms.html` covers appropriate use, content/source respect, account responsibility and the possibility of updates. It does not set out a clear account closure process, handling of user-submitted/profile information, service availability/limitations, support/contact path, or a clear relationship between the terms and privacy notice.

### K093-F7 — No age/minor guidance identified
The reviewed privacy notice and terms do not explain whether the service is intended for adults, whether minors may register, or what guardian involvement (if any) is expected. This is a policy decision for the site owner; no age rule is inferred.

## Recommended documentation work (not applied)

1. Publish a plain-language inventory of account, profile, enrollment, progress and browser-side data actually used.
2. Identify the backend/auth and client-library service categories, with links to relevant provider privacy documentation after confirming the current provider configuration and contractual details.
3. Define retention periods by data category, including backups and security logs, only after verifying actual provider settings and operational requirements.
4. Establish a documented request channel and workflow for access, correction, export and account/data deletion; specify identity verification, scope, exceptions and expected response time.
5. Explain browser storage keys/purposes and how users can clear them; distinguish local browser state from server-side progress.
6. Decide and document the intended age/minor policy.
7. Have the final wording reviewed for the jurisdictions in which the service is offered before representing it as legally compliant.

## Limitations

- This is a static repository audit, not a live database or Supabase dashboard inspection.
- It does not establish live retention, backups, logs, data residency, provider contracts, actual cookie behavior across all browsers, or whether any manual deletion process exists outside this repository.
- It is not legal advice and does not conclude whether the current notice complies with any particular law.
- No student data was accessed or changed.

## Change and safety record

- This audit adds documentation only.
- No application code, lesson content, SQL schema/migration, database, Storage policy, auth setting, CI workflow, deployment, or `main` branch was changed.
- CI was not run for this documentation-only audit.
