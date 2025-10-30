import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;

