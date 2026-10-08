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
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {CAPABILITIES.map((item) => (
            <motion.div
              key={item.capability}
              variants={itemVariants}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-cyan-500/20 bg-[#080B10]/80 p-6 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/60 hover:shadow-[0_12px_32px_rgba(0,0,0,0.6),0_0_20px_rgba(0,240,255,0.12)] hud-bracket"
            >
              <div>
                <div className="flex items-center justify-between border-b border-cyan-950/60 pb-3 font-mono text-[10px]">
                  <span className="font-bold text-cyan-400">
                    SPEC-{item.number}{" // CAPABILITY"}
                  </span>
                  <span className="rounded bg-cyan-950/50 px-2 py-0.5 font-bold text-cyan-300">
                    PRODUCTION
                  </span>
                </div>

                <h3 className="mt-4 text-lg font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors font-sans">
                  {item.capability}
                </h3>

                <p className="mt-3 text-xs leading-relaxed text-slate-300 font-sans">
                  {item.evidenceText}
                  <a
                    href={item.projectHref}
                    className="font-mono font-bold text-cyan-400 underline decoration-cyan-500/40 hover:text-cyan-300 hover:decoration-cyan-300 transition-colors"
                  >
                    {item.projectName}
                  </a>
                  .
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-cyan-950/50 pt-3 font-mono text-[9px] text-slate-400">
                <span className="text-emerald-400 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  VERIFIED DEPLOYED
                </span>
                <span className="text-cyan-500/80 uppercase">0{item.number}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
