import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const supabase = createClient();

  const { data: user } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("liked_songs")
    .select("*, songs(*)")
    .eq("user_id", user?.user?.id);

  if (error) {
    console.log(error);
    return new Response(JSON.stringify([]));
  }

  if (!data) {
    return new Response(JSON.stringify([]));
  }

  return new Response(
    JSON.stringify(
      data.map(
        (item) => ({
          ...item.songs,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          status: 201,
        }
      )
    )
  );
}
