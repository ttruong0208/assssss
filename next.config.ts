import type { NextConfig } from "next";

import dotenv from "dotenv";
dotenv.config();

const nextConfig: NextConfig = {
  reactStrictMode: false,
  /*
   * Next.js tự động load env vars từ:
   * - .env.local (highest priority)
   * - .env.development hoặc .env.production (based on NODE_ENV)
   * - .env
   *
   * Không cần hard-code env vars ở đây trừ khi có lý do đặc biệt
   */

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ecoapi.chainivo.online",
        pathname: "/**",  
      },
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "localhost",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
