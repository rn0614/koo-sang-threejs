import getSongs from "@/actions/getSongs";
import PageContent from "@/components/PageContent/PageContent";

export default async function Home() {
  const songs = await getSongs();
  return <PageContent songs={songs} />;
}
