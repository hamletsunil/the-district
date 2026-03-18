import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Most Deliberative Square Mile in America — The District",
  description:
    "We transcribed 461 Piedmont government meetings — 9.3 million words across five governing bodies. What we found is a community that governs at an intensity few cities can sustain.",
  keywords: [
    "Piedmont",
    "California",
    "city council",
    "school board",
    "planning commission",
    "government meetings",
    "local government",
    "civic engagement",
    "deliberation",
    "Oakland",
    "enclave",
  ],
  alternates: {
    canonical: "https://district.myhamlet.com/articles/piedmonts-deliberation",
  },
  openGraph: {
    title: "The Most Deliberative Square Mile in America",
    description:
      "We transcribed 461 Piedmont government meetings — 9.3 million words across five governing bodies.",
    type: "article",
    publishedTime: "2026-03-17T00:00:00Z",
    modifiedTime: "2026-03-17T00:00:00Z",
    authors: ["Sunil Rajaraman"],
    images: [
      {
        url: "https://district.myhamlet.com/articles/piedmonts-deliberation/opengraph-image",
        width: 1200,
        height: 630,
        alt: "The Most Deliberative Square Mile in America — Piedmont, CA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Most Deliberative Square Mile in America",
    description:
      "461 meetings. 9.3 million words. Five governing bodies. One tiny city surrounded by Oakland.",
  },
};

export default function PiedmontLayout({
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
              "The Most Deliberative Square Mile in America",
            description:
              "We transcribed 461 Piedmont government meetings — 9.3 million words across five governing bodies.",
            author: {
              "@type": "Person",
              name: "Sunil Rajaraman",
              url: "https://www.linkedin.com/in/sunilrajaraman/",
            },
            publisher: {
              "@type": "Organization",
              name: "The District by Hamlet",
              url: "https://district.myhamlet.com",
            },
            datePublished: "2026-03-17",
            dateModified: "2026-03-17",
            mainEntityOfPage:
              "https://district.myhamlet.com/articles/piedmonts-deliberation",
            image:
              "https://district.myhamlet.com/articles/piedmonts-deliberation/opengraph-image",
          }),
        }}
      />
      {children}
    </>
  );
}
