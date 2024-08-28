import { Song } from "@/types/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getSongById = async (songId: string): Promise<Song| null> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });
  if (!songId) {
    return null;
  }

  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .eq("id", `${songId}`)
    .single();
  if (error) {
    console.log(error);
  }

  return data || null;
};

export default getSongById;
