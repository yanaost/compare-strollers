import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Replaces @emotion/babel-plugin, which this project never ran under Vite.
  // Server-rendered Emotion needs stable class names, and this also makes
  // component selectors safe — see the Emotion note in CLAUDE.md.
  compiler: { emotion: true },

  env: {
    // Production sets VITE_BASE_URL on the deploy host and the old Vite build
    // baked it in. Next only inlines NEXT_PUBLIC_* into client code, so bridge
    // the old name here rather than requiring a host-side rename at cutover.
    NEXT_PUBLIC_API_BASE_URL:
      process.env.NEXT_PUBLIC_API_BASE_URL ?? process.env.VITE_BASE_URL ?? "",
  },
};

export default nextConfig;
