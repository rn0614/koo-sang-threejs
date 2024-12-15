import { Song } from "@/types/types";

export default async function sitemap() {
  const baseUrl = process.env.NEXT_P_BASE_URL

  const response = await fetch(`${baseUrl}/api/songs?page=${1}&limit=${10000}`);

  const data: Song[] = await response.json();

  const songPages = data?.map((song)=>{
    return {
      url: `${baseUrl}/music/detail/${song?.id}`,
      latestModified: new Date()
    };
  });

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    ...songPages
  ]
}