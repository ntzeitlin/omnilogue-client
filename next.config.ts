import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  // webpackDevMiddleware: config => {
  //   // Disable HMR
  //   config.watchOptions = {
  //     ignored: ['**/*'],
  //     poll: false,
  //   }
  //   return config
  // }
  devIndicators: false
};

export default nextConfig;
