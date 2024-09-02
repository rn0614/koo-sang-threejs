import { Song } from "@/types/types";
import { useQuery, UseQueryResult } from "react-query";

type SearchParams ={
  page:number,
  limit:number
}

async function fetchSongs({page,limit}:SearchParams){
  const response = await fetch(`/api/songs?page=${page}&limit=${limit}`);
  if (!response.ok) {
    throw new Error("Failed to fetch songs");
  }
  const data: Song[] = await response.json();
  return data || [];
};


function useSongList({page,limit}:SearchParams): UseQueryResult<Song[]> {
  const returnData = useQuery<Song[]>(["songs",limit,page],() =>fetchSongs({page,limit}), {
    staleTime: 2000,
    keepPreviousData: true,
    onError: (error) => {
      console.error("Error fetching songs:", error);
    }
  });
  return returnData;
}

export default useSongList;
