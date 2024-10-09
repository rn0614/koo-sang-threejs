// /app/api/songs/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const client = createClient();
  const page = Number(searchParams.get("page")) || 1; // 현재 페이지
  const limit = Number(searchParams.get("limit")) || 4; // 보이는 화면수
  const title = searchParams.get("title");
  const offset = (page - 1) * limit;

  let query = client.from("songs").select("*");

  if (title) {
    query.ilike("title", `%${title}%`);
  }

  query.order("created_at", { ascending: false });

  if (limit && offset) {
    query.range(offset, offset + limit - 1);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
