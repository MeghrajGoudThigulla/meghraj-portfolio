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
  visible: { transition: { staggerChildren: 0.06 } },
};

const textVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Hero() {
  return (
    <section className="section-shell relative flex min-h-[86vh] items-center overflow-hidden border-b border-brand-border/40 bg-brand-bg py-16 sm:py-24 lg:py-28">
      <AnimatedGridBackground />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid gap-12 lg:grid-cols-[1.2fr,0.8fr] lg:items-center lg:gap-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex max-w-3xl flex-col gap-6">
            <motion.p
              variants={textVariants}
              className="max-w-prose text-xs font-semibold uppercase tracking-[0.16em] text-brand-blue"
            >
              {HERO_EYEBROW}
            </motion.p>

            <motion.h1
              variants={textVariants}
              className="max-w-4xl text-4xl font-bold leading-[1.05] tracking-[-0.035em] text-brand-navy sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              {HERO_HEADLINE}
            </motion.h1>

            <motion.p
              variants={textVariants}
              className="max-w-2xl text-base leading-7 text-brand-charcoal sm:text-lg lg:text-xl"
            >
              {HERO_PROOF_LINE}
            </motion.p>

            <motion.div variants={textVariants} className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/#projects"
                className="btn btn-primary px-6 py-3.5 text-xs font-bold"
              >
                View My Work
              </Link>
              <Link
                href="/resume"
                className="btn btn-secondary px-6 py-3.5 text-xs font-semibold"
              >
                Download Résumé
              </Link>
              <Link
                href="/#contact"
                className="btn btn-ghost px-2 py-3.5 text-xs font-semibold"
              >
                Get In Touch →
              </Link>
            </motion.div>

            <motion.div variants={textVariants} className="pt-2">
              <HeroTrustBadges badges={HERO_TRUST_BADGES} />
            </motion.div>
          </div>

          <motion.div
            variants={cardVariants}
            className="rounded-2xl border border-brand-border/70 bg-brand-surface/80 p-5 shadow-glass backdrop-blur-md sm:p-6"
          >
            <div className="mb-5 border-b border-brand-border/60 pb-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-blue">
                Engineering Impact
              </p>
              <p className="mt-2 text-sm leading-6 text-brand-charcoal">
                Production metrics that show the scale and ownership behind the work.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {HERO_METRIC_CARDS.map((metric) => (
                <div
                  key={metric.label}
                  className="card card-hover border-glow-hover border-l-2 border-l-brand-blue px-4 py-3.5"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                    {metric.label}
                  </p>
                  <p className="mt-1 text-2xl font-bold leading-none tracking-tight text-brand-navy">
                    {metric.value}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-brand-charcoal">
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
