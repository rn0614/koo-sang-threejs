import getSongsByTitle from "@/actions/getSongsByTitle";
import { SearchContent } from "@/components/SearchContent/SearchContent";
import { SerachInput } from "@/components/SearchInput/SerachInput";
import React from "react";

type SearchProps = {
  searchParams: {
    title: string;
  };
};

const Search: React.FC<SearchProps> = async ({ searchParams }) => {
  const songs = await getSongsByTitle(searchParams.title);
  return (
    <div>
      <SerachInput />
      <SearchContent songs={songs}></SearchContent>
    </div>
  );
};

export default Search;
