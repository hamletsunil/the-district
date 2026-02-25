import type { Metadata } from "next";

const BASE_URL = "https://district.myhamlet.com";
const SLUG = "ann-arbor-divided";
const URL = `${BASE_URL}/articles/${SLUG}`;

export const metadata: Metadata = {
  title: "The City That Won\u2019t Agree \u2014 The District",
  description:
    "Ann Arbor\u2019s city council has the highest dissent rate in America \u2014 18.19% vs. the national average of 1.59%. Seventeen years of voting data across 142 cities reveal what happens when local democracy actually deliberates.",
  keywords: [
    "Ann Arbor",
    "city council",
    "voting data",
    "local government",
    "dissent",
    "Legistar",
    "Michigan",
    "The District",
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: "The City That Won\u2019t Agree",
    description:
      "142 cities. 8.1 million votes. One massive outlier. Ann Arbor\u2019s council fights more than any other in America.",
    type: "article",
    publishedTime: "2026-02-25T00:00:00.000Z",
    modifiedTime: "2026-02-25T00:00:00.000Z",
    authors: ["The District"],
    siteName: "The District",
    url: URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "The City That Won\u2019t Agree",
    description:
      "142 cities. 8.1M votes. Ann Arbor\u2019s council fights more than any other in America.",
  },
};

export default function ArticleLayout({
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
            headline: "The City That Won\u2019t Agree",
            description:
              "Ann Arbor\u2019s city council has the highest dissent rate in America. Seventeen years of data explain why.",
            datePublished: "2026-02-25T00:00:00.000Z",
            dateModified: "2026-02-25T00:00:00.000Z",
            author: {
              "@type": "Person",
              name: "Sunil Rajaraman",
              url: "https://www.linkedin.com/in/sunilrajaraman/",
            },
            publisher: {
              "@type": "Organization",
              name: "Hamlet",
              url: "https://www.myhamlet.com",
            },
            mainEntityOfPage: { "@type": "WebPage", "@id": URL },
            image: `${URL}/opengraph-image`,
          }),
        }}
      />
      {children}
    </>
  );
}
