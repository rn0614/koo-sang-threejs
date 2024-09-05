import { Song } from "@/types/types";
import { createClient } from "@/utils/supabase/server";

const getSongById = async (songId: string): Promise<Song| null> => {
  const supabase = createClient();
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
