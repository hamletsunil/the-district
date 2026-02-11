import type { Metadata } from "next";
import { Inter, Literata } from "next/font/google";
import { Header, Footer } from "@/components/layout";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const literata = Literata({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The District",
  description:
    "Visual journalism about what happens in 3,000+ city halls across America. A publication by Hamlet.",
  metadataBase: new URL("https://district.myhamlet.com"),
  alternates: {
    canonical: "https://district.myhamlet.com",
  },
  openGraph: {
    title: "The District",
    description:
      "Visual journalism about what happens in 3,000+ city halls across America.",
    type: "website",
    siteName: "The District",
    url: "https://district.myhamlet.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "The District",
    description:
      "Visual journalism about what happens in 3,000+ city halls across America.",
  },
  icons: {
    icon: "/icon",
    shortcut: "/icon",
    apple: "/apple-icon",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${literata.variable}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
