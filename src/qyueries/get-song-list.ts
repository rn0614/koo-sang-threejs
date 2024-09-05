import type { TypedSupabaseClient } from "@/utils/supabase/client";

export function getSongsList(client:TypedSupabaseClient, params: any[]) {
  return client
    .from("songs")
    .select("*")
    .order("created_at", { ascending: false });
}
