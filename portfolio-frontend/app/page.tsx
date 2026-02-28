import type { Metadata } from "next";
import dynamic from "next/dynamic";
import About from "@/components/About";
import CaseStudies from "@/components/CaseStudies";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import SkillsSnapshot from "@/components/SkillsSnapshot";
import { SEO_COPY } from "./seo";

const ROICalculator = dynamic(() => import("@/components/ROICalculator"), {
  loading: () => (
    <section
      id="roi"
      className="relative overflow-hidden border-y border-brand-charcoal/10 bg-gradient-to-b from-white to-sky-50 py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="card grid min-h-[300px] place-items-center p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
            Loading ROI calculator...
          </p>
        </div>
      </div>
    </section>
  ),
});

export const metadata: Metadata = {
  title: SEO_COPY.title,
  description: SEO_COPY.description,
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <div className="bg-brand-bg text-brand-charcoal" id="top">
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <About />
        <SkillsSnapshot />
        <CaseStudies />
        <ROICalculator />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
