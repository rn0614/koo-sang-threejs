// /app/api/songs/route.ts
import { NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const client = createServerComponentClient({ cookies });
  const page = Number(searchParams.get("page")) || 1; // 현재 페이지
  const limit = Number(searchParams.get("limit")) || 4; // 보이는 화면수
  const offset = (page - 1) * limit;

  const { data, error } = await client
    .from("songs")
    .select("*")
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
