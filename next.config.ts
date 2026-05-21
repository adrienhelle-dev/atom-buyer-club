import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // atombuyerclub.fr (sans 's') → www.atombuyersclub.fr
      {
        source: "/:path*",
        has: [{ type: "host", value: "atombuyerclub.fr" }],
        destination: "https://www.atombuyersclub.fr/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.atombuyerclub.fr" }],
        destination: "https://www.atombuyersclub.fr/:path*",
        permanent: true,
      },
      // atombuyersclub.fr (sans www) → www
      {
        source: "/:path*",
        has: [{ type: "host", value: "atombuyersclub.fr" }],
        destination: "https://www.atombuyersclub.fr/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
