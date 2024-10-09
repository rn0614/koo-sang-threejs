import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { songId: string } }
) {
  const supabase = createClient();
  if (!params.songId) {
    console.log("songId", params.songId);
    return NextResponse.json({ error: "없는 노래입니다." }, { status: 404 });
  }

  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .eq("id", `${params.songId}`)
    .single();
  if (error) {
    console.log(error);
  }
  return NextResponse.json(data);
}
