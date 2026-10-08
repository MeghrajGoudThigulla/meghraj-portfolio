import type { Metadata } from "next";
import { resumeData } from "@/data/resume";

export const SITE_URL = "https://meghraj-portfolio.web.app";

export const SEO_COPY = {
  title: "Meghraj Goud | Senior AI Developer & Full Stack Engineer",
  description:
    "Senior AI Developer building practical AI/ML, backend, and full-stack systems with strong focus on architecture, R&D, and production delivery.",
} as const;

export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SEO_COPY.title,
    template: "%s | Meghraj Goud",
  },
  description: SEO_COPY.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SEO_COPY.title,
    description: SEO_COPY.description,
    url: SITE_URL,
    siteName: "Meghraj Goud Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Meghraj Goud - Senior AI Developer & Full Stack Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO_COPY.title,
    description: SEO_COPY.description,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: resumeData.name,
  jobTitle: resumeData.experience.title,
  url: `${SITE_URL}/`,
  sameAs: [
    "https://www.linkedin.com/in/meghraj-goud-thigulla",
    "https://github.com/MeghrajGoudThigulla",
    "https://linktr.ee/meghraj_goud_thigulla",
  ],
};
