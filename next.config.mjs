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
  async rewrites() {
    return [
      {
        source: '/socket/:path*', // 로컬 요청 경로
        destination: 'https://spring.koosang-project.com/socket/:path*', // 실제 API 경로
      },
    ];
  },
};

export default nextConfig;
