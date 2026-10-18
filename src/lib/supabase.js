import { createClient } from "@supabase/supabase-js";

/*
 * Supabase configuration
 */
const URL = import.meta.env.VITE_SUPABASE_URL;
const KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const hasSupabase = Boolean(URL && KEY);

/*
 * Unified Supabase client instance used across the app for Auth & RPC
 */
export const supabase = hasSupabase
  ? createClient(URL, KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        flowType: "pkce",
      },
    })
  : null;

/*
 * Existing RPC function (preserved for backwards-compatibility with ML & recyclers)
 */
export async function rpc(fn, args = {}) {
  if (!hasSupabase) {
    throw new Error("Supabase is not configured (see .env.local)");
  }

  const headers = {
    apikey: KEY,
    "Content-Type": "application/json",
  };

  if (!KEY.startsWith("sb_")) {
    headers.Authorization = `Bearer ${KEY}`;
  }

  const res = await fetch(`${URL}/rest/v1/rpc/${fn}`, {
    method: "POST",
    headers,
    body: JSON.stringify(args),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`${fn} failed (${res.status}) ${detail.slice(0, 200)}`);
  }

  return res.json();
}
