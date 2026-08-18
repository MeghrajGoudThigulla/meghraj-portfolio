'use client';

import { motion, Variants, useReducedMotion } from 'framer-motion';
import { Compass, Layers, MousePointerClick, Zap, Cpu, MessageSquare } from 'lucide-react';
import SectionHeading from './SectionHeading';

const STRENGTHS = [
  { icon: Compass, title: 'Product Understanding', description: 'Turn business bottlenecks into clear workflows, technical requirements, and practical delivery milestones.' },
  { icon: Layers, title: 'System Architecture', description: 'Design service boundaries, relational data models, caching, queues, and APIs around real product constraints.' },
  { icon: MousePointerClick, title: 'UI/UX Thinking', description: 'Build interfaces that make complex workflows understandable, responsive, accessible, and efficient.' },
  { icon: Zap, title: 'Technical Execution', description: 'Ship production software with React, Next.js, FastAPI, Flutter, PostgreSQL, Node.js, and related tooling.' },
  { icon: Cpu, title: 'AI & Automation', description: 'Use OCR, semantic processing, background jobs, and AI integrations to remove repetitive operational work.' },
  { icon: MessageSquare, title: 'Technical Communication', description: 'Explain architectural trade-offs and implementation decisions clearly to both technical and non-technical teams.' },
];

export default function ConsultingStrengths() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: shouldReduceMotion ? 0 : 0.05 } },
  };

  const itemVariants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: shouldReduceMotion ? { duration: 0.05 } : { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section id="strengths" className="section-shell bg-brand-bg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="ENGINEERING APPROACH"
          title="How I approach complex product work."
          description="The capabilities behind the projects: understanding the problem, designing the system, shipping the interface, and communicating the trade-offs."
        />

        <motion.div
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {STRENGTHS.map((strength, index) => {
            const Icon = strength.icon;
            return (
              <motion.article key={strength.title} variants={itemVariants} className="card card-hover p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-brand-border bg-brand-surface text-brand-blue">
                    <Icon className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
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
