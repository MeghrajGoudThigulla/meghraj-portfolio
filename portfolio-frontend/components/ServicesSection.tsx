'use client';

import { motion, Variants, useReducedMotion } from 'framer-motion';
import { Globe, Smartphone, Settings, ShieldCheck, Database, Activity } from 'lucide-react';
import SectionHeading from './SectionHeading';

const SERVICES = [
  { icon: Globe, title: 'Full-Stack Web Systems', description: 'Production web applications with Next.js, React, TypeScript, FastAPI, and Node.js, designed around clear APIs and maintainable architecture.' },
  { icon: Smartphone, title: 'Cross-Platform Mobile', description: 'Flutter applications for iOS and Android with secure authentication, resilient API integration, and practical offline-aware workflows.' },
  { icon: Activity, title: 'Real-Time Operations', description: 'Healthcare and operations workflows with synchronized state, coordinator dashboards, event-driven updates, and reliable backend services.' },
  { icon: ShieldCheck, title: 'Verification & Automation', description: 'Automated onboarding workflows using OCR, semantic matching, background processing, and security-conscious verification pipelines.' },
  { icon: Database, title: 'API & Data Architecture', description: 'REST APIs and relational data systems using PostgreSQL, MySQL, Redis, Prisma, and SQLAlchemy, with an emphasis on performance and integrity.' },
  { icon: Settings, title: 'Process Digitization', description: 'Turn manual business operations into structured admin platforms, workflow trackers, automated reports, and measurable software processes.' },
];

export default function ServicesSection() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: shouldReduceMotion ? 0 : 0.05 } },
  };

  const itemVariants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { y: 12, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: shouldReduceMotion ? { duration: 0.05 } : { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="services" className="section-shell border-y border-brand-border/40 bg-brand-muted/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="WHAT I BUILD"
          title="Capabilities that turn product requirements into working systems."
          description="A focused set of engineering capabilities spanning web, mobile, backend architecture, automation, and data systems."
        />

        <motion.div
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.article key={service.title} variants={itemVariants} className="card card-hover p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-brand-border bg-brand-surface text-brand-blue">
                    <Icon className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
                  </div>
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                    0{index + 1}
                  </span>
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
