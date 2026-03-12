import type { Metadata } from "next";

const BASE_URL = "https://district.myhamlet.com";
const SLUG = "austin-boom";
const URL = `${BASE_URL}/articles/${SLUG}`;

export const metadata: Metadata = {
  title: "Five Thousand Hours: Inside Austin\u2019s 2,588 Government Meetings \u2014 The District",
  description:
    "We transcribed 2,588 Austin government meetings \u2014 47.5 million words across 93 official bodies. The most passionate meetings end in the most lopsided votes.",
  keywords: [
    "Austin",
    "Austin government",
    "municipal meetings",
    "city council",
    "AI analysis",
    "public testimony",
    "Austin housing",
    "zoning",
    "NLP",
    "The District",
    "Hamlet",
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: "Five Thousand Hours",
    description:
      "2,588 meetings. 93 government bodies. 5,108 hours. The most passionate meetings end in the most lopsided votes.",
    type: "article",
    publishedTime: "2026-03-11T12:00:00.000Z",
    modifiedTime: "2026-03-11T12:00:00.000Z",
    authors: ["The District"],
    siteName: "The District",
    url: URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Five Thousand Hours",
    description:
      "We transcribed 2,588 Austin government meetings. The loudest debates produce the most lopsided votes.",
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
              "Five Thousand Hours: Inside Austin\u2019s 2,588 Government Meetings",
            description:
              "We transcribed 2,588 Austin government meetings \u2014 47.5 million words across 93 official bodies. The most passionate meetings end in the most lopsided votes.",
            datePublished: "2026-03-11T12:00:00.000Z",
            dateModified: "2026-03-11T12:00:00.000Z",
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
