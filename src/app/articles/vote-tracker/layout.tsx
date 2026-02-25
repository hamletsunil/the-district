import type { Metadata } from "next";

const BASE_URL = "https://district.myhamlet.com";
const SLUG = "vote-tracker";
const URL = `${BASE_URL}/articles/${SLUG}`;

export const metadata: Metadata = {
  title: "The Vote Tracker — The District",
  description:
    "25,219 votes across 1,524 local officials analyzed. Newark agrees on everything. Princeton fights about everything. How your city officials actually vote.",
  keywords: [
    "voting records",
    "local officials",
    "city council votes",
    "Newark",
    "Princeton",
    "democracy",
    "roll call votes",
    "local government",
    "transparency",
    "The District",
    "Hamlet",
  ],
  alternates: {
    canonical: URL,
  },
  openGraph: {
    title: "The Vote Tracker",
    description:
      "1,524 local officials. 25,219 recorded votes. Newark agrees on everything. Princeton fights about everything. Why?",
    type: "article",
    publishedTime: "2026-01-31T00:00:00.000Z",
    modifiedTime: "2026-02-04T00:00:00.000Z",
    authors: ["The District"],
    siteName: "The District",
    url: URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "The Vote Tracker",
    description:
      "25,219 votes. 1,524 officials. Newark agrees on everything. Princeton fights about everything. Why?",
  },
};

export default function VoteTrackerLayout({
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
            headline: "The Vote Tracker",
            description:
              "25,219 votes across 1,524 local officials. Newark agrees on everything. Princeton fights about everything. Why?",
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
