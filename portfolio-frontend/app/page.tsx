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
    <div className="bg-brand-bg text-brand-charcoal overflow-x-clip" id="top">
      <Navbar />
      <main id="main-content" tabIndex={-1} className="overflow-x-clip">
        <Hero />
        <div className="section-divider" />
        <About />
        <div className="section-divider" />
        <ConsultingStrengths />
        <div className="section-divider" />
        <ServicesSection />
        <div className="section-divider" />
        <Projects />
        <div className="section-divider" />
        <ExperienceTimeline />
        <div className="section-divider" />
        <SkillsSnapshot />
        <div className="section-divider" />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
