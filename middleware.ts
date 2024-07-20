import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req:NextRequest, res:NextResponse) {
  const supabase = createMiddlewareClient({
    req,
    res,
  });

  await supabase.auth.getUser();

  return res;
}
