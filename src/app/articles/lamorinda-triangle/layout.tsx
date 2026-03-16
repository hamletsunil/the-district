import type { Metadata } from "next";

const BASE_URL = "https://district.myhamlet.com";
const SLUG = "lamorinda-triangle";
const URL = `${BASE_URL}/articles/${SLUG}`;

export const metadata: Metadata = {
  title: "Three Cities, One Fire Zone — The District",
  description:
    "What 1,700+ government meetings reveal about Lafayette, Orinda, and Moraga — three neighboring cities that share a school system, a water utility, and a set of hills, but govern completely differently.",
  keywords: [
    "Lamorinda",
    "Lafayette",
    "Orinda",
    "Moraga",
    "Contra Costa County",
    "city council",
    "local government",
    "government meetings",
    "transcript analysis",
    "housing development",
    "wildfire risk",
    "fire safety",
    "The District",
    "Hamlet",
  ],
  alternates: {
    canonical: URL,
  },
  openGraph: {
    title: "Three Cities, One Fire Zone",
    description:
      "1,700+ government meetings. Three cities. The same hills, the same fires, the same state mandates — and three completely different approaches to governance.",
    type: "article",
    publishedTime: "2026-03-15T00:00:00.000Z",
    modifiedTime: "2026-03-15T00:00:00.000Z",
    authors: ["The District"],
    siteName: "The District",
    url: URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Three Cities, One Fire Zone",
    description:
      "What 1,700+ government meetings reveal about how Lafayette, Orinda, and Moraga really govern.",
  },
};

export default function LamorindaTriangleLayout({
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
            headline: "Three Cities, One Fire Zone",
            description:
              "What 1,700+ government meetings reveal about Lafayette, Orinda, and Moraga — three neighboring cities with three completely different approaches to governance.",
            datePublished: "2026-03-15T00:00:00.000Z",
            dateModified: "2026-03-15T00:00:00.000Z",
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
