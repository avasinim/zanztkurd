import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SITE_ORIGIN = "https://avasinim.github.io";
// Local origins are allowed only for development/testing; the Edge Function remains owner-only.
const ALLOWED_ORIGINS = new Set([
  SITE_ORIGIN,
  "http://localhost:8000",
  "http://127.0.0.1:8000",
]);

function corsHeaders(origin = SITE_ORIGIN) {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Headers": "authorization, content-type, apikey, x-client-info",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
  };
}

function json(body: unknown, status = 200, origin = SITE_ORIGIN) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders(origin), "Content-Type": "application/json; charset=utf-8" },
  });
}

Deno.serve(async (req: Request) => {
  const origin = req.headers.get("origin");
  if (origin && !ALLOWED_ORIGINS.has(origin)) return json({ error: "origin_not_allowed" }, 403);
  const responseOrigin = origin && ALLOWED_ORIGINS.has(origin) ? origin : SITE_ORIGIN;
  const respond = (body: unknown, status = 200) => json(body, status, responseOrigin);

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders(responseOrigin) });
  }
  if (req.method !== "POST") return respond({ error: "method_not_allowed" }, 405);

  const authorization = req.headers.get("authorization");
  if (!authorization?.startsWith("Bearer ")) return respond({ error: "authentication_required" }, 401);

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");
  const beatApiKey = Deno.env.get("BEATAPI_API_KEY");
  const beatApiModel = Deno.env.get("BEATAPI_MODEL");

  if (!supabaseUrl || !supabaseAnonKey) {
    return respond({ error: "server_configuration_incomplete" }, 503);
  }
  if (!beatApiKey || !beatApiModel) {
    return respond({ error: "beatapi_not_configured" }, 503);
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: authorization } },
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) return respond({ error: "invalid_session" }, 401);

  // Initial release is owner-only to prevent unexpected API usage or charges.
  const { data: isOwner, error: ownerError } = await supabase.rpc("is_site_owner");
  if (ownerError || isOwner !== true) return respond({ error: "owner_access_required" }, 403);

  let body: { messages?: unknown };
  try {
    body = await req.respond();
  } catch {
    return respond({ error: "invalid_json" }, 400);
  }

  if (!Array.isArray(body.messages) || body.messages.length < 1 || body.messages.length > 8) {
    return respond({ error: "messages_must_contain_1_to_8_items" }, 400);
  }

  let totalChars = 0;
  const messages: { role: "user" | "assistant"; content: string }[] = [];
  for (const item of body.messages) {
    if (!item || (item.role !== "user" && item.role !== "assistant") ||
        typeof item.content !== "string" || item.content.trim().length === 0) {
      return respond({ error: "invalid_message_format" }, 400);
    }
    totalChars += item.content.length;
    messages.push({ role: item.role, content: item.content.slice(0, 6000) });
  }
  if (totalChars > 12000) return respond({ error: "request_too_large" }, 413);

  const systemMessage = {
    role: "system",
    content: "You are an assistant for the Zansti Kurd / Avasin academic Kurdish language platform. Be precise and economical. Never modify, normalize, translate, or invent scientific lesson text, source-book examples, or spelling unless the user explicitly requests and approves the exact change. Treat all user-provided lesson/book text as source material to preserve. Do not claim an action was completed unless verified. This endpoint is owner-only and for project assistance.",
  };

  let upstream: Response;
  try {
    upstream = await fetch("https://direct.beatapi.io/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${beatApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: beatApiModel,
        messages: [systemMessage, ...messages],
        max_tokens: 1200,
        temperature: 0.2,
        stream: false,
      }),
    });
  } catch {
    return respond({ error: "beatapi_connection_failed" }, 502);
  }

  if (!upstream.ok) {
    // Do not forward upstream bodies, which may contain implementation details.
    return respond({ error: "beatapi_request_failed", upstream_status: upstream.status }, 502);
  }

  let result: { choices?: { message?: { content?: unknown } }[]; model?: string };
  try {
    result = await upstream.respond();
  } catch {
    return respond({ error: "invalid_beatapi_response" }, 502);
  }

  const answer = result.choices?.[0]?.message?.content;
  if (typeof answer !== "string" || answer.length === 0) {
    return respond({ error: "empty_beatapi_response" }, 502);
  }

  return respond({ answer, model: result.model ?? beatApiModel });
});
