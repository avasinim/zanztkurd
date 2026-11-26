# Dengnasî loader fallback change — static validation — 2026-11-26

## Change

On branch `implementation/dengnasi-content-html-bridge-2026-11-26`, the unconditional pre-query guard for the 27 Dengnasî lesson keys was replaced with a safer two-stage flow:

1. Keep the existing authenticated `lesson_content` query by the exact lesson key.
2. If the returned Dengnasî payload is still the legacy PDF iframe wrapper (or contains the known source-PDF asset path), show the existing under-preparation state and do not inject the legacy wrapper.
3. If the payload is the prepared authored lesson HTML, allow the existing content injection path to run.

The existing `aria-busy` lifecycle, query error state, missing-row state, catch/finally behavior, authentication, enrollment checks and server-side sequence authorization were not changed.

## Static checks performed

- Reconstructed the intended patch from the pre-change `script.js` and confirmed the branch file equals that exact transformation; no unrelated `script.js` changes are present.
- Confirmed the existing activation migration still contains 27 legacy iframe payloads.
- Confirmed the prepared DRAFT ONLY payload contains 27 lesson records and zero iframe elements.
- Confirmed the legacy iframe and known PDF-path detectors match the legacy payload and reject a similarly named non-iframe tag.
- Confirmed the fallback check runs after the authenticated query and before `innerHTML` injection.
- Confirmed `aria-busy=false` remains in `finally`.
- Confirmed `hasPreviousLessonCompleted` and its server-side `can_read_lesson_content` flow are byte-for-byte unchanged.

## Not yet verified

- No browser/runtime test has been run.
- No Supabase test-project query or write has been performed.
- No migration has been generated or applied.
- No deployment, publication, main-branch update, PR merge or student-data change has occurred.

## Next step

Test this branch with the 27-row payload in the disposable `zanztkurd-kurmanji-test` Supabase project only, using fail-closed preconditions and rollback. Verify that legacy PDF rows remain hidden before replacement, authored content loads after a successful test replacement, and anonymous/non-enrolled/sequence-locked access remains blocked. Production must remain untouched.
