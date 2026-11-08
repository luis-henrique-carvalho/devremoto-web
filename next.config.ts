import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      {
        source: "/blog",
        destination: "/artigos",
        permanent: true,
      },
      {
        source: "/blog/:slug*",
        destination: "/artigos/:slug*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
