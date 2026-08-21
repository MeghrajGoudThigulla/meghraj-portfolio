'use client';

import { motion, Variants, useReducedMotion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const STRENGTHS = [
  { title: "Adaptive R&D", detail: "Start with the problem, research unfamiliar territory, and choose a practical path before committing to implementation." },
  { title: "System Debugging", detail: "Work through difficult backend, infrastructure, deployment, integration, and production failures until the system is usable again." },
  { title: "Product Context", detail: "Understand the workflow behind a feature instead of treating every requirement as an isolated ticket." },
  { title: "Knowledge Transfer", detail: "Make complex systems easier for new teammates through practical walkthroughs, documentation, and hands-on KT." },
];

const PRINCIPLES = [
  ["Understand before building", "Start with the workflow, constraints, and the actual problem."],
  ["Use AI for leverage", "Automate repetitive cognitive work while keeping engineering judgment human-led."],
  ["Make the environment easier", "Clear communication and useful KT are part of shipping good software."],
];

export default function About() {
  const shouldReduceMotion = useReducedMotion();
  const containerVariants: Variants = { hidden: {}, visible: { transition: { staggerChildren: shouldReduceMotion ? 0 : 0.06 } } };
  const itemVariants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: shouldReduceMotion ? { duration: 0.05 } : { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section className="section-shell bg-brand-bg" id="about">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="PROFILE"
          title="An adaptive engineer who makes difficult technical work easier to move through."
          description="I work across AI/ML, backend systems, Flutter, infrastructure, and product R&D. I learn unfamiliar systems quickly, debug what breaks, and try to make the working environment easier for the people around me."
        />

        <motion.div className="mt-14 grid gap-14 lg:grid-cols-[1.05fr,0.95fr] lg:gap-20" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
          <motion.article variants={itemVariants}>
            <div className="flex items-center gap-3 border-b border-brand-border pb-4">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-blue">01</span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">How I work</span>
            </div>
            <p className="mt-7 max-w-2xl text-xl leading-8 tracking-[-0.015em] text-brand-navy sm:text-2xl sm:leading-9">
              I usually start with a client or stakeholder conversation, then move into R&D. Once I understand the constraints, I prefer to build the smallest practical solution, debug the hard parts, and keep improving it after it reaches production.
            </p>

            <div className="mt-10 divide-y divide-brand-border border-y border-brand-border">
              {STRENGTHS.map((item, index) => (
                <div key={item.title} className="grid gap-3 py-5 sm:grid-cols-[5rem_1fr] sm:gap-6">
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">0{index + 1}</span>
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
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Working principles</span>
            </div>
            <div className="divide-y divide-brand-border">
              {PRINCIPLES.map(([title, detail], index) => (
                <div key={title} className="py-6">
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
