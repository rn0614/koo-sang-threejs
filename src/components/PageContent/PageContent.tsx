"use client";
import useOnPlay from "@/hooks/useOnPlay";
import { Song } from "@/types/types";
import { Box, Grid } from "@radix-ui/themes";
import React from "react";
import { SongItem } from "../SongItem/SongItem";

type PageContentProps = {
  songs: Song[];
};

const PageContent: React.FC<PageContentProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs);
  return (
    <Grid
      columns={{ xs: "1", sm: "2", md: "3", lg: "4", xl: "6" }}
      gap="3"
      width="auto"
    >
      {songs.map((song) => (
        <SongItem key={song.id} data={song} onClick={() => onPlay(song.id)} />
      ))}
    </Grid>
  );
};

export default PageContent;
