import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How Local Government Works — The District",
  description:
    "The most comprehensive guide to American local government ever published. 90,837 jurisdictions, $2.3 trillion in annual spending, half a million elected officials — explained through data, case law, and the meetings where decisions actually happen.",
  keywords: [
    "local government",
    "city government",
    "how local government works",
    "municipal government",
    "city council",
    "county government",
    "special districts",
    "zoning",
    "property taxes",
    "city manager",
    "mayor",
    "public meetings",
    "local elections",
    "voter turnout",
    "home rule",
    "Dillon's Rule",
    "municipal finance",
    "infrastructure",
    "The District",
    "Hamlet",
  ],
  alternates: {
    canonical: "https://district.myhamlet.com/articles/how-local-government-works",
  },
  openGraph: {
    title: "How Local Government Works",
    description:
      "90,837 jurisdictions. $2.3 trillion. Half a million officials. The government closest to your daily life — explained.",
    type: "article",
    publishedTime: "2026-03-31T00:00:00Z",
    modifiedTime: "2026-03-31T00:00:00Z",
    authors: ["The District"],
    url: "https://district.myhamlet.com/articles/how-local-government-works",
    images: [
      {
        url: "https://district.myhamlet.com/articles/how-local-government-works/opengraph-image",
        width: 1200,
        height: 630,
        alt: "How Local Government Works — The District",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "How Local Government Works",
    description:
      "The most comprehensive guide to American local government. 14 chapters on everything from zoning to pensions.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function HowLocalGovernmentWorksLayout({
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
            "@type": "Article",
            headline: "How Local Government Works",
            description:
              "The most comprehensive guide to American local government ever published. 90,837 jurisdictions, $2.3 trillion in annual spending, half a million elected officials.",
            author: {
              "@type": "Organization",
              name: "The District",
              url: "https://district.myhamlet.com",
            },
            publisher: {
              "@type": "Organization",
              name: "Hamlet",
              url: "https://www.myhamlet.com",
              logo: {
                "@type": "ImageObject",
                url: "https://district.myhamlet.com/hamlet-logo.png",
              },
            },
            datePublished: "2026-03-31",
            dateModified: "2026-03-31",
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": "https://district.myhamlet.com/articles/how-local-government-works",
            },
            image: "https://district.myhamlet.com/articles/how-local-government-works/opengraph-image",
            articleSection: "Local Government",
            keywords: "local government, city council, municipal government, zoning, property taxes",
          }),
        }}
      />
      {children}
    </>
  );
}
