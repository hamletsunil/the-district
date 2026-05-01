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
      url: `${baseUrl}/articles/marshall-five-years`,
      lastModified: new Date("2026-04-28"),
      changeFrequency: "monthly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/articles/pittsburghs-bill`,
      lastModified: new Date("2026-03-04"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/articles/austin-boom`,
      lastModified: new Date("2026-03-03"),
      changeFrequency: "monthly",
      priority: 0.9,
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
    {
      url: `${baseUrl}/articles/piedmonts-deliberation`,
      lastModified: new Date("2026-03-18"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/articles/lamorinda-triangle`,
      lastModified: new Date("2026-03-20"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/articles/charlotte-the-pause`,
      lastModified: new Date("2026-05-01"),
      changeFrequency: "monthly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/articles/how-local-government-works`,
      lastModified: new Date("2026-03-31"),
      changeFrequency: "monthly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/articles/how-local-government-works/why-it-matters`,
      lastModified: new Date("2026-03-31"),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/articles/how-local-government-works/taxonomy`,
      lastModified: new Date("2026-03-31"),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/articles/how-local-government-works/forms`,
      lastModified: new Date("2026-03-31"),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/articles/how-local-government-works/roles`,
      lastModified: new Date("2026-03-31"),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/articles/how-local-government-works/lawmaking`,
      lastModified: new Date("2026-03-31"),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/articles/how-local-government-works/the-meeting`,
      lastModified: new Date("2026-03-31"),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/articles/how-local-government-works/land-use`,
      lastModified: new Date("2026-03-31"),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/articles/how-local-government-works/money`,
      lastModified: new Date("2026-03-31"),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/articles/how-local-government-works/elections`,
      lastModified: new Date("2026-03-31"),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/articles/how-local-government-works/engagement`,
      lastModified: new Date("2026-03-31"),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/articles/how-local-government-works/legal-framework`,
      lastModified: new Date("2026-03-31"),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/articles/how-local-government-works/county-government`,
      lastModified: new Date("2026-03-31"),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/articles/how-local-government-works/infrastructure`,
      lastModified: new Date("2026-03-31"),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/articles/how-local-government-works/challenges`,
      lastModified: new Date("2026-03-31"),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/articles/how-local-government-works/glossary`,
      lastModified: new Date("2026-03-31"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
