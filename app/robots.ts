import type { MetadataRoute } from "next";
import { SITE } from "../src/config/site";

// Static export writes this to a file at build time rather than serving it
// from a route handler; Next wants that said out loud.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE}/sitemap.xml`,
  };
}
