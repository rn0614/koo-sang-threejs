"use client"
import { Song } from "@/types/types";
import React from "react";
import { MediaItem } from "../MediaItem/MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import { Box, Flex } from "@radix-ui/themes";
import styles from './styles.module.scss'

type SearchContentProps = {
  songs: Song[];
};

export const SearchContent: React.FC<SearchContentProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs);
  return (
    <Flex gap="1" className={styles.searchWrapper}>
      {songs.map((item) => (
        <MediaItem key={item.id} data={item} onClick={(id:number)=>onPlay(id)}></MediaItem>
      ))}
    </Flex>
  );
};
