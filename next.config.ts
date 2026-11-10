import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Every page is a file. There is no server: the dataset is baked into the
  // bundle at build time by scripts/build-dataset.mjs, so nothing needs to run
  // to answer a request, and the site goes back to being a Render Static Site.
  output: "export",

  // Replaces @emotion/babel-plugin, which this project never ran under Vite.
  // Server-rendered Emotion needs stable class names, and this also makes
  // component selectors safe — see the Emotion note in CLAUDE.md.
  compiler: { emotion: true },
};

export default nextConfig;
