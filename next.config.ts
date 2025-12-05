import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  allowedDevOrigins: ['http://192.168.1.5:3000', 'paragraphic-superlogically-oakley.ngrok-free.dev']
};

export default nextConfig;
