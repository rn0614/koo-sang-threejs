"use client";

import { AddFloatButton } from "@/components/AddFloatButton/AddFloatButton";
import PageContent from "@/components/PageContent/PageContent";
import useSongList from "@/hooks/useSongList";

export default function Home() {
  const { data=[] } = useSongList();

  return (
    <>
      <PageContent songs={data} />
      <AddFloatButton />
    </>
  );
}
