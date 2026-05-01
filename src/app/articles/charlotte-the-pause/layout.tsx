import type { Metadata } from "next";

const BASE_URL = "https://district.myhamlet.com";
const SLUG = "charlotte-the-pause";
const URL = `${BASE_URL}/articles/${SLUG}`;

export const metadata: Metadata = {
  title: "Eleven Theories of a Highway — The District",
  description:
    "On February 23, 2026, nine of Charlotte's eleven city council members took the I-77 South Express Lanes apart nine different ways. A 3-hour deliberation, fully indexed and attributed, with the May 11 vote ahead.",
  keywords: [
    "Charlotte",
    "Charlotte City Council",
    "I-77",
    "I-77 South Express Lanes",
    "toll lanes",
    "NCDOT",
    "CRTPO",
    "Mecklenburg County",
    "Vi Lyles",
    "JD Mazuera Arias",
    "Dimple Ajmera",
    "Ed Driggs",
    "Malcolm Graham",
    "Renee Johnson",
    "Kimberly Owens",
    "Dante Anderson",
    "transcript analysis",
    "local government",
    "The District",
    "Hamlet",
  ],
  alternates: {
    canonical: URL,
  },
  openGraph: {
    title: "Eleven Theories of a Highway",
    description:
      "How Charlotte City Council took a $3.2 billion state highway proposal apart, member by member, on a single Monday night in February 2026.",
    type: "article",
    publishedTime: "2026-05-01T00:00:00.000Z",
    modifiedTime: "2026-05-01T00:00:00.000Z",
    authors: ["The District"],
    siteName: "The District",
    url: URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Eleven Theories of a Highway",
    description:
      "Nine council members. One project. Nine ways of pulling on a lever. Charlotte, February 23, 2026.",
  },
};

export default function CharlotteThePauseLayout({
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
            headline: "Eleven Theories of a Highway",
            description:
              "On February 23, 2026, nine of eleven Charlotte City Council members each articulated a different theory of how to influence the I-77 South Express Lanes project. The night ended with a 60-day pause request, a deferral to the council retreat, and a fragmented record of where local power actually lies.",
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
