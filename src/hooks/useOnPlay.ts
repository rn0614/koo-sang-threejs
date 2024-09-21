"use client"
import { Song } from "@/types/types";
import usePlayer from "./usePlayer";
import useAuthModal from "./useAuthModal";
import useUser from "@/hooks/useUser2";

const useOnPlay = (songs: Song[]) => {
  const player = usePlayer();
  const authModal = useAuthModal();
  const { user } = useUser();

  const onPlay = (id: string) => {
    if (!user.id) {
      return authModal.onOpen();
    }
    player.setId(id);
    player.setIds(songs.map((song) => song.id));
  };
  return onPlay
};

export default useOnPlay;