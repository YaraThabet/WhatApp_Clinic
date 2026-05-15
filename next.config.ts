import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // On some Windows setups Turbopack can't validate TLS chain when fetching Google Fonts.
    // Using system certs fixes `next/font` fetch during `next build`.
    turbopackUseSystemTlsCerts: true,
  },
};

export default nextConfig;
