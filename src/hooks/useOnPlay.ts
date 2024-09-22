"use client";
import { Song } from "@/types/types";
import usePlayer from "./usePlayer";
import useAuthModal from "./useAuthModal";
import { useRecoilValue } from "recoil";
import { userState } from "@/store/useUserStore";
import { useRouter } from "next/navigation";

const useOnPlay = (songs: Song[]) => {
  const player = usePlayer();
  const authModal = useAuthModal();
  const user = useRecoilValue(userState);
  const router= useRouter();

  const onPlay = (id: number) => {
    if (!user.id) {
      router.push("/login")
    }
    player.setId(id);
    player.setIds(songs.map((song) => song.id));
  };
  return onPlay;
};

export default useOnPlay;
