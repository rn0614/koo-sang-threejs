import { Song } from "@/types/types";
import {
  useInfiniteQuery,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";

type SearchParams = {
  page: unknown;
  limit?: number;
  title?: string;
};

async function fetchSongsByUser() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/songs/liked`
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Unknown error");
  }
  return response.json();
}

async function fetchSongById(songId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/songs/${songId}`
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Unknown error");
  }
  return response.json();
}

async function fetchSongByTitle(title: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/songs?title=${title}`
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Unknown error");
  }
  return response.json();
}

async function fetchSongs({ page, limit }: SearchParams) {
  const response = await fetch(`/api/songs?page=${page}&limit=${limit}`);
  if (!response.ok) {
    throw new Error("Failed to fetch songs");
  }
  const data: Song[] = await response.json();
  return data || [];
}

function useSongList({ page, limit }: SearchParams): UseQueryResult<Song[]> {
  const returnData = useQuery<Song[]>({
    queryKey: ["songs", limit, page],
    queryFn: () => fetchSongs({ page, limit }),
    staleTime: 2000,
  });
  return returnData;
}

function useInfiniteSongList({ limit }: any) {
  return useInfiniteQuery<Song[], Error>({
    queryKey: ["songs"],
    queryFn: ({ pageParam = 1 }) => fetchSongs({ page: pageParam, limit }),
    //initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length < limit ? undefined : allPages.length + 1;
    },
  });
}

function useSongById(songId: string): UseQueryResult<Song> {
  const returnData = useQuery<Song>({
    queryKey: ["songs", songId],
    queryFn: () => fetchSongById(songId),
    staleTime: 2000,
  });
  return returnData;
}

export {
  useSongList,
  useInfiniteSongList,
  fetchSongById,
  fetchSongByTitle,
  fetchSongsByUser,
};
