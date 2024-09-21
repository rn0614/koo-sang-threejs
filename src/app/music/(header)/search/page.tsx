import getSongsByTitle from "@/actions/getSongsByTitle";
import PageLayout from "@/components/PageLayout/PageLayout";
import { SearchContent } from "@/components/SearchContent/SearchContent";
import { SerachInput } from "@/components/SearchInput/SerachInput";
import React from "react";

export const revalidate = 0;

type SearchProps = {
  searchParams: {
    title: string;
  };
};

const Search: React.FC<SearchProps> = async ({ searchParams }) => {
  const songs = await getSongsByTitle(searchParams.title);
  return (
    <PageLayout>
      <SerachInput />
      <SearchContent songs={songs}></SearchContent>
    </PageLayout>
  );
};

export default Search;
