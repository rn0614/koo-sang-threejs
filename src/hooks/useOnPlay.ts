"use client";
import { Song } from "@/types/types";
import usePlayer from "./usePlayer";
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
      return null;
    }
    player.setId(id);
    player.setIds(songs.map((song) => song.id));
  };
  return onPlay;
};

export default useOnPlay;
