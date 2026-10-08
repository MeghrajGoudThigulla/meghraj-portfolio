import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  productionBrowserSourceMaps: false,
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
