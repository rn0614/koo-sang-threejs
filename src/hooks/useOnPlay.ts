"use client";
import { Song } from "@/types/types";
import usePlayer from "./usePlayer";
import { useRecoilValue } from "recoil";
import { userState } from "@/store/useUserStore";
import { useRouter } from "next/navigation";
import { stackRouterPush } from "@/utils/stackRouter";
import { useCallback, useMemo } from "react";

const useOnPlay = (songs: Song[]) => {
  const player = usePlayer();
  const user = useRecoilValue(userState);
  const router = useRouter();

  // songs가 변경될 때만 새로운 ID 배열을 생성합니다.
  const songIds = useMemo(() => songs.map((song) => song.id), [songs]);

  // onPlay 함수를 useCallback으로 감싸서 종속성이 변경될 때만 재생성되도록 합니다.
  const onPlay = useCallback(
    (id: number) => {
      if (!user.id) {
        stackRouterPush(router, `/home/login`);
        return null;
      }
      player.setId(id);
      player.setIds(songIds);
    },
    [user.id, router, player, songIds]
  );

  return onPlay;
};

export default useOnPlay;
