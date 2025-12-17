import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable image optimization with remote patterns if needed
  images: {
    unoptimized: false,
  },
  // Ensure trailing slashes for Firebase Hosting compatibility
  trailingSlash: false,
  // Enable strict mode for better debugging
  reactStrictMode: true,
};

export default nextConfig;
