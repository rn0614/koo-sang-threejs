import { Song } from "@/types/types";
import { useInfiniteQuery, useQuery, UseQueryResult } from "@tanstack/react-query";

type SearchParams ={
  page:number,
  limit?:number
}

async function fetchSongs({page,limit}:SearchParams){
  const response = await fetch(`/api/songs?page=${page}&limit=${limit}`);
  if (!response.ok) {
    throw new Error("Failed to fetch songs");
  }
  const data: Song[] = await response.json();
  return data || [];
};

export const fetchTodos = async ({page})=>{
  const res =await fetch(
    `https://jsonplaceholder.typicode.com/todos?_page=${page}`
  );
  return res.json();
}


function useSongList({page,limit}:SearchParams): UseQueryResult<Song[]> {
  const returnData = useQuery<Song[]>({
    queryKey:["songs",limit,page],
    queryFn:()=>fetchSongs({page,limit}),
    staleTime: 2000,
  }
);
  return returnData;
}

function useInfiniteSongList({page,limit}:SearchParams) {
  const {data, status } = useInfiniteQuery({
    queryKey:["songs"],
    queryFn:()=>fetchSongs({page:page, limit:limit}),
    initialPageParam:1,
    getNextPageParam:(lastPage)=>lastPage.nextPage,
  })
  return {data,status}
}




export {useSongList, useInfiniteSongList};
