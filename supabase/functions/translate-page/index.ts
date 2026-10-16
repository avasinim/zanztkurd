import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const allowedOrigins = new Set([
  "https://avasinim.github.io",
]);

const allowedTargets = new Set(["en", "ar", "tr", "fa", "az", "ru", "de", "fr", "es"]);

const corsHeaders = (origin: string) => ({
  "Access-Control-Allow-Origin": allowedOrigins.has(origin) ? origin : "https://avasinim.github.io",
  "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-client-info",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Vary": "Origin",
});

Deno.serve(async (req: Request) => {
  const origin = req.headers.get("origin") ?? "";
  const headers = corsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers });
  }
  if (req.method !== "POST") {
    return Response.json({ error: "method_not_allowed" }, { status: 405, headers });
  }
  if (origin && !allowedOrigins.has(origin)) {
    return Response.json({ error: "origin_not_allowed" }, { status: 403, headers });
  }

  const apiKey = Deno.env.get("GOOGLE_CLOUD_TRANSLATE_API_KEY");
  if (!apiKey) {
    return Response.json(
      { error: "translation_not_configured", message: "Server-side translation key is not configured." },
      { status: 503, headers },
    );
  }

  let body: { text?: unknown; target?: unknown };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400, headers });
  }

  const text = typeof body.text === "string" ? body.text.trim() : "";
  const target = typeof body.target === "string" ? body.target : "";
  if (!text || text.length > 5000 || !allowedTargets.has(target)) {
    return Response.json(
      { error: "invalid_input", message: "Provide text up to 5000 characters and a supported target language." },
      { status: 400, headers },
    );
  }

  try {
    const response = await fetch(
      "https://translation.googleapis.com/language/translate/v2?key=" + encodeURIComponent(apiKey),
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ q: text, source: "ckb", target, format: "text" }),
      },
    );
    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      console.error("[translate-page] Google Translation API returned", response.status);
      return Response.json({ error: "translation_provider_error" }, { status: 502, headers });
    }
    const translated = result?.data?.translations?.[0]?.translatedText;
    if (typeof translated !== "string") {
      return Response.json({ error: "invalid_provider_response" }, { status: 502, headers });
    }
    return Response.json({ translatedText: translated }, { headers });
  } catch (error) {
    console.error("[translate-page] request failed", error);
    return Response.json({ error: "translation_request_failed" }, { status: 502, headers });
  }
});
