'use client';

import { motion, Variants, useReducedMotion } from 'framer-motion';
import { Compass, Bug, Search, BrainCircuit, MessageSquare, Users } from 'lucide-react';
import SectionHeading from './SectionHeading';

const STRENGTHS = [
  { icon: Compass, title: 'Adaptability', description: 'Get productive in unfamiliar systems by understanding the environment, constraints, and real problem before choosing an implementation.' },
  { icon: Search, title: 'R&D First', description: 'Explore uncertain requirements, compare approaches, test assumptions, and reduce unnecessary implementation risk before building.' },
  { icon: Bug, title: 'Difficult Debugging', description: 'Work through stubborn application, API, deployment, and integration failures when the obvious fix is not the real fix.' },
  { icon: BrainCircuit, title: 'AI for Leverage', description: 'Use AI to reduce repetitive cognitive work and create more room for engineering judgment, R&D, debugging, and product decisions.' },
  { icon: MessageSquare, title: 'Clear Technical Communication', description: 'Translate technical decisions into language that works for clients, stakeholders, developers, and people entering an unfamiliar codebase.' },
  { icon: Users, title: 'Enable the Team', description: 'Share system knowledge, support difficult tickets, assign work, and help other engineers become productive faster.' },
];

export default function ConsultingStrengths() {
  const shouldReduceMotion = useReducedMotion();
  const containerVariants: Variants = { hidden: {}, visible: { transition: { staggerChildren: shouldReduceMotion ? 0 : 0.05 } } };
  const itemVariants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: shouldReduceMotion ? { duration: 0.05 } : { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section id="strengths" className="section-shell bg-brand-bg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="ENGINEERING APPROACH"
          title="Adapt first. Understand the problem. Then build."
          description="My strongest work happens where the requirements are unfamiliar, the system is difficult, or the obvious solution is not good enough."
        />
        <motion.div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
          {STRENGTHS.map((strength, index) => {
            const Icon = strength.icon;
            return (
              <motion.article key={strength.title} variants={itemVariants} className="group/strength card card-hover p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-brand-border bg-brand-surface text-brand-blue transition-all duration-300 group-hover/strength:scale-110 group-hover/strength:bg-brand-blue group-hover/strength:text-white group-hover/strength:border-transparent group-hover/strength:shadow-[0_0_12px_rgba(2,132,199,0.3)]">
                    <Icon className="h-5 w-5 transition-transform duration-500 group-hover/strength:rotate-[15deg]" strokeWidth={1.7} aria-hidden="true" />
                  </div>
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">0{index + 1}</span>
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-brand-navy">{strength.title}</h3>
                <p className="mt-3 text-sm leading-6 text-brand-charcoal">{strength.description}</p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
