import "server-only";
import { Song } from "@/types/types";
import { createClient } from "@/utils/supabase/server";

const getLikedSongs = async (): Promise<Song[]> => {
  const supabase = createClient();

  const { data: user } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("liked_songs")
    .select("*, songs(*)")
    .eq("user_id", user?.user?.id)

  if (error) {
    console.log(error);
    return [];
  }

  if (!data) {
    return [];
  }

  return data.map((item) => ({
    ...item.songs,
  }));
};

export default getLikedSongs;
