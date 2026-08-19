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
            return (
              <motion.article key={service.title} variants={itemVariants} className="card card-hover p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-brand-border bg-brand-surface text-brand-blue">
                    <Icon className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
                  </div>
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">0{index + 1}</span>
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-brand-navy">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-brand-charcoal">{service.description}</p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
