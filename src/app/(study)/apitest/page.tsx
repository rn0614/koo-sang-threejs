"use client";
import { MediaItem } from "@/components/MediaItem/MediaItem";
import useFetchSong from "@/hooks/useApitest";
import React from "react";
import { useQuery } from "react-query";

export default function ApiTestPage() {
  const { data = [], error, isLoading, refetch } = useFetchSong();
  return (
    <div>
      <button onClick={() => refetch}>getHendler</button>
      <ul>
        {data.map((item) => (
          <MediaItem key={item.id} onClick={() => {}} data={item} />
        ))}
      </ul>
    </div>
  );
}
