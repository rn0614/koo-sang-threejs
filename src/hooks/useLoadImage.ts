import { Song } from "@/types/types";
import { getSupabaseBrowserClient } from "@/utils/supabase/client";

const useLoadImage = (song: Song) => {
  const supabase = getSupabaseBrowserClient();

  if (!song) {
    return null;
  }

  const { data: imageData } = supabase.storage
    .from("images")
    .getPublicUrl(song.image_path);

  return imageData.publicUrl;
};

export default useLoadImage;
