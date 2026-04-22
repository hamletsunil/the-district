import type { Metadata } from "next";
import Script from "next/script";

const BASE_URL = "https://district.myhamlet.com";
const SLUG = "marshall-five-years";
const URL = `${BASE_URL}/articles/${SLUG}`;

export const metadata: Metadata = {
  title:
    "Five Years After Marshall: Four Years of Council Testimony on a Rebuild the Insurance Market Re-Drew \u2014 The District",
  description:
    "Five years after the Marshall Fire destroyed more than 1,000 homes, we read every post-fire council meeting we could reach in Superior, Lafayette, Broomfield, and Erie. The insurance market didn\u2019t collapse. It re-drew the map.",
  keywords: [
    "Marshall Fire",
    "Boulder County",
    "Superior Colorado",
    "Louisville Colorado",
    "Lafayette Colorado",
    "Broomfield",
    "Erie Colorado",
    "wildfire",
    "Xcel Marshall Fire settlement",
    "FAIR Plan",
    "HB 23-1288",
    "SB 23-166",
    "Colorado Wildfire Resiliency Code",
    "rebuild",
    "grassland fire",
    "Colorado Division of Insurance",
    "Michael Conway",
    "Jennifer Balch",
    "The District",
    "Hamlet",
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: "Five Years After Marshall",
    description:
      "Four years of council testimony across the Marshall Fire burn zone. The rebuild, the Xcel settlement, and the insurance re-mapping that followed.",
    type: "article",
    publishedTime: "2026-11-01T12:00:00.000Z",
    modifiedTime: "2026-11-01T12:00:00.000Z",
    authors: ["The District"],
    siteName: "The District",
    url: URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Five Years After Marshall",
    description:
      "Four years of council testimony across the Marshall Fire burn zone. The insurance market didn\u2019t collapse; it re-drew the map.",
  },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  headline:
    "Five Years After Marshall: Four Years of Council Testimony on a Rebuild the Insurance Market Re-Drew",
  description:
    "Five years after the Marshall Fire, we read every post-fire council meeting we could reach in Superior, Lafayette, Broomfield, and Erie.",
  datePublished: "2026-11-01T12:00:00.000Z",
  dateModified: "2026-11-01T12:00:00.000Z",
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
};

export default function MarshallFiveYearsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="marshall-five-years-jsonld"
        type="application/ld+json"
        strategy="beforeInteractive"
      >
        {JSON.stringify(JSON_LD)}
      </Script>
      {children}
    </>
  );
}
