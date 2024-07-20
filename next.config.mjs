/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "iutuiqbejrctvhyqbuiq.supabase.co",
      },
    ],
  },
};

export default nextConfig;
