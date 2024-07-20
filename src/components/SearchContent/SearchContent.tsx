"use client"
import { Song } from "@/types/types";
import React from "react";
import { MediaItem } from "../MediaItem/MediaItem";

type SearchContentProps = {
  songs: Song[];
};

export const SearchContent: React.FC<SearchContentProps> = ({ songs }) => {
  return (
    <div>
      {songs.map((item) => (
        <MediaItem key={item.id} data={item} onClick={()=>{}}></MediaItem>
      ))}
    </div>
  );
};
