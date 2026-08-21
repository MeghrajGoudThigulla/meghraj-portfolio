'use client';

import { motion, Variants, useReducedMotion } from 'framer-motion';
import { BrainCircuit, Search, Bug, CloudCog, Smartphone, Workflow } from 'lucide-react';
import SectionHeading from './SectionHeading';

const SERVICES = [
  { icon: BrainCircuit, title: 'AI & Product Engineering', description: 'Build practical AI-enabled products and automation with Python, machine learning, APIs, and the surrounding product systems needed to make them useful.' },
  { icon: Search, title: 'Technical R&D', description: 'Investigate unfamiliar requirements, compare viable approaches, prototype the hard parts, and turn research into an implementation path.' },
  { icon: Bug, title: 'Difficult-System Debugging', description: 'Diagnose stubborn application, API, deployment, and integration failures, including the messy problems that do not arrive with a convenient error message.' },
  { icon: CloudCog, title: 'Cloud & Release Support', description: 'Work across AWS, GCP, Render, Linux, and mobile release workflows to get software deployed, published, and maintained in real environments.' },
  { icon: Smartphone, title: 'Flutter Applications', description: 'Build and maintain cross-platform mobile products for Android and iOS, including backend integration, authentication, and release management.' },
  { icon: Workflow, title: 'Business Workflow Automation', description: 'Turn manual or fragmented operations into structured software workflows, admin systems, automated processes, and maintainable APIs.' },
];

const CARD_ACCENTS = [
  { from: '#0284c7', to: '#38bdf8', label: 'AI & ML' },
  { from: '#0f766e', to: '#2dd4bf', label: 'Research' },
  { from: '#4338ca', to: '#6366f1', label: 'Debugging' },
  { from: '#0891b2', to: '#06b6d4', label: 'Cloud' },
  { from: '#0f766e', to: '#2dd4bf', label: 'Mobile' },
  { from: '#047857', to: '#10b981', label: 'Automation' },
];

export default function ServicesSection() {
  const shouldReduceMotion = useReducedMotion();
  const containerVariants: Variants = { hidden: {}, visible: { transition: { staggerChildren: shouldReduceMotion ? 0 : 0.05 } } };
  const itemVariants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { y: 12, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: shouldReduceMotion ? { duration: 0.05 } : { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section id="services" className="section-shell border-y border-brand-border/40 bg-brand-muted/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="TECHNICAL CONSULTING"
          title="Bring the difficult part. We can work out the rest."
          description="I help turn unclear requirements, difficult technical problems, and manual workflows into practical software systems. The first step is understanding the problem, not forcing a stack onto it."
        />

        <motion.div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            const accent = CARD_ACCENTS[index % CARD_ACCENTS.length];
            return (
              <motion.article 
                key={service.title} 
                variants={itemVariants} 
                className="group/service relative flex flex-col overflow-hidden rounded-2xl border p-5 sm:p-6 transition-all duration-300 card-hover"
                style={{
                  background: `linear-gradient(160deg, ${accent.from}06 0%, rgba(var(--brand-surface-rgb), 0.94) 62%)`,
                  borderColor: `${accent.from}22`,
                }}
                whileHover={{
                  y: -4,
                  borderColor: `${accent.from}42`,
                }}
              >
                {/* Subtle top accent bar on hover */}
                <div
                  className="absolute inset-x-0 top-0 h-0.5 opacity-0 transition-opacity duration-300 group-hover/service:opacity-100"
                  style={{ background: `linear-gradient(90deg, ${accent.from}, ${accent.to})` }}
                  aria-hidden="true"
                />

                <div className="flex items-center justify-between">
                  <div 
                    className="flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-sm transition-all duration-300 group-hover/service:scale-110 group-hover/service:rotate-[12deg] group-hover/service:shadow-[0_4px_16px_rgba(2,132,199,0.22)]"
                    style={{ background: `linear-gradient(135deg, ${accent.from}, ${accent.to})` }}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                  </div>
                  <div className="flex items-center gap-3">
                    <span 
                      className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest transition-all duration-300"
                      style={{ background: `${accent.from}10`, borderColor: `${accent.from}22`, color: accent.from }}
                    >
                      {accent.label}
                    </span>
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">0{index + 1}</span>
                  </div>
                </div>
                <h3 className="mt-5 text-lg font-bold tracking-tight text-brand-navy">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-brand-charcoal flex-1">{service.description}</p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
