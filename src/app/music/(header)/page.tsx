import getSongs from "@/actions/getSongs";
import { AddFloatButton } from "@/components/AddFloatButton/AddFloatButton";
import PageContent from "@/components/PageContent/PageContent";
//import {faker} from '@faker-js/faker';

export default async function Home() {
  const songs = await getSongs();
  return (
    <>
      <PageContent songs={songs} />
      <AddFloatButton/>
    </>
  );
}
