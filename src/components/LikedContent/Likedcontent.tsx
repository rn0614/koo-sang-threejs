"use client";
import { useUser } from "@/hooks/useUser";
import { Song } from "@/types/types";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { MediaItem } from "../MediaItem/MediaItem";

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
    return <div>there is no songs~</div>;
  }

  return (
    <div>
      {songs.map((item) => (
        <MediaItem key={item.id} data={item} onClick={() => {}} />
      ))}
    </div>
  );
};
