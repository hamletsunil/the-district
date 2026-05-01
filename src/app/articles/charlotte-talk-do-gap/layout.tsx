import type { Metadata } from "next";

const BASE_URL = "https://district.myhamlet.com";
const SLUG = "charlotte-talk-do-gap";
const URL = `${BASE_URL}/articles/${SLUG}`;

export const metadata: Metadata = {
  title: "Why Charlotte Said No Just Once — The District",
  description:
    "Forty Charlotte City Council meetings, 12,370 attributed utterances, and 879 rezoning petitions later: one was denied. What the gap between the council's words and its votes reveals about how Charlotte actually grows.",
  keywords: [
    "Charlotte",
    "Charlotte City Council",
    "Mecklenburg County",
    "rezoning",
    "Unified Development Ordinance",
    "UDO",
    "affordable housing",
    "Vi Lyles",
    "Dante Anderson",
    "JD Mazuera Arias",
    "Dimple Ajmera",
    "I-77 toll lanes",
    "transcript analysis",
    "local government",
    "The District",
    "Hamlet",
  ],
  alternates: {
    canonical: URL,
  },
  openGraph: {
    title: "Why Charlotte Said No Just Once",
    description:
      "Forty meetings. 12,370 utterances. 879 rezoning petitions. One denial. The gap between what Charlotte's council says and what it approves.",
    type: "article",
    publishedTime: "2026-05-01T00:00:00.000Z",
    modifiedTime: "2026-05-01T00:00:00.000Z",
    authors: ["The District"],
    siteName: "The District",
    url: URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Why Charlotte Said No Just Once",
    description:
      "What 40 council meetings and 879 rezoning petitions reveal about how Charlotte really grows.",
  },
};

export default function CharlotteTalkDoGapLayout({
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
            headline: "Why Charlotte Said No Just Once",
            description:
              "Forty Charlotte City Council meetings, 12,370 attributed utterances, and 879 rezoning petitions later — one denial. What the gap between speech and vote reveals about how the city grows.",
            datePublished: "2026-05-01T00:00:00.000Z",
            dateModified: "2026-05-01T00:00:00.000Z",
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
            about: {
              "@type": "City",
              name: "Charlotte",
              addressRegion: "NC",
              addressCountry: "US",
            },
          }),
        }}
      />
      {children}
    </>
  );
}
