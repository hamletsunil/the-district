import type { Metadata } from "next";
import { Inter, Fraunces, Literata } from "next/font/google";
import { Header, Footer } from "@/components/layout";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
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
  openGraph: {
    title: "The District",
    description:
      "Visual journalism about what happens in 3,000+ city halls across America.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${fraunces.variable} ${literata.variable}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
