'use client';

import { motion, Variants, useReducedMotion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const STRENGTHS = [
  {
    title: "AI Integration & ML",
    detail: "Designing intelligent workflows, NLP solutions, semantic search, and computer vision models into robust production environments.",
  },
  {
    title: "Technical Strategy",
    detail: "Bridging the gap between engineering and business, translating technical ambiguity into clear, actionable, risk-mitigated roadmaps.",
  },
  {
    title: "Scalable Architecture",
    detail: "Delivering cloud-native infrastructures, clean API gateways, relational database migrations, and asynchronous background worker queues.",
  },
  {
    title: "Operational Discipline",
    detail: "Translating customer pain points and process bottlenecks into shippable software milestones with predictable delivery cycles.",
  },
];

export default function About() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15
      }
    }
  };

  const cardVariants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: shouldReduceMotion ? { duration: 0.05 } : { type: "spring" as const, stiffness: 80, damping: 14 }
    }
  };

  const itemGridVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08
      }
    }
  };

  const strengthItemVariants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: shouldReduceMotion ? { duration: 0.05 } : { type: "spring" as const, stiffness: 100, damping: 12 }
    }
  };

  const listVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1
      }
    }
  };

  const listItemVariants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: shouldReduceMotion ? { duration: 0.05 } : { type: "spring" as const, stiffness: 100, damping: 12 }
    }
  };

  return (
    <section
      className="section-shell relative bg-brand-bg py-20 sm:py-24 lg:py-28"
      id="about"
    >
      {/* Decorative glows */}
      <div className="absolute right-0 top-10 -z-10 h-72 w-72 rounded-full bg-brand-blue/5 blur-[120px] pointer-events-none" />
      <div className="absolute left-0 bottom-6 -z-10 h-60 w-60 rounded-full bg-brand-accent/5 blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading
          title="Product-Minded Systems Engineer & Consulting Catalyst"
          description="I specialize in architecting high-performance digital products, bridging deep technical execution with high-level strategic business outcomes."
          eyebrow="Profile"
        />

        <motion.div 
          className="grid gap-8 lg:grid-cols-[1.15fr,0.85fr] lg:gap-10 mt-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Main Info Card */}
          <motion.div 
            variants={cardVariants}
            className="card p-6 sm:p-8 border border-brand-border/60 bg-brand-surface/40 backdrop-blur-md shadow-glass flex flex-col justify-between"
          >
            <div className="rounded-xl border border-brand-border/60 bg-brand-surface/75 px-5 py-5 mb-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                Core Positioning
              </p>
              <p className="mt-2 text-base leading-relaxed text-brand-charcoal lg:text-lg">
                I design and deploy AI-driven, secure full-stack platforms across diverse sectors with measurable outcomes:
                optimizing operational efficiency, integrating intelligent pipelines, and translating
                complex technical capabilities into clear, readable strategic ROI.
              </p>
            </div>
            
            <motion.div 
              variants={itemGridVariants}
              className="grid gap-4 sm:grid-cols-2"
            >
              {STRENGTHS.map((item) => (
                <motion.div
                  key={item.title}
                  variants={strengthItemVariants}
                  className="rounded-xl border border-brand-border bg-brand-surface/50 p-4 transition-all duration-300 hover:border-brand-blue/30"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.1em] text-brand-blue mb-2">
                    {item.title}
                  </p>
                  <p className="text-xs leading-relaxed text-brand-charcoal">
                    {item.detail}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Operating Principles Card */}
          <motion.div 
            variants={cardVariants}
            className="card p-6 sm:p-8 border border-brand-border/60 bg-brand-surface/40 backdrop-blur-md shadow-glass flex flex-col justify-center"
          >
            <h3 className="text-xl font-bold text-brand-navy tracking-tight mb-6">
              Operating Philosophy
            </h3>
            
            <motion.ul 
              variants={listVariants}
              className="space-y-6 text-sm leading-relaxed text-brand-charcoal"
            >
              <motion.li variants={listItemVariants} className="flex gap-4">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-brand-accent shrink-0 shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
                <div>
                  <strong className="text-brand-navy block mb-1">Consultative Diagnosis</strong>
                  Understand real-world user operational pain points and workflow blockages before proposing system design parameters.
                </div>
              </motion.li>
              <motion.li variants={listItemVariants} className="flex gap-4">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-brand-accent shrink-0 shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
                <div>
                  <strong className="text-brand-navy block mb-1">Architectural Predictability</strong>
                  Deliver battle-tested type safety, clean data contracts, API definitions, and comprehensive test gates.
                </div>
              </motion.li>
              <motion.li variants={listItemVariants} className="flex gap-4">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-brand-accent shrink-0 shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
                <div>
                  <strong className="text-brand-navy block mb-1">Transparent Translation</strong>
                  Bridge deep infrastructure decisions into clear, strategic value reports for non-technical stakeholders.
                </div>
              </motion.li>
            </motion.ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
