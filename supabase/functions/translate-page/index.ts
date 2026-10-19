import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const allowedOrigins = new Set(["https://avasinim.github.io"]);
const allowedTargets = new Set(["en", "ar", "tr", "fa", "az", "ru", "de", "fr", "es"]);
const corsHeaders = (origin: string) => ({
  "Access-Control-Allow-Origin": allowedOrigins.has(origin) ? origin : "https://avasinim.github.io",
  "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-client-info",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Vary": "Origin",
});

async function translateOne(text: string, target: string, apiKey: string | undefined): Promise<string | null> {
  try {
    if (apiKey) {
      const response = await fetch(
        "https://translation.googleapis.com/language/translate/v2?key=" + encodeURIComponent(apiKey),
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ q: text, source: "ckb", target, format: "text" }),
          signal: AbortSignal.timeout(12000),
        },
      );
      if (!response.ok) {
        console.error("[translate-page] Google API returned", response.status);
        return null;
      }
      const result = await response.json().catch(() => ({}));
      const translated = result?.data?.translations?.[0]?.translatedText;
      return typeof translated === "string" && translated.trim() ? translated : null;
    }

    // No-key fallback. This public Google Translate endpoint is unofficial and may
    // be rate-limited; a failed item is returned as null rather than replacing source text.
    const url = new URL("https://translate.googleapis.com/translate_a/single");
    url.searchParams.set("client", "gtx");
    url.searchParams.set("sl", "ckb");
    url.searchParams.set("tl", target);
    url.searchParams.set("dt", "t");
    url.searchParams.set("q", text);
    const response = await fetch(url, { signal: AbortSignal.timeout(12000) });
    if (!response.ok) {
      console.error("[translate-page] no-key fallback returned", response.status);
      return null;
    }
    const result = await response.json().catch(() => null);
    const chunks = Array.isArray(result?.[0]) ? result[0] : [];
    const translated = chunks.map((chunk: unknown) =>
      Array.isArray(chunk) && typeof chunk[0] === "string" ? chunk[0] : ""
    ).join("");
    return translated.trim() ? translated : null;
  } catch (error) {
    console.error("[translate-page] item failed", error);
    return null;
  }
}

Deno.serve(async (req: Request) => {
  const origin = req.headers.get("origin") ?? "";
  const headers = corsHeaders(origin);

  if (req.method === "OPTIONS") return new Response("ok", { headers });
  if (req.method !== "POST") {
    return Response.json({ error: "method_not_allowed" }, { status: 405, headers });
  }
  if (origin && !allowedOrigins.has(origin)) {
    return Response.json({ error: "origin_not_allowed" }, { status: 403, headers });
  }

  let body: { text?: unknown; texts?: unknown; target?: unknown };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400, headers });
  }

  const target = typeof body.target === "string" ? body.target : "";
  const texts = Array.isArray(body.texts)
    ? body.texts
    : typeof body.text === "string" ? [body.text] : [];

  if (!allowedTargets.has(target) || texts.length < 1 || texts.length > 8 ||
      texts.some((item) => typeof item !== "string" || !item.trim() || item.length > 5000)) {
    return Response.json(
      { error: "invalid_input", message: "Provide 1–8 text items (each up to 5000 characters) and a supported target language." },
      { status: 400, headers },
    );
  }

  const apiKey = Deno.env.get("GOOGLE_CLOUD_TRANSLATE_API_KEY");
  const translations: (string | null)[] = [];
  // Keep provider calls sequential to reduce rate-limit spikes.
  for (const item of texts as string[]) {
    translations.push(await translateOne(item.trim(), target, apiKey));
  }

  return Response.json({ translations }, { headers });
});
