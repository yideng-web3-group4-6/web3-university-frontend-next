import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/api/:path*", // 匹配 /api/ 开头的请求
        destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}api/:path*`,
      },
    ];
  },
  reactStrictMode: false,
};

export default nextConfig;
