# BeatAPI integration — test environment only

This is a staged, owner-only Edge Function scaffold for the Zansti Kurd site. It is committed to `kurmanji-test-config` only. It does not change the production branch, production Supabase project, lesson content, or site UI.

## What it does

- Validates a Supabase user session.
- Checks the existing `is_site_owner()` RPC and rejects non-owners.
- Calls BeatAPI from the server-side function; the BeatAPI key is never sent to the browser.
- Limits each request to 8 messages / 12,000 characters and asks for at most 1,200 output tokens.
- Uses a fixed project-specific system instruction to preserve scientific/book text unless the owner explicitly approves a change.
- Does not stream, store, or log the prompt/answer.

## Before deployment

1. In Supabase, select the **test project** `zanztkurd-kurmanji-test` (project ref `juwsjljbdwyncicybwoq`), not production.
2. Open **Edge Functions → Secrets** and add:
   - `BEATAPI_API_KEY`: a dedicated test key created in BeatAPI Dashboard → API Keys.
   - `BEATAPI_MODEL`: a model ID currently enabled for that BeatAPI account, copied from the BeatAPI models list.
3. Never put either value in HTML/JavaScript, GitHub files, screenshots, logs, or this chat. Keep development and production keys separate.
4. Deploy `beatapi-assistant` to the test project with JWT verification enabled (`verify_jwt = true`).
5. Test with an authenticated site-owner session. Expected errors include `beatapi_not_configured` before secrets are set and `owner_access_required` for non-owner accounts.
6. Do not connect a public UI or student accounts until authentication, cost limits, and error handling have been reviewed.

## Current limitations

- The function is **not deployed** by this commit.
- No BeatAPI key has been provided, stored, or tested.
- The website UI does not yet call this function.
- This does not connect BeatAPI directly to ChatGPT. Direct ChatGPT MCP availability must be configured and tested separately in a supported ChatGPT surface.

## API contract (after deployment)

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
