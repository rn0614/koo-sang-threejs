import getLikedSongs from "@/actions/getLikedSongs";
import { Likedcontent } from "@/components/LikedContent/Likedcontent";
import { MediaItem } from "@/components/MediaItem/MediaItem";

export const revalidate=0;

const Liked = async () => {
  const songs = await getLikedSongs();

  if(!songs){
    return (<div>Loading</div>)
  }

  return (
    <div>
      <Likedcontent songs={songs}/>
    </div>
  )
}


export default Liked;