'use client';

import { motion, Variants, useReducedMotion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const STRENGTHS = [
  { title: "Adaptive R&D", detail: "Start with the problem, research unfamiliar territory, and choose a practical path before committing to implementation." },
  { title: "System Debugging", detail: "Work through difficult backend, infrastructure, deployment, integration, and production failures until the system is usable again." },
  { title: "Product Context", detail: "Understand the workflow behind a feature instead of treating every requirement as an isolated ticket." },
  { title: "Knowledge Transfer", detail: "Make complex systems easier for new teammates through practical walkthroughs, documentation, and hands-on KT." },
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

        <motion.div className="mt-10 grid gap-4 lg:grid-cols-[1.15fr,0.85fr] lg:gap-6" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
          <motion.article variants={itemVariants} className="card p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-blue">01</span>
              <span className="h-px flex-1 bg-brand-border" />
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-slate-400">How I work</span>
            </div>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-brand-charcoal sm:text-xl">
              I usually start with a client or stakeholder conversation, then move into R&D. Once I understand the constraints, I prefer to build the smallest practical solution, debug the hard parts, and keep improving it after it reaches production.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {STRENGTHS.map((item) => (
                <div key={item.title} className="rounded-xl border border-brand-border bg-brand-muted/50 p-4">
                  <h3 className="text-sm font-semibold text-brand-navy">{item.title}</h3>
                  <p className="mt-2 text-xs leading-5 text-brand-charcoal">{item.detail}</p>
                </div>
              ))}
            </div>
          </motion.article>

          <motion.aside variants={itemVariants} className="card p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-blue">02</span>
              <span className="h-px flex-1 bg-brand-border" />
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-slate-400">Working principles</span>
            </div>
            <div className="mt-7 space-y-6">
              {[
                ["Understand before building", "A good technical solution starts with the actual workflow and constraints."],
                ["Use AI for leverage", "Automate repetitive cognitive work so more attention stays on engineering judgment and difficult problems."],
                ["Make the environment easier", "Clear communication and useful KT matter just as much as getting the code to run."],
              ].map(([title, detail]) => (
                <div key={title} className="border-l-2 border-brand-blue/60 pl-4">
                  <h3 className="text-sm font-semibold text-brand-navy">{title}</h3>
                  <p className="mt-1.5 text-xs leading-5 text-brand-charcoal">{detail}</p>
                </div>
              ))}
            </div>
          </motion.aside>
        </motion.div>
      </div>
    </section>
  );
}
