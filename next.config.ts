import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
  },
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/ventures", destination: "/entrepreneurship", permanent: true },
      { source: "/ventures/:slug", destination: "/entrepreneurship/:slug", permanent: true },
      { source: "/phd", destination: "/research/phd", permanent: true },
    ];
  },
};

export default nextConfig;
