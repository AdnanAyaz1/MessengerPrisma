import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Disable linting during production build
    ignoreDuringBuilds: true,
  },

  images: {
    domains: ["avatars.githubusercontent.com"],
  },
};

export default nextConfig;
