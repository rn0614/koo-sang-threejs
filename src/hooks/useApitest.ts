import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Song } from "@/types/types";

const fetchSongs = async ():Promise<Song[]> => {
  const response = await fetch("/api/getapitest");
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Unknown error");
  }
  return response.json();
};

export default function useFetchSong() {
  return useQuery({
    queryKey:["songs"],
    queryFn:fetchSongs
  })
}
