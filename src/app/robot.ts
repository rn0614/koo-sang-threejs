import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots{
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/music"],
      disallow:[]
    },
    sitemap:`${process.env.NEXT_PUBLIC_API_BASE_URL}/sitemap`
  }
}