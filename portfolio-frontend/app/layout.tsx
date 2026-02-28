import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import MetricsTracker from "@/components/MetricsTracker";
import SkipLink from "@/components/SkipLink";
import { SEO_COPY } from "./seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: SEO_COPY.title,
  description: SEO_COPY.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} bg-brand-bg text-brand-charcoal antialiased font-sans`}
      >
        <SkipLink />
        <MetricsTracker />
        {children}
      </body>
    </html>
  );
}
