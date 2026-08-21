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
  visible: { transition: { staggerChildren: 0.07 } },
};

const textVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero() {
  return (
    <section className="relative flex min-h-[82vh] items-center overflow-hidden border-b border-brand-border/50 bg-brand-bg py-16 sm:py-24 lg:min-h-[88vh] lg:py-28">
      <AnimatedGridBackground />
      <div aria-hidden className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-brand-blue/10 blur-[140px]" />
      <div aria-hidden className="pointer-events-none absolute -left-48 bottom-0 h-80 w-80 rounded-full bg-brand-accent/10 blur-[130px]" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div className="grid gap-14 lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)] lg:items-end lg:gap-20" variants={containerVariants} initial="hidden" animate="visible">
          <div className="flex max-w-4xl flex-col">
            <motion.div variants={textVariants} className="flex items-center gap-3">
              <span aria-hidden className="h-px w-10 bg-brand-blue" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-blue">{HERO_EYEBROW}</p>
            </motion.div>

            <motion.h1 variants={textVariants} className="mt-7 max-w-4xl text-[clamp(3rem,7vw,6.75rem)] font-bold leading-[0.94] tracking-[-0.055em] text-brand-navy">
              {HERO_HEADLINE}
            </motion.h1>

            <motion.p variants={textVariants} className="mt-7 max-w-2xl text-base leading-7 text-brand-charcoal sm:text-lg sm:leading-8 lg:text-xl">
              {HERO_PROOF_LINE}
            </motion.p>

            <motion.div variants={textVariants} className="mt-8 flex flex-wrap items-center gap-3">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} transition={{ type: "spring", stiffness: 450, damping: 14 }}>
                <Link href="/#projects" className="btn btn-primary px-6 py-3.5 text-xs font-bold">View my work</Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} transition={{ type: "spring", stiffness: 450, damping: 14 }}>
                <Link href="/#contact" className="btn btn-secondary px-6 py-3.5 text-xs font-semibold">Work with me</Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.06, x: 2 }} whileTap={{ scale: 0.94 }} transition={{ type: "spring", stiffness: 450, damping: 14 }}>
                <Link href="/resume" className="inline-block px-2 py-3.5 text-xs font-semibold text-brand-charcoal underline decoration-brand-border underline-offset-4 transition-colors hover:text-brand-blue hover:decoration-brand-blue">Résumé</Link>
              </motion.div>
            </motion.div>

            <motion.div variants={textVariants} className="mt-10 max-w-3xl">
              <HeroTrustBadges badges={HERO_TRUST_BADGES} />
            </motion.div>
          </div>

          <motion.aside variants={cardVariants} className="border-t border-brand-border pt-6 lg:border-l lg:border-t-0 lg:pl-8">
            <div className="flex items-baseline justify-between gap-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-blue">Selected signals</p>
                <p className="mt-2 text-sm leading-6 text-brand-charcoal">A few concrete indicators of the work behind the title.</p>
              </div>
              <span aria-hidden className="font-mono text-[10px] text-slate-400">01—04</span>
            </div>

            <div className="mt-7 divide-y divide-brand-border/80 border-y border-brand-border/80">
              {HERO_METRIC_CARDS.map((metric, index) => (
                <div key={metric.label} className="group relative grid grid-cols-[auto_1fr] gap-4 py-5 pl-4 -ml-4 transition-all duration-300 hover:bg-brand-muted/30 rounded-xl border-l-2 border-transparent hover:border-brand-blue/60">
                  <span className="pt-1 font-mono text-[10px] text-slate-400 transition-transform duration-300 group-hover:translate-x-1.5">0{index + 1}</span>
                  <div>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <p className="text-2xl font-bold tracking-[-0.03em] text-brand-navy transition-all duration-300 group-hover:text-brand-blue group-hover:text-glow">{metric.value}</p>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">{metric.label}</p>
                    </div>
                    <p className="mt-1.5 text-xs leading-5 text-brand-charcoal">{metric.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.aside>
        </motion.div>
      </div>
    </section>
  );
}
