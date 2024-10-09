import PageLayout from "@/components/PageLayout/PageLayout";
import { SearchContent } from "@/components/SearchContent/SearchContent";
import { SerachInput } from "@/components/SearchInput/SerachInput";
import { fetchSongByTitle } from "@/hooks/useSongList";
import React from "react";

export const revalidate = 0;

type SearchProps = {
  searchParams: {
    title: string;
  };
};

const Search: React.FC<SearchProps> = async ({ searchParams }) => {
  const songs = await fetchSongByTitle(searchParams.title);
  return (
    <PageLayout>
      <SerachInput />
      <SearchContent songs={songs}></SearchContent>
    </PageLayout>
  );
};

export default Search;
