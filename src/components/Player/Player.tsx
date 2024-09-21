"use client";

import useGetSongById from "@/hooks/useGetSongById";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import usePlayer from "@/hooks/usePlayer";
import React from "react";
import styles from "./styles.module.scss";
import PlayerContent from "../PlayerContent.tsx/PlayerContent";

export const Player = () => {
  const player = usePlayer();
  const { data: song } = useGetSongById(player.activeId);

  const songUrl = useLoadSongUrl(song!);

  if (!song || !songUrl || !player.activeId) {
    return null;
  }

  return (
    <div className={styles.songWrapper}>
      <PlayerContent
        key={songUrl}
        song={song}
        songUrl={songUrl}
      ></PlayerContent>
    </div>
  );
};
