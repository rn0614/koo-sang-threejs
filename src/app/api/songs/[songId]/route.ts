import { createClient } from "@/utils/supabase/server";

export async function GET(
  request: Request,
  { params }: { params: { songId: string } }
) {
  const supabase = createClient();
  if (!params.songId) {
    console.log("songId", params.songId);
    return null;
  }

  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .eq("id", `${params.songId}`)
    .single();
  if (error) {
    console.log(error);
  }
  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 201,
  });
}
