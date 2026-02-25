import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://district.myhamlet.com";

  return [
    {
      url: baseUrl,
      lastModified: new Date("2026-02-10"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date("2026-02-05"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/articles/ann-arbor-divided`,
      lastModified: new Date("2026-02-25"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/articles/oaklands-future`,
      lastModified: new Date("2026-02-10"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/articles/data-center-gold-rush`,
      lastModified: new Date("2026-02-04"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/articles/abundance-index`,
      lastModified: new Date("2026-02-04"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/articles/temperature-check`,
      lastModified: new Date("2026-02-04"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/articles/vote-tracker`,
      lastModified: new Date("2026-02-04"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}
