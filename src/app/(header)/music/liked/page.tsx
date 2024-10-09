import { Likedcontent } from "@/components/LikedContent/Likedcontent";
import { fetchSongsByUser } from "@/hooks/useSongList";
import { Box } from "@radix-ui/themes";

export const revalidate = 0;

const Liked = async () => {
  const songs = await fetchSongsByUser();

  if (!songs) {
    return <Box>Loading</Box>;
  }

  return (
    <>
      <Likedcontent songs={songs} />
    </>
  );
};

export default Liked;
