"use client";
import { Song } from "@/types/types";
import { SongItem } from "../SongItem/SongItem";
import styles from './styles.module.scss';
import useOnPlay from "@/hooks/useOnPlay";
import { Box, Flex } from "@radix-ui/themes";
import React from "react";

type PageContentProps = {
  songs: Song[];
};

const PageContent: React.FC<PageContentProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs);

  if (songs.length === 0) {
    return <div>No songs available.</div>;
  }

  return (
    <div className={styles.pageContainer}>
      {songs.map((song) => (
        <SongItem key={song.id} data={song} onClick={() => onPlay(song.id)} />
      ))}
    </div>
  );
};

export default PageContent;
