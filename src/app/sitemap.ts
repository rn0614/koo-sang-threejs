import { Song } from "@/types/types";

export default async function sitemap() {
  const baseUrl = "https://koo-sang-threejs.vercel.app";

  const response = await fetch(`/api/songs?page=${1}&limit=${10000}`);

  const data: Song[] = await response.json();

  const songPages = data?.map((song)=>{
    return {
      url: `${baseUrl}/blog/${song?.id}`,
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