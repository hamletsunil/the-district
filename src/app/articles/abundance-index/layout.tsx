import type { Metadata } from "next";

const BASE_URL = "https://district.myhamlet.com";
const SLUG = "abundance-index";
const URL = `${BASE_URL}/articles/${SLUG}`;

export const metadata: Metadata = {
  title: "The Abundance Index — The District",
  description:
    "Which cities welcome growth and which fight it? 84 cities ranked from Temple, TX (most YIMBY) to Fairfax, VA (most NIMBY) — mapped by their openness to development.",
  keywords: [
    "YIMBY",
    "NIMBY",
    "housing development",
    "abundance index",
    "city rankings",
    "zoning",
    "pro-development",
    "housing policy",
    "local government",
    "The District",
    "Hamlet",
  ],
  alternates: {
    canonical: URL,
  },
  openGraph: {
    title: "The Abundance Index",
    description:
      "84 cities ranked YIMBY to NIMBY. Mapping America's most welcoming — and resistant — cities for development.",
    type: "article",
    publishedTime: "2026-01-31T00:00:00.000Z",
    modifiedTime: "2026-02-04T00:00:00.000Z",
    authors: ["The District"],
    siteName: "The District",
    url: URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "The Abundance Index",
    description:
      "84 cities ranked YIMBY to NIMBY. Which cities welcome growth and which fight it?",
  },
};

export default function AbundanceIndexLayout({
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
            headline: "The Abundance Index",
            description:
              "84 cities ranked by their openness to development — from Temple, TX (most YIMBY) to Fairfax, VA (most NIMBY).",
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
