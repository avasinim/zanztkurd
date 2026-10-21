# BeatAPI integration — test environment only

This integration is being staged on the `kurmanji-test-config` branch and the separate Supabase test project. Production code, production database, and scientific lesson content have not been changed.

## Current status

- The `beatapi-assistant` Supabase Edge Function is deployed and reported **ACTIVE** in test project `zanztkurd-kurmanji-test` (project ref `juwsjljbdwyncicybwoq`).
- JWT verification is enabled. The function requires an authenticated user and checks the existing `is_site_owner()` RPC; it is intended for the site owner only.
- The owner dashboard UI for the BeatAPI assistant is committed on `kurmanji-test-config` in `admin.html`. It invokes the Edge Function through the Supabase client.
- **End-to-end verification is still pending:** we have not yet confirmed a successful real response from BeatAPI through the authenticated dashboard UI.
- The test-branch UI is not on the production GitHub Pages site, which uses `main`. Do not merge or publish to production without explicit approval.
- This website integration does not itself connect BeatAPI directly to ChatGPT. No native BeatAPI ChatGPT connection has been verified.

## Security and behavior

- BeatAPI calls happen server-side; the BeatAPI key is not sent to browser code.
- The function validates the Supabase session and checks site-owner authorization.
- Requests are limited to 1–8 messages, a 12,000-character total, and up to 1,200 output tokens.
- The system instruction tells the assistant to preserve scientific and source-book text unless an exact change has been explicitly approved.
- The function does not intentionally store or log prompt/answer text, and it does not forward upstream error bodies to the browser.
- The dashboard chat is temporary for the current page session; conversation persistence has not been added.

## Test-project secrets

In the Supabase **test project only**, check **Edge Functions → Secrets** for:

- `BEATAPI_API_KEY`: a dedicated test key from BeatAPI.
- `BEATAPI_MODEL`: a model ID enabled for that BeatAPI account.

Never paste the key into chat or commit it to HTML, JavaScript, or GitHub. The earlier setup step was acknowledged, but secret values and a successful upstream BeatAPI response have not been independently verified.

## Safe next test

1. Confirm both secrets are present in the test project without revealing their values.
2. Open the test-branch dashboard in a preview environment and sign in with the authorized owner account.
3. Send a harmless prompt such as: `Reply with “BeatAPI test successful” and do not modify any files.`
4. Confirm that the UI receives an answer. If it fails, record only the visible error code/message and never share tokens, authorization headers, or API keys.
5. Keep the integration on the test branch until authentication, response handling, and cost controls are reviewed.

## API contract

POST JSON:

```json
{
  "messages": [
    { "role": "user", "content": "Help me plan a safe test of the website integration." }
  ]
}
```

Successful response:

```json
{ "answer": "…", "model": "…" }
```
