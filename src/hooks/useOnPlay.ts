"use client";
import { Song } from "@/types/types";
import usePlayer from "./usePlayer";
import useAuthModal from "./useAuthModal";
import { useRecoilValue } from "recoil";
import { userState } from "@/store/useUserStore";

const useOnPlay = (songs: Song[]) => {
  const player = usePlayer();
  const authModal = useAuthModal();
  const user = useRecoilValue(userState);

  const onPlay = (id: number) => {
    console.log('test');

    console.log('test')
    if (!user.id) {
      return authModal.onOpen();
    }
    player.setId(id);
    player.setIds(songs.map((song) => song.id));
  };
  return onPlay;
};

export default useOnPlay;
