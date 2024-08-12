import { useQuery } from "react-query";
import toast from "react-hot-toast";
import { Song } from "@/types/types";

const fetchSongs = async ():Promise<Song[]> => {
  const response = await fetch("/api/getapitest");
  console.log('fetching try')
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Unknown error");
  }
  return response.json();
};

export default function useFetchSong() {
  return useQuery("songs", fetchSongs, {
    onError: (error:Error) => {
      toast.error(`Error: ${error.message}`);
    },
  });
}
