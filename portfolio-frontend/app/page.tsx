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
    <section
      id="roi"
      className="relative overflow-hidden border-y border-brand-border bg-brand-bg py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading Skeleton */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="h-4 w-28 rounded-full skeleton-shimmer mb-3" />
          <div className="h-10 w-2/3 max-w-md rounded-lg skeleton-shimmer mb-4" />
          <div className="h-5 w-5/6 max-w-lg rounded-md skeleton-shimmer" />
        </div>

        {/* Calculator Body Skeleton */}
        <div className="card grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.2fr,0.8fr] lg:gap-8 border-brand-border/60 bg-brand-surface/40 backdrop-blur-md shadow-glass">
          {/* Controls Column */}
          <div className="space-y-8">
            <div className="space-y-3">
              <div className="h-3 w-32 rounded skeleton-shimmer" />
              <div className="flex flex-wrap gap-2.5">
                <div className="h-8 w-28 rounded-full skeleton-shimmer" />
                <div className="h-8 w-36 rounded-full skeleton-shimmer" />
                <div className="h-8 w-32 rounded-full skeleton-shimmer" />
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <div className="h-3.5 w-40 rounded skeleton-shimmer" />
                  <div className="h-4 w-8 rounded skeleton-shimmer" />
                </div>
                <div className="h-2 w-full rounded skeleton-shimmer" />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <div className="h-3.5 w-44 rounded skeleton-shimmer" />
                  <div className="h-4 w-8 rounded skeleton-shimmer" />
                </div>
                <div className="h-2 w-full rounded skeleton-shimmer" />
              </div>
            </div>

            <div className="h-20 w-full rounded-xl skeleton-shimmer" />
          </div>

          {/* Results Column */}
          <div className="flex flex-col justify-between rounded-2xl border border-brand-border/60 bg-brand-surface/60 p-6 min-h-[360px]">
            <div className="space-y-4">
              <div className="h-3.5 w-36 rounded skeleton-shimmer" />
              <div className="h-12 w-48 rounded-lg skeleton-shimmer" />
              
              <div className="grid gap-3 grid-cols-3 pt-2">
                <div className="h-14 rounded-xl skeleton-shimmer" />
                <div className="h-14 rounded-xl skeleton-shimmer" />
                <div className="h-14 rounded-xl skeleton-shimmer" />
              </div>
              
              <div className="space-y-2 pt-2">
                <div className="h-4 w-full rounded skeleton-shimmer" />
                <div className="h-4 w-11/12 rounded skeleton-shimmer" />
              </div>
            </div>

            <div className="h-12 w-full rounded-xl skeleton-shimmer mt-6" />
          </div>
        </div>
      </div>
    </section>
  ),
});

const ContactForm = dynamic(() => import("@/components/ContactForm"), {
  loading: () => (
    <section id="contact" className="relative overflow-hidden bg-brand-bg py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading Skeleton */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="h-4 w-24 rounded-full skeleton-shimmer mb-3" />
          <div className="h-10 w-1/2 max-w-sm rounded-lg skeleton-shimmer mb-4" />
          <div className="h-5 w-4/5 max-w-md rounded-md skeleton-shimmer" />
        </div>

        {/* Contact Grid Skeleton */}
        <div className="grid gap-8 lg:grid-cols-[1.35fr,0.65fr] lg:gap-12">
          {/* Inputs Column */}
          <div className="card p-6 sm:p-8 space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <div className="h-3.5 w-20 rounded skeleton-shimmer" />
                <div className="h-11 w-full rounded-xl skeleton-shimmer" />
              </div>
              <div className="space-y-2">
                <div className="h-3.5 w-24 rounded skeleton-shimmer" />
                <div className="h-11 w-full rounded-xl skeleton-shimmer" />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="h-3.5 w-16 rounded skeleton-shimmer" />
              <div className="h-11 w-full rounded-xl skeleton-shimmer" />
            </div>

            <div className="space-y-2">
              <div className="h-3.5 w-28 rounded skeleton-shimmer" />
              <div className="h-32 w-full rounded-xl skeleton-shimmer" />
            </div>

            <div className="h-12 w-40 rounded-xl skeleton-shimmer" />
          </div>

          {/* Info Column */}
          <div className="card p-6 sm:p-8 space-y-6 h-fit bg-brand-muted/30">
            <div className="space-y-2">
              <div className="h-5 w-36 rounded skeleton-shimmer" />
              <div className="h-3.5 w-full rounded skeleton-shimmer" />
            </div>
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full skeleton-shimmer flex-shrink-0" />
                <div className="space-y-1.5 w-full">
                  <div className="h-3 w-16 rounded skeleton-shimmer" />
                  <div className="h-4 w-44 rounded skeleton-shimmer" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full skeleton-shimmer flex-shrink-0" />
                <div className="space-y-1.5 w-full">
                  <div className="h-3 w-20 rounded skeleton-shimmer" />
                  <div className="h-4 w-52 rounded skeleton-shimmer" />
                </div>
              </div>
            </div>
          </div>
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
        <ConsultingStrengths />
        <SkillsSnapshot />
        <Projects />
        <ROICalculator />
        <ServicesSection />
        <ExperienceTimeline />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
