import type { Metadata } from "next";

const BASE_URL = "https://district.myhamlet.com";
const SLUG = "charlotte-the-pause";
const URL = `${BASE_URL}/articles/${SLUG}`;

export const metadata: Metadata = {
  title: "Eleven Theories of a Highway — The District",
  description:
    "On February 23, 2026, eight of Charlotte's eleven city council members took the floor on the I-77 South Express Lanes — a state project the city does not control. By April, ten of eleven supported pausing. The lone Republican, who had cast Charlotte's deciding regional vote himself in October 2024, argued against pausing.",
  keywords: [
    "Charlotte",
    "Charlotte City Council",
    "I-77",
    "I-77 South Express Lanes",
    "toll lanes",
    "NCDOT",
    "CRTPO",
    "Cintra",
    "Mecklenburg County",
    "Vi Lyles",
    "James Mitchell",
    "Dante Anderson",
    "Malcolm Graham",
    "Joi Mayo",
    "Renee Johnson",
    "JD Mazuera Arias",
    "Kimberly Owens",
    "Ed Driggs",
    "Dimple Ajmera",
    "LaWana Mayfield",
    "Victoria Watlington",
    "Black Political Caucus",
    "Sustain Charlotte",
    "Wilmore",
    "McCrorey Heights",
    "Brookhill",
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
      "How eight Charlotte council members and a mayor took a state highway proposal apart on a Monday night in February — and how the lone Republican turned out to have cast the deciding regional vote himself.",
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
      "Eight council members. One mayor. One state highway. One Republican who cast the deciding vote himself. Charlotte, February 23, 2026.",
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
              "On February 23, 2026, eight Charlotte City Council members and Mayor Vi Lyles articulated incompatible positions on the I-77 South Express Lanes project — a $3.2-to-$4 billion NCDOT highway expansion through historically Black west-side neighborhoods. The lone Republican argued against pausing the project, while the same member had cast Charlotte's deciding CRTPO vote backing it on October 16, 2024. The meeting deferred to the March 2 council retreat; a follow-on resolution is on the May 11 agenda.",
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
