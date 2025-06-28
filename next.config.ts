import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@lib": require("path").resolve(__dirname, "lib"),
      "@components": require("path").resolve(__dirname, "components"),
      // Add more aliases if needed
    };
    return config;
  },
};

export default nextConfig;
