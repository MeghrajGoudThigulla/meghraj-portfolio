'use client';

import { motion, Variants, useReducedMotion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { ABOUT_CONTENT, PRINCIPLES, STRENGTHS } from "@/data/about";

export default function About() {
  const shouldReduceMotion = useReducedMotion();
  const containerVariants: Variants = { hidden: {}, visible: { transition: { staggerChildren: shouldReduceMotion ? 0 : 0.06 } } };
  const itemVariants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: shouldReduceMotion ? { duration: 0.05 } : { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section className="section-shell bg-brand-bg" id="about" aria-labelledby="about-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          titleId="about-heading"
          eyebrow={ABOUT_CONTENT.eyebrow}
          title={ABOUT_CONTENT.title}
          description={ABOUT_CONTENT.description}
        />

        <motion.div className="mt-14 grid gap-14 lg:grid-cols-[1.05fr,0.95fr] lg:gap-20" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
          <motion.article variants={itemVariants}>
            <div className="flex items-center gap-3 border-b border-brand-border pb-4">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-blue">01</span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-600 dark:text-slate-400">How I work</span>
            </div>
            <p className="mt-7 max-w-2xl text-xl leading-8 tracking-[-0.015em] text-brand-navy sm:text-2xl sm:leading-9">
              {ABOUT_CONTENT.leadParagraph}
            </p>

            <div className="mt-10 divide-y divide-brand-border border-y border-brand-border">
              {STRENGTHS.map((item, index) => (
                <div key={item.title} data-testid="strength-item" className="grid gap-3 py-5 sm:grid-cols-[5rem_1fr] sm:gap-6">
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-600 dark:text-slate-400">0{index + 1}</span>
                  <div>
                    <h3 className="text-sm font-semibold text-brand-navy">{item.title}</h3>
                    <p className="mt-1.5 max-w-xl text-sm leading-6 text-brand-charcoal">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.article>

          <motion.aside variants={itemVariants} className="lg:pt-14">
            <div className="flex items-center gap-3 border-b border-brand-border pb-4">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-blue">02</span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-600 dark:text-slate-400">Working principles</span>
            </div>
            <div className="divide-y divide-brand-border" role="list">
              {PRINCIPLES.map(([title, detail], index) => (
                <div key={title} role="listitem" data-testid="principle-item" className="py-6">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[10px] text-brand-blue">0{index + 1}</span>
                    <h3 className="text-base font-semibold tracking-[-0.01em] text-brand-navy">{title}</h3>
                  </div>
                  <p className="mt-2 pl-7 text-sm leading-6 text-brand-charcoal">{detail}</p>
                </div>
              ))}
            </div>
          </motion.aside>
        </motion.div>
      </div>
    </section>
  );
}
