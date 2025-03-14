import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Disable linting during production build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
