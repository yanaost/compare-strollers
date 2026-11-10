import type { MetadataRoute } from "next";

const SITE = "https://comparestrollers.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE}/sitemap.xml`,
  };
}
