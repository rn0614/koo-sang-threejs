import getLikedSongs from "@/actions/getLikedSongs";
import { Likedcontent } from "@/components/LikedContent/Likedcontent";
import { MediaItem } from "@/components/MediaItem/MediaItem";
import { Box } from "@radix-ui/themes";

export const revalidate = 0;

const Liked = async () => {
  const songs = await getLikedSongs();

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
