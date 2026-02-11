import type { Metadata } from "next";

const BASE_URL = "https://district.myhamlet.com";
const SLUG = "temperature-check";
const URL = `${BASE_URL}/articles/${SLUG}`;

export const metadata: Metadata = {
  title: "The Temperature Check — The District",
  description:
    "438 cities measured for civic friction on a 0-100 scale. Southern cities average 97%+ contention rates — over 20 points higher than the Pacific Northwest.",
  keywords: [
    "civic friction",
    "contention",
    "local politics",
    "city councils",
    "public comments",
    "NLP analysis",
    "political polarization",
    "local government",
    "The District",
    "Hamlet",
  ],
  alternates: {
    canonical: URL,
  },
  openGraph: {
    title: "The Temperature Check",
    description:
      "438 cities. Millions of public comments. Where local politics runs hot and where consensus reigns.",
    type: "article",
    publishedTime: "2026-01-31T00:00:00.000Z",
    modifiedTime: "2026-02-04T00:00:00.000Z",
    authors: ["The District"],
    siteName: "The District",
    url: URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "The Temperature Check",
    description:
      "438 cities measured for civic friction. Where local debates run hot and where consensus reigns.",
  },
};

export default function TemperatureCheckLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            headline: "The Temperature Check",
            description:
              "438 cities measured for civic friction. Where local politics runs hot and where consensus reigns.",
            datePublished: "2026-01-31T00:00:00.000Z",
            dateModified: "2026-02-04T00:00:00.000Z",
            author: {
              "@type": "Organization",
              name: "The District",
              url: BASE_URL,
            },
            publisher: {
              "@type": "Organization",
              name: "Hamlet",
              url: "https://www.myhamlet.com",
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": URL,
            },
            image: `${URL}/opengraph-image`,
          }),
        }}
      />
      {children}
    </>
  );
}
