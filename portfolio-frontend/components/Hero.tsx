'use client';

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import HeroTrustBadges from "./HeroTrustBadges";
import AnimatedGridBackground from "./AnimatedGridBackground";
import {
  HERO_EYEBROW,
  HERO_HEADLINE,
  HERO_METRIC_CARDS,
  HERO_PROOF_LINE,
  HERO_TRUST_BADGES,
} from "@/content/heroProof";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08
    }
  }
};

const textVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { type: "spring", stiffness: 80, damping: 15 }
  }
};

export default function Hero() {
  return (
    <section className="section-shell relative overflow-hidden bg-brand-bg min-h-[90vh] flex items-center py-16 sm:py-24 lg:py-32 border-b border-brand-border/40">
      {/* Dynamic Glowing Mesh backdrop */}
      <AnimatedGridBackground />

      <div className="relative mx-auto flex max-w-7xl flex-col gap-12 px-4 sm:px-6 lg:px-8 w-full">
        <motion.div 
          className="grid gap-12 lg:grid-cols-[1.15fr,0.85fr] lg:items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Copy Area */}
          <div className="flex flex-col gap-6">
            <motion.p 
              variants={textVariants}
              className="max-w-prose text-xs font-semibold uppercase tracking-[0.18em] text-brand-blue text-glow"
            >
              {HERO_EYEBROW}
            </motion.p>
            
            <motion.h1 
              variants={textVariants}
              className="text-4xl font-extrabold leading-[1.08] text-brand-navy sm:text-5xl lg:text-6xl tracking-tight"
            >
              {HERO_HEADLINE}
            </motion.h1>
            
            <motion.p 
              variants={textVariants}
              className="max-w-prose text-base leading-relaxed text-brand-charcoal lg:text-xl font-normal"
            >
              {HERO_PROOF_LINE}
            </motion.p>
            
            <motion.div 
              variants={textVariants}
              className="w-full max-w-xl rounded-2xl border border-brand-border/60 bg-brand-surface/40 backdrop-blur-md p-4 shadow-glass sm:p-5 mt-4"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                Strategic Partnerships & Scopes
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Link
                  href="/#contact"
                  className="btn btn-primary px-6 py-3 text-xs tracking-[0.12em] font-bold shadow-md transition-all"
                >
                  Consult With Me
                </Link>
                <Link
                  href="/#projects"
                  className="btn btn-secondary px-6 py-3 text-xs tracking-[0.12em] font-semibold transition-all"
                >
                  View Projects
                </Link>
              </div>
              
              <Link 
                href="/resume" 
                className="mt-4 inline-flex text-xs font-bold uppercase tracking-[0.08em] text-brand-accent hover:text-brand-blue hover:underline underline-offset-4 transition-colors"
              >
                Review Technical Résumé →
              </Link>
            </motion.div>
            
            <motion.div variants={textVariants}>
              <HeroTrustBadges badges={HERO_TRUST_BADGES} />
            </motion.div>
          </div>

          {/* Metric Snapshot Card Panel */}
          <motion.div 
            variants={cardVariants}
            className="rounded-2xl border border-brand-border/60 bg-brand-surface/50 backdrop-blur-md p-5 shadow-glass sm:p-6 lg:mt-0"
          >
            <div className="mb-6 border-b border-brand-border/50 pb-4">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-blue">
                Impact Snapshot
              </p>
              <p className="mt-2 text-xs leading-relaxed text-brand-charcoal">
                Factual engineering metrics showing scale, relational design, and production delivery.
              </p>
            </div>
            
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {HERO_METRIC_CARDS.map((metric) => (
                <div
                  key={metric.label}
                  className="card card-hover border-glow-hover bg-brand-surface/60 border border-brand-border/40 border-l-4 border-l-brand-blue px-4 py-3.5 rounded-xl shadow-sm transition duration-300 hover:shadow-md hover:border-l-brand-accent"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                    {metric.label}
                  </p>
                  <p className="mt-1 text-2xl font-bold leading-none text-brand-navy font-serif">
                    {metric.value}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-brand-charcoal">
                    {metric.detail}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
