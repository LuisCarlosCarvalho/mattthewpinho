import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.myportfolio.com",
      },
      {
        protocol: "https",
        hostname: "i.imgur.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "www.record.pt",
      },
      {
        protocol: "https",
        hostname: "www.abola.pt",
      },
      {
        protocol: "http",
        hostname: "s.glbimg.com",
      },
      {
        protocol: "https",
        hostname: "s.glbimg.com",
      },
      {
        protocol: "https",
        hostname: "www.motorsport.com",
      },
      {
        protocol: "https",
        hostname: "www.nba.com",
      },
      {
        protocol: "https",
        hostname: "www.skysports.com",
      },
      {
        protocol: "https",
        hostname: "www.pokernews.com",
      },
      {
        protocol: "https",
        hostname: "swimswam.com",
      },
    ],
  },
};

export default nextConfig;
