import type { Metadata } from "next";

const BASE_URL = "https://district.myhamlet.com";
const SLUG = "oaklands-future";
const URL = `${BASE_URL}/articles/${SLUG}`;

export const metadata: Metadata = {
  title: "Five Futures for Oakland — The District",
  description:
    "An interactive simulation of Oakland's fiscal crisis. $94K median incomes, a $360M deficit, 342 missing police officers — five policy paths and a decade of trade-offs.",
  keywords: [
    "Oakland",
    "Oakland budget",
    "fiscal crisis",
    "city budget simulation",
    "crime policy",
    "interactive simulation",
    "local government",
    "Oakland police",
    "housing affordability",
    "The District",
    "Hamlet",
  ],
  alternates: {
    canonical: URL,
  },
  openGraph: {
    title: "Five Futures for Oakland",
    description:
      "Five policy paths. 113 census tracts. A decade of trade-offs. Press play and watch the future compound.",
    type: "article",
    publishedTime: "2026-02-10T00:00:00.000Z",
    modifiedTime: "2026-02-10T00:00:00.000Z",
    authors: ["The District"],
    siteName: "The District",
    url: URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Five Futures for Oakland",
    description:
      "An interactive simulation of Oakland's fiscal crisis — five policy paths and a decade of trade-offs.",
  },
};

export default function OaklandsFutureLayout({
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
            headline: "Five Futures for Oakland",
            description:
              "An interactive simulation of Oakland's fiscal crisis. Five policy paths, 113 census tracts, a decade of trade-offs.",
            datePublished: "2026-02-10T00:00:00.000Z",
            dateModified: "2026-02-10T00:00:00.000Z",
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
