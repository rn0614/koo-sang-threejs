import { Song } from "@/types/types";
import {
  useInfiniteQuery,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";

type SearchParams = {
  page: unknown;
  limit?: number;
};

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
  return useInfiniteQuery<Song[],Error>({
    queryKey: ["songs"],
    queryFn: ( {pageParam} ) => fetchSongs({ page:pageParam, limit }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length < limit ? undefined : allPages.length + 1;
    },
  });
}

export { useSongList, useInfiniteSongList };
