"use client";
import { Song } from "@/types/types";
import { MediaItem } from "../MediaItem/MediaItem";
import { Box, Flex } from "@radix-ui/themes";

type LikedContentProps = {
  songs: Song[];
};

export const Likedcontent = ({ songs = [] }: LikedContentProps) => {
  if (songs.length === 0) {
    return <Box>there is no songs~</Box>;
  }

  return (
    <Flex gap={"1"}>
      {songs.map((item) => (
        <MediaItem key={item.id} data={item} onClick={() => {}} />
      ))}
    </Flex>
  );
};
