'use client';

import { motion, Variants, useReducedMotion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const STRENGTHS = [
  { title: "AI Integration", detail: "Production workflows using OCR, semantic matching, NLP, and intelligent automation." },
  { title: "System Architecture", detail: "API design, relational data models, caching, background workers, and secure service boundaries." },
  { title: "Product Thinking", detail: "Translate ambiguous requirements into practical milestones, workflows, and measurable outcomes." },
  { title: "Operational Delivery", detail: "Build, ship, monitor, and iterate on software with an emphasis on reliability and maintainability." },
];

export default function About() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: shouldReduceMotion ? 0 : 0.06 } },
  };

  const itemVariants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: shouldReduceMotion ? { duration: 0.05 } : { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section className="section-shell bg-brand-bg" id="about">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="PROFILE"
          title="Product-minded full-stack engineer focused on production systems."
          description="I work across frontend, backend, mobile, and data layers to turn product requirements into secure software that can actually be shipped and maintained."
        />

        <motion.div
          className="mt-10 grid gap-4 lg:grid-cols-[1.15fr,0.85fr] lg:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.article variants={itemVariants} className="card p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-blue">01</span>
              <span className="h-px flex-1 bg-brand-border" />
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-slate-400">How I work</span>
            </div>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-brand-charcoal sm:text-xl">
              My focus is the space between product intent and technical execution. I design the APIs, data models, interfaces, and workflows needed to move an idea from specification to a dependable production system.
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
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-slate-400">Principles</span>
            </div>
            <div className="mt-7 space-y-6">
              {[
                ['Start with the workflow', 'Understand the real operational problem before choosing a framework or architecture.'],
                ['Prefer clear boundaries', 'Use typed contracts, explicit responsibilities, and predictable data flows.'],
                ['Optimize for shipping', 'Choose pragmatic solutions that can be tested, deployed, monitored, and improved.'],
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
