import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const ALLOWED_ORIGINS = new Set([
  "https://avasinim.github.io",
  "https://zanztkurd.github.io"
]);
const ALLOWED_LANGS = new Set(["en","ar","tr","fa","az","ru","de","fr","es"]);
const corsHeaders = (origin: string) => ({
  "Access-Control-Allow-Origin": ALLOWED_ORIGINS.has(origin) ? origin : "https://avasinim.github.io",
  "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-client-info",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Vary": "Origin"
});
const json = (data: unknown, status: number, headers: Record<string,string>) =>
  new Response(JSON.stringify(data), { status, headers: { ...headers, "Content-Type": "application/json; charset=utf-8" } });

// The free endpoint rate-limits bursts. Keep a small isolate-local cache and
// make provider requests sequentially, with bounded retries for HTTP 429.
const translationCache = new Map<string,string>();
const MAX_CACHE_ENTRIES = 1200;
const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function translateOne(text: string, target: string): Promise<string | null> {
  const key = target + "\\u0000" + text;
  const cached = translationCache.get(key);
  if (cached) return cached;

  // First no-key provider: try Sorani Kurdish directly before rate-limited fallbacks. MyMemory uses the generic Kurdish code (ku);
  // it may not support every Sorani phrase, so accept only explicit successful results.
  try {
    const url = new URL("https://api.mymemory.translated.net/get");
    url.searchParams.set("q", text);
    url.searchParams.set("langpair", "ku|" + target);
    const response = await fetch(url, {
      headers: { "Accept": "application/json" },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) {
      console.warn("[translate-page] MyMemory provider status", response.status);
    } else {
      const data = await response.json().catch(() => null);
      const result = typeof data?.responseData?.translatedText === "string"
        ? data.responseData.translatedText
        : "";
      const status = Number(data?.responseStatus);
      if (status === 200 && result.trim() && result.trim().toLowerCase() !== text.trim().toLowerCase()) {
        if (translationCache.size >= MAX_CACHE_ENTRIES) {
          const firstKey = translationCache.keys().next().value;
          if (firstKey !== undefined) translationCache.delete(firstKey);
        }
        translationCache.set(key, result);
        return result;
      }
      console.warn("[translate-page] MyMemory returned no usable translation", {
        responseStatus: status,
        hasTranslation: Boolean(result.trim()),
        sameAsInput: result.trim().toLowerCase() === text.trim().toLowerCase(),
        matchCount: Number(data?.matches?.length || 0),
        responseDetails: typeof data?.responseDetails === "string" ? data.responseDetails.slice(0, 120) : null
      });
    }
  } catch (error) {
    console.warn("[translate-page] MyMemory provider attempt failed", error);
  }

  // Alternate unofficial Google endpoint, separate from translate.googleapis.com.
  // It returns an object with sentences[].trans; use only when it provides a real change.
  try {
    const url = new URL("https://clients5.google.com/translate_a/t");
    url.searchParams.set("client", "dict-chrome-ex");
    url.searchParams.set("sl", "auto");
    url.searchParams.set("tl", target);
    url.searchParams.set("q", text);
    const response = await fetch(url, {
      headers: {
        "Accept": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
      },
      signal: AbortSignal.timeout(6500),
    });
    if (!response.ok) {
      console.warn("[translate-page] Google alternate provider status", response.status);
    } else {
      const data = await response.json().catch(() => null);
      const result = Array.isArray(data?.sentences)
        ? data.sentences.map((part: unknown) => {
            if (!part || typeof part !== "object") return "";
            const sentence = part as Record<string, unknown>;
            return typeof sentence.trans === "string" ? sentence.trans : "";
          }).join("")
        : "";
      if (result.trim() && result.trim().toLowerCase() !== text.trim().toLowerCase()) {
        if (translationCache.size >= MAX_CACHE_ENTRIES) {
          const firstKey = translationCache.keys().next().value;
          if (firstKey !== undefined) translationCache.delete(firstKey);
        }
        translationCache.set(key, result);
        return result;
      }
      console.warn("[translate-page] Google alternate provider returned no usable translation", {
        hasTranslation: Boolean(result.trim()),
        sameAsInput: result.trim().toLowerCase() === text.trim().toLowerCase(),
      });
    }
  } catch (error) {
    console.warn("[translate-page] Google alternate provider attempt failed", error);
  }

  const googleHosts = [
    "https://translate.googleapis.com/translate_a/single",
    "https://translate.google.com/translate_a/single",
  ];
  for (let attempt = 0; attempt < googleHosts.length; attempt++) {
    try {
      const url = new URL(googleHosts[attempt]);
      url.searchParams.set("client", "gtx");
      url.searchParams.set("sl", "auto");
      url.searchParams.set("tl", target);
      url.searchParams.set("dt", "t");
      url.searchParams.set("q", text);
      const response = await fetch(url, {
        headers: { "Accept": "application/json", "User-Agent": "Mozilla/5.0" },
        signal: AbortSignal.timeout(6500),
      });
      if (!response.ok) {
        console.warn("[translate-page] Google fallback status", response.status);
        continue;
      }
      const data = await response.json();
      if (!Array.isArray(data) || !Array.isArray(data[0])) continue;
      const result = data[0]
        .filter((part: unknown) => Array.isArray(part) && typeof part[0] === "string")
        .map((part: unknown[]) => String(part[0]))
        .join("");
      if (result.trim()) {
        if (translationCache.size >= MAX_CACHE_ENTRIES) {
          const firstKey = translationCache.keys().next().value;
          if (firstKey !== undefined) translationCache.delete(firstKey);
        }
        translationCache.set(key, result);
        return result;
      }
    } catch (error) {
      console.warn("[translate-page] Google fallback attempt failed", error);
    }
  }

  // Secondary no-key fallback. A provider outage should affect only this item,
  // not discard the other successful translations in the same batch.
  for (const host of ["https://lingva.lunar.icu", "https://lingva.ml", "https://lingva.garudalinux.org"]) {
    try {
      const url = host + "/api/v1/auto/" + encodeURIComponent(target) + "/" + encodeURIComponent(text);
      const response = await fetch(url, { signal: AbortSignal.timeout(6500) });
      if (!response.ok) {
        console.warn("[translate-page] Lingva provider status", host, response.status);
        continue;
      }
      const data = await response.json().catch(() => null);
      const result = typeof data?.translation === "string" ? data.translation : "";
      if (!result.trim() && data?.error) console.warn("[translate-page] Lingva provider error", host, String(data.error).slice(0,160));
      if (result.trim()) {
        if (translationCache.size >= MAX_CACHE_ENTRIES) {
          const firstKey = translationCache.keys().next().value;
          if (firstKey !== undefined) translationCache.delete(firstKey);
        }
        translationCache.set(key, result);
        return result;
      }
    } catch (error) {
      console.warn("[translate-page] secondary provider attempt failed", error);
    }
  }
  return null;
}

Deno.serve(async (req: Request) => {
  const origin = req.headers.get("origin") || "";
  const headers = corsHeaders(origin);
  if (req.method === "OPTIONS") return new Response(null, { headers });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405, headers);
  if (!ALLOWED_ORIGINS.has(origin)) return json({ error: "Origin not allowed" }, 403, headers);

  try {
    const body = await req.json();
    const target = String(body?.target || "");
    const texts = body?.texts;
    if (!ALLOWED_LANGS.has(target)) return json({ error: "Unsupported language" }, 400, headers);
    if (!Array.isArray(texts) || texts.length < 1 || texts.length > 20 ||
        texts.some((t: unknown) => typeof t !== "string" || t.length > 700)) {
      return json({ error: "Invalid text batch" }, 400, headers);
    }
    const total = texts.reduce((sum: number, t: string) => sum + t.length, 0);
    if (total > 5000) return json({ error: "Batch too large" }, 413, headers);

    const translations: string[] = [];
    for (const text of texts as string[]) {
      translations.push(await translateOne(text, target));
    }
    return json({ translations }, 200, { ...headers, "Cache-Control": "no-store" });
  } catch (error) {
    console.error("[translate-page]", error);
    return json({ error: "Translation provider failed or is rate-limited; retry shortly" }, 502, headers);
  }
});