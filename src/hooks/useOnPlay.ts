"use client";
import { Song } from "@/types/types";
import usePlayer from "./usePlayer";
import useAuthModal from "./useAuthModal";
import { useRecoilValue } from "recoil";
import { userState } from "@/store/useUserStore";
import { useRouter } from "next/navigation";
import { stackRouterPush } from "@/utils/stackRouter";

const useOnPlay = (songs: Song[]) => {
  const player = usePlayer();
  const user = useRecoilValue(userState);
  const router = useRouter();

  const onPlay = (id: number) => {
    if (!user.id) {
      stackRouterPush(router, `/login`);
    }
    player.setId(id);
    player.setIds(songs.map((song) => song.id));
  };
  return onPlay;
};

export default useOnPlay;
