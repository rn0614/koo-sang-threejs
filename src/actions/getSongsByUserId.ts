import { Song } from "@/types/types";
import { createClient } from "@/utils/supabase/server";

const getSongsByUserId = async (): Promise<Song[]> => {
  const supabase = createClient();

  const { data: {user}, error: sessionError } =
    await supabase.auth.getUser();

  if (sessionError) {
    return [];
  }

  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .eq("user_id", user?.id)
    .order("created_at", { ascending: true });

  if (error) {
    console.log(error.message);
  }

  return (data as any) || [];
};

export default getSongsByUserId;
