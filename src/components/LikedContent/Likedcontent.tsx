"use client";
import { useUser } from "@/hooks/useUser";
import { Song } from "@/types/types";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { MediaItem } from "../MediaItem/MediaItem";
import { Box } from "@radix-ui/themes";

type LikedContentProps = {
  songs: Song[];
};

export const Likedcontent = ({ songs }: LikedContentProps) => {
  const router = useRouter();
  const { isLoading, user } = useUser();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  if (songs.length === 0) {
    return <Box>there is no songs~</Box>;
  }

  return (
    <Box>
      {songs.map((item) => (
        <MediaItem key={item.id} data={item} onClick={() => {}} />
      ))}
    </Box>
  );
};
