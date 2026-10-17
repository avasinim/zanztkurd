import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const ALLOWED_ORIGIN = "https://avasinim.github.io";
const ALLOWED_LANGUAGES = new Set(["en", "ar", "tr", "fa", "az", "ru", "de", "fr", "es", "ckb"]);
const MAX_TEXT_LENGTH = 5000;

function json(data: unknown, status = 200, origin = ALLOWED_ORIGIN) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-client-info",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Vary": "Origin",
    },
  });
}

Deno.serve(async (req: Request) => {
  const origin = req.headers.get("origin") ?? "";
  // Pages project uses a subpath, but the origin is the GitHub Pages host.
  if (origin !== ALLOWED_ORIGIN) return json({ error: "Origin not allowed" }, 403);

  if (req.method === "OPTIONS") return new Response("ok", {
    headers: {
      "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
      "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-client-info",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Vary": "Origin",
    },
  });

  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const apiKey = Deno.env.get("GOOGLE_CLOUD_TRANSLATE_API_KEY");
  if (!apiKey) return json({ error: "Translation service is not configured yet" }, 503);

  let body: { text?: unknown; target?: unknown };
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  if (typeof body.text !== "string" || !body.text.trim() || body.text.length > MAX_TEXT_LENGTH) {
    return json({ error: `text must be a non-empty string up to ${MAX_TEXT_LENGTH} characters` }, 400);
  }
  if (typeof body.target !== "string" || !ALLOWED_LANGUAGES.has(body.target)) {
    return json({ error: "Unsupported target language" }, 400);
  }

  try {
    const response = await fetch(
      "https://translation.googleapis.com/language/translate/v2?key=" + encodeURIComponent(apiKey),
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          q: body.text,
          source: "ckb",
          target: body.target,
          format: "text",
        }),
      },
    );

    const payload = await response.json().catch(() => null);
    if (!response.ok) {
      console.error("Google Translation API returned status", response.status);
      return json({ error: "Translation provider request failed" }, 502);
    }

    const translatedText = payload?.data?.translations?.[0]?.translatedText;
    if (typeof translatedText !== "string") return json({ error: "No translation returned" }, 502);
    return json({ translatedText });
  } catch (error) {
    console.error("Translation request failed", error);
    return json({ error: "Translation request failed" }, 502);
  }
});
