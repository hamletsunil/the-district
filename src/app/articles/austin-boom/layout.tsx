import type { Metadata } from "next";

const BASE_URL = "https://district.myhamlet.com";
const SLUG = "austin-boom";
const URL = `${BASE_URL}/articles/${SLUG}`;

export const metadata: Metadata = {
  title: "The Boom That Broke: Austin\u2019s Construction Story in 315,322 Permits \u2014 The District",
  description:
    "315,322 permits. 71,105 in one year. Then a 23% crash. Austin\u2019s construction data tells a story the city\u2019s boosters would rather you didn\u2019t see.",
  keywords: [
    "Austin",
    "Austin construction",
    "building permits",
    "Austin growth",
    "Texas economy",
    "Austin housing",
    "construction boom",
    "permit data",
    "The District",
    "Hamlet",
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: "The Boom That Broke",
    description:
      "315,322 permits. 9,455 government meetings. Austin bet everything on growth.",
    type: "article",
    publishedTime: "2026-03-03T12:00:00.000Z",
    modifiedTime: "2026-03-03T12:00:00.000Z",
    authors: ["The District"],
    siteName: "The District",
    url: URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "The Boom That Broke",
    description:
      "315,322 permits. 71,105 in one year. Then a 23% crash. Austin\u2019s permit data tells a different story.",
  },
};

export default function AustinBoomLayout({
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
            headline:
              "The Boom That Broke: Austin\u2019s Construction Story in 315,322 Permits",
            description:
              "315,322 permits. 71,105 in one year. Then a 23% crash. Austin\u2019s construction data tells a story the city\u2019s boosters would rather you didn\u2019t see.",
            datePublished: "2026-03-03T12:00:00.000Z",
            dateModified: "2026-03-03T12:00:00.000Z",
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
