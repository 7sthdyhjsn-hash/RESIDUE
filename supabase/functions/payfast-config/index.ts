const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "content-type": "application/json"
};

const PAYFAST_MERCHANT_ID = Deno.env.get("PAYFAST_MERCHANT_ID") ?? "";
const PAYFAST_MERCHANT_KEY = Deno.env.get("PAYFAST_MERCHANT_KEY") ?? "";

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: corsHeaders
  });
}

Deno.serve(async req => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "GET") {
    return json({ error: "Method not allowed" }, 405);
  }

  if (!PAYFAST_MERCHANT_ID || !PAYFAST_MERCHANT_KEY) {
    return json({
      error: "Missing PayFast secrets",
      detail: "Set PAYFAST_MERCHANT_ID and PAYFAST_MERCHANT_KEY in Supabase Edge Function secrets."
    }, 500);
  }

  return json({
    merchantId: PAYFAST_MERCHANT_ID,
    merchantKey: PAYFAST_MERCHANT_KEY
  });
});
