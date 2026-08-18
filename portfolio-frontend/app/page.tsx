import type { Metadata } from "next";
import dynamic from "next/dynamic";
import About from "@/components/About";
import ConsultingStrengths from "@/components/ConsultingStrengths";
import SkillsSnapshot from "@/components/SkillsSnapshot";
import Projects from "@/components/Projects";
import ServicesSection from "@/components/ServicesSection";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import { SEO_COPY } from "./seo";

const ROICalculator = dynamic(() => import("@/components/ROICalculator"), {
  loading: () => (
    <section id="roi" className="relative overflow-hidden border-y border-brand-border bg-brand-bg py-20 sm:py-24 lg:py-28" aria-label="Loading ROI calculator">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-center text-center">
          <div className="mb-3 h-4 w-28 rounded-full skeleton-shimmer" />
          <div className="mb-4 h-10 w-2/3 max-w-md rounded-lg skeleton-shimmer" />
          <div className="h-5 w-5/6 max-w-lg rounded-md skeleton-shimmer" />
        </div>
        <div className="card grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.2fr,0.8fr] lg:gap-8">
          <div className="space-y-8">
            <div className="h-3 w-32 rounded skeleton-shimmer" />
            <div className="h-2 w-full rounded skeleton-shimmer" />
            <div className="h-2 w-full rounded skeleton-shimmer" />
            <div className="h-20 w-full rounded-xl skeleton-shimmer" />
          </div>
          <div className="min-h-[320px] rounded-2xl border border-brand-border bg-brand-surface/60 p-6">
            <div className="h-12 w-48 rounded-lg skeleton-shimmer" />
          </div>
        </div>
      </div>
    </section>
  ),
});

const ContactForm = dynamic(() => import("@/components/ContactForm"), {
  loading: () => (
    <section id="contact" className="relative overflow-hidden bg-brand-bg py-20 sm:py-24 lg:py-28" aria-label="Loading contact form">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-center text-center">
          <div className="mb-3 h-4 w-24 rounded-full skeleton-shimmer" />
          <div className="mb-4 h-10 w-1/2 max-w-sm rounded-lg skeleton-shimmer" />
          <div className="h-5 w-4/5 max-w-md rounded-md skeleton-shimmer" />
        </div>
        <div className="grid gap-8 lg:grid-cols-[1.35fr,0.65fr] lg:gap-12">
          <div className="card min-h-[360px] p-6 sm:p-8 skeleton-shimmer" />
          <div className="card min-h-[260px] p-6 sm:p-8 skeleton-shimmer" />
        </div>
      </div>
    </section>
  ),
});

export const metadata: Metadata = {
  title: SEO_COPY.title,
  description: SEO_COPY.description,
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <div className="bg-brand-bg text-brand-charcoal" id="top">
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Projects />
        <ExperienceTimeline />
        <SkillsSnapshot />
        <About />
        <ConsultingStrengths />
        <ServicesSection />
        <ROICalculator />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
