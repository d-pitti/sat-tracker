import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev', '192.168.30.129'],
  
  webpack: (config, { isServer }) => {
    // If the build is for the client side (not server)
    if (!isServer) {
      config.resolve.fallback = {
        fs: false, // tells webpack to ignore 'fs' imports on the client side
      };
    }
    return config;
  },
};

export default withFlowbiteReact(nextConfig);