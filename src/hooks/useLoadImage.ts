import { Song } from "@/types/types";
import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";

const supabase = createClient();

const fetchImageUrl = async (song: Song): Promise<string> => {
  const { data: imageData } = supabase.storage
    .from("images")
    .getPublicUrl(song.image_path);

  return imageData?.publicUrl;
};

const useLoadImage = (song: Song) => {
  return useQuery({
    queryKey: ["imageUrl", song?.image_path],
    queryFn: () => fetchImageUrl(song),
    enabled: !!song, // Only run the query if song exists
    staleTime: Infinity, // Optional: keep the cache indefinitely
    cacheTime: Infinity, // Optional: keep the cache even after component unmounts
  });
};

export default useLoadImage;
