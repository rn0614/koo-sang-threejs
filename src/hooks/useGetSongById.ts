import { Song } from "@/types/types";
import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const supabase = createClient();

const fetchSongById = async (id?: number) => {
  if (!id) return null;
  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Song;
};

const useGetSongById = (id?: number) => {
  return useQuery({
    queryKey: ["song", id],
    queryFn: () => fetchSongById(id),
    enabled: !!id, // Only run the query if id is provided
    onError: (error: Error) => toast.error(error.message),
    retry: false, // Optional: Avoid retry on error if needed
  });
};

export default useGetSongById;
