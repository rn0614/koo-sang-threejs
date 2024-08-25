"use client"
import { Song } from "@/types/types";
import React from "react";
import { MediaItem } from "../MediaItem/MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import { Box } from "@radix-ui/themes";

type SearchContentProps = {
  songs: Song[];
};

export const SearchContent: React.FC<SearchContentProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs);
  return (
    <Box>
      {songs.map((item) => (
        <MediaItem key={item.id} data={item} onClick={(id:string)=>onPlay(id)}></MediaItem>
      ))}
    </Box>
  );
};
