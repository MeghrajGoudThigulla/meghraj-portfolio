'use client';

import { motion, Variants, useReducedMotion } from 'framer-motion';
import SectionHeading from './SectionHeading';

type CapabilityItem = {
  number: string;
  capability: string;
  evidenceText: string;
  projectName: string;
  projectHref: string;
};

const CAPABILITIES: CapabilityItem[] = [
  {
    number: "01",
    capability: "Adaptive Technical R&D",
    evidenceText: "Investigate unfamiliar problem domains and turn research into an actionable implementation path, as proven end-to-end on ",
    projectName: "TFGenAPI",
    projectHref: "#projects",
  },
  {
    number: "02",
    capability: "Production System Debugging",
    evidenceText: "Diagnose deep application, API, and deployment failures across live distributed environments, including database migration and instance recovery on ",
    projectName: "TFG SecureBank",
    projectHref: "#projects",
  },
  {
    number: "03",
    capability: "AI & Full-Stack Product Engineering",
    evidenceText: "Bridge machine learning inference, asynchronous worker queues, and reactive interfaces into reliable products, such as statutory payroll automation on ",
    projectName: "IYOV AI",
    projectHref: "#projects",
  },
  {
    number: "04",
    capability: "Cross-Platform Mobile Delivery",
    evidenceText: "Deliver production mobile applications across iOS and Android with unified pipelines, managing App Store and Play Store releases for 4+ Flutter apps in ",
    projectName: "IYOV AI Mobile",
    projectHref: "#projects",
  },
  {
    number: "05",
    capability: "Mission-Critical Cloud & API Architecture",
    evidenceText: "Architect resilient microservices with strict JWT authentication and real-time state sync, including Google Play Integrity and dual-store WebSocket sync on ",
    projectName: "Medical Advisor",
    projectHref: "#projects",
  },
  {
    number: "06",
    capability: "Technical Leadership & Enablement",
    evidenceText: "Translate ambiguous executive requirements into shippable milestones, leading technical knowledge transfer and onboarding for 8 engineers on ",
    projectName: "Medical Advisor",
    projectHref: "#projects",
  },
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
      transition: shouldReduceMotion
        ? { duration: 0.05 }
        : { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="services" className="section-shell border-y border-brand-border/40 bg-brand-muted/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="CAPABILITIES & SERVICES"
          title="Engineering depth grounded in real production ownership."
          description="A practical combination of R&D, systems engineering, and technical leadership. Every capability is backed by delivered software."
        />

        <motion.div
          className="mt-12 divide-y divide-brand-border/60 border-y border-brand-border/60"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {CAPABILITIES.map((item) => (
            <motion.div
              key={item.capability}
              variants={itemVariants}
              className="group py-6 sm:py-8 grid gap-3 sm:grid-cols-[4rem_1fr_1.5fr] sm:gap-6 sm:items-baseline transition-colors hover:bg-brand-surface/40 px-2 sm:px-4 rounded-xl"
            >
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-brand-blue">
                {item.number}
              </span>
              <h3 className="text-lg font-bold tracking-tight text-brand-navy group-hover:text-brand-blue transition-colors">
                {item.capability}
              </h3>
              <p className="text-sm leading-relaxed text-brand-charcoal">
                {item.evidenceText}
                <a
                  href={item.projectHref}
                  className="font-semibold text-brand-blue hover:underline"
                >
                  {item.projectName}
                </a>
                .
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
