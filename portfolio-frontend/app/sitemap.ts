import type { MetadataRoute } from "next";
import { SITE_URL } from "./seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date("2026-10-08T00:00:00.000Z"),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/resume`,
      lastModified: new Date("2026-10-08T00:00:00.000Z"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
