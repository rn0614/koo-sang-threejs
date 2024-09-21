import { createBrowserClient } from "@supabase/ssr";
import { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/types_db";

export type TypedSupabaseClient = SupabaseClient<Database>;

const createClient = (() => {
  let supabaseClient: TypedSupabaseClient | null = null;

  return function getClient(): TypedSupabaseClient {
    if (!supabaseClient) {
      supabaseClient = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
    }
    return supabaseClient;
  };
})();

export { createClient };
