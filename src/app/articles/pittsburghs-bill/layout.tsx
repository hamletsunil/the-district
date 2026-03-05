import type { Metadata } from "next";

const BASE_URL = "https://district.myhamlet.com";
const SLUG = "pittsburghs-bill";
const URL = `${BASE_URL}/articles/${SLUG}`;

export const metadata: Metadata = {
  title: "The Bill Comes Due \u2014 The District",
  description:
    "Pittsburgh\u2019s city council agrees on 97% of everything. The 3% they fight over \u2014 property taxes, inclusionary housing, who pays for a renaissance \u2014 reveals where the city\u2019s future is actually being decided.",
  keywords: [
    "Pittsburgh",
    "city council",
    "voting data",
    "inclusionary housing",
    "property tax",
    "Legistar",
    "Pennsylvania",
    "The District",
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: "The Bill Comes Due",
    description:
      "108,394 votes. 25 years. One city\u2019s reckoning with who pays for its renaissance.",
    type: "article",
    publishedTime: "2026-03-04T00:00:00.000Z",
    modifiedTime: "2026-03-04T00:00:00.000Z",
    authors: ["The District"],
    siteName: "The District",
    url: URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "The Bill Comes Due",
    description:
      "108,394 votes. 25 years. Pittsburgh\u2019s council agrees on 97% of everything \u2014 and fights hardest over who pays.",
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
            headline: "The Bill Comes Due",
            description:
              "Pittsburgh\u2019s city council agrees on 97% of everything. The fights that do happen reveal where the city\u2019s future is being decided.",
            datePublished: "2026-03-04T00:00:00.000Z",
            dateModified: "2026-03-04T00:00:00.000Z",
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
