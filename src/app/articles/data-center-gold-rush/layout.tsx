import type { Metadata } from "next";

const BASE_URL = "https://district.myhamlet.com";
const SLUG = "data-center-gold-rush";
const URL = `${BASE_URL}/articles/${SLUG}`;

export const metadata: Metadata = {
  title: "The Data Center Gold Rush — The District",
  description:
    "156 cities. 5,007 transcript mentions. Inside the local battles over where America builds its AI infrastructure — and who gets to decide.",
  keywords: [
    "data centers",
    "AI infrastructure",
    "local government",
    "zoning",
    "power grid",
    "water consumption",
    "NLP analysis",
    "city council meetings",
    "NIMBY",
    "The District",
    "Hamlet",
  ],
  alternates: {
    canonical: URL,
  },
  openGraph: {
    title: "The Data Center Gold Rush",
    description:
      "156 cities analyzed. 5,007 transcript mentions. Inside the local battles that will determine where America builds its AI infrastructure.",
    type: "article",
    publishedTime: "2026-01-30T00:00:00.000Z",
    modifiedTime: "2026-02-04T00:00:00.000Z",
    authors: ["The District"],
    siteName: "The District",
    url: URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "The Data Center Gold Rush",
    description:
      "156 cities. 5,007 transcript mentions. Where will America's AI infrastructure live — and who gets to decide?",
  },
};

export default function DataCenterLayout({
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
            headline: "The Data Center Gold Rush",
            description:
              "156 cities analyzed for data center sentiment. Inside the local battles over where America builds its AI infrastructure.",
            datePublished: "2026-01-30T00:00:00.000Z",
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
