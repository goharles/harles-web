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
  // Expose environment variables to server-side runtime
  env: {
    APP_AWS_REGION: process.env.APP_AWS_REGION,
    APP_AWS_ACCESS_KEY_ID: process.env.APP_AWS_ACCESS_KEY_ID,
    APP_AWS_SECRET_ACCESS_KEY: process.env.APP_AWS_SECRET_ACCESS_KEY,
    DYNAMODB_BOOKINGS_TABLE: process.env.DYNAMODB_BOOKINGS_TABLE,
    DYNAMODB_CONTACTS_TABLE: process.env.DYNAMODB_CONTACTS_TABLE,
  },
};

export default nextConfig;
