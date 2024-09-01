import { Song } from "@/types/types";
import { useQuery, UseQueryResult } from "react-query";

const fetchSongs = async (): Promise<Song[]> => {
  const response = await fetch("/api/songs");
  if (!response.ok) {
    throw new Error("Failed to fetch songs");
  }
  const data: Song[] = await response.json();
  return data || [];
};

function useSongList(): UseQueryResult<Song[]> {
  const returnData = useQuery<Song[]>(["songs"], fetchSongs, {
    staleTime: 2000,
    keepPreviousData: true,
    onError: (error) => {
      console.error("Error fetching songs:", error);
    }
  });
  return returnData;
}

export default useSongList;
