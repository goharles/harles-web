import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable image optimization with remote patterns if needed
  images: {
    unoptimized: false,
  },
  // Disable trailing slashes for Amplify
  trailingSlash: false,
  // Enable strict mode for better debugging
  reactStrictMode: true,
  // Output configuration for AWS Amplify SSR
  output: 'standalone',
};

export default nextConfig;
