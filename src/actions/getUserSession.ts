"use server";

import { createClient } from "@/utils/supabase/server";

export default async function readUserSession() {
  const supabase = createClient();
  return await supabase.auth.getSession();
}
